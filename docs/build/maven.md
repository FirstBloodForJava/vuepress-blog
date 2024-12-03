# maven



## 安装

下载最新版本官网地址：https://maven.apache.org/download.cgi

下载旧版本地址：https://archive.apache.org/dist/maven/maven-3/

![maven下载链接](http://47.101.155.205/image-20230627211207603.png)

![image-20230627211452011](http://47.101.155.205/image-20230627211452011.png)

安装要求：需要有java环境(JAVA_HOME环境变量)。

~~~bash
# 解压缩安装
unzip <file_name>.zip

cd <file_name>/bin

mvn -v

~~~

配置maven环境变量：

MAVEN_HOME = G:\environment\maven\apache-maven-3.6.3

Path = %MAVEN_HOME%\bin





## 配置

maven的配置有两个地方：

1. maven的安装路径：${maven.home}(MAVEN_HOME环境变量)/conf/settings.xml；
2. 用户地址：${user.home}/.m2/settings.xml。

安装路径下的conf/settings.xml是一个配置模板，里面的很多内容都是注释的。

xml配置中支持的标签。

~~~xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <offline/>
  <pluginGroups/>
  <servers/>
  <mirrors/>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>

~~~



### 简单配置

1. localRepository：默认${user.home}/.m2/repository，maven下载依赖的本地存储路径，也叫本地仓库地址。
2. interactiveMode：默认true。
3. offline：默认false。true表示离线模式构建，false表示需要连接网络。





### pluginGroups

插件组的元素：默认包含org.apache.maven.plugins和org.codehaus.mojo。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <pluginGroups>
    <pluginGroup>org.eclipse.jetty</pluginGroup>
  </pluginGroups>
  ...
</settings>

~~~

![image-20241202154628909](http://47.101.155.205/image-20241202154628909.png)



### servers

和远程仓库需要认证才配置。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <servers>
    <server>
      <id>server001</id>
      <username>my_login</username>
      <password>my_password</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <passphrase>some_passphrase</passphrase>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
  ...
</settings>

~~~

1. id：与repository/mirror的id相匹配；
2. username，password：认证的账号密码；
3. privateKey, passphrase：认证使用；
4. filePermissions, directoryPermissions：权限。



### mirros

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <mirrors>
    <mirror>
      <id>planetmirror.com</id>
      <name>PlanetMirror Australia</name>
      <url>http://downloads.planetmirror.com/pub/maven2</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  ...
</settings>

~~~

镜像配置：

1. id：唯一标识，和server的id匹配时，则使用相应的信息。
2. name：镜像的名称。
3. url：镜像的url地址。
4. mirrorOf：相当于mirror的id标识，不能和id同名。标识需要使用此镜像的仓库。重复后面的不生效。值为central表示指向中央仓库https://repo.maven.apache.org/maven2的地址被修改。



~~~xml
<mirror>
	<id>alimaven</id>
	<name>aliyun maven</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
	<!-- mirrorOf类型相同，只有前面的这个类型会生效 -->
	<mirrorOf>central</mirrorOf>
</mirror>

~~~

*表示所有都映射到该镜像。

~~~xml
<mirror>
	<id>alimaven</id>
	<name>aliyun maven</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
	<!-- mirrorOf类型相同，只有前面的这个类型会生效 -->
	 <mirrorOf>*</mirrorOf>
</mirror>

~~~

mirrorOf支持的内容：

1. *：匹配所有。
2. external:*：所有的都是在线的。
3. repo,repo1：repo或repo1。
4. *,!repo1：匹配所有的除了repo1



### proxies

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <proxies>
    <proxy>
      <id>myproxy</id>
      <active>true</active>
      <protocol>http</protocol>
      <host>127.0.0.1</host>
      <port>33210</port>
      <username>proxyuser</username>
      <password>somepassword</password>
      <nonProxyHosts>*.google.com|ibiblio.org</nonProxyHosts>
    </proxy>
  </proxies>
  ...
</settings>

~~~

1. id：唯一标识。
2. active：true标识激活，可以有多个代理，但是只能有一个激活。
3. protocol, host, port：协议，主机，端口。
4. username, password：需要认证的账号密码。
5. nonProxyHosts：不用代理的host



### profiles

有属性id、activation、repositories、properties、pluginRepositories。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <profiles>
    <profile>
      <id>test</id>
      <activation>
        <activeByDefault>false</activeByDefault>
        <jdk>1.5</jdk>
        <os>
          <name>Windows XP</name>
          <family>Windows</family>
          <arch>x86</arch>
          <version>5.1.2600</version>
        </os>
        <property>
          <name>mavenVersion</name>
          <value>2.0.3</value>
        </property>
        <file>
          <exists>${basedir}/file2.properties</exists>
          <missing>${basedir}/file1.properties</missing>
        </file>
      </activation>
      ...
    </profile>
  </profiles>
  ...
</settings>

~~~





### activeProfiles

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  ...
  <activeProfiles>
    <activeProfile>env-test</activeProfile>
  </activeProfiles>
</settings>

~~~

激活一组profile。





## maven使用

参考文档：https://maven.apache.org/pom.html#Introduction



idea配置项目的maven安装环境、maven配置文件地址、本地仓库地址。

![image-20230415194900648](http://47.101.155.205/image-20230415194900648.png)

.mvn/maven.config作用：用于配置Maven构建过程中的一些选项，包括JVM选项、Maven选项等。开启这个文件后，您可以使用Maven构建时在命令行中传递这些选项，而不需要在命令行中手动指定它们。

请注意，`.mvn/maven.config`文件只对使用Maven命令行构建的项目有效，而对于使用IDEA的内置构建系统构建的项目无效。

~~~bash
mvnw clean install是Maven构建的一条命令，具有以下作用：
清理目标文件夹（clean）：在执行Maven构建之前，先清理掉之前构建生成的目标文件夹，以确保构建过程从一个干净的状态开始。
编译项目代码（compile）：编译项目中的Java源代码，并将编译后的类文件输出到target目录下。
运行测试（test）：执行项目中的单元测试，并生成测试报告。
打包（package）：将项目的编译结果打包成一个可执行的JAR或WAR文件。
安装（install）：将项目的构建结果安装到本地Maven仓库中，以便其他项目可以引用它。
通过执行mvnw clean install命令，您可以在本地构建和安装Maven项目，以便在其他项目中使用它。这个命令还可以帮助您检查项目中的代码和单元测试是否正确，以及构建结果是否符合预期。

~~~



项目的maven配置标签说明：https://maven.apache.org/ref/3.9.9/maven-model/maven.html#class_exclusion



### dependencies

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <type>jar</type>
      <scope>test</scope>
      <optional>true</optional>
    </dependency>
    ...
  </dependencies>
  ...
</project>

~~~

1. groupId, artifactId, version：确定一个依赖的版本。
2. type：对应依赖的类型，默认是jar。
3. scope：指定依赖的传递性。编译(compile)、测试(test)、运行(runtime)，有5种范围：
   1. compile：默认范围。该依赖会传播到依赖项目。
   2. provided：编译和测试时有效，但是在容器中运行时提供，不具备传递性。
   3. runtime：不是编译所需要的，当是运行是必须的，例如驱动依赖。
   4. test：只在测试阶段有效，不包含在最终打包文件，不具备传递性。
   5. system：从本地系统获取。
4. systempath：仅在scope配置是system使用，其它情况是无效的。地址必须是绝对路径，会在本地路径查找对应的jar包。
5. optional：默认值false，表示该项目引入的依赖具有传递性。true表示不具备传递性，这也是许多spring-boot-starter可拔插就是使用了该选项。



![image-20241202172001293](http://47.101.155.205/image-20241202172001293.png)



### dependencyManagement

依赖管理，父项目定义好依赖的版本，当前或子模块使用依赖可以不用指定版本，整个项目的依赖也便于管理。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <parent>
    <groupId>com.test</groupId>
    <version>1.0.0</version>
    <artifactId>parent</artifactId>
  </parent>
  <groupId>com.test</groupId>
  <artifactId>bom</artifactId>
  <version>1.0.0</version>
  <packaging>bom</packaging>
  <properties>
    <project1Version>1.0.0</project1Version>
    <project2Version>1.0.0</project2Version>
  </properties>
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>com.test</groupId>
        <artifactId>project1</artifactId>
        <version>${project1Version}</version>
      </dependency>
      <dependency>
        <groupId>com.test</groupId>
        <artifactId>project2</artifactId>
        <version>${project2Version}</version>
      </dependency>
    </dependencies>
  </dependencyManagement>
 </project>

~~~





### exclusions

引入依赖spring-boot-starter-web，排除里面的依赖spring-boot-starter-tomcat、spring-boot-starter-logging。**只会排除spring-boot-starter-web中引入的传递依赖，在其它地方引入的依赖无法排除。**

可以使用通配符*，排除这个依赖所有的传递依赖。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
	<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-logging</artifactId>
                </exclusion>
            </exclusions>
	</dependency>
  ...
</project>

~~~



### Inheritance(继承)

对于父项目或多模块项目，其packaging的类型要求为pom。表示这个项目只是一个管理工具，而不会独特的项目制品。使用mvn install将这个项目打包成pom制品。

**packaging不会被继承，默认值是jar。**

![image-20241203134437005](http://47.101.155.205/image-20241203134437005.png)

![image-20241203134603496](http://47.101.155.205/image-20241203134603496.png)

spring-boot-starter-parent就是通过packaging为pom来统一管理的所有依赖(只能用来传递依赖)。

spring-boot-starter-*相关starters没有使用pom来管理依赖，因为pom的局限性，只能传递依赖，不能额外的文件和资源。idea中引入的pom中没有在external libraries中没有显示，但是通过pom能访问到(gradle就访问不到)。

![image-20241203140454455](http://47.101.155.205/image-20241203140454455.png)



父模块中能被继承的元素：

![image-20241203142944902](http://47.101.155.205/image-20241203142944902.png)



~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  	<parent>
    	<groupId>org.codehaus.mojo</groupId>
    	<artifactId>my-parent</artifactId>
    	<version>2.0</version>
    	<relativePath>../my-parent</relativePath>
  	</parent>
  	<artifactId>my-project</artifactId>
</project>

~~~

relativePath元素不是必须，他会优先根据这个地址查找父级的pom文件，然后再从远程仓库或本地残酷查找。



### 多模块

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  
    <modelVersion>4.0.0</modelVersion>
  	<groupId>org.codehaus.mojo</groupId>
  	<artifactId>my-parent</artifactId>
  	<version>2.0</version>
  	<packaging>pom</packaging>
  
    <modules>
        <module>my-project</module>
        <module>another-project</module>
        <module>third-project/pom-example.xml</module>
    </modules>
</project>

~~~

modeles直接没有顺序要求，子模块要根据相对路径指向父模块。



### properties

配置属性的值名称为X，可以在maven中通过${X}来引用。也可以作为插件的默认值。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  	...
  	
    <properties>
    	<maven.compiler.source>1.8</maven.compiler.source>
    	<maven.compiler.target>1.8</maven.compiler.target>
    	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding> 
    	<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        
        <kafka.version>2.3.2</kafka.version>
        
  	</properties>
  	...
</project>

~~~

${}不同的表达式不用有不同的作用：

1. evn.X：表示读取环境变量X的值。虽然Windows的环境变量不区分大小写，例如%JAVA_HOME%和%java_home%效果相同，但是${env.JAVA_HOME}和${java_home}结果会不同。
2. project.X：project.build.sourceEncoding表示标签对的值的value。
3. setting.X：同上。
4. Java系统属性的key，java.lang.System.getProperties()支持的key，例如${java.home}。
5. 普通属性访问：${kafka.version}。





### build-resources

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<build>
    	...
		<resources>
			<resource>
                <targetPath>META-INF/plexus</targetPath>
                <filtering>false</filtering>
                <directory>${project.basedir}/src/main/plexus</directory>
                <includes>
                    <include>configuration.xml</include>
                </includes>
                <excludes>
                    <exclude>**/*.properties</exclude>
                </excludes>
            </resource>
        </resources>
        
        <testResources>
      		...
        </testResources>
    	
        ...
  </build>
</project>

~~~

resources：定义一系列过滤资源resource的处理。

targetPath：资源的目标路径，默认是jar的根路径下。上面指定在根路径下的META-INF/plexus中。

filtering：true/false。默认false。true表示匹配的资源${X}的值会根据读取的值替换。

directory：定义资源所在未知。默认是${project.basedir}/src/main/resources。

includes：包含的一组匹配文件资源配置。

excludes：排除的资源配置，如果include和excludes冲突，则excludes优先。

testResources：测试资源，默认是${project.basedir}/src/test/resources。



### repositories

默认从https://repo.maven.apache.org/maven2/中央仓库下载依赖。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  
    ...
  	<repositories>
    	<repository>
      		<releases>
        		<enabled>false</enabled>
      		</releases>
      		
            <snapshots>
        		<enabled>true</enabled>
        		<updatePolicy>always</updatePolicy>
        		<checksumPolicy>fail</checksumPolicy>
      		</snapshots>
            
            <name>Nexus Snapshots</name>
      		
            <id>snapshots-repo</id>
            
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
            
            <layout>default</layout>
        </repository>
    </repositories>
    <pluginRepositories>
        ...
  	</pluginRepositories>
  	...
</project>

~~~

releases, snapshots：releases对没有 `-SNAPSHOT` 后缀的依赖处理策略。snapshots表示处理快照版本的处理策略，带有 `-SNAPSHOT` 后缀的工件。

enabled：表示是否激活这个策略。

updatePolicy：更新本地依赖的策略。always(每次构建更新)、dailay(每天检查一次)、interval:X(间隔X分钟检查)、never(从不)。

checksumPolicy：默认值warn。文件下载到本地的校验：ignore、fail、warn。

id：默认是default，这个和maven的setting.xml文件的镜像匹配则会被镜像。

name：可选标签。

layout：布局。



### 命令

mvn clean：清理项目，删除target/目录中已编译的文件。

mvn compile：编译项目的源代码。

mvn package：将项目编译并打包成指定的格式(jar或war)。

mvn install：将项目打包并安装到本地仓库。

mvn deploy：将构建好的包部署到中央仓库。

mvn validate：验证项目的是否正确。

mvn site：生成项目的文档。

mvn dependency:tree：打印项目的依赖树。

mvn clean install：清理项目、打包安装到本地仓库。

mvn clean install -DskipTests：请求项目，跳过测试编译打包部署到本地仓库。





