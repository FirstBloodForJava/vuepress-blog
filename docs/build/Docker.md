# Docker

## Docker介绍

### 什么是Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux或Windows操作系统的机器上,也可以实现虚拟化,容器是完全使用沙箱机制,相互之间不会有任何接口。



###Docker组成部分

1. DockerClient客户端
2. DockerDaemon守护进程
3. DockerImage镜像
4. DockerContainer容器



### Docker架构

Docker使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。Docker 容器通过 Docker 镜像来创建。容器与镜像的关系类似于面向对象编程中的对象与类。

Docker采用C/S架构Docker daemon作为服务端接受来自客户的请求，并处理这些请求（创建、运行、分发容器）。客户端和服务端既可以运行在一个机器上，也可通过 socket 或者RESTful API 来进行通信。

Docker daemon一般在宿主主机后台运行，等待接收来自客户端的消息。 Docker客户端则为用户提供一系列可执行命令，用户用这些命令实现跟 Docker daemon 交互。

![image-20220613164830672](http://47.101.155.205/image-20220613164830672.png)



## Docker安装

官网：https://www.docker.com/

安装文档：https://docs.docker.com/engine/install/centos/

购买的阿里云服务器使用的Alibaba Cloud Linux。Alibaba Cloud Linux是阿里云基于龙蜥社区（OpenAnolis）的龙蜥操作系统（Anolis OS）打造的操作系统发行版，在全面兼容RHEL/CentOS生态的同时，为云上应用程序提供安全、稳定、高性能的定制化运行环境，并针对云基础设施进行了深度优化，为您打造更好的云上操作系统体验。目前发行版本为Alibaba Cloud Linux 2与Alibaba Cloud Linux 3。



> 卸载旧版本

~~~bash
sudo yum remove docker \
				docker-client \
				docker-client-latest \
				docker-common \
				docker-latest \
				docker-latest-logrotate \
				docker-logrotate \
				docker-engine
~~~



> Docker有三种安装方式



### 1、Docker存储库方式安装

1. 设置存储库

~~~bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
    
#阿里云
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
#清华大学
sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
~~~

![image-20220613171055088](http://47.101.155.205/image-20220613171055088.png)

![image-20220613171450549](http://47.101.155.205/image-20220613171450549.png)



2. 安装Docker引擎

~~~bash
#安装最新docker引擎
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
~~~





### 2、rpm包安装

1. 下载地址：https://download.docker.com/linux/centos/ 

2. ~~~bash
   sudo yum install /path/to/package.rpm
   ~~~







### 3、脚本安装

~~~bash
curl -fsSL https://get.docker.com -o get-docker.sh
DRY_RUN=1 sh ./get-docker.sh
~~~





### 启动测试

~~~bash
#启动docker引擎
systemctl start docker
#运行hello-world镜像
docker run hello-world
#关闭docker引擎
systemctl stop docker
~~~

![image-20220613173157559](http://47.101.155.205/image-20220613173157559.png)





### 卸载Docker

卸载Docker引擎、Docker客户端、容器、compose安装包

~~~bash
sudo yum remove docker-ce docker-ce-cli containerd.io docker-compose-plugin
~~~



~~~bash
#删除自定义的配置文件
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
~~~





## Docker-Client命令

官网地址：https://docs.docker.com/engine/reference/commandline/dockerd/

查找镜像官网：https://hub.docker.com/

### 1、Docker命令

~~~bash
#####启动关闭########
systemctl start docker #启动docker服务
systemctl stop docker #关闭docker服务

docker run centos #以镜像centos创建容器启动

docker stats

####查询#####
docker search 镜像名 #搜索镜像名的镜像
docker ps #查看正在运行的容器
docker ps -a #查看所有容器(包括刚刚运行的容器),-n num最后几条，-l最后一条，-q只显示容器id
docker logs 容器id/容器name #查看容器日志
~~~

![image-20220613231214371](http://47.101.155.205/image-20220613231214371.png)

> CONTAINER ID -容器的id

> IMAGE - 使用的镜像

> COMMAND - 启动容器时运行的命令

> CREATED - 容器创建的时间

> STATUS-容器的7种状态

1. created（已创建）
2. restarting（重启中）
3. running 或 Up（运行中）
4. removing（迁移中）
5. paused（暂停）
6. exited（停止）
7. dead（死亡

> PORTS-容器的端口信息和使用的连接类型（tcp\udp）

> NAMES-自动分配的容器名称



### 2、镜像命令

~~~bash
docker image #查看当前docker的镜像
~~~

![image-20220614003744012](http://47.101.155.205/image-20220614003744012.png)

> REPOSITORY - 镜像的仓库源

> TAG - 镜像的标签

> IMAGE ID - 镜像的id

> CARATED - 镜像创建的时间

> SIZE - 镜像的大小



~~~bash
docker pull 镜像名 #从远程拉取镜像，没有tag默认时latest标签的镜像
docket pull mysql:5.7 #
~~~

![image-20220613233508598](http://47.101.155.205/image-20220613233508598.png)





~~~bash
#镜像查询
docker search 镜像名
docker search httpd
~~~

![image-20220614004551416](http://47.101.155.205/image-20220614004551416.png)

> NAME - 镜像仓库源的名称

> DESCRIPTION - 镜像的描述

> STARS - 点赞收藏的数量

> OFFICIAL - 是否Docker官方发布

> AUTOMATED - 自动构建



~~~bash
docker rmi 镜像名 #删除镜像
~~~



~~~bash
#创建镜像方式一:从已经创建的容器中更新镜像，并且提交这个镜像
apt-get update #在容器中执行这个命令进行更新，退出容器
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2
-m #提交的描述
-a #镜像的作者 id 创建的目标镜像名
~~~



~~~bash
#创建镜像方式二:使用Dockerfile指令来创建一个新的镜像
#1.需要创建一个Dockerfile文件，其中包含一组指令来告诉Docker如何构建我们的镜像。
#第一条FROM，指定使用哪个镜像源
#RUN指令告诉docker在镜像内执行命令，安装了什么。
docker build -t runoob/centos:6.7 . #-t:指定要创建的目标镜像名,. :Dockerfile所在目录，可以指定Dockerfile的绝对路径
~~~



~~~bash
#设置镜像标签
docker tag 镜像id 镜像名:新的ta'g
~~~











### 3、容器命令

~~~bash
#启动
docker run 参数 镜像名  #以某镜像创建容器启动
docker run -it centos /bin/bash #以交互式启动centos镜像的容器，exit之后，容器也退出。-i交互式操作，-t终端
docker run -d centos /bin/bash #以后台模式运行容器，如果容器中没有可执行的命令，容器就会自动关闭
docker run -d centos /bin/sh -c "while true; do echo hello world;sleep 1;done"
docker run -itd centos /bin/bash #-d后台运行容器
docker run -d -p 5000:5000 training/webapp python app.py #容器内部的 5000 端口映射到我们本地主机的 5000 端口上
docker run -d -P training/webapp python app.py #随机映射端口号

--name string #给容器命名
-p num:num #宿主机端口绑定容器端口
-P #自动绑定


docker restart 容器id #重启容器

#关闭
docker stop 容器id/容器name #关闭容器，会暂时卡顿一下
docker start 容器id #启动已经创建过的容器
~~~



~~~bash
#进入容器
docker attach 容器id #
docker exec 参数 容器id 执行的命令 #
~~~

> 从exec进入容器，退出不会关闭容器。





~~~bash
#导入导出容器
docker export 容器id > tar文件 #导出容器快照到本地tar文件
docker export 19310fb32b6b > my-hello-world.tar
#在当前路径下生成了一个my-hello-world.tar的文件

#将快照文件ubuntu.tar导入到镜像test/ubuntu:v1
cat docker/ubuntu.tar | docker import - test/ubuntu:v1
cat my-hello-world.tar | docker import - my-hello-world
#将my-hello-world.tar快照文件导入成my-hello-world名的镜像
~~~



~~~bash
#删除容器
docker rm 容器 #不能删除正在运行的容器
docker rm -f 容器id #强制删除容器(包括正在运行的容器)
docker rm -f (docker ps -aq) #删除所有的容器
~~~



~~~bash
#查看端口映射情况
docker port 容器id/容器name
~~~



~~~bash
#查看容器端口应用程序进程
docker top 容器id/容器name

~~~



~~~bash
#查看容器配置信息
docker inspect 容器id/容器name

~~~





## 镜像

### 1、training/webapp

~~~bash
docker pull training/webapp
docker run -d -P training/webapp
docker run -d -p80:5000 training/webapp
docker attach container的id
docker log container的id
~~~



### 2、portainer/portainer

~~~bash
docker pull portainer/portainer
docker run -p 80:9000 -d --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
~~~

用户名：admin

密码：admin1234



### 3、mysql

~~~bash
docker pull mysql:5.7
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=1024 mysql:5.7
docker exec -it mysql /bin/bash
docker exec -it mysql mysql -uroot -p1024 #可以直接连接容器内的mysql数据库
/etc/mysql/ #目录下存放的是mysql的配置文件，在给数据库建表之后，生效的配置文件时/etc/mysql/*.cnd来覆盖配置
/var/lib/ #目录会出现三个带有mysql的目录，数据在/var/lib/mysql中
~~~







### 4、镜像创建方式一

~~~bash
#通过已经允许的容器来创建镜像
docker commit -m="描述" -a="作者" container的id image的名字
~~~



### 5、镜像创建方式二Dockerfile

~~~bash
FROM 		#镜像从哪里来
MAINTAINER 	#镜像是谁创建的
RUN 		#构建镜像执行的命令，每一次RUN都会构建一层，在docker build执行
VOLUME		#定义数据卷，没有定义使用默认的
USER 		#指定后续执行的用户组和用户
WORKDIR 	#切换当前工作的执行目录
EXPOSE		#暴露端口
ADD			#添加文件，如果是URL或压缩包便会自动下载或自动解压
COPY		#添加文件以复制的形式，跟ADD类似，但不具备自动下载或解压的功能
CMD			#容器启动的命令，有多个以最后一个为准。启动容器时传递参数替换原来的命令。docker run执行
ENTRYPOINT	#容器进入时执行的命令,启动容器时传递参数追加
ENV			#设置容器环境变量，键值对
LABEL		#给镜像添加一些元数据(metadata)，以键值对的形式
~~~

~~~dockerfile
FROM centos:7
MAINTAINER oycm 1164864987@qq.com

RUN yum -y install vim
RUN yum -y install net-tools

WORKDIR /root
CMD echo /root
CMD echo "linux started"
~~~



~~~bash
docker build -t imageName:tag .
. #上下文路径，会将当前路劲下的文件打包
imageName #镜像名
tag #镜像的tag版本
docker bulid -t my-centos:1.0 .
~~~



~~~bash
#执行成功返回
Successfully built 63f50b0e59c0
Successfully tagged my-centos:1.0
#出现了构建的镜像，也pull了centos:7的镜像
my-centos             1.0       63f50b0e59c0   58 seconds ago   455MB
centos                7         eeb6ee3f44bd   9 months ago     204MB
~~~



### 6、镜像安装jdk

将jdk安装包放在/usr/目录下

~~~dockerfile
FROM centos:7

ADD jdk-8u121-linux-x64.tar.gz /usr/java/

ENV JAVA_HOME=/usr/java/jdk1.8.0_121
ENV JRE_HOME=$JAVA_HOME/jre
ENV CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
ENV PATH=$JAVA_HOME/bin:$PATH

CMD java -version
~~~

~~~dockerfile
FROM centos:7

ADD jdk-8u121-linux-x64.tar.gz /usr/java/

ENV JAVA_HOME=/usr/java/jdk1.8.0_121
ENV JRE_HOME=$JAVA_HOME/jre
ENV CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
ENV PATH=$JAVA_HOME/bin:$PATH

ENTRYPOINT ["/bin/bash"]
CMD ["java -version"]
~~~



### 7、容器发布springboot项目

~~~dockerfile
FROM centos:7

ADD jdk-8u121-linux-x64.tar.gz /usr/java/
ADD site-0.0.1-SNAPSHOT.jar /www/

ENV JAVA_HOME=/usr/java/jdk1.8.0_121
ENV JRE_HOME=$JAVA_HOME/jre
ENV CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
ENV PATH=$JAVA_HOME/bin:$PATH

EXPOSE 80

ENTRYPOINT ["/bin/bash"]
CMD ["java -version"]
~~~

~~~bash
docker build -t site:1.0 .#构建项目镜像
docker run -d --name site -v /www/:/www/ -p 80:80 site:1.0 java -jar site-0.0.1-SNAPSHOT.jar
docker run -d --name site -v /www/:/www/ -p 80:80 site:1.0 /bin/bash
docker run -d --name site -v /www/:/www/ -p 80:80 site:2.0 -c java -jar site-0.0.1-SNAPSHOT.jar
~~~



~~~dockerfile
FROM java:8

ADD site-0.0.1-SNAPSHOT.jar /www/site-0.0.1-SNAPSHOT.jar
WORKDIR /www/
EXPOSE 80
~~~



~~~dockerfile
FROM my-jdk:1.0
ADD site-0.0.1-SNAPSHOT.jar /www/app.jar
WORKDIR /www/
EXPOSE 80
ENTRYPOINT ["/bin/bash","-c"]
CMD ["java -jar app.jar"]
~~~



~~~bash
docker run -it --name site -v /www/:/www/ -p 80:80 site:3.0
docker run -d --name site -p 80:80 site:3.0 
docker run -d --name site -v /www/:/www/ -p 80:80 site:3.0
~~~

需要注意的点

1. java -jar jar包的路径，也就是容器的工作目录

http://106.15.234.93/



> finally

~~~dockerfile
FROM my-jdk:1.0
ADD site-0.0.1-SNAPSHOT.jar /www/app.jar
WORKDIR /www/
EXPOSE 80
ENTRYPOINT ["/bin/bash","-c"]
CMD ["java -jar app.jar"]
~~~

~~~bash
docker build -t site:1.0 .
docker run -d --name site -p 80:80 site:1.0
~~~

直接能运行成功。



## 容器

### 1、容器数据卷挂载

~~~bash
docker run -v 容器内路径 镜像名 #匿名挂载
docker volume ls #可以查看卷名
docker volume inspect 卷名 #查看挂载信息，可以查看到默认挂载到宿主机的目录
docker run -itd -v /root:/root centos #这种方式执行的挂载，通过上面的方式无法查到卷名
docker run -itd -v /root:/root:ro centos #指定容器只能读文件，不能修改，也不能创建
docker run -itd -v /root:/root:rw centos #容器能读能写
~~~



> 匿名挂载

~~~bash
docker run -itd -v /容器的路径 镜像名 #生成随机的VOLUME NAME，指定的本地挂载路径为
/var/lib/docker/volumes/VOLUME NAME随机生成/_data
#docker启动mysql时会自动执行匿名挂载将/var/lib/docker/volumes/匿名/_data:/var/lib/mysqlban'd
~~~



> 具名挂载

~~~bash
docker run -itd -v 卷名/容器的路径 镜像名
docker run -itd -v my-volume:/root centos #指定VOLUME NAME，本地挂载路径为
/var/lib/docker/volumes/my-volume/_data
~~~



> docker volume

~~~bash
#可以接的参数
create #创建一个卷
inspect 卷名 #展示一个或多个卷的信息
ls #展示所有的卷
prune #删除没有使用的卷，也会删除宿主机的文件
rm 卷名 #删除一个或者多个卷(正在使用不能删除,容器存在也不能删除)
~~~



~~~bash
docker run -p 80:8080 -v /root/webapps/web/:/usr/local/tomcat/webapps/web/ -d my-tomcat:latest
#在/root/webapps/web/目录下新建一个index.jsp
~~~

~~~jsp
<html>
    <body>
        <h2>Hello World!</h2>
        <%=request.getRemoteAddr()%>
    </body>
</html>
~~~

~~~bash
#启动之后就可以通过http://服务ip:端口号/web/index.jsp获取本机的ip地址。
~~~





### 2、容器端口映射

~~~bash
docker run -p 宿主机端口:容器端口 镜像名 #默认绑定tcp端口
docker run -p 主机ip:主机端口:容器端口 镜像名 #容器内部端口绑定到指定的主机ip端口
docker run -P 镜像名 #容器端口随机映射到主机端口

~~~



~~~bash
docker port 容器id/容器name #查看端口映射情况
~~~





### 3、端口网络

~~~bash
docker network --help
connect
create
disconnect
inspect
ls
prune
rm
~~~



> 创建网络

~~~bash
docker network create -d bridge my-network #创建一个my-network的Docker网络，-d指定类型有bridge、overlag
~~~



> 启动容器配置网络

~~~bash
docker run -dit --name test1 --network my-network my-centos:1.0 /bin/bash
docker run -dit --name test2 --network my-network my-centos:1.0 /bin/bash
####################################################
docker run -dit --name test3 my-centos:1.0 /bin/bash
docker run -dit --name test4 my-centos:1.0 /bin/bash
####################################################
docker exec -it test1 /bin/bash
ping test1
ping test2
#都能够连接成功
####################################################
docker exec -it test3 /bin/bash
ping test3 #Name or Service not known
ping 127.0.*.* #第一个*是0-256，第二个是不能同时为0，能ping成功
~~~





### 4、DNS

在/etc/docker/目录下新建一个daemon.json,设置全部容器的DNS

~~~json
{
  "dns" : [
    "114.114.114.114",
    "8.8.8.8"
  ]
}
~~~

需要重启docker引擎才能生效

~~~bash
docker run -itd centos cat etc/resolv.conf #输出容器的DNS信息
~~~

查看linuxDNS信息

~~~bash
cat /etc/resolv.conf
~~~



> 手动配置容器配置

~~~bash
docker run -itd -h 容器主机名 --dns=ip --dns-search=搜索域 centos
docker run --name dns -itd --rm -h testhost --dns=114.114.114.114 --dns-search=hello.com my-centos:1.0 
--name dns #给容器命名为dns
--rm #容器停止之后删除容器
-h testhost/--hostname=hostname #设置容器的主机名为testhost，写入到容器的/etc/hostname和/etc/hosts
--dns #添加DNS服务器到容器的/etc/resolv.conf中，写入为nameserver 114.114.114.114
--dns-search hello.com #设定容器的搜索域，写入/etc/resolv.conf文件中，写入为 search hello.com
~~~

容器启动没有配置-dns，--dns-search，docker默认配置/etc/resolve.conf的配置。



## Docker仓库

> login

~~~bash
docker login -u username #回车输入密码
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
~~~

网站：https://docs.docker.com/engine/reference/commandline/login/#credentials-store查看凭证免验证



> 推送镜像到自己的Docker Hub

~~~bash
docker tag my-tomcat:latest oycmstart/tomcat:1.0 #首先修改镜像名为DockerHub的账号名/名字:版本号
docker push oycmstart
~~~

