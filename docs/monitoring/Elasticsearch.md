# Elasticsearch

学习博客：https://blog.csdn.net/qq_37128049/article/details/118002656

elasticsearch官网文档（旧）：https://www.elastic.co/guide/cn/elasticsearch/guide/current/partial-updates.html

官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/getting-started.html

## 什么是Elasticsearch

Elasticsearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java语言开发的，并作为Apache许可条款下的开放源码发布，是一种流行的企业级搜索引擎。Elasticsearch用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。官方客户端在Java、.NET（C#）、PHP、Python、Apache Groovy、Ruby和许多其他语言中都是可用的。



- Lucene

Lucene是apache软件基金会 jakarta项目组的一个子项目，是一个开放源代码的全文检索引擎工具包，但它不是一个完整的全文检索引擎，而是一个全文检索引擎的架构，提供了完整的查询引擎和索引引擎，部分文本分析引擎（英文与德文两种西方语言）。Lucene的目的是为软件开发人员提供一个简单易用的工具包，以方便的在目标系统中实现全文检索的功能，或者是以此为基础建立起完整的全文检索引擎。Lucene是一套用于全文检索和搜寻的开源程式库，由Apache软件基金会支持和提供。Lucene提供了一个简单却强大的应用程式接口，能够做全文索引和搜寻。在Java开发环境里Lucene是一个成熟的免费开源工具。就其本身而言，Lucene是当前以及最近几年最受欢迎的免费Java**信息检索程序库**。人们经常提到**信息检索程序库**，虽然与**搜索引擎**有关，但不应该将信息检索程序库与搜索引擎相混淆。





## Elasticsearch使用

### 安装Elasticsearch

官网下载地址：https://www.elastic.co/cn/downloads/elasticsearch

下载压缩包，解压到安装目录下即可，需要jdk，java运行时环境。

下载的是elatcisearch8.2.2版本，启动之后http://localhost:9200不能访问，解决办法，修改conf/elasticsearch.yml文件如下为false

