import{a as e,c as t,d as n,i as r,o as i,r as a,s as o,t as s,u as c}from"./app-DKOm73pV.js";var l=JSON.parse(`{"path":"/nginx/nginx%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%90%86https%E8%AF%B7%E6%B1%82%E6%AD%A5%E9%AA%A4.html","title":"nginx配置代理https请求步骤","lang":"zh-CN","frontmatter":{"head":[["link",{"rel":"icon","href":"http://47.101.155.205/nginx.ico"}]]},"git":{"updatedTime":1729589450000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}],"changelog":[{"hash":"e8e6f917ff45d61f36ccd75a387214e78771a810","time":1729589450000,"email":"mingorg@163.com","author":"ouyangcm","message":"单独设置地址栏图标"},{"hash":"62df831f935de1fb1c21631ced113b02305dccc8","time":1729588566000,"email":"mingorg@163.com","author":"ouyangcm","message":"增加nginx navbar"}]},"filePathRelative":"nginx/nginx配置代理https请求步骤.md"}`),u={name:`nginx配置代理https请求步骤.md`},d={class:`table-of-contents`};function f(s,l,u,f,p,m){let h=c(`router-link`);return t(),r(`div`,null,[a(`nav`,d,[a(`ul`,null,[a(`li`,null,[o(h,{to:`#linux`},{default:n(()=>[...l[0]||=[i(`linux`,-1)]]),_:1}),a(`ul`,null,[a(`li`,null,[o(h,{to:`#nginx安装ssl模块`},{default:n(()=>[...l[1]||=[i(`nginx安装SSL模块`,-1)]]),_:1})]),a(`li`,null,[o(h,{to:`#配置文件调整`},{default:n(()=>[...l[2]||=[i(`配置文件调整`,-1)]]),_:1})])])])])]),l[3]||=e(`<h1 id="nginx配置代理https请求步骤" tabindex="-1"><a class="header-anchor" href="#nginx配置代理https请求步骤"><span>nginx配置代理https请求步骤</span></a></h1><h2 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>linux</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 校验是否安装openssl</span></span>
<span class="line">openssl version</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 没有安装命令</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> openssl</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>生成SSL证书命令</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建于2024-10-21</span></span>
<span class="line">openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-keyout</span> /etc/nginx/ssl/mycert.key <span class="token parameter variable">-out</span> /etc/nginx/ssl/mycert.crt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># -509表示自签名证书</span></span>
<span class="line"><span class="token comment"># -nodes 不加密私钥</span></span>
<span class="line"><span class="token comment"># - days 365天有效期</span></span>
<span class="line"><span class="token comment"># - newkey ras:2048 生成2048位的RSA密钥</span></span>
<span class="line"><span class="token comment"># -keyout 私钥文件的名称</span></span>
<span class="line"><span class="token comment"># -out 证书的名称</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx安装ssl模块" tabindex="-1"><a class="header-anchor" href="#nginx安装ssl模块"><span>nginx安装SSL模块</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># sudo yum groupinstall &quot;Development Tools&quot;</span></span>
<span class="line"><span class="token comment"># 安装库</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> pcre-devel zlib-devel openssl-devel</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解压缩安装,在解压缩的目录下执行命令</span></span>
<span class="line">./configure --with-http_ssl_module</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译</span></span>
<span class="line"><span class="token function">make</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241021160819313.png" alt="image-20241021160819313" tabindex="0" loading="lazy"><figcaption>image-20241021160819313</figcaption></figure><figure><img src="http://47.101.155.205/image-20241021161203980.png" alt="image-20241021161203980" tabindex="0" loading="lazy"><figcaption>image-20241021161203980</figcaption></figure><h3 id="配置文件调整" tabindex="-1"><a class="header-anchor" href="#配置文件调整"><span>配置文件调整</span></a></h3><figure><img src="http://47.101.155.205/image-20241022170824134.png" alt="image-20241022170824134" tabindex="0" loading="lazy"><figcaption>image-20241022170824134</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 保存后检查nginx配置文件格式</span></span>
<span class="line">./nginx <span class="token parameter variable">-t</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载nginx配置文件</span></span>
<span class="line">./nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止</span></span>
<span class="line">./nginx <span class="token parameter variable">-s</span> stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定nginx启动的配置文件路径</span></span>
<span class="line">./nginx <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>conf路径<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阿里云服务器启动,启动后没有生效，看是不是安全组没有放开</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)])}var p=s(u,[[`render`,f]]);export{l as _pageData,p as default};