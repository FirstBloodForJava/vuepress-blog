# WebSocket

## 1.介绍

WebSocket协议`RFC 6455`提供了一种标准化的方式，通过一个TCP连接在客户端和服务器之间建立一个全双工、双向的通信通道。它是一种不同于HTTP的TCP协议，但被设计为在HTTP上工作，使用端口80和443，并允许重用现有的防火墙规则。

WebSocket交互以HTTP请求开始，该请求使用 HTTP Upgrade 标头进行升级。

客户端请求：

~~~yaml
GET /spring-websocket-portfolio/portfolio HTTP/1.1
Host: localhost:8080
Upgrade: websocket  Upgrade 头
Connection: Upgrade Upgrade 连接
Sec-WebSocket-Key: Uc9l9TMkWGbHFD2qnFHltg==
Sec-WebSocket-Protocol: v10.stomp, v11.stomp
Sec-WebSocket-Version: 13
Origin: http://localhost:8080

~~~

服务端响应：

~~~yaml
HTTP/1.1 101 Switching Protocols 协议切换
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: 1qVdfYHU9hPOl4JYYNXF623Gzn0=
Sec-WebSocket-Protocol: v10.stomp

~~~

握手成功后，HTTP 升级请求的基础 TCP 套接字将保持打开状态，以便客户端和服务器继续发送和接收消息。

**如果 WebSocket 服务器在 Web 服务器（例如 nginx）后面运行，则可能需要将其配置为将 WebSocket 升级请求传递给 WebSocket 服务器。**



### HTTP和WebSocket

尽管 WebSocket 设计为与 HTTP 兼容并以 HTTP 请求开头，但重要的是要了解这两种协议会导致非常不同的体系结构和应用程序编程模型。

在 HTTP 和 REST 中，应用程序被建模为多个 URL。为了与应用程序交互，客户端以请求-响应样式访问这些 URL。服务器根据 HTTP URL、方法和标头将请求路由到相应的处理程序。

相比之下，在 WebSocket中，初始连接通常只有一个 URL。随后，所有应用程序消息都在同一 TCP 连接上流动。这指向了一个完全不同的异步、事件驱动的消息传递架构。

WebSocket 也是一种低级传输协议，与 HTTP 不同，它不对消息内容规定任何语义。这意味着除非客户端和服务器在消息语义上达成一致，否则无法路由或处理消息。

WebSocket客户端和服务器可以通过 HTTP 握手请求上的`Sec-WebSocket-Protocol`标头协商使用更高级别的消息传递协议（例如 STOMP）。如果没有这些，他们需要提出自己的惯例。



### 什么情况使用WebSocket

WebSockets 可以使网页具有动态和交互性。但是，在许多情况下，Ajax 和 HTTP 流式处理或长轮询的组合可以提供简单有效的解决方案。

例如，新闻、邮件和社交源需要动态更新，但每隔几分钟更新一次可能完全没问题。另一方面，协作、游戏和金融应用程序需要更接近实时。

延迟本身并不是决定因素。如果消息量相对较小（例如，监视网络故障），则 HTTP 流式处理或轮询可以提供有效的解决方案。低延迟、高频率和高容量的组合构成了使用 WebSocket 的最佳案例。

在Internet上，超出您控制范围的限制性代理可能会阻止WebSocket交互，因为它们没有配置为传递升级头，或者因为它们关闭了看起来空闲的长时间连接。这意味着在防火墙内部应用程序中使用WebSocket比在面向公众的应用程序中使用WebSocket更直接。



## 2.API



### WebSocketHandler

创建WebSocket服务器就像实现`WebSocketHandler`一样简单，WebSocketHandler的扩展有`TextWebSocketHandler`、`BinaryWebSocketHandler`。

~~~java
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;

public class MyHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // ...
    }

}

~~~

**将创建的`WebSocketHandler`注册，映射到特定的URL：**

~~~java
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler");
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:handlers>
        <websocket:mapping path="/myHandler" handler="myHandler"/>
    </websocket:handlers>

    <bean id="myHandler" class="org.springframework.samples.MyHandler"/>

</beans>

~~~

当直接或间接使用WebSocketHandler API时，例如通过STOMP消息传递，应用程序必须同步消息的发送，因为底层标准WebSocket会话（JSR-356）不允许并发发送。一种选择是用ConcurrentWebSocketSessionDecorator包装WebSocketSession。



### WebSocket Handshake

自定义初始 HTTP WebSocket 握手请求的最简单方法是通过`HandshakeInterceptor`，它公开了握手“之前”和“之后”的方法。你可以使用这样的拦截器来排除握手或使任何属性对 WebSocketSession 可用。



~~~java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new MyHandler(), "/myHandler")
            .addInterceptors(new HttpSessionHandshakeInterceptor());
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:handlers>
        <websocket:mapping path="/myHandler" handler="myHandler"/>
        <websocket:handshake-interceptors>
            <bean class="org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor"/>
        </websocket:handshake-interceptors>
    </websocket:handlers>

    <bean id="myHandler" class="org.springframework.samples.MyHandler"/>

</beans>

~~~

一个更高级的选择是扩展`DefaultHandshakeHandler`，它执行WebSocket握手的步骤，包括验证客户端来源、协商子协议和其他细节。如果应用程序需要配置自定义`RequestUpgradeStrategy`以适应尚未支持的WebSocket服务器引擎和版本，则可能需要使用此选项（有关此主题的更多信息，请参阅Deployment）。

Spring提供了一个`WebSocketHandlerDecorator`基类，你可以用它来用额外的行为装饰`WebSocketHandler`。当使用WebSocket Java配置或XML名称空间时，默认情况下会提供和添加日志记录和异常处理实现。`ExceptionWebSocketHandlerDecorator`捕获任何`WebSocketHandler`方法产生的所有未捕获的异常，并以状态`1011`关闭WebSocket会话，这表示服务器错误。



### Deployment

Spring WebSocket API很容易集成到Spring MVC应用程序中，其中`DispatcherServlet`同时服务HTTP WebSocket握手和其他HTTP请求。通过调用WebSocketHttpRequestHandler，也很容易集成到其他HTTP处理场景中。这样既方便又容易理解。但是，对于JSR-356运行时有一些特殊的考虑。

Java WebSocket API （JSR-356）提供两种部署机制。第一个涉及在启动时进行Servlet容器类路径扫描（Servlet 3的一个特性）。另一个是在Servlet容器初始化时使用的注册API。这两种机制都不可能为所有HTTP处理（包括WebSocket握手和所有其他HTTP请求）使用单个“前端控制器”，比如Spring MVC的DispatcherServlet。

这是JSR-356的一个重要限制，Spring的WebSocket支持通过特定于服务器的`RequestUpgradeStrategy`实现来解决这个问题，即使在JSR-356运行时中运行也是如此。这样的策略目前存在于Tomcat、Jetty、GlassFish、WebLogic、WebSphere和Undertow（以及WildFly）中。



第二个需要考虑的问题是，支持JSR-356的Servlet容器可能会执行`ServletContainerInitializer` （SCI）扫描，这可能会减慢应用程序的启动速度——在某些情况下，速度会非常慢。如果在升级到支持JSR-356的Servlet容器版本后观察到明显的影响，那么应该可以通过使用web.xml中的\<absolutely-ordering /\>元素来选择性地启用或禁用web片段（和SCI扫描），如下例所示：

~~~xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://java.sun.com/xml/ns/javaee
        https://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
    version="3.0">

    <absolute-ordering/>

</web-app>

~~~

然后，你可以通过名称选择性地启用web片段，比如Spring自己的`SpringServletContainerInitializer`，它提供了对Servlet 3 Java初始化API的支持。下面的例子展示了如何这样做：

~~~xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://java.sun.com/xml/ns/javaee
        https://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
    version="3.0">

    <absolute-ordering>
        <name>spring_web</name>
    </absolute-ordering>

</web-app>

~~~



### Server Configuration

每个底层 WebSocket 引擎都公开了控制运行时特征的配置属性，例如消息缓冲区大小、空闲超时等。

对于 Tomcat、WildFly 和 GlassFish，可以将添加到`ServletServerContainerFactoryBean`到WebSocket Java 配置中：

~~~java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <bean class="org.springframework...ServletServerContainerFactoryBean">
        <property name="maxTextMessageBufferSize" value="8192"/>
        <property name="maxBinaryMessageBufferSize" value="8192"/>
    </bean>

</beans>

~~~

