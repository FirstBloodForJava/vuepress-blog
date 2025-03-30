# JavaIO

**各IO对比：**

| 特性       | BIO            | NIO                    | AIO          |
| ---------- | -------------- | ---------------------- | ------------ |
| 阻塞性     | 阻塞           |                        |              |
| 同步性     | 同步           | 同步                   | 异步         |
| 编程复杂度 | 简单           | 复杂                   | 复杂         |
| 线程模型   | 一连接一线程   | 多路复用(一线程多连接) | 回调机制     |
| 吞吐量     | 低(线程开销大) | 高                     | 高           |
| 适用场景   | 连接数少且固定 | 高并发连接             | 高并发长连接 |
| JDK支持    | JDK1.0+        | JDK1.4+                | JDK1.7+      |



## BIO

BIO(Blocking IO)，这是传统的 IO 模式，在进行读写操作时，线程会被阻塞，直至操作完成。其特点是简单易用，不过在处理大量并发连接时，会消耗大量线程资源，导致性能下降。



::: tabs

@tab Server

~~~java
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class BlockServer {

    public static void main(String[] args) throws IOException {

        try (ServerSocket server = new ServerSocket(8080)) {

            while (true) {
                // 一直阻塞，直到有客户端发来连接
                Socket socket = server.accept();

                //创建一个线程，用于给该客户端发送一个文件
                new Thread(new SendFile(socket)).start();
            }
        }finally {
            System.out.println("程序退出");
        }

    }

}
class SendFile implements Runnable{
    private Socket socket ;
    public SendFile(Socket socket) {
        this.socket = socket ;
    }
    @Override
    public void run() {
        File file  = new File("classpath:\\static\\favicon.ico");
        // 读取本地classpath路径文件
        try (InputStream fileIn = SendFile.class.getClassLoader().getResourceAsStream(".\\static\\favicon.ico")) {
            System.out.println("连接成功！");
            OutputStream out = socket.getOutputStream() ;


            byte[] bs = new byte[64] ;
            int len = -1 ;
            while( (len=fileIn.read(bs)) !=-1   ) {
                out.write(bs,0,len);
            }
            fileIn.close();
            out.close();
            socket.close();
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
}

~~~



@tab Client

~~~java
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class BlockClient {

    public static void main(String[] args) throws  IOException {

        Socket socket = new Socket("127.0.0.1",8080);
        // 接受服务端发来到文件
        InputStream in = socket.getInputStream() ;
        byte[] bs = new byte[64] ;
        int len = -1 ;
        OutputStream fileOut = new FileOutputStream("favicon.ico") ;
        while( (len =in.read(bs))!=-1 ) {
            fileOut.write(bs,0,len);
        }
        System.out.println("文件接收成功！");
        fileOut.close();
        in.close();
        socket.close();
    }

}

~~~



:::



## NIO

NIO(Non-blocking I/O)是 Java 1.4 引入的非阻塞 IO 模型，采用了多路复用器`Selector`来管理多个通道`Channel`。线程可以通过`Selector`同时监听多个通道`Channel`的 IO 事件，当某个通道有事件发生时，才会进行相应的处理，避免了线程的阻塞。

核心组件：

- Selector：多路复用器。
- Channel：数据传输通道。
- Buffer：数据缓冲区。

![image-20250330180105718](http://47.101.155.205/image-20250330180105718.png)



### Buffer API

Buffer是一个抽象，底层的实现是一个数组，用于存储数据。NIO提供了7种类型的缓冲区：ByteBuffer、ShortBuffer、IntBuffer、LongBuffer、FloatBuffer、DoubleBuffer、CharBuffer。

Buffer中属性介绍：

- position：初始指向0，永远指向Buffer最后一次操作元素的下一个位置。
- limit：限制Buffer能存放元素的个数，limit之后的元素不能使用。
- capacity：Buffer的最大容量，创建之后不能修改。
- mark：标记，可以通过`mark()`设置一个标志，之后通过`reset()`方法返回该标记的位置。

mark <= position <= limit <= capacity



方法介绍：

- flip()：将写模式切换成读模式；
- reWind()：重复读，将position置为0。
- clear()：属性复原。
- mark()/reset()：标记与重置。





#### ByteBuffer

1. ByteBuffer方法使用；
2. 使用Channel复制文件；
3. 使用直接缓冲区复制文件；
4. 内存映射复制文件；
5. 零拷贝复制文件；
6. 使用管道；

~~~java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.Pipe;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class BufferApi {

    public static void main(String[] args) {


    }

    /**
     * ByteBuffer 方法使用
     */
    public static void useByteBuffer() {

        // 创建字符缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(100);

        // 添加数据
        buffer.put("oycm".getBytes());

        // 读取数据
        System.out.println(buffer.get());

        // 获取position到limit之间buffer数据
        ByteBuffer sliceBuffer = buffer.slice();

        // 判断缓冲区是否有剩余数据
        if (buffer.hasRemaining()) {
            // 缓冲区 剩余数量
            System.out.println(buffer.remaining());
        }

    }

    /**
     * 使用 Channel 复制文件
     *
     * @param sourcePath 复制源路径
     * @param targetPath 目标路径
     * @throws IOException
     */
    public static void copy(String sourcePath, String targetPath) throws IOException {
        long start = System.currentTimeMillis();
        FileInputStream input = new FileInputStream(sourcePath);
        FileOutputStream out = new FileOutputStream(targetPath);
        // 获取通道
        FileChannel inChannel = input.getChannel();
        FileChannel outChannel = out.getChannel();
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        while (inChannel.read(buffer) != -1) {
            // 写转读
            buffer.flip();
            outChannel.write(buffer);
            buffer.clear();
        }
        outChannel.close();
        inChannel.close();
        out.close();
        input.close();

        System.out.println("复制耗时(毫秒)：" + (System.currentTimeMillis() - start));
    }

    /**
     * 使用直接缓冲区复制文件
     *
     * @throws IOException
     */
    public static void copyByDirectMemory(String sourcePath, String targetPath) throws IOException {
        long start = System.currentTimeMillis();
        FileInputStream input = new FileInputStream(sourcePath);
        FileOutputStream out = new FileOutputStream(targetPath);
        // 获取通道
        FileChannel inChannel = input.getChannel();
        FileChannel outChannel = out.getChannel();

        // 创建直接缓冲区
        ByteBuffer buffer = ByteBuffer.allocateDirect(1024);

        while (inChannel.read(buffer) != -1) {
            // 写转读
            buffer.flip();
            outChannel.write(buffer);
            buffer.clear();
        }
        outChannel.close();
        inChannel.close();
        out.close();
        input.close();

        System.out.println("直接缓冲区复制耗时(毫秒)：" + (System.currentTimeMillis() - start));
    }

    /**
     * 内存映射复制
     * @param sourcePath
     * @param targetPath
     * @throws IOException
     */
    public static void copyByMemoryMapping(String sourcePath, String targetPath) throws IOException {
        long start = System.currentTimeMillis();
        // 使用文件的输入通道
        FileChannel inChannel = FileChannel.open(Paths.get(sourcePath), StandardOpenOption.READ);
        // 使用文件的输出通道
        FileChannel outChannel = FileChannel.open(Paths.get(targetPath), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE);

        // 输入通道和输出通道之间的内存映射文件（内存映射文件处于堆外内存中）
        MappedByteBuffer inMappedBuf = inChannel.map(FileChannel.MapMode.READ_ONLY, 0, inChannel.size());
        MappedByteBuffer outMappedBuf = outChannel.map(FileChannel.MapMode.READ_WRITE, 0, inChannel.size());

        //直接对内存映射文件进行读写
        byte[] dst = new byte[inMappedBuf.limit()];
        inMappedBuf.get(dst);
        outMappedBuf.put(dst);
        inChannel.close();
        outChannel.close();

        System.out.println("：" + ( System.currentTimeMillis() - start));
    }

    /**
     * 零拷贝：用户空间和内核空间之间的复制次数为0
     * @param sourcePath
     * @param targetPath
     * @throws IOException
     */
    public static void zeroCopy(String sourcePath, String targetPath) throws IOException{
        long start = System.currentTimeMillis();
        FileChannel inChannel = FileChannel.open(Paths.get(sourcePath), StandardOpenOption.READ);
        FileChannel outChannel = FileChannel.open(Paths.get(targetPath), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE);

        // 输入管道完成复制
        inChannel.transferTo(0, inChannel.size(), outChannel);

        // 输出通道完成复制,和上面等价
        //outChannel.transferFrom(inChannel, 0, inChannel.size());

        inChannel.close();
        outChannel.close();

        System.out.println("复制操作消耗的时间（毫秒）："+(System.currentTimeMillis() - start));
    }

    /**
     * 管道Pipe: 两个线程之间单向传输数据时，可以使用管道
     * SinkChannel 向管道写数据
     * SourceChannel 从管道读取数据
     * @throws IOException
     */
    public static void usePipe() throws IOException{
        // 创建管道
        Pipe pipe = Pipe.open();

        ByteBuffer buf = ByteBuffer.allocate(1024);
        // 通过 SinkChannel ，向Pipe中写数据
        Pipe.SinkChannel  sinkChannel = pipe.sink();
        buf.put("oycm".getBytes());
        buf.flip();
        sinkChannel.write(buf);

        // 通过SourceChannel，从Pipe中读取数据
        Pipe.SourceChannel sourceChannel = pipe.source();
        buf.flip();
        int len = sourceChannel.read(buf);
        System.out.println( new String(buf.array(),0,len));

        sourceChannel.close();
        sinkChannel.close();
    }
}

~~~



### SendFile

~~~java
public class NIOSendFile {

    public static void client(String filePath) throws IOException {
        FileChannel inFileChannel = FileChannel.open(Paths.get(filePath), StandardOpenOption.READ);
        // 创建与服务端建立连接的SocketChannel对象
        SocketChannel socketChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 8080));
        // 分配指定大小的缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        long start = System.currentTimeMillis();
        // 读取本地文件，并发送到服务端
        while (inFileChannel.read(buffer) != -1) {
            buffer.rewind();
            socketChannel.write(buffer);
            buffer.clear();
        }
        inFileChannel.close();
        socketChannel.close();
        long end = System.currentTimeMillis();
        System.out.println("NIO客户端发送耗时: " + (end - start));
    }

    public static void server(String path) throws IOException {
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        FileChannel outFileChannel = FileChannel.open(Paths.get(path), StandardOpenOption.WRITE, StandardOpenOption.CREATE);

        serverSocketChannel.bind(new InetSocketAddress(8080));
        // 创建与客户端建立连接的SocketChannel对象
        SocketChannel sChannel = serverSocketChannel.accept();
        System.out.println("连接成功...");

        long start = System.currentTimeMillis();
        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);
        // 接收客户端发送的文件，并保存到本地
        while (sChannel.read(buf) != -1) {
            buf.flip();
            outFileChannel.write(buf);
            buf.clear();
        }
        System.out.println("接收成功！");

        sChannel.close();
        outFileChannel.close();
        serverSocketChannel.close();
        long end = System.currentTimeMillis();
        System.out.println("NIO服务端发送耗时：" + (end - start));
    }

