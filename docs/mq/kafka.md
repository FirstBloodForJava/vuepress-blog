# Kafka

官方文档：https://kafka.apache.org/documentation

## 设计理论

### 1.磁盘存储消息

磁盘存储消息

Kakfa很大程度上依赖于文件系统来存储和缓存消息。人们普遍认为“disks are slow”，会让人怀疑持久结果能否提供竞争力的性能。事实上，磁盘的速度比人们预取的要慢得多，也要快的多；一个设计合理的磁盘结构可以和网络一样快。

**磁盘的线性写是600MB/s，而随机写是100Kb/s**

Java内存相关的点：

- 对象的内存开销非常高，通常是存储数据大小的两倍(甚至更糟)
- 随着堆内数据的增加，Java垃圾收集变得越来越繁琐和缓慢



消息传递系统中使用的持久数据结构通常是每个消费者的队列，具有关联的b树或其他通用随机访问数据结构，用于维护有关消息的元数据。b树是可用的最通用的数据结构，使得在消息传递系统中支持各种各样的事务性和非事务性语义成为可能。不过，它们的成本也相当高：b树操作是O(log N)。通常情况下，O(log N)被认为本质上等同于常数时间，但对于磁盘操作来说并非如此。磁盘查找的速度为每次10毫秒，并且每个磁盘一次只能执行一次查找，因此并行性是有限的。因此，即使少量的磁盘搜索也会导致非常高的开销。由于存储系统混合了非常快的缓存操作和非常慢的物理磁盘操作，因此观察到的树结构的性能通常是超线性的，因为数据增加了固定的缓存。数据量增加一倍会导致速度增加一倍。

直观地说，持久队列可以建立在简单的读取和追加文件的基础上，这是日志解决方案中常见的情况。这种结构的优点是所有操作都是O(1)，读操作不会阻塞写操作，也不会相互阻塞。这具有明显的性能优势，因为性能与数据大小完全分离——一台服务器现在可以充分利用许多便宜的、低转速的1+TB SATA驱动器。虽然它们的寻道性能很差，但这些驱动器具有可接受的大读写性能，并且价格为1/3，容量为3倍。

在没有任何性能损失的情况下访问几乎无限的磁盘空间意味着我们可以提供消息传递系统中通常没有的一些特性。例如，在Kafka中，我们可以保留消息相对较长的一段时间(比如一周)，而不是试图在消息被消耗后立即删除消息。这为消费者带来了很大的灵活性，我们将对此进行描述。



影响系统效率的两个点：太多的小型IO、过多的字节复制

对于IO的处理点：kafka考虑的是将消息抽象为消息集，一组消息一次IO。服务器依次将消息块一次性追加到其日志中，而消费者一次获取大的线性块。Kafka 将随机消息写入的突发流转换为流向消费者的线性写入。对于kafka而言：分区是一个有序的日志文件，在同一个分区能保证消息的有序性。当消息发送到不同的分区时，就不能保证消息的全局有序性，消息会因为分区的并行处理而顺序不一致。保证有序性的方法：**单分区主题**、**分区键**

对于字节的处理点：消息在从生产者到代理到消费者采用二进制文件传输

