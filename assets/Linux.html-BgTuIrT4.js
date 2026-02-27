import{_ as n,c as a,e,o as l}from"./app-BIGZvh4f.js";const p={};function i(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h1><h2 id="什么是linux" tabindex="-1"><a class="header-anchor" href="#什么是linux"><span>什么是Linux</span></a></h2><p>linux是一个开源、免费的操作系统，其稳定性、安全性、处理多并发能力已经得到业界的认可，目前大多数企业级应用甚至是集群项目都部署运行在linux操作系统之上，很多软件公司考虑到开发成本都首选linux，在中国软件公司得到广泛的使用。</p><p>Linux内核kernel最初是由芬兰人李纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。在1991年10月5日第一次正式向外公布。</p><p>在linux发布之前，有一种操作系统叫unix，由于价格昂贵不开放源码，所以李纳斯·托瓦兹（Linus Torvalds）决心要开发自己免费的操作系统，Linux借鉴了unix的思想，但没有一行unix的代码，linux系统是从unix系统发展出来的。 Linux 英文解释为 Linux is not Unix。现在业界有一种说法叫：类unix</p><h3 id="什么是操作系统" tabindex="-1"><a class="header-anchor" href="#什么是操作系统"><span>什么是操作系统</span></a></h3><p>操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。</p><p>操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计算机系统的硬件、软件及数据资源，控制程序运行，改善人机界面，为其它应用软件提供支持等。实际上，用户是不用接触操作系统的，操作系统管理着计算机硬件资源，同时按着应用程序的资源请求，为其分配资源，如：划分CPU时间，内存空间的开辟，调用打印机等。</p><ul><li>Windows操作系统</li></ul><p>微软公司Windows操作系统 ，例如常用在个人计算机的Windows XP，Windows Vista，Windows 7，Windows 8，windows 10等。 用在服务器端的Windows Server 2003，Windows Server 2008等。</p><ul><li>Unix和Linux（类Unix）</li></ul><p>unix系列的SUN Solaris，IBM-AIX，HP-UX，FreeBSD等</p><p>类Unix(linux)的Red Hat Linux，CentOS，Debian，Ubuntu等</p><ul><li>Mac操作系统</li></ul><p>是苹果公司推出的个人电脑系列产品，由苹果公司设计、开发和销售。苹果公司不但生产Mac的大部分硬件，Mac所用的操作系统都是它自行开发的。有自己的处理器，自己的显示器等。MAC系统基于UNIX的核心系统增强了系统的稳定性、性能以及响应能力。</p><h3 id="linux主要发行版本" tabindex="-1"><a class="header-anchor" href="#linux主要发行版本"><span>Linux主要发行版本</span></a></h3><p><strong>Linux的发行版</strong>就是将Linux内核（kernel）与应用软件做一个打包</p><p>Ubuntu(乌班图)、RedHat(红帽)、CentOS、Debain[蝶变]、Fedora、SuSE、OpenSUSE、红旗Linux(国产)</p><h2 id="虚拟机" tabindex="-1"><a class="header-anchor" href="#虚拟机"><span>虚拟机</span></a></h2><p>虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统。 虚拟系统通过生成操作系统的全新虚拟镜像，它具有真实操作系统完全一样的功能，在虚拟机中所有操作都是在这个全新的独立的虚拟系统里面进行，可以独立安装运行软件，保存数据，拥有自己的独立桌面，不会对其他的系统产生任何影响 ，而且能够和现有操作系切换。一个物理计算机上可以同时运行多个不同的操作系统。</p><h2 id="安装vmware虚拟机" tabindex="-1"><a class="header-anchor" href="#安装vmware虚拟机"><span>安装VMware虚拟机</span></a></h2><ol><li>双击VMware应用程序，VMware加载需要一点时间</li></ol><figure><img src="http://47.101.155.205/image-20220525100224455.png" alt="image-20220525100224455" tabindex="0" loading="lazy"><figcaption>image-20220525100224455</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525100408014.png" alt="image-20220525100408014" tabindex="0" loading="lazy"><figcaption>image-20220525100408014</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525100434093.png" alt="image-20220525100434093" tabindex="0" loading="lazy"><figcaption>image-20220525100434093</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525100447050.png" alt="image-20220525100447050" tabindex="0" loading="lazy"><figcaption>image-20220525100447050</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525100614569.png" alt="image-20220525100614569" tabindex="0" loading="lazy"><figcaption>image-20220525100614569</figcaption></figure><p>检查VMware是否安装成功</p><figure><img src="http://47.101.155.205/image-20220525102010048.png" alt="image-20220525102010048" tabindex="0" loading="lazy"><figcaption>image-20220525102010048</figcaption></figure><p>需要有这两个虚拟网卡</p><h3 id="虚拟机安装centos" tabindex="-1"><a class="header-anchor" href="#虚拟机安装centos"><span>虚拟机安装CentOS</span></a></h3><p>CentOS（Community Enterprise Operating System）（社区企业操作系统）是一个基于Red Hat Linux 提供的可自由使用源代码的企业级Linux发行版本。CentOS通过安全更新方式建立一个安全、低维护、稳定、高预测性、高重复性的 Linux 环境，相对于其他 Linux 发行版，其稳定性值得信赖。</p><p><strong>ISO 格式说明</strong>：ISO是一种光盘镜像文件，一般都是将光盘文件做成一个文件</p><p>官网地址：https://www.centos.org/download/</p><p>阿里云镜像地址：http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/</p><ul><li>各个版本介绍</li></ul><p>DVD：普通的版本的镜像，我们一般用这个。里面有很多我们用的常用软件和组件。</p><p>Everything：这个和DVD区别是里面的基本包含了所有软件和组件。镜像文件比较大。</p><p>Minimal：小版本，只有包含系统和很少的软件。</p><p>NetInstall：通过网络安装的包，要联网安装。</p><ol><li>准备CentOS镜像文件</li><li>使用VMware创建虚拟机，选中典型</li><li>选择虚拟机镜像文件</li><li>创建虚拟机名称，和虚拟机存放位置</li><li>指定磁盘大小</li><li>自定义硬件，可以修改内存大小</li><li>点击完成</li><li>可以在VMware查看到新的名字，及刚刚设置的硬件信息，以及指定虚拟机的安装位置也出现了文件</li><li>开启虚拟机，稍后可以设置语言</li><li>在这里可以设置一些信息，最重要的是要设置网络连接，最后点击安装，设置root账号密码</li><li>root 123456 可以登陆linux系统，ip addr可以查看字节虚拟机的IP地址</li><li>如果按照的GNOME，带有图形化界面，安装之后还会有下一步操作，要配置接收许可证，点击接收即可。</li><li>可以跳过谷歌账号绑定，然后创建一个非root用户</li><li>Full Name 和UserName都是一样的，下一步设置密码，设置密码之后下一步</li><li>点击开始使用linux系统就可以了</li><li>就可以使用图形化界面的Linux系统了</li></ol><figure><img src="http://47.101.155.205/image-20220525110421369.png" alt="image-20220525110421369" tabindex="0" loading="lazy"><figcaption>image-20220525110421369</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525110545181.png" alt="image-20220525110545181" tabindex="0" loading="lazy"><figcaption>image-20220525110545181</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525110758846.png" alt="image-20220525110758846" tabindex="0" loading="lazy"><figcaption>image-20220525110758846</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525111047066.png" alt="image-20220525111047066" tabindex="0" loading="lazy"><figcaption>image-20220525111047066</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525111229683.png" alt="image-20220525111229683" tabindex="0" loading="lazy"><figcaption>image-20220525111229683</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525111536943.png" alt="image-20220525111536943" tabindex="0" loading="lazy"><figcaption>image-20220525111536943</figcaption></figure><figure><img src="http://47.101.155.205/image-20220525112742128.png" alt="image-20220525112742128" tabindex="0" loading="lazy"><figcaption>image-20220525112742128</figcaption></figure><p>配置的CentOS7 root 123456</p><p>配置的CentOS7-1 root 111111 oycm 111111</p><h2 id="远程工具" tabindex="-1"><a class="header-anchor" href="#远程工具"><span>远程工具</span></a></h2><p>实际工作中，linux系统都不会在我们自己的电脑上，linux系统安装在机房的服务器上，我们操作linux不可能跑到机房去，所以我们需要有一个工具，能在公司通过网络远程连接到机房的linux服务器上。</p><h3 id="xshell" tabindex="-1"><a class="header-anchor" href="#xshell"><span>Xshell</span></a></h3><p>Xshell 是一个强大的安全终端模拟软件，它支持SSH1, SSH2, 以及Microsoft Windows 平台的TELNET 协议。它通过互联网到远程系统的安全连接以及它创新性的设计和特色帮助用户在复杂的网络环境中享受他们的工作。</p><p>Xshell 是目前最好的远程登录到Linux操作的软件，流畅的速度并且完美解决了中文乱码的问题，是目前程序员首选的软件。</p><p>安装Xshell</p><p>安装Xshell破解版，执行两次就行了</p><figure><img src="http://47.101.155.205/image-20220525154751985.png" alt="image-20220525154751985" tabindex="0" loading="lazy"><figcaption>image-20220525154751985</figcaption></figure><p>第一次使用的弹窗提示</p><figure><img src="http://47.101.155.205/image-20220525154822570.png" alt="image-20220525154822570" tabindex="0" loading="lazy"><figcaption>image-20220525154822570</figcaption></figure><h3 id="xftp" tabindex="-1"><a class="header-anchor" href="#xftp"><span>Xftp</span></a></h3><p>是一个基于windows平台的功能强大的SFTP、FTP文件传输软件。使用了Xftp 以后，windows 用户能安全地在UNIX/Linux和Windows PC 之间传输文件。</p><p>安装Xftp，和Sshell一样</p><h2 id="linux命令学习" tabindex="-1"><a class="header-anchor" href="#linux命令学习"><span>Linux命令学习</span></a></h2><h3 id="关机重启命令" tabindex="-1"><a class="header-anchor" href="#关机重启命令"><span>关机重启命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sync</span> <span class="token comment">#将数据由内存同步到硬盘中</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token comment"># 关机指令,一分钟之后关机 man shutdown可以看帮助文档 按q可以退出文档</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-r</span> now <span class="token comment">#立即立马重启</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-r</span> <span class="token number">10</span> <span class="token comment">#系统10分钟后重启</span></span>
<span class="line"></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-h</span> <span class="token number">1</span> <span class="token comment"># 1分钟后关机</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-h</span> <span class="token number">20</span>:10 <span class="token comment">#今天20：10服务器关机</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-h</span> now <span class="token comment">#立马关机</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-h</span> poweroff <span class="token comment">#</span></span>
<span class="line"></span>
<span class="line"><span class="token function">reboot</span> <span class="token comment">#立马重启</span></span>
<span class="line"><span class="token function">halt</span> <span class="token comment">#也能关闭系统</span></span>
<span class="line"><span class="token function">shutdown</span> <span class="token parameter variable">-c</span> 取消关机</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="系统目录结构" tabindex="-1"><a class="header-anchor" href="#系统目录结构"><span>系统目录结构</span></a></h3><ol><li>/bin：存放最经常使用的命令。</li><li>/boot : 存放启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。</li><li>/dev: dev是Device(设备)的缩写,存放的是Linux的外部设备，Linux中的设备也是以文件的形式存在。</li><li><strong>/etc</strong> : 存放所有的系统管理所需要的配置文件和子目录。os-release</li><li><strong>/home</strong>：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名以用户的账号命名。</li><li>/lib：这个目录存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件，几乎所有的应用程序都需要用到这些共享库。</li><li>/lost+found：一般情况为空，本地没有，用来存放系统意外关机的文件。</li><li>/mnt : 系统提供该目录是为了让用户临时挂载别的文件系统，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容。</li><li><strong>/opt</strong>: 这是给linux额外安装软件所存放的目录。比如你安装一个Oracle数据库则就可以放到这个目录下，默认为空。</li><li>/proc：虚拟的目录，系统内存的映射，可以通过这个目录获取系统的信息。</li><li><strong>/root</strong> : 该目录为系统管理员目录，root是具有超级权限的用户。</li><li>/sbin：s就是Super User的，存放的是系统管理园使用的系统管理程序。</li><li>/srv：存放一些服务启动之后需要提取的数据。</li><li>/sys：这是linux2.6内核一个很大的变化，安装了2.6内核中新出现的一个文件系统sysfs。</li><li><strong>/tmp</strong>: 这个目录是用来存放一些临时文件的。</li><li><strong>/usr</strong>: 这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。</li><li>/user/bin：系统用户使用的应用程序。</li><li>/user/sbin：超级用户使用的比较高级的管理程序和系统守护程序。</li><li><strong>/var</strong> : 这个目录存放着在不断扩充着的东西，我们习惯将那些经常被修改的文件存放在该目录下，比如运行的各种日志文件。</li><li>/run：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。</li><li><strong>/www</strong>：存放服务器网站相关的资源，环境，网站的项目。</li></ol><h4 id="etc" tabindex="-1"><a class="header-anchor" href="#etc"><span>/etc</span></a></h4><h5 id="hosts" tabindex="-1"><a class="header-anchor" href="#hosts"><span>/hosts</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># /etc/hosts 记录本地域名的ip映射关系</span></span>
<span class="line"><span class="token comment"># 通过修改该配置文件,可以实现主机名到ip映射关系解析</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询当前系统的本地域名和ip映射关系</span></span>
<span class="line">getent hosts</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="proc" tabindex="-1"><a class="header-anchor" href="#proc"><span>/proc</span></a></h4><h5 id="pid-fd" tabindex="-1"><a class="header-anchor" href="#pid-fd"><span>/pid/fd</span></a></h5><p>记录着文件资源及tcp连接信息。</p><h5 id="vmstat" tabindex="-1"><a class="header-anchor" href="#vmstat"><span>/vmstat</span></a></h5><p>统计oom的事件。</p><h3 id="常用基本命令" tabindex="-1"><a class="header-anchor" href="#常用基本命令"><span>常用基本命令</span></a></h3><p><code>&lt;variabl&gt;</code>：表示当前参数必填。</p><p><code>[variable]</code>：表示当前参数可选。</p><figure><img src="http://47.101.155.205/image-20220525174455487.png" alt="image-20220525174455487" tabindex="0" loading="lazy"><figcaption>image-20220525174455487</figcaption></figure><h4 id="目录管理" tabindex="-1"><a class="header-anchor" href="#目录管理"><span>目录管理</span></a></h4><h5 id="cd" tabindex="-1"><a class="header-anchor" href="#cd"><span>cd</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># cd(Change Directory)更改当前工作目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回到当前用户的主目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> ~</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回到上次的目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 绝对路径</span></span>
<span class="line"><span class="token builtin class-name">cd</span> /tmp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 相对路径,&#39;.&#39;代表当前目录,&#39;..&#39;代表上级目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> root </span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/<span class="token punctuation">..</span>/</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ls" tabindex="-1"><a class="header-anchor" href="#ls"><span>ls</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看目录内容，可以接参数,和目录地址</span></span>
<span class="line"><span class="token function">ls</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># -a 全部的文件，包括隐藏文件</span></span>
<span class="line"><span class="token comment"># --block-size=&lt;size&gt; size可以是K,M,G..,指定单位显示文件大小</span></span>
<span class="line"><span class="token comment"># -h 人可读显示文件大小</span></span>
<span class="line"><span class="token comment"># -l 列出所有的文件，包含文件的属性和权限，没有隐藏文件</span></span>
<span class="line"><span class="token comment"># -S 默认文件大小降序排序</span></span>
<span class="line"><span class="token comment"># -1 一个文件一行显示</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="pwd" tabindex="-1"><a class="header-anchor" href="#pwd"><span>pwd</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 显示当前所在的目录</span></span>
<span class="line"><span class="token builtin class-name">pwd</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir"><span>mkdir</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建目录</span></span>
<span class="line"><span class="token function">mkdir</span> image</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建多级目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> oycm/image</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="rmdir" tabindex="-1"><a class="header-anchor" href="#rmdir"><span>rmdir</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除空的目录</span></span>
<span class="line"><span class="token function">rmdir</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除image目录</span></span>
<span class="line"><span class="token function">rmdir</span> image</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除多级目录:oycm/iamge,oycm都删除</span></span>
<span class="line"><span class="token function">rmdir</span> <span class="token parameter variable">-p</span> oycm/image</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="cp" tabindex="-1"><a class="header-anchor" href="#cp"><span>cp</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cp</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>-T<span class="token punctuation">]</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>desc<span class="token operator">&gt;</span> <span class="token comment"># 复制文件或目录source到desc目标目录</span></span>
<span class="line"><span class="token function">cp</span> <span class="token punctuation">[</span>otpion<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span> <span class="token comment"># 复制多个source到目标目录directory</span></span>
<span class="line"><span class="token function">cp</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>-t<span class="token punctuation">]</span> directory <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span><span class="token punctuation">..</span>. <span class="token comment"># 同上</span></span>
<span class="line"></span>
<span class="line">-a：此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于dpR参数组合。</span>
<span class="line">-d：复制时保留链接。这里所说的链接相当于Windows系统中的快捷方式。</span>
<span class="line">-f：覆盖已经存在的目标文件而不给出提示。</span>
<span class="line">-i：与 <span class="token parameter variable">-f</span> 选项相反，在覆盖目标文件之前给出提示，要求用户确认是否覆盖，回答 y 时目标文件将被覆盖。</span>
<span class="line">-p：除复制文件的内容外，还把修改时间和访问权限也复制到新文件中。</span>
<span class="line">-r：<span class="token punctuation">(</span>递归<span class="token punctuation">)</span>若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。</span>
<span class="line">-l：不复制文件，只是生成链接文件。</span>
<span class="line">-T:表示目标是一个文件,而不是目录</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制目录需要携带参数</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="rm" tabindex="-1"><a class="header-anchor" href="#rm"><span>rm</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除文件,不能直接删除目录</span></span>
<span class="line"><span class="token function">rm</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment"># option作用介绍</span></span>
<span class="line"><span class="token parameter variable">-f</span> 忽略不存在的文件</span>
<span class="line"><span class="token parameter variable">-r</span> 递归删除目录</span>
<span class="line"><span class="token parameter variable">-i</span> 互动，询问是否删除</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 文件名以-开头,使用以下命令删除</span></span>
<span class="line"><span class="token function">rm</span> -- <span class="token parameter variable">-foo</span></span>
<span class="line"><span class="token function">rm</span> ./-foo</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="mv" tabindex="-1"><a class="header-anchor" href="#mv"><span>mv</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 移动或重命名文件或文件夹</span></span>
<span class="line"><span class="token function">mv</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>-T<span class="token punctuation">]</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>dest<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">mv</span> <span class="token punctuation">[</span>otpion<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">mv</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line">-T:表示目标是一个文件,而不是目录</span>
<span class="line">-f:强制移动直接覆盖</span>
<span class="line">-u:只替换已经更新的文件</span>
<span class="line">-i:目标文件存在会询问是否覆盖</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="属性查看" tabindex="-1"><a class="header-anchor" href="#属性查看"><span>属性查看</span></a></h4><p>使用ls -l或ll查看文件的属性以及文件所属的用户和组：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">lrwxrwxrwx.   1 root 	root    7 5月  25 11:28 bin -&gt; usr/bin</span>
<span class="line">				拥有者	  属组</span>
<span class="line">				属主	   用户组</span>
<span class="line">l第一个字母表示文件类型</span>
<span class="line">l：软连接文件，相当于windows系统的快捷方式</span>
<span class="line">-：表示文件</span>
<span class="line">d：表示目录</span>
<span class="line">c：字符设备文件，一次传输一个字节的设备被称为字符设备。例如键盘，鼠标</span>
<span class="line">b：表示位装置文件里面的可供存储的接口设备</span>
<span class="line"></span>
<span class="line">后三个为一组，分别表示用户主权限、用户组权限、其它用户权限</span>
<span class="line">1：r表示读权限，-表示没有读权限。读取文件内容。</span>
<span class="line">2：w表示写权限，-表示没有写权限。编辑、新增、修改文件内容。</span>
<span class="line">3：x表示执行权限，-表示没有执行权限。</span>
<span class="line">147：读权限</span>
<span class="line">258：写权限</span>
<span class="line">369：执行权限</span>
<span class="line"></span>
<span class="line">.表示文件的扩展属性</span>
<span class="line"></span>
<span class="line">1 表示文件的硬链接数,一个目录至少有两个硬链接,一个是自己；一个是.；一个子目录一个</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="chgrp" tabindex="-1"><a class="header-anchor" href="#chgrp"><span>chgrp</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改文件的所属组</span></span>
<span class="line"><span class="token function">chgrp</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>group<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 使用Rfile文件的用户组作用file用户组修改的值</span></span>
<span class="line"><span class="token function">chgrp</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token parameter variable">--reference</span><span class="token operator">=</span>Rfile <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#递归更改文件属组，更改目录文件属组时，目录下的所有文件的属组都会更改</span></span>
<span class="line"><span class="token function">chgrp</span> <span class="token parameter variable">-R</span> 属组名 文件名 </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看系统组</span></span>
<span class="line"><span class="token function">cat</span> /etc/group </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="chown" tabindex="-1"><a class="header-anchor" href="#chown"><span>chown</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改文件的所属用户及用户组</span></span>
<span class="line"><span class="token function">chown</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>owner<span class="token punctuation">]</span><span class="token punctuation">[</span>:<span class="token punctuation">[</span>group<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment"># 修改文件的所有者和所属组和目标文件Rfile一致</span></span>
<span class="line"><span class="token function">chown</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token parameter variable">-reference</span><span class="token operator">=</span>Rfile <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果是目录则递归操作</span></span>
<span class="line"><span class="token function">chown</span> <span class="token parameter variable">-R</span> <span class="token operator">&lt;</span>owner<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">chown</span> <span class="token parameter variable">-R</span> <span class="token operator">&lt;</span>owner<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>group<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="chmod" tabindex="-1"><a class="header-anchor" href="#chmod"><span>chmod</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改文件的权限</span></span>
<span class="line"><span class="token comment"># +:加入quanx,-:删除权限,=:赋值权限 ?可以是rwx任意组合,数量可以是1,2,3</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span><span class="token punctuation">[</span>u<span class="token operator">=</span>?<span class="token punctuation">]</span><span class="token punctuation">[</span>g<span class="token operator">=</span>?<span class="token punctuation">]</span><span class="token punctuation">[</span>o<span class="token operator">=</span>?<span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment"># r:4 w:2 x:1 -:0 组合的值和表示一组权限</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>???<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"><span class="token function">chmod</span> <span class="token number">777</span> <span class="token function">file</span></span>
<span class="line"><span class="token comment"># 修改权限为指定文件权限</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span> <span class="token parameter variable">--reference</span><span class="token operator">=</span><span class="token operator">&lt;</span>Rfile<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token function">chmod</span> UGO权限 <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># m</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token parameter variable">-R</span> UGO权限 <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="文件查看" tabindex="-1"><a class="header-anchor" href="#文件查看"><span>文件查看</span></a></h4><h5 id="echo" tabindex="-1"><a class="header-anchor" href="#echo"><span>echo</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 输出字符串到filename文件</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;字符串&quot;</span> <span class="token operator">&gt;&gt;</span> filename</span>
<span class="line"><span class="token comment"># cat filename 会显示字符串</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="cat" tabindex="-1"><a class="header-anchor" href="#cat"><span>cat</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 由第一行开始显示文件内容</span></span>
<span class="line"><span class="token function">cat</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>file<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># option参数</span></span>
<span class="line">-A：相当于-vET的组合</span>
<span class="line">-b：列出行号，仅针对非空白行做行号显示，空白行不做标记</span>
<span class="line">-E：将结尾的断行字节$显示出来</span>
<span class="line">-n：列出行号，空白行也会显示，和-b不同</span>
<span class="line">-T：将table符以^<span class="token operator">|</span>显示</span>
<span class="line">-v：列出看出不来的特殊字符</span>
<span class="line"></span></code></pre></div><h5 id="tac" tabindex="-1"><a class="header-anchor" href="#tac"><span>tac</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 从最后一行开始显示</span></span>
<span class="line"><span class="token function">tac</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>file<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># option参数</span></span>
<span class="line">-b：在分割时之前</span>
<span class="line"><span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>：指定分割字符串，不是默认的</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从后面查询复合条件的20行日志记录</span></span>
<span class="line"><span class="token function">tac</span> <span class="token operator">&lt;</span>fileName<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>filter<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="nl" tabindex="-1"><a class="header-anchor" href="#nl"><span>nl</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 显示的时候显示行号</span></span>
<span class="line"><span class="token function">nl</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>file<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 这里过滤的数据源是行号</span></span>
<span class="line"><span class="token function">nl</span> <span class="token operator">&lt;</span>fileName<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>filter<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="more" tabindex="-1"><a class="header-anchor" href="#more"><span>more</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 一页一页显示文件的内容</span></span>
<span class="line"><span class="token function">more</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># more打开文档过程中,输入按键的效果</span></span>
<span class="line">空格：表示向下翻一页</span>
<span class="line">回车:向下翻一行</span>
<span class="line">/字符串:向下搜索内容<span class="token punctuation">(</span>没有搜索功能<span class="token punctuation">)</span></span>
<span class="line">f:向下翻好几页</span>
<span class="line">q:退出文档</span>
<span class="line">b:往回翻页</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="less" tabindex="-1"><a class="header-anchor" href="#less"><span>less</span></a></h5><p>可以往后翻页</p><p>特点，到最后面的内容文档不会自动退出</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 与more不同的是到文档底部不会自动退出</span></span>
<span class="line"><span class="token function">less</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 命令参数</span></span>
<span class="line"><span class="token parameter variable">-S</span> 禁止自动换行,长行不会被折叠,而是被截断<span class="token punctuation">(</span>可左右滚动查看,远程工具可能不支持该功能<span class="token punctuation">)</span></span>
<span class="line"><span class="token parameter variable">-X</span> 退出后保留屏幕内容</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入less命令，按以下按键的作用</span></span>
<span class="line">/字符串：向下搜索</span>
<span class="line">?字符串：向上搜索</span>
<span class="line">空格：向下翻页</span>
<span class="line">n:重复搜索</span>
<span class="line">N:好像没有什么用</span>
<span class="line">q：退出</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="head" tabindex="-1"><a class="header-anchor" href="#head"><span>head</span></a></h5><p>head 文件名 默认显示10行</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 取出文件的前面几行，输出完结束</span></span>
<span class="line"><span class="token function">head</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#显示前几行</span></span>
<span class="line"><span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="tail" tabindex="-1"><a class="header-anchor" href="#tail"><span>tail</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 输出文件的后几行</span></span>
<span class="line"><span class="token function">tail</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>file<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">20</span> <span class="token function">file</span> <span class="token builtin class-name">:</span> 实时监控最后 <span class="token number">20</span> 行内容</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 参数</span></span>
<span class="line"><span class="token parameter variable">-n</span> num：显示后面多少行，结束</span>
<span class="line"><span class="token parameter variable">-n</span> +num: 第 num 行开始显示内容</span>
<span class="line"><span class="token parameter variable">-f</span> file: 实时监控文件内容变化</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="grep" tabindex="-1"><a class="header-anchor" href="#grep"><span>grep</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">grep</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-m</span> 匹配输出的最多行数<span class="token punctuation">(</span>到了停止<span class="token punctuation">)</span></span>
<span class="line"><span class="token parameter variable">-B</span> num 满足条件前面num行</span>
<span class="line"><span class="token parameter variable">-A</span> num 满足条件后面num行</span>
<span class="line"><span class="token parameter variable">-C</span> num 满足条件前后num行</span>
<span class="line"><span class="token parameter variable">-n</span> 打印行号</span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-E</span> 正则表达式匹配</span>
<span class="line"><span class="token parameter variable">-i</span> 忽略大小写</span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-v</span> 选择不匹配的行</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 正则过滤条件</span></span>
<span class="line"><span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;(14|15):.{2}:.{2}.*.*task-41.*&#39;</span> log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 通过grep查询进程的pid</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>jar<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;\${print $2}&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="linux链接" tabindex="-1"><a class="header-anchor" href="#linux链接"><span>Linux链接</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#新建文件名</span></span>
<span class="line"><span class="token function">touch</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">touch</span> o1</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="硬链接" tabindex="-1"><a class="header-anchor" href="#硬链接"><span>硬链接</span></a></h5><p>ln</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#将filename1和filename2建立硬链接</span></span>
<span class="line"><span class="token function">ln</span> filename1<span class="token punctuation">(</span>这个文件或者目录要存在<span class="token punctuation">)</span> filename2 </span>
<span class="line"><span class="token function">ln</span> o1 o2</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="软链接" tabindex="-1"><a class="header-anchor" href="#软链接"><span>软链接</span></a></h5><p>ln -s</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#将o1软链接到o3</span></span>
<span class="line"><span class="token function">ln</span> <span class="token parameter variable">-s</span> o1 o3 </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="vim编辑器" tabindex="-1"><a class="header-anchor" href="#vim编辑器"><span>Vim编辑器</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#没有filename文件，就新建一个文件，有就是修改。初始的linux系统不支持vim命令</span></span>
<span class="line"><span class="token function">vim</span> filename </span>
<span class="line"><span class="token comment">#如果是有初始化界面的虚拟机，就会有vim命令</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>vi命令有三种模式：命令模式、输入模式、底线命令模式。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">vi</span> filename </span>
<span class="line"><span class="token comment">#首先进入的是命令模式;</span></span>
<span class="line"><span class="token comment"># 按i或者a或者w可以进入输入模式;</span></span>
<span class="line"><span class="token comment"># 按ese可以退出编辑模式到命令模式;</span></span>
<span class="line"><span class="token comment"># 命令模式输入:进入底线命令模式，按w保存文件，按q是退出vi命令。这底线命令模式好像是命令前面加上一个英文冒号。</span></span>
<span class="line"></span></code></pre></div><h5 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式"><span>命令模式</span></a></h5><table><thead><tr><th>控制光标移动命令</th><th>作用</th></tr></thead><tbody><tr><td>h ←</td><td>光标左移，但是不能跨行</td></tr><tr><td>j ↓</td><td>光标下移</td></tr><tr><td>k ↑</td><td>光标上移</td></tr><tr><td>l →</td><td>光标右移，不能跨行</td></tr><tr><td>ctrl + f</td><td>屏幕到下一页</td></tr><tr><td>ctrl + b</td><td>屏幕到上一页，在首页是没有效果的</td></tr><tr><td>CTRL + d</td><td></td></tr><tr><td>CTRL + u</td><td></td></tr><tr><td>H</td><td>光标移动到当前页首行首字符</td></tr><tr><td>M</td><td>光标移动到当前页中间首字符</td></tr><tr><td>L</td><td>光标移动到当前页末行首字符</td></tr><tr><td>G</td><td>移动到这个文档最后一行</td></tr><tr><td>gg</td><td>移动到这个文档的第一行</td></tr></tbody></table><table><thead><tr><th>搜索替换命令</th><th>作用</th></tr></thead><tbody><tr><td>/字符串 + enter</td><td>搜索字符串，搜索到之后会高亮，光标向下查找，查到文件结尾会从开头继续查找↓</td></tr><tr><td>?字符串 + enter</td><td>搜索字符串，搜索到之后会高亮，光标向下查找，查到文件结尾会从开头继续查找↑</td></tr><tr><td>n</td><td>查询命令继续执行</td></tr><tr><td>N</td><td>查询命令相反执行</td></tr></tbody></table><table><thead><tr><th>删除复制粘贴命令</th><th>作用</th></tr></thead><tbody><tr><td>x X</td><td>x表示删除当前光标字符，X删除光标前的字符</td></tr><tr><td>nx</td><td>n表示数字，从当前光标开始，向后删除n个字符</td></tr><tr><td>nX</td><td>n表示数字，删除光标前的n个字符</td></tr><tr><td>dd</td><td>伤处光标所在的一整行</td></tr><tr><td>d1G</td><td>删除第一行到光标所在行的所有数据</td></tr><tr><td>dG</td><td>删除光标所在行到最后一行的所有数据</td></tr><tr><td>d$</td><td>目标是这一行，删除光标到这一行最后的数据</td></tr><tr><td>d0</td><td>目标是这一行，删除光标这一行光标前的数据</td></tr><tr><td>yy</td><td>复制光标所在这一行数据</td></tr><tr><td>nyy</td><td>n表示数字，复制光标所在的向下n行的数据</td></tr><tr><td>y1G</td><td></td></tr><tr><td>yG</td><td></td></tr><tr><td>y0</td><td></td></tr><tr><td>y$</td><td></td></tr><tr><td>p P</td><td></td></tr><tr><td>J</td><td>将光标所在行向下合并为一行</td></tr><tr><td>c</td><td>按两下c将这行数据删除，进入编辑模式</td></tr><tr><td>u</td><td>复原前一个操作(撤销上一个操作)</td></tr><tr><td>CTRL + r</td><td>重做上一个操作，结合u使用的（复原上一个操作）</td></tr><tr><td></td><td></td></tr></tbody></table><h5 id="命令模式到底线模式" tabindex="-1"><a class="header-anchor" href="#命令模式到底线模式"><span>命令模式到底线模式</span></a></h5><table><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td>:w</td><td>保存</td></tr><tr><td>:w!</td><td></td></tr><tr><td>:q</td><td></td></tr><tr><td>:q!</td><td>修改过文档，强制退出，不保存</td></tr><tr><td>:wq</td><td></td></tr><tr><td>ZZ</td><td>文档没有修改，直接退出，修改了，就保存之后退出</td></tr><tr><td>:set nu</td><td>设置显示行号</td></tr><tr><td>:set nonu</td><td>设置行号不显示</td></tr><tr><td>:w filename</td><td>将编辑的文件存储为另外一个文件</td></tr><tr><td>: r filename</td><td></td></tr><tr><td>: n1,n2 w filename</td><td></td></tr><tr><td>: ! command</td><td></td></tr><tr><td></td><td></td></tr></tbody></table><h4 id="账户管理" tabindex="-1"><a class="header-anchor" href="#账户管理"><span>账户管理</span></a></h4><p>#####useradd</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加用户</span></span>
<span class="line"><span class="token function">useradd</span> <span class="token parameter variable">-m</span> username</span>
<span class="line"><span class="token function">useradd</span> <span class="token parameter variable">-m</span> oycm</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token parameter variable">-c</span> comment 指定一段注释性描述。</span>
<span class="line"><span class="token parameter variable">-d</span> 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。</span>
<span class="line"><span class="token parameter variable">-g</span> 用户组 指定用户所属的用户组。</span>
<span class="line"><span class="token parameter variable">-G</span> 用户组，用户组 指定用户所属的附加组。</span>
<span class="line"><span class="token parameter variable">-m</span>　使用者目录如不存在则自动建立。</span>
<span class="line"><span class="token parameter variable">-s</span> Shell文件 指定用户的登录Shell。</span>
<span class="line"><span class="token parameter variable">-u</span> 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>直接这样创建的用户，因为没有设置密码，不能远程连接（提示服务器拒绝了密码），相当于passwd -d username 拒绝用户连接</p><h5 id="su" tabindex="-1"><a class="header-anchor" href="#su"><span>su</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 切换用户</span></span>
<span class="line"><span class="token function">su</span> username</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>由username到root用户</p><p>可以使用 sudo su 后面还需要输入username的密码，刚刚创建的密码不知道是什么，不能直接退出</p><p>可以exit退出到root用户</p><p>或者CTRL+d退出到root用户</p><p>命令行的# 命令 表示的是root用户</p><p>命令行的$ 命令 表示的是普通用户</p><h5 id="userdel" tabindex="-1"><a class="header-anchor" href="#userdel"><span>userdel</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除用户及用户主目录</span></span>
<span class="line"><span class="token function">userdel</span> <span class="token parameter variable">-r</span> username</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="usermod" tabindex="-1"><a class="header-anchor" href="#usermod"><span>usermod</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># </span></span>
<span class="line"><span class="token function">usermod</span> 参数 username</span>
<span class="line"></span></code></pre></div><p>参数可以是useradd的参数</p><p>-s Shell</p><p>-d 主目录</p><p>-g 用户组</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># home下没有no目录，可以使用su oycm切换用户，不过不会显示用户名</span></span>
<span class="line"><span class="token function">usermod</span> <span class="token parameter variable">-d</span> /home/no oycm</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="passwd" tabindex="-1"><a class="header-anchor" href="#passwd"><span>passwd</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">passwd</span> 参数 username</span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-l</span> <span class="token comment">#锁定口令，锁定用户不能登陆</span></span>
<span class="line"><span class="token parameter variable">-u</span> <span class="token comment">#口令解锁</span></span>
<span class="line"><span class="token parameter variable">-d</span> <span class="token comment">#使账号无口令</span></span>
<span class="line"><span class="token parameter variable">-f</span> <span class="token comment">#强迫用户下次登陆修改口令</span></span>
<span class="line"></span>
<span class="line"><span class="token function">passwd</span> username <span class="token comment">#直接是修改username用户的口令</span></span>
<span class="line"></span></code></pre></div><h4 id="用户组管理" tabindex="-1"><a class="header-anchor" href="#用户组管理"><span>用户组管理</span></a></h4><h5 id="groupadd" tabindex="-1"><a class="header-anchor" href="#groupadd"><span>groupadd</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#添加一个新的组</span></span>
<span class="line"><span class="token function">groupadd</span> 参数 groupname </span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token parameter variable">-g</span> GID 指定新用户组的组标识号（GID）。</span>
<span class="line"><span class="token parameter variable">-o</span> 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="groupdel" tabindex="-1"><a class="header-anchor" href="#groupdel"><span>groupdel</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除用户组</span></span>
<span class="line"><span class="token function">groupdel</span> group1</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="groupmod" tabindex="-1"><a class="header-anchor" href="#groupmod"><span>groupmod</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改用户组</span></span>
<span class="line"><span class="token function">groupmod</span> 参数 groupname</span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-g</span> <span class="token comment">#表示修改GID</span></span>
<span class="line"><span class="token parameter variable">-n</span> <span class="token comment">#表示修改group的名字</span></span>
<span class="line"><span class="token parameter variable">-o</span> <span class="token comment">#和-g同时选用的时候可以GID同名</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="newgrp" tabindex="-1"><a class="header-anchor" href="#newgrp"><span>newgrp</span></a></h5><figure><img src="http://47.101.155.205/image-20220614003505524.png" alt="image-20220614003505524" tabindex="0" loading="lazy"><figcaption>image-20220614003505524</figcaption></figure><h5 id="etc-passwd" tabindex="-1"><a class="header-anchor" href="#etc-passwd"><span>/etc/passwd</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">root:x:0:0:root:/root:/bin/bash</span>
<span class="line">bin:x:1:1001:bin:/bin:/sbin/nologin</span>
<span class="line">daemon:x:2:2:daemon:/sbin:/sbin/nologin</span>
<span class="line">adm:x:3:4:adm:/var/adm:/sbin/nologin</span>
<span class="line">lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin</span>
<span class="line">sync:x:5:0:sync:/sbin:/bin/sync</span>
<span class="line">shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown</span>
<span class="line">halt:x:7:0:halt:/sbin:/sbin/halt</span>
<span class="line">mail:x:8:12:mail:/var/spool/mail:/sbin/nologin</span>
<span class="line">operator:x:11:0:operator:/root:/sbin/nologin</span>
<span class="line">games:x:12:100:games:/usr/games:/sbin/nologin</span>
<span class="line">ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin</span>
<span class="line">nobody:x:99:99:Nobody:/:/sbin/nologin</span>
<span class="line">systemd-bus-proxy:x:999:997:systemd Bus Proxy:/:/sbin/nologin</span>
<span class="line">systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin</span>
<span class="line">dbus:x:81:81:System message bus:/:/sbin/nologin</span>
<span class="line">polkitd:x:998:996:User <span class="token keyword">for</span> polkitd:/:/sbin/nologin</span>
<span class="line">tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin</span>
<span class="line">postfix:x:89:89::/var/spool/postfix:/sbin/nologin</span>
<span class="line">sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin</span>
<span class="line">chrony:x:997:995::/var/lib/chrony:/sbin/nologin</span>
<span class="line">oycm:x:1000:1001::/home/oycm:/bin/bash</span>
<span class="line">用户名:密码:用户标识号:用户组标识号:注释描述:用户主目录:Shell</span>
<span class="line"><span class="token comment">#用户组标识号: 字段记录的是用户所属的用户组。它对应着/etc/group文件中的一条记录。</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>/etc/shadow文件存放的是密码</p><p>/etc/group存放用户组的所有信息</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">组名:密码:GID:组内用户列表</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="磁盘管理" tabindex="-1"><a class="header-anchor" href="#磁盘管理"><span>磁盘管理</span></a></h4><h5 id="df" tabindex="-1"><a class="header-anchor" href="#df"><span>df</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看磁盘占用情况</span></span>
<span class="line"><span class="token function">df</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-a</span> ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；</span>
<span class="line"><span class="token parameter variable">-k</span> ：以 KBytes 的容量显示各文件系统；</span>
<span class="line"><span class="token parameter variable">-m</span> ：以 MBytes 的容量显示各文件系统；</span>
<span class="line"><span class="token parameter variable">-h</span> ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；</span>
<span class="line"><span class="token parameter variable">-H</span> ：以 <span class="token assign-left variable">M</span><span class="token operator">=</span>1000K 取代 <span class="token assign-left variable">M</span><span class="token operator">=</span>1024K 的进位方式；</span>
<span class="line"><span class="token parameter variable">-T</span> ：显示文件系统类型, 连同该 partition 的 filesystem 名称 <span class="token punctuation">(</span>例如 ext3<span class="token punctuation">)</span> 也列出；</span>
<span class="line"><span class="token parameter variable">-i</span> ：不用硬盘容量，而以 inode 的数量来显示</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="du" tabindex="-1"><a class="header-anchor" href="#du"><span>du</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看使用空间</span></span>
<span class="line"><span class="token function">du</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span></span>
<span class="line"><span class="token parameter variable">-a</span> ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；</span>
<span class="line"><span class="token parameter variable">-k</span> ：以 KBytes 的容量显示各文件系统；</span>
<span class="line"><span class="token parameter variable">-m</span> ：以 MBytes 的容量显示各文件系统；</span>
<span class="line"><span class="token parameter variable">-h</span> ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；</span>
<span class="line"><span class="token parameter variable">-H</span> ：以 <span class="token assign-left variable">M</span><span class="token operator">=</span>1000K 取代 <span class="token assign-left variable">M</span><span class="token operator">=</span>1024K 的进位方式；</span>
<span class="line"><span class="token parameter variable">-T</span> ：显示文件系统类型, 连同该 partition 的 filesystem 名称 <span class="token punctuation">(</span>例如 ext3<span class="token punctuation">)</span> 也列出；</span>
<span class="line"><span class="token parameter variable">-i</span> ：不用硬盘容量，而以 inode 的数量来显示</span>
<span class="line"><span class="token parameter variable">-s</span> ：目录下的总大小</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 以MB单位查询/目录下，各个目录的总大小</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-sm</span> /*</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询指定目录下一级目录的磁盘占用情况</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-h</span> --max-depth<span class="token operator">=</span><span class="token number">1</span> /www/log/</span>
<span class="line"></span>
<span class="line"><span class="token function">sort</span> <span class="token parameter variable">-rh</span></span>
<span class="line">-r: 反向排序</span>
<span class="line">-h: 以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；</span>
<span class="line"><span class="token comment"># 查询 / 目录下磁盘占用前 10 目录</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-h</span> / <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rh</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20250402110904273.png" alt="image-20250402110904273" tabindex="0" loading="lazy"><figcaption>image-20250402110904273</figcaption></figure><p><strong>gateway使用nacos注册中心，会在/home/[user]/logs/nacos目录产生naming.log.yyyy-MM-dd日志。</strong></p><figure><img src="http://47.101.155.205/image-20250402142256138.png" alt="image-20250402142256138" tabindex="0" loading="lazy"><figcaption>image-20250402142256138</figcaption></figure><h5 id="磁盘挂载和卸载" tabindex="-1"><a class="header-anchor" href="#磁盘挂载和卸载"><span>磁盘挂载和卸载</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 挂载</span></span>
<span class="line"><span class="token function">mount</span> 目录1 目录2</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>卸载</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 强制卸载</span></span>
<span class="line"><span class="token function">umount</span> <span class="token parameter variable">-f</span> 目录2</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="进程管理" tabindex="-1"><a class="header-anchor" href="#进程管理"><span>进程管理</span></a></h4><h5 id="ps" tabindex="-1"><a class="header-anchor" href="#ps"><span>ps</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">ps</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">-a：显示所有用户的进程，包括没有连接到终端的进程</span>
<span class="line">-u：使用用户格式显示</span>
<span class="line">-x：后台进程</span>
<span class="line"></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx</span>
<span class="line">root     <span class="token number">17028</span>     <span class="token number">1</span>  <span class="token number">0</span> <span class="token number">10</span>月21 ?      00:00:00 nginx: master process ./nginx</span>
<span class="line">nobody   <span class="token number">17029</span> <span class="token number">17028</span>  <span class="token number">0</span> <span class="token number">10</span>月21 ?      00:00:01 nginx: worker process</span>
<span class="line">nobody   <span class="token number">17030</span> <span class="token number">17028</span>  <span class="token number">0</span> <span class="token number">10</span>月21 ?      00:00:02 nginx: worker process</span>
<span class="line">root     <span class="token number">17058</span>  <span class="token number">4812</span>  <span class="token number">0</span> <span class="token number">11</span>:00 pts/2    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx</span>
<span class="line"><span class="token comment"># USER：进程的所有者用户名</span></span>
<span class="line"><span class="token comment"># PPID：父进程的id</span></span>
<span class="line"><span class="token comment"># %CPU：CPU使用率</span></span>
<span class="line"><span class="token comment"># STIME：进程启动的时间</span></span>
<span class="line"><span class="token comment"># TTY：与进程关联的终端类型。没有则显示?</span></span>
<span class="line"><span class="token comment"># TIME：进程使用的CPU时间，表示该进程在CPU上运行的总时间</span></span>
<span class="line"><span class="token comment"># CMD：启动命令的参数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询进程的 物理内存,虚拟内存,内存占用百分比,启动命令</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> <span class="token parameter variable">-o</span> rss,vsz,pmem,cmd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># tail -n 1 显示最后一条</span></span>
<span class="line">pmap <span class="token parameter variable">-x</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-n</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># |标识管道符，将前面的结果通过grep过滤</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-aux</span> <span class="token operator">|</span> <span class="token function">grep</span> 过滤条件</span>
<span class="line">root      <span class="token number">4033</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span> <span class="token number">112828</span>   <span class="token number">988</span> pts/2    S+   <span class="token number">11</span>:17   <span class="token number">0</span>:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx</span>
<span class="line">root     <span class="token number">17028</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">46012</span>  <span class="token number">1184</span> ?        Ss   <span class="token number">10</span>月21   <span class="token number">0</span>:00 nginx: master process ./nginx</span>
<span class="line">nobody   <span class="token number">17029</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span>  <span class="token number">46700</span>  <span class="token number">3940</span> ?        S    <span class="token number">10</span>月21   <span class="token number">0</span>:01 nginx: worker process</span>
<span class="line">nobody   <span class="token number">17030</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span>  <span class="token number">47164</span>  <span class="token number">4136</span> ?        S    <span class="token number">10</span>月21   <span class="token number">0</span>:02 nginx: worker process</span>
<span class="line"><span class="token comment"># 打印进程格式</span></span>
<span class="line">User Pid %CPU %Mem VSZ RSS TTY STAT  START TIME COMMAND</span>
<span class="line">User：进程拥有者</span>
<span class="line">Pid：pid</span>
<span class="line">%CPU：占用的 CPU 使用率</span>
<span class="line">%Mem：占用的记忆体使用率</span>
<span class="line">VSZ: 占用的虚拟记忆体大小</span>
<span class="line">RSS: 占用的记忆体大小</span>
<span class="line">TTY: 与进程关联的终端类型。没有则显示?</span>
<span class="line">STAT: 该进程的状态</span>
<span class="line">	D: 无法中断的休眠状态 <span class="token punctuation">(</span>通常 IO 的进程<span class="token punctuation">)</span></span>
<span class="line">	R: 正在执行中</span>
<span class="line">	S: 静止状态</span>
<span class="line">	T: 暂停执行</span>
<span class="line">	Z: 不存在但暂时无法消除</span>
<span class="line">	W: 没有足够的记忆体分页可分配</span>
<span class="line">	<span class="token operator">&lt;</span>: 高优先序的行程</span>
<span class="line">	N: 低优先序的行程</span>
<span class="line">	L: 有记忆体分页分配并锁在记忆体内 <span class="token punctuation">(</span>实时系统或捱A I/O<span class="token punctuation">)</span></span>
<span class="line">START: 行程开始时间</span>
<span class="line">TIME: 进程使用的CPU时间</span>
<span class="line">COMMAND:所执行的指令</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询nginx进程的pid</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/nginx: *master/{print $2; exit}&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20241028133317021.png" alt="image-20241028133317021" tabindex="0" loading="lazy"><figcaption>image-20241028133317021</figcaption></figure><h5 id="pstree" tabindex="-1"><a class="header-anchor" href="#pstree"><span>pstree</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">pstree <span class="token parameter variable">-pu</span></span>
<span class="line"><span class="token parameter variable">-p</span> <span class="token comment">#显示父进程</span></span>
<span class="line"><span class="token parameter variable">-u</span> <span class="token comment">#显示用户组</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>没有图形界面的linux虚拟机没有pstree命令，和vim一样</p><h5 id="fuser" tabindex="-1"><a class="header-anchor" href="#fuser"><span>fuser</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询哪个进程使用文件或目录或网络端口情况</span></span>
<span class="line"><span class="token function">fuser</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>file<span class="token operator">|</span>directory<span class="token operator">|</span>socket<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 参数作用</span></span>
<span class="line">-v：以可视化显示显示进程信息</span>
<span class="line">-m：显示指定目录所有进程信息</span>
<span class="line"><span class="token parameter variable">-n</span> <span class="token punctuation">[</span>tcp<span class="token operator">|</span>udp<span class="token punctuation">]</span> <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>：查询指定网络端口的情况</span>
<span class="line"><span class="token parameter variable">-k</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>：杀死使用指定文件的进程</span>
<span class="line">-u：显示进程用户信息</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询这个jar包被哪个进程使用及详细信息</span></span>
<span class="line"><span class="token function">fuser</span> <span class="token parameter variable">-v</span> <span class="token operator">&lt;</span>?.jar<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">fuser</span> <span class="token parameter variable">-n</span> tcp <span class="token number">80</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="lsof" tabindex="-1"><a class="header-anchor" href="#lsof"><span>lsof</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 作用同fuser</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 参数作用</span></span>
<span class="line"><span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>：和用户相关的进程</span>
<span class="line"><span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span>：该进程所有的文件</span>
<span class="line"><span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>:port<span class="token operator">&gt;</span>：特定端口的进程信息</span>
<span class="line"><span class="token parameter variable">-i</span> tcp：特定协议的进程信息</span>
<span class="line"><span class="token parameter variable">-n</span> 系统当前打开的所有文件</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询所有文件的进程信息</span></span>
<span class="line"><span class="token function">lsof</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询进程所有相关的文件(文件描述符),数量会多余ls统计的</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进程pid占用的文件描述符</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-l</span> /proc/<span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span>/fd <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询Druid应用数据库连接池占用的tcp连接信息(配置最小连接数为2)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取本地端口和远程端口及进程信息 (58844,49162) pid=65502</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-antp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">1521</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询tcp进程信息</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-p</span> <span class="token number">65502</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">58844</span> 结果79432244</span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-p</span> <span class="token number">65502</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">49162</span> 结果78539829</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询对应的文件描述符</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-l</span> /proc/65502/fd <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">79432244</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-l</span> /proc/65502/fd <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">78539829</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入进程的调试</span></span>
<span class="line">gdb <span class="token parameter variable">-p</span> <span class="token number">65502</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 关闭文件 关闭了连接池的tcp连接</span></span>
<span class="line"><span class="token comment"># 关闭所有的连接池连接后，程序会自动停止</span></span>
<span class="line">call close<span class="token punctuation">(</span><span class="token number">140</span><span class="token punctuation">)</span></span>
<span class="line">call close<span class="token punctuation">(</span><span class="token number">142</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20250123132632881.png" alt="image-20250123132632881" tabindex="0" loading="lazy"><figcaption>image-20250123132632881</figcaption></figure><figure><img src="http://47.101.155.205/image-20250123132828966.png" alt="image-20250123132828966" tabindex="0" loading="lazy"><figcaption>image-20250123132828966</figcaption></figure><p>统计Linux系统进程打开的文件数：<strong>命令结果不一致</strong>。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># awk &#39;{print $2}&#39; 显示结果的第2行数据，pid</span></span>
<span class="line"><span class="token comment"># uniq -c 统计每个pid出现的次数</span></span>
<span class="line"><span class="token comment"># sort -nr 按照统计数量降序排序</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span><span class="token function">sort</span><span class="token operator">|</span><span class="token function">uniq</span> -c<span class="token operator">|</span><span class="token function">sort</span> -nr<span class="token operator">|</span><span class="token function">more</span></span>
<span class="line"></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-p</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="kill" tabindex="-1"><a class="header-anchor" href="#kill"><span>kill</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">kill</span> <span class="token parameter variable">-9</span> 进程id</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="pgrep" tabindex="-1"><a class="header-anchor" href="#pgrep"><span>pgrep</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 根据进程名称、用户或其他属性来查找进程的 PID</span></span>
<span class="line">pgrep <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 参数介绍</span></span>
<span class="line"><span class="token parameter variable">-x</span> 精确匹配进程名</span>
<span class="line"><span class="token parameter variable">-o</span> 匹配最早启动的进程</span>
<span class="line"><span class="token parameter variable">-n</span> 匹配最后启动的进程</span>
<span class="line"><span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>user<span class="token operator">&gt;</span> 匹配用户的进程</span>
<span class="line"><span class="token parameter variable">-f</span> 使用进程名称匹配</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询nginx的主进程id</span></span>
<span class="line">pgrep <span class="token parameter variable">-x</span> <span class="token parameter variable">-o</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询对应java程序的gc情况</span></span>
<span class="line">jstat <span class="token parameter variable">-gc</span> <span class="token variable"><span class="token variable">\`</span>pgrep <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>java包名<span class="token operator">&gt;</span><span class="token variable">\`</span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="网络连接" tabindex="-1"><a class="header-anchor" href="#网络连接"><span>网络连接</span></a></h4><h5 id="netstat" tabindex="-1"><a class="header-anchor" href="#netstat"><span>netstat</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 命令用于显示网络连接、路由表、接口统计信息、伪连接等网络相关的信息</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span><span class="token operator">|</span> <span class="token function">grep</span> <span class="token punctuation">..</span>.<span class="token punctuation">]</span> </span>
<span class="line"><span class="token parameter variable">-a</span> 显示所有连接</span>
<span class="line"><span class="token parameter variable">-t</span> 显示tcp连接</span>
<span class="line"><span class="token parameter variable">-u</span> 显示udp连接</span>
<span class="line"><span class="token parameter variable">-l</span> 显示监听端口的链接</span>
<span class="line"><span class="token parameter variable">-p</span> 显示监听端口对应的程序</span>
<span class="line"><span class="token parameter variable">-n</span> 禁止将端口号转换成别名显示</span>
<span class="line"><span class="token parameter variable">-r</span> 显示路由表</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看pid进程端口绑定情况</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tnlp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>PID<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows查看pid进程端口绑定情况</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-ano</span> <span class="token operator">|</span> findstr <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 显示所有的tcp连接信息,显示列如下,6列</span></span>
<span class="line"><span class="token comment"># Proto(协议) Recv-Q Send-Q LocalAddress() ForeignAddress() State(连接状态)</span></span>
<span class="line"><span class="token comment"># Recv-Q：接收队列中的字节数，如果值大于0，有数据在等待被应用程序读取。</span></span>
<span class="line"><span class="token comment"># Send-Q：发送队列中的字节数，如果值大于0，有数据在等待发送到远程主机。</span></span>
<span class="line"><span class="token comment"># LocalAddress：本地地址和端口号。</span></span>
<span class="line"><span class="token comment"># ForeignAddress：远程地址和端口号。</span></span>
<span class="line"><span class="token comment"># State：</span></span>
<span class="line"><span class="token comment">#	ESTABLISHED：连接已经建立，数据可以发送和接收。</span></span>
<span class="line"><span class="token comment">#	LISTEN：服务器在监听连接请求，0.0.0.0:*表示监听任何来源的地址。</span></span>
<span class="line"><span class="token comment">#	TIME_WAIT：连接已经关闭，但等待足够的时间以确保远程主机收到了关闭请求。</span></span>
<span class="line"><span class="token comment"># 	CLOSE_WAIT：远程主机关闭了连接，但本地主机尚未关闭。</span></span>
<span class="line"><span class="token comment">#	SYN_SENT：本地主机已发送连接请求，但尚未收到确认。</span></span>
<span class="line"><span class="token comment">#	SYN_RECEIVED：已收到连接请求，并在等待确认。</span></span>
<span class="line"><span class="token comment"># 可以用来看有哪些http连接</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-ant</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-anu</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询建立的tcp连接信息并显示对应的程序信息</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-antp</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241024164548889.png" alt="netstat -ant" tabindex="0" loading="lazy"><figcaption>netstat -ant</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 显示系统的路由表信息,有8列信息</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-r</span></span>
<span class="line"><span class="token comment"># Destination：表示目标网络或目标主机的地址。数据包要发送到的目的网络或主机。</span></span>
<span class="line"><span class="token comment"># Gateway：指向目标网络的下一跳地址。这个字段指示了路由器或网关的 IP 地址，数据包需要先通过这个网关转发。</span></span>
<span class="line"><span class="token comment"># Genmask：表示目标网络的子网掩码，用于确定目的网络的范围。</span></span>
<span class="line"><span class="token comment"># Flags：用于描述路由条目的标志。</span></span>
<span class="line"><span class="token comment"># MSS：这是用于此路由的TCP连接的最大报文段大小（MSS）。如果该值为空，则系统使用默认值。</span></span>
<span class="line"><span class="token comment"># Window：表示每次可以发送多少数据，不用等到确认就可以继续发送。通常该字段为空或默认值。</span></span>
<span class="line"><span class="token comment"># irtt：建立连接时的最初往返时间。通常用来估计一个连接的响应时间。该值通常为空。</span></span>
<span class="line"><span class="token comment"># Iface：指定该路由条目所使用的网络接口。</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241024165654450.png" alt="netstat -r" tabindex="0" loading="lazy"><figcaption>netstat -r</figcaption></figure><p>统计服务器各个TCP连接状态数量：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/^tcp/ {++S[$NF]} END {for (a in S)print a,S[a]}&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250518135311009.png" alt="image-20250518135311009" tabindex="0" loading="lazy"><figcaption>image-20250518135311009</figcaption></figure><h5 id="ss" tabindex="-1"><a class="header-anchor" href="#ss"><span>ss</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 命令作业与netstat类似</span></span>
<span class="line">ss <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询tcp连接网络情况</span></span>
<span class="line">ss <span class="token parameter variable">-ant</span></span>
<span class="line"><span class="token comment"># State 表示tcp连接状态</span></span>
<span class="line"><span class="token comment"># Recv-Q 等待应用读取的数据量(字节)</span></span>
<span class="line"><span class="token comment"># Send-Q 等待发送的数据量(字节)</span></span>
<span class="line"><span class="token comment"># Local Address:Port 本地ip+端口信息</span></span>
<span class="line"><span class="token comment"># Peer Address:Port 远程ip+端口信息</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241024171621727.png" alt="ss -ant" tabindex="0" loading="lazy"><figcaption>ss -ant</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询tcp状态是 established 的连接情况</span></span>
<span class="line">ss <span class="token parameter variable">-tan</span> state established</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250420144417211.png" alt="ss -tan state established" tabindex="0" loading="lazy"><figcaption>ss -tan state established</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询进程pid绑定的端口信息</span></span>
<span class="line">ss <span class="token parameter variable">-tnlp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="ifconfig" tabindex="-1"><a class="header-anchor" href="#ifconfig"><span>ifconfig</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询本机ip命令</span></span>
<span class="line"><span class="token function">ifconfig</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-oP</span> <span class="token string">&#39;(?&lt;=inet\\s)\\d+(\\.\\d+){3}&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="telnet" tabindex="-1"><a class="header-anchor" href="#telnet"><span>telnet</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">telnet <span class="token function">ip</span> port</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="nc" tabindex="-1"><a class="header-anchor" href="#nc"><span>nc</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">nv <span class="token parameter variable">-zv</span> <span class="token function">ip</span> port</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="系统命令" tabindex="-1"><a class="header-anchor" href="#系统命令"><span>系统命令</span></a></h4><h5 id="hostname" tabindex="-1"><a class="header-anchor" href="#hostname"><span>hostname</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询/修改主机名</span></span>
<span class="line"><span class="token comment"># 查询</span></span>
<span class="line"><span class="token function">hostname</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改(临时的重启后失效)</span></span>
<span class="line"><span class="token function">hostname</span> root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取机器的所有网络接口的 IP 地址（不包括回环地址）</span></span>
<span class="line"><span class="token function">hostname</span> <span class="token parameter variable">-I</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="hostnamectl" tabindex="-1"><a class="header-anchor" href="#hostnamectl"><span>hostnamectl</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看当前主机</span></span>
<span class="line">hostnamectl status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改主机名</span></span>
<span class="line"><span class="token function">sudo</span> hostnamectl set-hostname <span class="token operator">&lt;</span>newhostname<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置临时主机名</span></span>
<span class="line"><span class="token function">sudo</span> hostnamectl set-hostname <span class="token parameter variable">--transient</span> temporary-hostname</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="getent" tabindex="-1"><a class="header-anchor" href="#getent"><span>getent</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 从系统数据库获取数据</span></span>
<span class="line">getent <span class="token operator">&lt;</span>database<span class="token operator">&gt;</span> <span class="token punctuation">[</span>key<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询主机和ip映射关系，从/etc/passwd获取信息</span></span>
<span class="line">getent hosts localhost</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询root用户信息，从/etc/passwd获取信息</span></span>
<span class="line">getent <span class="token function">passwd</span> root</span>
<span class="line"><span class="token comment"># root:x:0:0:root:/root:/bin/bash</span></span>
<span class="line"><span class="token comment"># root：用户名</span></span>
<span class="line"><span class="token comment"># x：密码(加密，不可见)</span></span>
<span class="line"><span class="token comment"># 0：用户id</span></span>
<span class="line"><span class="token comment"># 0：用户组id</span></span>
<span class="line"><span class="token comment"># root：用户说明</span></span>
<span class="line"><span class="token comment"># /root：用户主目录，cd ~进入的目录</span></span>
<span class="line"><span class="token comment"># /bin/bash：用户登录使用的shell，/bin/bash下的命令可以直接通过名称执行</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询用户组信息，从/etc/group获取信息</span></span>
<span class="line">getent group root</span>
<span class="line"><span class="token comment"># root:x:0:</span></span>
<span class="line"><span class="token comment"># root：组名</span></span>
<span class="line"><span class="token comment"># x：组密码字段</span></span>
<span class="line"><span class="token comment"># x：组id</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询服务信息，从/etc/services获取服务和端口信息</span></span>
<span class="line">getent services http</span>
<span class="line"><span class="token comment"># http                  80/tcp www www-http</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询网络信息，从/etc/networks获取网络名和网络地址</span></span>
<span class="line">getent networks loopback</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询协议信息，从 /etc/protocols 获取协议相关信息</span></span>
<span class="line">getent protocols tcp</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="which" tabindex="-1"><a class="header-anchor" href="#which"><span>which</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查找显示在系统PATH目录下可执行命令的完整路径</span></span>
<span class="line"><span class="token function">which</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 参数</span></span>
<span class="line"><span class="token parameter variable">-a</span> 显示所有的路径</span>
<span class="line"></span>
<span class="line"><span class="token function">which</span> <span class="token function">java</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="stat" tabindex="-1"><a class="header-anchor" href="#stat"><span>stat</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 用于显示文件或文件系统的详细信息</span></span>
<span class="line"><span class="token function">stat</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>fileName<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询进程的启动时间 -c:指定文件显示信息的格式;%y:文件上次修改的时间(人可读显示)</span></span>
<span class="line"><span class="token function">stat</span> <span class="token parameter variable">-c</span> %y /proc/pid</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h5 id="whereis" tabindex="-1"><a class="header-anchor" href="#whereis"><span>whereis</span></a></h5><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询文件的位置</span></span>
<span class="line"><span class="token function">whereis</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token function">file</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 可以查找nginx所在的目录</span></span>
<span class="line"><span class="token function">whereis</span> nginx</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20241114170225505.png" alt="image-20241114170225505" tabindex="0" loading="lazy"><figcaption>image-20241114170225505</figcaption></figure><h5 id="watch" tabindex="-1"><a class="header-anchor" href="#watch"><span>watch</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 用于周期性执行命令,并在终端持续刷新结果</span></span>
<span class="line"><span class="token function">watch</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>bash<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 可选参数</span></span>
<span class="line"><span class="token parameter variable">-b</span> 异常退出警告 </span>
<span class="line"><span class="token parameter variable">-c</span> </span>
<span class="line"><span class="token parameter variable">-d</span> 高亮显示不同</span>
<span class="line"><span class="token parameter variable">-e</span> 异常退出</span>
<span class="line"><span class="token parameter variable">-g</span> 命令的输出变化时退出</span>
<span class="line"><span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>secs<span class="token operator">&gt;</span> 更新时间间隔<span class="token punctuation">(</span>默认2s<span class="token punctuation">)</span></span>
<span class="line"><span class="token parameter variable">-p</span> 尝试以精确的间隔允许命令</span>
<span class="line"><span class="token parameter variable">-t</span> 不显示watch命令的标题行</span>
<span class="line"><span class="token parameter variable">-x</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="管道符及其它" tabindex="-1"><a class="header-anchor" href="#管道符及其它"><span>管道符及其它</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 以空白作为分隔符,将各列对其</span></span>
<span class="line"><span class="token operator">|</span> <span class="token function">column</span> <span class="token parameter variable">-t</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁止自动换行,且退出后内容显示</span></span>
<span class="line"><span class="token operator">|</span> <span class="token function">less</span> <span class="token parameter variable">-SX</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将命令的内容作为替换</span></span>
<span class="line">\`\`</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="防火墙相关命令" tabindex="-1"><a class="header-anchor" href="#防火墙相关命令"><span>防火墙相关命令</span></a></h3><p>在VMware能够执行ping www.baidu.com的情况下，本地电脑能ping到虚拟机的ip的情况下，通过开启防火墙端口8080，启动tomcat 服务器，可以通过本机访问http://虚拟机ip:8080访问到tomcat，http://虚拟机ip:8080/docs</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 开启防火墙</span></span>
<span class="line"><span class="token function">service</span> firewalld start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启防火墙</span></span>
<span class="line"><span class="token function">service</span> firewalld restart</span>
<span class="line">systemctl restart firewalld.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 关闭防火墙</span></span>
<span class="line"><span class="token function">service</span> firewalld stop</span>
<span class="line">systemctl stop firewalld</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看firewall服务状态</span></span>
<span class="line">systemctl status firewalld</span>
<span class="line">firewall-cmd <span class="token parameter variable">--state</span> </span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#查看版本</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--version</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载防火墙规则设置</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--reload</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有允许的服务</span></span>
<span class="line">firewall-cmd --list-services</span>
<span class="line"><span class="token comment">#获取所有支持的服务</span></span>
<span class="line">firewall-cmd --get-services</span>
<span class="line"><span class="token comment"># 查看全部信息</span></span>
<span class="line">firewall-cmd --list-all</span>
<span class="line"><span class="token comment"># 只看端口信息</span></span>
<span class="line">firewall-cmd --list-ports </span>
<span class="line"><span class="token comment"># 查看8080端口是否开放</span></span>
<span class="line">firewall-cmd --query-port<span class="token operator">=</span><span class="token number">8080</span>/tcp</span>
<span class="line"><span class="token comment"># 查询某区域是否允许ssh协议的流量通过</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --query-service<span class="token operator">=</span>ssh</span>
<span class="line"><span class="token comment">#查询某区域是否允许https协议的流量通过</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --query-service<span class="token operator">=</span>https</span>
<span class="line"></span>
<span class="line"><span class="token comment">#添加访问3306端口tcp协议的策略，设置允许，并且永久生效</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span></span>
<span class="line"><span class="token comment"># 开启一段端口策略</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">5000</span>-5500/tcp <span class="token parameter variable">--permanent</span></span>
<span class="line"><span class="token comment"># 关闭防火墙端口3306</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --remove-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span></span>
<span class="line"><span class="token comment"># 关闭防火墙端口5000-5500一段端口</span></span>
<span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --remove-port<span class="token operator">=</span><span class="token number">5000</span>-5500/tcp <span class="token parameter variable">--permanent</span></span>
<span class="line"><span class="token comment">#命令含义</span></span>
<span class="line">--zone：作用域</span>
<span class="line"><span class="token parameter variable">--add</span> -port-80/tcp：添加端口,格式为:端口/通讯协议</span>
<span class="line">--permanent：永久生效,没有此参数重启后失效</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出所有区域信息</span></span>
<span class="line">firewall-cmd --list-all-zones </span>
<span class="line"><span class="token comment"># 查看当前的活动区域信息</span></span>
<span class="line">firewall-cmd --get-active-zones </span>
<span class="line"><span class="token comment"># 设置public区域为默认区域</span></span>
<span class="line">firewall-cmd --set-default-zone<span class="token operator">=</span>public </span>
<span class="line"><span class="token comment"># 查看默认区域信息</span></span>
<span class="line">firewall-cmd --get-default-zone </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="环境安装" tabindex="-1"><a class="header-anchor" href="#环境安装"><span>环境安装</span></a></h2><p>有三种安装方式：rpm安装、解压缩安装、yum安装</p><h3 id="yum" tabindex="-1"><a class="header-anchor" href="#yum"><span>yum</span></a></h3><p>yum: Yum(全称为 Yellow dog Updater, Modified)：是一个在RedHat、Fedora以及CentOS中的一种软件包管理器，能够从指定的服务器自动下载软件包并且进行安装，可以自动处理软件包之间的依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># yum命令检查是否安装应用mariadb</span></span>
<span class="line">yum list installed <span class="token operator">|</span> <span class="token function">grep</span> mariadb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装应用</span></span>
<span class="line">yum <span class="token function">install</span> <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新所有的软件包</span></span>
<span class="line">yum update </span>
<span class="line"><span class="token comment"># 更新指定的软件包</span></span>
<span class="line">yum update <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载指定的软件包</span></span>
<span class="line">yum remove <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># -y确认卸载</span></span>
<span class="line">yum <span class="token parameter variable">-y</span> remove <span class="token function">grep</span>  yum list installed <span class="token operator">|</span> <span class="token function">grep</span> httpd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载查询到的安装</span></span>
<span class="line">yum list installed <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">xargs</span> yum remove <span class="token parameter variable">-y</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rpm" tabindex="-1"><a class="header-anchor" href="#rpm"><span>rpm</span></a></h3><p>oracle官网下载rpm包：https://www.oracle.com/java/technologies/downloads/</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">rpm</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>rpmName<span class="token operator">&gt;</span></span>
<span class="line">-i：安装软件包</span>
<span class="line">-v：显示详情输出</span>
<span class="line">-h：安装过程中显示进度条</span>
<span class="line">-U：升级软件，没有则安装</span>
<span class="line">--nodeps：在安装或卸载时忽略依赖关系</span>
<span class="line">--force：强制安装或卸载软件包，即使存在文件冲突</span>
<span class="line"><span class="token parameter variable">-e</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>：卸载指定的软件包</span>
<span class="line"><span class="token parameter variable">-q</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>：查询已安装的软件包</span>
<span class="line">-qa：查询所有安装的软件包</span>
<span class="line"></span>
<span class="line"><span class="token comment"># rpm安装jdk步骤，jdk默认自动安装到/usr/java中</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token operator">&lt;</span>rpm名称<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> jdk-23_linux-aarch64_bin.rpm</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询是否安装成功</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> jdk</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载jdk，上面-aq查询的内容名</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-de</span> <span class="token parameter variable">--nodeps</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> </span>
<span class="line"></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">rpm</span> <span class="token parameter variable">-de</span> <span class="token parameter variable">--nodeps</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解压缩安装" tabindex="-1"><a class="header-anchor" href="#解压缩安装"><span>解压缩安装</span></a></h3><h4 id="tar" tabindex="-1"><a class="header-anchor" href="#tar"><span>tar</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">tar</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>tarPackage<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 参数说明</span></span>
<span class="line">-x：解压缩</span>
<span class="line">-c：创建压缩文件</span>
<span class="line">-z：通过gzip解压</span>
<span class="line">-j：通过bzip2解压</span>
<span class="line">-v：显示详细过程</span>
<span class="line">-f：指定文件名</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解压缩包jdk-23_linux-x64_bin.tar.gz</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> jdk-23_linux-x64_bin.tar.gz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 压缩命令</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-czvf</span> <span class="token operator">&lt;</span>tarName<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="zip个unzip" tabindex="-1"><a class="header-anchor" href="#zip个unzip"><span>zip个unzip</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># zip解压缩</span></span>
<span class="line"><span class="token function">zip</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>zipPackage<span class="token operator">&gt;</span></span>
<span class="line">-r：整个目录</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 压缩</span></span>
<span class="line"><span class="token function">unzip</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="gzip和gunzip" tabindex="-1"><a class="header-anchor" href="#gzip和gunzip"><span>gzip和gunzip</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 压缩</span></span>
<span class="line"><span class="token function">gzip</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解压缩</span></span>
<span class="line">gunzip <span class="token operator">&lt;</span>file.gz<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="编译源代码" tabindex="-1"><a class="header-anchor" href="#编译源代码"><span>编译源代码</span></a></h4><p>如果软件包是以源代码形式提供的，通常是.tar.gz或.tar.bz2文件，例如nginx，还需要执行以下步骤：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置编译选项</span></span>
<span class="line">./configure <span class="token punctuation">[</span>option<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行编译</span></span>
<span class="line"><span class="token function">make</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jdk安装" tabindex="-1"><a class="header-anchor" href="#jdk安装"><span>jdk安装</span></a></h3><ol><li>oracle官网下载linux的jdk安装包，tar.gz结尾的；</li><li>通过Xftp连接linux，让后将安装包上传到linux中的/usr/java/目录中；</li><li>在/usr/java/中执行 tar -zxvf 安装包名命令；</li><li>配置环境变量：</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 编辑/etc/profile文件，添加内容</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/java/jdk1.8.0_121</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$PATH</span>:<span class="token variable">$JAVA_HOME</span>/bin&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存退出</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="5"><li>source /etc/profile 命令通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录；</li><li>java -version测试是否配置安装成功。</li></ol><h3 id="tomcat安装" tabindex="-1"><a class="header-anchor" href="#tomcat安装"><span>Tomcat安装</span></a></h3><ol><li>官网下载地址：https://tomcat.apache.org/download-90.cgi tar.gz；</li><li>使用Xftp连接Linux，将tomcat安装包上传到/usr/tomcat/目录中；</li><li>在/usr/tomcat/下执行 tar -zxvf tomcat tar.gz安装包；</li><li>进入tomcat的bin/目录，执行./startup.sh测试是否启动成功；</li><li>这个也可以配置环境变量，方便启动。</li></ol><h3 id="mysql安装" tabindex="-1"><a class="header-anchor" href="#mysql安装"><span>MySQL安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># yum命令检查是否安装mariadb数据库：</span></span>
<span class="line">yum list installed<span class="token operator">|</span><span class="token function">grep</span> mariadb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如有安装，执行yum命令卸载mariadb</span></span>
<span class="line">yum <span class="token parameter variable">-y</span> remove <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol><li>上传文件</li><li>上传的文件的目录中执行tar -zsvf 包名</li><li>修改文件名mv mysql-5.7.18-linux-glibc2.5-x86_64 mysql-5.7.18</li><li>在mysql-5.7.18目录下创建data文件夹</li><li>创建mysql用户 useradd mysql，用来执行MySQL命令</li><li>初始化MySQL命令执行</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">./mysqld  <span class="token parameter variable">--initialize</span>  <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/mysql/mysql-5.7.18/data <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/mysql/mysql-5.7.18</span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">--initialize</span> <span class="token comment"># 初始化mysql，创建mysql的root, 随机生成密码。记住密码，登录msyql使用。</span></span>
<span class="line"><span class="token parameter variable">--user</span> <span class="token comment"># 执行msyqld 命令的linux用户名</span></span>
<span class="line"><span class="token parameter variable">--datadir</span> <span class="token comment"># mysql数据文件的存放位置，目录位置参照本机的设置。</span></span>
<span class="line"><span class="token parameter variable">--basedir</span> <span class="token comment"># msyql安装程序的目录，目录位置参照本机的设置。</span></span>
<span class="line"><span class="token comment"># 该命令执行后，会生成一个临时的mysql数据库root用户的密码，请先拷贝出来记住，后续第一次登录mysql需要使用</span></span>
<span class="line">sw<span class="token punctuation">;</span>pTysro46J</span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220526220036810.png" alt="image-20220526220036810" tabindex="0" loading="lazy"><figcaption>image-20220526220036810</figcaption></figure><ol start="7"><li>启动安全功能，在mysql-5.7.18/bin目录下执行命令</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">./mysql_ssl_rsa_setup <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/mysql/mysql-5.7.18/data</span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220526220336522.png" alt="image-20220526220336522" tabindex="0" loading="lazy"><figcaption>image-20220526220336522</figcaption></figure><ol start="8"><li>修改安装目录的权限</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 递归修改所属用户:所属组为mysql</span></span>
<span class="line"><span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql  /usr/mysql/mysql-5.7.18/</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="9"><li>启动mysql，可以通过查看进程确定mysql是否启动成功</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">./mysqld_safe <span class="token operator">&amp;</span> </span>
<span class="line"><span class="token operator">&amp;</span>：标识后台运行</span>
<span class="line"><span class="token comment">#mysqld_safe程序会在启动MySQL服务器后继续监控其运行情况，并在其死机时重新启动它。</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="10"><li>进入mysql客户端</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">./mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span></span>
<span class="line">密码：sw<span class="token punctuation">;</span>pTysro46J</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="11"><li>修改root密码</li></ol><figure><img src="http://47.101.155.205/image-20220526221718018.png" alt="image-20220526221718018" tabindex="0" loading="lazy"><figcaption>image-20220526221718018</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">alter user <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> identified by <span class="token string">&#39;111111&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="12"><li>授权远程访问</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">grant all privileges on *.* to root@<span class="token string">&#39;%&#39;</span> identified by <span class="token string">&#39;111111&#39;</span><span class="token punctuation">;</span></span>
<span class="line">*.*：第一*标识所有的数据库，第二个*标识数据库中的所有表</span>
<span class="line">root@<span class="token string">&#39;%&#39;</span> <span class="token comment">#root 标识用户名，%表示ip地址，也可以指定具体的IP地址</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 刷新授权</span></span>
<span class="line">flush privileges<span class="token punctuation">;</span> </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="13"><li>开启3306端口访问</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol start="14"><li>windows连接测试192.168.144.128 root 111111</li><li>停止mysql服务器</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 输入命令后，输入密码111111关闭</span></span>
<span class="line">./mysqladmin <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span> <span class="token function">shutdown</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询是否有mysql进程</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-x</span> <span class="token operator">|</span> <span class="token function">grep</span> mysql</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="mysql安装二" tabindex="-1"><a class="header-anchor" href="#mysql安装二"><span>MySQL安装二</span></a></h3><blockquote><p>方式二</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql的扩展源</span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line">yum <span class="token function">install</span> mysql-community-server <span class="token parameter variable">-y</span></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line">systemctl start mysqld</span>
<span class="line"><span class="token comment"># 查看密码</span></span>
<span class="line"><span class="token function">grep</span> <span class="token string">&quot;password&quot;</span> /var/log/mysqld.log</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="阿里云服务连接配置" tabindex="-1"><a class="header-anchor" href="#阿里云服务连接配置"><span>阿里云服务连接配置</span></a></h2><p>使用VNC网站自带的VNC连接上服务器</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">密码:?</span>
<span class="line"><span class="token builtin class-name">cd</span> /etc/ssh</span>
<span class="line"><span class="token function">ls</span> *config</span>
<span class="line"><span class="token comment"># 可以查看到有两个配置文件ssh_config,sshd_config</span></span>
<span class="line"><span class="token function">vim</span> sshd_config</span>
<span class="line"><span class="token comment"># 修改为true</span></span>
<span class="line">PubkeyAuthentication <span class="token function">yes</span> </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="iptables" tabindex="-1"><a class="header-anchor" href="#iptables"><span>iptables</span></a></h2><h3 id="查看所有防火墙规则" tabindex="-1"><a class="header-anchor" href="#查看所有防火墙规则"><span>查看所有防火墙规则</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看所有防火墙规则,管理员用户执行</span></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Chain INPUT 输入规则，Chain FORWARD转发规则，Chain OUTPUT输出规则</span></span>
<span class="line"><span class="token comment"># target 数据包采取动作:ACCEPT,REJECT</span></span>
<span class="line"><span class="token comment"># prot 匹配的协议:tcp,udp</span></span>
<span class="line"><span class="token comment"># opt </span></span>
<span class="line"><span class="token comment"># source 数据包的源地址</span></span>
<span class="line"><span class="token comment"># destination 数据包的目标地址</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># tcp dpt:bootps:tcp=&gt;适用于TCP协议;dpt=&gt;目标端口;bootps=&gt;对应BOOTP(Bootstrap Protocol)或DHCP(Dynamic Host Configuration Protocol)服务端口号的名称(68)</span></span>
<span class="line"><span class="token comment"># tcp dpt:bootps:允许针对TCP协议、目标端口为bootps(即DHCP服务的端口)的数据包通过防火墙。允许 DHCP 服务的通信，以便动态分配IP地址给网络上的设备</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># udp dpt:domain:domain=&gt;对应的是DNS(Domain Name System)服务的端口(53)</span></span>
<span class="line"><span class="token comment"># udp dpt:domain:表示允许针对UDP协议、目标端口为domain(DNS)端口的数据包通过防火墙</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20240120172435455.png" alt="image-20240120172435455" tabindex="0" loading="lazy"><figcaption>image-20240120172435455</figcaption></figure><p><code>ctstate RELATED,ESTABLISHED</code>规则是用于 iptables 防火墙规则中的连接跟踪状态（connection tracking state）的设置。这个规则用于允许与现有连接有关的和已经建立的数据包通过防火墙。这是一个常见的设置，确保已经建立的连接以及与这些连接相关的数据包能够自由通过防火墙，而不受额外的限制。这对于维护连接状态和确保相关的数据包能够正常传输非常重要，比如在网络会话中的请求和响应之间。</p><ul><li><code>ctstate</code>：连接跟踪模块的关键字，用于匹配特定的连接状态</li><li><code>RELATED</code>：表示匹配与现有连接有关的数据包。例如，如果你的系统上有一个 FTP 连接，那么与 FTP 控制连接相关的数据包也会被匹配。这确保相关的数据包能够通过防火墙。</li><li><code>ESTABLISHED</code>：表示匹配已经建立的连接的数据包。一旦连接经过连接建立的握手阶段，后续的数据包都被认为是已建立的连接。</li></ul><p><code>reject-with icmp-port-unreachable</code>规则是 iptables 防火墙规则中用于拒绝连接的设置，当连接被拒绝时，系统将返回 ICMP 错误消息，具体地说是 ICMP Port Unreachable 错误消息。</p><p>这个规则用于拒绝连接，并向发送方返回 ICMP Port Unreachable 错误消息。当有连接尝试到达被防火墙拒绝的端口时，系统将发送这个错误消息，通知发送方目标端口不可达。</p><ul><li><code>reject-with</code>：拒绝连接时采取的动作，并指定拒绝连接时返回的 ICMP 错误消息类型；</li><li><code>icmp-port-unreachable</code>：表示当连接被拒绝时返回 ICMP Port Unreachable 错误消息。这个错误消息通常表示目标端口不可达。</li></ul><h3 id="查看特定端口的规则" tabindex="-1"><a class="header-anchor" href="#查看特定端口的规则"><span>查看特定端口的规则</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看特定端口的规则</span></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>端口号<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">67</span></span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">53</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20240120175112091.png" alt="image-20240120175112091" tabindex="0" loading="lazy"><figcaption>image-20240120175112091</figcaption></figure><h3 id="查看特定规则" tabindex="-1"><a class="header-anchor" href="#查看特定规则"><span>查看特定规则</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 出站</span></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span> OUTPUT</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 入站</span></span>
<span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-L</span> INPUT</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20240120180745119.png" alt="image-20240120180745119" tabindex="0" loading="lazy"><figcaption>image-20240120180745119</figcaption></figure><h3 id="查看网络地址转换-nat-规则" tabindex="-1"><a class="header-anchor" href="#查看网络地址转换-nat-规则"><span>查看网络地址转换(NAT)规则</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-L</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20240120181624876.png" alt="image-20240120181624876" tabindex="0" loading="lazy"><figcaption>image-20240120181624876</figcaption></figure><h3 id="查看详细信息" tabindex="-1"><a class="header-anchor" href="#查看详细信息"><span>查看详细信息</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> iptables <span class="token parameter variable">-S</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20240120181946773.png" alt="image-20240120181946773" tabindex="0" loading="lazy"><figcaption>image-20240120181946773</figcaption></figure><h2 id="route" tabindex="-1"><a class="header-anchor" href="#route"><span>route</span></a></h2><h3 id="查询当前路由表" tabindex="-1"><a class="header-anchor" href="#查询当前路由表"><span>查询当前路由表</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">ip</span> route show</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ol><li><code>default via &lt;网关&gt; dev &lt;接口&gt;</code>：默认路由，表示当没有更特定的路由匹配时，数据包将被发送到指定网关和接口。</li><li><code>&lt;目标网络&gt; via &lt;网关&gt; dev &lt;接口&gt;</code>：*针对特定目标网络的路由，数据包将通过指定的网关和接口发送。</li><li><code>&lt;目标网络&gt;/&lt;子网掩码&gt; dev &lt;接口&gt; proto kernel scope link src &lt;本地IP&gt;</code>：本地子网的直连路由，表示该网络直接通过指定接口连接到本地主机。</li><li><code>&lt;目标网络&gt;/&lt;子网掩码&gt; dev &lt;接口&gt; scope link</code>： 针对本地连接的子网的路由，表示该网络直接通过指定接口连接到本地主机。</li><li><code>&lt;目标网络&gt;/&lt;子网掩码&gt; via &lt;网关&gt; dev &lt;接口&gt;</code>： 针对其他网络的路由，数据包将通过指定的网关和接口发送。</li></ol><figure><img src="http://47.101.155.205/image-20240120183908672.png" alt="image-20240120183908672" tabindex="0" loading="lazy"><figcaption>image-20240120183908672</figcaption></figure><figure><img src="http://47.101.155.205/image-20240120183905637.png" alt="image-20240120183905637" tabindex="0" loading="lazy"><figcaption>image-20240120183905637</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看详细的路由表信息</span></span>
<span class="line"><span class="token function">ip</span> route show table all</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看指定目标的路由信息</span></span>
<span class="line"><span class="token function">ip</span> route get <span class="token operator">&lt;</span>目标IP<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加静态路由</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">ip</span> route <span class="token function">add</span> <span class="token operator">&lt;</span>目标网络<span class="token operator">&gt;</span> via <span class="token operator">&lt;</span>网关<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除路由</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">ip</span> route del <span class="token operator">&lt;</span>目标网络<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="查看网关配置" tabindex="-1"><a class="header-anchor" href="#查看网关配置"><span>查看网关配置</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">route <span class="token parameter variable">-n</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="内存查询相关命令" tabindex="-1"><a class="header-anchor" href="#内存查询相关命令"><span>内存查询相关命令</span></a></h2><h3 id="free" tabindex="-1"><a class="header-anchor" href="#free"><span>free</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"> 					total       used       <span class="token function">free</span>     shared    buffers     cached</span>
<span class="line">Mem:       			<span class="token number">8061340</span>    <span class="token number">6801328</span>    <span class="token number">1260012</span>          <span class="token number">0</span>     <span class="token number">960828</span>    <span class="token number">1670536</span></span>
<span class="line">-/+ buffers/cache:  		   <span class="token number">4169964</span>    <span class="token number">3891376</span></span>
<span class="line">Swap:            	<span class="token number">0</span>          <span class="token number">0</span>          <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">total: 物理内存总量</span>
<span class="line">used: 已经使用的内存，包括缓存和缓冲区</span>
<span class="line">free: 完全空闲的内存</span>
<span class="line">shared: 用于 tmpfs（临时文件系统）的共享内存</span>
<span class="line">buffers: 用于块设备的缓冲区，可被回收</span>
<span class="line">cached: 用于文件系统的缓存，可被回收</span>
<span class="line"></span>
<span class="line">buffers/cache的used：Mem.used - Mem.buffers - Mem.cached，排除缓存和缓冲区后的内存使用量</span>
<span class="line">buffers/cache的free：Mem.free + Mem.buffers + Mem.cached，最大可用内存量</span>
<span class="line">buffers/cache行提供了一个实际应用程序使用的内存视图，它将buffers和cache视为可以随时回收用于应用程序的内存</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token punctuation">[</span>-b,-k,-m,-g<span class="token punctuation">]</span> <span class="token comment"># 内存单位</span></span>
<span class="line"><span class="token punctuation">[</span>-l<span class="token punctuation">]</span> <span class="token comment"># 显示详细的低内存和高内存统计信息,32位操作系统才有分别</span></span>
<span class="line"><span class="token punctuation">[</span>-o<span class="token punctuation">]</span> <span class="token comment"># 不显示-/+ buffers/cache</span></span>
<span class="line"><span class="token punctuation">[</span>-t<span class="token punctuation">]</span> <span class="token comment"># 显示RAM +交换的总数</span></span>
<span class="line"><span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token comment"># 延迟几秒刷新</span></span>
<span class="line"><span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token comment"># 刷新几次</span></span>
<span class="line"><span class="token punctuation">[</span>-V<span class="token punctuation">]</span> <span class="token comment"># 版本信息</span></span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-h</span> <span class="token comment"># 可读单位显示内容情况</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RAM（Random Access Memory，随机访问内存）：RAM 是系统中的高速内存，用于存储正在处理的操作系统和应用程序数据；访问速度非常快，通常在纳秒级别。</p><p>RAM 工作原理：当一个程序运行时，操作系统会将其数据加载到 RAM 中。如果 RAM 有足够的空间，所有需要的数据都会保存在 RAM 中以便快速访问。</p><p>Swap（Swap Memory，交换内存）：交换内存是系统的一部分磁盘空间，用于扩展虚拟内存；由于交换内存使用的是磁盘，其访问速度远低于 RAM，通常在毫秒级别。</p><p>Swap 工作原理：当 RAM 空间不足时，操作系统会将一些不常用的数据从 RAM 移动到交换空间，从而腾出 RAM 空间用于当前任务；这种过程称为“换出”（swap out）和“换入”（swap in）；使用交换内存会导致性能下降，因为磁盘的访问速度远低于 RAM。</p><h3 id="top" tabindex="-1"><a class="header-anchor" href="#top"><span>top</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">top</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>：更新间隔</span>
<span class="line"><span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>: 允许多少次退出</span>
<span class="line"><span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>：某个用户的进程</span>
<span class="line"><span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span>：某个pid进程</span>
<span class="line"></span>
<span class="line"><span class="token function">top</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 计算进程占用总内存</span></span>
<span class="line"><span class="token comment"># NR&gt;7 表示跳过 top 摘要信息</span></span>
<span class="line"><span class="token function">top</span> <span class="token parameter variable">-b</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;NR&gt;7 {sum+=$6} END {print sum/1024 &quot; MB&quot;}&#39;</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-eo</span> <span class="token assign-left variable">rss</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{sum+=$1} END {print sum/1024 &quot; MB&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20240606165145446.png" alt="image-20240606165145446" tabindex="0" loading="lazy"><figcaption>image-20240606165145446</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">当前时间16:29:16，运行265天6:32小时，当前登录用户数10，系统过去1分钟、5分钟、10分钟的平均负载</span>
<span class="line">当前系统总进程数205，1个正在运行，204个睡眠状态，0个停止，0个僵尸</span>
<span class="line">us用户态进程消耗CPU2.7%，sy系统态进程消耗CPU3.1%，ni低优先级进程消耗CPU0.0%，id空闲CPU时间94.1%</span>
<span class="line">wa等待I/O操作CPU时间0.0%，hi硬件中断消耗CPU时间0.0%，si软件中断消耗CPU时间0.2%，st虚拟机偷取CPU时间0.0%</span>
<span class="line">物理内存使用情况：总物理内存，使用物理内存，空闲物理内存，缓存内存、缓存内存</span>
<span class="line">交换内存使用情况：未使用</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">内容描述：</span>
<span class="line">PID：进程ID</span>
<span class="line">USER：进程所有者</span>
<span class="line">PR: Priority, 进程优先级</span>
<span class="line">NI: Nice Value, 进程的 nice 值（影响优先级）</span>
<span class="line">VIRT: Virtual Image, 访问的虚拟地址空间的总大小，并不是指实际存在的物理内存或硬盘空间。</span>
<span class="line">RES: Resident Size, 进程真正使用的物理内存量</span>
<span class="line">SHR：Shared Memory, 进程使用的共享内存量</span>
<span class="line">S: Process Status, 进程状态(R:运行,S:睡眠,D:不可中断睡眠,Z:僵尸,T:停止)</span>
<span class="line">%CPU: CPU Usage, 进程消耗的 CPU 时间百分比</span>
<span class="line">%MEM: Memory Usage (RES),进程占用的物理内存百分比</span>
<span class="line">TIME+: CPU Time, hundredths, 进程运行的总 CPU 时间(格式mm:ss)</span>
<span class="line">COMMAND: 启动进程的命令名称</span>
<span class="line"></span>
<span class="line">进入程序键盘作用</span>
<span class="line">q: 退出</span>
<span class="line">P(shift+p): 按 %CPU 排序，默认就是</span>
<span class="line">M(shift+m): 按 %MEM 排序</span>
<span class="line">T(shift+T): 按 TIME+ 排序</span>
<span class="line">1: 显示所有 cpu 使用情况</span>
<span class="line">s: 默认3s刷新，按下后输入值更新多级刷新</span>
<span class="line">o: 输入条件过滤进程信息</span>
<span class="line">f: 编辑页面显示哪些选项</span>
<span class="line"></span>
<span class="line">E: Shift+E, 切换顶部内存显示单位</span>
<span class="line">e: 切换进程列表内存显示单位</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询java程序高cpu原因 步骤</span></span>
<span class="line"><span class="token comment"># top命令通过P查询高cpu的进程pid</span></span>
<span class="line"><span class="token function">top</span></span>
<span class="line"><span class="token comment"># -H(显示线程),通过P排序找到高cpu的进程pid</span></span>
<span class="line"><span class="token function">top</span> <span class="token parameter variable">-H</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 将10进制的线程id转换成16进制, 根据此条件过滤得到jvm的栈信息</span></span>
<span class="line">jstack <span class="token parameter variable">-l</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;nid对于的16进制&#39;</span> <span class="token parameter variable">-A</span> <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250417091945735.png" alt="image-20250417091945735" tabindex="0" loading="lazy"><figcaption>image-20250417091945735</figcaption></figure><p>虚拟内存是一种内存管理技术，允许操作系统使用硬盘空间作为扩展的内存，从而使系统可以运行比物理内存(RAM)更大的程序。以下是虚拟内存的主要特点和工作原理：</p><p><strong>主要特点：</strong></p><ol><li>扩展内存：虚拟内存使得系统能够使用硬盘上的一部分空间（称为交换空间或页面文件）来存储不常用的数据或程序，仿佛系统有更多的物理内存。</li><li>内存隔离：每个进程都有自己的虚拟地址空间，增强了安全性和稳定性。一个进程不能直接访问另一个进程的内存，避免了内存冲突和数据损坏。</li><li>按需加载：操作系统可以将不活跃的部分程序或数据从物理内存转移到硬盘，释放出物理内存供其他进程使用。这种机制称为“页面置换”。</li></ol><p><strong>工作原理：</strong></p><ol><li>地址映射：虚拟内存使用页面（通常为4KB或更大）来管理内存。每个虚拟地址通过页表映射到实际的物理地址。</li><li>页面调度：当程序访问的页面不在物理内存中时，操作系统会产生一个页面错误（page fault），并通过以下步骤处理： <ol><li>操作系统查找所需的页面在硬盘上的位置。</li><li>将该页面从硬盘加载到物理内存中。</li><li>更新页表以反映该页面的新位置。</li></ol></li><li>替换策略：如果物理内存已满，操作系统会根据某种替换策略（如最少使用算法、最近最少使用算法等）选择一个页面进行替换，将其内容写回硬盘并腾出空间。</li></ol><p><strong>优先</strong></p><ol><li>提高效率：可以运行更大的应用程序。</li><li>内存保护：增加了进程之间的隔离。</li><li>简化内存管理：简化了程序的内存分配和管理。</li></ol><p><strong>缺点：</strong></p><ol><li>性能开销：频繁的页面调度会导致性能下降，称为“页面抖动”（thrashing）。</li><li>硬盘速度较慢：访问硬盘比访问 RAM 要慢得多，可能影响系统响应速度。</li></ol><h2 id="时间同步" tabindex="-1"><a class="header-anchor" href="#时间同步"><span>时间同步</span></a></h2><h3 id="chronyd" tabindex="-1"><a class="header-anchor" href="#chronyd"><span>chronyd</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 显示系统当前可用的时间源信息 ^*表示同步有效</span></span>
<span class="line">chronyc sources</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看系统时间同步的状态和详细信息</span></span>
<span class="line">chronyc tracking</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250113140526294.png" alt="image-20250113140526294" tabindex="0" loading="lazy"><figcaption>image-20250113140526294</figcaption></figure><figure><img src="http://47.101.155.205/image-20250113140152204.png" alt="image-20250113140152204" tabindex="0" loading="lazy"><figcaption>image-20250113140152204</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 无效解决方案</span></span>
<span class="line"><span class="token comment"># 修改配置文件指向有效的服务器</span></span>
<span class="line">/etc/chrony.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启chronyd</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart chronyd</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="抓包工具" tabindex="-1"><a class="header-anchor" href="#抓包工具"><span>抓包工具</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 捕获eth0接口传输的数据包</span></span>
<span class="line">tcpdump <span class="token parameter variable">-i</span> eth0 port <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,382)]))}const o=n(p,[["render",i],["__file","Linux.html.vue"]]),r=JSON.parse('{"path":"/linux/Linux.html","title":"Linux","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"什么是Linux","slug":"什么是linux","link":"#什么是linux","children":[{"level":3,"title":"什么是操作系统","slug":"什么是操作系统","link":"#什么是操作系统","children":[]},{"level":3,"title":"Linux主要发行版本","slug":"linux主要发行版本","link":"#linux主要发行版本","children":[]}]},{"level":2,"title":"虚拟机","slug":"虚拟机","link":"#虚拟机","children":[]},{"level":2,"title":"安装VMware虚拟机","slug":"安装vmware虚拟机","link":"#安装vmware虚拟机","children":[{"level":3,"title":"虚拟机安装CentOS","slug":"虚拟机安装centos","link":"#虚拟机安装centos","children":[]}]},{"level":2,"title":"远程工具","slug":"远程工具","link":"#远程工具","children":[{"level":3,"title":"Xshell","slug":"xshell","link":"#xshell","children":[]},{"level":3,"title":"Xftp","slug":"xftp","link":"#xftp","children":[]}]},{"level":2,"title":"Linux命令学习","slug":"linux命令学习","link":"#linux命令学习","children":[{"level":3,"title":"关机重启命令","slug":"关机重启命令","link":"#关机重启命令","children":[]},{"level":3,"title":"系统目录结构","slug":"系统目录结构","link":"#系统目录结构","children":[]},{"level":3,"title":"常用基本命令","slug":"常用基本命令","link":"#常用基本命令","children":[]},{"level":3,"title":"防火墙相关命令","slug":"防火墙相关命令","link":"#防火墙相关命令","children":[]}]},{"level":2,"title":"环境安装","slug":"环境安装","link":"#环境安装","children":[{"level":3,"title":"yum","slug":"yum","link":"#yum","children":[]},{"level":3,"title":"rpm","slug":"rpm","link":"#rpm","children":[]},{"level":3,"title":"解压缩安装","slug":"解压缩安装","link":"#解压缩安装","children":[]},{"level":3,"title":"jdk安装","slug":"jdk安装","link":"#jdk安装","children":[]},{"level":3,"title":"Tomcat安装","slug":"tomcat安装","link":"#tomcat安装","children":[]},{"level":3,"title":"MySQL安装","slug":"mysql安装","link":"#mysql安装","children":[]},{"level":3,"title":"MySQL安装二","slug":"mysql安装二","link":"#mysql安装二","children":[]}]},{"level":2,"title":"阿里云服务连接配置","slug":"阿里云服务连接配置","link":"#阿里云服务连接配置","children":[]},{"level":2,"title":"iptables","slug":"iptables","link":"#iptables","children":[{"level":3,"title":"查看所有防火墙规则","slug":"查看所有防火墙规则","link":"#查看所有防火墙规则","children":[]},{"level":3,"title":"查看特定端口的规则","slug":"查看特定端口的规则","link":"#查看特定端口的规则","children":[]},{"level":3,"title":"查看特定规则","slug":"查看特定规则","link":"#查看特定规则","children":[]},{"level":3,"title":"查看网络地址转换(NAT)规则","slug":"查看网络地址转换-nat-规则","link":"#查看网络地址转换-nat-规则","children":[]},{"level":3,"title":"查看详细信息","slug":"查看详细信息","link":"#查看详细信息","children":[]}]},{"level":2,"title":"route","slug":"route","link":"#route","children":[{"level":3,"title":"查询当前路由表","slug":"查询当前路由表","link":"#查询当前路由表","children":[]},{"level":3,"title":"查看网关配置","slug":"查看网关配置","link":"#查看网关配置","children":[]}]},{"level":2,"title":"内存查询相关命令","slug":"内存查询相关命令","link":"#内存查询相关命令","children":[{"level":3,"title":"free","slug":"free","link":"#free","children":[]},{"level":3,"title":"top","slug":"top","link":"#top","children":[]}]},{"level":2,"title":"时间同步","slug":"时间同步","link":"#时间同步","children":[{"level":3,"title":"chronyd","slug":"chronyd","link":"#chronyd","children":[]}]},{"level":2,"title":"抓包工具","slug":"抓包工具","link":"#抓包工具","children":[]}],"git":{"updatedTime":1758879066000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":6,"url":"https://github.com/oycm"},{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":16,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"linux/Linux.md"}');export{o as comp,r as data};
