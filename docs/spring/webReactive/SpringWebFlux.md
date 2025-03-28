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



**调用阻塞API：**如果确实需要使用阻塞库怎么办？Reactor和RxJava都提供了`publishOn`操作符，以便在不同的线程上继续处理。这意味着有一个很容易的逃生口。但是请记住，阻塞api并不适合这种并发模型。

**Mutable State(可变状态)：**在Reactor和RxJava中，可以通过操作符声明逻辑。在运行时，将形成一个响应式管道，其中在不同的阶段按顺序处理数据。这样做的一个关键好处是，它使应用程序不必保护可变状态，因为该管道中的应用程序代码永远不会并发调用。

**Threading Model(线程模型)：**

- 在一个“普通”的Spring WebFlux服务器上（例如，没有数据访问，也没有其他可选的依赖项），你可以期望一个线程用于服务器，其他几个线程用于处理请求（通常与CPU内核数量一样多）。然而，Servlet容器可以从更多线程开始（例如，Tomcat上有10个线程），以支持Servlet（阻塞）I/O和Servlet 3.1（非阻塞）I/O使用。

- 响应式WebClient以事件循环的方式运行。因此，您可以看到与此相关的少量固定数量的处理线程（例如，带有Reactor Netty连接器的`reactor-http-nio-`）。但是，如果Reactor Netty用于客户端和服务器，则两者默认共享事件循环资源。

- Reactor和RxJava提供了线程池抽象（称为调度器），与用于将处理切换到不同线程池的publishOn操作符一起使用。调度器的名称暗示了特定的并发策略—例如，“并行parallel”（用于线程数量有限的cpu绑定工作）或“弹性elastic”（用于线程数量大量的I/O绑定工作）。如果看到这样的线程，则意味着某些代码正在使用特定的线程池Scheduler策略。
- 数据访问库和其他第三方依赖也可以创建和使用它们自己的线程。

**Configuring：**Spring框架不支持启动和停止服务器。要为服务器配置线程模型，需要使用特定于服务器的配置API，或者使用Spring Boot，请检查每个服务器的Spring Boot配置选项。您可以直接配置WebClient。



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