**对于客户端WebSocket配置，可以使用WebSocketContainerFactoryBean(XML)或ContainerProvider.getWebSocketContainer()（Java配置）。**



对于 Jetty，你需要提供一个预配置的 Jetty`WebSocketServerFactory`，并通过你的 WebSocket Java 配置将其插入 Spring的`DefaultHandshakeHandler`。

~~~java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(echoWebSocketHandler(),
            "/echo").setHandshakeHandler(handshakeHandler());
    }

    @Bean
    public DefaultHandshakeHandler handshakeHandler() {

        WebSocketPolicy policy = new WebSocketPolicy(WebSocketBehavior.SERVER);
        policy.setInputBufferSize(8192);
        policy.setIdleTimeout(600000);

        return new DefaultHandshakeHandler(
                new JettyRequestUpgradeStrategy(new WebSocketServerFactory(policy)));
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:handlers>
        <websocket:mapping path="/echo" handler="echoHandler"/>
        <websocket:handshake-handler ref="handshakeHandler"/>
    </websocket:handlers>

    <bean id="handshakeHandler" class="org.springframework...DefaultHandshakeHandler">
        <constructor-arg ref="upgradeStrategy"/>
    </bean>

    <bean id="upgradeStrategy" class="org.springframework...JettyRequestUpgradeStrategy">
        <constructor-arg ref="serverFactory"/>
    </bean>

    <bean id="serverFactory" class="org.eclipse.jetty...WebSocketServerFactory">
        <constructor-arg>
            <bean class="org.eclipse.jetty...WebSocketPolicy">
                <constructor-arg value="SERVER"/>
                <property name="inputBufferSize" value="8092"/>
                <property name="idleTimeout" value="600000"/>
            </bean>
        </constructor-arg>
    </bean>

</beans>

~~~



### Allowed Origins

从 Spring Framework 4.1.5 开始，WebSocket 和 Sockjs 的默认行为是仅接受同源请求。也可以允许所有或指定的源列表。此检查主要针对浏览器客户端设计。没有什么可以阻止其他类型的客户端修改Origin头值。

RFC 6454: The Web Origin Concept：https://tools.ietf.org/html/rfc6454

三种可能的行为是：

1. 只允许同源请求（默认）：在这种模式下，当SockJS被启用时，Iframe HTTP响应头`X-Frame-Options`被设置为`SAMEORIGIN`，并且JSONP传输被禁用，因为它不允许检查请求的来源。因此，当启用该模式时，不支持IE6和IE7。
2. 允许指定的来源列表：每个允许的来源必须以http://或https://.开头在此模式下，当启用SockJS时，IFrame传输将被禁用。因此，当启用该模式时，不支持IE6到IE9。
3. 允许所有原点：要启用此模式，您应该提供`*`作为允许的原点值。在这种模式下，所有传输都是可用的。

**配置 WebSocket 和 Sockjs 允许的源：**

~~~java
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler").setAllowedOrigins("https://mydomain.com");
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:handlers allowed-origins="https://mydomain.com">
        <websocket:mapping path="/myHandler" handler="myHandler" />
    </websocket:handlers>

    <bean id="myHandler" class="org.springframework.samples.MyHandler"/>

</beans>

~~~



## 3.SockJS Fallback

在公共Internet上，不受您控制的限制性代理可能会阻止WebSocket交互，因为它们未配置为传递`Upgrade`标头，或者因为它们关闭了似乎处于空闲状态的长期连接。

这个问题的解决方案是WebSocket模拟——也就是说，先尝试使用WebSocket，然后再使用基于http的技术来模拟WebSocket交互，并公开相同的应用程序级API。

在Servlet栈上，Spring框架为SockJS协议提供服务器（和客户端）支持。



### 介绍

Sockjs 的目标是让应用程序使用 WebSocket API，但在运行时必要时回退到非 WebSocket 替代方案，而无需更改应用程序代码。

Sockjs 包括：

1. [SockJS协议](https://github.com/sockjs/sockjs-protocol)以可执行的[叙述测试](https://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html)的形式定义。
2. [Sockjs JavaScript客户端](https://github.com/sockjs/sockjs-client/)— 用于浏览器的客户端库。
3. SockJS服务器实现，包括Spring框架Spring -websocket模块中的一个。
4. spring-websocket模块中的SockJS Java客户端（4.1版起）。



SockJS是为浏览器而设计的。它使用多种技术来支持各种浏览器版本。有关SockJS传输类型和浏览器的完整列表，请参阅[SockJS客户端](https://github.com/sockjs/sockjs-client/)页面。传输分为三大类：WebSocket、HTTP流和HTTP长轮询。有关这些类别的概述，请参阅这篇博客[文章](https://spring.io/blog/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates/)。

SockJS客户端首先发送GET`/info`从服务器获取基本信息。之后，它必须决定使用哪种运输工具。如果可能的话，使用WebSocket。如果没有，在大多数浏览器中，至少有一个HTTP流选项。如果没有，则使用HTTP（长）轮询。

所有传输请求都具有以下 URL 结构：

~~~md
https://host:port/myApp/myEndpoint/{server-id}/{session-id}/{transport}
~~~

- `{server-id}`对于在集群中路由请求很有用，但不会在其他情况下使用。
- `{session-id}`关联属于 Sockjs 会话的 HTTP 请求。
- `{transport}`表示传输类型（例如`websocket`、`xhr-streaming`等）。

`WebSocket`传输只需要一个 HTTP 请求即可执行 WebSocket 握手。此后的所有消息都在该套接字上交换。

`HTTP传输`需要更多请求。例如，Ajax/XHR 流依赖于一个长时间运行的服务器到客户端消息请求和客户端到服务器消息的其他 HTTP POST 请求。长轮询与此类似，不同之处在于它在每次服务器到客户端发送后结束当前请求。

SockJS添加了最小的消息帧。例如，服务器最初发送字母`o`（“打开”帧），消息作为`a["message1"，"message2"]`（json编码的数组）发送，如果25秒内没有消息流，则发送字母`h`（“心跳”帧）（默认情况下），然后发送字母c（“关闭”帧）关闭会话。

要了解更多信息，请在浏览器中运行一个示例并观察HTTP请求。SockJS客户端允许固定传输列表，因此可以一次查看一个传输。SockJS客户端还提供了一个调试标志，它在浏览器控制台中启用有用的消息。在服务器端，您可以为org.springframework.web.socket启用TRACE日志记录。要了解更多细节，请参阅SockJS协议[叙述测试](https://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html)。



### Enabling SockJS

通过 Java 配置启用 Sockjs

~~~java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler").withSockJS();
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:handlers>
        <websocket:mapping path="/myHandler" handler="myHandler"/>
        <websocket:sockjs/>
    </websocket:handlers>

    <bean id="myHandler" class="org.springframework.samples.MyHandler"/>

</beans>

~~~

前面的示例用于Spring MVC应用程序，应该包含在DispatcherServlet的配置中。然而，Spring的WebSocket和SockJS支持并不依赖于Spring MVC。在`SockJsHttpRequestHandler`的帮助下，集成到其他HTTP服务环境相对简单。

在浏览器端，应用程序可以使用sockjs-client （1.0.x版本）。它模拟W3C WebSocket API，并与服务器通信，以根据其运行的浏览器选择最佳传输选项。请参阅sockjs-client页面和浏览器支持的传输类型列表。客户端还提供了几个配置选项——例如，指定要包含哪些传输。



### IE 8 and 9

如果您确实使用基于iframe的传输，请记住，可以通过将HTTP响应头X-Frame-Options设置为`DENY`、`SAMEORIGIN`或`ALLOW-FROM \<origin\>`来指示浏览器阻止在给定页面上使用iframe。这是用来防止[点击劫持](https://www.owasp.org/index.php/Clickjacking)。



如果您的应用程序添加了 X-Frame-Options 响应标头（应该这样做！ 并依赖于基于 iframe 的传输，您需要将 header 值设置为`SAMEORIGIN`或`ALLOW-FROM\<origin\>`。Spring Sockjs 支持还需要知道 Sockjs 客户端的位置，因为它是从 iframe 加载的。默认情况下，iframe 设置为从 CDN 位置下载 Sockjs 客户端。最好将此选项配置为使用与应用程序相同来源的 URL。

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/portfolio").withSockJS()
                .setClientLibraryUrl("http://localhost:8080/myapp/js/sockjs-client.js");
    }

}

~~~





### Heartbeats

Sockjs 协议要求服务器发送检测信号消息，以防止代理得出连接已挂起的结论。Spring Sockjs 配置有一个名为`heartbeatTime`的属性，你可以使用它来自定义频率。默认情况下，假定在该连接上没有发送其他消息，心跳将在25秒后发送。

当在WebSocket和SockJS上使用STOMP时，如果STOMP客户端和服务器协商交换心跳，SockJS的心跳将被禁用。

Spring SockJS支持还允许您配置`TaskScheduler`来调度心跳任务。任务调度器由线程池提供支持，其默认设置基于可用处理器的数量。可以根据需求自定义设置。



### Client Disconnects

HTTP流和HTTP长轮询SockJS传输需要连接保持打开的时间比通常更长。[技术介绍](https://spring.io/blog/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates/)

在Servlet容器中，这是通过Servlet 3异步支持完成的，该支持允许退出Servlet容器线程，处理请求，并继续写入来自另一个线程的响应。

一个特定的问题是Servlet API不为已经离开的客户端提供通知。看到[eclipse-ee4j/servlet api](https://github.com/eclipse-ee4j/servlet-api/issues/44)。但是，Servlet容器在后续尝试写入响应时会引发异常。由于Spring的SockJS服务支持服务器发送的心跳（默认情况下每25秒发送一次），这意味着通常在该时间段内检测到客户端断开连接（或者更早，如果消息发送更频繁）。



因此，网络 I/O 故障可能是因为客户端已断开连接，这可能会用不必要的堆栈跟踪填充日志。Spring 尽最大努力识别代表客户端断开连接（特定于每个服务器）的此类网络故障，并使用专用日志类别（在`AbstractSockJsSession`中定义）记录最少的消息。`DISCONNECTED_CLIENT_LOG_CATEGORY`如果您需要查看堆栈跟踪，可以将该日志类别设置为 TRACE。



### SockJS and CORS

如果允许跨域请求（参考API介绍的允许跨域），SockJS协议将在XHR流和轮询传输中使用CORS进行跨域支持。因此，除非检测到响应中存在CORS标头，否则将自动添加CORS标头。因此，如果应用程序已经配置为提供CORS支持（例如，通过Servlet过滤器），Spring的SockJsService将跳过这一部分。



也可以通过在Spring的SockJsService中设置`suppressCors`属性来禁用添加这些CORS头。



SockJS需要以Header和值：

1. Access-Control-Allow-Origin：初始值来自`Origin`请求头。
2. Access-Control-Allow-Credentials：总是true。
3. Access-Control-Request-Headers：Initialized from values from the equivalent request header.
4. Access-Control-Allow-Methods：传输支持的HTTP方法（`TransportType`enum）。
5. Access-Control-Max-Age：设置31536000(1年)。

要了解确切的实现，请看`AbstractSockJsService`中的`addCorsHeaders`和源代码中的`TransportType`enum。

或者，如果CORS配置允许，可以考虑排除带有SockJS端点前缀的url，从而让Spring的`SockJsService`处理它。



### SockJsClient

Spring提供了一个SockJS Java客户端，可以在不使用浏览器的情况下连接到远程SockJS端点。当需要通过公共网络在两台服务器之间进行双向通信时（也就是说，网络代理可以排除使用WebSocket协议），这一点尤其有用。SockJS Java客户端对于测试目的也非常有用（例如，模拟大量并发用户）。

SockJS Java客户端支持`websocket`、`xhr-streaming`和`xhr-polling`传输。其余的只有在浏览器中使用才有意义。

配置`WebSocketTransport`：

- `StandardWebSocketClient` in a JSR-356 runtime.
- `JettyWebSocketClient` by using the Jetty 9+ native WebSocket API.
- Spring的`WebSocketClient`实现

根据定义，`XhrTransport`既支持`xhr-streaming`，也支持`xhr-polling`，因为从客户端角度来看，除了用于连接到服务器的URL不同之外，两者没有区别。目前有两种实现方式：

- `RestTemplateXhrTransport`使用 Spring的`RestTemplate`来处理 HTTP 请求。
- `JettyXhrTransport`使用Jetty的`HttpClient`处理 HTTP 请求。

**创建Socket客户端连接到Socket端点：**

~~~java
List<Transport> transports = new ArrayList<>(2);
transports.add(new WebSocketTransport(new StandardWebSocketClient()));
transports.add(new RestTemplateXhrTransport());

SockJsClient sockJsClient = new SockJsClient(transports);
sockJsClient.doHandshake(new MyWebSocketHandler(), "ws://example.com:8080/sockjs");

~~~

SockJS使用JSON格式的数组作为消息。默认情况下，使用`Jackson 2`，并且需要放在classpath中。或者可以配置`SockJsMessageCodec`的自定义实现，并在`SockJsClient`上配置它。

`SockJsClient`模拟大量并发用户，要配置底层 HTTP 客户端（用于 XHR 传输）以允许足够数量的连接和线程：

~~~java
HttpClient jettyHttpClient = new HttpClient();
jettyHttpClient.setMaxConnectionsPerDestination(1000);
jettyHttpClient.setExecutor(new QueuedThreadPool(1000));

~~~



自定义SockJS服务端配置：

~~~java
@Configuration
public class WebSocketConfig extends WebSocketMessageBrokerConfigurationSupport {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/sockjs").withSockJS()
            .setStreamBytesLimit(512 * 1024) 
            .setHttpMessageCacheSize(1000) // 默认100
            .setDisconnectDelay(30 * 1000); // 30s,默认5s
    }

}

~~~



## 4.STOMP

WebSocket协议定义了两种类型的消息（文本和二进制），但是它们的内容是未定义的。该协议为客户端和服务器定义了一种机制，以协商一个子协议（即更高级的消息传递协议），并在WebSocket之上使用子协议来定义各自可以发送的消息类型、格式和每条消息的内容，等等。子协议的使用是可选的，但无论采用哪种方式，客户机和服务器都需要就定义消息内容的某种协议达成一致。



### 介绍

[STOMP](https://stomp.github.io/stomp-specification-1.2.html#Abstract)（简单面向文本的消息收发协议）最初是为脚本语言（如 Ruby、Python 和 Perl）创建的，用于连接到企业消息代理。它旨在解决常用消息传递模式的最小子集。STOMP 可以通过任何可靠的双向流网络协议（如 TCP 和 WebSocket）使用。尽管 STOMP 是面向文本的协议，但消息负载可以是文本或二进制。

STOMP 是一种基于帧的协议，其帧基于 HTTP。下面的清单显示了 STOMP 帧的结构：

~~~md
COMMAND
header1:value1
header2:value2

Body^@
~~~

客户端可以使用`SEND`或`SUBSCRIBE`命令发送或订阅消息，并附带一个目标标头`destination`，该标头描述消息的内容以及谁应该接收它。这支持一种简单的发布-订阅机制，您可以使用该机制通过代理向其他连接的客户机发送消息，或者向服务器发送消息以请求执行某些工作。

当使用Spring的STOMP支持时，Spring WebSocket应用程序充当client的STOMP broker。消息被路由到`@Controller`消息处理方法或一个简单的内存代理，该代理跟踪订阅并向订阅用户广播消息。你也可以将Spring配置为使用专用的STOMP代理（如RabbitMQ、ActiveMQ等）来实际广播消息。在这种情况下，Spring维护到代理的TCP连接，将消息传递给它，并将消息从它传递到连接的WebSocket客户端。因此，Spring web应用程序可以依赖于统一的基于http的安全性、通用验证和用于消息处理的熟悉的编程模型。

客户端订阅，服务端发送：`SimpMessagingTemplate`可以向broker发送消息

~~~md
SUBSCRIBE
id:sub-1
destination:/topic/price.stock.*

^@
~~~

发送消息的的客户端，服务端可以通过@MessageMapping处理请求：

~~~md
SEND
destination:/queue/trade
content-type:application/json
content-length:44

{"action":"BUY","ticker":"MMM","shares",44}^@
~~~

执行后，服务器可以向客户端广播交易确认消息和详细信息。

在STOMP规范中，目标的含义故意不透明。它可以是任何字符串，完全由STOMP服务器来定义它们支持的目标的语义和语法。然而，目的地通常是类似路径的字符串，其中`/topic/..`暗示发布-订阅（一对多）和`/queue/`暗示点对点（一对一）消息交换。

STOMP服务器可以使用`MESSAGE`命令向所有订户广播消息。服务端向订阅的客户端发送消息：

~~~md
MESSAGE
message-id:nxahklf6-1
subscription:sub-1
destination:/topic/price.stock.MMM

{"ticker":"MMM","price":129.45}^@
~~~

服务器不能发送未经请求的消息。来自服务器的所有消息都必须响应特定的客户端订阅，并且服务器消息的`subscription-id`头必须与客户端订阅的`id`头匹配。



STOMP详细介绍：https://stomp.github.io/stomp-specification-1.2.html



### Benefits

与使用原始WebSockets相比，使用STOMP作为子协议可以让Spring框架和Spring Security提供更丰富的编程模型。HTTP与原始TCP的对比，以及它如何让Spring MVC和其他web框架提供丰富的功能，也是同样的道理。使用该协议的好处：

1. 无需发明自定义消息协议和消息格式。
2. STOMP客户端，包括Java客户端在Spring框架中，这些都是可用的。
3. 可以(可选)使用消息代理（例如 RabbitMQ、ActiveMQ 等）来管理订阅和广播消息。
4. 应用程序逻辑可以组织在任意数量的`@Controller`实例中，并且消息可以基于STOMP`destination`报头路由到它们，而不是针对给定连接使用单个`WebSocketHandler`处理原始WebSocket消息。
5. 可以使用Spring Security根据STOMP`destination`和消息类型来保护消息。



### Enable STOMP

STOMP over WebSocket支持在`spring-messaging`和`spring-websocket`模块中可用。

~~~java
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 暴露/portfolio
        registry.addEndpoint("/portfolio").withSockJS();  
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // /app 路由开始的消息被路由到@Controller的@MessageMapping方法
        config.setApplicationDestinationPrefixes("/app"); 
        // 使用内置的消息代理进行订阅和广播
        // 将destination以'/topic'或'/queue'开头的消息路由到broker
        config.enableSimpleBroker("/topic", "/queue"); 
    }
}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker application-destination-prefix="/app">
        <websocket:stomp-endpoint path="/portfolio">
            <websocket:sockjs/>
        </websocket:stomp-endpoint>
        <websocket:simple-broker prefix="/topic, /queue"/>
    </websocket:message-broker>

</beans>

~~~

示例：

1. https://spring.io/guides/gs/messaging-stomp-websocket/
2. https://github.com/rstoyanchev/spring-websocket-portfolio



### WebSocket Server

配置WebSocket服务端：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/portfolio").setHandshakeHandler(handshakeHandler());
    }

    @Bean
    public DefaultHandshakeHandler handshakeHandler() {

        WebSocketPolicy policy = new WebSocketPolicy(WebSocketBehavior.SERVER);
        policy.setInputBufferSize(8192);
        policy.setIdleTimeout(600000);

        return new DefaultHandshakeHandler(
                new JettyRequestUpgradeStrategy(new WebSocketServerFactory(policy)));
    }
}

~~~



###  Flow of Messages

一旦公开了STOMP端点，Spring应用程序将成为连接客户机的STOMP代理。

`spring-messaging`模块包含对消息传递应用程序的基本支持，这些应用程序起源于[Spring Integration](https://spring.io/spring-integration)，后来被提取并合并到Spring框架中，以便在许多Spring项目和应用程序场景中更广泛地使用。下面的列表简要描述了一些可用的消息传递抽象：

1. Message：消息的简单表示形式，包括header和有效负载。
2. MessageHandler：处理消息的契约。
3. MessageChannel：用于发送消息的契约，该消息支持生产者和消费者之间的松耦合。
4. SubscribableChannel：`MessageChannel`与`MessageHandler`订阅者。
5. ExecutorSubscribableChannel：`SubscribableChannel`使用`Executor`来传递消息。

Java 配置使用`@EnableWebSocketMessageBroker`开启以上组件组合消息工作流。

![image-20250323122013018](http://47.101.155.205/image-20250323122013018.png)

- `clientInboundChannel`：用于传递从WebSocket客户端接收到的消息。
- `clientOutboundChannel`：用于向WebSocket客户端发送服务器消息。
- `brokerChannel`：用于从服务器端应用程序代码中向消息代理发送消息。

添加外部消息中间件：

![image-20250323122036407](http://47.101.155.205/image-20250323122036407.png)



~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/portfolio");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }
}

@Controller
public class GreetingController {

    @MessageMapping("/greeting") {
    public String handle(String greeting) {
        return "[" + getTimestamp() + ": " + greeting;
    }
}

~~~

以上配置建立WebSocket服务端，进行以下步骤：

1. 客户端和http://localhost:8080/portfolio建立连接；
2. 客户端发送`destination`为`/topic/greeting`的`SUBSCRIBE`帧。收到并解码后，消息将发送到 `clientInboundChannel`，然后路由到存储客户端订阅的消息代理。
3. 客户端发送一个`aSEND`帧到`/app/greeting`。`/app`前缀有助于将它路由到带注释的控制器。在`/app`前缀被剥离之后，目的地的剩余`/greeting`部分被映射到`GreetingController`中的`@MessageMapping`方法。
4. 从1GreetingController1返回的值被转换成一个Spring`Message`，带有基于返回值的有效负载和`/topic/greeting`的默认目的地标头（从输入目的地派生，`/app`被`/topic`取代）。结果消息被发送到`brokerChannel`，并由消息代理处理。
5. 消息代理查找所有匹配的订阅者，并通过`clientOutboundChannel`向每个订阅者发送一个`message`帧，从那里消息被编码为STOMP帧并在WebSocket连接上发送。

### Annotated Controllers

@Controller类中可以用`@MessageMapping`, `@SubscribeMapping`, `@ExceptionHandler`注解声明方法处理消息。



#### @MessageMapping

**@MessageMapping方法支持的参数：**

| 方法参数                                                     | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `Message`                                                    | 用于访问完整的消息                                           |
| `MessageHeaders`                                             | 用于访问在消息中的header                                     |
| `MessageHeaderAccessor`, `SimpMessageHeaderAccessor`, and `StompHeaderAccessor` | 用于通过类型化访问器方法访问标头                             |
| `@Payload`                                                   | 访问消息的有效负载，MessageConverter                         |
| `@Header`                                                    | 要访问特定的header值                                         |
| `@Headers`                                                   | 访问所有的header值，可以用`java.util.Map`接收                |
| `@DestinationVariable`                                       | 于访问从消息目标提取的模板变量。值将根据需要转换为声明的方法参数类型。 |
| `java.security.Principal`                                    | WebSocket HTTP 握手时登录的用户                              |

**支持的返回值：**

默认情况下，`@MessageMapping`方法的返回值通过匹配的`MessageConverter`序列化为有效负载，并作为消息发送到`brokerChannel`，从`brokerChannel`向订阅者广播。出站消息的目的地与入站消息的目的地相同，但以`/topic`为前缀。

您可以使用`@SendTo`和`@SendToUser`注释来定制输出消息的目的地。`@SendTo`用于自定义目标目的地或指定多个目的地。`@SendToUser`用于将输出消息定向到与输入消息相关联的用户。

您可以在同一个方法上同时使用@SendTo和@SendToUser，并且两者都在类级别上得到支持，在这种情况下，它们充当类中方法的默认值。但是，请记住，任何方法级别的@SendTo或@SendToUser注释都会`覆盖类`级别的任何此类注释。

消息可以异步处理，@MessageMapping方法可以返回`ListenableFuture`、`CompletableFuture`或`CompletionStage`。



注意：`@SendTo`和`@SendToUser`仅仅是一种方便，相当于使用`SimpMessagingTemplate`发送消息。如果有必要，对于更高级的场景，`@MessageMapping`方法可以直接使用`SimpMessagingTemplate`。这可以代替返回一个值，或者可能除了返回一个值之外。



#### @SubscribeMapping

`@SubscribeMapping`类似于`@MessageMapping`，但将映射缩小到仅订阅消息。它支持与`@MessageMapping`相同的方法参数。但是，对于返回值，默认情况下，消息将直接发送到客户端（通过`clientOutboundChannel`响应订阅），而不是发送到代理（通过`brokerChannel`作为广播发送到匹配的订阅）。**添加@SendTo或@SendToUser将覆盖此行为并将其发送到代理。**



这在什么时候有用？假设代理映射到`/topic`和`/queue`，而应用程序控制器映射到`/app`。在此设置中，代理存储用于重复广播的`/topic`和`/queue`的所有订阅，并且不需要应用程序参与。客户端还可以订阅某些/应用程序目的地，控制器可以在不涉及代理的情况下返回值以响应该订阅，而无需再次存储或使用该订阅（实际上是一次性请求-应答交换）。这样做的一个用例是在启动时用初始数据填充UI。

这在什么时候没有用？不要尝试将`broker`和`controller`到相同的目的地前缀，除非出于某种原因希望它们独立处理消息（包括订阅）。入站消息并行处理。不能保证是代理还是控制器先处理给定的消息。如果目标是在订阅存储并准备广播时得到通知，那么如果服务器支持收据，客户机应该请求收据（简单代理不支持收据）。例如，使用Java STOMP客户端，您可以执行以下操作来添加收据：

~~~java
@Autowired
private TaskScheduler messageBrokerTaskScheduler;

// During initialization..
stompClient.setTaskScheduler(this.messageBrokerTaskScheduler);

// When subscribing..
StompHeaders headers = new StompHeaders();
headers.setDestination("/topic/...");
headers.setReceipt("r1");
FrameHandler handler = ...;
stompSession.subscribe(headers, handler).addReceiptTask(() -> {
    // Subscription ready...
});

~~~

服务器端选项是在`brokerChannel`上注册`ExecutorChannelInterceptor`，并实现`afterMessageHandled`方法，该方法在消息（包括订阅）被处理后调用。



#### @MessageExceptionHandler

应用程序可以使用`@MessageExceptionHandle`r方法来处理来自`@MessageMapping`方法的异常。如果希望访问异常实例，可以在注释本身中声明异常，也可以通过方法参数声明异常。

~~~java
@Controller
public class MyController {

    // ...

    @MessageExceptionHandler
    public ApplicationError handleException(MyException exception) {
        // ...
        return appError;
    }
}

~~~

@MessageExceptionHandler方法支持灵活的方法签名，并支持与@MessageMapping方法相同的方法参数类型和返回值。

通常，@MessageExceptionHandler方法在声明它们的@Controller类（或类层次结构）中应用。如果你想让这样的方法更全局地应用（跨控制器），你可以在一个标有`@ControllerAdvice`的类中声明它们。这与Spring MVC中提供的类似支持相当。



### Sending Messages

如果希望从应用程序的任何部分向已连接的客户端发送消息，该怎么办？任何应用程序组件都可以向`brokerChannel`发送消息。最简单的方法是注入`SimpMessagingTemplate`并使用它来发送消息。通常，您将按类型注入它，如下面的示例所示：

~~~java
@Controller
public class GreetingController {

    private SimpMessagingTemplate template;

    @Autowired
    public GreetingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @RequestMapping(path="/greetings", method=POST)
    public void greet(String greeting) {
        String text = "[" + getTimestamp() + "]:" + greeting;
        this.template.convertAndSend("/topic/greetings", text);
    }

}

~~~

如果存在另一个相同类型的bean，您也可以通过其名称(`brokerMessagingTemplate`)来限定它。



### Simple Broker

内置的简单消息代理处理来自客户机的订阅请求，将其存储在内存中，并将消息广播给具有匹配目的地的已连接客户机。代理支持类路径目的地，包括对ant风格目的地模式的订阅。

如果配置了任务调度器，则简单代理支持[STOMP心跳](https://stomp.github.io/stomp-specification-1.2.html#Heart-beating)。为此，您可以声明自己的调度器，或者使用自动声明并在内部使用的调度器。下面的例子展示了如何声明你自己的调度程序：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private TaskScheduler messageBrokerTaskScheduler;

    @Autowired
    public void setMessageBrokerTaskScheduler(TaskScheduler taskScheduler) {
        this.messageBrokerTaskScheduler = taskScheduler;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableSimpleBroker("/queue/", "/topic/")
                .setHeartbeatValue(new long[] {10000, 20000})
                .setTaskScheduler(this.messageBrokerTaskScheduler);

        // ...
    }
}

~~~



### External Broker

简单代理非常适合入门，但只支持STOMP命令的一个子集（它不支持ack、收据和其他一些特性），依赖于一个简单的消息发送循环，不适合集群。作为替代方案，您可以升级应用程序以使用功能齐全的消息代理。

请参阅STOMP文档，了解您选择的消息代理（如[RabbitMQ](https://www.rabbitmq.com/stomp.html)、[ActiveMQ](https://activemq.apache.org/stomp.html)等），安装代理，并在启用STOMP支持的情况下运行它。然后，您可以在Spring配置中启用STOMP代理中继（而不是简单代理）。

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/portfolio").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableStompBrokerRelay("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker application-destination-prefix="/app">
        <websocket:stomp-endpoint path="/portfolio" />
            <websocket:sockjs/>
        </websocket:stomp-endpoint>
        <websocket:stomp-broker-relay prefix="/topic,/queue" />
    </websocket:message-broker>

</beans>
~~~

上述配置中的STOMP broker中继是一个Spring `MessageHandler`，它通过将消息转发给外部消息代理来处理消息。为此，它建立到代理的TCP连接，将所有消息转发给代理，然后通过WebSocket会话将从代理接收到的所有消息转发给客户端。从本质上讲，它充当一个“中继relay”，在两个方向上转发消息。

将`io.projectreactor.netty:reactor-netty`和`io.netty:netty-all`依赖项添加到项目中，用于TCP连接管理。



### Connecting to a Broker

STOMP代理中继维护到代理的单个“系统”TCP连接。此连接仅用于来自服务器端应用程序的消息，而不用于接收消息。您可以为此连接配置STOMP凭据（即STOMP帧登录和密码头）。这在XML名称空间和Java配置中都公开为systemLogin和systemPasscode属性，具有默认值guest和guest。

STOMP 代理中继还为每个连接的 WebSocket 客户端创建一个单独的 TCP 连接。您可以配置用于代表客户端创建的所有 TCP 连接的 STOMP 凭证。这在 XML 命名空间和 Java 配置中都公开为`clientLogin`和`clientPasscode`属性，默认值为`guest`和`guest`。

STOMP代理中继还通过“系统”TCP连接向消息代理发送和接收心跳。您可以配置发送和接收心跳的间隔（默认为每次10秒）。如果失去与代理的连接，代理中继将继续尝试每5秒重新连接一次，直到成功为止。

任何Spring bean都可以实现ApplicationListener\<BrokerAvailabilityEvent\>，以便在与代理的“系统”连接丢失并重新建立时接收通知。

默认情况下，STOMP代理中继总是连接到相同的主机和端口，如果连接丢失，则根据需要重新连接。如果您希望在每次尝试连接时提供多个地址，您可以配置地址的提供者，而不是固定的主机和端口。下面的例子展示了如何做到这一点：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    // ...

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableStompBrokerRelay("/queue/", "/topic/").setTcpClient(createTcpClient());
        registry.setApplicationDestinationPrefixes("/app");
    }

    private ReactorNettyTcpClient<byte[]> createTcpClient() {
        return new ReactorNettyTcpClient<>(
                client -> client.addressSupplier(() -> ... ),
                new StompReactorNettyCodec());
    }
}

~~~

还可以使用virtualHost属性配置STOMP代理中继。该属性的值被设置为每个CONNECT帧的主机报头，并且可能是有用的（例如，在云环境中，建立TCP连接的实际主机与提供基于云的STOMP服务的主机不同）。



### Dots as Separators

当消息被路由到@MessageMapping方法时，它们与`AntPathMatcher`匹配。默认情况下，模式将使用斜杠(`/`)作为分隔符。这在web应用程序中是一个很好的约定，类似于HTTP url。但是，如果您更习惯于消息传递约定，则可以切换到使用点（`.`）作为分隔符。

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // ...

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setPathMatcher(new AntPathMatcher("."));
        registry.enableStompBrokerRelay("/queue", "/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:websocket="http://www.springframework.org/schema/websocket"
        xsi:schemaLocation="
                http://www.springframework.org/schema/beans
                https://www.springframework.org/schema/beans/spring-beans.xsd
                http://www.springframework.org/schema/websocket
                https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker application-destination-prefix="/app" path-matcher="pathMatcher">
        <websocket:stomp-endpoint path="/stomp"/>
        <websocket:stomp-broker-relay prefix="/topic,/queue" />
    </websocket:message-broker>

    <bean id="pathMatcher" class="org.springframework.util.AntPathMatcher">
        <constructor-arg index="0" value="."/>
    </bean>

</beans>
~~~



~~~java
@Controller
@MessageMapping("red")
public class RedController {

    @MessageMapping("blue.{green}")
    public void handleGreen(@DestinationVariable String green) {
        // ...
    }
}

~~~

服务端能接收/app/red.blue.green123消息。



### Authentication

每个STOMP over WebSocket消息会话都以HTTP请求开始。这可以是升级到WebSocket的请求（即WebSocket握手），或者在SockJS回退的情况下，是一系列SockJS HTTP传输请求。

许多web应用程序已经有了适当的身份验证和授权来保护HTTP请求。通常，通过`Spring Security`使用某种机制，如登录页面、HTTP basic authentication或其他方式。对用户进行身份验证。经过身份验证的用户的安全上下文保存在HTTP会话中，并与同一基于cookie的会话中的后续请求相关联。

因此，对于WebSocket握手或SockJS HTTP传输请求，通常已经有一个通过`HttpServletRequest.getUserPrincipal()`访问的经过身份验证的用户。Spring自动将该用户与为其创建的WebSocket或SockJS会话关联起来，随后，通过用户头将该会话上传输的所有STOMP消息关联起来。

简而言之，一个典型的web应用程序不需要做任何超出它已经为安全性所做的事情。用户在HTTP请求级别通过安全上下文进行身份验证，该安全上下文通过基于cookie的HTTP会话（然后与为该用户创建的WebSocket或SockJS会话相关联）进行维护，并导致在流经应用程序的每个消息上都打上用户标头。

注意，STOMP协议在CONNECT帧上确实有登录头`login`和密码头`passcode`。例如，它们最初是为TCP上的STOMP而设计的，现在仍然需要。然而，对于WebSocket上的STOMP，默认情况下，Spring忽略STOMP协议级别的授权头，假设用户已经在HTTP传输级别进行了身份验证，并期望WebSocket或SockJS会话包含经过身份验证的用户。



### Token Authentication

[Spring Security OAuth](https://github.com/spring-projects/spring-security-oauth)支持基于令牌的安全性，包括JSON Web Token(JWT)。您可以将其用作Web应用程序中的身份验证机制，包括在WebSocket交互上的STOMP，如前一节所述（即通过基于cookie的会话维护身份）。

同时，基`cookie`的会话并不总是最合适的（例如，在不维护服务器端会话的应用程序中，或者在通常使用报头进行身份验证的移动应用程序中）。

WebSocket协议，[RFC 6455](https://tools.ietf.org/html/rfc6455#section-10.5)没有规定服务器在WebSocket握手期间验证客户端的任何特定方式。然而，在实践中，浏览器客户端只能使用标准身份验证头（即基本的HTTP身份验证）或cookie，而不能（例如）提供自定义头。同样，SockJS JavaScript客户端也没有提供一种方法来发送带有SockJS传输请求的HTTP头。参见[sockjs-client issue196](https://github.com/sockjs/sockjs-client/issues/196)。相反，它允许发送可用于发送令牌的查询参数，但这有其自身的缺点（例如，令牌可能在服务器日志中无意中与URL一起记录）。

因此，希望避免使用cookie的应用程序可能没有任何好的替代方法来进行HTTP协议级别的身份验证。他们可能更喜欢在STOMP消息协议级别使用报头进行身份验证，而不是使用cookie。这样做需要两个简单的步骤：

1. 使用STOMP客户端在连接时传递身份验证头。
2. 使用`ChannelInterceptor`处理身份验证头。

下一个示例使用服务器端配置来注册自定义身份验证拦截器。注意，拦截器只需要对CONNECT消息进行身份验证和设置用户头。Spring记录并保存经过身份验证的用户，并将其与同一会话上的后续STOMP消息关联起来。下面的例子展示了如何注册一个自定义身份验证拦截器：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class MyConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    Authentication user = ... ; // 访问认证的请求头
                    accessor.setUser(user);
                }
                return message;
            }
        });
    }
}

~~~

注意：当对消息使用Spring Security的授权时，目前需要确保在Spring Security之前对身份验证`ChannelInterceptor`配置进行排序。最好的方法是在`WebSocketMessageBrokerConfigurer`的实现中声明自定义拦截器，并标记为`@Order(Ordered.HIGHEST_PRECEDENCE + 99)`。



### User Destinations

应用程序可以发送针对特定用户的消息，Spring的STOMP支持为此目的识别带有`/user/`前缀的目的地。例如，客户机可能订阅`/user/queue/position-updates`目的地。该目的地由`UserDestinationMessageHandler`处理，并转换为用户会话的唯一目的地（例如`/queue/position-updates-user123`）。这提供了订阅通用命名目的地的便利性，同时确保不会与订阅相同目的地的其他用户发生冲突，以便每个用户都可以接收唯一的股票位置更新。

在发送端，消息可以发送到一个目的地，例如`/user/{username}/queue/position-updates`，然后由`UserDestinationMessageHandler`转换为一个或多个目的地，每个目的地对应与用户关联的会话。这使得应用程序中的任何组件都可以发送针对特定用户的消息，而无需知道他们的名称和通用目的地以外的任何信息。这也可以通过注释和消息传递模板来实现。

消息处理方法可以通过`@SendToUser`注释（在类级别上也支持共享公共目的地）将消息发送给与正在处理的消息相关联的用户，如下面的示例所示：

~~~java
@Controller
public class PortfolioController {

    @MessageMapping("/trade")
    @SendToUser("/queue/position-updates")
    public TradeResult executeTrade(Trade trade, Principal principal) {
        // ...
        return tradeResult;
    }
}

~~~

如果用户有多个会话，默认情况下，将针对指定目的地订阅的所有会话。然而，有时可能需要只针对发送正在处理的消息的会话。你可以通过将broadcast属性设置为false来实现，如下面的例子所示：

~~~java
@Controller
public class MyController {

    @MessageMapping("/action")
    public void handleAction() throws Exception{
        // raise MyBusinessException here
    }

    @MessageExceptionHandler
    @SendToUser(destinations="/queue/errors", broadcast=false)
    public ApplicationError handleException(MyBusinessException exception) {
        // ...
        return appError;
    }
}

~~~

虽然用户目的地通常意味着经过身份验证的用户，但这并不是严格要求的。没有与经过身份验证的用户关联的WebSocket会话可以订阅用户目的地。在这种情况下，@SendToUser注释的行为与broadcast=false完全相同（也就是说，只针对发送正在处理的消息的会话）。

您可以从任何应用程序组件向用户目的地发送消息，例如，通过注入由Java配置或XML名称空间创建的`SimpMessagingTemplate`。（如果使用@Qualifier进行名称限定，bean名称为`brokerMessagingTemplate`。）下面的例子展示了如何这样做：

~~~java
@Service
public class TradeServiceImpl implements TradeService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public TradeServiceImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    public void afterTradeExecuted(Trade trade) {
        this.messagingTemplate.convertAndSendToUser(
                trade.getUserName(), "/queue/position-updates", trade.getResult());
    }
}

