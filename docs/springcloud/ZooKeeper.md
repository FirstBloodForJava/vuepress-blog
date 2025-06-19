# ZooKeeper

[ZooKeeper官网](https://zookeeper.apache.org/)

[ZooKeeper官网文档](https://zookeeper.apache.org/doc/current/index.html)

ZooKeeper是中心服务，用于维护配置信息、命名、提供分布式同步、提供组服务。



## ZooKeeper介绍

ZooKeeper：用于分布式应用程序的分布式协调服务。它公开了一组简单的**基元**，分布式应用程序可以基于这些基元进行构建，以实现更高级别的同步、配置维护以及组和命名服务。使用**文件系统目录树**结构为数据模型。



**设计**：ZooKeeper允许分布式进程通过共享的分层命名空间（类似于标准文件系统）相互协调。命名空间由数据寄存器(Data Registers)（在ZooKeeper中称为znodes）组成，在ZooKeeper中，数据寄存器类似于文件和目录。与为存储而设计的典型文件系统不同，ZooKeeper数据保存在内存中，可以实现高吞吐量和低延迟。ZooKeeper实现非常重视**高性能**、**高可用**、**严格顺序访问**。可以在大型分布式系统使用；可以用来做分布式锁。

组成ZooKeeper集群的ZooKeeper服务之间需要彼此了解

![image-20250619171458573](http://47.101.155.205/image-20250619171458573.png)



