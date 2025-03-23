# SpringMVC

Spring Web MVC是基于Servlet API上构建的原始web框架，一开始就存在与Spring的框架中，是spring-webmvc模块。也被称为Spring MVC。



## 1.DispatcherServlet

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

| HandlerExceptionResolver          | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| SimpleMappingExceptionResolver    | 如果是浏览器请求则渲染渲染页面返回                           |
| DefaultHandlerExceptionResolver   | 解决异常映射对应的http状态码，ResponseEntityExceptionHandler |
| ResponseStatusExceptionResolver   | 使用@ResponseStatus注解响应状态码                            |
| ExceptionHandlerExceptionResolver | 根据@ExceptionHandler注解配置进行异常处理                    |



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



### 模板

org.springframework.ui.context.ThemeSource 接口
org.springframework.web.servlet.ThemeResolver DispatcherServlet寻找themeResolver的bean来解析主题



### 多部分处理Multipart

文件上传处理。

需要使用此功能，需要在Spring中声明一个MultipartResolver bean(名称multipartResolver)。



**Apache文件上传依赖：**

commons-fileupload依赖。

声明一个CommonsMultipartResolver bean(名称multipartResolver)。



**Servlet 3.0：**

1. Servlet注册MultipartConfigElement。
2. 在web.xml配置中，向servlet声明添加multipart-config声明。

~~~java
// ervlet注册MultipartConfigElement 例子
public class AppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {

        // Optionally also set maxFileSize, maxRequestSize, fileSizeThreshold
        registration.setMultipartConfig(new MultipartConfigElement("/tmp"));
    }

}

~~~





是否还需要配置StandardServletMultipartResolver bean？



### 日志

trace日志输出处理映射请求的方法信息：

![image-20250205170007689](http://47.101.155.205/image-20250205170007689.png)



默认情况下，会屏蔽请求参数和请求头参数，显示启用该记录的方法：

~~~java
public class MyInitializer
        extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return ... ;
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return ... ;
    }

    @Override
    protected String[] getServletMappings() {
        return ... ;
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        registration.setInitParameter("enableLoggingRequestDetails", "true");
    }

}

~~~

**SpringBoot应用可通过spring.http.logRequestDetails配置此功能。**



## 2.过滤器

### spring-web提供的



#### FormContentFilter

Servlet的API的ServletRequest.getParameter()方法只支持访问POST请求的表单数据。

该过滤器支持拦截Http PUT、PATCH、DELETE请求，从请求中读取表单数据，并将数据进行包装，能通过ServletRequest.getParameter()方法读取数据。



