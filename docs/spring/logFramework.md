# 日志框架

SLF4J：https://www.slf4j.org/

Log4J 2：https://logging.apache.org/log4j/2.x/

Logback：https://logback.qos.ch/



## SLF4J

SLF4J(Simple Logging Facade for Java)是各种日志记录框架(`java.util.logging`、`logback`、`log4j`)简单抽象，允许在运行时部署所需要的日志框架。



![image-20250414140118561](http://47.101.155.205/image-20250414140118561.png)



**添加SLF4J抽象maven配置：**

~~~xml
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.17</version>
</dependency>

~~~



~~~java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {

    public static void main(String[] args) {
        Logger log = LoggerFactory.getLogger(HelloWorld.class);
        log.info("HelloWorld");
    }
}

~~~

没有实现SLF4J的实现被绑定，`log.info()`没有任何操作(no-operation)：

~~~md
SLF4J(W): No SLF4J providers were found.
SLF4J(W): Defaulting to no-operation (NOP) logger implementation
SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.

~~~



HelloWorld：

~~~java
public class HelloWorld {

    public static void main(String[] args) {
        Logger log = LoggerFactory.getLogger(HelloWorld.class);
        log.info("HelloWorld");

        log.atInfo().log("HelloWorld");

        log.info("HelloWorld {}", "04/14");
        log.atInfo().setMessage("HelloWorld {}").addArgument("04/14").log();
        log.atInfo().setMessage("HelloWorld {}").addArgument(() -> "04/14").log();


        log.info("yesterday={} today={} HelloWorld", "04/13", "04/14");
        log.atInfo().setMessage("HelloWorld").addKeyValue("yesterday", "04/13").addKeyValue("today", "04/14").log();
    }
}

~~~



### Fluent记录API

`Logger`的`atTrace()`、`atDebug()`、`atInfo()`、`atWarn()`及`atError()`方法创建`LoggingEventBuilder`对象。`LoggingEventBuilder`对象不执行操作，通过调用器`log()`方法记录日志。



~~~java
log.info("HelloWorld");
// 两者等价
log.atInfo().log("HelloWorld");

~~~



**占位替换：**

~~~java
log.info("HelloWorld {}", "04/14");
// 两者等价
log.atInfo().setMessage("HelloWorld {}").addArgument("04/14").log();
// 使用 Supplier 函数式接口
log.atInfo().setMessage("HelloWorld {}").addArgument(() -> "04/14").log();

~~~



~~~java
log.info("yesterday={} today={} HelloWorld", "04/13", "04/14");

log.atInfo().setMessage("HelloWorld").addKeyValue("yesterday", "04/13").addKeyValue("today", "04/14").log();

~~~





### slf4j-simple实现



**添加Maven配置：**

~~~xml
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-simple -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.17</version>
</dependency>

~~~

**输出效果：**

![image-20250414130357270](http://47.101.155.205/image-20250414130357270.png)





### slf4j-reload4j

~~~xml
<dependency> 
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-reload4j</artifactId>
  <version>2.0.17</version>
</dependency>

~~~



执行提示如下：

~~~md
log4j:WARN No appenders could be found for logger (com.oycm.logger.slf4j.HelloWorld).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.

~~~

**需要配置文件才能生效：**

log4j.properties

~~~properties
# 设置根日志级别为 INFO，输出到控制台
log4j.rootLogger=INFO, stdout

# 配置控制台输出
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

# 可选：单独设置某个包的日志级别（例如调试时）
log4j.logger.com.oycm.logger.slf4j=DEBUG

~~~



### slf4j-log4j12

~~~xml
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>2.0.17</version>
    <type>pom</type>
</dependency>

~~~

从`SLF4J 1.7.35`开始，`slf4j-log4j`模块被重定向到`slf4j-reload4j`模块。

**控制台输出：**


~~~md
SLF4J(W): No SLF4J providers were found.
SLF4J(W): Defaulting to no-operation (NOP) logger implementation
SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.

~~~

**有添加reload4j依赖，但是没有slf4j-reload4j依赖。**



依赖修改为：去掉`type`。

~~~xml
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>2.0.17</version>
</dependency>

~~~

效果和slf4j-reload4j一致。



### logback

~~~xml
<dependency> 
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.3.14</version>
</dependency>

~~~

**注意**：JavaEE使用较高的版本`1.5.15`，会启动失败。



Fluent API的`addKeyValue`记录日志和`slf4j-simple`不同。

![image-20250414140756585](http://47.101.155.205/image-20250414140756585.png)



### 实现提供者冲突提示

![image-20250415155502580](http://47.101.155.205/image-20250415155502580.png)



### 桥接

https://www.slf4j.org/legacy.html

![image-20250415161648395](http://47.101.155.205/image-20250415161648395.png)

jcl-over-slf4j

slf4j-jcl

log4j-over-slf4j

jul-to-slf4j





## JCL

JCL：https://commons.apache.org/proper/commons-logging/

介绍：https://commons.apache.org/proper/commons-logging/guide.html

JCL(Jakarta Commons Logging)(Apache Commons Logging)，与SLF4J一样，这个是抽象层，允许应用程序开发人员插入特定的日志记录实现。

常用的实现有：Log4j，SLF4J和java.util.logging。



~~~xml
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>

~~~



~~~java
public class JclHelloWorld {

    public static void main(String[] args) {

        Log log = LogFactory.getLog(JclHelloWorld.class);

        log.info("JCL HelloWorld");
        log.info("JCL HelloWorld");
    }
}

~~~





### log4j

依赖：

~~~xml
<dependency>
	<groupId>org.apache.logging.log4j</groupId>
	<artifactId>log4j-jcl</artifactId>
	<version>2.20.0</version>
</dependency>
<dependency>
	<groupId>org.apache.logging.log4j</groupId>
	<artifactId>log4j-core</artifactId>
	<version>2.20.0</version>
</dependency>

~~~

log4j2.xml配置：

~~~xml
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="INFO">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>

~~~



### logback

~~~xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>2.0.17</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.3.14</version>
</dependency>

~~~



## spring-boot-starter-logging

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
    <version>2.2.7.RELEASE</version>
    <scope>compile</scope>
</dependency>

~~~

`spring-boot-starter-logging`使用SLF4J为抽象层，Logback作为实现。

![image-20250415171916969](http://47.101.155.205/image-20250415171916969.png)



~~~xml
<!-- SLF4J的logback实现 -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
    <scope>compile</scope>
</dependency>
<!-- Log4j2 API 调用桥接到 SLF4J -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.12.1</version>
    <scope>compile</scope>
</dependency>
<!-- JUL API 调用桥接到 SLF4J -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jul-to-slf4j</artifactId>
    <version>1.7.30</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jcl</artifactId>
    <version>5.2.6.RELEASE</version>
    <scope>compile</scope>
</dependency>

~~~



`spring-jcl`提供对Jcl API支持，底层根据存在的class判断使用哪个日志框架来封装成Jcl API。

![image-20250415192452244](http://47.101.155.205/image-20250415192452244.png)



## spring-boot-starter-log4j2

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
    <version>2.2.7.RELEASE</version>
    <scope>compile</scope>
</dependency>

~~~

spring-boot-starter-log4j2 使用slf4j为抽象，log4j2作为实现。

![image-20250415195038776](http://47.101.155.205/image-20250415195038776.png)

~~~xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>2.12.1</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.12.1</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-jul</artifactId>
    <version>2.12.1</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jul-to-slf4j</artifactId>
    <version>1.7.30</version>
    <scope>compile</scope>
</dependency>

~~~





## SLF4J迁移工具

https://www.slf4j.org/migrator.html

jar包下载地址：https://repo1.maven.org/maven2/org/slf4j/slf4j-migrator/

~~~bash
java -jar slf4j-migrator-2.0.16.jar

~~~

![image-20250415124547707](http://47.101.155.205/image-20250415124547707.png)





## MDC

MDC(Mapped Diagnostic Context)使用应用程序提供的键值对，供日志框架将其插入到日志消息中。

SFL4J支持MDC。如果底层日志框架支持MDC功能，那么SLF4J则委托给底层框架。log4j和logback提供MDC功能。java.util.logging没有提供该功能。

Logback MDC：https://logback.qos.ch/manual/mdc.html



### 简单使用MDC

~~~java
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.joran.spi.JoranException;
import ch.qos.logback.core.util.Loader;
import ch.qos.logback.core.util.StatusPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

import java.net.URL;

public class SimpleMDC {

    static public void main(String[] args) throws Exception {

        // logback.xml文件会自动加载
        MDC.put("key", "MDC");

        Logger logger = LoggerFactory.getLogger(SimpleMDC.class);

        MDC.put("timestamp", String.valueOf(System.currentTimeMillis()));
        logger.info("Hello World");

        MDC.put("key", "nextMDC");
        MDC.put("timestamp", String.valueOf(System.currentTimeMillis()));

        logger.info("next Hello World!");
    }

    /**
     * 配置 xml
     */
    private static void configureViaXML_File() {
        LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
        try {
            JoranConfigurator configurator = new JoranConfigurator();
            configurator.setContext(lc);
            lc.reset();
            URL url = Loader.getResourceBySelfClassLoader("logback.xml");
            configurator.doConfigure(url);
        } catch (JoranException je) {
            StatusPrinter.print(lc);
        }
    }

    /**
     * 代码配置日志格式
     */
    private static void programmaticConfiguration() {
        // 代码配置
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.reset();
        PatternLayoutEncoder layout = new PatternLayoutEncoder();
        layout.setContext(loggerContext);
        layout.setPattern("%X{key} %X{timestamp} [%t] - %m%n");
        layout.start();

        ConsoleAppender<ILoggingEvent> appender = new ConsoleAppender<ILoggingEvent>();
        appender.setContext(loggerContext);
        appender.setEncoder(layout);
        appender.start();
        // 强制转换成 Logger，添加追加器
        ch.qos.logback.classic.Logger root = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger("root");
        root.addAppender(appender);
    }

}

~~~

logback.xml配置：

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <Pattern>%X{key} %X{timestamp} [%t] - %m%n</Pattern>
        </layout>
    </appender>

    <root level="info">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>

~~~



### 高级使用MDC

RMI中，Server端使用MDC

~~~xml
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface NumberCruncher extends Remote {
    int[] factor(int number) throws RemoteException;
}

~~~

~~~java
public class NumberCruncherServer extends UnicastRemoteObject
        implements NumberCruncher {

    private static final long serialVersionUID = 1L;

    static Logger logger = LoggerFactory.getLogger(NumberCruncherServer.class);

    public NumberCruncherServer() throws RemoteException {
    }

    public int[] factor(int number) throws RemoteException {
        // MDC 设置client 主机
        try {
            MDC.put("client", NumberCruncherServer.getClientHost());
        } catch (java.rmi.server.ServerNotActiveException e) {
            logger.warn("Caught unexpected ServerNotActiveException.", e);
        }

        // 请求参数
        MDC.put("number", String.valueOf(number));

        logger.info("开始计算因数");

        if (number <= 0) {
            throw new IllegalArgumentException(number + "不能是负数");
        } else if (number == 1) {
            return new int[]{1};
        }

        List<Integer> list = new ArrayList<>();
        int n = number;

        for (int i = 2; i <= n; i++) {

            if ((n % i) == 0) {
                logger.info("找到因数r " + i);
                list.add(i);
            }

            // sleep 100 ms
            delay(100);
        }

        int[] result = new int[list.size()];

        for (int i = 0; i < result.length; i++) {
            result[i] = list.get(i);
        }

        // clean up
        MDC.remove("client");
        MDC.remove("number");

        return result;
    }



    public static void delay(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
        }
    }

    public static void main(String[] args) {

        NumberCruncherServer ncs;

        // 设置logback.xml

        try {
            ncs = new NumberCruncherServer();
            logger.info("Creating registry.");

            Registry registry = LocateRegistry.createRegistry(Registry.REGISTRY_PORT);
            registry.rebind("Factor", ncs);
            logger.info("NumberCruncherServer bound and ready.");
        } catch (Exception e) {
            logger.error("Could not bind NumberCruncherServer.", e);

        }
    }
}

~~~

logback.xml配置：

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <Pattern>%d{yyyy-MM-dd HH:mm:ss} [%X{client},%X{number}] [%t] [%-5level] - %m%n</Pattern>
        </layout>
    </appender>

    <root level="debug">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>

~~~



客户端：

~~~java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.rmi.Naming;
import java.rmi.RemoteException;

public class NumberCruncherClient {

    // args[0] = localhost
    public static void main(String[] args) {

        String host;
        if (args.length == 1) {
            host = args[0];
        } else {
            host = "localhost";
        }

        try {
            String url = "rmi://" + host + "/Factor";
            NumberCruncher nc = (NumberCruncher) Naming.lookup(url);
            loop(nc);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void loop(NumberCruncher nc) {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        int i = 0;

        while (true) {
            System.out.print("输入要计算因数的数, '-1'表示退出: ");

            try {
                i = Integer.parseInt(in.readLine());
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (i == -1) {
                System.out.print("退出循环");
                // 退出
                return;
            } else {
                try {
                    System.out.println("要计算的数" + i);

                    int[] factors = nc.factor(i);
                    System.out.print(i + "的因数有: ");

                    for (int k = 0; k < factors.length; k++) {
                        System.out.print(" " + factors[k]);
                    }

                    System.out.println(".");
                } catch (RemoteException e) {
                    System.err.println("不能计算因数" + i);
                    e.printStackTrace();
                }
            }
        }
    }
}

~~~



### Web过滤器使用MDC

~~~java
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;

public class UserServletFilter implements Filter {

    private final String USER_KEY = "username";

    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        boolean successfulRegistration = false;

        HttpServletRequest req = (HttpServletRequest) request;
        // 获取已验证用户名称
        Principal principal = req.getUserPrincipal();

        if (principal != null) {
            String username = principal.getName();
            // 将 username 注册到MDC中
            successfulRegistration = registerUsername(username);
        }

        try {
            chain.doFilter(request, response);
        } finally {
            // 释放MDC
            if (successfulRegistration) {
                MDC.remove(USER_KEY);
            }
        }
    }

    public void init(FilterConfig arg0) throws ServletException {
    }

    private boolean registerUsername(String username) {
        if (username != null && username.trim().length() > 0) {
            MDC.put(USER_KEY, username);
            return true;
        }
        return false;
    }
}

~~~



### 多线程使用MDC



在主线程调用线程任务之前先调用`MDC.getCopyOfContextMap()`；任务执行时将主线程的拷贝设置到当前线程`MDC.setContextMap()`，进行关联。



### MDCInsertingServletFilter

![image-20250416095222115](http://47.101.155.205/image-20250416095222115.png)



### logback实现原理

MDCAdapter抽象，`ch.qos.logback.classic.util.LogbackMDCAdapter`实现。

维护了两个`ThreadLocal`，通过线程缓存实现了MDC基本功能，put和get。

![image-20250416111057016](http://47.101.155.205/image-20250416111057016.png)

![image-20250416111535552](http://47.101.155.205/image-20250416111535552.png)