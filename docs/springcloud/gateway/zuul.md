

# zuul

**使用zuul的不足：**在路由请求失败的情况下，默认还是会返回200状态的响应，同时响应体是空字符串。

## zuul介绍

zuul的git：https://github.com/Netflix/zuul

官网文档地址：https://github.com/Netflix/zuul/wiki

Netflix介绍文档：http://techblog.netflix.com/2013/06/announcing-zuul-edge-service-in-cloud.html

spring关于spring-cloud-starter-netflix-zuul(最后支持的版本)：https://docs.spring.io/spring-cloud-netflix/docs/2.2.10.RELEASE/reference/html/#router-and-filter-zuul

![image-20240930135955381](http://47.101.155.205/image-20240930135955381.png)

![image-20240930135955382](http://47.101.155.205/image-20240930135955382.png)



## 使用介绍

### zuul自定义过滤器

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



Hystrix超时时间

![image-20231113141217463](http://47.101.155.205/image-20231113141217463.png)



配置文件

![image-20231113141237886](http://47.101.155.205/image-20231113141237886.png)

调用过程

![image-20231113142602157](http://47.101.155.205/image-20231113142602157.png)

















### SendErrorFilter过滤器

**该过滤器没什么太大作用**

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
  ignoredServices: '*' 

~~~





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



## netflix-eureka-client

### RibbonEurekaAutoConfiguration



## ribbon-loadbalancer

**com.netflix.ribbon:ribbon-loadbalancer**



### ILoadBalancer

负载均衡接口。



#### DynamicServerListLoadBalancer



### ServerListUpdater

动态拉取可用服务信息Server。

#### PollingServerListUpdater