![image-20250224200540071](http://47.101.155.205/image-20250224200540071.png)





#### FowardedHeaderFilter

[RFC7329](https://tools.ietf.org/html/rfc7239)定义了代理可以使用原始信息的Forwarded请求头，也有其它非标准头：X-Forwarded-Host、X-Forwarded-Port、X-Forwarded-Proto、X-Forwarded-Prefix、X-Forwarded-Ssl。



~~~java
// request HttpServletRequest
// 解析请求中含有代理相关的信息
HttpRequest httpRequest = new ServletServerHttpRequest(request);
UriComponents uriComponents = UriComponentsBuilder.fromHttpRequest(httpRequest).build();

uriComponents.getPort();// 默认端口是-1
uriComponents.getScheme();
uriComponents.getHost();

~~~

![image-20250224205026737](http://47.101.155.205/image-20250224205026737.png)

![image-20250224205207490](http://47.101.155.205/image-20250224205207490.png)

![image-20250224205404179](http://47.101.155.205/image-20250224205404179.png)



#### ShallowEtagHeaderFilter

响应的内容计算MD5 hash后相同，返回304状态码。

可以节约网络带宽，但是不节约CPU。



#### CorsFilter

提供了粒度很细的跨域过滤器配置。



## 3.注解控制

SpringMVC提供了@Controller和@RestController组件来表示请求的映射，其它注解组件处理请求输入、处理异常等。

~~~java
// 方法接收请求入参到Model,并返回一个名为index的视图
@Controller
public class HelloController {

    @GetMapping("/hello")
    public String handle(Model model) {
        model.addAttribute("message", "Hello World!");
        return "index";
    }
}

~~~



### 注册

在Servlet的WebApplicationContext，@Controller(@RestController)注解支持自动注册为Bean，和@Component一样的效果。同样的，被该注解修饰的类，支持@ComponentScan扫描到。

@RestController注解是基于元注解@Controller、@ResponseBody声明的。由于继承了@ResponseBody的功能，声明该类的所有方法返回的内容都写入请求的响应体中，而不是渲染为视图或html文本。



在@Controller的类上，也支持基于类的AOP代理，或实现接口的代理。



### 请求映射

@RequestMapping注解支持将请求映射到controller类的方法，如果没有指定请求方式，则默认匹配所有的请求方式。在@RequestMapping的基础上，定义了更方便的注解(只能在方法上使用)：

1. @GetMapping
2. @PostMapping
3. @PutMapping
4. @DeleteMapping
5. @PatchMapping

@RequestMapping在controller类上使用，表示该类的所有方法共用该路径。



#### uri匹配

uri匹配模式：

SpringMVC使用spring-core的PathMatcher的实现AntPathMatcher来做匹配路径的判断。

| Pattern       | 描述                             | 例子                                                         |
| ------------- | -------------------------------- | ------------------------------------------------------------ |
| ?             | 匹配一个字符                     | path/v?/test匹配path/v1/test                                 |
| *             | 匹配一个路径下的一个或多个字符   | /spring/*/v1匹配/spring/boot/v1，不匹配/spring/boot/starter/v1 |
| **            | 匹配一个或多个字符直到结束       | /**匹配所有                                                  |
| {name}        | 匹配路径上的值并赋值到变量name上 | 使用@PathVariable在方法中取值                                |
| {name:[a-z]+} | 同上，支持正则表达式匹配         |                                                              |

**在uri上面，可以使用${}来读取其它变量(本地、系统、环境、配置)来设置值。**

~~~java
@Controller
@RequestMapping("/owners/{ownerId}")
public class OwnerController {

    // 如果方法还有其它参数,@PathVariable需要指定{}中的名称?
    @GetMapping("/pets/{petId}")
    public Pet findPet(@PathVariable Long ownerId, @PathVariable Long petId) {
        // ...
    }
}

~~~

~~~java
// 正则表达式的匹配只有
@GetMapping("/{name:[a-z-]+}-{version:\\d\\.\\d\\.\\d}{ext:\\.[a-z]+}")
public void handle(@PathVariable String version, @PathVariable String ext) {
    // ...
}

~~~



#### 匹配比较

如果多个通配符模式匹配了一个uri，则会通过AntPathMatcher.getPatternComparator(String path)来找到哪个通配符合适。

/** 模式会最后匹配，不在这个里面。

/pre/**的不如没有双通配符的具体。



#### 后缀匹配

当浏览器发送一些难以解释的Accept的请求头到后台，通过/download/bill返回其需要的内容，显然使用/download/bill.*支持以uri的参数来决定下载文件的内容，使用uri前缀匹配的模式是不错的。

**随着时间的推移，文件扩展名的使用被证明是存在问题的。当URI变量、路径参数和URI编码叠加时，可能导致歧义。**



完全禁用文件扩展名匹配的方式：

1. PathMatchConfigurer.useSuffixPatternMatching(false)；
2. ContentNegotiationConfigurer.favorPathExtension(false)。



#### 后缀匹配和RFD

RFD(reflected file download)反射文件下载攻击和XSS类似，因为它依赖于响应中反映的请求输入（例如，查询参数和 URI 变量）。但是，RFD 攻击不是将 JavaScript 插入 HTML，而是依赖于浏览器切换来执行下载，并在稍后双击时将响应视为可执行脚本。

RFD攻击利用的是反射型下载功能。攻击者诱导用户点击恶意链接，服务器将用户输入反射到响应中，并触发文件下载。如果文件扩展名和内容类型被用户信任，可能导致恶意代码执行。

为了防止 RFD 攻击，在渲染响应正文之前， Spring MVC 会添加一个 **Content-Disposition:inline;filename=f.txt**标头以建议固定且安全的下载文件。仅当 URL 路径包含既未列入白名单也未明确注册内容协商的文件扩展名时，才会执行此作。但是，当 URL 直接输入到浏览器中时，它可能会产生副作用。



#### 请求头Content-Type内容匹配

~~~java
// 要求请求的请求头Content-Type=application/json
// 415 状态码 不支持的请求体类型
// consumes 也支持否定表达式,consumes = "!application/json"除了这个都可以
// consumes 也可以在类上使用,但是类中方法的该配置会覆盖类上的配置
// MediaType 为常用的类型定义了常量
@RequestMapping(value = "/bill.*" , consumes = "application/json")
public String home() {
	return "Hello World!";
}

~~~



![image-20250302134216005](http://47.101.155.205/image-20250302134216005.png)

![image-20250302134313433](http://47.101.155.205/image-20250302134313433.png)



#### 请求头Accept内容匹配

~~~java
// 要求请求的请求头Accept=application/json
// 406状态码 不接受的响应体内容
// produces 也支持否定表达式,produces = "!application/json"除了这个都可以
// produces 也可以在类上使用,但是类中方法的该配置会覆盖类上的配置
@RequestMapping(value = "/bill.*" , produces = "application/json")
public String home() {
	return "Hello World!";
}

~~~

![image-20250302140537644](http://47.101.155.205/image-20250302140537644.png)

![image-20250302141152055](http://47.101.155.205/image-20250302141152055.png)



#### 请求参数和请求头匹配

~~~java
// 请求参数匹配,未匹配提示400错误码
// 在类上使用，方法基础类上的配置
// 也支持否定表达式
@RequestMapping(value = "/bill" , params = "key=value")
public String home() {
	return "Hello World!";
}

~~~

![image-20250302141613528](http://47.101.155.205/image-20250302141613528.png)

![image-20250302141722044](http://47.101.155.205/image-20250302141722044.png)



~~~java
// 请求头参数匹配，不匹配提示404
// 在类上使用，方法基础类上的配置
// 也支持否定表达式
@RequestMapping(value = "/bill" , headers = "key=value")
public String home() {
	return "Hello World!";
}


~~~

![image-20250302141914032](http://47.101.155.205/image-20250302141914032.png)

![image-20250302142115547](http://47.101.155.205/image-20250302142115547.png)



#### HEAD、OPTIONS请求方式

HEAD 请求方式只请求资源的头部信息，而不返回资源的实体内容。

SpringMVC的@GetMapping（@RequestMapping(method=HttpMethod.GET))）默认支持HEAD请求，可以之间不将响应体内容写入，只设置响应体内容的长度到响应头Content-Length。

![image-20250302143146316](http://47.101.155.205/image-20250302143146316.png)



OPTIONS请求获取该uri支持的请求方式，被放在响应头的Allow中。

默认@GetMapping支持：GET,HEAD,OPTIONS。

![image-20250302143502919](http://47.101.155.205/image-20250302143502919.png)

@RequestMapping默认支持所有： GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS

![image-20250302143605453](http://47.101.155.205/image-20250302143605453.png)



#### 自定义注解

~~~java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@RequestMapping(method = RequestMethod.GET, value = "/bill")
@interface BillGEtMapping {}

@BillGEtMapping()
public String home() {
	return "Hello World!";
}

~~~

![image-20250302144321874](http://47.101.155.205/image-20250302144321874.png)



**通过继承RequestMappingHandlerMapping重写getCustomMethodCondition方法可以自定义请求匹配处理逻辑。**



#### 代码注册映射

~~~java
@Configuration
public class MyConfig {

    // 首先要准备UserHandler类，类有一个getUser(Long long)方法，并且注入到容器中
    
    // 在普通方法上注入RequestMappingHandlerMapping和UserHandler对象
    @Autowired
    public void setHandlerMapping(RequestMappingHandlerMapping mapping, UserHandler handler) throws NoSuchMethodException {
        
        RequestMappingInfo.BuilderConfiguration config = new RequestMappingInfo.BuilderConfiguration();
        config.setTrailingSlashMatch(mapping.useTrailingSlashMatch());// 设置当前的尾斜杠匹配，默认是支持尾斜杠匹配
        config.setContentNegotiationManager(mapping.getContentNegotiationManager()); // 设置请求内容匹配管理器
        // 取SpringMVC的路径相关的解析器设置
        if (mapping.getPatternParser() != null) {
            config.setPatternParser(mapping.getPatternParser());
        }else {
            config.setPathMatcher(mapping.getPathMatcher());
        }
        
        // 准备映射请求的元数据，相当于在方法上准备好注释
        // mapping映射支持添加一些配置
		RequestMappingInfo info = RequestMappingInfo
                .paths("/user/{id}").methods(RequestMethod.GET).options(config).build(); 
		
        // 反射获取方法，请求映射到对应的方法用到
        Method method = UserHandler.class.getMethod("getUser", Long.class); 
		
        // RequestMappingHandlerMapping注册 请求映射信息和绑定的方法
        mapping.registerMapping(info, handler, method); 
    }
}

~~~



### 处理请求的方法



#### 方法参数

JDK 8的java.util.Optional属性作为参数等价于@RequestParam的required=false。

下表展示了controller中方法支持的参数：

| 参数类型                                                     | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| WebRequest,NativeWebRequest                                  | 无需Servlet API，直接获取请求的信息                          |
| javax.servlet.ServletRequest, javax.servlet.ServletResponse  | 支持特点的请求或响应类型，ServletRequest, HttpServletRequest、或文件上传(multipart数据)使用MultipartRequest, MultipartHttpServletRequest |
| javax.servlet.http.HttpSession                               | Session会话，永远不会为null，是线程不安全的。                |
| javax.servlet.http.PushBuilder                               | HTTP/2编程创建的API                                          |
| java.security.Principal                                      | 已验证的用户，Principal的实现                                |
| HttpMethod                                                   | 请求的方式                                                   |
| java.util.Locale                                             | 当前请求的区域                                               |
| java.util.TimeZone + java.time.ZoneId                        | 与当前请求关联的时区                                         |
| java.io.InputStream, java.io.Reader                          | 用于访问Servlet API公开原始请求体                            |
| java.io.OutputStream, java.io.Writer                         | 用于访问Servlet API公开原始响应体                            |
| @PathVariable                                                | 访问URI上面的模板变量，{}                                    |
| @MatrixVariable                                              | URI上的矩阵变量匹配                                          |
| @RequestParam                                                | 访问Servlet的请求参数，包括multipart文件                     |
| @RequestHeader                                               | 访问请求头，请求头值转换成声明的参数类型                     |
| @CookieValue                                                 | 访问Cookie，请求头值转换成声明的参数类型                     |
| @RequestBody                                                 | 访问http请求体，通过HttpMessageConverter实现将内容转换成参数类型 |
| HttpEntity\<T\>                                              | 访问请求头和请求体，HttpMessageConverter将body转换成对应泛型 |
| @RequestPart                                                 | 访问请求内容为multipart/form-data的部分，HttpMessageConverter转换内容 |
| java.util.Map, org.springframework.ui.Model, org.springframework.ui.ModelMap | 用于访问在 HTML 控制器中使用并作为视图渲染的一部分向模板公开的模型 |
| RedirectAttributes                                           | 设置重定向                                                   |
| @ModelAttribute                                              | 用于访问模型中应用了数据绑定和验证的现有属性（如果不存在，则实例化） |
| Errors, BindingResult                                        | 访问命令对象的验证和数据绑定错误（即 @ModelAttribute 参数）或@RequestBody验证中的错误，或者 @RequestPart 参数。 |
| SessionStatus + class-level @SessionAttributes               | 用于将表单处理标记为完成                                     |
| UriComponentsBuilder                                         | url请求相关信息                                              |
| @SessionAttribute                                            | 用于访问任何 session 属性                                    |
| @RequestAttribute                                            | 用于访问请求属性                                             |
| Any other argument                                           | 方法参数不与表中前面任何值匹配，并且是简单类型（BeanUtils.isSimpleProperty()确认），则将其解析为@RequestParam，否则解析为@ModelAttribute |
|                                                              |                                                              |



#### 方法返回

**Reactive types 反应式类型，所有方法都支持返回反应式类型。什么意思？Reactive types — Reactor, RxJava**

| 方法返回值                                                   | 描述                                     |
| ------------------------------------------------------------ | ---------------------------------------- |
| @ResponseBody                                                | 方法返回值写入到响应体                   |
| HttpEntity\<B\>, ResponseEntity\<B\>                         | 完整响应头和响应体                       |
| HttpHeaders                                                  | 响应只带响应头，不带响应体               |
| String                                                       | 可能会被解析为视图名称                   |
| View                                                         | View实例                                 |
| java.util.Map, org.springframework.ui.Model                  | 视图                                     |
| @ModelAttribute                                              | 视图                                     |
| ModelAndView                                                 | 视图                                     |
| void                                                         | 两种情况：一种响应体是空，一种默认视图   |
| DeferredResult\<V\>                                          | 异步相关                                 |
| Callable\<V\>                                                | 异步请求相关                             |
| ListenableFuture\<V\>, java.util.concurrent.CompletionStage\<V\>, java.util.concurrent.CompletableFuture\<V\> | DeferredResult替代方案                   |
| ResponseBodyEmitter, SseEmitter                              | 异步发出对象流                           |
| StreamingResponseBody                                        | 异步写入响应流                           |
| ReactiveAdapterRegistry                                      | 流式处理                                 |
| Any other return value                                       | 前面的不匹配，为String或void则相当于视图 |



#### 矩阵变量(Matrix Variables)

[RFC 3968](https://datatracker.ietf.org/doc/html/rfc3986#section-3.3)

矩阵变量可以出现在任意路径段中，每个变量通过";"分割，多个值用","分割（也可以通过重复变量名称来指定）。

例子：/cars;color=red,green;year=2012 <==>/cars;olor=red;color=green;color=blue



![image-20250302202815819](http://47.101.155.205/image-20250302202815819.png)

~~~java
@RestController
public class MvcController {

    private static final Log log = LogFactory.getLog(MvcController.class);

    // GET /pets/42;q=11;r=22
    @GetMapping("/pets/{petId}")
    public void findPet(@PathVariable String petId, @MatrixVariable int q) {

        // petId == 42
        // q == 11
    }

    // GET /owners/42;q=11/pets/21;q=22
    @GetMapping("/owners/{ownerId}/pets/{petId}")
    public void findPet(
            @MatrixVariable(name="q", pathVar="ownerId") int q1,
            @MatrixVariable(name="q", pathVar="petId") int q2) {

        // q1 == 11
        // q2 == 22
    }

    // GET /pets/42
    @GetMapping("/pets2/{petId}")
    public void findPet(@MatrixVariable(required=false, defaultValue="1") int q) {

        // q == 1
    }

    // GET /owners/42;q=11;r=12/pets/21;q=22;s=23
    @GetMapping("/owners2/{ownerId}/pets/{petId}")
    public void findPet(
            @MatrixVariable MultiValueMap<String, String> matrixVars,
            @MatrixVariable(pathVar="petId") MultiValueMap<String, String> petMatrixVars) {

        // matrixVars: ["q" : [11,22], "r" : 12, "s" : 23]
        // petMatrixVars: ["q" : 22, "s" : 23]
    }
}

~~~



#### @RequestParam

@RequestParam注解绑定Servlet请求参数（查询参数或form表单数据）。



~~~java
// 作用于普通类型，属性就是对应的参数名
@RequestParam String k2;

// 作用map没有使用名称，则所有参数都包装在map中
@RequestParam Map<String,String> map;
@RequestParam MultiValueMap<String, String> map;

// required=false表示非必填，也可以通过java.util.Optional使用

~~~



#### @RequestHeader

~~~md
Host                    localhost:8080
Accept                  text/html,application/xhtml+xml,application/xml;q=0.9
Accept-Language         fr,en-gb;q=0.7,en;q=0.3
Accept-Encoding         gzip,deflate
Accept-Charset          ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive              300

~~~



~~~java
// 使用controller的方法接收请求头的值
// 注解作用于Map<String, String>, MultiValueMap<String, String>,HttpHeaders 自动结束所有头
// 支持将','分割的值转换成String, String[], List<String>
@GetMapping("/demo")
public void handle(
        @RequestHeader("Accept-Encoding") String encoding, 
        @RequestHeader("Keep-Alive") long keepAlive) { 
    //...
}

~~~



#### @CookieValue

绑定请求头Cookie的value的数据。

如：Cookie=JSESSIONID=415A4AC178C59DACE0B2C9CA727CDD84

~~~java
// 获取Cookie中JSESSIONID的值
@GetMapping("/demo")
public void handle(@CookieValue("JSESSIONID") String cookie) { 
    //...
}

~~~



#### @ModelAttribute

将Servlet的请求参数绑定到@ModelAttribute注解的对象，将参数名对应的值映射到@ModelAttribute对象的属性名的值。



~~~java
@PostMapping("/owners/{ownerId}/pets/{petId}/edit")
public String processSubmit(@ModelAttribute Pet pet) { }

~~~



绑定url参数到model

~~~java
@PutMapping("/accounts/{account}")
public String save(@ModelAttribute("account") Account account) {
    // ...
}

~~~



添加数据绑定错误接收对象

~~~java
@PostMapping("/owners/{ownerId}/pets/{petId}/edit")
public String processSubmit(@ModelAttribute("pet") Pet pet, BindingResult result) { 
    if (result.hasErrors()) {
        return "petForm";
    }
    // ...
}

~~~



model不进行数据绑定

~~~java
@ModelAttribute
public AccountForm setUpForm() {
    return new AccountForm();
}

@ModelAttribute
public Account findAccount(@PathVariable String accountId) {
    return accountRepository.findOne(accountId);
}

@PostMapping("update")
public String update(@Valid AccountForm form, BindingResult result,
        @ModelAttribute(binding=false) Account account) { 
    // account对象不进行数据绑定
}

~~~



添加@Valid或@Validated注解实现绑定后的数据校验

~~~java
@PostMapping("/owners/{ownerId}/pets/{petId}/edit")
public String processSubmit(@Valid @ModelAttribute("pet") Pet pet, BindingResult result) { 
    if (result.hasErrors()) {
        return "petForm";
    }
    // ...
}

~~~



#### @SessionAttribute

访问会话属性，例如在controller之外的Filter设置的，可以通过@SessionAttribute快速访问。

需要删除或添加会话属性，添加`org.springframework.web.context.request.WebRequest` or `javax.servlet.http.HttpSession`。

~~~java
@RequestMapping("/")
public String handle(@SessionAttribute User user) { 
    // ...
}

~~~



#### @RequestAttribute

访问请求属性，例如在controller之外的Filter或HandlerInterceptor设置的，可以通过@RequestAttribute快速访问。



~~~java
@GetMapping("/")
public String handle(@RequestAttribute Client client) { 
    // ...
}

~~~



#### 重定向




~~~java
@PostMapping("/files/{path}")
public String upload(...) {
    // ...
    return "redirect:files/{path}";
}

~~~



#### Flash属性

Flash 属性为一个请求提供了一种存储属性的方法，这些属性旨在用于另一个请求。这在重定向时最常用 — 例如，Post-Redirect-Get 模式。Flash 属性在重定向之前临时保存（通常在会话中），以便在重定向后可供请求使用，并立即删除。

Spring MVC 有两个主要的抽象来支持 flash 属性。`FlashMap` 用于保存 Flash 属性，而 `FlashMapManager` 用于存储、检索和管理 `FlashMap` 实例。

Flash 属性支持始终处于“打开”状态，不需要显式启用。但是，如果不使用，则永远不会导致 HTTP 会话创建。在每个请求中，都有一个“输入”`FlashMap`，其中包含从前一个请求传递的属性（如果有）和一个“输出”`FlashMap`，其中包含要保存以供后续请求使用的属性。`FlashMap` 实例可以通过 `RequestContextUtils 的 Utils` 请求。



flash 属性的概念存在于许多其他 Web 框架中，并且已被证明有时会面临并发问题。这是因为，根据定义，flash 属性将被存储到下一个请求。但是，非常“下一个”请求可能不是预期的接收者，而是另一个异步请求（例如，轮询或资源请求），在这种情况下，flash 属性被**过早删除**。

为了减少此类问题的可能性，`RedirectView` 会自动 “stamps” `FlashMap` 实例，其中包含目标重定向 URL 的 path 和 query 参数。反过来，默认的 `FlashMapManager` 在查找“输入”`FlashMap` 时将该信息与传入请求进行匹配。

这并不能完全消除并发问题的可能性，但会使用重定向 URL 中已有的信息大大减少并发问题。因此，我们建议您主要将 flash 属性用于重定向方案。



#### Multipart

在MultipartResolver功能开启后，POST请求的请求头内容为`multipart/form-data`，可以将请求参数解析的controller的方法：

~~~java
@Controller
public class FileUploadController {

    // 解析普通字段和文件
    @PostMapping("/form")
    public String handleFormUpload(@RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            // 二进制文件
            return "redirect:uploadSuccess";
        }
        return "redirect:uploadFailure";
    }
    // 声明为List<MultipartFile> 类型，可以解析多个文件
    // 其它使用方式和@RequestParam注解类似
}

~~~



**@RequestPart注解获取文件部分**

~~~java
// 不清楚作用在 MetaData 属性上有什么作用
@PostMapping("/")
public String handle(@RequestPart("meta-data") MetaData metadata,
        @RequestPart("file-data") MultipartFile file) {
    // ...
}

~~~



#### @RequestBody

通过@RequestBody注解来读取请求正文并通过HttpMessageConverter其反序列化到一个对象。

MVC也对外开放了配置或自定义反序列化的方式。

可以通过绑定javax.validation.Valid或Spring的Validated注解来校验参数，默认会抛出MethodArgumentNotValidException异常，返回400的状态码结果。也可以通过Errors或BindingResult参数接收校验结果。

~~~java
@PostMapping("/accounts")
public void handle(@RequestBody Account account) {
    // ...
}

~~~



#### HttpEntity

作用和@RequestBody大致相同，但是这个包含了请求头和请求头。

~~~java
@PostMapping("/accounts")
public void handle(HttpEntity<Account> entity) {
    // ...
}

~~~



#### @ResponseBody

@ResponseBody作用在方法上，通过HttpMessageConverter将内容序列化到响应体中。

@ResponseBody也可以作用域Controller类上，表示所有方法都继承这个效果。@RestController是基于元注解@Controller和@ResponseBody的注解。

MVC也对外开放了配置或自定义序列化的方式。



~~~java
@GetMapping("/accounts/{id}")
@ResponseBody
public Account handle() {
    // ...
}

~~~



#### ResponseEntity

与@ResponseBody注解作用很像，多了响应状态和响应头

~~~java
@GetMapping("/something")
public ResponseEntity<String> handle() {
    String body = ... ;
    String etag = ... ;
    return ResponseEntity.ok().eTag(etag).build(body);
}

~~~



#### Jackson JSON

Jackson通过方法名来序列化和反序列化对象。

~~~java
@RestController
public class UserController {

    // 指定只序列化带有User.WithoutPasswordView.class注解的方法属性
    @GetMapping("/user")
    @JsonView(User.WithoutPasswordView.class)
    public User getUser() {
        return new User("eric", "7!jd#h23");
    }
}

public class User {

    public interface WithoutPasswordView {};
    public interface WithPasswordView extends WithoutPasswordView {};

    private String username;
    private String password;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @JsonView(WithoutPasswordView.class)
    public String getUsername() {
        return this.username;
    }

    @JsonView(WithPasswordView.class)
    public String getPassword() {
        return this.password;
    }
}

~~~



~~~java
@Controller
public class UserController extends AbstractController {

    // 在视图中添加user属性，使用Jackson的视图序列化这个对象
    @GetMapping("/user")
    public String getUser(Model model) {
        model.addAttribute("user", new User("eric", "7!jd#h23"));
        model.addAttribute(JsonView.class.getName(), User.WithoutPasswordView.class);
        return "userView";
    }
}

~~~



### Model

使用@ModelAttribute注解的场景：

1. 在@RequestMapping注解的方法参数上创建或访问来自Model的对象，并通过WebDataBinder将其绑定到请求上。
2. 作用@Controller或@ControllerAdvice类中的方法上，在@RequestMapping方法调用之前初始化Model。
3. 在@RequestMapping方法上，标注其方法值是Model的属性（这种情况现在很少使用）。



1. ~~~java
   
   
   ~~~

2. ~~~java
   @ModelAttribute
   public void populateModel(@RequestParam String number, Model model) {
       model.addAttribute(accountRepository.findAccount(number));
       
   }
   
   // 和上面作用相同，自动添加到Model中
   @ModelAttribute
   public Account addAccount(@RequestParam String number) {
       return accountRepository.findAccount(number);
   }
   
   ~~~

3. ~~~java
   @GetMapping("/accounts/{id}")
   @ModelAttribute("myAccount")
   public Account handle() {
       // ...
       return account;
   }
   
   ~~~



### DataBinder

@Controller或@ControllerAdvice类可以指定@InitBinder方法初始化WebDataBinder对象，可以实现以下作用：

1. 将请求参数（表单或请求体）绑定到Model对象。
2. 将基于String类型的请求值（请求参数、路径参数、请求头、Cookie等）转换成controller方法参数的目标类型。
3. 在渲染为html表单时，将Model对象的值转换成String。

@InitBinder可以注册特定于controller级别的`java.bean.PropertyEditor`或Spring的`Converter `和`Formatter `组件。也可以通过MVC在全局共享的`FormattingConversionService`中注册`Converter`和`Formatter`。



**@InitBinder方法支持和@RequestMapping方法相同的参数，除了@ModelAttribute参数。通常是使用WebDataBinder参数用于注册，返回void。**

~~~java
@Controller
public class FormController {

    @InitBinder 
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        // 解析格式的配置，是否支持宽松的日期格式解析
        dateFormat.setLenient(false);
        // 指定的Date类型注册解析器
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
        
        // 添加一个全局使用的自定义的格式化解析器(org.springframework.format.Formatter)
        binder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
    }

}

~~~



### Exceptions

@Controller或@ControllerAdvice类可以声明@ExceptionHandler的方法处理来自controller方法的异常。

~~~java
@Controller
public class SimpleController {

    

    @ExceptionHandler
    public ResponseEntity<String> handle(IOException ex) {
        // 可以处理来自这个controller映射方法的 IOException 异常，也能处理cause异常时IOException的异常
    }
    
    @ExceptionHandler({FileSystemException.class, RemoteException.class})
	public ResponseEntity<String> handle(IOException ex) {
    	// 缩小捕获的异常类型，使用 IOException 异常接收
	}
    
    @ExceptionHandler({FileSystemException.class, RemoteException.class})
	public ResponseEntity<String> handle(Exception ex) {
    	// 缩小捕获的异常类型，使用 Exception 异常接收
	}
}

~~~

@ExceptionHandler支持处理异常是建立在DispatcherServlet的SpringMVC，

HandlerExceptionResolver处理机制。



**@ExceptionHandler方法支持的参数**

| 方法参数                                                     | 作用                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| 异常类型                                                     | 接收抛出的异常对象                                          |
| HandlerMethod                                                | 导致异常的controller的方法                                  |
| WebRequest, NativeWebRequest                                 | 不通过Servlet API对请求内容的访问                           |
| javax.servlet.ServletRequest, javax.servlet.ServletResponse  | 可以选择特定实现类型接收请求或响应对象                      |
| javax.servlet.http.HttpSession                               | 请求会话，不是线程安全的。                                  |
| java.security.Principal                                      | 已验证的用户，Principal的实现类                             |
| HttpMethod                                                   | 请求的请求方式                                              |
| java.util.Locale                                             | 当前请求的区域，配置的LocaleResolver或LocaleContextResolver |
| java.util.TimeZone, java.time.ZoneId                         | 当前请求的时区，由LocaleContextResolver确认                 |
| java.io.OutputStream, java.io.Writer                         | 访问Servlet生成的响应体流                                   |
| java.util.Map, org.springframework.ui.Model, org.springframework.ui.ModelMap | 访问错误响应的模型，总是空                                  |
| RedirectAttributes                                           | 指定重定向下的属性                                          |
| @SessionAttribute                                            | 请求session会话                                             |
| @RequestAttribute                                            | 请求属性                                                    |
|                                                              |                                                             |



**@ExceptionHandler方法支持的返回值：**

| 返回值类型                                  | 作用                                              |
| ------------------------------------------- | ------------------------------------------------- |
| @ResponseBody                               | 方法使用注解，返回响应体                          |
| HttpEntity\<B\>, ResponseEntity\<B\>        | 作用和请求的方法中返回的一致                      |
| String                                      | 视图                                              |
| View                                        | View对象                                          |
| java.util.Map, org.springframework.ui.Model |                                                   |
| @ModelAttribute                             |                                                   |
| ModelAndView object                         | 视图                                              |
| void                                        | 可能会返回空的响应结果                            |
| Any other return value                      | 不匹配上面的值，默认情况下，被视为添加到Model属性 |



REST请求通常是在响应中包含详细信息。Spring框架不会自动做到这一点，可以通过全局使用@ControllerAdvice加@ExceptionHandler注解使用ResponseEntity返回值来做到。



**扩展 ResponseEntityExceptionHandler 抽象，可以自定义错误的返回详细信息。**



### Controller Advice

@ExceptionHandler, @InitBinder或@ModelAttribute的注解作用于Controller类的映射方法上，可以通过在@ControllerAdvice或@RestControllerAdvice注解的类上声明它们，而作用于全局的controller 类的方法。



**全局的@InitBinder或@ModelAttribute方法比本类的方法先应用。**

**全局的@ExceptionHandler方法晚于本类的方法应用。**

**默认@ControllerAdvice匹配所有的的请求。可以通过注解的属性限制其匹配的请求。**



~~~java
// 目标是所有带有注解 @RestController 的controller
@ControllerAdvice(annotations = RestController.class)
public class ExampleAdvice1 {}

// 目标是这个包下的所有controller
@ControllerAdvice("org.example.controllers")
public class ExampleAdvice2 {}

// 目标是特定的controller
@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class})
public class ExampleAdvice3 {}

~~~

**注意：这些匹配会在运行时作用，增加太多匹配器会对性能造成影响。**



## 4.Functional接口

SpringMVC包含WebMvc.fn，这是一个轻量级的函数编程模型，其中函数用于路由和处理请求。它是基于注解编程的替代方案，但是其它方面运行在相同的DispatcherServlet上。

在WebMvc.fn中，http请求使用HandlerFunction处理，这个函数接收ServerRequest参数，返回ServerResponse结果，**请求参数和响应结果都是不可变的（实现类的属性是final修饰）**。

![image-20250316162153297](http://47.101.155.205/image-20250316162153297.png)

传入的请求被函数RouterFunction处理，该函数接收一个SerrverRequest，返回一个可选的Optional\<HandlerFunction\>。RouterFunction相当于一个@RequestMapping注解，区别在于Router函数不仅提供数据，还提供行为。

![image-20250316162226427](http://47.101.155.205/image-20250316162226427.png)



~~~java
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.servlet.function.RequestPredicates.*;
import static org.springframework.web.servlet.function.RouterFunctions.route;

PersonRepository repository = new PersonRepository();
PersonHandler handler = new PersonHandler(repository);

// RouterFunctions.route 用于构建Router构造器。
// RouterFunction注册为Bean，则Servlet自动检测到它
RouterFunction<ServerResponse> route = route()
    .GET("/person/{id}", accept(APPLICATION_JSON), handler::getPerson)
    .GET("/person", accept(APPLICATION_JSON), handler::listPeople)
    .POST("/person", handler::createPerson)
    .build();


public class PersonHandler {

    public ServerResponse listPeople(ServerRequest request) {
        // ...
    }

    public ServerResponse createPerson(ServerRequest request) {
        // ...
    }

    public ServerResponse getPerson(ServerRequest request) {
        // ...
    }
}

~~~



### HandlerFunction API

#### ServerRequest

**API：**

~~~java
String string = request.body(String.class);

List<Person> people = request.body(new ParameterizedTypeReference<List<Person>>() {});

MultiValueMap<String, String> params = request.params();

~~~



#### ServerResponse

**API：**

~~~java
// 创建一个状态码200的ServerResponse
ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(person);

// 201 没有响应体
ServerResponse.created(location).build();


~~~





#### HandlerFunction



~~~java
// lambda 表达式
HandlerFunction<ServerResponse> helloWorld =
  request -> ServerResponse.ok().body("Hello World");

~~~



~~~java
// 可以在一个类中封装该表达式的行为，通过对象方法简化
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

public class PersonHandler {

    private final PersonRepository repository;

    public PersonHandler(PersonRepository repository) {
        this.repository = repository;
    }

    public ServerResponse listPeople(ServerRequest request) { 
        List<Person> people = repository.allPeople();
        return ok().contentType(APPLICATION_JSON).body(people);
    }

    public ServerResponse createPerson(ServerRequest request) throws Exception { 
        Person person = request.body(Person.class);
        repository.savePerson(person);
        return ok().build();
    }

    public ServerResponse getPerson(ServerRequest request) { 
        int personId = Integer.parseInt(request.pathVariable("id"));
        Person person = repository.getPerson(personId);
        if (person != null) {
            return ok().contentType(APPLICATION_JSON).body(person))
        }
        else {
            return ServerResponse.notFound().build();
        }
    }

}

~~~



#### Validation

~~~java
public class PersonHandler {

    private final Validator validator = new PersonValidator(); 

    public ServerResponse createPerson(ServerRequest request) {
        Person person = request.body(Person.class);
        validate(person); 
        repository.savePerson(person);
        return ok().build();
    }

    private void validate(Person person) {
        Errors errors = new BeanPropertyBindingResult(person, "person");
        validator.validate(person, errors);
        if (errors.hasErrors()) {
            throw new ServerWebInputException(errors.toString()); 
        }
    }
}

~~~

~~~java
// 自定义的校验器
public class PersonValidator implements Validator {

    /**
     * 只争对Person的校验
     */
    public boolean supports(Class clazz) {
        return Person.class.equals(clazz);
    }

    public void validate(Object obj, Errors e) {
        ValidationUtils.rejectIfEmpty(e, "name", "name.empty");
        Person p = (Person) obj;
        if (p.getAge() < 0) {
            e.rejectValue("age", "negativevalue");
        } else if (p.getAge() > 110) {
            e.rejectValue("age", "too.darn.old");
        }
    }
}

~~~

校验配置介绍：https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/core.html#validation-beanvalidation



### RouterFunction

RouterFunctions.route()提供了流式创建RouterFunction的构造器。

RouterFunctions.route(RequestPredicate, HandlerFunction)提供了一种直接创建RouterFunction的方式，RequestPredicate来判断是否路由到HandlerFunction。



#### Predicates

可以自定义实现RequestPredicate也可以使用RequestPredicates提供的基于请求路径、请求方式、请求内容等判断。

~~~java
//使用RequestPredicates.accept()
RouterFunction<ServerResponse> route = RouterFunctions.route()
    .GET("/hello-world", accept(MediaType.TEXT_PLAIN),
        request -> ServerResponse.ok().body("Hello World")).build();

~~~

RequestPredicate支持多种组合在一起，例如：

1. RequestPredicate.and(RequestPredicate)表示都需要满足；
2. RequestPredicate.or(RequestPredicate)表示匹配任意一个即满足。



其实前面使用的RequestPredicates.GET(String)就是一个RequestPredicates.method()和RequestPredicates.path()的and组合。



#### Routes

Rrouter功能是按顺序匹配的，第一个匹配不上，使用第二个，以此类推。

~~~java
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.servlet.function.RequestPredicates.*;

PersonRepository repository = ...
PersonHandler handler = new PersonHandler(repository);

RouterFunction<ServerResponse> otherRoute = ...

// 创建一个RouterFunction
RouterFunction<ServerResponse> route = route()
    .GET("/person/{id}", accept(APPLICATION_JSON), handler::getPerson) 
    .GET("/person", accept(APPLICATION_JSON), handler::listPeople) 
    .POST("/person", handler::createPerson) 
    .add(otherRoute) 
    .build();

~~~



#### Nested Routes

嵌套路由

~~~java
RouterFunction<ServerResponse> route = route()
    .path("/person", builder -> builder 
        .GET("/{id}", accept(APPLICATION_JSON), handler::getPerson)
        .GET("", accept(APPLICATION_JSON), handler::listPeople)
        .POST("/person", handler::createPerson))
    .build();

// 和上面等价
RouterFunction<ServerResponse> route = route()
    .path("/person", b1 -> b1
        .nest(accept(APPLICATION_JSON), b2 -> b2
            .GET("/{id}", handler::getPerson)
            .GET("", handler::listPeople))
        .POST("/person", handler::createPerson))
    .build();

~~~



### Run In Server

在Spring的Bean中注册RouterFunction Bean。

~~~java
@Configuration
@EnableMvc
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public RouterFunction<?> routerFunctionA() {
        // 声明routerFunctionA bean
    }

    @Bean
    public RouterFunction<?> routerFunctionB() {
        // 声明routerFunctionB bean
    }

    // ...

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 配置消息转换器
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 配置 CORS
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        // 配置视图解析器
    }
}

~~~



### HandlerFunction过滤链

~~~java
RouterFunction<ServerResponse> route = route()
    .path("/person", b1 -> b1
        .nest(accept(APPLICATION_JSON), b2 -> b2
            .GET("/{id}", handler::getPerson)
            .GET("", handler::listPeople)
            .before(request -> ServerRequest.from(request) // 2个请求添加前置处理，会被包装成一个
                .header("X-RequestHeader", "Value")
                .build()))
        .POST("/person", handler::createPerson))
    .after((request, response) -> logResponse(response)) // after应用上面所有的Router
    .build();

~~~

![image-20250316181045209](http://47.101.155.205/image-20250316181045209.png)

Router构建器上的过滤器HandlerFilterFunction方法filter工作原理：接收ServerRequest和HandlerFunction，返回ServerResponse。HandlerFunction表示过滤链中的下一个执行程序。

~~~java
SecurityManager securityManager = ...

RouterFunction<ServerResponse> route = route()
    .path("/person", b1 -> b1
        .nest(accept(APPLICATION_JSON), b2 -> b2
            .GET("/{id}", handler::getPerson)
            .GET("", handler::listPeople))
        .POST("/person", handler::createPerson))
    .filter((request, next) -> {
        // HandlerFunction,这里为true才执行
        if (securityManager.allowAccessTo(request.path())) {
            return next.handle(request);
        }
        else {
            return ServerResponse.status(UNAUTHORIZED).build();
        }
    })
    .build();

~~~



## 5.URI

### UriComponents

使用UriComponentsBuilder构建UriComponents：

~~~java
UriComponents uriComponents = UriComponentsBuilder
        .fromUriString("https://example.com/hotels/{hotel}")  
        .queryParam("q", "{q}")  
        .encode() 
        .build(); 

URI uri = uriComponents.expand("Westin", "123").toUri();
// 和上面等价
URI uri = UriComponentsBuilder
        .fromUriString("https://example.com/hotels/{hotel}")
        .queryParam("q", "{q}")
        .encode()
        .buildAndExpand("Westin", "123")
        .toUri();
// 和上面等价
URI uri = UriComponentsBuilder
        .fromUriString("https://example.com/hotels/{hotel}")
        .queryParam("q", "{q}")
        .build("Westin", "123");
// 和上面等价
URI uri = UriComponentsBuilder
        .fromUriString("https://example.com/hotels/{hotel}?q={q}")
        .build("Westin", "123");

~~~



### UriBuilder

UriComponentsBuilder实现了UriBuilder。可以使用UriBuilderFactory构建UriBuilder。

通过给RestTemplate和WebClient配置自定义的UriBuilderFactory来构建URI。DefaultUriBuilderFactory是UriBuilderFactory的默认实现，内部使用的是UriComponentsBuilder来共享配置。



**RestTemplate配置UriBuilderFactory：**

~~~java
import org.springframework.web.util.DefaultUriBuilderFactory.EncodingMode;

String baseUrl = "https://example.org";
DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(baseUrl);
// 设置编码方式
factory.setEncodingMode(EncodingMode.TEMPLATE_AND_VALUES);

RestTemplate restTemplate = new RestTemplate();
restTemplate.setUriTemplateHandler(factory);

~~~

**WebClient配置UriBuilderFactory：**

~~~java
import org.springframework.web.util.DefaultUriBuilderFactory.EncodingMode;

String baseUrl = "https://example.org";
DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(baseUrl);
factory.setEncodingMode(EncodingMode.TEMPLATE_AND_VALUES);

WebClient client = WebClient.builder().uriBuilderFactory(factory).build();

~~~

**使用DefaultUriBuilderFactory构建URI：**

~~~java
String baseUrl = "https://example.com";
DefaultUriBuilderFactory uriBuilderFactory = new DefaultUriBuilderFactory(baseUrl);

URI uri = uriBuilderFactory.uriString("/hotels/{hotel}")
        .queryParam("q", "{q}")
        .build("Westin", "123");

~~~



### URI编码

UriComponentsBuilder提供了两种编码方式：

1. UriComponentsBuilder.encode()：首先对 URI 模板进行预编码，然后在展开时对 URI 变量进行严格编码。
2. UriComponents.encode()：在 URI 变量展开后对 URI 组件进行编码。

两种模式都会转义八位字节的非ASCII和非法字符。第一个还会转义在URI变量中由保留含义的字符。例如：";"在路径中是合法的，在第1个编码方式中，会被转义为"%3B"。

~~~java
URI uri = UriComponentsBuilder.fromPath("/hotel list/{city}")
        .queryParam("q", "{q}")
        .encode()
        .buildAndExpand("New York", "foo+bar")
        .toUri();
// 结果"/hotel%20list/New%20York?q=foo%2Bbar"
URI uri = UriComponentsBuilder.fromPath("/hotel list/{city}")
        .queryParam("q", "{q}")
        .build("New York", "foo+bar");
URI uri = UriComponentsBuilder.fromPath("/hotel list/{city}?q={q}")
        .build("New York", "foo+bar");

~~~

DefaultUriBuilderFactory使用UriComponentsBuilder来扩展和编码URI模板，提供了几种编码方式：

1. TEMPLATE_AND_VALUES：使用UriComponentsBuilder.encode()。
2. VALUES_ONLY：不编码URI模板，通过UriUtils.encodeUriUriVariables()对URI变量进行严格编码。
3. URI_COMPONENT：使用UriComponents.encode()。
4. NONE：不使用编码。



### ByServletRequest

通过ServletUriComponentsBuilder用当前请求创建URI：

~~~java
// HttpServletRequest request
ServletUriComponentsBuilder ucb = ServletUriComponentsBuilder.fromRequest(request)
        .replaceQueryParam("accountId", "{id}").build()
        .expand("123")
        .encode();

ServletUriComponentsBuilder ucb = ServletUriComponentsBuilder.fromContextPath(request)
        .path("/accounts").build();

~~~



### Controller链接

~~~java
@Controller
@RequestMapping("/hotels/{hotel}")
public class BookingController {

    @GetMapping("/bookings/{booking}")
    public ModelAndView getBooking(@PathVariable Long booking) {
        // ...
    }
}

~~~



~~~java
// 通过controller创建URI
UriComponents uriComponents = MvcUriComponentsBuilder
    .fromMethodName(BookingController.class, "getBooking", 21).buildAndExpand(42);

URI uri = uriComponents.encode().toUri();

// 通过代理创建Controller的URI
UriComponents uriComponents = MvcUriComponentsBuilder
    .fromMethodCall(MvcUriComponentsBuilder.on(BookingController.class).getBooking(21)).buildAndExpand(42);

URI uri = uriComponents.encode().toUri();

~~~



~~~java
// 有上下文 /en的情况
UriComponentsBuilder base = ServletUriComponentsBuilder.fromCurrentContextPath().path("/en");
MvcUriComponentsBuilder builder = MvcUriComponentsBuilder.relativeTo(base);
builder.withMethodCall(on(BookingController.class).getBooking(21)).buildAndExpand(42);

URI uri = uriComponents.encode().toUri();

~~~



### View链接

~~~java
@RequestMapping("/people/{id}/addresses")
public class PersonAddressController {

    @RequestMapping("/{country}")
    public HttpEntity<PersonAddress> getAddress(@PathVariable String country) { 
        //  
    }
}

~~~

~~~jsp
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
...
<a href="${s:mvcUrl('PAC#getAddress').arg(0,'US').buildAndExpand('123')}">Get Address</a>

~~~



## 6.异步请求

SpringMVC集成了Servlet 3.0的异步请求：

1. DeferredResult和Callable作为控制器方法中返回值，并为单个异步返回值提供基本支持。
2. 控制器可以流式传输多个值，包括SSE和原始数据（raw data）。
3. 控制器可以使用响应客户端并返回响应类型来处理响应。



### DeferredResult

~~~java
@GetMapping("/quotes")
@ResponseBody
public DeferredResult<String> quotes() {
    DeferredResult<String> deferredResult = new DeferredResult<String>();
    // 
    return deferredResult;
}

// 其它线程设置结果
deferredResult.setResult(result);

~~~



### Callable

~~~java
@PostMapping
public Callable<String> processUpload(final MultipartFile file) {

    return new Callable<String>() {
        public String call() throws Exception {
            // 线程
            return "someView";
        }
    };
}

~~~





### 处理

Servlet处理异步请求概述：

1. 通过调用request.startAsync()可以将ServletRequest置于异步模式。这样做的效果是Servlet可以退出，但响应保持打开状态，以便后续处理。
2. 调用request.startAsync()返回AsyncContext，可以通过这个控制异步处理。例如，提供了dispatch方法，类似Servlet的转发API，不同的是它允许应用在Servlet容器线程上恢复处理请求。
3. ServletRequest提供对当前DispatcherType的访问，可以使用它区分处理初始请求、异步分派、转发和其它分派类型。



DeferredResult的处理工作原理：

1. controller返回DeferredResult并将其保存在内存中的queue或list中，以便能够访问。
2. SpringMVC调用request.startAsync()。
3. DispatcherServlet和所有配置的过滤器退出请求处理线程，但响应保持打开状态。
4. 应用程序从某个线程设置DeferredResult，SpringMVC将请求分派会Servlet容器。
5. 再次调用DispatcherServlet，并使用异步返回值恢复处理。



Callable的处理工作原理：

1. controller返回一个Callable。
2. SpringMVC调用request.startAsync()，并将Callable提交给TaskExecutor以便在单独的相册运行。
3. DispatcherServlet和所有配置的过滤器退出请求处理线程，但响应保持打开状态。
4. 最终Callable产生结果，SpringMVC将请求分派会Servlet容器以完成处理。
5. 再次调用DispatcherServlet，并使用Callable异步产生的值恢复处理



SpringMVC引入Servlet异步介绍：https://spring.io/blog/2012/05/07/spring-mvc-3-2-preview-introducing-servlet-3-async-support



**异常处理：**当使用DeferredResult时，可以选择是否调用带有异常的setResult或setErrorResult。在这两种情况下，Spring MVC都将请求分派回Servlet容器以完成处理。然后将其视为控制器方法返回给定值或产生给定异常。然后异常经过常规异常处理机制（例如，调用@ExceptionHandler方法）。

当您使用 Callable 时，会出现类似的处理逻辑，主要区别在于结果是从 Callable 返回的，或者它引发了异常。

**拦截：**HandlerInterceptor对象可以是AsyncHandlerInterceptor类型，以接收 afterConcurrentHandlingStarted 启动异步处理的初始请求的 callback（而不是 postHandle 和 afterCompletion）。

HandlerInterceptor实现还可以注册CallableProcessingInterceptor 或 a DeferredResultProcessingInterceptor ，以便更深入地与 异步请求的生命周期（例如，处理超时事件）

DeferredResult 提供 onTimeout（Runnable） 和 onCompletion（Runnable） 回调。Callable 可以替换为 WebAsyncTask，后者公开了超时和完成回调的其他方法。

**与WebFlux对比：**Servlet API 最初是为通过 Filter-Servlet 链进行一次传递而构建的。Servlet 3.0 中添加的异步请求处理允许应用程序退出 Filter-Servlet 链，但使响应保持打开状态以供进一步处理。Spring MVC 异步支持是围绕该机制构建的。当控制器返回 DeferredResult 时，将退出 Filter-Servlet 链，并释放 Servlet 容器线程。稍后，当设置 DeferredResult 时，将进行 ASYNC 调度（到同一 URL），在此期间，控制器将再次映射，但不是调用它，而是使用 DeferredResult 值（就像控制器返回它一样）来恢复处理。

相比之下，Spring WebFlux 既不是基于 Servlet API 构建的，也不需要这样的异步请求处理功能，因为它在设计上是异步的。异步处理内置于所有框架协定中，并且在请求处理的所有阶段都受到内部支持。

从编程模型的角度来看，Spring MVC 和 Spring WebFlux 都支持异步和反应类型作为控制器方法中的返回值。Spring MVC 甚至支持流，包括反应式背压。但是，对响应的单个写入仍然是阻塞的（并且在单独的线程上执行），这与 WebFlux 不同，它依赖于非阻塞 I/O，并且每次写入不需要额外的线程。

另一个根本区别是 Spring MVC 不支持控制器方法参数中的异步或反应类型（例如，@RequestBody、@RequestPart 等），也不明确支持异步和反应类型作为模型属性。Spring WebFlux 确实支持所有这些。



### Http流

可以将DeferredResult 和 Callable 用于单个异步返回值。如何生成多个异步值并将这些值写入响应？



#### Objects

可以使用ResponseBodyEmitter返回值生成对象流，每个对象都使用HttpMessageConverter序列化并写入响应。

~~~java
@GetMapping("/events")
public ResponseBodyEmitter handle() {
    ResponseBodyEmitter emitter = new ResponseBodyEmitter();
    // Save the emitter somewhere..
    return emitter;
}

// In some other thread
emitter.send("Hello once");

// and again later on
emitter.send("Hello again");

// and done at some point
emitter.complete();

~~~

还可以将ResponseBodyEmitter作为ResponseEntity的泛型，从而自定义响应头和状态码。

当emitter抛出 IOException 时（例如，如果远程客户端消失），应用程序不负责清理连接，也不应调用 `emitter.complete`或`emitter.completeWithError`。相反，Servlet 容器会自动启动`AsyncListener`错误通知，其中 Spring MVC调用`completeWithError`。反过来，此调用对应用程序执行最后一次`ASYNC`分派，在此期间 Spring MVC 调用配置的异常解析器并完成请求。



#### SEE

SseEmitter是ResponseBodyEmitter的子类，支持Server-sent Events(https://www.w3.org/TR/eventsource/)。

~~~java
@GetMapping(path="/events", produces=MediaType.TEXT_EVENT_STREAM_VALUE)
public SseEmitter handle() {
    SseEmitter emitter = new SseEmitter();
    // Save the emitter somewhere..
    return emitter;
}

// In some other thread
emitter.send("Hello once");

// and again later on
emitter.send("Hello again");

// and done at some point
emitter.complete();

~~~

虽然 SSE 是流式传输到浏览器的主要选项，但请注意，Internet Explorer(IE)不支持 Server-Sent Events。



#### Raw Data

绕过消息转换并直接流式传输到OutputStream，例如文件下载。使用StreamingResponseBody作为返回值。

将StreamingResponseBody作为ResponseEntity的泛型，从而自定义响应头和状态码。

~~~java
@GetMapping("/download")
public StreamingResponseBody handle() {
    return new StreamingResponseBody() {
        @Override
        public void writeTo(OutputStream outputStream) throws IOException {
            // write...
        }
    };
}

~~~



### Reactive Types

Spring MVC 支持在控制器中使用反应式客户端库。这包括来自 spring-webflux 的 WebClient 和其他对象，例如 Spring Data 反应式数据库。在这种情况下，能够从 controller 方法返回响应式类型很方便。

反应式返回值的处理方式如下：

1. 单值返回，类似使用DeferredResult。例如Mono、Single。
2. 流媒体类型(application/stream+json、ext/event-stream)，类似ResponseBodyEmitter或SseEmitter。例如Flux、Observable。application返回Flux\<ServerSentEvent\>、Observable\<ServerSentEvent\>。
3. 其它媒体类型，例如application/json。类似使用DeferredResult\<List\<?\>\>。



### 断开连接

当远程客户端消失时，Servlet API 不提供任何通知。因此，在流式传输到响应时，无论是通过 SseEmitter 或 reactive 类型，定期发送数据很重要，因为如果客户端断开连接，写入就会失败。发送可以采用空（仅评论）SSE 事件或另一方必须解释为检测信号并忽略的任何其他数据的形式。

或者，考虑使用 Web 消息传递解决方案（例如 STOMP over WebSocket 或 WebSocket with SockJS），它们具有内置的心跳机制。



### 配置

必须在 Servlet 容器级别启用异步请求处理功能。

**Servlet容器：**

Filter 和 Servlet 声明有一个`asyncSupported`标志，需要将其设置为`true`以启用异步请求处理。此外，Filter 映射应声明为ASYNC javax.servlet.DispatchType。

在 Java 配置中，当您使用 AbstractAnnotationConfigDispatcherServletInitializer 初始化 Servlet 容器，此作会自动完成。

在web.xml中，可以添加\<async-supported\>true\</async-supported\>到DispatcherServlet和Filter的声明中，然后添加\<dispatcher\>ASYNC\</dispatcher\>。



**SpringMVC：**

- Java配置：在`WebMvcConfigurer`上使用`configureAsyncSupport`回调。
- XML命名空间：使用\<mvc：annotation-driven\> 下的\<async-support\> 元素。

可以配置以下内容：

1. 异步请求的默认超时值（如果未设置），则取决于底层 Servlet 容器。
2. `AsyncTaskExecut`用于阻塞写流与反应类型和执行可调用的实例从控制器方法返回。如果你使用响应型流或者控制器方法返回Callable，我们强烈建议配置这个属性，因为默认情况下，它是SimpleAsyncTaskExecutor。
3. `DeferredResultProcessingInterceptor`实现和`CallableProcessingInterceptor`实现。



还可以在`DeferredResult`、`ResponseBodyEmitter`和`SseEmitter`上设置默认超时值。对于`Callable`，可以使用`WebAsyncTask`提供超时值。



## 7.CORS

CORS(Cross-Origin Resource Sharing)跨域资源访问。

出于安全，浏览器禁止AJAX调用当前域之外的资源。CORS是一种W3C规范，允许指定的跨域请求访问。而不是通过基于IFRAME或JSONP。

CORS工作原理介绍：https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

浏览器在发送请求之前，会将当前域放在Origin请求头中。SpringMVC通过HandlerMapping实现对CORS的内置支持。通过配置确认哪些请求支持跨域，哪些域被允许等。

支持跨域功能的相关类：

1. CorsConfiguration
2. CorsProcessor、CorsProcessor
3. AbstractHandlerMapping



### @CrossOrigin

@CrossOrigin注解支持在controllerr的方法上使用，表示该请求支持跨域：

~~~java
@RestController
@RequestMapping("/account")
public class AccountController {

    // 
    @CrossOrigin
    @GetMapping("/{id}")
    public Account retrieve(@PathVariable Long id) {
        
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        
    }
}

~~~

默认配置：

1. 支持所有的域跨域；
2. All headers；
3. 所有的请求方式都支持。



`allowedCredentials` 默认不启用，因为它建立了一个信任级别，该信任级别公开了敏感的用户特定信息（例如 cookie 和 CSRF 令牌），并且只应在适当的情况下使用。



@CrossOrigin注解可以在类上使用，表示该controller的所有方法都继承该配置：

~~~java
// maxAge 表示跨域预检响应保存的有效时间,单位秒
@CrossOrigin(origins = "https://domain2.com", maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/{id}")
    public Account retrieve(@PathVariable Long id) {
        
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        
    }
}

~~~



### 全局配置

可以通过CorsConfiguration设置基于URL的全局配置。默认全局配置开启功能：

1. 所有的域允许跨域；
2. All headers；
3. GET、HEAD、POST请求方式；



#### Java配置CORS

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")
            .allowedOrigins("https://domain2.com")
            .allowedMethods("PUT", "DELETE")
            .allowedHeaders("header1", "header2", "header3")
            .exposedHeaders("header1", "header2")
            .allowCredentials(true).maxAge(3600);

        // Add more mappings...
    }
}

~~~



#### XML配置CORS

**需要启动CORS命名空间。**

~~~xml
<mvc:cors>

    <mvc:mapping path="/api/**"
        allowed-origins="https://domain1.com, https://domain2.com"
        allowed-methods="GET, PUT"
        allowed-headers="header1, header2, header3"
        exposed-headers="header1, header2" allow-credentials="true"
        max-age="123" />

    <mvc:mapping path="/resources/**"
        allowed-origins="https://domain1.com" />

</mvc:cors>

~~~



### CORS Filter

可以通过CORS过滤器配置跨域支持。

~~~java
// 跨域的相关配置
CorsConfiguration config = new CorsConfiguration();
config.setAllowCredentials(true);
config.addAllowedOrigin("https://domain1.com");
config.addAllowedHeader("*");
config.addAllowedMethod("*");

UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// url注册允许的跨域配置
source.registerCorsConfiguration("/**", config);

CorsFilter filter = new CorsFilter(source);

~~~



## 8.WebSecurity



## 9.Http缓存

HTTP 缓存可以显著提高 Web 应用程序的性能。HTTP 缓存围绕`Cache-Control`响应标头和随后的条件请求标头（例如`Last-Modified`和`ETag`）展开。`Cache-Control`建议私有（例如浏览器）和公共（例如代理）缓存如何缓存和重用响应。`ETag`标头用于发出条件请求，如果内容未更改，则可能导致没有正文的 304 （`NOT_MODIFIED`）。`ETag`可以看作是`Last-Modified`标头的更复杂的继承者。



### CacheControl

`CacheControl`支持配置与`Cache-Control`请求头相关的设置，并在许多地方被接受为参数：

1. WebContentInterceptor
2. WebContentGenerator
3. Controllers：
4. Static Resources：

Cache-control相关请求头：

~~~java
// 缓存1个小时 - "Cache-Control: max-age=3600"
CacheControl ccCacheOneHour = CacheControl.maxAge(1, TimeUnit.HOURS);

// 阻止缓存 - "Cache-Control: no-store"
CacheControl ccNoStore = CacheControl.noStore();

// 公共和私有缓存保存10天
// 公共缓存不应该改变响应
// "Cache-Control: max-age=864000, public, no-transform"
CacheControl ccCustom = CacheControl.maxAge(10, TimeUnit.DAYS).noTransform().cachePublic();

~~~



### Controllers

controller可以添加对HTTP缓存的显式支持。因为需要先计算资源的`lastModified`或`ETag`值才能和请求头比较，也可以像下面一样，将`ETag`响应头和Cache-Control直接添加到响应中。

~~~java
@GetMapping("/book/{id}")
public ResponseEntity<Book> showBook(@PathVariable Long id) {

    Book book = findBook(id);
    String version = book.getVersion();

    return ResponseEntity
            .ok()
            .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
            .eTag(version) // lastModified is also available
            .body(book);
}

~~~

如果`ETag`和请求头的相比没有变化，则返回一个304(NOT_MODIFIED)的响应，没有响应体。否则， 将`ETag`和`Cache-Control`响应头已添加到响应中。

也可以在controller方法中进行计算

~~~java
@RequestMapping
public String myHandleMethod(WebRequest webRequest, Model model) {

    // 应用程序计算 long eTag    

    // 响应内容没有变化,则返回空
    if (request.checkNotModified(eTag)) {
        return null; 
    }

    // 没有缓存,继续处理请求
    model.addAttribute(...); 
    return "myViewName";
}

~~~

有三种方式比较方式：比较eTag、lastModified、eTag和lastModified对于条件 GET 和 HEAD 请求，您可以将响应设置为 304 （NOT_MODIFIED）。对于条件 POST、PUT 和 DELETE，您可以改为将响应设置为 412 （PRECONDITION_FAILED），以防止并发修改。



### Static Resources



### ETag Filter

使用`ShallowEtagHeaderFilter`过滤器，会节省带宽，但是不会节省CPU。



## 10.视图



### Thymeleaf

Thymeleaf官网介绍：https://www.thymeleaf.org/

Thymelead和Spring整合介绍：https://www.thymeleaf.org/documentation.html

相关Bean：`ServletContextTemplateResolver`、`SpringTemplateEngine`、`ThymeleafViewResolver`



### FreeMarker

Apache FreeMarker官网介绍：https://freemarker.apache.org/

Apache FreeMarker是一个模板引擎，用于生成从HTML到电子邮件和其他任何类型的文本输出。



#### View Configuration

**Java配置：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.freeMarker();
    }

    // 配置 FreeMarker
    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPath("/WEB-INF/freemarker");
        return configurer;
    }
}

