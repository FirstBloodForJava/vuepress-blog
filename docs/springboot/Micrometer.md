# Micrometer

旧官网文档：https://micrometer.io/docs/

新官网文档：https://docs.micrometer.io/micrometer/reference/

和Spring的集成介绍：https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics

Micrometer是一个为基于JVM的应用程序设计的指标监控门面库（类似日志门面库SLF4J），提供了一套统一的 API，使开发者能够轻松集成多种监控系统（如Prometheus、Datadog、InfluxDB等）。它的核心目标是解耦应用代码与具体监控后端，增强灵活性和可维护性。



## 安装

**集成prometheus使用方式：**

~~~gradle
implementation 'io.micrometer:micrometer-registry-prometheus:latest.release'

~~~

~~~xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
  <version>${micrometer.version}</version>
</dependency>

~~~

Micrometer包含一个带有仪表SPI的核心库和一个不向任何地方导出数据的内存实现、一系列包含各种监控系统实现的模块以及一个测试模块。

如果未决定使用监控系统，可以添加`micrometer-core`依赖，并配置`SimpleMeterRegistry`。

~~~xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-core</artifactId>
  <version>${micrometer.version}</version>
</dependency>

~~~



**在没有使用框架的情况下，可以使用Micrometer Bom来管理依赖。**

~~~gradle
implementation platform('io.micrometer:micrometer-bom:1.15.0')
implementation 'io.micrometer:micrometer-registry-prometheus'

~~~

~~~xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-bom</artifactId>
            <version>1.15.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

~~~





## Micrometer抽象介绍

### 支持的监控系统

Micrometer包含一个带有仪表SPI的核心模块、一组包含各种监控系统实现的模块（每个都称为注册表）和一个测试套件。您需要了解监控系统的三个重要特征：

**维度Dimensionality：**系统是否支持使用标签键值对来丰富指标名称。如果系统不是维度的，它就是分层(Hierarchical)的。

- Dimensionality：AppOptics, Atlas, Azure Monitor, Cloudwatch, Datadog, Datadog StatsD, Dynatrace, Elastic, Humio, Influx, KairosDB, New Relic, Prometheus, SignalFx, Sysdig StatsD, Telegraf StatsD, Wavefront
- Hierarchical：Graphite, Ganglia, JMX, Etsy StatsD

**速率聚合Rate Aggregation：**指的是在规定的时间间隔内聚合一组样本。

- Client-side：AppOptics, Atlas, Azure Monitor, Datadog, Dynatrace, Elastic, Graphite, Ganglia, Humio, Influx, JMX, Kairos, New Relic, all StatsD flavors, SignalFx
- Server-side：Prometheus, Wavefront

**发布Publishing：**有些系统在空闲时轮询应用程序以获取指标，另一些系统则定期将指标推送给它们。

- Client pushes：AppOptics, Atlas, Azure Monitor, Datadog, Dynatrace, Elastic, Graphite, Ganglia, Humio, Influx, JMX, Kairos, New Relic, SignalFx, Wavefront
- Server polls：Prometheus, all StatsD flavors



### Meters

Meter是收集关于应用程序的一组度量的接口。

Micrometer支持一组Meter原型，包括`Timer`、`Counter`、`Gauge`、`DistributionSummary`、`LongTaskTimer`、`FunctionCounter`、`FunctionTimer`和`TimeGauge`。不同的度量类型会产生不同数量的时间序列度量。例如，虽然有一个表示Gauge的单一度量，但Timer测量计时事件的计数和所有计时事件的总时间。

记录Meter的测量值应该是一个相对便宜的操作，不应该引发任何异常。如果注册中心支持将指标发布到监视系统，那么这将在单独的线程中完成，并且不应该影响记录指标。

`meter`由其名称(name)和维度(dimension)唯一标识。我们可以互换使用`dimension`和`tag`这两个术语，而Micrometer接口就是`tag`，因为它更短。作为一般规则，应该可以使用名称作为枢轴。维度(dimension)允许对特定的命名度量进行切片，以便向下钻取和推断数据。这意味着，如果只选择了名称，则可以通过使用其他维度向下钻取并推断所显示的值。



### Registry

Micrometer中的Meter是从`MeterRegistry`创建并保存在`MeterRegistry`中的。Registry的创建方式因每种实施而异。

Micrometer包含一个`SimpleMeterRegistry`，它在内存中保存每个仪表的最新值，并且不会将数据导出到任何地方。

创建方式：

