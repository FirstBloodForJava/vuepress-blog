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
| docker run                            | docker logs <container-id> |
| systemd 启动                          | journalctl -u <service>    |

![image-20250210171734554](http://47.101.155.205/image-20250210171734554.png)