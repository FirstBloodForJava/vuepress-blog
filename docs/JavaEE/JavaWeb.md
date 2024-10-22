# JavaWeb

## 1、基本概述

### 1.1、web

web，网页，构成网站的基本元素

- 静态web
  - 网页的数据始终不会发生变化
  - html，css
- 动态web
  - 网页会根据不同的用户展现不同的数据
  - 技术栈：Servlet/Jsp,ASP,PHP

JavaWeb开发：运用java开发动态web资源的技术，统称javaweb

### 1.2、web应用程序

web应用程序是一种可以通过web访问的应用程序。

应用程序，指为完成某项或多项特定工作的计算机程序，它运行在用户模式，可以和用户进行交互，具有可视的用户界面。

### 1.3、静态web

- \*.htm,\*.html文件，是指没有h后台数据库、不含程序和不可交互的网页。
- 实际上静态也不是完全静态，他也可以出现各种动态的效果，如GIF格式的动画、FLASH、滚动字幕等。
- 静态页面的缺点
  - 内容是固定的，交互性差，内容更新维护复杂。
  - 没有自动化的工具，维护大量的静态页面文件是不现实的。
  - 无法充分支持用户/客户的需求（外观选择，浏览器的支持，Cookie）。

![image-20220407152058202](http://47.101.155.205/image-20220407152058202.png)





### 1.4、动态web

动态网页页面代码虽然没有变，但是显示的内容却是可以随着时间、环境或者数据库操作的结果而发生改变的。

![image-20220407152710352](http://47.101.155.205/image-20220407152710352.png)

缺点：

- 加入服务器的动态web资源出现了错误，我们需要重新编写我们的**后台程序**,重新发布；

- 停机维护

优点：

- Web页面可以动态更新，所有用户看到都不是同一个页面

- 它可以与数据库交互 （数据持久化：注册，商品信息，用户信息........）



![image-20220407153139025](http://47.101.155.205/image-20220407153139025.png)

**分析原理、看源码** 



## 2、web服务器

web服务器：Apache、 Nginx 、IIS。

服务端页面：ASP、JSP、php
### 2.1服务器端的页面

#### 2.1.1、ASP

ASP即Active Server Pages，是Microsoft公司开发的服务器端脚本环境，可用来创建动态交互式网页并建立强大的web应用程序。

- 微软：国内最早流行的就是ASP； 

- 在HTML中嵌入了VB的脚本， ASP + COM； 

- 在ASP开发中，基本一个页面都有几千行的业务代码，页面极其换乱

- 维护成本高！

- C#

- IIS



#### 2.1.2、JSP/Servlert

java server pages（java服务器页面），JSP部署于网络服务器上，可以响应客户端发送的请求，并根据请求内容动态地生成HTML、XML或其他格式文档的web网页，然后返回给请求者。

B/S：浏览和服务器

C/S: 客户端和服务器

- sun公司主推的B/S架构
- 基于Java语言的 (所有的大公司，或者一些开源的组件，都是用Java写的)
- 可以承载三高问题带来的影响；
- 语法像ASP ， ASP-->JSP , 加强市场强度；

#### 2.1.3、php

是在服务器端执行的脚本语言

- PHP开发速度很快，功能很强大，跨平台，代码很简单 （70% , WP）
- 无法承载大访问量的情况（局限性）

### 2.2、web服务器

服务器是一种被动的操作，用来处理用户的一些请求和给用户一些响应信息；

IIS微软的，windows电脑自带的

Tomcat

### 2.3、Tomcat服务器

Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，由[Apache](https://baike.baidu.com/item/Apache/6265)、Sun 和其他一些公司及个人共同开发而成。

Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用[服务器](https://baike.baidu.com/item/服务器)，在中小型系统和并发访问用户不是很多的场合下被普遍使用，**是开发和调试JSP 程序的首选**。对于一个初学者来说，可以这样认为，当在一台机器上配置好Apache 服务器，可利用它响应HTML页面的访问请求。实际上Tomcat是Apache 服务器的扩展，但运行时它是独立运行的，所以当你运行tomcat 时，它实际上作为一个与Apache 独立的进程单独运行的。

诀窍是，当配置正确时，Apache 为HTML页面服务，而Tomcat 实际上运行JSP 页面和Servlet。另外，Tomcat和[IIS](https://baike.baidu.com/item/IIS)等Web服务器一样，具有处理HTML页面的功能，另外它还是一个Servlet和JSP容器，独立的Servlet容器是Tomcat的默认模式。不过，Tomcat处理静态[HTML](https://baike.baidu.com/item/HTML)的能力不如Apache服务器。Tomcat最新版本为10.0.14。



## 3、tomcat

### 3.1、tomcat下载

![image-20220407162826514](http://47.101.155.205/image-20220407162826514.png)



### 3.2、tomcat启动和配置

**文件夹介绍**

![image-20220407163318110](http://47.101.155.205/image-20220407163318110.png)



#### 3.2.1**启动和关闭** 

![image-20220407163716054](http://47.101.155.205/image-20220407163716054.png)



http:localhost:8080去访问。



#### 3.2.2、配置文件

![image-20220407165618464](http://47.101.155.205/image-20220407165618464.png)



**tomcat配置文件**

- 默认的主机名为：localhost->127.0.0.1
- 默认网站应用存放的位置为：webapps
- config/server.xml文件

![image-20220407165809974](http://47.101.155.205/image-20220407165809974.png)





**修改Windows主机域名**

![image-20220407165922019](http://47.101.155.205/image-20220407165922019.png)



**修改端口号**

![image-20220407170926562](http://47.101.155.205/image-20220407170926562.png)



#### 3.2.3、网站时如何访问的

![image-20220407172024453](http://47.101.155.205/image-20220407172024453.png)

![image-20220407172058806](http://47.101.155.205/image-20220407172058806.png)

![image-20220407172133847](http://47.101.155.205/image-20220407172133847.png)

把上面127.0.0.1		www.baidu.com去掉，再访问百度

![image-20220407172628647](http://47.101.155.205/image-20220407172628647.png)



**网站发起请求简单流程** 

![image-20220407173745810](http://47.101.155.205/image-20220407173745810.png)

用户访问一个网站，首先回去本地电脑端的hosts文件中去核对有没有这个域名，如果有就返回，如果没有，就去DNS服务器去找，找到就返回，找不到返回找不到。



### 3.3发布一个网站

从ROOT中复制一份文件，删除其他文件，除了WEB-INF，将写好的html文件放入复制的文件中，开启tomcat服务器，就可以通过http:localhost:8080/复制文件名/写好的html文件名.html就可以访问了。



一个网站项目该有的结构

- webapps
  - ROOT
  - 项目名
    - WEB-INF
      - classes             写的java代码的.class文件
      - lib                     依赖的jar包
      - web.xml          网站配置文件
    - 其他文件
    - index.html







![image-20220407183326270](http://47.101.155.205/image-20220407183326270.png)

## 4、http

### 4.1、什么是http和https

HTTP超文本传输协议（Hyper Text Transfer Protocol）是一个简单的请求-响应协议，它通常运行在TCP之上。



HTTPS 超文本传输安全协议（Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 **HTTP** 通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性 。HTTPS 在HTTP 的基础下加入SSL，HTTPS 的安全基础是 SSL，



### 4.2、http的时代

- http/1.0
  - 每一个TCP连接只能发送一个http请求，服务器发送完响应，就关闭连接。只能获取一个资源
- http/1.1
  - 可以持久化连接，可以获取多个资源
- http/2
  - 二进制协议：1.1 版的头信息是文本，数据部分可以是文本，也可以是二进制。2版本的头信息和数据部分都是二进制，且统称为“帧”。
  - 多工：同一个TCP连接里面，客户端和服务器可以同时发送多个请求和多个响应，并且不用按照顺序来。由于服务器不用按顺序来处理响应，所以避免了“对头堵塞”的问题。
  - 数据流：由于2版本的数据包不是按照顺序发送的，同一个TCP连接里面相连的两个数据包可能是属于不同的响应，因此，必须要有一种方法来区分每一个数据包属于哪个响应。2版本中，每个请求或者响应的所有数据包，称为一个数据流（stream），并且每一个数据流都有一个唯一的编号ID，请求数据流的编号ID为奇数，响应数据流的编号ID为偶数。每个数据包在发送的时候带上对应数据流的编号ID，这样服务器和客户端就能分区是属于哪一个数据流。最后，客户端还能指定数据流的优先级，优先级越高，服务器会越快做出响应。
  - 头部信息压缩：由于HTTP协议是无状态的，所以很多请求都存在很多重复的头部信息，这样会导致带宽浪费，也影响传输速度。2版本针对这一点做了优化，引入了头部信息压缩机制，主要是通过服务端和客户端同时维护一张头部信息表，所有的头部信息在表里面都会有对应的记录，并且会有一个索引号，这样后面只需要发送索引号即可。
  - 服务器推送：2版本还允许服务器主动给客户端推送数据。举例，当客户端请求的某个网页里面包含了很多的静态资源的时候，服务器可以猜测到客户端的下一步动作，直接主动给客户端推送这些静态资源数据，而不用等客户端请求时在响应，可以提高客户端页面的加载速度。
    原文链接：https://blog.csdn.net/liqinging/article/details/110734663



### 4.3、http请求

以https:www.baidu.com请求为例

- general

~~~html
Request URL: https://www.baidu.com/		请求头
Request Method: GET						请求方式
Status Code: 200 OK						状态码
Remote Address: 14.215.177.39:443		远程地址
Referrer Policy: strict-origin-when-cross-origin
~~~

- Request Headers

~~~html
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9				接受的内容
Accept-Encoding: gzip, deflate, br		接受的字符编码
Accept-Language: zh-CN,zh;q=0.9			接受的语言
Connection: keep-alive					连接
Host: www.baidu.com						主机
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36		浏览器的信息
~~~

Request Headers

~~~html
:authority: dss0.bdstatic.com
:method: GET
:path: /5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png
:scheme: https
accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
referer: https://www.baidu.com/
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
sec-fetch-dest: image
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
~~~

请求行 － 通用信息头 － 请求头 － 实体头 － 报文主体

#### 请求行

请求行有3个字段：方法（请求方式）、URL、HTTP版本

- 请求方式：Get，Post，HEAD,DELETE,PUT,TRACT…
  - get：请求能够携带的参数比较少，大小有限制，会在浏览器的URL地址栏显示数据内容，不安全，但高效
  - post：请求能够携带的参数没有限制，大小没有限制，不会在浏览器的URL地址栏显示数据内容，安全，但不高效。

- URL     https://www.baidu.com/	
- HTTP版本

#### 消息头

~~~html
Accept：告诉浏览器，它所支持的数据类型 
Accept-Encoding：支持哪种编码格式 GBK UTF-8 GB2312 ISO8859-1 
Accept-Language：告诉浏览器，它的语言环境
Cache-Control：缓存控制 
Connection：告诉浏览器，请求完成是断开还是保持连接 
HOST：主机..../.
~~~







### 4.4、http响应

以https:www.baidu.com响应为例

~~~html
Bdpagetype: 1
Bdqid: 0x8c75fabe000672b6
Cache-Control: private						缓存控制
Connection: keep-alive						连接控制
Content-Encoding: gzip						内容编码格式
Content-Type: text/html;charset=utf-8		内容类型
Date: Thu, 07 Apr 2022 12:58:17 GMT
Expires: Thu, 07 Apr 2022 12:57:55 GMT
P3p: CP=" OTI DSP COR IVA OUR IND COM "
P3p: CP=" OTI DSP COR IVA OUR IND COM "
Server: BWS/1.1
Set-Cookie: BAIDUID=15EE45A1F449E20F58287437D9C1C28F:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: BIDUPSID=15EE45A1F449E20F58287437D9C1C28F; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: PSTM=1649336297; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: BAIDUID=15EE45A1F449E20FB3D20115990D456F:FG=1; max-age=31536000; expires=Fri, 07-Apr-23 12:58:17 GMT; domain=.baidu.com; path=/; version=1; comment=bd
Set-Cookie: BDSVRTM=0; path=/
Set-Cookie: BD_HOME=1; path=/
Set-Cookie: H_PS_PSSID=35836_31253_35915_36166_34584_36120_35978_36125_36233_26350_36103_36061; path=/; domain=.baidu.com
Set-Cookie: BAIDUID_BFESS=15EE45A1F449E20F58287437D9C1C28F:FG=1; Path=/; Domain=baidu.com; Expires=Thu, 31 Dec 2037 23:55:55 GMT; Max-Age=2147483647; Secure; SameSite=None
Strict-Transport-Security: max-age=172800
Traceid: 1649336297025522637810121271431536210614
Transfer-Encoding: chunked
X-Frame-Options: sameorigin
X-Ua-Compatible: IE=Edge,chrome=1
~~~



- General

~~~html
Request URL: https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png
Request Method: GET
Status Code: 200 			状态码
Remote Address: [240e:c3:4000:4::dca9:9821]:443
Referrer Policy: unsafe-url
~~~

Response Headers

~~~html
accept-ranges: bytes
age: 882973
cache-control: max-age=2592000
content-length: 4560
content-type: image/png
date: Thu, 07 Apr 2022 12:58:17 GMT
etag: "61a48a78-11d0"
expires: Wed, 27 Apr 2022 07:01:04 GMT
last-modified: Mon, 29 Nov 2021 08:08:24 GMT
ohc-cache-hit: yy2ct51 [2], xiangyctcache51 [2]
ohc-response-time: 1 0 0 0 0 0
server: JSP3/2.0.14
~~~

状态行 － 通用信息头 － 响应头 － 实体头 － 报文主体

#### 响应头

~~~html
Accept：告诉浏览器，它所支持的数据类型 
Accept-Encoding：支持哪种编码格式 GBK UTF-8 GB2312 ISO8859-1 
Accept-Language：告诉浏览器，它的语言环境 
Cache-Control：缓存控制 
Connection：告诉浏览器，请求完成是断开还是保持连接 
HOST：主机..../. 
Refresh：告诉客户端，多久刷新一次； 
Location：让网页重新定位；
~~~

#### 状态码

~~~html
200：请求响应成功 200
3xx：请求重定向 	重定向：你重新到我给你新位置去；
4xx：找不到资源 	404	资源不存在；
5xx：服务器代码错误 500 	502:网关错误
~~~



**常见面试题：**

当你的浏览器中地址栏输入地址并回车的一瞬间到页面能够展示回来，经历了什么？



## 5、maven

### 5.1、我为什么要学习这个技术？

1. 在Javaweb开发中，需要使用大量的jar包，我们手动去导入
2.  如何能够让一个东西自动帮我导入和配置这个jar包。

### 5.2、maven项目架构管理工具

我们目前用来就是方便导入jar包的！

Maven的核心思想：**约定大于配置**

- 有约束，不要去违反。

Maven会规定好你该如何去编写我们的Java代码，必须要按照这个规范来；

### 5.3、maven的下载

官网;https://maven.apache.org/

![image-20220407221849243](http://47.101.155.205/image-20220407221849243.png)

### 5.4、配置环境变量

配置如下配置：

| M2_HOME    | maven的目录   |
| ---------- | ------------- |
| MAVEN_HOME | maven的目录   |
| path       | %M2_HOME%\bin |

### 5.5、阿里云镜像

加速下载

~~~xml
<mirror> 
    <id>nexus-aliyun</id> 
    <mirrorOf>*,!jeecg,!jeecg-snapshots</mirrorOf>
    <name>Nexus aliyun</name> 
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
~~~

~~~xml
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>        
</mirror>
~~~



### 5.6、本地仓库

再本地的仓库，远程仓库

~~~xml
<localRepository>D:/environment/maven_work/maven_repository</localRepository>
~~~



### 5.7、在IDEA中使用maven

![image-20220408082510707](http://47.101.155.205/image-20220408082510707.png)



![image-20220408083153408](http://47.101.155.205/image-20220408083153408.png)

![image-20220408083456774](http://47.101.155.205/image-20220408083456774.png)

注意项目的maven配置

![image-20220408084205777](http://47.101.155.205/image-20220408084205777.png)

![image-20220408084302095](http://47.101.155.205/image-20220408084302095.png)



### 5.8、创建一个普通的maven项目

![image-20220408084507376](http://47.101.155.205/image-20220408084507376.png)

![image-20220408084619553](http://47.101.155.205/image-20220408084619553.png)

![image-20220408084718232](http://47.101.155.205/image-20220408084718232.png)

#### 对比两个项目的区别

![image-20220408085001058](http://47.101.155.205/image-20220408085001058.png)

![image-20220408085047627](http://47.101.155.205/image-20220408085047627.png)

### 5.9、标记文件夹

第一种方式

![image-20220408085504017](http://47.101.155.205/image-20220408085504017.png)

第二种方式

![image-20220408085711615](http://47.101.155.205/image-20220408085711615.png)



### 5.10、在idea中配置tomcat

![image-20220408085833907](http://47.101.155.205/image-20220408085833907.png)

![image-20220408090232380](http://47.101.155.205/image-20220408090232380.png)

![image-20220408090637771](http://47.101.155.205/image-20220408090637771.png)

![image-20220408090831491](http://47.101.155.205/image-20220408090831491.png)

### 5.11、pom.xml配置文件

![image-20220408091148465](http://47.101.155.205/image-20220408091148465.png)

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
	
    <!--gav项目名，组名，maven版本-->
    <groupId>com.javaweb.study</groupId>
    <artifactId>javaweb-maven-01</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <!--项目的打包方式，war包web项目使用的，jar包java应用-->
    <packaging>war</packaging>

    <name>javaweb-maven-01 Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <!--配置文件-->
    <properties>
        <!--项目的构建编码-->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!--编码版本-->
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <!--项目依赖-->
    <dependencies>
        <!--项目具体依赖的jar包-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>
        
    </dependencies>
	
    <!--构建项目使用的-->
    <build>
        <finalName>javaweb-maven-01</finalName>
        <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
            <plugins>
                <plugin>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.1.0</version>
                </plugin>
                <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
                <plugin>
                    <artifactId>maven-resources-plugin</artifactId>
                    <version>3.0.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.8.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>2.22.1</version>
                </plugin>
                <plugin>
                    <artifactId>maven-war-plugin</artifactId>
                    <version>3.2.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-install-plugin</artifactId>
                    <version>2.5.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <version>2.8.2</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>

~~~

![image-20220408091840554](http://47.101.155.205/image-20220408091840554.png)

maven由于他的约定大于配置，我们之后可以能遇到我们写的配置文件，无法被导出或者生效的问题，解决方案

#### maven导包的关系

![image-20220411171054375](http://47.101.155.205/image-20220411171054375.png)



#### pom配置文件

~~~xml
<!--在build中配置resources，来防止我们资源导出失败的问题-->
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>

~~~

### 5.12、idea查看导入jar包关系

![image-20220408092605489](http://47.101.155.205/image-20220408092605489.png)

### 5.13、解决idea的一些问题

**新建maven自己用idea的maven**

![image-20220408112023014](http://47.101.155.205/image-20220408112023014.png)

![image-20220408112056542](http://47.101.155.205/image-20220408112056542.png)

![image-20220408112141384](http://47.101.155.205/image-20220408112141384.png)

设置后的效果

![image-20220408112237716](http://47.101.155.205/image-20220408112237716.png)

 **maven默认web项目中的web.xml版本问题** 

可以从webapps下面的文件中去找web项目里的WEB-INF里面的web.xml文件，复制一份就好

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">
  <request-character-encoding>UTF-8</request-character-encoding>

</web-app>

~~~

### 5.14、使用maven仓库

仓库地址：https://mvnrepository.com/

![image-20220408115507456](http://47.101.155.205/image-20220408115507456.png)

![image-20220408115611257](http://47.101.155.205/image-20220408115611257.png)

![image-20220408115808577](http://47.101.155.205/image-20220408115808577.png)

![image-20220408120137835](http://47.101.155.205/image-20220408120137835.png)

![image-20220408120338675](http://47.101.155.205/image-20220408120338675.png)



## 6、Servlet

Servlet（Server Applet）是Java Servlet的简称，称为小服务程序或服务连接器，用Java编写的服务器端程序，具有独立于平台和协议的特性，主要功能在于交互式地浏览和生成数据，生成动态Web内容。

Servlet就是sun公司开发动态web的一门技术

Sun在这些API中提供一个接口叫做：Servlet，如果你想开发一个Servlet程序，只需要完成两个小

步骤：

编写一个类，实现Servlet接口

把开发好的Java类部署到web服务器中。

**把实现了Servlet接口的Java程序叫做，Servlet** 

狭义的Servlet是指Java语言实现的一个接口，广义的Servlet是指任何实现了这个Servlet接口的类

### 6.1、构建Maven

1.  构建一个普通的Maven项目，删掉里面的src目录，以后我们的学习就在这个项目里面建立Moudel；这个空的工程就是Maven主工程；

2. 父子Maven工程

![image-20220408180329687](http://47.101.155.205/image-20220408180329687.png)

![image-20220408180439109](http://47.101.155.205/image-20220408180439109.png)



### 6.2、使用Servlet

![image-20220408184622951](http://47.101.155.205/image-20220408184622951.png)

1. 编写一个普通类，继承javax.servlet.http.HttpServlet

~~~java
package com.study.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doGet");
        PrintWriter writer = resp.getWriter();
        writer.print("Hello Servlet");

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
~~~



2. 编写servlet映射

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
~~~

配置tomcat，启动服务器注意，在浏览器访问注意

![image-20220408185613228](http://47.101.155.205/image-20220408185613228.png)

### 6.3、Servlet原理

**Servlet对象是用户第一次访问时创建，对象创建之后就驻留在内存里面了，响应后续的请求。Servlet对象一旦被创建，init()方法就会被执行，客户端的每次请求导致service()方法被执行，Servlet对象被摧毁时(Web服务器停止后或者Web应用从服务器里删除时)，destory()方法就会被执行。** 

Servlet只有放在容器中才能执行

![image-20220408194928916](http://47.101.155.205/image-20220408194928916.png)



### 6.4、mapping映射

1. 一个servlet映射一个mapping

2. 一个servle映射多个mapping

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>可以不同</url-pattern>
</servlet-mapping>

~~~

3. 一个servlet指定通用路径,还可以和固定路径使用

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello/*</url-pattern>
</servlet-mapping>
~~~

4. 默认请求路径

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/*</url-pattern>
</servlet-mapping>
访问不到静态资源index.jsp
~~~

5. 指定访问一些后缀,/*.do

   和*不能是路径，会报错

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>*.do</url-pattern>
</servlet-mapping>
~~~

6. 优先级

~~~xml
<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.study.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet>
    <servlet-name>error</servlet-name>
    <servlet-class>com.study.servlet.ErrorTest</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>error</servlet-name>
    <url-pattern>/*</url-pattern>
</servlet-mapping>
~~~

**固定映射的优先级高于默认的请求,默认的请求高于静态资源的请求** 

如果不重写请求的方法，报错如下，并且自动重写也是这样的报错

![image-20220408210330291](http://47.101.155.205/image-20220408210330291.png)

### 6.5、ServletContext

![image-20220408211539296](http://47.101.155.205/image-20220408211539296.png)

![image-20220408211617432](http://47.101.155.205/image-20220408211617432.png)

![image-20220408211645186](http://47.101.155.205/image-20220408211645186.png)

web容器在启动的时候，它会为每个web程序都创建一个对应的ServletContext对象，它代表了当前的web应用；

#### 6.5.1、共享数据

~~~java
ServletContext context = this.getServletContext();
context.setAttribute(String k,Object v);
context.getAttribute(String k);
~~~



#### 6.5.2、获取初始化参数

![image-20220408223847793](http://47.101.155.205/image-20220408223847793.png)



#### 6.5.3、请求转发

![image-20220408224352740](http://47.101.155.205/image-20220408224352740.png)

#### 5.5.4、读取文件

![image-20220408230627061](http://47.101.155.205/image-20220408230627061.png)

![image-20220408230840359](http://47.101.155.205/image-20220408230840359.png)

### 6.6、HttpServletResponse

web服务器接收到客户端的http请求，针对这个请求，分别创建一个代表请求的HttpServletRequest对象，代表响应的一个HttpServletResponse；

- 如果要获取客户端请求过来的参数：找HttpServletRequest

- 如果要给客户端响应一些信息：找HttpServletResponse

#### 6.6.1、方法分类

负责向浏览器发送内容

~~~java
ServletOutputStream getOutputStream() throws IOException;
PrintWriter getWriter() throws IOException;
~~~



负责向浏览器发送响应头

~~~java
public void setCharacterEncoding(String var1);
public void setContentLength(int var1);
public void setContentLengthLong(long var1);
public void setContentType(String var1);
public void setDateHeader(String var1, long var2);
public void addDateHeader(String var1, long var2);
public void setHeader(String var1, String var2);
public void addHeader(String var1, String var2);
public void setIntHeader(String var1, int var2);
public void addIntHeader(String var1, int var2);
~~~



响应状态码



#### 6.6.2、下载文件

![image-20220409101601638](http://47.101.155.205/image-20220409101601638.png)

![image-20220409103059132](http://47.101.155.205/image-20220409103059132.png)

~~~html
Content-Disposition: attachment;filename="._Java åŸºç¡€æ ¸å¿ƒæ€»ç»“.pdf";
Content-Type: application/pdf;

~~~

![image-20220409120312817](http://47.101.155.205/image-20220409120312817.png)

#### 6.6.3、验证码

![image-20220409111713305](http://47.101.155.205/image-20220409111713305.png)

#### 6.6.4、重定向

![image-20220409134637383](http://47.101.155.205/image-20220409134637383.png)

![image-20220409135453309](http://47.101.155.205/image-20220409135453309.png)

登陆跳转需要用到重定向

**面试题：请你聊聊重定向和转发的区别？** 

相同点

页面都会实现跳转

不同点

- 请求转发的时候，url不会产生变化

- 重定向时候，url地址栏会发生变化；重定向接受了两次响应

![image-20220409142529976](http://47.101.155.205/image-20220409142529976.png)

![image-20220409142944720](http://47.101.155.205/image-20220409142944720.png)



### 6.7、HttpServletRequest

HttpServletRequest代表客户端的请求，用户通过Http协议访问服务器，HTTP请求中的所有信息会被封装到HttpServletRequest，通过这个HttpServletRequest的方法，获得客户端的所有信息；

![image-20220409153001428](http://47.101.155.205/image-20220409153001428.png)



## 7、Cookie和Session

Cookie，有时也用其复数形式 Cookies。类型为“小型文本文件”，是某些网站为了辨别用户身份，进行Session跟踪而储存在用户本地终端上的数据（通常经过加密），由用户客户端计算机暂时或永久保存的信息 。

Session对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的Web页之间跳转时，存储在Session对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。**注意会话状态仅在支持cookie的浏览器中保留。** 

两者都是保存会话的技术，Cookie储存在客户端，Session储存在服务端

### 7.1、Cookie

![image-20220409172241868](http://47.101.155.205/image-20220409172241868.png)

谷歌浏览器清除历史记录后，还是一样

一个现象，网站之前的cookie，在关闭网站的时候不会消失，自己添加的cookie会消失

删除Cookie，这里只能删除自己新建的Cookie

![image-20220409174535185](http://47.101.155.205/image-20220409174535185.png)

![image-20220409174940449](http://47.101.155.205/image-20220409174940449.png)

![image-20220409184443472](http://47.101.155.205/image-20220409184443472.png)

Cookie一般会保存在本地的用户目录下appdata

一个网站cookie是否存在上限！聊聊细节问题

- 一个Cookie只能保存一个信息；

- 一个web站点可以给浏览器发送多个cookie，最多存放20个cookie；

- Cookie大小有限制4kb；

- 300个cookie浏览器上限

删除Cookie

- 不设置有效期，关闭浏览器，自动失效；

- 设置有效期时间为 0 ；

![image-20220409183330538](http://47.101.155.205/image-20220409183330538.png)

![image-20220409184106493](http://47.101.155.205/image-20220409184106493.png)

![image-20220409181604206](http://47.101.155.205/image-20220409181604206.png)

进行了一些的Cookie测试，往浏览器上面添加了100个Cookie，Idea还是能显示的，再加100个之后就不显示了（并且会将之前加的Cookie删除），但是其他浏览器会显示，在将Coookie对象设置删除时间是0时，并将数据返回时，在小于等于400时，就出现上面的问题了。总结，不同浏览器，cookie的数量不同，resp写cookie的数量在300-400之间，resp写了300个cookie，req下次返回的时候没有300，resp.getWriter（）写了数据后，就算再加保留令牌的cookie也不会影响输出，但是tomcat日志会有提示

##### 7.1.1、编码解码

![image-20220409175607592](http://47.101.155.205/image-20220409175607592.png)

![image-20220409175627455](http://47.101.155.205/image-20220409175627455.png)



### 7.2、Session

- 当浏览器访问服务器时，会创建一个session，并且返回一个Cookie，确保session的唯一；

- 一个Seesion独占一个浏览器，只要浏览器没有关闭，这个Session就存在（可以设置session的存活时间）；

- 作用
  - 用户登录之后，整个网站它都可以访问！--> 保存用户的信息；保存购物车的信息				

![image-20220409211825091](http://47.101.155.205/image-20220409211825091.png)



**Session和cookie的区别：** 

- 服务器关闭session自动失效，cookie还可以使用，

- Cookie是把用户的数据写给用户的浏览器，浏览器保存 （可以保存多个）

- Session把用户的数据写到用户独占Session中，服务器端保存 （保存重要的信息，减少服务器资源的浪费）

- Session对象由服务创建；

- 当服务器给浏览器发送很多cookie时，会将带有sessionId的cookie挤掉，导致再次建立连接的时候还会再次创建session，并且session里面的东西还会失效。



![image-20220409214533045](http://47.101.155.205/image-20220409214533045.png)

## 8、JSP

### 8.1、什么是JSP

Java Server Pages java服务端页面，和Servlet一样，都是动态web的技术

JSP将Java代码和特定变动内容嵌入到静态的页面中，实现以静态页面为模板，动态生成其中的部分内容。

可以将动态的数据写入到html页面



### 8.2、JSP的原理

![image-20220409230651009](http://47.101.155.205/image-20220409230651009.png)

![image-20220409232100884](http://47.101.155.205/image-20220409232100884.png)

![image-20220409232751974](http://47.101.155.205/image-20220409232751974.png)

![image-20220409233313730](http://47.101.155.205/image-20220409233313730.png)![image-20220409233825795](http://47.101.155.205/image-20220409233825795.png)

### 8.3、JSP语法

#### 8.3.1、JSP表达式

![image-20220411145413411](http://47.101.155.205/image-20220411145413411.png)

<%=变量或者表达式>,作用是将里面的值输出到页面



#### 8.3.2、JSP脚本片段

![image-20220411150700736](http://47.101.155.205/image-20220411150700736.png)

![image-20220411151036171](http://47.101.155.205/image-20220411151036171.png)

#### 8.3.3、JSP声明

![image-20220411153002305](http://47.101.155.205/image-20220411153002305.png)





#### 8.3.4、JSP指令

![image-20220411152357329](http://47.101.155.205/image-20220411152357329.png)

![image-20220411154842746](http://47.101.155.205/image-20220411154842746.png)

### 8.4、JSP内置9大对象

| type                | field       |
| ------------------- | ----------- |
| PageContext         | pageContext |
| HttpSession         | session     |
| ServletContext      | application |
| ServletConfig       | config      |
| JspWriter           | out         |
| Object              | page        |
| HttpServletRequest  | request     |
| HttpServletResponse | response    |
| Throwable           | exception   |

exception在jsp页面被<%@ isErrorPage="true"%>时会出现

#### 8.4.1、导包

~~~xml
<!--导入这个包jsp内置对象可以之间.方法
	JSP
-->
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.2.1-b03</version>
</dependency>
<!--上面和下面的包作用一样-->
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>javax.servlet.jsp-api</artifactId>
    <version>2.3.1</version>
</dependency>
<!--和上面作用一样-->
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>javax.servlet.jsp-api</artifactId>
    <version>2.3.3</version>
    <scope>provided</scope>
</dependency>
~~~

![image-20220411175256186](http://47.101.155.205/image-20220411175256186.png)

### 8.5、JSP标签、JSTL标签、EL表达式

#### 8.5.1、JSP标签

![image-20220411175537875](http://47.101.155.205/image-20220411175537875.png)

~~~jsp
<jsp:forward page="jsp标签1.jsp">
    <jsp:param name="name" value="zs"/>
    <jsp:param name="addr" value="china"/>
</jsp:forward>
~~~



#### 8.5.2、JSTL标签

~~~xml
<!--使用JSTL标签、EL表达导入的包，使用EL表达式简单测试了下，没有导入这两个包也没有问题-->
<!--JSTL标签库-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>

<dependency>
    <groupId>taglibs</groupId>
    <artifactId>standard</artifactId>
    <version>1.1.2</version>
</dependency>
~~~

JSTL标签就是JSP标签库

使用任何库，你必须在每个 JSP 文件中的头部包含`<taglib>`标签。

核心标签

~~~xml
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
~~~

核心标签

![image-20220411200135815](http://47.101.155.205/image-20220411200135815.png)

![image-20220411200224599](http://47.101.155.205/image-20220411200224599.png)

![image-20220411200243259](http://47.101.155.205/image-20220411200243259.png)



![image-20220411200327097](http://47.101.155.205/image-20220411200327097.png)



![image-20220411200401402](http://47.101.155.205/image-20220411200401402.png)



#### 8.5.3、EL表达式（Expression Language）

在JSP中访问模型对象是通过EL表达式的语法来表达。所有EL表达式的格式都是以“${}”表示。例如，${ userinfo}代表获取变量userinfo的值。当EL表达式中的变量不给定范围时，则默认在page范围查找，然后依次在request、session、application范围查找。也可以用范围作为前缀表示属于哪个范围的变量，例如：${ pageScope. userinfo}表示访问page范围中的userinfo变量。 

获取数据

执行运算

获取常用的web对象



##9、JavaBean

java类

- 必须有无参构造
- 属性必须私有化
- 必须有set、get方法

一般用来和数据库的表结构做映射ORM

表——>类

字段——>属性

行记录——>对象



~~~jsp
<jsp:useBean id="p1" class="com.study.pojo.People" >
    <jsp:setProperty name="p1" property="id" value="1"></jsp:setProperty>
    <jsp:setProperty name="p1" property="name" value="zs"></jsp:setProperty>
    <jsp:setProperty name="p1" property="age" value="18"></jsp:setProperty>
</jsp:useBean>
${p1.name}<p></p>
${p1.age}<p>
    ${p1.id}
~~~

##10、MVC架构

### 10.1、早期架构

![image-20220412083619552](http://47.101.155.205/image-20220412083619552.png)

### 10.2、MVC三层架构

![image-20220412085846759](http://47.101.155.205/image-20220412085846759.png)

View

- 展示数据
- 提供用户操作的界面

Controller

- 接收请求（处理请求中携带的参数）
- 调用业务层处理数据
- 控制视图的跳转

Service

- 处理业务
- Dao，CRUD

## 11、Filter

​	![image-20220412090412455](http://47.101.155.205/image-20220412090412455.png)

实现javax.servlet.Filter接口，重写方法。

在web.xml中配置过滤器，和过滤的请求

~~~java
package com.study.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControlFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("ControlFilter过滤器初始化");
    }

    @Override
    public void destroy() {
        System.out.println("ControlFilter过滤器销毁");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
       request.setCharacterEncoding("utf-8");
       response.setCharacterEncoding("utf-8");
       response.setContentType("text/html;charset=UTF-8");
       System.out.println("执行doFilter之前");
       chain.doFilter(request,response);
       System.out.println("执行doFilter之后");
    }
}

~~~

~~~xml
<filter>
    <filter-name>encoding_filter</filter-name>
    <filter-class>com.study.filter.ControlFilter</filter-class>
</filter>
<filter-mapping>
	<filter-name>encoding_filter</filter-name>
    <url-pattern>/encoding/*</url-pattern>
</filter-mapping>
~~~







## 12、监听器

~~~java
public class SessionListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("session被创建");
        Object o = se.getSession().getServletContext().getAttribute(Constant.USER_SESSION);
        if (o == null){
            Integer count = new Integer(1);
            se.getSession().getServletContext().setAttribute(Constant.USER_SESSION,count);
        }else {
            Integer count = (Integer)se.getSession().getServletContext().getAttribute(Constant.USER_SESSION);
            count = count + 1;
            se.getSession().getServletContext().setAttribute(Constant.USER_SESSION,count);
        }
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("session被销毁");
        Object o = se.getSession().getServletContext().getAttribute(Constant.USER_SESSION);
        if (o == null){
            se.getSession().getServletContext().setAttribute(Constant.USER_SESSION,0);
        }else {
            Integer count = (Integer)se.getSession().getServletContext().getAttribute(Constant.USER_SESSION);
            count = count - 1;
            se.getSession().getServletContext().setAttribute(Constant.USER_SESSION,count);
        }
    }
}
~~~

~~~xml
<listener>
    <listener-class>com.study.listener.SessionListener</listener-class>
</listener>
~~~

## 13、过滤器和监听器常见应用

GUI中多使用监听器



过滤器可以过滤用户权限

没有登陆过的用户，没有权限访问这个页面，给他重定向返回至一个页面



## 14、JDBC复习





## 15、smbms

### 1、新建maven项目

#### 1.1、导入依赖

maven的pom.xml文件导入依赖，servlet、jsp、jstl、mysql驱动...依赖

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.study</groupId>
    <artifactId>smbms</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>smbms Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>

        <!--Servlet依赖,extends HttpServlets所需要的包-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
        </dependency>
        <!--JSP依赖-->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.1</version>
        </dependency>

        <!--jstl依赖-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>

        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>

        <!--加入sql依赖-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.23</version>
        </dependency>


    </dependencies>

    <build>
        <finalName>smbms</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
</project>
~~~



#### 1.2、修改web.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">

</web-app>
~~~



#### 1.3、创建项目包结构

![image-20220412142250311](http://47.101.155.205/image-20220412142250311.png)

![image-20220412142456627](http://47.101.155.205/image-20220412142456627.png)





#### 1.4、编写JavaBean类

![image-20220412151722538](http://47.101.155.205/image-20220412151722538.png)

#### 1.5、编写基础公共类

获取数据库连接

JDBC的util类

BaseDao

#### 1.6、导入jsp页面和静态资源

![image-20220412174145947](http://47.101.155.205/image-20220412174145947.png)

有预览，但是没有显示到页面上

#### 1.7、编写UserDao接口UserDao接口实现类

![image-20220412194944103](http://47.101.155.205/image-20220412194944103.png)



![image-20220412195001980](http://47.101.155.205/image-20220412195001980.png)



#### 1.8、编写UserService接口UserService接口实现类

![image-20220412195130974](http://47.101.155.205/image-20220412195130974.png)

![image-20220412195431977](http://47.101.155.205/image-20220412195431977.png)



#### 1.9、测试代码过程中遇到的问题

![image-20220412195716618](http://47.101.155.205/image-20220412195716618.png)



#### 1.10、实现登陆验证

![image-20220412210258975](http://47.101.155.205/image-20220412210258975.png)

#### 1.11、实现注销

![image-20220412210338403](http://47.101.155.205/image-20220412210338403.png)

#### 1.12、实现权限过滤

![image-20220413092848258](http://47.101.155.205/image-20220413092848258.png)

![image-20220413092902484](http://47.101.155.205/image-20220413092902484.png)

### 2、实现密码修改

#### 2.1、AJAX请求验证旧密码

~~~javascript
oldpassword.on("blur",function(){
    $.ajax({
        type:"GET",
        url:path+"/jsp/user.do",
        data:{method:"pwdmodify",oldpassword:oldpassword.val()},
        dataType:"json",
        success:function(data){
            if(data.result == "true"){//旧密码正确
                validateTip(oldpassword.next(),{"color":"green"},imgYes,true);
            }else if(data.result == "false"){//旧密码输入不正确
                validateTip(oldpassword.next(),{"color":"red"},imgNo + " 原密码输入不正确",false);
            }else if(data.result == "sessionerror"){//当前用户session过期，请重新登录
                validateTip(oldpassword.next(),{"color":"red"},imgNo + " 当前用户session过期，请重新登录",false);
            }else if(data.result == "error"){//旧密码输入为空
                validateTip(oldpassword.next(),{"color":"red"},imgNo + " 请输入旧密码",false);
            }
        },
        error:function(data){
            //请求出错
            validateTip(oldpassword.next(),{"color":"red"},imgNo + " 请求错误",false);
        }
    });
~~~

~~~java
public void pwdModify(HttpServletRequest req, HttpServletResponse resp){
    System.out.println("进入pwdModify方法");
    String oldPassword = req.getParameter("oldpassword");
    HttpSession session = req.getSession();
    User u = (User) session.getAttribute(Constants.USER_SESSION);
    Map<String,String> map = new HashMap<String,String>();

    if (u == null){
        map.put("result","sessionerror");
    } else {
        if (oldPassword == null){
            map.put("result","error");
        }else {
            if (oldPassword.equals(u.getUserPassword())){
                map.put("result","true");
            } else {
                map.put("result","false");
            }
        }
    }

    String value = map.get("result");
    StringBuffer str = new StringBuffer();
    str.append("{");
    str.append("\"result\":");
    str.append('"' + value + '"' +"}");
    System.out.println(str.toString());
    resp.setContentType("application/json");

    ObjectMapper mapper = new ObjectMapper();
    try {
        mapper.writeValue(resp.getWriter(),map);
    } catch (IOException e) {
        e.printStackTrace();
    }


}
~~~



#### 2.2、实现新密码保存

##### 2.2.1、编写Dao接口方法

编写Dao接口方法实现新密码保存

~~~java
public int updatePwdById(Connection connection,int id,String newPwd) throws SQLException;
~~~

##### 2.2.2、实现Dao接口方法

~~~java
@Override
public int updatePwdById(Connection connection, int id, String newPwd) throws SQLException {
    int count = 0;
    String sql = "update smbms_user set userPassword = ? where id = ?";
    Object[] args = {newPwd,id};
    count = BaseDao.execute(connection,null,sql,args);
    return count;
}
~~~

##### 2.2.3、编写service接口方法

写service方法，确定密码是否被修改成功

~~~java
public boolean updatePwd(int id,String newPwd);
~~~

##### 2.2.4、实现service接口方法

~~~java
@Override
public boolean updatePwd(int id, String newPwd) {
    Boolean flag = false;
    Connection connection = BaseDao.getConnection();
    int count = 0;
    try {
        connection.setAutoCommit(false);
        count = userDao.updatePwdById(connection,id,newPwd);
        if (count > 0){
            connection.commit();
            flag = true;
        }
    } catch (SQLException e) {
        flag = false;
        try {
            connection.rollback();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        e.printStackTrace();
    }

    return flag;
}
~~~

##### 2.2.5、servlet层处理请求

~~~java
public void savePwd(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
    HttpSession session = req.getSession();
    User user = (User) session.getAttribute(Constants.USER_SESSION);
    if (user == null){
        resp.sendRedirect("error.jsp");
    } else {
        UserService userService = new UserServiceImp();
        String newPwd = req.getParameter("newpassword");
        System.out.println("修改的新密码 --->"+newPwd);
        int id = user.getId();
        Boolean flag = userService.updatePwd(id,newPwd);
        if (flag){
            session.removeAttribute(Constants.USER_SESSION);
            req.setAttribute("message","密码修改成功，请退出，使用新密码登陆");
        }else {
            req.setAttribute("message","修改密码失败，请稍后再试");
        }
        //req.getRequestDispatcher("pwdmodify.jsp").forward(req,resp);
        req.getRequestDispatcher( "/jsp/pwdmodify.jsp").forward(req,resp);
    }
}
~~~

注册servlet

~~~xml
<servlet>
    <servlet-name>userServlet</servlet-name>
    <servlet-class>com.study.servlet.user.UserServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>userServlet</servlet-name>
    <url-pattern>/jsp/user.do</url-pattern>
</servlet-mapping>
~~~



##### 2.2.6、注意请求转发和重定向的区别

![image-20220413115036692](http://47.101.155.205/image-20220413115036692.png)

![image-20220413120921619](http://47.101.155.205/image-20220413120921619.png)

~~~jsp
<%
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
%>
~~~



### 3、用户管理层

#### 3.1、分析需求

![image-20220413132840471](http://47.101.155.205/image-20220413132840471.png)

这个页面需要两张表的数据，Role表的用户角色，以及User表的中的部分数据，再加上表Role的roleName

#### 3.2、编写RoleDao接口及实现类

```java
public List<Role> getAllRole(Connection connection) throws SQLException;
```

~~~java
@Override
public List<Role> getAllRole(Connection connection) throws SQLException {
    List<Role> roleList = new ArrayList<Role>();
    String sql = "select * from smbms_role";
    ResultSet rs = BaseDao.execute(connection,null,sql,null,null);
    while (rs.next()){
        Role role = new Role();
        role.setId(rs.getInt("id"));
        role.setRoleCode(rs.getString("roleCode"));
        role.setRoleName(rs.getString("roleName"));
        role.setCreatedBy(rs.getInt("createdBy"));
        role.setCreationDate(rs.getDate("creationDate"));
        role.setModifyBy(rs.getInt("modifyBy"));
        role.setModifyDate(rs.getDate("modifyDate"));
        roleList.add(role);
    }
    return roleList;
}
~~~

#### 3.3、编写UserDao接口方法

需要两个方法，Servlet调用业务层service和dao进行数据交互

1、是查询当前页面的总数（加了name模糊查询，以及roleId的条件）

2、查询用户集合包含的参数（支持分页，name模糊查询，以及roleID的条件查询）

~~~java
public List<User> getUserByNameOrRoleId(Connection connection,int roleId,String name,int pageNo,int pageSize) throws SQLException;

public int getCountByNameOrRoleId(Connection connection,int roleId,String name) throws SQLException;
~~~





#### 3.4、实现UserDao接口方法

~~~java
public List<User> getUserBuNameOrRoleId(String name,int roleId,int currentPage,int pageSize){
    List<User> list = null;
    Connection connection = BaseDao.getConnection();
    try {
        list = userDao.getUserByNameOrRoleId(connection,roleId,name,currentPage,pageSize);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        BaseDao.close(connection,null,null);
    }

    return list;
}

public int getCountByNameOrRoleId(String name,int roleId){
    int count = 0;
    Connection connection = BaseDao.getConnection();

    try {
        count = userDao.getCountByNameOrRoleId(connection,roleId,name);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        BaseDao.close(connection,null,null);
    }

    return count;
}
~~~

#### 3.5、编写service接口方法

1、获取roleList的方法、获取userList的方法、湖区userCount的方法

~~~java
public List<Role> getAllRole();

public int getCountByNameOrRoleId(String name,int roleId);

public List<User> getUserBuNameOrRoleId(String name,int roleId,int currentPage,int pageSize);
~~~

#### 3.6、实现service接口方法

引入RoleDao处理Role类的数据交互

~~~java
public List<Role> getAllRole(){
    List<Role> list = null;
    Connection connection = BaseDao.getConnection();
    try {
        list = roleDao.getAllRole(connection);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        BaseDao.close(connection,null,null);
    }

    return list;
}

public int getCountByNameOrRoleId(String name,int roleId){
    int count = 0;
    Connection connection = BaseDao.getConnection();

    try {
        count = userDao.getCountByNameOrRoleId(connection,roleId,name);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        BaseDao.close(connection,null,null);
    }

    return count;
}

public List<User> getUserBuNameOrRoleId(String name,int roleId,int currentPage,int pageSize){
    List<User> list = null;
    Connection connection = BaseDao.getConnection();
    try {
        list = userDao.getUserByNameOrRoleId(connection,roleId,name,currentPage,pageSize);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        BaseDao.close(connection,null,null);
    }

    return list;
}
~~~



#### 3.7、处理/jsp/user.do?method=query

取参数，第一次默认情况处理，页面大小、当前页、roleID、userName处理...

roleId默认是0，userName就是接受的参数，默认是null，页面大小设置为5，当前页默认是1

~~~java
private void query(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

    String queryName = req.getParameter("queryname");//userName参数模糊查询
    String queryUserRole = req.getParameter("queryUserRole");//用户角色参数
    String pageIndexString = req.getParameter("pageIndex");//当前是第几页
    String totalCountString = req.getParameter("totalCount");//没有用到
    String currentPageString = req.getParameter("currentPageNo");//没有用到
    String totalPageCountString = req.getParameter("totalPageCount");//没有用到

    System.out.println("queryName----------------->"+queryName);
    System.out.println("queryUserRole------------->"+queryUserRole);
    System.out.println("pageIndexString----------->"+pageIndexString);
    System.out.println("totalCountString---------->"+totalCountString);
    System.out.println("currentPageString--------->"+currentPageString);
    System.out.println("totalPageCountString------>"+totalPageCountString);

    int roleId = 0;
    int pageIndex = 1;
    int currentPage = 1;

    int totalPageCount = 1;

    if (queryUserRole != null && queryUserRole.length()!=0){
        roleId = Integer.parseInt(queryUserRole);
    }
    if (pageIndexString != null && pageIndexString.length()!=0){
        pageIndex = Integer.parseInt(pageIndexString);
    }
    if (currentPageString !=null &&currentPageString.length()!=0){
        currentPage = Integer.parseInt(currentPageString);
    }
    if (totalPageCountString!=null && totalCountString.length()!=0){
        totalPageCount = Integer.parseInt(totalPageCountString);
    }
    UserService userService = new UserServiceImp();

    //获取页面总数
    int totalCount = userService.getCountByNameOrRoleId(queryName,roleId);

    //固定设置当前页面大小
    int pageSize = 5;

    //通过总数和当前页面数量，初略计算页面总数
    totalPageCount = (totalCount/pageSize) + 1;

    //查询Role集合
    List<Role> roleList = userService.getAllRole();

    //查询当前页面展示数量
    List<User> userList = userService.getUserBuNameOrRoleId(queryName,roleId,pageIndex,pageSize);

    req.setAttribute("roleList",roleList);
    req.setAttribute("userList",userList);
    req.setAttribute("totalCount",totalCount);
    req.setAttribute("currentPageNo",pageIndex);
    req.setAttribute("totalPageCount",totalPageCount);

    req.setAttribute("queryUserRole",roleId);
    req.setAttribute("queryUserName",queryName);
    req.getRequestDispatcher("/jsp/userlist.jsp").forward(req,resp);

}
~~~

#### 3.8、jsp源码分析

![image-20220413155704328](http://47.101.155.205/image-20220413155704328.png)













## 16、文件上传

### 1、准备工作

组件下载

~~~
https://mvnrepository.com/artifact/commons-io/commons-io
https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload
~~~



~~~xml
<!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.11.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
~~~

### 2、使用类介绍

**文件上传注意事项** 

1. 为保证服务器安全，上传的文件应该放到外界无法访问的目录下，比如WEB-INF下
2. 为了防止文件被覆盖的现象发生，要为上传文件产生一个唯一的文件名
3. 要限制上传文件的最大值
4. 可以限制上传文件的类型，收到上传文件名时，判断后缀是否合法



ServletFileUpload负责处理上传的文件数据，并将表单中每个输入项都封装成一个FileItem对象，在使用ServletFileUpload对象解析时需要DiskFileItemFactory对象。需要先在解析之前创建好DiskFileItemFactory对象，

~~~java
ServletFileUpload.isMultipartContent(request);//判断是否时multipart/form-data类型

~~~





表单一定要设置enctype="multipart/form-data"，并且提交方式为post

~~~jsp
<form action="/upload.do" method="post" enctype="multipart/form-data">
    <input type="text" name="user">
    <input type="file" name="uploadFile1">
    <input type="file" name="uploadFile2">
</form>
~~~

浏览器表单类型为"multipart/form-data"，在服务端想获取数据就要通过流

### 3、上传文件过程

就是要获取浏览器表单中传递文件的流，名字，存储在哪个位置

![image-20220413224412595](http://47.101.155.205/image-20220413224412595.png)







![image-20220413224426242](http://47.101.155.205/image-20220413224426242.png)



这里的判断是为了没选文件上传会导致异常

~~~java
package com.study;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.List;
import java.util.UUID;

public class UploadFileServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws ServletException, IOException {
        if (!ServletFileUpload.isMultipartContent(request)){
            System.out.println("不是普通的表单");
        }

        String realPath = this.getServletContext().getRealPath("/WEB-INF/upload");
        System.out.println(realPath);
        File uploadFile = new File("realPath");
        System.out.println(uploadFile.exists());

        if (!uploadFile.exists()){
            //不存在创建文件
            uploadFile.mkdir();
            System.out.println("文件创建1");
        }

        //1
        DiskFileItemFactory factory = new DiskFileItemFactory();

        factory.setSizeThreshold(1024 * 1024);//设置缓存区大小
        //factory.setRepository();

        //2
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setProgressListener(new ProgressListener() {
            @Override
            public void update(long l, long l1, int i) {
                System.out.println("总大小：" + l1 + "已上传：" + l);
            }
        });

        //3
        String msg = "";
        try {
            msg = uploadParseRequest(upload,request,realPath);

        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        request.setAttribute("msg",msg);
        request.getRequestDispatcher("info.jsp").forward(request,response);
    }

    protected void doGet(HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws ServletException, IOException {

    }

    public static String uploadParseRequest(ServletFileUpload upload,HttpServletRequest request,String uploadPath) throws FileUploadException, IOException {
        String msg = "";

        List<FileItem> fileItems = upload.parseRequest(request);
        for (FileItem fileItem : fileItems){

            if (fileItem.isFormField()){
                //不是文件
                String name = fileItem.getFieldName();
                String value = fileItem.getString("UTF-8");
                System.out.println(name+":"+value);
            }else {

                String uploadFileName = fileItem.getName();
                System.out.println("上传的文件名" + uploadFileName);
                if (uploadFileName.trim().equals("") || uploadFileName==null){
                    continue;
                }
                String fileName = uploadFileName.substring(uploadFileName.lastIndexOf("/")+1);
                String fileExtName = uploadFileName.substring(uploadFileName.lastIndexOf(".")+1);
                System.out.println(fileExtName + "============" + fileExtName);
                String uuidPath = UUID.randomUUID().toString();
                String path = uploadPath + "/" + uuidPath;
                File file = new File(path);
                if (!file.exists()){
                    file.mkdirs();
                    System.out.println(path);
                    System.out.println("唯一文件文件创建");
                }
                InputStream inputStream = fileItem.getInputStream();
                FileOutputStream fos = new FileOutputStream(path+ "\\" + uploadFileName);

                byte[] buffer = new byte[1024 * 1024];
                int len = 0;
                while ((len = inputStream.read(buffer)) != -1){
                    fos.write(buffer,0,len);
                }
                fos.close();
                fos.flush();
                inputStream.close();

                fileItem.delete();

            }
        }
        msg = "文件上传成功";

        return msg;
    }
}

~~~



## 17、邮件发送

### 1、导包

~~~xml
<!-- https://mvnrepository.com/artifact/javax.mail/mail -->
<dependency>
    <groupId>javax.mail</groupId>
    <artifactId>mail</artifactId>
    <version>1.4.7</version>
</dependency>

<!-- https://mvnrepository.com/artifact/javax.activation/activation -->
<dependency>
    <groupId>javax.activation</groupId>
    <artifactId>activation</artifactId>
    <version>1.1.1</version>
</dependency>

~~~





~~~java
public class SendMail {
    public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        InputStream is = null;
        try {
            is = new FileInputStream("D:\\E\\Day33\\uploadFile\\src\\email.properties");
            prop.load(is);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //qq邮箱需要加这个
        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        prop.put("mail.smtp.ssl.enable","true");
        prop.put("mail.smtp.ssl.socketFactory",sf);

        //1创建发送邮箱所需要的Session
        Session session = Session.getDefaultInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {

                //return new PasswordAuthentication("邮箱号","授权码");
                return new PasswordAuthentication("1164864987@qq.com","rksrwgslgcnjicca");
            }
        });
        //开启session的debug模式
        session.setDebug(true);

        //2通过session得到transport对象
        Transport transport = session.getTransport();

        //3使用邮箱的用户名和授权码连接上服务器
        //transport.connect("smtp.qq.com","邮箱号","授权码");
        transport.connect("smtp.qq.com","1164864987@qq.com","rksrwgslgcnjicca");

        //4创建邮件
        MimeMessage message = new MimeMessage(session);

        //message.setFrom(new InternetAddress("发件人地址"));
        message.setFrom(new InternetAddress("1164864987@qq.com"));
        InternetAddress[] addresses = {new InternetAddress("1740067083@qq.com"),new InternetAddress("2057664965@qq.com")};
        message.setRecipients(Message.RecipientType.TO,addresses);

        //message设置消息
        message.setSubject("Hello","charset=UTF-8");

        message.setContent("<h1 style=\"color: red\">您好啊，臻祥</h1>","text/html;charset=UTF-8");

        //发送邮件
        transport.sendMessage(message,message.getAllRecipients());


        transport.close();
    }
}
~~~



## 18、跨域

http://localhost:8080/test

http：协议

localhost：域名

8080：端口号

当在浏览器页面是上面这个url时，如果发送的ajax请求中协议、域名、端口发送了改变，就是跨域了。这是浏览器自带的一个同源策略为了浏览器的安全考虑。解决跨域有多种方式。可以通过nginx反向代理，或者前端通过JSONP发送请求，或者在Spring中配置CORS（cross origin resource sharing）来解决。



![image-20220920221112725](http://47.101.155.205/image-20220920221112725.png)



还可以使用nginx反向代理解决跨域问题，

