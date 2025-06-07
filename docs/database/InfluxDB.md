# InfluxDB

官网：https://www.influxdata.com/

InfluxDB是开源分布式时序、时间和指标数据库，使用Go语言编写，无需外部依赖。



## 安装

官网介绍文档：https://docs.influxdata.com/influxdb/v2/install/



### Linux

Linux介绍了两种方式：

- 方式一：安装InfluxDB作为系统服务
- 方式二：手动下载并安装二进制文件



密钥对文件：

| Private key file              | Public key                                                   | 支持系统 |
| ----------------------------- | ------------------------------------------------------------ | -------- |
| influxdata-archive.key        | 943666881a1b8d9b849b74caebf02d3465d6beb716510d86a39f6c8e8dac7515 | 新       |
| influxdata-archive_compat.key | 393e8779c89ac8d958f81f942f9ad7fb82a25e133faddaf92e15b16e6ac9ce4c | 旧       |



方式一：

~~~bash
# 需要找到对于Linux系统版本需要的 influxdata-archive.key
curl --silent --location -O \
https://repos.influxdata.com/influxdata-archive.key \
&& echo "943666881a1b8d9b849b74caebf02d3465d6beb716510d86a39f6c8e8dac7515  influxdata-archive.key" \
| sha256sum --check - && cat influxdata-archive.key \
| gpg --dearmor \
| tee /etc/pki/rpm-gpg/RPM-GPG-KEY-influxdata > /dev/null

# 将InfluxData存储库添加到YUM存储库列表中
cat <<EOF | tee /etc/yum.repos.d/influxdata.repo
[influxdata]
name = InfluxData Repository - Stable
baseurl = https://repos.influxdata.com/stable/${basearch}/main
enabled = 1
gpgcheck = 1
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-influxdata
EOF

# 安装 influxdb
sudo yum install influxdb2

# 启动(安装后会创建/lib/systemd/system/influxdb.service 服务文件)
sudo service influxdb start

