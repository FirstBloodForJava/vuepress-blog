# SpringWebFlux

Spring框架中包含的原始web框架Spring web MVC是专门为Servlet API和Servlet容器构建的。`reactive-stack web框架`Spring WebFlux是在5.0版本中添加的。它是完全无阻塞的，支持[响应式流](https://www.reactive-streams.org/)回压，并运行在诸如Netty， Undertow和Servlet 3.1+容器之类的服务器上。



## 1.介绍

Spring WebFlux为什么被创建？

部分答案是需要一个非阻塞的web堆栈来处理少量线程的并发性，并使用更少的硬件资源进行扩展。Servlet 3.1确实为非阻塞I/O提供了一个API。然而，使用它会远离Servlet API的其他部分，其中契约是同步的（Filter, Servlet）或阻塞的（getParameter, getPart）。这是一个新的公共API作为跨任何非阻塞运行时的基础的动机。这一点很重要，因为服务器（如Netty）在异步、非阻塞领域已经建立起来了。

答案的另一部分是函数式编程。就像在Java 5中添加注释创造了机会（比如带注释的REST控制器或单元测试）一样，在Java 8中添加lambda表达式也为Java中的函数式API创造了机会。这对于非阻塞应用程序和延续风格的api（如`CompletableFuture`和[ReactiveX](http://reactivex.io/)所推广的）来说是一个福音，它们允许异步逻辑的声明性组合。在编程模型层面，Java 8使Spring WebFlux能够在带注释的控制器之外提供功能性的web端点。



### Reactive的定义

术语`reactive`指的是围绕响应变化而构建的编程模型——网络组件响应I/O事件，UI控制器响应鼠标事件等等。从这个意义上说，非阻塞是响应性的，因为我们现在处于对操作完成或数据可用时的通知作出反应的模式，而不是被阻塞。

Spring团队还将另一个重要的机制与`reactive`联系起来，那就是非阻塞回压(non-blocking back pressure)。在同步、命令式代码中，阻塞调用作为一种自然形式的反压力，迫使调用者等待。在非阻塞代码中，控制事件的速率变得非常重要，这样快速生产者就不会压倒其目标。

响应式流是一个[小规范](https://github.com/reactive-streams/reactive-streams-jvm/blob/master/README.md#specification)（也在[Java 9中采用](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/Flow.html)），它定义了带背压的异步组件之间的交互。例如，数据存储库（充当发布者[Publisher](https://www.reactive-streams.org/reactive-streams-1.0.1-javadoc/org/reactivestreams/Publisher.html)）可以生成数据，然后HTTP服务器（充当订阅者[Subsciber](https://www.reactive-streams.org/reactive-streams-1.0.1-javadoc/org/reactivestreams/Subscriber.html)）可以将这些数据写入响应。响应式流的主要目的是让订阅者控制发布者生成数据的快慢。

如果出版商publisher不能放慢速度怎么办？

**响应式流的目的只是建立机制和边界。如果发布者不能减慢速度，它必须决定是缓冲、删除还是失败。**



### Reactive API

响应式流在互操作性方面扮演着重要的角色。它对库和基础设施组件很有兴趣，但作为应用程序API用处不大，因为它太底层了。应用程序需要一个更高级、功能更丰富的API来组成异步逻辑——类似于Java 8流API，但不仅仅是用于集合。这就是响应式库所扮演的角色。

[Reactor](https://github.com/reactor/reactor)是Spring WebFlux首选的响应式库。它提供了`Mono`和`Flux`API类型来处理0..1的数据序列（Mono单声道）和0..N （Flux）通过一组丰富的操作符与[ReactiveX操作符词汇表](http://reactivex.io/documentation/operators.html)保持一致。反应器是一个反应流库，因此，它的所有操作符都支持非阻塞背压。Reactor非常关注服务器端Java。它是与Spring密切合作开发的。

WebFlux需要Reactor作为核心依赖项，但它可以通过Reactive Streams与其他Reactive库互操作。一般来说，WebFlux API接受一个普通的`Publisher`作为输入，在内部将其适配为一个Reactor类型，使用它，然后返回一个`Flux`或一个`Mono`作为输出。因此，您可以将任何`Publisher`作为输入传递，并且可以对输出应用操作，但是您需要调整输出以与另一个响应性库一起使用。只要可行（例如，带注释的控制器），WebFlux就会透明地适应RxJava或其他响应式库的使用。



### Programming Models

`spring-web`模块包含了Spring WebFlux的响应式基础，包括HTTP抽象、支持服务器的响应式流适配器adapter、编解码器，以及一个与Servlet API相当的核心`WebHandler` API，但使用了非阻塞协议。

在此基础上，Spring WebFlux提供了两种编程模型可供选择：

- **Annotated Controllers**：与Spring MVC一致，并基于来自Spring -web模块的相同注解。Spring MVC和WebFlux控制器都支持响应式（Reactor和RxJava）返回类型，因此，区分它们并不容易。一个显著的区别是WebFlux也支持响应式的@RequestBody参数。

- **Functional Endpoints**：基于lambda的轻量级函数式编程模型。您可以将其视为一个小型库或一组实用程序，应用程序可以使用它们来路由和处理请求。带注释控制器的最大区别在于，应用程序从头到尾负责请求处理，而不是通过注释声明意图并被回调。



### Applicability

选择SpringMVC还是WebFlux？

这是一个很自然的问题，但却建立了一个不合理的二分法。实际上，两者共同努力扩大了可用选项的范围。这两者是为了彼此的连续性和一致性而设计的，它们是并排可用的，每一方的反馈对双方都有利。下图显示了两者之间的关系，它们的共同点，以及各自支持的独特之处：

![image-20250323184854083](http://47.101.155.205/image-20250323184854083.png)

建议考虑以下几点：

- 如果你有一个运行良好的Spring MVC应用程序，则不需要进行更改。命令式编程是编写、理解和调试代码的最简单方法。您有最多的库选择，因为从历史上看，大多数库都是阻塞的。

- 如果你已经在购买一个非阻塞的web堆栈，Spring WebFlux提供了与该领域其他产品相同的执行模型优势，还提供了服务器选择（Netty、Tomcat、Jetty、Undertow和Servlet 3.1+容器）、编程模型选择（带注释的控制器和功能web端点）和响应式库选择（反应器、RxJava或其他）。

- 如果你对使用Java 8 lambda或Kotlin的轻量级、功能性web框架感兴趣，你可以使用Spring WebFlux功能性web端点。对于需求不太复杂的小型应用程序或微服务来说，这也是一个不错的选择，这些应用程序或微服务可以从更高的透明度和控制中受益。

- 在微服务架构中，你可以混合使用Spring MVC或Spring WebFlux控制器，也可以使用Spring WebFlux功能端点。在这两个框架中支持相同的基于注释的编程模型，可以更容易地重用知识，同时也可以为正确的工作选择正确的工具。

- 评估应用程序的一个简单方法是检查它的依赖项。如果您有阻塞持久性API（JPA、JDBC）或网络API要使用，Spring MVC至少是通用架构的最佳选择。Reactor和RxJava在单独的线程上执行阻塞调用在技术上是可行的，但是你将无法充分利用非阻塞web堆栈。

- 如果你有一个调用远程服务的Spring MVC应用程序，请尝试响应式WebClient。您可以直接从Spring MVC控制器方法返回响应类型（Reactor、RxJava或其他）。每个呼叫的延迟时间越长，或者呼叫之间的相互依赖性越强，好处就越显著。Spring MVC控制器也可以调用其他响应式组件。

- 如果您有一个大型团队，请记住，在向非阻塞、函数式和声明式编程转变的过程中，学习曲线是陡峭的。一种不需要完全切换的实用方法是使用响应式WebClient。除此之外，从小事做起，衡量收益。我们预计，对于广泛的应用来说，这种转变是不必要的。如果您不确定要寻找什么好处，可以从了解非阻塞I/O是如何工作的（例如，单线程Node.js上的并发性）及其效果开始。



### Servers

Spring WebFlux支持Tomcat、Jetty、Servlet 3.1+容器，以及Netty和Undertow等非Servlet运行时容器。所有服务器都适应低级的公共API，以便跨服务器支持高级编程模型。

Spring WebFlux没有内置启动或停止服务器的支持。然而，从Spring配置和WebFlux基础设施中组装一个应用程序，并通过几行代码运行它是很容易的。

Spring Boot有一个WebFlux starter可以自动执行这些步骤。默认情况下，starter使用Netty，但通过更改Maven或Gradle依赖项，很容易切换到Tomcat、Jetty或Undertow。Spring Boot默认使用Netty，因为它更广泛地用于异步、非阻塞空间，并允许客户端和服务器共享资源。

Tomcat和Jetty可以与Spring MVC和WebFlux一起使用。但是请记住，它们的使用方式是非常不同的。Spring MVC依赖于Servlet阻塞I/O，并允许应用程序在需要时直接使用Servlet API。Spring WebFlux依赖于Servlet 3.1非阻塞I/O，并使用底层适配器后面的Servlet API。它不暴露于直接使用。

对于Undertow， Spring WebFlux直接使用Undertow API，而不使用Servlet API。



### Performance

性能有许多特点和意义。响应式和非阻塞通常不会使应用程序运行得更快。在某些情况下，它们可以（例如，如果使用WebClient并行执行远程调用）。总的来说，非阻塞方式需要更多的工作，这可能会稍微增加所需的处理时间。

响应式和非阻塞的主要预期好处是能够使用固定数量的小线程和更少的内存进行扩展。这使得应用程序在负载下更有弹性，因为它们以更可预测的方式扩展。但是，为了观察到这些好处，您需要有一定的延迟（包括缓慢和不可预测的网络I/O）。这就是响应式堆栈开始显示其优势的地方，而且差异可能是巨大的。



### Concurrency Model

Spring MVC和Spring WebFlux都支持带注释的控制器，但是在并发模型和对阻塞和线程的默认假设上有一个关键的区别。

在Spring MVC（一般的servlet应用程序）中，假定应用程序可以`阻塞当前线程`（例如，远程调用）。出于这个原因，servlet容器使用一个大的线程池来吸收请求处理期间潜在的阻塞。

在Spring WebFlux（一般的非阻塞服务器）中，假定应用程序不会阻塞。因此，非阻塞服务器使用一个小的、固定大小的线程池（事件循环工作者）来处理请求。

“伸缩to scale”和“少量线程(small number of threads)”听起来可能是矛盾的，但从不阻塞当前线程（而是依赖回调）意味着您不需要额外的线程，因为没有阻塞调用需要吸收。



**调用阻塞API**：如果确实需要使用阻塞库怎么办？Reactor和RxJava都提供了`publishOn`操作符，以便在不同的线程上继续处理。这意味着有一个很容易的逃生口。但是请记住，阻塞api并不适合这种并发模型。

**Mutable State(可变状态)**：在Reactor和RxJava中，可以通过操作符声明逻辑。在运行时，将形成一个响应式管道，其中在不同的阶段按顺序处理数据。这样做的一个关键好处是，它使应用程序不必保护可变状态，因为该管道中的应用程序代码永远不会并发调用。

**Threading Model(线程模型)：**

- 在一个“普通”的Spring WebFlux服务器上（例如，没有数据访问，也没有其他可选的依赖项），你可以期望一个线程用于服务器，其他几个线程用于处理请求（通常与CPU内核数量一样多）。然而，Servlet容器可以从更多线程开始（例如，Tomcat上有10个线程），以支持Servlet（阻塞）I/O和Servlet 3.1（非阻塞）I/O使用。

- 响应式WebClient以事件循环的方式运行。因此，您可以看到与此相关的少量固定数量的处理线程（例如，带有Reactor Netty连接器的`reactor-http-nio-`）。但是，如果Reactor Netty用于客户端和服务器，则两者默认共享事件循环资源。

- Reactor和RxJava提供了线程池抽象（称为调度器），与用于将处理切换到不同线程池的publishOn操作符一起使用。调度器的名称暗示了特定的并发策略—例如，“并行parallel”（用于线程数量有限的cpu绑定工作）或“弹性elastic”（用于线程数量大量的I/O绑定工作）。如果看到这样的线程，则意味着某些代码正在使用特定的线程池Scheduler策略。
- 数据访问库和其他第三方依赖也可以创建和使用它们自己的线程。

**Configuring**：Spring 框架不支持启动和停止服务器。要为服务器配置线程模型，需要使用特定于服务器的配置API，或者使用Spring Boot，请检查每个服务器的Spring Boot配置选项。您可以直接配置 WebClient。



## 2.Reactive Core



**HttpHandler**：HTTP请求处理的基本协议，包括非阻塞I/O和响应式流回压，以及反应器Netty、Undertow、Tomcat、Jetty和任何Servlet 3.1+容器的适配器。

**WebHandler API**：用于请求处理的通用web API，在此基础上构建具体的编程模型，如带注释的控制器和功能端点。

对于客户端，有一个基本的`ClientHttpConnector`契约，用于执行具有非阻塞I/O和响应式流回压的HTTP请求，以及用于Reactor Netty和响应式Jetty HttpClient的适配器。应用程序中使用的高级WebClient建立在这个基本契约之上。

对于客户机和服务器，用于HTTP请求和响应内容的序列化和反序列化的编解码器(codecs)。



### HttpHandler

HttpHandler是一个简单的抽象，用一个方法来处理请求和响应。它是有意最小化的，其主要和唯一的目的是对不同的HTTP服务器API进行最小的抽象。

| Server name      | Server API                                                   | Reactive支持                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Netty            | Netty API                                                    | [Reactor Netty](https://github.com/reactor/reactor-netty)    |
| Undertow         | Undertow API                                                 | spring-web: Undertow to Reactive Streams bridge              |
| Tomcat           | 非阻塞的Servlet 3.1; Tomcat API to read and write ByteBuffers vs byte[] | spring-web: Servlet 3.1 non-blocking I/O to Reactive Streams bridge |
| Jetty            | 非阻塞的Servlet 3.1; Jetty API to write ByteBuffers vs byte[] | spring-web: Servlet 3.1 non-blocking I/O to Reactive Streams bridge |
| Servlet 3.1 容器 | 非阻塞的Servlet 3.1                                          | spring-web: Servlet 3.1 non-blocking I/O to Reactive Streams bridge |

Server的依赖：

| Server name   | Group id                | Artifact name               |
| ------------- | ----------------------- | --------------------------- |
| Reactor Netty | io.projectreactor.netty | reactor-netty               |
| Undertow      | io.undertow             | undertow-core               |
| Tomcat        | org.apache.tomcat.embed | tomcat-embed-core           |
| Jetty         | org.eclipse.jetty       | jetty-server, jetty-servlet |

HttpHandler适配器和Server API的代码示例：

::: tabs

@tab Reactor Netty

~~~java
HttpHandler handler = ...
ReactorHttpHandlerAdapter adapter = new ReactorHttpHandlerAdapter(handler);
HttpServer.create().host(host).port(port).handle(adapter).bind().block();

~~~

@tab Undertow

~~~java
HttpHandler handler = ...
UndertowHttpHandlerAdapter adapter = new UndertowHttpHandlerAdapter(handler);
Undertow server = Undertow.builder().addHttpListener(port, host).setHandler(adapter).build();
server.start();

~~~

@tab Tomcat

~~~java
HttpHandler handler = ...
Servlet servlet = new TomcatHttpHandlerAdapter(handler);

Tomcat server = new Tomcat();
File base = new File(System.getProperty("java.io.tmpdir"));
Context rootContext = server.addContext("", base.getAbsolutePath());
Tomcat.addServlet(rootContext, "main", servlet);
rootContext.addServletMappingDecoded("/", "main");
server.setHost(host);
server.setPort(port);
server.start();

~~~

@tab Jetty

~~~java
HttpHandler handler = ...
Servlet servlet = new JettyHttpHandlerAdapter(handler);

Server server = new Server();
ServletContextHandler contextHandler = new ServletContextHandler(server, "");
contextHandler.addServlet(new ServletHolder(servlet), "/");
contextHandler.start();

ServerConnector connector = new ServerConnector(server);
connector.setHost(host);
connector.setPort(port);
server.addConnector(connector);
server.start();

~~~

@tab Servlet 3.1+容器

作为war包部署到Servlet3.1+容器，在WAR中扩展和包含AbstractReactiveWebInitializer。这个类用ServletHttpHandlerAdapter包装了一个HttpHandler，并将其注册为Servlet。

:::



### WebHandler API

`org.springframework.web.server`包建立在`HttpHandler`抽象之上，提供一个通用的web API，通过多个`WebExceptionHandler`、多个`WebFilter`和一个`WebHandler`组件组成的链来处理请求。这个链可以通过`WebHttpHandlerBuilder`简单地指向一个自动检测组件的Spring`ApplicationContext`，通过向构建器注册组件来组合在一起。

WebHandler API旨在提供更广泛的web应用程序中常用的功能集：

- 具有属性的用户Session。
- 请求属性。
- 解析请求的`Locale`或`Principal`。
- 访问已解析和缓存的表单数据。
- multipart data(二进制)数据。
- 等

`WebHttpHandlerBuilder`可以在Spring`ApplicationContext`中自动检测的组件：

| Bean名称                   | Bean类型                   | 数量 | 作用                                                         |
| -------------------------- | -------------------------- | ---- | ------------------------------------------------------------ |
| 任何                       | WebExceptionHandler        | 0-N  | 为来自WebFilter链和目标WebHandler异常提供处理                |
| 任何                       | WebFilter                  | 0-N  | 对目标WebHandler应用拦截                                     |
| webHandler                 | WebHandler                 | 1    | 处理请求                                                     |
| webSessionManager          | WebSessionManager          | 0-1  | 通过ServerWebExchange上的方法公开的WebSession实例的管理器。默认DefaultWebSessionManager |
| serverCodecConfigurer      | ServerCodecConfigurer      | 0-1  | 为了访问HttpMessageReader实例，以解析表单数据和多部分数据，然后通过ServerWebExchange上的方法公开。默认为ServerCodecConfigurer.create()。 |
| localeContextResolver      | LocaleContextResolver      | 0-1  | 通过ServerWebExchange上的一个方法公开LocaleContext的解析器。默认AcceptHeaderLocaleContextResolver。 |
| forwardedHeaderTransformer | ForwardedHeaderTransformer | 0-1  | 用于处理转发的类型标头，要么提取并删除它们，要么仅删除它们。默认情况下不使用 |



::: tabs

@tab Form Data

~~~java
// ServerWebExchange 提供获取表单数据的方法
Mono<MultiValueMap<String, String>> getFormData();

~~~

`DefaultServerWebExchange`使用配置的`HttpMessageReader`将表单数据(`application/x-www-form-urlencoded`)解析为`MultiValueMap`。默认情况下，将`FormHttpMessageReader`配置为供`ServerCodecConfigurer`bean使用。

@tab Multipart Data

~~~java
// ServerWebExchange 提供获取Multipart Data的方法
Mono<MultiValueMap<String, Part>> getMultipartData();

~~~

`DefaultServerWebExchange`使用配置的HttpMessageReader\<MultiValueMap\<String, Part\>\>将`multipart/form-data`内容解析为`MultiValueMap`。目前，[Synchronoss NIO Multipart](https://github.com/synchronoss/nio-multipart)是唯一支持的第三方库，也是我们所知道的唯一能够对多部分请求进行非阻塞解析的库。它是通过`ServerCodecConfigurer` bean启用的。

要以流方式解析多部分数据，你可以使用HttpMessageReader\<Part\>返回的Flux\<Part\>。例如，在带注释的控制器中，使用@RequestPart意味着通过名称对各个部分进行类似Map的访问，因此需要完整地解析多部分数据。相反，你可以使用@RequestBody将内容解码为Flux\<Part\>，而不需要收集到`MultiValueMap`。



:::



当请求通过代理（如负载平衡器）时，主机、端口和方案可能会发生变化。从客户机的角度来看，创建指向正确的主机、端口和模式的链接是一个挑战。

[RFC7329](https://tools.ietf.org/html/rfc7239)定义了代理可以使用原始信息的Forwarded请求头，也有其它非标准头：X-Forwarded-Host、X-Forwarded-Port、X-Forwarded-Proto、X-Forwarded-Prefix、X-Forwarded-Ssl。

`ForwardedHeaderTransformer`是一个组件，它根据转发的请求头修改请求的主机、端口和方案，然后删除这些报头。如果将其声明为名称为`forwardedHeaderTransformer`的bean，它将被检测并使用。

对于转发的标头有一些安全方面的考虑，因为应用程序无法知道标头是由代理添加的，还是由恶意客户端添加的。这就是为什么应该将信任边界上的代理配置为删除来自外部的不受信任的转发流量。可以配置`ForwardedHeaderTransformer`的`removeOnly=true`，在这种情况下，它会删除但不使用标头。

**在5.1中，`ForwardedHeaderFilter`已弃用，并被`ForwardedHeaderTransformer`所取代，因此可以在创建交换之前更早地处理转发的报头。如果无论如何都配置了过滤器，则将其从过滤器列表中取出，而使用ForwardedHeaderTransformer。**



### Filters

在`WebHandler API`中，可以使用`WebFilter`在过滤器和目标WebHandler处理链的其余部分之前和之后应用拦截式逻辑。当使用WebFlux配置时，注册WebFilter很简单，只需将其声明为Spring bean，并（可选地）通过在bean声明中使用`@Order`或实现`Ordered`来表示优先级。



CORS过滤器与Spring Security一起使用时，必须在Spring Security的过滤器链之前生效。



### Exceptions

在WebHandler API中，可以使用`WebExceptionHandler`来处理来自WebFilter实例链和目标WebHandler的异常。当使用WebFlux配置时，注册一个WebExceptionHandler非常简单，只需将其声明为一个Spring bean，并（可选地）通过在bean声明中使用`@Order`或实现`Ordered`来表示优先级。



| WebExceptionHandler                   | 作用                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| ResponseStatusExceptionHandler        | 通过设置对异常的HTTP状态码的响应，提供对ResponseStatusException类型异常的处理。 |
| WebFluxResponseStatusExceptionHandler | ResponseStatusExceptionHandler的扩展，也可以确定任何异常上的@ResponseStatus注释的HTTP状态代码。 |



### Codecs

`spring-web`和`spring-core`模块支持通过无阻塞的I/O和响应式流回压(Reactive Streams back pressure.)，将字节内容序列化(serializing)和反序列化(deserializing)到更高级别的对象。下面描述了这种支持：

- Encoder(org.springframework.core.codec)和Decoder是独立于HTTP对内容进行编码和解码的低级抽象。
- HttpMessageReader和HttpMessageWriter是编码和解码HTTP消息内容的抽象。
- Encoder可以用`EncoderHttpMessageWriter`包装以适应它在web应用程序中的使用，而Decoder可以用`DecoderHttpMessageReader`包装。
- `DataBuffer`抽象了不同的字节缓冲区表示(例如Netty `ByteBuf`， `java.nio.ByteBuffer`等)，是所有编解码器的工作原理。

https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/core.html#databuffers



`spring-core`模块提供了`byte[]`、`ByteBuffer`、`DataBuffer`、`Resource`和`String`编码器和解码器实现。`spring-web`模块提供`Jackson JSON`、`Jackson Smile`、`JAXB2`、`Protocol Buffers`和其他编码器和解码器，以及用于表单数据、多部分内容、服务器发送事件等的web-only HTTP消息读取器和写入器实现。

`ClientCodecConfigurer`和`ServerCodecConfigurer`通常用于配置和定制要在应用程序中使用的编解码器。





::: tabs

@tab Jackson JSON

当Jackson库存在时，JSON和二进制JSON(Smile)都被支持。

**Jackson2Decoder的工作原理如下：**

- Jackson的异步、非阻塞解析器用于将字节块流聚合到`TokenBuffer`中，每个字节块表示一个JSON对象。

- 每个`TokenBuffer`被传递给Jackson的`ObjectMapper`来创建一个更高级的对象。

- 当解码到单值(single-value)发布者(例如Mono)时，有一个TokenBuffer。

- 当解码到多值(multi-value)发布者(例如Flux)时，只要接收到足够的字节，每个TokenBuffer就会传递给`ObjectMapper`。输入内容可以是JSON数组，如果内容类型是application/stream+ JSON，也可以是[行分隔的JSON](https://en.wikipedia.org/wiki/JSON_streaming)。

**Jackson2Encoder的工作原理如下：**

- 对于单值发布者（例如Mono），只需通过ObjectMapper序列化它。

- 对于使用application/json的多值(multi-value)发布者，默认情况下使用Flux.collectToList()收集值，然后序列化结果集合。

- 对于具有流媒体类型(如`application/stream+json`或`application/stream+x-jackson-smile`)的多值发布者，使用行分隔的json格式分别对每个值进行编码、写入和刷新。

- 对于SSE，每个事件调用`Jackson2Encoder`，并刷新输出以确保无延迟地交付。

默认情况下，`Jackson2Encoder`和`Jackson2Decoder`都不支持String类型的元素。相反，默认假设是字符串或字符串序列表示序列化的JSON内容，由`CharSequenceEncoder`呈现。如果你需要从Flux\<String\>呈现一个JSON数组，使用Flux.collectToList()并编码一个Mono\<List\<String\>\>。



@tab Form Data

`FormHttpMessageReader`和`FormHttpMessageWriter`支持解码和编码`application/x-www-form-urlencoded`内容。

在服务器端，表单内容经常需要从多个地方访问，`ServerWebExchange`提供了一个专用的`getFormData()`方法，该方法通过`FormHttpMessageReader`解析内容，然后缓存结果以供重复访问。

一旦使用了`getFormData()`，就不能再从请求体中读取原始内容。出于这个原因，应用程序应该一致地通过`ServerWebExchange`访问缓存的表单数据，而不是从原始请求体中读取。



@tab Multipart

`MultipartHttpMessageReader`和`MultipartHttpMessageWriter`支持解码和编码`multipart/form-data`内容。反过来，`MultipartHttpMessageReader`将实际解析委托给另一个`HttpMessageReader`到Flux\<Part\>，然后简单地将这些部分收集到`MultiValueMap`中。目前实际的解析使用的是[Synchronoss NIO Multipart](https://github.com/synchronoss/nio-multipart)。

在可能需要从多个地方访问多部分表单内容的服务器端，`ServerWebExchange`提供了一个专用的`getMultipartData()`方法，该方法通过`MultipartHttpMessageReader`解析内容，然后缓存结果以供重复访问。

一旦使用了`getMultipartData()`，就不能再从请求体中读取原始内容。出于这个原因，应用程序必须始终如一地使用`getMultipartData()`来重复地、类似于映射的访问部件，或者依赖于`SynchronossPartHttpMessageReader`来一次性访问Flux\<Part\>。



@tab Limits

可以对缓冲部分或全部输入流的`Decoder`和`HttpMessageReader`实现进行配置，限制要在`内存中缓冲的最大字节数`。在某些情况下，发生缓冲是因为输入被聚合并表示为单个对象—例如，具有`@RequestBody`的控制器方法 `byte[]`、`x-www-form-urlencoded`数据等。在分割输入流，例如，分隔的文本、JSON对象流等时，流也可以发生缓冲。对于这些流情况，限制适用于流中与一个对象相关联的字节数。

要配置缓冲区大小，您可以检查给定的`Decoder`或`HttpMessageReader`是否公开了`maxInMemorySize`属性，如果是，则Javadoc将具有有关默认值的详细信息。在服务器端，`ServerCodecConfigurer`提供了一个设置所有编解码器的地方，请参阅HTTP消息编解码器。在客户端，可以在`WebClient.Builder`中更改所有编解码器的限制。

对于多部分解析，`maxInMemorySize`属性限制了非文件部分的大小。对于文件部分，它决定了该部分写入磁盘的阈值。对于写入磁盘的文件部分，有一个额外的`maxDiskUsagePerPart`属性来限制每个部分的磁盘空间量。还有一个`maxParts`属性用于限制多部件请求中的部件总数。要在WebFlux中配置这三个，需要向`ServerCodecConfigurer`提供一个预先配置好的`MultipartHttpMessageReader`实例。



@tab Streaming

当流式传输到HTTP响应时(例如，`text/event-stream`, `application/stream+json`)，定期发送数据是很重要的，以便可靠地检测断开连接的客户端，越早越好。这样的发送可以是一个注释，空SSE事件或任何其他“无操作”数据，可以有效地充当心跳。



@tab DataBuffer

`DataBuffer`是WebFlux中字节缓冲区的表示形式。要理解的关键点是，在一些服务器(如Netty)上，字节缓冲区是池化的，并对引用进行计数，并且必须在使用后释放，以避免内存泄漏。

WebFlux应用程序通常不需要关心这些问题，除非它们直接使用或产生数据缓冲区，而不是依赖于编解码器来与更高级的对象进行转换，或者除非它们选择创建自定义编解码器。对于这种情况，请Spring-core数据缓冲区和编解码器中的信息，特别是关于使用数据缓冲区的部分。

:::



### Logging

在Spring WebFlux中，`DEBUG`级别的日志被设计成紧凑、最小和可阅读的。它侧重于反复有用的高价值信息，而不是仅在调试特定问题时有用的其他信息。

`TRACE`级别的日志记录通常遵循与`DEBUG`相同的原则，但可以用于调试任何问题。此外，一些日志消息可能在TRACE和DEBUG中显示不同级别的详细信息。

良好的日志记录来自使用日志的经验。

::: tabs



@tab Log Id

在WebFlux中，`单个请求`可以在`多个线程`中执行，线程ID对于关联属于特定请求的日志消息是没有用的。这就是为什么WebFlux日志消息在默认情况下会以特定于请求的ID作为前缀。

在服务器端，日志ID存储在`ServerWebExchange`属性`LOG_ID_ATTRIBUTE`中，而基于该ID的完全格式化的前缀可以从`ServerWebExchange.getLogPrefix()`中获得。在`WebClient`端，日志ID存储在`ClientRequest`属性`LOG_ID_ATTRIBUTE`中，而一个完全格式化的前缀可以从`ClientRequest.logPrefix()`中获得。



@tab Sensitive Data

DEBUG和TRACE日志记录可以记录敏感信息。这就是为什么表单参数和头在默认情况下是屏蔽的，必须显式地完全启用它们的日志记录。

**服务端如何配置记录详情：**

~~~java
@Configuration
@EnableWebFlux
class MyConfig implements WebFluxConfigurer {

    @Override
    public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
        configurer.defaultCodecs().enableLoggingRequestDetails(true);
    }
}
~~~

**客户端如何配置记录详情：**


~~~java
Consumer<ClientCodecConfigurer> consumer = configurer ->
        configurer.defaultCodecs().enableLoggingRequestDetails(true);

WebClient webClient = WebClient.builder()
        .exchangeStrategies(strategies -> strategies.codecs(consumer))
        .build();

~~~



@tab Custom codecs

应用程序可以注册自定义编解码器，以支持额外的媒体类型，或者默认编解码器不支持的特定行为。

配置一些选项在默认编解码器上强制执行。自定义编解码器可能希望有机会与这些首选项保持一致，例如强制缓冲限制或记录敏感数据。

~~~java
WebClient webClient = WebClient.builder()
        .codecs(configurer -> {
                CustomDecoder decoder = new CustomDecoder();
                configurer.customCodecs().registerWithDefaultConfig(decoder);
        })
        .build();

~~~



:::



## 3.DispatcherHandler

与Spring MVC类似，Spring WebFlux是围绕`前端控制器模式`设计的，其中中央`WebHandler` 、`DispatcherHandler`为请求处理提供共享算法，而实际工作则由可配置的委托组件执行。这个模型是灵活的，并且支持不同的工作流。

`DispatcherHandler`从Spring配置中发现它需要的委托组件。它本身也被设计成一个Spring bean，并实现了`ApplicationContextAware`来访问它运行的上下文。如果`DispatcherHandler`是用`webHandler`的bean名称声明的，那么它又会被`WebHttpHandlerBuilder`发现，后者将请求处理链组合在一起，如WebHandler API中所述。

WebFlux应用中的Spring配置通常包括：

- bean名为`webHandler`的`DispatcherHandler`。

- `WebFilter`和`WebExceptionHandler` bean

- DispatcherHandler特殊bean

- 其它配置

WebHttpHandlerBuilder构建HttpHandler(可以和Server适配器一起使用)：

~~~java
ApplicationContext context = ...
HttpHandler handler = WebHttpHandlerBuilder.applicationContext(context).build();

~~~



### Special Bean Types

`DispatcherHandler`委托特殊的bean处理请求并呈现适当的响应。所谓“特殊bean”，我们指的是实现WebFlux框架抽象的spring管理对象实例。框架通常带有内置默认抽象实现，但可以自定义它们的属性、扩展它们或替换它们。

下表列出了DispatcherHandler检测到的特殊bean：

| Bean类型             | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| HandlerMapping       | 将请求映射到处理程序。映射基于一些标准，其细节因HandlerMapping实现而异——带注释的controller、简单的URL模式映射等。<br/>HandlerMapping的主要实现是`RequestMappingHandlerMapping`，用于@RequestMapping注释方法，`RouterFunctionMapping`用于功能性端点路由，`SimpleUrlHandlerMapping`用于显式注册URI路径模式和WebHandler实例。 |
| HandlerAdapter       | 帮助`DispatcherHandler`调用映射到请求的处理程序，而不管实际如何调用该处理程序。例如，调用带注释的controller需要解析注释。HandlerAdapter的主要目的是保护DispatcherHandler不受这些细节的影响。 |
| HandlerResultHandler | 处理程序调用的结果并最终确定响应。                           |



### Processing

DispatcherHandler按以下方式处理请求：

- 要求每个`HandlerMapping`找到一个匹配的处理程序，并使用第一个匹配。
- 如果找到处理程序，则通过适当的`HandlerAdapter`执行该处理程序，该处理程序将执行的返回值作为`HandlerResult`公开。
- `HandlerResult`被给定给一个适当的`HandlerResultHandler`，通过直接写入响应或使用视图来呈现来完成处理。



### Result Handling

通过`HandlerAdapter`调用处理程序的返回值被包装成`HandlerResult`以及一些额外的上下文，并传递给声明支持它的第一个`HandlerResultHandler`。下表显示了可用的`HandlerResultHandler`实现，它们都在WebFlux配置中声明：

| HandlerResultHandler实现    | 处理之                                                       | 默认Order值       |
| --------------------------- | ------------------------------------------------------------ | ----------------- |
| ResponseEntityResultHandler | ResponseEntity，通常来自@Controller                          | 0                 |
| ServerResponseResultHandler | ServerResponse，通常来自函数式端点                           | 0                 |
| ResponseBodyResultHandler   | 处理来自@ResponseBody方法或@RestController类的返回值         | 100               |
| ViewResolutionResultHandler | CharSequence、View、Model、Map、Rendering或任何其他对象都被视为模型属性。 | Integer.MAX_VALUE |



### Exceptions

从`HandlerAdapter`返回的`HandlerResult`公开一个函数，用于基于某些特定于处理程序的机制进行错误处理。在下列情况下调用这个错误函数：

- 处理程序调用失败，例如来自@Controller类的方法。

- 通过`HandlerResultHandler`处理程序返回值失败。

只要在处理程序返回的响应类型产生任何数据项之前出现错误信号，`error`函数就可以更改响应(例如，更改错误状态码)。

这就是支持`@Controller`类中的`@ExceptionHandler`方法的方式。相比之下，在Spring MVC中对相同的支持是建立在`HandlerExceptionResolver`之上的。这通常应该无关紧要。然而，在WebFlux中，不能使用`@ControllerAdvice`来处理在确认`handler`之前发生的异常。



**为Controller配置全局异常方式同SpringMVC。**





### View Resolution

视图解析支持使用HTML模板和模型向浏览器呈现，而无需将您绑定到特定的视图技术。在Spring WebFlux中，视图解析是通过一个专用的`HandlerResultHandler`来支持的，这个1HandlerResultHandler1使用ViewResolver实例来映射字符串(表示逻辑视图名称)到视图实例。然后使用View来呈现响应。



**处理：**

传递给`ViewResolutionResultHandler`的`HandlerResult`包含来自处理程序的返回值和包含在请求处理期间添加的属性的模型。返回值按以下方式处理：

- String，CharSequence：通过配置的ViewResolver实现列表解析为视图的逻辑视图名称。
- void：根据请求路径选择默认视图名称，减去开头和结尾的斜杠，并将其解析为view。当没有提供视图名称（例如，返回模型属性）或异步返回值（例如，Mono完成为空）时也会发生同样的情况。
- Rendering：用于视图解析场景的API。使用代码完成功能探索IDE中的选项。
- Model、Map：要为请求添加到模型中的额外模型属性。
- 任何其他返回值(简单类型除外，由`BeanUtils.isSimpleProperty`决定)被视为要添加到模型中的模型属性。除非存在处理程序方法@ModelAttribute注释，否则属性名根据约定从类名派生而来。

模型可以包含异步的、响应的类型（例如，来自Reactor或RxJava）。在呈现之前，`AbstractView`将这些模型属性解析为具体的值并更新模型。单值响应类型被解析为单个值或无值（如果为空），而多值响应类型（例如Flux\<T\>）被收集并解析为List\<T\>。

配置视图解析就像在Spring配置中添加`ViewResolutionResultHandler` bean一样简单。WebFlux Config为视图解析提供了一个专用的配置API。



**Redirecting：**

视图名称中的特殊`redirect:`前缀允许您执行重定向。`UrlBasedViewResolver`(及其子类)将此识别为需要重定向的指令。视图名称的其余部分是重定向URL。

最终效果与控制器返回`RedirectView`或`Rendering.redirectTo("abc").build()`相同，但现在控制器本身可以根据逻辑视图名称进行操作。视图名（如redirect:/some/resource）是相对于当前应用程序的，而`redirect:https://example.com/arbitrary/path`，重定向到绝对URL。



**Content Negotiation：**

`ViewResolutionResultHandler`支持内容协商。它将请求媒体类型与每个选定视图所支持的媒体类型进行比较。使用支持所请求媒体类型的第一个视图。

为了支持像JSON和XML这样的媒体类型，Spring WebFlux提供了`HttpMessageWriterView`，这是一个通过`HttpMessageWriter`呈现的特殊视图。通常，你会通过WebFlux配置将它们配置为默认视图。如果默认视图与所请求的媒体类型匹配，则始终选择和使用默认视图。



## 4.Annotated Controllers

参考SpringMVC 注解控制



## 5.Functional Endpoints

参考SpringMVC Functional接口



## 6.URI Links

参考SpringMVC URL



## 7.CORS



**WebFluxConfigurer配置全局跨域**

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

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



**配置跨域过滤器：**

~~~java
@Bean
CorsWebFilter corsFilter() {

    CorsConfiguration config = new CorsConfiguration();

    // Possibly...
    // config.applyPermitDefaultValues()

    config.setAllowCredentials(true);
    config.addAllowedOrigin("https://domain1.com");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return new CorsWebFilter(source);
}

~~~



## 8.Web Security



## 9.View Technologies



## 10.HTTP Caching



## 11.WebFlux配置

WebFlux Java配置声明了用带注释的控制器或功能端点处理请求所需的组件，并提供了一个API来定制配置。这意味着您不需要了解由Java配置创建的底层bean。然而，如果你想了解它们，你可以在`WebFluxConfigurationSupport`中看到它们。



### 开启WebFlux配置

@EnableWebFlux注解。

~~~java
@Configuration
@EnableWebFlux
public class WebConfig {
}

~~~



### WebFlux API配置

实现`WebFluxConfigurer`自定义配置。

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    // 实现的接口
}

~~~



### Conversion, formatting

默认情况下，支持各种数字和日期类型的格式化程序，并支持通过字段上的`@NumberFormat`和`@DateTimeFormat`进行自定义。

注册自定义格式化程序和转换器：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        // ...
    }

}

~~~

默认情况下，Spring WebFlux在解析和格式化日期值时考虑请求的Locale。这适用于将日期表示为带有“input”表单字段的字符串的表单。然而，对于“日期”和“时间”表单字段，浏览器使用HTML规范中定义的固定格式。对于这种情况，日期和时间格式可以自定义如下：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true);
        registrar.registerFormatters(registry);
    }
}

~~~



###  Validation

默认情况下，如果类路径上存在Bean Validation(例如，Hibernate验证器)，`LocalValidatorFactoryBean`将被注册为全局验证器，以便与@Controller方法参数上的@Valid和@Validated一起使用。

在你的Java配置中，你可以自定义全局Validator实例，如下面的例子所示：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public Validator getValidator(); {
        // ...
    }

}

~~~

单个controller注册：

~~~java
@Controller
public class MyController {

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(new FooValidator());
    }

}

~~~



### Content Type Resolvers

可以配置Spring WebFlux如何从请求中为@Controller实例确定所请求的媒体类型。默认情况下，只检查`Accept`报头，但您也可以启用基于查询参数的策略。

下面的例子展示了如何定制所请求的内容类型解析：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void configureContentTypeResolver(RequestedContentTypeResolverBuilder builder) {
        // ...
    }
}

