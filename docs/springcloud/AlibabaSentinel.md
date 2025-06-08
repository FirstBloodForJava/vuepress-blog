# AlibabaSentinel

## 微服务相关知识

**限流**：控制服务在单位时间内处理请求总数。

**熔断**：当下游服务器突然不可用或不稳定时，服务可以自行切断和下游服务的交互，从而保证自身可用。

**流量效果控制**：控制流量以达到某种效果，如控制每毫秒只放行一个请求以达到匀速处理的效果。常见的流量效果控制有匀速通过(排队)、冷启动。

**服务降级**：临时暂停一些不是那么重要的服务，以释放更多的资源给其它服务使用。常见的服务降级实现有：限流降级、熔断降级、开关降级。

**限流降级**：服务A需要依赖服务B完成一次请求。若为服务B配置限流阈值为200QPS，则当一秒内服务B接收请求数超过200个时，超出的请求就会被服务B拒绝。对于超出阈值的流量除直接拒绝外，还可以采取一些策略以处理更多的请求，及流量效果控制。如使用匀速通过方式处理间隔性的突发流量，避免只在第一秒拒绝多余的请求。

**熔断降级**：服务A需要依赖服务B完成一次请求。如果服务A能感知到服务B的状态，在服务B不行的时候不请求服务B，就能避免服务A受到服务B的影响。以一个周期作为计算范围，如果处理请求的异常比达到一定程度，则不再向服务B发起请求。常见的熔断降级策略有：

- 每秒请求异常超过多少触发熔断。
- 每秒请求异常错误率超过多少触发熔断。
- 每秒请求平均耗时超过多少触发熔断。

**开关降级**：服务A需要依赖服务B完成一次请求。服务B在接收到请求时，先看Redis中的开关，如果未开启，则直接拒绝请求。



## Sentinel概念

**资源**：在Sentinel中，资源是Java程序中的任何内容，只要通过Sentinel API定义的代码，就是资源。

**规则**：围绕资源实时状态设定的规则，可以包括流量控制规则、熔断降级规则，以及系统保护规则。

**资源实时状态**：Sentinel以资源为维度统计的数据，反映了资源的实时状态。这些指标有：每秒请求数、请求平均耗时、每秒异常总数等。



### 熔断降级设计理念

Hystrix通过线程池的方式实现熔断降级。使用不当，会导致程序创建过多线程资源。

Hystrix熔断实现介绍：https://github.com/Netflix/Hystrix/wiki/How-it-Works

Hystrix熔断使用介绍：https://github.com/Netflix/Hystrix/wiki/How-To-Use

Sentinel堆熔断降级采取了两种手段：

- 通过并发线程数进行限制：Sentinel通过限制资源的并发线程数量，来减少不稳定资源对其它资源的影响。当响应时间变长，对资源直接的影响就是线程数量的逐步堆积。当在特定资源的线程数达到一定数量之后，对该资源的新请求就会被拒绝。堆积的线程处理完成后才开始继续接收请求。
- 通过响应时间对资源进行降级：当依赖的资源出现响应时间过长后，所有对该资源的访问都被拒绝，直到达到指定的时间窗口之后才重新恢复。



### Sentinel工作原理

Sentinel工作机制如下：

- 对主流框架提供适配或者显示的 API，来定义需要保护的资源，并提供设施对资源进行**实时统计和调用链路分析**。
- 根据预设的规则，结合对资源的实时统计信息，对流量进行控制。同时，Sentinel 提供开放的接口，方便您定义及改变规则。
- Sentinel提供实时的监控系统，方便快速了解目前系统的状态。

在`Sentinel`里面，所有的资源都对应一个资源名称以及一个`Entry`。`Entry`可以通过对主流框架的适配自动创建，也可以通过注解的方式或调用API显式创建；每一个`Entry`创建的时候，同时也会创建一系列功能插槽`slot chain`。这些插槽有不同的职责，例如：

