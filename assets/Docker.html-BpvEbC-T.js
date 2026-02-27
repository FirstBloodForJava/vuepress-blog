import{_ as n,c as a,e,o as p}from"./app-BIGZvh4f.js";const l={};function t(i,s){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h1><h2 id="docker介绍" tabindex="-1"><a class="header-anchor" href="#docker介绍"><span>Docker介绍</span></a></h2><h3 id="什么是docker" tabindex="-1"><a class="header-anchor" href="#什么是docker"><span>什么是Docker</span></a></h3><p>Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux或Windows操作系统的机器上,也可以实现虚拟化,容器是完全使用沙箱机制,相互之间不会有任何接口。</p><h3 id="docker组成部分" tabindex="-1"><a class="header-anchor" href="#docker组成部分"><span>Docker组成部分</span></a></h3><ol><li>DockerClient客户端</li><li>DockerDaemon守护进程</li><li>DockerImage镜像</li><li>DockerContainer容器</li></ol><h3 id="docker架构" tabindex="-1"><a class="header-anchor" href="#docker架构"><span>Docker架构</span></a></h3><p>Docker使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。Docker 容器通过 Docker 镜像来创建。容器与镜像的关系类似于面向对象编程中的对象与类。</p><p>Docker采用C/S架构Docker daemon作为服务端接受来自客户的请求，并处理这些请求（创建、运行、分发容器）。客户端和服务端既可以运行在一个机器上，也可通过 socket 或者RESTful API 来进行通信。</p><p>Docker daemon一般在宿主主机后台运行，等待接收来自客户端的消息。 Docker客户端则为用户提供一系列可执行命令，用户用这些命令实现跟 Docker daemon 交互。</p><figure><img src="http://47.101.155.205/image-20220613164830672.png" alt="image-20220613164830672" tabindex="0" loading="lazy"><figcaption>image-20220613164830672</figcaption></figure><h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>Docker安装</span></a></h2><p>官网：https://www.docker.com/</p><p>安装文档：https://docs.docker.com/engine/install/centos/</p><p>购买的阿里云服务器使用的Alibaba Cloud Linux。Alibaba Cloud Linux是阿里云基于龙蜥社区（OpenAnolis）的龙蜥操作系统（Anolis OS）打造的操作系统发行版，在全面兼容RHEL/CentOS生态的同时，为云上应用程序提供安全、稳定、高性能的定制化运行环境，并针对云基础设施进行了深度优化，为您打造更好的云上操作系统体验。目前发行版本为Alibaba Cloud Linux 2与Alibaba Cloud Linux 3。</p><blockquote><p>卸载旧版本</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span></span>
<span class="line">				docker-client <span class="token punctuation">\\</span></span>
<span class="line">				docker-client-latest <span class="token punctuation">\\</span></span>
<span class="line">				docker-common <span class="token punctuation">\\</span></span>
<span class="line">				docker-latest <span class="token punctuation">\\</span></span>
<span class="line">				docker-latest-logrotate <span class="token punctuation">\\</span></span>
<span class="line">				docker-logrotate <span class="token punctuation">\\</span></span>
<span class="line">				docker-engine</span>
<span class="line"></span></code></pre></div><blockquote><p>Docker有三种安装方式</p></blockquote><h3 id="_1、docker存储库方式安装" tabindex="-1"><a class="header-anchor" href="#_1、docker存储库方式安装"><span>1、Docker存储库方式安装</span></a></h3><ol><li><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装所需的依赖</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils</span>
<span class="line"></span></code></pre></div></li><li><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置存储库</span></span>
<span class="line"><span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span></span>
<span class="line">    --add-repo <span class="token punctuation">\\</span></span>
<span class="line">    https://download.docker.com/linux/centos/docker-ce.repo</span>
<span class="line">    </span>
<span class="line"><span class="token comment">#阿里云</span></span>
<span class="line"><span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span></span>
<span class="line">    --add-repo <span class="token punctuation">\\</span></span>
<span class="line">    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span>
<span class="line"><span class="token comment">#清华大学</span></span>
<span class="line"><span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span></span>
<span class="line">    --add-repo <span class="token punctuation">\\</span></span>
<span class="line">    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo</span>
<span class="line">    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装最新docker引擎</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-compose-plugin</span>
<span class="line"></span>
<span class="line"></span></code></pre></div></li></ol><figure><img src="http://47.101.155.205/image-20220613171055088.png" alt="image-20220613171055088" tabindex="0" loading="lazy"><figcaption>image-20220613171055088</figcaption></figure><figure><img src="http://47.101.155.205/image-20220613171450549.png" alt="image-20220613171450549" tabindex="0" loading="lazy"><figcaption>image-20220613171450549</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阿里云存储库</span></span>
<span class="line"><span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span></span>
<span class="line">    --add-repo <span class="token punctuation">\\</span></span>
<span class="line">    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装最新docker引擎</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-compose-plugin</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20250207135730736.png" alt="image-20250207135730736" tabindex="0" loading="lazy"><figcaption>image-20250207135730736</figcaption></figure><h3 id="_2、rpm包安装" tabindex="-1"><a class="header-anchor" href="#_2、rpm包安装"><span>2、rpm包安装</span></a></h3><ol><li><p>下载地址：https://download.docker.com/linux/centos/</p></li><li><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> /path/to/package.rpm</span>
<span class="line"></span></code></pre></div></li></ol><h3 id="_3、脚本安装" tabindex="-1"><a class="header-anchor" href="#_3、脚本安装"><span>3、脚本安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token parameter variable">-o</span> get-docker.sh</span>
<span class="line"><span class="token assign-left variable">DRY_RUN</span><span class="token operator">=</span><span class="token number">1</span> <span class="token function">sh</span> ./get-docker.sh</span>
<span class="line"></span></code></pre></div><h3 id="阿里云文档" tabindex="-1"><a class="header-anchor" href="#阿里云文档"><span>阿里云文档</span></a></h3><p>https://help.aliyun.com/zh/ecs/use-cases/install-and-use-docker?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.1.4c662f3dxQyFF5&amp;scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@51853._.ID_help@@%E6%96%87%E6%A1%A3@@51853-RL_docker%E5%AE%89%E8%A3%85-LOC_new~UND~search-OR_ser-PAR1_213e362217389107648674175e1c73-V_4-RE_new3-P0_0-P1_0-title#940c78642dmq9</p><h4 id="centos7-x" tabindex="-1"><a class="header-anchor" href="#centos7-x"><span>centos7.x</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加Docker软件包源</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/docker-ce.repo http://mirrors.cloud.aliyuncs.com/docker-ce/linux/centos/docker-ce.repo</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s|https://mirrors.aliyun.com|http://mirrors.cloud.aliyuncs.com|g&#39;</span> /etc/yum.repos.d/docker-ce.repo</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装Docker社区版本，容器运行时containerd.io，以及Docker构建和Compose插件</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动Docker</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start <span class="token function">docker</span></span>
<span class="line"><span class="token comment">#设置Docker守护进程在系统启动时自动启动</span></span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动测试" tabindex="-1"><a class="header-anchor" href="#启动测试"><span>启动测试</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动docker引擎</span></span>
<span class="line">systemctl start <span class="token function">docker</span></span>
<span class="line"><span class="token comment"># 运行hello-world镜像</span></span>
<span class="line"><span class="token function">docker</span> run hello-world</span>
<span class="line"><span class="token comment"># 关闭docker引擎</span></span>
<span class="line">systemctl stop <span class="token function">docker</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220613173157559.png" alt="image-20220613173157559" tabindex="0" loading="lazy"><figcaption>image-20220613173157559</figcaption></figure><h3 id="卸载docker" tabindex="-1"><a class="header-anchor" href="#卸载docker"><span>卸载Docker</span></a></h3><p>卸载Docker引擎、Docker客户端、容器、compose安装包</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> yum remove docker-ce docker-ce-cli containerd.io docker-compose-plugin</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#删除自定义的配置文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/containerd</span>
<span class="line"></span></code></pre></div><h4 id="centos7-x-1" tabindex="-1"><a class="header-anchor" href="#centos7-x-1"><span>centos7.x</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除Docker相关源</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/yum.repos.d/docker*.repo</span>
<span class="line"><span class="token comment"># 卸载旧版本的Docker和相关的软件包</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> remove <span class="token punctuation">\\</span></span>
<span class="line">docker-ce <span class="token punctuation">\\</span></span>
<span class="line">containerd.io <span class="token punctuation">\\</span></span>
<span class="line">docker-ce-rootless-extras <span class="token punctuation">\\</span></span>
<span class="line">docker-buildx-plugin <span class="token punctuation">\\</span></span>
<span class="line">docker-ce-cli <span class="token punctuation">\\</span></span>
<span class="line">docker-compose-plugin</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-client命令" tabindex="-1"><a class="header-anchor" href="#docker-client命令"><span>Docker-Client命令</span></a></h2><p>官网地址：https://docs.docker.com/engine/reference/commandline/dockerd/</p><h3 id="_1、docker命令" tabindex="-1"><a class="header-anchor" href="#_1、docker命令"><span>1、Docker命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#启动docker服务</span></span>
<span class="line">systemctl start <span class="token function">docker</span></span>
<span class="line"><span class="token comment">#关闭docker服务</span></span>
<span class="line">systemctl stop <span class="token function">docker</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 搜索镜像名的镜像</span></span>
<span class="line"><span class="token function">docker</span> search <span class="token operator">&lt;</span>iamge-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 以镜像centos创建容器启动</span></span>
<span class="line"><span class="token function">docker</span> run centos </span>
<span class="line"><span class="token comment"># 查看运行容器的资源使用情况</span></span>
<span class="line"><span class="token function">docker</span> stats</span>
<span class="line"><span class="token comment">#查看正在运行的容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span></span>
<span class="line"><span class="token comment"># 查看所有容器(包括刚刚运行的容器),-n num最后几条，-l最后一条，-q只显示容器id</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span></span>
<span class="line"><span class="token comment"># 查看容器日志</span></span>
<span class="line"><span class="token function">docker</span> logs <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>contain-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20220613231214371.png" alt="image-20220613231214371" tabindex="0" loading="lazy"><figcaption>image-20220613231214371</figcaption></figure><table><thead><tr><th>属性名</th><th>描述</th></tr></thead><tbody><tr><td>CONTAINER ID</td><td>容器的id</td></tr><tr><td>IMAGE</td><td>使用的镜像</td></tr><tr><td>COMMAND</td><td>启动容器时运行的命令</td></tr><tr><td>CREATED</td><td>容器创建的时间</td></tr><tr><td>STATUS</td><td>容器的状态</td></tr><tr><td>PORTS</td><td>容器的端口信息和使用的连接类型(tcp\\udp)</td></tr><tr><td>NAMES</td><td>自动分配的容器名称(可以指定)</td></tr></tbody></table><p>STATUS-容器的7种状态：</p><ol><li>created（已创建）</li><li>restarting（重启中）</li><li>running 或 Up（运行中）</li><li>removing（迁移中）</li><li>paused（暂停）</li><li>exited（停止）</li><li>dead（死亡）</li></ol><h3 id="_2、镜像命令" tabindex="-1"><a class="header-anchor" href="#_2、镜像命令"><span>2、镜像命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#查看当前docker的镜像</span></span>
<span class="line"><span class="token function">docker</span> images</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220614003744012.png" alt="image-20220614003744012" tabindex="0" loading="lazy"><figcaption>image-20220614003744012</figcaption></figure><table><thead><tr><th>属性名</th><th>属性描述</th></tr></thead><tbody><tr><td>REPOSITORY</td><td>镜像的仓库源</td></tr><tr><td>TAG</td><td>镜像的标签</td></tr><tr><td>IMAGE ID</td><td>镜像的id</td></tr><tr><td>CARATED</td><td>镜像创建的时间</td></tr><tr><td>SIZE</td><td>镜像的大小</td></tr></tbody></table><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#从远程拉取镜像，没有tag默认时latest标签的镜像</span></span>
<span class="line"><span class="token function">docker</span> pull <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 拉去指定版本的远程镜像</span></span>
<span class="line">docket pull mysql:5.7 </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220613233508598.png" alt="image-20220613233508598" tabindex="0" loading="lazy"><figcaption>image-20220613233508598</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 镜像查询</span></span>
<span class="line"><span class="token function">docker</span> search <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">docker</span> search httpd</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20220614004551416.png" alt="image-20220614004551416" tabindex="0" loading="lazy"><figcaption>image-20220614004551416</figcaption></figure><table><thead><tr><th>属性名</th><th>属性描述</th></tr></thead><tbody><tr><td>NAME</td><td>镜像仓库源的名称</td></tr><tr><td>DESCRIPTION</td><td>镜像的描述</td></tr><tr><td>STARS</td><td>点赞收藏的数量</td></tr><tr><td>OFFICIAL</td><td>是否Docker官方发布</td></tr><tr><td>AUTOMATED</td><td>自动构建</td></tr></tbody></table><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除镜像</span></span>
<span class="line"><span class="token function">docker</span> rmi <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="创建镜像方式一" tabindex="-1"><a class="header-anchor" href="#创建镜像方式一"><span>创建镜像方式一</span></a></h4><p>从容器中创建镜像，需要容器的id。也可以在之前的容器中执行apt-get update一些更新命令后创建容器。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> commit <span class="token punctuation">[</span>-m <span class="token parameter variable">-a</span> <span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token operator">&lt;</span>container-id<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># -m 提交的描述</span></span>
<span class="line"><span class="token comment"># -a 镜像的作者 id 创建的目标镜像名</span></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;has update&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;runoob&quot;</span> e218edb10161 runoob/ubuntu:v2</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;描述&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;作者&quot;</span> container的id image的名字</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="创建镜像方式二" tabindex="-1"><a class="header-anchor" href="#创建镜像方式二"><span>创建镜像方式二</span></a></h4><p>通过Dockerfile文件创建镜像。Dockerfile文件内容语法：</p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> 		#镜像从哪里来</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">MAINTAINER</span> 	#镜像是谁创建的</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> 		#构建镜像执行的命令，每一次RUN都会构建一层，在docker build执行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">VOLUME</span>		#定义数据卷，没有定义使用默认的</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> 		#指定后续执行的用户组和用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> 	#切换当前工作的执行目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span>		#暴露端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span>			#添加文件，如果是URL或压缩包便会自动下载或自动解压</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span>		#添加文件以复制的形式，跟ADD类似，但不具备自动下载或解压的功能</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span>			#容器启动的命令，有多个以最后一个为准。启动容器时传递参数替换原来的命令。docker run执行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span>	#容器启动时执行的命令,启动容器时传递参数追加</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span>			#设置容器环境变量，键值对</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span>		#给镜像添加一些元数据(metadata)，以键值对的形式</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token comment"># -t 指定要创建的目标镜像名,不指定版本,默认是最新的镜像</span></span>
<span class="line"><span class="token comment"># . 表示从当前目录寻找Dockerfile文件,可以指定Dockerfile的绝对路径</span></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> runoob/centos:6.7 <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置镜像标签(版本)</span></span>
<span class="line"><span class="token function">docker</span> tag <span class="token operator">&lt;</span>image-id<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3、容器命令" tabindex="-1"><a class="header-anchor" href="#_3、容器命令"><span>3、容器命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 以镜像创建容器启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span> <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token punctuation">[</span>args<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># -d(--detach) 后台持续运行</span></span>
<span class="line"><span class="token comment"># -it -i交互式操作，-t终端</span></span>
<span class="line"><span class="token comment"># -p &lt;主机端口&gt;:&lt;容器端口&gt; 将容器的端口映射到主机端口</span></span>
<span class="line"><span class="token comment"># -P 随机映射端口</span></span>
<span class="line"><span class="token comment"># --name &lt;name&gt; 容器的名称</span></span>
<span class="line"><span class="token comment"># -v 将主机的目录挂载到容器内部的文件或目录</span></span>
<span class="line"><span class="token comment"># --restart no(不重启) always(总是)</span></span>
<span class="line"><span class="token comment"># -e 环境变量设置</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 以交互式启动centos镜像的容器，exit之后，容器也退出</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> centos /bin/bash</span>
<span class="line"><span class="token comment"># 以后台模式运行容器，如果容器中没有可执行的命令，容器就会自动关闭</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> centos /bin/bash</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> centos /bin/sh <span class="token parameter variable">-c</span> <span class="token string">&quot;while true; do echo hello world;sleep 1;done&quot;</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> centos /bin/bash</span>
<span class="line"><span class="token comment"># 容器内部的5000端口映射到我们本地主机的 5000 端口上</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 training/webapp python app.py</span>
<span class="line"><span class="token comment"># 随机映射端口号</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> training/webapp python app.py </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启容器</span></span>
<span class="line"><span class="token function">docker</span> restart <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment">#关闭容器，会暂时卡顿一下</span></span>
<span class="line"><span class="token function">docker</span> stop <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>contain-name<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 启动已经创建的容器</span></span>
<span class="line"><span class="token function">docker</span> start <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#进入容器</span></span>
<span class="line"><span class="token function">docker</span> attach <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># exec进入容器，退出不会关闭容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token punctuation">[</span>option<span class="token punctuation">]</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>bash<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 交互式进入容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>  /bin/bash</span>
<span class="line"><span class="token comment"># 非交互式进入容器,只执行一个命令</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> <span class="token function">cat</span> txt.log</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#导入导出容器</span></span>
<span class="line"><span class="token comment">#导出容器快照到本地tar文件</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">export</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> <span class="token operator">&gt;</span> <span class="token operator">&lt;</span>tar.file<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 在当前路径下生成了一个my-hello-world.tar的文件</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">export</span> 19310fb32b6b <span class="token operator">&gt;</span> my-hello-world.tar</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将快照文件ubuntu.tar导入到镜像test/ubuntu:v1</span></span>
<span class="line"><span class="token function">cat</span> docker/ubuntu.tar <span class="token operator">|</span> <span class="token function">docker</span> <span class="token function">import</span> - test/ubuntu:v1</span>
<span class="line"><span class="token comment"># 将my-hello-world.tar快照文件导入成my-hello-world名的镜像</span></span>
<span class="line"><span class="token function">cat</span> my-hello-world.tar <span class="token operator">|</span> <span class="token function">docker</span> <span class="token function">import</span> - my-hello-world</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#删除容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> <span class="token comment">#不能删除正在运行的容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span> <span class="token comment">#强制删除容器(包括正在运行的容器)</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token punctuation">(</span>docker <span class="token function">ps</span> -aq<span class="token punctuation">)</span> <span class="token comment">#删除所有的容器</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#查看端口映射情况</span></span>
<span class="line"><span class="token function">docker</span> port <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>contain-name<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#查看容器启动的进程信息</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">top</span> <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>contain-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#查看容器配置信息</span></span>
<span class="line"><span class="token function">docker</span> inspect <span class="token operator">&lt;</span>contain-id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>contain-name<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像"><span>镜像</span></a></h2><p>查找镜像官网：https://hub.docker.com/</p><h3 id="阿里云镜像加速器-不维护" tabindex="-1"><a class="header-anchor" href="#阿里云镜像加速器-不维护"><span>阿里云镜像加速器(不维护)</span></a></h3><p>https://developer.aliyun.com/article/1025496?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.60.6b092f3dCsrhjp&amp;scm=20140722.S_community</p><p>进入到阿里云的控制台 &gt; 搜索镜像&gt; 选择容器镜像服务</p><figure><img src="http://47.101.155.205/image-20250207143005007.png" alt="image-20250207143005007" tabindex="0" loading="lazy"><figcaption>image-20250207143005007</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 目录不存在则创建目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 填写对应的镜像地址https://mtkxslk5.mirror.aliyuncs.com</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;</span>
<span class="line">{</span>
<span class="line">  &quot;registry-mirrors&quot;: [&quot;https://mtkxslk5.mirror.aliyuncs.com&quot;]</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载配置</span></span>
<span class="line"><span class="token function">sudo</span> systemctl daemon-reload</span>
<span class="line"><span class="token comment"># 重启</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置镜像源" tabindex="-1"><a class="header-anchor" href="#配置镜像源"><span>配置镜像源</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;</span>
<span class="line">{</span>
<span class="line">    &quot;registry-mirrors&quot;: [</span>
<span class="line">        &quot;https://docker.hpcloud.cloud&quot;,</span>
<span class="line">        &quot;https://docker.m.daocloud.io&quot;,</span>
<span class="line">        &quot;https://docker.unsee.tech&quot;,</span>
<span class="line">        &quot;https://docker.1panel.live&quot;,</span>
<span class="line">        &quot;http://mirrors.ustc.edu.cn&quot;,</span>
<span class="line">        &quot;https://docker.chenby.cn&quot;,</span>
<span class="line">        &quot;http://mirror.azure.cn&quot;,</span>
<span class="line">        &quot;https://dockerpull.org&quot;,</span>
<span class="line">        &quot;https://dockerhub.icu&quot;,</span>
<span class="line">        &quot;https://hub.rat.dev&quot;</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载配置</span></span>
<span class="line"><span class="token function">sudo</span> systemctl daemon-reload</span>
<span class="line"><span class="token comment"># 重启</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="centos7" tabindex="-1"><a class="header-anchor" href="#centos7"><span>centos7</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-n</span> /lib/systemd/system/docker.service /etc/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 替换命令</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s|ExecStart=/usr/bin/docker daemon|ExecStart=/usr/bin/docker daemon --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|g&quot;</span> /etc/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 还原</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s|ExecStart=/usr/bin/docker daemon --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|ExecStart=/usr/bin/docker daemon|g&quot;</span> /etc/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 替换命令</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s|ExecStart=/usr/bin/dockerd|ExecStart=/usr/bin/dockerd --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|g&quot;</span> /etc/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 还原</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s|ExecStart=/usr/bin/dockerd --registry-mirror=https://mtkxslk5.mirror.aliyuncs.com|ExecStart=/usr/bin/dockerd|g&quot;</span> /etc/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> systemctl daemon-reload</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> <span class="token function">docker</span> restart</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="training-webapp" tabindex="-1"><a class="header-anchor" href="#training-webapp"><span>training/webapp</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> pull training/webapp</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> training/webapp</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p80:5000</span> training/webapp</span>
<span class="line"><span class="token function">docker</span> attach container的id</span>
<span class="line"><span class="token function">docker</span> log container的id</span>
<span class="line"></span></code></pre></div><h3 id="portainer-portainer" tabindex="-1"><a class="header-anchor" href="#portainer-portainer"><span>portainer/portainer</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> pull portainer/portainer</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">80</span>:9000 <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true portainer/portainer</span>
<span class="line"></span></code></pre></div><p>用户名：admin</p><p>密码：admin1234</p><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql"><span>mysql</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> pull mysql:5.7</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql-8 <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">1024</span> mysql:8.0</span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql /bin/bash</span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p1024</span> <span class="token comment">#可以直接连接容器内的mysql数据库</span></span>
<span class="line">/etc/mysql/ <span class="token comment">#目录下存放的是mysql的配置文件，在给数据库建表之后，生效的配置文件时/etc/mysql/*.cnd来覆盖配置</span></span>
<span class="line">/var/lib/ <span class="token comment">#目录会出现三个带有mysql的目录，数据在/var/lib/mysql中</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用docker search mysql会提示连接超时</span></span>
<span class="line"><span class="token function">docker</span> pull mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">--name</span> mysql-8 <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-v</span> /var/local/mysql:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token operator">&lt;</span>password<span class="token operator">&gt;</span> <span class="token punctuation">\\</span></span>
<span class="line">mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器 </span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql-8 mysql <span class="token parameter variable">-uroot</span> -p<span class="token operator">&lt;</span>password<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>客户端连接提示：Public Key Retrieval is not allowed。解决方式：url后面添加参数?allowPublicKeyRetrieval=true</strong></p><p><strong>连接配置useSSL=true也可能导致连接失败。</strong></p><h3 id="镜像安装jdk" tabindex="-1"><a class="header-anchor" href="#镜像安装jdk"><span>镜像安装jdk</span></a></h3><p>将jdk安装包放在/usr/目录下</p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> centos:7</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> jdk-8u121-linux-x64.tar.gz /usr/java/</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/usr/java/jdk1.8.0_121</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JRE_HOME=<span class="token variable">$JAVA_HOME</span>/jre</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> CLASSPATH=.:<span class="token variable">$JAVA_HOME</span>/lib:<span class="token variable">$JRE_HOME</span>/lib</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$PATH</span></span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> java -version</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> centos:7</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> jdk-8u121-linux-x64.tar.gz /usr/java/</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/usr/java/jdk1.8.0_121</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JRE_HOME=<span class="token variable">$JAVA_HOME</span>/jre</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> CLASSPATH=.:<span class="token variable">$JAVA_HOME</span>/lib:<span class="token variable">$JRE_HOME</span>/lib</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$PATH</span></span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/bin/bash&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java -version&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="镜像启动java项目步骤" tabindex="-1"><a class="header-anchor" href="#镜像启动java项目步骤"><span>镜像启动Java项目步骤</span></a></h3><ol><li>通过Dockerfile创建镜像。</li><li>启动jar包的shell脚本。</li><li>创建操作镜像/容器的shell脚本。</li></ol><p>创建Dockerfile文件：</p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 从哪里拉去一个镜像</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> java:8</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 镜像创建者</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">MAINTAINER</span> oycm mingorg@163.com</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将Dockerfile处的jar-name.jar文件复制到镜像中的server目录下</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> jar-name.jar /server/jar-name.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> start.sh /server/start.sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在构建镜像过程中执行的命令</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> [ <span class="token string">&quot;chmod&quot;</span>, <span class="token string">&quot;777&quot;</span>, <span class="token string">&quot;/server/start.sh&quot;</span> ]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;Asia/Shanghai&quot;</span> &gt; /etc/timezone</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 容器启动时默认执行的脚本</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/server/start.sh&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>iamge-name<span class="token operator">&gt;</span><span class="token punctuation">[</span>:tag<span class="token punctuation">]</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>启动jar包的start.sh shell脚本准备：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内存相关参数</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$MEM_OPTS</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> -Xms1024m -Xmx1024m -XX:NewRatio=1 -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:+AlwaysPreTouch -Xss256k&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> <span class="token variable">$MEM_OPTS</span>&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># GC相关参数</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$GC_OPTS</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+UseCMSInitiatingOccupancyOnly&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> <span class="token variable">$GC_OPTS</span>&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$OPTIMIZE_OPTS</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> -XX:AutoBoxCacheMax=20000&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> <span class="token variable">$OPTIMIZE_OPTS</span>&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># GC错日志配置</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$SHOOTING_OPTS</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> -XX:-OmitStackTraceInFastThrow -XX:ErrorFile=errorGcLogs/hs_err_%p.log&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$SYS_PARAMS</span> <span class="token variable">$SHOOTING_OPTS</span>&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Spring激活配置文件</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$SPRING_PROFILES_ACTIVE</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">JAR_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$JAR_PARAMS</span> --spring.profiles.active=own&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">JAR_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$JAR_PARAMS</span> --spring.profiles.active=<span class="token variable">$SPRING_PROFILES_ACTIVE</span>&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">JAR_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$JAR_PARAMS</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> /server</span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> <span class="token parameter variable">-server</span> <span class="token variable">$SYS_PARAMS</span> ./jar-name.jar <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token variable">$JAR_PARAMS</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动容器的shell脚本：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token assign-left variable">APP_NAME</span><span class="token operator">=</span><span class="token string">&#39;contain-name&#39;</span></span>
<span class="line"><span class="token assign-left variable">SPRING_PROFILES_ACTIVE</span><span class="token operator">=</span><span class="token string">&#39;test&#39;</span></span>
<span class="line"><span class="token assign-left variable">APP_PATH</span><span class="token operator">=</span><span class="token string">&#39;/u01/oycm&#39;</span></span>
<span class="line"><span class="token assign-left variable">IMAGE_NAME</span><span class="token operator">=</span><span class="token string">&#39;iamge的远程地址&#39;</span></span>
<span class="line"><span class="token comment"># 远程debug使用</span></span>
<span class="line"><span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span>-agentlib:jdwp<span class="token operator">=</span>transport<span class="token operator">=</span>dt_socket,server<span class="token operator">=</span>y,suspend<span class="token operator">=</span>n,address<span class="token operator">=</span><span class="token number">5005</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">check_if_process_is_running</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token assign-left variable">CONTAINER_ID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span><span class="token operator">|</span><span class="token function">grep</span> $<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print \\$1}&#39;</span><span class="token variable">\`</span></span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$CONTAINER_ID</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    // <span class="token number">1</span> 表示false 没有查到容器id</span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">  <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">check_if_images_exist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 查询本地是有当前容器名称的镜像</span></span>
<span class="line">  <span class="token assign-left variable">IMAGE_ID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> images<span class="token operator">|</span><span class="token function">grep</span> $<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print \\$1}&#39;</span><span class="token variable">\`</span></span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$IMAGE_ID</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">  <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">restart_app</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># 停止容器</span></span>
<span class="line">    <span class="token comment"># 获取当前容器名称的容器id</span></span>
<span class="line">    <span class="token assign-left variable">DOCKER_PROCESS_ID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">--filter</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>^/$<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span>$<span class="token operator">|</span><span class="token function">grep</span> $<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print $1}&#39;</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token parameter variable">-n1</span><span class="token variable">\`</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$DOCKER_PROCESS_ID</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">      <span class="token function">docker</span> stop <span class="token variable">\${DOCKER_PROCESS_ID}</span></span>
<span class="line">      <span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">\${DOCKER_PROCESS_ID}</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token comment"># 删除容器name</span></span>
<span class="line">    <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span> <span class="token parameter variable">--filter</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>^/$<span class="token punctuation">{</span>APP_NAME<span class="token punctuation">}</span>$<span class="token variable">\`</span></span></span>
<span class="line">    <span class="token comment"># 启动容器</span></span>
<span class="line">    <span class="token comment"># -e 配置环境变量SYS_PARAMS SPRING_PROFILES_ACTIVE JAR_PARAMS</span></span>
<span class="line">    <span class="token comment"># -v 挂载目录</span></span>
<span class="line">    <span class="token comment"># --network host</span></span>
<span class="line">    <span class="token function">docker</span> run <span class="token parameter variable">--name</span> <span class="token variable">\${APP_NAME}</span> <span class="token parameter variable">-p</span> <span class="token number">9099</span>:9099 <span class="token parameter variable">-e</span> <span class="token assign-left variable">SYS_PARAMS</span><span class="token operator">=</span><span class="token variable">\${SYS_PARAMS}</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">SPRING_PROFILES_ACTIVE</span><span class="token operator">=</span><span class="token variable">\${SPRING_PROFILES_ACTIVE}</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">JAR_PARAMS</span><span class="token operator">=</span><span class="token string">&quot;--spring.config.additional-location=./config/application.yml&quot;</span> <span class="token parameter variable">-v</span> <span class="token variable">\${APP_PATH}</span>/test:/server/test:rw <span class="token parameter variable">-v</span> /u01/html/wgq/portalCptStore:/server/wgqCpt:rw  <span class="token parameter variable">-v</span> <span class="token variable">\${APP_PATH}</span>/config:/server/config:rw <span class="token parameter variable">-v</span> <span class="token variable">\${APP_PATH}</span>/logs:/server/logs:rw <span class="token parameter variable">-v</span> <span class="token variable">\${APP_PATH}</span>/runtime:/server/runtime:rw <span class="token parameter variable">--network</span> <span class="token function">host</span> <span class="token parameter variable">-d</span> <span class="token variable">\${IMAGE_NAME}</span>:lastest</span>
<span class="line">    <span class="token keyword">if</span> check_if_process_is_running</span>
<span class="line">    <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> start success&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> start fail&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">  status<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> check_if_process_is_running</span>
<span class="line">    <span class="token keyword">then</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> is running&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> not running&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  stop<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 停止容器</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token operator">!</span> check_if_process_is_running</span>
<span class="line">    <span class="token keyword">then</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> has stopped&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">      <span class="token function">docker</span> <span class="token function">ps</span><span class="token operator">|</span><span class="token function">grep</span> <span class="token variable">\${APP_NAME}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print $1}&#39;</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token parameter variable">-n1</span> <span class="token function">docker</span> stop</span>
<span class="line">      <span class="token function">sleep</span> 2s</span>
<span class="line">      <span class="token keyword">if</span> <span class="token operator">!</span> check_if_process_is_running</span>
<span class="line">      <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> stop success&quot;</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> stop fail&quot;</span></span>
<span class="line">      <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  start<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 启动容器</span></span>
<span class="line">    <span class="token keyword">if</span> check_if_process_is_running</span>
<span class="line">    <span class="token keyword">then</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> has start&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">      <span class="token function">docker</span> start <span class="token variable">\${APP_NAME}</span></span>
<span class="line">      <span class="token function">sleep</span> 2s</span>
<span class="line">      <span class="token keyword">if</span> check_if_process_is_running</span>
<span class="line">      <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> start success&quot;</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${APP_NAME}</span> start fail&quot;</span></span>
<span class="line">      <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  rollback<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 回滚容器 rollback 旧的镜像版本</span></span>
<span class="line">    <span class="token assign-left variable">ROLLBACK_TAG</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$2</span>&quot;</span></span>
<span class="line">    <span class="token function">docker</span> tag <span class="token variable">\${IMAGE_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">\${ROLLBACK_TAG}</span> <span class="token variable">\${IMAGE_NAME}</span>:lastest</span>
<span class="line">    restart_app</span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  reload<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 将一个tar文件镜像加载为最新的镜像</span></span>
<span class="line">    <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./<span class="token variable">\${APP_NAME}</span>.tar</span>
<span class="line">    <span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> image <span class="token function">ls</span> $<span class="token punctuation">{</span>IMAGE_NAME<span class="token punctuation">}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print $2}&#39;</span><span class="token operator">|</span><span class="token function">sed</span> <span class="token parameter variable">-n</span> 2p<span class="token variable">\`</span></span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Your Reload TAG is <span class="token variable">\${TAG}</span>&quot;</span></span>
<span class="line">    <span class="token function">docker</span> tag <span class="token variable">\${IMAGE_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">\${TAG}</span> <span class="token variable">\${IMAGE_NAME}</span>:lastest</span>
<span class="line">    restart_app</span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  remove<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 停止容器</span></span>
<span class="line">    <span class="token function">docker</span> <span class="token function">ps</span><span class="token operator">|</span><span class="token function">grep</span> <span class="token variable">\${APP_NAME}</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span>  <span class="token string">&#39;{print $1}&#39;</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token parameter variable">-n1</span> <span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token operator">!</span> check_if_images_exist</span>
<span class="line">    <span class="token keyword">then</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;image remove success&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;image remove fail&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  *<span class="token punctuation">)</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$0</span> {start|stop|rollback|restart|rebuild|remove}&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"><span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> centos:7</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> jdk-8u121-linux-x64.tar.gz /usr/java/</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> site-0.0.1-SNAPSHOT.jar /www/</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/usr/java/jdk1.8.0_121</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JRE_HOME=<span class="token variable">$JAVA_HOME</span>/jre</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> CLASSPATH=.:<span class="token variable">$JAVA_HOME</span>/lib:<span class="token variable">$JRE_HOME</span>/lib</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$PATH</span></span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/bin/bash&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java -version&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> site:1.0 <span class="token builtin class-name">.</span><span class="token comment">#构建项目镜像</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-v</span> /www/:/www/ <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:1.0 <span class="token function">java</span> <span class="token parameter variable">-jar</span> site-0.0.1-SNAPSHOT.jar</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-v</span> /www/:/www/ <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:1.0 /bin/bash</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-v</span> /www/:/www/ <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:2.0 <span class="token parameter variable">-c</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> site-0.0.1-SNAPSHOT.jar</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-docker" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> java:8</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> site-0.0.1-SNAPSHOT.jar /www/site-0.0.1-SNAPSHOT.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /www/</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-docker" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> my-jdk:1.0</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> site-0.0.1-SNAPSHOT.jar /www/app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /www/</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/bin/bash&quot;</span>,<span class="token string">&quot;-c&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java -jar app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-v</span> /www/:/www/ <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:3.0</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:3.0 </span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-v</span> /www/:/www/ <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:3.0</span>
<span class="line"></span></code></pre></div><p>需要注意的点</p><ol><li>java -jar jar包的路径，也就是容器的工作目录</li></ol><p>http://106.15.234.93/</p><blockquote><p>finally</p></blockquote><div class="language-docker" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> my-jdk:1.0</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> site-0.0.1-SNAPSHOT.jar /www/app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /www/</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/bin/bash&quot;</span>,<span class="token string">&quot;-c&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java -jar app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> site:1.0 <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> site <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 site:1.0</span>
<span class="line"></span></code></pre></div><p>直接能运行成功。</p><h2 id="容器" tabindex="-1"><a class="header-anchor" href="#容器"><span>容器</span></a></h2><h3 id="_1、容器数据卷挂载" tabindex="-1"><a class="header-anchor" href="#_1、容器数据卷挂载"><span>1、容器数据卷挂载</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-v</span> 容器内路径 镜像名 <span class="token comment">#匿名挂载</span></span>
<span class="line"><span class="token function">docker</span> volume <span class="token function">ls</span> <span class="token comment">#可以查看卷名</span></span>
<span class="line"><span class="token function">docker</span> volume inspect 卷名 <span class="token comment">#查看挂载信息，可以查看到默认挂载到宿主机的目录</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> /root:/root centos <span class="token comment">#这种方式执行的挂载，通过上面的方式无法查到卷名</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> /root:/root:ro centos <span class="token comment">#指定容器只能读文件，不能修改，也不能创建</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> /root:/root:rw centos <span class="token comment">#容器能读能写</span></span>
<span class="line"></span></code></pre></div><blockquote><p>匿名挂载</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> /容器的路径 镜像名 <span class="token comment">#生成随机的VOLUME NAME，指定的本地挂载路径为</span></span>
<span class="line">/var/lib/docker/volumes/VOLUME NAME随机生成/_data</span>
<span class="line"><span class="token comment">#docker启动mysql时会自动执行匿名挂载将/var/lib/docker/volumes/匿名/_data:/var/lib/mysqlban&#39;d</span></span>
<span class="line"></span></code></pre></div><blockquote><p>具名挂载</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> 卷名/容器的路径 镜像名</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> my-volume:/root centos <span class="token comment">#指定VOLUME NAME，本地挂载路径为</span></span>
<span class="line">/var/lib/docker/volumes/my-volume/_data</span>
<span class="line"></span></code></pre></div><blockquote><p>docker volume</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#可以接的参数</span></span>
<span class="line">create <span class="token comment">#创建一个卷</span></span>
<span class="line">inspect 卷名 <span class="token comment">#展示一个或多个卷的信息</span></span>
<span class="line"><span class="token function">ls</span> <span class="token comment">#展示所有的卷</span></span>
<span class="line">prune <span class="token comment">#删除没有使用的卷，也会删除宿主机的文件</span></span>
<span class="line"><span class="token function">rm</span> 卷名 <span class="token comment">#删除一个或者多个卷(正在使用不能删除,容器存在也不能删除)</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">80</span>:8080 <span class="token parameter variable">-v</span> /root/webapps/web/:/usr/local/tomcat/webapps/web/ <span class="token parameter variable">-d</span> my-tomcat:latest</span>
<span class="line"><span class="token comment">#在/root/webapps/web/目录下新建一个index.jsp</span></span>
<span class="line"></span></code></pre></div><div class="language-jsp" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;html&gt;</span>
<span class="line">    &lt;body&gt;</span>
<span class="line">        &lt;h2&gt;Hello World!&lt;/h2&gt;</span>
<span class="line">        &lt;%=request.getRemoteAddr()%&gt;</span>
<span class="line">    &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#启动之后就可以通过http://服务ip:端口号/web/index.jsp获取本机的ip地址。</span></span>
<span class="line"></span></code></pre></div><h3 id="_2、容器端口映射" tabindex="-1"><a class="header-anchor" href="#_2、容器端口映射"><span>2、容器端口映射</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> 宿主机端口:容器端口 镜像名 <span class="token comment">#默认绑定tcp端口</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> 主机ip:主机端口:容器端口 镜像名 <span class="token comment">#容器内部端口绑定到指定的主机ip端口</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-P</span> 镜像名 <span class="token comment">#容器端口随机映射到主机端口</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> port 容器id/容器name <span class="token comment">#查看端口映射情况</span></span>
<span class="line"></span></code></pre></div><h3 id="_3、端口网络" tabindex="-1"><a class="header-anchor" href="#_3、端口网络"><span>3、端口网络</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> network <span class="token parameter variable">--help</span></span>
<span class="line">connect</span>
<span class="line">create</span>
<span class="line">disconnect</span>
<span class="line">inspect</span>
<span class="line"><span class="token function">ls</span></span>
<span class="line">prune</span>
<span class="line"><span class="token function">rm</span></span>
<span class="line"></span></code></pre></div><blockquote><p>创建网络</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> network create <span class="token parameter variable">-d</span> bridge my-network <span class="token comment">#创建一个my-network的Docker网络，-d指定类型有bridge、overlag</span></span>
<span class="line"></span></code></pre></div><blockquote><p>启动容器配置网络</p></blockquote><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-dit</span> <span class="token parameter variable">--name</span> test1 <span class="token parameter variable">--network</span> my-network my-centos:1.0 /bin/bash</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-dit</span> <span class="token parameter variable">--name</span> test2 <span class="token parameter variable">--network</span> my-network my-centos:1.0 /bin/bash</span>
<span class="line"><span class="token comment">####################################################</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-dit</span> <span class="token parameter variable">--name</span> test3 my-centos:1.0 /bin/bash</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-dit</span> <span class="token parameter variable">--name</span> test4 my-centos:1.0 /bin/bash</span>
<span class="line"><span class="token comment">####################################################</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> test1 /bin/bash</span>
<span class="line"><span class="token function">ping</span> test1</span>
<span class="line"><span class="token function">ping</span> test2</span>
<span class="line"><span class="token comment">#都能够连接成功</span></span>
<span class="line"><span class="token comment">####################################################</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> test3 /bin/bash</span>
<span class="line"><span class="token function">ping</span> test3 <span class="token comment">#Name or Service not known</span></span>
<span class="line"><span class="token function">ping</span> <span class="token number">127.0</span>.*.* <span class="token comment">#第一个*是0-256，第二个是不能同时为0，能ping成功</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、dns" tabindex="-1"><a class="header-anchor" href="#_4、dns"><span>4、DNS</span></a></h3><p>在/etc/docker/目录下新建一个daemon.json,设置全部容器的DNS</p><div class="language-json" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;dns&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;114.114.114.114&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;8.8.8.8&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>需要重启docker引擎才能生效</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> centos <span class="token function">cat</span> etc/resolv.conf <span class="token comment">#输出容器的DNS信息</span></span>
<span class="line"></span></code></pre></div><p>查看linuxDNS信息</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> /etc/resolv.conf</span>
<span class="line"></span></code></pre></div><blockquote><p>手动配置容器配置</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-h</span> 容器主机名 <span class="token parameter variable">--dns</span><span class="token operator">=</span>ip --dns-search<span class="token operator">=</span>搜索域 centos</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> dns <span class="token parameter variable">-itd</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">-h</span> testhost <span class="token parameter variable">--dns</span><span class="token operator">=</span><span class="token number">114.114</span>.114.114 --dns-search<span class="token operator">=</span>hello.com my-centos:1.0 </span>
<span class="line"><span class="token parameter variable">--name</span> dns <span class="token comment">#给容器命名为dns</span></span>
<span class="line"><span class="token parameter variable">--rm</span> <span class="token comment">#容器停止之后删除容器</span></span>
<span class="line"><span class="token parameter variable">-h</span> testhost/--hostname<span class="token operator">=</span>hostname <span class="token comment">#设置容器的主机名为testhost，写入到容器的/etc/hostname和/etc/hosts</span></span>
<span class="line"><span class="token parameter variable">--dns</span> <span class="token comment">#添加DNS服务器到容器的/etc/resolv.conf中，写入为nameserver 114.114.114.114</span></span>
<span class="line">--dns-search hello.com <span class="token comment">#设定容器的搜索域，写入/etc/resolv.conf文件中，写入为 search hello.com</span></span>
<span class="line"></span></code></pre></div><p>容器启动没有配置-dns，--dns-search，docker默认配置/etc/resolve.conf的配置。</p><h2 id="docker仓库" tabindex="-1"><a class="header-anchor" href="#docker仓库"><span>Docker仓库</span></a></h2><blockquote><p>login</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> login <span class="token parameter variable">-u</span> username <span class="token comment">#回车输入密码</span></span>
<span class="line">WARNING<span class="token operator">!</span> Your password will be stored unencrypted <span class="token keyword">in</span> /root/.docker/config.json.</span>
<span class="line">Configure a credential helper to remove this warning. See</span>
<span class="line">https://docs.docker.com/engine/reference/commandline/login/<span class="token comment">#credentials-store</span></span>
<span class="line"></span>
<span class="line">Login Succeeded</span>
<span class="line"></span></code></pre></div><p>网站：https://docs.docker.com/engine/reference/commandline/login/#credentials-store查看凭证免验证</p><blockquote><p>推送镜像到自己的Docker Hub</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> tag my-tomcat:latest oycmstart/tomcat:1.0 <span class="token comment">#首先修改镜像名为DockerHub的账号名/名字:版本号</span></span>
<span class="line"><span class="token function">docker</span> push oycmstart</span>
<span class="line"></span></code></pre></div>`,159)]))}const o=n(l,[["render",t],["__file","Docker.html.vue"]]),r=JSON.parse('{"path":"/build/Docker.html","title":"Docker","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Docker介绍","slug":"docker介绍","link":"#docker介绍","children":[{"level":3,"title":"什么是Docker","slug":"什么是docker","link":"#什么是docker","children":[]},{"level":3,"title":"Docker组成部分","slug":"docker组成部分","link":"#docker组成部分","children":[]},{"level":3,"title":"Docker架构","slug":"docker架构","link":"#docker架构","children":[]}]},{"level":2,"title":"Docker安装","slug":"docker安装","link":"#docker安装","children":[{"level":3,"title":"1、Docker存储库方式安装","slug":"_1、docker存储库方式安装","link":"#_1、docker存储库方式安装","children":[]},{"level":3,"title":"2、rpm包安装","slug":"_2、rpm包安装","link":"#_2、rpm包安装","children":[]},{"level":3,"title":"3、脚本安装","slug":"_3、脚本安装","link":"#_3、脚本安装","children":[]},{"level":3,"title":"阿里云文档","slug":"阿里云文档","link":"#阿里云文档","children":[]},{"level":3,"title":"启动测试","slug":"启动测试","link":"#启动测试","children":[]},{"level":3,"title":"卸载Docker","slug":"卸载docker","link":"#卸载docker","children":[]}]},{"level":2,"title":"Docker-Client命令","slug":"docker-client命令","link":"#docker-client命令","children":[{"level":3,"title":"1、Docker命令","slug":"_1、docker命令","link":"#_1、docker命令","children":[]},{"level":3,"title":"2、镜像命令","slug":"_2、镜像命令","link":"#_2、镜像命令","children":[]},{"level":3,"title":"3、容器命令","slug":"_3、容器命令","link":"#_3、容器命令","children":[]}]},{"level":2,"title":"镜像","slug":"镜像","link":"#镜像","children":[{"level":3,"title":"阿里云镜像加速器(不维护)","slug":"阿里云镜像加速器-不维护","link":"#阿里云镜像加速器-不维护","children":[]},{"level":3,"title":"配置镜像源","slug":"配置镜像源","link":"#配置镜像源","children":[]},{"level":3,"title":"centos7","slug":"centos7","link":"#centos7","children":[]},{"level":3,"title":"training/webapp","slug":"training-webapp","link":"#training-webapp","children":[]},{"level":3,"title":"portainer/portainer","slug":"portainer-portainer","link":"#portainer-portainer","children":[]},{"level":3,"title":"mysql","slug":"mysql","link":"#mysql","children":[]},{"level":3,"title":"镜像安装jdk","slug":"镜像安装jdk","link":"#镜像安装jdk","children":[]},{"level":3,"title":"镜像启动Java项目步骤","slug":"镜像启动java项目步骤","link":"#镜像启动java项目步骤","children":[]}]},{"level":2,"title":"容器","slug":"容器","link":"#容器","children":[{"level":3,"title":"1、容器数据卷挂载","slug":"_1、容器数据卷挂载","link":"#_1、容器数据卷挂载","children":[]},{"level":3,"title":"2、容器端口映射","slug":"_2、容器端口映射","link":"#_2、容器端口映射","children":[]},{"level":3,"title":"3、端口网络","slug":"_3、端口网络","link":"#_3、端口网络","children":[]},{"level":3,"title":"4、DNS","slug":"_4、dns","link":"#_4、dns","children":[]}]},{"level":2,"title":"Docker仓库","slug":"docker仓库","link":"#docker仓库","children":[]}],"git":{"updatedTime":1738989088000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":2,"url":"https://github.com/oycm"},{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"build/Docker.md"}');export{o as comp,r as data};
