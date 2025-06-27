# ZooKeeper

[ZooKeeper官网](https://zookeeper.apache.org/)

[ZooKeeper官网文档](https://zookeeper.apache.org/doc/current/index.html)

[ZooKeeper下载地址](https://zookeeper.apache.org/releases.html)

ZooKeeper是中心服务，用于维护配置信息、命名、提供分布式同步、提供组服务。



## ZooKeeper介绍

ZooKeeper：用于分布式应用程序的分布式协调服务。它公开了一组简单的**基元**，分布式应用程序可以基于这些基元进行构建，以实现更高级别的同步、配置维护以及组和命名服务。使用**文件系统目录树**结构为数据模型。



**设计**：ZooKeeper允许分布式进程通过共享的分层命名空间（类似于标准文件系统）相互协调。命名空间由数据寄存器(Data Registers)（在ZooKeeper中称为znodes）组成，在ZooKeeper中，数据寄存器类似于文件和目录。与为存储而设计的典型文件系统不同，ZooKeeper数据保存在内存中，可以实现高吞吐量和低延迟。ZooKeeper实现非常重视**高性能**、**高可用**、**严格顺序访问**。可以在大型分布式系统使用；可以用来做分布式锁。

组成ZooKeeper集群的ZooKeeper服务之间需要彼此了解。客户端连接到单个的ZooKeeper服务器。客户端维持一个TCP连接，通过该连接发送请求、获取响应、获取监听事件以及发送心跳检测。如果与服务器的TCP连接断开，客户端会参试连接到其它服务器。

![image-20250619171458573](http://47.101.155.205/image-20250619171458573.png)



**分层命名空间数据模型**：名称是由斜杠`/`分隔的路径元素序列。ZooKeeper命名空间中的每个节点都有一个路径标识。

![image-20250620172356828](http://47.101.155.205/image-20250620172356828.png)

**节点和临时节点**：与标准文件系统不同，ZooKeeper命名空间的每个节点可以具有和其关联的数据的子节点，子节点旨在存储协调数据：状态信息、配置、位置信息等。这个就是`znode`。znodes维护stat结构，其中包括数据更改、ACL(Access Control List)更改和时间戳的版本号，以允许缓存验证和协调更新。每次znode数据发生变化时，版本号都会增加。命名空间中的znode的数据都是原子读取和写入的。每个节点有个ACL(访问控制列表)，用于限制谁可以执行哪些操作。ZooKeeper还有临时节点的概念，只要创建znode的会话活动，znode就存在。会话结束时，znode被删除。

**条件更新和监控**：客户端可以在znode上设置监控，当znode发生变化时，将触发一个watch，客户端会受到znode更改的数据包。当客户端和其中一个ZooKeeper服务器端口连接，客户端将受到本地通知。**3.6新功能**：客户端可以在znode上设置永久的递归监控，这些监控出发时不会被删除，并且会以递归的方式触发已注册的znode以及任何子节点的更改。



**服务保证**：

- 顺序一致性：来自客户端的更新将按顺序应用。
- 原子性：要么成功要么失败。
- 单个系统镜像：不管客户端连接哪个服务端，都见看到相同的视图。
- 可靠性：数据更新后，将从改时间一直存在，直到客户端更新。
- 及时性：系统客户端视图在特定时间保证是最新的。



**简单的API**：ZooKeeper服务端设计提供了简单的API

- 创建(create)：在树中某个位置创建node
- 删除(delete)：删除某个node
- 校验是否存在(exists)：校验某个位置是否存在node
- 读取(get node)：读取这个node的数据
- 写入(set node)：往node写入数据
- 读取子节点(get children)：查找这个node的子节点
- 同步(sync)：等待数据传播



**高可用数据读写实现**：

![image-20250620172356828](http://47.101.155.205/image-20250622210635620.png)

复制数据库(Replicated Database)包含整个数据树的内存数据库。在更新操作应用内存数据库之前，更新日志被序列化记录到磁盘以实现可恢复性。

每个ZooKeeper服务端都可以为客户端提供服务。客户端只连接一个服务提交请求。读取请求从服务器数据库的本地副本获取数据。更改服务状态的请求有一致性协议(agreement protocol)处理。

一致性协议：来自客户端的所有请求都会被转发到单个服务器，称为`leader`；其余的ZooKeeper服务器被称为`followers`，接收来自leader的消息建议并就消息传递达成一致。消息传递层负责替换失败的leader，并见followers和leader同步。

ZooKeeper使用自定义的原子消息传递协议。由于消息收发层是原子的，因此ZooKeeper可以保证本地副本永远不会有分歧(diverge)。当leader受到写请求时，它计算要应用写请求时系统的状态，并将其转换为捕获此新状态的事务。



## ZooKeeper使用入门

ZooKeeper部署服务器建议：双核处理器、2GB内存、80GB硬盘内存。




### 单机启动

**配置文件conf/zoo.cfg(默认配置文件名称)**：

~~~conf
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181

~~~



**启动命令**：

~~~bash
# 解压缩包，将apache-zookeeper-3.8.4-bin 修改为 apache-zookeeper-3.8.4
tar -zxf apache-zookeeper-3.8.4-bin.tar.gz --transform 's/apache-zookeeper-3.8.4-bin/apache-zookeeper-3.8.4/'

bin/zkServer.sh start


~~~

![image-20250625150201074](http://47.101.155.205/image-20250625150201074.png)



**启动携带了jmx相关参数，但是没有指定端口，无法远程连接。**

![image-20250625165756102](http://47.101.155.205/image-20250625165756102.png)



**暴露JMX端口**：修改`zkEnv.sh`文件，在命令中添加`export JMXPORT="port"`配置JMX暴露端口。

![image-20250625172326029](http://47.101.155.205/image-20250625172326029.png)



### 客户端命令

[CLI文档](https://zookeeper.apache.org/doc/current/zookeeperCLI.html)

**命令行连接操作：**

~~~bash
bin/zkCli.sh -server 127.0.0.1:2181

~~~

![image-20250625150739437](http://47.101.155.205/image-20250625150739437.png)



**help**：查询可用命令及说明。

![image-20250625151144699](http://47.101.155.205/image-20250625151144699.png)



- create path [data]：`create /zk_oycm ouyangcm`创建名为zk_oycm的znode并和数据相关联。
- ls path：查询znode(目录)的子节点。
- get -s path：查询znode关联的数据，`-s`。
- set path data：修改znode关联的数据。
- delete path：删除znode节点。
- 



### 集群启动

集群部署建议使用**奇数**台服务器，最少3台服务器。

**如果三台ZooKeeper服务器，它们的网线都插入了同一个网络交换机，那么交换机的故障将导致整个集群瘫痪。**

**conf目录下创建配置文件zoo.cfg：**

~~~conf
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/opt/zookeeper/data
clientPort=2181

# 集群节点配置（所有节点配置相同）
server.1=node1:2888:3888
server.2=node2:2888:3888
server.3=node3:2888:3888
# node1 node2 node3需在 /etc/hosts 中配置或使用DNS解析

~~~



**每个服务器创建内容唯一的myid文件**

~~~bash
node1 1
node2 2
node3 3

~~~



**启动命令：**

~~~bash
bin/zkServer.sh

java -cp zookeeper.jar:lib/*:conf org.apache.zookeeper.server.quorum.QuorumPeerMain zoo.conf

~~~

















## 管理ZooKeeper

ZooKeeper的可靠性取决于两个假设：

1. 部署中的服务器只有少数会失败。失败的意思是计算机崩溃，网络中的某些错误将服务器与大多服务器断开连接。
2. 部署的计算机正常运行。系统时间、存储和网络一起正常运行。

**N个服务的ZooKeeper集群，如果N是奇数，集群能够容忍最多N/2服务故障，而不会丢失任何数据；如果N是偶数，集群能够容忍最多(N/2 -1)服务故障而不会数据丢失，并防止“大脑分裂”问题。**



JVM启动参数：发生`OutOfMemoryError`错误，停止程序并生成堆转储文件。

~~~bash
# Linux
-XX:+HeapDumpOnOutOfMemoryError -XX:OnOutOfMemoryError='kill -9 %p'

# Windows
"-XX:+HeapDumpOnOutOfMemoryError" "-XX:OnOutOfMemoryError=cmd /c taskkill /pid %%%%p /t /f"

~~~





### 维护

**ZooKeeper的数据目录存储快照和事务日志。当对znode进行修改时，修改将追加到事务日志。当日志变大时，所有znodes的当前状态的快照会写入到文件，并为未来的事务创建一个新的事务日志文件。在快照期间，事务继续追加操作到旧的日志文件中。因此，一些比快照更新更快的事务记录会在上一个快照的最后一个事务日志文件中找到。**

使用默认配置时，ZooKeeper服务器不会删除旧的快照和日志文件。

[ZooKeeper命令介绍文档](https://zookeeper.apache.org/doc/current/zookeeperTools.html)



**故障排查：**

`A server might not be able to read its database and fail to come up because of some file corruption in the transaction logs of the ZooKeeper server.`因为ZooKeeper服务的事务日志文件损坏，服务可能无法读取数据库并无法启动。在加载时会看见ZooKeeper数据库时会看见IOException。在这种情况下，确保集群中的其它服务器启动并运行正常。可以在命令行用`stat`检测状态，在验证其它服务器已启动时，可以继续清理损坏的数据库文件。删除`datadir/version-2`和`datalogdir/version-2/`中的所有文件，并重启。



### 配置

#### 最低配置

- clientPort：监听客户端的端口。
- secureClientPort：SSL连接指定端口。
- observerMasterPort：监听观察者的端口。
- dataDir：ZooKeeper存储内存中数据的数据库快照位置，除非有指定，否则也存储事务更新记录日志。
- tickTime：单位毫秒，ZooKeeper使用的基本时间单位。心跳检测时间，最小会话超时时间是tickTime的两倍。







- initLimit：Follower和Leader完成同步的最大时间，时间单位是tickTime。
- syncLimit：Leader和Follower之间心跳检测或数据同步的最大延迟响应，时间单位是tickTime。
- autopurge.snapRetainCount：
- autopurge.purgeInterval：

### 高级配置

可选的配置，用来微调ZooKeeper服务器行为。有些可以使用Java系统属性配置，通常采用`zookeeper.keyword`形式配置。

- dataLogDir：无Java系统属性。指定事务日志写入的位置。这允许使用专用日志设备，并有助于避免日志记录和快照之间的竞争。
- globalOutstandingLimit：`zookeeper.globalOutstandingLimit`。客户端提交请求的速度比`ZooKeeper`处理请求的速度要快，尤其是在客户端很多的情况下。为了防止ZooKeeper因排队请求而耗尽内存，ZooKeeper将限制客户端，以便整个集合中不超过`globalOutstandingLimit`未完成的请求，平均分配。默认限制为1000，例如，如果有`3`个成员，每个成员将有`1000 / 2 = 500`个单独的限制。
- preAllocSize：`zookeeper.preAllocSize`。为避免查找，ZooKeeper 在事务日志文件中以 preAllocSize KB 的块分配空间。默认块大小为 64M。更改块大小的一个原因是，如果更频繁地拍摄快照，则可以减小块大小。



### 集群