- `NodeSelectorSlot`：负责收集资源的路径，并将这些资源的调用路径，以树状结构存储起来，用于根据调用路径来限流降级；
- `ClusterBuilderSlot`：负则用于存储资源的统计信息以及调用者信息，例如该资源的`RT`, `QPS`, `thread count`等等，这些信息将用作为多维度限流，降级的依据；
- `StatisticSlot`：则用于记录、统计不同纬度的`runtime`指标监控信息；
- `FlowSlot`：则用于根据预设的限流规则以及前面`slot`统计的状态，来进行流量控制；
- `AuthoritySlot`：则根据配置的黑白名单和调用来源信息，来做黑白名单控制；
- `DegradeSlot`：则通过统计信息以及预设的规则，来做熔断降级；
- `SystemSlot`：则通过系统的状态，例如`load1`等，来控制总的入口流量；

![image-20250607181010962](http://47.101.155.205/image-20250607181010962.png)



#### SPI

SPI(Service Provider Interface服务提供者接口)是一种服务发现机制，是Java的一个内置标准，可以通过配置实现功能的切换。

SPI的本质是将接口实现类的全限定名称配置在文件中，由服务加载器读取配置文件，加载实现类并创建实例。使用SPI机制能实现运行时从配置文件中读取接口的实现类并创建实例。

![SPI机制](http://47.101.155.205/image-20250608154124314.png)



![SPI构建插槽链构建器](http://47.101.155.205/image-20250608154507690.png)



**可以通过META-INF/services文件配置SlotChainBuilder，ProcessorSlots从而实现自定义控制插槽执行顺序。**



### 服务治理

微服务治理：https://opensergo.io/zh-cn/

流量防护与容错：https://github.com/opensergo/opensergo-specification/blob/main/specification/zh-Hans/fault-tolerance.md



## 快速使用

更多使用demo：https://github.com/alibaba/Sentinel/tree/master/sentinel-demo

**添加核心依赖：**

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
    <version>1.8.6</version>
</dependency>

<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-transport-simple-http</artifactId>
    <version>1.8.6</version>
</dependency>

~~~

**启动应用添加JVM参数-Dcsp.sentinel.dashboard.server=ip:port**，指定控制的ip+端口

**启动日志在${user_home}/logs/csp/目录下，Windows通常是C:\Users\oycm\用户**

~~~java
public class SentinelMain {

    public static void main(String[] args) {
        // 配置规则.
        initFlowRules();

        while (true) {

            try (Entry entry = SphU.entry("HelloWorld")) {
                // 被保护的逻辑
                System.out.println("hello world");
            } catch (BlockException ex) {
                // 处理被流控的逻辑
                //System.out.println("blocked!");
            }
        }
    }

    private static void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();
        FlowRule rule = new FlowRule();
        rule.setResource("HelloWorld");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        // 限制资源每秒执行20次
        rule.setCount(1);
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }

}

~~~



## Sentinel控制台

下载控制台地址：https://github.com/alibaba/Sentinel/releases

![image-20250607191655257](http://47.101.155.205/image-20250607191655257.png)





### 持久化指标

实现`MetricsRepository`接口，将`Sentinel Dashboard`自动注册的`InMemoryMetricsRepository`改为自定义的资源指标存储器。





## 使用文档

Sentinel可以简单的分为`Sentinel 核心库`和`Dashboard`。核心库不依赖Dashboard，但是结合Dashboard可以取得最好的效果。

### 基本使用

使用Sentinel，需要先定义需要保护的资源，再定义配置规则。

#### 资源

定义资源的方式：

1. 抛出异常的方式定义资源：
2. 返回布尔值方式定义资源
3. 注解方式定义资源：https://github.com/alibaba/Sentinel/tree/master/sentinel-demo/sentinel-demo-annotation-spring-aop
4. 异步调用支持：https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/AsyncEntryDemo.java



::: tabs

@tab 1.抛出异常的方式定义

**注意1**：`SphU.entry(xxx)`需要与`entry.exit()`方法成对出现，匹配调用，否则会导致调用链记录异常，抛出 `ErrorEntryFreeException`异常。

**注意2**：由于`try-with-resources`语法中`catch`调用顺序的问题(**可能是资源关闭在catch之前**)，会导致无法正确统计异常数，因此统计异常信息时也不能在`try-with-resources`的`catch`块中调用`Tracer.trace(ex)`。

~~~java
// try-with-resources 特性
try (Entry entry = SphU.entry("resourceName")) {
  // 被保护的业务逻辑
  // do something here...
} catch (BlockException ex) {
    // 限流之后会抛出 BlockException
  	// 资源访问阻止，被限流或被降级
  	// 在此处进行相应的处理操作
}

~~~





@tab 2.返回布尔值方式

~~~java
if (SphO.entry("自定义资源名")) {
    // 务必保证finally会被执行
    try {
      /**
      * 被保护的业务逻辑
      */
    } finally {
        SphO.exit();
    }
} else {
    // 资源访问阻止，被限流或被降级
    // 进行相应的处理操作
}

~~~





@tab 3.注解方式定义

添加依赖：

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-annotation-aspectj</artifactId>
    <version>version</version>
</dependency>

~~~

~~~java
// blockHandler 和 fallback 配置限流后的处理
@SentinelResource(blockHandler = "blockHandlerForGetUser")
public User getUserById(String id) {
    throw new RuntimeException("getUserById command failed");
}
// 原方法调用被 限流/降级/系统保护 的时候调用
public User blockHandlerForGetUser(String id, BlockException ex) {
    return new User("admin");
}

~~~



@SentinelResource属性介绍：

- `value`：资源名称，必需项（不能为空）。
- `entryType`：entry类型，可选项（默认为 `EntryType.OUT`）。
- `blockHandler` / `blockHandlerClass`: `blockHandler`对应处理`BlockException`的方法名称，可选项。`blockHandler`方法访问范围需要是`public`，返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外的参数，类型为`BlockException`。`blockHandler`方法默认需要和原方法在同一个类中。若希望使用其他类的方法，则可以指定 `blockHandlerClass` 为对应的类的 `Class` 对象，注意对应的方法必需为`static`方法，否则无法解析。
- `fallback`：fallback方法名称，可选项，用于在抛出异常的时候提供`fallback`处理逻辑。`fallback`方法可以针对所有类型的异常（除了`exceptionsToIgnore`里面排除掉的异常类型）进行处理。`fallback`方法签名和位置要求：
    - 返回值类型必须与原方法返回值类型一致；
    - 方法参数列表需要和原方法一致，或者可以额外多一个 `Throwable` 类型的参数用于接收对应的异常。
    - `fallback`方法默认需要和原方法在同一个类中。若希望使用其他类的方法，则可以指定 `fallbackClass`为对应的类的`Class`对象，注意对应的方法必需为`static`方法，否则无法解析。
- `defaultFallback`(since 1.6.0)：默认的`fallback`方法名称，可选项，通常用于通用的`fallback`逻辑（即可以用于很多服务或方法）。若同时配置了`fallback`和`defaultFallback`，则只有`fallback`会生效。`defaultFallback方法签名要求：
  - 返回值类型必须与原方法返回值类型一致；
  - 方法参数列表需要为空，或者可以额外多一个 `Throwable` 类型的参数用于接收对应的异常。
  - `defaultFallback`方法默认需要和原方法在同一个类中。若希望使用其他类的方法，则可以指定 `fallbackClass`为对应的类的`Class`对象，注意对应的方法必需为`static`方法，否则无法解析。
- `exceptionsToIgnore`(since 1.6.0)：用于指定哪些异常被排除掉，不会计入异常统计中，也不会进入 `fallback`逻辑中，而是会原样抛出。



**注意**：若`blockHandler`和`fallback`都进行了配置，则被限流降级而抛出`BlockException`时只会进入 `blockHandler`处理逻辑。若未配置`blockHandler`、`fallback`和`defaultFallback`，则被限流降级时会将 `BlockException`**直接抛出**。



**AspectJ AOP代理使用方式：在 `aop.xml` 文件中引入对应的 Aspect**

~~~xml
<aspects>
    <aspect name="com.alibaba.csp.sentinel.annotation.aspectj.SentinelResourceAspect"/>
</aspects>

~~~

**Spring AOP处理方式：注册SentinelResourceAspect Bean**

~~~java
@Configuration
public class SentinelAspectConfiguration {

    @Bean
    public SentinelResourceAspect sentinelResourceAspect() {
        return new SentinelResourceAspect();
    }
}

~~~





@tab 4.异步调用支持

~~~java
try {
    AsyncEntry entry = SphU.asyncEntry(resourceName);

    // 异步调用.
    doAsync(userId, result -> {
        try {
            // 在此处处理异步调用的结果
        } finally {
            //异步的回调函数中调用 exit
            entry.exit();
        }
    });
} catch (BlockException ex) {
    // Request blocked.
    // Handle the exception (e.g. retry or fallback).
}

~~~



:::









#### 规则

规则的种类：

1. 流量控制规则(`FlowRule`)：
2. 熔断降级规则`DegradeRule`：https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/degrade/SlowRatioCircuitBreakerDemo.java
3. 系统保护规则(`SystemRule`)：https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/system/SystemGuardDemo.java
4. 来源访问控制规则(`AuthorityRule`)：https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/authority/AuthorityDemo.java
5. 热点参数规则(`ParamFlowRule`)：https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-parameter-flow-control/src/main/java/com/alibaba/csp/sentinel/demo/flow/param/ParamFlowQpsDemo.java



::: tabs

@tab 1.流量控制规则(`FlowRule`)

|      Field      | 说明                                                         | 默认值                        |
| :-------------: | :----------------------------------------------------------- | :---------------------------- |
|    resource     | 资源名，资源名是限流规则的作用对象                           |                               |
|      count      | 限流阈值                                                     |                               |
|      grade      | 限流阈值类型，QPS或线程数模式                                | QPS模式                       |
|    limitApp     | 流控针对的调用来源                                           | `default`，代表不区分调用来源 |
|    strategy     | 调用关系限流策略：直接、链路、关联                           | 根据资源本身（直接）          |
| controlBehavior | 流控效果（直接拒绝 / 排队等待 / 慢启动模式），不支持按调用关系限流 | 直接拒绝                      |

~~~java
private static void initFlowQpsRule() {
    List<FlowRule> rules = new ArrayList<>();
    FlowRule rule1 = new FlowRule();
    rule1.setResource(resource);
    rule1.setCount(20);
    rule1.setGrade(RuleConstant.FLOW_GRADE_QPS);
    rule1.setLimitApp("default");
    rules.add(rule1);
    // 配置规则生效
    FlowRuleManager.loadRules(rules);
}

~~~



@tab 2.熔断降级规则(`DegradeRule`)

同一个资源可以同时有多个降级规则。

|       Field        | 说明                                                         | 默认值     |
| :----------------: | :----------------------------------------------------------- | :--------- |
|      resource      | 资源名，即规则的作用对象                                     |            |
|       grade        | 熔断策略，支持慢调用比例/异常比例/异常数策略                 | 慢调用比例 |
|       count        | 慢调用比例模式下为慢调用临界 RT（超出该值计为慢调用）；异常比例/异常数模式下为对应的阈值 |            |
|     timeWindow     | 熔断时长，单位为 s                                           |            |
|  minRequestAmount  | 熔断触发的最小请求数，请求数小于该值时即使异常比率超出阈值也不会熔断（1.7.0引入） | 5          |
|   statIntervalMs   | 统计时长（单位为 ms），如 60*1000 代表分钟级（1.8.0引入）    | 1000 ms    |
| slowRatioThreshold | 慢调用比例阈值，仅慢调用比例模式有效（1.8.0引入）            |            |

~~~java
private static void initDegradeRule() {
    List<DegradeRule> rules = new ArrayList<>();
    DegradeRule rule = new DegradeRule(resource);
        .setGrade(CircuitBreakerStrategy.ERROR_RATIO.getType());
        .setCount(0.7); // Threshold is 70% error ratio
        .setMinRequestAmount(100)
        .setStatIntervalMs(30000) // 30s
        .setTimeWindow(10);
    rules.add(rule);
    DegradeRuleManager.loadRules(rules);
}

~~~





@tab 3.系统保护规则(`SystemRule`)

Sentinel系统自适应限流从整体维度对应用入口流量进行控制，结合应用的Load、CPU 使用率、总体平均RT、入口QPS和并发线程数等几个维度的监控指标，通过自适应的流控策略，让系统的入口流量和系统的负载达到一个平衡，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。

|       Field       | 说明                                   | 默认值      |
| :---------------: | :------------------------------------- | :---------- |
| highestSystemLoad | `load1` 触发值，用于触发自适应控制阶段 | -1 (不生效) |
|       avgRt       | 所有入口流量的平均响应时间             | -1 (不生效) |
|     maxThread     | 入口流量的最大并发数                   | -1 (不生效) |
|        qps        | 所有入口资源的 QPS                     | -1 (不生效) |
|  highestCpuUsage  | 当前系统的 CPU 使用率（0.0-1.0）       | -1 (不生效) |

~~~java
private void initSystemProtectionRule() {
  List<SystemRule> rules = new ArrayList<>();
  SystemRule rule = new SystemRule();
  rule.setHighestSystemLoad(10);
  rules.add(rule);
  SystemRuleManager.loadRules(rules);
}

~~~



@tab 4.访问控制规则

Sentinel的访问控制（黑白名单）的功能。黑白名单根据资源的请求来源()`origin`)限制资源是否通过，若配置白名单则只有请求来源位于白名单内时才可通过；若配置黑名单则请求来源位于黑名单时不通过，其余的请求通过。

**调用方信息通过`ContextUtil.enter(resourceName, origin)`方法中的origin参数传入。**

`AuthorityRule`配置项：

- `resource`：资源名，即限流规则的作用对象；
- `limitApp`：对应的黑名单/白名单来源 , 分隔，如 appA,appB
- `strategy`：限制模式，`AUTHORITY_WHITE`为白名单模式，`AUTHORITY_BLACK`为黑名单模式，默认为白名单模式。

~~~java
AuthorityRule rule = new AuthorityRule();
rule.setResource("test");
rule.setStrategy(RuleConstant.AUTHORITY_WHITE);
// 来源为 appA 和 appB 的请求才能通过
rule.setLimitApp("appA,appB");
AuthorityRuleManager.loadRules(Collections.singletonList(rule));

~~~





@tab 5.热点规则

**热点参数限流**：热点即经常访问的数据。很多时候我们希望统计某个热点数据中访问频次最高的`Top K`数据，并对其访问进行限制。

|       Field       | 说明                                                         | 默认值   |
| :---------------: | :----------------------------------------------------------- | :------- |
|     resource      | 资源名，必填                                                 |          |
|       count       | 限流阈值，必填                                               |          |
|       grade       | 限流模式                                                     | QPS      |
|   durationInSec   | 统计窗口时间长度（单位为秒），1.6.0 版本开始支持             | 1s       |
|  controlBehavior  | 流控效果（支持快速失败和匀速排队模式），1.6.0 版本开始支持   | 快速失败 |
| maxQueueingTimeMs | 最大排队等待时长（仅在匀速排队模式生效），1.6.0 版本开始支持 | 0ms      |
|     paramIdx      | 热点参数的索引，必填，对应 `SphU.entry(xxx, args)` 中的参数索引位置 |          |
| paramFlowItemList | 参数例外项，可以针对指定的参数值单独设置限流阈值，不受前面 `count` 阈值的限制。**仅支持基本类型和字符串类型** |          |
|    clusterMode    | 是否是集群参数流控规则                                       | `false`  |
|   clusterConfig   | 集群流控相关配置                                             |          |

**ParamFlowRuleManager配置热点参数规则：**

~~~java
ParamFlowRule rule = new ParamFlowRule(resourceName)
    .setParamIdx(0)
    .setCount(5);
// 针对 int 类型的参数 PARAM_B，单独设置限流 QPS 阈值为 10，而不是全局的阈值 5.
ParamFlowItem item = new ParamFlowItem().setObject(String.valueOf(PARAM_B))
    .setClassType(int.class.getName())
    .setCount(10);
rule.setParamFlowItemList(Collections.singletonList(item));

ParamFlowRuleManager.loadRules(Collections.singletonList(rule));

~~~





需要添加依赖：

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-parameter-flow-control</artifactId>
    <version>version</version>
</dependency>

~~~

**通过entry重载方法传入热点参数：**

~~~java
public static Entry entry(String name, EntryType type, int count, Object... args) throws BlockException;

public static Entry entry(Method method, EntryType type, int count, Object... args) throws BlockException;

SphU.entry(resourceName, EntryType.IN, 1, paramA, paramB);

~~~

**若`entry`的时候传入了热点参数，那么`exit`的时候也一定要带上对应的参数：**

~~~java
Entry entry = null;
try {
    entry = SphU.entry(resourceName, EntryType.IN, 1, paramA, paramB);
    // Your logic here.
} catch (BlockException ex) {
    // Handle request rejection.
} finally {
    if (entry != null) {
        entry.exit(1, paramA, paramB);
    }
}

~~~

**注解使用：若注解作用的方法上有参数，则将方法作为参数传入entry**

~~~java
@SentinelResource("myMethod")
public Result doSomething(String uid, int type) {
  // some logic here...
}

~~~



:::



#### 查看规则

添加`transport`模块后，可以通过HTTP API获取已加载的规则：

~~~md
http://localhost:8719/getRules?type=<param>

type=flow 以JSON格式返回现有的限流规则
degrade 返回现有生效的降级规则列表
system 则返回系统保护规则

获取所有热点规则，也可以添加type参数
http://localhost:8719/getParamRules

~~~



### 集群限流配置



### 网关流量控制





## 开源框架适配

https://sentinelguard.io/zh-cn/docs/open-source-framework-integrations.html



## 动态配置规则

Sentinel的理念是**开发者只需要关注资源的定义**，当资源定义成功后可以动态增加各种流控降级规则。

Sentinel 提供两种方式修改规则：

- 通过 API 直接修改 loadRules；
- 通过 `DataSource` 适配不同数据源修改



### DataSource扩展

Sentinel推荐**通过控制台设置规则后将规则推送到统一的规则中心，客户端实现** `ReadableDataSource` **接口端监听规则中心实时获取变更**，流程如下：

![image-20250608172737967](http://47.101.155.205/image-20250608172737967.png)

`DataSource`扩展常见的实现方式有:

- **拉模式**：客户端主动向某个规则管理中心定期轮询拉取规则，这个规则中心可以是RDBMS、文件，甚至是 VCS等。这样做的方式是简单，缺点是无法及时获取变更。支持的数据源：动态文件数据源、Consul、 Eureka。
- **推模式**：规则中心统一推送，客户端通过注册监听器的方式时刻监听变化，比如使用`Nacos`、`Zookeeper`等配置中心。这种方式有更好的实时性和一致性保证。ZooKeeper, Redis, Nacos, Apollo, etcd



- **拉模式扩展**：继承`AutoRefreshDataSource`抽象类，然后实现`readSource()`方法，在该方法里从指定数据源读取字符串格式的配置数据。如[基于文件的数据源](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-dynamic-file-rule/src/main/java/com/alibaba/csp/sentinel/demo/file/rule/FileDataSourceDemo.java)。
- **推模式扩展**：继承`AbstractDataSource`抽象类，在其构造方法中添加监听器，并实现`readSource()`从指定数据源读取字符串格式的配置数据。如[基于Nacos的数据源](https://github.com/alibaba/Sentinel/blob/master/sentinel-extension/sentinel-datasource-nacos/src/main/java/com/alibaba/csp/sentinel/datasource/nacos/NacosDataSource.java)。





#### 拉模式



::: tabs

@tab 文件模式

添加依赖：

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-extension</artifactId>
    <version>version</version>
</dependency>

~~~

`FileRefreshableDataSource`会周期性的读取文件以获取规则，当文件有更新时会及时发现，并将规则更新到内存中。

**注意idea启动修改target目录下的文件。或者调整加载指定位置文件**

~~~java
public class FileDataSourceDemo {

    public static void main(String[] args) throws Exception {
        FileDataSourceDemo demo = new FileDataSourceDemo();
        demo.listenRules();
        
        FlowQpsRunner runner = new FlowQpsRunner();
        runner.simulateTraffic();
        runner.tick();
    }

    private void listenRules() throws Exception {
        ClassLoader classLoader = getClass().getClassLoader();
        // 加载文件配置资源 注意idea启动修改target目录下的文件。或者调整加载指定位置文件
        String flowRulePath = URLDecoder.decode(classLoader.getResource("FlowRule.json").getFile(), "UTF-8");
        FileRefreshableDataSource<List<FlowRule>> flowRuleDataSource = new FileRefreshableDataSource<>(flowRulePath, flowRuleListParser);
        FlowRuleManager.register2Property(flowRuleDataSource.getProperty());

    private Converter<String, List<FlowRule>> flowRuleListParser = source -> JSON.parseObject(source,
            new TypeReference<List<FlowRule>>() {});
}

~~~

**FlowRule.json文件内容：**

~~~json
[
  {
    "resource": "abc",
    "controlBehavior": 0,
    "count": 10.0,
    "grade": 1,
    "limitApp": "default",
    "strategy": 0
  },
  {
    "resource": "abc1",
    "controlBehavior": 0,
    "count": 20.0,
    "grade": 1,
    "limitApp": "default",
    "strategy": 0
  }
]

~~~



:::





#### 推模式

::: tabs

@tab Nacos

https://github.com/alibaba/Sentinel/tree/master/sentinel-demo/sentinel-demo-nacos-datasource

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
    <version>version</version>
</dependency>

~~~

创建`NacosDataSource`并将其注册至对应的`RuleManager`。

~~~java
// remoteAddress 代表 Nacos 服务端的地址
// groupId 和 dataId 对应 Nacos 中相应配置
ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new NacosDataSource<>(remoteAddress, groupId, dataId,
    source -> JSON.parseObject(source, new TypeReference<List<FlowRule>>() {}));
FlowRuleManager.register2Property(flowRuleDataSource.getProperty());

~~~



@tab ZooKeeper

https://github.com/alibaba/Sentinel/tree/master/sentinel-demo/sentinel-demo-zookeeper-datasource

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-zookeeper</artifactId>
    <version>version</version>
</dependency>

~~~

创建`ZookeeperDataSource`并将其注册至对应的`RuleManager`

~~~java
// remoteAddress 代表 ZooKeeper 服务端的地址
// path 对应 ZK 中的数据路径
ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new ZookeeperDataSource<>(remoteAddress, path, source -> JSON.parseObject(source, new TypeReference<List<FlowRule>>() {}));
FlowRuleManager.register2Property(flowRuleDataSource.getProperty());

~~~



@tab Apollo

https://github.com/alibaba/Sentinel/tree/master/sentinel-demo/sentinel-demo-apollo-datasource

~~~xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-apollo</artifactId>
    <version>version</version>
</dependency>

~~~

创建`ApolloDataSource`并将其注册至对应的`RuleManager`

~~~java
// namespaceName 对应 Apollo 的命名空间名称
// ruleKey 对应规则存储的 key
// defaultRules 对应连接不上 Apollo 时的默认规则
ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new ApolloDataSource<>(namespaceName, ruleKey, defaultRules, source -> JSON.parseObject(source, new TypeReference<List<FlowRule>>() {}));
FlowRuleManager.register2Property(flowRuleDataSource.getProperty());

~~~



:::



## 日志说明

`csp.sentinel.log.dir`配置日志目录。



### block日志

无论触发了**限流、熔断降级还是系统保护**，它们的秒级拦截详情日志都在`${user_home}/logs/csp/sentinel-block.log`里。如果没有发生拦截，则该日志不会出现。日志格式如下:

~~~log
2014-06-20 16:35:10|1|sayHello(java.lang.String,long),FlowException,default,origin|61,0
2014-06-20 16:35:11|1|sayHello(java.lang.String,long),FlowException,default,origin|1,0

~~~

日志含义

| index |               例子                | 说明                                                         |
| :---- | :-------------------------------: | :----------------------------------------------------------- |
| 1     |       `2014-06-20 16:35:10`       | 时间戳                                                       |
| 2     |                `1`                | 该秒发生的第一个资源                                         |
| 3     | `sayHello(java.lang.String,long)` | 资源名称                                                     |
| 4     |          `FlowException`          | 拦截的原因,  `FlowException` 代表是被限流规则拦截，`DegradeException` 则表示被降级，`SystemBlockException` 则表示被系统保护拦截 |
| 5     |             `default`             | 生效规则的调用来源（参数限流中代表生效的参数）               |
| 6     |             `origin`              | 被拦截资源的调用者，可以为空                                 |
| 7     |              `61,0`               | 61被拦截的数量，无意义可忽略                                 |



### metrics日志

所有的资源访问都会产生秒级监控日志，日志文件默认为`${user_home}/logs/csp/${app_name}-${pid}-metrics.log`（会随时间滚动）。格式如下：

~~~log
1532415661000|2018-07-24 15:01:01|sayHello(java.lang.String)|12|3|4|2|295|0|0|1

~~~

1. `1532415661000`：时间戳
2. `2018-07-24 15:01:01`：格式化之后的时间戳
3. `sayHello(java.lang.String)`：资源名
4. `12`：表示到来的数量，即此刻通过 Sentinel 规则 check 的数量（passed QPS）
5. `3`：实际该资源被拦截的数量（blocked QPS）
6. `4`：每秒结束的资源个数（完成调用），包括正常结束和异常结束的情况（exit QPS）
7. `2`：异常的数量
8. `295`：资源的平均响应时间（RT）
9. `0`: 该秒占用未来请求的数目（since 1.5.0）
10. `0`: 最大并发数（预留用）
11. `1`: 资源分类（since 1.7.0）

固定的线程池每秒输出日志。

![image-20250608183809296](http://47.101.155.205/image-20250608183809296.png)



### 业务日志

其它的日志在 `${user_home}/logs/csp/sentinel-record.log.xxx` 里。该日志包含规则的推送、接收、处理等记录，排查问题的时候会非常有帮助。





### 集群限流日志

`${log_dir}/sentinel-cluster-client.log`：`Token Client`日志，会记录请求失败的信息。



### SPI扩展机制

1.7.2 版本开始，Sentinel支持Logger扩展机制，可以实现自定义的`Logger SPI`来将`record log`等日志自行处理。`metric/block log`暂不支持定制。