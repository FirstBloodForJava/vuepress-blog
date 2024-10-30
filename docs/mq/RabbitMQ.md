# RabbitMQ

MQ(Message Queue)消息队列，典型的生产者消费者模式，生产者不断向消息队列生产消息，消费者不断从消息队列中获取消息。因为消息的生产和消费都是异步的，而且只关心消息的发送和接收，没有业务逻辑的侵入，轻松实现了系统之间的解耦合。通过高效的可靠的消息传递机制进行系统之间的通信来实现分布式系统。

RabbitMQ是实现了高级消息队列协议（AMQP）的开源消息代理软件（亦称面向消息的中间件）。RabbitMQ服务器是用Erlang语言编写的，而集群和故障转移是构建在开放电信平台框架上的。所有主要的编程语言均有与代理接口通讯的客户端库。

官网：https://www.rabbitmq.com/

官方文档：http://www.weicot.com/dev/guides/v2.0/install-gde/prereq/install-rabbitmq.html

java客户端文档：https://www.rabbitmq.com/api-guide.html

## 为什么使用RabbitMQ

- 异步处理：消息队列的异步处理机制，不需要立即处理共享数据带来的业务，可以通过消息队列的死信队列来处理。
- 解耦：传统的开发模式中，各个模块之间相互调用，数据共享，每个模块都需要关注其他模块是否挂掉。使用消息队列，可以将共享的数据放在消息队列中，新增业务模块，业务模块可以订阅该消息，对原有的系统业务没有任何影响，降低了各个系统之间的耦合度，提高系统的可扩展性。
- 流量削锋：将对服务器的请求通过消息队列再次拦截处理
- 日志处理
- 消息通讯

## 使用RabbitMQ带来的缺点

- 系统可用性降低
- 系统复杂性提高
- 一致性问题
- 消息顺序问题：一个队列一个consumer，利用consumer内部做内存队列做排队处理，然后分发底层的worker处理
- 消息重复问题



|            | Kafka        | RocketMQ       | RabbitMQ               | ActiveMQ |
| ---------- | ------------ | -------------- | ---------------------- | -------- |
| 单机吞吐量 | 100万级      | 10万级         | 万级                   | 万级     |
| 开发语言   | Scala和Java  | Java           | Erlang                 | Java     |
| 高可用     | 分布式架构   | 分布式架构     | 主从架构               | 主从架构 |
| 性能       | ms           | ms             | us                     | ms       |
| 功能       | 简单的MQ功能 | 分布式扩展性好 | 并发高，性能高，延时低 | 功能完备 |





## RabbitMQ基本概念

- Broker：消息队列服务器实体
- Exchange：消息交换机，消息发布的规则，消息路由到哪个队列
- Queue：消息的载体，队列
- Binding：Exchange和Queue安装路由规则绑定
- Routing key：路由关键字，exchange根据这个投递消息
- Vhost：一个Broker可以有多个Vhost，Vhost可以有不同的exchange、queue，不同模块可以对应不同的vhost
- Producer：消息生产者
- Consumer：消息消费者
- Channel：消息通道，客户端每个连接可以建立通道，一个通道代表一个会话任务





## Centos安装RabbitMQ

Erlang版本和RabbitMQ版本对应关系：https://www.rabbitmq.com/which-erlang.html

Erlang下载官网：https://www.erlang.org/downloads



### 解压缩安装Erlang环境(23.3.4.6)

官网下载地址：https://www.erlang.org/patches/otp-23.3.4.1

官网安装步骤文档地址：https://www.erlang.org/docs/23/installation_guide/install

