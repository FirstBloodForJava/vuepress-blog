import{_ as a,c as n,e,o as p}from"./app-BdgQZLi7.js";const l={};function t(i,s){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="linux进阶" tabindex="-1"><a class="header-anchor" href="#linux进阶"><span>Linux进阶</span></a></h1><h2 id="oomkiller事件" tabindex="-1"><a class="header-anchor" href="#oomkiller事件"><span>OOMkiller事件</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># /var/log/messages或/var/log/syslog日志</span></span>
<span class="line"><span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;oom&#39;</span> /var/log/messages   <span class="token comment"># CentOS/RHEL</span></span>
<span class="line"><span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;killed process&#39;</span> /var/log/messages</span>
<span class="line"></span>
<span class="line"><span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;oom&#39;</span> /var/log/syslog     <span class="token comment"># Ubuntu/Debian</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># dmesg日志查看OOMkiller事件</span></span>
<span class="line"><span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;oom&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;killed&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内容较多的翻页功能</span></span>
<span class="line"><span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;oom&#39;</span> <span class="token operator">|</span> <span class="token function">less</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250210170444821.png" alt="image-20250210170444821" tabindex="0" loading="lazy"><figcaption>image-20250210170444821</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询oom的统计信息</span></span>
<span class="line"><span class="token function">cat</span> /proc/vmstat <span class="token operator">|</span> <span class="token function">grep</span> oom</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询进程的 OOM 评分</span></span>
<span class="line"><span class="token comment"># 越高的值表示进程越容易被 OOM 杀死</span></span>
<span class="line"><span class="token function">cat</span> /proc/<span class="token operator">&lt;</span>PID<span class="token operator">&gt;</span>/oom_score</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 可以手动调整进程的 OOM 权重</span></span>
<span class="line"><span class="token function">cat</span> /proc/<span class="token operator">&lt;</span>PID<span class="token operator">&gt;</span>/oom_score_adj</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 列出所有进程的oom分数</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">pid</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> pid<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$pid</span>: &quot;</span><span class="token punctuation">;</span> <span class="token function">cat</span> /proc/<span class="token variable">$pid</span>/oom_score<span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k2</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="kill-3" tabindex="-1"><a class="header-anchor" href="#kill-3"><span>kill -3</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 发送 SIGQUIT 信号,将线程dump文件输出到标准输出(stdout)</span></span>
<span class="line"><span class="token function">kill</span> <span class="token parameter variable">-3</span> <span class="token operator">&lt;</span>java-pid<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><table><thead><tr><th>启动方式</th><th>dump内容位置</th></tr></thead><tbody><tr><td>java -jar jar包</td><td>终端(stdout)</td></tr><tr><td>nohup java -jar jar包 &amp;</td><td>nohup.out</td></tr><tr><td>nohup java -jar jar包 &gt; output 2&gt;&amp;1 &amp;</td><td>output</td></tr><tr><td>docker run</td><td>docker logs <code>container-id</code></td></tr><tr><td>systemd 启动</td><td>journalctl -u <code>service</code></td></tr></tbody></table><figure><img src="http://47.101.155.205/image-20250210171734554.png" alt="image-20250210171734554" tabindex="0" loading="lazy"><figcaption>image-20250210171734554</figcaption></figure><h2 id="调整系统交换内存" tabindex="-1"><a class="header-anchor" href="#调整系统交换内存"><span>调整系统交换内存</span></a></h2><p>创建</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建4GB大小的swap文件</span></span>
<span class="line"><span class="token function">sudo</span> fallocate <span class="token parameter variable">-l</span> 4G /swapfile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置正确的权限</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">600</span> /swapfile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 格式化为swap</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">mkswap</span> /swapfile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启用swap文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">swapon</span> /swapfile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 交换文件是否生效</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">swapon</span> <span class="token parameter variable">--show</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指向后，系统重启也生效</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&#39;/swapfile none swap sw 0 0&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/fstab</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20250420154249576.png" alt="image-20250420154249576" tabindex="0" loading="lazy"><figcaption>image-20250420154249576</figcaption></figure><p>安全删除swap：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> swapoff /swapfile</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> /swapfile</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="连接相关命令" tabindex="-1"><a class="header-anchor" href="#连接相关命令"><span>连接相关命令</span></a></h2><p>Linux服务器之间进行文件拷贝：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 执行命令后需要进行密码认证</span></span>
<span class="line"><span class="token comment"># 拷贝单个文件到其它指定的服务器</span></span>
<span class="line"><span class="token function">scp</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token punctuation">[</span>user<span class="token punctuation">]</span>@<span class="token punctuation">[</span>ip<span class="token punctuation">]</span>:<span class="token operator">&lt;</span>path<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 递归拷贝目录</span></span>
<span class="line"><span class="token function">scp</span> <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span> <span class="token punctuation">[</span>user<span class="token punctuation">]</span>@<span class="token punctuation">[</span>ip<span class="token punctuation">]</span>:<span class="token operator">&lt;</span>path<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定端口</span></span>
<span class="line"><span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">23</span> <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span> <span class="token punctuation">[</span>user<span class="token punctuation">]</span>@<span class="token punctuation">[</span>ip<span class="token punctuation">]</span>:<span class="token operator">&lt;</span>path<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>ssh连接其它服务器：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 执行后需要输入密码</span></span>
<span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-v</span> <span class="token punctuation">[</span>user<span class="token punctuation">]</span>@<span class="token punctuation">[</span>ip<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>修改Linux连接端口：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 备份文件</span></span>
<span class="line"><span class="token function">cp</span> /etc/ssh/sshd_config /etc/ssh/sshd_config_bak</span>
<span class="line"><span class="token comment"># 修改文件</span></span>
<span class="line"><span class="token function">vim</span> /etc/ssh/sshd_config</span>
<span class="line"><span class="token comment"># 添加需要监听的端口</span></span>
<span class="line">Port <span class="token number">22</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存后，重启sshd服务</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart sshd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 还原</span></span>
<span class="line"><span class="token function">cp</span> /etc/ssh/sshd_config_bak /etc/ssh/sshd_config</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定时删除日志文件" tabindex="-1"><a class="header-anchor" href="#定时删除日志文件"><span>定时删除日志文件</span></a></h2><p>设置步骤：</p><ol><li>准备删除日志文件的脚本；</li><li>通过crontab定时执行删除脚本；</li></ol><p><strong>删除第30天前的文件：rm30days.sh</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token assign-left variable">path</span><span class="token operator">=</span>/springboot/spring-kafka/log</span>
<span class="line"><span class="token assign-left variable">date</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token parameter variable">--date</span><span class="token operator">=</span><span class="token string">&quot;30 days ago&quot;</span> <span class="token string">&quot;+%Y-%m-%d&quot;</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token comment"># 注意&quot;+%Y-%m-%d&quot; 要和日志文件名称一致</span></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token variable">$path</span>/<span class="token variable">$date</span><span class="token string">&#39;.log&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>crontab命令添加执行命令：</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 每天10点执行定时</span></span>
<span class="line"><span class="token number">0</span> <span class="token number">10</span> * * * <span class="token function">sh</span> /springboot/spring-kafka/rm30days.sh</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20250428144348107.png" alt="image-20250428144348107" tabindex="0" loading="lazy"><figcaption>image-20250428144348107</figcaption></figure><p><strong>会在/var/spool/mail/root文件中生成通知。</strong></p>`,34)]))}const o=a(l,[["render",t],["__file","Linux进阶.html.vue"]]),r=JSON.parse('{"path":"/linux/Linux%E8%BF%9B%E9%98%B6.html","title":"Linux进阶","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"OOMkiller事件","slug":"oomkiller事件","link":"#oomkiller事件","children":[]},{"level":2,"title":"kill -3","slug":"kill-3","link":"#kill-3","children":[]},{"level":2,"title":"调整系统交换内存","slug":"调整系统交换内存","link":"#调整系统交换内存","children":[]},{"level":2,"title":"连接相关命令","slug":"连接相关命令","link":"#连接相关命令","children":[]},{"level":2,"title":"定时删除日志文件","slug":"定时删除日志文件","link":"#定时删除日志文件","children":[]}],"git":{"updatedTime":1746752102000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":6,"url":"https://github.com/ouyangcm"},{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":2,"url":"https://github.com/oycm"}]},"filePathRelative":"linux/Linux进阶.md"}');export{o as comp,r as data};