    public static void directMemoryClient(String filePath) throws IOException {
        long start = System.currentTimeMillis();
        SocketChannel socketChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 8080));

        FileChannel inFileChannel = FileChannel.open(Paths.get(filePath), StandardOpenOption.READ);
        // 通过inFileChannel.size()获取文件的大小，从而在内核地址空间中开辟与文件大小相同的直接缓冲区
        inFileChannel.transferTo(0, inFileChannel.size(), socketChannel);

        inFileChannel.close();
        socketChannel.close();
        long end = System.currentTimeMillis();
        System.out.println("NIO客户端发送耗时(直接内存): " + (end - start));
    }

    public static void main(String[] args) throws IOException {
        // 可以用线程启动
    }

}

~~~





### Lock

对文件加锁

~~~java
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;

public class FileLockDemo {

    public static void main(String[] args) throws FileNotFoundException, IOException, InterruptedException {
        String filePath = "";
        //r读  w写  rw读写
        RandomAccessFile raf = new RandomAccessFile(filePath, "rw");
        FileChannel fileChannel = raf.getChannel();
        /*
            将abc.txt中position=2，size=4的内容加锁（即只对文件的部分内容加了锁）。
            lock()第三个布尔参数的含义如下：
                true:共享锁。实际上是指“读共享”：某一线程将资源锁住之后，其他线程既只能读、
不能写该资源。
                false:独占锁。某一线程将资源锁住之后，其他线程既不能读、也不能写该资源。
         */
        /**
         * 对文件部分内容加锁, position=, size=4
         * true:共享锁。实际上是指“读共享”：某一线程将资源锁住之后，其他线程既只能读、不能写该资源。
         * false:独占锁。某一线程将资源锁住之后，其他线程既不能读、也不能写该资源。
         */
        FileLock fileLock = fileChannel.lock(2, 4, true);
        System.out.println("main线程将" + filePath + "锁3秒...");

        new Thread(
                () -> {
                    try {
                        byte[] bs = new byte[8];
                        // 新线程 读取文件
                        raf.read(bs,0,8);
                        // 新线程 往文件写入
                        // fileLock.isValid(); 可以判断访问的资源是否被加锁
                        raf.write("helloWorld".getBytes(),0,8);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                }).start();

        Thread.sleep(3000);
        System.out.println("3秒结束，main释放锁");
        fileLock.release();
    }

}

~~~





### Selector

Selector实现聊天室：

::: tabs


@tab 服务端

~~~java
public class ChatServer {