~~~



### HTTP message codecs

自定义读取和写入请求体和响应体的：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
        configurer.defaultCodecs().maxInMemorySize(512 * 1024);
    }
}

~~~

`ServerCodecConfigurer`提供了一组默认的读取器和写入器。可以使用它来添加更多的阅读器和写入器，定制默认的阅读器和写入器，或者完全替换默认的阅读器和写入器。

对于Jackson JSON和XML，可以考虑使用`Jackson2ObjectMapperBuilder`，默认使用以下属性：

- DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES禁用。
- MapperFeature.DEFAULT_VIEW_INCLUSION禁用。

classpath检测到以下依赖，自动注册：

| 模块名                  | 地址                                                 | 作用                      |
| ----------------------- | ---------------------------------------------------- | ------------------------- |
| jackson-datatype-joda   | https://github.com/FasterXML/jackson-datatype-joda   | 支持Joda-Time类型         |
| jackson-datatype-jsr310 | https://github.com/FasterXML/jackson-datatype-jsr310 | 支持Java8的Date和Time API |
| jackson-datatype-jdk8   | https://github.com/FasterXML/jackson-datatype-jdk8   | 支持Java8的Optional       |
| jackson-module-kotlin   | https://github.com/FasterXML/jackson-module-kotlin   | 支持Kotlin类和数据类      |



