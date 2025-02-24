---
title: Logstash使用介绍
# permalink: /ELK/logstash-8.15.html
---

官网地址：https://www.elastic.co/guide/en/logstash/8.15/introduction.html

Logstash是一个具有实时管道功能的开源数据收集引擎。Logstatsh能动态统一处理来自不同源的数据，并且将其规范化到你选择的目的地。

Logstash能通过一些了的input、filter、output插件实现数据的提取和转换。



## Logstash如何工作

Logstash管道执行过程有3个阶段：inputs -> filters -> outputs。inputs产生事件，filters修改它们，outputs发送它们到任意地方。inputs和outputs都支持加密和解密的编码，而不需要使用额外的过滤器。



### inputs

常使用的inputs：

1. file：从文件读取数据；
2. beats：可以结合filebeat使用；
3. kafka：从kafka的队列读取数据；
4. redis：使用redis的list数据类型读取数据，类似队列；
5. syslog：读取系统日志，遵循RFC3164标准协议。

更多插件相关使用信息文档：https://www.elastic.co/guide/en/logstash/8.15/input-plugins.html



### filters

过滤器可以和条件组合一起使用，再特定条件执行过滤器。例如:

~~~pipeline.conf
input {
    kafka {
        bootstrap_servers => "kafka serverIP地址和端口，多个地址以逗号分隔"
        client_id => "logstash消费客户端ID名称"
        group_id => "logstashToEs"
        auto_offset_reset => "latest"
        topics => "kafka topic名称"
        type => "kafka topic名称"
    }
}
filter {
    if [type] == "kafka topic名称" {
        json {
            source => "message"
            remove_field=>["message"]
        }
    }
}
output {
    if [type] == "kafka topic名称"{
        elasticsearch {
            hosts => ["Elasticsearch serverIP地址和端口，多个地址以逗号分隔"]
            index => "Elasticsearch索引名称-%{+YYYY-MM}"
        }
    }
}

~~~

常使用的过滤器：

1. grok：解析和构建文本。将非结构化的日志解析成结构化且可查询的。内置120种模式；
2. geoip：添加有关IP地址的地址位置信息；
3. mutate：对字段进行转换，可以重命名、删除、替换修改字段，字段对应的值也能修改；
4. dtop：可以写条件丢弃事件；
5. clone：复制事件。

更多过滤器及过滤器的使用方式文档：https://www.elastic.co/guide/en/logstash/8.15/filter-plugins.html



### outputs

output是管道的最后阶段，一个事件可以配置多个output，一旦所有的output都执行完成，代表这个事件完成。

常用的outputs：

1. elasticsearch：发送事件解析的数据到ES；
2. file：写入事件数据到磁盘的文件；
3. graphite：发送事件数据到grahpite，根据数据回执指标。http://graphite.readthedocs.io/en/latest/
4. statsd：发送数据到statsd服务器，将数据可视化。

更多output及其使用方式文档：https://www.elastic.co/guide/en/logstash/8.15/output-plugins.html。



### codecs

数据编码，可以在input或output及filter中使用。

常用的有：

1. json：以Json的格式编码或解码数据；
2. multiline：合并多行文本在一个事件中。

更多codecs及其使用方式文档：https://www.elastic.co/guide/en/logstash/8.15/codec-plugins.html。



