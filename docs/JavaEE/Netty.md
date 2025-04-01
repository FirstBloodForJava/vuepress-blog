# Netty

Netty官网：https://netty.io/index.html

Github地址：https://github.com/netty/netty

使用Netty的相关项目：https://netty.io/wiki/related-projects.html

Netty是一个异步事件驱动的网络应用程序框架，可快速开发维护的高性能协议服务器和客户端。

Netty是一个NIO客户端服务器框架，可以快速轻松地开发网络应用程序，如协议服务器和客户端。它极大地简化了TCP和UDP socket server网络编程。

“快速和简单”并不意味着最终的应用程序将遭受可维护性或性能问题。Netty是根据实现许多协议，如FTP、SMTP、HTTP和`various binary and text-based legacy protocols`所获得的经验精心设计的。因此，Netty成功地找到了一种方法，在不妥协的情况下实现易于开发、性能、稳定性和灵活性。



**设计：**

- 用于各种传输类型的统一API，BIO或NIO，协议。
- 基于灵活且可扩展的事件模型，允许清晰地分离关注点。
- 高度可定制的线程模型：单个线程，一个或多个线程池，如SEDA。
- 真正的无连接数据报套接字支持（自3.1起）。

**性能：**

- 更好的吞吐量，更低的延迟
- 减少资源消耗
- 最小化不必要的内存拷贝

**安全：完整的SSL/TLS和StartTLS加密传输支持支持。**



## 使用指南

netty依赖：

~~~xml
<!-- https://mvnrepository.com/artifact/io.netty/netty-all -->
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.119.Final</version>
</dependency>

~~~



### Discard 服务端

Discard协议，会丢弃任何接收到的数据，而不会产生任何响应。

~~~java
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.ReferenceCountUtil;

/**
 * 继承 ChannelInboundHandlerAdapter,它是 ChannelInboundHandler 实现，提供了各种事件的处理方法
 */
public class DiscardServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        // 这里接收到的消息类型是 ByteBuf, 调用 release() 方法丢弃消息
        // ((ByteBuf) msg).release();

        ByteBuf in = (ByteBuf) msg;
        try {
            // 使用 telnet localhost 8080 就能看到这里打印的数据
            while (in.isReadable()) {
                System.out.print((char) in.readByte());
                System.out.flush();
            }
        } finally {
            System.out.println("释放数据");
            ReferenceCountUtil.release(msg);
        }

    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {

        // 打印捕获到的异常堆栈信息
        cause.printStackTrace();

        ctx.close();

    }
}

~~~



~~~java
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;


public class DiscardServer {

    private int port;

    public DiscardServer(int port) {
        this.port = port;
    }

    public void run() throws InterruptedException {
        // NioEventLoopGroup是一个处理I/O操作的多线程事件循环。Netty为不同类型的传输提供了各种EventLoopGroup实现。
        // 在本例中，我们将实现一个服务器端应用程序，因此将使用两个NioEventLoopGroup。
        // 第一个通常被称为 boss ，它接受传入的连接。
        // 第二个通常称为 worker ，一旦boss接受连接并将接受的连接注册到worker，它将处理已接受连接的流量。
        // 使用多少线程以及如何将它们映射到创建的通道取决于EventLoopGroup实现，甚至可以通过构造函数进行配置。
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            // ServerBootstrap是一个设置服务器的助手类。您可以直接使用Channel设置服务器。但是，请注意，这是一个繁琐的过程，在大多数情况下不需要这样做。
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class) // 在这里，指定使用 NioServerSocketChannel，该类用于实例化一个新 Channel 以接受传入的连接。
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 这里指定的处理程序将始终由新接受的通道计算。
                        // ChannelInitializer 是一个特殊的处理程序，用于帮助用户配置新通道。
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            // 继承 ChannelInboundHandlerAdapter 的新类
                            ch.pipeline().addLast(new EchoServerHandler());
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128) // 您还可以设置特定于Channel实现的参数。我们正在编写一个TCP/IP服务器，所以我们可以设置套接字选项，如tcpNoDelay和keepAlive。
                    .childOption(ChannelOption.SO_KEEPALIVE, true); // option()用于 NioServerSocketChannel，它接受传入的连接。childOption()用于父ServerChannel接受的通道

            // Bind and start to accept incoming connections.
            // 绑定端口
            ChannelFuture f = b.bind(port).sync();

            // Wait until the server socket is closed.
            f.channel().closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }

    public static void main(String[] args) throws Exception {
        int port = 8080;

        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }

        new DiscardServer(port).run();
    }

}

