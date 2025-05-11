
SpringBoot2.1.14.RELEASE版本文档：https://docs.spring.io/spring-boot/docs/2.1.14.RELEASE/reference/html/
Spring
SpringBoot2.1.14.RELEASE版本web开发文档：https://docs.spring.io/spring-boot/docs/2.1.14.RELEASE/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc

SpringBoot2.7.12版本文档：https://docs.spring.io/spring-boot/docs/2.7.12/reference/html/

## SpringMvc

### 默认的首页/

`/`只有配置文件没有配置静态资源访问路径映射或`/`没有配置对应请求时，才能自动访问到resource目录下静态资源文件index.html。
例如：在resources/static/目录下有一个index.html，启动之后，访问ip+端口就能访问这个首页。

![image-20240107212958806](http://47.101.155.205/image-20240107212958806.png)

![image-20240107213044394](http://47.101.155.205/image-20240107213044394.png)

==favicon.ico浏览器请求的小图标功能已关闭，配置不生效了==

### 静态资源访问配置
#### 代码控制
~~~java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * 配置文件的配置和这个都会生效
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/public", "classpath:/static/")
                .setCachePeriod(31556926);
    }
}

~~~

#### 配置文件控制
~~~properties
# 将/statics/**请求映射到静态文件访问路径
spring.mvc.static-path-pattern=/statics/**
# 静态资源文件所在的位置,有默认值
spring.web.resources.static-locations=classpath:/static/

~~~

### 错误处理

####50x处理

#### 404处理

在resources目录error/404.html文件，可以自定义404页面。

对于不同的请求头信息，404的结果会有不同

![image-20240109200505176](http://47.101.155.205/image-20240109200505176.png)

![image-20240109200730163](http://47.101.155.205/image-20240109200730163.png)

#### 全局异常处理

异常处理的return要与被拦截的返回数据一致，才能将真正的结果返回。

~~~java
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final Log log = LogFactory.getLog(this.getClass());

    @ExceptionHandler(Exception.class)
    @ResponseBody
    ReturnInfo handleControllerException(HttpServletRequest request, Throwable ex) {

        HttpStatus status = getStatus(request);
        //return new ReturnInfo(status.value(), ex.getMessage());
        log.error(status.value(),ex);
        return ReturnInfo.buildErrorInfo(ex.getMessage());
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }
}

~~~



### Json序列化和反序列化

```yml
spring.mvc.message-codes-resolver-format=postfix_error_code
```



### 模板引擎

SpringMvc支持多种模板引擎，以实现前后端不分离
FreeMarker：https://freemarker.apache.org/docs/
Groovy：https://docs.groovy-lang.org/docs/next/html/documentation/template-engines.html#_the_markuptemplateengine
Thymeleaf：https://www.thymeleaf.org/
Mustache：https://mustache.github.io/
如果有使用模板引擎，系统则自动从src/main/resources/templates目录读取模板。



### CORS支持

~~~java
@Configuration
public class MyConfiguration {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**");
			}
		};
	}
}

~~~

或者之间在接口上使用[`@CrossOrigin`](https://docs.spring.io/spring/docs/5.1.15.RELEASE/javadoc-api/org/springframework/web/bind/annotation/CrossOrigin.html) 注解。



##SpringWebFlux 

Spring WebFlux 框架是在Spring框架5.0引入的，与SpringMvc不同，它不需要ServletAPI，是完全异步、非阻塞的，通过Reactor项目实现的响应式流规范。

在项目中同时引入：spring-boot-starter-web和spring-boot-starter-webflux，SpringBoot会自动注入SpringMvc。

可以通过SpringApplication.setWebApplicationType(WebApplicationType.REACTIVE)指定以WebFlux模式启动。



~~~java
@RestController
@RequestMapping("/users")
public class MyRestController {

	@GetMapping("/{user}")
	public Mono<User> getUser(@PathVariable Long user) {
		// ...
	}

	@GetMapping("/{user}/customers")
	public Flux<Customer> getUserCustomers(@PathVariable Long user) {
		// ...
	}

	@DeleteMapping("/{user}")
	public Mono<User> deleteUser(@PathVariable Long user) {
		// ...
	}

}

~~~



~~~java
@Configuration
public class RoutingConfiguration {

	@Bean
	public RouterFunction<ServerResponse> monoRouterFunction(UserHandler userHandler) {
		return route(GET("/{user}").and(accept(APPLICATION_JSON)), userHandler::getUser)
				.andRoute(GET("/{user}/customers").and(accept(APPLICATION_JSON)), userHandler::getUserCustomers)
				.andRoute(DELETE("/{user}").and(accept(APPLICATION_JSON)), userHandler::deleteUser);
	}

}

@Component
public class UserHandler {

	public Mono<ServerResponse> getUser(ServerRequest request) {
		// ...
	}

	public Mono<ServerResponse> getUserCustomers(ServerRequest request) {
		// ...
	}

	public Mono<ServerResponse> deleteUser(ServerRequest request) {
		// ...
	}
}

~~~



### 序列化和反序列化

~~~java
import org.springframework.boot.web.codec.CodecCustomizer;

@Configuration
public class MyConfiguration {

	@Bean
	public CodecCustomizer myCodecCustomizer() {
		return codecConfigurer -> {
			// ...
		}
	}

}

~~~





### 静态资源访问

~~~properties
# 映射静态资源请求
spring.webflux.static-path-pattern=/resources/**

# 静态资源位置
spring.resources.static-locations

~~~



### 模板引擎

支持下面三种模板引擎

- [FreeMarker](https://freemarker.apache.org/docs/)
- [Thymeleaf](https://www.thymeleaf.org/)
- [Mustache](https://mustache.github.io/)

模板引擎默认配置的路径是src/main/resources/templates



### 错误处理



### Filter

提供了WebFilter接口用作过滤请求和响应。可以通过实现Ordered或者@Order注解控制过滤器执行的顺序。

![image-20240109205442653](http://47.101.155.205/image-20240109205442653.png)