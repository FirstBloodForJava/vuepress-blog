# Spark

Spark 文档版本选择：https://spark.apache.org/documentation.html

Spark-3.5.6 版本：https://spark.apache.org/docs/3.5.6/

Spark 下载地址：https://spark.apache.org/downloads.html

Spark-submit 文档：https://spark.apache.org/docs/3.5.6/submitting-applications.html



## Spark 介绍

在 Spark 2.0 之前，Spark 的主要编程接口是 RDD(Resilient Distributed Dataset)，在 Spark 2.0 之后，RDD 被 Dataset 取代，Dataset 像 RDD 一样具有强类型，但进行了更丰富的优化。



Spark Application 由 SparkContext 对象协调，在集群中作为独立进程运行。

要在集群上运行，SparkContext 需要连接集群管理器(Spark standalone、Apache Mesos、YARN、Kubernetes)，支持跨应用运行。连接后，Spark 获取节点上的执行器，这些节点就是计算和存储数据的进程。接下来，SparkContext 将应用代码发送到执行器，最后，SparkContext 将任务发送到执行器运行。

![image-20250920100628994](http://47.101.155.205/image-20250920100628994.png)

注意：

1. 每个 Application 都有自己的执行器进程，这些进程在整个应用程序的持续时间内保持运行状态，并在多个线程中运行任务。这样做的好处是，在调度端(Driver)和执行器端(Task)，应用程序彼此隔离。但是，这也意味着如果不将数据写入外部存储系统，则无法在不同的 Spark 应用程序(SparkContext 的实例)之间共享数据。
2. Spark 与底层集群管理器无关。
3. Driver 要与 Executor互通。
4. Driver 和 Worker Node 最好在同一局域网运行。



**术语介绍：**

| 术语            | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| Application     | 基于 Spark 构建的用户程序。                                  |
| Application jar | 包含用户的 Spark 应用程序的 jar                              |
| Driver program  | 运行 application main方法并创建 SparkContext 的进程          |
| Cluster manager | 用于获取集群资源的外部服务                                   |
| Deploy mode     | 区分驱动程序进程的运行位置。在 Cluster 模式下，框架在集群内部启动驱动程序。在 Client 模式下，提交者在集群外部启动驱动程序。 |
| Worker node     | 可以在集群中运行应用程序代码的任何节点                       |
| Executor        | 为工作节点上的应用程序启动的进程，用于运行任务并将数据保存在内存或磁盘存储中。每个应用程序都有自己的执行器。 |
| Task            | 将发送给一个执行程序的工作单元                               |
| Job             | 响应 Spark action 而生成的多个任务组成的并行计算             |
| Stage           | 每个 Job 都被分成一组更小的任务，称为阶段，这些阶段相互依赖  |



## Quick Start

Spark Shell 提供了 Scala 和 Python 命令行运行 API 的方式：bin/pyspark、bin/spark-shell



~~~bash
# 从文件创建数据集
val textFile = spark.read.textFile("D:\\spark\\spark-3.5.6-bin-hadoop3\\README.md")

# Dataset 的总数
textFile.count()

# Dataset 第一行数据
textFile.first()

# transform Dataset, 过滤
val linesWithSpark = textFile.filter(line => line.contains("Spark"))

# 包含 Spark 总行数
textFile.filter(line => line.contains("Spark")).count()


# Dateset 操作, 获取单词数最多行总数
textFile.map(line => line.split(" ").size).reduce((a, b) => if (a > b) a else b)

# 导入 java 类
import java.lang.Math
textFile.map(line => line.split(" ").size).reduce((a, b) => Math.max(a, b))

# 统计单词数
val wordCounts = textFile.flatMap(line => line.split(" ")).groupByKey(identity).count()

wordCounts.collect()


# 缓存数据
linesWithSpark.cache()

~~~

![image-20250920185850717](http://47.101.155.205/image-20250920185850717.png)

![image-20250920193211753](http://47.101.155.205/image-20250920193211753.png)



### 自定义 Application

gradle 和 gradle 项目可以通过 `shadow` 插件将项目依赖打包至 jar中。

将 `examples\src\main\java` 代码拷贝至新的 maven 项目中。

maven 项目配置如下。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.apache.spark.examples</groupId>
    <artifactId>spark-example</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!-- 控制 spark 依赖范围, 本地启动需要为 compile, 其它可为 provided -->
        <dependency.scope>compile</dependency.scope>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-sql_2.12</artifactId>
            <version>3.5.6</version>
            <scope>${dependency.scope}</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-mllib_2.12</artifactId>
            <version>3.5.6</version>
            <scope>${dependency.scope}</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-streaming-kafka-0-10_2.13</artifactId>
            <version>3.5.6</version>
        </dependency>

        <!--  examples\jars 中的 jar-->
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-examples_2.12</artifactId>
            <version>3.5.6</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/libs/spark-examples_2.12-3.5.6.jar</systemPath>
        </dependency>
    </dependencies>

</project>

~~~



在 Windows 系统启动，需要下载 `winutils.exe` 文件，[下载地址](https://github.com/steveloughran/winutils)。

~~~bash
# 使用 examples 的 jar
D:\spark\spark-3.5.6-bin-hadoop3\bin\spark-submit.cmd --class org.apache.spark.examples.JavaSparkPi --master local[2] --driver-memory 2g D:\spark\spark-3.5.6-bin-hadoop3\examples\jars\spark-examples_2.12-3.5.6.jar 100

# 使用自己编译出来的 jar
D:\spark\spark-3.5.6-bin-hadoop3\bin\spark-submit.cmd --class org.apache.spark.examples.JavaSparkPi --master local[2] --driver-memory 2g D:\spark\spark-example\target\spark-example-1.0.jar 100

# Linux bin 目录执行命令
./bin/spark-submit --class org.apache.spark.examples.JavaSparkPi --driver-memory 2g --master local[2] ./examples/jars/spark-examples_2.12-3.5.6.jar 100


~~~







## spark-submit

自定义的 Spark Application 打包成 jar 后，可以使用 `spark-submit` 启动

~~~bash
# linux 启动格式
./bin/spark-submit \
  --class <main-class> \
  --master <master-url> \
  --deploy-mode <deploy-mode> \
  --conf <key>=<value> \
  ... # other options
  <application-jar> \
  [application-arguments]

~~~

以上参数说明：

- `--class`：自定义 Application 的入口，main 所在的类。
- `--master`：集群的地址，`local[2]` 本地模式；`spark://23.195.26.187:7077` 表示 spark 集群模式地址。
- `--deploy-mode`：driver 部署的位置，`cluster` 表示集群的工作节点；`client`(默认) 在本地作为外部客户端。
- `--conf`：key=value 指定 spark 配置，配置中携带空格，使用 "key=value" 格式；多个参数配置格式：`--conf key=value --conf key2=value2`。
- `application-jar`：启动 main 方法所有依赖的 jar 路径；执行的路径必须在集群的各个节点都可见。
- `application-arguments`：可选，传递给 main 方法的参数。



### master

master 支持的 url 格式：

| master url                      | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| local                           | 使用一个本地工作线程运行 Spark                               |
| local[K]                        | 使用 K 个本地工作线程运行 Spark                              |
| local[K,F]                      | 使用 K 个工作线程和 F 个 maxFailures(最大失败次数) 在本地运行 Spark |
| local[*]                        | 以本地计算机逻辑核心数工作线程本地运行 Spark                 |
| local[*,F]                      | 以本地计算机逻辑核心数工作线程本地运行 Spark，运行 F 个 maxFailures |
| local-cluster[N,C,M]            | 用于测试的本地集群模式，在单个 JVM 中模拟一个分布式集群，该集群有 N 个工作线程、每个工作线程有 C 个核心，每个工作线程有 M MB 内存 |
| spark://HOST:PORT               | 连接到 Spark standalone 集群主节点                           |
| spark://HOST1:PORT1,HOST2:PORT2 | 通过 Zookeeper 连接到给定的 Spark 独立集群。                 |
| mesos://HOST:PORT               | 连接到给定的 Mesos 集群                                      |
| yarn                            | 根据 --deploy-mode ，以 client 或 cluster 连接 YARN 集群。将根据 HADOOP_CONF_DIR 或 YARN_CONF_DIR 变量查找集群位置 |
| k8s://HOST:PORT                 | 根据 --deploy-mode ，以 client 或 cluster 连接 k8s集群。HOST和 PORT 指的是 Kubernetes API Server。默认情况下，它使用 TLS 连接。为了强制使用不安全的连接，使用 k8s://http://HOST:PORT |



### 从文件加载配置

spark 配置说明：https://spark.apache.org/docs/3.5.6/configuration.html

`spark-submit` 可以从 properties 文件中加载 Spark Configuration。默认情况下，从 Spark 目录中的 `conf/spark-defaults.conf` 中读取配置。

**文件中的配置优先级高于命令行的配置。**

可以使用 `--verbose` 打印更多配置信息。



### 依赖管理

使用 `spark-submit` 时，启动 jar 和 `--jar` 指定的 jar 会自定传输到集群。`--jar` 指定的 jar url 地址必须由 `,` 分割。

Spark 支持使用不同的 url 协议传播 jar：

- `file:`：在 driver 所在文件系统加载。
- `hdfs:,http:,https:,ftp:`：根据指定的协议拉取 jar。
- `local:`：在工作节点的文件系统加载。



**jars 和文件被复制到执行器节点的工作目录，会占用一定的空间。使用 YARN 部署，会自动进行清理。Spark standalone 模式，可以通过 spark.worker.cleanup.appDataTtl(worker) 配置自动清理。**



也可以通过 `--packages groupId:artifactId:version` 从仓库下载依赖。



## 运行模式



### Local





### Spark standalone

Spark 提供的简单的独立集群。



**手动启动集群命令：**

~~~bash
# 默认 Spark master 端口 7077, UI 端口 8080
./sbin/start-master.sh

# 启动工作节点连接到 master
./sbin/start-worker.sh <master-spark-URL>

~~~

master 和 worker 启动可配置的参数：**master 启动 host 是主机名，worker 启动的地址需要是主机名或当前 ip，127.0.0.1 无法注册上。** 

| 参数                    | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| -h host, --host host    | 监听的主机，默认主机名                                       |
| -p port, --port port    | 服务监听的端口，master 默认7077；worker 随机                 |
| --webui-port port       | web UI 端口，master 默认 8080；worker 默认 8081              |
| -c cores, --cores cores | 仅 worker 生效，Spark 应用允许使用的 CPU 内核数，默认所有可用 |
| -m mem, --memory mem    | 仅 worker 生效，Spark 应用允许使用的内存总量，默认总 RAM -1G |
| -d dir, --work-dir dir  | 仅 worker 生效，日志输出和 jar保存 目录，默认 SPARK_HOME/work |
| --properties-file file  | 加载自定义 spark 配置文件路径，默认 conf/spark-defaults.conf |



#### 集群启动脚本

`conf/workers` 中可以配置 `worker` 的服务器列表，。默认情况，ssh 是并行，配置的服务器需要设置无密码(使用私钥)访问。可以通过设置环境变量 `SPARK_SSH_FOREGROUND =yes`，操作每个 ssh 的 worker 串行提供密码。

配置 `conf/workers` 文件后，可以通过以下脚本启动或停止集群：

- `sbin/start-master.sh`：启动 master。
- `sbin/start-workers.sh`：启动 `conf/workers` 配置的所有 workers。
- `sbin/start-worker.sh`：启动 worker。
- `sbin/start-connect-server.sh`：启动 Spark Connect。
- `sbin/start-all.sh`：启动 master 和 配置的 workers。
- `sbin/stop-master.sh`：停止 `start-master.sh` 启动的 master。
- `sbin/stop-worker.sh`：停止所有 workers。
- `sbin/stop-workers.sh`：停止 `conf/workers` 配置的 workers。
- `sbin/stop-connect-server.sh`：停止 Spark Connect。
- `sbin/stop-all.sh`：停止 master 和所有 workers。



`conf/spark-env.sh` 可以配置 Spark 集群。模板文件名 `conf/spark-env.sh.template`。

| 变量名                    | 作用                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `SPARK_MASTER_HOST`       | master 监听的地址                                            |
| `SPARK_MASTER_PORT`       | master 启动的端口 (默认 7077)                                |
| `SPARK_MASTER_WEBUI_PORT` | master web UI (默认 8080)                                    |
| `SPARK_MASTER_OPTS`       | 配置 master 参数，格式 "-Dx=y" (默认 none)                   |
| `SPARK_LOCAL_DIRS`        | master                                                       |
| `SPARK_WORKER_CORES`      | Spark 应用可使用的核心数 (默认 all available cores)          |
| `SPARK_WORKER_MEMORY`     | worker 分配的内存                                            |
| `SPARK_WORKER_PORT`       | worker 启动占用的端口 (默认 random)                          |
| `SPARK_WORKER_WEBUI_PORT` | worker web UI (默认 8081)                                    |
| `SPARK_WORKER_DIR`        | worker 日志和 jar 的缓存目录 (默认 SPARK_HOME/work)          |
| `SPARK_WORKER_OPTS`       | 配置 worker 参数，格式 "-Dx=y" (默认 none)                   |
| `SPARK_DAEMON_MEMORY`     | master 和 worker 进程分配的内存 (默认 1g)                    |
| `SPARK_DAEMON_JAVA_OPTS`  | master 和 worker 进程 JVM 启动参数，格式 "-Dx=y" (默认 none) |
| `SPARK_DAEMON_CLASSPATH`  | master 和 worker 进程的类路径(默认 none)                     |
| `SPARK_PUBLIC_DNS`        | Spark master 和 worker 的公共 DNS 名称 (默认 none)           |

`SPARK_MASTER_OPTS` 支持的参数

| 属性                                           | 默认值     | 说明                                                         |
| ---------------------------------------------- | ---------- | ------------------------------------------------------------ |
| `spark.master.ui.port`                         | `8080`     |                                                              |
| `spark.master.ui.decommission.allow.mode`      | `LOCAL`    | master Web UI  /workers/kill 功能配置. `LOCAL`  `DENY` `ALLOW` |
| `spark.master.rest.enabled`                    | `false`    | 是否使用 Master REST API                                     |
| `spark.master.rest.port`                       | `6066`     | Master REST API 端口                                         |
| `spark.deploy.retainedApplications`            | 200        | 显示的已完成应用程序的最大数目，旧的删除                     |
| `spark.deploy.retainedDrivers`                 | 200        | 显示的已完成 driver 的最大数目，旧的删除                     |
| `spark.deploy.spreadOut`                       | true       | spread                                                       |
| `spark.deploy.defaultCores`                    | (infinite) | CPU core 相关                                                |
| `spark.deploy.maxExecutorRetries`              | 10         | 执行失败次数相关                                             |
| `spark.worker.timeout`                         | 60         | master 和 worker 之间的心跳间隔时间                          |
| `spark.worker.resource.{name}.amount`          | (none)     |                                                              |
| `spark.worker.resource.{name}.discoveryScript` | (none)     | worker 启动查询特点脚本                                      |
| `spark.worker.resourcesFile`                   | (none)     |                                                              |



`SPARK_WORKER_OPTS`  支持配置项

| 属性名                                             | 默认值  | 说明                 |
| -------------------------------------------------- | ------- | -------------------- |
| `spark.worker.cleanup.enabled`                     | false   | 是否自动清理工作目录 |
| `spark.worker.cleanup.interval`                    | 1800s   | 清理间隔时间         |
| `spark.worker.cleanup.appDataTtl`                  | 604800s | 文件有效期           |
| `spark.shuffle.service.db.enabled`                 | true    |                      |
| `spark.shuffle.service.db.backend`                 | LEVELDB |                      |
| `spark.storage.cleanupFilesAfterExecutorExit`      | true    |                      |
| `spark.worker.ui.compressedLogFileLengthCacheSize` | 100     |                      |



### Hadoop YARN



### Kubernetes