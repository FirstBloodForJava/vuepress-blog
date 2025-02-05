# SpringMVC

Spring Web MVC是基于Servlet API上构建的原始web框架，一开始就存在与Spring的框架中，是spring-webmvc模块。也被称为Spring MVC。



## DispatcherServlet

和许多其它Web框架一样，Spring MVC是围绕前端控制器模式设计的。在这种模式下，一个中央Servlet，即DispatcherServlet，为待处理的请求提供共享算法，实际工作由可配置的组件执行。

DispatcherServlet与其它Servlet一样，都需要使用Servlet规范声明的Java配置或web.xml配置。



spring mvc的web.xml配置：

~~~xml
<web-app>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/app-context.xml</param-value>
    </context-param>

    <servlet>
        <servlet-name>app</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value></param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>app</servlet-name>
        <url-pattern>/app/*</url-pattern>
    </servlet-mapping>

</web-app>

~~~







### 上下文层次结构



![](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/mvc-context-hierarchy.png)



配置层级WebApplicationContext：

~~~java
public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    // 不配置层级关系getRootConfigClasses返回所有配置,getServletConfigClasses返回null
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { App1Config.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/app1/*" };
    }
}

~~~

xml等效配置：

~~~xml
<web-app>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--不配置层级关系,移除这个配置-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/root-context.xml</param-value>
    </context-param>

    <servlet>
        <servlet-name>app1</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/app1-context.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>app1</servlet-name>
        <url-pattern>/app1/*</url-pattern>
    </servlet-mapping>

</web-app>

~~~



### 特殊的Bean类型

DispatcherServlet委托其特殊的Bean类型处理请求并合适的响应response。这类型的Bean由Spring框架提供的，可以自定义一些操作来扩展或替换它们。



| 类型                                        | 作用                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| HandlerMapping                              | 将请求映射到前处理或后处理的拦截器列表<br />主要实现RequestMappingHandlerMapping()、<br />SimpleUrlHandlerMapping() |
| HandlerAdapter                              | 帮助DispatcherServlet调用映射到请求的应用程序                |
| HandlerExceptionResolver                    | 异常处理策略                                                 |
| ViewResolver                                | 视图                                                         |
| LocaleResolver, <br />LocaleContextResolver | 时区                                                         |
| ThemeResolver                               | 模板引擎解析                                                 |
| MultipartResolver                           | 处理文件上传                                                 |
| FlashMapManager                             | 可用于重定向                                                 |



### MVC配置

DispatcherServlet会在WebApplicationContext中检查这些特有的Bean，如果不存在这些类型，则默认使用spring-webmvc模块中org\springframework\web\servlet目录下的DispatcherServlet.properties文件的配置。

**没有看到MultipartResolver**

![image-20250122201857854](http://47.101.155.205/image-20250122201857854.png)

可以通过Java代码或xml的形式配置所需的bean。

**SpringBoot通过Java配置Spring MVC并提供了许多额外的扩展功能。**



### Servlet配置

在Servlet 3.0+环境中，可以通过编程方式配置Servlet容器作为一种替代方案。例子：

~~~java
import org.springframework.web.WebApplicationInitializer;

public class MyWebApplicationInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) {
        XmlWebApplicationContext appContext = new XmlWebApplicationContext();
        appContext.setConfigLocation("/WEB-INF/spring/dispatcher-config.xml");

        ServletRegistration.Dynamic registration = container.addServlet("dispatcher", new DispatcherServlet(appContext));
        registration.setLoadOnStartup(1);
        registration.addMapping("/");
    }
}

~~~

使用Java配置的方式，继承AbstractAnnotationConfigDispatcherServletInitializer抽象类的例子：

~~~java
public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { MyWebConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}

~~~

基于xml的配置，继承AbstractDispatcherServletInitializer抽象类的例子：

~~~java
public class MyWebAppInitializer extends AbstractDispatcherServletInitializer {

    @Override
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }

    @Override
    protected WebApplicationContext createServletApplicationContext() {
        XmlWebApplicationContext cxt = new XmlWebApplicationContext();
        cxt.setConfigLocation("/WEB-INF/spring/dispatcher-config.xml");
        return cxt;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
    
    // 添加过滤器的方式
    @Override
    protected Filter[] getServletFilters() {
        return new Filter[] {
            new HiddenHttpMethodFilter(), new CharacterEncodingFilter() };
    }
    
    // 重写方法自定义DispatcherServlet
    @Override
    protected FrameworkServlet createDispatcherServlet(WebApplicationContext servletAppContext) {
		return new DispatcherServlet(servletAppContext);
	}
}

~~~



**isAsyncSupported()默认true的作用？**



### 处理

DispatcherServlet处理请求的方式：

1. 会搜索WebApplicationContext并将其作为属性绑定在请求中，以便controller和流程中的其它元素能够使用它。默认绑定到DispatcherServlet.WEB_APPLICATION_CONTEXT_ATTRIBUTE key。
2. LocaleResolver绑定到请求。
3. ThemeResolver绑定到请求。不使用主题可以忽略。
4. 如果添加了MultipartResolver解析，请求将包装在MultipartHttpServletRequest中。
5. 寻找合适的处理程序HandlerAdapter。
6. 如果返回模型，则渲染视图。

**返回last-modification-date作用？**

**实现接口LastModified作用？**



DispatcherServlet支持的初始化参数：

| 参数名                         | 作用                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| contextClass                   | 实现ConfigurableWebApplicationContext<br />的类。默认使用XmlWebApplicationContext |
| contextConfigLocation          | 传递给ConfigurableWebApplicationContext<br />的参数，支持指定多个，','分割 |
| namespace                      | WebApplicationContext的名称，<br />默认[servlet-name]-servlet |
| throwExceptionIfNoHandlerFound | 当找不到请求时，是否抛出异常。默认false。<br />如果找不到请求则返回404 |



### 拦截器

HandlerMapping能处理拦截器，拦截器org.springframework.web.servlet.HandlerInterceptor提供了三种方法支持灵活的拦截。

- preHandle(...)：在HandlerMapping之后，在HandlerAdapter调用handler之前。有返回值，返回true则拦截器链路继续执行；返回false，则中断这个拦截器链的执行。
- postHandle(...)：在HandlerAdapter调用handler之后，在DispatcherServlet渲染视图之前。
- afterCompletion(...)：在请求过程完成之后。



**在使用@ResponseBody和ResponseEntity的方法，postHandle方法作用很小，response已经在postHandle调用之前提交了。**



**拦截器链是怎么设计的？**



### 异常处理

如果在映射请求或请求处理(Controller)发生异常，DispatcherServlet会委托HandlerExceptionResolver bean链处理异常并提供合适的返回。



可用的HandlerExceptionResolver实现：

| HandlerExceptionResolver          | 描述                                      |
| --------------------------------- | ----------------------------------------- |
| SimpleMappingExceptionResolver    | 如果是浏览器请求则渲染渲染页面返回        |
| DefaultHandlerExceptionResolver   | 解决异常映射对应的http状态码              |
| ResponseStatusExceptionResolver   | 使用@ResponseStatus注解响应状态码         |
| ExceptionHandlerExceptionResolver | 根据@ExceptionHandler注解配置进行异常处理 |



**拦截器链：**可以通过实现HandlerExceptionResolver接口来自定义拦截器，order属性可以定义顺序。



**配置错误页面：**

~~~xml
<error-page>
    <location>/error</location>
</error-page>

~~~

~~~java
@RestController
public class ErrorController {

    @RequestMapping(path = "/error")
    public Map<String, Object> handle(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", request.getAttribute("javax.servlet.error.status_code"));
        map.put("reason", request.getAttribute("javax.servlet.error.message"));
        return map;
    }
}

~~~



### 视图解析

ViewResolver接口提供视图名称和实际视图的映射。

View接口对视图进行数据处理(动态渲染)。

| ViewResolver                   | 描述        |
| ------------------------------ | ----------- |
| AbstractCachingViewResolver    | 缓存作用    |
| XmlViewResolver                | xmp配置作用 |
| ResourceBundleViewResolver     | 视图绑定    |
| UrlBasedViewResolver           |             |
| InternalResourceViewResolver   |             |
| FreeMarkerViewResolver         |             |
| ContentNegotiatingViewResolver |             |

支持配置多个视图解析器，可以通过order指定解析链的执行过程。

**重定向：**

1. redirect:/myapp/some/resource：根据当前上下文重定向。
2. redirect:https://myhost.com/some/arbitrary/path：重定向到绝对路径。



请求转发：

1. forward:



**请求头内容匹配：**

可以通过请求头Accept决定这个请求被哪个视图处理。





### 区域

DispatcherServlet处理请求时，会自动查找Locale解析器。



**作用是什么？**





### 多部分处理

文件上传处理。

需要使用此功能，需要在Spring中声明一个MultipartResolver bean(名称multipartResolver)。



**Apache文件上传依赖：**

commons-fileupload依赖。

声明一个CommonsMultipartResolver bean(名称multipartResolver)。



**Servlet 3.0**