~~~

当您将用户目的地与外部消息代理一起使用时，您应该查看有关如何管理非活动队列的代理文档，以便在用户会话结束时删除所有唯一的用户队列。例如，当你使用`/exchange/amq.direct/position-updates`等目的地时，RabbitMQ会创建自动删除队列。因此，在这种情况下，客户端可以订阅`/user/exchange/amq.direct/position-updates`。类似地，ActiveMQ具有清除非活动目的地的配置选项。

在多应用程序服务器场景中，由于用户连接到不同的服务器，用户目标可能仍然无法解析。在这种情况下，可以将目标配置为广播未解析的消息，以便其他服务器有机会尝试。这可以通过Java配置中的`MessageBrokerRegistry`的`userDestinationBroadcast`属性和XML中的消息代理元素的`user-destination-broadcast`属性来实现。



### Order of Messages

来自代理的消息被发布到`clientOutboundChannel`，从那里它们被写入WebSocket会话。由于通道由`ThreadPoolExecutor`支持，消息在不同的线程中处理，客户机接收到的结果序列可能与发布的确切顺序不匹配。

如果这是一个问题，启用`setPreservePublishOrder`标志，如下例所示：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class MyConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    protected void configureMessageBroker(MessageBrokerRegistry registry) {
        // ...
        registry.setPreservePublishOrder(true);
    }

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker preserve-publish-order="true">
        <!-- ... -->
    </websocket:message-broker>

