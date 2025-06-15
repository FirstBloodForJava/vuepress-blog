# SpringCloud

## 1.微服务架构带来的问题

1. 客户端如何访问
2. 服务之间如何通信
3. 服务怎么治理
4. 服务宕机怎么办





## 2.微服务的概念

1. 什么是微服务？：将一个大的一整块的业务拆分成多个服务一起来完成。

2. 微服务之间如何建立通信？：SpringCloud之间的微服务通过http请求响应来建立通信。

3. springcloud和dubbo有哪些区别？：底层协议不同，CAP注重点不同。

4. springboot和springcloud之间的联系？：springboot不依赖于springcloud，springboot可以快速的开发一个微服务出来，springcloud集成了springboot，没有springboot不能运行，而且springcloud可以用来治理这些个服务。

5. 什么是服务熔断？服务降级？：服务在调用的过程中，出现网络故障，或者异常的时候，导致服务卡死在一个地方，导致系统内存的占用，通过服务熔断来结束服务的调用。

6. 微服务的优点是什么？

- 支持多语言开发
- 高内聚，低耦合
- 易扩展
- 开发效率高

7. 微服务的缺点是什么？

- 服务治理难

- 保证数据的一致性难

- 服务的通信成本

8. 微服务技术栈有哪些？
9. eureka和zookeeper提供服务注册和服务发现的区别？eureka安装服务可视化界面简单，服务调用的区别，zookeeper通过pom文件可以直接调用。





## 3.微服务

### 3.1.什么是微服务

维基上对其定义为：一种软件开发技术- 面向服务的体系结构（SOA）架构样式的一种变体，它提倡将**单一应用程序**划分成**一组**小的服务，服务之间互相协调、互相配合，为用户提供最终价值。每个服务运行在其独立的进程中，服务与服务间**采用轻量级的通信机制**互相沟通（通常是基于HTTP的RESTful API）。每个服务都围绕着具体业务进行构建，并且能够独立地部署到生产环境、类生产环境等。另外，应尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据上下文，选择合适的语言、工具对其进行构建。



微服务（微服务架构）是一种架构模式，微服务有许多较小的、松散耦合的服务组成一个应用程序



### 3.2.微服务优缺点

- 优点

1. 单一职责原则，高内聚（单一服务）、低耦合（服务之间）

2. 开发效率提高

3. 微服务可以多语言开发

4. 微服务有自己的堆栈、包括数据库、数据模型

5. 微服务只是业务逻辑的代码

6. ...

   

- 缺点

1. 处理分布式系统的复杂性
2. 多服务运维难度
3. 系统部署的依赖
4. 服务之间的通信成本
5. 数据一致性
6. 系统集成测试
7. 性能监控
8. ...





## 4.SpringCloud

spring-cloud-netflix：https://www.springcloud.cc/spring-cloud-netflix.html

spring-cloud：https://www.springcloud.cc/spring-cloud-dalston.html

spring中文网：https://www.springcloud.cc/

springcloud中文网：https://www.springcloud.cc/spring-cloud-greenwich.html#_router_and_filter_zuul

![image-20220705100855576](http://47.101.155.205/image-20220705100855576.png)

SpringCloud包含了管理服务的组件，提供了服务治理、服务网关、智能路由、负载均衡、熔断器、监控跟踪、分布式消息队列、配置管理等的解决方案。



## 5.SpringCloud实现服务远程调用

项目环境搭建

1. 创建一个空的项目
2. 导入spring-cloud、spring-boot、数据库驱动、springboot-mybatis启动器、日志测试依赖导入（采用dependencyManagement）
3. 新建一个springcloud-api模块，提供实体类，对应创建一个数据库。
4. 新建一个springcloud-provider-user-8081模块，从父项目中导入web启动器、mysql驱动、mybatis启动器、log4j依赖、数据源依赖，springcloud-api的pom文件，这个服务负责处理一定的业务。
5. 配置文件配置端口号8081，以及mybatis数据源配置，类别名配置、mapper文件地址配置，
6. 编写业务代码，mapper包、service包、controller包。
7. springcloud-provider-user-8081模块的springboot启动类，（要在一个包下）
8. 新建一个springcloud-consumer-user-80模块，导入springcloud-api pom文件、web启动器
8. 编写配置文件，端口号80、
9. 将org.springframework.web.client.RestTemplate对象注册到容器中去，使用@Configuration，@Bean注入到容器
10. controller层中，controller类中从容器中取出RestTemplate对象，通过这个对象去访问服务提供者的服务业务
11. 编写springcloud-consumer-user-80模块的启动类，启动测试。
12. 添加一个对象的时候像是为null





总结这个实现的过程：

一个实现服务的注册，一个实现了服务的消费，将提供的服务注册成url，然后发布出去，服务的消费通过RestTemplate对象调用方法传递的参数url，response的对象类型，以及传递的参数去再次发起一个http请求，然后将结果响应到消费者这里。服务提供者提供需要与实体类、数据库交互等进行交互，处理业务逻辑，而服务消费者只需要访问服务提供者以及接收实体类，



使用\<dependencyManagement\>和\<dependencies\>的在父项目中，前者没有实际的依赖导入进来，在子模块中真正导入的时候可以不写依赖的版本号，后者会在父项目中直接导入，子模块集成父项目的依赖，直接默认导入

**RestTemplate 是 Spring 家族中的一个用于消费第三方 REST 服务的请求框架。**

核心点是生成者生产服务，暴露服务，让消费者调用，消费者通过`org.springframework.web.client.RestTemplate`实例实现调用生产者，实际上还是一个请求的调用。这里解决了服务之间如何通信，C(消费者者)调用了P(生产者)，P将结果返回给了C。如果调用过程中P出现了异常，C会收到`org.springframework.web.client.HttpServerErrorException$InternalServerError: 500 null`。通过C/S模式，实现了服务之间的通信。



> 依赖包

~~~xml
<dependencyManagement>
	<dependencies>
		<!--spring-cloud依赖-->
        <dependency>
        	<groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud-version}</version>
            <type>pom</type>
           	<scope>import</scope>
		</dependency>
        <!--springboot依赖-->
        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-dependencies -->
        <dependency>
        	<groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.1.4.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
		</dependency>

		<!--数据库驱动-->
        <dependency>
        	<groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
		</dependency>
        <!--数据源依赖-->
        <dependency>
        	<groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.10</version>
		</dependency>
        <!--springboot的mybatis启动器-->
        <dependency>
        	<groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.0</version>
		</dependency>
        <!--测试依赖-->
        <dependency>
        	<groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
		</dependency>
        <!--日志-->
        <dependency>
        	<groupId>ch.qos.logback</groupId>
			<artifactId>logback-core</artifactId>
            <version>1.2.3</version>
		</dependency>
        <dependency>
        	<groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
		</dependency>
	</dependencies>