![image-20241029161441112](http://47.101.155.205/image-20241029161441112.png)

~~~bash
# 可以用命令检查是否安装
yum list installed | grep <name> 

# 构建前准备,安装所需依赖
yum install -y ncurses ncurses-devel

~~~



~~~bash
# 指定gzip解压缩文件
tar -zxf otp_src_23.3.4.6.tar.gz

cd otp_src_23.3.4.6/

# 配置当前otp文件目录为ERL_TOP环境变量的值为/opt/erlang/otp_src_23.3.4.6
export ERL_TOP=`pwd`

# 默认安装至/usr/local/{bin,lib/erlang}目录,配置编译项安装至指定目录
./configure --prefix=/opt/erlang/otp_src_23.3.4.6

# 配置报错(缺少依赖)
configure: error: No curses library functions found
ERROR: /opt/erlang/otp_src_23.3.4.6/erts/configure failed!
已杀死

#  echo $LANG => zh_CN.UTF-8
export LANG=C

# 构建
make

# 测试
make release_tests

cd release/tests/test_server

$ERL_TOP/bin/erl -s ts install -s ts smoke_test batch -s init stop
# $ERL_TOP/release/tests/test_server/index.html查看html有没有失败的测试用例

# 安装命令一起执行
./configure --prefix=/opt/erlang/otp_src_23.3.4.6 && make && make install

# 没有报错,则执行安装
make install

# 卸载命令(编译目录执行),如果配置安装目录是解压的文件
make clean

~~~

![image-20241029153650983](http://47.101.155.205/image-20241029153650983.png)

![image-20241029160022911](http://47.101.155.205/image-20241029160022911.png)

### 安装RabbitMQ

软件包托管：https://packagecloud.io/

https://packagecloud.io/rabbitmq/rabbitmq-server/packages/el/7/rabbitmq-server-3.8.16-1.el7.noarch.rpm



~~~bash
# 创建快捷方式链接
ln -s /opt/erlang/otp_src_23.3.4.6/bin/erl /usr/bin/erl

~~~



~~~bash
# 下载并添加 RabbitMQ的存储库,提示如下图
yum install --skip-broken rabbitmq-server-3.8.16-1.el7.noarch.rpm

# 换成rpm命令，忽略依赖
rpm -ivh --nodeps rabbitmq-server-3.8.16-1.el7.noarch.rpm

# 执行这个检查是否安装成功
yum install -y rabbitmq-server


~~~

![提示缺少erlang环境](http://47.101.155.205/image-20241029163704147.png)



![启动成功](http://47.101.155.205/image-20241029165616957.png)





### yum安装Erlang环境

yum包下载地址：https://github.com/rabbitmq/erlang-rpm/releases/download/v23.3.4.6/erlang-23.3.4.6-1.el7.x86_64.rpm

~~~bash
# 添加erlang的存储库
yum install -y epel-release

# 执行慢，可以先下载，然后根据文件安装
yum install -y https://github.com/rabbitmq/erlang-rpm/releases/download/v23.3.4.6/erlang-23.3.4.6-1.el7.x86_64.rpm

# 手动确认安装
yum install erlang-23.3.4.6-1.el7.x86_64.rpm
# 自动确认安装
yum install -y erlang-23.3.4.6-1.el7.x86_64.rpm

# 安装erlang
yum install -y erlang

~~~

![image-20241029172936970](http://47.101.155.205/image-20241029172936970.png)

![image-20241029173059001](http://47.101.155.205/image-20241029173059001.png)

### 安装RabbitMQ

软件包托管：https://packagecloud.io/

https://packagecloud.io/rabbitmq/rabbitmq-server/packages/el/7/rabbitmq-server-3.8.16-1.el7.noarch.rpm

~~~bash
# 下载并添加 RabbitMQ的存储库,提示如下图
yum install --skip-broken rabbitmq-server-3.8.16-1.el7.noarch.rpm

# 执行这个检查是否安装成功
yum install -y rabbitmq-server

~~~





![image-20241030092309866](http://47.101.155.205/image-20241030092309866.png)



![image-20241030092249668](http://47.101.155.205/image-20241030092249668.png)





### RabbitMQ启动相关命令

~~~bash
# 启动RabbittMQ服务端,默认5672端口
systemctl start rabbitmq-server

# 关闭RabbitMQ
systemctl stop rabbitmq-server

# 重启服务
systemctl restart rabbitmq-server 

~~~

![image-20220623212231673](http://47.101.155.205/image-20220623212231673.png)

以系统命令方式启动，自动为节点命名为rabbit，会自动在/var/lib/rabbitmq/mnesia目录下生成对应的文件。使用rabbitmqctl stop关闭服务，会自动删除对应的pid文件，里面对应的每次会不一样。使用systemctl stop rabbitmq-server也会删除pid文件。这里的pid文件和redis启动生成的pid文件应该类似。



### RabbitMQ安装可视化web插件



~~~bash
# 执行插件安装命令
rabbitmq-plugins enable rabbitmq_management

#重启服务
systemctl restart rabbitmq-server

#http://ip:15672/ 可以进入登陆界面，默认本机登陆账户guest guest

~~~

![image-20241029170425056](http://47.101.155.205/image-20241029170425056.png)

### RabbitMQ账号命令

~~~bash
#添加账号rabbitmqctl add_user admin <Aliyunoycm1234>
rabbitmqctl add_user <admin> <Aliyunoycm1234>

#设置账号adminstrator权限,只有4种权限
rabbitmqctl set_user_tags <admin> <administrator> 

# ".*" ".*" ".*" #授予文件管理权限
rabbitmqctl set_permissions -p / admin 

#修改密码
rabbitmqctl change_password <user> <password> 

#删除用户
rabbitmqctl delete_user <user> 

#查看所用用户
rabbitmqctl list_users 

~~~

- 注意：设置权限对应失败，会导致无法登陆，提示Not management user(非管理用户)

> 用户权限

1. administrator
2. monitoring
3. policymaker
4. managment
4. none



### 卸载RabbitMQ

![image-20220927212720036](http://47.101.155.205/image-20220927212720036.png)

~~~bash
# rabbitmq-server卸载
# yum命令安装的软件，yum remove 软件名字
# rpm命令安装的软件，rpm -e --nodeps 软件名 --nodeps表示忽略依赖关系卸载
rpm -e rabbitmq-server 
rpm -e rabbitmq-server --nodeps
# 查询是否卸载好了
rpm -qa | grep rabbitmq

# yum查询所有可用的软件包
yum list install | grep rabbitmq
# yum查询安装的软件
yum list installed | grep rabbitmq
# 查询安装的程序，直接确认进行卸载
yum list installed | grep rabbitmq | xargs yum remove -y

# erlang环境卸载
# tar包安装，使用make uninstall在之前编译的位置
# 其它情况相同

~~~

![image-20220927214739142](http://47.101.155.205/image-20220927214739142.png)







## Docker安装RabbitMQ

~~~bash
docker pull rabbitmq:management #拉取镜像
docker run -di --name my-rabbitmq -e RABBITMQ_DEFUALT_USER=oycm -e RABBITMQ_DEFAULT_PASS=admin1234 -p 15672:15672 -p 5672:5672 -p 25672:25672 rabbitmq:management #-e配置,并不能直接访问可视化界面
# 15672是可视化web端口
# 5672是RabbitMQ消息接收中心端口，消息获取和发送的端口

~~~



## Java Client

### 连接

普通的RabbitMQjava客户端连接

~~~java
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Channel;

ConnectionFactory factory = new ConnectionFactory();

factory.setUsername(userName);
factory.setPassword(password);
factory.setVirtualHost(virtualHost);//默认是/
factory.setHost(hostName);
factory.setPort(portNumber);

Connection conn = factory.newConnection();

Address[] addrArr = new Address[]{ new Address(hostname1, portnumber1)
                                 , new Address(hostname2, portnumber2)};
Connection conn = factory.newConnection(addrArr);
//可以指定连接时使用的端点列表。将使用第一个可到达的端点。在连接失败的情况下，使用端点列表使应用程序可以在原始节点关闭时连接到不同的节点。

~~~





### URI连接

~~~java
ConnectionFactory factory = new ConnectionFactory();
factory.setUri("amqp://userName:password@hostName:portNumber/virtualHost");
Connection conn = factory.newConnection();

amqp_URI = "amqp://" + amqp_authority + [ "/" vhost ] [ "?" query ];
amqp_authority = [amqp_userinfo"@"] + host + [":" port];
amqp_userinfo = username [":" password];
//springboot项目启动的输出日志
Created new connection: rabbitConnectionFactory#2af69643:0/SimpleConnection@40e32762 [delegate=amqp://oycm@39.101.165.70:5672/, localPort= 55143]
                                                                                      
~~~



> 测试代码

~~~java
package com.study.uri;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Send {
    public static String exchange = "uri";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqp://admin:Aliyunoycm1234@106.15.234.93:5672/%2f");//%2f代表/
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.exchangeDeclare(exchange,"fanout",true);
        String queueName = channel.queueDeclare().getQueue();//独占队列非持久性，排他性，自动删除
        channel.queueBind(queueName,exchange,"");
        
    }
}
//通过uri连接server
//独占队列当只有一个客户端想要使用它时，没有其他客户端可以使用它

~~~



### channel

虽然channel上的某些操作可以安全地并发调用，但有些操作不是。**应该避免多线程使用同一个通道，可以使用通道池。**

> 被动声明

~~~java
final AMQP.Queue.DeclareOk response = channel.queueDeclarePassive(queueName);
System.out.println("getMessageCount()"+response.getMessageCount());//队列可用的的消息数
System.out.println("getConsumerCount()"+response.getConsumerCount());//队列连接的消费者
//注意点：如果队列不存在，通道将不可用，使用临时渠道进行被动声明

~~~



~~~java
//声明队列不需要服务器进行响应，速度快，安全性低
channel.queueDeclareNoWait(queueName, true , false , false , null );


~~~



> 队列删除

~~~java
queueDelete(String queue, boolean ifUnused, boolean ifEmpty);
// 为空才删除
channel.queueDelete("queue-name", false, true);
// 队列没有消费者才删除
channel.queueDelete("queue-name", true, false);
// 删除队列所有消息
channel.queuePurge("queue-name");

~~~



## 工作模式



### HelloWorld(Simple模式)

message的properties

- content_type
- content_encoding
- priority
- correlation_id √
- reply_to √
- expiration √
- message_id
- timestamp
- type
- user_id
- app_id
- cluster_id
- deli

https://www.rabbitmq.com/tutorials/tutorial-one-java.html

~~~xml
<!-- https://mvnrepository.com/artifact/com.rabbitmq/amqp-client  客户端 -->
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
    <version>5.15.0</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.0</version>
</dependency>


~~~

rabbitmq配置文件官网介绍：https://www.rabbitmq.com/configure.html#config-items



> 生产者

~~~java
package com.study.send;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Channel;

public class Send {

    public static String QUEUE_NAME = "hello";

    public static void main(String[] args) throws Exception{
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");
        factory.setHost("106.15.234.93");
        factory.setPort(5672);

        try (
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
        ) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello World!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println("消息发送：" + message + "成功");
        }
    }
}
//执行channel.close()，消息发送完成程序不会自动退出。使用try...with会自动退出程序
~~~



> 消费者

~~~java
package com.study.receive;

import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Receive {

    public static String QUEUE_NAME = "hello";
    public static String host = "106.15.234.93";

    public static void main(String[] args) throws Exception{
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(host);
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        System.out.println("等待接收消息");

        DeliverCallback deliverCallback = (consumerTag,message)->{
            String msg = new String(message.getBody(),"UTF-8");
            System.out.println(Receive.class.getSimpleName() + "类接收到：" + msg);
            System.exit(0);
            System.out.println("程序退出");
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
    }
}

~~~

怎么实现手动ack模式？







### Work queues(work 工作模式)

Distributing tasks among workers



1. 消息持久化(队列的持久化，消息持久化)
2. 消息持久化的可靠性(publisher confirm)
3. 使用消息确认和预取计数，您可以设置工作队列。



> 队列持久性

~~~java
// 已近存在的队列就不能修改他的持久性了
channel.queueDeclare("task_queue", durable, false, false, null);

~~~



> 消息持久性

~~~java
import com.rabbitmq.client.MessageProperties;
//设置队列中的消息持久性，通过
channel.basicPublish("", "task_queue",MessageProperties.PERSISTENT_TEXT_PLAIN,message.getBytes());

~~~



消息调度模式：默认是循环调度(Round-robin dispatching)，可以指定为公平调度(Fair dispatch)

~~~java
// 设置公平调度模式
// 设置给消息调用者调用多少条消息
channel.basicQos(prefetchCount);

~~~

> 循环模式

- 生产者

~~~java
package com.study.work;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Send {
    public static String queueName = "work";

    public static void main(String[] args) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");
        factory.setHost("106.15.234.93");

        try(Connection connection = factory.newConnection();
            Channel channel = connection.createChannel()
        ){
            channel.queueDeclare(queueName,true,false,false,null);

            for (int i = 1; i <= 20 ; i++) {
                String msg = "message -> ";
                msg += i;
                channel.basicPublish("",queueName,null,msg.getBytes());
            }

        } catch (TimeoutException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
~~~

- 消费者

~~~java
package com.study.work;

import com.rabbitmq.client.*;

public class Work1 {
    public static String queueName = "work";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");
        factory.setHost("106.15.234.93");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        DeliverCallback deliverCallback = ((consumerTag, message) -> {
            System.out.println(new String(message.getBody()));
        });
        CancelCallback cancelCallback = (consumerTag -> {});
        channel.basicConsume(queueName,true,deliverCallback,cancelCallback);
    }
}
~~~



> 公平调度

- 消费者

~~~java
package com.study.work;

import com.rabbitmq.client.*;

public class Work3 {
    public static String queueName = "work";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");
        factory.setHost("106.15.234.93");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        DeliverCallback deliverCallback = ((consumerTag, message) -> {

            System.out.println(new String(message.getBody()));
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }finally {
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }
        });
        CancelCallback cancelCallback = (consumerTag -> {});
        channel.basicQos(1);
        channel.basicConsume(queueName,false,deliverCallback,cancelCallback);
    }
}
//设置消息自动确定为false
//设置Qos值
//手动确认接收消息
~~~
















### Routing(路由模式)

Receiving messages selectively

~~~java
channel.exchangeDeclare(EXCHANGE_NAME, "direct");
channel.basicPublish(EXCHANGE_NAME, severity, null, message.getBytes("UTF-8"));
//绑定queue和exchange
channel.queueBind(queueName, EXCHANGE_NAME, routing);

~~~

> 生产者

~~~java
package com.study.routing;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Send {

    public static String exchange = "routing";

    public static void main(String[] args) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("106.15.234.93");
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");

        try(Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
        ){
            channel.queueDeclare("q4",true,false,false,null);
            channel.exchangeDeclare(exchange,"direct",true);
            channel.queueBind("q1",exchange,"hello");
            channel.queueBind("q2",exchange,"hello");
            channel.queueBind("q3",exchange,"world");
            channel.queueBind("q4",exchange,"world");
            channel.basicPublish(exchange,"world",null,"routing world".getBytes("UTF-8"));
            System.out.println("消息发送成功");
        } catch (TimeoutException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
~~~



> 消费者

~~~java
package com.study.routing;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

public class Receive {
    public static String exchange = "routing";
    public static void main(String[] args) throws Exception{
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("106.15.234.93");
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        DeliverCallback deliverCallback = ((consumerTag, message) -> {
            System.out.println(new String(message.getBody(),"UTF-8"));
        });
        System.out.println("等待接收消息");
        channel.basicConsume("q3",deliverCallback,(consumerTag)->{});
        channel.basicConsume("q4",deliverCallback,(consumerTag)->{});

    }
}
~~~









### Topics(topic主题模式)

Receiving messages based on a pattern

- \* （star） can substitute for exactly **one** word
- \# （hash）can substitute for **zero or more** words.

~~~tex
Topic exchange is powerful and can behave like other exchanges.

When a queue is bound with "#" (hash) binding key - it will receive all the messages, regardless of the routing key - like in fanout exchange.

When special characters, "*" (star) and "#" (hash), aren't used in bindings, the topic exchange will behave just like a direct one.

~~~

~~~java
channel.exchangeDeclare(EXCHANGE_NAME, "topic");
channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));

String queueName = channel.queueDeclare().getQueue();
channel.queueBind(queueName, EXCHANGE_NAME, topic-routing-key);

~~~



> 生产者

~~~java
package com.study.topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Send {
    public static String exchange = "topic";

    public static void main(String[] args) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("106.15.234.93");
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");

        try(Connection connection = factory.newConnection();
            Channel channel = connection.createChannel()
        ){
            channel.exchangeDeclare(exchange,"topic",true);
            channel.queueDeclare("q5",true,false,false,null);
            channel.queueBind("q5",exchange,"*.study.*");
            channel.queueBind("q4",exchange,"#.study.#");
            channel.queueBind("q3",exchange,"#.study");

            channel.basicPublish(exchange,"com.study.hello",null,"com.study.hello topic".getBytes());

        } catch (TimeoutException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

~~~





> 消费者

~~~java
package com.study.topic;

import com.rabbitmq.client.*;


public class Receive {
    public static String exchange = "topic";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("106.15.234.93");
        factory.setUsername("admin");
        factory.setPassword("Aliyunoycm1234");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        DeliverCallback deliverCallback = ((consumerTag, message) -> {
            System.out.println(new java.lang.String(message.getBody()));
        });
        CancelCallback cancelCallback = (consumerTag) -> {};

        channel.basicConsume("q3",deliverCallback,cancelCallback);
        channel.basicConsume("q4",deliverCallback,cancelCallback);
        channel.basicConsume("q5",deliverCallback,cancelCallback);

    }
}

~~~



### publish confirms(发布确认模式)

> 单条消息确认

~~~java
Channel channel = connection.createChannel();
channel.confirmSelect();//开启发布确认 publish confirm
channel.waitForConfirmsOrDie();//等待确认，下面每次发送消息都需要返回确认，ack的multiple为false
for (int i = 0; i < 10000; i++) {
	String message = String.format("时间 => %s", new Date().getTime()) + "===>" + i ;
    channel.basicPublish(exchange,"",null,message.getBytes());
    channel.waitForConfirmsOrDie();               
}
//发送消息速度非常慢，普通publish发送500，里面只有2-3条publish confirm的消息。
//publish 655ms
//publish confirm 616160ms

~~~



> 批量消息确认

~~~java
int batchSize = 100;
int outstandingMessageCount = 0;
for (int i = 0; i < 100; i++) {
    byte[] body = ...;
    BasicProperties properties = ...;
    channel.basicPublish(exchange, queue, null, body);
    outstandingMessageCount++;
    if (outstandingMessageCount == batchSize) {
        ch.waitForConfirmsOrDie(5_000);
        outstandingMessageCount = 0;
    }
}
if (outstandingMessageCount > 0) {
    ch.waitForConfirmsOrDie(5_000);
}
//速度快，981ms
//不过回调方法会有multiple为true的情况。出现true的情况是前面有消息没有响应。

~~~



> 异步发布确认

~~~java
ConfirmListener addConfirmListener(ConfirmCallback ackCallback, ConfirmCallback nackCallback);
channel.addConfirmListener(ackCallback,nackCallback);
//820ms

~~~



不打印日志的情况下，异步发布确认条件下最快。

消息发布到服务器有三种情况：

- 消息发送成功
- 有交换机没有对应的路由键队列，消息发送成功
- 没有交换机
- 没有交换机及路由键队列同上

![image-20220716215819774](http://47.101.155.205/image-20220716215819774.png)

![image-20220716220038132](http://47.101.155.205/image-20220716220038132.png)

![image-20220716220207308](http://47.101.155.205/image-20220716220207308.png)

![image-20220716220308392](http://47.101.155.205/image-20220716220308392.png)

总结：消息没有发送成功回调ConfirmCallback。消息发送只回调ConfirmCallback。交换机存在没有路由键，先调用ReturnsCallback，再调用ConfirmCallback。






## SrpingBoot整合

### 配置文件

> pom依赖

~~~xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
 <dependency>
<groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit-test</artifactId>
	<scope>test</scope>
</dependency>
~~~



>yaml配置



~~~yaml
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
    connection-timeout: 60s
    listener:
      direct:
        acknowledge-mode: none

~~~

~~~properties
spring.rabbitmq.host: 服务Host
spring.rabbitmq.port: 服务端口
spring.rabbitmq.username: 用户名
spring.rabbitmq.password: 密码
spring.rabbitmq.virtual-host:  RabbitMQ的虚拟主机
spring.rabbitmq.addresses: 指定client连接到的server的地址，多个以逗号分隔(优先取addresses，然后再取host)
spring.rabbitmq.requested-heartbeat: 指定心跳超时，单位秒，0为不指定；默认60s
spring.rabbitmq.publisher-confirm-type: 开启Publisher Confirm机制:simple、none、rorrelated，关闭时默认none
spring.rabbitmq.publisher-returns: 开启publisher Return机制
spring.rabbitmq.connection-timeout: 连接超时，单位毫秒，0表示无穷大，不超时
spring.rabbitmq.listener.simple.acknowledge-mode: 表示消息确认方式，分别是none、manual和auto；默认auto

~~~

~~~yaml
spring:
  rabbitmq:
    username: oycm
    password: Aliyunoycm1234
    host: 39.101.165.70
    virtual-host: /
    publisher-returns: true #查看自动配置源码，这里配置为true，template.mandatory会配
    publisher-confirm-type: correlated #simple表示同步等待，correlated表示异步回调ConfirmCallback(上面false没事)
    template:
      mandatory: true #消息路由失败策略,true表示消息发送到交换机没有路由键ReturnCallBack，false表示直接丢失消息，消息创建时的模板
    listener:
      simple:
        acknowledge-mode: manual #消费者确认模式，开启之后，没有加入监听的队列，消息在得到后是UnAcked，使用手动Ack，第一次的消息不会
        retry:
          enabled: true #开启消费者失败重试
          
~~~





### 自动配置原理



~~~java
org.springframework.boot.autoconfigure.amqp.RabbitProperties;
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;

~~~

~~~java
@Bean
@ConditionalOnSingleCandidate(ConnectionFactory.class)
@ConditionalOnMissingBean(RabbitOperations.class)
public RabbitTemplate rabbitTemplate(RabbitTemplateConfigurer configurer, ConnectionFactory connectionFactory) {
	RabbitTemplate template = new RabbitTemplate();
	configurer.configure(template, connectionFactory);
	return template;
}

public void configure(RabbitTemplate template, ConnectionFactory connectionFactory) {
	PropertyMapper map = PropertyMapper.get();
	template.setConnectionFactory(connectionFactory);
	if(this.messageConverter != null) {
		template.setMessageConverter(this.messageConverter);
	}
	template.setMandatory(determineMandatoryFlag());
	RabbitProperties.Template templateProperties = this.rabbitProperties.getTemplate();
	if (templateProperties.getRetry().isEnabled()) {
		template.setRetryTemplate(new RetryTemplateFactory(this.retryTemplateCustomizers)
		.createRetryTemplate(templateProperties.getRetry(), RabbitRetryTemplateCustomizer.Target.SENDER));
	}
	map.from(templateProperties::getReceiveTimeout).whenNonNull().as(Duration::toMillis)
		.to(template::setReceiveTimeout);
	map.from(templateProperties::getReplyTimeout).whenNonNull().as(Duration::toMillis)
		.to(template::setReplyTimeout);
	map.from(templateProperties::getExchange).to(template::setExchange);
	map.from(templateProperties::getRoutingKey).to(template::setRoutingKey);
	map.from(templateProperties::getDefaultReceiveQueue).whenNonNull().to(template::setDefaultReceiveQueue);
}

~~~





### 配置了绑定exchange和queue

~~~java
package com.study.demo.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQConfig {

    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("shop",true,false);
    }

    @Bean
    public Queue queue1(){
        return new Queue("s1",true,false,false);
    }

    @Bean
    public Queue queue2(){
        return new Queue("s2",true,false,false);
    }

    @Bean
    public Queue queue3(){
        return new Queue("s3",true,false,false);
    }

    @Bean
    public Binding binding1(){
        return BindingBuilder.bind(queue1()).to(fanoutExchange());
    }

    @Bean
    public Binding binding2(){
        return BindingBuilder.bind(queue2()).to(fanoutExchange());
    }

    @Bean
    public Binding binding3(){
        return BindingBuilder.bind(queue3()).to(fanoutExchange());
    }
}

~~~



### 注入RabbitTemplate发送消息

~~~java
package com.study.demo.provider;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShopServicePublish {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void shop(){

        System.out.println("进入消费，通知到rabbitmq");
        rabbitTemplate.convertAndSend("shop","","消费了一次");
    }
}

~~~





### 注解消费消息

~~~java
package com.study.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ServiceSubscribe {

    @RabbitListener(queues = {"s1","s2","s3"})
    public void receive(String message){
        System.out.println(message);
    }
}
MessageProperties
    [headers(map集合)={spring_listener_return_correlation=a84d29ba-bc8f-4727-a959-b8b361e223d3, spring_returned_message_correlation=815d8347-5ee2-49f3-ab70-a7ebe231a9d9};
	contentType=text/plain;
	contentEncoding=UTF-8;
    contentLength=0;
    receivedDeliveryMode=PERSISTENT;
    priority=0;
    redelivered=false;
    receivedExchange=confirm;
    receivedRoutingKey=ack;
    deliveryTag=1;
    consumerTag=amq.ctag-2kyYLSIEOJCMoPzISGJBsw;
    consumerQueue=my_ack]
    
~~~



## Features属性

### x-message-ttl

队列消息存活时间，单位毫秒

消息策略

> 创建一个队列，声明消息只能存活60s

~~~java
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-message-ttl", 60000);
channel.queueDeclare("myqueue", false, false, false, args);
~~~



~~~bash
rabbitmqctl set_policy TTL ".*"  '{"x-message-ttl":60000}' --apply-to
~~~





### x-expires

队列存活时间，单位毫秒

如果exchange存在，还创建这样的交换机，注册的exchange的Features如果和以前的不同，会出现异常，程序直接退出。

~~~java
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-expires", 1800000);
channel.queueDeclare("myqueue", false, false, false, args);
~~~

~~~bash
rabbitmqctl set_policy expiry ".*" '{"expires":1800000}' --apply-to queues
~~~





### Dead letter exchange

死信发送的消息的条件是

- rejected消息被消费者手动拒绝(basic.reject / basic.nack)，并且requeue = false
- expired消息过期
- maxlen消息接收消息满了
- delivery_limit消息返回的次数超过了限制

x-dead-letter-exchange

队列属性绑定Dead letter exchange，如果消息存满了，消息过期，会自动存到死性队列中去。

~~~bash
rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"my-dlx"}' --apply-to queues
~~~

~~~java
channel.exchangeDeclare("some.exchange.name", "direct");

Map<String, Object> args = new HashMap<String, Object>();
args.put("x-dead-letter-exchange", "some.exchange.name");

channel.queueDeclare("myqueue", false, false, false, args);
~~~







### Dead letter routing key

x-dead-letter-routing-key

~~~java

channel.exchangeDeclare("some.exchange.name", "direct");

Map<String, Object> args = new HashMap<String, Object>();
args.put("x-dead-letter-exchange", "some.exchange.name");
args.put( "x-dead-letter-routing-key" , "some-routing-key" );

channel.queueDeclare("myqueue", false, false, false, args);
~~~



![image-20220712113851924](http://47.101.155.205/image-20220712113851924.png)





### Alternate Exchanges交换机属性

绑定交换机之间的关系

~~~bash
#条件如下，已经存在交换机my-direct,my-ae。
#my-direct交换机是direct类型，绑定了队列round下的key1
#my-ae是fanout类型，绑定了队列q1,q2,q3
#如果向交换机my-direct下的路由key1发送消息，这时队列round会收到message
#如果向交换机my-direct下的路由key2(未绑定)发送消息，这时my-ae绑定的队列q1，q2，q3会收到消息
rabbitmqctl set_policy AE "^my-direct$" '{"alternate-exchange":"my-ae"}' --apply-to exchanges
#可视化界面会有AE属性，悬浮上面显示alternate-exchange: run
~~~



> 代码声明绑定

~~~java
Map<String, Object> args = new HashMap<String, Object>();
args.put("alternate-exchange", "my-ae");
channel.exchangeDeclare("my-direct", "direct", false, false, args);
channel.exchangeDeclare("my-ae", "fanout");
channel.queueDeclare("routed");
channel.queueBind("routed", "my-direct", "key1");
channel.queueDeclare("unrouted");
channel.queueBind("unrouted", "my-ae", "");
~~~









## RabbitMQ配置

https://www.rabbitmq.com/configure.html#config-items

### 内存配置

> 命令设置

~~~bash
rabbitmqctl set_vm_memory_high_watermark absolute 2GB
rabbitmqctl set_vm_memory_high_watermark 0.4
rabbitmq-diagnostics memory_breakdown #查询内存配置
rabbitmq-diagnostics status #查询

~~~





> 配置文件设置

~~~conf
vm_memory_high_watermark.absolute = 2GB 
vm_memory_high_watermark.relative = 0.4 #默认
vm_memory_high_watermark.relative = 0.7 #推荐0.4-0.7

~~~



> 测试，设置内存空间为50MB

~~~bash
rabbitmqctl set_vm_memory_high_watermark absolute 50MB #设置最大内存为50MB
#这个时候向队列里发送，消息，不会被接收
rabbitmqctl set_vm_memory_high_watermark 0.4

~~~





### 内存存盘

> 配置文件设置

~~~conf
# 默认的
vm_memory_high_watermark_paging_ratio = 0.5 

~~~





### 磁盘配置

> 命令设置

~~~bash
rabbitmqctl set_disk_free_limit
rabbitmqctl set_disk_free_limit mem_relative 1.0

~~~



> 配置文件配置

~~~conf
disk_free_limit.relative = 3.0 #在具有4GB内存的节点上，系统的磁盘低于12GB，则所有的新消息都会被阻止，直到磁盘警报被清除。
disk_free_limit.absolute = 2GB
disk_free_limit.absolute = 50MB

~~~



> 测试，设置绝对内存100GB

~~~bash
rabbitmqctl set_disk_free_limit 100GB
#设置磁盘内存最小为100GB时，不能往exchage的queue中写入消息，直到磁盘警告被清除。
rabbitmqctl set_disk_free_limit 50MB

~~~







## 集群搭建

官网文档：https://www.rabbitmq.com/clustering.html

- linux系统rabbitmq节点cookie的位置：/var/lib/rabbitmq/.erlang.cookie
- Docker使用RABBITMQ_ERLANG_COOKIE环境变量配置cookie
- CLI查看cookie信息 rabbitmq-diagnostics erlang_cookie_sources

官方推荐搭建奇数节点的集群

> 本机集群搭建

~~~bash
RABBITMQ_NODE_PORT=5677 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15679}]" RABBITMQ_NODENAME=rabbit-1 rabbitmq-server -detached #开启一个节点为rabbit-1的rabbitmq服务
rabbitmqctl -n rabbit-1 stop_app #关闭rabbit-1服务 

RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=rabbit-3 rabbitmq-server -detached

RABBITMQ_NODE_PORT=5674 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15674}]" RABBITMQ_NODENAME=rabbit-4 rabbitmq-server -detached

#绑定主从关系
rabbitmqctl -n rabbit-3 stop_app
rabbitmqctl -n rabbit-3 join_cluster rabbit-1@oycm
rabbitmqctl -n rabbit-3 start_app

rabbitmqctl -n rabbit-4 stop_app
rabbitmqctl -n rabbit-4 join_cluster rabbit-1@oycm
rabbitmqctl -n rabbit-4 start_app

#查看集群关系
rabbitmqctl cluster_status -n rabbit-1

#设置账户关系
rabbitmqctl -n rabbit-1 add_user admin Aliyunoycm1234
rabbitmqctl -n rabbit-1 set_user_tags admin administrator

#删除绑定关系
rabbitmqctl -n rabbit-1@oycm forget_cluster_node rabbit-4@oycm
rabbitmqctl -n 主节点名@主节点名 forget_cluster_node 要删除的节点名@主机名

rabbitmqctl stop #停止服务

~~~

firewall-cmd --zone=public --add-port=15674/tcp --permanent

~~~bash
RABBITMQ_NODE_PORT=5672 RABBITMQ_NODENAME=rabbit rabbitmq-server start &
RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=rabbit-3 rabbitmq-server start &
RABBITMQ_NODE_PORT=5674 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15674}]" RABBITMQ_NODENAME=rabbit-4 rabbitmq-server start &

#这里的&表示后台启动的运行

rabbitmqctl -n rabbit-3 stop_app
rabbitmqctl -n rabbit-3 join_cluster rabbit@oycm
rabbitmqctl -n rabbit-3 start_app

rabbitmqctl -n rabbit-1@oycm forget_cluster_node rabbit-4@oycm
rabbitmqctl -n rabbit-4 reset
rabbitmqctl -n rabbit-4 join_cluster rabbit@oycm
rabbitmqctl -n rabbit-4 start_app

~~~



~~~bash
/var/lib/rabbitmq/mnesia #目录中生成节点的pid文件
/var/log/rabbitmq #目录中是节点生成的日志
/lib/rabbitmq/bin #目录是rabbimtmq命令所在位置

~~~





## 分布式事务







## Lazy Queues

官网地址：https://www.rabbitmq.com/lazy-queues.html



## Streams(?)

官网：https://www.rabbitmq.com/streams.html

队列的类型，Stream

~~~java
//java声明一个Stream队列
ConnectionFactory factory = new ConnectionFactory();
Connection connection = factory.newConnection();
Channel channel = connection.createChannel();
channel.queueDeclare(
  "my-stream",
  true,         // durable
  false, false, // not exclusive, not auto-delete
  Collections.singletonMap("x-queue-type", "stream")
);//java客户端声明一个流队列

Map<String, Object> arguments = new HashMap<>();
arguments.put("x-queue-type", "stream");
arguments.put("x-max-length-bytes", 20_000_000_000); // maximum stream size: 20 GB
arguments.put("x-stream-max-segment-size-bytes", 100_000_000); // size of segment files: 100 MB
channel.queueDeclare(
  "my-stream",
  true,         // durable
  false, false, // not exclusive, not auto-delete
  arguments
);

~~~



~~~java
channel.basicQos(100); // QoS must be specified
channel.basicConsume(
  "my-stream",
  false,
  Collections.singletonMap("x-stream-offset", "first"), // "first" offset specification
  (consumerTag, message) -> {
    // message processing
    // ...
   channel.basicAck(message.getEnvelope().getDeliveryTag(), false); // ack is required
  },
  consumerTag -> { });

~~~



| Feature                                                      | Classic     | Stream                                                       |
| :----------------------------------------------------------- | :---------- | :----------------------------------------------------------- |
| Non-durable queues                                           | yes         | no                                                           |
| Exclusivity                                                  | yes         | no                                                           |
| Per message persistence                                      | per message | always                                                       |
| Membership changes                                           | automatic   | manual                                                       |
| TTL                                                          | yes         | no (but see [Retention](https://www.rabbitmq.com/streams.html#retention)) |
| Queue length limits                                          | yes         | no (but see [Retention](https://www.rabbitmq.com/streams.html#retention)) |
| Lazy behaviour                                               | yes         | inherent固有                                                 |
| Message priority                                             | yes         | no                                                           |
| Consumer priority                                            | yes         | no                                                           |
| Dead letter exchanges                                        | yes         | no                                                           |
| Adheres to [policies](https://www.rabbitmq.com/parameters.html#policies) | yes         | (see [Retention](https://www.rabbitmq.com/streams.html#retention)) |
| Reacts to [memory alarms](https://www.rabbitmq.com/alarms.html) | yes         | no (uses minimal RAM)                                        |
| Poison message handling                                      | no          | no                                                           |
| Global [QoS Prefetch](https://www.rabbitmq.com/streams.html#global-qos) | yes         | no                                                           |





## Log Collection（*）



## basic.nack

~~~java
GetResponse gr1 = channel.basicGet("some.queue", false);
GetResponse gr2 = channel.basicGet("some.queue", false);
channel.basicNack(gr2.getEnvelope().getDeliveryTag(), true, true);

~~~





## 延迟机制

![image-20220713210849492](http://47.101.155.205/image-20220713210849492.png)



## 思考

### 如何保证RabbitMQ顺序消费？

使用单一队列+单一消费者模式。

FIFO(先进先出)设计。





### RabbitMQ如何保证消息不会丢失？

出现消息丢失的情况：

- 生产者发送消息丢失
- RabbitMQ服务端消息丢失
- 消费者消息丢失



- 一是使用RabbitMQ的事务功能，同步效率低。二是使用RabbitMQ的confirm模式，异步确认模式。
- 消息持久化，设置队列持久化，消息deliverMode设置为2。
- 手动ack。



### 怎么保证消息不重复消费

幂等性：同一操作进行一次或多次执行的结果是一致的，不会因为重复执行而产生副作用。

#### MVCC

MVCC（Multi-Version Concurrency Control多版本并发控制）是一种用于数据库管理系统（DBMS）中实现并发控制的技术。MVCC 机制通过每个事务分配唯一的事务标识符（Transaction ID，TID）来允许多个事务并发地访问数据库，从而避免了锁定资源以防止冲突的传统并发控制方法的一些缺点。

在 MVCC 中，每个事务在开始时都会创建一个时间戳，并在其执行期间保持不变。每个数据库对象（如表、行或页）都会分配一个或多个版本号。当事务访问数据库对象时，它将只能访问**早于**该时间戳的版本。

MVCC 机制中的读操作与写操作之间存在不同的规则。在读操作中，只有早于该时间戳的已提交版本才会被读取，因此读操作不会受到正在执行的并发写操作的干扰。在写操作中，事务会创建新版本，并将其写入磁盘。如果另一个事务正在访问旧版本，则该事务将继续读取旧版本，而不是被新版本所覆盖。

MVCC 机制的优点是提高了数据库系统的并发性能，因为多个事务可以同时读取和修改数据库对象，而不会互相干扰。同时，MVCC 机制也降低了死锁的风险，因为事务不需要等待其他事务释放锁定的资源才能继续执行。

但是，MVCC 机制也有一些缺点。例如，它会增加数据库系统的存储成本，因为每个版本都需要额外的存储空间。此外，在某些情况下，MVCC 机制可能会导致一些奇怪的现象，例如`不可重复读`或`幻读`，这些都是因为在不同的时间戳下读取了不同的版本所导致的。



>介绍

MVCC（Multi-Version Concurrency Control）是一种数据库并发控制技术，它允许多个事务同时读取数据库中的同一数据，而不会发生数据冲突和丢失更新的问题。MVCC最早是在PostgreSQL数据库中实现的，现在已经被广泛应用于许多数据库系统中。

MVCC的基本思想是，为每个事务分配一个唯一的时间戳（或版本号），并将每个数据行的所有版本都保存在数据库中。每个事务只能看到早于自己时间戳（或版本号）的数据行版本。当一个事务修改一行数据时，它会在该数据行的版本链中创建一个新版本，并将自己的时间戳（或版本号）分配给这个新版本。因此，不同事务的修改会形成不同的版本链。

当一个事务要读取一个数据行时，它会查找该数据行的版本链，找到最新的早于自己时间戳（或版本号）的版本，并读取其中的数据。如果数据行的最新版本早于事务的时间戳（或版本号），则意味着其他事务已经修改了该数据行，该事务需要回滚并重新读取数据。

MVCC的优点在于它允许并发访问数据库，而不需要锁定整个表或行，从而提高了并发性能和吞吐量。但是，它也会带来一些额外的开销，例如在版本链中保存数据的多个版本可能会占用更多的存储空间。







#### Tocken机制

首先将 RabbitMQ 的消息自动确认机制改为手动确认，每当有一条消息消费成功，就把消息的唯一Id记录在redis上，并且每次收到消息时，都先去redis上查询是否有该消息id，如果有消息id，则表示已经消费过了，不需要再去处理，否则再去处理。



#### 设计去重表

给每条消息一个唯一 ID，消费者在处理消息时将 ID 存储。如果接收到相同 ID 的消息，消费者可以选择跳过，从而避免重复处理。