### View Resolvers

配置视图解析方法：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        // ...
    }
}

~~~



::: tabs

@tab Freemarker

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.freeMarker();
    }

    // Configure Freemarker...

    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPath("classpath:/templates");
        return configurer;
    }
}

~~~



@tab ViewResolver实现

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        ViewResolver resolver = ... ;
        registry.viewResolver(resolver);
    }
}

~~~

@tab 视图配置 Content Negotiation

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.freeMarker();

        Jackson2JsonEncoder encoder = new Jackson2JsonEncoder();
        registry.defaultViews(new HttpMessageWriterView(encoder));
    }

    // ...
}

~~~



:::



### Static Resources

此选项提供了一种方便的方式，可以从基于资源的位置列表中提供静态资源。

在下一个示例中，给定一个以`/resources`开头的请求，相对路径用于查找和提供相对于类路径上的`/static`的静态资源。资源的有效期为一年，以确保最大限度地使用浏览器缓存并减少浏览器发出的HTTP请求。`Last-Modified`标头也会被求值，如果存在，则返回304状态码。示例如下：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
            .addResourceLocations("/public", "classpath:/static/")
            .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }

}

~~~

资源处理程序还支持`ResourceResolver`实现链和`ResourceTransformer`实现链，这些实现链可用于创建用于处理优化资源的工具链。

