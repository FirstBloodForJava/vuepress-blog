# gradle

## 安装

需要有Java环境

下载地址：https://gradle.org/releases/

8.5版本仅有二进制文件：https://gradle.org/next-steps/?version=8.5&format=bin

8.5版本包含文档和源码及二进制文件：https://gradle.org/next-steps/?version=8.5&format=all



### Linux安装

官网文档：https://docs.gradle.org/8.5/userguide/installation.html#ex-installing-manuall

~~~bash
# 新建目录
mkdir /opt/gradle
# 将压缩包上传到该目录下,在压缩文件目录下,执行接所以命令
# 将文件解压缩到/opt/gradle目录下
unzip -d /opt/gradle gradle-8.5-bin.zip

# 查看文件
ls /opt/gradle/gradle-8.5
LICENSE  NOTICE  bin  getting-started.html  init.d  lib  media

# 配置环境变量,即上面文件解压的路径到bin目录
export PATH=$PATH:/opt/gradle/gradle-8.5/bin

~~~



### Windows安装

新建一个gradle安装目录：G:\environment\gradle；

双击打开下载的压缩包，将打开的里面的gradle-\*.*文件拖拽复制到G:\environment\gradle目录中；

配置环境变量：

1. GRADLE_HOME
2. GRADLE_USER_HOME