~~~

**XML配置：**

~~~xml
<mvc:annotation-driven/>

<mvc:view-resolvers>
    <mvc:freemarker/>
</mvc:view-resolvers>

<!-- 配置 FreeMarker... -->
<mvc:freemarker-configurer>
    <mvc:template-loader-path location="/WEB-INF/freemarker"/>
</mvc:freemarker-configurer>

<!-- 配置等价上面 -->
<bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
    <property name="templateLoaderPath" value="/WEB-INF/freemarker/"/>
</bean>

~~~

**模板需要存储在FreeMarkerConfigurer指定的目录中，例如前面的配置会查找/WEB-INF/freemarker/welcome.ftl模板。**



#### FreeMarker Configuration

配置FreeMarkerConfigurer的freemarkerVariables属性。

~~~xml
<bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
    <property name="templateLoaderPath" value="/WEB-INF/freemarker/"/>
    <property name="freemarkerVariables">
        <map>
            <entry key="xml_escape" value-ref="fmXmlEscape"/>
        </map>
    </property>
</bean>

<bean id="fmXmlEscape" class="freemarker.template.utility.XmlEscape"/>

~~~



#### Form Handling

Spring提供了一个在jsp中使用的标记库，其中包含\<Spring:bind/\>元素。这个元素主要让表单显示来自表单支持对象的值，并显示来自web层或业务层的Validator的验证失败的结果。Spring还支持FreeMarker中的相同功能，并提供了用于生成表单输入元素的额外便利宏。