</dependencyManagement>
~~~



~~~yaml
#生产者配置文件
server:
  port: 8081
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    username: root
    password: 1024
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud?useUnicode=true&characterEncoding=utf-8
mybatis:
  type-aliases-package: com.study.pojo

#消费者配置文件
server:
  port: 80
~~~



> RestTemplate实例注册

~~~java
@Configuration
public class ConfigBean {

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
//通过http请求将两个服务之间建立联系
~~~

RestTemplate 针对各种类型的 HTTP 请求都提供了相应的方法进行处理，例如 HEAD、GET、POST、PUT、DELETE 等类型的 HTTP 请求，分别对应 RestTemplate 中的 headForHeaders()、getForObject()、postForObject()、put() 以及 delete() 方法。

| HTTP请求 | RestTemplate     |
| -------- | ---------------- |
| HEAD     | headForHeaders() |
| GET      | getForObject()   |
| POST     | postForObject()  |
| PUT      | put()            |
| DELETE   | delete()         |
|          |                  |





## 6.Eureka

Eureka是Netflix开发的服务发现框架，本身是一个基于REST的服务，主要用于定位运行在AWS域中的中间层服务，以达到负载均衡和中间层服务故障转移的目的。

SpringCloud将它集成在其子项目spring-cloud-netflix中，以实现SpringCloud的`服务发现`功能。

Eureka包含两个组件：**Eureka Server**和**Eureka Client**。

**Eureka Server**：提供服务注册服务，各个节点启动后，会在Eureka Server中进行注册，这样EurekaServer中的服务注册表中将会存储所有可用服务节点的信息，服务节点的信息可以在界面中直观的看到。

**Eureka Client**：是一个java客户端，用于简化与Eureka Server的交互，客户端同时也就是一个内置的、使用轮询(round-robin)负载算法的负载均衡器。

在应用启动后，将会向Eureka Server发送心跳,默认周期为30秒，如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，Eureka Server将会从服务注册表中把这个服务节点移除(默认90秒)。

Eureka Server之间通过复制的方式完成数据的同步，Eureka还提供了客户端缓存机制，即使所有的Eureka Server都挂掉，客户端依然可以利用`缓存`中的信息消费其他服务的API。综上，Eureka通过心跳检查、客户端缓存等机制，确保了系统的高可用性、灵活性和可伸缩性。

“心跳”指的是一段定时发送的自定义信息，让对方知道自己“存活”，以确保连接的有效性。大部分 CS 架构的应用程序都采用了心跳机制，服务端和客户端都可以发心跳。通常情况下是客户端向服务器端发送心跳包，服务端用于判断客户端是否在线。



### 6.1.Eureka Server

1. 导入spring-cloud-starter-eureka-server依赖1.4.6.RELEASE
2. 编写配置文件端口号、hostname、修改默认的注册地址、register-with-eureka是否注册中心注册自己，fetch-registry表示提交注册表
3. 开启@EnableEurekaServer注解驱动

> Eureka Server启动依赖

~~~xml
<!--单独的不导入这个启动不了项目-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>${spring-cloud-version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
	<groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka-server</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>

~~~



> Eureka配置文件

~~~yaml
server:
  port: 7001
eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://localhost:7001/eureka/

~~~





### 6.2.Eureka Client

1. 将springcloud远程服务调用的项目复制一份
1. 在provider的项目中导入spring-cloud-starter-eureka依赖1.4.6.RELEASE版本
2. 编写配置文件，服务注册的地址，instance-id
3. 开启注解自动配置@EnableEurekaClient注解驱动



~~~xml
<!--eureka客户端-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
<!--配置可以查看info信息-->
<dependency>
	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

~~~



~~~yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka/
    fetch-registry: true
  instance:
    instance-id: provider-user-8081 #Status
info:
  app:
    name: eureka programe
    version: 1.0.0
  company.name: eureka company
  company.grade: 1
~~~

不指定instance-id的服务名称为：MSI:spring-cloud-config-clent-default:7788，localhost:spring.application.name:port







### 6.3、DiscoverryClient

1. consumer模块导入eureka客户端依赖
2. 配置eureka服务端地址
3. @EnableEurekaClient
4. 通过org.springframework.web.client.RestTemplate实例调用服务
5. 注入



~~~xml
<dependency>
	<groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
~~~



~~~yaml
eureka:
  client:
    register-with-eureka: false
    fetch-registry: true
    service-url:
      defaultZone: http://localhost:7001/eureka/
~~~



> 通过DiscoveryClient可以获取Eureka服务端注册的服务信息

~~~java
@Autowired
private DiscoveryClient discoveryClient;
for (String service : discoveryClient.getServices()) {
	System.out.println("service \t" +service);
}
for (ServiceInstance instance : discoveryClient.getInstances("PROVIDER-8081")) {
	System.out.println("instance.getUri() \t" + instance.getUri());
    System.out.println("instance.getInstanceId() \t"+instance.getInstanceId());
    System.out.println("instance.getHost() \t"+instance.getHost());
    System.out.println("instance.getPort() \t"+instance.getPort());
    System.out.println("instance.getMetadata() \t" + instance.getMetadata());
    System.out.println("instance.getScheme() \t"+instance.getScheme());
}

~~~



将生产者注册通过Eureka-Client到Eureka-Server，消费者通过和Eureka-Client可以发现Eureka-Server的服务。服务注册成功，如果Eureka-Server出现问题停止服务，消费者还是可以通过RestTemplate请求路径继续访问服务生产者。在这个过程中，生产者会一直去试图和Eureka-Server建立通信，消费者也会一直试图建立通信。消费者在接收请求之后也会试图和Eureka-Server建立连接。



如果说DiscoveryClient实例已经注入到消费者容器里面了，在这之后，Eureka-Server挂掉，然后又有新的Eureka-Client注册服务进去，消费者能获取到新注册的服务信息吗？

**经过测试发现，可以实现发现新注册的服务信息。**









### 6.4.Eureka集群





## 7.CAP

CAP定理，C一致性、A可用性、P分区容错性

Eureka注重AP。

Zookeeper注重CP。



## 8.Ribbon

Ribbon 是`Spring Cloud Netflix`模块的子模块，它是`Spring Cloud`对`Netflix Ribbon`的二次封装。通过它，我们可以将面向服务的REST模板（RestTemplate）请求转换为**客户端负载均衡的服务调用**。

将服务注册在Eureka中，消费方通过加入Eureka客户端、ribbon依赖，通过ribbon查询能调用的服务生产者生产的服务。



> 服务端负载均衡

服务端负载均衡是在客户端和服务端之间建立一个独立的负载均衡服务器，该服务器既可以是硬件设备（例如 F5），也可以是软件（例如 Nginx）。这个负载均衡服务器维护了一份可用服务端清单，然后通过心跳机制来删除故障的服务端节点，以保证清单中的所有服务节点都是可以正常访问的。

当客户端发送请求时，该请求不会直接发送到服务端进行处理，而是全部交给负载均衡服务器，由负载均衡服务器按照某种算法（例如轮询、随机等），从其维护的可用服务清单中选择一个服务端，然后进行转发。

![image-20220706110449501](http://47.101.155.205/image-20220706110449501.png)

服务端负载均衡特点：

- 需要建立独立的负载均衡服务器
- 负载均衡是在客户端发起请求后进行的，客户端不知道哪个服务端提供的服务
- 可以将服务清单存储在负载均衡服务器上



> 客户端负载均衡

 客户端负载均衡是将负载均衡逻辑以代码的形式封装到客户端上，即负载均衡器位于客户端。客户端通过服务注册中心（例如 Eureka Server）获取到一份服务端提供的可用服务清单。有了服务清单后，负载均衡器会在客户端**发送请求前通过负载均衡算法选择一个服务端实例**再进行访问，以达到负载均衡的目的。

![image-20220706110848027](http://47.101.155.205/image-20220706110848027.png)

客户端负载均衡特点：

- 不需要单独搭建负载均衡服务器
- 负载均衡是在服务发送前进行的，客户端知道调用的哪个服务
- 客户端的服务清单都来自与注册中心





Eureka-Server的作用是让生产者注册服务，让消费者获取服务信息，就算Server端挂掉，也不影响服务的调用。但是真正提高服务的生产者，但是服务挂掉是不能正常访问的！

前面配置好了，不能调用服务，是配置文件出了问题，defaultZone

~~~yaml
eureka:
  client:
    register-with-eureka: false
    service-url:
      defaultZone: http://localhost:7001/eureka/
      
~~~



使用Ribbon调用eureka中的服务

1. 导入eureka客户端及ribbon依赖
2. 编写配置文件
3. RestTemplate对象加上@LoadBalance注解
4. 访问路径改变成服务名称

~~~xml
<!--依赖-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-eureka</artifactId>
	<version>1.4.6.RELEASE</version>
</dependency>
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-ribbon</artifactId>
	<version>1.4.6.RELEASE</version>
</dependency>

~~~

~~~java
@Configuration
public class ConfigBean {
    @Bean
    @LoadBalanced//加上这个注解，默认使用轮询的负载均衡策略
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}

~~~

~~~java
private static final String REST_URL_PREFIX = "http://PROVIDER-USER";
//可以修改为服务名称访问
~~~





###8.1.Ribbon实现负载均衡

1. 将前面的生产者复制出两个模块，2个数据库
2. 修改里面的配置文件，修改端口号，以及eureka instance的instance-id
3. 启动注册中心，再启动3个服务，启动服务消费者，
4. 发现查询的数据都是有序的
5. 再关闭eureka服务的进程时，注册的服务没有关闭，还能继续访问，如果关闭了其中一个服务，当访问的请求轮到这个服务时，会500，如果下一个服务没有关闭，可以继续查询到数据。
6. eureka服务端没有关闭，而是关闭了服务生产者中的服务，这个时候就会偶尔出现一次500，后面的就可以继续访问



> 注册的服务，spring.application.name保持一致，eureka.client.instance.instance-id不相同

~~~yaml
server:
  port: 8081
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka/
    fetch-registry: true
  instance:
    instance-id: provider-user-8081 #Status
    prefer-ip-address: true
---
server:
  port: 8082
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka/
    fetch-registry: true
  instance:
    instance-id: provider-user-8082 #Status
    prefer-ip-address: true
---
server:
  port: 8083
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka/
    fetch-registry: true
  instance:
    instance-id: provider-user-8083 #Status
    prefer-ip-address: true
~~~



~~~java
@Bean
public IRule myRule(){
	return new RandomRule();
}
~~~





###8.2.自定义Ribbon负载均衡算法

默认的Ribbon负载均衡算法使用的是RoundRobinRule类的方法。

可以通过注入不同的IRule对象来改变Ribbon的负载均衡策略

~~~java
@Bean
public IRule iRule(){
    return new RoundRobinRule();
}
~~~

我们自定义的算法配置类不能放在@ComponentScan所扫描的当前包及其子包下，否则我们自定义的这个配置类就会被所有的Ribbon客户端所共享，达不到特殊定制化的目的。说白了就是不能放在主启动类所在的包以及他所在包的子包

出现的问题：自定义配置没有问题，可是自定义的IRule一直没有生效



~~~java
package com.myrule;

import com.netflix.client.config.IClientConfig;
import com.netflix.loadbalancer.AbstractLoadBalancerRule;
import com.netflix.loadbalancer.ILoadBalancer;
import com.netflix.loadbalancer.Server;

import java.util.List;

public class MyRule extends AbstractLoadBalancerRule {

    private int total = 0;            // 总共被调用的次数，目前要求每台被调用5次
    private int currentIndex = 0;    // 当前提供服务的机器号
    public Server choose(ILoadBalancer lb, Object key) {
        if (lb == null) {
            return null;
        }
        Server server = null;
        while (server == null) {
            if (Thread.interrupted()) {
                return null;
            }
            //获取所有有效的服务实例列表
            List<Server> upList = lb.getReachableServers();
            //获取所有的服务实例的列表
            List<Server> allList = lb.getAllServers();
            //如果没有任何的服务实例则返回 null
            int serverCount = allList.size();
            if (serverCount == 0) {
                return null;
            }
            //与随机策略相似，但每个服务实例只有在调用 3 次之后，才会调用其他的服务实例
            if (total < 3) {
                server = upList.get(currentIndex);
                total++;
            } else {
                total = 0;
                currentIndex++;
                if (currentIndex >= upList.size()) {
                    currentIndex = 0;
                }
            }
            if (server == null) {
                Thread.yield();
                continue;
            }
            if (server.isAlive()) {
                return (server);
            }
            server = null;
            Thread.yield();
        }
        return server;
    }


    public void initWithNiwsConfig(IClientConfig iClientConfig) {

    }

    public Server choose(Object key) {
        return choose(getLoadBalancer(),key);
    }
}

~~~





~~~java
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name = "PROVIDER-USER",configuration = IRuleConfig.class)
public class ConsumerUser_80 {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerUser_80.class,args);
    }
}
~~~

~~~java
@Configuration
public class IRuleConfig {
    @Bean
    public IRule myRule(){
        return new MyRule();
    }
}
~~~



当主启动类同级的包下有配置的Ribbon的负载均衡时，会有一定的冲突。



##9.Feign和OpenFeign

`Feign`就是通过注解`服务名`、注解`请求路径`，自己封装出来了一个`RestTemplate`对象来处理这些请求，直接通过方法设定好需要调用的请求，底层还是动态代理模式

`OpenFeign`全称`Spring Cloud OpenFeign`，它是Spring官方推出的一种声明式服务调用与负载均衡组件，它的出现就是为了替代进入停更维护状态的Feign。

`OpenFeign`是Spring Cloud对Feign的二次封装，它具有Feign的所有功能，并在Feign的基础上增加了对 Spring MVC 注解的支持，例如`@RequestMapping`、`@GetMapping`和`@PostMapping`等。

前面在使用`Ribbon + RestTemplate`时，利用RestTemplate对Http请求的封装处理，形成了一套模板化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义，在Feign的实现下，我们只需要创建一个接口并使用注解的方式来配置它（类似于以前Dao接口上标注Mapper注解，现在是一个微服务接口上面标注一个Feign注解
即可）即可完成对服务提供方的接口绑定，简化了使用Spring Cloud Ribbon时，自动封装服务调用客户端的开发量。

| OpenFeign常用注解   | 介绍                                                         |
| ------------------- | ------------------------------------------------------------ |
| @FeignClient        | 通知OpenFeign组件对 @RequestMapping注解下的接口进行解析，并通过动态代理的方式产生实现类，实现负载均衡和服务调用。 |
| @EnableFeignClients | 开启OpenFeign功能，当Spring Cloud应用启动时，OpenFeign会扫描标有@FeignClient注解的接口，生成代理并注册到 Spring 容器中。 |
| @RequestMapping     | Spring MVC注解，在Spring MVC中使用该注解映射请求，通过它来指定控制器（Controller）可以处理哪些URL请求，相当于 Servlet 中 web.xml 的配置。 |
| @GetMapping         | Spring MVC 注解，用来映射 GET 请求，它是一个组合注解，相当于 @RequestMapping(method = RequestMethod.GET) 。 |
| @PostMapping        | Spring MVC 注解，用来映射 POST 请求，它是一个组合注解，相当于 @RequestMapping(method = RequestMethod.POST) 。 |





~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-feign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
~~~

1. 导入依赖
2. 定义接口
3. 定义方法对应的请求注解
4. 自动注入接口类型
5. 启动类注解@EnableFeignClients



~~~java
@FeignClient(name = "provider-user")
public interface MyFeignClient {
    @GetMapping("/user/all")
    List<User> queryAll();

