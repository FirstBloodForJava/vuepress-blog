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



