import{_ as s,c as e,e as a,o as i}from"./app-BIGZvh4f.js";const l={};function r(p,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="nginx配置代理400" tabindex="-1"><a class="header-anchor" href="#nginx配置代理400"><span>nginx配置代理400</span></a></h1><p>缺少proxy_set_header Host $host;配置，nginx代理请求响应400。</p><p>如果没有配置使用原有的host，应该是将</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">...</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const c=s(l,[["render",r],["__file","nginx配置代理400.html.vue"]]),t=JSON.parse('{"path":"/nginx/nginx%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%90%86400.html","title":"nginx配置代理400","lang":"zh-CN","frontmatter":{"head":[["link",{"rel":"icon","href":"http://47.101.155.205/nginx.ico"}]]},"headers":[],"git":{"updatedTime":1732181499000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"nginx/nginx配置代理400.md"}');export{c as comp,t as data};
