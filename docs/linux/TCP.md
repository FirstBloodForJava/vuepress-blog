# TCP

## TCP正常四次挥手

四次挥手是指TCP连接的断开过程，它是建立再三次握手的基础之上。四次挥手过程用于正常关闭一个已经建立的TCP连接。
1. 主动关闭方(通常是客户端)发送FIN(Finish)：主动关闭方首先发送一个FIN报文段，表示它已经完成了数据的发送任务，并且希望关闭连接；发送FIN后，主动关闭方进入==FIN-WAIT-1==状态，等待被动关闭方的确认。
2. 被动关闭方(通常是服务器)发送ACK：被动关闭方接收到主动关闭方的FIN后，会发送一个ACK(Acknowledgment)报文段，表示已经收到了关闭请求，并且进入==CLOSE-WAIT==状态(此时被动关闭方仍然可以发送未发生完毕的数据)。主动关闭方接收到报文进入==FIN-WAIT-2==状态。
3. 被动关闭方发送FIN：被动关闭方在完成所有数据的发送后，会发送一个FIN报文给主动关闭方；被动关闭方进入==LAST-ACK==状态等待被动关闭方的确认。
4. 主动关闭方发送ACK：主动关闭方收到被动关闭方的FIN后，会发送一个ACK报文段作为确认，表示已经收到了关闭请求；主动关闭方进入==TIME-WAIT==状态，等待可能出现的延迟的报文段(等待足够长的时间以确保被动关闭方收到了ACK报文段，防止出现任何延迟的报文段引发错误。完成TIME-WAIT状态后，TCP连接彻底关闭。)。

MSL(Maximum Segment Lifetime，最大报文段生存时间)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/0cdeae65a1c940c8bf90cdb25905a60b.png)