    @GetMapping("/user/id/{id}")
    User queryById(@PathVariable("id") int id);

    @GetMapping("/user/add")
    int add(User user);
}
~~~

~~~java
package com.study.controller;
@RestController
public class UserConsumerController {

    @Autowired
    private MyFeignClient service;


    @RequestMapping("/consumer/user/id/{id}")
    public User get(@PathVariable("id")int id){
        return service.queryById(id);
    }

    @RequestMapping("/consumer/user/add")
    public int add(User user){
        System.out.println(user);
        return service.add(user);
    }

    @RequestMapping("/consumer/user/all")
    public List<User> all(){
        System.out.println("/consumer/user/all");
        return service.queryAll();
    }
}
~~~

~~~java
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class ConsumerUserFeign {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerUserFeign.class,args);
    }
}
~~~



> 超时控制

Feign客户端的默认超时时间为1秒钟，如果服务端处理请求的时间超过1秒就会报错。为了避免这样的情况，我们需要对OpenFeign客户端的超时时间进行控制。

设置feign时间控制

~~~yaml
ribbon:
  ReadTimeout: 6000 #建立连接所用的时间，适用于网络状况正常的情况下，两端两端连接所用的时间
  ConnectionTimeout: 6000 #建立连接后，服务器读取到可用资源的时间
