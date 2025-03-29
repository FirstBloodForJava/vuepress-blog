# 数据缓冲区和编解码器

Java NIO提供了`ByteBuffer`，但许多库在此基础上构建了自己的字节缓冲区API，特别是对于重用缓冲区和/或使用直接缓冲区有利于提高性能的网络操作。例如，Netty有`ByteBuf`层次结构，Undertow使用`XNIO`， Jetty使用池字节缓冲区和要释放的回调，等等。`spring-core`模块提供了一组抽象来处理各种字节缓冲区api，如下所示：

- DataBufferFactory抽象了数据缓冲区的创建。
- DataBuffer表示一个字节缓冲区，它可以被池化。
- DataBufferUtils为数据缓冲区提供了实用程序方法。
- 编解码器(Codecs)解码或编码流数据缓冲区流到更高级的对象。



## DataBufferFactory

DataBufferFactory用于以两种方式之一创建数据缓冲区：

1. 分配一个新的数据缓冲区，如果知道大小，可以选择预先指定容量，这样更有效，即使`DataBuffer`的实现可以根据需要增加和减少。
2. 包装现有的byte[]或`java.nio.ByteBuffer`，它使用`DataBuffer`实现修饰给定的数据，并且不涉及分配。

注意，WebFlux应用程序并不直接创建`DataBufferFactory`，而是通过客户端的`ServerHttpResponse`或`ClientHttpRequest`来访问它。工厂的类型取决于底层客户端或服务器，例如Reactor Netty为`NettyDataBufferFactory`，其他为`DefaultDataBufferFactory`。



## DataBuffer

`DataBuffer`接口提供了与`java.nio.ByteBuffer`类似的操作，但也带来了一些额外的好处，其中一些是受Netty `ByteBuf`的启发。以下是部分好处：

- 读取和写入具有独立的位置，即不需要调用`flip()`来交替读取和写入。
- 容量根据需要扩展，就像`java.lang.StringBuilder`一样。
- 池缓冲和引用计数通过`PooledDataBuffer`。
- 将缓冲区视为`java.nio.ByteBuffer`、`InputStream`或`OutputStream`。
- 确定给定字节的索引或最后一个索引。



## PooledDataBuffer

正如在`ByteBuffer`的Javadoc中所解释的，字节缓冲区可以是直接的，也可以是非直接的。直接缓冲区可能位于Java堆之外，这**消除了本地I/O操作复制**的需要。这使得直接缓冲区对于通过套接字接收和发送数据特别有用，但是创建和释放它们的成本也更高，这就产生了**池化缓冲区**的想法。

`PooledDataBuffer`是`DataBuffer`的扩展，它有助于进行引用计数，这对于**字节缓冲区池**来说是必不可少的。它是如何工作的？当分配PooledDataBuffer时，引用计数为1。对`retain()`的调用增加计数，而对`release()`的调用减少计数。只要该**计数大于0**，缓冲区就保证不会被释放。当计数减少到0时，可以**释放池化的缓冲区**，这实际上可能意味着为缓冲区保留的内存返回到内存池中。

请注意，在大多数情况下，最好使用`DataBufferUtils`中的便利方法，而不是直接对`PooledDataBuffer`进行操作，只有当它是`PooledDataBuffer`的实例时，这些方法才会对DataBuffer**应用release()或retain()**。



## DataBufferUtils

DataBufferUtils提供了许多实用方法来操作数据缓冲区：

- 如果底层字节缓冲区API支持，可以通过复合缓冲区将数据缓冲区流连接到一个可能为零副本的缓冲区中。
- 将`InputStream`或`NIO Channel`转换为Flux\<DataBuffer\>，反之亦然，将Publisher\<DataBuffer\>转换为`OutputStream`或`NIO Channel`。
- 如果缓冲区是`PooledDataBuffer`的实例，则应用release()或retain()。
- 跳过或从字节流中取出，直到达到特定的字节计数。





## Codecs

`org.springframework.core.codec`包提供了以下策略接口：

- 编码器(Encoder)将Publisher\<T\>编码为数据缓冲区流。
- 解码器()Decoder将Publisher\<DataBuffer\>解码为更高级别对象的流。



spring-core模块提供了`byte[]`、`ByteBuffer`、`DataBuffer`、`Resource`和`String`编码器和解码器实现。spring-web模块增加了`Jackson JSON`、`Jackson Smile`、`JAXB2`、`Protocol Buffers`和其他编码器和解码器。



## Using DataBuffer

在处理数据缓冲区时，必须特别注意确保缓冲区被释放，因为它们可能被池化。我们将使用编解码器来说明其工作原理，但这些概念更适用于一般情况。让我们看看编解码器必须在内部做些什么来管理数据缓冲区。

在创建高级对象之前，解码器(Decoder)是最后一个读取输入数据缓冲区的，因此它必须像下面这样释放它们：

1. 如果解码器(Decoder)只是读取每个输入缓冲区并准备立即释放它，它可以通过`DataBufferUtils.release(dataBuffer)`来实现。
2. 如果解码器(Decoder)使用Flux或Mono操作符，例如如`flatMap`、`reduce`和其他内部预取(prefetch )和缓存数据项的操作符，或者使用`filter`、`skip`等操作符，则必须将`doOnDiscard(PooledDataBuffer.class, DataBufferUtils::release)`添加到组合链中，以确保这些缓冲区在被丢弃之前被释放，也可能导致错误或取消信号。
3. 如果解码器(Decoder)以任何其他方式持有一个或多个数据缓冲区，它必须确保在**完全读取时释放**它们；或者在读取和释放缓存的数据缓冲区之前发生错误或取消信号，也要释放。

请注意，`DataBufferUtils.join`提供了一种安全有效的方式来将数据缓冲流聚合到单个数据缓冲区中。同样，`skipUntilByteCount`和`takeUntilByteCount`是解码器使用的额外安全方法。

编码器(Encoder)分配其他必须读取(释放)到数据缓冲区。所以编码器没有太多事情要做。但是，如果在向缓冲区填充数据时发生序列化错误，编码器**必须注意释放数据缓冲区**。例如:

~~~java
DataBuffer buffer = factory.allocateBuffer();
boolean release = true;
try {
    // serialize and populate buffer..
    release = false;
}
finally {
    if (release) {
        DataBufferUtils.release(buffer);
    }
}
return buffer;

~~~

编码器的使用者负责释放它接收到的数据缓冲区。在WebFlux应用程序中，Encoder的输出用于写入HTTP服务器响应或客户端HTTP请求，在这种情况下，释放数据缓冲区是代码**写入服务器响应或客户端请求**的责任。

请注意，在Netty上运行时，有用于排除缓冲区泄漏的[调试选项](https://github.com/netty/netty/wiki/Reference-counted-objects#troubleshooting-buffer-leaks)。