</beans>
~~~

设置该标志后，同一客户端会话中的消息一次只发布到`clientOutboundChannel`，这样发布的顺序就得到了保证。请注意，这会产生很小的性能开销，因此您应该只在需要时启用它。



### Events

几个`ApplicationContext`事件被发布，并且可以通过实现Spring的`ApplicationListener`接口来接收：

- `BrokerAvailabilityEvent`：指示代理何时可用或不可用。虽然“简单”代理在启动时立即可用，并且在应用程序运行期间保持可用，但STOMP“代理中继”可能会失去与全功能代理的连接（例如，如果重新启动代理）。代理中继具有重新连接逻辑，并在代理返回时重新建立到该代理的“系统”连接。因此，每当状态从连接变为断开连接时，都会发布此事件，反之亦然。使用`SimpMessagingTemplate`的组件应该订阅此事件，并避免在代理不可用时发送消息。在任何情况下，它们都应该准备好在发送消息时处理`MessageDeliveryException`。

- `SessionConnectEvent`：当接收到新的STOMP CONNECT时发布，以指示新客户端会话的开始。事件包含表示连接的消息，包括会话ID、用户信息（如果有的话）和客户端发送的任何自定义头。这对于跟踪客户机会话非常有用。订阅此事件的组件可以使用`SimpMessageHeaderAccessor`或`StompMessageHeaderAccessor`包装包含的消息。

