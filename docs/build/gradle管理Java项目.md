# Gradle管理Java项目

官网文档地址：https://docs.gradle.org/current/userguide/userguide.html

## Gradle介绍

![image-20240531134245746](http://47.101.155.205/image-20240531134245746.png)

1. Project：类似模块划分
2. Build Scripts：构建Project
3. Dependency Management：依赖管理
4. Tasks：(build.gradle)一个独立的工作单元，可以执行特定的操作，如编译代码、运行测试、打包应用程序等
5. Plugins：扩展gradle的功能，并可以选择性的向项目插入Tasks

## project structure(项目结构)

![Gradle项目结构](http://47.101.155.205/image-20240531135218645.png)

1. gradle wrapper：gradle wrapper、gradle和gradle.bat
2. setting.gradle：项目关系，单个项目可以不需要，多个项目必须有
3. build.gradle：构建脚本及项目相关信息
4. src源码



## build.gradle文件

指定项目相关的信息

![image-20240531141337018](http://47.101.155.205/image-20240531141337018.png)



单模块SpringBoot的build.gradle内容，无构建脚本：

~~~gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.2.7.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

// 项目信息
group = 'com.example'
version = '0.0.1-SNAPSHOT'

// 指定远程仓库配置
repositories {
	maven { url 'https://maven.aliyun.com/repository/maven-public/' }
	mavenCentral()
}

// 类似maven的全局依赖管理
dependencyManagement {
    imports {
    	// 引入spring cloud的相关依赖管理
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Brixton.RELEASE'
        // 引入spring boot的相关依赖管理
        mavenBom 'org.springframework.boot:spring-boot-dependencies:2.2.7.RELEASE'
    }
}

// 导入依赖
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

// 构建成可执行jar包，添加org.springframework.boot插件且启动才可配置
bootJar {
    classifier = 'boot'
    // 可执行main的类全路径名称
    mainClassName = 'com.oycm.SpringBootExample'
}


~~~





### plugins

~~~gradle
plugins {
    id 'java'
    // 表示不应用插件功能,不能构建成可执行的jar文件
    id 'org.springframework.boot' version '2.2.7.RELEASE' apply false
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

~~~





### dependencies依赖

~~~gradle
dependencies {
        // 引入依赖的方式
        // implementation 声明在编译时需要但不需要暴露给使用此模块的编译器的依赖
        // compileOnly 声明只在编译时需要,但在运行时不需要的依赖,例如：lombok
        // runtimeOnly 声明只在运行时需要,但在编译时不需要的依赖,例如：JDBC驱动
        // testImplementation 声明只在测试编译和运行时需要的依赖
        // testCompileOnly 只在测试编译时需要的依赖,而在测试运行时不需要
        // testRuntimeOnly 测试运行时需要的依赖,而在测试编译时不需要
        // annotationProcessor 声明注解处理器的依赖,只在编译期间使用,生成代码或其他编译时工件
        // api 用于声明在编译时和运行时都需要的依赖,并且这些依赖对使用此模块的编译器是可见的
        // compileClasspath 配置用于定义编译时的类路径,但不会影响运行时的类路径
        // runtimeClasspath 配置用于定义运行时的类路径,但不会影响编译时的类路径
        // compile 在编译时和运行时都需要的依赖,并且这些依赖对使用此模块的编译器是可见的,已被implementation和api取代
        // runtime 声明了在运行时需要的依赖,已被runtimeOnly取代
        testImplementation 'org.junit.jupiter:junit-jupiter:5.10.2'
        compileOnly('org.projectlombok:lombok:1.18.32')
        annotationProcessor 'org.projectlombok:lombok:1.18.32'
        testCompileOnly 'org.projectlombok:lombok:1.18.32'
        testAnnotationProcessor 'org.projectlombok:lombok:1.18.32'
}

~~~



### 全局依赖管理定义

参考reactor项目文档：https://projectreactor.io/docs/netty/release/reference/getting-started.html

~~~gradle
dependencies {
    // import a BOM
    implementation platform('io.projectreactor:reactor-bom:2024.0.4') 

    // define dependencies without versions
    implementation 'io.projectreactor.netty:reactor-netty-core' 
    implementation 'io.projectreactor.netty:reactor-netty-http'
}

~~~

~~~xml
<dependencyManagement> 
    <dependencies>
        <dependency>
            <groupId>io.projectreactor</groupId>
            <artifactId>reactor-bom</artifactId>
            <version>2024.0.4</version> 
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.projectreactor.netty</groupId>
        <artifactId>reactor-netty-core</artifactId> 
        
    </dependency>
</dependencies>
<dependencies>
    <dependency>
        <groupId>io.projectreactor.netty</groupId>
        <artifactId>reactor-netty-http</artifactId>
    </dependency>
</dependencies>

~~~





## 命令

### build(构建)

需要build.gradle中有mainClass配置

![image-20240531135718546](http://47.101.155.205/image-20240531135718546.png)



~~~bash
# 安装gradle
gradle build

# gradle wrapper
gradlew build 		# linux
gradlew.bat build 	# windows

~~~



### dependencies

查看项目的依赖信息，类似maven的 mvn dependence:tree命令

~~~bash
# 使用gradle wrapper的命令
# 单模块项目,打印所有环境的依赖信息
.\gradlew.bat :dependencies

.\gradlew.bat :dependencies --configuration compileClasspath

# --configuration compileClasspath 指定一个环境(compileClasspath)的依赖信息

# 多模块项目,查询子project的依赖信息
.\gradlew.bat :<project>:dependencies

# 输出指定环境(compileClasspath)依赖信息
.\gradlew.bat :<project>:dependencies --configuration compileClasspath

# 输出指定环境(compileClasspath)依赖信息到文件
.\gradlew.bat :<project>:dependencies --configuration compileClasspath > dependencies.txt

~~~

- \\-：表示同级目录最后一个。
- ->：表示实际使用的版本。
- (*)：表示前面已经输出过该依赖。

![image-20250111112910025](http://47.101.155.205/image-20250111112910025.png)



### 自定义构建命令(task)

~~~gradle
// root项目下的build.gradle配置
def buildProjectName = "app"
// 在app项目构建之后
// 将app/build/libs/app.jar复制到build/dev、build/test、build/prod
// 将app/build/dist/springBoot.sh复制到build/dev、build/test、build/prod
// 将app/build/dist/springBoot.bat复制到build/dev、build/test、build/prod ...
// 将app/build/dist/application-dev.yml复制到复制到build/dev；app/build/dist/application-test.yml复制到复制到build/test ...
// 将上面所复制的文件,文件名-dev、-test、-prod的替换成空串
task buildJar(dependsOn: buildProjectName + ':build') doLast {
    ["build/dev", "build/test", "build/prod"].each { dest ->
        copy {
            from buildProjectName + "/build/libs/" + buildProjectName + ".jar"
            into dest
            from buildProjectName + "/dist/springBoot.sh"
            into dest
            from buildProjectName + "/dist/springBoot.bat"
            into dest
            from buildProjectName + "/dist/startGatewayJavaFx.bat"
            into dest
            from(buildProjectName + "/dist/application-".concat(dest.replace('build/', '')).concat(".yml"))
            into dest
            rename { String fileName ->
                fileName.replace('-'.concat(dest.replace('build/', '')), '')
            }
        }
    }
    file(buildProjectName + "/build").deleteDir()
}

~~~




## Gradle命令创建项目

~~~bash
gradle init --type java-application  --dsl groovy

~~~

![image-20240531143344793](http://47.101.155.205/image-20240531143344793.png)

![image-20240531143356538](http://47.101.155.205/image-20240531143356538.png)













## IDEA新建gradle项目

![image-20240531110355797](http://47.101.155.205/image-20240531110355797.png)

关联远程git仓库

![image-20240531111247750](http://47.101.155.205/image-20240531111247750.png)