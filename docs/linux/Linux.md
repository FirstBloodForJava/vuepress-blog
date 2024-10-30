# Linux

## 什么是Linux

linux是一个开源、免费的操作系统，其稳定性、安全性、处理多并发能力已经得到业界的认可，目前大多数企业级应用甚至是集群项目都部署运行在linux操作系统之上，很多软件公司考虑到开发成本都首选linux，在中国软件公司得到广泛的使用。

Linux内核kernel最初是由芬兰人李纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。在1991年10月5日第一次正式向外公布。

在linux发布之前，有一种操作系统叫unix，由于价格昂贵不开放源码，所以李纳斯·托瓦兹（Linus Torvalds）决心要开发自己免费的操作系统，Linux借鉴了unix的思想，但没有一行unix的代码，linux系统是从unix系统发展出来的。
Linux 英文解释为 Linux is not Unix。现在业界有一种说法叫：类unix



### 什么是操作系统

操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。

操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计算机系统的硬件、软件及数据资源，控制程序运行，改善人机界面，为其它应用软件提供支持等。实际上，用户是不用接触操作系统的，操作系统管理着计算机硬件资源，同时按着应用程序的资源请求，为其分配资源，如：划分CPU时间，内存空间的开辟，调用打印机等。

- Windows操作系统

微软公司Windows操作系统 ，例如常用在个人计算机的Windows XP，Windows Vista，Windows 7，Windows 8，windows 10等。 用在服务器端的Windows Server 2003，Windows Server 2008等。



- Unix和Linux（类Unix）

 unix系列的SUN Solaris，IBM-AIX，HP-UX，FreeBSD等

类Unix(linux)的Red Hat Linux，CentOS，Debian，Ubuntu等



- Mac操作系统

是苹果公司推出的个人电脑系列产品，由苹果公司设计、开发和销售。苹果公司不但生产Mac的大部分硬件，Mac所用的操作系统都是它自行开发的。有自己的处理器，自己的显示器等。MAC系统基于UNIX的核心系统增强了系统的稳定性、性能以及响应能力。



### Linux主要发行版本

**Linux的发行版**就是将Linux内核（kernel）与应用软件做一个打包

Ubuntu(乌班图)、RedHat(红帽)、CentOS、Debain[蝶变]、Fedora、SuSE、OpenSUSE、红旗Linux(国产)





## 虚拟机

虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统。
虚拟系统通过生成操作系统的全新虚拟镜像，它具有真实操作系统完全一样的功能，在虚拟机中所有操作都是在这个全新的独立的虚拟系统里面进行，可以独立安装运行软件，保存数据，拥有自己的独立桌面，不会对其他的系统产生任何影响 ，而且能够和现有操作系切换。一个物理计算机上可以同时运行多个不同的操作系统。



## 安装VMware虚拟机

1. 双击VMware应用程序，VMware加载需要一点时间

![image-20220525100224455](http://47.101.155.205/image-20220525100224455.png)

![image-20220525100408014](http://47.101.155.205/image-20220525100408014.png)

![image-20220525100434093](http://47.101.155.205/image-20220525100434093.png)

![image-20220525100447050](http://47.101.155.205/image-20220525100447050.png)

![image-20220525100614569](http://47.101.155.205/image-20220525100614569.png)



检查VMware是否安装成功

![image-20220525102010048](http://47.101.155.205/image-20220525102010048.png)

需要有这两个虚拟网卡



### 虚拟机安装CentOS

CentOS（Community Enterprise Operating System）（社区企业操作系统）是一个基于Red Hat Linux 提供的可自由使用源代码的企业级Linux发行版本。CentOS通过安全更新方式建立一个安全、低维护、稳定、高预测性、高重复性的 Linux 环境，相对于其他 Linux 发行版，其稳定性值得信赖。

**ISO 格式说明**：ISO是一种光盘镜像文件，一般都是将光盘文件做成一个文件

官网地址：https://www.centos.org/download/

阿里云镜像地址：http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/

- 各个版本介绍

DVD：普通的版本的镜像，我们一般用这个。里面有很多我们用的常用软件和组件。

Everything：这个和DVD区别是里面的基本包含了所有软件和组件。镜像文件比较大。

Minimal：小版本，只有包含系统和很少的软件。

NetInstall：通过网络安装的包，要联网安装。

1. 准备CentOS镜像文件
2. 使用VMware创建虚拟机，选中典型
3. 选择虚拟机镜像文件
4. 创建虚拟机名称，和虚拟机存放位置
5. 指定磁盘大小
6. 自定义硬件，可以修改内存大小
7. 点击完成
8. 可以在VMware查看到新的名字，及刚刚设置的硬件信息，以及指定虚拟机的安装位置也出现了文件
9. 开启虚拟机，稍后可以设置语言
10. 在这里可以设置一些信息，最重要的是要设置网络连接，最后点击安装，设置root账号密码
11. root 123456 可以登陆linux系统，ip addr可以查看字节虚拟机的IP地址
12. 如果按照的GNOME，带有图形化界面，安装之后还会有下一步操作，要配置接收许可证，点击接收即可。
13. 可以跳过谷歌账号绑定，然后创建一个非root用户
14. Full Name 和UserName都是一样的，下一步设置密码，设置密码之后下一步
15. 点击开始使用linux系统就可以了
16. 就可以使用图形化界面的Linux系统了

![image-20220525110421369](http://47.101.155.205/image-20220525110421369.png)

![image-20220525110545181](http://47.101.155.205/image-20220525110545181.png)

![image-20220525110758846](http://47.101.155.205/image-20220525110758846.png)

![image-20220525111047066](http://47.101.155.205/image-20220525111047066.png)

![image-20220525111229683](http://47.101.155.205/image-20220525111229683.png)

![image-20220525111536943](http://47.101.155.205/image-20220525111536943.png)

![image-20220525112742128](http://47.101.155.205/image-20220525112742128.png)



配置的CentOS7 root 123456

配置的CentOS7-1 root 111111 oycm 111111



## 远程工具

实际工作中，linux系统都不会在我们自己的电脑上，linux系统安装在机房的服务器上，我们操作linux不可能跑到机房去，所以我们需要有一个工具，能在公司通过网络远程连接到机房的linux服务器上。



### Xshell

Xshell  是一个强大的安全终端模拟软件，它支持SSH1, SSH2, 以及Microsoft Windows 平台的TELNET 协议。它通过互联网到远程系统的安全连接以及它创新性的设计和特色帮助用户在复杂的网络环境中享受他们的工作。

Xshell 是目前最好的远程登录到Linux操作的软件，流畅的速度并且完美解决了中文乱码的问题，是目前程序员首选的软件。

安装Xshell

安装Xshell破解版，执行两次就行了

![image-20220525154751985](http://47.101.155.205/image-20220525154751985.png)

第一次使用的弹窗提示

![image-20220525154822570](http://47.101.155.205/image-20220525154822570.png)



### Xftp

是一个基于windows平台的功能强大的SFTP、FTP文件传输软件。使用了Xftp 以后，windows 用户能安全地在UNIX/Linux和Windows PC 之间传输文件。

安装Xftp，和Sshell一样



## Linux命令学习

### 关机重启命令

~~~bash
sync #将数据由内存同步到硬盘中
shutdown # 关机指令,一分钟之后关机 man shutdown可以看帮助文档 按q可以退出文档
shutdown -r now #立即立马重启
shutdown -r 10 #系统10分钟后重启

shutdown -h 1 # 1分钟后关机
shutdown -h 20:10 #今天20：10服务器关机
shutdown -h now #立马关机
shutdown -h poweroff #

reboot #立马重启
halt #也能关闭系统
shutdown -c 取消关机

~~~



### 系统目录结构

1)	/bin：存放最经常使用的命令。
2)	/boot : 存放启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
3)	/dev: dev是Device(设备)的缩写,存放的是Linux的外部设备，Linux中的设备也是以文件的形式存在。
4)	**/etc** : 存放所有的系统管理所需要的配置文件和子目录。os-release
5)	**/home**：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名以用户的账号命名。
6)	/lib：这个目录存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件，几乎所有的应用程序都需要用到这些共享库。
6)	/lost+found：一般情况为空，本地没有，用来存放系统意外关机的文件。
7)	/mnt : 系统提供该目录是为了让用户临时挂载别的文件系统，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容。
8)	**/opt**: 这是给linux额外安装软件所存放的目录。比如你安装一个Oracle数据库则就可以放到这个目录下，默认为空。
8)	/proc：虚拟的目录，系统内存的映射，可以通过这个目录获取系统的信息。
9)	**/root** : 该目录为系统管理员目录，root是具有超级权限的用户。
9)	/sbin：s就是Super User的，存放的是系统管理园使用的系统管理程序。
9)	/srv：存放一些服务启动之后需要提取的数据。
9)	/sys：这是linux2.6内核一个很大的变化，安装了2.6内核中新出现的一个文件系统sysfs。
10)	**/tmp**: 这个目录是用来存放一些临时文件的。
11)	**/usr**: 这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。
11)	/user/bin：系统用户使用的应用程序。
18)	/user/sbin：超级用户使用的比较高级的管理程序和系统守护程序。
12)	**/var** : 这个目录存放着在不断扩充着的东西，我们习惯将那些经常被修改的文件存放在该目录下，比如运行的各种日志文件。
12)	/run：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。
12)	**/www**：存放服务器网站相关的资源，环境，网站的项目。



