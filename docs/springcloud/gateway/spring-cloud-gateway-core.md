# spring-cloud-gateway-core



## 自动配置

~~~facotries
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.cloud.gateway.config.GatewayClassPathWarningAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayResilience4JCircuitBreakerAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayNoLoadBalancerClientAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayMetricsAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayRedisAutoConfiguration,\
org.springframework.cloud.gateway.discovery.GatewayDiscoveryClientAutoConfiguration,\
org.springframework.cloud.gateway.config.SimpleUrlHandlerMappingGlobalCorsAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayReactiveLoadBalancerClientAutoConfiguration,\
org.springframework.cloud.gateway.config.GatewayReactiveOAuth2AutoConfiguration

org.springframework.boot.env.EnvironmentPostProcessor=\
org.springframework.cloud.gateway.config.GatewayEnvironmentPostProcessor

# 自定义的错误解析器
org.springframework.boot.diagnostics.FailureAnalyzer=\
org.springframework.cloud.gateway.support.MvcFoundOnClasspathFailureAnalyzer

~~~



### GatewayClassPathWarningAutoConfiguration

**spring.cloud.gateway.enabled=false则这里不匹配。**

![image-20250417151908220](http://47.101.155.205/image-20250417151908220.png)



### GatewayAutoConfiguration

**ConditionalOnEnabledGlobalFilter注解value可以用来指定过滤器的class，多处一起使用，可以满足同时配置或配置。ConditionalOnEnabledPredicate注解效果相同。**

1. gateway自定义的默认过滤器配置(HttpHeadersFilter)：
   1. `spring.cloud.gateway.forwarded.enabled=false`可以取消配置`ForwardedHeadersFilter`，默认开启。
   2. `RemoveHopByHopHeadersFilter`，`spring.cloud.gateway.filter.remove-hop-by-hop`配置自定义要删除的请求头。
   3. `spring.cloud.gateway.x-forwarded.enabled=false`取消`XForwardedHeadersFilter`过滤器，默认开启。
   4. `server.http2.enabled=false`取消`GRPCRequestHeadersFilter`过滤器，默认开启。
   5. `server.http2.enabled=false`取消`GRPCResponseHeadersFilter`，默认开启。
   6. `TransferEncodingNormalizationHeadersFilter`
2. 全局过滤器(`GlobalFilter`)配置，可以通过spring.cloud.gateway.global-filter.过滤器名称.enabled=false关闭默认过滤器，过滤器名称等于`AdaptCachedBodyGlobalFilter=adapt-cache-body`。
   1. AdaptCachedBodyGlobalFilter
   2. RemoveCachedBodyFilter
   3. RouteToRequestUrlFilter
   4. ForwardRoutingFilter
   5. ForwardPathFilter
   6. WebsocketRoutingFilter
3. 断言`AbstractRoutePredicateFactory`工厂配置。通过spring.cloud.gateway.predicate.断言器民初.enabled=false关闭默认过滤器，过滤器名称等于`AfterRoutePredicateFactory=adapt-cache-body`。