~~~



~~~bash
telnet localhost 8080

~~~







### Echo 服务端

继承DiscardServerHandler，重写channelRead方法，服务端创建的通道使用EchoServerHandler。

~~~java
public class EchoServerHandler extends DiscardServerHandler {

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {

        //
        ctx.write(msg);
        //
        ctx.flush();

    }

}

~~~



~~~bash
telnet localhost 8080

~~~





### Time Server

建立连接后立即发送消息，并在发送消息后关闭连接。

~~~java
public class TimeServerHandler extends ChannelInboundHandlerAdapter {

    /**
     * 重写事件方法
     * @param ctx
     */
    @Override
    public void channelActive(final ChannelHandlerContext ctx) {
        // 定义缓冲区
        final ByteBuf time = ctx.alloc().buffer(4);
        time.writeInt((int) (System.currentTimeMillis() / 1000L + 2208988800L));

        // 发送消息 因为异步，所有不能直接调用 ctx.close()方法
        final ChannelFuture f = ctx.writeAndFlush(time);

        f.addListener(new ChannelFutureListener() {
            // 消息发送完毕后注册回调
            @Override
            public void operationComplete(ChannelFuture future) {
                assert f == future;
                ctx.close();
            }
        });
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}

~~~



**linux测试命令：**

~~~bash
rdate -o <port> -p <host>

~~~



### Time Client

ChannelInboundHandlerAdapter 继承

~~~java
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.util.Date;

public class TimeClientHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {

        ByteBuf m = (ByteBuf) msg;
        try {
            long currentTimeMillis = (m.readUnsignedInt() - 2208988800L) * 1000L;
            System.out.println(new Date(currentTimeMillis));
            ctx.close();
        } finally {
            m.release();
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}

~~~

客户端


~~~java
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;

public class TimeClient {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        int port = 8080;
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            // Bootstrap 类似于 ServerBootstrap ，不同之处在于它适用于非服务器通道，如客户端或无连接通道。
            Bootstrap b = new Bootstrap();

            // 只指定一个EventLoopGroup，它将同时用作 boss组和 worker 组。boss组在客户端不使用
            b.group(workerGroup);

            // NioSocketChannel 被用来创建客户端通道，而不是NioServerSocketChannel(服务端)
            b.channel(NioSocketChannel.class);

            // 注意，这里我们没有像使用ServerBootstrap那样使用childOption()，因为客户端SocketChannel没有父类。
            b.option(ChannelOption.SO_KEEPALIVE, true);

            b.handler(new ChannelInitializer<SocketChannel>() {
                @Override
                public void initChannel(SocketChannel ch) throws Exception {
                    ch.pipeline().addLast(new TimeClientHandler());
                }
            });

            // 连接服务端
            ChannelFuture f = b.connect(host, port).sync();

            // Wait until the connection is closed.
            f.channel().closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
        }
    }
}

~~~



### 处理基于流的传输

在基于流的传输（如TCP/IP）中，接收到的数据存储在套接字接收缓冲区中。不幸的是，基于流的传输的缓冲区不是数据包队列，而是`字节队列`。这意味着，即使您将两个消息作为两个独立的数据包发送，操作系统也不会将它们视为两个消息，而只是将它们视为一堆字节。因此，不能保证您所读的内容就是远程对等体所写的内容。例如，让我们假设操作系统的TCP/IP栈收到了三个数据包：

