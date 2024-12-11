# SpringBoot



## 1.介绍

官网文档(单页)：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/htmlsingle/

最新文档：https://docs.spring.io/spring-boot/

常见问题的解决方案：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/htmlsingle/#howto

springboot相关项目入门介绍(太简单+jdk版本高)：https://spring.io/guides

官网介绍的学习步骤：

1. 入门
2. 使用SpringBoot
3. 了解SpringBoot的属性
4. 生产使用SpringBoot的技巧
5. 进阶



## 2.入门

what？

how？

why？

SpringBoot的介绍：可以快速简单的快发一个基于Spring的应用。以自己独特的方式整合了第三方依赖。可以通过java -jar或war包或Spring CLI来启动SpringBoot应用。

SpringBoot的目标：

1. 为Spring的开发人员提供快速开始的使用体验。
2. 开箱即用：依赖管理、自动配置。
3. 继承了非功能性的特性：嵌入式容器、security、metrics、health check、外部化配置。
4. 没有xml配置。
5. 构建(部署)的简化。java不支持嵌套jar文件(jar文件中嵌套jar)。SpringBoot提供了uber-jar(fat-jar可执行的jar)，该项目所有依赖的jar文件都在这个jar中。在这个jar中BOOT-INFO目录下，classes是开发者的代码，lib是maven依赖的jar文件。META-INF目录中maven构建的信息。org.springframework.boot.loader目录下一些class文件，Main-Class: org.springframework.boot.loader.JarLauncher是启动的主类，在这里面定义了加载jar的class的过程。

2.2.7版本支持的Java版本是8-14。支持Spring Framework版本是5.2.6或跟高。

maven构建版本支持3.3+。

gradle支持版本5.x或6.x。

![image-20241201160746731](http://47.101.155.205/image-20241201160746731.png)

Springboot初始化模板地址：https://start.spring.io/

替换pom.xml文件内容。

maven项目的pom文件。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.oycm</groupId>
    <artifactId>spring-boot-example-maven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 继承的SpringBoot版本 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.7.RELEASE</version>
    </parent>

    <dependencies>
        <!-- 引用spring-boot-starter-web依赖 web应用依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <!-- 引入插件 -->
    <build>
        <plugins>
            <!-- 将项目构建成一个可执行的jar包 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

~~~

启动类

~~~java
package com.oycm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class SpringBootExample {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootExample.class, args);
    }
}

~~~

EnableAutoConfiguration作用：通知SpringBoot基于加载的jar依赖自动配置。

starters和自动配置的关系：自动配置的设计是为了更好的和starters协作，这两者之间没有捆绑的关系。starter提供了一个功能相关的依赖集合，里面有核心依赖实现了自动配置的功能。



### spring-boot-jar

官网文档：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/maven-plugin/usage.html

需要引入插件：

~~~xml
<build>
	<plugins>
		<plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>

~~~

