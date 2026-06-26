import{a as e,c as t,d as n,i as r,o as i,r as a,s as o,t as s,u as c}from"./app-B8OsJqUb.js";var l=JSON.parse(`{"path":"/","title":"我的博客标题","lang":"zh-CN","frontmatter":{"title":"我的博客标题","editLink":true,"sidebarDepth":5,"lang":"zh-CN","actions":[{"text":"快速上手","link":"/zh/guide/getting-started.html","type":"primary"},{"text":"项目简介","link":"/zh/guide/introduction.html","type":"secondary"}]},"git":{"updatedTime":1729579812000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"},{"name":"FirstBloodForJava","username":"FirstBloodForJava","email":"70085365+FirstBloodForJava@users.noreply.github.com","commits":1,"url":"https://github.com/FirstBloodForJava"}],"changelog":[{"hash":"76779d10fd5b299169917c4bf4a53da63843f84d","time":1729579812000,"email":"mingorg@163.com","author":"ouyangcm","message":"配置页脚"},{"hash":"744bbb2e523a1f4996673e18a8d490e02f35493f","time":1729175816000,"email":"70085365+FirstBloodForJava@users.noreply.github.com","author":"FirstBloodForJava","message":"触发commit"},{"hash":"5386c785460c50455dd9b765db8a1d3b8634ffe3","time":1729156334000,"email":"mingorg@163.com","author":"ouyangcm","message":"文档补充"}]},"filePathRelative":"README.md"}`),u={name:`README.md`},d={class:`table-of-contents`};function f(s,l,u,f,p,m){let h=c(`router-link`);return t(),r(`div`,null,[a(`nav`,d,[a(`ul`,null,[a(`li`,null,[o(h,{to:`#创建vuepress步骤`},{default:n(()=>[...l[0]||=[i(`创建vuepress步骤`,-1)]]),_:1}),a(`ul`,null,[a(`li`,null,[o(h,{to:`#config配置`},{default:n(()=>[...l[1]||=[i(`config配置`,-1)]]),_:1})]),a(`li`,null,[o(h,{to:`#client配置`},{default:n(()=>[...l[2]||=[i(`client配置`,-1)]]),_:1})])])]),a(`li`,null,[o(h,{to:`#npm使用`},{default:n(()=>[...l[3]||=[i(`npm使用`,-1)]]),_:1})])])]),l[4]||=e(`<h2 id="创建vuepress步骤" tabindex="-1"><a class="header-anchor" href="#创建vuepress步骤"><span>创建vuepress步骤</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 命令行创建 vuepress模板</span></span>
<span class="line"><span class="token function">npm</span> init vuepress vuepress-starter</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 手动创建</span></span>
<span class="line"><span class="token function">mkdir</span> vuepress-starter</span>
<span class="line"><span class="token builtin class-name">cd</span> vuepress-starter</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">npm</span> init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># yarn</span></span>
<span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line"><span class="token comment"># npm</span></span>
<span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line"><span class="token comment"># cnpm 安装版本next</span></span>
<span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line">cnpm <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line">cnpm <span class="token function">install</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line"><span class="token comment"># </span></span>
<span class="line">cnpm <span class="token function">install</span> <span class="token parameter variable">-D</span> sass-embedded</span>
<span class="line">cnpm <span class="token function">install</span> <span class="token parameter variable">-D</span> sass</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241015161110834.png" alt="image-20241015161110834" tabindex="0" loading="lazy"><figcaption>image-20241015161110834</figcaption></figure><h3 id="config配置" tabindex="-1"><a class="header-anchor" href="#config配置"><span>config配置</span></a></h3><h4 id="navbar" tabindex="-1"><a class="header-anchor" href="#navbar"><span>navbar</span></a></h4><p>导航栏配置</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">navbar</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token comment">// NavbarLink</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Foo&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/foo/&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// NavbarGroup</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Group&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">&#39;/group/&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar.md&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// 字符串 - 页面文件路径</span></span>
<span class="line">      <span class="token string">&#39;/bar/README.md&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="client配置" tabindex="-1"><a class="header-anchor" href="#client配置"><span>client配置</span></a></h3><h2 id="npm使用" tabindex="-1"><a class="header-anchor" href="#npm使用"><span>npm使用</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># npm配置代理无效</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> proxy http://127.0.0.1:33210</span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> https-proxy https://127.0.0.1:33210</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用淘宝的 npm 镜像</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npm.taobao.org</span>
<span class="line"><span class="token comment"># 设置为官方源</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmjs.org/</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装cnpm</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> cnpm <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npmmirror.com</span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,13)])}var p=s(u,[[`render`,f]]);export{l as _pageData,p as default};