# starter-actuator



## Prometheus

通过`org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryPostProcessor`Bean后置处理器，使用配置器`MeterRegistryConfigurer`，在创建`MeterRegistry`时，将`MeterBinder`注册到`MeterRegistry`。通过`MeterRegistryCustomizer`Bean对注册器进行自定义；`MeterFilter`Bean添加多滤器。

![image-20250527153917235](http://47.101.155.205/image-20250527153917235.png)

![image-20250527154454544](http://47.101.155.205/image-20250527154454544.png)





### PrometheusMeterRegistry

`PrometheusMeterRegistry`继承`MeterRegistry`，通过重写`newCounter()`、`newDistributionSummary()`、`newTimer()`、`newGauge()`、`newLongTaskTimer()`、`newFunctionTimer()`、`newFunctionCounter()`、`newMeter()`等方法，在创建对应指标收集时，将收集的标签记录下来。