~~~

在不使用feign的情况下，使用RestTemplate访问不会出超时报错问题。



> 监控FeignClient

~~~yaml
logging:
  level:
    #feign也可以只配置部分路径，表示监控该路径下的所有服务绑定接口 日志以什么样的级别监控该接口
    com.study.feign.MyClientFeign: debug
~~~



~~~java
@Configuration
public class ConfigBean {
    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }
}
//Logger.Level 对象告诉 OpenFeign 记录哪些日志内容。
~~~

 Logger.Level 的具体级别如下：

- NONE：不记录任何信息。
- BASIC：仅记录请求方法、URL 以及响应状态码和执行时间。
- HEADERS：除了记录 BASIC 级别的信息外，还会记录请求和响应的头信息。
- FULL：记录所有请求与响应的明细，包括头信息、请求体、元数据等等。

![image-20220706145849851](http://47.101.155.205/image-20220706145849851.png)



## 10.Hystrix

Hystrix的git：https://github.com/Netflix/Hystrix/wiki

**服务雪崩**
多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B 和微服务C又调用其他的微服务，这就是所谓的“扇出”、如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所的“雪崩效应”。
对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒中内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障，这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。

### 10.1.What is Hystrix

在分布式环境中，许多服务依赖项中的一些将不可避免地失败。Hystrix 是一个库，通过添加延迟容错和容错逻辑，帮助您控制这些分布式服务之间的交互。Hystrix 通过隔离服务之间的访问点、阻止服务之间的级联故障以及提供回退选项来实现此目的，所有这些都可以提高系统的整体弹性。

Hystrix是一个用于处理分布式系统的延迟和容错的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时，异常等，Hystrix能够保证在一个依赖出问题的情况下，不会导致整体服务失败，避免级联故障。以提高分布式系统的弹性。“断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝），向调用方返回一个服务预期的，可处理的备选响应（FallBack），而不是长时间的等待或者抛出调用方法无法处理的异常，这样就可以保证了服务调用方的线程不会被长时间，不必要的占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。



**History of Hystrix**

Hystrix是从Netflix API团队于2011年开始的弹性工程工作演变而来的。2012年，Hystrix继续发展和成熟，Netflix内部的许多团队都采用了它。如今，Netflix 每天通过 Hystrix 执行数百亿个线程隔离和数千亿个信号量隔离调用。这导致正常运行时间和弹性的显着改善。



**What Is Hystrix For?**

- Give protection from and control over latency and failure from dependencies accessed (typically over the network) via third-party client libraries.
- Stop cascading failures in a complex distributed system.
- Fail fast and rapidly recover.
- Fallback and gracefully degrade when possible.
- Enable near real-time monitoring, alerting, and operational control.



- 保护并控制通过第三方客户端库访问（通常通过网络）的依赖项的延迟和故障。
- 阻止复杂分布式系统中的级联故障。
- 快速失败并快速恢复。
- 尽可能回退并优雅降级。
- 实现近乎实时的监控、警报和操作控制。



1. 服务熔断
2. 服务降级
3. 服务限流
4. 服务监控





### 10.2.服务熔断

熔断机制是对应雪崩效应的一种微服务链路保护机制。

当扇出链路的某个**微服务不可用**或者**响应时间太长**时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。当检测到该节点微服务调用响应正常后恢复调用链路。在SpringCloud框架里熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，当失败的调用到一定阈值，缺省是5秒内20次调用失败就会启动熔断机制。熔断机制的注解是@HystrixCommand。

~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-hystrix -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-hystrix</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
~~~



> 服务生产者启用服务熔断

1. 服务提供者上面添加熔断机制
2. 需要添加熔断机制的服务请求上面添加@HystrixCommand注解，注解里面的值对应fallbackMethod的方法名
3. 开启熔断机制功能@EnableCircuitBreaker功能

出现异常的情况下就能处理这个方法了。



> Hystrix 实现熔断机制

在 Spring Cloud 中，熔断机制是通过 Hystrix 实现的。Hystrix 会监控微服务间调用的状况，当失败调用到一定比例时（例如 5 秒内失败 20 次），就会启动熔断机制。

Hystrix 实现服务熔断的步骤如下：

1. 当服务的调用出错率达到或超过 Hystix 规定的比率（默认为 50%）后，熔断器进入熔断开启状态。
2. 熔断器进入熔断开启状态后，Hystrix 会启动一个休眠时间窗，在这个时间窗内，该服务的降级逻辑会临时充当业务主逻辑，而原来的业务主逻辑不可用。
3. 当有请求再次调用该服务时，会直接调用降级逻辑快速地返回失败响应，以避免系统雪崩。
4. 当休眠时间窗到期后，Hystrix 会进入半熔断转态，允许部分请求对服务原来的主业务逻辑进行调用，并监控其调用成功率。
5. 如果调用成功率达到预期，则说明服务已恢复正常，Hystrix 进入熔断关闭状态，服务原来的主业务逻辑恢复；否则 Hystrix 重新进入熔断开启状态，休眠时间窗口重新计时，继续重复第 2 到第 5 步。



~~~java
@HystrixCommand(fallbackMethod = "deptCircuitBreaker_fallback", commandProperties = {
	//以下参数在 HystrixCommandProperties 类中有默认配置
    @HystrixProperty(name = "circuitBreaker.enabled", value = "true"), //是否开启熔断器
    @HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds",value = "1000"), //统计时间窗
    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"), //统计时间窗内请求次数
    @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"), //休眠时间窗口期
    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60"), //在统计时间窗口期以内，请求失败率达到 60% 时进入熔断状态
})
~~~



| 参数                                     | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| metrics.rollingStats.timeInMilliseconds  | 统计时间窗。                                                 |
| circuitBreaker.sleepWindowInMilliseconds | 休眠时间窗，熔断开启状态持续一段时间后，熔断器会自动进入半熔断状态，这段时间就被称为休眠窗口期。 |
| circuitBreaker.requestVolumeThreshold    | 请求总数阀值。  在统计时间窗内，请求总数必须到达一定的数量级，Hystrix 才可能会将熔断器打开进入熔断开启转态，而这个请求数量级就是 请求总数阀值。Hystrix 请求总数阈值默认为 20，这就意味着在统计时间窗内，如果服务调用次数不足 20 次，即使所有的请求都调用出错，熔断器也不会打开。 |
| circuitBreaker.errorThresholdPercentage  | 错误百分比阈值。  当请求总数在统计时间窗内超过了请求总数阀值，且请求调用出错率超过一定的比例，熔断器才会打开进入熔断开启转态，而这个比例就是错误百分比阈值。错误百分比阈值设置为 50，就表示错误百分比为 50%，如果服务发生了 30 次调用，其中有 15 次发生了错误，即超过了 50% 的错误百分比，这时候将熔断器就会打开。 |


~~~yaml
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 3000
    ####################配置具体方法超时时间 为 4 秒########################
    DeptHystrixService#deptInfo_Timeout(Integer):
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 3000
~~~

~~~properties
hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds=time
#为所有的请求方法设置超时时间，time单位为毫秒
hystrix.command.interface#method(parameter).execution.isolation.thread.timeoutInMilliseconds=time
#interfaceFeign接口的名称
#method服务方法名
#parameter方法的参数类型
~~~


>全局服务熔断

~~~java
@RestController
@DefaultProperties(defaultFallback = "defaultFallback")//给所有的请求配置服务出错默认的方法
public class UserConsumerController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @Autowired
    MyClientFeign myClientFeign;
    
    @HystrixCommand
    @RequestMapping("/consumer/user/{id}")
    public User get(@PathVariable("id")int id){
        return myClientFeign.queryById(id);

    }
    @HystrixCommand
    @RequestMapping("/consumer/user/all")
    public List<User> all(){
        return myClientFeign.queryAll();
    }

    @HystrixCommand(fallbackMethod = "timeoutHandler")
    @RequestMapping("/consumer/timeout/{id}")
    public String timeout(@PathVariable("id")int id){
        return myClientFeign.timeout(id);
    }

    public String timeoutHandler(@PathVariable("id")int id){
        System.out.println("超时，服务已被降级");
        return "服务器连接超时";
    }

    public String defaultFallback(){
        return "服务器繁忙";
    }
}
~~~