![image-20250331204041306](http://47.101.155.205/image-20250331204041306.png)

由于基于流的协议的这个通用属性，在应用程序中很有可能以以下碎片形式读取它们：

![image-20250331204049138](http://47.101.155.205/image-20250331204049138.png)

因此，接收部分，无论是服务器端还是客户端，都应该将接收到的数据整理成一个或多个有意义的帧，这些帧可以被应用程序逻辑轻松理解。在上面的例子中，接收到的数据应该像下面这样：

![image-20250331204041306](http://47.101.155.205/image-20250331204041306.png)



现在让我们回到Time Client示例。我们这里也有同样的问题。32位Bit 是一个非常小的数据量，它不太可能经常被分片。然而，问题是它可能是碎片化的，并且碎片化的可能性会随着流量的增加而增加。

最简单的解决方案是创建一个内部 cumulative buffer 并等待所有 4 个字节都被接收到内部 buffer 中。



#### 方式一

创建固定大小的数据缓冲区

~~~java
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;

import java.util.Date;

public class TimeClientSecondHandler extends TimeClientHandler{

    private ByteBuf buf;

    // 创建缓冲区
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) {
        buf = ctx.alloc().buffer(4);
    }

    // 情况缓冲区
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) {
        buf.release();
        buf = null;
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        ByteBuf m = (ByteBuf) msg;
        buf.writeBytes(m);
        m.release();

        // 数据够了才使用
        if (buf.readableBytes() >= 4) {
            long currentTimeMillis = (buf.readUnsignedInt() - 2208988800L) * 1000L;
            System.out.println(new Date(currentTimeMillis));
            ctx.close();
        }
    }

}

~~~



#### 方式二

添加多个`ChannelHandler`，功能拆分。



~~~java
/**
 * ByteToMessageDecoder 是 ChannelInboundHandler 的一个实现，它可以很容易地处理碎片问题
 */
public class TimeDecoder extends ByteToMessageDecoder {

    // 每当接收到新数据时，ByteToMessageDecoder 使用内部维护的累积缓冲区调用 decode() 方法。
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
        if (in.readableBytes() < 4) {
            // 当累积缓冲区中没有足够的数据时，decode() 可以决定不向out添加任何数据。ByteToMessageDecoder将在接收到更多数据时再次调用 decode()
            return;
        }
        // 如果 decode() 向out添加一个对象，则表示解码器成功解码了一条消息
        // ByteToMessageDecoder 将丢弃累积缓冲区的读部分
        out.add(in.readBytes(4));

    }
}

~~~

![image-20250331205747986](http://47.101.155.205/image-20250331205747986.png)



### 使用对象而不是ByteBuf

在`ChannelHandlers`中使用`POJO`的优势是显而易见的；通过将从`ByteBuf`中提取信息的代码从处理程序中分离出来，处理程序变得更易于维护和可重用。在Time Client和Time Server示例中，我们只读取一个32bit整数，因此直接使用ByteBuf不是主要问题。但是，您会发现在实现实际协议时进行分离是必要的。

首先，让我们定义一个名为UnixTime的新类型。

![image-20250331211735408](http://47.101.155.205/image-20250331211735408.png)

::: tabs

@ tab Pojo

~~~java
import java.util.Date;

public class UnixTime {

    private final long value;

    public UnixTime() {
        this(System.currentTimeMillis() / 1000L + 2208988800L);
    }

    public UnixTime(long value) {
        this.value = value;
    }

    public long value() {
        return value;
    }

    @Override
    public String toString() {
        return new Date((value() - 2208988800L) * 1000L).toString();
    }
}

~~~



@tab Pojo Decoder

~~~java
public class TimePojoDecoder extends ByteToMessageDecoder {

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
        if (in.readableBytes() < 4) {
            return;
        }

        out.add(new UnixTime(in.readUnsignedInt()));
    }
}

~~~



@tab ChannelInboundHandler 实现

~~~java
public class TimeClientPojoHandler extends TimeClientHandler{

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        UnixTime m = (UnixTime) msg;
        System.out.println(msg.getClass() + ": " + m);
        ctx.close();
    }
}

~~~



:::



#### 服务端使用对象

Server写UnixTime对象：

~~~java
@Override
public void channelActive(ChannelHandlerContext ctx) {
    ChannelFuture f = ctx.writeAndFlush(new UnixTime());
    f.addListener(ChannelFutureListener.CLOSE);
}

~~~

将对象的属性编码：

~~~java
public class TimeEncoder extends ChannelOutboundHandlerAdapter {
    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) {
        UnixTime m = (UnixTime) msg;
        ByteBuf encoded = ctx.alloc().buffer(4);
        encoded.writeInt((int)m.value());
        ctx.write(encoded, promise);
    }
}

~~~



## 底层设计



### 丰富的Buffer数据结构

