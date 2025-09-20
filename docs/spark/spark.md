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
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-sql_2.12</artifactId>
            <version>3.5.6</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-mllib_2.12</artifactId>
            <version>3.5.6</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-streaming-kafka-0-10_2.13</artifactId>
            <version>3.5.6</version>
        </dependency>

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








## 运行模式



### Local





### Spark standalone



### Hadoop YARN



### Kubernetes

