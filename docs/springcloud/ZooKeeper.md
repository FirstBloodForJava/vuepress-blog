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

集群部署建议使用**奇数**台服务器，最少3台服务器。

**如果三台ZooKeeper服务器，它们的网线都插入了同一个网络交换机，那么交换机的故障将导致整个集群瘫痪。**



### 集群启动

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



### 单机启动

**配置文件conf/zoo.cfg**：

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





### ZooKeeper服务端配置说明

- tickTime：单位毫秒，心跳检测时间，最小会话超时时间是tickTime的两倍。
- dataDir：存储内存数据库快照的位置，除非有执行，否则页存储事务更新日志。
- clientPort：监听客户端的断开。

