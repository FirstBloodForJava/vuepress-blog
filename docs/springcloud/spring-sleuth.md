

# spring-cloud-sleuth

## sleuth简介

该项目的核心功能迁移到Micrometer tracing：https://micrometer.io/docs/tracing

迁移指南：https://github.com/micrometer-metrics/tracing/wiki/Spring-Cloud-Sleuth-3.1-Migration-Guide

`spring-cloud-starter-sleuth`的版本与`spring-boot`的版本有差异可能导致不能启动。

Spring文档：https://docs.spring.io/spring-cloud-sleuth/docs/2.2.7.RELEASE/reference/html/

最新文档地址：https://docs.spring.io/spring-cloud-sleuth/docs/3.1.10-SNAPSHOT/reference/htmlsingle/



spring-cloud-sleuth借用了[Dapper](https://research.google.com/pubs/pub36356.html)技术。

**Span**：基本工作单元。

**Trace**：形成树状结构的一组Span。

**初始化span称为root span。该Span的ID等于Trace的ID。**

**Annotation**：用于实时记录事件。可以使用[Zipkin](https://zipkin.io/)记录事件。

- **cs**：客户端已发送(Client Sent)。表示span开始。
- **sr**：服务端已接收(Server Received)。服务端收到并开始处理请求，此时间戳减去`cs`时间戳表示网络延迟。
- **ss**：服务端已发送(Server Sent)。服务端请求处理完成。此时间戳减去`sr`时间戳表示服务端处理耗时。
- **cr**：客户端已接收(Client Received)。表示一个`span`的结束。`cr`时间戳减去`cs`时间戳表示调用全部耗时。



![Trace和Span流程](http://47.101.155.205/image-20250416134540189.png)



![Span的父子关系](http://47.101.155.205/image-20250416134635133.png)



## 使用sleuth

使用spring-cloud-dependencies管理依赖

~~~xml
<dependencyManagement> 
      <dependencies>
          <dependency>
              <groupId>org.springframework.cloud</groupId>
              <artifactId>spring-cloud-dependencies</artifactId>
              <version>${release.train.version}</version>
              <type>pom</type>
              <scope>import</scope>
          </dependency>
      </dependencies>
</dependencyManagement>

<dependency> 
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>

~~~



在没有配置日志打印格式应用，会有默认的日志打印格式(SLF4J的Logback实现功能)：

~~~md
2025-04-16 16:43:10.825  INFO [frontServer,8e2fc1735a5fc5e3,2476ec3b6252548c,true] 21196 --- [Undertow task-2] com.oycm.controller.CustomerController   : /getCus

~~~

其中INFO后面的格式是[appname,traceId,spanId,exportable]。

- `appname`：表示记录span的应用名称。
- `traceId`：追踪id
- `spanId`：span的id
- `exportable`：表示日志是否记录到zipkin。





## 使用Zipkin

### Zipkin服务端

官网：https://zipkin.io/pages/quickstart.html

源码地址：https://github.com/openzipkin/zipkin/tree/master

java8下载地址：https://search.maven.org/remote_content?g=io.zipkin.java&a=zipkin-server&v=LATEST&c=exec

最新jar下载地址：https://search.maven.org/remote_content?g=io.zipkin&a=zipkin-server&v=LATEST&c=exec



~~~bash
java -jar zipkin-server-2.12.9-exec.jar

~~~





### Http

~~~xml
<dependencyManagement> 
      <dependencies>
          <dependency>
              <groupId>org.springframework.cloud</groupId>
              <artifactId>spring-cloud-dependencies</artifactId>
              <version>${release.train.version}</version>
              <type>pom</type>
              <scope>import</scope>
          </dependency>
      </dependencies>
</dependencyManagement>

<dependency> 
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>

~~~

默认http配置：

~~~properties
spring.zipkin.baseUrl=http://localhost:9411/
spring.zipkin.enabled=true

~~~



**可以通过自定义`ZipkinAutoConfiguration.REPORTER_BEAN_NAME(Reporter)`、`ZipkinAutoConfiguration.SENDER_BEAN_NAME(Sender)` **覆盖默认的配置。



### RabbitMQ或Kafka

添加依赖：

~~~xml
<dependency> 
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>

<dependency> 
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit</artifactId>
</dependency>

~~~

配置文件调整：

~~~yml
spring.zipkin.sender.type: kafka

~~~



## 采样

![image-20250416202345724](http://47.101.155.205/image-20250416202345724.png)

配置设置采样频率：**配置后的对象创建也无法Debug到**

~~~properties
# 采样的概率
spring.sleuth.sampler.probability=0.01-1
# 每秒的速率
spring.sleuth.sampler.rate=10

# 两者只能同时生效一个

~~~

采样概率使用算法：http://stackoverflow.com/questions/12817946/generate-a-random-bitset-with-n-1s

~~~java
// size 默认100
// cardinality是概率1-100
// rnd new Random()对象
static BitSet randomBitSet(int size, int cardinality, Random rnd) {
    BitSet result = new BitSet(size);
    int[] chosen = new int[cardinality];
    int i;
    for (i = 0; i < cardinality; ++i) {
      chosen[i] = i;
      result.set(i);
    }
    for (; i < size; ++i) {
      int j = rnd.nextInt(i + 1);
      if (j < cardinality) {
        result.clear(chosen[j]);
        result.set(i);
        chosen[j] = i;
      }
    }
    return result;
}

// 方法判断是否采样 counter=AtomicInteger
BitSet.get(mod(counter.getAndIncrement(), 100));

~~~



**Http请求头`X-B3-Flags=1`会强制采样，不管配置**



### 声明式采样


~~~java
@Autowired Tracer tracer;

// 自定义的 Traced 对象
DeclarativeSampler<Traced> sampler = DeclarativeSampler.create(Traced::sampleRate);

// AOP 拦截带有Traced参数的方法
@Around("@annotation(traced)")
public Object traceThing(ProceedingJoinPoint pjp, Traced traced) throws Throwable {
  // 创建采样
  Sampler decideUsingAnnotation = DeclarativeSampler.create(traced).toSampler(traced);
  Tracer tracer = tracer.withSampler(decideUsingAnnotation);

  // This code looks the same as if there was no declarative override
  ScopedSpan span = tracer.startScopedSpan(spanName(pjp));
  try {
    return pjp.proceed();
  } catch (RuntimeException | Error e) {
    span.error(e);
    throw e;
  } finally {
    span.finish();
  }
}

~~~



### 自定义Sampler

通过继承抽象类Sampler重写方法实现自定义采样功能。

~~~java
@Autowired Tracer tracer;
@Autowired Sampler fallback;

Span nextSpan(final Request input) {
  Sampler requestBased = Sampler() {
    @Override public boolean isSampled(long traceId) {
      if (input.url().startsWith("/experimental")) {
        return true;
      } else if (input.url().startsWith("/static")) {
        return false;
      }
      return fallback.isSampled(traceId);
    }
  };
  return tracer.withSampler(requestBased).nextSpan();
}

~~~