    /**
     * key为客户端名称，value为客户端和服务端之间的通道
     */
    private static Map<String, SocketChannel> clientsMap = new HashMap();

    public static void main(String[] args) throws IOException {
        int[] ports = new int[]{8081, 8082, 8083};
        // 创建多路复用器
        Selector selector = Selector.open();

        for (int port : ports) {
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            serverSocketChannel.configureBlocking(false);

            ServerSocket serverSocket = serverSocketChannel.socket();

            // 端口绑定
            serverSocket.bind(new InetSocketAddress(port));
            System.out.println("服务端启动成功，端口" + port);

            // 服务端选择器注册通道，并标识该通道所感兴趣的事件是：接收客户端连接(接收就绪)
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

        }

        while (true) {
            // 一直阻塞，直到选择器上存在已经就绪的通道（包含感兴趣的事件）
            selector.select();
            // selectionKeys包含了所有通道与选择器之间的关系（接收连接、读、写）
            Set<SelectionKey> selectionKeys = selector.selectedKeys();
            Iterator<SelectionKey> keyIterator = selectionKeys.iterator();

            // 如果 selector 中有多个就绪通道（接收就绪、读就绪、写就绪等），则遍历这些通道
            while (keyIterator.hasNext()) {
                SelectionKey selectedKey = keyIterator.next();
                String receive = null;
                // 与客户端交互的通道
                SocketChannel clientChannel;
                try {
                    // 接收就绪（已经可以接收客户端的连接了）
                    if (selectedKey.isAcceptable()) {
                        ServerSocketChannel server = (ServerSocketChannel) selectedKey.channel();
                        clientChannel = server.accept();
                        // 切换到非阻塞模式
                        clientChannel.configureBlocking(false);

                        // 再在服务端的选择器上，注册第二个通道，并标识该通道所感兴趣的事件是：接收客户端发来的消息（读就绪）
                        clientChannel.register(selector, SelectionKey.OP_READ);

                        // UUID作为 客户端唯一key
                        String key = UUID.randomUUID().toString();
                        // 将该建立完毕连接的 channel 缓存
                        clientsMap.put(key, clientChannel);

                    } else if (selectedKey.isReadable()) {
                        //读就绪（已经可以读取客户端发来的信息了）
                        clientChannel = (SocketChannel) selectedKey.channel();
                        ByteBuffer readBuffer = ByteBuffer.allocate(1024);
                        int result = -1;
                        try {
                            // 将服务端读取到的客户端消息，放入 readBuffer 中
                            result = clientChannel.read(readBuffer);
                            // 如果终止客户端，则read()会抛出IOException异常，根据这个判断客户端退出
                        } catch (IOException e) {
                            // 获取退出连接的client对应的key
                            String clientKey = getClientKey(clientChannel);
                            System.out.println("客户端" + clientKey + "退出聊天室");
                            clientsMap.remove(clientKey);
                            clientChannel.close();
                            selectedKey.cancel();

                            continue;
                        }
                        if (result > 0) {
                            // 读取数据
                            readBuffer.flip();
                            Charset charset = StandardCharsets.UTF_8;
                            receive = String.valueOf(charset.decode(readBuffer).array());

                            System.out.println(clientChannel + ": " + receive);
                            // 处理客户端第一次发来的连接测试信息
                            if ("connecting".equals(receive)) {
                                receive = "客户端加入聊天!";
                            }
                            // 将读取到的客户消息保存在 attachment 中，用于后续向所有客户端转发此消息
                            selectedKey.attach(receive);
                            // 将通道所感兴趣的事件标识为：向客户端发送消息（写就绪）
                            selectedKey.interestOps(SelectionKey.OP_WRITE);
                        }

                    } else if (selectedKey.isWritable()) {
                        //写就绪
                        clientChannel = (SocketChannel) selectedKey.channel();

                        String sendKey = getClientKey(clientChannel);
                        // 通知所有注册的客户端
                        for (Map.Entry<String, SocketChannel> entry : clientsMap.entrySet()) {
                            SocketChannel eachClient = entry.getValue();
                            ByteBuffer broadcastMsg = ByteBuffer.allocate(1024);
                            broadcastMsg.put((sendKey + ":" + selectedKey.attachment()).getBytes());
                            broadcastMsg.flip();
                            eachClient.write(broadcastMsg);

                        }
                        selectedKey.interestOps(SelectionKey.OP_READ);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            selectionKeys.clear();
        }
    }

    /**
     * 根据通道找到对应客户端的key
     *
     * @param clientChannel 通道
     * @return
     */
    public static String getClientKey(SocketChannel clientChannel) {
        String sendKey = null;

        for (Map.Entry<String, SocketChannel> entry : clientsMap.entrySet()) {
            if (clientChannel == entry.getValue()) {

                sendKey = entry.getKey();
                break;
            }
        }
        return sendKey;
    }

}

~~~



@tab 客户端

~~~java
public class ChatClient {

    public static void main(String[] args) {
        try {
            SocketChannel socketChannel = SocketChannel.open();
            // 切换到非阻塞模式
            socketChannel.configureBlocking(false);
            Selector selector = Selector.open();
            // 在客户端的选择器上，注册一个通道，并标识该通道所感兴趣的事件是：向服务端发送连接（连接就绪）。对应于服务端的OP_ACCEPT事件
            socketChannel.register(selector, SelectionKey.OP_CONNECT);

            // 服务端端口 8081, 8082, 8083
            socketChannel.connect(new InetSocketAddress("127.0.0.1", 8081));
            while (true) {
                selector.select();
                // selectionKeys 包含了所有通道与选择器之间的关系（请求连接、读、写）
                Set<SelectionKey> selectionKeys = selector.selectedKeys();
                Iterator<SelectionKey> keyIterator = selectionKeys.iterator();
                while (keyIterator.hasNext()) {
                    SelectionKey selectedKey = keyIterator.next();
                    // 判断是否连接成功
                    if (selectedKey.isConnectable()) {
                        ByteBuffer sendBuffer = ByteBuffer.allocate(1024);
                        // 创建一个用于和服务端交互的Channel
                        SocketChannel client = (SocketChannel) selectedKey.channel();
                        // 如果状态是：正在连接中...
                        if (client.isConnectionPending()) {

                            if (client.finishConnect()) {
                                System.out.println("连接成功！访问的端口是：" + 8081);
                                // 向服务端发送一条测试消息
                                sendBuffer.put("connecting".getBytes());
                                sendBuffer.flip();
                                client.write(sendBuffer);
                            }

                            // 单独的线程向服务端发送消息
                            new Thread(() -> {
                                while (true) {
                                    try {
                                        sendBuffer.clear();
                                        //接收用户从控制台输入的内容，并发送给服务端
                                        InputStreamReader reader = new InputStreamReader(System.in);
                                        BufferedReader bReader = new BufferedReader(reader);
                                        String message = bReader.readLine();

                                        sendBuffer.put(message.getBytes());
                                        sendBuffer.flip();
                                        client.write(sendBuffer);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            }).start();
                        }
                        // 标记通道感兴趣的事件是：读取服务端消息（读就绪）
                        client.register(selector, SelectionKey.OP_READ);

                    } else if (selectedKey.isReadable()) {
                        // 读就绪
                        SocketChannel client = (SocketChannel) selectedKey.channel();
                        ByteBuffer readBuffer = ByteBuffer.allocate(1024);

                        int len = client.read(readBuffer);
                        if (len > 0) {
                            String receive = new String(readBuffer.array(), 0, len);
                            System.out.println("客户端接收消息: " + receive);
                        }
                    }
                }
                selectionKeys.clear();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

~~~



:::



### 多缓冲区

作为Selector的客户端测试：

~~~java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

public class NIOServerWithBuffers {

    public static void main(String[] args) throws IOException {
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        ServerSocket serverSocket = serverSocketChannel.socket();
        serverSocket.bind(new InetSocketAddress(8081));

        ByteBuffer[] buffers = new ByteBuffer[2];
        buffers[0] = ByteBuffer.allocate(4);
        buffers[1] = ByteBuffer.allocate(8);

        int bufferSum = 4 + 8;
        SocketChannel socketChannel = serverSocketChannel.accept();

        while (true) {
            /*
                 读取客户端的消息：
                        eachReadbytes：每次读取到的字节数
                        totalReadBytes：当前时刻，一共读取的字节数
                 如果totalReadBytes小于"buffers能够容纳的最大字节数"，则循环累加读取；否则，清空buffers，重新读取
             */
            /**
             * 读取客户端的消息
             *      eachReadBytes：每次读取到的字节数
             *      totalReadBytes：当前时刻，一共读取的字节数
             */
            int totalReadBytes = 0;
            while (totalReadBytes < bufferSum) {
                long eachReadBytes = socketChannel.read(buffers);
                totalReadBytes += eachReadBytes;
                System.out.println("读取到的数据大小: " + eachReadBytes);
            }
            //如果buffers已满
            for (ByteBuffer buffer : buffers) {
                buffer.flip();
            }
        }
    }
}

~~~



## AIO

AIO是Java 7引入的异步IO模型，它基于`Future模式`和`回调函数`实现。当进行IO操作时，线程不会阻塞，而是在操作完成后，通过回调通知线程处理结果。

新增的异步通道：

- AsynchronousFileChannel：用于文件的异步读写。
- AsynchronousServerSocketChannel：服务端异步socket通道。
- AsynchronousSocketChannel：客户端异步socket通道。



### 读写文件



~~~java
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.concurrent.Future;

public class AIOOperateFileDemo {

    // Future 模式：读
    public static void readByFuture(String filePath) throws Exception {
        Path path = Paths.get(filePath);
        AsynchronousFileChannel channel = AsynchronousFileChannel.open(path);

        // 定义一个buffer，用于存放文件的内容
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        /**
         *  read()作用: 将文件通过 channel 读入 buffer 中,从0开始
         *  read()是一个异步的方法:
         *      会开启一个新线程，并且在这个新线程中读取文件;
         *  如何判断线程将文件读取完毕?
         *      future.isDone()的返回值为true;
         *      future.get() 方法不在阻塞
         */
        Future<Integer> future = channel.read(buffer, 0);

        // false指向其它操作
        while (!future.isDone()) {
            System.out.println("在read()的同时，可以处理其他事情...");
        }

        Integer readNumber = future.get();
        buffer.flip();
        String data = new String(buffer.array(), 0, buffer.limit());
        System.out.println("read number:" + readNumber);
        System.out.println(data);
    }

    // 回调模式：读
    public static void readByCall(String filePath) throws Exception {
        Path path = Paths.get(filePath);
        AsynchronousFileChannel channel = AsynchronousFileChannel.open(path, StandardOpenOption.READ);
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        // 在read()方法将文件全部读取到buffer之前，main线程可以异步进行其他操作
        channel.read(buffer, 0, null, new CompletionHandler<Integer, ByteBuffer>() {
            // 完成回调
            @Override
            public void completed(Integer result, ByteBuffer attachment) {
                buffer.flip();
                String data = new String(buffer.array(), 0, buffer.limit());
                System.out.println(data);
                System.out.println("read()完毕！");
            }

            @Override
            public void failed(Throwable e, ByteBuffer attachment) {
                System.out.println("异常...");
            }
        });

        System.out.println("在read()完毕以前，可以异步处理其他事情...");
        Thread.sleep(1000);

    }

    // Future模式：写
    public static void writeByFuture(String filePath) throws Exception {
        Path path = Paths.get(filePath);
        AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.WRITE, StandardOpenOption.CREATE_NEW);
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        long position = 0;

        buffer.put("hello world".getBytes());
        buffer.flip();

        Future<Integer> future = fileChannel.write(buffer, position);
        buffer.clear();

        while (!future.isDone()) {
            System.out.println("other thing....");
        }
        Integer result = future.get();
        System.out.println("写完毕！共写入字节数：" + result);
    }

    // 回调模式：写
    public static void writeByCall(String filePath) throws Exception {

        Path path = Paths.get(filePath);
        AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.WRITE, StandardOpenOption.CREATE_NEW);

        ByteBuffer buffer = ByteBuffer.allocate(1024);
        buffer.put("hello the world".getBytes());
        buffer.flip();
        fileChannel.write(buffer, 0, null, new CompletionHandler<Integer, ByteBuffer>() {
            @Override
            public void completed(Integer result, ByteBuffer attachment) {
                System.out.println("写完毕！共写入的字节数: " + result);
            }

            @Override
            public void failed(Throwable exc, ByteBuffer attachment) {
                System.out.println("发生了异常...");
            }
        });

        System.out.println("other things...");
        Thread.sleep(1000);

    }
    
}

~~~



### AIO通信

::: tabs


@tab 服务端

~~~java
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.channels.CompletionHandler;

public class AIOServer {

    public static void main(String[] args) throws Exception {
        final AsynchronousServerSocketChannel channel = AsynchronousServerSocketChannel.open()
                .bind(new InetSocketAddress("127.0.0.1", 8080));

        while (true) {
            // 接收客户端请求的连接
            channel.accept(null, new CompletionHandler<AsynchronousSocketChannel, Void>() {
                // 当接收到连接时，触发completed()
                @Override
                public void completed(final AsynchronousSocketChannel client, Void attachment) {
                    channel.accept(null, this);
                    ByteBuffer buffer = ByteBuffer.allocate(1024);

                    client.read(buffer, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                        // 当接收到消息时，触发completed()
                        @Override
                        public void completed(Integer result_num, ByteBuffer dataBuffer) {
                            dataBuffer.flip();
                            String receive = new String(dataBuffer.array(), 0, dataBuffer.limit());
                            System.out.println("接收到的客户端消息:" + receive);
                            try {
                                client.close();
                            } catch (Exception e) {
                                e.printStackTrace();//打印异常
                            }
                        }

                        @Override
                        public void failed(Throwable e, ByteBuffer attachment) {
                            e.printStackTrace();
                        }
                    });
                }

                @Override
                public void failed(Throwable e, Void attachment) {
                    e.printStackTrace();
                }
            });

            while (true) {
                System.out.println("main线程和用于读取客户端消息的线程是异步执行的...");
                Thread.sleep(1000);
            }

        }
    }

}

~~~



@tab 客户端

~~~java
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousSocketChannel;
import java.util.concurrent.Future;

public class AIOClient {

    public static void main(String[] args) throws Exception {
        AsynchronousSocketChannel channel = AsynchronousSocketChannel.open();
        channel.connect(new InetSocketAddress("127.0.0.1", 8080)).get();
        ByteBuffer buffer = ByteBuffer.wrap("Hello Server".getBytes());
        // 向服务端发送消息
        Future<Integer> future = channel.write(buffer);
        while (!future.isDone()) {
            System.out.println("在channel将消息发送完毕以前，main可以异步处理其他事情..");
            Thread.sleep(1000);
        }
        // 获取发送的字节数
        Integer len = future.get();
        System.out.println("发送完毕！共发送字节数："+len);

    }
}

~~~



:::