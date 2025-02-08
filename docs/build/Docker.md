# Docker

## Docker介绍

### 什么是Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux或Windows操作系统的机器上,也可以实现虚拟化,容器是完全使用沙箱机制,相互之间不会有任何接口。



### Docker组成部分

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

1. ~~~bash
   # 安装所需的依赖
   sudo yum install -y yum-utils
   ~~~

2. ~~~bash
   # 设置存储库
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

3. ~~~bash
   # 安装最新docker引擎
   sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   
   ~~~

![image-20220613171055088](http://47.101.155.205/image-20220613171055088.png)

![image-20220613171450549](http://47.101.155.205/image-20220613171450549.png)





~~~bash
sudo yum install -y yum-utils

# 阿里云存储库
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装最新docker引擎
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

~~~

![image-20250207135730736](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20250207135730736.png)





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



### 阿里云文档

https://help.aliyun.com/zh/ecs/use-cases/install-and-use-docker?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.1.4c662f3dxQyFF5&scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@51853._.ID_help@@%E6%96%87%E6%A1%A3@@51853-RL_docker%E5%AE%89%E8%A3%85-LOC_new~UND~search-OR_ser-PAR1_213e362217389107648674175e1c73-V_4-RE_new3-P0_0-P1_0-title#940c78642dmq9



#### centos7.x

~~~bash
# 添加Docker软件包源
sudo wget -O /etc/yum.repos.d/docker-ce.repo http://mirrors.cloud.aliyuncs.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's|https://mirrors.aliyun.com|http://mirrors.cloud.aliyuncs.com|g' /etc/yum.repos.d/docker-ce.repo

# 安装Docker社区版本，容器运行时containerd.io，以及Docker构建和Compose插件
sudo yum -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动Docker
sudo systemctl start docker
#设置Docker守护进程在系统启动时自动启动
sudo systemctl enable docker

~~~







### 启动测试

~~~bash
# 启动docker引擎
systemctl start docker
# 运行hello-world镜像
docker run hello-world
# 关闭docker引擎
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



#### centos7.x

~~~bash
# 删除Docker相关源
sudo rm -f /etc/yum.repos.d/docker*.repo
# 卸载旧版本的Docker和相关的软件包
sudo yum -y remove \
docker-ce \
containerd.io \
docker-ce-rootless-extras \
docker-buildx-plugin \
docker-ce-cli \
docker-compose-plugin

~~~







## Docker-Client命令

官网地址：https://docs.docker.com/engine/reference/commandline/dockerd/

### 1、Docker命令

~~~bash
#启动docker服务
systemctl start docker
#关闭docker服务
systemctl stop docker

# 搜索镜像名的镜像
docker search <iamge-name>


# 以镜像centos创建容器启动
docker run centos 
# 查看运行容器的资源使用情况
docker stats
#查看正在运行的容器
docker ps
# 查看所有容器(包括刚刚运行的容器),-n num最后几条，-l最后一条，-q只显示容器id
docker ps -a
# 查看容器日志
docker logs <contain-id>/<contain-name>

~~~

![image-20220613231214371](http://47.101.155.205/image-20220613231214371.png)

| 属性名       | 描述                                    |
| ------------ | --------------------------------------- |
| CONTAINER ID | 容器的id                                |
| IMAGE        | 使用的镜像                              |
| COMMAND      | 启动容器时运行的命令                    |
| CREATED      | 容器创建的时间                          |
| STATUS       | 容器的状态                              |
| PORTS        | 容器的端口信息和使用的连接类型(tcp\udp) |
| NAMES        | 自动分配的容器名称(可以指定)            |

STATUS-容器的7种状态：

1. created（已创建）
2. restarting（重启中）
3. running 或 Up（运行中）
4. removing（迁移中）
5. paused（暂停）
6. exited（停止）
7. dead（死亡）



### 2、镜像命令

~~~bash
#查看当前docker的镜像
docker images

~~~

![image-20220614003744012](http://47.101.155.205/image-20220614003744012.png)

| 属性名     | 属性描述       |
| ---------- | -------------- |
| REPOSITORY | 镜像的仓库源   |
| TAG        | 镜像的标签     |
| IMAGE ID   | 镜像的id       |
| CARATED    | 镜像创建的时间 |
| SIZE       | 镜像的大小     |



~~~bash
#从远程拉取镜像，没有tag默认时latest标签的镜像
docker pull <image-name>
# 拉去指定版本的远程镜像
docket pull mysql:5.7 

~~~

![image-20220613233508598](http://47.101.155.205/image-20220613233508598.png)





~~~bash
# 镜像查询
docker search <image-name>
docker search httpd

~~~

![image-20220614004551416](http://47.101.155.205/image-20220614004551416.png)

| 属性名      | 属性描述           |
| ----------- | ------------------ |
| NAME        | 镜像仓库源的名称   |
| DESCRIPTION | 镜像的描述         |
| STARS       | 点赞收藏的数量     |
| OFFICIAL    | 是否Docker官方发布 |
| AUTOMATED   | 自动构建           |



~~~bash
# 删除镜像
docker rmi <image-name>

~~~



#### 创建镜像方式一

从容器中创建镜像，需要容器的id。也可以在之前的容器中执行apt-get update一些更新命令后创建容器。

~~~bash
docker commit [-m -a ...] <container-id> <image-name>:<tag>
# -m 提交的描述
# -a 镜像的作者 id 创建的目标镜像名

docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2

docker commit -m="描述" -a="作者" container的id image的名字

~~~



#### 创建镜像方式二

通过Dockerfile文件创建镜像。Dockerfile文件内容语法：

~~~dockerfile
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
ENTRYPOINT	#容器启动时执行的命令,启动容器时传递参数追加
ENV			#设置容器环境变量，键值对
LABEL		#给镜像添加一些元数据(metadata)，以键值对的形式

~~~



~~~bash
docker build -t <image-name>:<tag> .
# -t 指定要创建的目标镜像名,不指定版本,默认是最新的镜像
# . 表示从当前目录寻找Dockerfile文件,可以指定Dockerfile的绝对路径

docker build -t runoob/centos:6.7 .

~~~



~~~bash
# 设置镜像标签(版本)
docker tag <image-id> <image-name>:<tag>

~~~











### 3、容器命令

~~~bash
# 以镜像创建容器启动
docker run [option] <image-name> [command] [args]
# -d(--detach) 后台持续运行
# -it -i交互式操作，-t终端
# -p <主机端口>:<容器端口> 将容器的端口映射到主机端口
# -P 随机映射端口
# --name <name> 容器的名称
# -v 将主机的目录挂载到容器内部的文件或目录
# --restart no(不重启) always(总是)
# -e 环境变量设置
docker run [option] <image-name>
# 以交互式启动centos镜像的容器，exit之后，容器也退出
docker run -it centos /bin/bash
# 以后台模式运行容器，如果容器中没有可执行的命令，容器就会自动关闭
docker run -d centos /bin/bash
docker run -d centos /bin/sh -c "while true; do echo hello world;sleep 1;done"
docker run -itd centos /bin/bash
# 容器内部的5000端口映射到我们本地主机的 5000 端口上
docker run -d -p 5000:5000 training/webapp python app.py
# 随机映射端口号
docker run -d -P training/webapp python app.py 

# 重启容器
docker restart <contain-id> 

#关闭容器，会暂时卡顿一下
docker stop <contain-id>/<contain-name>
# 启动已经创建的容器
docker start <contain-id>

~~~



~~~bash
#进入容器
docker attach <contain-id> 

# exec进入容器，退出不会关闭容器
docker exec [option] <contain-id> <bash>
# 交互式进入容器
docker exec -it <contain-id>  /bin/bash
# 非交互式进入容器,只执行一个命令
docker exec <contain-id> cat txt.log

~~~







~~~bash
#导入导出容器
#导出容器快照到本地tar文件
docker export <contain-id> > <tar.file>
# 在当前路径下生成了一个my-hello-world.tar的文件
docker export 19310fb32b6b > my-hello-world.tar


# 将快照文件ubuntu.tar导入到镜像test/ubuntu:v1
cat docker/ubuntu.tar | docker import - test/ubuntu:v1
# 将my-hello-world.tar快照文件导入成my-hello-world名的镜像
cat my-hello-world.tar | docker import - my-hello-world

~~~



~~~bash
#删除容器
docker rm <contain-id> #不能删除正在运行的容器
docker rm -f <contain-id> #强制删除容器(包括正在运行的容器)
docker rm -f (docker ps -aq) #删除所有的容器

~~~



~~~bash
#查看端口映射情况
docker port <contain-id>/<contain-name>
~~~



~~~bash
#查看容器启动的进程信息
docker top <contain-id>/<contain-name>

~~~



~~~bash
#查看容器配置信息
docker inspect <contain-id>/<contain-name>

~~~





## 镜像

查找镜像官网：https://hub.docker.com/

### 阿里云镜像加速器(不维护)

https://developer.aliyun.com/article/1025496?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.60.6b092f3dCsrhjp&scm=20140722.S_community



进入到阿里云的控制台 > 搜索镜像> 选择容器镜像服务

![image-20250207143005007](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20250207143005007.png)



~~~bash
# 目录不存在则创建目录
mkdir -p /etc/docker

# 填写对应的镜像地址https://mtkxslk5.mirror.aliyuncs.com
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mtkxslk5.mirror.aliyuncs.com"]
}
EOF

# 重新加载配置
sudo systemctl daemon-reload
# 重启
sudo systemctl restart docker

~~~



### 配置镜像源

~~~bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://docker.hpcloud.cloud",
        "https://docker.m.daocloud.io",
        "https://docker.unsee.tech",
        "https://docker.1panel.live",
        "http://mirrors.ustc.edu.cn",
        "https://docker.chenby.cn",
        "http://mirror.azure.cn",
        "https://dockerpull.org",
        "https://dockerhub.icu",
        "https://hub.rat.dev"
    ]
}
EOF

# 重新加载配置
sudo systemctl daemon-reload
# 重启
sudo systemctl restart docker

~~~





### centos7

~~~bash
sudo cp -n /lib/systemd/system/docker.service /etc/systemd/system/docker.service

# 替换命令
sudo sed -i "s|ExecStart=/usr/bin/docker daemon|ExecStart=/usr/bin/docker daemon --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|g" /etc/systemd/system/docker.service

# 还原
sudo sed -i "s|ExecStart=/usr/bin/docker daemon --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|ExecStart=/usr/bin/docker daemon|g" /etc/systemd/system/docker.service

# 替换命令
sudo sed -i "s|ExecStart=/usr/bin/dockerd|ExecStart=/usr/bin/dockerd --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|g" /etc/systemd/system/docker.service

# 还原
sudo sed -i "s|ExecStart=/usr/bin/dockerd --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|ExecStart=/usr/bin/dockerd|g" /etc/systemd/system/docker.service

sudo systemctl daemon-reload
sudo service docker restart

~~~





### training/webapp

~~~bash
docker pull training/webapp
docker run -d -P training/webapp
docker run -d -p80:5000 training/webapp
docker attach container的id
docker log container的id
~~~



### portainer/portainer

~~~bash
docker pull portainer/portainer
docker run -p 80:9000 -d --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
~~~

用户名：admin

密码：admin1234



### mysql

~~~bash
docker pull mysql:5.7
docker run -d -p 3306:3306 --name mysql-8 -e MYSQL_ROOT_PASSWORD=1024 mysql:8.0
docker exec -it mysql /bin/bash
docker exec -it mysql mysql -uroot -p1024 #可以直接连接容器内的mysql数据库
/etc/mysql/ #目录下存放的是mysql的配置文件，在给数据库建表之后，生效的配置文件时/etc/mysql/*.cnd来覆盖配置
/var/lib/ #目录会出现三个带有mysql的目录，数据在/var/lib/mysql中

~~~





~~~bash
# 使用docker search mysql会提示连接超时
docker pull mysql:8.0

docker run -d \
--name mysql-8 \
-p 3306:3306 \
-v /var/local/mysql:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=<password> \
mysql:8.0

# 进入容器 
docker exec -it mysql-8 mysql -uroot -p<password>

~~~

**客户端连接提示：Public Key Retrieval is not allowed。解决方式：url后面添加参数?allowPublicKeyRetrieval=true**



**连接配置useSSL=true也可能导致连接失败。**





### 镜像安装jdk

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



### 镜像启动Java项目步骤

1. 通过Dockerfile创建镜像。
2. 启动jar包的shell脚本。
3. 创建操作镜像/容器的shell脚本。

创建Dockerfile文件：

~~~dockerfile
# 从哪里拉去一个镜像
FROM java:8

# 镜像创建者
MAINTAINER oycm mingorg@163.com

# 将Dockerfile处的jar-name.jar文件复制到镜像中的server目录下
ADD jar-name.jar /server/jar-name.jar
ADD start.sh /server/start.sh

# 在构建镜像过程中执行的命令
RUN [ "chmod", "777", "/server/start.sh" ]
RUN echo "Asia/Shanghai" > /etc/timezone

# 容器启动时默认执行的脚本
ENTRYPOINT ["/server/start.sh"]

~~~

~~~bash
docker build -t <iamge-name>[:tag] .

~~~



启动jar包的start.sh shell脚本准备：

~~~bash
#!/bin/sh

# 内存相关参数
if [ "$MEM_OPTS" = "" ]; then
    SYS_PARAMS="$SYS_PARAMS -Xms1024m -Xmx1024m -XX:NewRatio=1 -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:+AlwaysPreTouch -Xss256k"
else
    SYS_PARAMS="$SYS_PARAMS $MEM_OPTS"
fi

# GC相关参数
if [ "$GC_OPTS" = "" ]; then
    SYS_PARAMS="$SYS_PARAMS -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+UseCMSInitiatingOccupancyOnly"
else
    SYS_PARAMS="$SYS_PARAMS $GC_OPTS"
fi

if [ "$OPTIMIZE_OPTS" = "" ]; then
    SYS_PARAMS="$SYS_PARAMS -XX:AutoBoxCacheMax=20000"
else
    SYS_PARAMS="$SYS_PARAMS $OPTIMIZE_OPTS"
fi

# GC错日志配置
if [ "$SHOOTING_OPTS" = "" ]; then
    SYS_PARAMS="$SYS_PARAMS -XX:-OmitStackTraceInFastThrow -XX:ErrorFile=errorGcLogs/hs_err_%p.log"
else
    SYS_PARAMS="$SYS_PARAMS $SHOOTING_OPTS"
fi

# Spring激活配置文件
if [ "$SPRING_PROFILES_ACTIVE" = "" ]; then
    JAR_PARAMS="$JAR_PARAMS --spring.profiles.active=own"
else
    JAR_PARAMS="$JAR_PARAMS --spring.profiles.active=$SPRING_PROFILES_ACTIVE"
fi

JAR_PARAMS="$JAR_PARAMS"

cd /server
java -jar -server $SYS_PARAMS ./jar-name.jar \
    $JAR_PARAMS

~~~



启动容器的shell脚本：

~~~bash
#!/bin/sh
APP_NAME='contain-name'
SPRING_PROFILES_ACTIVE='test'
APP_PATH='/u01/oycm'
IMAGE_NAME='iamge的远程地址'
# 远程debug使用
SYS_PARAMS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005

check_if_process_is_running(){
  CONTAINER_ID=`docker ps|grep ${APP_NAME}|awk -F ' '  '{print \$1}'`
  if [ "$CONTAINER_ID" = "" ]; then
    // 1 表示false 没有查到容器id
    return 1
  fi
    return 0
}

check_if_images_exist(){
  # 查询本地是有当前容器名称的镜像
  IMAGE_ID=`docker images|grep ${APP_NAME}|awk -F ' '  '{print \$1}'`
  if [ "$IMAGE_ID" = "" ]; then
    return 1
  fi
    return 0
}

restart_app () {
    # 停止容器
    # 获取当前容器名称的容器id
    DOCKER_PROCESS_ID=`docker ps -a --filter name=^/${APP_NAME}$|grep ${APP_NAME}|awk -F ' '  '{print $1}'|xargs -n1`
    if [ "$DOCKER_PROCESS_ID" != "" ]; then
      docker stop ${DOCKER_PROCESS_ID}
      docker rm -f ${DOCKER_PROCESS_ID}
    fi
    # 删除容器name
    docker rm `docker ps -aq --filter name=^/${APP_NAME}$`
    # 启动容器
    # -e 配置环境变量SYS_PARAMS SPRING_PROFILES_ACTIVE JAR_PARAMS
    # -v 挂载目录
    # --network host
    docker run --name ${APP_NAME} -p 9099:9099 -e SYS_PARAMS=${SYS_PARAMS} -e SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE} -e JAR_PARAMS="--spring.config.additional-location=./config/application.yml" -v ${APP_PATH}/test:/server/test:rw -v /u01/html/wgq/portalCptStore:/server/wgqCpt:rw  -v ${APP_PATH}/config:/server/config:rw -v ${APP_PATH}/logs:/server/logs:rw -v ${APP_PATH}/runtime:/server/runtime:rw --network host -d ${IMAGE_NAME}:lastest
    if check_if_process_is_running
    then
    echo -e "${APP_NAME} start success"
    else
    echo -e "${APP_NAME} start fail"
    fi
}

case "$1" in
  status)
    if check_if_process_is_running
    then
      echo -e "${APP_NAME} is running"
    else
      echo -e "${APP_NAME} not running"
    fi
    ;;
  stop)
    # 停止容器
    if ! check_if_process_is_running
    then
      echo -e "${APP_NAME} has stopped"
    else
      docker ps|grep ${APP_NAME}|awk -F ' '  '{print $1}'|xargs -n1 docker stop
      sleep 2s
      if ! check_if_process_is_running
      then
        echo -e "${APP_NAME} stop success"
      else
        echo -e "${APP_NAME} stop fail"
      fi
    fi
    ;;
  start)
    # 启动容器
    if check_if_process_is_running
    then
      echo -e "${APP_NAME} has start"
    else
      docker start ${APP_NAME}
      sleep 2s
      if check_if_process_is_running
      then
        echo -e "${APP_NAME} start success"
      else
        echo -e "${APP_NAME} start fail"
      fi
    fi
    ;;
  rollback)
    # 回滚容器 rollback 旧的镜像版本
    ROLLBACK_TAG="$2"
    docker tag ${IMAGE_NAME}:${ROLLBACK_TAG} ${IMAGE_NAME}:lastest
    restart_app
    ;;
  reload)
    # 将一个tar文件镜像加载为最新的镜像
    docker load -i ./${APP_NAME}.tar
    TAG=`docker image ls ${IMAGE_NAME}|awk -F ' '  '{print $2}'|sed -n 2p`
    echo "Your Reload TAG is ${TAG}"
    docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:lastest
    restart_app
    ;;
  remove)
    # 停止容器
    docker ps|grep ${APP_NAME}|awk -F ' '  '{print $1}'|xargs -n1 docker rm -f
    if ! check_if_images_exist
    then
      echo -e "image remove success"
    else
      echo -e "image remove fail"
    fi
    ;;
  *)
    echo "Usage: $0 {start|stop|rollback|restart|rebuild|remove}"
    exit 1
esac
exit 0

~~~









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