![image-20230809211406222](http://47.101.155.205/image-20230809211406222.png)

### 2.生产者和消费者

#### 生产者

负载均衡、异步发送。

broker：Kafka集群包含一个或多个服务器，这种服务器就称为broker。

负载均衡：生产可以直接将消息发送至broker，客户端控制将消息发送到哪个分区，可以随机完成，也可以通过分区定义的方式完成。

异步发送：Kafka 生产者将尝试在内存中累积数据并在单个请求中发送更大的批次。



#### 消费者

消费者：Kafka消费者向所需要的代理分区发起拉取请求。消费者在每个请求中指定其日志中的偏移量，并接收该位置开始的日志块。**SpringBoot开始连接Kafka的消费者该从哪个偏移量获取消息？怎么往前设置偏移量以便重复消费？**
1. 推和拉：从代理中拉取数据和代理往下推送数据各有区别。broker推送数据到不同的消费者，broker还需要控制数据传输的速率。当生产者的速率超过消费者消费速率时，这时就比较麻烦了。消费者拉取数据，消费者消费速率没赶上生产速率，可以在后面的时候赶上。**推模型，broker积累消息发送请求，它并不知道消费者能否立即处理它，就需要把消息发送给消费者，当配置推送频率较低时，就会一次又一次的推送消息。拉模型解决了这个问题，但是也带来了新问题，当代理没有消息时，消费者需要不停的循环等待**。
2. 消费者定位：消息状态定位，broker和消费者消费内容保持一致，如果broker一发送消息就表示消费，消费者出现网络问题没有接收到消息，则这条消息就丢失了。为了解决这个问题：可以给消息系统添加消息确定功能，这表明消息发送表示消息只是**已发送**，并不是**被消费**，broker等待消费者的确定消息标记消息为**已消费**。这里解决了消息丢失问题，却带来了新的问题：消息消费完，确定消息时出现问题；broker性能。Kafka的topic分为一组有序的分区，每个分区在任何给定实际由每个订阅消费者组的一个消费者消费(确保了消息偏移量的准确性)。**每个分区只能被消费者组中的一个消费者进行消费，这样可以确保消息在消费者组内有序消费，但不同消费者组之间可以并行消费。**这表明每个分区中消费者的位置只是一个整数，即要消费下一条消息的偏移量。这样使得标记的性能消耗很低。这样还支持消费者**退回到旧的偏移量**并重新使用消息。
3. 离线数据加载：Kafka的持久性允许消费者可以定期消费，批量加载数据，将数据加载到离线系统。
4. 静态会员资格：是一种消费者组成员管理策略，用于在 Kafka 消费者组中控制消费者的加入和离开，以及在重新平衡发生时的行为。传统的 Kafka 消费者组中，消费者组的成员是通过一种动态分配的方式加入的，当新的消费者加入或离开时，会触发重新平衡，导致分区重新分配。这种动态分配机制在某些情况下可能会导致不稳定性，例如，在网络分区恢复时可能会触发不必要的重新平衡。Static Membership 通过引入手动管理消费者组成员，消费者可以预先注册到消费者组，并且不会因为网络分区或其他原因而自动触发重新平衡。Static Membership 需要在 Kafka 集群和消费者端进行配置，以及确保正确的协调和调度。



### 3.消息分发机制

消息的分发机制：

1. 最多一次(At most onc)：消息可能丢失，但永远不会重新发送；
2. 至少一次(At least once)：消息不可能丢失，但会重复发送；
3. 正好一次(Exactly once)：每条消息仅传递一次。

实现上面的机制，需要解决两个问题：生产者发送消息的持久性(消息不丢失)；消费者消费消息的保证。

在0.11.0.0之前，如果生产者不能收到判断消息已提交的响应指示，只能重新发送消息。消息至少发送一次，如果原始请求实际上已经成功，则消息可能在重发期间再次写入。

从0.11.0.0开始，kafka支持幂等性，保证重发的消息不会写入日志中。kafka为每个生产者分配一个ID，通过生产者发送消息携带的序列对重复消息删除。还支持向多个主题分区发送消息的能力，支持事务一样的功能，同时成功或失败。

消费者注意是控制其在broker的偏移量来实现消息的稳定消费。正好一次消费应该需要事务性来控制，或者通过自己根据业务性质来实现幂等性。

生产者可以指定消息的持久性级别，异步执行发送。

通过情况下使用正好一次的分发机制：

正常情况下，所有副本具有相同偏移量的完全相同的日志。消费者控制其在该日志中的位置。如果消费者从未奔溃，它将这个位置存储在内存中，但如果消费者失败，我们希望这个主题分区被另一个进程接管，新进程需要选择一个合适给位置开始处理。





### 4.副本机制(Replication)

Kafka的副本机制通过主-从副本模型、ISR、故障检测与恢复策略，实现了分区级的数据冗余和一致性保障。这样设计不仅提高了Kafka集群的可用性，还能够在数据存储和一致性之间提供多种配置选项，满足不同场景的需求。



1. 分区和副本：
   1. 在Kafka中，每个主题都可以被划分成多个分区（Partition），每个分区包含一系列有序的消息（**消息被追加到分区日志文件的时候，会分配一个特定的偏移量（offset），offset是消息在这个分区的唯一标识，Kafka通过这保证消息的顺序性。**）。
   2. offset不跨分区，也就是说Kafka只保证分区的消息有序而不保证主题有序。
   3. 每个分区可以有多个副本，副本数可以在主题创建时指定。副本分布在Kafka集群的不同节点（Broker）上，以实现数据冗余和故障容忍。
2. 主副本（Leader）与追随者（Follower）副本
   1. 每个分区的副本由一个**主副本和多个追随者副本**组成。
   2. 主副本负责处理读写请求，而追随者副本被动地从主副本同步数据。
   3. 当主副本所在的节点发生故障时，Kafka会自动选举新的主副本，以确保分区的可用性。
3. 同步副本与ISR
   1. **同步副本（In-Sync Replicas, ISR）**是指与主副本保持同步的所有副本集合，通常包括主副本和至少一个追随者副本。
   2. 当消息写入主副本后，追随者副本需要尽快同步这些消息，以进入ISR队列。
   3. Kafka通过监控ISR中的副本来判断分区是否可用。如果主副本不可用且ISR有其他副本，Kafka会从ISR中选举新的主副本。
4. 副本因子（Replication Factor）
   1. 副本因子是指每个分区的副本数量。通常推荐使用3个副本，以在高可用性和存储开销之间达到平衡。
   2. 更高的副本因子可以提供更强的容错性，但也会增加集群的存储需求和同步负载。
5. 副本机制中的一致性
   1. Kafka的副本机制确保了分区的数据在多个副本之间的一致性。生产者可以配置不同的一致性级别：
      1. **acks=0**：不等待主副本确认即可返回。
      2. **acks=1**：仅等待主副本写入完成后返回。
      3. **acks=-1（all）**：等待ISR中的所有副本写入完成后返回，以确保数据可靠性。
   2. 高一致性要求下，Kafka等待所有副本完成写入，以确保数据不会因节点故障而丢失。
6. 故障恢复与副本再平衡
   1. 当节点恢复或新节点加入集群后，Kafka会将缺失的分区副本重新分配到这些节点上。
   2. 副本再平衡的过程会在后台进行，保证集群的负载均衡，提升数据的持久性和分布性。







### 5.Log Compaction



### 6.Quotas








## 1、初级入门

### 1.1、基本概念和架构

Apache Kafka 是最流行的开源流处理软件，用于大规模收集、处理、存储和分析数据。它以其出色的性能、低延迟、容错和高吞吐量而闻名，每秒能够处理数千条消息。Kafka 使用案例超过 1,000 个并且还在不断增加，一些常见的好处是构建数据管道、利用实时数据流、支持运营指标以及跨无数来源的数据集成。

Kafka 是一个分布式系统，由通过高性能[TCP 网络协议进行通信的](https://kafka.apache.org/protocol.html)**服务器**和**客户端**组成。它可以部署在本地和云环境中的裸机硬件、虚拟机和容器上。

**服务器**：Kafka 作为一个或多个服务器集群运行，可以跨越多个数据中心或云区域。其中一些服务器形成存储层，称为代理。其他服务器运行 [Kafka Connect](https://kafka.apache.org/documentation/#connect)以事件流的形式持续导入和导出数据，以将 Kafka 与您现有的系统（例如关系数据库以及其他 Kafka 集群）集成。为了让您实现关键任务用例，Kafka 集群具有高度可扩展性和容错性：如果其中任何一台服务器发生故障，其他服务器将接管它们的工作以确保连续运行而不会丢失任何数据。

**客户端**：它们允许您编写分布式应用程序和微服务，即使在出现网络问题或机器故障的情况下，也能以容错的方式并行、大规模地读取、写入和处理事件流。Kafka 附带了一些这样的客户端，这些客户端由 Kafka 社区提供的[数十个客户端](https://cwiki.apache.org/confluence/display/KAFKA/Clients)进行了扩充：客户端可用于 Java 和 Scala，包括更高级别的 [Kafka Streams](https://kafka.apache.org/documentation/streams/)库，用于 Go、Python、C/C++ 和许多其他编程语言以及 REST API。



1. 主题（Topic）：
   - 主题是Kafka中的核心概念，代表了数据流的分类或者主题。
   - 数据以消息的形式发布到主题，消费者从主题订阅消息进行消费。
   - 主题可以被分为多个分区。
2. 分区（Partition）：
   - 主题可以划分为多个分区，每个分区是数据存储和传输的基本单元。
   - 分区通过一系列有序且不可变的消息日志文件进行存储(保证单个分区的消息顺序性)。
   - 每个分区都有一个唯一的标识符（Partition ID）。
   - 每个分区只能分配给一个消费者实例。
   - 分区越多，fafka集群支持的并行消费能力越强。
3. 生产者（Producer）：
   - 生产者负责将消息发布到Kafka集群的主题中。
   - 生产者可以将消息直接发布到指定的分区，也可以由Kafka自动选择合适的分区。
4. 消费者（Consumer）：
   - 消费者从Kafka集群的主题中订阅消息进行消费。
   - 每个消费者都属于一个消费者组（Consumer Group），消费者组可以包含多个消费者。
   - Kafka通过将分区分配给不同的消费者实现负载均衡和并行处理。
   - 一个消费者可以分配多个分区。
   - 消费者数量大于分区数量，则有消费者空闲。
5. 消费者组（ConsumerGroup）：
   - 每个消费者组相互独立，每个组会独立的从主题的所有分区读取消息。
   - 不指定消费组组名称，则属于默认的Group。
6. 消息服务器（Broker）：
   - Broker是Kafka集群中的一个节点，负责存储和处理消息。
   - 多个Broker组成一个Kafka集群，每个代理可以管理多个主题和分区。
   - 代理之间通过使用Apache ZooKeeper进行协调和元数据管理。
7. ZooKeeper：
   - ZooKeeper是Kafka的关键组件之一，用于管理和协调Kafka集群的状态和元数据。
   - 它负责追踪代理的健康状态、分区的分配和消费者组的协调。
   - ZooKeeper还用于选举集群中的控制器（Controller），控制器负责管理分区的领导者和副本。



### 1.2、安装和配置Kafka

下载地址：https://www.apache.org/dyn/closer.cgi?path=/kafka/3.5.0/kafka_2.13-3.5.0.tgz

~~~bash
cd /usr/local
tar -xzf kafka_2.13-3.5.0.tgz
cd kafka_2.13-3.5.0/

# 安装kafka环境：ZooKeeper or KRaft
# 1.ZooKeeper
bin/zookeeper-server-start.sh config/zookeeper.properties
nohup bin/zookeeper-server-start.sh config/zookeeper.properties > log/zookeeper.log 2>&1 &

# 另一个窗口执行命令
bin/kafka-server-start.sh config/server.properties
nohup bin/kafka-server-start.sh config/server.properties > log/kafka.log 2>&1 &

bin/kafka-server-start.sh k9093/server.properties

# 提示没有足够的内存去执行java程序
# 打开bin/kafka-server-start.sh将-Xmx -Xms内存调小

free -h #查询服务器内存情况

~~~

![提示java内存不足](http://47.101.155.205/image-20230716171542492.png)





~~~bash
# 删除kafka数据
rm -rf /tmp/kafka-logs /tmp/zookeeper /tmp/kraft-combined-logs

~~~



#### Zookeeper集群

~~~zoo.cfg
# 修改配置
# 默认指向/tmp目录，修改其指向其它目录
dataDir=/path

# 新增配置
# 指定Zookeeper集群中的Serverr节点，2888表示集群内Server节点通信端口，Leader将监听此端口；3888用于选举Leader
server.1=hostname1:2888:3888
server.2=hostname2:2888:3888
server.3=hostname3:2888:3888

~~~

在dataDir配置目录下新建myid文件，hostname1、hostname2、hostname3各输入内容1、2、3。

~~~bash
# 配置Zookeeper环境变量
ZOOKEEPER_HOME=/path
export ZOOKEEPER_HOME
PATH=$ZOOKEEPER/bin:$PATH

source profile

# 启动
zkServer.sh start

~~~



#### Kafka集群

修改kafka的config/server.properties配置

~~~properties
# zookeeper集群地址
zookeeper.connect=hostname1:2181,hostname2:2181,hostname3:2181

~~~



~~~bash
bin/kafka-server-start.sh config/server.properties &

~~~





### Windows启动zookeeper命令

~~~bash
"C:\Program Files\Java\jdk1.8.0_101/bin/java" -Xmx512M -Xms512M -server -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -Djava.awt.headless=true -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false  -Dcom.sun.management.jmxremote.ssl=false -Dkafka.logs.dir="D:\kafka_2.13-3.6.1/logs" "-Dlog4j.configuration=file:D:\kafka_2.13-3.6.1\bin\windows\../../config/log4j.properties" -cp "D:\environment\kafka_2.13-3.6.1\libs;D:\environment\mysql-connector-java-5.1.23-bin.jar;.;;"D:\kafka_2.13-3.6.1\libs\activation-1.1.1.jar";"D:\kafka_2.13-3.6.1\libs\aopalliance-repackaged-2.6.1.jar";"D:\kafka_2.13-3.6.1\libs\argparse4j-0.7.0.jar";"D:\kafka_2.13-3.6.1\libs\audience-annotations-0.12.0.jar";"D:\kafka_2.13-3.6.1\libs\caffeine-2.9.3.jar";"D:\kafka_2.13-3.6.1\libs\checker-qual-3.19.0.jar";"D:\kafka_2.13-3.6.1\libs\commons-beanutils-1.9.4.jar";"D:\kafka_2.13-3.6.1\libs\commons-cli-1.4.jar";"D:\kafka_2.13-3.6.1\libs\commons-collections-3.2.2.jar";"D:\kafka_2.13-3.6.1\libs\commons-digester-2.1.jar";"D:\kafka_2.13-3.6.1\libs\commons-io-2.11.0.jar";"D:\kafka_2.13-3.6.1\libs\commons-lang3-3.8.1.jar";"D:\kafka_2.13-3.6.1\libs\commons-logging-1.2.jar";"D:\kafka_2.13-3.6.1\libs\commons-validator-1.7.jar";"D:\kafka_2.13-3.6.1\libs\connect-api-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-basic-auth-extension-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-file-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-json-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-mirror-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-mirror-client-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-runtime-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\connect-transforms-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\error_prone_annotations-2.10.0.jar";"D:\kafka_2.13-3.6.1\libs\hk2-api-2.6.1.jar";"D:\kafka_2.13-3.6.1\libs\hk2-locator-2.6.1.jar";"D:\kafka_2.13-3.6.1\libs\hk2-utils-2.6.1.jar";"D:\kafka_2.13-3.6.1\libs\jackson-annotations-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-core-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-databind-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-dataformat-csv-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-datatype-jdk8-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-jaxrs-base-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-jaxrs-json-provider-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-module-jaxb-annotations-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jackson-module-scala_2.13-2.13.5.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.activation-api-1.2.2.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.annotation-api-1.3.5.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.inject-2.6.1.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.validation-api-2.0.2.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.ws.rs-api-2.1.6.jar";"D:\kafka_2.13-3.6.1\libs\jakarta.xml.bind-api-2.3.3.jar";"D:\kafka_2.13-3.6.1\libs\javassist-3.29.2-GA.jar";"D:\kafka_2.13-3.6.1\libs\javax.activation-api-1.2.0.jar";"D:\kafka_2.13-3.6.1\libs\javax.annotation-api-1.3.2.jar";"D:\kafka_2.13-3.6.1\libs\javax.servlet-api-3.1.0.jar";"D:\kafka_2.13-3.6.1\libs\javax.ws.rs-api-2.1.1.jar";"D:\kafka_2.13-3.6.1\libs\jaxb-api-2.3.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-client-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-common-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-container-servlet-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-container-servlet-core-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-hk2-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jersey-server-2.39.1.jar";"D:\kafka_2.13-3.6.1\libs\jetty-client-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-continuation-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-http-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-io-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-security-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-server-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-servlet-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-servlets-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-util-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jetty-util-ajax-9.4.52.v20230823.jar";"D:\kafka_2.13-3.6.1\libs\jline-3.22.0.jar";"D:\kafka_2.13-3.6.1\libs\jopt-simple-5.0.4.jar";"D:\kafka_2.13-3.6.1\libs\jose4j-0.9.3.jar";"D:\kafka_2.13-3.6.1\libs\jsr305-3.0.2.jar";"D:\kafka_2.13-3.6.1\libs\kafka-clients-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-group-coordinator-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-log4j-appender-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-metadata-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-raft-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-server-common-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-shell-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-storage-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-storage-api-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-streams-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-streams-examples-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-streams-scala_2.13-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-streams-test-utils-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-tools-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka-tools-api-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\kafka_2.13-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\lz4-java-1.8.0.jar";"D:\kafka_2.13-3.6.1\libs\maven-artifact-3.8.8.jar";"D:\kafka_2.13-3.6.1\libs\metrics-core-2.2.0.jar";"D:\kafka_2.13-3.6.1\libs\metrics-core-4.1.12.1.jar";"D:\kafka_2.13-3.6.1\libs\netty-buffer-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-codec-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-common-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-handler-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-resolver-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-transport-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-transport-classes-epoll-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-transport-native-epoll-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\netty-transport-native-unix-common-4.1.100.Final.jar";"D:\kafka_2.13-3.6.1\libs\osgi-resource-locator-1.0.3.jar";"D:\kafka_2.13-3.6.1\libs\paranamer-2.8.jar";"D:\kafka_2.13-3.6.1\libs\pcollections-4.0.1.jar";"D:\kafka_2.13-3.6.1\libs\plexus-utils-3.3.1.jar";"D:\kafka_2.13-3.6.1\libs\reflections-0.10.2.jar";"D:\kafka_2.13-3.6.1\libs\reload4j-1.2.25.jar";"D:\kafka_2.13-3.6.1\libs\rocksdbjni-7.9.2.jar";"D:\kafka_2.13-3.6.1\libs\scala-collection-compat_2.13-2.10.0.jar";"D:\kafka_2.13-3.6.1\libs\scala-java8-compat_2.13-1.0.2.jar";"D:\kafka_2.13-3.6.1\libs\scala-library-2.13.11.jar";"D:\kafka_2.13-3.6.1\libs\scala-logging_2.13-3.9.4.jar";"D:\kafka_2.13-3.6.1\libs\scala-reflect-2.13.11.jar";"D:\kafka_2.13-3.6.1\libs\slf4j-api-1.7.36.jar";"D:\kafka_2.13-3.6.1\libs\slf4j-reload4j-1.7.36.jar";"D:\kafka_2.13-3.6.1\libs\snappy-java-1.1.10.5.jar";"D:\kafka_2.13-3.6.1\libs\swagger-annotations-2.2.8.jar";"D:\kafka_2.13-3.6.1\libs\trogdor-3.6.1.jar";"D:\kafka_2.13-3.6.1\libs\zookeeper-3.8.3.jar";"D:\kafka_2.13-3.6.1\libs\zookeeper-jute-3.8.3.jar";"D:\kafka_2.13-3.6.1\libs\zstd-jni-1.5.5-1.jar""  org.apache.zookeeper.server.quorum.QuorumPeerMain zookeeper.properties

~~~







### 1.3、Kafka基本操作

- 创建主题、发送和接收消息
- 管理消费组
- ...

~~~bash
# 创建topic
bin/kafka-topics.sh --create --topic <topic> --bootstrap-server localhost:9092

# 查询topic
bin/kafka-topics.sh --describe --topic <topic> --bootstrap-server localhost:9092

# 生产者 持久会话 ctrl+c结束
bin/kafka-console-producer.sh --topic <topic> --bootstrap-server localhost:9092
bin/kafka-console-producer.sh --topic start_01 --bootstrap-server localhost:9092

# 消费者 
bin/kafka-console-consumer.sh --topic <topic> --from-beginning --bootstrap-server localhost:9092
bin/kafka-console-consumer.sh --topic start_01 --from-beginning --bootstrap-server localhost:9092

~~~

![image-20230716191455921](http://47.101.155.205/image-20230716191455921.png)



~~~bash
# 往config/connect-standalone.properties中追加写入文本
echo "plugin.path=libs/connect-file-3.5.0.jar" >> config/connect-standalone.properties

bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties

bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning


~~~



#### topic命令

~~~bash
# 查询topic topic的名称
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

# 创建topic
bin/kafka-topics.sh --create --topic org.test1 --bootstrap-server localhost:9092
# 指定分区副本数2，topic的分区有3个
bin/kafka-topics.sh --create --zookeeper zookeeperHost:2181 --replication-factor 2 --partitions 3 --topic org.test2 


# 查询topic信息
bin/kafka-topics.sh --describe --topic org.test1 --bootstrap-server localhost:9092

~~~



#### producer

~~~bash
bin/kafka-console-producer.sh --topic org.test1 --bootstrap-server localhost:9092

bin/kafka-console-producer.sh --broker-list localhost:9092 --topic org.test2

~~~



#### consumer

~~~bash
# 从开始位置消费
bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server localhost:9092

# 显示key消费
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning print.key=true --topic org.test2

# 重置消费者组偏移量 消费者停止才能重置
bin/kafka-consumer-groups.sh --bootstrap-server oycm:9092 --group <group_name> --reset-offsets --to-latest --all-topics --execute
bin/kafka-consumer-groups.sh --bootstrap-server oycm:9092 --group test1 --reset-offsets --to-latest --all-topics --execute

# 查询kafka消费者组的偏移量
bin/kafka-consumer-groups.sh --bootstrap-server <kafka-bootstrap-server> --group <consumer-group> --describe
bin/kafka-consumer-groups.sh --bootstrap-server oycm:9092 --group test1 --describe


~~~



#### admin

~~~bash
bin/kafka-administration.sh --bootstrap-server <kafka-bootstrap-server> --trigger-rebalance --group <consumer-group>
bin/kafka-administration.sh --bootstrap-server oycm:9092 --trigger-rebalance --group test1

~~~







### 1.4、Kafka生产者API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/producer/KafkaProducer.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~



### 1.5、Kafka消费者API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/consumer/KafkaConsumer.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~





### 1.6、Kafka Stream流API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/streams/KafkaStreams.html

相关文档：https://kafka.apache.org/35/documentation/streams/

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-streams</artifactId>
	<version>3.5.0</version>
</dependency>

~~~


### 1.7、Connect API

Connect API 允许实现不断从某个源数据系统拉入 Kafka 或从 Kafka 推送到某个接收器数据系统的连接器。

文档地址：https://kafka.apache.org/documentation.html#connect




### 1.8、Admin API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/admin/Admin.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~



### 1.9、Spring for Kafka

Spring官网：https://spring.io/projects/spring-kafka

Spring for Kafka资料：https://docs.spring.io/spring-boot/docs/current/reference/html/messaging.html#messaging.kafka



在Spring中，可以通过注入NewTopic对象在启动是创建kafka Topic，如果这个Topic存在，则忽略这个Bean，不存在则创建。

> 服务器配置

~~~properties
listeners=PLAINTEXT://ip:9092 # 要想其他服务器能连接上kafka，这个ip不能配置成localhost会导致消费者找不到对应的服务端，需要配置成对应的ip才可以


~~~





> 发送消息

~~~java
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public MyBean(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void someMethod() {
        this.kafkaTemplate.send("someTopic", "Hello");
    }

}

~~~



> 接收消息

~~~java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    @KafkaListener(topics = "someTopic")
    public void processMessage(String content) {
        // ...
    }

}

~~~

有自定义KafkaTransactionManager对象，他会自动关联到容器工厂。

RecordFilterStrategy、CommonErrorHandler、AfterRollbackProcessor、ConsumerAwareRebalanceListener对象被定义，会被自动关联到默认的工厂。



### 1.10、Kafka可视化插件

#### kafdrop

kafdrop：https://github.com/obsidiandynamics/kafdrop

docker地址：https://hub.docker.com/r/obsidiandynamics/kafdrop

docker pull：docker pull obsidiandynamics/kafdrop

~~~bash
# docker 启动命令
docker run -d --rm -p 9000:9000 \
    -e KAFKA_BROKERCONNECT=localhost:9092 \
    -e JVM_OPTS="-Xms32M -Xmx64M" \
    -e SERVER_SERVLET_CONTEXTPATH="/" \
    obsidiandynamics/kafdrop:latest


~~~

启动之后访问地址为：http://localhost:9000

~~~bash
docker run -d --rm -p 9000:9000 \
    -e KAFKA_BROKERCONNECT=134.175.152.74:9092 \
    -e JVM_OPTS="-Xms32M -Xmx64M" \
    -e SERVER_SERVLET_CONTEXTPATH="/" \
    obsidiandynamics/kafdrop

~~~

![image-20230807213807936](http://47.101.155.205/image-20230807213807936.png)









#### 拉取项目

1. maven依赖io.confluent:kafka-protobuf-serializer:jar:7.4.1未找到
2. maven的package打包失败提示乱码
3. 

![image-20230806103702089](http://47.101.155.205/image-20230806103702089.png)



![maven项目配置的仓库地址](http://47.101.155.205/image-20230806105026798.png)



## 2、核心概念

### 2.1、Kafka主题和分区

- 了解主题和分区的概念和原理
- ...



### 2.2、生产者和消费者详解

- 生产者配置和消息发送
- 消费者配置和消息消费
- ...

### 2.3、消息传递模式

- 点对点模式
- 发布/订阅模式
- ...

### 2.4、Kafka配置

#### 2.4.1、Broker节点

~~~properties
auto.create.topics.enable=true # 默认true，在服务端启用自动创建topic
auto.leader.rebalance.enable=true # 默认true，自动leader平衡
background.threads=10 # 默认10，后台处理各种任务的线程数
# 默认-1，int类型，如果未设置，生成的id从reserved.broker.max.id+1
# 表示broker的id号，kafka集群中，不同的broker应该具有不同的id号，不能重复
broker.id=-1 
compression.type=producer # 指定topic的压缩类型，gzip snappy lz4 zstd uncompressed,producer指保留生产者原始编码，是保留生产者发送消息至topic的压缩方式
controller.quorum.election.backoff.max.ms=1000 # 默认1000,开始新选举前的最大时间
controller.quorum.election.timeout.ms=1000 # 默认1000,在触发新的选举之前,等待无法从leader获取的最大时间
controller.quorum.fetch.timeout.ms=2000 # 默认2000
controller.quorum.voters=1@localhost:9092,2@localhost:9093,3@localhost:9094 # 
delete.topic.enable=true # 默认true,如果这个关闭,通过管理删除topic没有作用
early.start.listeners=String # null
leader.imbalance.check.interval.seconds=300 # default 控制器触发分区平衡的频率
leader.imbalance.per.broker.percentage=10 # default 不平衡的比例阈值

advertised.listeners=String # null 和监听器相关，默认null.如果与监听器配置属性不同,监听器发布到ZooKeeper供客户端连接使用.如果没有配置,会使用listeners的值.如果listenrs配置成包含0.0.0.0,并且这个配置没有配置,这里会导致kafka-server启动失败,这个配置对与这个属性是无效的.
listeners=PLAINTEXT://9092 # 启动之后,本地的连接能够访问到,但是远程连接访问不到
# PLAINTEXT://0.0.0.0:9092,需要修改上面的属性值暴露ip,不然服务无法起来
# listeners=PLAINTEXT://myhost:9092,启动的主机名必须是oycm才能启动

#保留kafka日志数据的目录地址
log.dir=/tmp/kafka-logs 
log.dirs=String # null,存储日志的列表

log.flush.interval.messages=9223372036854775807 # default 在将消息刷新到磁盘之前，日志分区上累计的消息数
log.flush.interval.ms=null # long,在任何topic中的消息刷新到磁盘之前，保存在内存中的最长时间，没有设置则使用log.flush.scheduler.interval.ms的值
log.flush.offset.checkpoint.interval.ms=60000 # 我们更新作为日志恢复点的最后一次刷新的持久记录的频率
log.flush.scheduler.interval.ms=9223372036854775807 # 日志刷新程序检查是否需要将日志刷新到磁盘的频率
log.flush.start.offset.checkpoint.interval.ms=60000 # 更新日志开始偏移量的持久记录的频率
# 日志保留相关
log.retention.bytes=-1 # 日志删除前的最大容量
log.retention.hours=168 # 删除日志文件之前保留它的小时数,优先级:3
log.retention.minutes=null # int 优先级:2
log.retention.ms=null # int 优先级:1,-1表示没有时间限制
log.roll.hours=168 # default 日志压缩(新日志出来之前的时间)
log.roll.ms=null # 
log.roll.jitter.hours=0 #
log.roll.jitter.ms=null #
log.segment.bytes=1073741824 # 1GB 单个最大的日志文件大小
log.segment.delete.delay.ms=60000 # 从文件系统中删除文件之前等待的时间

# Kafka允许的最大记录批大小(如果启用压缩，则在压缩后)
message.max.bytes=1048588 

metadata.log.dir=null # Kraft模式下的元数据日志，没有则在log.dirs的第一个目录中
metadata.log.max.record.bytes.between.snapshots=20971520 # 大小控制快照生成
metadata.log.max.snapshot.interval.ms=3600000 #时间控制快照生成
metadata.log.segment.bytes=1073741824 #1GB
metadata.log.segment.ms=604800000  # 7天 滚出新的元数据日志文件之前的最长时间
metadata.max.retention.bytes=104857600 # 在删除旧快照和日志文件之前，元数据日志和快照的最大组合大小
metadata.max.retention.ms=604800000 # 元数据日志文件或快照在删除之前保留的毫秒数

min.insync.replicas=1 #

node.id=-1 # Kraft需要

num.io.threads=8 # 服务器用于处理请求的线程数，其中可能包括磁盘I/O
num.network.threads=3 # 服务器用于从网络接收请求并向网络发送响应的线程数。注意:每个侦听器(控制器侦听器除外)都创建自己的线程池
num.recovery.threads.per.data.dir=1 # 启动时用于日志恢复和关闭时用于刷新的每个数据目录的线程数
num.replica.alter.log.dirs.threads=null # 可以在日志目录之间移动副本的线程数，其中可能包括磁盘I/O
num.replica.fetchers=1

offset.metadata.max.bytes=4096 # 与偏移量提交相关联的元数据条目的最大大小

offsets.commit.required.acks=-1 # 提交之前需要的ack可以被接受。一般来说，默认值(-1)不应该被重写
offsets.commit.timeout.ms=5000 # 偏移量提交将被延迟,直到偏移量主题的所有副本收到提交或达到此超时.这类似于生产者请求超时
offsets.load.buffer.size=5242880 # 当将偏移量加载到缓存中时,从偏移量段读取的批处理大小(软限制，如果记录太大则覆盖).
offsets.retention.check.interval.ms=600000 # 检查陈旧偏移量的频率
offsets.retention.minutes=10080 #
offsets.topic.compression.codec=0 # 
offsets.topic.num.partitions=50 # 偏移提交主题的分区数(部署后不应更改)
offsets.topic.replication.factor=3 # 偏移主题的复制因子(设置更高以确保可用性).在集群大小满足此复制因子要求之前,内部主题创建将失败
offsets.topic.segment.bytes=104857600 # 100MB 偏移量主题段字节应该保持相对较小,以促进更快的日志压缩和缓存负载

process.roles= # list [broker, controller],Kraft集群需要

queued.max.requests=500 # 在阻塞网络线程之前，数据平面允许的排队请求数

replica.fetch.min.bytes=1 # 每个获取响应所需的最小字节数.如果没有足够的字节,则等待到replica.fetch.wait.max.ms
replica.fetch.wait.max.ms=500 # <replica.lag.time.max.ms 后续副本发出的每个获取请求的最大等待时间
replica.high.watermark.checkpoint.interval.ms=500 # 高水位数据保存到磁盘的频率
replica.lag.time.max.ms=30000 # 如果一个follower没有发送任何fetch请求，或者至少在这段时间内没有消耗到leader的日志结束偏移量,那么leader将从ISR中删除该follower
replica.socket.receive.buffer.bytes=65536 # 64Kb 
replica.socket.timeout.ms=30000 # 网络请求的套接字超时,它的值至少应该是replica.fetch.wait.max.ms

request.timeout.ms=30000 # 配置控制客户端等待请求响应的最大时间,客户端可能会再次发起请求和最大重试次数相关

sasl.mechanism.controller.protocol=GSSAPI # SASL机制用于与控制器通信

socket.receive.buffer.bytes=102400 # 100Kb 套接字服务器套接字的SO_RCVBUF缓冲区.如果取值为-1,则使用操作系统默认值.
# 100Mb 套接字请求中的最大字节数，要大于message.max.bytes，创建的topic可以覆盖此配置
socket.request.max.bytes=104857600 
socket.send.buffer.bytes==102400 # 100Kb 套接字服务器套接字的SO_SNDBUF缓冲区.如果取值为-1,则使用操作系统默认值.

transaction.max.timeout.ms=900000 #15m 事务允许的最大超时.如果客户端请求的事务时间超过此时间，则代理将在InitProducerIdRequest中返回错误.客户端超时时间过大，会使消费者从事物主题中读取数据陷入停顿.
transaction.state.log.load.buffer.size=5242880 # 当将生产者id和事务加载到缓存中时，从事务日志段读取的批处理大小
transaction.state.log.min.isr=2 # 覆盖事务主题的min.sync.replicas配置
transaction.state.log.num.partitions=50 # 事务主题的分区数(部署之后不因该改变)
transaction.state.log.replication.factor=3 # 事务主题的复制因子
transaction.state.log.segment.bytes=104857600 # 100Mb 事务主题段字节应该保持相对较小,以促进更快的日志压缩和缓存负载
transactional.id.expiration.ms=604800000 #7d 在事务id过期之前，事务协调器在不接收当前事务的任何事务状态更新的情况下等待的时间(毫秒)。事务id在事务仍在进行时不会过期。

unclean.leader.election.enable=false # 指示是否使不在ISR集中的副本作为最后手段被选举为leader，即使这样做可能导致数据丢失

# 表示连接zookeeper集群的地址
zookeeper.connect=null # string
zookeeper.connection.timeout.ms=null # int 客户端等待与zookeeper建立连接的最长时间.如果没有设置,则使用zookeeper.session.timeout.ms中的值
zookeeper.session.timeout.ms=18000 # Zookeeper会话超时
zookeeper.max.in.flight.requests=10 # 在阻塞之前,客户端将发送给Zookeeper的未确认请求的最大数量
zookeeper.metadata.migration.enable=false # 启用ZK向KRaft迁移
zookeeper.set.acl=false # 设置客户端使用安全ACLs

broker.heartbeat.interval.ms=2000 # 代理心跳之间的时间长度.在KRaft模式下运行时使用.
broker.id.generation.enable=true # 在服务器上启用自动生成代理id.启用后，应该检查为reserved.broker.max.id配置的值.
reserved.broker.max.id=1000 # 可用于broker.id的最大号码
broker.rack=null # string
broker.session.timeout.ms=9000 # KRaft 

connections.max.idle.ms=600000 # 空闲连接超时:服务器套接字处理器线程关闭空闲超过此时间的连接
connections.max.reauth.ms=0 # 

controlled.shutdown.enable=true # 启用服务器的受控关闭
controlled.shutdown.max.retries=3 # 受控关闭重试次数
controlled.shutdown.retry.backoff.ms=5000 # 重试等待时间

controller.quorum.append.linger.ms=25 # 在将写数据刷新到磁盘之前,leader等待写数据累积的持续时间
controller.quorum.request.timeout.ms=2000 # 配置控制客户端等待请求响应的最大时间

controller.socket.timeout.ms=30000 # 控制器到代理通道的套接字超时

default.replication.factor=1 # 自动创建主题的默认复制因子

delegation.token.expiry.time.ms=86400000 # 令牌在需要更新之前的有效时间
delegation.token.master.key=null # password 弃用 使用delegation.token.secret.key
delegation.token.secret.key=null # password 生成和验证委托令牌的密钥,密钥未设置或设置为空字符串,delegation token禁用
delegation.token.max.lifetime.ms=604800000 # 7d 令牌有一个最大生存期，超过这个生存期就不能更新了

delete.records.purgatory.purge.interval.requests=1 # 删除记录请求炼狱的清除间隔

fetch.max.bytes=57671680 # 55MB 我们将为获取请求返回的最大字节数.必须至少为1024.
fetch.purgatory.purge.interval.requests=1 #获取请求炼狱的清除间隔(以请求数为单位)

# 和消费者加入消费组有关
group.initial.rebalance.delay.ms=3000 # ms在执行第一次再平衡之前,组协调器等待更多使用者加入新组所需的时间 
group.max.session.timeout.ms=1800000 # 注册消费者允许的最大会话超时
group.max.size=2147483647 # 单个消费者组可以容纳的最大消费者数量
group.min.session.timeout.ms=6000 # 注册消费者允许的最小会话超时

initial.broker.registration.timeout.ms=60000 # 最初向控制器仲裁注册时,在声明失败和退出代理进程之前等待的毫秒数

inter.broker.listener.name=null #string 用于代理之间通信的侦听器名称
inter.broker.protocol.version=3.5-IV2

log.cleaner.backoff.ms=15000 # 当没有日志需要清理时的睡眠时间
log.cleaner.dedupe.buffer.size=134217728 # 跨所有清理器线程用于日志重复删除的总内存
log.cleaner.delete.retention.ms=86400000 # 为日志压缩主题保留删除墓碑标记的时间
log.cleaner.enable=true # 启用日志清理器进程在服务器上运行
log.cleaner.io.buffer.load.factor=0.9 # 日志清理器删除缓冲区负载因子
log.cleaner.io.buffer.size=524288 # 所有清理器线程中用于日志清理器I/O缓冲区的总内存
log.cleaner.io.max.bytes.per.second=1.7976931348623157E308 #将对日志清理器进行节流,使其读i/o和写i/o的总和平均小于此值
log.cleaner.max.compaction.lag.ms=9223372036854775807 # 消息在日志中不适合进行压缩的最长时间
log.cleaner.min.cleanable.ratio=0.5 # 符合清洗条件的日志的脏日志与总日志的最小比率
log.cleaner.min.compaction.lag.ms=0 # 消息在日志中保持未压缩状态的最短时间
log.cleaner.threads=1 # 用于日志清理的后台线程数
log.cleanup.policy=delete # 保留窗口以外的段的默认清理策略

log.index.interval.bytes=4096 # 4Kb 向偏移索引添加一个表项的时间间隔
log.index.size.max.bytes=10485760 # 10Mb 偏移索引的最大字节数

log.message.format.version=3.0-IV1
log.message.timestamp.difference.max.ms=9223372036854775807 #代理接收消息时允许的时间戳与消息中指定的时间戳的最大差异
log.message.timestamp.type=CreateTime # [CreateTime, LogAppendTime]

log.preallocate=false # 创建新段时是否需要预先分配文件,windows需要设置为true

log.retention.check.interval.ms=300000 # 日志清除程序检查是否有日志符合删除条件的频率

max.connection.creation.rate=2147483647 # 在任何时候，我们在代理中允许的最大连接创建速率
max.connections=2147483647 # 任何时候代理中允许的最大连接数
max.connections.per.ip=2147483647 # 我们允许每个ip地址的最大连接数
max.connections.per.ip.overrides=null # string 每个ip或主机名的逗号分隔列表覆盖到默认的最大连接数 hostName:100,
max.incremental.fetch.session.cache.slots=1000 # 我们将维护的增量获取会话的最大数量

# 每个主题的默认日志分区数
num.partitions=1 

password.encoder.old.secret=null # password 用于编码动态配置的密码的旧密钥
password.encoder.secret=null # password 用于为此代理对动态配置的密码进行编码的密钥

principal.builder.class=org.apache.kafka.common.security.authenticator.DefaultKafkaPrincipalBuild

producer.purgatory.purge.interval.requests=1000 # 生产者请求炼狱的清除间隔

queued.max.request.bytes=-1 # 在不再读取请求之前允许的队列字节数

replica.fetch.backoff.ms=1000 # 读取分区错误发生时的睡眠时间
replica.fetch.max.bytes=1048576 # 1Mb 试图为每个分区获取的消息字节数
replica.fetch.response.max.bytes=10485760  # 10Mb 整个读取响应的最大字节数
replica.selector.class=null # string 实现ReplicaSelector类的全路径名称

sasl.client.callback.handler.class=null # class 
sasl.enabled.mechanisms=GSSAPI #list
sasl.jaas.config=null #password
sasl.kerberos.kinit.cmd=/usr/bin/kinit
sasl.kerberos.min.time.before.relogin=60000
sasl.kerberos.principal.to.local.rules=DEFAULT # list
sasl.kerberos.service.name=null #string
sasl.kerberos.ticket.renew.jitter=0.05
sasl.kerberos.ticket.renew.window.factor=0.8
sasl.login.callback.handler.class=null #class
sasl.login.class=null #class
sasl.login.refresh.buffer.seconds=300
sasl.login.refresh.min.period.seconds=60
sasl.login.refresh.window.factor=0.8
sasl.login.refresh.window.jitter=0.05
sasl.mechanism.inter.broker.protocol=GSSAPI
sasl.oauthbearer.jwks.endpoint.url=null # string
sasl.oauthbearer.token.endpoint.url=null # string
sasl.server.callback.handler.class=null #class
sasl.server.max.receive.size=524288

security.inter.broker.protocol=PLAINTEXT #用于在代理之间通信的安全协议 [PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL]

socket.connection.setup.timeout.max.ms=30000 # 客户端等待套接字连接建立的最长时间
socket.connection.setup.timeout.ms=10000 #10s

socket.listen.backlog.size=50 # 套接字上挂起连接的最大数目

ssl.cipher.suites= # list
ssl.client.auth=none # [required, requested, none]
ssl.enabled.protocols=TLSv1.2
ssl.key.password=null #password
ssl.keymanager.algorithm=SunX509
ssl.keystore.certificate.chain=null #password
ssl.keystore.key=null #password
ssl.keystore.location=null #string
ssl.keystore.password=null #password
ssl.keystore.type=JKS
ssl.protocol=TLSv1.2
ssl.provider=null #string
ssl.trustmanager.algorithm=PKIX
ssl.truststore.certificates=null #password
ssl.truststore.location=null #string
ssl.truststore.password=null #password
ssl.truststore.type=JKS

sasl.login.connect.timeout.ms=null #int
sasl.login.read.timeout.ms=null #int
sasl.login.retry.backoff.max.ms=10000 
sasl.login.retry.backoff.ms=100
sasl.oauthbearer.clock.skew.seconds=30
sasl.oauthbearer.expected.audience=null #list
sasl.oauthbearer.expected.issuer=null #string
sasl.oauthbearer.jwks.endpoint.refresh.ms=3600000 
sasl.oauthbearer.jwks.endpoint.retry.backoff.max.ms=10000 
sasl.oauthbearer.jwks.endpoint.retry.backoff.ms=100
sasl.oauthbearer.scope.claim.name=scope
sasl.oauthbearer.sub.claim.name=sub

zookeeper.clientCnxnSocket=null #string
zookeeper.ssl.client.enable=false # 
zookeeper.ssl.keystore.location=null # string
zookeeper.ssl.keystore.password=null #password
zookeeper.ssl.keystore.type=null # string
zookeeper.ssl.truststore.location=null # string
zookeeper.ssl.truststore.password=null #password
zookeeper.ssl.truststore.type=null # string

alter.config.policy.class.name=null # class org.apache.kafka.server.policy.AlterConfigPolicy
alter.log.dirs.replication.quota.window.num=11 # 为alter log dirs复制配额保留在内存中的样本数量
alter.log.dirs.replication.quota.window.size.seconds=1 # alter log dirs复制配额的每个样本的时间跨度

authorizer.class.name= #string 实现org.apache.kafka.server.authorizer.Authorize接口

auto.include.jmx.reporter=true

client.quota.callback.class=null #class

connection.failed.authentication.delay.ms=100

controller.quorum.retry.backoff.ms=20
controller.quota.window.num=11
controller.quota.window.size.seconds=1

create.topic.policy.class.name=null # class 创建topic的策略类 org.apache.kafka.server.policy.CreateTopicPolicy

delegation.token.expiry.check.interval.ms=3600000 # 1h 删除过期委托令牌的扫描间隔

kafka.metrics.polling.interval.secs=10 # 度量轮询间隔
kafka.metrics.reporters= #list

listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL #监听器名称和安全协议之间的映射

log.message.downconversion.enable=true # 此配置控制是否启用消息格式的向下转换以满足消费者请求

metadata.max.idle.interval.ms=500 # 该配置控制活动控制器向元数据分区写入无操作记录的频率,0, no-op records 不追加

metric.reporters= #list 
metrics.num.samples=2 # 
metrics.recording.level=INFO
metrics.sample.window.ms=30000 

password.encoder.cipher.algorithm=AES/CBC/PKCS5Padding # 用于编码动态配置的密码的Cipher算法
password.encoder.iterations=4096 # 用于编码动态配置的密码的迭代计数
password.encoder.key.length=128 # 用于对动态配置的密码进行编码的密钥长度
password.encoder.keyfactory.algorithm=null #string 用于编码动态配置的密码的SecretKeyFactory算法

producer.id.expiration.ms=86400000 # 主题分区leader在生产者id过期之前等待的时间

quota.window.num=11 #为客户端配额保留在内存中的样本数量
quota.window.size.seconds=1 # 客户端配额的每个样本的时间跨度

replication.quota.window.num=11
replication.quota.window.size.seconds=1

security.providers=null # string org.apache.kafka.common.security.auth.SecurityProviderCreator

ssl.endpoint.identification.algorithm=https # 
ssl.engine.factory.class=null # class
ssl.principal.mapping.rules=DEFAULT
ssl.secure.random.implementation=null #string

transaction.abort.timed.out.transaction.cleanup.interval.ms=10000 # 回滚已超时事务的时间间隔
transaction.remove.expired.transaction.cleanup.interval.ms=3600000 # 删除由于传递transaction.id.expire.ms而过期的事务的时间间隔

zookeeper.ssl.cipher.suites=null #list
zookeeper.ssl.crl.enable=false
zookeeper.ssl.enabled.protocols=null #list
zookeeper.ssl.endpoint.identification.algorithm=HTTPS
zookeeper.ssl.ocsp.enable=false
zookeeper.ssl.protocol=TLSv1.2


~~~



> 关注点配置

~~~properties
replica.fetch.min.bytes
fetch.max.bytes

~~~







> 在线更新配置

read-only：需要重启更新配置

per-broker：支持动态更新

cluster-wide：

~~~bash
# 更改代理id为0的当前代理配置
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-name 0 --alter --add-config log.cleaner.threads=2

# 描述代理id为0的动态配置
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-name 0 --describe

# 删除代理id为0的动态配置，修改为默认值
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-name 0 --alter --delete-config log.cleaner.threads

# 修改集群的所有broker的log.cleaner.threads
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-default --alter --add-config log.cleaner.threads=2

# 描述当前配置的动态集群范围默认配置
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-default --describe

~~~

![image-20230730183759057](http://47.101.155.205/image-20230730183759057.png)

![image-20230730183959271](http://47.101.155.205/image-20230730183959271.png)



从Kafka 2.0.0版本开始，当配置unclean.leader.election.enable被动态更新时，控制器会自动启用不洁领袖选举。在Kafka 1.1版本中。因此，对unclean.leader.election.enable的更改只有在选出新的控制器时才生效。执行以下命令可以强制控制器重新选举:

~~~bash
bin/zookeeper-shell.sh localhost
  rmr /controller

~~~

![Updating Log Cleaner Configs](http://47.101.155.205/image-20230730184246735.png)

![Updating Thread Configs](http://47.101.155.205/image-20230730184307697.png)

![Updating ConnectionQuota Configs](http://47.101.155.205/image-20230730184320874.png)



![Adding and Removing Listeners](http://47.101.155.205/image-20230730184339422.png)



![image-20230807213000843](http://47.101.155.205/image-20230807213000843.png)



~~~bash
这样配置,bin/kafka-server-start.sh config/server.properties启动的服务器主机名需要改为oycm.sudo hostnamectl set-hostname <newhostname>可以修改主机名.下面的那一行配置是可以让其他服务器监听到kafka.
同时bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server oycm:9092命令也需要改为oycm才能连接到.否则启动不来.

~~~

![image-20230807213250301](http://47.101.155.205/image-20230807213250301.png)

![image-20230807213759927](http://47.101.155.205/image-20230807213759927.png)

#### 2.4.2、Topic配置

服务器对topic有默认的配置，也可以单独给topic怎加配置。可以通过在创建topic时通过--config覆盖配置。

~~~properties
# 创建my-topic时修改配置
bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic my-topic --partitions 1 \
  --replication-factor 1 --config max.message.bytes=64000 --config flush.messages=1

~~~



~~~properties
# 可以使用命令修改已有topic配置
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type topics --entity-name my-topic
  --alter --add-config max.message.bytes=128000

~~~



~~~properties
# 命令查看能修改这个topic的哪些配置
bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type topics --entity-name my-topic --describe

~~~



~~~properties
# 移除覆盖的配置
bin/kafka-configs.sh --bootstrap-server localhost:9092  --entity-type topics --entity-name my-topic
  --alter --delete-config max.message.bytes
  
~~~



~~~properties
cleanup.policy=delete # list [compact, delete] Server Default Property log.cleanup.policy
# delelte 当日志的保留时间或者超过大小限制，删除旧的日志段
# compact 启用日志压缩,它保留每个键的最新值

compression.type=producer # [uncompressed, zstd, lz4, snappy, gzip, producer]

delete.retention.ms=86400000 # 1d log.cleaner.delete.retention.ms

file.delete.delay.ms=60000 # 从文件系统中删除文件之前等待的时间 log.segment.delete.delay.ms

flush.messages=9223372036854775807 # 对写入日志的数据进行fsync log.flush.interval.messages

flush.ms=9223372036854775807 # force an fsync of data written to the log的时间 log.flush.interval.ms

follower.replication.throttled.replicas= # list [partitionId]:[brokerId],[partitionId]:[brokerId],...

index.interval.bytes=4096 # 4kb 控制Kafka向偏移索引添加索引条目的频率

leader.replication.throttled.replicas= # list [partitionId]:[brokerId],[partitionId]:[brokerId],...

max.compaction.lag.ms=9223372036854775807 # 日志压缩相关

max.message.bytes=1048588 # Kafka允许的最大记录批大小

message.format.version=3.0-IV1 # [0.8.0, 0.8.1, 0.8.2, 0.9.0, 0.10.0-IV0, 0.10.0-IV1, 0.10.1-IV0, 0.10.1-IV1, 0.10.1-IV2, 0.10.2-IV0, 0.11.0-IV0, 0.11.0-IV1, 0.11.0-IV2, 1.0-IV0, 1.1-IV0, 2.0-IV0, 2.0-IV1, 2.1-IV0, 2.1-IV1, 2.1-IV2, 2.2-IV0, 2.2-IV1, 2.3-IV0, 2.3-IV1, 2.4-IV0, 2.4-IV1, 2.5-IV0, 2.6-IV0, 2.7-IV0, 2.7-IV1, 2.7-IV2, 2.8-IV0, 2.8-IV1, 3.0-IV0, 3.0-IV1, 3.1-IV0, 3.2-IV0, 3.3-IV0, 3.3-IV1, 3.3-IV2, 3.3-IV3, 3.4-IV0, 3.5-IV0, 3.5-IV1, 3.5-IV2]

message.timestamp.difference.max.ms=9223372036854775807 # 
message.timestamp.type=CreateTime # [CreateTime, LogAppendTime] 定义消息中的时间戳是消息创建时间还是日志追加时间

min.cleanable.dirty.ratio=0.5 # [0,...,1] 
min.compaction.lag.ms=0 # 日志中保持未压缩状态的最短时间

min.insync.replicas=1 # 和生产者acks相关

preallocate=false # true 在创建新的日志段时应该在磁盘上预分配文件

retention.bytes=-1 # 

retention.ms=604800000 # -1 数据保留时间?

segment.bytes=1073741824 # 1GB 14 日志的段文件大小
segment.index.bytes=10485760 # 4 10MB 控制将偏移量映射到文件位置的索引的大小
segment.jitter.ms=0
segment.ms=604800000 # Kafka强制日志滚动的时间,即使段文件没有满,以确保保留可以删除或压缩旧数据

unclean.leader.election.enable=false # 数据丢失相关

message.downconversion.enable=true # 消息向下转换,不太懂?


~~~







#### 2.4.3、Producer配置

~~~properties
key.serializer=className # 实现org.apache.kafka.common.serializ.serializer接口的class
value.serializer=className # 实现org.apache.kafka.common.serializ.serializer接口的class
bootstrap.servers=list # 
buffer.memory=33554432 # 
compression.type=none # none,gzip,snappy,lz4,zstd
retries=2147483647 #消息的幂等性相关

ssl.key.password=null #password
ssl.keystore.certificate.chain=null
ssl.keystore.key=null
ssl.keystore.location=null
ssl.keystore.password=null
ssl.truststore.certificates=null
ssl.truststore.location=null
ssl.truststore.password=null

batch.size=16384 # 为了生产这发送消息批处理发送

client.dns.lookup=use_all_dns_ips # resolve_canonical_bootstrap_servers_only

client.id=null # 发出请求时传递给服务器的id字符串

connections.max.idle.ms=540000  #9m 在此配置指定的毫秒数之后关闭空闲连接

delivery.timeout.ms=120000 # 发送消息的时间上限,大于request.timeout.ms+linger.ms

linger.ms=0 #延迟发送消息，结合batch.size使用可以批处理发送消息

request.timeout.ms=30000 # 配置控制客户端等待请求响应的最大时间。如果在超时之前未收到响应，则客户端将在必要时重新发送请求.>replica.lag.time.max.ms (a broker configuration)

max.block.ms=60000 # 阻塞最大时间

max.request.size=1048576 # 每个请求的最大上限

partitioner.class=class # 没有设置这个,到默认的分区,或者根据存在的key选择一个分区;org.apache.kafka.clients.producer.RoundRobinPartitioner,这种分区策略是将一系列连续记录中的每条记录发送到不同的分区(无论是否提供了“键”)，直到我们用完分区并重新开始。注意:有一个已知的问题会导致新批创建时分布不均匀。详情请查看KAFKA-9965。实现org.apache.kafka.clients.producer.Partitioner接口可以自定义分区器

partitioner.ignore.keys=false # 当设置为“true”时，生产者将不会使用记录键来选择分区。如果为“false”，当存在密钥时，生产者将根据密钥的散列选择分区。注意:如果使用自定义分区器，此设置不起作用。

receive.buffer.bytes=32768 # 读取数据时使用的TCP接收缓冲区(SO_RCVBUF)的大小。如果取值为-1，则使用操作系统默认值

sasl.client.callback.handler.class=null #class 实现AuthenticateCallbackHandler接口的SASL客户机回调处理程序类的完全限定名称
sasl.jaas.config=null # password
sasl.kerberos.service.name=null # string
sasl.login.callback.handler.class=null #class
sasl.login.class=null #class
sasl.mechanism=GSSAPI # 
sasl.oauthbearer.jwks.endpoint.url=null
sasl.oauthbearer.token.endpoint.url=null # 

security.protocol=PLAINTEXT # PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL和broker沟通的协议

send.buffer.bytes=131072 # 发送数据时要使用的TCP发送缓冲区(SO_SNDBUF)的大小。如果取值为-1，则使用操作系统默认值

socket.connection.setup.timeout.max.ms=30000 # 
socket.connection.setup.timeout.ms=10000 # 

ssl.enabled.protocols=TLSv1.2 #
ssl.keystore.type=JKS # JKS, PKCS12, PEM
ssl.protocol=TLSv1.2
ssl.provider=null
ssl.truststore.type=JKS # JKS, PKCS12, PEM

acks=all # [all, -1, 0, 1]
#acks=0 生产者将根本不等待来自服务器的任何确认,retries配置失效,为每条记录返回的偏移量将始终设置为-1
#acks=1 leader将记录写入其本地日志，但无需等待所有follower的完全确认即可响应,如果leader在响应之后，没有复制sollower完之前失败,则出现数据丢失
#acks=all leader将等待同步副本的完整集合来确认记录.这保证只要至少有一个同步副本保持活动状态,记录就不会丢失.效果等同-1配置
#启用幂等性需要这个配置值为“all”。如果设置了冲突的配置，并且幂等性没有显式启用，则幂等性被禁用

auto.include.jmx.reporter=true # 	

enable.idempotence=true # true生产者将确保在流中只写入每个消息的一个副本,要求max.in.flight.requests.per.connection<=5,retries >0,acks=all

max.in.flight.requests.per.connection=5 # 客户端将在单个连接上发送的未确认请求的最大数量

interceptor.classes='' #  By default, there are no interceptors.

metadata.max.age.ms=300000 # 
metadata.max.idle.ms=300000 # 

metric.reporters='' # list
metrics.num.samples=2 # 
metrics.recording.level=INFO # [INFO, DEBUG, TRACE]
metrics.sample.window.ms=30000 # 

partitioner.adaptive.partitioning.enable=true # 
partitioner.availability.timeout.ms=0 # 

reconnect.backoff.max.ms=1000 # 
reconnect.backoff.ms=50 # 

retry.backoff.ms=100 # 在尝试重试对给定主题分区的失败请求之前等待的时间。这避免了在某些故障场景下在紧密循环中重复发送请求

sasl.kerberos.kinit.cmd=/usr/bin/kinit # 
sasl.kerberos.min.time.before.relogin=60000 # 
sasl.kerberos.ticket.renew.jitter=0.05
sasl.kerberos.ticket.renew.window.factor=0.8
sasl.login.connect.timeout.ms=null
sasl.login.read.timeout.ms=null
sasl.login.refresh.buffer.seconds=300
sasl.login.refresh.min.period.seconds=60
sasl.login.refresh.window.factor=0.8
sasl.login.refresh.window.jitter=0.05
sasl.login.retry.backoff.max.ms=10000 
sasl.login.retry.backoff.ms=100
sasl.oauthbearer.clock.skew.seconds=30
sasl.oauthbearer.expected.audience=null
sasl.oauthbearer.expected.issuer=null
sasl.oauthbearer.jwks.endpoint.refresh.ms=3600000 
sasl.oauthbearer.jwks.endpoint.retry.backoff.max.ms=10000 
sasl.oauthbearer.jwks.endpoint.retry.backoff.ms=100
sasl.oauthbearer.scope.claim.name=scope
sasl.oauthbearer.sub.claim.name=sub

security.providers=null

ssl.cipher.suites=null
ssl.endpoint.identification.algorithm=https
ssl.engine.factory.class=null
ssl.keymanager.algorithm=SunX509
ssl.secure.random.implementation=null
ssl.trustmanager.algorithm=PKIX

transaction.timeout.ms=60000 # 不能>transaction.max.timeout.ms
transactional.id=null # 事务消息


~~~



#### 2.4.4、Consumer配置

~~~properties
key.deserializer=class # 实现了org.apache.kafka.common.serialization.Deserializer接口的class
value.deserializer=class # 实现了org.apache.kafka.common.serialization.Deserializer接口的class

bootstrap.servers=list # kafka服务器的ip+port,host1:port1,host2:port2,... 

fetch.min.bytes=1 # 消费请求一次最小的响应数据单位字节,如果服务端没有足够的数据返回，则会等待至超时返回(不确定)
fetch.max.bytes=52428800 # 50MB The maximum amount of data the server should return for a fetch request. 
fetch.max.wait.ms=500 # 消费一次fetch.min.bytes没达到这个标准的阻塞时间

group.id=null # 表示消费者组的唯一字符串,subscribe(topic) or the Kafka-based offset

heartbeat.interval.ms=3000 # The expected time between heartbeats to the consumer coordinator when using Kafka's group management facilities.The value must be set lower than session.timeout.ms, but typically should be set no higher than 1/3 of that value.
session.timeout.ms=45000 #45s kafka消费者与broker的超时时间,group.min.session.timeout.ms group.max.session.timeout.ms

max.partition.fetch.bytes=1048576 # The maximum amount of data per-partition the server will return.The maximum record batch size accepted by the broker is defined via message.max.bytes (broker config) or max.message.bytes (topic config)

ssl.key.password=null # password
ssl.keystore.certificate.chain=null # password
ssl.keystore.location=null # string
ssl.keystore.password=null # password
ssl.truststore.certificates=null # password
ssl.truststore.location=null # string
ssl.truststore.password=null # password

allow.auto.create.topics=true # Allow automatic topic creation on the broker when subscribing to or assigning a topic.This configuration must be set to `false` when using brokers older than 0.11.0

auto.offset.reset=latest # [latest, earliest, none] 当Kafka中没有初始偏移量或者当前偏移量在服务器上不存在时该怎么办
# earliest 自动将偏移量重置为最早的偏移量,加入开始处理
# latest 自动将偏移量重置为最新偏移量,分区最早开始处理
# none 如果没有为消费者组找到先前的偏移量，则向消费者抛出异常
# anything else 向消费者抛出异常

client.dns.lookup=use_all_dns_ips # [use_all_dns_ips, resolve_canonical_bootstrap_servers_only]

connections.max.idle.ms=540000  # 在此配置指定的毫秒数之后关闭空闲连接

default.api.timeout.ms=60000 # 1m Specifies the timeout for client APIs

enable.auto.commit=true # If true the consumer's offset will be periodically committed in the background.
auto.commit.interval.ms=5000 # enable.auto.commit设置为true，自动提交偏移量的频率

exclude.internal.topics=true # 监听topic相关

group.instance.id=null # string 和消费组相关

isolation.level=read_uncommitted # [read_committed, read_uncommitted] 读取事务性消息设置,非事物消息不受控制

max.poll.interval.ms=300000 # The maximum delay between invocations of poll() when using consumer group management. 这为消费者在获取更多记录之前可以空闲的时间设置了上限。如果在此超时到期之前未调用poll()，则认为消费者失败，组将重新平衡，以便将分区重新分配给另一个成员
max.poll.records=500 # The maximum number of records returned in a single call to poll().max.poll.records并不影响底层的抓取行为。消费者将缓存来自每个获取请求的记录，并从每个轮询中增量地返回它们。

partition.assignment.strategy=class org.apache.kafka.clients.consumer.RangeAssignor,class org.apache.kafka.clients.consumer.CooperativeStickyAssignor 客户端将使用这些策略在消费者实例之间分配分区所有权
# RangeAssignor 基于每个主题分配分区
# RoundRobinAssignor 以循环方式将分区分配给消费者。
# StickyAssignor 保证分配达到最大平衡，同时保留尽可能多的现有分区分配
# CooperativeStickyAssignor 遵循相同的StickyAssignor逻辑，但允许协作再平衡
# org.apache.kafka.clients.consumer.ConsumerPartitionAssignor自定义接口实现

receive.buffer.bytes=65536 # 64kb The size of the TCP receive buffer to use when reading data.-1 default OS

request.timeout.ms=30000 # 配置控制客户端等待请求响应的最大时间

sasl.client.callback.handler.class=null #class
sasl.jaas.config=null # password
sasl.kerberos.service.name=null # string
sasl.login.callback.handler.class=null #class
sasl.login.class=null #class
sasl.mechanism=GSSAPI 
sasl.oauthbearer.jwks.endpoint.url=null #class
sasl.oauthbearer.token.endpoint.url=null #class
sasl.kerberos.kinit.cmd=/usr/bin/kinit #
sasl.kerberos.min.time.before.relogin=60000
sasl.kerberos.ticket.renew.jitter=0.05
sasl.kerberos.ticket.renew.window.factor=0.8
sasl.login.connect.timeout.ms=null # int
sasl.login.read.timeout.ms=null # int
sasl.login.refresh.buffer.seconds=300 #[0,...,3600]
sasl.login.refresh.min.period.seconds=60 # [0,...,900]
sasl.login.refresh.window.factor=0.8 # [0.5,...,1.0]
sasl.login.refresh.window.jitter=0.05 # [0.0,...,0.25]
sasl.login.retry.backoff.max.ms=10000 
sasl.login.retry.backoff.ms=100
sasl.oauthbearer.clock.skew.seconds=30
sasl.oauthbearer.expected.audience=null #list
sasl.oauthbearer.expected.issuer=null #list
sasl.oauthbearer.jwks.endpoint.refresh.ms=3600000 #1h
sasl.oauthbearer.jwks.endpoint.retry.backoff.max.ms=10000 
sasl.oauthbearer.jwks.endpoint.retry.backoff.ms=100
sasl.oauthbearer.scope.claim.name=scope
sasl.oauthbearer.sub.claim.name=sub


security.protocol=PLAINTEXT # 用于与代理通信的协议,[PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL]

send.buffer.bytes=131072 # 发送数据时要使用的TCP发送缓冲区,-1 default OS

socket.connection.setup.timeout.max.ms=30000 # 客户端等待套接字连接建立的最长时间
socket.connection.setup.timeout.ms=10000 # 客户端等待套接字连接建立所需的时间

ssl.enabled.protocols=TLSv1.2
ssl.keystore.type=JKS
ssl.protocol=TLSv1.2
ssl.provider=null # string
ssl.truststore.type=JKS
ssl.cipher.suites=null # list
ssl.endpoint.identification.algorithm=https # string
ssl.engine.factory.class=null # class
ssl.keymanager.algorithm=SunX509
ssl.secure.random.implementation=null # string
ssl.trustmanager.algorithm=PKIX



auto.include.jmx.reporter=true # 

check.crcs=true # 

client.id= # string 发出请求时传递给服务器的id字符串

client.rack= # string 

interceptor.classes= # 拦截器org.apache.kafca.clients.consumer.consumerinterceptor

metric.reporters= # org.apache.kafka.common.metrics.MetricsReporter 实现系统监控通过JMX
metrics.num.samples=2 # The number of samples maintained to compute metrics.
metrics.recording.level=INFO # [INFO, DEBUG, TRACE]
metrics.sample.window.ms=30000 # 

reconnect.backoff.max.ms=1000 # 
reconnect.backoff.ms=50 # 重连时间

retry.backoff.ms=100 # 在尝试重试对给定主题分区的失败请求之前等待的时间

security.providers=null # string org.apache.kafka.common.security.auth.SecurityProviderCreator


~~~

max.poll.records=500





## 3、高级特性和性能优化



### 3.1、高级配置

- 副本配置
- 日志清理策略
- 消息压缩
- ...



### 3.2、Kafka复制机制

- ISR(In-Sync Replicas)和副本管理
- ...



### 3.3、容错性

- 处理代理崩溃、网络中断
- 容错处理和故障恢复
- ...



### 3.4、性能优化

- 批量处理、并行性和吞吐量优化
- ...



## 4、实际应用

- 数据流处理和Kafka Streams、数据流优化
- 数据集成和Kafka Connect
- 主题和分区设计
- 重复消息处理
- 与其他系统的集成
- ...



## 5、监控和运维

- Kafka集群监控
- 日志管理、备份和恢复
- ...









