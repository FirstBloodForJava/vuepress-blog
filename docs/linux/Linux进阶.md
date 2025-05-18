# Linux进阶



## OOMkiller事件

~~~bash
# /var/log/messages或/var/log/syslog日志
grep -i 'oom' /var/log/messages   # CentOS/RHEL
grep -i 'killed process' /var/log/messages

grep -i 'oom' /var/log/syslog     # Ubuntu/Debian

~~~





~~~bash
# dmesg日志查看OOMkiller事件
dmesg | grep -i 'oom'

dmesg | grep -i 'killed'

# 内容较多的翻页功能
dmesg | grep -i 'oom' | less

~~~

![image-20250210170444821](http://47.101.155.205/image-20250210170444821.png)





~~~bash
# 查询oom的统计信息
cat /proc/vmstat | grep oom


~~~



~~~bash
# 查询进程的 OOM 评分
# 越高的值表示进程越容易被 OOM 杀死
cat /proc/<PID>/oom_score

# 可以手动调整进程的 OOM 权重
cat /proc/<PID>/oom_score_adj


~~~



~~~bash
# 列出所有进程的oom分数
for pid in $(ps -e -o pid); do echo -n "$pid: "; cat /proc/$pid/oom_score; done | sort -k2 -nr | head -10


~~~





## kill -3



~~~bash
# 发送 SIGQUIT 信号,将线程dump文件输出到标准输出(stdout)
kill -3 <java-pid>

~~~

| 启动方式                              | dump内容位置               |
| ------------------------------------- | -------------------------- |
| java -jar jar包                       | 终端(stdout)               |
| nohup java -jar jar包 &               | nohup.out                  |
| nohup java -jar jar包 > output 2>&1 & | output                     |
| docker run                            | docker logs `container-id` |
| systemd 启动                          | journalctl -u `service`    |

![image-20250210171734554](http://47.101.155.205/image-20250210171734554.png)



## 调整系统交换内存

创建

~~~bash
# 创建4GB大小的swap文件
sudo fallocate -l 4G /swapfile

# 设置正确的权限
sudo chmod 600 /swapfile

# 格式化为swap
sudo mkswap /swapfile

# 启用swap文件
sudo swapon /swapfile

# 交换文件是否生效
sudo swapon --show

# 指向后，系统重启也生效
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

~~~

![image-20250420154249576](http://47.101.155.205/image-20250420154249576.png)



安全删除swap：

~~~bash
sudo swapoff /swapfile
sudo rm /swapfile

~~~



## 连接相关命令

Linux服务器之间进行文件拷贝：

~~~bash
# 执行命令后需要进行密码认证
# 拷贝单个文件到其它指定的服务器
scp <file> [user]@[ip]:<path>
# 递归拷贝目录
scp -r <path> [user]@[ip]:<path>

# 指定端口
scp -P 23 <path> [user]@[ip]:<path>

~~~

ssh连接其它服务器：

~~~bash
# 执行后需要输入密码
ssh -v [user]@[ip]

~~~

**修改Linux连接端口：**

~~~bash
# 备份文件
cp /etc/ssh/sshd_config /etc/ssh/sshd_config_bak
# 修改文件
vim /etc/ssh/sshd_config
# 添加需要监听的端口
Port 22

# 保存后，重启sshd服务
sudo systemctl restart sshd

# 还原
cp /etc/ssh/sshd_config_bak /etc/ssh/sshd_config

~~~



## 定时删除日志文件

设置步骤：

1. 准备删除日志文件的脚本；
2. 通过crontab定时执行删除脚本；

**删除第30天前的文件：rm30days.sh**

~~~bash
#!/bin/bash
path=/springboot/spring-kafka/log
date=`date --date="30 days ago" "+%Y-%m-%d"`
# 注意"+%Y-%m-%d" 要和日志文件名称一致
rm -r $path/$date'.log'

~~~

**crontab命令添加执行命令：**

~~~bash
crontab -e

# 每天10点执行定时
0 10 * * * sh /springboot/spring-kafka/rm30days.sh

~~~

![image-20250428144348107](http://47.101.155.205/image-20250428144348107.png)



**会在/var/spool/mail/root文件中生成通知。**



## 监控命令

### vmstat

~~~bash
vmstat 

~~~

可接参数：

- n：多少秒输出一次统计信息。
- n m：多少n秒输出一次统计信息，共m次。



![image-20250517212232784](http://47.101.155.205/image-20250517212232784.png)

显示数据列的含义：

**procs**进程相关：

- r：表示等待CPU资源的进程数（不包含等待IO的进程）。如果这个数值大于计算机的CPU核数，那么计算机的CPU资源已近饱和。
- b：处于不可中断睡眠状态的进程数（包含等待IO的进程）。高值可能表示IO瓶颈。

**memory**内存相关，单位KB：

- swpd：已使用的虚拟内存（交换内存）大小。持续增长可能表示物理内存不足，系统开始频繁使用交换内存。
- free：空闲的物理内存大小。过小的值可能表示内存紧张，但需结合缓存使用情况判断。
- buff：用作缓冲区的内存大小，用于缓存磁盘块的临时读写。
- cache：用作缓存的内存大小，用于缓存文件系统的数据（如打开的文件）。buff和cache会被内核自动释放，供应用程序需要时使用。

**swap**交换内存，单位KB/s：

- si：**swap-in**，每秒从交换内存读取的数据量。持续大于 0 表示物理内存不足。
- so：**swap-out**，每秒从交换内存读取的数据量。持续大于0同样表示内存不足。

**io**块设备，IO相关，单位：块/s：

- bi：**blocks-in**，每秒从块设备（如磁盘）读取的块数。高值表示磁盘读操作频繁（1 块 = 通常为 512 字节或 1KB）。
- bo：**blocks-out**，每秒写入块设备的块数。高值表示磁盘写操作频繁，可能影响系统性能。

**system**系统事件：

- in：**interrupts**，每秒发生的中断次数（包括时钟中断和硬件设备中断）。
- cs：**context switches**，每秒的上下文切换次数（CPU 从一个进程切换到另一个进程的次数）。高值可能表示进程争用CPU或调度频繁。

**cpu**使用率，百分比：

- us：**user**，用户态程序占用CPU时间的百分比（非内核进程）。高值表示应用程序消耗大量CPU。
- sy：**system**，内核态程序占用 CPU 时间的百分比。高值可能表示系统调用频繁或内核处理任务较重。
- id：**idle**，CPU空闲时间的百分比。低值表示 CPU 繁忙，需结合其他指标判断瓶颈。
- wa：**wait**，CPU等待IO完成的时间百分比。高值（如>20%）通常表示IO瓶颈（磁盘或网络延迟）。
- st：**stolen**，在虚拟化环境中，被其他虚拟机占用的CPU时间百分比。高值表示宿主机的CPU资源被其他虚拟机争抢。



### dmesg

display message命令是 Linux 系统中用于查看内核环缓冲区（kernel ring buffer）消息的工具，它记录了系统启动信息和内核在运行过程中输出的各种日志信息。

~~~bash
# 查看最近的错误/警告日志
dmesg | grep -iE 'error|fail|warn'

# 查询Linux oom-killer事件
dmesg | grep -i 'oom'

# 查询tcp事件情况
dmesg | grep -i tcp

~~~





### iostat

观察系统磁盘的使用情况，重点关注IO。

~~~bash
# -x 显示扩展信息 每秒采样一次，共3次
iostat -x 1 3

~~~

![image-20250518125257853](http://47.101.155.205/image-20250518125257853.png)

**avg-cpu各项含义**

- %user：用户态占用CPU的百分比（不包括 nice 优先级）。
- %nice：改变过优先级的用户进程占用CPU百分比。
- %system：内核态占用CPU的百分比。
- %iowait：等待I/O的CPU时间百分比（越高说明I/O越慢）。
- %steal：被虚拟机管理程序抢占的CPU百分比（只对虚拟机有意义）。
- %idle：空闲CPU百分比。

**Device**设备各项说明：

- Device：设备名称，如sda、nvme0n1等。
- rrqm/s：每秒进行的读请求合并数（读队列合并）。
- wrqm/s：每秒进行的写请求合并数（写队列合并）。
- r/s：每秒完成的读请求数。
- w/s：每秒完成的写请求数。
- rkB/s：每秒读的KB。
- wkB/s：每秒写的KB。
- avgrq-sz：平均每次I/O请求的数据大小（单位：扇区）。
- avgqu-sz：平均I/O队列长度（越高表示压力越大）。
- await：平均每个I/O操作的等待时间（毫秒，包括排队+服务时间）。
- r_await：读操作的平均等待时间。
- w_await：写操作的平均等待时间。
- svctm：平均每次设备I/O服务时间（毫秒）。
- %util：设备使用率，表示一秒中有多少时间在处理I/O请求。接近100%意味着设备繁忙或达到极限。



### sar

sar(System Activity Reporter)是Linux系统中非常强大的性能分析工具之一，属于`sysstat`工具包。它可以收集、报告和保存系统的各种资源使用情况，比如CPU、内存、I/O、网络等。

可以用它来查看实时性能数据，也可以查看历史的系统运行数据（默认保存在`/var/log/sa/`下）。

不同参数作用：

- `-u`：CPU 使用情况
- `r`：内存使用情况
- `-b`：I/O统计
- `-d`：设备读写情况
- `-n DEV`：网络接口情况
- `-n TCP,ETCP`：TCP指标查询
- `-q`：系统平均负载

~~~bash
sar -u 1 3

~~~

![image-20250518131135577](http://47.101.155.205/image-20250518131135577.png)

- %user：用户态CPU使用率。
- %nice：调整优先级的用户进程的CPU使用率。
- %system：内核态CPU使用率。
- %iowait：等待I/O完成的时间。
- %steal：被虚拟机管理程序占用的CPU时间。
- %idle：空闲CPU时间。

![image-20250518131404003](http://47.101.155.205/image-20250518131404003.png)

- kbmemfree：空闲物理内存。
- kbmemused：使用中的物理内存。
- %memused：物理内存使用百分比。
- kbbuffers：用于块设备缓存的内存。
- kbcached：用于文件缓存的内存。
- kbcommit：需要为进程保证的内存。
- %commit：kbcommit 与总内存的比值，表示内存压力。
- kbactive：活跃内存量（最近被访问的内存页，不易被回收）。
- kbinact：非活跃内存量（较长时间未访问，可被页面回收机制回收）。
- kbdirty：等待写入磁盘的脏页数量。**值过高可能导致I/O瓶颈**。

~~~bash
sar -b 1 3

~~~

![image-20250518132128289](http://47.101.155.205/image-20250518132128289.png)

- tps：每秒传输次数（读+写）。
- rtps：每秒读操作次数。
- wtps：每秒写操作次数。
- bread/s：每秒从块设备读取KB。
- bwrtn/s：每秒向块设备写入KB。

![image-20250518132316444](http://47.101.155.205/image-20250518132316444.png)

- DEV：设备名称。
- tps：每秒I/O请求数。
- rd_sec/s：每秒读的扇区数。
- wr_sec/s：每秒写的扇区数。
- avgrq-sz：平均每次I/O请求的数据大小。
- avgqu-sz：平均I/O队列长度。
- await：平均等待时间（ms）。
- svctm：平均服务时间（ms）。
- %util：设备使用率，接近100%表示忙碌。

![image-20250518132521252](http://47.101.155.205/image-20250518132521252.png)

- IFACE：网络接口名称。
- rxpck/s：每秒接收的数据包数量。
- txpck/s：每秒发送的数据包数量。
- rxkB/s：每秒接收的数据包量（KB）
- txkB/s：每秒发送的数据包量（KB）
- rxcmp/s：每秒接收的压缩数据包量。
- txcmp/s：每秒发送的压缩数据包量。
- rxmcst/s：每秒接收的多播数据包。

![image-20250518134005693](http://47.101.155.205/image-20250518134005693.png)

TCP统计指标：

- active/s：表示每秒本地发起的TCP连接数，即通过connect调用创建的TCP连接数。
- passive/s：表示每秒远程发起的TCP连接数，即通过accept调用创建的TCP连接数。
- iseg/s：每秒接收到的TCP段（段是TCP的传输单位）。
- oseg/s：每秒发送的TCP段。

ETCP统计指标：

- atmptf/s：每秒重试失败数。
- estres/s：每秒断开连接数。
- retrans/s：每秒重传数。
- isegerr/s：每秒错误数。
- orsts/s：每秒接收到的TCP RST(连接重置)段数，过高可能代表连接被异常关闭。

![image-20250518133141211](http://47.101.155.205/image-20250518133141211.png)

- runq-sz：当前运行队列长度（等待CPU的进程数）。包含正在运行的任务和就绪状态的任务。
- plist-sz：当前进程总数。
- ldavg-1：1分钟平均负载。
- ldavg-5：5分钟平均负载。
- ldavg-15：15分钟平均负载。
- blocked：当前因等待I/O操作而阻塞的任务数量。