~~~java
MeterRegistry registry = new SimpleMeterRegistry();

~~~



#### CompositeMeterRegistry

CompositeMeterRegistry可以添加多个注册表，允许同时将多个指标发布到多个监控系统。

~~~java
// 创建组合注册表，用于统一管理多个子注册表
CompositeMeterRegistry composite = new CompositeMeterRegistry();

// 创建名为counter的计数器，此时调用计数，由于注册表中无子注册表，因此操作不会记录
Counter compositeCounter = composite.counter("counter");
compositeCounter.increment(); 

// composite添加子注册表，此时之前创建的counter自动注册到simple中，初始值为0
SimpleMeterRegistry simple = new SimpleMeterRegistry();
composite.add(simple); 

// 调用计数器生效
compositeCounter.increment();

~~~



#### Global Registry

Micrometer提供了一个名为`Metrics`的静态全局注册表和一组基于此注册表生成仪表的静态构建器。注意，全局注册表是一个复合注册表。

~~~java
class MyComponent {
    // 将Meter实例存储在属性中
    Counter featureCounter = Metrics.counter("feature", "region", "test"); 

    void feature() {
        featureCounter.increment();
    }

    void feature2(String type) {
        // 查找已有的Meter实例
        Metrics.counter("feature.2", "type", type).increment(); 
    }
}

class MyApplication {
    void start() {
        // 将Meter实例添加到注册表
        Metrics.addRegistry(new SimpleMeterRegistry()); 
    }
}

~~~



### Naming Meters

Micrometer采用一种命名约定，用`.`字符分割小写单词。不同的监控系统对命名约定有不同的建议，有些命名约定在系统之间可能不兼容。监控系统的每个Micrometer实现都附带一个命名约定，该约定将小写点表示法名称转换为监控系统推荐的命名约定。此外，这个命名约定实现从`metric names`和`tags`中删除了监视系统不允许的特殊字符。你可以通过实现`NamingConvention`并在注册表中设置它来覆盖注册表的默认命名约定：

~~~java
registry.config().namingConvention(myCustomNamingConvention);

~~~

下面Micrometer中注册的计时器在各个监控系统的的表示如下：

~~~java
registry.timer("http.server.requests");

~~~

1. Prometheus：http_server_requests_duration_seconds
2. Atlas：httpServerRequests
3. Graphite：http.server.requests
4. InfluxDB：http_server_requests



#### Tag Naming

建议对Tag命名时保持和Meter命名一样的约定。

下面表示测量数据库和http的访问次数：

~~~java
registry.counter("database.calls", "db", "users")
registry.counter("http.requests", "uri", "/api/users")

~~~

不推荐的方式：

~~~java
registry.counter("calls",
    "class", "database",
    "db", "users");

registry.counter("calls",
    "class", "http",
    "uri", "/api/users");

~~~

当统计到calls层面时，收集的是数据库和http调用的总数。还需要向下统计才能获取数据库和http的访问次数。



#### Common Tags

可以在注册表级别定义通用标签，并将其添加到报告给监控系统的每个指标中。

~~~java
registry.config().commonTags("stack", "prod", "region", "us-east-1");
// 两者等价
registry.config().commonTags(Arrays.asList(Tag.of("stack", "prod"), Tag.of("region", "us-east-1"))); 

~~~

通常，必须先将常用标记添加到注册表中， 然后再添加meter Binder。

SpringBoot有两种添加方式：

1. 使用配置属性添加：https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#actuator.metrics.customizing.common-tags
2. 注册MeterRegistryCustomizer Bean，通过代码自定义通过标签



#### Tag Values

Tag的值必须是非null的。

注意来自用户提供源的标记值可能会破坏度量的基数。应该始终小心地对用户提供的输入进行规范化并添加边界。考虑用于在服务端点上记录HTTP请求的URI标记。如果我们不将404限制为NOT_FOUND这样的值，则度量的维度将随着无法找到的每个资源而增长。

**基数：**指标下所有唯一标签组合（Tag Set）的数量。例如：一个指标有标签`uri=/api/user`和`status=200`，构成一个唯一的标签组合。如果有100 个不同的uri和5个不同的status，则基数为500。

每个唯一的标签组合都会在监控系统中生成一个新的时间序列（Time Series）。监控系统的存储、查询性能会因基数爆炸急剧下降（如 Prometheus 默认限制单指标基数为10000）。高基数指标可能导致监控系统内存/存储过载，甚至崩溃。

