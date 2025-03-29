# WebClient

Spring WebFlux为HTTP请求提供了一个响应式、非阻塞的WebClient。客户端有一个功能性的、流畅的API，带有用于声明性组合的响应式类型，参见Reactive Libraries。WebFlux客户端和服务器依赖于相同的非阻塞编解码器来编码和解码请求和响应内容。

在内部WebClient委托给一个HTTP客户端库。默认情况下，它使用[Reactor Netty](https://github.com/reactor/reactor-netty)，内置了对Jetty [reactive HttpClient](https://github.com/jetty-project/jetty-reactive-httpclient)的支持，其他的可以通过`ClientHttpConnector`插入。



## 1.Configuration

静态方法简单创建WebClient的方式(使用Reactor Netty HttpClient默认配置，`io.projectreactor.netty:reactor-netty`要在classpath上)：

- WebClient.create()
- WebClient.create(String baseUrl)

WebClient.builder()创建支持更多选项：

- uriBuilderFactory：自定义UriBuilderFactory作为基础URL。
- defaultHeader：每个请求的标头。
- defaultCookie：每个请求的cookie。
- defaultRequest：自定义每个请求的消费者。
- filter：每个请求的客户端过滤器。
- exchangeStrategies：自定义HTTP消息阅读器/写入器。
- clientConnector: HTTP客户端库设置。



~~~java
WebClient client = WebClient.builder()
        .exchangeStrategies(builder -> {
                return builder.codecs(codecConfigurer -> {
                    // 自定义HTTP消息阅读器/写入器
                });
        })
        .build();

~~~

一旦构建，**WebClient实例是不可变的**。但是可以克隆它并构建一个修改后的副本，而不会影响原始实例，如下面的示例所示：

~~~java
WebClient client1 = WebClient.builder()
        .filter(filterA).filter(filterB).build();

WebClient client2 = client1.mutate()
        .filter(filterC).filter(filterD).build();

// client1 has filterA, filterB

// client2 has filterA, filterB, filterC, filterD

~~~



### MaxInMemorySize

Spring WebFlux为编解码器在内存中缓冲数据配置限制，以避免应用程序内存问题。默认情况下，它被配置为`256KB`，如果这对你的用例来说还不够，你会看到以下内容：**org.springframework.core.io.buffer.DataBufferLimitException: Exceeded limit on max bytes to buffer**

**修改缓冲区内存：**

~~~java
WebClient webClient = WebClient.builder()
        .exchangeStrategies(builder ->
            builder.codecs(codecs ->
                codecs.defaultCodecs().maxInMemorySize(2 * 1024 * 1024)
            )
        )
        .build();

~~~



### Reactor Netty

要自定义Reactor Netty设置，只需提供一个预配置的HttpClient：

~~~java
HttpClient httpClient = HttpClient.create().secure(sslSpec -> ...);

WebClient webClient = WebClient.builder()
        .clientConnector(new ReactorClientHttpConnector(httpClient))
        .build();

~~~



#### Resources

默认情况下，HttpClient参与在`reactor.netty.http.HttpResources`中保存的全局Reactor Netty资源，包括事件循环线程和连接池。这是推荐的模式，因为对于事件循环并发性来说，固定的共享资源是首选。在此模式下，全局资源在进程退出之前保持活动状态。

如果服务器与进程同步，则通常不需要显式关闭。然而，如果服务器可以启动或停止进程中(例如，作为WAR部署的Spring MVC应用程序)，你可以声明一个类型为`ReactorResourceFactory`的Spring管理bean， 配置`globalResources=true`(默认值)，以确保在Spring ApplicationContext关闭时，反应器Netty全局资源被关闭，如下例所示：

~~~java
@Bean
public ReactorResourceFactory reactorResourceFactory() {
    return new ReactorResourceFactory();
}

~~~

您也可以选择不参与全局Reactor Netty资源。然而，在这种模式下，负担是在你确保所有的反应器Netty客户端和服务器实例使用共享资源，如下面的例子所示：

~~~java
@Bean
public ReactorResourceFactory resourceFactory() {
    ReactorResourceFactory factory = new ReactorResourceFactory();
    // 不使用全局共享资源
    factory.setUseGlobalResources(false); 
    return factory;
}

@Bean
public WebClient webClient() {

    Function<HttpClient, HttpClient> mapper = client -> {
        // Further customizations...
    };

    // 使用带有资源工厂的ReactorClientHttpConnector构造函数
    ClientHttpConnector connector =
            new ReactorClientHttpConnector(resourceFactory(), mapper); 

    // 将连接器插入WebClient.Builder
    return WebClient.builder().clientConnector(connector).build(); 
}

~~~



#### Timeouts

配置连接超时时间：

~~~java
import io.netty.channel.ChannelOption;

HttpClient httpClient = HttpClient.create()
        .tcpConfiguration(client ->
                client.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000));

