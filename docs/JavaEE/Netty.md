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