### 常用基本命令

`<variabl>`：表示当前参数必填。

`[variable]`：表示当前参数可选。

![image-20220525174455487](http://47.101.155.205/image-20220525174455487.png)

#### 目录管理

##### cd

~~~bash
# cd(Change Directory)更改当前工作目录
cd [path]

# 回到当前用户的主目录
cd ~

# 回到上次的目录
cd -

# 绝对路径
cd /tmp

# 相对路径,'.'代表当前目录,'..'代表上级目录
cd root 
cd ../../

~~~







##### ls

~~~bash
# 查看目录内容，可以接参数,和目录地址
ls [option] [file]

# -a 全部的文件，包括隐藏文件
# --block-size=<size> size可以是K,M,G..,指定单位显示文件大小
# -h 人可读显示文件大小
# -l 列出所有的文件，包含文件的属性和权限，没有隐藏文件
# -S 默认文件大小降序排序
# -1 一个文件一行显示


~~~







##### pwd

~~~bash
# 显示当前所在的目录
pwd

~~~







##### mkdir

~~~bash
# 创建目录
mkdir [option]... <path>...

# 创建目录
mkdir image

# 创建多级目录
mkdir -p oycm/image

~~~





##### rmdir

~~~bash
# 删除空的目录
rmdir [option]... <path>...

# 删除image目录
rmdir image

# 删除多级目录:oycm/iamge,oycm都删除
rmdir -p oycm/image

~~~



##### cp

~~~bash
cp [option]... [-T] <source> <desc> # 复制文件或目录source到desc目标目录
cp [otpion]... <source>... <directory> # 复制多个source到目标目录directory
cp [option]... [-t] directory <source>... # 同上

-a：此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于dpR参数组合。
-d：复制时保留链接。这里所说的链接相当于Windows系统中的快捷方式。
-f：覆盖已经存在的目标文件而不给出提示。
-i：与 -f 选项相反，在覆盖目标文件之前给出提示，要求用户确认是否覆盖，回答 y 时目标文件将被覆盖。
-p：除复制文件的内容外，还把修改时间和访问权限也复制到新文件中。
-r：(递归)若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。
-l：不复制文件，只是生成链接文件。
-T:表示目标是一个文件,而不是目录

# 复制目录需要携带参数

~~~



##### rm

~~~bash
# 删除文件,不能直接删除目录
rm [option]... <file>...
# option作用介绍
-f 忽略不存在的文件
-r 递归删除目录
-i 互动，询问是否删除

# 文件名以-开头,使用以下命令删除
rm -- -foo
rm ./-foo

~~~





##### mv

~~~bash
# 移动或重命名文件或文件夹
mv [option]... [-T] <source> <dest>
mv [otpion]... <source>... <directory>
mv [option]... -t <directory> <source>...

-T:表示目标是一个文件,而不是目录
-f:强制移动直接覆盖
-u:只替换已经更新的文件
-i:目标文件存在会询问是否覆盖

~~~





#### 属性查看

使用ls -l或ll查看文件的属性以及文件所属的用户和组：

~~~md
lrwxrwxrwx.   1 root 	root    7 5月  25 11:28 bin -> usr/bin
				拥有者	  属组
				属主	   用户组
l第一个字母表示文件类型
l：软连接文件，相当于windows系统的快捷方式
-：表示文件
d：表示目录
c：字符设备文件，一次传输一个字节的设备被称为字符设备。例如键盘，鼠标
b：表示位装置文件里面的可供存储的接口设备

后三个为一组，分别表示用户主权限、用户组权限、其它用户权限
1：r表示读权限，-表示没有读权限。读取文件内容。
2：w表示写权限，-表示没有写权限。编辑、新增、修改文件内容。
3：x表示执行权限，-表示没有执行权限。
147：读权限
258：写权限
369：执行权限

.表示文件的扩展属性

1 表示文件的硬链接数,一个目录至少有两个硬链接,一个是自己；一个是.；一个子目录一个

~~~





##### chgrp

~~~bash
# 修改文件的所属组
chgrp [option]... <group> <file>
# 使用Rfile文件的用户组作用file用户组修改的值
chgrp [option]... --reference=Rfile <file>

#递归更改文件属组，更改目录文件属组时，目录下的所有文件的属组都会更改
chgrp -R 属组名 文件名 

# 查看系统组
cat /etc/group 

~~~





##### chown

~~~bash
# 修改文件的所属用户及用户组
chown [option]... [owner][:[group]] <file>...
# 修改文件的所有者和所属组和目标文件Rfile一致
chown [option]... -reference=Rfile <file>...

# 如果是目录则递归操作
chown -R <owner> <file>
chown -R <owner>:<group> <file>

~~~





##### chmod

~~~bash
# 修改文件的权限
# +:加入quanx,-:删除权限,=:赋值权限 ?可以是rwx任意组合,数量可以是1,2,3
chmod [option]... <[u=?][g=?][o=?]> <file>...
# r:4 w:2 x:1 -:0 组合的值和表示一组权限
chmod [option]... <???> <file>...
chmod 777 file
# 修改权限为指定文件权限
chmod [option].. --reference=<Rfile> <file>...

chmod UGO权限 <file>
# m
chmod -R UGO权限 <file>

~~~





#### 文件查看

##### echo

~~~bash
# 输出字符串到filename文件
echo "字符串" >> filename
# cat filename 会显示字符串

~~~





##### cat

~~~bash
# 由第一行开始显示文件内容
cat [option]... [file]
# option参数
-A：相当于-vET的组合
-b：列出行号，仅针对非空白行做行号显示，空白行不做标记
-E：将结尾的断行字节$显示出来
-n：列出行号，空白行也会显示，和-b不同
-T：将table符以^|显示
-v：列出看出不来的特殊字符
~~~



##### tac



~~~bash
# 从最后一行开始显示
tac [option]... [file]...

# option参数
-b：在分割时之前
-s <string>：指定分割字符串，不是默认的

# 从后面查询复合条件的20行日志记录
tac <fileName> | grep <filter> | head -n 20

~~~





##### nl



~~~bash
# 显示的时候显示行号
nl [option]... [file]...

# 这里过滤的数据源是行号
nl <fileName> | grep <filter> | head -n 20

~~~



##### more



~~~bash
# 一页一页显示文件的内容
more <file> [option]...

# more打开文档过程中,输入按键的效果
空格：表示向下翻一页
回车:向下翻一行
/字符串:向下搜索内容(没有搜索功能)
f:向下翻好几页
q:退出文档
b:往回翻页

~~~





##### less

可以往后翻页

特点，到最后面的内容文档不会自动退出

~~~bash
# 与more不同的是到文档底部不会自动退出
less <file>

# 进入less命令，按以下按键的作用
/字符串：向下搜索
?字符串：向上搜索
空格：向下翻页
n:重复搜索
N:好像没有什么用
q：退出

~~~



##### head

head 文件名 默认显示10行

~~~bash
# 取出文件的前面几行，输出完结束
head [option]... <file>

#显示前几行
head -n <num> <file> 

~~~





##### tail



~~~bash
# 输出文件的后几行
tail [option]... [file]...

# 参数
-n num：显示后面多少行，结束
-f num：显示后面多少号，不结束，有结果则继续输出

~~~



##### grep

~~~bash
grep [option]... <file>

-m 匹配输出的最多行数(到了停止)
-B num 满足条件前面num行
-A num 满足条件后面num行
-C num 满足条件前后num行
-n 打印行号

-E 正则表达式匹配
-i 忽略大小写

-v 选择不匹配的行

# 正则过滤条件
grep -E '(14|15):.{2}:.{2}.*.*task-41.*' log

# 通过grep查询进程的pid
ps -ef | grep <jar> | grep -v grep | awk '${print $2}'


~~~





#### Linux链接

~~~bash
#新建文件名
touch <filename>
touch o1

~~~



##### 硬链接

ln 

~~~bash
#将filename1和filename2建立硬链接
ln filename1(这个文件或者目录要存在) filename2 
ln o1 o2

~~~



##### 软链接

ln -s

~~~bash
#将o1软链接到o3
ln -s o1 o3 

~~~









#### Vim编辑器

~~~bash
#没有filename文件，就新建一个文件，有就是修改。初始的linux系统不支持vim命令
vim filename 
#如果是有初始化界面的虚拟机，就会有vim命令

~~~

vi命令有三种模式：命令模式、输入模式、底线命令模式。

~~~bash
vi filename 
#首先进入的是命令模式;
# 按i或者a或者w可以进入输入模式;
# 按ese可以退出编辑模式到命令模式;
# 命令模式输入:进入底线命令模式，按w保存文件，按q是退出vi命令。这底线命令模式好像是命令前面加上一个英文冒号。
~~~



##### 命令模式

| 控制光标移动命令 | 作用                             |
| ---------------- | -------------------------------- |
| h ←              | 光标左移，但是不能跨行           |
| j ↓              | 光标下移                         |
| k ↑              | 光标上移                         |
| l →              | 光标右移，不能跨行               |
| ctrl + f         | 屏幕到下一页                     |
| ctrl + b         | 屏幕到上一页，在首页是没有效果的 |
| CTRL + d         |                                  |
| CTRL + u         |                                  |
| H                | 光标移动到当前页首行首字符       |
| M                | 光标移动到当前页中间首字符       |
| L                | 光标移动到当前页末行首字符       |
| G                | 移动到这个文档最后一行           |
| gg               | 移动到这个文档的第一行           |

| 搜索替换命令    | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| /字符串 + enter | 搜索字符串，搜索到之后会高亮，光标向下查找，查到文件结尾会从开头继续查找↓ |
| ?字符串 + enter | 搜索字符串，搜索到之后会高亮，光标向下查找，查到文件结尾会从开头继续查找↑ |
| n               | 查询命令继续执行                                             |
| N               | 查询命令相反执行                                             |

| 删除复制粘贴命令 | 作用                                          |
| ---------------- | --------------------------------------------- |
| x X              | x表示删除当前光标字符，X删除光标前的字符      |
| nx               | n表示数字，从当前光标开始，向后删除n个字符    |
| nX               | n表示数字，删除光标前的n个字符                |
| dd               | 伤处光标所在的一整行                          |
| d1G              | 删除第一行到光标所在行的所有数据              |
| dG               | 删除光标所在行到最后一行的所有数据            |
| d$               | 目标是这一行，删除光标到这一行最后的数据      |
| d0               | 目标是这一行，删除光标这一行光标前的数据      |
| yy               | 复制光标所在这一行数据                        |
| nyy              | n表示数字，复制光标所在的向下n行的数据        |
| y1G              |                                               |
| yG               |                                               |
| y0               |                                               |
| y$               |                                               |
| p P              |                                               |
| J                | 将光标所在行向下合并为一行                    |
| c                | 按两下c将这行数据删除，进入编辑模式           |
| u                | 复原前一个操作(撤销上一个操作)                |
| CTRL + r         | 重做上一个操作，结合u使用的（复原上一个操作） |
|                  |                                               |

##### 命令模式到底线模式

| 命令               | 作用                                           |
| ------------------ | ---------------------------------------------- |
| :w                 | 保存                                           |
| :w!                |                                                |
| :q                 |                                                |
| :q!                | 修改过文档，强制退出，不保存                   |
| :wq                |                                                |
| ZZ                 | 文档没有修改，直接退出，修改了，就保存之后退出 |
| :set nu            | 设置显示行号                                   |
| :set nonu          | 设置行号不显示                                 |
| :w filename        | 将编辑的文件存储为另外一个文件                 |
| : r filename       |                                                |
| : n1,n2 w filename |                                                |
| : !  command       |                                                |
|                    |                                                |



#### 账户管理

#####useradd



~~~bash
# 添加用户
useradd -m username
useradd -m oycm

~~~

~~~bash
-c comment 指定一段注释性描述。
-d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
-g 用户组 指定用户所属的用户组。
-G 用户组，用户组 指定用户所属的附加组。
-m　使用者目录如不存在则自动建立。
-s Shell文件 指定用户的登录Shell。
-u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。

~~~

直接这样创建的用户，因为没有设置密码，不能远程连接（提示服务器拒绝了密码），相当于passwd -d username 拒绝用户连接



##### su



~~~bash
# 切换用户
su username

~~~

由username到root用户

可以使用 sudo su 后面还需要输入username的密码，刚刚创建的密码不知道是什么，不能直接退出

可以exit退出到root用户

或者CTRL+d退出到root用户

命令行的# 命令 表示的是root用户

命令行的$ 命令 表示的是普通用户



##### userdel

~~~bash
# 删除用户及用户主目录
userdel -r username

~~~





##### usermod



~~~bash
# 
usermod 参数 username
~~~

参数可以是useradd的参数

-s Shell

-d 主目录

-g 用户组

~~~bash
# home下没有no目录，可以使用su oycm切换用户，不过不会显示用户名
usermod -d /home/no oycm

~~~



##### passwd

~~~bash
passwd 参数 username

-l #锁定口令，锁定用户不能登陆
-u #口令解锁
-d #使账号无口令
-f #强迫用户下次登陆修改口令

passwd username #直接是修改username用户的口令
~~~





#### 用户组管理

##### groupadd

~~~bash
#添加一个新的组
groupadd 参数 groupname 
~~~

~~~bash
-g GID 指定新用户组的组标识号（GID）。
-o 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同

~~~



##### groupdel

~~~bash
# 删除用户组
groupdel group1

~~~





##### groupmod

~~~bash
# 修改用户组
groupmod 参数 groupname

-g #表示修改GID
-n #表示修改group的名字
-o #和-g同时选用的时候可以GID同名

~~~







##### newgrp

![image-20220614003505524](http://47.101.155.205/image-20220614003505524.png)



##### /etc/passwd

~~~bash
root:x:0:0:root:/root:/bin/bash
bin:x:1:1001:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
systemd-bus-proxy:x:999:997:systemd Bus Proxy:/:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:998:996:User for polkitd:/:/sbin/nologin
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
chrony:x:997:995::/var/lib/chrony:/sbin/nologin
oycm:x:1000:1001::/home/oycm:/bin/bash
用户名:密码:用户标识号:用户组标识号:注释描述:用户主目录:Shell
#用户组标识号: 字段记录的是用户所属的用户组。它对应着/etc/group文件中的一条记录。

~~~

/etc/shadow文件存放的是密码



/etc/group存放用户组的所有信息

~~~bash
组名:密码:GID:组内用户列表

~~~





#### 磁盘管理

##### df

~~~bash
# 查看磁盘占用情况
df [option].. [path]

-a ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
-k ：以 KBytes 的容量显示各文件系统；
-m ：以 MBytes 的容量显示各文件系统；
-h ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
-H ：以 M=1000K 取代 M=1024K 的进位方式；
-T ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
-i ：不用硬盘容量，而以 inode 的数量来显示

~~~







##### du

~~~bash
# 查看使用空间
du [option].. [path]
-a ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
-k ：以 KBytes 的容量显示各文件系统；
-m ：以 MBytes 的容量显示各文件系统；
-h ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
-H ：以 M=1000K 取代 M=1024K 的进位方式；
-T ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
-i ：不用硬盘容量，而以 inode 的数量来显示
~~~

~~~bash
du -sm /*
~~~



##### 磁盘挂载和卸载



~~~bash
# 挂载
mount 目录1 目录2

~~~

 



卸载

~~~bash
# 强制卸载
umount -f 目录2

~~~



#### 进程管理

##### ps

~~~bash
ps [options]

-a：显示所有用户的进程，包括没有连接到终端的进程
-u：使用用户格式显示
-x：后台进程

ps -ef | grep nginx
root     17028     1  0 10月21 ?      00:00:00 nginx: master process ./nginx
nobody   17029 17028  0 10月21 ?      00:00:01 nginx: worker process
nobody   17030 17028  0 10月21 ?      00:00:02 nginx: worker process
root     17058  4812  0 11:00 pts/2    00:00:00 grep --color=auto nginx
# USER：进程的所有者用户名
# PPID：父进程的id
# %CPU：CPU使用率
# STIME：进程启动的时间
# TTY：与进程关联的终端类型。没有则显示?
# TIME：进程使用的CPU时间，表示该进程在CPU上运行的总时间
# CMD：启动命令的参数

~~~





~~~bash
# |标识管道符，将前面的结果通过grep过滤
ps -aux | grep 过滤条件
root      4033  0.0  0.0 112828   988 pts/2    S+   11:17   0:00 grep --color=auto nginx
root     17028  0.0  0.0  46012  1184 ?        Ss   10月21   0:00 nginx: master process ./nginx
nobody   17029  0.0  0.2  46700  3940 ?        S    10月21   0:01 nginx: worker process
nobody   17030  0.0  0.2  47164  4136 ?        S    10月21   0:02 nginx: worker process
# 打印进程格式
User Pid %CPU %Mem VSZ RSS TTY STAT  START TIME COMMAND
User：进程拥有者
Pid：pid
%CPU：占用的 CPU 使用率
%Mem：占用的记忆体使用率
VSZ: 占用的虚拟记忆体大小
RSS: 占用的记忆体大小
TTY: 与进程关联的终端类型。没有则显示?
STAT: 该进程的状态
	D: 无法中断的休眠状态 (通常 IO 的进程)
	R: 正在执行中
	S: 静止状态
	T: 暂停执行
	Z: 不存在但暂时无法消除
	W: 没有足够的记忆体分页可分配
	<: 高优先序的行程
	N: 低优先序的行程
	L: 有记忆体分页分配并锁在记忆体内 (实时系统或捱A I/O)
START: 行程开始时间
TIME: 进程使用的CPU时间
COMMAND:所执行的指令

~~~



~~~bash
# 查询nginx进程的pid
ps -ef | awk '/nginx: *master/{print $2; exit}'

~~~

![image-20241028133317021](http://47.101.155.205/image-20241028133317021.png)



##### pstree

~~~bash
pstree -pu
-p #显示父进程
-u #显示用户组

~~~

没有图形界面的linux虚拟机没有pstree命令，和vim一样



##### fuser

~~~bash
# 查询哪个进程使用文件或目录或网络端口情况
fuser [option]... <file|directory|socket>

# 参数作用
-v：以可视化显示显示进程信息
-m：显示指定目录所有进程信息
-n [tcp|udp] <port>：查询指定网络端口的情况
-k <filename>：杀死使用指定文件的进程
-u：显示进程用户信息

# 查询这个jar包被哪个进程使用及详细信息
fuser -v <?.jar>

fuser -n tcp 80

~~~



##### lsof

~~~bash
# 作用同fuser
lsof [option] <key>

# 参数作用
-u <username>：和用户相关的进程
-p <pid>：该进程所有的文件
-i <:port>：特定端口的进程信息
-i tcp：特定协议的进程信息

# 查询所有文件的进程信息
lsof


~~~







##### kill

~~~bash
kill -9 进程id

~~~



##### pgrep

~~~bash
# 根据进程名称、用户或其他属性来查找进程的 PID
pgrep [option] <pattern>

# 参数介绍
-x 精确匹配进程名
-o 匹配最早启动的进程
-n 匹配最后启动的进程
-u <user> 匹配用户的进程

# 查询nginx的主进程id
pgrep -x -o nginx

~~~





#### 网络连接

##### netstat

~~~bash
# 命令用于显示网络连接、路由表、接口统计信息、伪连接等网络相关的信息
netstat [option]... [| grep ...] 
-a 显示所有连接
-t 显示tcp连接
-u 显示udp连接
-l 显示监听端口的链接
-p 显示监听端口对应的程序
-n 禁止将端口号转换成别名显示
-r 显示路由表

~~~



~~~bash
# 显示所有的tcp连接信息,显示列如下,6列
# Proto(协议) Recv-Q Send-Q LocalAddress() ForeignAddress() State(连接状态)
# Recv-Q：接收队列中的字节数，如果值大于0，有数据在等待被应用程序读取。
# Send-Q：发送队列中的字节数，如果值大于0，有数据在等待发送到远程主机。
# LocalAddress：本地地址和端口号。
# ForeignAddress：远程地址和端口号。
# State：
#	ESTABLISHED：连接已经建立，数据可以发送和接收。
#	LISTEN：服务器在监听连接请求，0.0.0.0:*表示监听任何来源的地址。
#	TIME_WAIT：连接已经关闭，但等待足够的时间以确保远程主机收到了关闭请求。
# 	CLOSE_WAIT：远程主机关闭了连接，但本地主机尚未关闭。
#	SYN_SENT：本地主机已发送连接请求，但尚未收到确认。
#	SYN_RECEIVED：已收到连接请求，并在等待确认。
# 可以用来看有哪些http连接
netstat -ant
netstat -anu

~~~

![netstat -ant](http://47.101.155.205/image-20241024164548889.png)





~~~bash
# 显示系统的路由表信息,有8列信息
netstat -r
# Destination：表示目标网络或目标主机的地址。数据包要发送到的目的网络或主机。
# Gateway：指向目标网络的下一跳地址。这个字段指示了路由器或网关的 IP 地址，数据包需要先通过这个网关转发。
# Genmask：表示目标网络的子网掩码，用于确定目的网络的范围。
# Flags：用于描述路由条目的标志。
# MSS：这是用于此路由的TCP连接的最大报文段大小（MSS）。如果该值为空，则系统使用默认值。
# Window：表示每次可以发送多少数据，不用等到确认就可以继续发送。通常该字段为空或默认值。
# irtt：建立连接时的最初往返时间。通常用来估计一个连接的响应时间。该值通常为空。
# Iface：指定该路由条目所使用的网络接口。

~~~



![netstat -r](http://47.101.155.205/image-20241024165654450.png)



##### ss

~~~bash
# 命令作业与netstat类似
ss [option]... 

# 查询tcp连接网络情况
ss -ant

~~~

![ss -ant](http://47.101.155.205/image-20241024171621727.png)









#### 系统命令



##### hostname

~~~bash
# 查询/修改主机名
# 查询
hostname 

# 修改(临时的重启后失效)
hostname root

~~~



##### hostnamectl

~~~bash
# 查看当前主机
hostnamectl status

# 修改主机名
sudo hostnamectl set-hostname <newhostname>

# 设置临时主机名
sudo hostnamectl set-hostname --transient temporary-hostname


~~~





##### getent

~~~bash
# 从系统数据库获取数据
getent <database> [key]

# 查询主机和ip映射关系，从/etc/passwd获取信息
getent hosts localhost

# 查询root用户信息，从/etc/passwd获取信息
getent passwd root
# root:x:0:0:root:/root:/bin/bash
# root：用户名
# x：密码(加密，不可见)
# 0：用户id
# 0：用户组id
# root：用户说明
# /root：用户主目录，cd ~进入的目录
# /bin/bash：用户登录使用的shell，/bin/bash下的命令可以直接通过名称执行

# 查询用户组信息，从/etc/group获取信息
getent group root
# root:x:0:
# root：组名
# x：组密码字段
# x：组id

# 查询服务信息，从/etc/services获取服务和端口信息
getent services http
# http                  80/tcp www www-http

# 查询网络信息，从/etc/networks获取网络名和网络地址
getent networks loopback

# 查询协议信息，从 /etc/protocols 获取协议相关信息
getent protocols tcp

~~~



##### which

~~~bash
# 查找显示在系统PATH目录下可执行命令的完整路径
which [option] <command>

# 参数
-a 显示所有的路径

which java

~~~



##### stat

~~~bash
# 用于显示文件或文件系统的详细信息
stat [option] <fileName>

# 查询进程的启动时间 -c:指定文件显示信息的格式;%y:文件上次修改的时间(人可读显示)
stat -c %y /proc/pid

~~~





### 防火墙相关命令

在VMware能够执行ping www.baidu.com的情况下，本地电脑能ping到虚拟机的ip的情况下，通过开启防火墙端口8080，启动tomcat 服务器，可以通过本机访问http://虚拟机ip:8080访问到tomcat，http://虚拟机ip:8080/docs

~~~bash
# 开启防火墙
service firewalld start

# 重启防火墙
service firewalld restart
systemctl restart firewalld.service

# 关闭防火墙
service firewalld stop
systemctl stop firewalld

# 查看firewall服务状态
systemctl status firewalld
firewall-cmd --state 



~~~



~~~bash
#查看版本
firewall-cmd --version

# 重新加载防火墙规则设置
firewall-cmd --reload

# 查看所有允许的服务
firewall-cmd --list-services
#获取所有支持的服务
firewall-cmd --get-services
# 查看全部信息
firewall-cmd --list-all
# 只看端口信息
firewall-cmd --list-ports 
# 查看8080端口是否开放
firewall-cmd --query-port=8080/tcp
# 查询某区域是否允许ssh协议的流量通过
firewall-cmd --zone=public --query-service=ssh
#查询某区域是否允许https协议的流量通过
firewall-cmd --zone=public --query-service=https

#添加访问3306端口tcp协议的策略，设置允许，并且永久生效
firewall-cmd --zone=public --add-port=3306/tcp --permanent
# 开启一段端口策略
firewall-cmd --zone=public --add-port=5000-5500/tcp --permanent
# 关闭防火墙端口3306
firewall-cmd --zone=public --remove-port=3306/tcp --permanent
# 关闭防火墙端口5000-5500一段端口
firewall-cmd --zone=public --remove-port=5000-5500/tcp --permanent
#命令含义
--zone：作用域
--add -port-80/tcp：添加端口,格式为:端口/通讯协议
--permanent：永久生效,没有此参数重启后失效

# 列出所有区域信息
firewall-cmd --list-all-zones 
# 查看当前的活动区域信息
firewall-cmd --get-active-zones 
# 设置public区域为默认区域
firewall-cmd --set-default-zone=public 
# 查看默认区域信息
firewall-cmd --get-default-zone 

~~~



## 环境安装

有三种安装方式：rpm安装、解压缩安装、yum安装



### yum

yum: Yum(全称为 Yellow dog Updater, Modified)：是一个在RedHat、Fedora以及CentOS中的一种软件包管理器，能够从指定的服务器自动下载软件包并且进行安装，可以自动处理软件包之间的依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。



~~~bash
# yum命令检查是否安装应用mariadb
yum list installed | grep mariadb

# 安装应用
yum install <package-name>

# 更新所有的软件包
yum update 
# 更新指定的软件包
yum update <package-name>

# 卸载指定的软件包
yum remove <package-name>

# -y确认卸载
yum -y remove grep  yum list installed | grep httpd

# 卸载查询到的安装
yum list installed | grep <name> | xargs yum remove -y


~~~







### rpm

oracle官网下载rpm包：https://www.oracle.com/java/technologies/downloads/

~~~bash
rpm [option]... <rpmName>
-i：安装软件包
-v：显示详情输出
-h：安装过程中显示进度条
-U：升级软件，没有则安装
--nodeps：在安装或卸载时忽略依赖关系
--force：强制安装或卸载软件包，即使存在文件冲突
-e <name>：卸载指定的软件包
-q <name>：查询已安装的软件包
-qa：查询所有安装的软件包

# rpm安装jdk步骤，jdk默认自动安装到/usr/java中
rpm -ivh <rpm名称>
rpm -ivh jdk-23_linux-aarch64_bin.rpm

# 查询是否安装成功
rpm -qa | grep jdk

# 卸载jdk，上面-aq查询的内容名
rpm -de --nodeps <name> 

rpm -qa | grep <name> | xargs rpm -de --nodeps

~~~





### 解压缩安装

#### tar

~~~bash
tar [option]... <tarPackage>
# 参数说明
-x：解压缩
-c：创建压缩文件
-z：通过gzip解压
-j：通过bzip2解压
-v：显示详细过程
-f：指定文件名

# 解压缩包jdk-23_linux-x64_bin.tar.gz
tar -xzvf jdk-23_linux-x64_bin.tar.gz

# 压缩命令
tar -czvf <tarName> <path>


~~~



#### zip个unzip

~~~bash
# zip解压缩
zip [option]... <zipPackage>
-r：整个目录

# 压缩
unzip

~~~



#### gzip和gunzip

~~~bash
# 压缩
gzip <filename>

# 解压缩
gunzip <file.gz>

~~~







#### 编译源代码

如果软件包是以源代码形式提供的，通常是.tar.gz或.tar.bz2文件，例如nginx，还需要执行以下步骤：

~~~bash
cd <path>

# 配置编译选项
./configure [option]...

# 执行编译
make

# 安装
sudo make install

~~~





### jdk安装

1. oracle官网下载linux的jdk安装包，tar.gz结尾的；
2. 通过Xftp连接linux，让后将安装包上传到linux中的/usr/java/目录中；
3. 在/usr/java/中执行 tar -zxvf 安装包名命令；
4. 配置环境变量：

~~~bash
# 编辑/etc/profile文件，添加内容
export JAVA_HOME=/usr/java/jdk1.8.0_121
export PATH="$PATH:$JAVA_HOME/bin"

# 保存退出

~~~

5. source /etc/profile 命令通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录；
6. java -version测试是否配置安装成功。



### Tomcat安装

1. 官网下载地址：https://tomcat.apache.org/download-90.cgi tar.gz；
2. 使用Xftp连接Linux，将tomcat安装包上传到/usr/tomcat/目录中；
3. 在/usr/tomcat/下执行 tar -zxvf tomcat tar.gz安装包；
4. 进入tomcat的bin/目录，执行./startup.sh测试是否启动成功；
5. 这个也可以配置环境变量，方便启动。





### MySQL安装



~~~bash
# yum命令检查是否安装mariadb数据库：
yum list installed|grep mariadb

# 如有安装，执行yum命令卸载mariadb
yum -y remove <name>

~~~





1. 上传文件
2. 上传的文件的目录中执行tar -zsvf 包名
3. 修改文件名mv mysql-5.7.18-linux-glibc2.5-x86_64 mysql-5.7.18
4. 在mysql-5.7.18目录下创建data文件夹
5. 创建mysql用户 useradd mysql，用来执行MySQL命令
6. 初始化MySQL命令执行

~~~bash
./mysqld  --initialize  --user=mysql --datadir=/usr/mysql/mysql-5.7.18/data --basedir=/usr/mysql/mysql-5.7.18

--initialize # 初始化mysql，创建mysql的root, 随机生成密码。记住密码，登录msyql使用。
--user # 执行msyqld 命令的linux用户名
--datadir # mysql数据文件的存放位置，目录位置参照本机的设置。
--basedir # msyql安装程序的目录，目录位置参照本机的设置。
# 该命令执行后，会生成一个临时的mysql数据库root用户的密码，请先拷贝出来记住，后续第一次登录mysql需要使用
sw;pTysro46J
~~~

![image-20220526220036810](http://47.101.155.205/image-20220526220036810.png)

7. 启动安全功能，在mysql-5.7.18/bin目录下执行命令

~~~bash
./mysql_ssl_rsa_setup --datadir=/usr/mysql/mysql-5.7.18/data
~~~

![image-20220526220336522](http://47.101.155.205/image-20220526220336522.png)

8. 修改安装目录的权限

~~~bash
# 递归修改所属用户:所属组为mysql
chown -R mysql:mysql  /usr/mysql/mysql-5.7.18/

~~~

9. 启动mysql，可以通过查看进程确定mysql是否启动成功

~~~bash
./mysqld_safe & 
&：标识后台运行
#mysqld_safe程序会在启动MySQL服务器后继续监控其运行情况，并在其死机时重新启动它。

~~~

10. 进入mysql客户端

~~~bash
./mysql -uroot -p
密码：sw;pTysro46J

~~~

11. 修改root密码

![image-20220526221718018](http://47.101.155.205/image-20220526221718018.png)

~~~bash
alter user 'root'@'localhost' identified by '111111';

~~~

12. 授权远程访问

~~~bash
grant all privileges on *.* to root@'%' identified by '111111';
*.*：第一*标识所有的数据库，第二个*标识数据库中的所有表
root@'%' #root 标识用户名，%表示ip地址，也可以指定具体的IP地址

# 刷新授权
flush privileges; 

~~~

13. 开启3306端口访问

~~~bash
firewall-cmd --zone=public --add-port=3306/tcp --permanent

~~~

14. windows连接测试192.168.144.128 root 111111
15. 停止mysql服务器

~~~bash
# 输入命令后，输入密码111111关闭
./mysqladmin -uroot -p shutdown 

# 查询是否有mysql进程
ps -x | grep mysql

~~~



### MySQL安装二

> 方式二

~~~bash
rpm -ivh mysql的扩展源
# 安装
yum install mysql-community-server -y
# 启动
systemctl start mysqld
# 查看密码
grep "password" /var/log/mysqld.log

~~~











## 阿里云服务连接配置

使用VNC网站自带的VNC连接上服务器

~~~bash
密码:?
cd /etc/ssh
ls *config
# 可以查看到有两个配置文件ssh_config,sshd_config
vim sshd_config
# 修改为true
PubkeyAuthentication yes 

~~~

## iptables

### 查看所有防火墙规则

~~~bash
# 查看所有防火墙规则,管理员用户执行
sudo iptables -L

# Chain INPUT 输入规则，Chain FORWARD转发规则，Chain OUTPUT输出规则
# target 数据包采取动作:ACCEPT,REJECT
# prot 匹配的协议:tcp,udp
# opt 
# source 数据包的源地址
# destination 数据包的目标地址

# tcp dpt:bootps:tcp=>适用于TCP协议;dpt=>目标端口;bootps=>对应BOOTP(Bootstrap Protocol)或DHCP(Dynamic Host Configuration Protocol)服务端口号的名称(68)
# tcp dpt:bootps:允许针对TCP协议、目标端口为bootps(即DHCP服务的端口)的数据包通过防火墙。允许 DHCP 服务的通信，以便动态分配IP地址给网络上的设备

# udp dpt:domain:domain=>对应的是DNS(Domain Name System)服务的端口(53)
# udp dpt:domain:表示允许针对UDP协议、目标端口为domain(DNS)端口的数据包通过防火墙


~~~

![image-20240120172435455](http://47.101.155.205/image-20240120172435455.png)



`ctstate RELATED,ESTABLISHED`规则是用于 iptables 防火墙规则中的连接跟踪状态（connection tracking state）的设置。这个规则用于允许与现有连接有关的和已经建立的数据包通过防火墙。这是一个常见的设置，确保已经建立的连接以及与这些连接相关的数据包能够自由通过防火墙，而不受额外的限制。这对于维护连接状态和确保相关的数据包能够正常传输非常重要，比如在网络会话中的请求和响应之间。

- `ctstate`：连接跟踪模块的关键字，用于匹配特定的连接状态
- `RELATED`：表示匹配与现有连接有关的数据包。例如，如果你的系统上有一个 FTP 连接，那么与 FTP 控制连接相关的数据包也会被匹配。这确保相关的数据包能够通过防火墙。
- `ESTABLISHED`：表示匹配已经建立的连接的数据包。一旦连接经过连接建立的握手阶段，后续的数据包都被认为是已建立的连接。



`reject-with icmp-port-unreachable`规则是 iptables 防火墙规则中用于拒绝连接的设置，当连接被拒绝时，系统将返回 ICMP 错误消息，具体地说是 ICMP Port Unreachable 错误消息。

这个规则用于拒绝连接，并向发送方返回 ICMP Port Unreachable 错误消息。当有连接尝试到达被防火墙拒绝的端口时，系统将发送这个错误消息，通知发送方目标端口不可达。

- `reject-with`：拒绝连接时采取的动作，并指定拒绝连接时返回的 ICMP 错误消息类型；
- `icmp-port-unreachable`：表示当连接被拒绝时返回 ICMP Port Unreachable 错误消息。这个错误消息通常表示目标端口不可达。



### 查看特定端口的规则

~~~bash
# 查看特定端口的规则
sudo iptables -L -n | grep <端口号>

sudo iptables -L -n | grep 67

sudo iptables -L -n | grep 53

~~~

![image-20240120175112091](http://47.101.155.205/image-20240120175112091.png)



### 查看特定规则

~~~bash
# 出站
sudo iptables -L OUTPUT

# 入站
sudo iptables -L INPUT

~~~

![image-20240120180745119](http://47.101.155.205/image-20240120180745119.png)



### 查看网络地址转换(NAT)规则

~~~bash
sudo iptables -t nat -L


~~~

![image-20240120181624876](http://47.101.155.205/image-20240120181624876.png)





### 查看详细信息

~~~bash
sudo iptables -S

~~~

![image-20240120181946773](http://47.101.155.205/image-20240120181946773.png)



## route

### 查询当前路由表

~~~bash
ip route show

~~~

1. `default via <网关> dev <接口>`：默认路由，表示当没有更特定的路由匹配时，数据包将被发送到指定网关和接口。
2. `<目标网络> via <网关> dev <接口>`：*针对特定目标网络的路由，数据包将通过指定的网关和接口发送。
3. `<目标网络>/<子网掩码> dev <接口> proto kernel scope link src <本地IP>`：本地子网的直连路由，表示该网络直接通过指定接口连接到本地主机。
4. `<目标网络>/<子网掩码> dev <接口> scope link`： 针对本地连接的子网的路由，表示该网络直接通过指定接口连接到本地主机。
5. `<目标网络>/<子网掩码> via <网关> dev <接口>`： 针对其他网络的路由，数据包将通过指定的网关和接口发送。

![image-20240120183908672](http://47.101.155.205/image-20240120183908672.png)

![image-20240120183905637](http://47.101.155.205/image-20240120183905637.png)



~~~bash
# 查看详细的路由表信息
ip route show table all

~~~



~~~bash
# 查看指定目标的路由信息
ip route get <目标IP>

~~~



~~~bash
# 添加静态路由
sudo ip route add <目标网络> via <网关>

~~~



~~~bash
# 删除路由
sudo ip route del <目标网络>

~~~





### 查看网关配置

~~~bash
route -n

~~~



## 内存查询相关命令

### free

~~~bash
 					total       used       free     shared    buffers     cached
Mem:       			8061340    6801328    1260012          0     960828    1670536
-/+ buffers/cache:  		   4169964    3891376
Swap:            	0          0          0

total: 物理内存总量
used: 已经使用的内存，包括缓存和缓冲区
free: 完全空闲的内存
shared: 用于 tmpfs（临时文件系统）的共享内存
buffers: 用于块设备的缓冲区，可被回收
cached: 用于文件系统的缓存，可被回收

buffers/cache的used：Mem.used - Mem.buffers - Mem.cached，排除缓存和缓冲区后的内存使用量
buffers/cache的free：Mem.free + Mem.buffers + Mem.cached，最大可用内存量
buffers/cache行提供了一个实际应用程序使用的内存视图，它将buffers和cache视为可以随时回收用于应用程序的内存

~~~



~~~bash
[-b,-k,-m,-g] # 内存单位
[-l] # 显示详细的低内存和高内存统计信息,32位操作系统才有分别
[-o] # 不显示-/+ buffers/cache
[-t] # 显示RAM +交换的总数
[-s] # 延迟几秒刷新
[-c] # 刷新几次
[-V] # 版本信息

~~~



RAM（Random Access Memory，随机访问内存）：RAM 是系统中的高速内存，用于存储正在处理的操作系统和应用程序数据；访问速度非常快，通常在纳秒级别。

RAM 工作原理：当一个程序运行时，操作系统会将其数据加载到 RAM 中。如果 RAM 有足够的空间，所有需要的数据都会保存在 RAM 中以便快速访问。

Swap（Swap Memory，交换内存）：交换内存是系统的一部分磁盘空间，用于扩展虚拟内存；由于交换内存使用的是磁盘，其访问速度远低于 RAM，通常在毫秒级别。

Swap 工作原理：当 RAM 空间不足时，操作系统会将一些不常用的数据从 RAM 移动到交换空间，从而腾出 RAM 空间用于当前任务；这种过程称为“换出”（swap out）和“换入”（swap in）；使用交换内存会导致性能下降，因为磁盘的访问速度远低于 RAM。



### top

~~~bash
top [option]

-d <num>：更新间隔
-n <num>：允许多少次退出
-u <username>：某个用户的进程
-p <pid>：某个pid进程

~~~



![image-20240606165145446](http://47.101.155.205/image-20240606165145446.png)

~~~bash
当前时间16:29:16，运行265天6:32小时，当前登录用户数10，系统过去1分钟、5分钟、10分钟的平均负载
当前系统总进程数205，1个正在运行，204个睡眠状态，0个停止，0个僵尸
us用户态进程消耗CPU2.7%，sy系统态进程消耗CPU3.1%，ni低优先级进程消耗CPU0.0%，id空闲CPU时间94.1%
wa等待I/O操作CPU时间0.0%，hi硬件中断消耗CPU时间0.0%，si软件中断消耗CPU时间0.2%，st虚拟机偷取CPU时间0.0%
物理内存使用情况：总物理内存，使用物理内存，空闲物理内存，缓存内存、缓存内存
交换内存使用情况：未使用

~~~

~~~md
内容描述：
PID：进程ID
USER：进程所有者
PR：进程优先级
NI：进程的nice值（影响优先级）
VIRT：进程占用的虚拟内存总量
RES：进程占用的物理内存总量
SHR：进程使用的共享内存量
S：进程状态(R:运行,S:睡眠,D:不可中断睡眠,Z:僵尸,T:停止)
%CPU：进程消耗的CPU时间百分比
%MEM：进程占用的物理内存百分比
TIME+：进程运行的总CPU时间(格式mm:ss)
COMMAND：启动进程的命令名称

进入程序键盘作用
q：退出
P(shift+p)：按%CPU排序，默认就是
M(shift+m)：按%MEM排序
T(shift+T)：按TIME+排序
1：显示所有cpu使用情况
s：默认3s刷新，按下后输入值更新多级刷新
o：输入条件过滤进程信息
f：编辑页面显示哪些选项

~~~

虚拟内存是一种内存管理技术，允许操作系统使用硬盘空间作为扩展的内存，从而使系统可以运行比物理内存（RAM）更大的程序。以下是虚拟内存的主要特点和工作原理：

**主要特点：**

1. 扩展内存：虚拟内存使得系统能够使用硬盘上的一部分空间（称为交换空间或页面文件）来存储不常用的数据或程序，仿佛系统有更多的物理内存。
2. 内存隔离：每个进程都有自己的虚拟地址空间，增强了安全性和稳定性。一个进程不能直接访问另一个进程的内存，避免了内存冲突和数据损坏。
3. 按需加载：操作系统可以将不活跃的部分程序或数据从物理内存转移到硬盘，释放出物理内存供其他进程使用。这种机制称为“页面置换”。

**工作原理：**

1. 地址映射：虚拟内存使用页面（通常为4KB或更大）来管理内存。每个虚拟地址通过页表映射到实际的物理地址。
2. 页面调度：当程序访问的页面不在物理内存中时，操作系统会产生一个页面错误（page fault），并通过以下步骤处理：
   1. 操作系统查找所需的页面在硬盘上的位置。
   2. 将该页面从硬盘加载到物理内存中。
   3. 更新页表以反映该页面的新位置。
3. 替换策略：如果物理内存已满，操作系统会根据某种替换策略（如最少使用算法、最近最少使用算法等）选择一个页面进行替换，将其内容写回硬盘并腾出空间。



**优先**

1. 提高效率：可以运行更大的应用程序。
2. 内存保护：增加了进程之间的隔离。
3. 简化内存管理：简化了程序的内存分配和管理。



**缺点：**

1. 性能开销：频繁的页面调度会导致性能下降，称为“页面抖动”（thrashing）。
2. 硬盘速度较慢：访问硬盘比访问 RAM 要慢得多，可能影响系统响应速度。


















