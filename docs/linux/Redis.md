# Redis

## 什么是Redis

Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

官网：https://redis.io/

中文网：http://www.redis.cn/



Redis is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

You can run atomic operations on these types, like appending to a string; incrementing the value in a hash; pushing an element to a list; computing set intersection, union and difference; or getting the member with highest ranking in a sorted set.

To achieve top performance, Redis works with an in-memory dataset. Depending on your use case, Redis can persist your data either by periodically dumping the dataset to disk or by appending each command to a disk-based log. You can also disable persistence if you just need a feature-rich, networked, in-memory cache.

Redis supports asynchronous replication, with fast non-blocking synchronization and auto-reconnection with partial resynchronization on net split.



Redis 是一个开源（BSD 许可）的内存数据结构存储，用作数据库、缓存、消息代理和流引擎。Redis 提供数据结构，例如 字符串、散列、列表、集合、带范围查询的排序集合、位图、超日志、地理空间索引和流。Redis 内置了复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久性，并通过以下方式提供高可用性Redis Sentinel和Redis Cluster的自动分区。

您可以 对这些类型运行原子操作，例如附加到字符串； 增加哈希值；将元素推入列表；计算集交、并 、差；或获取排序集中排名最高的成员。

为了达到最佳性能，Redis 使用 内存中的数据集。根据您的用例，Redis 可以通过定期将数据集转储到磁盘 或将每个命令附加到基于磁盘的日志来持久化您的数据。如果您只需要一个功能丰富的网络内存缓存，您也可以禁用持久性。

Redis 支持异步复制，具有快速非阻塞同步和自动重新连接以及网络拆分上的部分重新同步。





### Windows安装Redis

Redis 是用ANSI C编写的，可以在大多数 POSIX 系统上运行，比如 Linux、BSD 和 Mac OS X，没有外部依赖。Linux 和 OS X 是 Redis 开发和测试最多的两个操作系统，我们推荐使用 Linux 进行部署。Redis 可以在 Solaris 派生的系统（如 SmartOS）中工作，但要尽最大努力提供支持。**Windows 版本没有官方支持**。

windows下载地址：https://github.com/tporadowski/redis/releases

windows下载地址：https://github.com/MSOpenTech/redis/releases



### 数据库应用演变历程

- 单机数据库时代
- Memcached时代
- 读写分离时代
- 分表分库时代(集群)
- NoSQL数据库



### 什么是NoSQL

NoSQL最常见的解释是“non-relational”， “Not Only SQL”也被很多人接受。NoSQL仅仅是一个概念，泛指非关系型的数据库，区别于关系数据库，它们不保证关系数据的ACID特性。

NoSQL数据库种类繁多，但是一个共同的特点都是去掉关系数据库的关系型特性。



#### NoSQL数据库分类

- KV键值对数据库 Redis
- 列存储数据库 HBase
- 文档型数据库MongoDb
- 图形数据库   Neo4J 



### 为什么使用NoSQL

1. 进入web2.0时代，无法应对集中的高并发操作。关系型数据库的是IO密集型的应用，硬盘的IO也变为性能瓶颈
2. 无法简单地通过增加硬件、服务节点来提高系统性能。
3. 数据整个存储在一个数据库的表中，可扩展性差





### NoSQL的优点

1. NoSQL读写性能非常高，
2. 可扩展性高
3. 存储的数据类型灵活





### NoSQL的缺点

1. 不支持标准的SQL，
2. CAP定理（数据一致性问题）
3. 数据类型不丰富





### 3V和3高

- Volume大量
- Variety多样
- Velocity速度



- 高并发
- 高可扩
- 高性能





MySQL 和 NoSQL 都有各自的特点和使用的应用场景，两者结合使用。让关系数据库关注在关系上，NoSQL 关注在存储上。





## 安装Redis

压缩包下载地址：http://download.redis.io/releases/

1. 官网下载redis下载tar.gz安装包。
2. 解压安装包tar -zxvf 安装包名，安装包放置在linux系统的/opt目录下。

gcc编译器

Redis 是使用 c 语言编写的。使用源文件安装方式，需要编译 c 源文件，会使用 gcc 编译器。

- 什么是gcc？

gcc是GNU compiler collection 的缩写，它是 Linux 下一个编译器集合(相当于 javac )，是 c 或 c++程序的编译器。
使用yum进行安装gcc 。执行命令：

~~~bash
#安装gcc编译器
yum -y install gcc

~~~

- 查看linux有没有安装gcc编译器

~~~bash
rpm -qa | grep gcc
libgcc-4.8.5-11.el7.x86_64

tar -zxvf redis-6.0.6.tar.gz
~~~

3. 在解压的redis目录下执行`make`命令。
4. 提示安装失败执行`make distclean`命令，再次执行make命令也不能成功

- 升级gcc版本

~~~bash
yum -y install centos-release-scl
yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
scl enable devtoolset-9 bash

~~~

5. 执行make命令，得到以下结果表示安装成功

