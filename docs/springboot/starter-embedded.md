# 嵌入式容器starter



## Servlet自动配置

- DispatcherServletAutoConfiguration
- ServletWebServerFactoryAutoConfiguration
- ErrorMvcAutoConfiguration
- HttpEncodingAutoConfiguration
- MultipartAutoConfiguration
- WebMvcAutoConfiguration



### 1.ServletWebServerFactoryAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration



#### 1.Import

使用`@Import`注册`ImportBeanDefinitionRegistrar(ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar)`，注册`ServletWebServerFactory`，用于创建`WebServer`的工厂。Servlet容器加载顺序：

1. Tomcat：`TomcatServletWebServerFactory`，往工厂添加定义器：`TomcatConnectorCustomizer`、`TomcatContextCustomizer`、`TomcatProtocolHandlerCustomizer`。
2. Jetty：`JettyServletWebServerFactory`，往工厂添加自定义器：`JettyServerCustomizer`。
3. Undertow：`UndertowServletWebServerFactory`，玩工厂添加自定义器：`UndertowDeploymentInfoCustomizer`、`UndertowBuilderCustomizer`。

**导入`ImportBeanDefinitionRegistrar`作用？**

通过注册`WebServerFactoryCustomizerBeanPostProcessor`Bean后置处理器，在创建Server容器之前，根据配置对ServerFactory工厂进行配置。



#### 2.WebServerFactoryCustomizer

创建`ServletWebServerFactoryCustomizer` Bean，获取ServerProperties(server.)配置类信息。

设计`PropertyMapper`替换了if-else写法，设置工厂的配置。