### Groovy Markup

Groovy Markup模板引擎主要用于生成类XML标记（XML、XHTML、HTML5等），但是您可以使用它生成任何基于文本的内容。Spring框架为使用Spring MVC和Groovy Markup提供了内置集成。

Froovy Markup官网：http://groovy-lang.org/templating.html#_the_markuptemplateengine



#### Configuration

**Java配置：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.groovy();
    }

    // 配置 Groovy Markup Template Engine

    @Bean
    public GroovyMarkupConfigurer groovyMarkupConfigurer() {
        GroovyMarkupConfigurer configurer = new GroovyMarkupConfigurer();
        configurer.setResourceLoaderPath("/WEB-INF/");
        return configurer;
    }
}

~~~

**XML配置：**

~~~xml
<mvc:annotation-driven/>

<mvc:view-resolvers>
    <mvc:groovy/>
</mvc:view-resolvers>

<!-- Configure the Groovy Markup Template Engine... -->
<mvc:groovy-configurer resource-loader-path="/WEB-INF/"/>

~~~



#### Example

与传统的模板引擎不同，Groovy Markup依赖于使用构建器语法的DSL。

~~~groovy
yieldUnescaped '<!DOCTYPE html>'
html(lang:'en') {
    head {
        meta('http-equiv':'"Content-Type" content="text/html; charset=utf-8"')
        title('My page')
    }
    body {
        p('This is an example of HTML contents')
    }
}

