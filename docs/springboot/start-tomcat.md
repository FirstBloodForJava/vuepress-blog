# Tomcat



## Tomcat自动配置

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

1. Tomcat
2. Jetty
3. Undertow

导入`ImportBeanDefinitionRegistrar`作用？



#### 2.WebServerFactoryCustomizer

创建`ServletWebServerFactoryCustomizer` Bean，获取ServerProperties(server.)配置类信息。

设计`PropertyMapper`替换了if-else写法，设置工厂的配置。

![image-20250407210032896](http://47.101.155.205/image-20250407210032896.png)



如果是tomcat Servlet，则还创建`TomcatServletWebServerFactoryCustomizer` Bean。

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

1. Web过滤器：`spring.mvc.hiddenmethod.filter.enabled`默认false。将POST请求，在携带`_method`请求参数的情况下，转换http请求方式。
2. 





### 5HttpEncodingAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration



### 6.MultipartAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration



