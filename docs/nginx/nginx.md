# nginx

## 1.什么是nginx，做什么

Nginx是一款轻量级的Web服务/反向代理服务器及电子邮件(IMAP/POP3)代理服务器，其特点是占用内存少，并发能力强，简单的配置文件。

`反向代理`：反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以访问目标服务器的资源。同时用户不需要知道目标代理服务器的地址，也无需在用户端做任何设定。反向代理服务器通常用来作为Web加速，即用反向代理作为Web服务器前置机来降低网络和服务器的负载，提高访问效率。



使用nginx主要的功能：反向代理(解决跨域)、负载均衡、存放静态资源。



## 2.Linux安装nginx

~~~bash
tar -zxvf nginx-1.23.1.tar.gz
cd nginx-1.23.1
./configure
make
make install #安装完成
# updatedb 更新文件缓存
whereis nginx #可以查询在目录是/usr/local/nginx


# centos安装PCRE库
sudo yum install pcre pcre-devel

# centos安装ZLIB库
sudo yum install zlib-devel

~~~



### 缺少PCRE

提示缺少PCRE库

![image-20240120140957098](http://47.101.155.205/image-20240120140957098.png)



**安装PCRE库：**

![image-20240120141129099](http://47.101.155.205/image-20240120141129099.png)





### 缺少ZLIB库

![image-20240120141440533](http://47.101.155.205/image-20240120141440533.png)



~~~bash
# centos安装ZLIB库
sudo yum install zlib-devel

~~~

![image-20240120141624129](http://47.101.155.205/image-20240120141624129.png)



### 安装成功

./configure成功如下

![image-20240120141731213](http://47.101.155.205/image-20240120141731213.png)



**make成功如下图：**

![image-20240120142013700](http://47.101.155.205/image-20240120142013700.png)

make install 成功如下图：

![image-20240120142245490](http://47.101.155.205/image-20240120142245490.png)

![image-20240120142331847](http://47.101.155.205/image-20240120142331847.png)





## 3.nginx命令

~~~bash
# 进入/usr/local/nginx/sbin目录下，启动nginx 默认读取/usr/local/nginx/conf下的nginx.conf配置文件
./nginx 
./nginx -s quit #安全退出
./nginx -s stop #停止
.nginx -s reload #重新加载配置文件

kill -s QUIT 1628 # 1628为进程id

ps aux | grep nginx #查看nginx进程信息

# nginx指定配置文件启动
nginx -c /path/to/your/nginx.conf


~~~
### 启动成功

![image-20220924215829375](http://47.101.155.205/image-20220924215829375.png)

查看nginx配置文件地址

![image-20240120144024157](http://47.101.155.205/image-20240120144024157.png)



## 4.nginx的优缺点

`优点`：占用内存少，配置简单，可实现高并发连接，处理响应快，实现虚拟主机、反向代理、负载均衡，可以不暴露真实服务器IP地址。

`缺点`：动态处理能力差。



## 5.nginx配置文件模块

- 进程模块
- events模块
- http模块
- http模块下server
- server模块下的location
- http模块下upstream

ngx_http_stub_status_module 可以设置开启nginx网页监控

`location匹配规则:`

| 匹配符 | 规则                         | 优先级 |
| ------ | ---------------------------- | ------ |
| =      | 精确匹配                     | 1      |
| ^~     | 以某个字符串开头             | 2      |
| ~      | 区分大小写的正则匹配         | 3      |
| ~*     | 不区分大小写的正则匹配       | 4      |
| !~     | 区分大小写不匹配的正则       | 5      |
| !~*    | 不区分大小写不匹配的正则     | 6      |
| /      | 通配请求，任何请求都会匹配到 | 7      |



### main主要模块

~~~conf
# 指定Nginx进程所使用的用户 默认注释
user nginx;

# 指定Nginx启动的工作进程数 默认是1
worker_processes auto;

# 指定Nginx的PID文件路径 默认注释
pid /var/run/nginx.pid;

# 指定Nginx错误日志的输出路径 默认注释
error_log /var/log/nginx/error.log;

~~~

指定Nginx进程(全局配置)所使用的用户作用：

1. 安全性：通过限制Nginx进程使用的用户，可以降低系统被攻击时受到的影响。如果Nginx进程使用的是具有较低权限的用户，攻击者在攻击Nginx时无法获取到该用户的特权，从而保护系统安全。
2. 资源隔离：使用不同的用户运行Nginx进程可以有效隔离不同的应用程序和服务之间的资源，避免它们之间产生冲突。
3. 维护性：使用专门的用户运行Nginx进程可以使维护人员更容易管理和维护Nginx。例如，如果需要更改Nginx进程的配置或更新Nginx的版本，管理员可以直接以该用户的身份执行相应的操作，而无需考虑其他用户的权限和影响。



### events

~~~conf
events {
    worker_connections 1024; # 每个工作进程能够同时处理的连接数
    multi_accept on; # 是否启用多个接受连接的线程 on开启 off 关闭
    use select; # 使用哪种事件模型 "select"、"poll"、"epoll"、"kqueue"、"eventport"、"rtsig"和"/dev/poll"
    accept_mutex ; # 是否启用接受连接互斥锁
    accept_mutex_delay ; # 指定接受连接互斥锁的等待时间
    worker_priority 15; # 工作进程的优先级
}

~~~





### http

~~~conf
http {
    include       mime.types; # 用于包含其他配置文件中，/etc/nginx/conf.d/*.conf conf.d目录所有.conf文件
    default_type  application/octet-stream; # 指定默认的MIME类型。将默认类型设置为二进制流

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    # 用于定义日志格式。定义一个名为main的日志格式，其中包含了客户端IP、访问时间、请求方法、请求结果等信息。

    access_log  logs/access.log  main; # 访问日志文件的路径和格式

    sendfile        on; # 是否启用sendfile机制，用于在磁盘和网络之间高效地传输文件
    #tcp_nopush     on; # 是否启用TCP NOPUSH机制，用于在网络上更有效地传输数据
 
    #keepalive_timeout  0; 设置HTTP Keep-Alive机制的超时时间，单位秒。
    # 长连接请求大量小文件的时候，可以减少重建连接的开销，但假如有大文件上传，65s内没上传完成会导致失败。如果设置时间过长，用户又多，长时间保持连接会占用大量资源。
    keepalive_timeout  65;

    #gzip  on; # 是否启用Gzip压缩机制，用于减小传输数据量
    gzip_min_length 1k;
    gzip_buffers    4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6;
    gzip_types text/html text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;

    server {

    }

}

~~~

MIME类型是一种在Web中标识文件类型的方式，是通过在HTTP头部中添加Content-Type字段来实现的。不同的文件类型对应不同的MIME类型，例如文本文件通常使用`text/plain`，HTML文件使用`text/html`，JPEG图片使用`image/jpeg`等。



`default_type application/octet-stream;`是Nginx HTTP模块中一个常用的指令，用于设置默认的MIME类型。这个指令的作用是当Nginx无法确定请求的文件类型时，使用`application/octet-stream`类型作为默认的MIME类型，即将文件作为二进制流下载。

**其它配置说明：**

- send_timeout： 用于指定响应客户端的超时时间。这个超时仅限于两个连接活动之间的时间，如果超过这个时间，客户端没有任何活动，Nginx将会关闭连接。
- client_max_body_size 10m：允许客户端请求的最大单文件字节数。
- client_body_buffer_size 128k：缓冲区代理缓冲用户端请求的最大字节数。
- proxy_connect_timeout 60：nginx跟后端服务器连接超时时间(代理连接超时)。
- proxy_read_timeout 60：连接成功后，与后端服务器两个成功的响应操作之间超时时间(代理接收超时)。
- proxy_buffer_size 4k：设置代理服务器（nginx）从后端realserver读取并保存用户头信息的缓冲区大小，默认与proxy_buffers大小相同，其实可以将这个指令值设的小一点。
- proxy_buffers 4 32k：proxy_buffers缓冲区，nginx针对单个连接缓存来自后端realserver的响应，网页平均在32k以下的话，这样设置。
- proxy_busy_buffers_size 64k：高负荷下缓冲大小（proxy_buffers的2倍）。
- proxy_max_temp_file_size 1024M：当 proxy_buffers 放不下后端服务器的响应内容时，会将一部分保存到硬盘的临时文件中，这个值用来设置最大临时文件大小，默认1024M，它与 proxy_cache 没有关系。大于这个值，将从upstream服务器传回。设置为0禁用。
- proxy_temp_file_write_size 64k：当缓存被代理的服务器响应到临时文件时，这个选项限制每次写临时文件的大小。proxy_temp_path（可以在编译的时候）指定写到哪那个目录。



**gzip压缩功能：**

- gzip_min_length 1k：设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。默认值是20。建议设置成大于1k的字节数，小于1k可能会越压越大。
- gzip_buffers 4 16k：设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。4 16k代表以16k为单位，安装原始数据大小以16k为单位的4倍申请内存。
- gzip_http_version 1.0：用于识别 http 协议的版本，早期的浏览器不支持 Gzip 压缩，用户就会看到乱码，所以为了支持前期版本加上了这个选项，如果你用了 Nginx 的反向代理并期望也启用 Gzip 压缩的话，由于末端通信是 http/1.0，故请设置为 1.0。
- gzip_comp_level 6：gzip压缩比，1压缩比最小处理速度最快，9压缩比最大但处理速度最慢(传输快但比较消耗cpu)。
- gzip_types：匹配mime类型进行压缩，无论是否指定,`text/html`类型总是会被压缩的。
- gzip_proxied any：Nginx作为反向代理的时候启用，决定开启或者关闭后端服务器返回的结果是否压缩，匹配的前提是后端服务器必须要返回包含`Via`的 header头。
- gzip_vary on：和http头有关系，会在响应头加个 Vary: Accept-Encoding ，可以让前端的缓存服务器缓存经过gzip压缩的页面，例如，用Squid缓存经过Nginx压缩的数据。



#### log_format

配置打印日志的格式

- `$remote_addr`记录客户端ip地址。
- `$remote_user`记录客户端用户名。
- `$time_local`记录访问时间和时区。
- `$request`记录请求的url和http协议。
- `$status`记录请求响应状态码，成功200。
- `$body_bytes_sent`响应给客户端文件主体内容大小。
- `$http_referer`记录从哪个页面链接访问过来。
- `$http_user_agent`表示客户端浏览器相关信息，如User-Agent头等。
- `$http_x_forwarded_for`和代理相关，用以记录客户端的ip地址。
- `$request_uri`表示当前请求的URI
- 


在`location`块或其他上下文中，可以使用`set`指令来定义自定义变量

~~~conf
location /images/ {
    set $my_var "This is my variable";
    ...
}

~~~

使用`set`指令将一个名为`$my_var`的自定义变量设置为字符串"This is my variable"。在`location`块内，可以使用`$my_var`变量来引用该字符串。

其中`remote_addr`同一个wifi下的设备，发起的请求`remote_addr`地址都是一样的。

![image-20240120161608804](http://47.101.155.205/image-20240120161608804.png)

ipconfig获取的ip是局域网内的本地IP地址。

![image-20240120162129995](http://47.101.155.205/image-20240120162129995.png)



#### http下的server

`server`块用于配置一个虚拟主机，用于处理来自客户端的HTTP请求。每个`server`块通常包含一个或多个`location`块，用于处理不同的URI请求。

~~~conf
server {
    listen 80; # 监听的端口号。可以是一个IP地址和端口号的组合，也可以是一个Unix socket路径
    server_name example.com; # 虚拟主机的域名或IP地址。当客户端请求该域名或IP地址时，Nginx会将请求路由到该虚拟主机中。

    location / {
        root /var/www/example.com; # 定义访问文件的目录
        index index.html; # 定义访问的文件名
    }
}

~~~

- `error_page`: 指定错误页面的路径或URL，例如`error_page 404 /404.html`表示当发生404错误时，Nginx会返回`/404.html`页面。error_page   500 502 503 504  /50x.html;
- `access_log`: 指定访问日志的路径和格式，例如`access_log /var/log/nginx/example.com.access.log main`表示将访问日志写入`/var/log/nginx/example.com.access.log`文件中，并使用`main`格式输出日志记录。
- `ssl_certificate`: 指定SSL证书的路径，用于启用HTTPS协议。



~~~conf
error_page   500 502 503 504  /50x.html;
location = /50x.html {
	root   html;
}
~~~



#### server下的location

~~~conf
...

http {
	upstream test {
        server ip1:port1;
        server ip2:port2;
        keepalive 4000;
        keepalive_requests 100;
    }
	
	server {
        listen       80; # 监听的端口
        # Web服务器可以通过X-Forwarded-For获取用户真实IP
        # 设置客户端的真实ip
        proxy_set_header X-Real-IP $remote_addr;
        # 代理链
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # 解决请求响应400的问题，
        proxy_set_header Host $host;
        
        
        location /custom-server/ {
            proxy_buffering off;
            proxy_redirect off;
            proxy_pass http://test/; # 转向test定义的服务器列表
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}

~~~

- root：访问本地的路径。
- index：默认访问的文件名，一般跟着root放。
- proxy_pass：定义访问服务器的列表，反向代理配置。

语法：location [ = | ~ | ~* | ^~ ] *uri* { ... } 可以使用的符号=、~、~*、^~、@、/

`location匹配规则:`

| 匹配符 | 规则                         | 优先级 |
| ------ | ---------------------------- | ------ |
| =      | 精确匹配                     | 1      |
| ^~     | 以某个字符串开头             | 2      |
| ~      | 区分大小写的正则匹配         | 3      |
| ~*     | 不区分大小写的正则匹配       | 4      |
| `!~`   | 区分大小写不匹配的正则       | 5      |
| `!~*`  | 不区分大小写不匹配的正则     | 6      |
| /      | 通配请求，任何请求都会匹配到 | 7      |

匹配优先级：

1. nginx将检查所有精准匹配的location块。如果请求路径相匹配，则该请求被路由到这块。`location = /index.html`，只会匹配`/index.html`这个URL请求，不会匹配`/index.html/`或者`/index.html?query=xxx`等其他请求。
2. 如果没有精准匹配到，则使用前缀匹配最长的位置并且记录。然后按照正则表达式在配置文件中的出现顺序检查它们，在正则表达式的搜索底层匹配时终止，并使用相应的配置。如果没有找到对应的正则表达式，则使用最先记住的前缀位置。



为了找到匹配给定请求的位置，nginx首先检查使用前缀字符串定义的位置(前缀位置)。其中，选择匹配前缀最长的位置并记住。然后按照正则表达式在配置文件中的出现顺序检查它们。正则表达式的搜索在第一次匹配时终止，并使用相应的配置。如果没有找到与正则表达式的匹配，则使用先前记住的前缀位置的配置。



~~~conf
location = / {
    [ configuration A ]
}

location / {
    [ configuration B ]
}

location /documents/ {
    [ configuration C ]
}

location ^~ /images/ {
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
    [ configuration E ]
}

~~~

`/`

`/index.html`

`/documents/document.html`

`/images/1.gif`

`/documents/1.jpg`


~~~conf
location /user/ {
    proxy_pass http://user.example.com;
}

location = /user {
    proxy_pass http://login.example.com;
}

~~~



`allow/deny` 访问控制，可以分别有多个allow,deny，允许或禁止某个ip或ip段访问，依次满足任何一个规则就停止往下匹配。

~~~conf
location /nginx-status {
	stub_status on;
  	access_log off;
	allow 192.168.8.8;
	allow 192.168.8.8.0/24;
	deny all;
}


~~~



列出目录配置：

Nginx默认是不允许列出整个目录的，如需开启，在location，server或http块中加入autoindex on。

~~~conf
location /image {
  	root   /www/image;
  	autoindex on;
  	autoindex_exact_size off;
  	autoindex_localtime on;
}

~~~

- autoindex_exact_size：默认为on，显示出文件的确切大小，单位byte；off显示出文件的大概大小，单位是kB或者MB或者GB。
- autoindex_localtime：on显示的文件时间为文件的服务器时间；off显示的文件时间为GMT时间。





### upstream负载均衡

upstream模块用于负载均衡，在upstream块中可以定义多个后端服务器的地址，Nginx会根据某种算法（如轮询、IP哈希等）将请求分发到这些服务器上，实现请求负载均衡。

使用upstream模块需要在nginx.conf中定义upstream块，示例如下：

```
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

上述配置定义了一个名为backend(域名)的upstream块，其中包含了3个后端服务器的地址。

接下来可以在location块中使用proxy_pass指令将请求转发到upstream中定义的服务器，示例如下：

```
location / {
    proxy_pass http://backend;
}
```

上述配置将匹配到所有以“/”开头的请求，并将其转发到backend中定义的服务器上。Nginx会根据指定的负载均衡算法选择一个服务器来处理请求。

另外，在upstream块中还可以设置一些高级选项，如负载均衡算法、连接超时、最大连接数等。以下是一些常见的选项：

- weight：设置后端服务器的权重，用于调整负载均衡算法的权重计算；
- ip_hash：根据客户端IP地址的hash值选择后端服务器；
- keepalive：设置与后端服务器的长连接；
- max_fails和fail_timeout：用于定义后端服务器的健康检查，当后端服务器失败的次数超过max_fails时，暂停向该服务器转发请求，并在fail_timeout时间后重新尝试连接。

总之，Nginx upstream模块可以方便地实现请求负载均衡，提高Web应用的可靠性和性能。



http://localhost/favicon.ico

## 6.nginx负载均衡的策略

1. 轮询(默认)
2. 权重
3. ip_hash(ip绑定)
4. fair(第三方插件)
5. url_hash(第三方插件)



![image-20220724224724880](http://47.101.155.205/image-20220724224724880.png)

## 7.其他项目配置

~~~conf
upstream vhr{
	server 127.0.0.1:8081;
}
server {
	listen	80;
	server_name localhost;
	
	location /{
		proxy_pass http://vhr;
		proxy_redirect default;
	}
	location ~ .*\.(js|css|ico|png|jpg|eot|svg|ttf|woff|html){
		root	/usr/vhr/dist/;
		expires 30d; #缓存30天
	}
}
~~~



