# starter-actuator



## Prometheus

通过`org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryPostProcessor`Bean后置处理器，使用配置器`MeterRegistryConfigurer`，在创建`MeterRegistry`时，将`MeterBinder`注册到`MeterRegistry`。通过`MeterRegistryCustomizer`Bean对注册器进行自定义；`MeterFilter`Bean添加多滤器。

![image-20250527153917235](http://47.101.155.205/image-20250527153917235.png)

![image-20250527154454544](http://47.101.155.205/image-20250527154454544.png)





### PrometheusMeterRegistry

`PrometheusMeterRegistry`继承`MeterRegistry`，通过重写`newCounter()`、`newDistributionSummary()`、`newTimer()`、`newGauge()`、`newLongTaskTimer()`、`newFunctionTimer()`、`newFunctionCounter()`、`newMeter()`等方法，在创建对应指标收集时，将收集的标签记录下来。

调用`collectorByName(Meter.Id)`方法记录指标，`CollectorRegistry`中存放需要记录的指标。

![image-20250528112951930](http://47.101.155.205/image-20250528112951930.png)

![image-20250528134928786](http://47.101.155.205/image-20250528134928786.png)

**JVM自动配置的指标MeterBinder：**

1. JvmGcMetrics
2. JvmMemoryMetrics
3. JvmThreadMetrics
4. ClassLoaderMetrics

**Micrometer其它未配置的MeterBinder：**

1. DiskSpaceMetrics：监控指定路径的磁盘情况；
2. ExecutorServiceMetrics：监控设置的线程池的情况：已完成的任务、正在执行的线程数、等待队列数、剩余可用队列数、线程池中的线程数等指标。



### PrometheusScrapeEndpoint

`PrometheusScrapeEndpoint`暴露接口供prometheus主动抓取数据，`MetricFamilySamplesEnumeration`对象中存放了收集的信息。

![image-20250528140732638](http://47.101.155.205/image-20250528140732638.png)

![image-20250528141649212](http://47.101.155.205/image-20250528141649212.png)

![image-20250528142253215](http://47.101.155.205/image-20250528142253215.png)