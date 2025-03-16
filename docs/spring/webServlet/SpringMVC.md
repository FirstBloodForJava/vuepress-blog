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