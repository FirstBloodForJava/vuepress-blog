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





### 3.ErrorMvcAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration



### 4.WebMvcAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration



### 5HttpEncodingAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration



### 6.MultipartAutoConfiguration

org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration



