# Reactor

Reactor文档：https://projectreactor.io/docs

Reacotor core 是一个实现 reactive programming model的java 8库。这个建立在[Reactive Stream](http://www.reactive-streams.org/)规范之上的，这个规范是建立反应式应用程序的标准，可以使用声明式代码(类似函数式编程)构建异步处理管道。

如果我们有一个生产者，它向消费者发送事件的速度比它处理事件的速度快，那么最终消费者将被事件淹没，耗尽系统资源。`Backpressure`意味着我们的消费者应该能够告诉生产者应该发送多少数据以防止这种情况发生，这是规范中所规定的。

![image-20250404101206360](http://47.101.155.205/image-20250404101206360.png)

![image-20250404101321506](http://47.101.155.205/image-20250404101321506.png)



![image-20250404101321506](http://47.101.155.205/PublisherSubscriber.png)

**Reactive和Java 8 Stream的核心区别在于Reactive是push模型，Java 8 Stream是pull模型。**



## Reacotor Core

~~~xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
    <version>3.6.0</version>
</dependency>

<dependency> 
    <groupId>ch.qos.logback</groupId> 
    <artifactId>logback-classic</artifactId> 
    <version>1.4.4</version> 
</dependency>

~~~



### Flux

Flux\<T\>是Reactive Streams的`Publisher`，有许多生成(generate)、转换(transform)、编排(orchestrate) Flux序列的运算符(operator)。

Flux能产生`0-N`个元素(onNext事件)，然后完成(onComplete)或出错(onError)。如果没有终端事件，则Flux是无限的。

![image-20250404112800124](http://47.101.155.205/image-20250404112800124.png)

生成Flux方式：

- 静态工厂创建Flux资源，从多个回调生成它们。
- 实例方法，即运算符(operator)，允许构建一个生成异步序列的异步处理管道。
- `Flux#subscribe()`或`multicast`运算符(`Flux#publish`、`Flux#publishNext`)都实现一个专用的管道，并触发在其中的数据流。



~~~java
// 返回空的 Flux
Flux.empty();

// 从数组生成 Flux
Flux.just("1");
Flux.fromArray(new String[]{"1"});

// 从集合生成 Flux
Flux.fromIterable(Arrays.asList("1"));

// 间隔100ms生成元素,取前10个元素
Flux.interval(Duration.ofMillis(100)).take(10);

// 创建一个携带固定异常的 Flux
Flux.error(new RuntimeException());

~~~



#### subscribe

**subscribe(Consumer comsumer)**：为这个Flux订阅一个消费者，它将消耗序列中的所有元素。它将请求一个无界需求`Long.MAX_VALUE`。

~~~java
List<Integer> elements = new ArrayList<>();

Flux.just(1, 2, 3, 4)
  .log()
  .subscribe(elements::add);

assertThat(elements).containsExactly(1, 2, 3, 4);

~~~

**subscribe(Subscriber subscriber)**：请求生产者开始流式传输数据

~~~java
Flux.just(1, 2, 3, 4)
  .log()
  .subscribe(new Subscriber<Integer>() {
      // 表示订阅的数据量
      @Override
      public void onSubscribe(Subscription s) {
          s.request(Long.MAX_VALUE);
      }

      // 订阅者接收生产者数据的回调
      @Override
      public void onNext(Integer integer) {
          elements.add(integer);
      }
      // 出现异常调用
      @Override
      public void onError(Throwable t) {}

      // 到达终点线调用
      @Override
      public void onComplete() {}
});

~~~





### Mono

Mono\<T\>是Reactive Streams的`Publisher`，有许多生成(generate)、转换(transform)、编排(orchestrate) Flux序列的运算符(operator)。

Mono至多只能产生一个元素，它是Flux的特化：要么有值、控制完成，或者失败。

Mono\<Void\>可以用于仅对信号做出反应的情况，相当于Runnable任务完成的反应式流。

和Flux一样，操作符可以用来定义一个异步管道，它将为每个`Subscription`重新具体化。

![image-20250404113933873](http://47.101.155.205/image-20250404113933873.png)

~~~java
// 返回空的 Mono
Mono.empty();

// 没有任何元素 Mono,也不会产生coComplete事件
Mono.never();

// 唯一值 Mono
Mono.just("1");

// 创建一个携带固定异常的 Mono
Mono.error(new RuntimeException());

~~~



### 调试

#### do/doOn



### Backpressure

~~~java
Flux.just(1, 2, 3, 4)
    .log()
    .subscribe(new Subscriber<Integer>() {
        private Subscription s;
        int onNextAmount;

        // 通过 Subscription 实现 Backpressure
        @Override
        public void onSubscribe(Subscription s) {
            this.s = s;
            s.request(2);
        }

        @Override
        public void onNext(Integer integer) {
            elements.add(integer);
            onNextAmount++;
            if (onNextAmount % 2 == 0) {
                s.request(2);
            }
        }

        @Override
        public void onError(Throwable t) {}

        @Override
        public void onComplete() {}
});

~~~





### ConnectableFlux

无限制的流。


~~~java
// 创建流
ConnectableFlux<Object> publish = Flux.create(fluxSink -> {
    while(true) {
        fluxSink.next(System.currentTimeMillis());
    }
})
.sample(ofSeconds(2)) // 设置流推送订阅间隔
.publish();

// 订阅流
publish.subscribe(System.out::println);        
publish.subscribe(System.out::println);

// 发出流
publish.connect();

~~~



### StepVerifier

使用`StepVerifier`校验Flux或Mono。

~~~java
// create()方法中的参数是待校验的Flux或Mono
// expectations 表示expect开始的相关方法,可以有多个
// verify()表示verify开始的方法 必须调用，否则校验不生效
StepVerifier.create(T<Publisher>).{expectations...}.verify();

~~~

依赖：

~~~xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <version>3.6.0</version>
</dependency>

<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.24.0</version>
</dependency>
~~~





- 简单校验Flux。

~~~java
Flux<String> flux = Flux.just("foo", "bar");
StepVerifier.create(flux)
    .expectNext("foo")
    .expectNext("bar")
    .verifyComplete();

~~~

- 简单校验存在异常

~~~java
Flux<String> flux = Flux.just("A", "B", "C")
                .concatWith(Mono.error(new RuntimeException("Simulated error")));

StepVerifier.create(flux)
    .expectNext("A")
    .expectNext("B")
    .expectNext("C")
    .expectError(RuntimeException.class)
    .verify();
    
// 或者验证具体的错误消息
StepVerifier.create(flux)
    .expectNext("A")
    .expectNext("B")
    .expectNext("C")
    .expectErrorMessage("Error occurred")
    .verify();

~~~

- 使用consumeNextWith进行复杂验证

~~~java
Flux<User> flux = Flux.just(new User("Alice", 25), new User("Bob", 30));

StepVerifier.create(flux)
    .consumeNextWith(user -> {
        assertThat(user.getName()).isEqualTo("Alice");
        assertThat(user.getAge()).isEqualTo(25);
    })
    .consumeNextWith(user -> {
        assertThat(user.getName()).isEqualTo("Bob");
        assertThat(user.getAge()).isEqualTo(30);
    })
    .verifyComplete();

~~~

- 验证多个元素集合

~~~java
Flux<Integer> flux = Flux.range(1, 10);
    
    StepVerifier.create(flux)
        .expectNextCount(5) // 验证前5个元素
        .consumeNextWith(i -> assertThat(i).isEqualTo(6))
        .expectNextCount(4) // 验证剩余4个元素
        .verifyComplete();

~~~

- 使用虚拟事件验证时间相关的流

~~~java
// 虚拟时间3小时结束
StepVerifier.withVirtualTime(
    	() -> Mono.delay(Duration.ofHours(3))
	)
    .expectSubscription()
    .expectNoEvent(Duration.ofHours(2)) // 前2个小时没有事件
    .thenAwait(Duration.ofHours(1))
    .expectNextCount(1)
            .expectComplete()
            .verify();

// 间隔1s生成数据，3600条数据
StepVerifier.withVirtualTime(
    () -> Flux.interval(Duration.ofSeconds(1)).take(3600)
	)
    .expectSubscription()
    .thenAwait(Duration.ofSeconds(3600))
    .expectNextCount(3600)
    .expectComplete()
    .verify();

~~~

- 验证上下文

~~~java
Mono<String> mono = Mono.deferContextual(ctx -> 
        Mono.just("Hello " + ctx.get("name"))
	).contextWrite(ctx -> ctx.put("name", "Alice"));

StepVerifier.create(mono)
    .expectAccessibleContext()
    .contains("name", "Alice")
    .then()
    .expectNext("Hello Alice")
    .verifyComplete();

~~~

- 验证背压

~~~java
Flux<Integer> flux = Flux.range(1, 10);

StepVerifier.create(flux, 3) // 初始请求3个元素
    .expectNext(1, 2, 3)
    .thenRequest(5) // 再请求5个元素
    .expectNext(4, 5, 6, 7, 8)
    .thenRequest(2) // 再请求2个元素
    .expectNext(9, 10)
    .verifyComplete();

~~~



### 操作符

#### map

同步转换流：

~~~java
// 返回的可以是任意类型
// // Flux 方法
<V> Flux<V> map(Function<? super T, ? extends V> mapper);

// Mono 方法
<R> Mono<R> map(Function<? super T, ? extends R> mapper);

~~~



#### flatMap

异步转换流：**不保证流的顺序**。

~~~java
// 返回的类型需要是 Publisher<R> 类型的任意泛型
// Flux 方法
<R> Flux<R> flatMap(Function<? super T, ? extends Publisher<? extends R>> mapper);

// Mono 方法
<R> Mono<R> flatMap(Function<? super T, ? extends Mono<? extends R>> transformer);

~~~



#### merge

merge合并流：

~~~java
// 类型要一致
Flux<T> mergeWith(Publisher<? extends T> other);

~~~



concat合并流（静态方法）：按给定顺序合并流。

~~~java
public static <T> Flux<T> concat(Publisher<? extends T>... sources);

~~~



#### zip

concatenate-and-transform(连接加转换)



~~~java
// 2个数据源
// 先使用zip合并数据源,在使用map对 Tuple2进行处理
public static <T1, T2> Flux<Tuple2<T1, T2>> zip(Publisher<? extends T1> source1, Publisher<? extends T2> source2);

// 3个数据源
public static <T1, T2, T3> Flux<Tuple3<T1, T2, T3>> zip(Publisher<? extends T1> source1,
			Publisher<? extends T2> source2,
			Publisher<? extends T3> source3);

~~~



Flux转换(innoreElements())成Mono\<Void\>

~~~java
flux.ignoreElements().then();

~~~









#### firstWithValue

获取最快的流。

~~~java
public static <T> Mono<T> firstWithValue(Iterable<? extends Mono<? extends T>> monos);

public static <T> Mono<T> firstWithValue(Mono<? extends T> first, Mono<? extends T>... others);

~~~



~~~java
public static <I> Flux<I> firstWithValue(Iterable<? extends Publisher<? extends I>> sources);

public static <I> Flux<I> firstWithValue(Publisher<? extends I> first, Publisher<? extends I>... others);

~~~



#### 空处理

在流中，不允许元素是null。

可以使用justOrEmpty()方法创建Mono对象。

~~~java
public static <T> Mono<T> justOrEmpty(@Nullable T data);

// 对象为空切换成 备用的
public final Mono<T> switchIfEmpty(Mono<? extends T> alternate);

~~~





#### Flux元素转List

~~~java
public final Mono<List<T>> collectList();

~~~





### error



#### onErrorReturn

在出现错误时的处理，可以返回一个固定值。**流中断**

~~~java
public final Mono<T> onErrorReturn(final T fallbackValue);

// 特定的错误类型才返回默认值
public final <E extends Throwable> Mono<T> onErrorReturn(Class<E> type, T fallbackValue);

final Mono<T> onErrorReturn(Predicate<? super Throwable> predicate, T fallbackValue);


public final Flux<T> onErrorReturn(T fallbackValue);

<E extends Throwable> Flux<T> onErrorReturn(Class<E> type, T fallbackValue);

Flux<T> onErrorReturn(Predicate<? super Throwable> predicate, T fallbackValue);

~~~





#### onErrorResume

在出现错误时的处理，可继续流处理。


~~~java
// Function 接口
Flux<T> onErrorResume(Function<? super Throwable, ? extends Publisher<? extends T>> fallback);

// 指定异常类型才调用 Function 接口
<E extends Throwable> Flux<T> onErrorResume(Class<E> type,
			Function<? super E, ? extends Publisher<? extends T>> fallback);

Flux<T> onErrorResume(Predicate<? super Throwable> predicate,
	Function<? super Throwable, ? extends Publisher<? extends T>> fallback);


Mono<T> onErrorResume(Function<? super Throwable, ? extends Mono<? extends T>> fallback);

<E extends Throwable> Mono<T> onErrorResume(Class<E> type,
			Function<? super E, ? extends Mono<? extends T>> fallback);

Mono<T> onErrorResume(Predicate<? super Throwable> predicate,
			Function<? super Throwable, ? extends Mono<? extends T>> fallback);

~~~





#### Exceptions.propagate

转换异常：

~~~java
RuntimeException propagate(Throwable t);

~~~



### reactive转blocking



Mono\<T\>转blocking

~~~java
public T block();

~~~



Flux\<T\>转blocking

~~~java

public final T blockFirst();

// 阻塞直到获取最后一个元素
public final T blockLast();

public final Iterable<T> toIterable();

~~~



### blocking转reactive



将阻塞返回List的方法转换成非阻塞Flux结果：

~~~java
// 创建一个异步调用获取结果
public static <T> Mono<T> fromCallable(Callable<? extends T> supplier);

// List 结果转换成Flux
<R> Flux<R> flatMapMany(Function<? super T, ? extends Publisher<? extends R>> mapper);

// 在指定线程池中执行
public final Flux<T> subscribeOn(Scheduler scheduler);

// 获取默认的线程池
Schedulers.boundedElastic();

~~~



将List循环调用转换成非阻塞调用：

~~~java
// 将List转换成Flux
public static <T> Flux<T> fromIterable(Iterable<? extends T> it);

// Flux 中的T 转换成异步执行的Mono结果
public final <V> Flux<V> concatMap(Function<? super T, ? extends Publisher<? extends V>> mapper);
// T 对应的结果
public static <T> Mono<T> fromRunnable(Runnable runnable);
// 在指定线程池中执行
public final Flux<T> subscribeOn(Scheduler scheduler);

// 调用then 返回 Mono<Void>
public final Mono<Void> then()

~~~