~~~

配置读/写超时时间：

~~~java
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;

HttpClient httpClient = HttpClient.create()
        .tcpConfiguration(client ->
                client.doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(10))
                        .addHandlerLast(new WriteTimeoutHandler(10))));

~~~



### Jetty

自定义Jetty HttpClient配置：

~~~java
HttpClient httpClient = new HttpClient();
httpClient.setCookieStore(...);
ClientHttpConnector connector = new JettyClientHttpConnector(httpClient);

WebClient webClient = WebClient.builder().clientConnector(connector).build();

~~~

默认情况下，HttpClient创建自己的资源(Executor、ByteBufferPool、Scheduler)，这些资源在进程退出或调用stop()之前保持活动状态。

你可以在Jetty客户端(和服务器)的多个实例之间共享资源，并通过声明一个类型为`JettyResourceFactory`的Spring管理bean来确保在Spring ApplicationContext关闭时关闭资源，如下例所示：

~~~java
@Bean
public JettyResourceFactory resourceFactory() {
    return new JettyResourceFactory();
}

@Bean
public WebClient webClient() {

    HttpClient httpClient = new HttpClient();
    // Further customizations...

    // JettyClientHttpConnector 使用资源工厂的构造方法
    ClientHttpConnector connector =
            new JettyClientHttpConnector(httpClient, resourceFactory()); 
	// 构造器中插入连接器
    return WebClient.builder().clientConnector(connector).build(); 
}

~~~



## 2.retrieve()

retrieve()方法是获取响应体并对其进行解码的最简单方法。下面的例子展示了如何这样做：

~~~java
WebClient client = WebClient.create("https://example.org");

Mono<Person> result = client.get()
        .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(Person.class);

~~~

从响应流中解码对象：

~~~java
Flux<Quote> result = client.get()
        .uri("/quotes").accept(MediaType.TEXT_EVENT_STREAM)
        .retrieve()
        .bodyToFlux(Quote.class);

~~~

默认情况下，具有`4xx`或`5xx`状态码的响应会导致`WebClientResponseException`或其HTTP状态特定的子类之一，例如`WebClientResponseException.BadRequest`、`WebClientResponseException.NotFound`。等。你也可以使用`onStatus`方法自定义产生的异常，如下例所示：

~~~java
Mono<Person> result = client.get()
        .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError, response -> ...)
        .onStatus(HttpStatus::is5xxServerError, response -> ...)
        .bodyToMono(Person.class);

~~~

当使用onStatus时，如果期望响应有内容，那么onStatus回调应该使用它。如果没有，内容将自动排空，以确保资源被释放。



## 3.exchange()

`exchange()`方法提供了比`retrieve`方法更多的控制。下面的例子等价于`retrieve()`，但也提供了对`ClientResponse`的访问：

~~~java
Mono<Person> result = client.get()
        .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
        .exchange()
        .flatMap(response -> response.bodyToMono(Person.class));

~~~

response创建ResponseEntity：

