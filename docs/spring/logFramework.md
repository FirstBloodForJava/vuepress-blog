# 日志框架

SLF4J：https://www.slf4j.org/

Log4J 2：https://logging.apache.org/log4j/2.x/

Logback：https://logback.qos.ch/

Logback MDC：https://logback.qos.ch/manual/mdc.html



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

![image-20250415171916969](http://47.101.155.205/image-20250415171916969.png)



~~~xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.12.1</version>
    <scope>compile</scope>
</dependency>

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





## SLF4J迁移工具

https://www.slf4j.org/migrator.html

jar包下载地址：https://repo1.maven.org/maven2/org/slf4j/slf4j-migrator/

~~~bash
java -jar slf4j-migrator-2.0.16.jar

~~~

![image-20250415124547707](http://47.101.155.205/image-20250415124547707.png)