Netty使用自己的缓冲区API而不是`NIO ByteBuffer`来表示字节序列。这种方法比使用ByteBuffer有显著的优势。Netty的新缓冲区类型[ChannelBuffer](https://netty.io/3.5/api/org/jboss/netty/buffer/ChannelBuffer.html)从头开始设计，以解决ByteBuffer的问题，并满足网络应用程序开发人员的日常需求。列出一些很酷的功能：

- 如有必要，可以定义自己的缓冲区类型。
- 透明零拷贝是通过内置的复合缓冲区类型实现的。
- 提供了开箱即用的动态缓冲区类型，其容量可根据需要扩展，例如：StringBuffer。
- 不需要调用flip()方法。
- 通常比ByteBuffer快。



org.jboss.netty.buffer包功能描述：https://netty.io/3.5/api/org/jboss/netty/buffer/package-summary.html#package_description



#### Combining and Slicing ChannelBuffers

在通信层之间传输数据时，通常需要对数据进行组合或切片。例如，如果一个有效负载被分割成多个包，通常需要将其组合起来进行解码。

传统上，来自多个包的数据通过将它们复制到一个新的字节缓冲区来组合。

Netty支持零拷贝方法，其中ChannelBuffer“指向”所需的缓冲区，从而消除了执行复制的需要。

![image-20250401194201507](http://47.101.155.205/image-20250401194201507.png)



### 通用异步I/O API

Java中的传统I/O api为不同的传输类型提供了不同的类型和方法。例如，`java.net.Socket`和`java.net.DatagramSocket`没有任何共同的超类型，因此它们有非常不同的方式来执行 Socket I/O。

这种不匹配使得将网络应用程序从一种传输方式移植到另一种传输方式既繁琐又困难。当您需要支持额外的传输时，传输之间缺乏可移植性就会成为一个问题，因为这通常需要重写应用程序的网络层。从逻辑上讲，许多协议可以在多个传输上运行，如TCP/IP、UDP/IP、SCTP和serial port communication。

更糟糕的是，Java的New I/O (NIO) API引入了与旧的阻塞I/O (OIO)API的不兼容性，并将在下一个版本NIO.2 (AIO)中继续这样做。由于所有这些API在设计和性能特征上彼此不同，因此甚至在开始实现阶段之前，您常常被迫确定应用程序将依赖哪个API。

例如，您可能希望从OIO开始，因为您要服务的客户机数量非常少，并且使用OIO编写套接字服务器比使用NIO容易得多。然而，当您的业务呈指数级增长并且您的服务器需要同时为成千上万的客户端提供服务时，您将遇到麻烦。您可以从NIO开始，但是由于NIO Selector API的复杂性，这样做可能会大大增加开发时间，从而阻碍快速开发。

Netty有一个称为`Channel`的通用异步I/O接口，它抽象出点对点通信所需的所有操作。也就是说，一旦在一个Netty传输上编写了应用程序，应用程序就可以在其他Netty传输上运行。Netty通过一个通用API提供了许多基本的传输：

- 基于NIO的TCP/IP协议(org.jboss.netty.channel.socket.nio)。
- 基于OIO的TCP/IP协议(org.jboss.netty.channel.socket.oio)。
- 基于OIO的UDP/IP协议。
- 本地传输(org.jboss.netty.channel.local)。

从一种传输切换到另一种传输通常只需要做几行更改，例如：选择不同的`ChannelFactory`实现。

此外，您甚至可以利用尚未编写的新传输（例如串行端口通信传输），同样只需替换几行构造函数调用。此外，您可以通过扩展核心API来编写自己的传输。



### 基于拦截链模式的事件模型

Event Model based on the Interceptor Chain Pattern

对于事件驱动的应用程序来说，定义良好且可扩展的事件模型是必须的。Netty有一个专注于I/O的定义良好的事件模型。它还允许您在不破坏现有代码的情况下实现自己的事件类型，因为每种事件类型都通过严格的类型层次结构与其他事件类型区分开来。这是与其他框架的另一个区别。许多NIO框架没有或非常有限的事件模型概念。如果它们提供扩展，那么当您尝试添加自定义事件类型时，它们通常会破坏现有代码。

`ChannelEvent`由`ChannelPipeline`中的`ChannelHandlers`列表处理。管道实现了`拦截过滤器模式`的高级形式，使用户可以完全控制如何处理事件以及管道中的处理程序如何相互交互。例如，你可以定义从套接字`读取数据messageReceived`时要做什么：

~~~java
public class MyReadHandler implements SimpleChannelHandler {
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent evt) {
        Object message = evt.getMessage();
        // 接收消息时，可以定义的操作
        
        // 转发实现到下一个 handler
        ctx.sendUpstream(evt);
    }
}

~~~

你还可以定义处理程序接收到`写请求(writeRequested)`时要做什么：

~~~java
public class MyWriteHandler implements SimpleChannelHandler {
    public void writeRequested(ChannelHandlerContext ctx, MessageEvent evt) {
        Object message = evt.getMessage();
        // 接收到写请求操作
        
		// 转发实现到下一个 handler
        ctx.sendDownstream(evt);
    }
}

~~~

ChannelEvent API文档：https://netty.io/3.5/api/org/jboss/netty/channel/ChannelEvent.html

ChannelPipeline API文档：http://netty.io/3.5/api/org/jboss/netty/channel/ChannelPipeline.html



### 其它组件



#### Codec framework

一个好的网络应用程序框架应该提供一个可扩展的、可重用的、可单元测试的和多层的编解码器框架，以生成可维护的用户编解码器。

Netty提供了许多基本的和高级的编解码器来解决您在编写协议编解码器时遇到的大多数问题，无论它是简单的还是不简单的，是二进制的还是文本的-简单的都可以。



#### SSL / TLS Support

与以前的阻塞I/O不同，在NIO中支持SSL是一项非常重要的任务。您不能简单地包装流来加密或解密数据，而是必须使用`javax.net.ssl.SSLEngine`。SSLEngine是一种与SSL本身一样复杂的状态机。你必须管理所有可能的状态，例如密码套件和加密密钥协商（或重新协商）、证书交换和验证。此外，SSLEngine甚至不是完全线程安全的，正如人们所期望的那样。

在Netty中，[SslHandler](http://netty.io/3.5/api/org/jboss/netty/handler/ssl/SslHandler.html)负责SSLEngine的所有血腥细节和陷阱。你需要做的就是配置`SslHandler`并将其插入到`ChannelPipeline`中。它还允许您非常轻松地实现像[StartTLS](https://en.wikipedia.org/wiki/Starttls)这样的高级功能。



####  HTTP实现

HTTP无疑是互联网上最流行的协议。已经有许多HTTP实现，比如Servlet容器。那么为什么Netty在其核心之上有HTTP呢？

Netty的HTTP支持与现有的HTTP库非常不同。它使您能够完全控制HTTP消息在底层的交换方式。因为它基本上是HTTP编解码器和HTTP消息类的组合，所以没有诸如强制`线程模型`之类的限制。也就是说，您可以编写自己的HTTP客户机或服务器，使其完全按照您想要的方式工作。您可以完全控制HTTP规范中的所有内容，包括线程模型、连接生命周期和分块编码。

由于其高度可定制的特性，您可以编写一个非常高效的HTTP服务器，例如：

- 需要持久连接和服务器推送技术的聊天服务器，例如Comet。
- 媒体流服务器，需要保持连接打开，直到整个媒体流结束，例如2小时的视频。
- 允许上传大文件而没有内存压力的文件服务器，例如每个请求上传1GB。
- 可扩展的混搭客户端，可以异步连接到成千上万的第三方web服务



#### WebSokcets实现

WebSockets允许在单个传输控制协议（TCP）套接字上实现双向、全双工的通信通道。它被设计成允许在web浏览器和web服务器之间传输数据流。

WebSocket协议已经被IETF标准化为[RFC 6455](http://tools.ietf.org/html/rfc6455)。

Netty实现了RFC 6455和该规范的许多旧版本。请参考[org.jboss.netty.handler.codec.http.websocketx](http://netty.io/3.5/api/org/jboss/netty/handler/codec/http/websocketx/package-summary#package_description)包和相关[示例](http://netty.io/3.5/xref/org/jboss/netty/example/http/websocketx/server/package-summary.html)。



### Google Protocol Buffer Integration

[谷歌协议缓冲区](https://code.google.com/apis/protocolbuffers/docs/overview.html)是快速实现随时间发展的高效二进制协议的理想解决方案。使用[ProtobufEncoder](http://netty.io/3.5/api/org/jboss/netty/handler/codec/protobuf/ProtobufEncoder.html)和[ProtobufDecoder](http://netty.io/3.5/api/org/jboss/netty/handler/codec/protobuf/ProtobufDecoder.html)，您可以将谷歌协议缓冲区编译器（protoc）生成的消息类转换为Netty编解码器。请查看[LocalTime](http://netty.io/3.5/xref/org/jboss/netty/example/localtime/package-summary.html)示例，该示例展示了如何轻松地从示例协议定义创建高性能二进制协议客户端和服务器。





## http

### http服务端

开发步骤：

1. ServerBootstrap注册bossGroup、workerGroup两个事件循环组；
2. 将Channel指定为`NioServerSocketChannel`类型，并关联自定义的初始化器`ChannelInitializer`。
   1. 重写`initChannel()`自定义注册处理器，这里使用`SimpleChannelInboundHandler`抽象类，`channelRead0()`方法可以接收客户端的所有请求。



::: tabs

@tab 自定义处理器

~~~java
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.*;
import io.netty.util.CharsetUtil;

import java.net.URI;

public class NettyServerHandler01 extends SimpleChannelInboundHandler<HttpObject> {

    //channelRead0()方法：接收客户端请求，并且作出响应；类似于 Servlet 中的 doGet()、doPost() 等方法
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws Exception {
        if (msg instanceof HttpRequest) {
            HttpRequest httpRequest = (HttpRequest)msg;
            URI uri = new URI(httpRequest.uri());
            if(!"/favicon.ico".equals( uri.getPath())) {
                System.out.println("channelRead0 invoke...");

                // ByteBuf对象: 定义响应的内容
                ByteBuf content = Unpooled.copiedBuffer("Hello World Netty", CharsetUtil.UTF_8);

                // FullHttpResponse对象：响应对象，定义响应的具体信息
                FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, content);
                response.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain");

                // content.readableBytes() 设置响应头响应内容长度
                response.headers().set(HttpHeaderNames.CONTENT_LENGTH, content.readableBytes());
                //将响应 返回给客户端
                ctx.writeAndFlush(response);
            }
        }
    }
    // 当增加新的处理器时，触发此方法
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        System.out.println("1.handlerAdded(),增加了新的处理器..." );
        super.handlerAdded(ctx);
    }
    // 当通道被注册到一个事件循环组EventLoop上时，执行此方法
    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        System.out.println("2.channelRegistered(),通道被注册...");
        super.channelRegistered(ctx);
    }
    // 当通道处于活跃状态（连接到某个远端，可以收发数据）时，执行此方法
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("3.channelActive(),通道连接到了远端，处于活跃状态...");
        super.channelActive(ctx);
    }
    // 当通道处于非活跃状态（与远端断开了连接）时，执行此方法
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("4.channelInactive(),通道远端断开了连接，处于非活跃状态... ");
        super.channelInactive(ctx);
    }
    // 当通道被取消注册时，执行此方法
    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
        System.out.println("5.channelUnregistered(),通道被取消了注册...");
        super.channelUnregistered(ctx);
    }
    // 当程序发生异常时，执行此方法
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }
}