![image-20220602202902728](http://47.101.155.205/image-20220602202902728.png)



访问成功

![image-20220602203508864](http://47.101.155.205/image-20220602203508864.png)



### head安装

官网下载地址：https://github.com/mobz/elasticsearch-head

在安装目录下cmd，需要node.js环境，使用npm install命令，或者cnpm install镜像安装

![image-20220602205139809](http://47.101.155.205/image-20220602205139809.png)

这里没有结果，也是安装成功了

使用cnpm安装

![image-20220602210216547](http://47.101.155.205/image-20220602210216547.png)

启动

![image-20220602205554249](http://47.101.155.205/image-20220602205554249.png)



出现跨域问题

~~~yml
#elaticsearch.yml配置文件添加配置
http.cors.enabled: true
http.cors.allow-origin: "*"
~~~

配置文件出错会导致闪退



### Kibana安装

官网下载地址：https://www.elastic.co/cn/downloads/kibana

国际化

修改配置文件



### ik分词器

git下载：https://github.com/medcl/elasticsearch-analysis-ik

解压到elstaticsearch安装目录的plugins目录中

ik分词器的分词算法：ik_smart最少切分和ik_max_word最细粒度划分

~~~bash
elasticsearch-plugin list
~~~

![image-20220602230752341](http://47.101.155.205/image-20220602230752341.png)



- 解决ik分词器版本和elasticsearch版本不一致不能启动问题

![image-20220602231002538](http://47.101.155.205/image-20220602231002538.png)



- 测试ik分词器效果

![image-20220602232116155](http://47.101.155.205/image-20220602232116155.png)





- 自定义分词器字典

~~~bash
IKAnalyzer.cfg.xml #文件修改配置，绑定自定义的dic
#自定义词典失效的原因，没有修改dic文件的编码格式，编码格式要一致，为UTF-8
~~~



![image-20220602233802760](http://47.101.155.205/image-20220602233802760.png)



### Elasticsearch相关概念介绍

~~~tex
Relation DB -> Databases ->tables ->rows -columns
Elasticsearch ->indeies(index) -> types -> documents -> fields
~~~

**cluster**：代表一个集群，集群中有多个节点，其中有一个为主节点，这个主节点是可以通过选举产生的，主从节点是对于集群内部来说的。es的一个概念就是去中心化，字面上理解就是无中心节点，这是对于集群外部来说的，因为从外部来看es集群，在逻辑上是个整体，你与任何一个节点的通信和与整个es集群通信是等价的。

**shards**：代表索引分片，es可以把一个完整的索引分成多个分片，这样的好处是可以把一个大的索引拆分成多个，分布到不同的节点上。构成分布式搜索。分片的数量只能在索引创建前指定，并且索引创建后不能更改。

**replicas**：代表索引副本，es可以设置多个索引的副本，副本的作用一是提高系统的容错性，当某个节点某个分片损坏或丢失时可以从副本中恢复。二是提高es的查询效率，es会自动对搜索请求进行负载均衡。

**recovery**：代表数据恢复或叫数据重新分布，es在有节点加入或退出时会根据机器的负载对索引分片进行重新分配，挂掉的节点重新启动时也会进行数据恢复。

**river**：代表es的一个数据源，也是其它存储方式（如：数据库）同步数据到es的一个方法。它是以插件方式存在的一个es服务，通过读取river中的数据并把它索引到es中，官方的river有couchDB的，RabbitMQ的，Twitter的，Wikipedia的。

**gateway**：代表es索引快照的存储方式，es默认是先把索引存放到内存中，当内存满了时再持久化到本地硬盘。gateway对索引快照进行存储，当这个es集群关闭再重新启动时就会从gateway中读取索引备份数据。es支持多种类型的gateway，有本地文件系统（默认），分布式文件系统，Hadoop的HDFS和amazon的s3云存储服务。

**discovery.zen**：代表es的自动发现节点机制，es是一个基于p2p的系统，它先通过广播寻找存在的节点，再通过多播协议来进行节点之间的通信，同时也支持点对点的交互。

**Transport**：代表es内部节点或集群与客户端的交互方式，默认内部是使用tcp协议进行交互，同时它支持http协议（json格式）、thrift、servlet、memcached、zeroMQ等的传输协议（通过插件方式集成）。

**mapping**：映射



GET _cat/health

### Elasticseach的使用

- 使用请求的方式创建索引

~~~bash
PUT index1 #创建一个普通的索引，执行结果如下
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "index1"
}

#创建索引并指定他的映射关系,执行结果如下
PUT index1
{
  "mappings": {
    "properties": {
      "name":{
        "type": "text"
      },
      "age":{
        "type": "integer"
      }
    }
  }
}
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "index1"
}


~~~



- 往索引里面添加文档，文档类型必须为**_doc**，不指定_id,请求必须为post，如果索引不存在，创建一个索引

~~~bash
#语法 put _index/_doc/_id,其中_index和_id可以指定，_doc不变
PUT index1/_doc/1
{
  "name":"张三",
  "age":"34"
}
{
  "_index" : "index1",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
#可以在创建索引时，指定字段的类型及其他设置，如果后期添加文档没有这个字段，会自动创建一个字段映射
~~~





- 删除索引

~~~bash
delete index #删除名为index的索引，返回结果如下
{
  "acknowledged" : true
}
~~~



- 删除索引文档

~~~bash
delete _index/_doc/_id #解释_index往哪个索引里面删除文档，_doc删除文档的类型， _id文档的id
DELETE index1/_doc/1
{
  "_index" : "index1",
  "_id" : "1",
  "_version" : 2,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 5,
  "_primary_term" : 1
}
~~~



- 修改索引文档内容

~~~bash
PUT index1/_doc/3 #修改索引index1文档id为3的数据
{
  "name":"钱七",
  "age":"22"
}
{
  "_index" : "index1",
  "_id" : "3",
  "_version" : 4,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 11,
  "_primary_term" : 1
}
~~~



- 部分修改索引文档

~~~bash
POST index1/_update/2 #修改index1索引中id为2的name字段属性值
{
  "doc": {
    "name":"lsdebb"
  }
}
{
  "_index" : "index1",
  "_id" : "2",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 5,
  "_primary_term" : 1
}
~~~



- 查询指定id文档索引

~~~bash
get index1/_doc/1 #查询索引index1中id为1的文档
{
  "_index" : "index1",
  "_id" : "1",
  "_version" : 3,
  "_seq_no" : 3,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "1111·"
  }
}
~~~



- 匹配字段查询

~~~bash
POST index1/_search
{
  "query": {
    "match": {
      "name": "张三"
    }
  }
}
GET index1/_search
{
  "query": {
    "match": {
      "name": "张三"
    }
  }
}
~~~

![image-20220603192443622](http://47.101.155.205/image-20220603192443622.png)



- get匹配字段查询

~~~bash
GET index1/_search/?q=name:三
~~~



- 过滤field字段

~~~bash
GET index1/_search
{
  "query": {
    "match": {
      "name": "张三"
    }
  },
  "_source": ["name"]
}
~~~



- 指定排序字段

~~~bash
GET index1/_search
{
  "query": {
    "match": {
      "name": "张三"
    }
  },
  "sort": [
    {
      "age": {
        "order": "asc"
      }
    }
  ]
}
~~~

- 指定展示数据

~~~bash
GET index1/_search
{
  "query": {
    "match": {
      "name": "张三"
    }
  },
  "from": 1,
  "size": 20
}
~~~



- 指定多条件

~~~bash
GET index1/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "name": "张三"
        }},
        {
          "term": {
            "age": {
              "value": "22"
            }
          }
        }
      ]
    }
  }
}
~~~



- 高亮查询

~~~bash
GET index1/_search
{
  "query": {
    "match": {
      "name": "张"
    }
  },
  "highlight": {
    "pre_tags": "<a>",
    "post_tags": "</a>",
    "fields": {
      "name": {}
    }
  }
}
~~~





## SpringBoot集成Elasticsearch

