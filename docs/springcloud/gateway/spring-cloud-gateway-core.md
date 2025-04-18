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
   7. WeightCalculatorWebFilter
   8. NettyRoutingFilter：netty客户端才配置
   9. NettyWriteResponseFilter
   
3. 路由断言`RoutePredicateFactory`工厂配置。通过spring.cloud.gateway.predicate.断言器民初.enabled=false关闭默认过滤器，过滤器名称等于`AfterRoutePredicateFactory=adapt-cache-body`。

   1. AfterRoutePredicateFactory：在断言配置时间之后才匹配。
   2. BeforeRoutePredicateFactory：在断言配置时间之前才匹配。
   3. BetweenRoutePredicateFactory：在断言配置时间之间才匹配。
   4. CookieRoutePredicateFactory：配置的cookie的key对应的value是否匹配正则表达式。
   5. HeaderRoutePredicateFactory：配置的请求头的key对应的valueList任意匹配正则表达式。正则表达式为空默认匹配。
   6. HostRoutePredicateFactory：对请求Host进行正则匹配，在当前请求属性进行缓存操作。
   7. MethodRoutePredicateFactory：配置允许的请求方式。
   8. PathRoutePredicateFactory：有加同步代码。请求uri匹配，对请求属性进行某些操作。
   9. QueryRoutePredicateFactory：对请求参数查询做一个配置判断。
   10. ReadBodyRoutePredicateFactory：将请求体解析成配置类型对象，再使用内置配置`Predicate`断言该对象。
   11. RemoteAddrRoutePredicateFactory：对请求的连接地址做校验。
   12. WeightRoutePredicateFactory：结合过滤器WeightCalculatorWebFilter使用。
   13. CloudFoundryRouteServiceRoutePredicateFactory：是否包含某些特定的请求头。

4. `WebFilter`过滤器配置。

   1. WeightCalculatorWebFilter，需要`WeightRoutePredicateFactory`配置才生效。

5. 配置GatewayFilterFactory过滤器工厂，spring.cloud.gateway.filter.add-request-header.enable=false表示关闭AddRequestHeaderGatewayFilterFactory工厂。

   1. AddRequestHeaderGatewayFilterFactory：
   2. MapRequestHeaderGatewayFilterFactory：
   3. AddRequestParameterGatewayFilterFactory：
   4. AddResponseHeaderGatewayFilterFactory：
   5. ModifyRequestBodyGatewayFilterFactory：
   6. DedupeResponseHeaderGatewayFilterFactory：
   7. ModifyResponseBodyGatewayFilterFactory
   8. CacheRequestBodyGatewayFilterFactory
   9. PrefixPathGatewayFilterFactory
   10. PreserveHostHeaderGatewayFilterFactory
   11. RedirectToGatewayFilterFactory
   12. RemoveRequestHeaderGatewayFilterFactory
   13. RemoveRequestParameterGatewayFilterFactory
   14. RemoveResponseHeaderGatewayFilterFactory
   15. RequestRateLimiterGatewayFilterFactory
   16. RewritePathGatewayFilterFactory
   17. RetryGatewayFilterFactory
   18. SetPathGatewayFilterFactory
   19. SecureHeadersGatewayFilterFactory
   20. SetRequestHeaderGatewayFilterFactory
   21. SetRequestHostHeaderGatewayFilterFactory
   22. SetResponseHeaderGatewayFilterFactory
   23. RewriteResponseHeaderGatewayFilterFactory
   24. RewriteLocationResponseHeaderGatewayFilterFactory
   25. SetStatusGatewayFilterFactory
   26. SaveSessionGatewayFilterFactory
   27. StripPrefixGatewayFilterFactory
   28. RequestHeaderToRequestUriGatewayFilterFactory
   29. RequestSizeGatewayFilterFactory
   30. RequestHeaderSizeGatewayFilterFactory
   31. TokenRelayGatewayFilterFactory
   
6. gzip消息解析器GzipMessageBodyResolver
   
7. netty配置：

   1. 服务端配置：spring.cloud.gateway.httpserver.wiretap配置是否记录请求头和请求体。
   2. 配置netty的`HttpClient`。配置类前缀spring.cloud.gateway.httpclient。
   3. 配置过滤器WebsocketRoutingFilter的一些配置。
   
8. 配置springboot的actuator，暴露端点api(GatewayControllerEndpoint、GatewayLegacyControllerEndpoint)。

9. 存在oautch，配置TokenRelayGatewayFilterFactory过滤器工厂。


