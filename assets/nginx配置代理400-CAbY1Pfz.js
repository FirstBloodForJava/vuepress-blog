import{a as e,c as t,i as n,t as r}from"./app-DKOm73pV.js";var i=JSON.parse(`{"path":"/nginx/nginx%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%90%86400.html","title":"nginx配置代理400","lang":"zh-CN","frontmatter":{"head":[["link",{"rel":"icon","href":"http://47.101.155.205/nginx.ico"}]]},"git":{"updatedTime":1732181499000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}],"changelog":[{"hash":"87ba956929904256d9d3b85fec314fff62c5ac9e","time":1732181499000,"email":"mingorg@163.com","author":"ouyangcm","message":"标题补充"},{"hash":"c393870eedfbbf89ffb897dec12cf9a4c5a5b1df","time":1732181303000,"email":"mingorg@163.com","author":"ouyangcm","message":"新增nginx文档"}]},"filePathRelative":"nginx/nginx配置代理400.md"}`),a={name:`nginx配置代理400.md`};function o(r,i,a,o,s,c){return t(),n(`div`,null,[...i[0]||=[e(`<h1 id="nginx配置代理400" tabindex="-1"><a class="header-anchor" href="#nginx配置代理400"><span>nginx配置代理400</span></a></h1><p>缺少proxy_set_header Host $host;配置，nginx代理请求响应400。</p><p>如果没有配置使用原有的host，应该是将</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">...</span>
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
<span class="line">        listen       listen-port;</span>
<span class="line">        # 设置客户端的真实ip</span>
<span class="line">        proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">        # 代理链</span>
<span class="line">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        # 解决请求响应400的问题</span>
<span class="line">        proxy_set_header Host $host;</span>
<span class="line">        </span>
<span class="line">        location /custom-server/ {</span>
<span class="line">            proxy_buffering off;</span>
<span class="line">            proxy_pass http://test/;</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};