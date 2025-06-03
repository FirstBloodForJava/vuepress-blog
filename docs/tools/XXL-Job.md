# xxl-job

GitHub官网地址：https://github.com/xuxueli/xxl-job/

XXL-JOB官网文档地址：https://www.xuxueli.com/xxl-job/



## 调度中心

`xxl-job-admin`模块是调度中心。

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



