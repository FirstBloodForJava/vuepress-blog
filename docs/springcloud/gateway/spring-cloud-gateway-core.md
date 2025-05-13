# spring-cloud-gateway-core



## 自动配置

spring-cloud-gateway-server：

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
   3. NettyRoutingFilter存在则配置NettyWriteResponseFilter过滤器
   4. 配置过滤器WebsocketRoutingFilter的一些配置。
   
8. 配置springboot的actuator，暴露端点api(GatewayControllerEndpoint、GatewayLegacyControllerEndpoint)。

9. 存在oautch，配置TokenRelayGatewayFilterFactory过滤器工厂。



### GatewayResilience4JCircuitBreakerAutoConfiguration

存在相关依赖才会生效

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-reactor-resilience4j</artifactId>
</dependency>

~~~

`@ConditionalOnEnabledFilter`注解默认判断类或方法(返回类型)的GatewayFilterFactory实现是否关闭配置，是否激活配置类或Bean。

SpringCloudCircuitBreakerFilterFactory子类实现配置spring.cloud.gateway.filter.circuit-breaker.enabled。其它则为驼峰命名转换为`-`分割格式。

AddRequestHeaderGatewayFilterFactory格式spring.cloud.gateway.filter.add-request-header.enabled。

断路器自动配置：

![ReactiveResilience4JAutoConfiguration](http://47.101.155.205/image-20250511171029987.png)

gateway断路器自动配置：

![image-20250511170815524](http://47.101.155.205/image-20250511170815524.png)



### GatewayNoLoadBalancerClientAutoConfiguration

当没有`org.springframework.cloud.loadbalancer.core.ReactorLoadBalancer`类时，添加NoLoadBalancerClientFilter过滤器，将`lb`请求拦截。

![image-20250511204840047](http://47.101.155.205/image-20250511204840047.png)



### GatewayMetricsAutoConfiguration

![image-20250511205811026](http://47.101.155.205/image-20250511205811026.png)

1. 3个GatewayTagsProvider配置；
2. 依据spring.cloud.gateway.metrics.tags配置PropertiesTagsProvider；
3. GatewayMetricsFilter过滤器，监控请求指标；
4. RouteDefinitionMetrics处理RefreshRoutesEvent事件。



### GatewayRedisAutoConfiguration

**Redis Lua脚本实现了令牌桶算法：**

key参数说明：

1. tokens_key：存储当前令牌数量的键，格式request_rate_limiter.{id}.tokens。
2. timestamp_key：存储上次令牌刷新时间的键，格式request_rate_limiter.{id}.timestamp。

argv参数说明：

1. rate：令牌填充速率(单位：令牌/秒)，
2. capacity：令牌桶的最大容量。
3. 默认空字符串。
4. requested：当前请求需要的令牌数。



~~~lua
-- Redis Lua脚本中，默认情况下命令是随机复制的，使用这个函数可以确保命令确定性地复制，特别是在涉及时间或随机数时，避免不一致的情况。
redis.replicate_commands()

local tokens_key = KEYS[1]
local timestamp_key = KEYS[2]

local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = redis.call('TIME')[1]
local requested = tonumber(ARGV[4])

-- 容量/速率 表示填满整个桶所需的时间
local fill_time = capacity/rate
-- 设置过期时间为2倍所需时间
local ttl = math.floor(fill_time*2)

-- 获取当前key的令牌数量
local last_tokens = tonumber(redis.call("get", tokens_key))
if last_tokens == nil then
  -- 不存在则默认当前桶容量为剩余数量
  last_tokens = capacity
end

-- 获取上次key刷新时间
local last_refreshed = tonumber(redis.call("get", timestamp_key))
if last_refreshed == nil then
  -- 没有则默认0
  last_refreshed = 0
end

-- 计算与上次key刷新时间差
local delta = math.max(0, now-last_refreshed)
-- last_tokens+(delta*rate) 根据时间差补充令牌，但是不能超过最大容量
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
-- 可用令牌大于此次消耗令牌数量
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens
local allowed_num = 0
if allowed then
  new_tokens = filled_tokens - requested
  allowed_num = 1
end

if ttl > 0 then
  redis.call("setex", tokens_key, ttl, new_tokens)
  redis.call("setex", timestamp_key, ttl, now)
end

-- return { allowed_num, new_tokens, capacity, filled_tokens, requested, new_tokens }
return { allowed_num, new_tokens }

~~~



自动配置作用：

1. 供RequestRateLimiterGatewayFilterFactory过滤器作请求拦截；
2. 通过redis配置路由。



### GatewayDiscoveryClientAutoConfiguration

DiscoveryClient发现客户端注册。

![image-20250512095402164](http://47.101.155.205/image-20250512095402164.png)



### SimpleUrlHandlerMappingGlobalCorsAutoConfiguration

通过配置解决跨域。

![image-20250512105801474](http://47.101.155.205/image-20250512105801474.png)



### GatewayReactiveLoadBalancerClientAutoConfiguration

添加依赖：

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>

~~~

![image-20250513110706667](http://47.101.155.205/image-20250513110706667.png)

根据配置的`LoadBalancerClientFactory`客户端负载均衡工厂创建`ReactiveLoadBalancerClientFilter`、`LoadBalancerServiceInstanceCookieFilter`过滤器。



### GatewayReactiveOAuth2AutoConfiguration

添加依赖：

~~~xml
<dependency>
	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>

~~~

![image-20250513111202600](http://47.101.155.205/image-20250513111202600.png)

Oauth自动配置。