- `sessionconnecteevent`：在`SessionConnecteEvent`发生后不久发布，此时代理已经发送STOMP CONNECTED帧来响应CONNECT。此时，可以认为STOMP会话已经完全建立。

- `SessionSubscribeEvent`：当收到新的STOMP SUBSCRIBE时发布。

- `SessionUnsubscribeEvent`：当收到新的STOMP UNSUBSCRIBE时发布。

- `SessionDisconnectEvent`：在STOMP会话结束时发布。DISCONNECT可能是从客户端发送的，也可能是在WebSocket会话关闭时自动生成的。在某些情况下，每个会话发布此事件不止一次。对于多个断开连接事件，组件应该是幂等的。

当使用功能齐全的代理时，如果代理暂时不可用，STOMP“代理中继”会自动重新连接“系统”连接。但是，客户端连接不会自动重新连接。假设启用了心跳，客户机通常会在10秒内注意到代理没有响应。客户端需要实现自己的重连接逻辑。



### Interception

Events为STOMP连接的生命周期提供通知，但不是为每个客户机消息提供通知。应用程序还可以注册`ChannelInterceptor`来拦截处理链中任何部分的任何消息。下面的例子展示了如何拦截来自客户端的入站消息：

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new MyChannelInterceptor());
    }
}

~~~

