# xxl-job

GitHub官网地址：https://github.com/xuxueli/xxl-job/

XXL-JOB官网文档地址：https://www.xuxueli.com/xxl-job/



## 调度中心

`xxl-job-admin`模块是调度中心。



### 配置文件

调度中心配置文件说明：

~~~properties
# web 端口+servlet上下文配置
server.port=8080
server.servlet.context-path=/xxl-job-admin

# actuator 监控相关配置
management.server.base-path=/actuator
management.health.mail.enabled=false

# web 静态资源
spring.mvc.servlet.load-on-startup=0
spring.mvc.static-path-pattern=/static/**
spring.web.resources.static-locations=classpath:/static/

# freemarker 模板引擎配置
spring.freemarker.templateLoaderPath=classpath:/templates/
spring.freemarker.suffix=.ftl
spring.freemarker.charset=UTF-8
spring.freemarker.request-context-attribute=request
spring.freemarker.settings.number_format=0.##########
spring.freemarker.settings.new_builtin_class_resolver=safer

# mybatis xml映射地址
mybatis.mapper-locations=classpath:/mybatis-mapper/*Mapper.xml

# datasource-pool 连接池配置
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.maximum-pool-size=30
spring.datasource.hikari.auto-commit=true
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.pool-name=HikariCP
spring.datasource.hikari.max-lifetime=900000
spring.datasource.hikari.connection-timeout=10000
spring.datasource.hikari.connection-test-query=SELECT 1
spring.datasource.hikari.validation-timeout=1000

# xxl-job, datasource 数据库配置
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
spring.datasource.username=root
spring.datasource.password=root_pwd
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# xxl-job, spring email 邮件配置
spring.mail.host=smtp.qq.com
spring.mail.port=25
spring.mail.username=xxx@qq.com
spring.mail.from=1164864987@qq.com
spring.mail.password=xxx
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory

### xxl-job, access token
xxl.job.accessToken=default_token

# xxl-job, 调度中心触发任务的超时时间
xxl.job.timeout=3

# xxl-job, i18n (default is zh_CN, and you can choose "zh_CN", "zh_TC" and "en") i18n国际化配置
xxl.job.i18n=zh_CN

# xxl-job, 调度线程池最大数量 max size
xxl.job.triggerpool.fast.max=200
xxl.job.triggerpool.slow.max=100

# xxl-job, log retention days 日志保留天数 小于7不生效
xxl.job.logretentiondays=30

~~~



### Docker镜像构建

Dockerfile构建Docker镜像命令

~~~dockerfile
# jre运行环境
FROM openjdk:8-jre-slim
# 镜像创建者
MAINTAINER ouyangcm

ENV PARAMS=""

ENV TZ=PRC
# 设置系统时区为中国标准时间
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 添加jar文件到镜像
ADD target/xxl-job-admin-*.jar /app.jar

# 启动镜像命令
# PARAMS 通过环境变量替换jar包的配置文件配置
ENTRYPOINT ["sh","-c","java -jar $JAVA_OPTS /app.jar $PARAMS"]

~~~



~~~bash
# 使用Dockerfile 构建镜像
docker build -t xxl-job-admin:1.0 .

# 启动镜像
# -v /tmp:/data/applogs 主机目录和容器目录挂载
# --name 容器名称
# 
docker run -e PARAMS="--spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai" -p 8080:8080 -v /tmp:/data/applogs --name xxl-job-admin  -d xxl-job-admin:1.0

~~~



### logback

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false" scan="true" scanPeriod="1 seconds">

    <contextName>logback</contextName>
    <property name="log.path" value="/data/applogs/xxl-job/xxl-job-admin.log"/>

    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} %contextName [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}.%d{yyyy-MM-dd}.zip</fileNamePattern>
        </rollingPolicy>
        <encoder>
            <pattern>%date %level [%thread] %logger{36} [%file : %line] %msg%n
            </pattern>
        </encoder>
    </appender>

    <root level="info">
        <appender-ref ref="console"/>
        <appender-ref ref="file"/>
    </root>

</configuration>

~~~



### 触发一次任务

uri：/xxl-job-admin/jobinfo/trigger

~~~json


~~~





## 执行器

`xxl-job-executor-sample-springboot`基于SpringBoot开发的执行器例子。

![image-20250604165149209](http://47.101.155.205/image-20250604165149209.png)



### 运行模式

支持的运行模式有：

- BEAN：结合`JobHandler`属性使用，`JobHandler`设置
- GLUE(Java)：
- GLUE(Shell)：
- GLUE(Python)：
- GLUE(PHP)：
- GLUE(NodeJS)：
- GLUE(PowerShell)：



#### 运行本质

执行器作为一个Netty Web容器，在启动时将JobHandler注册在其中。当调度中心配置的任务被触发时，将触发参数调用在执行器的`run`接口上，执行器在根据参数做对应的任务调度。容器的核心类：`EmbedServer`。

无框架的执行还是SpringBoot的执行器，调度逻辑都是如此。

![image-20250610214852614](Http://47.101.155.205/image-20250610214852614.png)



任务的调用逻辑：

1. 处理请求的线程上，在启动了一个任务线程来处理真正的任务。
2. 任务可中断功能仅支持阻塞状态的线程，例如：`sleep`、`wait`、`join`等。如果线程是在运行状态，则是伪中断。





#### 1.BEAN

实现自定义执行器的方式：

1. 注册类模式：继承`com.xxl.job.core.handler.IJobHandler`抽象类，手动注册到执行器容器。
2. 注解方法模式：`@XxlJob`，注解定义`JobHandler`名称



##### 1.类模式

每个任务对应一个Java类。步骤如下：

1. 开发一个继承`com.xxl.job.core.handler.IJobHandler`的类；
2. 手动注册到执行器容器：`XxlJobExecutor.registJobHandler("demoJobHandler", new DemoJobHandler())`。



##### 2.注解方法

xxl-job提个了几个默认的Bean执行器：

- demoJobHandler：简单的任务；
- shardingJobHandler：分片广播任务；
- commandJobHandler：命令行任务；
- httpJobHandler：根据参数发起简单http请求；



![image-20250605162700204](http://47.101.155.205/image-20250605162700204.png)