~~~java
Mono<ResponseEntity<Person>> result = client.get()
        .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
        .exchange()
        .flatMap(response -> response.toEntity(Person.class));

~~~

请注意(与retrieve()不同)，exchange()对于`4xx`和`5xx`响应没有自动错误信号。您必须检查状态码并决定如何继续。

与retrieve()不同的是，在使用exchange()时，应用程序负责使用任何响应内容，而不考虑场景（成功、错误、意外数据等）。**不做处理可能会导致内存泄漏**。`ClientResponse`的Javadoc列出了用于消费主体的所有可用选项。通常更喜欢使用`retrieve()`，除非您有很好的理由使用exchange()，它允许在决定如何或是否使用响应之前检查响应状态和头。



## 4.Request Body

请求体可以从`ReactiveAdapterRegistry`处理的任何异步类型编码，如`Mono`或Kotlin Coroutines `Deferred`，如下例所示：

~~~java
Mono<Person> personMono = ... ;

Mono<Void> result = client.post()
        .uri("/persons/{id}", id)
        .contentType(MediaType.APPLICATION_JSON)
        .body(personMono, Person.class)
        .retrieve()
        .bodyToMono(Void.class);

~~~

Flux对象请求体：

~~~java
Flux<Person> personFlux = ... ;

Mono<Void> result = client.post()
        .uri("/persons/{id}", id)
        .contentType(MediaType.APPLICATION_STREAM_JSON)
        .body(personFlux, Person.class)
        .retrieve()
        .bodyToMono(Void.class);

~~~

直接使用对象：

~~~java
Person person = ... ;

Mono<Void> result = client.post()
        .uri("/persons/{id}", id)
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(person)
        .retrieve()
        .bodyToMono(Void.class);

~~~



### Form Data

要发送表单数据，可以提供MultiValueMap\<String, String\>作为主体。注意，内容被`FormHttpMessageWriter`自动设置为`application/x-www-form-urlencoded`。下面的例子展示了如何使用MultiValueMap\<String, String\>：

~~~java
MultiValueMap<String, String> formData = ... ;

Mono<Void> result = client.post()
        .uri("/path", id)
        .bodyValue(formData)
        .retrieve()
        .bodyToMono(Void.class);

~~~

使用BodyInserters方法构建MultiValueMap：

~~~java
import static org.springframework.web.reactive.function.BodyInserters.*;

Mono<Void> result = client.post()
        .uri("/path", id)
        .body(fromFormData("k1", "v1").with("k2", "v2"))
        .retrieve()
        .bodyToMono(Void.class);

~~~



### Multipart Data

要发送多部分数据，您需要提供MultiValueMap\<String, ?\>，其值要么是表示部分内容的`Object`实例，要么是表示部分内容和请求头的`HttpEntity`实例。`MultipartBodyBuilder`提供了一个方便的API来准备多部分请求。下面的示例展示了如何创建MultiValueMap：

~~~java
MultipartBodyBuilder builder = new MultipartBodyBuilder();
builder.part("fieldPart", "fieldValue");
builder.part("filePart1", new FileSystemResource("...logo.png"));
builder.part("jsonPart", new Person("Jason"));
builder.part("myPart", part); // Part from a server request

MultiValueMap<String, HttpEntity<?>> parts = builder.build();

~~~

在大多数情况下，不必为每个部分指定`Content-Type`。内容类型是根据选择序列化它的`HttpMessageWriter`自动确定的，或者在资源的情况下，根据文件扩展名自动确定的。如果有必要，您可以通过一个重载的构建器部件方法显式地提供要用于每个部件的`MediaType`。

一旦`MultiValueMap`准备好了，把它传递给WebClient最简单的方法就是通过body方法，如下面的例子所示：

~~~java
MultipartBodyBuilder builder = ...;

Mono<Void> result = client.post()
        .uri("/path", id)
        .body(builder.build())
        .retrieve()
        .bodyToMono(Void.class);

~~~

