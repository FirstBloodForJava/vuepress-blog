import{_ as s,c as a,e,o as i}from"./app-BIGZvh4f.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>nginx</span></a></h1><h2 id="_1-什么是nginx-做什么" tabindex="-1"><a class="header-anchor" href="#_1-什么是nginx-做什么"><span>1.什么是nginx，做什么</span></a></h2><p>Nginx是一款轻量级的Web服务/反向代理服务器及电子邮件(IMAP/POP3)代理服务器，其特点是占用内存少，并发能力强，简单的配置文件。</p><p><code>反向代理</code>：反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以访问目标服务器的资源。同时用户不需要知道目标代理服务器的地址，也无需在用户端做任何设定。反向代理服务器通常用来作为Web加速，即用反向代理作为Web服务器前置机来降低网络和服务器的负载，提高访问效率。</p><p>使用nginx主要的功能：反向代理(解决跨域)、负载均衡、存放静态资源。</p><h2 id="_2-linux安装nginx" tabindex="-1"><a class="header-anchor" href="#_2-linux安装nginx"><span>2.Linux安装nginx</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> nginx-1.23.1.tar.gz</span>
<span class="line"><span class="token builtin class-name">cd</span> nginx-1.23.1</span>
<span class="line">./configure</span>
<span class="line"><span class="token function">make</span></span>
<span class="line"><span class="token function">make</span> <span class="token function">install</span> <span class="token comment">#安装完成</span></span>
<span class="line"><span class="token comment"># updatedb 更新文件缓存</span></span>
<span class="line"><span class="token function">whereis</span> nginx <span class="token comment">#可以查询在目录是/usr/local/nginx</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># centos安装PCRE库</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> pcre pcre-devel</span>
<span class="line"></span>
<span class="line"><span class="token comment"># centos安装ZLIB库</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> zlib-devel</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缺少pcre" tabindex="-1"><a class="header-anchor" href="#缺少pcre"><span>缺少PCRE</span></a></h3><p>提示缺少PCRE库</p><figure><img src="http://47.101.155.205/image-20240120140957098.png" alt="image-20240120140957098" tabindex="0" loading="lazy"><figcaption>image-20240120140957098</figcaption></figure><p><strong>安装PCRE库：</strong></p><figure><img src="http://47.101.155.205/image-20240120141129099.png" alt="image-20240120141129099" tabindex="0" loading="lazy"><figcaption>image-20240120141129099</figcaption></figure><h3 id="缺少zlib库" tabindex="-1"><a class="header-anchor" href="#缺少zlib库"><span>缺少ZLIB库</span></a></h3><figure><img src="http://47.101.155.205/image-20240120141440533.png" alt="image-20240120141440533" tabindex="0" loading="lazy"><figcaption>image-20240120141440533</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># centos安装ZLIB库</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> zlib-devel</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20240120141624129.png" alt="image-20240120141624129" tabindex="0" loading="lazy"><figcaption>image-20240120141624129</figcaption></figure><h3 id="安装成功" tabindex="-1"><a class="header-anchor" href="#安装成功"><span>安装成功</span></a></h3><p>./configure成功如下</p><figure><img src="http://47.101.155.205/image-20240120141731213.png" alt="image-20240120141731213" tabindex="0" loading="lazy"><figcaption>image-20240120141731213</figcaption></figure><p><strong>make成功如下图：</strong></p><figure><img src="http://47.101.155.205/image-20240120142013700.png" alt="image-20240120142013700" tabindex="0" loading="lazy"><figcaption>image-20240120142013700</figcaption></figure><p>make install 成功如下图：</p><figure><img src="http://47.101.155.205/image-20240120142245490.png" alt="image-20240120142245490" tabindex="0" loading="lazy"><figcaption>image-20240120142245490</figcaption></figure><figure><img src="http://47.101.155.205/image-20240120142331847.png" alt="image-20240120142331847" tabindex="0" loading="lazy"><figcaption>image-20240120142331847</figcaption></figure><h2 id="_3-nginx命令" tabindex="-1"><a class="header-anchor" href="#_3-nginx命令"><span>3.nginx命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 进入/usr/local/nginx/sbin目录下，启动nginx 默认读取/usr/local/nginx/conf下的nginx.conf配置文件</span></span>
<span class="line">./nginx </span>
<span class="line">./nginx <span class="token parameter variable">-s</span> quit <span class="token comment">#安全退出</span></span>
<span class="line">./nginx <span class="token parameter variable">-s</span> stop <span class="token comment">#停止</span></span>
<span class="line">.nginx <span class="token parameter variable">-s</span> reload <span class="token comment">#重新加载配置文件</span></span>
<span class="line"></span>
<span class="line"><span class="token function">kill</span> <span class="token parameter variable">-s</span> QUIT <span class="token number">1628</span> <span class="token comment"># 1628为进程id</span></span>
<span class="line"></span>
<span class="line"><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> nginx <span class="token comment">#查看nginx进程信息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># nginx指定配置文件启动</span></span>
<span class="line">nginx <span class="token parameter variable">-c</span> /path/to/your/nginx.conf</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动成功" tabindex="-1"><a class="header-anchor" href="#启动成功"><span>启动成功</span></a></h3><figure><img src="http://47.101.155.205/image-20220924215829375.png" alt="image-20220924215829375" tabindex="0" loading="lazy"><figcaption>image-20220924215829375</figcaption></figure><p>查看nginx配置文件地址</p><figure><img src="http://47.101.155.205/image-20240120144024157.png" alt="image-20240120144024157" tabindex="0" loading="lazy"><figcaption>image-20240120144024157</figcaption></figure><h2 id="_4-nginx的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-nginx的优缺点"><span>4.nginx的优缺点</span></a></h2><p><code>优点</code>：占用内存少，配置简单，可实现高并发连接，处理响应快，实现虚拟主机、反向代理、负载均衡，可以不暴露真实服务器IP地址。</p><p><code>缺点</code>：动态处理能力差。</p><h2 id="_5-nginx配置文件模块" tabindex="-1"><a class="header-anchor" href="#_5-nginx配置文件模块"><span>5.nginx配置文件模块</span></a></h2><ul><li>进程模块</li><li>events模块</li><li>http模块</li><li>http模块下server</li><li>server模块下的location</li><li>http模块下upstream</li></ul><p>ngx_http_stub_status_module 可以设置开启nginx网页监控</p><p><code>location匹配规则:</code></p><table><thead><tr><th>匹配符</th><th>规则</th><th>优先级</th></tr></thead><tbody><tr><td>=</td><td>精确匹配</td><td>1</td></tr><tr><td>^~</td><td>以某个字符串开头</td><td>2</td></tr><tr><td>~</td><td>区分大小写的正则匹配</td><td>3</td></tr><tr><td>~*</td><td>不区分大小写的正则匹配</td><td>4</td></tr><tr><td>!~</td><td>区分大小写不匹配的正则</td><td>5</td></tr><tr><td>!~*</td><td>不区分大小写不匹配的正则</td><td>6</td></tr><tr><td>/</td><td>通配请求，任何请求都会匹配到</td><td>7</td></tr></tbody></table><h3 id="main主要模块" tabindex="-1"><a class="header-anchor" href="#main主要模块"><span>main主要模块</span></a></h3><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line"># 指定Nginx进程所使用的用户 默认注释</span>
<span class="line">user nginx;</span>
<span class="line"></span>
<span class="line"># 指定Nginx启动的工作进程数 默认是1</span>
<span class="line">worker_processes auto;</span>
<span class="line"></span>
<span class="line"># 指定Nginx的PID文件路径 默认注释</span>
<span class="line">pid /var/run/nginx.pid;</span>
<span class="line"></span>
<span class="line"># 指定Nginx错误日志的输出路径 默认注释</span>
<span class="line">error_log /var/log/nginx/error.log;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定Nginx进程(全局配置)所使用的用户作用：</p><ol><li>安全性：通过限制Nginx进程使用的用户，可以降低系统被攻击时受到的影响。如果Nginx进程使用的是具有较低权限的用户，攻击者在攻击Nginx时无法获取到该用户的特权，从而保护系统安全。</li><li>资源隔离：使用不同的用户运行Nginx进程可以有效隔离不同的应用程序和服务之间的资源，避免它们之间产生冲突。</li><li>维护性：使用专门的用户运行Nginx进程可以使维护人员更容易管理和维护Nginx。例如，如果需要更改Nginx进程的配置或更新Nginx的版本，管理员可以直接以该用户的身份执行相应的操作，而无需考虑其他用户的权限和影响。</li></ol><h3 id="events" tabindex="-1"><a class="header-anchor" href="#events"><span>events</span></a></h3><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">events {</span>
<span class="line">    worker_connections 1024; # 每个工作进程能够同时处理的连接数</span>
<span class="line">    multi_accept on; # 是否启用多个接受连接的线程 on开启 off 关闭</span>
<span class="line">    use select; # 使用哪种事件模型 &quot;select&quot;、&quot;poll&quot;、&quot;epoll&quot;、&quot;kqueue&quot;、&quot;eventport&quot;、&quot;rtsig&quot;和&quot;/dev/poll&quot;</span>
<span class="line">    accept_mutex ; # 是否启用接受连接互斥锁</span>
<span class="line">    accept_mutex_delay ; # 指定接受连接互斥锁的等待时间</span>
<span class="line">    worker_priority 15; # 工作进程的优先级</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="http" tabindex="-1"><a class="header-anchor" href="#http"><span>http</span></a></h3><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">http {</span>
<span class="line">    include       mime.types; # 用于包含其他配置文件中，/etc/nginx/conf.d/*.conf conf.d目录所有.conf文件</span>
<span class="line">    default_type  application/octet-stream; # 指定默认的MIME类型。将默认类型设置为二进制流</span>
<span class="line"></span>
<span class="line">    #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
<span class="line">    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
<span class="line">    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>
<span class="line">    # 用于定义日志格式。定义一个名为main的日志格式，其中包含了客户端IP、访问时间、请求方法、请求结果等信息。</span>
<span class="line"></span>
<span class="line">    access_log  logs/access.log  main; # 访问日志文件的路径和格式</span>
<span class="line"></span>
<span class="line">    sendfile        on; # 是否启用sendfile机制，用于在磁盘和网络之间高效地传输文件</span>
<span class="line">    #tcp_nopush     on; # 是否启用TCP NOPUSH机制，用于在网络上更有效地传输数据</span>
<span class="line"> </span>
<span class="line">    #keepalive_timeout  0; 设置HTTP Keep-Alive机制的超时时间，单位秒。</span>
<span class="line">    # 长连接请求大量小文件的时候，可以减少重建连接的开销，但假如有大文件上传，65s内没上传完成会导致失败。如果设置时间过长，用户又多，长时间保持连接会占用大量资源。</span>
<span class="line">    keepalive_timeout  65;</span>
<span class="line"></span>
<span class="line">    #gzip  on; # 是否启用Gzip压缩机制，用于减小传输数据量</span>
<span class="line">    gzip_min_length 1k;</span>
<span class="line">    gzip_buffers    4 16k;</span>
<span class="line">    gzip_http_version 1.0;</span>
<span class="line">    gzip_comp_level 6;</span>
<span class="line">    gzip_types text/html text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;</span>
<span class="line">    gzip_vary on;</span>
<span class="line"></span>
<span class="line">    server {</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MIME类型是一种在Web中标识文件类型的方式，是通过在HTTP头部中添加Content-Type字段来实现的。不同的文件类型对应不同的MIME类型，例如文本文件通常使用<code>text/plain</code>，HTML文件使用<code>text/html</code>，JPEG图片使用<code>image/jpeg</code>等。</p><p><code>default_type application/octet-stream;</code>是Nginx HTTP模块中一个常用的指令，用于设置默认的MIME类型。这个指令的作用是当Nginx无法确定请求的文件类型时，使用<code>application/octet-stream</code>类型作为默认的MIME类型，即将文件作为二进制流下载。</p><p><strong>其它配置说明：</strong></p><ul><li>send_timeout： 用于指定响应客户端的超时时间。这个超时仅限于两个连接活动之间的时间，如果超过这个时间，客户端没有任何活动，Nginx将会关闭连接。</li><li>client_max_body_size 10m：允许客户端请求的最大单文件字节数。</li><li>client_body_buffer_size 128k：缓冲区代理缓冲用户端请求的最大字节数。</li><li>proxy_connect_timeout 60：nginx跟后端服务器连接超时时间(代理连接超时)。</li><li>proxy_read_timeout 60：连接成功后，与后端服务器两个成功的响应操作之间超时时间(代理接收超时)。</li><li>proxy_buffer_size 4k：设置代理服务器（nginx）从后端realserver读取并保存用户头信息的缓冲区大小，默认与proxy_buffers大小相同，其实可以将这个指令值设的小一点。</li><li>proxy_buffers 4 32k：proxy_buffers缓冲区，nginx针对单个连接缓存来自后端realserver的响应，网页平均在32k以下的话，这样设置。</li><li>proxy_busy_buffers_size 64k：高负荷下缓冲大小（proxy_buffers的2倍）。</li><li>proxy_max_temp_file_size 1024M：当 proxy_buffers 放不下后端服务器的响应内容时，会将一部分保存到硬盘的临时文件中，这个值用来设置最大临时文件大小，默认1024M，它与 proxy_cache 没有关系。大于这个值，将从upstream服务器传回。设置为0禁用。</li><li>proxy_temp_file_write_size 64k：当缓存被代理的服务器响应到临时文件时，这个选项限制每次写临时文件的大小。proxy_temp_path（可以在编译的时候）指定写到哪那个目录。</li></ul><p><strong>gzip压缩功能：</strong></p><ul><li>gzip_min_length 1k：设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。默认值是20。建议设置成大于1k的字节数，小于1k可能会越压越大。</li><li>gzip_buffers 4 16k：设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。4 16k代表以16k为单位，安装原始数据大小以16k为单位的4倍申请内存。</li><li>gzip_http_version 1.0：用于识别 http 协议的版本，早期的浏览器不支持 Gzip 压缩，用户就会看到乱码，所以为了支持前期版本加上了这个选项，如果你用了 Nginx 的反向代理并期望也启用 Gzip 压缩的话，由于末端通信是 http/1.0，故请设置为 1.0。</li><li>gzip_comp_level 6：gzip压缩比，1压缩比最小处理速度最快，9压缩比最大但处理速度最慢(传输快但比较消耗cpu)。</li><li>gzip_types：匹配mime类型进行压缩，无论是否指定,<code>text/html</code>类型总是会被压缩的。</li><li>gzip_proxied any：Nginx作为反向代理的时候启用，决定开启或者关闭后端服务器返回的结果是否压缩，匹配的前提是后端服务器必须要返回包含<code>Via</code>的 header头。</li><li>gzip_vary on：和http头有关系，会在响应头加个 Vary: Accept-Encoding ，可以让前端的缓存服务器缓存经过gzip压缩的页面，例如，用Squid缓存经过Nginx压缩的数据。</li></ul><h4 id="log-format" tabindex="-1"><a class="header-anchor" href="#log-format"><span>log_format</span></a></h4><p>配置打印日志的格式</p><ul><li><code>$remote_addr</code>记录客户端ip地址。</li><li><code>$remote_user</code>记录客户端用户名。</li><li><code>$time_local</code>记录访问时间和时区。</li><li><code>$request</code>记录请求的url和http协议。</li><li><code>$status</code>记录请求响应状态码，成功200。</li><li><code>$body_bytes_sent</code>响应给客户端文件主体内容大小。</li><li><code>$http_referer</code>记录从哪个页面链接访问过来。</li><li><code>$http_user_agent</code>表示客户端浏览器相关信息，如User-Agent头等。</li><li><code>$http_x_forwarded_for</code>和代理相关，用以记录客户端的ip地址。</li><li><code>$request_uri</code>表示当前请求的URI</li><li></li></ul><p>在<code>location</code>块或其他上下文中，可以使用<code>set</code>指令来定义自定义变量</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /images/ {</span>
<span class="line">    set $my_var &quot;This is my variable&quot;;</span>
<span class="line">    ...</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>使用<code>set</code>指令将一个名为<code>$my_var</code>的自定义变量设置为字符串&quot;This is my variable&quot;。在<code>location</code>块内，可以使用<code>$my_var</code>变量来引用该字符串。</p><p>其中<code>remote_addr</code>同一个wifi下的设备，发起的请求<code>remote_addr</code>地址都是一样的。</p><figure><img src="http://47.101.155.205/image-20240120161608804.png" alt="image-20240120161608804" tabindex="0" loading="lazy"><figcaption>image-20240120161608804</figcaption></figure><p>ipconfig获取的ip是局域网内的本地IP地址。</p><figure><img src="http://47.101.155.205/image-20240120162129995.png" alt="image-20240120162129995" tabindex="0" loading="lazy"><figcaption>image-20240120162129995</figcaption></figure><h4 id="http下的server" tabindex="-1"><a class="header-anchor" href="#http下的server"><span>http下的server</span></a></h4><p><code>server</code>块用于配置一个虚拟主机，用于处理来自客户端的HTTP请求。每个<code>server</code>块通常包含一个或多个<code>location</code>块，用于处理不同的URI请求。</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">server {</span>
<span class="line">    listen 80; # 监听的端口号。可以是一个IP地址和端口号的组合，也可以是一个Unix socket路径</span>
<span class="line">    server_name example.com; # 虚拟主机的域名或IP地址。当客户端请求该域名或IP地址时，Nginx会将请求路由到该虚拟主机中。</span>
<span class="line"></span>
<span class="line">    location / {</span>
<span class="line">        root /var/www/example.com; # 定义访问文件的目录</span>
<span class="line">        index index.html; # 定义访问的文件名</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>error_page</code>: 指定错误页面的路径或URL，例如<code>error_page 404 /404.html</code>表示当发生404错误时，Nginx会返回<code>/404.html</code>页面。error_page 500 502 503 504 /50x.html;</li><li><code>access_log</code>: 指定访问日志的路径和格式，例如<code>access_log /var/log/nginx/example.com.access.log main</code>表示将访问日志写入<code>/var/log/nginx/example.com.access.log</code>文件中，并使用<code>main</code>格式输出日志记录。</li><li><code>ssl_certificate</code>: 指定SSL证书的路径，用于启用HTTPS协议。</li></ul><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">error_page   500 502 503 504  /50x.html;</span>
<span class="line">location = /50x.html {</span>
<span class="line">	root   html;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h4 id="server下的location" tabindex="-1"><a class="header-anchor" href="#server下的location"><span>server下的location</span></a></h4><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">...</span>
<span class="line"></span>
<span class="line">http {</span>
<span class="line">	upstream test {</span>
<span class="line">        server ip1:port1;</span>
<span class="line">        server ip2:port2;</span>
<span class="line">        keepalive 4000;</span>
<span class="line">        keepalive_requests 100;</span>
<span class="line">    }</span>
<span class="line">	</span>
<span class="line">	server {</span>
<span class="line">        listen       80; # 监听的端口</span>
<span class="line">        # Web服务器可以通过X-Forwarded-For获取用户真实IP</span>
<span class="line">        # 设置客户端的真实ip</span>
<span class="line">        proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">        # 代理链</span>
<span class="line">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        # 解决请求响应400的问题，</span>
<span class="line">        proxy_set_header Host $host;</span>
<span class="line">        </span>
<span class="line">        </span>
<span class="line">        location /custom-server/ {</span>
<span class="line">            proxy_buffering off;</span>
<span class="line">            proxy_redirect off;</span>
<span class="line">            proxy_pass http://test/; # 转向test定义的服务器列表</span>
<span class="line">        }</span>
<span class="line">        error_page   500 502 503 504  /50x.html;</span>
<span class="line">        location = /50x.html {</span>
<span class="line">            root   html;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>root：访问本地的路径。</li><li>index：默认访问的文件名，一般跟着root放。</li><li>proxy_pass：定义访问服务器的列表，反向代理配置。</li></ul><p>语法：location [ = | ~ | ~* | ^~ ] <em>uri</em> { ... } 可以使用的符号=、~、~*、^~、@、/</p><p><code>location匹配规则:</code></p><table><thead><tr><th>匹配符</th><th>规则</th><th>优先级</th></tr></thead><tbody><tr><td>=</td><td>精确匹配</td><td>1</td></tr><tr><td>^~</td><td>以某个字符串开头</td><td>2</td></tr><tr><td>~</td><td>区分大小写的正则匹配</td><td>3</td></tr><tr><td>~*</td><td>不区分大小写的正则匹配</td><td>4</td></tr><tr><td><code>!~</code></td><td>区分大小写不匹配的正则</td><td>5</td></tr><tr><td><code>!~*</code></td><td>不区分大小写不匹配的正则</td><td>6</td></tr><tr><td>/</td><td>通配请求，任何请求都会匹配到</td><td>7</td></tr></tbody></table><p>匹配优先级：</p><ol><li>nginx将检查所有精准匹配的location块。如果请求路径相匹配，则该请求被路由到这块。<code>location = /index.html</code>，只会匹配<code>/index.html</code>这个URL请求，不会匹配<code>/index.html/</code>或者<code>/index.html?query=xxx</code>等其他请求。</li><li>如果没有精准匹配到，则使用前缀匹配最长的位置并且记录。然后按照正则表达式在配置文件中的出现顺序检查它们，在正则表达式的搜索底层匹配时终止，并使用相应的配置。如果没有找到对应的正则表达式，则使用最先记住的前缀位置。</li></ol><p>为了找到匹配给定请求的位置，nginx首先检查使用前缀字符串定义的位置(前缀位置)。其中，选择匹配前缀最长的位置并记住。然后按照正则表达式在配置文件中的出现顺序检查它们。正则表达式的搜索在第一次匹配时终止，并使用相应的配置。如果没有找到与正则表达式的匹配，则使用先前记住的前缀位置的配置。</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location = / {</span>
<span class="line">    [ configuration A ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">location / {</span>
<span class="line">    [ configuration B ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">location /documents/ {</span>
<span class="line">    [ configuration C ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">location ^~ /images/ {</span>
<span class="line">    [ configuration D ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">location ~* \\.(gif|jpg|jpeg)$ {</span>
<span class="line">    [ configuration E ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>/</code></p><p><code>/index.html</code></p><p><code>/documents/document.html</code></p><p><code>/images/1.gif</code></p><p><code>/documents/1.jpg</code></p><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /user/ {</span>
<span class="line">    proxy_pass http://user.example.com;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">location = /user {</span>
<span class="line">    proxy_pass http://login.example.com;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><code>allow/deny</code> 访问控制，可以分别有多个allow,deny，允许或禁止某个ip或ip段访问，依次满足任何一个规则就停止往下匹配。</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /nginx-status {</span>
<span class="line">	stub_status on;</span>
<span class="line">  	access_log off;</span>
<span class="line">	allow 192.168.8.8;</span>
<span class="line">	allow 192.168.8.8.0/24;</span>
<span class="line">	deny all;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>列出目录配置：</p><p>Nginx默认是不允许列出整个目录的，如需开启，在location，server或http块中加入autoindex on。</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /image {</span>
<span class="line">  	root   /www/image;</span>
<span class="line">  	autoindex on;</span>
<span class="line">  	autoindex_exact_size off;</span>
<span class="line">  	autoindex_localtime on;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ul><li>autoindex_exact_size：默认为on，显示出文件的确切大小，单位byte；off显示出文件的大概大小，单位是kB或者MB或者GB。</li><li>autoindex_localtime：on显示的文件时间为文件的服务器时间；off显示的文件时间为GMT时间。</li></ul><h3 id="upstream负载均衡" tabindex="-1"><a class="header-anchor" href="#upstream负载均衡"><span>upstream负载均衡</span></a></h3><p>upstream模块用于负载均衡，在upstream块中可以定义多个后端服务器的地址，Nginx会根据某种算法（如轮询、IP哈希等）将请求分发到这些服务器上，实现请求负载均衡。</p><p>使用upstream模块需要在nginx.conf中定义upstream块，示例如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">upstream backend {</span>
<span class="line">    server backend1.example.com;</span>
<span class="line">    server backend2.example.com;</span>
<span class="line">    server backend3.example.com;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>上述配置定义了一个名为backend(域名)的upstream块，其中包含了3个后端服务器的地址。</p><p>接下来可以在location块中使用proxy_pass指令将请求转发到upstream中定义的服务器，示例如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">location / {</span>
<span class="line">    proxy_pass http://backend;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>上述配置将匹配到所有以“/”开头的请求，并将其转发到backend中定义的服务器上。Nginx会根据指定的负载均衡算法选择一个服务器来处理请求。</p><p>另外，在upstream块中还可以设置一些高级选项，如负载均衡算法、连接超时、最大连接数等。以下是一些常见的选项：</p><ul><li>weight：设置后端服务器的权重，用于调整负载均衡算法的权重计算；</li><li>ip_hash：根据客户端IP地址的hash值选择后端服务器；</li><li>keepalive：设置与后端服务器的长连接；</li><li>max_fails和fail_timeout：用于定义后端服务器的健康检查，当后端服务器失败的次数超过max_fails时，暂停向该服务器转发请求，并在fail_timeout时间后重新尝试连接。</li></ul><p>总之，Nginx upstream模块可以方便地实现请求负载均衡，提高Web应用的可靠性和性能。</p><p>http://localhost/favicon.ico</p><h2 id="_6-nginx负载均衡的策略" tabindex="-1"><a class="header-anchor" href="#_6-nginx负载均衡的策略"><span>6.nginx负载均衡的策略</span></a></h2><ol><li>轮询(默认)</li><li>权重</li><li>ip_hash(ip绑定)</li><li>fair(第三方插件)</li><li>url_hash(第三方插件)</li></ol><figure><img src="http://47.101.155.205/image-20220724224724880.png" alt="image-20220724224724880" tabindex="0" loading="lazy"><figcaption>image-20220724224724880</figcaption></figure><h2 id="_7-其他项目配置" tabindex="-1"><a class="header-anchor" href="#_7-其他项目配置"><span>7.其他项目配置</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">upstream vhr{</span>
<span class="line">	server 127.0.0.1:8081;</span>
<span class="line">}</span>
<span class="line">server {</span>
<span class="line">	listen	80;</span>
<span class="line">	server_name localhost;</span>
<span class="line">	</span>
<span class="line">	location /{</span>
<span class="line">		proxy_pass http://vhr;</span>
<span class="line">		proxy_redirect default;</span>
<span class="line">	}</span>
<span class="line">	location ~ .*\\.(js|css|ico|png|jpg|eot|svg|ttf|woff|html){</span>
<span class="line">		root	/usr/vhr/dist/;</span>
<span class="line">		expires 30d; #缓存30天</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,106)]))}const d=s(l,[["render",p],["__file","nginx.html.vue"]]),r=JSON.parse('{"path":"/nginx/nginx.html","title":"nginx","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"1.什么是nginx，做什么","slug":"_1-什么是nginx-做什么","link":"#_1-什么是nginx-做什么","children":[]},{"level":2,"title":"2.Linux安装nginx","slug":"_2-linux安装nginx","link":"#_2-linux安装nginx","children":[{"level":3,"title":"缺少PCRE","slug":"缺少pcre","link":"#缺少pcre","children":[]},{"level":3,"title":"缺少ZLIB库","slug":"缺少zlib库","link":"#缺少zlib库","children":[]},{"level":3,"title":"安装成功","slug":"安装成功","link":"#安装成功","children":[]}]},{"level":2,"title":"3.nginx命令","slug":"_3-nginx命令","link":"#_3-nginx命令","children":[{"level":3,"title":"启动成功","slug":"启动成功","link":"#启动成功","children":[]}]},{"level":2,"title":"4.nginx的优缺点","slug":"_4-nginx的优缺点","link":"#_4-nginx的优缺点","children":[]},{"level":2,"title":"5.nginx配置文件模块","slug":"_5-nginx配置文件模块","link":"#_5-nginx配置文件模块","children":[{"level":3,"title":"main主要模块","slug":"main主要模块","link":"#main主要模块","children":[]},{"level":3,"title":"events","slug":"events","link":"#events","children":[]},{"level":3,"title":"http","slug":"http","link":"#http","children":[]},{"level":3,"title":"upstream负载均衡","slug":"upstream负载均衡","link":"#upstream负载均衡","children":[]}]},{"level":2,"title":"6.nginx负载均衡的策略","slug":"_6-nginx负载均衡的策略","link":"#_6-nginx负载均衡的策略","children":[]},{"level":2,"title":"7.其他项目配置","slug":"_7-其他项目配置","link":"#_7-其他项目配置","children":[]}],"git":{"updatedTime":1746853414000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":1,"url":"https://github.com/oycm"}]},"filePathRelative":"nginx/nginx.md"}');export{d as comp,r as data};