![image-20220527170548120](http://47.101.155.205/image-20220527170548120.png)

6. 可以进入src目录中发现有redis-cli、redis-server命令
7. make install，在没有执行make install命令之前，在`/usr/local/bin`目录下是没有下面的文件的

![image-20220527171007363](http://47.101.155.205/image-20220527171007363.png)

8. **daemonize，可以vim 打开配置文件，set nu显示行号，设置daemonize yes后台启动redis，显示行号在222行**。





## 启动测试

- 启动redis服务端

~~~bash
# 命令后接配置文件位置
redis-server redis.config

~~~

- redis客户端

~~~bash
redis-cli -p 6379
ping #测试是否连接成功
-h <ip>
-p <port> 

~~~

- 关闭redis客户端

~~~bash
# 在客户端连接的窗口下执行shutdown 然后执行exit
shutdown
exit
# 检查redis进程是否关闭
ps -ef | grep redis 
# 检查redis进程是否关闭
netstat -anop | grep

~~~

第二种关闭方式

~~~bash
# 在usr/local/bin 执行
redis-cli shutdown

~~~

第三种方式

~~~bash
#使用kill结束进程
kill 进程号 
# 可能会丢失数据
kill -9 进程号 

~~~



## redis基本命令学习

> 16个数据库
>
> ![image-20220527183835205](http://47.101.155.205/image-20220527183835205.png)



- 切换数据库

~~~bash
# 切换数据库
select [0-databases-15]

~~~

- 查看数据大小

~~~bash
dbsize

~~~

- 查看当前数据所有的key

~~~bash
keys *

~~~

- 清空当前数据库

~~~bash
 #输入到flush按table自动大写补全flushall
flushdb 

~~~

- 清空所有数据库内容

~~~bash
flushall

~~~



## redis线程说明

redis是一个基于内存的数据库，将所有的数据都放入内存，基于内存操作，使用单线程的操作效率是最高的，多线程会上下文的切换消耗大量的时间。redis的单线程是执行核心命令的模块。（**文件事件分派器队列**的消费是单线程）

redis操作数据库是基于内存操作，CPU并不是瓶颈，redis的瓶颈是根据机器的内存和网络带宽。redis6.0版本引入了多线程，多线程是在网络I/O处理方面使用的，如网络数据的读写和协议解析等，但是redis执行命令的核心模块还是单线程的。

redis6.0中，多线程机制默认是关闭的，需要在redis.conf中完成两个设置才能启用多线程。

![image-20220527190120061](http://47.101.155.205/image-20220527190120061.png)





## redis的key的操作命令

`exists key`

`move key num`移动 key

`kyes *`

`expire key seconds`设置过期时间

`ttl key` 查看过期时间

`set key value`添加

`get key` 取值

`del key` 删除

`type key` 查看数据类型

`randomkey`



~~~bash
exists key... #可以空格分开传递多个key 存在几个返回几个对应的数值，没有返回0
del key... #可以空格分开传递多个key 删除几个返回几个对应的数值，没有删除返回0
keys * # *代表任意字符，可以过滤性的展示字符
move key db #将key移动到数据库db，移动成功返回1，没有key为0，db大小超出报错
type key #查看key的类型，不存在返回none，存在返回对应的类型
ttl key #没有设置失效时间返回-1，不存在(失效了)返回-2
expire key seconds #设置失效时间，如果key不存在返回0，存在返回1

~~~





## redis数据类型

### 五大数据类型

#### string类型

`append key str` 追加字符串到key上，key不存在就新建一个

`strlen key` 获取key的长度

`incr key` key的数值自增1

`decr key` 可以的数值自减1

`incrby key num` key的数值自增num

`decrby key num` key的数值自减num

**getrange key start end 下标从0开始，是闭区间，-1表示最后一个字符，可以用-5 -1从后面截取**

`setrange key` 开始下标 value 从下标开始用value替换

`setex（set with expire） key seconds value` 设置key的value及失效时间

`setnx （set if not exists）key value` 不存在设置

`mset key1 value1 key2 value2`

`mget key1 key2 key`

`msetnx k1 v1 k2 v2` 一致性，要么都成功，要么都失败

`getset key value` 获取并且设置值

~~~bash
append key value #如果key存在，追加成功，如果key不存在，相当于set kkeyey value 并且返回value的长度
strlen key #key存在返回value的长度，key不存在返回0，set key '' get key 得到 "" 长度为0
getrange key start end #获取key从下标start到end，闭区间，-1 -1结果是最后一个字符，-1 0空串，0 0首个字符
setrange key offset value #key存在，第offset位替换位value，如果key原来的长度没有offset的长度，不\x00，key不存在一样
setex key seconds value #添加并且key value的失效时间，已有的key，会修改值，并且设置失效时间
setnx key value #不存在key才添加value到key中，并且结果为1，存在未0
mset k1 v1 k2 v2 k3 v3 #设置多个对应value到对应的key中去
mget k1 k2 k3 #按顺序去除key中的值，没有则那一列未nil
msetnx k1 v1 k2 v2 #如果其中任何一个key存在值都会失败

getset key value #取值并且设置值，如果key不存在value，取出nil，设置value为value

incr key #key的value要是数字，如果不存在这个key，创建一个key为0，然后自增1返回结果为1
decr key #key的value要是数字，如果不存在这个key，创建一个key为0，然后自减1返回结果为1
incrby key increment #key的value要是数字，如果不存在这个key，创建一个key为0，然后自增increment返回结果为1
decrby key increment #key的value要是数字，如果不存在这个key，创建一个key为0，然后自增increment返回结果为1

mset k1.name name k1.age age ...

~~~







#### list类型

![image-20220527235323286](http://47.101.155.205/image-20220527235323286.png)

list是一个string列表，按照插入顺序排序，取出元素从左边开始取（头部），lpush往头部插入数据，rpush往尾部插入数据

lpush 				lpush		rpush

lpop		rpop

lrange

lindex

llen

lrem

ltrim

rpoplpush

lset

linsert

~~~bash
lpush key element ... #往这个key中的头部添加element元素，如果key不存在，新建一个key，在头部添加元素
rpush key element ... #往这个key中的尾部添加element元素，如果key不存在，新建一个key，在尾部添加元素
lrange key start stop #从下标start开始到下标stop结束，从key中取出元素
lindex key index #从key中取出下标为index的element，如果没有key，或者index都返回nil
llen key #获取key中element元素的个数，如果key不存在返回0
lpop key #从key中的头部移除element元素，并返回其element值，元素都移除之后，返回nil，llen为0
rpop key #从key中的尾部移除element元素，并返回其element值
lrem key count element #从key中移除指定的element的count数量，返回成功移除的数量，count为0时，移除所有的element。+-前后
ltrim key start stop #查找key中的start-top，截取这一段返回覆盖key。语法没有错，都是返回ok
lset key index element #首先key要存在，index不能超过llen结果-1，index可以为负数，指定位置下标替换element
rpoplpush source destination #从source key中移除尾部元素添加至destination key中的头部，destination不存在，新建
linsert key before|after pivot element #在key中指定pivot支点前面或者后面插入元素，key不存在返回0，key存在返回新的llen，pivot不存在返回-1。
##############################总结
头部添加，尾部添加
头部移除，尾部移除
遍历element，element数量
截取，移除指定element，获取指定index，key
指定插入，指定替换
尾部元素弹出添加至另一个key头部

~~~







#### set

**Set类型时一个无序的string集合**

sadd	smembers	sismember

scard	srem	srandmemmber	spop

smove	sdiff	sinter	sunion

~~~bash
sadd key member ... #添加一个key的set集合，设置元素member
scard key #返回key集合元素数量
srandmember key count #随机遍历key中的member成员count数量，超过scard会返回key，count是负数会返回重复的元素
smembers key #遍历key中所有的member成员
sismember key member #查询key中有没有member成员，返回结果1，或者0
srem key member... #移除key中的member成员，返回移除成功数量结果，移除所有元素，自动删除key
smove source destination member #移动sourcekey中的member成员至destinationkey中
sdiff key key... #返回第一个key的子集，里面不能有后面key的元素
sunion key key... #返回几个key中的并集,没有重复的元素
sinter key key... #返回几个key的交集
spop key count #不接count参数弹出一个，key中元素被弹出全部，自动删除key，
###############总结
添加，长度
遍历，随机遍历
删除，随机移除元素，移动
是否存在某个member
交集，并集，差集

~~~







#### Hash

Hash类型是一个string类型的field和value的映射表，适合存储对象

hset		hget		hmset 4.0后弃用		hmget

hgetall		hdel		hlen		hexists

hkeys		hvals		hsetnx

hincrby

 ~~~bash
hset key field value[field value] #覆盖不会产生结果计数，没有对应field value对应关系新建关系，计数+1
hget key field #取key中field对应关系的value的值
hmget key field field... #从key中取field对应关系的value值
hmset key field value[field value] #返回结果时OK
hgetall key #获取key中的所有的field value对应关系
hlen key #获取key中有几对field value对应关系
hdel key field[field] #删除field对应关系从key中
hexists key field #判断key中有么有field对应关系
hkeys key #获取key的所有field字段
hvals key #获取key中所有的field字段的value
hincrby key field increment #没有key field会自动创建这个关系，自增increment，符号位-就自减
hsetnx key field value #不存在key field关系才创建一个

添加创建，获取一个key field value，获取多个key field field
获取所有的key的field value对应结果，几对field value关系，删除，判断是否存在
获取所有的field，获取所有的value，自增，不存在filed才创建
 
 ~~~











#### Zset

Zset时有序集合，不允许重复元素出现，可以位Zset集合的每个元素关联一个score属性（可以重复），通过这个来进行元素的排序。默认从小到大。

zadd	zrange	zrangebyscore

zrevrange		zrem		zcard

zcount

~~~bash
zadd key score member[score member] #如果member存在修改score的值，结果为0
zrem key member [member...] #移除member从key中，结果为移除成功的数量
zrange key start stop [withscores] #遍历start到stop，闭区间，有withscores就需要score的值在后面,从小到大
zrevrange key start stop [withscores] #遍历start到stop，闭区间，有withscores就需要score的值在后面,从小到大
zrangebyscore key min max [withscores] [LIMIT offset count] #offset下标，-inf +inf
zcard key #统计所有的member数量
zcount key min max #统计score在min max区间的member数量

添加，移除 
小到大遍历，大到小遍历，从小到大范围遍历
统计所有数量，统计范围数量


zincrby key increment member

~~~



### 特殊数据类型

#### Geospatial

GEODIST
GEOHASH
GEOPOS
GEORADIUS
GEORADIUSBYMEMBER
GEORADIUSBYMEMBER_RO
GEORADIUS_RO
GEOSEARCH
GEOSEARCHSTORE

**XX**：只更新已经存在的元素。永远不要添加元素。
**NX**：不要更新已经存在的元素。总是添加新元素。
**CH**：将返回值从添加的新元素数修改为改变的元素总数（CH 是changed的缩写）。更改的元素是添加的新元素和已更新坐标的元素。因此，命令行中指定的与过去得分相同的元素不计算在内。注意：通常情况下，GEOADD 的返回值只计算添加的新元素的数量。

geoadd

geopos查询经度纬度

geodist两个直接的距离

georadius

georadiusbymember

geohash

type geoadd创建的类型，时zset

~~~bash
geoadd key longitude latitude member[longitude latitude member] #经度纬度member
type key #结果为zset
zrange key 0 -1 withscores #为16为的数字
geopost key member [member...] #查询key中member的经度纬度
geodist key member1 member2[m|km|ft|mi] #key中的member1和member2的直线距离及使用什么单位
georadius key longitude latitude radius m|km|ft|mi withcoord withdist count count ...
georadiusbymember key member radius m|km|ft|mi ... #自己也会查出来
geohash key member [member...] #11位长度字符串
~~~





#### hyperloglog

pfadd

pfcount

pfmerge

基数统计0.81%错误lv，12kb内存

~~~bash
pfadd key element [element...] #
type key #时string类型是一个HyperLogLog string类型
pfcount key [key...] # element输入a-z结果位25
pfmerge destkey sourcekey [sourcekey...] #复制到destkey
只能使用pfadd方式添加元素到已有的hyperloglog类型的key上
~~~







#### bitmap

位图，两个状态

setbit

getbit

bitcount

~~~bash
setbit key offset vlaue #value必须位0或1
getbit key offset #offset没有被设置值，结果位0，
bitcount key [start end] # ???
~~~







## 事务

事务是指一系列操作步骤，这一系列的操作步骤，要么完全地执行，要么完全地不执行。

Redis 中的事务（transaction）是一组命令的集合，至少是两个或两个以上的命令，redis事务保证这些命令被执行时中间不会被任何其他操作打断。

redis事务不保证完全一致性，单个执行命令具有原子性，命令执行的有序性，执行命令执行中不可被打断

开启事务multi

命令入队

执行事务exec

取消事务discard

语法问题出现错误

语法没有问题，执行出现错误

~~~bash
multi #开启事务，命令排队，先后顺序，一致性
queued排队，队列
exec #事务开始执行，事务内的所有执行语句内容，事务被打断，返回 nil
discard #取消事务

####exec执行的两种情况
#出现命令语法错误
EXECABORT Transaction discarded because of previous errors.语法错误
abort 中止

#出现执行命令底层数据类型错误
(error) ERR value is not an integer or out of range


#手动终止事务
discard

~~~



### watch

~~~bash
watch key [key...]

~~~

监视一个(或多个) key ，如果在事务执行之前这个(或这些) **key 被其他命令所改动**，那么**事务将被打断**。

watch在事务执行exec，或者discard之后都会取消监视。

watch命令不能出现在multi命令的队列中。



情况模拟

一个账户原来有1000元，账户没有消费，a开始用账户消费，开启redis事务，执行任务排队的时候，b给a的账户存入了1000，之后a的事务才开始执行，后面得到的结果时1900，不会出现mysql那样的情况。



使用watch情况

count是2000在开启multi事务之前，使用watch监视count，监视开启之后，b给a的账户存入了1000，a开始执行multi开启事务，进行消费，执行队列里面消费了100，在执行exec的时候就会因为key被其他命令锁改动，事务被打断，就没有执行。



### unwatch

取消 WATCH 命令对所有 key 的监视。如果在执行 WATCH 命令之后， EXEC 命令或 DISCARD 命令先被执行了的话，那么就不需要再执行 UNWATCH 了。





## Jedis

1. 导入依赖
2. 连接redis数据库
3. 通过Jedis创建连接

~~~xml
<!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.2.2</version>
</dependency>

~~~

使用jedis连接不上redis，修改配置文件两个位置

![image-20220528184732989](http://47.101.155.205/image-20220528184732989.png)



多线程下使用jedis是有问题的，出现了以下异常

~~~java
redis.clients.jedis.exceptions.JedisConnectionException: java.net.SocketTimeoutException: Read timed out
    
~~~



- 测试出现运行时redis错误，事务的情况

~~~java
public class TestTransaction {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.144.130",6379);
        Transaction transaction = jedis.multi();
        System.out.println(transaction.set("count", "c1"));
        System.out.println(transaction.incr("count"));
        transaction.exec();
    }
}
~~~



- 测试出现语法错误，事务的处理情况

~~~java
public class TestTransaction {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.144.130",6379);
        Transaction transaction = jedis.multi();
        System.out.println(transaction.set("count", "c1"));
        System.out.println(transaction.incr("count"));
        jedis.watch("count");
        transaction.exec();
    }
}
java.lang.IllegalStateException: Cannot use Jedis when in Multi. Please use Transaction or reset jedis state.这种使用redis命令是能插入成功的。
~~~



- 下面两种情况，使用监视count，导致事务被终端，事务执行的结果为null，没有使用watch监控的情况，会放回执行的结果

~~~java
public class TestTransaction01 {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.144.130",6379);
        //jedis.watch("count");
        Transaction transaction = jedis.multi();
        System.out.println(transaction.decrBy("count", 100));
        System.out.println(transaction.incrBy("out", 100));
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(transaction.exec().toString());
        jedis.close();
    }
}
~~~







## SpringBoot整合redis

redis是一个数据库，所以是在spring-data框架下的，在spring2.0之后，使用lettuce替换了jedis

1. 新建springboot项目，导入redis依赖
2. 编写配置文件，取出需要连接使用的对象
2. 使用RedisTemplate模板类，发现出现乱码问题

![image-20220612044753643](http://47.101.155.205/image-20220612044753643.png)

出现这个问题可以使用自带的StringRedisTemplate来操作，就不会有这种问题了





### 自定义RedisTemplate

源码如下

![image-20220612051910290](http://47.101.155.205/image-20220612051910290.png)

~~~java
@Configuration
public class RedisTemplateConfig{
    @bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
        RedisTemplate<String,Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFacotory);
        
        //设置序列化格式
        template.setKeySerializer(RedisSerializer.string());
		template.setValueSerializer(RedisSerializer.string());
		template.setHashKeySerializer(RedisSerializer.string());
		template.setHashValueSerializer(RedisSerializer.string());
        
        template.afterPropertiesSet();
        retrun template;
    }
}
~~~

其中set...Serializer传递的参数就是序列化的方式，可以根据需求指定自己需要的序列化方式。





## Redis.conf配置文件

是客户端的情况下，可以使用config get key，配置文件中的key来获取和设置值

1. 首先就写了运行redis-server必须要有redis.conf配置文件，大小写不敏感
2. includes加载一个或者更多的配置文件
3. network网络连接，bind ip，protected-mode保护模式（可以通过config set设置），port端口设置，tcp连接设置，超时设置，
4. TLS/SSL设置，默认是关闭的
5. general设置，默认不是daemon后台进程，以后台进程需要有pidfile /var/run/redis_6379.pid这个文件·，loglevel日志等级，debug、verbose、notice、warning，logfile，系统日志，数据库数量，启动logo设置，
6. snapshotting快照，因为redis是基于内存操作，断电即时去所有数据，内存到硬盘的，没有key修改不保存，15分钟保存一次是最慢的，最快的是60秒内取保存。rdbcompression yes 压缩保存的.rdb文件，会消耗一定的CPU，rdb检查是开启的，dbfilename dump.rdb转存数据名字，**rbd文件副本，这里应该在搭建redis集群需要用到**
7. replication复制，主从复制需要
8. security安全，可以设置requirepass密码
9. clients客户端，客户端最大连接数
10. memory management内存管理
11. append only mode文件追加，Append Only File，RDB和AOP可以同时启用http://redis.io/topics/persistence可以获取更多信息，默认aof模式是关闭的，appendfsync，aof文件写命令数据的策略。
12. lua scription lua脚本
13. redis cluster redis集群
14. cluster docker/NAT support
15. Slow log
16. latency Monitor延迟监视器
17. event notification事件通知
18. gopher server
19. advanced config
20. active defragmentation 



## 持久化

### RDB

Redis DataBase，就是在指定的时间间隔内将内存中的数据集快照写入磁盘，数据恢复时将快照文件直接再读到内存。

RDB 保存了在某个时间点的数据集（全部数据）。存储在一个二进制文件中，只有一个文件。默认是 dump.rdb。RDB 技术非常适合做备份，可以保存最近一个小时，一天，一个月的全部数据。保存数据是在单独的进程中写文件，不影响 Redis 的正常使用。RDB 恢复数据时比其他 AOF 速度快。redis通过一定的条件判断，是否需要将内存中数据写入到磁盘中，在服务器启动时会去读取磁盘中的dump.rdb问将数据写入到内存中去。指定时间间隔将数据持久化到硬盘。执行shutdown命令，flushdb会直接将数据写入到硬盘中。

优点：数据恢复十分方便，比AOF要快

缺点：

1. 会丢失最后一次快照以后修改的数据。
2. 需要分配一个子进程来操作磁盘，会占用一定的CPU。



### AOF

Append-only File（AOF），Redis 每次接收到一条改变数据的命令时，它将把该命令写到一个 AOF 文件中（只记录写操作，读操作不记录），当 Redis 重启时，它通过执行 AOF 文件中所有的命令来恢复数据。

aof是文件追加，通过记录每次set key的记录，追加到一个文件中，在启动服务器时，将这些命令全部执行过去，大数据时效率较慢

aof文件被破坏时，可以通过redis-check-aof --fix appendonly.aof 文件明修复，这个过程会丢失部分数据

config get dir 时/root在root目录下，是因为我启动的时候实在root目录下启动的

修改appendonly.aof配置文件后，服务端拒绝连接，查看进程是没有启动

改的不是很乱，数据没有丢失，将这个功能关闭之后，之前写入到appendonly.aof的数据就无法写入到内存中了

~~~bash
#aof文件写入命令策略
appendfsync no #不主动进行同步操作，而是完全交由操作系统来做（即每 30 秒一次），比较快但不是很安全。
appendfsync always #每次执行写入都会执行同步，慢一些但是比较安全。
appendfsync everysec #每秒执行一次同步操作，比较平衡，介于速度和安全之间。这是默认项。
auto-aof-rewrite-min-size#允许重写的最小 AOF 文件大小，默认是 64M 。当 aof 文件大于 64M 时，开始整理 aof 文件，去掉无用的操作命令。缩小 aop 文件。
~~~

优点：数据的完整性比RDB要好。

缺点：aof文件在操作过程中会越来越大，大数据量启动要比RDB慢。



## 过期策略

Redis 的过期策略指的是在 Redis 中设置过期时间后，当键到达过期时间时如何处理的策略。Redis 实现了多种过期策略，常见的有以下几种：

1. 定时删除策略：Redis 会在键到达过期时间时立即删除该键。这种策略的优点是可以保证内存占用不会超过限制，缺点是在删除大量过期键时会增加 CPU 负载。

2. 惰性删除策略：Redis 不会主动删除过期键，而是在客户端尝试访问该键时检查是否过期，如果过期则删除该键。这种策略的优点是可以减少删除操作对 CPU 的影响，缺点是可能会导致内存占用超过限制。

3. 定期删除策略：Redis 会每隔一段时间主动删除一批过期键，以保持内存占用在合理范围内。这种策略的优点是可以平衡 CPU 负载和内存占用，缺点是无法保证内存占用不会超过限制。

Redis 默认使用惰性删除策略，但也可以通过配置文件或命令行参数来指定其他的过期策略。选择合适的过期策略需要根据具体的业务需求和系统性能进行权衡。



## 订阅通知

~~~bash
subscribe channel [channel...] #订阅频道，在服务端订阅频道之后就不能输入命令了，只能通过CTRL+c退出，直接就退出redis-cli
publish channel message #发布消息，订阅频道的客户端就能接收到消息
unsubscribe [channel [channel...]] #取消订阅频道
~~~

reids源码里的pubsub.c文件。

![image-20220529095816570](http://47.101.155.205/image-20220529095816570.png)



## Redis主从复制

通过持久化功能，Redis 保证了即使在服务器重启的情况下也不会丢失（或少量丢失）数据，但是由于数据是存储在一台服务器上的，如果这台服务器出现故障，比如硬盘坏了，也会导致数据丢失。

为了避免单点故障，我们需要将数据复制多份部署在多台不同的服务器上，即使有一台服务器出现故障其他服务器依然可以继续提供服务。

这就要求当一台服务器上的数据更新后，自动将更新的数据同步到其他服务器上，那该怎么实现呢？Redis 的主从复制。

我们可以通过部署多台 redis，并在配置文件中指定这几台 redis 之间的主从关系，主负责写入数据，同时把写入的数据实时同步到从机器，这种模式叫做主从复制，即master/slave，并且 redis 默认 master 用于写，slave 用于读，向 slave 写数据会导致错误。

redis默认每个服务端都是master，每个slave只能有一个master

~~~bash
info [section] #打印redis server
slaveof ip port #配置从机的主机ip及端口号
~~~



###VMware搭建多个虚拟机

1. 虚拟机——>管理——>克隆

![2克隆源](http://47.101.155.205/image-20220529125217608.png)



![3.克隆方式](http://47.101.155.205/image-20220529125259877.png)



![4.启动查看ip](http://47.101.155.205/image-20220529125857597.png)



~~~bash
#修改主机名称，主机名称在配置文件中配置/etc/hostname，进入这个文件修改就可以了，修改之后要重启才看可以
vim /etc/hostname

#修改两个克隆出来的虚拟机的ip地址及主机名称
cd /etc/sysconfig/network-scripts #进入网络配置文件的目录
vim ifcfg-ens33 #在文件中添加一个一行IPADDR=196.168.144.129同一网段，前面三位相同，保存退出
systemctl restart network #重启网络ifconfig查看是否有效
~~~

确定3台服务器搭建完毕，通过Xshell能连接上

可以对配置文件进行修改

~~~bash
logfile "6379.log" #上面写了会生成在/dev/生成日志，启动测试发现，日志生成在./目录下，启动目录下，而且启动之后就没有启动提示了
~~~



### 通过命令建立主从关系

~~~bash
slaveof host port #指定此server为从节点，只能从master读取复制的数据
Ok #不管是否连接成功都会返回ok
127.0.0.1:6379> slaveof 196.168.144.130 6379
OK Already connected to specified master #出现这个是因为两次的ip port都一样
#指定成功会有结果返回
127.0.0.1:6379> set k1 v1
(error) READONLY You can't write against a read only replica. 
slaveof no one #
#使用VMware模拟3台虚拟机，使用失败，采用单机多端口模拟使用
~~~



~~~bash
#新建一份配置文件，redis.6380.conf
include /usr/local/bin/config/redis.conf
port 6380
logfile "6380.log"
dbfilename dump6380.rdb
pidfile /var/run/redis_6380.pid
#这种方式的配置一定要让include在第一行，这样后面的配置才会覆盖前面的配置
#新建一份配置文件，redis.6381.conf
port 6381
logfile "6381.log"
include /usr/local/bin/config/redis.conf
dbfilename dump6381.rdb
pidfile /var/run/redis_6381.pid 

#复制一份redis.conf配置文件修改里面的内容
port
pidfile
dbfilename
logfile
~~~

单机多端口测试

~~~bash
redis-server config/redis.conf #6379端口
redis-server config/redis6381.conf #6381端口
redis-server redis6380.conf #6380端口
#启动3个端口，打开3个窗口，使用redis-cli客户端连接
#查看里面的keys，通过命令设置主从关系
slaveof 127.0.0.1 6379 #返回结果为OK，这个时候，bin目录下已经生成了dump6380.rdb文件
slaveof 127.0.0.1 6379 #返回结果为OK，这个时候，bin目录下已经生成了dump6381.rdb文件
~~~

![命令配置主从关系](http://47.101.155.205/image-20220529154208446.png)



- 服务器宕机

![6379宕机](http://47.101.155.205/image-20220529155322231.png)

主从复制服务器宕机到服务器恢复，从机会自动连接上主机，这个过程应该是由使用redis的订阅发布模块的功能的。

- 注意点：

1. 服务器宕机，手动配置从机执行slaveof no one 命令，主机恢复连接，从机还是主机
2. 通过命令的方式配置主从关系，重新启动后没有效果
3. 命令配置从节点，主节点宕机，slaveof no one，从节点为主节点，主节点连接上也没有用
4. 主节点宕机，可以通过手动设置主节点，从节点的方式重新建立主从复制关系
5. 一个master可以多个slave，一个slave只能有一个master



### 复制原理

通过测试也能发现，设置server为slave就会在./目录下生成一个配置.rdb文件，就是slave启动之后就会连接到master发送一个同步sync命令，master接到命令，启动后台存盘进程，同时收集所有接收到的用户修改的的数据集的命令，在后台进程执行完毕之后，master将整个数据文件送到slave，并完成一次完全同步。

全量复制：salve发送一个请求，master将

增量复制：slave初始化后，开始正常工作，此时master服务器发生的写操作同步到从服务器的过程。



情况模拟：使用java程序连接一个master服务器，通过循环写入100000条数据，启动java程序后，启动master的slave服务器，这个时候



54秒，kill -9 9万条数据

37秒 ，kill 带保存数据的命令12万的数据

50秒左右 kill -9 11万条数据

53秒 kill -9 master进程 18万数据在slave master只有10485条数据

53秒 kill -9 salve 5816条数据

53秒之后 1秒多 kill -9 master 5816

53秒 kill -9 salve 0条数据

53秒之后 1秒多 kill -9 master 4200数据



全量复制：salve服务在启动后就会连接master发送一个请求，去获取mater当前最新的rdb快照，master不再将临时的写入rfb文件覆盖之前的rdb文件，而是将这个文件传输给slave服务器，在在某种情况下才会覆盖原有的rdb文件。（我的理解）

**无磁盘复制**：子进程直接将RDB通过网络发送给从服务器，不使用磁盘作为中间存储

master服务器会开启一个后台进程用于将redis中的数据生成一个rdb文件，与此同时，服务器会缓存所有接收到的来自客户端的写命令（包含增、删、改），先将该rdb文件传递给slave服务器，而slave服务器会将rdb文件保存在磁盘并通过读取该文件将数据加载到内存，在此之后master服务器会将在此期间缓存的命令通过redis传输协议发送给slave服务器，然后slave服务器将这些命令依次作用于自己本地的数据集上最终达到数据的一致性。

![image-20220529182455514](http://47.101.155.205/image-20220529182455514.png)



这篇文章：https://blog.csdn.net/MortShi/article/details/122921765

主从复制特点

1. Redis使用异步复制。但从Redis 2.8开始，从服务器会周期性的应答从复制流中处理的数据量。
2. 一个主服务器可以有多个从服务器。
3. 从服务器也可以接受其他从服务器的连接。除了多个从服务器连接到一个主服务器之外，多个从服务器也可以连接到一个从服务器上，形成一个图状结构。
4. Redis主从复制不阻塞主服务器端。也就是说当若干个从服务器在进行初始同步时，主服务器仍然可以处理请求。
5. 主从复制也不阻塞从服务器端。当从服务器进行初始同步时，它使用旧版本的数据来应对查询请求，假设你在redis.conf配置文件是这么配置的。否则的话，你可以配置当复制流关闭时让从服务器给客户端返回一个错误。但是，当初始同步完成后，需要删除旧的数据集和加载新的数据集，在这个短暂的时间内，从服务器会阻塞连接进来的请求。
6. 主从复制可以用来增强扩展性，使用多个从服务器来处理只读的请求（比如，繁重的排序操作可以放到从服务器去做），也可以简单的用来做数据冗余。
7. 使用主从复制可以为主服务器免除把数据写入磁盘的消耗：在主服务器的redis.conf文件中配置“避免保存”（注释掉所有“保存“命令），然后连接一个配置为“进行保存”的从服务器即可。但是这个配置要确保主服务器不会关机。





### 高可用性哨兵模式

Sentinel 哨兵是 redis 官方提供的高可用方案，可以用它来监控多个 Redis 服务实例的运行情况。Redis Sentinel 是一个运行在特殊模式下的 Redis 服务器。Redis Sentinel 是在多个Sentinel 进程环境下互相协作工作的。



Sentinel 系统有三个主要任务：

1. 监控：Sentinel 不断的检查主服务和从服务器是否按照预期正常工作。
2. 提醒：被监控的 Redis 出现问题时，Sentinel 会通知管理员或其他应用程序。
3. 自动故障转移：监控的主 Redis 不能正常工作，Sentinel 会开始进行故障迁移操作。将一个从服务器升级新的主服务器。让其他从服务器挂到新的主服务器。同时向客户端提供新的主服务器地址。

![动力节点redis](http://47.101.155.205/image-20220529162503391.png)

### sentinel.conf配置文件

~~~bash
port 26379 #默认配置文件端口号
sentinel monitor mymaster 127.0.0.1 6380 2 #默认投票数是，在只有一个哨兵进程的情况下，不能投票成功
redis-sentinel sentinel.conf配置文件地址 #启动哨兵进程命令
~~~



哨兵进程日志

![image-20220529170803139](http://47.101.155.205/image-20220529170803139.png)

哨兵工作原理

1. Sentinel 会不断检查 Master 和 Slave 是否正常。
2. 如果 Sentinel进程挂了，就无法监控，所以需要多个哨兵，组成 Sentinel 网络，一个健康的Sentinel 至少有 3 个 Sentinel 应用。彼此在独立的物理机器或虚拟机。
3. 监控同一个 Master 的 Sentinel 会自动连接，组成一个分布式的 Sentinel 网络，互相通信并交换彼此关于被监控服务器的信息。
4. 当一个 Sentinel 认为被监控的服务器已经下线时，它会向网络中的其它 Sentinel 进行确认，判断该服务器是否真的已经下线。
5. 如果下线的服务器为主服务器，那么 Sentinel 网络将对下线主服务器进行自动故障转移，通过将下线主服务器的某个从服务器提升为新的主服务器，并让其从服务器转移到新的主服务器下，以此来让系统重新回到正常状态。
6. 下线的旧主服务器重新上线，Sentinel 会让它成为slave，挂到新的master下。

哨兵模式会修改redis.conf配置文件

~~~bash
user default on nopass ~* +@all #最后一行
~~~



当所有的服务都宕机时，sentinel会说明在一个指定时间之前不会执行故障转移。





## 安全设置

访问 Redis 默认是没有密码的，这样不安全，任意用户都可以访问。可以启用使用密码才能访问 Redis。设置 Redis 的访问密码，修改 redis.conf 中这行 requirepass 密码。密码要比较复杂，不容易破解，而且需要定期修改。因为 redis 速度相当快，所以在一台比较好的服务器下，一个外部的用户可以在一秒钟进行 150K 次的密码尝试，需要指定非常非常强大的密码来防止暴力破解。



- 设置密码的方式

~~~bash
config set requirepass 密码 #客户端连接上之后执行命令，重启即失效
requirepass "" #配置文件修改,""改为密码即可
~~~



- 访问有密码的redis服务端

~~~bash
auth password #连接之后输入命令，进行密码验证
redis-cli -p port -a password #会提示在命令使用-a或者-u密码连接不安全
~~~



## Redis缓存穿透和雪崩

### Redis客户端缓存

![image-20220529193447606](http://47.101.155.205/image-20220529193447606.png)

### Redis缓存穿透

大概意思是客户端发来请求，需要查询某个数据，可是这个数据在redis数据库中没有，又去关系型数据库里面查，发起大量的这样请求，导致数据库宕机。

处理这种请求的方式：

1. 如果这个数据在缓存中不存在，去数据库查询，不存在，放回一个空的结果，让后让redis保存起来，用户下次再来查询，返回的就是空的结果。

问题是：频繁这样的操作会让缓存里面多出许多无用的数据，不过这个可以设置key的时间来解决。如果用不同的key做大量的查询，又回到了本质问题了，指标不治本。

2. 加过滤器，查询的数据在里面，我才放行，没有直接不让通过。用到了布隆过滤器。准确性问题，说key存在的时候，可能不存在，小概率问题。



### 缓存击穿

一个key设置了有效时间，可是突然在他快失效的时间附近，发生了大量的请求，因为key失效了，所有的请求都到了关系型数据库上。

解决方法：对过期的key加锁，限制并发，通过第一个进来的请求，将结果放回缓存中。

单机环境可以使用lock锁，synchronized锁

分布式使用：分布式锁，基于数据库，基于Redis或者zookeeper的分布式锁





### 缓存雪崩

在某个时间段内，缓存集中失效，这个时候有大量的请求，查询数据大，所有的请求都会到数据库层，引起数据库的宕机



解决方法：

1. 数据预热，在正式部署前，把可能访问的数据先访问一遍，存到缓存中
2. 均匀设置缓存失效时间





## redis远程客户端

官网地址：https://redisdesktop.com/

连接Linux的Reids之前需要修改Redis服务器的配置信息。 Redis服务器有安全保护措施，默认只有本机（安装Redis的那台机器）能够访问。配置信息存放在Redis安装目录下的redis.conf文件。修改此文件的两个设置。远程连接redis需要修改redis主目录下的redis.conf配置文件：

1. bind ip 绑定ip此行注释
2. protected-mode yes 保护模式改为 no



修改配置文件后，需要使用配置文件重新启动 Reids，默认不加载配置文件。先关闭已经启动的 Redis ，再次启动





## redis-benchmark

redis测试

![image-20220527180841725](http://47.101.155.205/image-20220527180841725.png)

![image-20220527180943158](http://47.101.155.205/image-20220527180943158.png)



![image-20220527181101712](http://47.101.155.205/image-20220527181101712.png)

## reids编程客户端

- Jedis

redis 的 Java 编程客户端，Redis 官方首选推荐使用 Jedis，jedis 是一个很小但很健全的redis 的 java 客户端。通过 Jedis 可以像使用 Redis 命令行一样使用 Redis。

- jedis 完全兼容 redis 2.8.x and 3.x.x
- Jedis 源码：https://github.com/xetorthio/jedis
- api 文档：http://xetorthio.github.io/jedis/



C 、C++ 、C# 、Erlang、Lua 、Objective-C、Perl 、PHP 、Python 、Ruby、Scala 、Go等 40 多种语言都有连接 redis 的编程客户端



## 阿里云远程服务器安装redis

1. redis官网下载linux安装包。
2. 将redis的tar.gz的压缩包上传至远程服务器的/opt目录下。
3. 执行tar -zxvf 安装包全名称。
4. 查看系统是否安装gcc编译器。没有安装直接yum -y install gcc安装gcc编译器。
5. 进入解压的文件，执行make命令，等待出现：Leaving directory '/opt/redis-6.0.6/src即安装成功。
6. 执行make install，将redis的命令安装至/usr/local/bin/中。
7. redis-benchmark  redis-check-aof  redis-check-rdb  redis-cli  redis-sentinel  redis-server。/usr/local/bin/下出现了上面的。

~~~tex
106.15.234.93//公网ip
172.20.30.249//私网ip
~~~



~~~bash
cd /opt
wget http://download.redis.io/releases/redis-6.0.8.tar.gz
tar -zxvf redis-6.0.8.tar.gz
cd redis-6.0.8
make
#gcc版本过低，导致安装失败并没有出现redis-server的命令升级gcc之后再次make就可以了
make install #再次cd /usr/local/bin目录中出现了需要的命令

~~~





## lua

~~~bash
# 不设置条件会导致一直加锁失败
eval "if redis.call('setnx',KEYS[1],ARGV[1]) == 1 then redis.call('expire',KEYS[1],ARGV[2]) return 1 else return 0 end;" 1 k1 v1 30
~~~

~~~bash
该项目为公司的一套电商产品，主打的拍卖模式有竞购、秒拍、普通拍、盲拍。采用微服务架构开发，主要服务有商品服务、支付服务、登录服务、拍卖服务、物流服务、积分服务、优惠券服务，通过邀请机制实现用户裂变，用户和代理可以通过邀请用户获取红包，以及用户的后续购物都会涉及到分层返利计算。
~~~



~~~bash
# 使用redis.call()或redis.pcall()来执行redis命令
eval "return redis.call('set', KEYS[1], ARGV[1])" 1 key k1

eval "return redis.call('del', KEYS[1])" 1 key

# 少传参数报错不同
eval "return redis.pcall('set', KEYS[1], ARGV[1])" 1 key k1

eval "return redis.pcall('del', KEYS[1])" 1 key

~~~

![image-20240201134830271](http://47.101.155.205/image-20240201134830271.png)



~~~lua
if redis.call('get', KEYS[1]) == ARGV[1]
    then return false
else
    redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2])
    return true
end

~~~



~~~ lua
-- redis分布式原子锁
if redis.call('get', KEYS[1]) == ARGV[1] then return false else redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2]) return true end

-- 可视化界面成功返回的是1,失败是nil

if redis.call('get', KEYS[1]) == ARGV[1] then return 0 else redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2]) return 1 end

-- 使用exists retrun 1/0(不存在) 
if redis.call('exists', KEYS[1]) == 1 then return 0 else redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2]) return 1 end

-- 使用exists retrun true/false(不存在) 
if redis.call('exists', KEYS[1]) == 1 then return false else redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2]) return true end

~~~

~~~bash
eval "if redis.call('exists', KEYS[1]) == '1' then return false else redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2]) return true end" 1 key value 30


~~~



## 注意点

1.配置文件

2.序列化

3.lua脚本设置返回值

4.key的类型

5.序列化的类需要有无参构造方法
