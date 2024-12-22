

## 文件资源



### ClassLoader

1. InputStream getResourceAsStream(String name)：



### URL

java.net.URL可以支持ftp, http, nntp协议连接去加载资源，但是加载jar包中的路径资源不是很方便。

如果不是jar包中的资源，倒是可以通过System.getProperty("user.dir")获取当前所在的目录。

~~~java
// 使用URL获取输入流
URL url = new URL("file:" + System.getProperty("user.dir")+ "");
URLConnection urlConnection = url.openConnection();
InputStream inputStream = urlConnection.getInputStream();

~~~





### FileSystemResource

org.springframework.core.io.FileSystemResource创建InputStream。

通过file指定绝对路径格式file:路径或file:///路径。