# 查看状态
sudo service influxdb status
# 成功则有以下输出
influxdb.service - InfluxDB is an open-source, distributed, time series database
   Loaded: loaded (/lib/systemd/system/influxdb.service; enabled; vendor preset: enable>
   Active: active (running)
   

# 传递启动参数
# 编辑 /etc/default/influxdb2 服务配置文件
ARG1="--http-bind-address :8087"
ARG2="--storage-wal-fsync-delay=15m"
# 编辑 /lib/systemd/system/influxdb.service 文件，将参数传给ExecStart
ExecStart=/usr/bin/influxd $ARG1 $ARG2

~~~



方式二：

根据`uname -m`命令结果选择压缩包

| 输出    | 架构           | 应下载包类型      |
| ------- | -------------- | ----------------- |
| x86_64  | 64位 AMD/Intel | AMD64或x86_64     |
| aarch64 | 64位 ARM       | ARM64或aarch64    |
| armv7l  | 32位 ARM       | ARMv7（较少支持） |
| i686    | 32位 Intel     | i386（非常旧）    |

~~~bash
# 先下载系统需要的压缩包

# curl 命令下载 amd64 方式
curl --location -O \
https://download.influxdata.com/influxdb/releases/v2.7.12/influxdb2-2.7.12_linux_amd64.tar.gz
# curl 命令下载 arm64 方式
curl --location -O \
https://download.influxdata.com/influxdb/releases/v2.7.12/influxdb2-2.7.12_linux_arm64.tar.gz

# 系统校验InfluxDB的密钥对
# amd64 需要替换https://repos.influxdata.com/influxdata-archive.key 为密钥键(不确定是否能省略)
curl --silent --location https://repos.influxdata.com/influxdata-archive.key \
| gpg --import - 2>&1 \
| grep 'InfluxData Package Signing Key <support@influxdata.com>' \
&&
# Download and verify the binary's signature file
curl --silent --location "https://download.influxdata.com/influxdb/releases/v2.7.12/influxdb2-2.7.12_linux_amd64.tar.gz.asc" \
| gpg --verify - influxdb2-2.7.12_linux_amd64.tar.gz \
2>&1 | grep 'InfluxData Package Signing Key <support@influxdata.com>'
# arm64
curl --silent --location https://repos.influxdata.com/influxdata-archive.key \
| gpg --import - 2>&1 \
| grep 'InfluxData Package Signing Key <support@influxdata.com>' \
&&
# Download and verify the binary's signature file
curl --silent --location "https://download.influxdata.com/influxdb/releases/v2.7.12/influxdb2-2.7.12_linux_arm64.tar.gz.asc" \
| gpg --verify - influxdb2-2.7.12_linux_arm64.tar.gz \
2>&1 | grep 'InfluxData Package Signing Key <support@influxdata.com>'
# 安装成功输出如下
gpg: Good signature from "InfluxData Package Signing Key <support@influxdata.com>" [unknown]

# 解压缩
tar xvzf ./influxdb2-2.7.12_linux_amd64.tar.gz
tar xvzf ./influxdb2-2.7.12_linux_arm64.tar.gz

# 提取可执行文件到$PATH中
sudo cp ./influxdb2-2.7.12/usr/bin/influxd /usr/local/bin/
sudo cp ./influxdb2-2.7.12/usr/bin/influxd /usr/local/bin/

# 启动命令 ./influxdb2-2.7.12/usr/bin/influxd
influxd

# 启动携带参数
influxd --http-bind-address=:8086 --reporting-disabled

~~~



## 使用介绍

InfluxDB数据库将时间序列数据存储在`buckets`和`measurements`中。一个`bucket(存储桶)`可以包含多个`measurements`。`measurement`包含多个`tags`和`fields`。

- **Bucket**：存储时间序列数据的命名位置。一个存储桶可以包含多个测量值 。
  - **Measurement**：时间序列数据的逻辑分组。给定测量中的所有点(points)都应具有相同的标签 。一个测量包含多个标签和字段 。
    - **Tags**：值不同但不经常更改的键值对。标签用于存储每个点的元数据，例如，用于标识数据源的东西，如主机、位置、站点等。
    - **Fields**：值随时间变化的键值对，例如：温度、压力、股票价格等。
    - **Timestamp**：与数据关联的时间戳。当存储在磁盘上并进行查询时，所有数据都按时间排序。
    - **Point**：单个数据记录，收集的数据tag keys、tag values、field keys和时间戳信息。
    - **Series**：一组具有相同measurement、tag keys、tag values的points。

和传统数据库概念对比

| InfluxDB中的概念 | 传统关系数据库中的概念 |
| ---------------- | ---------------------- |
| org              | 用户                   |
| Bucket           | 数据库                 |
| measurement      | 数据库中的表           |
| point            | 表中的一行数据集       |

![image-20250607144203721](http://47.101.155.205/image-20250607144203721.png)



### 写数据



**HTTP API写数据：**

~~~bash
# 配置环境变量
export INFLUX_HOST=<ip+port>
export INFLUX_ORG=<org>
export INFLUX_TOKEN=<token>
# precision 表示时间戳精度，默认ns
# home 表示 measurement
# room=Kitchen temp=21.0 表示tags
# co=0i 表示fields
# 1641024000 表示时间戳
curl --request POST \
"$INFLUX_HOST/api/v2/write?org=$INFLUX_ORG&bucket=<database>&precision=s" \
  --header "Authorization: Token $INFLUX_TOKEN" \
  --header "Content-Type: text/plain; charset=utf-8" \
  --header "Accept: application/json" \
  --data-binary "
home,room=Living\ Room temp=21.1,hum=35.9,co=0i 1641024000
home,room=Kitchen temp=21.0,hum=35.9,co=0i 1641024000
"

~~~



### 查数据

InfluxQL查询语法：

- SELECT：指定要查询的标签和属性；
- FROM：指定查询的`measurement`；
- WHERE：可根据属性、标签、时间筛选数据。

~~~sql
SELECT co,hum,temp,room FROM "get-started".autogen.home 
WHERE time >= '2022-01-01T08:00:00Z' AND time <= '2022-01-01T20:00:00Z'

~~~





**HTTP API查数据：**

~~~bash
curl --request POST \
"$INFLUX_HOST/api/v2/query?org=$INFLUX_ORG&bucket=get-started" \
  --header "Authorization: Token $INFLUX_TOKEN" \
  --header "Content-Type: application/vnd.flux" \
  --header "Accept: application/csv" \
  --data 'from(bucket: "get-started")
    |> range(start: 2022-01-01T08:00:00Z, stop: 2022-01-01T20:00:01Z)
    |> filter(fn: (r) => r._measurement == "home")
    |> filter(fn: (r) => r._field== "co" or r._field == "hum" or r._field == "temp")
  '

~~~

