

# zuul

特点：

- 通过自定义过滤器，可以将所有请求的状态码都设为200；
- 转发请求失败时，例如未在 ribbon 要求时间内响应，zuul 默认会发起重试请求。可能由于 zool 的原因，下游服务读取请求数据出现 `UT000128: Remote peer closed connection before all data could be read` 异常。



## zuul介绍

zuul的git：https://github.com/Netflix/zuul

官网文档地址：https://github.com/Netflix/zuul/wiki

Netflix介绍文档：http://techblog.netflix.com/2013/06/announcing-zuul-edge-service-in-cloud.html

spring关于spring-cloud-starter-netflix-zuul(最后支持的版本)：https://docs.spring.io/spring-cloud-netflix/docs/2.2.10.RELEASE/reference/html/#router-and-filter-zuul

![image-20240930135955381](http://47.101.155.205/image-20240930135955381.png)

![image-20240930135955382](http://47.101.155.205/image-20240930135955382.png)



## 使用介绍



### 过滤器

**过滤器执行原理介绍：**

`HttpServlet` 的实现 `ZuulServlet`，在 `service` 处理 Web 请求中，设计了过滤器执行过程：

1. `service(javax.servlet.ServletRequest servletRequest, javax.servlet.ServletResponse servletResponse)` 方法处理所有请求；
2. Server 初始化时创建 `ZuulRunner`；
3. ZuulRunner 中的 FilterProcessor，其中存储了注册的过滤器 Bean ZuulFilter 实例；
4. 处理请求逻辑如下：

![image-20250708205931863](http://47.101.155.205/image-20250708205931863.png)



`ZuulServletFilter` 过滤器执行原理如下：

1. Servlet 类型过滤器 `ZuulServletFilter` 过滤请求；
2. `ZuulServletFilter` 创建时初始化 `ZuulRunner`；
3. `ZuulRunner` 中的 `FilterProcessor`，其中存储了注册的过滤器 Bean `ZuulFilter` 实例；
4. `ZuulServletFilter` 组合以上对象的执行过程如下：

![image-20250708204024376](http://47.101.155.205/image-20250708204024376.png)

**在 Server 模式下，启动这个过滤器，没有转发请求，但是 pre 过滤器有执行，没有代理请求。缺乏转发请求的过滤器。**



#### FilterProcessor





#### zuul自定义过滤器

1. 继承ZuulFilter类，实现其方法filterType()、filterOrder()、shouldFilter()、run()
   1. filterType()表示过滤器的类型：pre-前置过滤器，用于请求处理前；route-路由过滤器，用于路由请求(使用Apache或NetflixRibbon发送原始http请求)；post-后置过滤器，用于响应请求；error-错误过滤器，用于处理错误情况(其它任何阶段发生错误)。
   2. filterOrder()表示过滤器的执行顺序，较小意味着先执行
   3. shouldFilter()表示是否执行过滤器的逻辑，可以编写逻辑确定是否执行过滤器
   4. run()，过滤器的实际执行逻辑



~~~java
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

public class CustomFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return "pre"; // 前置过滤器
    }

    @Override
    public int filterOrder() {
        return 1; // 执行顺序，数字越小越早执行
    }

    @Override
    public boolean shouldFilter() {
        return true; // 在该方法中可以定义过滤器是否执行的逻辑
    }

    @Override
    public Object run() {
        // 获取请求的信息
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        String uri = request.getRequestURI();
        // 获取请求信息、响应信息等
        // 对请求或响应进行处理
        if(auth(ctd)){
			ctx.setSendZuulResponse(false); // 不将请求路由到后端服务
            ctx.setResponseStatusCode("401"); 
            ctx.setResponseBody("Access Denied"); // 设置响应内容
            ctx.set("responseFiltered", true); // 标记该请求已被过滤
        }
        return null;
    }
}


~~~

![image-20231102150019900](http://47.101.155.205/image-20231102150019900.png)



~~~java
PortRetValBeginDto portRetValBeginDto = releasePass(reListModel, portObjectDto, currentDate);

~~~

![image-20231102154425869](http://47.101.155.205/image-20231102154425869.png)





~~~yml
spring:
  datasource:
    druid:
      username: root
      password: password
      url: jdbc:mysql://ip:port/jpa?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
      initial-size: 4
      min-idle: 4
      max-active: 30
      max-wait: 60000
      time-between-eviction-runs-millis: 60000
      min-evictable-idle-time-millis: 300000
      validation-query: select 1
      test-while-idle: true
      test-on-borrow: false
      test-on-return: false
      pool-prepared-statements: true
      max-pool-prepared-statement-per-connection-size: 30
      use-global-data-source-stat: true
      stat-view-servlet:
        enabled: true
  jpa:
    show-sql: true
    #org.hibernate.dialect.MySQL8Dialect
    database-platform: org.hibernate.dialect.MySQLDialect
    open-in-view: true
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
server:
  port: 8080

~~~





### hystrix和ribbon时间

Ribbon超时时间

![image-20231113141016743](http://47.101.155.205/image-20231113141016743.png)

默认全局时间：`ribbonTimeout = (ribbon.ReadTimeout + ribbon.ConnectTimeout) * (1) * (1+1)` 

`ribbon.ReadTimeout + ribbon.ConnectTimeout` 表示单次 ribbon请求的最大时间， 默认2000 ms。

`ribbon.MaxAutoRetries` 表示开启重试机制的次数，默认 0 次。

`ribbon.MaxAutoRetriesNextServer` 表示最大自动重试下一个服务器，默认一次。**作用是什么？**



Hystrix超时时间

![image-20231113141217463](http://47.101.155.205/image-20231113141217463.png)



配置文件

![image-20231113141237886](http://47.101.155.205/image-20231113141237886.png)

调用过程

![image-20231113142602157](http://47.101.155.205/image-20231113142602157.png)

















### SendErrorFilter过滤器

**该过滤器没什么太大作用**

![image-20250708210450129](http://47.101.155.205/image-20250708210450129.png)

**这里出现异常的原因就是 RequestDispatcher forward 的执行，当第一次出现错误，假设这里时转发请求到自己，/error 无法路由，再次抛出异常，错误处理器不会处理。这里后续出现异常时出了 Servlet 才出现的。**

~~~java
RequestDispatcher dispatcher = request.getRequestDispatcher(
                "/error");
dispatcher.forward(request, response);

~~~

**上面这段代码的效果可能如下：由于 zuul 的一些其它特性可能影响了最终效果。**

![image-20250708212003013](http://47.101.155.205/image-20250708212003013.png)





sendErrorFilter.ran请求上下为true则不执行这个默认过滤器

~~~java
public class SendErrorFilter extends ZuulFilter {

	private static final Log log = LogFactory.getLog(SendErrorFilter.class);
	protected static final String SEND_ERROR_FILTER_RAN = "sendErrorFilter.ran";

	@Value("${error.path:/error}")
	private String errorPath;

	@Override
	public String filterType() {
		return ERROR_TYPE;
	}

	@Override
	public int filterOrder() {
		return SEND_ERROR_FILTER_ORDER;
	}

	@Override
	public boolean shouldFilter() {
		RequestContext ctx = RequestContext.getCurrentContext();
		// only forward to errorPath if it hasn't been forwarded to already
		return ctx.getThrowable() != null
				&& !ctx.getBoolean(SEND_ERROR_FILTER_RAN, false);
	}

	@Override
	public Object run() {
		try {
			RequestContext ctx = RequestContext.getCurrentContext();
            // 获取异常信息
			ExceptionHolder exception = findZuulException(ctx.getThrowable());
			HttpServletRequest request = ctx.getRequest();
			
			request.setAttribute("javax.servlet.error.status_code", exception.getStatusCode());
			// 打印什么原因导致的异常异常的信息
			log.warn("Error during filtering", exception.getThrowable());
			request.setAttribute("javax.servlet.error.exception", exception.getThrowable());

			if (StringUtils.hasText(exception.getErrorCause())) {
				request.setAttribute("javax.servlet.error.message", exception.getErrorCause());
			}

			RequestDispatcher dispatcher = request.getRequestDispatcher(
					this.errorPath);
			if (dispatcher != null) {
				ctx.set(SEND_ERROR_FILTER_RAN, true);
				if (!ctx.getResponse().isCommitted()) {
					ctx.setResponseStatusCode(exception.getStatusCode());
					dispatcher.forward(request, ctx.getResponse());
				}
			}
		}
		catch (Exception ex) {
			ReflectionUtils.rethrowRuntimeException(ex);
		}
		return null;
	}

	protected ExceptionHolder findZuulException(Throwable throwable) {
		if (throwable.getCause() instanceof ZuulRuntimeException) {
			Throwable cause = null;
			if (throwable.getCause().getCause() != null) {
				cause = throwable.getCause().getCause().getCause();
			}
			if (cause instanceof ClientException && cause.getCause() != null
					&& cause.getCause().getCause() instanceof SocketTimeoutException) {

				ZuulException zuulException = new ZuulException("", 504,
						ZuulException.class.getName() + ": Hystrix Readed time out");
				return new ZuulExceptionHolder(zuulException);
			}
			// this was a failure initiated by one of the local filters
			if(throwable.getCause().getCause() instanceof ZuulException) {
				return new ZuulExceptionHolder((ZuulException) throwable.getCause().getCause());
			}
		}
		
		if (throwable.getCause() instanceof ZuulException) {
			// wrapped zuul exception
			return  new ZuulExceptionHolder((ZuulException) throwable.getCause());
		}

		if (throwable instanceof ZuulException) {
			// exception thrown by zuul lifecycle
			return new ZuulExceptionHolder((ZuulException) throwable);
		}

		// fallback
		return new DefaultExceptionHolder(throwable);
	}

	protected interface ExceptionHolder {
		Throwable getThrowable();

	    default int getStatusCode() {
	    	return HttpStatus.INTERNAL_SERVER_ERROR.value();
		}

	    default String getErrorCause() {
	    	return null;
		}
	}

	protected static class DefaultExceptionHolder implements ExceptionHolder {
		private final Throwable throwable;

		public DefaultExceptionHolder(Throwable throwable) {
			this.throwable = throwable;
		}

		@Override
		public Throwable getThrowable() {
			return this.throwable;
		}
	}

	protected static class ZuulExceptionHolder implements ExceptionHolder {
		private final ZuulException exception;

		public ZuulExceptionHolder(ZuulException exception) {
			this.exception = exception;
		}

		@Override
		public Throwable getThrowable() {
			return this.exception;
		}

		@Override
		public int getStatusCode() {
			return this.exception.nStatusCode;
		}

		@Override
		public String getErrorCause() {
			return this.exception.errorCause;
		}
	}

	public void setErrorPath(String errorPath) {
		this.errorPath = errorPath;
	}

}

~~~





### @EnableZuulServer作用

将应用程序设置为没有任何内置反向代理特性的通用Zuul服务器。到Zuul服务器的路由可以通过ZuulProperties配置(默认情况下没有)


### @EnableZuulProxy作用

设置一个Zuul服务器端点，并在其中安装一些反向代理过滤器，这样它就可以将请求转发到后端服务器。后端可以通过配置手工注册，也可以通过DiscoveryClient注册。

1. ServiceRouteMapper
2. DiscoveryClientRouteLocator
3. HasFeatures
4. HttpClientConfiguration(Import)
   1. ApacheHttpClientConnectionManagerFactory
   2. HttpClientBuilder
   3. ApacheHttpClientFactory
5. RibbonCommandFactoryConfiguration.HttpClientRibbonConfiguration.class(Import)
   1. RibbonCommandFactory
6. PreDecorationFilter
7. RibbonRoutingFilter
8. SimpleHostRoutingFilter



### zuul配置

~~~yml
zuul:
  SendErrorFilter:
    error:
      disable: true # 禁用 error 类型的 SendErrorFilter 过滤器,默认注册即启用
  ignoredServices: '*'

~~~

![image-20250708200558395](http://47.101.155.205/image-20250708200558395.png)



## zuul通过eureka阻塞问题

route结合eureka发现服务，服务信息是通过域名注册，无法识别域名造成异常。

![image-20240930135955380](http://47.101.155.205/image-20240930135955380.png)

代码逻辑导致线程的condition调用await方法，线程阻塞了。



## zuul-自动配置

### RibbonCommandFactoryConfiguration

根据配置或加载的类，决定使用哪个 `RibbonCommandFactory` 工厂实现。

**工厂用于创建 RibbonCommand 对象，extends HystrixExecutable\<ClientHttpResponse\>。**



1. RestClientRibbonCommandFactory：`ribbon.restclient.enabled=true`。
2. OkHttpRibbonCommandFactory：`ribbon.okhttp.enabled=true`，且存在 `okhttp3.OkHttpClient` 客户端类。
3. HttpClientRibbonCommandFactory：默认，`ribbon.httpclient.enabled=false` 可关闭默认。



![image-20250705215445199](http://47.101.155.205/image-20250705215445199.png)

`HttpClientRibbonCommandFactory` 通过 netflix-ribbon的 `SpringClientFactory`来创建 `RibbonLoadBalancingHttpClient`。







## openfeign

### FeignAutoConfiguration自动配置

~~~java
@Bean
public FeignContext feignContext() {
	FeignContext context = new FeignContext();
	context.setConfigurations(this.configurations);
	return context;
}

~~~



## netflix-ribbon

**spring-cloud-netflix-ribbon**

覆盖 Service 默认使用的 Bean 策略方式：

1. 创建 RibbonClientSpecification Bean，通过 name(确定是哪个 Service 需要)、configuration(激活的注解类集合)；
2. @RibbonClients(defaultConfiguration = {EurekaRibbonClientConfiguration.class}) 注解指定需要的注解类。参考 RibbonEurekaAutoConfiguration。



### RibbonAutoConfiguration

`spring-cloud-netflix-ribbon` 的自动配置类。

在 `EurekaClientAutoConfiguration` 配置类之后；在 `LoadBalancerAutoConfiguration`、`AsyncLoadBalancerAutoConfiguration` 之前。

激活 `RibbonEagerLoadProperties(ribbon.eager-load)`、`ServerIntrospectorProperties(ribbon)` 配置类。



**Bean 的注入：**

1. HasFeatures：actuator 端点有用到。
2. SpringClientFactory：客户端工厂。
3. LoadBalancerClient：客户端负载均衡器，默认使用 `RibbonLoadBalancerClient`。
4. LoadBalancedRetryFactory：重试负载均衡工厂。
5. PropertiesFactory：配置工厂。
6. RibbonApplicationContextInitializer：`ribbon.eager-load.enabled=true` 配置更早激活 Ribbon 客户端。



#### RibbonClientHttpRequestFactoryConfiguration

`RibbonAutoConfiguration` 的静态内部类 `RibbonClientHttpRequestFactoryConfiguration`。

通过配置 `ribbon.http.client.enabled=true` 和 `ribbon.restclient.enabled` 使用特定的 `RibbonClientHttpRequestFactory` http 请求客户端工厂。

创建 `RestTemplate` 默认的 `RestTemplateCustomizer`  自定义器。



#### SpringClientFactory

继承 `spring-cloud-context` 中的 `NamedContextFactory`。

**API(简化泛型) **

1. IClient getClient(String name, Class clientClass)：获取与 `name` 相关联的 `clientClass` 客户端。
2. ILoadBalancer getLoadBalancer(String name)：获取与 `name` 相关联的 `ILoadBalancer` 负载均衡器。
3. IClientConfig getClientConfig(String name)：获取与 `name` 相关联的 `IClientConfig` 客户端配置。

上面获取对象底层方法一致，逻辑如下：

1. 每个 `service` 都有会有一个名为 `SpringClientFactory-name` 的 `AnnotationConfigApplicationContext`，context 的 parent 就是当前应用的context；
2. context 在创建时，自动添加 `PropertyPlaceholderAutoConfiguration`、`RibbonClientConfiguration`这两个注解类；
3. 可以通过配置 `RibbonClientSpecification` Bean 为指定的 `service` 或所有的添加注解类。
4. 刷新后，通过上下文获取对应的对象。
   1. `IClient`：默认 `RibbonLoadBalancingHttpClient`，通过 `RibbonClientConfiguration` Import `HttpClientRibbonConfiguration` 注解类创建。
   2. `ILoadBalancer`：默认 `ZoneAwareLoadBalancer`，通过 `RibbonClientConfiguration` 注解类创建。可以通过配置 `RibbonClientSpecification` Bean 中的注解类，引入自定义的 `ILoadBalancer`。 
   3. `IClientConfig`：默认 `DefaultClientConfigImpl`，通过 `RibbonClientConfiguration` 注解类创建。

![image-20250706153601205](http://47.101.155.205/image-20250706153601205.png)

![image-20250706153841597](http://47.101.155.205/image-20250706153841597.png)

![image-20250706155138408](http://47.101.155.205/image-20250706155138408.png)



### HttpClientRibbonConfiguration



### RibbonClientConfiguration

为每个动态的 Service 都会引入这个注解类。该注解类可替换的 Bean ：

1. IClientConfig：默认 DefaultClientConfigImpl。为客户端添加默认的配置，连接超时时间和读取超时时间设为1s。



**Import HttpClientRibbonConfiguration 创建的 Bean: **

- AbstractLoadBalancerAwareClient：默认 RibbonLoadBalancingHttpClient 。**执行 Http 请求的客户端**。



通过配置为指定的服务设置特点的实现类，支持的有(详见 `PropertiesFactory`)：

1. ILoadBalancer；
2. IPing；
3. IRule；
4. ServerList；
5. ServerListFilter。

**单独配置格式：serviceId.name.typeValue=class。typeValue表示前面类对应的属性值。**





### RibbonLoadBalancingHttpClient

默认引用 apache CloseableHttpClient 抽象类的实现 `InternalHttpClient` 作为 Http 客户端。

![image-20250707220713167](http://47.101.155.205/image-20250707220713167.png)



## netflix-eureka-client

### RibbonEurekaAutoConfiguration



## ribbon-loadbalancer

**com.netflix.ribbon:ribbon-loadbalancer**



### ILoadBalancer

负载均衡接口。



#### DynamicServerListLoadBalancer



#### ZoneAwareLoadBalancer

DynamicServerListLoadBalancer 的子类。





### IRule

定义负载均衡的规则接口。



#### ZoneAvoidanceRule

`RibbonClientConfiguration` 配置的 IRule。

![image-20250708215129999](http://47.101.155.205/image-20250708215129999.png)

**路由服务的大体规则：**

![image-20250708220154992](http://47.101.155.205/image-20250708220154992.png)



#### AbstractServerPredicate

**使用 AbstractServerPredicate 的两个 ZoneAvoidancePredicate、AvailabilityPredicate 组合断言。**

![image-20250708221053125](http://47.101.155.205/image-20250708221053125.png)



**CompositePredicate 对象创建说明：**

![image-20250708221851370](http://47.101.155.205/image-20250708221851370.png)

![image-20250708222657952](http://47.101.155.205/image-20250708222657952.png)



#### ZoneAvoidancePredicate

ZoneAvoidancePredicate 断言 apply 匹配规则：

1. `niws.loadbalancer.zoneAvoidanceRule.enabled` 配置 false 则匹配；
2. Server 没有区域信息，则直接匹配；
3. 断言中没有负载均衡器信息，则直接匹配；
4. 负载均衡器的分区为1，则直接匹配；
5. 存在多个分区，则判断分区是否在可用分区中。



#### AvailabilityPredicate

AvailabilityPredicate 断言 apply 匹配规则：

1. 断言中没有负载均衡器信息，则直接匹配；
2. 根据服务的使用情况，判断是否匹配。





### ServerListUpdater

有两个实现：`EurekaNotificationServerListUpdater` 和 `PollingServerListUpdater`，用于动态拉取可用服务信息Server。`spring-cloud-netflix-ribbon` 默认使用 `PollingServerListUpdater`。可以通过指定 Bean 来覆盖默认操作。



#### PollingServerListUpdater

`DynamicServerListLoadBalancer` 使用 `PollingServerListUpdater` 逻辑：

~~~java
protected volatile ServerListUpdater serverListUpdater;


protected final ServerListUpdater.UpdateAction updateAction = new ServerListUpdater.UpdateAction() {
    @Override
    public void doUpdate() {
        updateListOfServers();
    }
};

@VisibleForTesting
public void updateListOfServers() {
    List<T> servers = new ArrayList<T>();
    if (serverListImpl != null) {
        // ServerList 获取服务器
        servers = serverListImpl.getUpdatedListOfServers();
        LOGGER.debug("List of Servers for {} obtained from Discovery client: {}",
                     getIdentifier(), servers);
		// ServerListFilter 进行过滤
        if (filter != null) {
            servers = filter.getFilteredListOfServers(servers);
            LOGGER.debug("Filtered List of Servers for {} obtained from Discovery client: {}",getIdentifier(), servers);
        }
    }
    // 更新所有的 Server
    updateAllServerList(servers);
}

// 触发逻辑, 线程池异步调用。
// 虽然每个 Service 都会创建Bean，但是都公用这个线程池
public void enableAndInitLearnNewServersFeature() {
    LOGGER.info("Using serverListUpdater {}", serverListUpdater.getClass().getSimpleName());
    // 固定延迟线程池启动
    // 具体调用逻辑为 DynamicServerListLoadBalancer.updateListOfServers()
    serverListUpdater.start(updateAction);
}

~~~

![image-20250707195332784](http://47.101.155.205/image-20250707195332784.png)



### ServerList

定义发现服务端的接口。

`spring-cloud-netflix-ribbon` 的 `RibbonClientConfiguration` 默认使用 `ConfigurationBasedServerList`。可以通过指定 Bean 来覆盖默认操作。

由于使用了`spring-cloud-netflix-eureka-client` 的 `EurekaRibbonClientConfiguration` ，这里的 Bean 是 `DomainExtractingServerList`。

**因为 RibbonAutoConfiguration 在创建 SpringClientFactory Bean 时，Spring 上下文中已经有 2个 RibbonClientSpecification Bean。**

- `name=default.org.springframework.cloud.netflix.ribbon.RibbonAutoConfiguration`，`class=[]`
- `name=default.org.springframework.cloud.netflix.ribbon.eureka.RibbonEurekaAutoConfiguration`，`class=org.springframework.cloud.netflix.ribbon.eureka.EurekaRibbonClientConfiguration`

**通过注解 @RibbonClients(defaultConfiguration = EurekaRibbonClientConfiguration.class) 里面的 Import实现了这个功能。**



#### DomainExtractingServerList

`getUpdatedListOfServers`：将 `DiscoveryEnabledNIWSServerList` 获取的 `DiscoveryEnabledServer` 转换成 `DomainExtractingServer`。

![image-20250707210619590](http://47.101.155.205/image-20250707210619590.png)

封装 Server 过程：

![image-20250707211749914](http://47.101.155.205/image-20250707211749914.png)

#### ConfigurationBasedServerList



### ServerListFilter

对已经设置或动态获取到的服务端进行筛选过滤。

`spring-cloud-netflix-ribbon` 默认使用 `ZonePreferenceServerListFilter`。可以通过指定 Bean 来覆盖默认操作。





#### ZonePreferenceServerListFilter

![image-20250708213645718](http://47.101.155.205/image-20250708213645718.png)