![image-20250407210032896](http://47.101.155.205/image-20250407210032896.png)



如果是tomcat Servlet，则还创建`TomcatServletWebServerFactoryCustomizer` Bean。**匹配条件是WebServerFactory对象的父类。**

![image-20250407211430258](http://47.101.155.205/image-20250407211430258.png)



#### 3.ForwardedHeaderFilter

是否配置`ForwardedHeaderFilter`过滤器，通过`FilterRegistrationBean`注册。

过滤器优先级是最高的。

![image-20250407212949015](http://47.101.155.205/image-20250407212949015.png)



### 2.DispatcherServletAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration

通过在`@Conditional`指向类上的`@Order`的注解，来决定匹配的执行顺序。

![image-20250408145906476](http://47.101.155.205/image-20250408145906476.png)



#### 1.DispatcherServletConfiguration

激活(导入)配置类`HttpProperties(spring.http)`、`WebMvcProperties(spring.mvc)`。

匹配成功条件，Bean名称`dispatcherServlet`未被占用、`dispatcherServlet`名称的DispatcherServlet Bean不存在。

![image-20250408154856969](http://47.101.155.205/image-20250408154856969.png)

![image-20250408153847017](http://47.101.155.205/image-20250408153847017.png)

**1.创建DispatcherServlet Bean，做如下设置：**

1. 设置是否允许`OPTIONS`请求到FrameworkServlet.doService方法，默认`spring.mvc.dispatchOptionsRequest`为true。
2. 设置是否允许`TRACE`请求到FrameworkServlet.doService方法，默认`spring.mvc.dispatchTraceRequest`为false。
3. 没有找到请求的Handler，是否抛出`NoHandlerFoundException`，默认`spring.mvc.throwExceptionIfNoHandlerFound`为false。true则可以通过指定全局异常的方式处理指定异常。如果使用`DefaultServletHttpRequestHandler`处理请求，则不会抛出该异常。
4. 在每个请求结束是否发布`ServletRequestHandledEvent`事件，默认`spring.mvc.publishRequestHandledEvents`为true。在没有`ApplicationListener`监听该事件的前提下，可以关闭，**提升性能**。
5. 是否`DEBUG`日志记录请求参数，`TRACE`日志记录请求头。默认`spring.http.logRequestDetails`为false。



**2.修改MultipartResolver Bean的名称(Bean 存在)**





#### 2.DispatcherServletRegistrationConfiguration

匹配成功条件与`DispatcherServlet`的相似，多了一个DispatcherServlet Bean的判断条件。

![image-20250408160041426](http://47.101.155.205/image-20250408160041426.png)



**创建DispatcherServletRegistrationBean Bean，条件是存在名称dispatcherServlet 的DispatcherServlet Bean：**

![image-20250408161516272](http://47.101.155.205/image-20250408161516272.png)

1. 创建`DispatcherServletRegistrationBean`，设置`spring.mvc.servlet.path`地址，默认`/`。
2. 设置注册的名称`dispatcherServlet`。
3. 设置Servlet调度的优先级`spring.mvc.servlet.loadOnStartup`，默认-1。
4. `MultipartConfigElement` Bean存在则设置，该属性。







### 3.ErrorMvcAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration

激活/导入`ServerProperties(server)`、`ResourceProperties(spring.resources)`、`WebMvcProperties(spring.mvc)`配置类。

#### 1.Bean

1. 创建`DefaultErrorAttributes` Bean，设置属性`server.error.includeException`，是否包含异常属性，默认false。
2. 当前上限文不存在`ErrorController` Bean，创建`BasicErrorController` Controller。设置存在的错误视图解析器`ErrorViewResolver`，当前请求接收内容`text/html`才使用。处理错误请求，默认`/error`，可通过`server.error.path`、`error.path`配置路径。
3. 创建`ErrorPageCustomizer` Bean，可以自定义`ErrorPageRegistrar`，`ErrorPageRegistrarBeanPostProcessor`回调，注册这些错误页面。
4. 创建`PreserveErrorControllerTargetClassPostProcessor`，`BeanFactoryPostProcessor`实例。

`BeanFactoryPostProcessor`的作用？



#### 2.DefaultErrorViewResolverConfiguration

不存在`ErrorViewResolver` Bean，则创建`DefaultErrorViewResolver` Bean。

**优先级最低**

![image-20250408164614340](http://47.101.155.205/image-20250408164614340.png)



#### 3.WhitelabelErrorViewConfiguration

创建默认错误(error)视图。

`@Conditional(ErrorTemplateMissingCondition.class)`没有错误(error)模板才匹配。

1. 创建默认`text/html`错误视图。
2. 不存在`BeanNameViewResolver` Bean才创建。

![image-20250408165302132](http://47.101.155.205/image-20250408165302132.png)



### 4.WebMvcAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration

`WebMvcConfigurationSupport` Bean 不存在才匹配。

在以下配置类之后配置：

- DispatcherServletAutoConfiguration
- TaskExecutionAutoConfiguration：Spring上下文注册线程池。
- ValidationAutoConfiguration：？



#### 1.Bean

Bean不存在才匹配。

1. 注入Web过滤器`OrderedHiddenHttpMethodFilter(-10000)`：`spring.mvc.hiddenmethod.filter.enabled`默认false。将POST请求，在携带`_method`请求参数的情况下，转换http请求方式。
2. Web过滤器`OrderedFormContentFilter(-9900)`：`spring.mvc.formcontent.filter.enable`默认开启，将`PUT/PATCH/DELETE`请求的表达数据解析到Servlet 请求参数中。

![image-20250408193201029](http://47.101.155.205/image-20250408193201029.png)



#### 2.WebMvcAutoConfigurationAdapter

`WebMvcConfigurer`接口实现。

Import `EnableWebMvcConfiguration`

重写了接口的部分方法：

- configureMessageConverters：
- configureAsyncSupport：
- configurePathMatch：
- configureContentNegotiation：
- getMessageCodesResolver
- addFormatters
- addResourceHandlers





注入Bean(不存在才注入)：

1. InternalResourceViewResolver：配置视图前缀后缀`spring.mvc.view.prefix/spring.mvc.view.suffix`。
2. BeanNameViewResolver：存在`View` Bean匹配。
3. ContentNegotiatingViewResolver：视图解析分发器。
4. LocaleResolver：`spring.mvc.locale`配置才有效。
5. 过滤器`RequestContextListener(-105)`：使用`ThreadLocal`缓存请求上下文。



#### 3.EnableWebMvcConfiguration

`EnableWebMvcConfiguration`实现`DelegatingWebMvcConfiguration`，相当于`@EnableWebMvc`作用。

注入Bean：

1. `RequestMappingHandlerAdapter`：
2. `RequestMappingHandlerMapping`：
3. `WelcomePageHandlerMapping`：
4. `FormattingConversionService`：
5. `Validator`：
6. `ContentNegotiationManager`：



#### 4.ResourceChainCustomizerConfiguration

要一定条件才匹配。

注入`ResourceChainResourceHandlerRegistrationCustomizer` Bean。



### 5.HttpEncodingAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration

获取`spring.http.encoding`字符编码相关配置。

注入`CharacterEncodingFilter(Integer.MIN_VALUE)`过滤器：默认使用`UTF-8`字符编码，请求使用强制编码，响应不使用。

注入`LocaleCharsetMappingsCustomizer`：根据`spring.http.encoding.mapping`配置，实现不同区域使用不同的字符编码。







### 6.MultipartAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration



导入`MultipartProperties(spring.servlet.multipart)`配置。



注入`MultipartConfigElement` Bean：

- 匹配条件：`MultipartConfigElement`和`CommonsMultipartResolver`Bean都不存在。
- 使用`MultipartProperties`配置文件上传功能：写入磁盘大小阈值、存储文件的目录、多媒体表单的最大大小(默认10MB)、上传文件的最大大小(默认1MB)。



注入`StandardServletMultipartResolver`：

- 匹配条件：`MultipartResolver` Bean 不存在。
- 创建`StandardServletMultipartResolver` Bean，配置`spring.servlet.multipart.resolveLazily`，是否在文件或参数访问multipart请求时延迟解析。



## embedded自动配置

org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration

使用嵌入式容器的顺序：

1. Tomcat：
2. Jetty：
3. Undertow：
4. 使用嵌入式reactor netty：

**Tomcat容器存在：**

创建`TomcatWebServerFactoryCustomizer`实例，是WebServerFactoryCustomizer\<ConfigurableTomcatWebServerFactory\>抽象类实现。



通过导入`BeanPostProcessorsRegistrar(ImportBeanDefinitionRegistrar)`，注册`WebServerFactoryCustomizerBeanPostProcessor(BeanPostProcessor)`重写了`postProcessBeforeInitialization`方法，在`WebServerFactory` Bean创建后，调用`TomcatWebServerFactoryCustomizer`重写的`customize`方法。



**Undertow容器存在：**

创建`UndertowWebServerFactoryCustomizer`实例，是WebServerFactoryCustomizer\<ConfigurableUndertowWebServerFactory\>的实现。对Undertow容器根据配置进行自定义操作。原理同Tomcat容器。







## Tomcat容器启动

ServletWeb应用，创建`ServletWebServerApplicationContext`上下文对象，调用`refresh()`。方法中调用`onRefresh()`创建Tomcat 容器。获取上下文`ServletWebServerFactory` Bean，用来创建SpringBoot定义的`WebServer`对象。



**临时目录创建**：临时根目录通过`TempDirectory.location()`获取，前缀默认使用`tomcat`，后缀使用配置端口，中间值使用`SecureRandom.nextLong()`获取随机数。

Windows临时目录：`C:\Users\lenovo\AppData\Local\Temp`



**Tomcat Servlet容器配置：**

`TomcatServletWebServerFactory.getWebServer()`

1. 创建连接器：默认使用`org.apache.coyote.http11.Http11NioProtocol`，属性`protocol`可配置该连接器类型。
2. 创建在临时目录中创建工作目录，并设置连接器。
3. 连接器设置`Server`绑定的地址；使用`TomcatProtocolHandlerCustomizer`实例对`ProtocolHandler`自定义(默认没有)；连接器设置默认URL编码(默认UTF-8)；设置延迟初始容器socket(避免ApplicationContext初始化慢的情况)；是否设置`ssl`连接(其中有判断使用使用http2协议)；是否设置自定义`TomcatConnectorCustomizer`连接器压缩；对连接器进行自定义。
   1. `AbstractProtocol`设置最大工作线程数(默认200)，配置方式：`server.tomcat.maxThreads`；
   2. `AbstractProtocol`设置最小工作线程数(默认10)，配置方式：`server.tomcat.minSpareThreads`；
   3. `AbstractHttp11Protocol`设置http请求头最大容量(默认8KB)，配置方式：`server.tomcat.maxHttpHeaderSize`；
   4. `AbstractHttp11Protocol`设置http请求体最大容量(默认2MB)，配置方式：`server.tomcat.maxSwallowSize`；
   5. `Connector`设置http表单最大容量(默认2MB)，配置方式：`server.tomcat.maxHttpFormPostSize`；
   6. `AbstractProtocol`设置最大连接数(默认8192)，配置方式：`server.tomcat.maxConnections`；
   7. `AbstractProtocol`设置当线程都在使用时，传入连接请求的最大队列长度(默认100)，配置方式：`server.tomcat.acceptCount`；
   8. `AbstractProtocol`设置将保留在缓存中并在后续请求中重用的空闲处理器的最大数量(默认200)。设为-1，表示缓存是无限的，理论大小等于最大连接数。配置方式：`server.tomcat.processorCache`；
4. 再次将连接器绑定到tomcat，为什么这样做？
5. Tomcat 服务设置默认引擎；设置延迟`server.tomcat.backgroundProcessorDelay`默认10s；
6. 如果有配置其它连接器，则在tomcat上添加连接器；
7. 一些固定设置；
8. 重写`postProcessContext`方法调用；

`TomcatServletWebServerFactory.getTomcatWebServer(Tomcat tomcat)`：

1. 创建`TomcatWebServer`对象，打印`Tomcat initialized with port(s)`+端口+协议日志；
2. 是否重写设置引擎名称，格式Tomcat-i；
3. 删除服务连接器，以免协议绑定在服务启动时发生。**为什么？**
4. Tocat启动。调用`StandardServer`父类`start()`方法。触发之前注册的监听器。
   1. 创建一个优先级为1，核心线程数2的`ScheduledThreadPoolExecutor`，线程名称前缀`Catalina-utility-`；
   2. 注册缓存，作用？
   3. 注册`MBeanFactory` ，作用？
   4. 注册`naming resources`，和Server一样，也有状态；
   5. 初始化定义Service，和Server一样，也有状态；
   6. 启动Serive，打印日志`Starting service` + 服务名，启动引擎。
5. 启动之后，由于Tomcat所有线程都是守护线程，创建一个阻塞非守护线程，用来关闭Server，线程名`container-i`；



**finishRefresh()**调用`startWebServer()`启动Tomcat容器。最后发布`ServletWebServerInitializedEvent`事件。



### 处理请求线程池创建

队列使用`TaskQueue`，继承`LinkedBlockingQueue`，队列类型为`Runnable`，创建队列的容量默认是最大。

使用tomcat自定义的`TaskThreadFactory`线程工厂，线程名称前缀`http-nio-[port]-exec`，线程优先级5，默认都是守护线程。

线程池`ThreadPoolExecutor`，继承`java.util.concurrent.ThreadPoolExecutor`。初始化默认就激活了最小数量(核心线程数)的线程。拒绝策略，抛出`RejectedExecutionException`异常。





**Tomcat线程池execute(Runnable command)执行逻辑：**

线程池的逻辑没有大改，而是通过重写自定义`TaskQueue`阻塞队列的`offer`方法，来改变线程池的逻辑。

重写了线程池`afterExecute`，在任务执行完毕后调用。作用是：当前线程使用数量计数减一，判断是否需要停止当前线程。**TaskQueue队列的poll方法也调用了是否关闭线程的方法，take方法相同。**

**正在处理的请求的线程超过核心线程数，开始激活其它线程处理请求。**

![image-20250410193337369](http://47.101.155.205/image-20250410193337369.png)



### 影响tomcat处理请求配置

~~~properties
# tomcat最大连接数
server.tomcat.maxConnections=100
# 请求的最大队列长度
server.tomcat.acceptCount=100
# 最大工作线程
server.tomcat.maxThreads=300
# 最小工作线程
server.tomcat.minSpareThreads=10

~~~

**使用jmeter发起300个请求，每个请求睡眠3s。100个请求耗时3s，100个请求耗时大于3s小于6s，100个请求失败。**

**没有超过6s，可能是jmeter发起请求时有部分耗时。**

**说明tomcat处理请求的并发数量由最大连接数和队列长度决定。超过最大连接数的数量会先进入等待队列(TCP连接以及建立)，待前面请求处理完成(释放连接)，再分发到工作线程处理请求。**

![image-20250410203715184](http://47.101.155.205/image-20250410203715184.png)

![image-20250410203841146](http://47.101.155.205/image-20250410203841146.png)

![image-20250410210201475](http://47.101.155.205/image-20250410210201475.png)



### Tomcat线程模型

![image-20250410212000843](http://47.101.155.205/image-20250410212000843.png)



`Acceptor`线程接收新连接，注册到`Poller`线程的`Selector`中。

`Poller`线程负责监听Socket事件(通过`Selector`)，检测到就绪事件后封装成Runnable分发给工作线程。

![image-20250410213126229](http://47.101.155.205/image-20250410213126229.png)



## Undertow容器启动过程