回调方法的返回值必须要和请求方法的返回值类型一致，并且这个是服务出错，或者服务长时间没有连接才会出现。


### 10.3.服务降级

服务降级是当服务器压力剧增的情况下，根据当前业务情况及流量对一些服务和页面有策略的降级，以此释放服务器资源以保证核心任务的正常运行。

服务降级是指当服务器压力剧增的情况下，根据实际业务情况及流量，对一些服务和页面有策略的不处理，或换种简单的方式处理，从而释放服务器资源以保证核心业务正常运作或高效运作。说白了，就是尽可能的把系统资源让给优先级高的服务。

资源有限，而请求是无限的。如果在并发高峰期，不做服务降级处理，一方面肯定会影响整体服务的性能，严重的话可能会导致宕机某些重要的服务不可用。所以，一般在高峰期，为了保证核心功能服务的可用性，都要对某些服务降级处理。比如淘宝双11活动，关闭订单退款，以及历史订单查询。

服务降级主要用于什么场景呢?当整个微服务架构整体的负载超出了预设的上限阈值或即将到来的流星预计将会超过预设的阈值时，为了保证重要或基本的服务能正常运行，可以将一些不重要或不紧急的服务或任务进行服务的延迟使用或暂停使用。

降级的方式可以根据业务来，可以延迟服务，比如延迟给用户增加积分，只是放到一个缓存中，等服务平稳之后再执行;或者在粒度范围内关闭服务，比如关闭相关文章的推荐。