自定义的ChannelInterceptor可以使用`StompHeaderAccessor`或`SimpMessageHeaderAccessor`来访问消息的信息：

~~~java
public class MyChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getStompCommand();
        // ...
        return message;
    }
}

~~~

应用程序还可以实现`ExecutorChannelInterceptor`，它是`ChannelInterceptor`的子接口，在处理消息的线程中具有回调函数。对于发送到通道的每条消息，都会调用`ChannelInterceptor`一次，而`ExecutorChannelInterceptor`在订阅来自通道的消息的每个MessageHandler的线程中提供钩子。

注意，与前面描述的`SessionDisconnectEvent`一样，`DISCONNECT`消息可以来自客户端，也可以在WebSocket会话关闭时自动生成。在某些情况下，拦截器可能在每个会话中多次拦截此消息。对于多个断开连接事件，组件应该是幂等的。



### STOMP Client

Spring提供了一个STOMP over WebSocket客户端和一个STOMP over TCP客户端。

创建和配置`WebSocketStompClient`，如下面的示例所示：

~~~java
WebSocketClient webSocketClient = new StandardWebSocketClient();
WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
stompClient.setMessageConverter(new StringMessageConverter());
stompClient.setTaskScheduler(taskScheduler); // for heartbeats

~~~

在前面的示例中，您可以用`SockJsClient`替换`StandardWebSocketClient`，因为这也是`WebSocketClient`的实现。`SockJsClient`可以使用WebSocket或基于http的传输作为回退。

