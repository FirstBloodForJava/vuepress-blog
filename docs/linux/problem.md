# 问题

## 1.Java访问文件不关闭流

通过`Files.newInputStream(Path)`创建的InputStream流未被关闭。

`/proc/sys/fs/file-max`中系统全局文件描述符总数。

通过`ulimit -n`可以查看每个应用程序能使用的文件描述符数。

~~~bash
# 文件可以查看程序的限制
/proc/pid/limits
# 使用的文件描述符数量
/proc/pid/fd

# 每隔1s指向命令 查看tcp情况
watch -n 1 "ss -tan state established | grep 8080"

# 抓包命令
sudo tcpdump -i any port 8080 -nn -vv

~~~

![image-20250420151022710](http://47.101.155.205/image-20250420151022710.png)



当超过这个数量之后，再去访问文件，提示异常：

![image-20250420151628024](http://47.101.155.205/image-20250420151628024.png)

**当文件描述符被彻底耗尽时，则Web请求也无法处理。**

![image-20250420151733774](http://47.101.155.205/image-20250420151733774.png)

![image-20250420152100672](http://47.101.155.205/image-20250420152100672.png)