![image-20240220220747429](http://47.101.155.205/image-20240220220747429.png)

![image-20240220221946980](http://47.101.155.205/image-20240220221946980.png)

## TCP三次握手

TCP三次握手是建立TCP连接的过程，用于确保客户端和服务器之间的通信可以进行。
1. 客户端发送SYN报文段：客户端向服务器发送一个SYN(Synchronize Sequence Numbers同步序列编号)报文段，其中包含一个随机的初始序列号(seq=j)，用于序列号的同步；发送SYN报文之后，客户端进入==SYN-SENT==(同步已发布)状态，等待服务器的确认。

2. 服务器发送SYN-ACK报文段：服务器接收到客户端发送的SYN报文段后，向客户端发送一个SYN-ACK(同步-确认)报文段作为响应。SYN-ACK报文段中包含一个确认号，该确认号是客户端发送的序列化+1(ack=j+1)。服务器也会随机选择一个随机的初始序列号(seq=k)。发送SYN-ACK报文段之后，服务器进入==SYN-RECEIVED==(同步-收到)状态，等待客户端确认。

3. 客户端发送ACK报文段：客户端收到服务器发送的SYN-ACK报文段后，会向服务器发送一个确认的ACK报文段。ACK报文段中包含一个确认号(ack=k+1)，确认号是服务器发送的SYN报文段的序列号+1，同时客户端会选择一个随机的初始序列号(seq=z)。在发送ACK报文段后，客户端和服务器都进入==ESTABLISHED==状态，TCP连接建立完成。

   

   

   ![](https://img-blog.csdnimg.cn/direct/3ac990694b1d415eb13b51bfd198858a.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/5333dd72cc32400fbef040bb3d751d4a.png)

![image-20240220213013778](http://47.101.155.205/image-20240220213013778.png)



## 状态

### CLOSED
初始状态。

### SYN_RCVD
这个状态表示接受到了SYN报文，在正常情况下，这个状态是服务器端的SOCKET在建立TCP连接时的三次握手会话过程中的一个中间状态，很短暂，基本上用netstat你是很难看到这种状态的，除非你特意写了一个客户端测试程序，故意将三次TCP握手过程中最后一个ACK报文不予发送。因此这种状态时，当收到客户端的ACK报文后，它会进入到ESTABLISHED状态。

### SYN_SENT
客户端建立TCP连接发送第一个报文段后的状态。


### ESTABLISHED
连接建立

### FIN_WAIT_1
FIN_WAIT_1是SOCKET在ESTABLISHED状态发送FIN报文段之后的状态。
在实际的正常情况下，无论对方何种情况下，都应该马上回应ACK报文，所以FIN_WAIT_1状态一般是比较难见到的，而FIN_WAIT_2状态还有时常常可以用netstat看到。

### CLOSE_WAIT
被关闭的SOCKET连接接收到一个FIN报文段，发送一个ACK报文段之后就进入这个状态。

### FIN_WAIT_2
表示半连接，即有一方要close连接。
等待被关闭方的ACK报文后的状态，等待被关闭方的FIN报文段。

### LAST_ACK
被动关闭一方在发送FIN报文后，最后等待对方的ACK报文状态。
### TIME_WAIT
表示收到了对方的FIN报文，并发送出了ACK报文，就等2MSL后即可回到CLOSED可用状态了。如果FIN_WAIT_1状态下，收到了对方同时带FIN标志和ACK标志的报文时，可以直接进入到TIME_WAIT状态，而无须经过FIN_WAIT_2状态。

### CLOSING
这种状态比较特殊，实际情况中应该是很少见，属于一种比较罕见的例外状态。正常情况下，当你发送FIN报文后，按理来说是应该先收到（或同时收到）对方的ACK报文，再收到对方的FIN报文。但是CLOSING状态表示你发送FIN报文后，并没有收到对方的ACK报文，反而却收到了对方的FIN报文。什么情况下会出现此种情况呢？其实细想一下，也不难得出结论：那就是如果双方几乎在==同时close一个SOCKET==的话，那么就出现了双方同时发送FIN报文的情况，也就会出现CLOSING状态，表示双方都正在关闭SOCKET连接。





## 模拟Broken Pipe

出现Broken Pipe异常的条件：Http请求在客户端断开(服务端为响应时)；响应的结果要大于16kb

### 客户端条件

读取超时时间为5s

~~~java
package com.oycm.spring_mvc_starter.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ouyangcm
 * create 2024/2/20 10:12
 */
public class HttpUtils {

    private static final Gson gson;

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.serializeNulls();
        gson = gsonBuilder.create();
    }

    public static void main(String[] args) throws IOException {
        System.out.println(httpPost("http://127.0.0.1:8080/broken/pipe/2493", new HashMap<>(), new HashMap<>()));
    }

    public static String httpPost(String url, Map<String,Object> body, Map<String,String> header) throws IOException {

        URL apiUrl = new URL(url);

        HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();

        connection.setRequestMethod("POST");

        // 设置请求头
        for (Map.Entry<String, String> keySet : header.entrySet()) {
            connection.setRequestProperty(keySet.getKey(), keySet.getValue());
        }

        // 设置连接时间
        connection.setConnectTimeout(5000);
        connection.setReadTimeout(5000);

        // 输出流
        connection.setDoOutput(true);

        DataOutputStream outPut = new DataOutputStream(connection.getOutputStream());

        outPut.writeBytes(gson.toJson(body));

        System.out.println(connection.getResponseCode());

        BufferedReader inReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String tempLine = null;
        while ((tempLine = inReader.readLine()) != null){
            response.append(tempLine);
        }
        inReader.close();
        return response.toString();
    }
}

~~~



### 服务端条件



![image-20240220214351092](http://47.101.155.205/image-20240220214351092.png)





### wireshark抓包情况

![image-20240220215417043](http://47.101.155.205/image-20240220215417043.png)

![image-20240220220514668](http://47.101.155.205/image-20240220220514668.png)



### 时间足够长

![image-20240220222545920](http://47.101.155.205/image-20240220222545920.png)





## tcp连接需要

### tcp相关参数

~~~bash
# 查询相关tcp参数
sysctl -a | grep tcp

~~~





### tcp连接端口

~~~bash
# 查看tcp连接端口信息
netstat -an | grep ESTABLISHED

# 查看tcp连接端口数量
netstat -an | grep ESTABLISHED | wc -l

# 查询支持tcp连接的端口范围
cat /proc/sys/net/ipv4/ip_local_port_range

# 增大tcp连接端口范围
echo "1024 65535" > /proc/sys/net/ipv4/ip_local_port_range

~~~