您可以根据从内容、固定的应用程序版本或其他信息计算出的MD5哈希值，使用`VersionResourceResolver`来处理受版本控制的资源url。`ContentVersionStrategy` （MD5哈希）是一个很好的选择，但有一些明显的例外（例如与模块加载器一起使用的JavaScript资源）。

下面的例子展示了如何在Java配置中使用VersionResourceResolver：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/public/")
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }

}

~~~

您可以使用`ResourceUrlProvider`重写url，并应用完整的解析器和转换器链(例如，插入版本)。WebFlux的配置提供了一个ResourceUrlProvider，这样它就可以被注入到其他配置中。

与Spring MVC不同的是，目前在WebFlux中，没有办法透明地重写静态资源url，因为没有视图技术可以利用解析器和转换器的非阻塞链。当只提供本地资源时，解决方法是直接使用ResourceUrlProvider(例如，通过自定义元素)和block。

注意，当同时使用`EncodedResourceResolver`(例如，Gzip， Brotli编码)和`VersionedResourceResolver`时，它们必须按此顺序注册，以确保基于内容的版本始终基于未编码的文件可靠地计算。

Webjar也可以通过`WebJarsResourceResolver`来支持，它会自动注册，当org.webjars:webjars-locator-core库存在。解析器可以重写url以包含jar的版本，也可以匹配没有版本的传入url——例如，从`/jquery/jquery.min.js`到`/jquery/1.2.0/jquery.min.js`。