接下来，您可以建立连接并为STOMP会话提供处理程序，如下面的示例所示：

~~~java
String url = "ws://127.0.0.1:8080/endpoint";
StompSessionHandler sessionHandler = new MyStompSessionHandler();
stompClient.connect(url, sessionHandler);

~~~

当会话准备好使用时，处理程序将得到通知，如下面的示例所示：

~~~java
public class MyStompSessionHandler extends StompSessionHandlerAdapter {

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        // ...
    }
}

~~~

一旦会话建立，任何有效负载都可以发送，并与配置的`MessageConverter`进行序列化，如下面的示例所示：

~~~java
session.send("/topic/something", "payload");

~~~

你也可以订阅目的地。订阅方法需要订阅消息的处理程序和可用于取消订阅的订阅句柄。对于每个接收到的消息，处理程序可以指定目标对象类型，有效负载应该被反序列化，如下面的示例所示：

~~~java
session.subscribe("/topic/something", new StompFrameHandler() {

    @Override
    public Type getPayloadType(StompHeaders headers) {
        return String.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        // ...
    }

});

~~~

要启用STOMP心跳，您可以使用`TaskScheduler`配置`WebSocketStompClient`，并可选择自定义心跳间隔（写不活动为10秒，这会导致发送心跳，读不活动为10秒，这会关闭连接）。

当使用`WebSocketStompClient`进行性能测试以模拟来自同一台机器的数千个客户机时，考虑关闭心跳，因为每个连接调度自己的心跳任务，并且没有针对在同一台机器上运行的大量客户机进行优化。

STOMP协议还支持接收，其中客户端必须添加一个接收`receipt`头，服务器在处理发送或订阅后用接收帧响应该头。为了支持这一点，`StompSession`提供了`setAutoReceipt(boolean)`，它导致在每个后续发送或订阅事件上添加接收头。或者，您也可以手动将收据标头添加到`StompHeaders`中。send和subscribe都返回一个`Receiptable`实例，您可以使用它来注册接收成功和失败回调。对于此功能，您必须使用`TaskScheduler`和收据过期前的时间（默认为15秒）配置客户端。

请注意，`StompSessionHandler`本身是一个`StompFrameHandler`，除了处理消息处理异常的`handleException`回调和处理传输级错误（包括`ConnectionLostException`）的`handleTransportError`之外，还允许它处理ERROR帧。



### WebSocket Scope

每个WebSocket会话都有一个属性映射。映射作为一个头附加到入站客户端消息，可以从控制器方法访问，如下面的例子所示：

~~~java
@Controller
public class MyController {

    @MessageMapping("/action")
    public void handle(SimpMessageHeaderAccessor headerAccessor) {
        Map<String, Object> attrs = headerAccessor.getSessionAttributes();
        // ...
    }
}

~~~

你可以在websocket作用域中声明一个spring管理的bean。您可以将websocket作用域的bean注入到控制器和注册在`clientInboundChannel`上的任何通道拦截器中。它们通常是单例的，比任何单独的WebSocket会话都要长。因此，你需要为websocket作用域bean使用作用域代理模式，如下面的例子所示：