![image-20240110152021864](http://47.101.155.205/image-20240110152021864.png)









## Gradle Wrapper

~~~bash
# 在Gradle项目中生成或更新Gradle Wrapper,用于下载和运行特定 Gradle 版本的脚本文件
./gradlew wrapper --gradle-version=8.5 --distribution-type=bin

./gradlew wrapper --gradle-version=6.6.1 --distribution-type=bin

# 配置gradle之后,可以不用安装gradle也能构建项目
./gradlew tasks Downloading https://services.gradle.org/distributions/gradle-6.6.1-bin.zip

./gradlew tasks Downloading http://192.168.27.20:8081/repository/gradle-distribution/gradle-6.6.1-bin.zip

~~~

![image-20240110162757142](http://47.101.155.205/image-20240110162757142.png)

3种使用的方式：

1. 新建Gradle项目，添加一个Gradle Wrapper；
2. 使用现有的Gradle Wrapper运行项目；
3. 通过升级Gradle Wrapper来达到升级Gradle版本的效果





### 1.添加Gradle Wrapper

新建的项目，如果没有Gradle Wrapper，可以通过gradle wrapper给当前项目添加Gradle Wrapper(需要安装Gradle)。可以将这个生成的文件添加到git版本控制上面，就能实现Gradle构建版本一致。

gradle/wrapper/gradle-wrapper.properties文件存储相关信息



~~~properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
#distributionUrl=file:///D:/environment/zip/gradle-8.5-bin.zip 指定本地文件地址
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

--gradle-distribution-url=https://services.gradle.org/distributions/gradle-7.6-bin.zip 

~~~

可以通过参数控制Gradle Wrapper生成的情况：

- --gradle-version：控制版本，可选项：latest、release-candidate、nightly、release-nightly、具体版本；
- --distribution-type：gradle版本类型：bin-压缩版、all，默认bin；
- --gradle-distribution-url：可以指定远程的gradle的下载地址及版本，会将properties文件中的值替换，这个会让上面两个参数失效；
- --gradle-distribution-sha256-sum：用于验证下载的Gradle发行版的SHA256哈希和；
- --network-timeout：下载Gradle发行版本的超时时间，单位ms，默认10000；
- --no-validate-url：禁用对配置的分发URL的验证，URL的有效性校验；
- --validate-url：启用对配置的分发URL的验证，默认开启；

the URL is validated by sending a HEAD request in the case of the https scheme or by checking the existence of the file in the case of the file scheme.



文件的作用：

- gradle-wrapper.jar：包含了下载Gradle发行版的代码。
- gradle-wrapper.properties：Wrapper运行时的配置文件，控制gradle下载的版本及地址，本机的位置等；更多的配置如：配置代理，需要去不同的配置文件。官网文档：https://docs.gradle.org/8.5/userguide/build_environment.html#sec:gradle_configuration_properties
- gradlew、gradlew.bat：用于使用Gradle Wrapper执行构建的linux或Windows脚本。有配置Gradle Wrapper的情况下，不需要安装Gradle环境。



~~~bash
# 生成当前gradle版本的Gradle Wrapper
gradle wrapper

# 执行失败，可能是构建过程下载文件超时
gradle wrapper --gradle-distribution-url=https://services.gradle.org/distributions/gradle-7.6-bin.zip

# 换成本地下载的文件，就可以
gradle wrapper --gradle-distribution-url=file:///G:/environment/gradle-7.6-all.zip

# 生成默认版本的Gradle Wrapper
gradle wrapper

~~~



![image-20240111110535371](http://47.101.155.205/image-20240111110535371.png)





### 2.使用Gradle Wrapper

使用Wrapper方式构建是值得推荐的，这个能确保构建的过程可靠的、可控的、标准的。使用Wrapper构建看起来就像使用安装的Gradle构建一样。可以根据操作系统来选中gradlew或gradlew.bat而不是gradle命令。

![image-20240111112032151](http://47.101.155.205/image-20240111112032151.png)

如果在系统上没有安装可用的gradle版本，Wrapper将会根据gradle-wrapper.properties的配置去下载文件，将其存储在本地。只要配置文件中的distributionUrl没有发送改变，后续的构建调用就会复用之前下载的gradle版本。



### 3.升级Gradle Wrapper

方式：

1. 修改gradle-wrapper.properties中的distributionUrl的版本；
2. 通过执行gradle wrapper指定具体的版本(如果gradle-wrapper.jar有优化也能获取到)；



~~~bash
# 将Gradle Wrapper升级到最新版本(没有安装Gradle也能通过这个命令升级)
./gradlew.bat wrapper --gradle-version latest

# 将Gradle Wrapper升级到指定版本
./gradlew.bat wrapper --gradle-version 8.5

# 查看Gradle的版本,根据Gradle Wrapper版本来的
./gradlew.bat --version

~~~

![image-20240111133224083](http://47.101.155.205/image-20240111133224083.png)

通过这个./gradlew.bat会面临没有代理导致gradle的jar包无法下载的问题，配置代理之后也会出现Gradle Wrapper构建失败的(猜测会不会是多次构建，下载，ip被屏蔽)，经过测试发起确实如此

![image-20240111133456579](http://47.101.155.205/image-20240111133456579.png)

![下载失败提示2](http://47.101.155.205/image-20240111141317154.png)

可以通过给自动下载的gradle配置代理，实现下载依赖，gradle-\*.*/init.d/目录下新建init.gradle内容如下：

~~~gradle
// 全局的Maven仓库
allprojects{
    repositories {
        mavenLocal()
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/jcenter/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
        // gradle下载仓库
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
        maven { url 'https://jitpack.io/' }
    }
}
settingsEvaluated { settings ->
    settings.pluginManagement {
    	// 清除了默认的插件仓库配置
        repositories.clear()
        repositories {
            mavenLocal()
            // 可以多个地址
            maven {
                url 'https://maven.aliyun.com/repository/gradle-plugin/'
            }
        }
    }
}

~~~



![image-20240111133847641](http://47.101.155.205/image-20240111133847641.png)

![image-20240111133943968](http://47.101.155.205/image-20240111133943968.png)



#### 下载被屏蔽测试

通过将配置文件换成gradle仓库，发现会提示要换成https协议，通过allowInsecureProtocol = true可以解决；插件找不到，将下面换的地址换成aliyun的gradle插件地址，发现就能下载了。



#### 协议不支持报错

![image-20240111151523080](http://47.101.155.205/image-20240111151523080.png)



**找不到id: 'org.springframework.boot', version: '3.1.7'这个插件**

![image-20240111150949507](http://47.101.155.205/image-20240111150949507.png)



> 最终配置

![image-20240111145416733](http://47.101.155.205/image-20240111145416733.png)



>  构建成功

![image-20240111150358444](http://47.101.155.205/image-20240111150358444.png)





### 4.自定义Gradle Wrapper

https://docs.gradle.org/8.5/dsl/org.gradle.api.tasks.wrapper.Wrapper.html

buidl.gradle文件指定配置的Gralde Wrapper的版本类型，这样就不用在构建时通过参数指定

~~~gradle
tasks.named('wrapper') {
    distributionType = Wrapper.DistributionType.ALL
}

~~~





#### 下载认证

Gradle Wrapper可以使用Http基本身份验证从服务器下载Gradle压缩包。可以在私人的Gradle仓库设置身份认证。有两个方式进行认证：

1. 作为系统配置gradle.properties，放在特定的位置；
2. 在distributionUrl路径中配置身份验证

官网提示：HTTP 基本身份验证只能与 HTTPS URL 一起使用，而不能与普通 HTTP URL 一起使用。使用基本身份验证时，用户凭据以明文形式发送。



> gradle.propertis

gradle.properties相关文档：https://docs.gradle.org/8.5/userguide/build_environment.html#sec:gradle_configuration_properties

~~~properties
systemProp.gradle.wrapperUser=username
systemProp.gradle.wrapperPassword=password

~~~



> distributionUrl

```properties
distributionUrl=https://username:password@somehost/path/to/gradle-distribution.zip

```



#### Gradle Wrapper代理

官网文档：https://docs.gradle.org/8.5/userguide/networking.html#sec:accessing_the_web_via_a_proxy



##### SHA-256校验

可以通过命令参数或者wrapper.properties的方式配置Hash和校验

~~~properties
distributionSha256Sum=371cb9fbebbe9880d147f59bab36d61eee122854ef8c9ee1ecf12b82368bcf10

~~~

命令行参数：--gradle-distribution-sha256-sum





### 5.校验Gradle的完整性



手动校验Hash和

~~~bash
# linux
cd gradle/wrapper

curl --location --output gradle-wrapper.jar.sha256 https://services.gradle.org/distributions/gradle-{gradleVersion}-wrapper.jar.sha256

echo "gradle-wrapper.jar" >> gradle-wrapper.jar.sha256

sha256sum --check gradle-wrapper.jar.sha256

# mac
cd gradle/wrapper

curl --location --output gradle-wrapper.jar.sha256 https://services.gradle.org/distributions/gradle-{gradleVersion}-wrapper.jar.sha256

echo "gradle-wrapper.jar" >> gradle-wrapper.jar.sha256

shasum --check gradle-wrapper.jar.sha256

# Windows
expected = Invoke-RestMethod -Uri https://services.gradle.org/distributions/gradle-8.5-wrapper.jar.sha256

actual = (Get-FileHash gradle\wrapper\gradle-wrapper.jar -Algorithm SHA256).Hash.ToLower()

@{$true = 'OK: Checksum match'; $false = "ERROR: Checksum mismatch!`nExpected: $expected`nActual:   $actual"}[$actual -eq $expected]

~~~

获取hash和

~~~bash
# linux
sha256sum gradle/wrapper/gradle-wrapper.jar

# mac
shasum --algorithm=256 gradle/wrapper/gradle-wrapper.jar

# Windows
(Get-FileHash gradle\wrapper\gradle-wrapper.jar -Algorithm SHA256).Hash.ToLower()

~~~





## 首次下载gradle wrapper失败解决方式

当前项目指定的gradle-wrapper版本是7.2，首次就没有把gradle7.2版本下载成功，这个时候如果要通过./gradlew.bat wrapper升级gradle版本，首先会去下载gradle7.2版本。

![image-20240121155842162](http://47.101.155.205/image-20240121155842162.png)



~~~bash
# 会在当前项目下生成一个gradle wrapper当前gradle版本的
gradle wrapper

gradle wrapper --gradle-version 7.2

~~~

![image-20240121162823331](http://47.101.155.205/image-20240121162823331.png)



~~~bash
# 尝试下载,发现在当前gradle下配置的仓库代理没有生效
./gradlew wrapper --gradle-version=7.2

~~~

![image-20240121163244863](http://47.101.155.205/image-20240121163244863.png)



### 1.使用代理

要解决下载超时问题，可以通过让下载走代理来解决：在gradle-wrapper.properties中配置了代理

~~~properties
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=33210
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=33210

~~~

![image-20240121163741357](http://47.101.155.205/image-20240121163741357.png)

发现在gradle-wrapper.proper添加了上面的配置文件之后，还是提示下载连接超时，通过jps查询这个下载启动JVM进程id，使用jinfo -sysprops <vimid\>发现System的properties中没有代理这些属性(不知道是不是构建工具设置未选择配置)。

**这里没生效，可能是因为选择的gradle来源不对，应该选用gradle-wrapper.properties file**

![image-20240121212409138](http://47.101.155.205/image-20240121212409138.png)



### 2.环境变量配置代理

**通过配置环境变量的方式加入这个系统参数，发现还是不能下载，此时配置已经加载到JVM进程中了。**

不能下载的原因是没有配置https的代理，因为下载的地址是https。

![image-20240121173653361](http://47.101.155.205/image-20240121173653361.png)

~~~conf
_JAVA_OPTIONS

-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=33210 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=33210

~~~

![image-20240121204701337](http://47.101.155.205/image-20240121204701337.png)

![image-20240121204621509](http://47.101.155.205/image-20240121204621509.png)



### 3.本地替换

也可以手动先下载文件，在配置下载地址指向本地才能解决

~~~properties
distributionUrl=file:///D:/environment/zip/gradle/gradle-7.2-bin.zip

~~~



![image-20240121174029033](http://47.101.155.205/image-20240121174029033.png)





### 4.使用国内镜像

地址替换成国内镜像地址

~~~properties
distributionUrl=https://mirrors.cloud.tencent.com/gradle/gradle-6.6.1-bin.zip

~~~



### 5.wrapper 配置镜像

在一个已经下载好gradle wrapper的目录的gradle版本的init.d目录中配置一个init.gradle文件，内容包含你的镜像内容。执行命令，升级gradle版本，下载对应的gradle wrapper，如：

~~~bash
# 当前gradle 7.2版本的gradle wrapper已下载好,init.d文件中添加好配置文件,执行命令
./gradlew.bat wrapper --gradle-version 8.4 # 将gradle wrapper升级到8.4

# 再执行
./gradlew.bat wrapper

# 如果这样不能下载,建议将gradle环境变量GRADLE_HOME目录中的init.d的文件里面也添加上
# 如果短时间内，多次从镜像下载这个gradle压缩包，镜像可能会对你的ip做一些限制，导致下载不了

~~~



init.d目录的init.gradle配置：

~~~gradle
// 全局的Maven仓库
allprojects{
    repositories {
        mavenLocal()
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/jcenter/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
        // gradle下载仓库
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
        maven { url 'https://jitpack.io/' }
        maven { 
        	url 'https://127.0.0.1:8081/repository/maven-public/' 
			// 允许http协议
			allowInsecureProtocol = true
        }
    }
}
settingsEvaluated { settings ->
    settings.pluginManagement {
    	// 清除了默认的插件仓库配置
        repositories.clear()
        repositories {
            mavenLocal()
            // 可以多个地址
            maven {
                url 'https://maven.aliyun.com/repository/gradle-plugin/'
            }
            maven { 
        		url 'https://127.0.0.1:8081/repository/maven-public/' 
				allowInsecureProtocol = true
        	}
        }
    }
}


~~~





## JitPack 

`https://jitpack.io/` 是一个基于 Git 的 Maven 仓库服务，它的作用是允许开发者将他们的 GitHub 项目转换为 Maven 仓库中的依赖。这为那些没有将其项目发布到 Maven 中央仓库或其他公共 Maven 仓库的开发者提供了一个简便的方式分享和使用他们的库。

假设有一个名为 "MyLibrary" 的 Java 库，该库托管在 GitHub 上，GitHub 地址为`https://github.com/username/MyLibrary`。此库有一个标签为 "v1.0.0" 的发布版本。

如果开发者想在他们的项目中使用 "MyLibrary" 的 "v1.0.0" 版本作为依赖项，他们可以使用 JitPack。在项目的 `build.gradle` 中，他们可以添加以下配置：

~~~gradle
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.username:MyLibrary:v1.0.0'
}

~~~

这里，`https://jitpack.io` 被添加到 Maven 仓库列表中。然后，`implementation 'com.github.username:MyLibrary:v1.0.0'` 指定了要使用的库及其版本。JitPack 将会按需构建并提供 "MyLibrary" 版本为 "v1.0.0" 的 JAR 文件。

这样，开发者就可以方便地将 GitHub 上的项目作为 Maven 仓库中的依赖项引入到他们的项目中，而无需将库发布到其他 Maven 仓库。



## Java发起Http请求

### 未设置代理访问www.google.com



~~~java
package com.oycm.spring_mvc_starter.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpRequestUtil {

    public static void main(String[] args) throws Exception {
        // 目标 URL
        String url = "http://www.google.com";

        // 创建 URL 对象
        URL apiUrl = new URL(url);

        // 打开 HTTP 连接
        HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();

        // 设置请求方法（GET、POST 等）
        connection.setRequestMethod("GET");

        // 获取响应代码
        int responseCode = connection.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        // 读取响应内容
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        StringBuilder response = new StringBuilder();

        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        // 输出响应内容
        System.out.println("Response Content:\n" + response.toString());

        // 关闭连接
        connection.disconnect();
    }
}

~~~



![image-20240121165021306](http://47.101.155.205/image-20240121165021306.png)



### 设置http代理访问www.google.com

~~~java
System.setProperty("http.proxyHost","127.0.0.1");
System.setProperty("http.proxyPort","33210");

~~~



![image-20240121165226467](http://47.101.155.205/image-20240121165226467.png)

发现设置代理之后，读取响应流会卡住。这个时候也可以来测试下System的properties中有没有加上这个代理参数，通过命令jinfo -sysprops <vimid\>来查看。

~~~bash
# eg
jinfo -sysprops 6088

~~~



![image-20240121170718122](http://47.101.155.205/image-20240121170718122.png)





