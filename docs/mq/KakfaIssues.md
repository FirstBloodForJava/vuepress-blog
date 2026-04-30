# Kafka 问题



## 1. MaxDirectMemorySize 配置不当

Java 程序 JVM 直接内存配置不当，可能会导致消费者消费内存溢出：**org.springframework.kafka.listener.KafkaMessageListenerContainer - Error while stopping the container: java.lang.OutOfMemoryError: Direct buffer memory**

~~~bash
-Xms2048M
-Xmx8192M
-XX:MaxDirectMemorySize=512M
~~~



**controller 线程同步发送消息到 kafka，直接内存溢出，导致工作线程不会被解锁，死锁。**

~~~java
// controller 到 kafka 发送者
Producer<String, byte[]> producer = new KafkaProducer<>(props);
// 需要 producer 线程唤醒
producer.send(producerRecord).get();

~~~

![image-20260429110628977](http://47.101.155.205/image-20260429110628977.png)

~~~java
"http-nio-9090-exec-5" #88 daemon prio=5 os_prio=0 tid=0x00007f30fd2a7800 nid=0x1a5d1 waiting on condition [0x00007f30737f5000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x000000008313ecd0> (a java.util.concurrent.CountDownLatch$Sync)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(AbstractQueuedSynchronizer.java:836)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.doAcquireSharedInterruptibly(AbstractQueuedSynchronizer.java:997)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireSharedInterruptibly(AbstractQueuedSynchronizer.java:1304)
	at java.util.concurrent.CountDownLatch.await(CountDownLatch.java:231)
	at org.apache.kafka.clients.producer.internals.ProduceRequestResult.await(ProduceRequestResult.java:76)
	at org.apache.kafka.clients.producer.internals.FutureRecordMetadata.get(FutureRecordMetadata.java:62)
	at org.apache.kafka.clients.producer.internals.FutureRecordMetadata.get(FutureRecordMetadata.java:30)
	at com.easipass.gateway.route.service.impl.SenderKafkaImpl.send(SenderKafkaImpl.java:65)
~~~

**解决方式：**

1. 直接内存配置参数优化；
2. 生产者发送同步等待设置超时时间。





**KafkaProducer 关闭前，flush 死锁问题：**

~~~java
// controller 到 kafka 发送者
Producer<String, byte[]> producer = new KafkaProducer<>(props);
// 异步发送消息，不等待结果
producer.send(producerRecord);

producer.flush();
~~~

~~~log
"pool-2-thread-1" #131 prio=5 os_prio=0 tid=0x00007f50102d6800 nid=0x14880 waiting on condition [0x00007f4f6f9f7000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x0000000082f20208> (a java.util.concurrent.CountDownLatch$Sync)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(AbstractQueuedSynchronizer.java:836)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.doAcquireSharedInterruptibly(AbstractQueuedSynchronizer.java:997)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireSharedInterruptibly(AbstractQueuedSynchronizer.java:1304)
	at java.util.concurrent.CountDownLatch.await(CountDownLatch.java:231)
	at org.apache.kafka.clients.producer.internals.ProduceRequestResult.await(ProduceRequestResult.java:76)
	at org.apache.kafka.clients.producer.internals.RecordAccumulator.awaitFlushCompletion(RecordAccumulator.java:1092)
	at org.apache.kafka.clients.producer.KafkaProducer.flush(KafkaProducer.java:1259)
	at com.easipass.gateway.route.service.impl.SenderKafkaImpl.destroy(SenderKafkaImpl.java:92)
~~~



生产者出现 `kafka-producer-network-thread` 线程死亡，`producer.flush()`，可能导致死锁。

![image-20260429153941071](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20260429153941071.png)

**解决方式**：flush 没有提供超时方法，避免调用 flush 方法。