服务降级的使用场景有以下2种：

- 在服务器压力剧增时，根据实际业务情况及流量，对一些不重要、不紧急的服务进行有策略地不处理或简单处理，从而释放服务器资源以保证核心服务正常运作。
- 当某些服务不可用时，为了避免长时间等待造成服务卡顿或雪崩效应，而主动执行备用的降级逻辑立刻返回一个友好的提示，以保障主体业务不受影响。



**服务降级考虑的问题**

- 哪些服务是核心服务，哪些服务是非核心服务
- 哪些服务可以支持降级，哪些服务不能支持降级，降级策略是什么
- 除服务降级之外是否存在更复杂的业务放通场景，策略是什么?



**自动降级分类**

- 超时降级:主要配置好超时时间和超时重试次数和机制，并使用异步机制探测回复情况
- 失败次数降级︰主要是一些不稳定的api，当失败调用次数达到一定阀值自动降级，同样要使用异步机制探测回复情况
- 故障降级:比如要调用的远程服务挂掉了(网络故障、DNS故障、htp服务返回错误的状态码、rpc服务抛出异常)，则可以直接降级。降级后的处理方案有:默认值（比如库存服务挂了，返回默认现货)、兜底数据(比如广告挂了，返回提前准备好的一些静态页面)、缓存(之前暂存的一些缓存数据)
- 限流降级:秒杀或者抢购一些限购商品时，此时可能会因为访问量太大而导致系统崩溃，此时会使用限流来进行限制访问星，当达到限流阀值，后续请求会被降级;降级后的处理方案可以是:排队页面(将用户导流到排队页面等一会重试)、无货(直接告知用户没货了)、错误页(如活动太火爆了，稍后重试)。