如果`MultiValueMap`包含至少一个非string值，该值也可以表示常规表单数据(即`application/x-www-form-urlencoded`)，则不需要将`Content-Type`设置为`multipart/form-data`。在使用`MultipartBodyBuilder`时总是这样，它确保了HttpEntity包装器。

作为`MultipartBodyBuilder`的另一种选择，你还可以通过内置的`BodyInserters`提供内联样式的多部分内容，如下例所示：

~~~java
import static org.springframework.web.reactive.function.BodyInserters.*;

Mono<Void> result = client.post()
        .uri("/path", id)
        .body(fromMultipartData("fieldPart", "value").with("filePart", resource))
        .retrieve()
        .bodyToMono(Void.class);

~~~



## 5.Client Filters

您可以通过`WebClient.Builder`注册一个客户端过滤器`ExchangeFilterFunction`来拦截和修改请求，如下例所示：

~~~java
WebClient client = WebClient.builder()
        .filter((request, next) -> {

            ClientRequest filtered = ClientRequest.from(request)
                    .header("foo", "bar")
                    .build();

            return next.exchange(filtered);
        })
        .build();

~~~

这可以用于横切关注点，例如身份验证。下面的例子使用一个过滤器通过一个静态工厂方法进行基本身份验证：

~~~java
import static org.springframework.web.reactive.function.client.ExchangeFilterFunctions.basicAuthentication;

WebClient client = WebClient.builder()
        .filter(basicAuthentication("user", "password"))
        .build();

~~~

过滤器全局应用于每个请求。要更改特定请求的过滤器行为，可以向`ClientRequest`添加请求属性，然后由链中的所有过滤器访问，如下例所示：

~~~java
WebClient client = WebClient.builder()
        .filter((request, next) -> {
            Optional<Object> usr = request.attribute("myAttribute");
            // ...
        })
        .build();

client.get().uri("https://example.org/")
        .attribute("myAttribute", "...")
        .retrieve()
        .bodyToMono(Void.class);

~~~

您还可以复制现有的WebClient、插入新的过滤器或删除已经注册的过滤器。下面的示例在索引0处插入一个基本身份验证过滤器：

~~~java
import static org.springframework.web.reactive.function.client.ExchangeFilterFunctions.basicAuthentication;

WebClient client = webClient.mutate()
        .filters(filterList -> {
            filterList.add(0, basicAuthentication("user", "password"));
        })
        .build();

~~~



## 6.Synchronous Use

WebClient可以通过在结果的末尾阻塞来使用同步风格：

~~~java
Person person = client.get().uri("/person/{id}", i).retrieve()
    .bodyToMono(Person.class)
    .block();

List<Person> persons = client.get().uri("/persons").retrieve()
    .bodyToFlux(Person.class)
    .collectList()
    .block();

~~~

然而，如果需要进行多个调用，避免单独阻塞每个响应，而是等待合并的结果会更有效：

~~~java
Mono<Person> personMono = client.get().uri("/person/{id}", personId)
        .retrieve().bodyToMono(Person.class);

Mono<List<Hobby>> hobbiesMono = client.get().uri("/person/{id}/hobbies", personId)
        .retrieve().bodyToFlux(Hobby.class).collectList();
// 多个调用一起阻塞
Map<String, Object> data = Mono.zip(personMono, hobbiesMono, (person, hobbies) -> {
            Map<String, String> map = new LinkedHashMap<>();
            map.put("person", person);
            map.put("hobbies", hobbies);
            return map;
        })
        .block();

~~~

以上仅仅是一个例子。还有许多其他的模式和操作符，可以将响应式管道组合在一起，进行许多远程调用，可能是一些嵌套的、相互依赖的，直到最后才会阻塞。



使用Flux或Mono，你永远不需要在Spring MVC或Spring WebFlux控制器中阻塞。只需从控制器方法返回生成的响应类型。同样的原则也适用于Kotlin Coroutines和Spring WebFlux，只需在你的控制器方法中使用suspending 函数或return `Flow`。