~~~



### Script视图

Spring框架有一个内置的集成，可以将Spring MVC与任何可以运行在JSR-223 Java脚本引擎之上的模板库一起使用。我们已经在不同的脚本引擎上测试了以下模板库：

| 脚本库                                                       | 脚本引擎                                              |
| ------------------------------------------------------------ | :---------------------------------------------------- |
| [Handlebars](https://handlebarsjs.com/)                      | [Nashorn](https://openjdk.java.net/projects/nashorn/) |
| [Mustache](https://mustache.github.io/)                      | [Nashorn](https://openjdk.java.net/projects/nashorn/) |
| [React](https://facebook.github.io/react/)                   | [Nashorn](https://openjdk.java.net/projects/nashorn/) |
| [EJS](https://www.embeddedjs.com/)                           | [Nashorn](https://openjdk.java.net/projects/nashorn/) |
| [ERB](https://www.stuartellis.name/articles/erb/)            | [JRuby](https://www.jruby.org/)                       |
| [String templates](https://docs.python.org/2/library/string.html#template-strings) | [Jython](https://www.jython.org/)                     |
| [Kotlin Script templating](https://github.com/sdeleuze/kotlin-script-templating) | [Kotlin](https://kotlinlang.org/)                     |

集成任何其他脚本引擎的基本规则是，它必须实现`ScriptEngine`和`Invocable`接口。

**需要在 Classpath 上具有脚本引擎，其详细信息因脚本引擎而异：**

1. java8 +提供了Nashorn JavaScript引擎。强烈建议使用可用的最新更新版本。
2. JRuby应该作为Ruby支持的依赖项添加。
3. 应该将Jython作为Python支持的依赖项添加。
4. `org.jetbrains.kotlin:kotlin-script-util` dependency and a `META-INF/services/javax.script.ScriptEngineFactory` file containing a `org.jetbrains.kotlin.script.jsr223.KotlinJsr223JvmLocalScriptEngineFactory` line should be added for Kotlin script support. See [this example](https://github.com/sdeleuze/kotlin-script-templating) for more details.



#### Example

**Java配置：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.scriptTemplate();
    }

    @Bean
    public ScriptTemplateConfigurer configurer() {
        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
        configurer.setEngineName("nashorn");
        configurer.setScripts("mustache.js");
        configurer.setRenderObject("Mustache");
        configurer.setRenderFunction("render");
        return configurer;
    }
}

~~~

**XML配置：**

~~~xml
<mvc:annotation-driven/>

<mvc:view-resolvers>
    <mvc:script-template/>
</mvc:view-resolvers>

<mvc:script-template-configurer engine-name="nashorn" render-object="Mustache" render-function="render">
    <mvc:script location="mustache.js"/>
</mvc:script-template-configurer>

~~~

**Controller：**

~~~java
@Controller
public class SampleController {

    @GetMapping("/sample")
    public String test(Model model) {
        model.addAttribute("title", "Sample title");
        model.addAttribute("body", "Sample body");
        return "template";
    }
}

~~~

**Mustache模板：**

~~~html
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <p>{{body}}</p>
    </body>
</html>

~~~



### JSP和JSTL

JSP开发，声明`InternalResourceViewResolver`和`ResourceBundleViewResolver`Bean。

ResourceBundleViewResolver依赖于一个属性文件来定义映射到类和URL的视图名。使用ResourceBundleViewResolver，你可以只使用一个resolver来混合不同类型的视图，如下面的例子所示：

~~~xml
<!-- the ResourceBundleViewResolver -->
<bean id="viewResolver" class="org.springframework.web.servlet.view.ResourceBundleViewResolver">
    <property name="basename" value="views"/>
</bean>

# And a sample properties file is used (views.properties in WEB-INF/classes):
welcome.(class)=org.springframework.web.servlet.view.JstlView
welcome.url=/WEB-INF/jsp/welcome.jsp

productList.(class)=org.springframework.web.servlet.view.JstlView
productList.url=/WEB-INF/jsp/productlist.jsp

~~~

InternalResourceViewResolver也可以用于jsp。作为最佳实践，我们强烈建议将JSP文件放在“WEB-INF”目录下的目录中，这样客户端就无法直接访问。

~~~xml
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>

~~~



### Tiles



### RSS and Atom



### PDF和Excel

Spring 提供了返回 HTML 以外的输出的方法，包括 PDF 和 Excel 电子表格。

为了使用Excel视图，需要添加Apache的POI库。PDF视图，需要使用OpenPDF库。



#### PDF

~~~java
public class PdfWordList extends AbstractPdfView {

    protected void buildPdfDocument(Map<String, Object> model, Document doc, PdfWriter writer,
            HttpServletRequest request, HttpServletResponse response) throws Exception {

        List<String> words = (List<String>) model.get("wordList");
        for (String word : words) {
            doc.add(new Paragraph(word));
        }
    }
}

~~~



#### Excel

从Spring Framework 4.2开始，org.springframework.web.servlet.view.document.AbstractXlsView作为Excel视图的基类提供。它基于Apache POI，具有专门的子类（`AbstractXlsxView`和`AbstractXlsxStreamingView`），取代了过时的AbstractExcelView类。



编程模型类似于AbstractPdfView，使用buildExcelDocument()作为中心模板方法，控制器能够从外部定义（按名称）返回这样的视图，或者从处理程序方法返回视图实例。



### Jackson

`MappingJackson2JsonView`使用Jackson库的`ObjectMapper`将响应内容呈现为JSON。默认情况下，模型映射的全部内容（特定于框架的类除外）都被编码为JSON。对于需要过滤映射内容的情况，您可以使用`modelKeys`属性指定要编码的特定模型属性集。您还可以使用`extractValueFromSingleKeyModel`属性来直接提取和序列化单键模型中的值，而不是作为模型属性的映射。

您可以根据需要使用Jackson提供的注释来定制JSON映射。当您需要进一步控制时，您可以通过ObjectMapper属性注入自定义ObjectMapper，用于需要为特定类型提供自定义JSON序列化器和反序列化器的情况。



`MappingJackson2XmlView`使用Jackson XML扩展的`XmlMapper`将响应内容呈现为XML。如果模型包含多个条目，则应该使用`modelKey`bean属性显式地设置要序列化的对象。如果模型包含单个条目，它将自动序列化。

您可以根据需要使用JAXB或Jackson提供的注释来定制XML映射。当需要进一步控制时，可以通过ObjectMapper属性注入自定义XmlMapper，用于需要为特定类型提供序列化器和反序列化器的自定义XML。



### XML Marshalling

`MarshallingView`使用XML Marshaller（在org.springframework.oxm包中定义）将响应内容呈现为XML。您可以使用MarshallingView实例的`modelKey` bean属性显式地设置要封送的对象。或者，视图遍历所有模型属性并封送出Marshaller支持的第一种类型。



### XSLT Views

`XSLT`是XML的一种转换语言，在web应用程序中作为一种视图技术很流行。如果您的应用程序自然地处理XML，或者您的模型可以很容易地转换为XML，那么XSLT作为视图技术可能是一个不错的选择。下个示例将展示如何生成XML文档作为模型数据，并在Spring Web MVC应用程序中使用XSLT对其进行转换。

这个示例是一个简单的Spring应用程序，它在Controller中创建一个单词列表，并将它们添加到模型映射中。返回映射以及XSLT视图的视图名称。XSLT控制器将单词列表转换为准备进行转换的简单XML文档。

**配置XsltViewResolverBean**

~~~java
@EnableWebMvc
@ComponentScan
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public XsltViewResolver xsltViewResolver() {
        XsltViewResolver viewResolver = new XsltViewResolver();
        viewResolver.setPrefix("/WEB-INF/xsl/");
        viewResolver.setSuffix(".xslt");
        return viewResolver;
    }
}

~~~

**Controller：创建了一个DOM文档并将其添加到Model**

~~~java
@Controller
public class XsltController {

    @RequestMapping("/")
    public String home(Model model) throws Exception {
        Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
        Element root = document.createElement("wordList");

        List<String> words = Arrays.asList("Hello", "Spring", "Framework");
        for (String word : words) {
            Element wordNode = document.createElement("word");
            Text textNode = document.createTextNode(word);
            wordNode.appendChild(textNode);
            root.appendChild(wordNode);
        }

        model.addAttribute("wordList", root);
        return "home";
    }
}

~~~

**home模板文件**

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" omit-xml-declaration="yes"/>

    <xsl:template match="/">
        <html>
            <head><title>Hello!</title></head>
            <body>
                <h1>My First Words</h1>
                <ul>
                    <xsl:apply-templates/>
                </ul>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="word">
        <li><xsl:value-of select="."/></li>
    </xsl:template>

</xsl:stylesheet>

~~~

XSLT模板文件位于 WEB-INF/xsl目录的war文件中，并以 xslt 文件扩展名结尾。



最终结果：

~~~html
<html>
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Hello!</title>
    </head>
    <body>
        <h1>My First Words</h1>
        <ul>
            <li>Hello</li>
            <li>Spring</li>
            <li>Framework</li>
        </ul>
    </body>
</html>

~~~



## 11.MvcConfig

### Enable MvcConfig

~~~java
@Configuration
@EnableWebMvc
public class WebConfig {
}

~~~



~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven/>

</beans>

~~~

启用这个配置，Spring就自动装配了MVC所需的基础Bean类型。



### API Config

**实现WebMvcConfigurer接口配置：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    // Implement configuration methods...
}

~~~



SpringMVC XML协议：https://schema.spring.io/mvc/spring-mvc.xsd



### TypeConversion

默认情况下，会安装各种数字和日期类型的格式化程序，并支持通过`@NumberFormat`和`@DateTimeFormat`在属性上进行自定义。



**自定义格式化和转换方式**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        // ...
    }
}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven conversion-service="conversionService"/>

    <bean id="conversionService"
            class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
        <property name="converters">
            <set>
                <bean class="org.example.MyConverter"/>
            </set>
        </property>
        <property name="formatters">
            <set>
                <bean class="org.example.MyFormatter"/>
                <bean class="org.example.MyAnnotationFormatterFactory"/>
            </set>
        </property>
        <property name="formatterRegistrars">
            <set>
                <bean class="org.example.MyFormatterRegistrar"/>
            </set>
        </property>
    </bean>

</beans>

~~~



默认情况下，Spring MVC在解析和格式化日期值时考虑请求的`Locale`。这适用于将日期表示为带有“input”表单字段的字符串的表单。然而，对于“日期”和“时间”表单字段，浏览器使用HTML规范中定义的固定格式。对于这种情况，日期和时间格式可以自定义如下：

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true);
        registrar.registerFormatters(registry);
    }
}