![image-20241201202548724](http://47.101.155.205/image-20241201202548724.png)

![image-20241201201302236](http://47.101.155.205/image-20241201201302236.png)

![image-20241201201521439](http://47.101.155.205/image-20241201201521439.png)



### original-jar

使用maven的package打包后，在target目录下有两个jar包，其中original结尾的文件是在使用SpringBoot在打包之前maven构建的jar包。

![image-20241201202141733](http://47.101.155.205/image-20241201202141733.png)



## 3.使用

SpringBoot的每个版本都提供了一些列它支持的第三方依赖，在使用一个具体的SpringBoot版本时，可以不用指定它支持的依赖的版本(版本升级也只需要更换SpringBoot的版本)。



### Maven

使用spring-boot-starter-parent做为maven项目的父模块，可以继承parent的一些属性。

1. 编译时java的版本。
2. spring-boot-starter-parent继承spring-boot-dependencies，继承了父模块的依赖管理，所有在自己模块中定义被管理的依赖时，可以不用指定依赖的版本。
3. 提供了spring-boot-maven-plugin插件，将项目打包成可指向的jar包。
4. parent配置了对resources目录下application.yml、application.yaml、application.properties名称开始的文件，将里面的@name@进行占位替换。
5. 可以通过覆盖spring-boot-dependencies中定义的属性值，来替换成你想要的版本。

spring-boot-dependencies依赖源码：https://github.com/spring-projects/spring-boot/blob/v2.2.7.RELEASE/spring-boot-project/spring-boot-dependencies/pom.xml



~~~xml
<!-- 继承spring boot的默认maven配置 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.7.RELEASE</version>
</parent>

<properties>
	<maven.compiler.source>8</maven.compiler.source>
	<maven.compiler.target>8</maven.compiler.target>
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!-- 替换spring boot 管理的依赖版本 -->
	<spring-data-releasetrain.version>Fowler-SR2</spring-data-releasetrain.version>
    
</properties>

~~~





#### 不指定parent

maven的parent可以不用指向spring-boot-starter-parent，但是你有需要parent的依赖管理功能，则可以这样做(但是构建的插件不能少)。

~~~xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <!-- 从Spring Boot导入依赖管理 -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.2.7.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<build>
    <plugins>
        <!-- 构建可执行文件的插件 -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
        		<mainClass>MainClass</mainClass>
    		</configuration>
        </plugin>
    </plugins>
</build>

~~~

但是这种方式不能通过修改属性值的方式实现依赖版本的升级，而是将依赖定义在dependencies之前的方式。

~~~xml
<dependencyManagement>
    <dependencies>
        <!-- 替换Spring Boot指定的依赖版本 -->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-releasetrain</artifactId>
            <version>Fowler-SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.2.7.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

~~~



### gradle

官网介绍使用文档：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/gradle-plugin/reference/html/



#### SpringBoot官网初始化

build.gradle

~~~gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.2.7.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

// 项目信息
group = 'com.example'
version = '0.0.1-SNAPSHOT'

// 导入依赖
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

~~~







![image-20241206091649090](http://47.101.155.205/image-20241206091649090.png)

![image-20241206091722557](http://47.101.155.205/image-20241206091722557.png)





#### 依赖管理

build.gradle

~~~gradle
plugins {
	java
	// 引入插件不使用,改模块不会被打包成可执行的jar
	id("org.springframework.boot") version "2.2.7.RELEASE" apply false
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
}


dependencyManagement {
    imports {
    	// 引入spring cloud的相关依赖管理
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Brixton.RELEASE'
        // 引入spring boot的相关依赖管理
        mavenBom 'org.springframework.boot:spring-boot-dependencies:2.2.7.RELEASE'
    }
}

~~~



#### 其它配置

build.gradle

~~~gradle
// 里面的配置应用至所有项目，包括root
allprojects {
	
}
// 里面的配置应用至所有项目，不包括root
subprojects {

}

// 是否打成jar包
jar {
    enabled = true
}

// 构建成可执行jar包，添加的后缀boot(org.springframework.boot插件启动才可配置)
bootJar {
    classifier = 'boot'
    // 可执行main的类全路径名称
    mainClassName = 'com.oycm.SpringBootExample'
}

~~~



setting.gradle

~~~gradle
// 配置远程仓库
pluginManagement {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
    }
}

~~~





#### 命令

task

列出可执行的命令

~~~bash
gradle task

# gradle wrapper
./gradlew task

~~~

![image-20241206111556605](http://47.101.155.205/image-20241206111556605.png)



build

构建成jar或war包。

~~~bash
gradle build

# gradle wrapper
./gradlew build

~~~



#### 自定义task

build.gradle

~~~gradle
// 定义build命令在 clean之后运行
build.mustRunAfter clean

// 自定义这个task,名称buildJar，依赖build,和clean之后执行。前面定义了build在clean之后执行
tasks.register('buildJar', GradleBuild) {
    dependsOn build, clean

    doLast {
        String jarName = "$rootProject.name"
        delete(file("jar"))
        mkdir("jar")
        String jarPath = "build/libs"
        // 复制到一个目录下,并重命名
        copy {
            from(jarPath)
            into  "jar"
            rename {
                String fileName -> jarName + '.jar'
            }
        }
        // 删除build及里面的所有东西
        file("build").deleteDir();

    }
}

task buildJar1 (type: GradleBuild, dependsOn: [build, clean]) {

}

~~~



### starter

https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/htmlsingle/#using-boot-starter

spring官方提供的starter遵循命名规则spring-boot-starter-[name]，name都具有一定的含义。

也可以自定义starter，第三方的starter一般遵循[name]-spring-boot-starter命名规则。

自定义starter文档：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/htmlsingle/#boot-features-custom-starter



starter分为三类：

1. 应用类型starter：如spring-boot-starter-web。
2. 功能类型starter：spring-boot-starter-actuator。
3. 嵌入型starter：spring-boot-starter-jetty、spring-boot-starter-undertow；spring-boot-starter-log4j2、spring-boot-starter-logging；spring-boot-starter-reactor-netty。



### 编码

每个类都定义包名，缺省的包名，会让@ComponentScan, @ConfigurationPropertiesScan, @EntityScan,  @SpringBootApplication扫描所有的类。

@SpringBootApplication注解通过被使用在启动类上，他会自动扫描当前包下的所路径。

不使用@SpringBootApplication主机，可以使用@EnableAutoConfiguration和@ComponentScan注解进行替换。



### 配置

配置类：配置类可以使用@Configuration修饰，通过@Import(该类)或@ComponentScan扫描的方式将配置类交友Spring容器管理。



自动配置功能：SpringBoot会自动根据加载的jar，是否启动某个功能。启动这种功能的方式在一个@Configuration上使用一个@SpringBootApplication或@EnableAutoConfiguration注解。通常情况下是在main方法上使用这个注解。



通过通过添加启动参数--debug查看启动加载了哪些类。



禁用一些自动配置方式：

1. @SpringBootApplication(exclude={DataSourceAutoConfiguration.class})，exclude指向class，excludeName指向类的全路径名称。
2. @EnableAutoConfiguration方式同样使用方式，exclude指向class，excludeName指向类的全路径名称。



### Bean和依赖注入

使用@ComponentScan注解扫描被定义的Bean，使用@Autowired构造方法注入。@Component, @Service, @Repository, @Controller注解的类在根路径的包下，则可以不用配置扫描的包路径。

![image-20241206151407094](http://47.101.155.205/image-20241206151407094.png)



### 热拔插开发工具

代码修改，编译后生效。

spring.devtools.restart.enabled=false配置禁用重新加载。

System.setProperty("spring.devtools.restart.enabled", "false");代码方式(main方法中)

maven导入，pom.xml

~~~xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>

~~~

gradle导入，build.gradle

~~~gradle
configurations {
    developmentOnly
    runtimeClasspath {
        extendsFrom developmentOnly
    }
}
dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")
}

~~~



可以在$HOME/.config/spring-boot目录下添加以下配置文件实现devtools的全局配置：

1. spring-boot-devtools.properties
2. spring-boot-devtools.yaml
3. spring-boot-devtools.yml

~~~properties
# 禁用重启
spring.devtools.restart.enabled=false
# 程序在.reloadtrigger文件被修改时触发重启(编译后)
spring.devtools.restart.trigger-file=.reloadtrigger

~~~





## 4.功能

### SpringApplication 

**启动失败**

失败原因分析处理：

spring-boot模块中的META-INF/spring.factories文件中定义了org.springframework.boot.diagnostics.FailureAnalyzer=class名称，实现对SpringBoot启动失败分析。

启动日志记录

org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener注册监听时间，根据日志级别大于自动配置的情况。

实现了ApplicationContextInitializer接口，通过spring-boot-autoconfigure模块META-INF/spring.factories自动注入，org.springframework.context.ApplicationContextInitializer=class。



main方法启动参数--debug将日期级别设置为debug。



**延迟初始化**

延迟初始化可以支持Bean不在应用启动的时候创建，而是在被使用的时候创建。如web应用，controller相关的bean知道接收http请求才创建。

延迟加载虽然能减少启动应用的时间，也会带来许多问题。延迟发现程序的问题、程序需要有足够的内存去加载哪些为创建的bean。

可以同@Lazy(false)将已经延迟初始化的设置为立即初始化。



**自定义应用的特点**

~~~java
public static void main(String[] args) {
    SpringApplication app = new SpringApplication(MySpringConfiguration.class);
    // 不打印banner
    app.setBannerMode(Banner.Mode.OFF);
    app.run(args);
}

~~~

api文档：https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/api//org/springframework/boot/SpringApplication.html



**流式构建启动**

~~~java
new SpringApplicationBuilder()
        .sources(Parent.class)
        .child(Application.class)
        .bannerMode(Banner.Mode.OFF)
        .run(args);

~~~

构建的ApplicationContext上下文有层级关系，可以采用这种方式启动。

创建了层级的ApplicationContext，要求Web组件必须在child上下文，parent和child使用相同的Enviroment。



**ApplicationEvent和ApplicationListener**

除了Spring Framework常见的事件，例如ContextRefreshedEvent，SpringApplication提供了其它的事件。



有些监听事件是在ApplicationContext创建之前触发的，因此不能将其注册为Bean。可以使用SpringApplication.addListeners(...)或SpringApplicationBuilder.listeners(…)方法注册。

通过META-INF/spring.factories中添加key=org.springframework.context.ApplicationListener，value指向监听器的全路径名称，可以实现自动注册监听器。

应用程序运行时，遵循以下顺序发送事件：

1. ApplicationStartingEvent在运行时发送，在任何程序执行之前，除了注册监听器和初始化程序之外。
2. ApplicationEnvironmentPreparedEvent在已知context使用Environment来创建context之前发送。
3. ApplicationContextInitializedEvent在ApplicationContext已创建好和已调用ApplicationContextInitializers，bean未被加载之前发送。
4. ApplicationPreparedEvent在bean定义加载之后，在refresh之前发送。
5. ApplicationStartedEvent在context被刷新之后，在应用程序和command-line runners运行之前发送。
6. ApplicationReadyEvent在应用程序和command-line runners运行后，表明应用程序已准备做好服务请求。
7. ApplicationFailedEvent在启动出现异常发送。

上面的事件是SpringApplication启动的SpringApplicationEvent事件。除了这些，在ApplicationPreparedEvent之后和ApplicationStartedEvent之前还会发送以下事件：

1. ContextRefreshedEvent在ApplicationContext被刷新时发送。
2. WebServerInitializedEvent在WebServer准备就绪时发送。ServletWebServerInitializedEvent和ReactiveWebServerInitializedEvent分别是servlet和reactive实现。



应用程序事件使用了Spring Framework的事件发布机制。

可以通过实现ApplicationContextAware接口注入bean的方式来管理上下文。



**Web环境**

SpringApplication在启动时，需要确定创建哪种类型的ApplicationContext。用于确认WebApplicationType的算法如下：

1. 如果Spring MVC存在，则使用AnnotationConfigServletWebServerApplicationContext。
2. 如果Spring MVC不存在且Spring WebFlux存在，则使用AnnotationConfigReactiveWebServerApplicationContext。
3. 否则使用AnnotationConfigApplicationContext。



Spring MVC的优先级高于SpringWebFlux，可以通过SpringApplication.setWebApplicationType(WebApplicationType)的方式修改启动的类型或setApplicationContextClass(Class)。



**命令行参数访问**

注入org.springframework.boot.ApplicationArguments可以实现对命令行参数的访问。

提供了两种方式方式访问：

1. getSourceArgs()访问原始的参数。
2. 访问解析后的参数：getOptionValues、getNonOptionArgs

~~~java
import org.springframework.boot.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Component
public class MyBean {

    @Autowired
    public MyBean(ApplicationArguments args) {
        boolean debug = args.containsOption("debug");
        List<String> files = args.getNonOptionArgs();
        // if run with "--debug logfile.txt" debug=true, files=["logfile.txt"]
    }

}

~~~

SpringBoot使用Spring的Environment注册了CommandLinePropertySource。可以通过@Value注入单个的应用参数。



**使用ApplicationRunner或CommandLineRunner**

可以通过实现ApplicationRunner或CommandLineRunner接口，达到在SpringApplication启动后执行某些代码。两个接口的工作方式相同，都提供了一个run方法，该方法在SpringApplication.run(...)完成之前调用。

如果定义了多个ApplicationRunner或CommandLineRunner，可以通过实现org.springframework.core.Ordered接口或使用注解org.springframework.core.annotation.Order的方式来指定执行顺序(值越大优先级越低)。

~~~java
import org.springframework.boot.*;
import org.springframework.stereotype.*;

@Component
public class MyBean implements CommandLineRunner {

    public void run(String... args) {
        // Do something...
    }

}

~~~





**Application退出**

SpringApplication向JVM注册了一个关闭狗子，确保ApplicationContext在退出时正常关闭。例如：

1. 实现DisposableBean接口。
2. Bean中被@PreDestroy注解的方法。



注入一个ExitCodeGenerator对象的作用？





**Admin属性**

~~~properties
# 通过VisualVM可以查看注入的MBean。
spring.application.admin.enabled=true

~~~

注入了SpringApplicationAdminMXBean对象，可以调用方法getProperty("local.server.port")获取http端口。

shutdown停止程序。

![image-20241207171952985](http://47.101.155.205/image-20241207171952985.png)



### 外部化配置

SpringBoot支持外部化配置，可以让一份代码以不同的环境启动。可以使用properties文件、yaml(yml)文件、环境变量、命令行参数来外部化配置。属性能通过@Value注入Bean中，@ConfigurationProperties注解可以将配置结构化。

SpringBoot通过PropertySource来实现合理的配置覆盖值。配置遵循以下规则：

1. 当devtools 插件生效时，其全局配置优先级最高。
2. 测试中的注解@TestPropertySource。
3. 测试中的属性。@SpringBootTest。
4. 命令行参数(系统属性或args)。
5. 来自SPRING_APPLICATION_JSON(嵌入在环境变量或系统属性的json)的属性。
6. ServletConfig初始化参数。
7. ServletConfig初始化参数。
8. 来自java:comp/env的JNDI属性。
9. Java系统属性(System.getProperties())。
10. 操作系统变量。
11. random.*的属性(RandomValuePropertySource)。
12. 在jar包外的application-{profile}.properties(yaml|yml)。
13. 在jar包内的application-{profile}.properties(yaml|yml)。
14. 在jar包外的application.properties(yaml|yml)。
15. 在jar包内的application.properties(yaml|yml)。
16. @Configuration和@PropertySource一起注解的类。这个自会在ApplicationContext被刷新后才生效，对于一些在刷新之前就读取的配置就太迟了，如：logging.、spring.main.。
17. 默认属性，通过SpringApplication.setDefaultProperties设置。

application.properties配置文件打包jar中和jar包外，生效的是@name@。

~~~properties
name=@name@

~~~





**配置随机值**

~~~properties
# 随机字符串
my.secret=${random.value}
# 随机int
my.number=${random.int}
my.bignumber=${random.long}
# uuid
my.uuid=${random.uuid}
# 范围内随机数
my.number.less.than.ten=${random.int(10)}
# 区间内随机数
my.number.in.range=${random.int[1024,65536]}

~~~



**命令行参数**

命令参数的优先级高于其它配置属性来源。SpringApplication会将--server.port=9000配置添加到Spring的Enviroment中。

通过SpringApplication.setAddCommandLineProperties(false)禁用命令行配置。



**配置属性文件**

SpringApplication加载application.properties(yaml|yml)文件进入Enviroment。优先级如下：

1. 当前目录的config子目录。
2. 当前目录。
3. 包中的config目录下的。
4. classpath根目录下的。

优先级高的配置值覆盖优先级低的。



可以通过命令行参数指定修改配置文件的名称，不使用application。

~~~bash
java -jar my.jar --spring.config.name=myproject

~~~

可以修改配置的文件的路径：

~~~bash
java -jar myproject.jar --spring.config.location=classpath:/default.properties,classpath:/override.properties

~~~

spring.config.name和spring.config.location被决定哪个文件被加载。这个变量的配置就需要提前配置，通常在系统环境变量，系统属性或命令行参数使用。

spring.config.location的配置指向目录时，需要/结尾。

spring.config.location的配置按相反顺序搜索，例如：配置为classpath:/,classpath:/config/,file:./,file:./config/(这个也是默认加载配置文件的路径配置)，则按以下顺序搜索：

1. file:./config。
2. file:./。
3. classpath:/config。
4. classpath:/



spring.config.additional-location可以添加更多的配置文件路径，加载顺序相反，优先级比默认扫码路径高。



**特定profile配置**

遵循application-{profile}.properties(yaml|yml)命名规则的配置文件，通过指定一系列的profiles，默认是default(application-default.properties)。加载位置的默认规则和application.properties一致。特定配置文件的优先级高于非特定配置文件(无论是jar中的或jar包外的)。

如果spring.config.location指定了具体的文件，则特定配置文件失效。需要生效则只能指向目录。

spring.profiles.active表示指定的{profile}的值。





**配置文件占位符**

value值使用前面定义的变量值。

~~~properties
name=MyApp
app.description=${name} is a Spring Boot application

~~~



**加密配置**

SpringBoot没有提供对配置值加密的功能，但是提供了修改Enviroment中属性值的构造。EnvironmentPostProcessor接口运行你在应用启动前修改Enviroment。



**yaml使用**

https://yaml.org/

yaml可以是JSON数据的表达。

SpringFramework提供了两个类去加载YAML文档。YamlPropertiesFactoryBean将YAML加载成Properties，YamlMapFactoryBean将YAML加载成Map。

list

~~~yaml
my:
   servers:
       - dev.example.com
       - another.example.com

~~~

~~~properties
my.servers[0]=dev.example.com
my.servers[1]=another.example.com

~~~

使用Java代码绑定配置。

~~~java
@ConfigurationProperties(prefix="my")
public class Config {

    private List<String> servers = new ArrayList<String>();

    public List<String> getServers() {
        return this.servers;
    }
}

~~~



多profile YAML文档，下面表示激活development部分的配置。

~~~yaml
server:
    address: 192.168.1.100
spring:
  	profiles:
    	active: dev
---
spring:
    profiles: development
server:
    address: 127.0.0.1
---
spring:
    profiles: production & eu-central
server:
    address: 192.168.1.120

~~~

如果spring.profiles.active指定了值，存在application-{profiles}.yaml的文件，则profile的配置将失效，将以指定文件的配置为准。



#### ConfigurationProperties

**安全配置属性**

@Value和@ConfigurationProperties

将配置绑定到JavaBean属性(默认是没有被容器管理的)。

~~~java
package com.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ConfigurationProperties("acme")
public class AcmeProperties {

    private boolean enabled;

    private InetAddress remoteAddress;

    private final Security security = new Security();

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public InetAddress getRemoteAddress() {
        return this.remoteAddress;
    }

    public void setRemoteAddress(InetAddress remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

    public Security getSecurity() {
        return this.security;
    }

    public static class Security {

        private String username;

        private String password;

        private List<String> roles = new ArrayList<>(Collections.singleton("USER"));

        public String getUsername() {
            return this.username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return this.password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public List<String> getRoles() {
            return this.roles;
        }

        public void setRoles(List<String> roles) {
            this.roles = roles;
        }

    }
}

~~~

上面的类定义了以下属性：

1. acme.enable：默认值false。
2. acme.remoteAddress(remote-address)：结果可以从String类型转换而来。
3. acme.security.username：带有嵌套的属性名称由属性名和类中属性名共同决定。
4. acme.security.password。
5. acme.security.roles：默认是有USER的List集合。



JavaBean绑定私有属性的情况，setter方法可以省略的情况：

1. Map属性，只要被初始化了，就只需要getter而不需要setter方法。
2. 集合或数组，通过yaml的来配置或使用','分割的配置。确定这个类型是可变的，则推荐添加setter。
3. 如果是被final修饰属性的可以不添加setter。



构造方法绑定：

@ConstructorBinding和@ConfigurationProperties。

使用构造方法绑定的类必须使用@EnableConfigurationProperties或配置扫码的方式注入。不能使用@Bean注入或@Import的方式。如果有多个构造函数ConstructorBinding使用在对应的构造方法上。

~~~java
package com.example;

import java.net.InetAddress;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConstructorBinding
@ConfigurationProperties("acme")
public class AcmeProperties {

    private final boolean enabled;

    private final InetAddress remoteAddress;

    private final Security security;

    // 如果没有Security的相关配置，则security为null，可以使用DefaultValue注解让对象不为null
    public AcmeProperties(boolean enabled, InetAddress remoteAddress, Security security) {
        this.enabled = enabled;
        this.remoteAddress = remoteAddress;
        this.security = security;
    }

    public boolean isEnabled() { ... }

    public InetAddress getRemoteAddress() { ... }

    public Security getSecurity() { ... }

    public static class Security {

        private final String username;

        private final String password;

        private final List<String> roles;

        // DefaultValue指定默认值
        public Security(String username, String password,
                @DefaultValue("USER") List<String> roles) {
            this.username = username;
            this.password = password;
            this.roles = roles;
        }

        public String getUsername() { ... }

        public String getPassword() { ... }

        public List<String> getRoles() { ... }

    }

}

~~~



**激活(启用)ConfigurationProperties注解**

三种方式激活@ConfigurationProperties配置类。

1. 再@ConfigurationProperties上添加@Configuration(被扫描到)。
2. @EnableConfigurationProperties中配置这个class。
3. @ConfigurationPropertiesScan中配置扫码的路径(通常在main方法上使用，也可以在@Configuraion注解上使用)。

ConfigurationProperties注入的Bean命名规则pre-fqn。pre表示配置的前缀；fqn表示类的全路径名称。



激活之后就可以像一个普通Bean一样使用。



**第三方配置**

AnotherComponent对象的属性会在返回自动设置属性。

~~~java
@ConfigurationProperties(prefix = "another")
@Bean
public AnotherComponent anotherComponent() {
    ...
}

~~~



**宽松的绑定方式**

~~~java
@ConfigurationProperties(prefix="acme.my-project.person")
public class OwnerProperties {

    private String firstName;

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

}

~~~

prefix指定的值，单词分割必须使用'-'。

| key                               | 使用说名                          |
| --------------------------------- | --------------------------------- |
| acme.my-project.person.first-name | properties和yml中使用             |
| acme.myProject.person.firstName   | 标准驼峰分割                      |
| acme.my_project.person.first_name | 下划线分割，properties和yml中使用 |
| ACME_MYPROJECT_PERSON_FIRSTNAME   | 大写格式，使用系统变量使用        |



**绑定至Map**

如果Map的key中有非字母数字或'-'，则需要使用"[]"包裹，否则非字母数字或'-'的字符都会被删除。例如：

~~~yaml
acme:
  map:
    "[/key1]": value1
    "[/key2]": value2
    /key3: value3

~~~

map的key是：/key1、/key2、key3。



**绑定环境变量**

Linux系统的环境变量名仅包含字母(a-z|A-Z)、数字、下划线(_)，Unix变量名还会全部大写。

将配置文件的key转换成环境变量遵循以下规则：

1. '.'转换成'_'。
2. 去掉所有的'-'。
3. 全部转大写。

spring.main.log-startup-info对应环境变量名：SPRING_MAIN_LOGSTARTUPINFO。

如果绑定的环境变量值是List，则：my.acme[0].other变为MY_ACME_0_OTHER。



**配置合并规则**

~~~yaml
acme:
  list:
    - name: my name
      description: my description
---
spring:
  profiles: dev
acme:
  list:
    - name: my another name

~~~

如果dev不激活，则list中只会有一个对象，name的值是my name。

如果dev激活，则list也只会有一个对象，name的值是my another name。

~~~yaml
acme:
  list:
    - name: my name
      description: my description
    - name: another name
      description: another description
---
spring:
  profiles: dev
acme:
  list:
    - name: my another name

~~~

多个配置指向一个列表，只会保留优先级高的配置。

如果dev不激活，则list中有2个对象。

如果dev激活，则list中只有1个对象。



~~~yaml
acme:
  map:
    key1:
      name: my name 1
      description: my description 1
---
spring:
  profiles: dev
acme:
  map:
    key1:
      name: dev name 1
    key2:
      name: dev name 2
      description: dev description 2

~~~

激活情况同上。



**属性转换**

SpringBoot在绑定属性时，会自动尝试将外部属性进行转换。自己也可以自定义转换方式。

ConversionService 

CustomEditorConfigurer 



**Duration转换**

持续事件的设置，定义值的规则：

1. long值表达式，默认的单位时ms(毫秒)，除非通过@DurationUnit指定单位。
2.  ISO-8601格式(Duration)。
3. 可读的格式，例如10s意味着10秒。

可读单位表示：

1. ns：纳秒
2. us：微秒
3. ms：毫秒
4. s：秒
5. m：分钟
6. h：小时
7. d：天

500、 PT0.5S、500ms表示500毫秒。

单位指定后可以被覆盖？



**DataSize转换**

DataSize能识别以下的格式：

1. long值，byte作为默认单位，除非@DataSizeUni指定单位。
2. 可读的值和单位，例如：1MB。

可读单位：

1. B：
2. KB：
3. MB：
4. GB：
5. TB：



**ConfigurationProperties校验**

添加@Validated可以使用

~~~java
@ConfigurationProperties(prefix="acme")
@Validated
public class AcmeProperties {

    @NotNull
    private InetAddress remoteAddress;

    @Valid
    private final Security security = new Security();

    // ... getters and setters

    public static class Security {

        @NotEmpty
        public String username;

        // ... getters and setters

    }

}

~~~



**@ConfigurationProperties和@Value**

| 特点       | @ConfigurationProperties | @Value |
| ---------- | ------------------------ | ------ |
| 宽松的绑定 | 支持                     | 有限   |
| 元数据支持 | 支持                     | 不支持 |
| SPEL表达式 | 不支持                   | 支持   |

@Value("{demo.item-price}")支持配置值和@Configuration一致。但是@Value("{demo.itemPrice}")就支持配置文件中key为demo.itemPrice的。



### Profiles

Spring提供了在代码中使用不同环境的配置文件方式，如在@Component、@Configuration、@ConfigurationProperties上使用@Profile注解来限制配置的加载。

如果@ConfigurationProperties通过@EnableConfigurationProperties的方式加载，则@Profile注解需要在注解@EnableConfigurationProperties上才会生效；如果是扫描加载，则不用。



**添加激活Profiles**

~~~yml
my.property: fromyamlfile
---
spring.profiles: prod
spring.profiles.include:
  - proddb
  - prodmq

~~~

如果启动时添加了--spring.profiles.active=prod的配置，不存在application-prod.yml(yaml|properties)的配置文件，则proddb、prodmq将被激活。



**程序添加激活Profiles**

在SpringApplication调用run方法之前，SpringApplication.setAdditionalProfiles(…)添加激活Profiles。



这个添加的Profiles也遵循特定文件的规则。



### Logging

SpringBoot使用Apache Logging作为底层，也保证了日志的对外的扩展。



**默认日志格式**

1. 带毫秒的日期：2024-12-07 17:19:39.073。
2. LEVEL：日志的级别，ERROR、WARN、INFO、DEBUG、TRACE。
3. 分割符：---
4. threadName：线程名
5. LoggerName：记录日志的log设置的类名。
6. msg：日志消息。



**控制台输出**

控制日志的级别：

1. 启动参数：--debug、--trace。
2. 配置文件：debug=true、trace=true。



**控制台颜色输出**

%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){yellow}表示日期打印的颜色是黄色。

支持的颜色有：

1. blue
2. cyan
3. faint
4. green
5. megenta
6. red
7. yellow



**日志输出到文件**

可以通过logging.file.name或logging.file.path配置日志输出到文件。

| logging.file.name | logging.file.path | example         | description                      |
| ----------------- | ----------------- | --------------- | -------------------------------- |
| none              | none              |                 | 输出到控制台                     |
| 特定文件          | none              | application.log | 写入指定文件，文件中也能指定路径 |
| none              | 特定的目录        | log             | 写入特定目录的spring.log文件中   |

其它配置：

1. logging.file.max-size：指定日志文件文件最大的大小，超过则被压缩成[logName].yyyy-MM-dd.n.gz文件。
2. logging.file.max-history：默认保留7天的轮换日志。
3. logging.file.total-size-cap：设置日志档案的大小，超过阈值则备份被删除(启动时压缩超过阈值会删除备份文档)。
4. logging.file.clean-history-on-start：启动强制清理存档。



**日志级别设置**

logging.level.[logger-name]=[level]方式设置日志的隔离级别

logger-name可以指定路径下类的日志级别(也可以到类)，也可以指定根级别root。

~~~properties
logging.level.root=warn
logging.level.org.springframework.web=debug
logging.level.org.hibernate=error

~~~



**日志组配置**

~~~properties
# 定义一个组
logging.group.tomcat=org.apache.catalina, org.apache.coyote, org.apache.tomcat
# 指定组的日志级别
logging.level.tomcat=TRACE

~~~

SpringBoot提供的两个预定组：

1. web：org.springframework.core.codec, org.springframework.http, org.springframework.web, org.springframework.boot.actuate.endpoint.web, org.springframework.boot.web.servlet.ServletContextInitializerBeans。
2. sql：org.springframework.jdbc.core, org.hibernate.SQL, org.jooq.tools.LoggerListener。





**自定义日志配置**

SpringBoot使用哪套日志系统，由org.springframework.boot.logging.LoggingSystem类的get(ClassLoader classLoader)方法决定。

![image-20241209131218562](http://47.101.155.205/image-20241209131218562.png)

可以通过系统变量org.springframework.boot.logging.LoggingSystem的值来替换SpringBoot的日志系统，也可以通过none禁用SpringBoot的日志配置。

**日志系统是在ApplicationContext初始化之前确定的，所以改变日志系统或禁用日志配置的方式只能通过系统属性。**

默认日志系统自动加载的配置文件。可以通过logging.config指定加载的文件。

ResourceUtils.*getURL*(logging.config).openStream().close()方法校验文件是否存在。

| 日志系统 | 默认加载文件(位置classpath:)                                 |
| -------- | ------------------------------------------------------------ |
| logback  | logback-test[-spring].groovy、logback-test[-spring].xml、logback[-spring].groovy、logback[-spring].xml |
| Log4j2   | log4j2-test[-spring].properties、log4j2-test[-spring].xml、log4j2[-spring].properties、log4j2[-spring].xml |
| JDK      | logging[-spring].properties                                  |



SpringBoot会将配置值转移到Java的系统变量中(变量不存在)。SpringBoot配置和系统变量key关系：

| SpringBoot配置                      | 系统变量                        | 作用                                                         |
| ----------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| logging.exception-conversion-word   | LOG_EXCEPTION_CONVERSION_WORD   | 记录异常转换的关键字                                         |
| logging.pattern.console             | CONSOLE_LOG_PATTERN             | 控制台输出的日志格式(仅logback)                              |
| logging.pattern.file                | FILE_LOG_PATTERN                | 输出到文件日志格式(文件记录开启)(仅logback)                  |
| logging.file.clean-history-on-start | LOG_FILE_CLEAN_HISTORY_ON_START | 是否启用清理归档日志(文件记录开启)(仅logback)                |
| logging.file.max-history            | LOG_FILE_MAX_HISTORY            | 日志保留的天数(文件记录开启)(仅logback)                      |
| logging.file.max-size               | LOG_FILE_MAX_SIZE               | 最大日志文件大小(文件记录开启)(仅logback)                    |
| logging.file.total-size-cap         | LOG_FILE_TOTAL_SIZE_CAP         | 保留压缩日志的总大小(文件记录开启)(仅logback)                |
| logging.pattern.level               | LOG_LEVEL_PATTERN               | 日志级别打印的格式(默认%5p)(仅logback)                       |
| logging.pattern.dateformat          | LOG_DATEFORMAT_PATTERN          | 日志日期打印格式(仅logback)                                  |
| logging.pattern.rolling-file-name   | ROLLING_FILE_NAME_PATTERN       | 滚动日志的日志名(默认${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz))(仅logback) |
|                                     | PID                             | 当前Java进程的pid                                            |

![image-20241209140201531](http://47.101.155.205/image-20241209140201531.png)



%clr在logback.xml配置文件中启动报错。

logback.xml(logback-spring.xml)控制日志行为

~~~xml
<configuration>
    <!-- 定义全局属性 -->
    <property name="LOG_PATH" value="./log"/>
    <property name="APP_NAME" value="springboot-example"/>

    <!-- 控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!-- 日志格式不支持%clr -->
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} %highlight(%-5level) ${PID} --- [%thread]  %logger{36} - %msg%n
            </pattern>
        </encoder>
    </appender>

    <!-- 滚动文件输出 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APP_NAME}.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 每天滚动 -->
            <fileNamePattern>${LOG_PATH}/${APP_NAME}-%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 保留最近 30 天的日志 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level ${PID} --- [%thread]  %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 定义日志级别 -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>

</configuration>

~~~



### 国际化

国际化配置默认情况下在classpath下有messages.properties文件时自动激活。

自动配置类：MessageSourceAutoConfiguration。

![image-20241209171213730](http://47.101.155.205/image-20241209171213730.png)



### JSON

SpringBoot提供了三个JSON映射库：

1. Gson
2. Jackson(默认的)
3. JSON-B



**Jackson**

spring-boot-starter-json作为自动配置Jackson的一部分。

Jackson自动配置类org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration。

对ObjectMapper的配置https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/htmlsingle/#howto-customize-the-jackson-objectmapper



**Gson**

Gson相关依赖存在时会自动配置Gson，提供了sprin.gson.*(org.springframework.boot.autoconfigure.gson.GsonProperties)来自定义Gson的行为。

自动配置类org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration。

怎么定义多个GsonBuilderCustomizer？



**JSON-B**

支持自动配置JSON-B。在JSON-B的依赖被加载时自动配置。



### Web开发

SpringBoot非常适合做web开发，能够通过嵌入容器Tomcat, Jetty, Undertow或Netty快速开发独立的http服务器。有两种方式：

spring-boot-starter-web

spring-boot-starter-webflux



#### SpringMVC

**自动配置**

SpringMVC自动配置功能。

实现WebMvcConfigurer接口，添加注解@Configuration，来自定义拦截器、json解析、视图控制等功能。

想替换RequestMappingHandlerMapping、RequestMappingHandlerAdapter、ExceptionHandlerExceptionResolver，但是不修改SpringMVC的机制，声明一个WebMvcRegistrations Bean并提供这些对象。

想要完全控制控制SpringMVC的行为，可以通过继承抽象类WebMvcConfigurationSupport，并将其交由Spring管理。



**HttpMessageConverters**

SpringMVC使用HttpMessageConverter来转换http请求和响应。默认时开箱即用的。Json转换默认使用Jackson，xml使用Jackson XML或JAXB。字符串默认使用UTF-8编码.

也可以自定义HttpMessageConverters

~~~java
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.*;
import org.springframework.http.converter.*;

@Configuration(proxyBeanMethods = false)
public class MyConfiguration {

    @Bean
    public HttpMessageConverters customConverters() {
        HttpMessageConverter<?> additional = ...
        HttpMessageConverter<?> another = ...
        return new HttpMessageConverters(additional, another);
    }

}

~~~



**自定义Json序列化和反序列化**

快速支持类的序列化和反序列化

~~~java
import java.io.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.springframework.boot.jackson.*;

@JsonComponent
public class Example {

    public static class Serializer extends JsonSerializer<SomeObject> {
        // ...
    }

    public static class Deserializer extends JsonDeserializer<SomeObject> {
        // ...
    }

}

~~~



**MessageCodesResolver**

定义解析出现错误时的提示格式。

spring.mvc.message-codes-resolver-format=prefix_error_code，格式为errorCode + . + objectName + . + field。

spring.mvc.message-codes-resolver-format=postfix_error_code，格式为objectName + . +field + . + errorCode。



**静态资源**

静态资源默认从classpath下的/META-INF/resources/、/resources/、/static/、/public/下加载，可以通过注入WebMvcConfigurer Bean重写addResourceHandlers调整资源目录，也可以通过spring.resources.static-locations配置修改目录，默认会在后面补'/'。

访问静态资源的默认路径是/**，spring.mvc.static-path-pattern配置修改访问静态资源的路径。

spring.mvc.static-path-pattern=/resources/**，表示resources/开头的路径才会去访问静态资源。



**配置WebBindingInitializer**

SpringMVC使用WebBindingInitializer为特定的请求绑定WebDataBinder。

注入ConfigurableWebBindingInitializer Bean有什么作用？



**模板引擎**

FreeMarker：https://freemarker.apache.org/docs/

Groovy：http://docs.groovy-lang.org/docs/next/html/documentation/template-engines.html#_the_markuptemplateengine

Thymeleaf：https://www.thymeleaf.org/

Mustache：https://mustache.github.io/



**错误处理**

SpringBoot默认提供一个/error来处理所有的错误。SpringBoot会根据请求头Accept的值来决定返回返回视图还是文本。

BasicErrorController根据配置的路径处理错误。通过@RequestMapping(produces = MediaType.TEXT_HTML_VALUE)，Accept=text/html，将会返回一个错误视图。

如果是其它类型的Accept，例如为PostMan默认的，则会返回json文本。

还可以通过@ControllerAdvice注解，来自定义哪些Controller的异常处理需要处理，例如：

~~~java
// 可以配置某个具体的类，也可以是包的路径
@ControllerAdvice(basePackageClasses = AcmeController.class)
public class AcmeControllerAdvice extends ResponseEntityExceptionHandler {

    // 定义异常处理的类型
    @ExceptionHandler(YourException.class)
    // 重写返回的状态码(不是ResponseEntity返回则可以通过这个指定状态码)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    ResponseEntity<?> handleControllerException(HttpServletRequest request, Throwable ex) {
        HttpStatus status = getStatus(request);
        return new ResponseEntity<>(new CustomErrorType(status.value(), ex.getMessage()), status);
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }

}

~~~



**自定义错误页面**

resources/public/error目录下新建404.html的静态资源文件。也可以是模板文件。



添加一个重写ErrorViewResolver接口的Bean，定义规则。



**HATEOA**

功能支持，没有具体介绍，和@EnableHypermediaSupport注解有关。



**跨域支持**

SpringMVC自4.2版本开始，支持跨域请求。

SpringBoot支持使用注解@CrossOrigin开启跨域功能(局部配置)。

全局配置跨域方式如下：

~~~java
@Configuration(proxyBeanMethods = false)
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**");
            }
        };
    }
}

~~~





#### WebFlux

Spring Framework 5.0开始提供的响应式Web，不像SpringMVC，不需要Servlet API，是完全异步和非阻塞的。

两者定义WebFlux处理接口的方式

~~~java
@RestController
@RequestMapping("/users")
public class MyRestController {

    @GetMapping("/{user}")
    public Mono<User> getUser(@PathVariable Long user) {
        // ...
    }

    @GetMapping("/{user}/customers")
    public Flux<Customer> getUserCustomers(@PathVariable Long user) {
        // ...
    }

    @DeleteMapping("/{user}")
    public Mono<User> deleteUser(@PathVariable Long user) {
        // ...
    }

}

~~~

~~~java
@Configuration(proxyBeanMethods = false)
public class RoutingConfiguration {

    @Bean
    public RouterFunction<ServerResponse> monoRouterFunction(UserHandler userHandler) {
        return route(GET("/{user}").and(accept(APPLICATION_JSON)), userHandler::getUser)
                .andRoute(GET("/{user}/customers").and(accept(APPLICATION_JSON)), userHandler::getUserCustomers)
                .andRoute(DELETE("/{user}").and(accept(APPLICATION_JSON)), userHandler::deleteUser);
    }

}

@Component
public class UserHandler {

    public Mono<ServerResponse> getUser(ServerRequest request) {
        // ...
    }

    public Mono<ServerResponse> getUserCustomers(ServerRequest request) {
        // ...
    }

    public Mono<ServerResponse> deleteUser(ServerRequest request) {
        // ...
    }
}

~~~



**配置**

可以注入WebFluxConfigurer Bean自定义配置，不适应@EnableWebFlux注解。

添加额外的配置，注入WebFluxConfigurer Bean，不添加注解@EnableWebFlux。

安全控制，注入WebFluxConfigurer Bean，添加注解@EnableWebFlux。



**HttpMessageReaders和HttpMessageWriters**

使用HttpMessageReader和HttpMessageWriter来转换请求和响应。

spring.codec.*配置作用？

CodecCustomizer 来定义什么？

spring.jackson.*来配置Jackson的行为。



**静态资源访问**

配置方式略同SpringMVC Web。

没有Servlet，不支持war包部署。



**模板引擎**

FreeMarker：https://freemarker.apache.org/docs/

Thymeleaf：https://www.thymeleaf.org/

Mustache：https://mustache.github.io/



**错误处理**

默认的错误处理方式和SpringMVC web相同。

通过WebExceptionHandler去处理错误。

通常注入ErrorWebExceptionHandler Bean来自定义处理错误的方式。因为WebExceptionHandler优先级比较低，也可以通过注入AbstractErrorWebExceptionHandler Bean处理错误。

默认是DefaultErrorWebExceptionHandler。

~~~java
public class CustomErrorWebExceptionHandler extends AbstractErrorWebExceptionHandler {

    // Define constructor here

    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {

        return RouterFunctions
                .route(aPredicate, aHandler)
                .andRoute(anotherPredicate, anotherHandler);
    }

}

~~~



**自定义错误页面**

配置同SpringMVC Web。



**Web过滤器**

Spring WebFlux提供了WebFilter接口实现过滤器的效果。

可以通过Ordered接口或注解@Order注解来指定过滤器的指向顺序。

| Web Filter                            | Order                          |
| :------------------------------------ | :----------------------------- |
| MetricsWebFilter(Spring Actuator)     | Ordered.HIGHEST_PRECEDENCE + 1 |
| WebFilterChainProxy (Spring Security) | -100                           |
| HttpTraceWebFilter(Spring Actuator)   | Ordered.LOWEST_PRECEDENCE - 10 |



#### JAX-RS和Jersey

作用是什么？



#### 嵌入式容器

servlet容器可以定义过滤器监听器，并作为Bean注册在Spring中。

过滤器可以通过注解@Order或实现接口Ordered来控制指向的顺序，注解通过@Bean注入不能设置。

通过FilterRegistrationBean注入Bean是另外的方式控制顺序。

顺序的值要小于等于OrderedFilter.REQUEST_WRAPPER_FILTER_MAX_ORDER。

@ServletComponentScan注解可以扫描@WebServlet, @WebFilter, @WebListener注解的类。



可以自定义Servlet的行为：

1. 端口(server.port)，绑定的地址(server.address)。
2. Session设置：持久(server.servlet.session.persistent)，过期时间(server.servlet.session.timeout)，session存储位置(server.servlet.session.store-dir)，session-cookie配置(server.servlet.session.cookie.*)。
3. 错误地址配置server.error.path。
4. SSL。
5. Http压缩



ServerProperties：server.*配置。



**程序配置**



~~~java
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Override
    public void customize(ConfigurableServletWebServerFactory server) {
        server.setPort(9000);
    }

}

~~~

TomcatServletWebServerFactory, JettyServletWebServerFactory, UndertowServletWebServerFactory

~~~java
@Bean
public ConfigurableServletWebServerFactory webServerFactory() {
    TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
    factory.setPort(9000);
    factory.setSessionTimeout(10, TimeUnit.MINUTES);
    factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notfound.html"));
    return factory;
}

~~~



### RSocket



### Security

~~~xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-security</artifactId>
</dependency>

~~~





### SQL Database

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

~~~



#### 内存数据库

SpringBoot支持自动配置的内存数据库有H2、HSQL、Derby。

spring-data-jpa内置了测试hsql。

~~~xml
<dependency>
    <groupId>org.hsqldb</groupId>
    <artifactId>hsqldb</artifactId>
    <scope>runtime</scope>
</dependency>

~~~

内存数据库的绑定方式：

1. 引入spring-boot-starter-data-jpa依赖，其引入了spring-boot-starter-jdbc，jdbc提供了HikariCP依赖。
2. DataSourceConfiguration：SpringBoot根据加载的HikariCP依赖，创建了HikariDataSource(spring.datasource.hikari)。其中DataSourceProperties配置类(DataSourceAutoConfiguration)被其它类激活，该类实现了InitializingBean接口，在属性设置完成只会，调用afterPropertiesSet()，按H2、Debry、Hsql的顺序在看是否有内存数据库相关的驱动类，如果存在则设置这个内存数据库的驱动相关信息。
3. 然后DataSourceBuilder构造器构造HikariDataSource(bind DataSourceProperties)数据源信息，spring.datasource.hikari再设置相关的数据源配置。
4. DataSourcePoolMetadataProvidersConfiguration：创建DataSourcePoolMetadataProvider对象。
5. 创建DataSourcePoolMetadata对象，后面连接池就构建完成了。



![image-20241210204255423](http://47.101.155.205/image-20241210204255423.png)

内存数据库会根据扫描到的Entity创建表。例如：https://spring.io/guides/gs/accessing-data-jpa





#### JNDI 数据源

JNDI(Java Naming and Directory Interface)Java提供的API，用于命名和目录服务。

~~~properties
spring.datasource.jndi-name=java:jboss/datasources/customers

~~~

context.xml文件。SpringBoot嵌入式容器不支持此方式启动。

~~~xml
<Context>
    <Resource name="java:jboss/datasources/customers"
              url="jdbc:oracle:thin:@//ip:port/database"
              type="com.zaxxer.hikari.HikariDataSource"
              username="username"
              password="password"
    />
</Context>

~~~



#### 普通数据库

SpringBoot支持自动配置的连接池有：HikariCP、tomcat DataSource、DBCP DataSource。

自动配置JdbcTemplate和NamedParameterJdbcTemplate，spring.jdbc.template.*配置JdbcTemplate功能。

~~~xml
<!-- tomcat 连接池依赖 -->
<dependency>
	<groupId>org.apache.tomcat</groupId>
	<artifactId>tomcat-jdbc</artifactId>
</dependency>
<!-- dbcp2连接池依赖 -->
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-dbcp2</artifactId>
</dependency>

<!-- Oracle驱动 -->
<dependency>
	<groupId>com.oracle.ojdbc</groupId>
	<artifactId>ojdbc8</artifactId>
    <version>19.3.0.0</version>
</dependency>

~~~

~~~sql
-- 自动
create table customer (id number(19,0) not null, first_name varchar2(255 char), last_name varchar2(255 char), primary key (id));

create sequence seq_customer start with 1 increment by 1;

drop table customer cascade constraints;

drop sequence seq_customer;

~~~

~~~properties
# 默认nono,内存数据库则为create-drop(根据Entity先删除后创建停止再删除表,强制停止不会指向删除)
# DataSourceSchemaCreatedEvent时间
spring.jpa.hibernate.ddl-auto=create-drop
# 配置和上面的作用一致，优先级更高
spring.jpa.properties.hibernate.hbm2ddl.auto=create-drop
# true/false EntityManager 行为
spring.jpa.open-in-view=false

# 数据库连接配置
# url指定后可以不指定驱动类名称，如果驱动为空，后续会推导。指定驱动的类必须要能被ClassLoader加载，否则启动不了。
# oracle
spring.datasource.url=jdbc:oracle:thin:@//ip:port/database
# mysql
spring.datasource.url=jdbc:mysql://ip:port/test
spring.datasource.username={username}
spring.datasource.password={password}

~~~



SpringBoot官网说加载连接池的优先级：

1. HikariCP可用则选它。
2. 否则，Tomcat DataSource可用则选它。
3. 否则，Dbcp2可用则选它。
4. spring.datasource.type指定忽略这个配置规则，因为注解@ConditionalOnProperty。

这里的优先级应该由@Import({ DataSourceConfiguration.Tomcat.class, DataSourceConfiguration.Hikari.class, DataSourceConfiguration.Dbcp2.class, DataSourceConfiguration.Generic.class, DataSourceJmxConfiguration.class })决定加载顺序。

可以Debug测试。

~~~java
// SpringBootCondition matches
classOrMethodName.endsWith("$Hikari") || classOrMethodName.endsWith("$Tomcat") || classOrMethodName.endsWith("$Dbcp2")

~~~

~~~java
// OnBeanCondition getMatchOutcome 方法
(metadata instanceof SimpleAnnotationMetadata) && (((SimpleAnnotationMetadata) metadata).getClassName().endsWith("$Hikari") || ((SimpleAnnotationMetadata) metadata).getClassName().endsWith("$Tomcat") ||  ((SimpleAnnotationMetadata) metadata).getClassName().endsWith("$Dbcp2"))

~~~



![image-20241211112902475](http://47.101.155.205/image-20241211112902475.png)

![image-20241211123546596](http://47.101.155.205/image-20241211123546596.png)





#### JPA和Spring Data JPA

JPA和Spring Data JPA

JPA(Java Persistence API)是将"Map"对象映射到关系型数据库的技术。

spring-boot-starter-data-jpa包含了spring-boot-starter-jdbc。

spring-boot-starter-jdbc提供了HikariCP依赖。

Spring Data JPA提供了基于JPA技术的实现，在SpringBoot项目可以快速应用。提供了以下依赖：

1. Hibernate：JPA的一种实现。
2. Spring Data JPA：简化的JPA的操作。
3. Spring ORMs：Spring提供ORM(映射)。

使用@Entity注解定义数据库的表，属性相当于数据库表的列。

数据库操作通过实现CityRepository 接口。可以通过方法名来生成sql查询数据。

复杂SQL可以使用@Query注解。

Spring Data JPA Repository提供了三种模式加载，defalut、defferred、lazy。通过spring.data.jpa.repositories.bootstrap-mode设置模式。



@EnableJdbcRepositories指定dao的包路径







