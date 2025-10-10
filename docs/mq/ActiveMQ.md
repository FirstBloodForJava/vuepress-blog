# ActiveMQ

## 1.ActiveMQ介绍

ActiveMQ是开源的、多协议的，基于Java开发的消息中间件。

ActiveMQ现在有两个可选的版本：classic-经典版、Artemis-下一代版本。

Artemis初始迁移文档：https://activemq.apache.org/components/artemis/migration

Artemis开发路线：https://activemq.apache.org/activemq-artemis-roadmap

![JVM内存模型](http://47.101.155.205/image-20231202213702422.png)

classic-经典版下载地址：https://activemq.apache.org/components/classic/download/

classic版本文档：https://activemq.apache.org/components/classic/documentation

Artemis版本下载地址：https://activemq.apache.org/components/artemis/download/

Artemis版本文档：https://activemq.apache.org/components/artemis/documentation/



## 2.ActiveMQ入门

官网文档：https://activemq.apache.org/getting-started#AdditionalResources

安装目录文档：`docs/WebConsole-README.txt`

### 2.1.预安装要求

内存：

ActiveMQ5.x二进制发行版需要60MB的磁盘空间安装(需要额外的磁盘空间来存储持久性消息到磁盘)。

ActiveMQ 5.x 源码或开发者版本需要约 300 MB 的空闲磁盘空间。



系统：

Windows系统：Windows XP SP2,Windows 2000,Windows Vista,Window 7.

Unix系统：Ubuntu Linux,Powerdog Linux,MacOS,AIX,HP-UX,Solaris,或者任何支持Java的Unix系统。



环境：

JRE1.8，ActiveMQ5.15.0之前可以是1.7，ActiveMQ5.10.0之前可以是1.6。

JAVA_HOME环境变量必须设置为JRE安装目录。

maven3.0.0构建工具(需要重新编译源码)。

将要使用的jar添加到类路径中(需要重新编译源码时)。





### 2.2.Windows安装

#### 解压缩安装

![image-20231204221338663](http://47.101.155.205/image-20231204221338663.png)



1. https://activemq.apache.org/download地址下载apache-activemq-x.x.x-bin.zip文件，将zip文件解压到安装目录。
2. 启动ActiveMQ

~~~bash
# Windos命令启动
cd [activemq_install_dir]

# 在安装目录的bin目录下
bin\activemq start

~~~

![启动报错,java版本太低](http://47.101.155.205/image-20231205213933921.png)

![image-20231205214239759](http://47.101.155.205/image-20231205214239759.png)

**ActiveMQ的启动会相对于当前目录创建工作目录，为了能在正确的位置创建工作目录，ActiveMQ必须中安装目录启动。**

3. 测试是否安装成功：
   1. 打开浏览器管理界面：http://127.0.0.1:8161/admin/，登录名：admin，密码：admin
   2. 选择`Queues`，添加一个队列的名称，点击`create`
   3. 点击`Send to`发送测试消息
4. 启动成功，在控制台会有日志，也可以在[activemq_install_dir]/data/activemq.log查看日志

~~~bash
Apache ActiveMQ 5.11.1 (localhost, ID:ntbk11111-50816-1428933306116-0:1) started | org.apache.activemq.broker.BrokerService | main

~~~

5. ActiveMQ默认61616端口，可以另开窗口测试端口是否被占用。

~~~bash
netstat -an|find "61616"

# linux系统
netstat -nl | grep 61616

~~~

![image-20231205214434574](http://47.101.155.205/image-20231205214434574.png)

6. 停止ActiveMQ

~~~bash
# 在控制台可以ctel+c停止,后台运行停止使用命令
cd [activemq_install_dir]/bin
./activemq stop

~~~

![image-20231205214542401](http://47.101.155.205/image-20231205214542401.png)





**源代码安装：**

1. https://activemq.apache.org/download地址下载apache-activemq-x.x.x-source-release.zip文件，将zip文件解压到安装目录。
2. 在安装目录执行mvn clean install命令，如果失败，添加-Dmaven.test.skip=true参数执行。也可以通过idea执行mvn idea:idea。
3. 启动MQ：同解压缩安装方式启动

~~~bash
cd [activemq_install_dir]\assembly\target
unzip activemq-x.x-SNAPSHOT.zip
cd activemq-x.x-SNAPSHOT
bin\activemq

~~~



#### 快照安装

Windows开发者快照版本地址：https://repository.apache.org/content/repositories/snapshots/org/apache/activemq/apache-activemq/，根据下载文件类型，可以安装前面的解压缩安装或源代码安装方式。




### 2.3.Unix系统安装

#### 二进制版本安装

1. 下载压缩文件，Unix系统可以使用浏览器或者工具：wget、scp、ftp等
2. 启动ActiveMQ

~~~bash
# wget下载命令
wget http://activemq.apache.org/path/tofile/apache-activemq-x.x.x-bin.tar.gz

# 解压缩文件
cd [activemq_install_dir]
tar zxvf activemq-x.x.x-bin.tar.gz

# 启动ActiveMQ
cd [activemq_install_dir]/bin

# 前台启动,窗口关闭则停止
./activemq console

# 后台启动
./activemq start

~~~

3. 验证是否启动成功

~~~bash
# 默认端口是否被占用
netstat -nl|grep 61616

~~~



#### OSX系统使用Homebrew安装

1. 安装Homebrew包管理器:brew install apache-activemq

![image-20231205203823776](http://47.101.155.205/image-20231205203823776.png)



#### 源代码安装

1. 下载activemq-parent-x.x.x-source-release.zip文件，解压缩文件

~~~bash
tar zxvf activemq.x.x-src.tar.gz

cd [activemq_install_dir]
mvn clean install # 构建失败添加-Dmaven.test.skip=true这个参数

# 如果构建过程中出现java.lang.OutOfMemoryError,执行
export MAVEN_OPTS="-Xmx512M"

~~~



#### 快照安装

地址：https://repository.apache.org/content/repositories/snapshots/org/apache/activemq/apache-activemq/

1. 选中一个版本，下载`activemq-x.x.x-tar.gz`.文件
2. 解压缩文件

~~~bash
# 解压缩二进制文件
tar zxvf activemq-x.x.x.tar.gz

# 解压缩源码文件
tar zxvf activemq-x.x.x-src.tar.gz

# 切目录,给命令赋权 
# 读、写、执行的权限分别是4、2、1 
cd [activemq_install_dir]/bin
chmod 755 activemq
~~~



### 2.4.其他启动ActiveMQ的方式

官网文档：https://activemq.apache.org/run-broker



#### 2.4.1.嵌入方式启动

官网文档：https://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection



#### 2.4.2.Spring启动

配置文件

~~~xml
<beans 
  xmlns="http://www.springframework.org/schema/beans" 
  xmlns:amq="http://activemq.apache.org/schema/core"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
  http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd">
  
  <!--  lets create an embedded ActiveMQ Broker -->
  <amq:broker useJmx="false" persistent="false">
    <amq:transportConnectors>
      <amq:transportConnector uri="tcp://localhost:0" />
    </amq:transportConnectors>
  </amq:broker>

   <!--  ActiveMQ destinations to use,指定一个队列名称  -->
  <amq:queue id="destination"  physicalName="org.apache.activemq.spring.Test.spring.embedded"/>

  <!-- JMS ConnectionFactory to use, configuring the embedded broker using XML -->
  <amq:connectionFactory id="jmsFactory" brokerURL="vm://localhost"/>
  

  <!-- Spring JMS Template -->
  <bean id="myJmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory">
      <!-- lets wrap in a pool to avoid creating a connection per send -->
      <bean class="org.springframework.jms.connection.SingleConnectionFactory">
        <property name="targetConnectionFactory">
          <ref local="jmsFactory" />
        </property>
      </bean>
    </property>
  </bean>

  <bean id="consumerJmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory" ref="jmsFactory"/>
  </bean>

  <!-- a sample POJO which uses a Spring JmsTemplate -->
  <bean id="producer" class="org.apache.activemq.spring.SpringProducer">
    <property name="template">
      <ref bean="myJmsTemplate"></ref>
    </property>

    <property name="destination">
      <ref bean="destination" />
    </property>

    <property name="messageCount">
      <value>10</value>
    </property>
  </bean>

  <!-- a sample POJO consumer -->
  <bean id="consumer" class="org.apache.activemq.spring.SpringConsumer">
    <property name="template" ref="consumerJmsTemplate"/>
    <property name="destination" ref="destination"/>
  </bean>

</beans>
~~~







### 2.5.Web控制台

官网文档：https://activemq.apache.org/web-console

本地默认地址：`http://localhost:8161/admin`。

在conf/jetty-real.properties可以配置账号和密码。



### 2.6.JMX观察启动状态

官网文档：https://activemq.apache.org/jmx



### 2.7.样例

官网文档：https://activemq.apache.org/web-samples

web演示在5.8版本之前，在http://localhost:8161/demo可以之间访问，在5.8版本之后，默认配置是不包含的。可以在启动时使用配置开启。

~~~bash
bin/activemq console xbean:examples/conf/activemq-demo.xml

~~~

![image-20231206210110164](http://47.101.155.205/image-20231206210110164.png)

~~~bash
activemq start xbean:../examples/conf/activemq-demo.xml

~~~

![image-20231206210336750](http://47.101.155.205/image-20231206210336750.png)





## 3.ActiveMQ特性

文档：https://activemq.apache.org/features

### 3.1.Active Groups

![image-20231206212716409](http://47.101.155.205/image-20231206212716409.png)

一种将多个消费者组织在一起以消费消息的方式。组织消费组；实现消息负载均衡；故障转移；并行处理消息。

### 3.2.ActiveMQ Real Time

低延迟高吞吐量协作实时应用程序的需求而设计。

支持消费组消费，动态管理消费组(加入和离开)

![image-20231206213456974](http://47.101.155.205/image-20231206213456974.png)

#### 广播

点对点的消费例子(广播)(路由)

~~~java
import org.apache.activeblaze.*;
...
BlazeChannelFactory factory = new BlazeChannelFactory();
BlazeChannel sender = factory.createChannel();
//start the channel and send a message
sender.start();

String destination = "foo.bar";
BlazeMessage msg = new BlazeMessage("test payload");
sender.broadcast(destination,msg);
//shutdown the sender
sender.shutDown();

//You can similarly subscribe to Topic messages by using a listener
// 监听队列
BlazeChannel receiver = factory.createChannel();
receiver.start();

//add a listener

receiver.addBlazeTopicMessageListener(destination, new BlazeMessageListener() {
            public void onMessage(BlazeMessage msg) {
                System.out.println("Got a msg: " + msg);
            }
        });

receiver.shutDown();

~~~

#### 消费者组

消费组：支持加入、离开明确的组，也可以加入多个组。每个组都有一个全局唯一的id和名称。

~~~java
import org.apache.activeblaze.group.*;

...
BlazeGroupChannelFactory factory = new BlazeGroupChannelFactory();

BlazeGroupChannel channel = factory.createGroupChannel("My Channel");
//join a group
channel.addToGroup("test");
channel.start();

//listen for other members

channel.addMemberChangedListener(new MemberChangedListener(){

     public void memberStarted(Member member) {
         System.out.println("Member started");
     }

     public void memberStopped(Member member) {
         System.out.println("Member stopped");
     }
            
 });

~~~



#### 生命周期

Blaze Channels有5个状态

1. Constructed：通道未初始化或者已经被关闭
2. initialized:您可以通过调用 Channel 的 init() 方法来显式初始化 Channel。此时其配置已设置
3. started:这将隐式初始化通道并启动通道与其对等点的底层通信
4. stopped:这将停止通信,但是您可以稍后重新启动通道
5. shut down:这将隐式调用 stop() 并解构通道。可以再次重新初始化通道,建议对通道应用配置更改,将其关闭并重新启动

~~~java
# initialized
BlazeChannelFactory factory = new BlazeChannelFactory();
BlazeChannel channel = factory.createChannel();
channel.init();

# started
BlazeChannelFactory factory = new BlazeChannelFactory();
BlazeChannel channel = factory.createChannel();
channel.start();

# stopped
BlazeChannelFactory factory = new BlazeChannelFactory();
BlazeChannel channel = factory.createChannel();
channel.stop();
// do something else
...
//re-start
channel.start();

# shut down
BlazeChannelFactory factory = new BlazeChannelFactory();
BlazeChannel channel = factory.createChannel();
channel.shutDown();
// change the congiguration
channel.getConfiguration().setBroadcastURI("tcp://localhost:60661");
//re-start
channel.start();

~~~

#### The ActiveBlaze Message type

在ActiveBlaze中，消息和事件的解析基础是BlazeMessage.BlazeMessage是一个键值对Map的映射，其中key是String，value是基本对象。支持一下类型：

![image-20231206215426193](http://47.101.155.205/image-20231206215426193.png)



~~~java
import org.apache.activeblaze.*;
...

BlazeMessage msg = new BlazeMessage();
msg.setFloatValue("rate",0.94f);

# 设置其他对象
import org.apache.activeblaze.*;
...

BlazeMessage msg = new BlazeMessage("test string");
String text = msg.getText();

BlazeMessage msg = new BlazeMessage();
msg.setText("test string");
String text = msg.getText();

...

byte[] data = getSomeData();
BlazeMessage msg = new BlazeMessage(data);
byte[] result  = msg.getBytes();

BlazeMessage msg = new BlazeMessage();
msg.setBytes("data);
byte[] result = msg.getData();

...

Date date = new Date();
BlazeMessage msg = new BlazeMessage(date);
Date result = msg.getObject();

BlazeMessage msg = new BlazeMessage();
msg.setObject(date);
Object result = msg.getObject();

~~~



### 3.3.Broker Camel Component

5.9版本才开始可用

在 ActiveMQ 代理中嵌入 Apache Camel 为利用 Camel 的集成功能扩展消息代理提供了极大的灵活性。 Apache Camel 路由的另一个好处是，如果您使用 activemq 组件，您可以避免远程连接到 ActiveMQ 的序列化和网络成本。

但是，如果您想要更改流经 ActiveMQ 消息代理本身的消息行为，您将只能使用附带的 ActiveMQ 代理集拦截器 - 或开发您自己的代理插件，然后将其作为 jar 引入到 ActiveMQ 代理的类路径中。 broker Camel 组件使这一切变得更加容易。它会在消息通过代理本身时拦截消息，从而允许在将消息持久保存到消息存储或传递给最终消费者之前对其进行修改和操作。

例如通过定义在代理的 JVM 内运行的 CamelContext broker 组件可以拦截所有消息比如说，发布到主题，然后将它们发布到队列，并在此过程中更改它们的优先级：

~~~java
<route id="setPriority">
   <from uri="broker:topic:test.broker.>"/>
      <setHeader headerName="JMSPriority">
         <constant>9</constant>
      </setHeader>
   <to uri="broker:queue:test.broker.component.queue"/>
</route>

~~~

注意：

- 代理组件仅在启动时将拦截添加到代理中 - 因此代理组件在使用之前不会向正在运行的代理添加任何开销 - 然后开销将微不足道。
- 当代理收到消息时，但在处理消息（保留或路由到目的地）之前，消息将被代理组件拦截。
- Exchange 上的 `IN` 消息是`CamelMessage`，也是 JMS 消息（从 STOMP/MQTT/AMQP 等通过 ActiveMQ 路由的消息是总是翻译成 JMS 消息）。
- [通配符](https://activemq.apache.org/wildcards)可用于目标以拦截来自与通配符匹配的目标的消息。
- 拦截后，您必须显式地将消息发送回代理组件 - 这允许您删除选择的消息（通过不发送） - 或者像上面的情况一样 - 将消息重新路由到不同的目的地。

不过，有一个特意的警告，只有拦截的消息才能发送到 `broker`组件。例如，从另一个组件路由 Camel 消息，例如`file`，将导致错误。

已添加到 `activemq-broker`包中以支持 `broker`组件的额外类。它们允许在不使用 JMX 的情况下询问正在运行的代理的状态。这些类是：

- [org.apache.activemq.broker.view.MessageBrokerView](http://activemq.apache.org/maven/5.9.0/apidocs/org/apache/activemq/broker/view/MessageBrokerView.html) - 提供检索代理统计信息的方法
- 从 `org.apache.activemq.broker.view.MessageBrokerView` - 您可以检索 [org.apache.activemq.broker.view.BrokerDestinationView](http://activemq.apache.org/maven/5.9.0/apidocs/org/apache/activemq/broker/view/BrokerDestinationView.html)对于特定目的地。

~~~xml
<camelContext id="camel" trace="false" xmlns="http://camel.apache.org/schema/spring">
  <route id="routeAboveQueueLimitTest">
    <from uri="broker:queue:test.broker.queue"/>
    <choice>
      <when>
        <spel>#{@destinationView.queueSize >= 100}</spel>
        <to uri="broker:queue:test.broker.processLater"/>
      </when>
      <otherwise>
        <to uri="broker:queue:test.broker.queue"/>
      </otherwise>
    </choice>
  </route>
</camelContext>

<bean id="brokerView" class="org.apache.activemq.broker.view.MessageBrokerView">
  <constructor-arg value="testBroker"/>
</bean>

<bean id="destinationView" factory-bean="brokerView" factory-method="getDestinationView">
  <constructor-arg value="test.broker.component.route"/>
</bean>

~~~

这是使用 Camel 消息路由器模式。注意，在when子句中使用了Spring表达式语言拼写。



### 3.4.Clustering]集群

集群是一个很大的话题，对于不同的人来说通常意味着不同的事情。我们将尝试列出集群的各个方面以及它们与 ActiveMQ 的关系。

#### 3.4.1.队列消费者集群

ActiveMQ 支持跨消费者的队列上消息的可靠高性能负载平衡。在企业集成中，这种情况称为[竞争消费者](http://www.eaipatterns.com/CompetingConsumers.html)模式。下图说明了这个概念：

![image-20231206220634696](http://47.101.155.205/image-20231206220634696.png)

该解决方案接收生产者发送的消息，将它们排队并在所有注册的消费者之间分发它们。这样做有很多好处：

- 负载以非常动态的方式分布。可以在高负载期间配置其他消费者并将其附加到队列，而无需修改队列中的任何配置，因为新消费者将表现为另一个竞争消费者。
- 比使用负载均衡器的系统具有更好的可用性。负载均衡器通常依靠监控系统来找出哪些真实服务器不可用。对于竞争的消费者，失败的消费者不会竞争消息，因此即使没有监视，消息也不会传递给它。
- 高可靠性，如果一个消费者失败，任何未确认的消息都会重新传递给队列上的其他消费者。

缺点是，这种模式在需要订单处理的系统中可能并不理想。为了在保持优势的同时缓解此问题，竞争消费者模式应与其他 ActiveMQ功能（例如如[ActiveMQ的FAQ常见问题解答中所述](https://activemq.apache.org/how-do-i-preserve-order-of-messages)的[排他消费者](https://activemq.apache.org/exclusive-consumer)和[消息组](https://activemq.apache.org/message-groups) 组合使用。

#### 3.4.2.Broker clusters

JMS 上下文中最常见的集群思维模型是存在一组 JMS 代理，并且 JMS 客户端将连接到其中一个；那么如果 JMS 代理出现故障，它将自动重新连接到另一个代理。

我们在 JMS 客户端中使用 `failover://` 协议来实现这一点。有关如何配置故障转移协议的详细信息，请参阅[故障转移传输参考](https://activemq.apache.org/failover-transport-reference)页面。 **注意**：ActiveMQ 3.x 中的`reliable://`协议现已更改为`failover://` 协议

如果我们只是在网络上运行多个代理并使用 [静态发现](https://activemq.apache.org/static-transport-reference) 或 ，然后客户端可以轻松地从一个代理故障转移到另一个代理。然而，独立经纪商并不了解其他经纪商的消费者；因此，如果某个代理上没有消费者，消息可能会堆积起来而不会被消耗。我们有一个突出的[功能请求](http://issues.apache.org/activemq/browse/AMQ-816)来在客户端解决这个问题 - 但目前这个问题的解决方案是创建一个代理网络来存储和转发代理之间的消息。



#### 3.4.3.Discovery of brokers

我们支持使用[静态发现](https://activemq.apache.org/static-transport-reference)自动发现代理[自动发现](https://activemq.apache.org/discovery) > 或 [动态发现](https://activemq.apache.org/discovery-transport-reference)，以便客户端可以自动检测并连接到代理逻辑组中的代理，也可以让代理发现并连接到其他代理经纪人形成大型网络。



#### 3.4.4.Networks of brokers

https://activemq.apache.org/networks-of-brokers

如果您使用[客户端/服务器或中心/辐射型拓扑](https://activemq.apache.org/topologies)并且您有许多客户端和许多代理，则有可能一个代理有生产者但没有消费者，因此消息会堆积起来而没有被处理。为了避免这种情况，ActiveMQ 支持[代理网络](https://activemq.apache.org/networks-of-brokers)，它提供*存储和转发* 将消息从具有生产者的代理移动到具有消费者的代理，这使我们能够跨代理网络支持[分布式队列和主题](https://activemq.apache.org/how-do-distributed-queues-work)。

这允许客户端连接到任何代理(broker)- 并在出现故障时故障转移到另一个代理(broker)- 从客户端的角度提供代理(broker)集群。

经纪商(brokers)网络还允许我们在网络中扩展到大量客户，因为我们可以根据需要运行尽可能多的经纪商(brokers)。

您可以将其视为通过自动故障转移和发现功能与代理(broker)集群连接的客户端集群，从而形成简单且易于使用的消息传递结构。

配置

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://activemq.org/config/1.0">

  <broker brokerName="receiver" persistent="false" useJmx="false">  
    <networkConnectors>
      <networkConnector uri="static:(tcp://localhost:62001)"/>
    </networkConnectors>

    <persistenceAdapter>
      <memoryPersistenceAdapter/>
    </persistenceAdapter>

   <transportConnectors>
      <transportConnector uri="tcp://localhost:62002"/>
    </transportConnectors>
  </broker>

</beans>

~~~



~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://activemq.org/config/1.0">

  <broker name="sender" persistent="false" useJmx="false">  
    <networkConnectors>
      <networkConnector uri="multicast://default"/>
    </networkConnectors>

    <persistenceAdapter>
      <memoryPersistenceAdapter/>
    </persistenceAdapter>

  <transportConnectors>
      <transportConnector uri="tcp://localhost:0" discoveryUri="multicast://default"/>
    </transportConnectors>
  </broker>

</beans>

~~~





#### 3.4.5.MasterSlave

在网络中运行大量独立代理或代理的问题是消息在任何时间点都由单个物理代理拥有。如果该代理发生故障，您必须等待它重新启动才能传递消息。 （如果您使用非持久消息传递并且代理发生故障，您通常会丢失消息）。

MasterSlave 背后的想法 是将消息复制到从代理，这样即使主服务器发生灾难性的硬件故障、文件系统或数据中心，您可以立即故障转移到从属设备，而不会丢失任何消息。

两种模式：

![image-20231207213349434](http://47.101.155.205/image-20231207213349434.png)

##### 3.4.5.1.共享文件系统主从

https://activemq.apache.org/shared-file-system-master-slave

有SAN或共享文件系统，它可用于提供高可用性，这样，如果一个代理被终止，另一个代理将继续运行可以立即接管。

**确保您的共享文件锁有效**

基本上，您可以从同一个共享文件系统目录运行任意数量的代理。第一个获取文件独占锁的代理是主代理。如果该经纪人死亡并释放锁，则另一个经纪人将接管。从属代理处于循环状态，试图从主代理那里获取锁。

以下示例演示如何为共享文件系统主从配置代理，其中 **/sharedFileSystem** 是共享文件系统上的某个目录。这只是配置基于文件的存储以使用共享目录的情况。

~~~xml
<persistenceAdapter>
  <kahaDB directory="/sharedFileSystem/sharedBrokerData"/>
</persistenceAdapter>

~~~

~~~xml
<persistenceAdapter>
  <levelDB directory="/sharedFileSystem/sharedBrokerData"/>
</persistenceAdapter>

~~~

~~~xml
<persistenceAdapter>
  <amqPersistenceAdapter directory="/sharedFileSystem/sharedBrokerData"/>
</persistenceAdapter>

~~~

启动时，一个主服务器会获取代理文件目录上的独占锁 - 所有其他代理都是从属服务器，并暂停等待独占锁。

![image-20231207213937239](http://47.101.155.205/image-20231207213937239.png)



客户端应使用[故障转移传输](https://activemq.apache.org/failover-transport-reference)连接到可用的代理。例如使用类似下面的 URL

~~~txt
failover:(tcp://broker1:61616,tcp://broker2:61616,tcp://broker3:61616)

~~~

只有主代理启动其传输连接器，因此客户端只能连接到主代理。

**主控故障**

如果主设备失去独占锁，那么它会立即关闭。如果主设备关闭或发生故障，其他从设备之一将抢占锁，因此拓扑切换到下图

![image-20231207214053021](http://47.101.155.205/image-20231207214053021.png)

其他从站之一立即获取文件系统上的独占锁，开始成为主站，启动其所有传输连接器。

**主控重启**

您可以随时重新启动加入集群的其他代理，并在主服务器关闭或发生故障时作为从服务器启动，等待成为主服务器。因此，在旧主服务器重新启动后，将创建以下拓扑：

![image-20231207214143855](http://47.101.155.205/image-20231207214143855.png)



ActiveMQ 维护与持久性适配器中的设置无关的计划信息。因此，对于共享文件系统，明确告诉 ActiveMQ 在何处存储调度程序信息非常重要。为此，请在 上设置 `dataDirectory` 属性，例如： `broker`

~~~txt
<broker xmlns="http://activemq.apache.org/schema/core"
dataDirectory="/some/location"
brokerName="mmuserb2" useJmx="true" advisorySupport="false"
persistent="true" deleteAllMessagesOnStartup="false"
useShutdownHook="false" schedulerSupport="true">

~~~



##### 3.4.5.2.JDBC主从

https://activemq.apache.org/jdbc-master-slave

在4.1版本首次支持

如果您使用纯 JDBC 并且不使用高性能日志，那么您通常依赖数据库作为单点故障和持久性引擎。如果您没有真正的高性能要求，那么这种方法可能很有意义，因为您有一个持久性引擎来备份和管理等。

**启动**

当仅使用 JDBC 作为数据源时，您可以使用主从方法，运行任意数量的代理，如下图所示。启动时，一个主服务器会获取代理数据库中的独占锁 - 所有其他代理都是从属服务器，并暂停等待独占锁。

![image-20231207214543323](http://47.101.155.205/image-20231207214543323.png)

客户端应使用[故障转移传输](https://activemq.apache.org/failover-transport-reference)连接到可用的代理。例如使用类似下面的 URL

~~~txt
failover:(tcp://broker1:61616,tcp://broker2:61616,tcp://broker3:61616)

~~~

只有主代理启动其传输连接器，因此客户端只能连接到主代理。

**主控故障**

如果主服务器失去与数据库的连接或失去排他锁，那么它会立即关闭。如果主设备关闭或发生故障，其他从设备之一将抢占锁，因此拓扑切换到下图：

![image-20231207214640046](http://47.101.155.205/image-20231207214640046.png)



其他从站之一立即获取数据库上的独占锁，开始成为主站，启动其所有传输连接器。

客户端松开与已停止的主服务器的连接，然后故障转移传输尝试连接到可用的代理，其中唯一可用的代理是新的主服务器。

**主控重启**

您可以随时重新启动加入集群的其他代理，并在主服务器关闭或发生故障时作为从服务器启动，等待成为主服务器。因此，在旧主服务器重新启动后，将创建以下拓扑：

![image-20231207214754802](http://47.101.155.205/image-20231207214754802.png)

**配置JDBC主从**

默认情况下，如果您使用为了避免高性能日志，您将默认使用 JDBC Master Slave。您只需要运行多个代理并将客户端 URI 指向它们即可获取主/从。这是可行的，因为它们都尝试获取数据库中共享表的排它锁，并且只有一个会成功。

以下示例展示了如何在 JDBC Master Slave 模式下配置 ActiveMQ Broker。**这个配置文件放哪里？**

~~~xml
<beans>

  <!-- Allows us to use system properties as variables in this configuration file -->
  <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"/>
  
  <broker xmlns="http://activemq.apache.org/schema/core">

    <destinationPolicy>
      <policyMap><policyEntries>
        
          <policyEntry topic="FOO.>">
            <dispatchPolicy>
              <strictOrderDispatchPolicy />
            </dispatchPolicy>
            <subscriptionRecoveryPolicy>
              <lastImageSubscriptionRecoveryPolicy />
            </subscriptionRecoveryPolicy>
          </policyEntry>

      </policyEntries></policyMap>
    </destinationPolicy>
  
  
    <persistenceAdapter>
        <jdbcPersistenceAdapter dataDirectory="${activemq.base}/activemq-data"/>

        <!-- 
        <jdbcPersistenceAdapter dataDirectory="activemq-data" dataSource="#oracle-ds"/>
        --> 
    </persistenceAdapter>
  
    <transportConnectors>
       <transportConnector name="default" uri="tcp://localhost:61616"/>
    </transportConnectors>
    
  </broker>
  
  <!--  This xbean configuration file supports all the standard spring xml configuration options -->
  
  <!-- Postgres DataSource Sample Setup -->
  <!-- 
  <bean id="postgres-ds" class="org.postgresql.ds.PGPoolingDataSource">
    <property name="serverName" value="localhost"/>
    <property name="databaseName" value="activemq"/>
    <property name="portNumber" value="0"/>
    <property name="user" value="activemq"/>
    <property name="password" value="activemq"/>
    <property name="dataSourceName" value="postgres"/>
    <property name="initialConnections" value="1"/>
    <property name="maxConnections" value="10"/>
  </bean>
  -->
  
  <!-- MySql DataSource Sample Setup -->
  <!-- 
  <bean id="mysql-ds" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost/activemq?relaxAutoCommit=true"/>
    <property name="username" value="activemq"/>
    <property name="password" value="activemq"/>
    <property name="poolPreparedStatements" value="true"/>
  </bean>
  -->  
   
  <!-- Oracle DataSource Sample Setup -->
  <!--
  <bean id="oracle-ds" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
    <property name="url" value="jdbc:oracle:thin:@localhost:1521:AMQDB"/>
    <property name="username" value="scott"/>
    <property name="password" value="tiger"/>
    <property name="poolPreparedStatements" value="true"/>
  </bean>
  -->
      
  <!-- Embedded Derby DataSource Sample Setup -->
  <!-- 
  <bean id="derby-ds" class="org.apache.derby.jdbc.EmbeddedDataSource">
    <property name="databaseName" value="derbydb"/>
    <property name="createDatabase" value="create"/>
  </bean>
  -->  

</beans>

~~~



#####  Pure Master Slave

https://activemq.apache.org/pure-master-slave

5.8已移除



#### 3.4.6.Replicated Message Stores

替代 [MasterSlave](https://activemq.apache.org/masterslave) 是通过某种方式来复制消息存储；这样磁盘文件就可以以某种方式共享。例如，使用 SAN 或共享网络驱动器，您可以共享代理的文件，以便在发生故障时另一个代理可以立即接管。

因此，通过支持[复制消息存储](https://activemq.apache.org/replicated-message-store)，您可以降低消息丢失的风险，以提供 HA 备份或完整能够在数据中心故障中幸存的解决方案。[灾难恢复](https://activemq.apache.org/dr)

如果消息存储在代理的硬盘上或单个数据库内；那么消息持久性方面就会出现单点故障。如果您丢失了整个计算机、磁盘或数据库，那么您就丢失了消息。

对于一些高端用户来说，消息绝对不应该丢失，因为它们可能会对业务产生很大影响。这类用户通常需要某种[DR](https://activemq.apache.org/dr)策略(灾难复原)来支持消息复制，以便他们可以丢失整个数据中心而仍然不会丢失消息。

对于减少消息丢失机会的问题有多种解决方案：

**使用RAID磁盘**

如果您使用的 RAID 磁盘已充分条带化，则只需重新启动计算机即可 - 或将磁盘移至新计算机并重新启动代理。如果您是小型企业，这可能就足够了，但如果您有严格的[灾难恢复](https://activemq.apache.org/dr)要求，那么如果您失去数据中心，RAID 选项就不是解决方案。

**SAN 或共享网络驱动器**

如果您使用基于文件的持久性机制之一（例如默认高性能日志和 Apache Derby），则可以写入 SAN 或共享网络驱动器，并在发生故障时使用来自故障代理的文件启动新代理。

此外，4.1 还允许您启动多个代理从同一共享文件系统读取数据，以通过[共享文件系统主从](https://activemq.apache.org/shared-file-system-master-slave) 功能支持高可用性。



**主从**

另一种方法是使用 [MasterSlave](https://activemq.apache.org/masterslave) 功能将代理配对在一起，以便将所有消息复制到两个代理（主代理和从代理）确保消息有两个物理副本，以便可以处理灾难性的硬件故障（例如整个数据中心丢失）。



**集群JDBC数据库**

Oracle、MySQL等各种数据库都支持集群数据库；因此我们可以将这些数据库与 JDBC MessageStore 一起使用来获得集群消息存储。请注意，如果使用此选项，则必须禁用高性能日志（这会严重影响性能）

**使用C-JDBC**

如果您没有或买不起集群数据库，那么您可以使用[C-JDBC](http://c-jdbc.objectweb.org/) 跨多个数据库复制状态物理数据库以避免单点故障并提供[灾难恢复](https://activemq.apache.org/dr)解决方案。如上所述，使用复制 JDBC 方法非常慢，因为它需要我们禁用高性能日志。



### 3.5.Command Agent

https://activemq.apache.org/command-agent

5.9删除



### 3.6.Consumer Features、

https://activemq.apache.org/consumer-features

#### 3.6.1.Consumer Dispatch Async

https://activemq.apache.org/consumer-dispatch-async

从ActiveMQ v4开始：对消费者执行同步或异步调度的代理的选择变得更加可配置。现在，它被配置为 [连接 URI、Connection 和 ConnectionFactory](https://activemq.apache.org/connection-configuration-uri) 上的默认值，并且可以通过 根据每个消费者进行自定义>[目标选项](https://activemq.apache.org/destination-options)而不是以前只是传输服务器设置。

这更有意义，因为您希望对速度较慢的消费者进行异步消息传递，但对速度较快的消费者进行同步消息传递（以避免添加另一个 SEDA 队列的同步和上下文切换成本）。使用同步消息传递的缺点是，如果生产者正在向慢速消费者发送消息，则生产者更有可能阻塞。

默认设置为 `dispatchAsync=true`，这是获得高性能的最佳设置。如果您想更好地处理缓慢的消费者，您将需要启用此设置。如果您想要更好的吞吐量并且消费者速度缓慢的可能性很低，您可能需要将其更改为 `dispatchAsync=false`。



**在 ConnectionFactory 级别配置异步调度**

~~~java
((ActiveMQConnectionFactory)connectionFactory).setDispatchAsync(false);

~~~

**在连接级别配置异步调度**

在此级别配置 `dispatchAsync`设置会覆盖连接工厂级别的设置。



**使用目标 URI 在使用者级别配置调度异步**

使用 [目标选项配置](https://activemq.apache.org/destination-options)会覆盖连接和连接工厂级别的设置。`dispatchAsync`

~~~java
queue = new ActiveMQQueue("TEST.QUEUE?consumer.dispatchAsync=false");
consumer = session.createConsumer(queue);

~~~



**在代理的传输连接器上禁用异步调度**

可以通过 `disableAsyncDispatch` 属性禁用特定传输连接器上的异步调度。一旦禁用此传输，单个客户端就无法启用它。

~~~xml
<transportConnector name="openwire" uri="tcp://0.0.0.0:61616" disableAsyncDispatch="true"/>

~~~











## 4.ActiveMQ配置

xml配置官网文档：https://activemq.apache.org/xml-configuration

命令配置文档：https://activemq.apache.org/broker-configuration-uri

配置传输：https://activemq.apache.org/configuring-transports

初始化配置：https://activemq.apache.org/configuration 404

JNDI支持：https://activemq.apache.org/jndi-support

Spring支持：https://activemq.apache.org/spring-support

