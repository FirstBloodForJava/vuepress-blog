## Maven切换Gradle

SpringBoot版本：1.5.7.RELEASE；

gradle版本：4.9



### gradle-init.d配置

配置maven仓库和插件的仓库。

gradle的目录或gradle wrapper下载的init.d目录下init.gradle文件内容：

~~~gradle
allprojects{
    repositories {
        mavenLocal()
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/jcenter/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
        maven { url 'https://jitpack.io/' }
    }
}
settingsEvaluated { settings ->
    settings.pluginManagement {
        repositories.clear()
        repositories {
            mavenLocal()
            maven {
				// https://maven.aliyun.com/repository/gradle-plugin/
                url 'http://192.168.27.20:8081/repository/maven-public/'
				//allowInsecureProtocol = true
            }
        }
    }
}

~~~



### 项目文件

maven配置

~~~pom
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.7.RELEASE</version>
</parent>
<dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Brixton.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
</dependencyManagement>

~~~



构建文件build.gradle

~~~gradle
// 声明Gradle使用的插件
plugins {
	id "idea"
	id "java"
	id "maven-publish"
	// SpringBoot的parent依赖
	id "org.springframework.boot" version "1.5.7.RELEASE" 
	// 类似maven的dependencyManagement依赖管理
	id "io.spring.dependency-management" version "1.0.6.RELEASE" 

}

// maven项目的groupId
group = "com.api.framework"
// maven项目的版本
version = "1.0-SNAPSHOT"
sourceCompatibility = "1.8"
targetCompatibility = 1.8

// 指定仓库地址,不指定可能出现 Cannot resolve external dependency org.springframework.boot:spring-boot-starter-web because no repositories are defined.
repositories {
	mavenLocal()
	maven { url 'https://maven.aliyun.com/repository/public/' }
	maven { url 'https://maven.aliyun.com/repository/jcenter/' }
	maven { url 'https://maven.aliyun.com/repository/google/' }
	maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
	maven { url 'https://jitpack.io/' }
}

// 指定maven的dependencyManagement,不指定可能提示: Could not find org.springframework.cloud:spring-cloud-starter-hystrix:.
dependencyManagement {
	imports {
		mavenBom "org.springframework.cloud:spring-cloud-dependencies:Brixton.RELEASE" // 引入 Spring Cloud 的 BOM
	}
}

dependencies {

	implementation ("org.springframework.boot:spring-boot-starter-web") {
		exclude group: "org.springframework.boot", module: "spring-boot-starter-tomcat"
	}

	implementation (
			"org.springframework.cloud:spring-cloud-starter-hystrix",
			"org.springframework.cloud:spring-cloud-starter-eureka",
			"org.springframework.boot:spring-boot-starter-undertow",
			"org.springframework.boot:spring-boot-starter-jdbc",
			"org.springframework.boot:spring-boot-starter-actuator",
			"org.mybatis.spring.boot:mybatis-spring-boot-starter:1.2.0",
			"com.alibaba:fastjson:1.2.83",
			"com.mangofactory:swagger-springmvc:0.9.5",
			"com.github.pagehelper:pagehelper:4.2.1",
			"org.aspectj:aspectjrt",
			"org.aspectj:aspectjtools",
			"org.aspectj:aspectjweaver",
			"org.springframework.boot:spring-boot-configuration-processor",
			"org.springframework.kafka:spring-kafka",
			"org.springframework.boot:spring-boot-starter-data-redis",
			"org.springframework.boot:spring-boot-starter-data-jpa",
			"org.projectlombok:lombok"
	)

}
// 自定义构建命令然后给包换,copy命令该版本不生效
task buildSvcJar(type: Copy) {
	dependsOn 'build' // 仅依赖于 build 任务
	doLast {
		from "build/libs/包名.jar" // 源文件路径
		into "build/" // 目标文件夹
	}
}

~~~



**setting.gradle**

~~~gradle
rootProject.name = 'gradle-project' // 设置根项目的名称

include 'module1' // 引入子项目
include 'module2' // 引入另一个子项目

~~~



### 加载步骤

1. 删除maven相关的idea缓存文件(projectName.iml)；
2. 重新打开项目，以项目中的build.gradle作为一个项目打开。



根目录右键，选择AddFrameworkSupport。

![image-20241017144833261](http://47.101.155.205/image-20241017144833261.png)





### maven多模块

maven主模块配置

~~~pom
 <modules>
 	<module>test</module>
 </modules>

~~~

对于gradle修改

项目根目录下(build.gradle同级目录)，新增settings.gradle文件。

~~~gradle
// 指定仓库地址
pluginManagement {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
    }
}
// 指定maven仓库地址
repositories {
    mavenCentral() // 使用Maven中央仓库的简写方式
    maven { url 'https://maven.aliyun.com/repository/public/' }
}


# 主模块的名称
rootProject.name = 'gradleProject'
include 'test'

~~~