~~~



### Validation

默认情况下，如果`Bean Validation`存在于`classpath`上（例如，`Hibernate Validator`）， 则 `LocalValidatorFactoryBean`将注册为全局校验器 ，以便与`@Valid`一起使用。 在控制器方法参数上校验 。

**自定义全局Validator方式：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public Validator getValidator() {
        // 
    }
}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven validator="globalValidator"/>

</beans>

~~~



**controller单独注册Validator：**

~~~java
@Controller
public class MyController {

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(new FooValidator());
    }
}

~~~

**如果需要在某处注入`LocalValidatorFactoryBean`，创建一个 bean并用`@Primary`标记它，以避免与 MVC 配置中声明的 bean 发生冲突。**



### Interceptors

**注册拦截器：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LocaleChangeInterceptor());
        registry.addInterceptor(new ThemeChangeInterceptor()).addPathPatterns("/**").excludePathPatterns("/admin/**");
        registry.addInterceptor(new SecurityInterceptor()).addPathPatterns("/secure/*");
    }
}

~~~

~~~xml
<mvc:interceptors>
    <bean class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor"/>
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <mvc:exclude-mapping path="/admin/**"/>
        <bean class="org.springframework.web.servlet.theme.ThemeChangeInterceptor"/>
    </mvc:interceptor>
    <mvc:interceptor>
        <mvc:mapping path="/secure/*"/>
        <bean class="org.example.SecurityInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>