### Path Matching

可以自定义与路径匹配相关的选项：

~~~java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer
            .setUseCaseSensitiveMatch(true)
            .setUseTrailingSlashMatch(false)
            .addPathPrefix("/api",
                    HandlerTypePredicate.forAnnotation(RestController.class));
    }
}

~~~

Spring WebFlux依赖于请求路径的解析表示RequestPath来访问解码后的路径段值，删除了分号内容(即路径或矩阵变量)。这意味着，与Spring MVC不同，不需要指示是否解码请求路径，也不需要指示是否为了路径匹配的目的而删除分号内容。

Spring WebFlux也不支持后缀模式匹配，不像在Spring MVC中，我们也建议不要依赖它。



### Advanced Configuration Mode

@EnableWebFlux注解导入了DelegatingWebFluxConfiguration，作用：

- 为WebFlux应用程序提供默认的Spring配置
- 检测并委托`WebFluxConfigurer`实现来定制该配置。

对于高级模式，你可以删除@EnableWebFlux并直接从`DelegatingWebFluxConfiguration`扩展，而不是实现`WebFluxConfigurer`，如下例所示：

~~~java
@Configuration
public class WebConfig extends DelegatingWebFluxConfiguration {

    // ...
}

~~~

您可以在WebConfig中保留现有的方法，但是您现在也可以覆盖基类中的bean声明，并且仍然可以在类路径中使用任意数量的其他WebMvcConfigurer实现。