~~~java
@Component
@Scope(scopeName = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MyBean {

    @PostConstruct
    public void init() {
        // Invoked after dependencies injected
    }

    // ...

    @PreDestroy
    public void destroy() {
        // Invoked when the WebSocket session ends
    }
}

@Controller
public class MyController {

    private final MyBean myBean;

    @Autowired
    public MyController(MyBean myBean) {
        this.myBean = myBean;
    }

    @MessageMapping("/action")
    public void handle() {
        // this.myBean from the current WebSocket session
    }
}

~~~

与任何自定义作用域一样，Spring在第一次从控制器访问MyBean实例时初始化它，并将实例存储在WebSocket会话属性中。随后返回相同的实例，直到会话结束。websocket作用域的bean调用了所有的Spring生命周期方法，如前面的示例所示。



### Performance

在性能方面没有什么灵丹妙药。影响它的因素很多，包括消息的大小和数量、应用程序方法是否执行需要阻塞的工作，以及外部因素（如网络速度和其他问题）。本节的目的是概述可用的配置选项，以及关于如何考虑可伸缩性的一些想法。

在消息传递应用程序中，消息通过由`线程池`支持的异步执行通道传递。配置这样的应用程序需要对通道和消息流有很好的了解。

显然，首先要配置支持`clientInboundChannel`和`clientOutboundChannel`的线程池。默认情况下，两者都配置为可用处理器数量的2倍。

如果带注释的方法中的消息处理主要是cpu绑定的，那么`clientInboundChannel`的线程数应该与处理器数保持接近。如果它们所做的工作是io绑定较多的，并且需要阻塞或等待数据库或其他外部系统，则可能需要增加线程池的大小。



ThreadPoolExecutor有三个重要属性：核心线程池大小(core thread pool size)、最大线程池大小(max thread pool size)和队列存储(queue capacity )没有可用线程的任务的容量。

一个常见的混淆点是，配置核心池大小（例如，10）和最大池大小（例如，20）会导致一个具有10到20个线程的线程池。实际上，如果队列容量保持其默认值Integer.MAX_VALUE时，线程池的增长永远不会超过核心池大小，因为所有额外的任务都排队。

在`clientOutboundChannel`端，主要是向WebSocket客户端发送消息。如果客户机在快速网络上，线程的数量应该与可用处理器的数量保持接近。如果它们速度较慢或带宽较低，则需要更长的时间来消耗消息，并给线程池带来负担。因此，有必要增加线程池的大小。**IO有阻塞情况，调大线程池的数量。**

虽然可以预测`clientInboundChannel`的工作负载—毕竟，它是基于应用程序所做的工作—但如何配置`clientOutboundChannel`比较困难，因为它基于应用程序无法控制的因素。出于这个原因，有两个附加属性与消息的发送有关：`sendTimeLimit`和`sendBufferSizeLimit`。您可以使用这些方法来配置在向客户端发送消息时允许发送多长时间以及可以缓冲多少数据。

一般的想法是，在任何给定的时间，只有一个线程可以用来发送到客户端。与此同时，所有其他消息都将被缓冲，您可以使用这些属性来决定允许发送消息的时间以及同时可以缓冲多少数据。

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setSendTimeLimit(15 * 1000).setSendBufferSizeLimit(512 * 1024);
    }

    // ...

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker>
        <websocket:transport send-timeout="15000" send-buffer-size="524288" />
        <!-- ... -->
    </websocket:message-broker>

</beans>
~~~

您还可以使用前面所示的WebSocket传输配置来配置传入STOMP消息的最大允许大小。理论上，WebSocket消息的大小几乎是无限的。在实践中，WebSocket服务器会施加限制——例如，Tomcat限制`8K`， Jetty限制`64K`。由于这个原因，STOMP客户端（如JavaScript webstomp-client等）将较大的STOMP消息拆分为16K边界，并将它们作为多个WebSocket消息发送，这需要服务器进行缓冲和重新组装。

Spring的STOMP-over-WebSocket支持做到了这一点，因此应用程序可以配置STOMP消息的最大大小，而不考虑WebSocket服务器特定的消息大小。请记住，WebSocket消息大小是自动调整的，如果有必要的话，以确保它们至少可以携带16K的WebSocket消息。

~~~java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(128 * 1024);
    }

    // ...

}

~~~

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:websocket="http://www.springframework.org/schema/websocket"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/websocket
        https://www.springframework.org/schema/websocket/spring-websocket.xsd">

    <websocket:message-broker>
        <websocket:transport message-size="131072" />
        <!-- ... -->
    </websocket:message-broker>

</beans>
~~~

关于扩展的一个要点涉及到使用多个应用程序实例。目前，您无法使用简单的代理完成此操作。然而，当你使用一个全功能的代理（如RabbitMQ）时，每个应用实例都连接到代理，并且从一个应用实例广播的消息可以通过代理广播到通过任何其他应用实例连接的WebSocket客户端。



### Monitoring

当你使用`@EnableWebSocketMessageBroker`或`\<websocket:message-broker\>`时，关键基础设施组件会自动收集统计数据和计数器，这些统计数据和计数器提供了对应用程序内部状态的重要洞察。该配置还声明了一个`WebSocketMessageBrokerStats`类型的bean，它在一个地方收集所有可用信息，并在默认情况下每30分钟在INFO级别记录一次。这个bean可以通过Spring的`MBeanExporter`导出到JMX，以便在运行时查看（例如，通过JDK的jconsole）。以下是现有资料的总结：

**Client WebSocket Sessions**

- Current：指示当前有多少客户端会话，该计数进一步细分为WebSocket与HTTP流和轮询SockJS会话。
- Total：指示已建立的会话总数。
- **Abnormally Closed**
  - Connect Failures：已建立但在60秒内未收到任何消息后关闭的会话。这通常是代理或网络问题的指示。
  - Send Limit Exceeded：会话在超过配置的发送超时或发送缓冲区限制后关闭，这可能发生在速度较慢的客户端。
  - Transport Errors：会话在传输错误后关闭，例如无法读取或写入WebSocket连接或HTTP请求或响应。
- STOMP Frames：已处理的`CONNECT`、`CONNECTED`和`DISCONNECT`帧的总数，表示在STOMP级别上连接的客户端数量。请注意，当会话异常关闭或客户端关闭而不发送DISCONNECT帧时，DISCONNECT计数可能会更低。

**STOMP Broker Relay**

- TCP Connections：指示有多少代表客户端WebSocket会话的TCP连接建立到代理。这应该等于客户端WebSocket会话数+ 1个用于从应用程序内部发送消息的额外共享“系统”连接。
- STOMP Frames：代表客户端向代理转发或从代理接收的CONNECT、CONNECTED和DISCONNECT帧的总数。注意，无论客户端WebSocket会话是如何关闭的，都会向代理发送一个DISCONNECT帧。因此，较低的DISCONNECT帧数表明代理正在主动关闭连接（可能是由于没有及时到达的心跳、无效的输入帧或其他问题）。



- **Client Inbound Channel**：来自支持`clientInboundChannel`的线程池的统计信息，可以洞察传入消息处理的运行状况。在这里排队的任务表明应用程序可能太慢而无法处理消息。如果存在I/O绑定任务（例如，缓慢的数据库查询、对第三方REST API的HTTP请求等），请考虑增加线程池大小。
- **Client Outbound Channel**：来自支持`clientOutboundChannel`的线程池的统计信息，该线程池可洞察向客户机广播消息的运行状况。在这里排队的任务表明客户机速度太慢，无法使用消息。解决这个问题的一种方法是增加线程池大小，以容纳预期的并发慢速客户端数量。另一个选项是减少发送超时和发送缓冲区大小限制。
- **SockJS Task Scheduler**：来自用于发送心跳的SockJS任务调度程序的线程池的统计信息。注意，当在STOMP级别上协商心跳时，SockJS心跳是禁用的。



### Testing

当您使用Spring的STOMP-over-WebSocket支持时，有两种主要的方法来测试应用程序。第一种方法是编写服务器端测试，以验证控制器及其带注释的消息处理方法的功能。第二种方法是编写完整的端到端测试，包括运行客户机和服务器。

这两种方法并不相互排斥。相反，每一种都在整个测试策略中占有一席之地。服务器端测试更集中，更容易编写和维护。另一方面，端到端集成测试更完整，测试更多，但它们的编写和维护也更复杂。

最简单的服务器端测试形式是编写控制器单元测试。然而，这还不够有用，因为控制器所做的大部分工作都依赖于它的注释。纯单元测试根本无法测试这一点。

理想情况下，应该在运行时调用被测试的控制器，就像使用Spring MVC测试框架来测试处理HTTP请求的控制器一样——也就是说，不运行Servlet容器，而是依赖Spring框架来调用带注释的控制器。与Spring MVC测试一样，这里有两种可能的选择，要么使用“基于上下文”，要么使用“独立”设置：

- 在Spring TestContext框架的帮助下加载实际的Spring配置，注`clientInboundChannel`作为测试字段，并使用它来发送要由控制器方法处理的消息。
- 手动设置调用控制器所需的最小Spring框架基础设施（即`SimpAnnotationMethodMessageHandler`），并将控制器的消息直接传递给它。

第二种方法是创建端到端集成测试。为此，您需要以嵌入式模式运行WebSocket服务器，并作为发送包含STOMP帧的WebSocket消息的WebSocket客户端连接到它。[股票投资组合样例](https://github.com/rstoyanchev/spring-websocket-portfolio/tree/master/src/test/java/org/springframework/samples/portfolio/web)应用程序的测试也通过使用Tomcat作为嵌入式WebSocket服务器和用于测试目的的简单STOMP客户机来演示这种方法。