~~~



### Content Types

可以配置SpringMVC如何确认请求的媒体类型，例如，从Accept请求头、URL扩展路径、查询参数等。

默认情况下，首先检查URL路径扩展—将`json、xml、rss和atom`注册为已知扩展（取决于类路径依赖项）。然后检查`Accept`请求头。

如果需要使用基于URL的路径解析，参考前面提到的`后缀匹配`和`后缀匹配RFD`



**下面的配置是设置路径匹配策略：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.mediaType("json", MediaType.APPLICATION_JSON);
        configurer.mediaType("xml", MediaType.APPLICATION_XML);
    }
}

~~~

~~~java
<mvc:annotation-driven content-negotiation-manager="contentNegotiationManager"/>

<bean id="contentNegotiationManager" class="org.springframework.web.accept.ContentNegotiationManagerFactoryBean">
    <property name="mediaTypes">
        <value>
            json=application/json
            xml=application/xml
        </value>
    </property>
</bean>

~~~



### Message Converters

两种方式覆盖默认的HttpMessageConverter：

1. 实现WebMvcConfigurer.configureMessageConverters(..)方法；
2. 实现WebMvcConfigurer.extendMessageConverters(..)方法；



**替换默认的转换方式：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 指定时间转换格式
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder()
                .indentOutput(true)
                .dateFormat(new SimpleDateFormat("yyyy-MM-dd"))
                .modulesToInstall(new ParameterNamesModule());
        // DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES 默认关闭
        // MapperFeature.DEFAULT_VIEW_INCLUSION 默认关闭
        converters.add(new MappingJackson2HttpMessageConverter(builder.build()));
        converters.add(new MappingJackson2XmlHttpMessageConverter(builder.createXmlMapper(true).build()));
    }
}