**如果标签值来自用户输入（如 URL 参数、请求头、用户 ID 等），且未做规范化处理，标签值的可能性是无限的。**



### Meter Filters

可以给注册表配置过滤器，更好地控制Meter的注册方式以及发出的统计数据类型。Filter的三个基本功能：

- Deny/Accept正在注册的Meter。
- Transform meter内容，如：修改name、添加或删除tags、修改description或base units。
- 为某些meter类型配置分布统计信息。

编程添加MegerFilter的方式（按顺序应用）：

~~~java
registry.config()
    .meterFilter(MeterFilter.ignoreTags("too.much.information"))
    .meterFilter(MeterFilter.denyNameStartsWith("jvm"));

~~~



#### Deny/Accept MeterFilter

拒绝或接收MeterFilter样例：

~~~java
new MeterFilter() {
    @Override
    public MeterFilterReply accept(Meter.Id id) {
       if(id.getName().contains("test")) {
          return MeterFilterReply.DENY;
       }
       return MeterFilterReply.NEUTRAL;
    }
}

~~~

MeterFilterReply有3个枚举类型：

- DENY：不让这个Meter注册。当尝试在注册表上注册一个Meter，并且过滤器返回DENY时，注册表将返回该Meter的`NOOP version`（例如，`NoopCounter`或`NoopTimer`）。代码可以继续与NOOP Meter交互，但是记录到NOOP Meter的任何内容都将以最小的开销立即丢弃。
- NEUTRAL：如果其它MeterFilter没有返回`DENY`，注册的Meter则正常返回。
- ACCEPT：如果过滤器返回`ACCEPT`，则立即注册Meter，而不询问任何其他过滤器的`accept`方法。



MeterFilter为Deny/Accept提供的静态构造器：

- accept()：接收所有的meter，覆盖后面所有的Filterr。
- accept(Predicate\<Meter.Id\>)：接受匹配的Predicate。
- acceptNameStartsWith(String)：接受匹配前缀的Meter
- deny()：拒绝所有的meter，覆盖后面所有的Filterr。
- denyNameStartsWith(String)：拒绝匹配前缀的Meter
- deny(Predicate\<Meter.Id\>)：拒绝匹配的Predicate。
- maximumAllowableMetrics(int)：注册表达到一定数量，拒绝Meter。
- maximumAllowableTags(String meterNamePrefix, String tagKey, int maximumTagValues, MeterFilter onMaxReached)：对标签数量做限制。
- denyUnless(Predicate\<Meter.Id\>)：拒绝不匹配Predicate的Meter。



过滤链，按照配置的顺序应用过滤器，下面的例子：只匹配http的Meter。

~~~java
registry.config()
    .meterFilter(MeterFilter.acceptNameStartsWith("http"))
    .meterFilter(MeterFilter.deny()); 

~~~



#### Transform

给test开始的meter添加名称前缀，添加附加标签。

~~~java
new MeterFilter() {
    @Override
    public Meter.Id map(Meter.Id id) {
       if(id.getName().startsWith("test")) {
          return id.withName("extra." + id.getName()).withTag("extra.tag", "value");
       }
       return id;
    }
}

~~~

构造器方法：

- commonTags(Iterable\<Tag\>)：为所有Meter添加一组标签。建议添加应用程序名称、host、region(区域)等通用标签。
- ignoreTags(String…)：删除匹配这些key的标签。当一个标签基数过高影响监控系统性能，可以快速删除，待后续更改检测点。
- replaceTagValues(String tagKey, Function\<String, String\> replacement, String… exceptions)：对所有匹配的标签(被排除的除外)，调用替换函数。
- renameTag(String meterNamePrefix, String fromTagKey, String toTagKey)：对匹配前缀的和指定key的标签替换名称。



#### Configure

`Timer`和`DistributionSummary`包含一组可选的分布统计信息（除了基本的count、total和max之外），可以通过过滤器配置这些统计信息。这些分布统计包括预先计算的百分位数(pre-computed percentiles)、SLO和柱状图(histograms)。

~~~java
new MeterFilter() {
    @Override
    public DistributionStatisticConfig configure(Meter.Id id, DistributionStatisticConfig config) {
        if (id.getName().startsWith(prefix)) {
            return DistributionStatisticConfig.builder()
                    .publishPercentiles(0.9, 0.95)
                    .build()
                    .merge(config);
        }
        return config;
    }
};

~~~



构造器方法：

- maxExpected(Duration/long)：控制上限。
- minExpected(Duration/long)：控制下限。