服务降级结合Feign使用，添加一个FallbackFactory类型的实例，注入到@FeignClient的注解fallbackFactory属性中去，如果出现服务关闭的情况，就会调用FallbackFactory类型对象返回的Feign接口实现类的方法。




### 10.4、服务熔断和服务降级的区别

- 服务熔断

服务熔断发生在服务请求超时，服务出现异常等情况，处理的点是在服务提供者这里，服务熔断的配置也是在服务提供者这里配置。



- 服务降级

服务降级需要结合feign使用，feign的使用就是接口加注解，服务降级需要给feign配置一个fallbackFactory指向一个class，用来确定服务降级返回的具体情况。



- 服务限流

限制并发的请求访问量，超过阈值则拒绝



###10.5.Dashboard

访问监控页面`http:localhost:port/hystrix`

~~~xml
<!-- springboot的web容器器 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-hystrix-dashboard</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>

~~~

![image-20220507220944405](http://47.101.155.205/image-20220507220944405.png)



实心圆：共有两种含义，他通过颜色的变化代表了实例的健康程度

健康程度：绿色>黄色>橙色>红色

该实心圆除了颜色的变化之外，它的大小也会根据实例的请求流量发生变化，流量越大，该实心圆就越大，所以通过该实心圆的展示，就可以在大量的实例中快速发现故障实例和高压力实例。

访问没有添加服务熔断的请求不会增加请求的次数

**被监控的服务配置**

~~~java
package com.study;

import com.netflix.hystrix.contrib.metrics.eventstream.HystrixMetricsStreamServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
@EnableCircuitBreaker
public class ProviderUserHystrix_8081 {
    public static void main(String[] args) {
        SpringApplication.run(ProviderUserHystrix_8081.class,args);
    }
    @Bean
    public ServletRegistrationBean registrationBean(){
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(new HystrixMetricsStreamServlet());
        registrationBean.addUrlMappings("/actuator/hystrix.stream");
        return registrationBean;
    }
}
//给服务注册一个监控
~~~





## 11.网关



### 1.zuul

zuul官网：https://github.com/Netflix/zuul/wiki

**什么是zuul？**

Zuul是设备和网站向Netflix流媒体应用程序后端发出的所有请求的前门。作为边缘服务应用程序，Zuul旨在实现动态路由、监控、弹性和安全性。它还能够根据需要将请求路由到多个 Amazon Auto Scaling 组。



why did we build zuul

Netflix API 流量的数量和多样性有时会导致生产问题迅速出现，而不会发出警告。我们需要一个系统，使我们能够快速改变行为，以便对这些情况做出反应。

Zuul 使用一系列不同类型的过滤器，使我们能够快速、灵活地将功能应用于边缘服务。这些过滤器帮助我们执行以下功能：

- 身份验证和安全性 - 确定每个资源的身份验证要求并拒绝不满足这些要求的请求
- 洞察和监控 - 在边缘跟踪有意义的数据和统计数据，以便为我们提供准确的生产视图。
- 动态路由 - 根据需要将请求动态路由到不同的后端群集。
- 压力测试 - 逐渐增加群集的流量，以衡量性能。
- 负载削减 - 为每种类型的请求分配容量，并丢弃超出限制的请求。
- 静态响应处理 - 直接在边缘构建一些响应，而不是将它们转发到内部集群
- 多区域弹性 - 跨 AWS 区域路由请求，以使我们的 ELB 使用多样化，并使我们的优势更接近我们的成员



- Zull包含了对请求的路由(用来**跳转**的)和**过滤**两个最主要功能:

其中路由功能负责将外部请求转发到具体的微服务实例上，是实现外部访问统一入口的基础，而过滤器功能则负责对请求的处理过程进行干预，是实现请求校验，服务聚合等功能的基础。Zuul和Eureka进行整合，将Zuul自身注册为Eureka服务治理下的应用，同时从Eureka中获得其他服务的消息，也即以后的访问微服务都是通过Zuul跳转后获得。



Zuul会作为一个服务注册到Eureka-Server中。

~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-zuul -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zuul</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>

~~~



zuul什么都不配置的情况下访问

http://localhost:8888/provider-user/user/id/1

通过zuul的http://域名:port/zuul服务的服务名/服务的路径

http://localhost:8888/demo/foo/provider/user/1

~~~yaml
zuul:
  routes:
    zuulprop.serviceId: provider-user
    zuulprop.path: /foo/**
#配置不知道为什么有时候没有生效
zuul:
  routes:
    zuulprop:
     serviceId: provider-user
     path: /foo/**
  prefix: /demo
  ignored-services: "*"
#服务注册进来需要时间
#添加前缀之后，通过服务名字访问也需要添加前缀
~~~



### 2.Gateway

官网：https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/

~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-gateway -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
    <version>3.1.4</version>
</dependency>

~~~





## 12.分布式配置中心



###1SpringCloudConfig

`SpringCloudConfig`分布式配置中心能干嘛?

- 集中式管理配置文件：不同环境，不同配置，动态化的配置更新，分环境部署，比如/dev /test /prod /beta /release。
- 运行期间动态调整配置，不再需要在每个服务部署的机器上编写配置文件，服务会向配置中心统一拉取配置自己的信息。当配置发生变动时，服务不需要重启，即可感知到配置的变化，并应用新的配置。
- 将配置信息以REST接口的形式暴露。



~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-config-server -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
    <version>2.1.1.RELEASE</version>
</dependency>

~~~

{application}映射到客户端的“spring.application.name”;

{profile}映射到客户端上的“spring.profiles.active”（逗号分隔列表）; 和

{label}这是一个服务器端功能，标记“版本”的配置文件集。



#### 1.config-server

连接git配置

~~~yaml
server:
  port: 6610

spring:
  application:
    name: springcloud-config-server
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/orgOycm/spring-cloud-config.git #配置文件仓库
~~~



> maven依赖

~~~xml
<dependency>
	<groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
    <version>2.1.1.RELEASE</version>
</dependency>

~~~



> 注解自动配置连接git

```java
@EnableConfigServer
```



> 配置文件访问规则

| 访问规则                                  | 示例                   |
| ----------------------------------------- | ---------------------- |
| /{application}/{profile}[/{label}]        | /config/dev/master     |
| /{application}-{profile}.{suffix}         | /config-dev.yml        |
| /{label}/{application}-{profile}.{suffix} | /master/config-dev.yml |

{application}配置文件的名称

{profile}配置文件的版本

{label}Git的分支，默认在master分支下

{suffix}配置文件的后缀

可以通过http://ip:6610/config/dev/master访问配置文件。http://localhost:6610/config-client/default/master



#### 2.config-client

本质上config-client就是一个微服务架构中的一个服务，不过这些微服务的配置文件都通过config-server连接Git来管理。

bootstrap.yaml是系统级别的，加载优先级高于application.yaml文件，负责从外部加载配置并解析

连接config-server配置

~~~yaml
spring:
  application:
    name: spring-cloud-config-client
  cloud:
    config:
      name: config-client
      label: master
      uri: http://localhost:6610
~~~



> maven依赖

~~~xml
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-config</artifactId>
    <version>2.1.1.RELEASE</version>
</dependency>
~~~



~~~java
@RestController
public class TestController {
    @Value("${spring.application.name}")
    private String applicationName;
    @Value("${server.port}")
    private String port;


    @GetMapping("/config")
    public String config(){
        return applicationName + "\n" + port;
    }
}

~~~