~~~

~~~xml
<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
            <property name="objectMapper" ref="objectMapper"/>
        </bean>
        <bean class="org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter">
            <property name="objectMapper" ref="xmlMapper"/>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>

<bean id="objectMapper" class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean"
      p:indentOutput="true"
      p:simpleDateFormat="yyyy-MM-dd"
      p:modulesToInstall="com.fasterxml.jackson.module.paramnames.ParameterNamesModule"/>

<bean id="xmlMapper" parent="objectMapper" p:createXmlMapper="true"/>

~~~



classpath检测到以下依赖，自动注册：

| 模块名                     | 地址                                                    | 作用                                              |
| -------------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| jackson-datatype-joda      | https://github.com/FasterXML/jackson-datatype-joda      | 支持Joda-Time类型                                 |
| jackson-datatype-jsr310    | https://github.com/FasterXML/jackson-datatype-jsr310    | 支持Java8的Date和Time API                         |
| jackson-datatype-jdk8      | https://github.com/FasterXML/jackson-datatype-jdk8      | 支持Java8的Optional                               |
| jackson-module-kotlin      | https://github.com/FasterXML/jackson-module-kotlin      | 支持Kotlin类和数据类                              |
| jackson-datatype-money     | https://github.com/zalando/jackson-datatype-money       | 支持javax.money类型(非官方)                       |
| jackson-datatype-hibernate | https://github.com/FasterXML/jackson-datatype-hibernate | 支持Hibernate特定的类型和属性（包括延迟加载方面） |



### View Controllers

这是定义`ParameterizableViewController`的快捷方式，该控制器在调用时会立即转发到视图。您可以在静态情况下使用它，即在视图生成响应之前没有要执行的 Java 控制器逻辑。

**将/请求转发到home视图：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("home");
    }
}

~~~

~~~xml
<mvc:view-controller path="/" view-name="home"/>

~~~

如果@RequestMapping方法被映射到任何HTTP方法的URL，那么视图控制器就不能用来处理相同的URL。这是因为URL与带注释的控制器的匹配被认为是端点所有权的足够强的指示，因此可以向客户端发送405 （METHOD_NOT_ALLOWED请求方式不允许）、415 （UNSUPPORTED_MEDIA_TYPE不支持的媒体类型）或类似的响应。



### View Resolvers

**配置示例通过使用JSP和Jackson作为JSON渲染的默认View ：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.enableContentNegotiation(new MappingJackson2JsonView());
        registry.jsp();
    }
}

~~~

~~~xml
<mvc:view-resolvers>
    <mvc:content-negotiation>
        <mvc:default-views>
            <bean class="org.springframework.web.servlet.view.json.MappingJackson2JsonView"/>
        </mvc:default-views>
    </mvc:content-negotiation>
    <mvc:jsp/>
</mvc:view-resolvers>

~~~



### Static Resources

在下一个示例中，给定一个以/resources开头的请求，相对路径用于查找和提供相对于web应用程序根目录下的`/public`或`/static`下的类路径上的静态资源。这些资源的有效期为一年，以确保最大限度地利用浏览器缓存并减少浏览器发出的HTTP请求。Last-Modified标头也会被求值，如果存在，则返回304状态码。



**配置静态资源映射：**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
            .addResourceLocations("/public", "classpath:/static/")
            .setCachePeriod(31556926);
    }
}

~~~

~~~xml
<mvc:resources mapping="/resources/**"
    location="/public, classpath:/static/"
    cache-period="31556926" />

~~~



**配置VersionResourceResolver，缓存用**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/public/")
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }
}

~~~

~~~xml
<mvc:resources mapping="/resources/**" location="/public/">
    <mvc:resource-chain resource-cache="true">
        <mvc:resolvers>
            <mvc:version-resolver>
                <mvc:content-version-strategy patterns="/**"/>
            </mvc:version-resolver>
        </mvc:resolvers>
    </mvc:resource-chain>
</mvc:resources>

~~~



### Default Servlet

Spring MVC允许将`DispatcherServlet`映射到/（从而覆盖容器默认Servlet的映射），同时仍然允许静态资源请求由容器的默认Servlet处理。它配置了一个`DefaultServletHttpRequestHandler`，其URL映射为/**，相对于其他URL映射具有最低的优先级。

此处理程序将所有请求转发给默认`Servlet`。因此，它必须保持在所有其他URL`HandlerMappings`的最后一个顺序。如果使用\<mvc:annotation-driven>，如果设置了自定义`HandlerMapping`实例，请确保将其order属性设置为低于`DefaultServletHttpRequestHandler`的值，即`Integer.MAX_VALUE`。



~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

~~~

~~~xml
<mvc:default-servlet-handler/>

~~~



覆盖`/`Servlet映射的注意事项是，默认Servlet的`RequestDispatcher`必须按名称而不是按路径检索。`DefaultServletHttpRequestHandler`尝试在启动时自动检测容器的默认Servlet，使用大多数主要Servlet容器（包括Tomcat、Jetty、GlassFish、JBoss、Resin、WebLogic和WebSphere）的已知名称列表。如果默认Servlet已经使用不同的名称自定义配置，或者如果使用不同的Servlet容器而默认Servlet名称未知，则必须显式提供默认Servlet的名称，如下例所示：

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable("myCustomDefaultServlet");
    }
}

~~~

~~~xml
<mvc:default-servlet-handler default-servlet-name="myCustomDefaultServlet"/>

~~~



### Path Matching

**PathMatchConfigurer自定义路径和URL处理**

~~~java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer
            .setUseTrailingSlashMatch(false)
            .setUseRegisteredSuffixPatternMatch(true)
            .setPathMatcher(antPathMatcher())
            .setUrlPathHelper(urlPathHelper())
            .addPathPrefix("/api", HandlerTypePredicate.forAnnotation(RestController.class));
    }

    @Bean
    public UrlPathHelper urlPathHelper() {
        //...
    }

    @Bean
    public PathMatcher antPathMatcher() {
        //...
    }
}

~~~

~~~xml
<mvc:annotation-driven>
    <mvc:path-matching
        trailing-slash="false"
        registered-suffixes-only="true"
        path-helper="pathHelper"
        path-matcher="pathMatcher"/>
</mvc:annotation-driven>

<bean id="pathHelper" class="org.example.app.MyPathHelper"/>
<bean id="pathMatcher" class="org.example.app.MyPathMatcher"/>

~~~



### Advanced Java Config

`@EnableWebMvc`导入DelegatingWebMvcConfiguration，SpringBoot通过自动导入`WebMvcEndpointChildContextConfiguration`使用`@EnableWebMvc`注解，作用：

1. 为SpringMVC应用程序提供默认Spring配置；
2. 检测并委托WebMvcConfigurer实现来定制该配置。



**删除@EnableWebMvc注解，继承DelegatingWebMvcConfiguration自定义配置：**

~~~java
@Configuration
public class WebConfig extends DelegatingWebMvcConfiguration {

}

~~~



### Advanced XML Config

MVC 命名空间没有高级模式。如果你需要在 Bean 上自定义一个属性，否则你无法更改该属性，你可以使用 Spring `ApplicationContext`的`BeanPostProcessor`生命周期钩子，如下例所示：

~~~java
@Component
public class MyPostProcessor implements BeanPostProcessor {

    public Object postProcessBeforeInitialization(Object bean, String name) throws BeansException {
        // ...
    }
}

~~~

要将`MyPostProcessor`声明为Bean，要么在XML中显式声明，要么通过\<component-scan/\> 声明来检测它。





## 12.HTTP/2

需要 Servlet 4 容器来支持 HTTP/2。

https://github.com/spring-projects/spring-framework/wiki/HTTP-2-support



## RestClient



### RestTemplate

`RestTemplate`是执行HTTP请求的同步客户端。它是原始的SpringREST客户端，并在HTTP客户端库上公开了一个简单的模板方法 API。

从5.0开始，RestTemplate处于维护模式，以后只进行小的改动和修复Bug。



### WebClient

`WebClient`是一个非阻塞的反应式客户端，用于执行 HTTP 请求。5.0引入，用于替代RestTemplate。

与RestTemplate相比，WebClient支持以下内容：

1. 非阻塞的IO。
2. Reactive Streams back pressure.
3. 高并发和更少硬件资源(High concurrency with fewer hardware resources.)。
4. 函数式接口。
5. 同步和异步交互。
6. Streaming up to or streaming down from a server.



## 测试



MVC测试：https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/testing.html#spring-mvc-test-framework



## 其它Web框架

1. JSF：https://www.oracle.com/technetwork/java/javaee/javaserverfaces-139869.html
2. Struts：https://struts.apache.org/
3. Tapestry：https://tapestry.apache.org/