~~~



@tab 初始化器

~~~java
public class NettyServerInitializer01 extends ChannelInitializer<SocketChannel> {

    protected void initChannel(SocketChannel sc) throws Exception {
        ChannelPipeline pipeline = sc.pipeline();
        // 加入netty提供的处理器。语法：pipeline.addLast(定义处理器的名字,处理器);
        // HttpServerCodec: 对请求和响应进行编码、解码
        pipeline.addLast("HttpServerCodec", new HttpServerCodec());
        // 增加自定义处理器 NettyServerHandler ，用于实际处理请求，并给出响应
        pipeline.addLast("NettyServerHandler01", new NettyServerHandler01());
    }
}

~~~



@tab main

~~~java
public class NettyServer01 {

    public static void main(String[] args) {

        // 1.初始化事件循环组
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {

            ServerBootstrap serverBootstrap = new ServerBootstrap();
            // 将bossGroup和workerGroup注册到服务端的Channel上，并注册一个服务端的初始化器NettyServerInitializer
            // 该初始化器中的initChannel()方法，会在连接被注册后立刻执行；最后将端口号绑定到8080
            ChannelFuture channelFuture = serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class).childHandler(new NettyServerInitializer01())
                    .bind(8080).sync();
            channelFuture.channel().closeFuture().sync();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}

~~~



:::



### chat

服务端与客户端



### 文件传输



## socket



