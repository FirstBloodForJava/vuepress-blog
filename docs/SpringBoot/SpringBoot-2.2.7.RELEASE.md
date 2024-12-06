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

spring官方提供的starter遵循命名规则spring-boot-starter-<name>，name都具有一定的含义。

也可以自定义starter，第三方的starter一般遵循<name>-spring-boot-starter命名规则。

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



## 4.特点

### 应用

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





