# Kafka

官方文档：https://kafka.apache.org/documentation

## 1.设计理论

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

![image-20250307194401641](http://47.101.155.205/image-20250307194401641.png)

#### 消费者

消费者：Kafka消费者向所需要的代理分区发起拉取请求。消费者在每个请求中指定其日志中的偏移量，并接收该位置开始的日志块。**SpringBoot开始连接Kafka的消费者该从哪个偏移量获取消息？怎么往前设置偏移量以便重复消费？**
1. 推和拉：从代理中拉取数据和Broker往下推送数据各有区别。Broker推送数据到不同的消费者，Broker还需要控制数据传输的速率；当生产者的速率超过消费者消费速率时，这时就比较麻烦了。消费者拉取数据，消费者消费速率没赶上生产速率，可以在后面的时候赶上。**推模型，broker积累消息发送请求，它并不知道消费者能否立即处理它，就需要把消息发送给消费者，当配置推送频率较低时，就会一次又一次的推送消息。拉模型解决了这个问题，但是也带来了新问题，当代理没有消息时，消费者需要不停的循环等待**。
2. 消费者定位：消息状态定位，如果Broker一发送消息就表示消费，消费者出现网络问题没有接收到消息，则这条消息就丢失了。为了解决这个问题：可以给消息系统添加消息确定功能，这表明消息发送表示消息只是**已发送**，并不是**被消费**，Broker等待消费者的确定消息，收到则标记消息为**已消费**。这里解决了消息丢失问题，却带来了新的问题：消息消费完，确定消息时出现问题，出现重复消费问题；Broker性能，需要每条消息保留多个状态。
3. Kafka的topic分为一组有序的分区，每个分区在任何给定实际由每个订阅消费者组的一个消费者消费(确保了消息偏移量的准确性)。**每个分区只能被消费者组中的一个消费者进行消费，这样可以确保消息在消费者组内有序消费，但不同消费者组之间可以并行消费。**这表明每个分区中消费者的位置只是一个整数，即要消费下一条消息的偏移量。这样使得标记的性能消耗很低。这样还支持消费者**退回到旧的偏移量**并重新使用消息。
4. 离线数据加载：Kafka的持久性允许消费者可以定期消费，批量加载数据，将数据加载到离线系统。
5. 静态会员资格：是一种消费者组成员管理策略，用于在 Kafka 消费者组中控制消费者的加入和离开，以及在重新平衡发生时的行为。传统的 Kafka 消费者组中，消费者组的成员是通过一种动态分配的方式加入的，当新的消费者加入或离开时，会触发重新平衡，导致分区重新分配。这种动态分配机制在某些情况下可能会导致不稳定性，例如，在网络分区恢复时可能会触发不必要的重新平衡。Static Membership 通过引入手动管理消费者组成员，消费者可以预先注册到消费者组，并且不会因为网络分区或其他原因而自动触发重新平衡。Static Membership 需要在 Kafka 集群和消费者端进行配置，以及确保正确的协调和调度。



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

正常情况下，所有副本具有相同偏移量的完全相同的日志。消费者控制其在该日志中的位置。如果消费者从未奔溃，它将这个位置存储在内存中，但如果消费者消费失败，我们希望这个主题分区被另一个进程接管，新进程需要选择一个合适给位置开始处理。





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
3. 同步副本ISR
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



Kafka的Leader副本选举，是采用Zookeeper上针对Topic维护的Isr列表激活进行选举，在选举时，首先选举Isr的第1个，如果第1个选举不成功，接着选第2个，依次类推。Kafka可以容忍N-1个Leader副本宕机或不可用。如果所有的Isr副本不可用，则从不再Isr列表的副本选举一个Leader。





### 5.Log Compaction(日志压缩)

日志压缩可确保 Kafka 始终保留单个主题分区的数据日志中每个消息键的至少最后一个已知值。 它解决了还原等使用案例和场景 状态，或者在作维护期间应用程序重启后重新加载缓存。

![image-20250309114120104](http://47.101.155.205/image-20250309114120104.png)

日志压缩是一种机制，用于提供更精细的每条记录保留，而不是更粗粒度的基于时间的保留。这个想法是有选择地删除具有相同主键的最新更新的记录。这样可以保证日志至少具有每个键的最后一个状态。

此保留策略可以按主题设置，因此单个集群可以包含一些主题，其中保留是通过大小或时间强制执行的，而其他主题则通过压缩强制执行保留。



![image-20250309120852747](http://47.101.155.205/image-20250309120852747.png)

日志的头部与传统的 Kafka 日志相同。它具有密集的连续偏移量并保留所有消息。Log compaction 添加了一个用于处理日志尾部的选项。上图显示了一根尾巴压实的原木。请注意，日志尾部的消息保留了首次写入时分配的原始偏移量，该偏移量永远不会更改。另请注意，所有偏移量在日志中仍然是有效位置，即使具有该偏移量的消息已被压缩掉;在这种情况下，此位置与日志中出现的**下一个最高偏移量**没有区别。例如，在上图中，偏移量 36、37 和 38 都是等效位置，从这些偏移量中的任何一个开始的读取都将返回以 38 开头的消息集。

压缩是通过定期重新复制日志段在后台完成的。清理不会阻止读取，并且可以限制为使用不超过可配置的 I/O 吞吐量，以避免影响创建者和使用者。压缩日志段的实际过程如下所示：

![image-20250309121020126](http://47.101.155.205/image-20250309121020126.png)

日志压缩提供的保障：

1. Topic配置`min.compaction.lag.ms` 可用于保证在写入消息后必须经过的最小时间长度才能压缩消息。Topic配置`max.compaction.lag.ms` 可用于保证写入消息的时间与消息符合压缩条件之间的最大延迟。
2. 消息的顺序始终保持不变。 Compaction 永远不会对消息重新排序，只会删除一些消息。
3. 消息的偏移量永远不会改变。 它是日志中某个位置的永久标识符。
4. 任何从日志开头开始的使用者都将至少看到所有记录的最终状态（按写入顺序排列）。此外，如果使用者在小于主题的 `delete.retention.ms` 设置（默认值为 24 小时）的时间段内到达日志头，则将看到已删除记录的所有删除标记。超过这个时间，中间的消息可能未消费掉。



~~~properties
# 日志压缩配置
log.cleanup.policy=compact

# 时间
log.cleaner.min.compaction.lag.ms
log.cleaner.max.compaction.lag.ms

~~~





### 6.Quotas（配额）

Kafka 集群能够对请求实施配额，以控制客户端使用的代理资源。Broker 可以为共享配额的每组客户端强制执行两种类型的客户端配额：

1. 网络带宽的配额：网络带宽配额定义为共享配额的每组客户端的字节速率阈值。默认情况下，每个唯一客户端组都会收到集群配置的固定配额（以字节/秒为单位）。此配额是按代理定义的。在客户端受到限制之前，每组客户端最多可以发布/获取每个代理 X 字节/秒。
2. 请求速率配额：请求速率配额定义为客户端在配额时段内可以利用每个代理的请求处理程序 I/O 线程和网络线程的时间百分比。`n%` 的配额表示 `n% 的 一个线程` ，因此配额超出了总容量 `((num.io.threads + num.network.threads) * 100)%` 。每组客户端可以在配额中的所有 I/O 和网络线程中使用最高 `n%` 的总百分比 窗口。由于分配给 I/O 和网络线程的线程数通常基于 根据 Broker 主机上的可用内核数，请求速率配额表示 CPU 的总百分比 可供共享配额的每组客户端使用。

**为什么需要配额？**

生产者和消费者可能会产生/消耗非常大量的数据，或者以非常高的速率生成请求，从而垄断代理资源，导致网络饱和，并且通常会DOS其他客户端和代理本身。拥有配额可以防止这些问题，并且在大型多租户集群中尤为重要，因为一小部分行为不良的客户端可能会降低行为良好的客户端的用户体验。事实上，当将 Kafka 作为服务运行时，这甚至可以根据商定的合同强制执行 API 限制。



**可以实施配额的对象：**

1. 用户级别：user。
2. 客户端级别：clientId。
3. 用户级别+客户端级别：user+clientId。

![image-20250309112317027](http://47.101.155.205/image-20250309112317027.png)



~~~bash
# 设置配额 user=user1, client-id=clientA
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type users --entity-name user1 --entity-type clients --entity-name clientA
Updated config for entity: user-principal 'user1', client-id 'clientA'

# 设置配额 user=user1
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type users --entity-name user1
Updated config for entity: user-principal 'user1'

# 设置配额 client-id=clientA
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type clients --entity-name clientA
Updated config for entity: client-id 'clientA'

~~~



~~~bash
# 默认配额 
# 为 user=userA 配置默认 client-id 配额
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type users --entity-name user1 --entity-type clients --entity-default
Updated config for entity: user-principal 'user1', default client-id

# user设置默认
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type users --entity-default
Updated config for entity: default user-principal

# client-id 设置默认
bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --add-config 'producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200' --entity-type clients --entity-default
Updated config for entity: default client-id.

~~~



~~~bash
# 查看配额
bin/kafka-configs.sh --bootstrap-server localhost:9092 --describe --entity-type users --entity-name user1 --entity-type clients --entity-name clientA
Configs for user-principal 'user1', client-id 'clientA' are producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200

bin/kafka-configs.sh --bootstrap-server localhost:9092 --describe --entity-type users --entity-name user1
Configs for user-principal 'user1' are producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200

bin/kafka-configs.sh --bootstrap-server localhost:9092 --describe --entity-type clients --entity-name clientA
Configs for client-id 'clientA' are producer_byte_rate=1024,consumer_byte_rate=2048,request_percentage=200

bin/kafka-configs.sh --bootstrap-server localhost:9092 --describe --entity-type users

bin/kafka-configs.sh --bootstrap-server localhost:9092 --describe --entity-type users --entity-type clients

~~~



### 7.Zookeeper

Zookeeper功能：

1. 存储Kafka的元数据.
2. 管理Broker。
3. 管理消费者。



Zookeeper存储以下数据：

1. Topic的注册信息。
2. Topic的配置。
3. 分区的状态信息。
4. Broker的注册信息。
5. Consumer的注册信息。
6. Consumer owner。
7. Consumer offset。






## 2.初级入门

### 1.基本概念和架构

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



### 2.安装和配置Kafka

下载地址：https://www.apache.org/dyn/closer.cgi?path=/kafka/3.5.0/kafka_2.13-3.5.0.tgz

~~~bash
# 修改kafka Broker 的配置
broker.id=0
log.dir=/tmp/kafka-logs
# 配置监听地址
# PLAINTEXT://0.0.0.0:9092(需要配置 advertised.listeners) / PLAINTEXT://hostname:9092
listeners=PLAINTEXT://oycm:9092
# 官网推荐的例子
# PLAINTEXT://myhost:9092,SSL://:9091 
# CLIENT://0.0.0.0:9092,REPLICATION://localhost:9093
# PLAINTEXT://127.0.0.1:9092,SSL://[::1]:9092

# zookeeper暴露的监听地址
advertised.listeners=PLAINTEXT://公网ip:9092

~~~



~~~bash
cd /usr/local
tar -xzf kafka_2.13-3.5.0.tgz
cd kafka_2.13-3.5.0/

# 安装kafka环境：ZooKeeper or KRaft
# 1.ZooKeeper
bin/zookeeper-server-start.sh config/zookeeper.properties
nohup bin/zookeeper-server-start.sh config/zookeeper.properties > logs/zookeeper.log 2>&1 &

# 另一个窗口执行命令
bin/kafka-server-start.sh config/server.properties
nohup bin/kafka-server-start.sh config/server.properties > logs/kafka.log 2>&1 &

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

Kafka会将集群的配置信息和元信息存储在Zookeeper中，可以使用Zookeeper客户端工具ZooInspector管理Zookeeper的节点信息。

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



## 3.API

### 1.Kafka基本操作

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

# 指定分区副本数2
--replication-factor 2
# 指定topic的分区有3个
--partitions 3

# 创建topic，默认监听配置启动
bin/kafka-topics.sh --create --topic org.test1 --bootstrap-server localhost:9092

# Broker 只配置 listeners=PLAINTEXT://oycm:9092 配置
# default.replication.factor 默认配置是1，创建topic失败
bin/kafka-topics.sh --create --replication-factor 2 --partitions 3 --topic org.test2 --bootstrap-server root:9092

# Broker 指定监听地址 advertised.listeners=PLAINTEXT://公网ip:9092
bin/kafka-topics.sh --create --replication-factor 1 --partitions 3 --topic org.test2 --bootstrap-server 内网ip:9092


# 查询topic信息
bin/kafka-topics.sh --describe --topic org.test1 --bootstrap-server localhost:9092

~~~

![image-20250308130043211](http://47.101.155.205/image-20250308130043211.png)



#### producer

~~~bash
# 发送消息
bin/kafka-console-producer.sh --topic org.test1 --bootstrap-server localhost:9092

# Broker 只配置 listeners=PLAINTEXT://oycm:9092 配置
bin/kafka-console-producer.sh --topic org.test1 --bootstrap-server root:9092

# Broker 指定监听地址 advertised.listeners=PLAINTEXT://公网ip:9092
bin/kafka-console-producer.sh --topic org.test1 --bootstrap-server 内网ip:9092

bin/kafka-console-producer.sh --broker-list localhost:9092 --topic org.test2

~~~



#### consumer

~~~bash
# 从开始位置消费
bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server localhost:9092
# 显示key消费
print.key=true

# Broker 只配置 listeners=PLAINTEXT://oycm:9092 配置
bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server root:9092

# Broker 指定监听地址 advertised.listeners=PLAINTEXT://公网ip:9092
bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server 内网ip:9092


# 重置消费者组偏移量 消费者停止才能重置
bin/kafka-consumer-groups.sh --bootstrap-server oycm:9092 --group <group_name> --reset-offsets --to-latest --all-topics --execute

bin/kafka-consumer-groups.sh --bootstrap-server oycm:9092 --group c2 --reset-offsets --to-latest --all-topics --execute

# 删除偏移量
bin/kafka-consumer-groups.sh --bootstrap-server 172.24.117.21:9092 --group c2 --delete-offsets --topic org.test1

# 查询kafka消费者组的偏移量
bin/kafka-consumer-groups.sh --bootstrap-server <kafka-bootstrap-server> --group <consumer-group> --describe
bin/kafka-consumer-groups.sh --bootstrap-server 172.24.117.21:9092 --group c2 --describe


~~~



#### admin

~~~bash
bin/kafka-administration.sh --bootstrap-server <kafka-bootstrap-server> --trigger-rebalance --group <consumer-group>
bin/kafka-administration.sh --bootstrap-server oycm:9092 --trigger-rebalance --group test1

~~~







### 2.Kafka生产者API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/producer/KafkaProducer.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~

Kafka生产者发送消息的主要模式：发后即忘(fire-and-forget)、同步发送（sync）、异步发送（async）。

- 发后即忘：只管向Kafka发送消息而不关心消息是否正确到达。发送性能最好，可靠性最差。
- 同步发送：利用返回的Feature对象阻塞等待Kafka的响应，知道消息发送成功。
- 异步发送：生产者提供回调支持。



~~~java
public class KafkaClient {

    public static void main(String[] args) {
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "host:9092");
        properties.put("acks", "all");
        properties.put("linger.ms", 10);
        properties.put("retries", 1);
        properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        Producer<String,String> producer = new KafkaProducer<String, String>(properties);
        for (int i = 1; i < 2; i++) {
            System.out.println("开始: " + i);
            producer.send(new ProducerRecord<String, String>("org.test1", Integer.toString(i), Integer.toString(i)));
            System.err.println(i);
        }
        producer.close();
    }
}

~~~

Kafka发送消息的执行过程：

1. 在创建KafkaProducer对象时，就已经创建了一个Kafka发送消息线程。
2. 调用send，先执行消息拦截器（配置才执行，且不会抛出异常）。
3. 获取topic的元数据。
4. 消息序列化，key和value。
5. 设置消息的分区。
6. 消息追加器。
7. 消息拦截器回调和同步等待、异步回调。ProducerInterceptor消息拦截器的onAcknowledgement回调，在消息被确认应答之前或消息发送失败时调用，在生产者线程中调用。



![image-20250308153640572](http://47.101.155.205/image-20250308153640572.png)

![image-20250308154029898](http://47.101.155.205/image-20250308154029898.png)

![image-20250308154803356](http://47.101.155.205/image-20250308154803356.png)

![image-20250308155304930](http://47.101.155.205/image-20250308155304930.png)



Kafka生产者发送到主题的消息，只会保存在某一个分区，主题在被创建的时候，可以指定分区的数量。Kafka提供的分区策略Partitioner决定了消息发送到哪个分区。

**常见的分区有几种：**

1. DefaultPartitioner：默认分区策略。
2. RoundRobinPartitioner：轮询分区策略。
3. UniformStickyPartitioner：黏性分区策略。
4. 散列分区策略：key不为空，使用了默认的分区器，Kafka会对key进行散列，然后根据散列值把消息映射到对应的分区。
5. 实现Partitioner自定义分区策略。



**生产者压缩机制：**

生产者负责压缩、Broker端负责保持、消费端负责解压。利用生产者的CPU去换Broker端磁盘存储空间，以及生产者和消费者的网络I/O。

compression.type配置压缩方式。

1. gzip：压缩效率高，CPU消耗大，适合对带宽敏感场景。压缩和解压较慢。
2. snappy：压缩率适中，CPU消耗较低，适用于延迟和吞吐量要求高的场景。
3. lz4：压缩率和snappy相当，当压缩和解压速度更快。
4. zstd（Zstandard）：压缩率高，接近gzip，压缩和解压更快。CPU介于gzip和snappy之间。



**消息插件回调？**



### 2.Kafka消费者API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/consumer/KafkaConsumer.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~

创建KafkaConsumer(Properties properties)对象执行情况：

1. 有配置group.instance.id，则日志上下文对象设置instanceId。
2. 配置ConsumerInterceptor消费者拦截器，默认空。
3. 设置key、value的反序列化器。
4. 设置ConsumerPartitionAssignor消费者分区器。默认有RangeAssignor、CooperativeStickyAssignor。
5. 有设置消费者组，创建ConsumerCoordinator消费者组协调器。



**偏移量和提交：**

Kafka的消费根据当前的偏移量来拉取消息，消息消费完成之后，会更新当前的偏移量，这个就是提交。

Kafka消费者跟踪它在每个分区中消耗的最大偏移量，并具有提交偏移量的能力，以便在重新启动时可以从这些偏移量恢复。Kafka提供了一个选项，将给定消费者组的所有偏移量存储在一个指定的代理（针对该组）中，该代理称为组协调器。也就是说，该消费者组中的任何消费者实例都应该将其偏移量提交和提取发送到该组协调器（代理）。消费者组根据其组名分配给协调器。消费者可以通过向任何Kafka代理发出FindCoordinatorRequest并读取包含协调器详细信息的FindCoordinatorResponse来查找其协调器。然后，消费者可以继续提交或从协调器代理获取偏移量。如果协调器移动，消费者将需要重新发现协调器。偏移量提交可以由消费者实例自动或手动完成。

当组协调器接收到OffsetCommitRequest时，它将请求附加到一个名为 __consumer_offsets 的特殊[压缩](https://kafka.apache.org/documentation/#compaction) Kafka主题。只有在偏移量主题的所有副本都收到偏移量之后，代理才会向消费者发送成功的偏移量提交响应。如果偏移量未能在可配置的超时时间内复制，则偏移量提交将失败，消费者可以在退出后重试提交。 代理会定期压缩 offsets 主题，因为它只需要维护每个分区的最新 offset 提交。 协调器还将偏移量缓存在内存中的表中，以便快速提供偏移量获取。

当协调器收到偏移量获取请求时，它只会从 offsets 缓存中返回最后提交的偏移量向量。如果 coordinator 刚刚启动，或者它刚刚成为一组新的消费者组的协调器（通过成为 offsets 主题的分区的领导者），它可能需要将 offsets 主题分区加载到缓存中。在这种情况下，偏移量获取将失败，并显示 CoordinatorLoadInProgressException，并且消费者可以在回退后重试 OffsetFetchRequest。



**偏移量提交方式：**

1. 自动提交：enable.auto.commit=true，auto.commit.interval.ms=5000。
2. 手动同步提交。
3. 手动异步提交。
4. 手动提交指定偏移量。





**分区重平衡：**

当新的消费者加入消费者组或消费者离开消费者组，就会发送分区重平衡。重平衡的优点是保证高可用性和扩展性，但是也带来了问题，重平衡期间整个消费者组不可使用。

在设置消费者消费的Topic时，可以指定ConsumerRebalanceListener重平衡监听器。



### 3.Kafka StreamAPI

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/streams/KafkaStreams.html

相关文档：https://kafka.apache.org/35/documentation/streams/

DSL API：https://kafka.apache.org/35/documentation/streams/developer-guide/dsl-api.html

Stream 配置介绍：https://kafka.apache.org/35/documentation/streams/developer-guide/config-streams.html

开发文档：https://kafka.apache.org/35/documentation/streams/developer-guide/

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-streams</artifactId>
	<version>3.5.0</version>
</dependency>

~~~

#### 流式计算框架介绍

流式计算框架是一种用于处理实时数据流的计算框架。与传统的批处理框架（如 Hadoop MapReduce）不同，流式计算框架能够对持续生成的数据流进行实时处理和分析，适用于需要低延迟、高吞吐量的场景。

**流式计算框架的核心作用：**

1. 实时数据处理：流式计算框架能够处理持续生成的数据流（如日志、传感器数据、交易记录等），并在数据到达时立即进行处理。
2. 低延迟：流式计算框架通常能够在毫秒或秒级内处理数据，满足对实时性要求较高的场景。
3. 高吞吐量：流式计算框架能够高效处理大规模数据流，支持高并发和高吞吐量。
4. 复杂事件处理：支持对数据流中的复杂事件进行检测和处理，例如模式匹配、时间窗口聚合等。
5. 容错性和状态管理：流式计算框架通常具备容错机制，能够在节点故障时恢复计算状态，确保数据处理的准确性和一致性。

**常见的流式计算框架：**

1. Apache Flink：一个高性能的流式计算框架，支持事件时间处理、状态管理和精确一次（exactly-once）语义。
2. Apache Spark Streaming：基于 Spark 的流处理模块，将数据流划分为小批次进行处理。支持精确一次（exactly-once）语义。
3. Apache Kafka Streams：基于 Kafka 的轻量级流处理库。支持精确一次（exactly-once）语义。



#### 命令行demo

1. ~~~bash
   # 在Kafka启动的情况下，创建输入、输出Topic：
   # 创建名为streams-plaintext-input的输入Topic
   bin/kafka-topics.sh --create \
       --bootstrap-server root:9092 \
       --replication-factor 1 \
       --partitions 1 \
       --topic streams-plaintext-input
   
   # 创建名为 streams-plaintext-output 的输入Topic，支持压缩功能
   bin/kafka-topics.sh --create \
       --bootstrap-server root:9092 \
       --replication-factor 1 \
       --partitions 1 \
       --topic streams-wordcount-output \
       --config cleanup.policy=compact
   
   # 查询所有Topic的情况
   bin/kafka-topics.sh --bootstrap-server root:9092 --describe
   
   ~~~

2. ~~~bash
   # 启动WordCountDemo程序，注意如果本机监听不是localhost，无法来，需要改listener和advertised.listeners配置
   bin/kafka-run-class.sh org.apache.kafka.streams.examples.wordcount.WordCountDemo
   
   ~~~

3. ~~~bash
   # 启动输入Topic的生产者，修改为localhost
   bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic streams-plaintext-input
   
   ~~~

4. ~~~bash
   # 启动输出Topic的消费者，修改为localhost
   bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 \
       --topic streams-wordcount-output \
       --from-beginning \
       --formatter kafka.tools.DefaultMessageFormatter \
       --property print.key=true \
       --property print.value=true \
       --property key.deserializer=org.apache.kafka.common.serialization.StringDeserializer \
       --property value.deserializer=org.apache.kafka.common.serialization.LongDeserializer
   
   ~~~



~~~bash
# 输入Topic，第1次发送消息
all streams lead to kafka

~~~

![image-20250309155044960](http://47.101.155.205/image-20250309155044960.png)

~~~bash
# 输入Topic，第2次发送消息
hello kafka streams

~~~

![image-20250309155127183](http://47.101.155.205/image-20250309155127183.png)

~~~bash
# 输入Topic，第3次发送消息
join kafka summit

~~~

![image-20250309155212978](http://47.101.155.205/image-20250309155212978.png)

Wordcount 应用程序的输出实际上是一个连续的更新流，其中每条输出记录（即上面原始输出中的每一行）都是 单个单词的更新计数，也称为记录键，例如 “Kafka”。对于具有相同键的多条记录，后面的每条记录都是前一条记录的更新。

![image-20250309155622359](http://47.101.155.205/image-20250309155622359.png)



#### demo代码

**拓扑**：Stream应用程序中的计算逻辑（流式计算任务）。定义了数据源、如何处理数据、最终输出。

**-->和<--箭头分别表示该节点的下游和上游处理器节点，即拓扑图中的 子和父。**



##### Pipe

~~~java
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;

import java.util.Properties;
import java.util.concurrent.CountDownLatch;

/**
 * Topic 到 Topic 管道
 */
public class Pipe {

    public static void main(String[] args) throws Exception {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-pipe");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "47.101.155.205:9092");
        // 序列化的配置
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        // 开始定义 Stream的计算逻辑（拓扑）
        final StreamsBuilder builder = new StreamsBuilder();
        // 指定拓扑从 一个Topic到另一个Topic
        builder.stream("org.test1").to("org.test2");

        final Topology topology = builder.build();

        // 打印拓扑描述
        System.out.println(topology.describe());

        // Stream 客户端
        final KafkaStreams streams = new KafkaStreams(topology, props);
        final CountDownLatch latch = new CountDownLatch(1);

        // 关闭的回调
        Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
            @Override
            public void run() {
                streams.close();
                latch.countDown();
            }
        });

        try {
            // 启动流式计算
            streams.start();
            latch.await();
        } catch (Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }
}

~~~

![image-20250309164341586](http://47.101.155.205/image-20250309164341586.png)



##### LineSplit

~~~java
public class LineSplit {

    public static void main(String[] args) throws Exception {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-linesplit");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        // 开始定义 Stream的计算逻辑（拓扑）
        final StreamsBuilder builder = new StreamsBuilder();

        KStream<String, String> source = builder.stream("streams-plaintext-input");
        source.flatMapValues(value -> Arrays.asList(value.split("\\W+")))
                .to("streams-linesplit-output");

        final Topology topology = builder.build();
        System.out.println(topology.describe());

        // 与 Pipe 代码相同

    }
}

~~~



![image-20250309165702067](http://47.101.155.205/image-20250309165702067.png)



##### WordCount

**不知道这里的count计算是如何实现累加？**

~~~java
public class WordCount {

    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-wordcount");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "47.101.155.205:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        final StreamsBuilder builder = new StreamsBuilder();

        KStream<String, String> source = builder.stream("streams-plaintext-input");
        source.flatMapValues(value -> Arrays.asList(value.toLowerCase(Locale.getDefault()).split("\\W+")))
                .groupBy((key, value) -> value)
                .count(Materialized.<String, Long, KeyValueStore<Bytes, byte[]>>as("counts-store"))
                .toStream()
                .to("streams-wordcount-output", Produced.with(Serdes.String(), Serdes.Long()));

        final Topology topology = builder.build();
        System.out.println(topology.describe());

        // 与 Pipe 代码相同

    }
}

~~~



![image-20250309173507189](http://47.101.155.205/image-20250309173507189.png)



#### Kafka Stream概念

![image-20250309200754925](http://47.101.155.205/image-20250309200754925.png)

Kafka Streams 是一个客户端库，用于处理和分析存储在 Kafka 中的数据。它建立在重要的流处理概念之上，例如正确区分事件时间和处理时间、窗口支持以及简单而高效的管理和实时查询应用程序状态。

**拓扑中有两个特殊处理器：**

1. **Source Processor：**源处理器是一种特殊类型的流处理器，没有任何上游处理器。它通过使用来自这些主题的记录并将其转发到其下游处理器，从一个或多个 Kafka 主题生成到其拓扑的输入流。
2. **Sink Processor：**接收器处理器是一种特殊类型的流处理器，没有下游处理器。它将从其上游处理器收到的任何记录发送到指定的 Kafka 主题。

![image-20250309174655493](http://47.101.155.205/image-20250309174655493.png)



**时间概念：**

1. **事件时间（Event time ）：**事件或数据记录发生的时间点，即最初在“源”处创建。消息到达Kafka Broker的时间戳。
2. **处理时间（Processing time）：**事件或数据记录恰好由流处理应用程序处理的时间点，即使用记录时。
3. **接收时间（Ingestion time）：** Kafka Broker将事件或数据记录存储在主题分区中的时间点。



 Kafka Streams 应用程序将记录写入 Kafka 的时间：

1. 当通过处理某些输入记录生成新的输出记录时，例如，在 `process()` 函数调用中触发的 `context.forward()`时，输出记录时间戳会直接从输入记录时间戳继承。
2. 当通过 `Punctuator.punctuate()` 等周期性函数生成新的输出记录时，输出记录时间戳被定义为流任务的当前内部时间（通过 `context.timestamp()` 获取）。
3. 可以通过在调用 `forward()` 时将时间戳显式分配给输出记录来更改处理器 API 中的默认行为。
4. 聚合和联接计算规则：
   1. 对于具有 left 和 right 的连接 （stream-stream， table-table） input records 时，将分配输出记录的时间戳 `max(left.ts， right.ts)`。
   2. 对于流表联接，将向输出记录分配流记录中的时间戳。
   3. 对于聚合，Kafka Streams 还会计算`最大值` 每个键的所有记录的时间戳，全局（对于非窗口） 或每个窗口。
   4. 对于无状态操作，将传递输入记录时间戳。对于发出多条记录的 `flatMap` 和 siblings，所有输出记录都从相应的 input 记录继承时间戳。







**流分区和任务：**

Kafka 的消息收发层对数据进行分区，以便存储和传输数据。Kafka Streams 对数据进行分区以进行处理。在这两种情况下，这种分区都是实现数据局部性、弹性、可扩展性、高性能和容错能力的原因。Kafka Streams 使用**分区**和**任务**的概念作为其基于 Kafka 主题分区的并行模型的逻辑单元。 在并行性上下文中，Kafka Streams 和 Kafka 之间存在密切联系：

1. 每个**流分区**都是一个完全有序的数据记录序列，并映射到 Kafka **主题分区**。
2. 流中的数据**记录**映射到来自该主题的 Kafka **消息**。
3. 数据记录的**键**决定了 Kafka 和 Kafka Streams 中的数据分区，即数据如何路由到 Topic 中的特定分区。

通过将应用程序的处理器拓扑分解为多个任务来扩展应用程序。更具体地说，Kafka Streams 根据应用程序的输入流分区创建固定数量的任务，每个任务都分配了来自输入流的分区列表（即 Kafka 主题）。**分配给任务的分区永远不会改变**，因此每个任务都是应用程序的固定并行单元。然后，任务可以根据分配的分区实例化自己的处理器拓扑;它们还为每个分配的分区维护一个缓冲区，并一次处理来自这些记录缓冲区的消息。因此，流任务可以独立并行处理，无需人工干预。

稍微简化一下，应用程序可以运行的最大并行度受最大流任务数的限制，而流任务本身由应用程序正在读取的输入主题的最大分区数决定。例如，如果您的输入主题有 5 个分区，则您最多可以运行 5 个应用程序实例。这些实例将协作处理主题的数据。如果您运行的应用程序实例数多于输入主题的分区数，则“多余的”应用程序实例将启动，但保持空闲状态；但是，如果其中一个繁忙的实例宕机，其中一个空闲实例将恢复前者的工作。

重要的是要了解 Kafka Streams 不是一个资源管理器，而是一个库，它可以“运行”在流处理应用程序运行的任何位置。应用程序的多个实例要么在同一台计算机上执行，要么分布在多台计算机上，并且任务可以由库自动分配给运行应用程序实例的用户。**对任务的分区分配永远不会改变**；如果应用程序实例失败，则其分配的所有任务将在其他实例上自动重启，并继续使用同一流分区中的任务。

主题分区分配给任务，并将任务分配给所有实例上的所有线程，以尽最大努力在负载均衡和有状态任务的粘性之间进行权衡。对于此分配，Kafka Streams 使用 [StreamsPartitionAssign](https://github.com/apache/kafka/blob/trunk/streams/src/main/java/org/apache/kafka/streams/processor/internals/StreamsPartitionAssignor.java)，并且**不允许**您更改为其他分配器。如果您尝试使用不同的分配器，Kafka Streams 会忽略它。

![image-20250309201703759](http://47.101.155.205/image-20250309201703759.png)



**线程模型：**

Kafka Streams 允许用户配置库可用于在应用程序实例中并行处理的**线程**数。每个线程都可以独立执行一个或多个具有其处理器拓扑的任务。例如，下图显示了一个运行两个流任务的流线程：

![image-20250309201923771](http://47.101.155.205/image-20250309201923771.png)

启动应用程序的更多流线程或更多实例仅相当于复制拓扑并让它处理 Kafka 分区的不同子集，从而有效地并行化处理。值得注意的是，线程之间没有共享状态，因此不需要线程间协调。这使得跨应用程序实例和线程并行运行拓扑变得非常简单。Kafka Streams 利用 [Kafka 的协调](https://cwiki.apache.org/confluence/display/KAFKA/Kafka+Client-side+Assignment+Proposal)功能，透明地处理各种流线程之间 Kafka 主题分区的分配。

如上所述，使用 Kafka Streams 扩展您的流处理应用程序很容易：您只需启动应用程序的其他实例，Kafka Streams 负责在应用程序实例中运行的任务之间分配分区。您可以启动与输入 Kafka 主题分区数量一样多的应用程序线程，以便在应用程序的所有运行实例中，每个线程（或者更确切地说，它运行的任务）至少有一个输入分区要处理。



#### 流和表的对偶性

流和表的对偶性(Duality of Streams and Tables)。

**流的定义：**

1. 流是一个无界的数据序列，表示持续生成的事件记录。
2. 每条记录通常包含一个键（Key）和一个值（Value）。
3. 流是不可变的，新记录会追加到流的末尾。

**表的定义：**

1. 表是一个有界的数据集合，表示某个时间点的状态。
2. 表是可变的，可以通过插入、更新或删除操作来修改表中的记录。
3. 表通常用于存储聚合结果或物化视图。



**流作为表**：流可以被视为表的更改日志，其中流中的每个数据记录都捕获表的状态更改。因此，流是一个伪装的表，通过从头到尾重放 changelog 来重建表，可以很容易地将其变成一个 “真实” 的表。同样，在更一般的类比中，聚合流中的数据记录（例如从网页浏览事件流中计算用户的总网页浏览量）将返回一个表格（此处的键和值分别是用户及其相应的网页浏览量）。

**表作为流**：表可以被视为流中每个键在某个时间点的最新值的快照（流的数据记录是键值对）。因此，表是伪装的流，通过迭代表中的每个键值条目，可以很容易地将其转换为“真实”流。

![image-20250309181342534](http://47.101.155.205/image-20250309181342534.png)



#### 聚合

聚合作采用一个输入流或表，并通过将多个输入记录合并到单个输出记录中来生成一个新表。

在 Kafka Streams DSL 中，聚合的输入流可以是 KStream 或 KTable，但输出流将始终是 **KTable**。这允许 Kafka Streams 在生成和发出值后，在更多记录无序到达时更新聚合值。当发生此类无序到达时，聚合 KStream 或 KTable 会发出新的聚合值。由于输出是 KTable，因此在后续处理步骤中，新值被视为使用相同的键覆盖旧值。



#### 窗口

窗口化允许您控制如何将具有相同键的记录分组，以便进行有状态操作，例如聚合或联接到所谓的窗口中。按记录键跟踪窗口。

`Kafka Streams DSL` 中提供了`窗口操作`。使用窗口时，您可以为窗口指定宽**限期**。此宽限期控制 Kafka Streams 将等待给定窗口的**无序**数据记录的时间。如果记录在窗口的宽限期过后到达，则该记录将被丢弃，并且不会在该窗口中进行处理。具体来说，如果记录的时间戳指示该记录属于某个窗口，但当前流时间大于窗口结束时间加上宽限期，则会丢弃该记录。

四种类型的窗口：

1. 跳跃时间窗口（Hopping time window）：窗口大小固定，窗口重叠。
2. 滚动时间窗口（Tumbling time window）：窗口大小固定，窗口不重叠，窗口间无间隙。
3. 滑动时间窗口（Sliding time window）：窗口大小固定，窗口重叠，通过处理窗口时间戳的差异支持窗口重叠。
4. 会话窗口（Session Window）：窗口大小可动态调整，窗口不重叠，通过数据进行驱动。



无序记录在现实世界中总是可能的，应该在你的应用程序中适当地考虑。它取决于 Effective `time 语义`如何处理无序记录。在处理时间的情况下，语义是“当记录被处理时”，这意味着无序记录的概念不适用，因为根据定义，没有记录可以乱序。因此，无序记录只能被视为事件时间。在这两种情况下，Kafka Streams 都能够正确处理无序记录。



#### 状态

Kafka Streams 提供**状态存储**，流处理应用程序可以使用它来存储和查询数据。 在实施有状态作时，这是一项重要的功能。 Kafka Streams 中的每个任务都嵌入了一个或多个状态存储，可以通过 API 访问这些状态存储，以存储和查询处理所需的数据。 这些状态存储可以是持久化键值存储、内存中的 hashmap 或其他方便的数据结构。 Kafka Streams 为本地状态存储提供容错和自动恢复功能。

Kafka Streams 允许创建状态存储的流处理应用程序外部的方法、线程、进程或应用程序对状态存储进行直接只读查询。这是通过一个名为 **Interactive Queries** 的功能提供的。所有 store 都已命名，并且 Interactive Queries 仅公开底层实现的读取作。



Kafka Streams 应用程序中的每个流任务都可以嵌入一个或多个本地状态存储，这些状态存储可以通过 API 访问，以存储和查询处理所需的数据。Kafka Streams 为此类本地状态存储提供容错和自动恢复功能。

![image-20250309202218950](http://47.101.155.205/image-20250309202218950.png)



#### 保证次数

在流处理中，最常见的问题之一是”我的流处理系统是否保证每条记录只处理一次，即使在处理过程中遇到一些故障？ a”对于许多无法容忍任何数据丢失或数据重复的应用程序来说，不能保证 exactly-once 流处理会破坏交易，在这种情况下，通常会额外使用面向批处理的框架到流处理管道，称为 [Lambda 架构](http://lambda-architecture.net/)。 在 0.11.0.0 之前，Kafka 仅提供至少一次交付保证，因此任何将其用作后端存储的流处理系统都无法保证端到端的恰好一次语义。 事实上，即使那些声称支持恰好一次处理的流处理系统，只要它们以 source / sink 作为 Kafka 进行读取/写入，其应用程序实际上也无法保证 在整个管道中不会生成重复项。

自 0.11.0.0 版本以来，Kafka 增加了支持，允许其生产者以[事务性和幂等的方式](https://kafka.apache.org/documentation/#semantics)将消息发送到不同的主题分区。 因此，Kafka Streams 通过利用这些功能添加了端到端的 Exactly-once 处理语义。 更具体地说，它保证对于从源 Kafka 主题读取的任何记录，其处理结果将只反映在输出 Kafka 主题以及状态作的状态存储中一次。 请注意，Kafka Streams 端到端的 Exactly-once 保证与其他流处理框架声称的保证之间的主要区别在于，Kafka Streams 与底层 Kafka 存储系统紧密集成，并确保 对输入主题的提交偏移量、对状态存储的更新和对输出主题的写入将以原子方式完成，而不是将 Kafka 视为可能具有副作用的外部系统。

Exactly-once：https://cwiki.apache.org/confluence/display/KAFKA/KIP-129%3A+Streams+Exactly-Once+Semantics

从 2.6.0 版本开始，Kafka Streams 支持改进的 exactly-once 处理实现，称为“exactly-once v2”。 这需要 Broker 版本 2.5.0 或更高版本。 此实现效率更高，因为它降低了客户端和代理资源利用率，例如客户端线程和使用的网络连接。 它支持更高的吞吐量和改进的可扩展性。 从 3.0.0 版本开始，exactly-once 的第一个版本已被弃用。鼓励用户对 从现在开始进行 Exactly-once 处理，并在必要时通过升级他们的代理来做好准备。

Exactly-once-v2：https://cwiki.apache.org/confluence/display/KAFKA/KIP-447%3A+Producer+scalability+for+exactly+once+semantics



要在运行 Kafka Streams 应用程序时启用 exactly-once 语义， 设置 `processing.guarantee` 配置值（默认值为 **at_least_once**） 设置为 **StreamsConfig.EXACTLY_ONCE_V2**



#### 无序处理

除了保证每条记录将被恰好处理一次之外，许多流处理应用程序将面临的另一个问题是如何处理可能影响其业务逻辑[的无序数据](https://dl.acm.org/citation.cfm?id=3242155)。在 Kafka Streams 中，有两个原因可能 导致数据到达相对于其时间戳的顺序错误：

- 在主题分区中，记录的时间戳不能随其偏移量单调增加。由于 Kafka Streams 将始终尝试处理主题分区中的记录以遵循偏移量顺序，因此可能会导致时间戳较大（但偏移量较小）的记录比同一主题分区中时间戳较小（但偏移量较大）的记录更早得到处理。
- 在可能正在处理多个主题分区的[流任务](https://kafka.apache.org/35/documentation/streams/architecture#streams_architecture_tasks)中，如果用户将应用程序配置为不等待所有分区都包含一些缓冲数据，并且 从时间戳最小的分区中选择以处理下一条记录，然后稍后当为其他主题分区获取某些记录时，它们的时间戳可能小于从另一个主题分区获取的已处理记录。

对于无状态作，乱序数据不会影响处理逻辑，因为一次只考虑一条记录，而不查看过去处理记录的历史记录;但是，对于聚合和联接等有状态作，无序数据可能会导致处理逻辑不正确。如果用户想要处理此类乱序数据，通常需要允许应用程序等待更长的时间，同时在等待时间内对状态进行统计，即在延迟、成本和正确性之间做出权衡。特别是在 Kafka Streams 中，用户可以为窗口聚合配置其窗口运算符以实现此类权衡。

对于 Join，用户可以使用[版本化的状态存储](https://kafka.apache.org/35/documentation/streams/developer-guide/dsl-api.html#versioned-state-stores)来解决对无序数据的问题，但默认情况下不会处理无序数据：

- 对于 Stream-Stream 联接，所有三种类型（inner、outer、left）都可以正确处理无序记录。
- 对于 Stream-Table 联接，如果不使用版本控制的存储，则不会处理无序记录（即，Streams 应用程序不检查无序记录，只按偏移顺序处理所有记录），因此它可能会产生不可预知的结果。对于版本控制存储，流端无序数据将通过在表中执行基于时间戳的查找来正确处理。仍未处理表端无序数据。
- 对于 Table-Table 联接，如果不使用版本控制存储，则不会处理无序记录（即，Streams 应用程序不检查无序记录，只按偏移顺序处理所有记录）。 但是，join 结果是一个 changelog 流，因此最终将是一致的。使用版本控制存储，表-表联接语义从基于偏移量的语义更改为 [基于时间戳的语义](https://kafka.apache.org/35/documentation/streams/developer-guide/dsl-api.html#versioned-state-stores)和乱序记录将得到相应的处理。



#### 容错

Kafka Streams 基于 Kafka 中原生集成的容错功能构建。Kafka 分区具有高可用性和可复制性;因此，当流数据持久化到 Kafka 时，即使应用程序出现故障并需要重新处理它，它也可以使用。Kafka Streams 中的任务利用 Kafka 使用者客户端提供的容错功能来处理故障。如果任务在发生故障的计算机上运行，Kafka Streams 会自动在应用程序的剩余运行实例之一中重新启动该任务。

此外，Kafka Streams 还确保本地状态存储对故障也很健壮。对于每个状态存储，它维护一个复制的 changelog Kafka 主题，并在其中跟踪任何状态更新。 这些 changelog 主题也被分区，以便每个本地 state store 实例以及访问该 store 的任务都有自己专用的 changelog 主题分区。 在 changelog 主题上启用了[日志压缩](https://kafka.apache.org/35/documentation/#compaction)，以便可以安全地清除旧数据，以防止主题无限增长。 如果任务在发生故障的机器上运行并在另一台机器上重新启动，则 Kafka Streams 保证通过以下方式将其关联的状态存储恢复到发生故障之前的内容 在恢复对新启动的任务的处理之前重放相应的 changelog 主题。因此，故障处理对最终用户是完全透明的。

请注意，任务（重新）初始化的成本通常主要取决于通过重放状态存储的关联更改日志主题来恢复状态的时间。为了最大限度地缩短此还原时间，用户可以将其应用程序配置为具有本地状态**的备用副本**（即状态的完全复制副本）。当任务迁移发生时，Kafka Streams 会将任务分配给已存在此类备用副本的应用程序实例，以最大限度地降低任务（重新）初始化成本。请参阅 [**Kafka Streams 配置**](https://kafka.apache.org/35/documentation/#streamsconfigs)部分中的 `num.standby.replicas`。 从 2.6 开始，Kafka Streams 将保证仅将任务分配给具有完全捕获的状态本地副本的实例，如果此类实例 存在。备用任务将增加在发生故障时存在 caught up 实例的可能性。

您还可以配置具有机架感知功能的备用副本。配置后，Kafka Streams 将尝试将备用任务分发到与活动任务不同的“机架”上，从而在活动任务的机架发生故障时具有更快的恢复时间。请参阅 [**Kafka Streams 开发人员指南**](https://kafka.apache.org/35/documentation/streams/developer-guide/config-streams.html#rack-aware-assignment-tags) 部分中的 `rack.aware.assignment.tags`。



### 4.Connect API

Connect API 允许实现不断从某个源数据系统拉入 Kafka 或从 Kafka 推送到某个接收器数据系统的连接器。

文档地址：https://kafka.apache.org/documentation.html#connect




### 5.Admin API

https://kafka.apache.org/35/javadoc/index.html?org/apache/kafka/clients/admin/Admin.html

~~~pom
<dependency>
	<groupId>org.apache.kafka</groupId>
	<artifactId>kafka-clients</artifactId>
	<version>3.5.0</version>
</dependency>

~~~

管理或查看Kafka。

KafkaAdminClient常用的API

| API                    | 说明                   |
| ---------------------- | ---------------------- |
| createTopics           | 创建Topic              |
| deleteTopics           | 删除Topic              |
| describeTopics         | 查询Topic的详细信息    |
| describeCluster        | 查询集群信息           |
| describeConfigs        | 查询配置信息           |
| alterConfigs           | 修改配置信息           |
| alterReplicaLogDirs    | 修改副本的日志目录     |
| describeLogDirs        | 查询节点的日志目录信息 |
| describeReplicaLogDirs | 查询副本的日志目录信息 |
| createPartitions       | 增加分区               |
|                        |                        |



### 6.Spring for Kafka

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



### 7.Kafka可视化插件

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



## 4.核心概念

### 1.Kafka主题和分区

- 了解主题和分区的概念和原理
- 分区副本之间的关系
- Broker端管理Topic

Topic负责接收生产者发送的消息，消费者负责从Topic获取消息。Topic其实是一个逻辑概念，由分区组成。分区则是一个物理概念，一个Topic可以有多个分区，一个分区只能属于一个Topic。

生产者将消息发送至Kafka，实则是将消息发送至Topic的某个分区，并且被添加至分区的最后，通过偏移量来指定消息的位置。



在创建Topic时，还可以指定分区的副本数，通过增加分区的副本数，可以增加Kafka的容错性，通过多副本机制可以实现故障转移。在同一个分区中，存在一个Leader副本和多个Follower副本，它们保存的消息都是相同的。Leader副本负责处理读写请求，Follower副本负责从Leader副本同步消息。不同的副本可能位于不同的Broker上，当Leader副本出现故障时，Kafka会从Follower中选举新的Leader副本。分区的副本数也称为冗余度。



#### kafka-topics.sh

用命令操作和管理Topic

| 参数选项                      | 接参数值    | 作用                                                  |
| ----------------------------- | ----------- | ----------------------------------------------------- |
| --alter                       |             | 更改主题的分区数、副本配置、其它配置                  |
| --bootstrap-server            | kafka地址   | 连接对应的kafka服务端                                 |
| --command-config              | 文件路径    | 用于修改Broker的配置                                  |
| --config                      | topic的配置 | 修改topic的配置                                       |
| --create                      | /           | 创建Topic                                             |
| --delete                      | string      | 删除Topic                                             |
| --delet-config                | topic的配置 | 删除Topic中的配置                                     |
| --describe                    | string      | 列出Topic的详细信息                                   |
| --disable-rack-aware          | /           | 禁用机架感知副本配置机制                              |
| --exclude-internal            | /           | 列出信息排除内部主题                                  |
| --force                       |             | 取消控制台提示                                        |
| --help                        |             | 帮助                                                  |
| --list                        | /           | 列出所有的可用的Topic                                 |
| --partitions                  | int         | 指定创建Topic的分区数                                 |
| --replica-assignment          |             | 将Topic中的分区手动进行分配的分区Broker的列表         |
| --replication-factor          | int         | Topic中分区的副本数                                   |
| --topic                       | string      | Topic的名称                                           |
| --topic-with-overrides        |             | 描述主题时设置，仅显示已重写配置的主题                |
| --unavailable-partitions      |             | 描述主题时设置，仅显示Leader不可用的分区              |
| --under-min-isr-partitions    |             | 描述主题时设置，仅显示isr计数小于配置分区的分区最小值 |
| --under-replicated-partitions |             | 描述主题时设置，仅显示已经完全同步的分区              |
| --version                     |             | 显示Kafka的版本                                       |
| --zookeeper                   |             | 过期，zookeeper地址                                   |

**Isr表示列表中表示已经完成数据同步的副本号。**



#### kafka-configs.sh

用于查看或修改配置

| 参数          | 参数值 | 作用                                                         |
| ------------- | ------ | ------------------------------------------------------------ |
| --entity-name | string | 指定操作配置的名称：topic、client id、user principal name、broker id |
| --entity-type | string | 指定操作配置的类型：topics、clients、users、brokers、broker-loggers |
|               |        |                                                              |



### 2.消息的持久性

Java的磁盘IO操作有两个缺点：

- 存储缓存对象验证影响性能。
- 堆内存数据的增加导致Java垃圾回收的速度越来越慢。

因为磁盘线性写入性能远远大于随机写入的性能。底层操作系统对磁盘的线性写入进行了大量优化。所有Kafka在进行消息持久化操作时，写日志文件采用的就是磁盘的线性写入方式，从而解决了传统磁盘上写操慢的问题。

每个分区在存储层面就是一个append-only的日志文件，属于一个分区的消息会被追加到日志文件的尾部，每条消息在日志文件中的位置称为偏移量。

![image-20250309104738723](http://47.101.155.205/image-20250309104738723.png)



index文件存储元数据，即索引文件。

log文件存储消息，即数据文件。

可以使用Kafka自带工具kafka.tools.DumpLogSegments查看log日志文件中的数据信息。

~~~bash
./bin/kafka-run-class.sh kafka.tools.DumpLogSegments --help

./bin/kafka-run-class.sh kafka.tools.DumpLogSegments --files kafka_log_broker0/org.test1-0/00000000000000000000.log -- print-data-log

~~~

![image-20250309105457072](http://47.101.155.205/image-20250309105457072.png)



#### Log（官网）

具有两个分区的名为”my-topic“的主题的日志由两个目录（即my-topic-0和my-topic-1）组成，其中填充了包含该主题消息的数据文件。日志文件的格式是一系列“日志条目”；每个日志条目是一个4字节的整数N，存储消息长度，后面跟着N个消息字节。每条消息都由一个64位整数偏移量唯一标识，该偏移量给出了该消息在所有发送到该分区上的该主题的消息流中的起始字节位置。每个消息的磁盘格式如下所示。每个日志文件都使用其包含的第一条消息的偏移量来命名。因此，创建的第一个文件将是0000000000000000000.log，每个附加文件将具有一个整数名称，大约是前一个文件的S字节，其中S是配置中给出的最大日志文件大小。

记录的确切二进制格式作为标准接口进行版本控制和维护，因此可以在生产者、代理和客户端之间传输记录批次，而无需在需要时重新复制或转换。

使用 message offset 作为消息 ID 是不常见的。我们最初的想法是使用生产者生成的 GUID，并在每个代理上维护从 GUID 到 offset 的映射。但是，由于使用者必须维护每个服务器的 ID，因此 GUID 的全局唯一性没有提供任何值。此外，维护从随机 ID 到偏移量的 Map 的复杂性需要一个重量级的索引结构，该结构必须与磁盘同步，本质上需要一个完整的持久随机访问数据结构。因此，为了简化查找结构，我们决定使用一个简单的每个分区原子计数器，它可以与分区 ID 和节点 ID 耦合来唯一标识消息;这使得查找结构更简单，尽管每个使用者请求仍可能有多个 looked。然而，一旦我们确定了一个计数器，直接使用偏移量似乎是很自然的——毕竟两者都是分区独有的单调递增整数。由于偏移量对使用者 API 是隐藏的，因此此决定最终是一个实现细节，我们采用了更高效的方法。

![image-20250309104649434](http://47.101.155.205/image-20250309104649434.png)

**写：**

日志允许串行附加，这些附加总是转到最后一个文件。当此文件达到可配置的大小（例如 1GB）时，该文件将滚动到新文件。日志采用两个配置参数：**M**，它提供在强制 OS 将文件刷新到磁盘之前要写入的消息数，以及 **S**，它提供强制刷新的秒数。这提供了持久性保证，在系统崩溃时最多丢失 M 条消息或 S 秒的数据。



**读：**

通过给出消息的 64 位逻辑偏移量和 S 字节最大块大小来完成读取。这将返回 S 字节缓冲区中包含的消息的迭代器。S 旨在大于任何单个消息，但在消息异常大的情况下，可以重试多次读取，每次将缓冲区大小增加一倍，直到成功读取消息。可以指定最大消息和缓冲区大小，以使服务器拒绝大于某个大小的消息，并给客户端一个 Client 端一个最大读取量的绑定，以获得完整的消息。读取缓冲区很可能以部分消息结尾，这很容易通过大小定界来检测。

从 offset 读取的实际过程需要首先找到存储数据的 log segment 文件，根据全局 offset 值计算特定于文件的 offset，然后从该文件 offset 中读取。搜索是针对为每个文件维护的内存中范围的简单二进制搜索变体完成的。

该日志提供了获取最近写入的消息的功能，以允许客户端从“现在”开始订阅。当使用者未能在 SLA 指定的天数内使用其数据时，这也很有用。在这种情况下，当客户端尝试使用不存在的偏移量时，它会得到一个 OutOfRangeException，并且可能会根据用例重置自身或失败。



**删除：**

一次删除一个日志段的数据。日志管理器应用两个量度来识别符合删除条件的区段：time 和 size。对于基于时间的策略，会考虑记录时间戳，其中区段文件中的最大时间戳（记录顺序无关紧要）定义整个区段的保留时间。默认情况下，基于大小的保留处于禁用状态。启用后，日志管理器会不断删除最旧的 segment 文件，直到分区的总大小再次处于配置的限制范围内。如果同时启用两个策略，则将删除由于任一策略而符合删除条件的区段。为了避免锁定读取，同时仍然允许修改段列表的删除，我们使用写时复制样式的段列表实现，该实现提供一致的视图，以允许在删除过程中在日志段的不可变静态快照视图上继续进行二进制搜索。



**可靠性：**

日志提供了一个配置参数 *M*，该参数控制在强制刷新到磁盘之前写入的最大消息数。启动时，将运行一个日志恢复进程，该进程将迭代最新日志分段中的所有消息，并验证每个消息条目是否有效。如果消息的大小和偏移量之和小于文件的长度，并且消息负载的 CRC32 与消息中存储的 CRC 匹配，则消息条目有效。如果检测到损坏，日志将被截断为最后一个有效偏移量。

请注意，必须处理两种损坏：由于崩溃而丢失未写入块的截断，以及将无意义的块添加到文件中的损坏。这样做的原因是，一般来说，作系统不保证文件 inode 和实际块数据之间的写入顺序，因此，如果 inode 更新为新大小，则除了丢失写入数据外，文件还可能获得无意义的数据，但在写入包含该数据的块之前发生崩溃。CRC 检测到这种极端情况，并防止它损坏日志（尽管未写的消息当然会丢失）。



### 3.消息的传输保障

**生产者ack机制：**

生产者向Broker的分区Leader副本发送数据时，可以通过acks参数设置生产者数据可靠性的级别：

- 1：生产者在Broker分区的Leader副本成功接收，就发送下一条消息。
- 0：生产者不用等待来自服务端Broker的确认，继续发送下一条消息。
- all：默认，意味着生产者发送完数据后，需要等待Broker端Topic分区的所有Follower副本都完成与Leader副本的数据同步后，消息才算发送完成。



**消费者高水位线机制：**

LEO（Log End Offset），表示Topic分区中每个副本日志中最后一条消息的位置。

高水位线（high watermark）等于Topic分区中每个副本对应最小的LEO值。





### 2.3、消息传递模式

- 点对点模式
- 发布/订阅模式
- ...

### 2.4、Kafka配置

#### 2.4.1、Broker配置

Broker监听地址，支持的协议：

- PLAINTEXT：明文。
- SSL：使用 SSL/TLS 加密传输。
- SASL_PLAINTEXT：用 SASL 认证，但传输不加密。
- SASL_SSL：使用 SASL 认证，并且传输加密。



公网配置：

~~~properties
# 配置 47为公网ip
listeners=PLAINTEXT://0.0.0.0:9092
advertised.listeners=PLAINTEXT://47.101.155.205:9092

# 在安全组禁止的情况下，都提示连接超时。安全组关闭都能访问。
./bin/kafka-topics.sh  --list --bootstrap-server 172.24.117.21:9092
./bin/kafka-topics.sh  --list --bootstrap-server 47.101.155.205:9092

~~~

内外网分离配置：

~~~properties
listeners=INTERNAL://0.0.0.0:19092,EXTERNAL://0.0.0.0:9092
listener.security.protocol.map=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
advertised.listeners=INTERNAL://172.24.117.21:19092,EXTERNAL://47.101.155.205:9092
inter.broker.listener.name=INTERNAL

# 安全组网络禁用情况,可连接内网(ip或主机名)
./bin/kafka-topics.sh  --list --bootstrap-server 172.24.117.21:19092
./bin/kafka-topics.sh  --list --bootstrap-server root:19092
# 安全组网络禁用情况,外网不通
./bin/kafka-topics.sh  --list --bootstrap-server 47.101.155.205:9092

~~~



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

# 本地监听的地址
# 合法地址 PLAINTEXT://myhost:9092,SSL://:9091
# CLIENT://0.0.0.0:9092,REPLICATION://localhost:9093
# PLAINTEXT://127.0.0.1:9092,SSL://[::1]:9092
listeners=PLAINTEXT://9092 
# PLAINTEXT://0.0.0.0:9092,需要修改上面的属性值暴露ip,不然服务无法起来
# listeners=PLAINTEXT://myhost:9092,myhost必须是系统主机名才能启动

# 指定Kafka代理将向客户端和其他代理发布的侦听器地址。
# 默认null.如果与监听器配置属性不同,监听器发布到ZooKeeper供客户端连接使用.如果没有配置,会使用listeners的值.
# 如果listenrs配置成包含0.0.0.0,并且这个配置没有配置,这里会导致kafka-server启动失败,这个配置对与这个属性是无效的.
advertised.listeners=String 

# 保留kafka日志数据的目录地址
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
# 消息在日志中保持未压缩状态的最短时间
log.cleaner.min.compaction.lag.ms=0
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



~~~md
这样配置,bin/kafka-server-start.sh config/server.properties启动的服务器主机名需要改为oycm
sudo hostnamectl set-hostname <newhostname>可以修改主机名
下面的那一行配置是可以让其他服务器监听到kafka
同时bin/kafka-console-consumer.sh --topic org.test1 --from-beginning --bootstrap-server oycm:9092命令也需要改为oycm才能连接到

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
# 日志中保持未压缩状态的最短时间
min.compaction.lag.ms=0 

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
#acks=0 生产者将根本不等待来自服务器的任何确认,retries配置失效,为每条记录返回的偏移量将始终设置为-1
#acks=1 leader副本将记录写入其本地日志，但无需等待所有follower副本的完全确认即可响应,如果leader在响应之后，没有复制sollower完之前失败,则出现数据丢失
#acks=all leader将等待同步副本的完整集合来确认记录.这保证只要至少有一个同步副本保持活动状态,记录就不会丢失.效果等同-1配置
#启用幂等性需要这个配置值为“all”。如果设置了冲突的配置，并且幂等性没有显式启用，则幂等性被禁用
acks=all # [all, -1, 0, 1]

key.serializer=className # 实现org.apache.kafka.common.serializ.Serializer 接口的class
value.serializer=className # 实现org.apache.kafka.common.serializ.Serializer 接口的class
# Kafka服务端地址
bootstrap.servers=list 
# 生产者用于缓存等待发送到服务器的内存字节数。如果记录发送速度大于记录被提交到服务器的速度，缓存将耗尽，阻塞max.block.ms之后，则发送异常。RecordTooLargeException
buffer.memory=33554432
# 阻塞最大时间
max.block.ms=60000 

# Kafka 压缩消息机制
compression.type=none # none,gzip,snappy,lz4,zstd
# 启用幂等性，此值必须大于0。生产者发送消息失败的重试次数
retries=2147483647 

ssl.key.password=null #password
ssl.keystore.certificate.chain=null
ssl.keystore.key=null
ssl.keystore.location=null
ssl.keystore.password=null
ssl.truststore.certificates=null
ssl.truststore.location=null
ssl.truststore.password=null

# 当将多条记录发送到一个分区时，生产者将一批消息发送，生产者批量发送消息的大小（单位byte）。为0则禁用批处理
batch.size=16384 
#延迟发送消息，结合batch.size使用可以批处理发送消息（默认为0，意味着即使积累的消息小于batch.size也会立即发送）
linger.ms=0
# 每个请求的最大上限，如果大于Broker的message.max.bytes，生产者可能出现报错
max.request.size=1048576 

client.dns.lookup=use_all_dns_ips # resolve_canonical_bootstrap_servers_only

# 发出请求时传递给服务器的id字符串，生产者的唯一标识，方便日志记录、监控、配额管理和问题排查
client.id=null 

connections.max.idle.ms=540000  #9m 在此配置指定的毫秒数之后关闭空闲连接

# 调用send后，返回成功或失败的时间上线。发送消息的时间上限,大于request.timeout.ms+linger.ms，加上失败处置时间
delivery.timeout.ms=120000 


# 配置控制客户端等待请求响应的最大时间。如果在超时之前未收到响应，则客户端将在必要时重新发送请求.要大于Braker的replica.lag.time.max.ms配置，避免因为客户端重试导致消息重复的概率。为什么重复？
request.timeout.ms=30000 

# 没有设置这个,使用默认的分区策略,或者根据存在的key选择一个分区;org.apache.kafka.clients.producer.RoundRobinPartitioner,这种分区策略是将一系列连续记录中的每条记录发送到不同的分区(无论是否提供了“键”)，直到我们用完分区并重新开始。注意:有一个已知的问题会导致新批创建时分布不均匀。详情请查看KAFKA-9965。实现org.apache.kafka.clients.producer.Partitioner接口可以自定义分区器。通过指定class自定义分区策略
partitioner.class=class 

# 当设置为“true”时，生产者将不会使用记录键来选择分区。如果为“false”，当存在密钥时，生产者将根据密钥的散列选择分区。注意:如果使用自定义分区器，此设置不起作用。
partitioner.ignore.keys=false 

# 读取数据时使用的TCP接收缓冲区(SO_RCVBUF)的大小。如果取值为-1，则使用操作系统默认值
receive.buffer.bytes=32768
# 发送数据时要使用的TCP发送缓冲区(SO_SNDBUF)的大小。如果取值为-1，则使用操作系统默认值
send.buffer.bytes=131072

sasl.client.callback.handler.class=null #class 实现AuthenticateCallbackHandler接口的SASL客户机回调处理程序类的完全限定名称
sasl.jaas.config=null # password
sasl.kerberos.service.name=null # string
sasl.login.callback.handler.class=null #class
sasl.login.class=null #class
sasl.mechanism=GSSAPI # 
sasl.oauthbearer.jwks.endpoint.url=null
sasl.oauthbearer.token.endpoint.url=null # 

security.protocol=PLAINTEXT # PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL和broker沟通的协议


socket.connection.setup.timeout.max.ms=30000 # 
socket.connection.setup.timeout.ms=10000 # 

ssl.enabled.protocols=TLSv1.2 #
ssl.keystore.type=JKS # JKS, PKCS12, PEM
ssl.protocol=TLSv1.2
ssl.provider=null
ssl.truststore.type=JKS # JKS, PKCS12, PEM


auto.include.jmx.reporter=true # 	

enable.idempotence=true # true生产者将确保在流中只写入每个消息的一个副本,幂等性要求max.in.flight.requests.per.connection<=5,retries >0,acks=all

# 客户端将在单个连接上发送的未确认请求的最大数量。如果此配置设置为大于1且enable.idempotence设置为 false，则存在由于重试而导致发送失败后消息重新排序的风险；如果禁用重试或 enable.idempotence 设置为 true，则将保留顺序。
max.in.flight.requests.per.connection=5

interceptor.classes='' #  By default, there are no interceptors.

# 超过这个时间间隔，系统自动更新元数据。包含Topic、副本、分区、Broker信息。
metadata.max.age.ms=300000
# 生产者缓存Topic元数据，上次访问Topic至现在超过空闲时间，则Topic的元数据被抛弃，下次访问Topic强制获取元数据
metadata.max.idle.ms=300000

metric.reporters='' # list
metrics.num.samples=2 # 
metrics.recording.level=INFO # [INFO, DEBUG, TRACE]
metrics.sample.window.ms=30000 # 

partitioner.adaptive.partitioning.enable=true # 
partitioner.availability.timeout.ms=0 # 

# 客户端重连的最大时间，每次重连失败，会增加这个时间
reconnect.backoff.max.ms=1000 
# 客户端重连的间隔时间
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

# 生产者主动终结当前操作的最大时间，不能>transaction.max.timeout.ms，大于则请求失败且报错InvalidTxnTimeoutException
transaction.timeout.ms=60000

# 用于事务性传输的 TransactionalId。这将启用跨多个生产者会话的可靠性语义，因为它允许客户端保证在开始任何新事务之前已经完成了使用相同 TransactionalId 的事务。如果未提供 TransactionalId，则生产者仅限于幂等传输。如果配置了 TransactionalId，则隐含 enable.idempotence。默认情况下，未配置 TransactionId，这意味着无法使用事务。请注意，默认情况下，事务需要至少三个代理的集群，这是 production 的推荐设置;对于 Development，您可以通过调整 Broker Setup transaction.state.log.replication.factor 来更改此设置。
transactional.id=null # 事务消息


~~~



#### 2.4.4、Consumer配置

~~~properties
key.deserializer=class # 实现了org.apache.kafka.common.serialization.Deserializer 接口的class
value.deserializer=class # 实现了org.apache.kafka.common.serialization.Deserializer 接口的class

bootstrap.servers=list # kafka服务器的ip+port,host1:port1,host2:port2,... 

# 消费者请求一次最小的响应数据单位字节,如果服务端没有足够的数据返回，则会等待至超时返回
fetch.min.bytes=1 
# 50MB 消费者在一次请求中返回最大的字节数。消费者消费消息的最大值不由这个决定，而是Broker配置决定
fetch.max.bytes=52428800 
# 消费一次fetch.min.bytes没达到这个标准的阻塞时间
fetch.max.wait.ms=500 

# 表示消费者组的唯一字符串
group.id=null 

heartbeat.interval.ms=3000 # The expected time between heartbeats to the consumer coordinator when using Kafka's group management facilities.The value must be set lower than session.timeout.ms, but typically should be set no higher than 1/3 of that value.
session.timeout.ms=45000 #45s kafka消费者与broker的超时时间,group.min.session.timeout.ms group.max.session.timeout.ms

# 每个分区返回给消费者的最大消息，设置比消息小，不会影响消费message.max.bytes (broker/topic config)
max.partition.fetch.bytes=1048576

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
# anything else 其他值，向消费者抛出异常

client.dns.lookup=use_all_dns_ips # [use_all_dns_ips, resolve_canonical_bootstrap_servers_only]
# 在此配置指定的毫秒数之后关闭空闲连接
connections.max.idle.ms=540000  

default.api.timeout.ms=60000 # 1m Specifies the timeout for client APIs

# 消费组是否自动提交消费的进度，默认true
enable.auto.commit=true # If true the consumer's offset will be periodically committed in the background.
# enable.auto.commit设置为true，自动提交偏移量的频率（提交消费进度的时间）
auto.commit.interval.ms=5000 

# 是否公开kafka的默认主题，默认开启
exclude.internal.topics=true

group.instance.id=null # string 和消费组相关（静态相关）

isolation.level=read_uncommitted # [read_committed, read_uncommitted] 读取事务性消息设置,非事物消息不受控制

max.poll.interval.ms=300000 # The maximum delay between invocations of poll() when using consumer group management. 这为消费者在获取更多记录之前可以空闲的时间设置了上限。如果在此超时到期之前未调用poll()，则认为消费者失败，组将重新平衡，以便将分区重新分配给另一个成员
# 消费者一次拉取请求的最大消息数
max.poll.records=500 # 并不影响底层的抓取行为。消费者将缓存来自每个获取请求的记录，并从每个轮询中增量地返回它们。

# 消费者的分区分配策略
partition.assignment.strategy=class org.apache.kafka.clients.consumer.RangeAssignor,class org.apache.kafka.clients.consumer.CooperativeStickyAssignor 客户端将使用这些策略在消费者实例之间分配分区所有权
# RangeAssignor 基于每个主题分配分区
# RoundRobinAssignor 以循环方式将分区分配给消费者。
# StickyAssignor 保证分配达到最大平衡，同时保留尽可能多的现有分区分配
# CooperativeStickyAssignor 遵循相同的StickyAssignor逻辑，但允许协作再平衡
# org.apache.kafka.clients.consumer.ConsumerPartitionAssignor自定义接口实现


# 配置控制客户端等待请求响应的最大时间
request.timeout.ms=30000

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
# 发送数据时要使用的TCP发送缓冲区,-1 default OS
send.buffer.bytes=131072 
# 读取数据时使用的TCP接收缓冲区(SO_RCVBUF)的大小。如果取值为-1，则使用操作系统默认值
receive.buffer.bytes=65536

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

# 拦截器org.apache.kafca.clients.consumer.Consumerinterceptor
interceptor.classes= string

metric.reporters= # org.apache.kafka.common.metrics.MetricsReporter 实现系统监控通过JMX
metrics.num.samples=2 # The number of samples maintained to compute metrics.
metrics.recording.level=INFO # [INFO, DEBUG, TRACE]
metrics.sample.window.ms=30000 # 

# 
reconnect.backoff.max.ms=1000 # 
# 重连间隔时间
reconnect.backoff.ms=50 

retry.backoff.ms=100 # 在尝试重试对给定主题分区的失败请求之前等待的时间

security.providers=null # string org.apache.kafka.common.security.auth.SecurityProviderCreator

# 以毫秒为单位，元数据过期时间，在此之后，即使我们没有看到任何分区领导更改以主动发现任何新的代理或分区，我们也会强制刷新元数据。
metadata.max.age.ms=300000 


~~~

max.poll.records=500





## 4.高级特性和性能优化



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



## 5.实际应用

- 数据流处理和Kafka Streams、数据流优化
- 数据集成和Kafka Connect
- 主题和分区设计
- 重复消息处理
- 与其他系统的集成
- ...



## 6.监控和运维

- Kafka集群监控
- 日志管理、备份和恢复
- ...



**Kafka Broker指标：**

| 指标                                  | 作用                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| UnderReplicationPartitions            | 处于同步状态的副本数(Isr)应该和总副本数(Ar)完全相等          |
| IsrShrinkPerSec<br />IsrExpandsPerSec |                                                              |
| ActiveControllerCount                 | 维护分区Leader列表                                           |
| OfflinePartitionsCount                | 没有活跃Leader的分区数                                       |
| LeaderElectionRateAndTimeMs           | Leader选举频率和集群无Leader状态的时长                       |
| UncleanLeaderElectionsPerSec          | 寻找分区Leader节点出现问题                                   |
| TotalTimesMs                          | queue：处于请求队列中的等待时间<br />local：Leader节点处理的事件<br />remote：等待Fellower节点响应时间<br />response：发送响应的时间 |
| BytesInPerSec<br />BytesOutPerSec     | Kafka的吞吐量                                                |



**生产者指标：**

| 指标                 | 作用                     |
| -------------------- | ------------------------ |
| Response rate        | 生产者发送到Broker的速率 |
| Request rate         | 生产者发送到Broker的速率 |
| Requeset latency avg | 平均请求延迟             |
| Outgoing byte rate   | 生产者的网络吞吐量       |
| IO wait time ns avg  | 生产者的I/O等待时间      |



**消费者指标：**

| 指标               | 作用                                         |
| ------------------ | -------------------------------------------- |
| ConsumerLag MaxLag | 消费者当前的日志偏移量相对生产者的日志偏移量 |
| BytesPerSec        | 消费者的网络吞吐量                           |
| MessagePerSec      | 消息的消费速度                               |



### Kafka Manager



### Kafka Tool



### Jconsole

