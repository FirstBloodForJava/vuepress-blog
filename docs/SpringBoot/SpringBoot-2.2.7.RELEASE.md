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
