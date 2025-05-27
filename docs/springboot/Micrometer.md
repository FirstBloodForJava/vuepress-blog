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



### Rate Aggregation

在指标发布之前在客户端进行速率聚合，或者在服务端查询时临时聚合。



**客户端聚合的两类系统：**

- 期望速率聚合的数据。考虑到关键的洞察力，对于大多数生产目的，我们应该基于比率而不是绝对值来做出决定。这样的系统得益于不必做更少的数学运算来满足查询。
- 使用相对较少或没有数学操作来通过查询对聚合数据进行评级。对于这些系统，发布预聚合的数据是对构建有意义的唯一方法。

![image-20250520202409514](http://47.101.155.205/image-20250520202409514.png)





### Counters

`Counter`接口允许按固定值递增，这个值必须是正数。



~~~java
// 生成随机数的对象
Random rand = ...; 

MeterRegistry registry = ...;
// 使用注册表创建 Counter
Counter counter = registry.counter("counter"); 

Flux.interval(Duration.ofMillis(10))
        .doOnEach(d -> {
            if (rand.nextDouble() + 0.1 > 0) {
               	// 计数
                counter.increment(); 
            }
        })
        .blockLast();

~~~

Counter接口提供的流式构建器，提供了对`baseUnit`、`description`、`tags`的访问。您可以通过最后调用`register`将计数器注册。

~~~java
Counter counter = Counter
    .builder("counter")
    .baseUnit("beans") // optional
    .description("a description of what this counter does") // optional
    .tags("region", "test") // optional
    .register(registry);

~~~

**spring-boot-starter-actuator桥接Prometheus创建的Counter：**

~~~java
// registry io.micrometer.prometheus.PrometheusMeterRegistry
// tags Iterable io.micrometer.core.instrument.Tag
Counter allocatedBytes = Counter.builder("jvm.gc.memory.allocated").tags(tags)
    .baseUnit(BaseUnits.BYTES)
    .description("Incremented for an increase in the size of the young generation memory pool after one GC to before the next")
    .register(registry);

// 通过allocatedBytes.increment(double) 设置指标值
allocatedBytes.increment(delta);

~~~

![image-20250527144750916](http://47.101.155.205/image-20250527144750916.png)

![image-20250527145211004](http://47.101.155.205/image-20250527145211004.png)

#### @Counted

`@Counted`注解为特定类型的方法，例如，Controller方法或其它方法添加计数支持。



添加`CountedAspect`以支持注解工作：

~~~java
@Configuration
public class CountedConfiguration {
   @Bean
   public CountedAspect countedAspect(MeterRegistry registry) {
      return new CountedAspect(registry);
   }
}

~~~

~~~java
@Service
public class ExampleService {
	
    // @Counted 记录该方法的执行次数
  	@Counted
    public void sync() {
    	// ...
    }

    // @Counted 记录该方法的执行次数
  	@Async
  	@Counted
  	public CompletableFuture<?> async() {
    	return CompletableFuture.supplyAsync(...);
  	}
}

~~~



要注解`@MeterTag`支持方法参数使用，需要配置`CountedAspect`添加`CountedMeterTagAnnotationHandler`。

~~~java
ValueResolver valueResolver = parameter -> "Value from myCustomTagValueResolver [" + parameter + "]";

ValueExpressionResolver valueExpressionResolver = new SpelValueExpressionResolver();

countedAspect.setMeterTagAnnotationHandler(
        new CountedMeterTagAnnotationHandler(aClass -> valueResolver, aClass -> valueExpressionResolver));

~~~

假设该接口使用了以下注解：


~~~java
interface MeterTagClassInterface {

	@Counted
    void getAnnotationForTagValueResolver(@MeterTag(key = "test", resolver = ValueResolver.class) String test);

    @Counted
    void getAnnotationForTagValueExpression(
            @MeterTag(key = "test", expression = "'hello' + ' characters'") String test);

    @Counted
    void getAnnotationForArgumentToString(@MeterTag("test") Long param);

    @Counted
    void getMultipleAnnotationsForTagValueExpression(
            @MeterTag(key = "value1", expression = "'value1: ' + value1") @MeterTag(key = "value2",expression = "'value2: ' + value2") DataHolder param);

}

~~~

当调用`MeterTagClassInterface`接口实现时，**实现的方法需要@Counted注解**。将创建以下计数器：

~~~java
// @MeterTag("test") Long param
service.getAnnotationForArgumentToString(15L);

assertThat(registry.get("method.counted").tag("test", "15").counter().count()).isEqualTo(1);

// @MeterTag(key = "test", resolver = ValueResolver.class) 使用了Value解析器
service.getAnnotationForTagValueResolver("foo");

assertThat(registry.get("method.counted")
    .tag("test", "Value from myCustomTagValueResolver [foo]")
    .counter()
    .count()).isEqualTo(1);

// @MeterTag(key = "test", expression = "'hello' + ' characters'") 使用 ValueExpressionResolver
service.getAnnotationForTagValueExpression("15L");

assertThat(registry.get("method.counted").tag("test", "hello characters").counter().count()).isEqualTo(1);

// @MeterTag(key = "value1", expression = "'value1: ' + value1") @MeterTag(key = "value2",expression = "'value2: ' + value2")
// @MeterTags({ @MeterTag(...), @MeterTag(...) }) 等价
service.getMultipleAnnotationsForTagValueExpression(new DataHolder("zxe", "qwe"));

assertThat(registry.get("method.counted")
    .tag("value1", "value1: zxe")
    .tag("value2", "value2: qwe")
    .counter()
    .count()).isEqualTo(1);

~~~



#### Function-tracking Counters

`Micrometer`还提供了一种不常用的计数器模式，可以跟踪单调增加的函数（保持不变或随时间增加但从不减少的函数）。一些监视系统（如Prometheus）将计数器的累积值推送到后端，但其他监视系统则发布计数器在推送间隔内的增量速率。通过采用此模式，您可以让监视系统的Micrometer实现选择是否对计数器进行评级规范化，并且您的计数器在不同类型的监视系统之间保持可移植性。



~~~java
Cache cache = ...; // suppose we have a Guava cache with stats recording on
// evictionCount一个单调递增的函数，从其生命周期开始，每次缓存驱逐都会递增。
registry.more().counter("evictions", tags, cache, c -> c.stats().evictionCount()); 

~~~



~~~java
MyCounterState state = ...;

FunctionCounter counter = FunctionCounter
    .builder("counter", state, state -> state.count())
    .baseUnit("beans") // optional
    .description("a description of what this counter does") // optional
    .tags("region", "test") // optional
    .register(registry);

~~~



**spring-boot-starter-actuator桥接Prometheus创建的FunctionCounter：**

~~~java
FunctionCounter.builder("jvm.classes.unloaded", classLoadingBean, ClassLoadingMXBean::getUnloadedClassCount)
    .tags(tags)
    .description("The total number of classes unloaded since the Java virtual machine has started execution")
    .baseUnit(BaseUnits.CLASSES)
    .register(registry);

~~~

![image-20250527150251448](http://47.101.155.205/image-20250527150251448.png)

![image-20250527150417965](http://47.101.155.205/image-20250527150417965.png)

### Gauges

仪表是获取当前值的媒介。测量的典型示例是集合或映射的大小，或者处于运行状态的线程数。



~~~java
// 一种更常见的仪表形式是监视一些非数字对象的仪表。最后一个参数建立了一个函数，该函数用于在观察量规时确定量规的值。
List<String> list = registry.gauge("listGauge", Collections.emptyList(), new ArrayList<>(), List::size);
// 
List<String> list2 = registry.gaugeCollectionSize("listSize2", Tags.empty(), new ArrayList<>()); 
Map<String, Integer> map = registry.gaugeMapSize("mapGauge", Tags.empty(), new HashMap<>());

~~~

**spring-boot-starter-actuator桥接Prometheus创建的Gauge：**


~~~java
// registry registry io.micrometer.prometheus.PrometheusMeterRegistry
// tags Iterable io.micrometer.core.instrument.Tag
AtomicLong liveDataSize = new AtomicLong(0L);
// 通过GC回调修改liveDataSize的值
Gauge.builder("jvm.gc.live.data.size", liveDataSize, AtomicLong::get)
	.tags(tags)
    .description("Size of old generation memory pool after a full GC")
    .baseUnit(BaseUnits.BYTES)
    .register(registry);

~~~

![image-20250527145843952](http://47.101.155.205/image-20250527145843952.png)

![image-20250527145928764](http://47.101.155.205/image-20250527145928764.png)



创建`Gauge`时不会获得对`Gauge`的引用。相反，你会得到对正在观察的事物的引用：

~~~java
// 获取gauge的观察的引用
AtomicInteger myGauge = registry.gauge("numberGauge", new AtomicInteger(0));

// 在其他地方，您可以使用对象引用更新它保存的值
myGauge.set(27);
myGauge.set(11);

~~~



**流式构建Gauge：**

~~~java
Gauge gauge = Gauge
    .builder("gauge", myObj, myObj::gaugeValue)
    .description("a description of what this gauge does") // optional
    .tags("region", "test") // optional
    .register(registry);

~~~



**如果Gauge的引用被回收，报告的内容回事NaN或不记录。**



#### TimeGauge



`TimeGauge`是跟踪时间值的专用度量，该值将被缩放到每个注册中心实现所期望的基本时间单位。

**TimeGauge注册到TimeUnit ：**

~~~java
AtomicInteger msTimeGauge = new AtomicInteger(4000);
AtomicInteger usTimeGauge = new AtomicInteger(4000);
TimeGauge.builder("my.gauge", msTimeGauge, TimeUnit.MILLISECONDS, AtomicInteger::get).register(registry);
TimeGauge.builder("my.other.gauge", usTimeGauge, TimeUnit.MICROSECONDS, AtomicInteger::get).register(registry);

~~~

**Prometheus转换的内容：**

~~~md
# HELP my_gauge_seconds
# TYPE my_gauge_seconds gauge
my_gauge_seconds 4.0
# HELP my_other_gauge_seconds
# TYPE my_other_gauge_seconds gauge
my_other_gauge_seconds 0.004
~~~



#### Multi-gauge



~~~java
// SELECT count(*) from job group by status WHERE job = 'dirty'
MultiGauge statuses = MultiGauge.builder("statuses")
    .tag("job", "dirty")
    .description("The number of widgets in various statuses")
    .baseUnit("widgets")
    .register(registry);

...

// run this whenever you re-run your query
statuses.register(
    resultSet.stream()
        .map(result -> Row.of(Tags.of("status", result.getAsString("status")), result.getAsInt("count")))
        .collect(toList()),
    true // whether to overwrite the previous value or only record it once
);

~~~



### Timers

Timer用于测量低延迟，高频率的事件。不支持负值记录。

~~~java
Timer timer = Timer
    .builder("my.timer")
    .description("a description of what this timer does") // optional
    .tags("region", "test") // optional
    .register(registry);

~~~

Timer实现`CumulativeTimer`和`StepTimer`的最大统计值是时间窗口最大值TimeWindowMax。



**spring-boot-starter-actuator桥接Prometheus创建的Timer：**

~~~java
// registry io.micrometer.prometheus.PrometheusMeterRegistry
// 使用record(long amount, TimeUnit unit)直接记录GC赞同时间
// 通过玩GC中注册回调
Timer.builder("jvm.gc.pause")
    .tags("action", gcAction, "cause", gcCause)
    .description("Time spent in GC pause")
    .register(registry)
    .record(duration, TimeUnit.MILLISECONDS);

~~~

![image-20250527143804137](http://47.101.155.205/image-20250527143804137.png)

![image-20250527144047312](http://47.101.155.205/image-20250527144047312.png)

**记录代码块：**

~~~java
timer.record(() -> dontCareAboutReturnValue());
timer.recordCallable(() -> returnValue());

Runnable r = timer.wrap(() -> dontCareAboutReturnValue()); 
Callable c = timer.wrap(() -> returnValue());

~~~

**在Timer.Sample中存储开始状态：**

~~~java
Timer.Sample sample = Timer.start(registry);

// do stuff
Response response = ...

sample.stop(registry.timer("my.timer", "response", response.status()));

~~~



#### @Timed

`micrometer-core`模块的`@Timed`注解可以为方法添加计时支持。

~~~java
@Configuration
public class TimedConfiguration {
   @Bean
   public TimedAspect timedAspect(MeterRegistry registry) {
      return new TimedAspect(registry);
   }
}

~~~

~~~java
@Service
public class ExampleService {

  @Timed
  public void sync() {
    // @Timed 记录方法执行的耗时，正常退出或异常退出
  }

  @Async
  @Timed
  public CompletableFuture<?> async() {
    // @Timed 记录方法执行的耗时，正常返回CompletableFuture或异常结束
    return CompletableFuture.supplyAsync(...);
  }

}

~~~



#### @MeterTag

在方法参数使用`@MeterTag`注解。创建`TimedAspect`的Bean添加`MeterTagAnnotationHandler`。

~~~java
ValueResolver valueResolver = parameter -> "Value from myCustomTagValueResolver [" + parameter + "]";

ValueExpressionResolver valueExpressionResolver = new SpelValueExpressionResolver();

timedAspect.setMeterTagAnnotationHandler(
        new MeterTagAnnotationHandler(aClass -> valueResolver, aClass -> valueExpressionResolver));

~~~

**MeterTagClassInterface接口：**


~~~java
interface MeterTagClassInterface {

    @Timed
    void getAnnotationForTagValueResolver(@MeterTag(key = "test", resolver = ValueResolver.class) String test);

    @Timed
    void getAnnotationForTagValueExpression(
            @MeterTag(key = "test", expression = "'hello' + ' characters'") String test);

    @Timed
    void getAnnotationForArgumentToString(@MeterTag("test") Long param);

    @Timed
    void getMultipleAnnotationsForTagValueExpression(
            @MeterTag(key = "value1", expression = "'value1: ' + value1") @MeterTag(key = "value2",
                    expression = "'value2: ' + value2") DataHolder param);

}

~~~

**MeterTagClassInterface接口测试，实现的方法也要有注解：**

~~~java
service.getAnnotationForArgumentToString(15L);

assertThat(registry.get("method.timed").tag("test", "15").timer().count()).isEqualTo(1);

service.getAnnotationForTagValueResolver("foo");

assertThat(registry.get("method.timed")
    .tag("test", "Value from myCustomTagValueResolver [foo]")
    .timer()
    .count()).isEqualTo(1);

service.getAnnotationForTagValueExpression("15L");

assertThat(registry.get("method.timed").tag("test", "hello characters").timer().count()).isEqualTo(1);

service.getMultipleAnnotationsForTagValueExpression(new DataHolder("zxe", "qwe"));

assertThat(
        registry.get("method.timed").tag("value1", "value1: zxe").tag("value2", "value2: qwe").timer().count())
    .isEqualTo(1);

~~~



#### Function-tracking Timers



~~~java
IMap<?, ?> cache = ...; // suppose we have a Hazelcast cache
registry.more().timer("cache.gets.latency", Tags.of("name", cache.getName()), cache,
    c -> c.getLocalMapStats().getGetOperationCount(), 
    c -> c.getLocalMapStats().getTotalGetLatency(),
    TimeUnit.NANOSECONDS 

~~~



~~~java
IMap<?, ?> cache = ...

FunctionTimer.builder("cache.gets.latency", cache,
        c -> c.getLocalMapStats().getGetOperationCount(),
        c -> c.getLocalMapStats().getTotalGetLatency(),
        TimeUnit.NANOSECONDS)
    .tags("name", cache.getName())
    .description("Cache gets")
    .register(registry);

~~~



#### Pause Detection



**自定义暂停检测器：**

~~~java
registry.config().pauseDetector(new ClockDriftPauseDetector(sleepInterval, pauseThreshold));
registry.config().pauseDetector(new NoPauseDetector());

~~~



#### Memory Footprint Estimation

Timer是消耗内存最多的测量器。

- R：环缓冲区长度。在所有示例中，我们都假定默认值为3。R是用Timer.builder.distributionStatisticBufferLength设置的。
- B：总直方图桶。可以是SLO边界或百分位直方图桶。默认情况下，计时器被限制为最小期望值1ms和最大期望值30秒，在适用的情况下，为百分位数直方图产生66个桶。
- I：暂停补偿的区间估计器。1.7 kb。
- M：Time-decaying max。104字节。
- Fb：固定边界直方图。8b * B * R
- Pp：百分位精度。缺省值是1。一般在[0,3]的范围内。Pp是用Timer.Builder.percentilePrecision设置的。
- Hdr(Pp)：高动态范围直方图。
  - When Pp = 0: 1.9kb * R + 0.8kb
  - When Pp = 1: 3.8kb * R + 1.1kb
  - When Pp = 2: 18.2kb * R + 4.7kb
  - When Pp = 3: 66kb * R + 33kb

![image-20250522212245193](http://47.101.155.205/image-20250522212245193.png)



### Distribution Summaries

分布摘要跟踪事件的分布。它在结构上类似于计时器，但记录的值不代表时间单位。例如，您可以使用分发摘要来度量到达服务器的请求的有效负载大小。

~~~java
DistributionSummary summary = registry.summary("response.size");

~~~

~~~java
DistributionSummary summary = DistributionSummary
    .builder("response.size")
    .description("a description of what this summary does") // optional
    .baseUnit("bytes") // optional 
    .tags("region", "test") // optional
    .scale(100) // optional 
    .register(registry);

~~~

`DistributionSummary`实现（如`CumulativeDistributionSummary`和`StepDistributionSummary`）的最大值是时间窗最大值`TimeWindowMax`。



#### Scaling and Histograms


~~~java
DistributionSummary.builder("my.ratio").scale(100).register(registry)

~~~



~~~java
DistributionSummary.builder("my.ratio")
   .scale(100)
   .serviceLevelObjectives(70, 80, 90)
   .register(registry)

~~~





#### Memory Footprint Estimation

根据选择的选项，分布摘要的总内存占用可能会有很大差异。

- R：环缓冲区长度。在所有示例中，我们都假定默认值为3。R是用DistributionSummary.Builder.distributionStatisticBufferLength设置的。
- B：总直方图桶。它可以是SLO边界或百分位直方图桶。默认情况下，摘要没有最小和最大期望值，所以我们发布所有276个预定的直方图桶。当您打算发布百分位数直方图时，您应该始终使用minimumExpectedValue和maximumExpectedValue来夹紧分布摘要。
- M：Time-decaying max。104字节。
- Fb：固定边界直方图。8b * B * R
- Pp：百分位精度。缺省值是1。取值范围一般为[0,3]。Pp是用DistributionSummary.Builder.percentilePrecision设置的。
- Hdr(Pp)：高动态范围直方图。
  - When Pp = 0: 1.9kb * R + 0.8kb
  - When Pp = 1: 3.8kb * R + 1.1kb
  - When Pp = 2: 18.2kb * R + 4.7kb
  - When Pp = 3: 66kb * R + 33kb

![image-20250522213035762](http://47.101.155.205/image-20250522213035762.png)



### Long Task Timers

长任务`Timer`是一种特殊类型的计时器，记录长时间运行的任务开始时间和持续时间，并同时监控有多少个任务正在运行。

长任务Timer至少发布以下统计信息：

- 活动任务数；
- 活动任务的总持续时间；
- 活动任务最大持续时间。

**Spring使用长任务Timer：**

~~~java
@Timed(value = "aws.scrape", longTask = true)
@Scheduled(fixedDelay = 360000)
void scrapeResources() {
	// ...
}

~~~

**编码使用长任务Timer：**

~~~java
LongTaskTimer scrapeTimer = registry.more().longTaskTimer("scrape");
void scrapeResources() {
    scrapeTimer.record(() => {
        // ...
    });
}

~~~

**长任务计时器的`Fluent`构建器：**

~~~java
LongTaskTimer longTaskTimer = LongTaskTimer
    .builder("long.task.timer")
    .description("a description of what this timer does") // optional
    .tags("region", "test") // optional
    .register(registry);

~~~



**可以对任务运行时间较长的做警告。**



### Histograms and Percentiles

计时器和分布摘要支持收集数据以观察其百分位数分布。查看百分位数有两种主要方法：

- **百分位柱状图(Percentile histograms)：**Micrometer将值累积到底柱状方图中，并将一组预先确定的桶发送到监控系统。监控系统的查询语言负责计算该柱状图的百分位数。目前，只有Prometheus、Atlas和Wavefront分别通过histogram_quantile、:percentile和hs()支持基于直方图的百分位数近似值。如果您的目标是Prometheus、Atlas或Wavefront，则更喜欢这种方法，因为您可以跨维度聚合柱状图（通过将一组维度上的桶的值相加），并从柱状图中获得可聚合的百分位数。
- **客户端百分位数(Client-side percentiles)：**Micrometer计算每个Meter ID（一组名称和标签）的百分位数近似值，并将百分位数值发送到监控系统。这并不像百分位数直方图那样灵活，因为不可能在标签之间汇总百分位数近似值。然而，对于不支持基于直方图的服务器端百分位数计算的监控系统，它提供了对百分位数分布的某种程度的了解。

**使用Timer构建的柱状图：**

~~~java
Timer.builder("my.timer")
    // 用于发布在应用程序中计算的百分位数。这些值在各个维度上是不可聚合的
   .publishPercentiles(0.5, 0.95) // 中位数和第95百分位
    // 
   .publishPercentileHistogram()
    // 用于发布由slo定义的桶的累积直方图。当在支持可聚合百分位数的监视系统上与publishPercentileHistogram一起使用时，此设置将向发布的直方图添加额外的桶。当在不支持可聚合百分位数的系统上使用时，此设置将导致仅使用这些桶发布直方图。
   .serviceLevelObjectives(Duration.ofMillis(100)) 
    // 控制publishPercentileHistogram发送的桶的数量，并控制底层HdrHistogram结构的准确性和内存占用。
   .minimumExpectedValue(Duration.ofMillis(1)) 
   .maximumExpectedValue(Duration.ofSeconds(10))

~~~



**给myservice开始的计时器启用客户端百分位数：**

~~~java
registry.timer("myservice.http.requests").record(..);
registry.timer("myservice.db.requests").record(..);

registry.config().meterFilter(
    new MeterFilter() {
        @Override
        public DistributionStatisticConfig configure(Meter.Id id, DistributionStatisticConfig config) {
            if(id.getName().startsWith("myservice")) {
                return DistributionStatisticConfig.builder()
                    .percentiles(0.95)
                    .build()
                    .merge(config);
            }
            return config;
        }
    });

~~~



### Meter Provider



**测量job执行的结果：**

~~~java
Timer.Sample sample = Timer.start(registry);

Result result = job.execute();

Timer timer = Timer.builder("job.execution")
    .tag("job.name", "job")
    .tag("status", result.status())
    .register(registry);
sample.stop(timer);

~~~

上面代码有两个问题：每次执行创建`Timer.Builder`对象的开销以及GC。

~~~java
// 可以替换成这样
// 这样有局限性
registry.timer("job.execution", "job.name", "my-job", "status", result.status());

~~~



**使用MeterProvider解决问题。MeterProvider可以和Counter, Timer, LongTaskTimer,  DistributionSummary一起使用。**



~~~java
// 提前创建好的属性
private MeterProvider<Timer> timerProvider = Timer.builder("job.execution")
    .tag("job.name", "my-job")
    .withRegistry(registry);

// ...

Timer.Sample sample = Timer.start(registry);

Result result = job.execute();

// 记录tag
sample.stop(timerProvider.withTags("status", result.status()));

~~~

