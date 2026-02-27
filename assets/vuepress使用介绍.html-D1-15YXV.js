import{_ as u,c as d,e as i,b as t,d as e,r as c,o as v,f as a,a as n}from"./app-BIGZvh4f.js";const m={};function k(b,s){const o=c("CodeTabs"),r=c("Tabs");return v(),d("div",null,[s[8]||(s[8]=i(`<p><a href="https://47.101.155.205/image-20241015161110834.png" target="_blank" rel="noopener noreferrer">图片</a></p><h1 id="vuepress使用介绍" tabindex="-1"><a class="header-anchor" href="#vuepress使用介绍"><span>vuepress使用介绍</span></a></h1><h2 id="创建vuepress步骤" tabindex="-1"><a class="header-anchor" href="#创建vuepress步骤"><span>创建vuepress步骤</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 命令行创建</span></span>
<span class="line"><span class="token function">npm</span> init vuepress vuepress-starter</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 手动创建</span></span>
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
<span class="line"><span class="token comment"># 下载依赖，强制忽略依赖冲突</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> --legacy-peer-deps</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--force</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241015161110834.png" alt="image-20241015161110834" tabindex="0" loading="lazy"><figcaption>image-20241015161110834</figcaption></figure><h3 id="config配置-默认主题" tabindex="-1"><a class="header-anchor" href="#config配置-默认主题"><span>config配置(默认主题)</span></a></h3><h4 id="navbar" tabindex="-1"><a class="header-anchor" href="#navbar"><span>navbar</span></a></h4><p>http://ecosystem.vuejs.press/zh/themes/default/config.html#navbar</p><p>导航栏配置</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="footer配置" tabindex="-1"><a class="header-anchor" href="#footer配置"><span>footer配置</span></a></h4><p>footer增加GitHub编辑地址，及描述。</p><p><strong>注意在defaultTheme中增加配置。</strong></p><figure><img src="http://47.101.155.205/image-20241022144459426.png" alt="image-20241022144459426" tabindex="0" loading="lazy"><figcaption>image-20241022144459426</figcaption></figure><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/theme-default&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 设置网站的主题</span></span>
<span class="line">  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">search</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span></span>
<span class="line">    </span>
<span class="line">    <span class="token literal-property property">editLink</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 文档源文件的仓库 URL </span></span>
<span class="line">    <span class="token literal-property property">docsRepo</span><span class="token operator">:</span> <span class="token string">&#39;http://github.com/FirstBloodForJava/vuepress-blog&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 文档源文件的仓库分支,默认main</span></span>
<span class="line">    <span class="token literal-property property">docsBranch</span><span class="token operator">:</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 文档源文件存放在仓库中的目录名</span></span>
<span class="line">    <span class="token literal-property property">docsDir</span><span class="token operator">:</span> <span class="token string">&#39;docs&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 编辑此页的链接</span></span>
<span class="line">    <span class="token literal-property property">editLinkPattern</span><span class="token operator">:</span> <span class="token string">&#39;:repo/edit/:branch/:path&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 修改主题的footer</span></span>
<span class="line">    <span class="token literal-property property">locales</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&#39;/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">lastUpdatedText</span><span class="token operator">:</span> <span class="token string">&#39;上次更新&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">contributorsText</span><span class="token operator">:</span> <span class="token string">&#39;贡献者&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">editLinkText</span><span class="token operator">:</span> <span class="token string">&#39;在 GitHub 上编辑此页&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="markdown解析" tabindex="-1"><a class="header-anchor" href="#markdown解析"><span>markdown解析</span></a></h4><h5 id="提示内容" tabindex="-1"><a class="header-anchor" href="#提示内容"><span><strong>提示内容</strong></span></a></h5><p><strong>输入，tip或warning后面跟内容，则替换默认内容</strong></p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">::: tip</span>
<span class="line">这是一个提示</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: warning</span>
<span class="line">这是一个警告</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: danger</span>
<span class="line">这是一个危险警告</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: info</span>
<span class="line">这是一个信息</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: important</span>
<span class="line">这是一个重要信息</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: note</span>
<span class="line">这是一个备注</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line">::: details</span>
<span class="line">这是一个 details 标签</span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241022152004138.png" alt="image-20241022152004138" tabindex="0" loading="lazy"><figcaption>image-20241022152004138</figcaption></figure><p><strong>输出</strong></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这是一个提示</p></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>这是一个警告</p></div><div class="hint-container caution"><p class="hint-container-title">警告</p><p>这是一个危险警告</p></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>这是一个信息</p></div><div class="hint-container important"><p class="hint-container-title">重要</p><p>这是一个重要信息</p></div><div class="hint-container note"><p class="hint-container-title">注</p><p>这是一个备注</p></div><details class="hint-container details"><summary>详情</summary><p>这是一个 details 标签</p></details><h5 id="代码选项卡" tabindex="-1"><a class="header-anchor" href="#代码选项卡"><span><strong>代码选项卡</strong></span></a></h5><p><strong>输入</strong>：里面只能是代码块</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">::: code-tabs</span>
<span class="line"></span>
<span class="line">@tab JavaScript</span>
<span class="line"></span>
<span class="line"><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span></span>
<span class="line"><span class="token code-block language-js language-js language-js language-js"><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">&#39;VuePress&#39;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">你好，</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">！</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span></span></span>
<span class="line"><span class="token punctuation">\`\`\`</span></span></span>
<span class="line"></span>
<span class="line">@tab TypeScript</span>
<span class="line"></span>
<span class="line"><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">ts</span></span>
<span class="line"><span class="token code-block language-ts language-ts language-ts language-ts"><span class="token keyword">const</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;VuePress&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">你好，</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">！</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span></span></span>
<span class="line"><span class="token punctuation">\`\`\`</span></span></span>
<span class="line"></span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241022152440925.png" alt="image-20241022152440925" tabindex="0" loading="lazy"><figcaption>image-20241022152440925</figcaption></figure><p><strong>输出</strong></p>`,34)),t(o,{id:"104",data:[{id:"JavaScript"},{id:"TypeScript"}]},{title0:e(({value:p,isActive:l})=>s[0]||(s[0]=[a("JavaScript")])),title1:e(({value:p,isActive:l})=>s[1]||(s[1]=[a("TypeScript")])),tab0:e(({value:p,isActive:l})=>s[2]||(s[2]=[n("div",{class:"language-javascript","data-highlighter":"prismjs","data-ext":"js","data-title":"js"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"const"),a(" name "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'VuePress'")]),a(`
`),n("span",{class:"line"},[a("console"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"你好，"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),a("name"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"！"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},")")]),a(`
`),n("span",{class:"line"})])])],-1)])),tab1:e(({value:p,isActive:l})=>s[3]||(s[3]=[n("div",{class:"language-typescript","data-highlighter":"prismjs","data-ext":"ts","data-title":"ts"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"const"),a(" name"),n("span",{class:"token operator"},":"),a(),n("span",{class:"token builtin"},"string"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'VuePress'")]),a(`
`),n("span",{class:"line"}),a(`
`),n("span",{class:"line"},[n("span",{class:"token builtin"},"console"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"你好，"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),a("name"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"！"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},")")]),a(`
`),n("span",{class:"line"})])])],-1)])),_:1}),s[9]||(s[9]=i(`<h5 id="选项卡" tabindex="-1"><a class="header-anchor" href="#选项卡"><span><strong>选项卡</strong></span></a></h5><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">::: tabs</span>
<span class="line"></span>
<span class="line">@tab 选项卡 1</span>
<span class="line"></span>
<span class="line">这是选项卡 1 的内容。</span>
<span class="line"></span>
<span class="line"><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span></span>
<span class="line"><span class="token code-block language-js language-js language-js language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;你好，VuePress!&#39;</span><span class="token punctuation">)</span></span></span>
<span class="line"><span class="token punctuation">\`\`\`</span></span></span>
<span class="line"></span>
<span class="line">@tab 选项卡 2</span>
<span class="line"></span>
<span class="line">这是选项卡 2 的内容。</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 列表项 1</span>
<span class="line"><span class="token list punctuation">-</span> 列表项 2</span>
<span class="line"><span class="token list punctuation">-</span> 列表项 3</span>
<span class="line"></span>
<span class="line">:::</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241022152947443.png" alt="image-20241022152947443" tabindex="0" loading="lazy"><figcaption>image-20241022152947443</figcaption></figure><p><strong>输出</strong></p>`,5)),t(r,{id:"128",data:[{id:"选项卡 1"},{id:"选项卡 2"}]},{title0:e(({value:p,isActive:l})=>s[4]||(s[4]=[a("选项卡 1")])),title1:e(({value:p,isActive:l})=>s[5]||(s[5]=[a("选项卡 2")])),tab0:e(({value:p,isActive:l})=>s[6]||(s[6]=[n("p",null,"这是选项卡 1 的内容。",-1),n("div",{class:"language-javascript","data-highlighter":"prismjs","data-ext":"js","data-title":"js"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[a("console"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'你好，VuePress!'"),n("span",{class:"token punctuation"},")")]),a(`
`),n("span",{class:"line"})])])],-1)])),tab1:e(({value:p,isActive:l})=>s[7]||(s[7]=[n("p",null,"这是选项卡 2 的内容。",-1),n("ul",null,[n("li",null,"列表项 1"),n("li",null,"列表项 2"),n("li",null,"列表项 3")],-1)])),_:1}),s[10]||(s[10]=i(`<h3 id="client配置" tabindex="-1"><a class="header-anchor" href="#client配置"><span>client配置</span></a></h3><h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件"><span>插件</span></a></h2><h3 id="搜索插件-服务端" tabindex="-1"><a class="header-anchor" href="#搜索插件-服务端"><span>搜索插件(服务端)</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">cnpm i <span class="token parameter variable">-D</span> @vuepress/plugin-docsearch@next</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>config.js配置</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> docsearchPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/plugin-docsearch&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token function">docsearchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;&lt;APP_ID&gt;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;&lt;API_KEY&gt;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;&lt;INDEX_NAME&gt;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">locales</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&#39;/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">&#39;Search Documentation&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">translations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">button</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">              <span class="token literal-property property">buttonText</span><span class="token operator">:</span> <span class="token string">&#39;Search Documentation&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&#39;/zh/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">&#39;搜索文档&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">translations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">button</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">              <span class="token literal-property property">buttonText</span><span class="token operator">:</span> <span class="token string">&#39;搜索文档&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>algolia官网：https://docsearch.algolia.com/</p><p>填写抓取博客地址：https://docsearch.algolia.com/apply/</p><figure><img src="http://47.101.155.205/image-20250313124745079.png" alt="image-20250313124745079" tabindex="0" loading="lazy"><figcaption>image-20250313124745079</figcaption></figure><figure><img src="http://47.101.155.205/image-20241021133507181.png" alt="image-20241021133507181" tabindex="0" loading="lazy"><figcaption>image-20241021133507181</figcaption></figure><p><strong>填写信息后需要等待确认邮件</strong></p><figure><img src="http://47.101.155.205/image-20241021133623456.png" alt="image-20241021133623456" tabindex="0" loading="lazy"><figcaption>image-20241021133623456</figcaption></figure><p>indexName索引名称需要再等邮件。</p><h4 id="algolia创建爬虫-索引" tabindex="-1"><a class="header-anchor" href="#algolia创建爬虫-索引"><span>algolia创建爬虫(索引)</span></a></h4><p><strong>需要先认证这个域名，后面才能抓取数据。</strong></p><p>dashboard.algolia.com-&gt;data sources-&gt;crawler-&gt;click on your crawler-&gt;点击Domains</p><figure><img src="http://47.101.155.205/image-20241022111515610.png" alt="image-20241022111515610" tabindex="0" loading="lazy"><figcaption>image-20241022111515610</figcaption></figure><figure><img src="http://47.101.155.205/image-20241022111553867.png" alt="image-20241022111553867" tabindex="0" loading="lazy"><figcaption>image-20241022111553867</figcaption></figure><figure><img src="http://47.101.155.205/image-20241022111603332.png" alt="image-20241022111603332" tabindex="0" loading="lazy"><figcaption>image-20241022111603332</figcaption></figure><p><strong>域名验证，部署在GitHub上的vuepress项目，可以通过修改config.js来操作。</strong></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// config.js文件中使用vue的head设置meta标签</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> </span>
<span class="line">        <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;algolia-site-verification&quot;</span><span class="token punctuation">,</span> </span>
<span class="line">        <span class="token string-property property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;02635CF78DCEC3A9&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      </span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/image-20241022111919838.png" alt="image-20241022111919838" tabindex="0" loading="lazy"><figcaption>image-20241022111919838</figcaption></figure><p><strong>dashboard.algolia.com-&gt;data sources-&gt;crawler-&gt;click on your crawler-&gt;Add new crawler</strong></p><figure><img src="http://47.101.155.205/image-20241022110300153.png" alt="image-20241022110300153" tabindex="0" loading="lazy"><figcaption>image-20241022110300153</figcaption></figure><figure><img src="http://47.101.155.205/image-20241022110714099.png" alt="image-20241022110714099" tabindex="0" loading="lazy"><figcaption>image-20241022110714099</figcaption></figure><p><strong>新版选择网页类型</strong><img src="http://47.101.155.205/image-20250315133447465.png" alt="新版本网页模板变化" loading="lazy"></p><p>打开页面，SETUP-&gt;Editor-&gt;修改配置-&gt;右上角Save -&gt;Start Crawl</p><figure><img src="http://47.101.155.205/image-20241022112333211.png" alt="image-20241022112333211" tabindex="0" loading="lazy"><figcaption>image-20241022112333211</figcaption></figure><details class="hint-container details"><summary>格式内容介绍</summary><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">new</span> <span class="token class-name">Crawler</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;YOUR_APP_ID&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;YOUR_API_KEY&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">rateLimit</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">startUrls</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 这是 Algolia 开始抓取网站的初始地址</span></span>
<span class="line">    <span class="token comment">// 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接</span></span>
<span class="line">    <span class="token string">&#39;https://YOUR_WEBSITE_URL/&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">sitemaps</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 如果你在使用 Sitemap 插件 (如: @vuepress-plugin/sitemap)，你可以提供 Sitemap 链接</span></span>
<span class="line">    <span class="token string">&#39;https://YOUR_WEBSITE_URL/sitemap.xml&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">ignoreCanonicalTo</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">exclusionPatterns</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 你可以通过它阻止 Algolia 抓取某些 URL</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">discoveryPatterns</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 这是 Algolia 抓取 URL 的范围</span></span>
<span class="line">    <span class="token string">&#39;https://YOUR_WEBSITE_URL/**&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 爬虫执行的计划时间，可根据文档更新频率设置</span></span>
<span class="line">  <span class="token literal-property property">schedule</span><span class="token operator">:</span> <span class="token string">&#39;at 02:00 every 1 day&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 你可以拥有多个 action，特别是你在一个域名下部署多个文档时</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 使用适当的名称为索引命名</span></span>
<span class="line">      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;YOUR_INDEX_NAME&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// 索引生效的路径</span></span>
<span class="line">      <span class="token literal-property property">pathsToMatch</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;https://YOUR_WEBSITE_URL/**&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// 控制 Algolia 如何抓取你的站点</span></span>
<span class="line">      <span class="token function-variable function">recordExtractor</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> $<span class="token punctuation">,</span> helpers <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// @vuepress/theme-default 的选项</span></span>
<span class="line">        <span class="token keyword">return</span> helpers<span class="token punctuation">.</span><span class="token function">docsearch</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">recordProps</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">lvl0</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">              <span class="token literal-property property">selectors</span><span class="token operator">:</span> <span class="token string">&#39;.vp-sidebar-heading.active&#39;</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token literal-property property">defaultValue</span><span class="token operator">:</span> <span class="token string">&#39;Documentation&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl1</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h1&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl2</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h2&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl3</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h3&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl4</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h4&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl5</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h5&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">lvl6</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] h6&#39;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;[vp-content] p, [vp-content] li&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">indexHeadings</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">initialIndexSettings</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 控制索引如何被初始化，这仅当索引尚未生成时有效</span></span>
<span class="line">    <span class="token comment">// 你可能需要在修改后手动删除并重新生成新的索引</span></span>
<span class="line">    <span class="token constant">YOUR_INDEX_NAME</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">attributesForFaceting</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;lang&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">attributesToRetrieve</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;hierarchy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;content&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;anchor&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;url&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">attributesToHighlight</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;hierarchy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hierarchy_camel&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;content&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">attributesToSnippet</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;content:10&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">camelCaseAttributes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;hierarchy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hierarchy_radio&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;content&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">searchableAttributes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl0)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl0)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl1)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl1)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl2)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl2)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl3)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl3)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl4)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl4)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl5)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl5)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio_camel.lvl6)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_radio.lvl6)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl0)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl0)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl1)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl1)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl2)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl2)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl3)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl3)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl4)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl4)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl5)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl5)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy_camel.lvl6)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;unordered(hierarchy.lvl6)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;content&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">distinct</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">attributeForDistinct</span><span class="token operator">:</span> <span class="token string">&#39;url&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">customRanking</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&#39;desc(weight.pageRank)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;desc(weight.level)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;asc(weight.position)&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">ranking</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&#39;words&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;filters&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;typo&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;attribute&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;proximity&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;exact&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&#39;custom&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">highlightPreTag</span><span class="token operator">:</span> <span class="token string">&#39;&lt;span class=&quot;algolia-docsearch-suggestion--highlight&quot;&gt;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">highlightPostTag</span><span class="token operator">:</span> <span class="token string">&#39;&lt;/span&gt;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">minWordSizefor1Typo</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">minWordSizefor2Typos</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">allowTyposOnNumericTokens</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">minProximity</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">ignorePlurals</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">advancedSyntax</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">attributeCriteriaComputedByMinProximity</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">removeWordsIfNoResults</span><span class="token operator">:</span> <span class="token string">&#39;allOptional&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><figure><img src="http://47.101.155.205/image-20241022112556284.png" alt="image-20241022112556284" tabindex="0" loading="lazy"><figcaption>image-20241022112556284</figcaption></figure><figure><img src="http://47.101.155.205/image-20241022112647005.png" alt="image-20241022112647005" tabindex="0" loading="lazy"><figcaption>image-20241022112647005</figcaption></figure><p>http://ecosystem.vuejs.press/zh/plugins/search/docsearch.html#%E8%8E%B7%E5%8F%96%E6%90%9C%E7%B4%A2%E7%B4%A2%E5%BC%95</p><p>配置config.js文件即可使用，在GitHub上才会生效，因为查询放回的url信息是之前网站的域名。</p><h4 id="algolia新增应用步骤" tabindex="-1"><a class="header-anchor" href="#algolia新增应用步骤"><span>algolia新增应用步骤</span></a></h4><figure><img src="http://47.101.155.205/image-20250315145948902.png" alt="image-20250315145948902" tabindex="0" loading="lazy"><figcaption>image-20250315145948902</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 这个命令包含了这个爬虫的appid和apiKey以及indexName</span></span>
<span class="line">npx create-instantsearch-app@latest instantsearch-app <span class="token parameter variable">--name</span> <span class="token string">&quot;instantsearch-app&quot;</span> <span class="token parameter variable">--template</span> <span class="token string">&quot;InstantSearch.js&quot;</span> --app-id <span class="token string">&quot;appId&quot;</span> --api-key <span class="token string">&quot;apiKey&quot;</span> --index-name <span class="token string">&quot;indexName&quot;</span>  --attributes-to-display <span class="token string">&quot;keywords&quot;</span> --no-interactive</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装完成启动</span></span>
<span class="line"><span class="token function">npm</span> start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 最后一步可以获取vuepress的3项配置，也可以不使用这个项目，通过vuepress的搜索插件来实现次数的访问。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>生成的数据索引，搜索后不能为vuepress所用</strong></p><details class="hint-container details"><summary>走新建应用自动生成crawler</summary><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">new Crawler({</span>
<span class="line">  appId: &quot;ECD96NGN0A&quot;,</span>
<span class="line">  apiKey: &quot;6148cabd0c1092fda3022f5b10fdf621&quot;,</span>
<span class="line">  indexPrefix: &quot;&quot;,</span>
<span class="line">  rateLimit: 8,</span>
<span class="line">  maxUrls: 300,</span>
<span class="line">  schedule: &quot;on the 15 day of the month&quot;,</span>
<span class="line">  startUrls: [&quot;https://firstbloodforjava.github.io/vuepress-blog/&quot;],</span>
<span class="line">  sitemaps: [],</span>
<span class="line">  saveBackup: false,</span>
<span class="line">  ignoreQueryParams: [&quot;source&quot;, &quot;utm_*&quot;],</span>
<span class="line">  actions: [</span>
<span class="line">    {</span>
<span class="line">      indexName: &quot;firstbloodforjava_github_io_ecd96ngn0a_articles&quot;,</span>
<span class="line">      pathsToMatch: [&quot;https://firstbloodforjava.github.io/vuepress-blog/**&quot;],</span>
<span class="line">      recordExtractor: ({ url, $, helpers }) =&gt; {</span>
<span class="line">        return helpers.article({ $, url });</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      indexName: &quot;firstbloodforjava_github_io_ecd96ngn0a_products&quot;,</span>
<span class="line">      pathsToMatch: [&quot;https://firstbloodforjava.github.io/vuepress-blog/**&quot;],</span>
<span class="line">      recordExtractor: ({ url, $, helpers }) =&gt; {</span>
<span class="line">        return helpers.product({ $, url });</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      indexName: &quot;firstbloodforjava_github_io_ecd96ngn0a_pages&quot;,</span>
<span class="line">      pathsToMatch: [&quot;https://firstbloodforjava.github.io/vuepress-blog/**&quot;],</span>
<span class="line">      recordExtractor: ({ url, $, helpers, contentLength, fileType }) =&gt; {</span>
<span class="line">        return helpers.page({ $, url, contentLength, fileType });</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">  initialIndexSettings: {</span>
<span class="line">    firstbloodforjava_github_io_ecd96ngn0a_articles: {</span>
<span class="line">      distinct: true,</span>
<span class="line">      attributeForDistinct: &quot;url&quot;,</span>
<span class="line">      searchableAttributes: [</span>
<span class="line">        &quot;unordered(keywords)&quot;,</span>
<span class="line">        &quot;unordered(title)&quot;,</span>
<span class="line">        &quot;unordered(description)&quot;,</span>
<span class="line">        &quot;url&quot;,</span>
<span class="line">      ],</span>
<span class="line">      customRanking: [&quot;asc(depth)&quot;],</span>
<span class="line">      attributesForFaceting: [&quot;category&quot;],</span>
<span class="line">    },</span>
<span class="line">    firstbloodforjava_github_io_ecd96ngn0a_products: {</span>
<span class="line">      distinct: true,</span>
<span class="line">      attributeForDistinct: &quot;url&quot;,</span>
<span class="line">      searchableAttributes: [</span>
<span class="line">        &quot;unordered(name)&quot;,</span>
<span class="line">        &quot;unordered(description)&quot;,</span>
<span class="line">        &quot;url&quot;,</span>
<span class="line">      ],</span>
<span class="line">      customRanking: [&quot;asc(depth)&quot;],</span>
<span class="line">      attributesForFaceting: [&quot;category&quot;],</span>
<span class="line">    },</span>
<span class="line">    firstbloodforjava_github_io_ecd96ngn0a_pages: {</span>
<span class="line">      distinct: true,</span>
<span class="line">      attributeForDistinct: &quot;url&quot;,</span>
<span class="line">      searchableAttributes: [</span>
<span class="line">        &quot;unordered(keywords)&quot;,</span>
<span class="line">        &quot;unordered(title)&quot;,</span>
<span class="line">        &quot;unordered(description)&quot;,</span>
<span class="line">        &quot;url&quot;,</span>
<span class="line">      ],</span>
<span class="line">      customRanking: [&quot;asc(depth)&quot;],</span>
<span class="line">      attributesForFaceting: [&quot;category&quot;],</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">  </span>
<span class="line">});</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>替换crawler的配置内容</summary><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">new Crawler({</span>
<span class="line">  appId: &#39;appId&#39;,</span>
<span class="line">  apiKey: &#39;apiKey&#39;,</span>
<span class="line">  rateLimit: 8,</span>
<span class="line">  maxUrls: 100,</span>
<span class="line">  startUrls: [</span>
<span class="line">    // 这是 Algolia 开始抓取网站的初始地址</span>
<span class="line">    // 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接</span>
<span class="line">    &#39;https://firstbloodforjava.github.io/vuepress-blog/&#39;,</span>
<span class="line">  ],</span>
<span class="line">  ignoreCanonicalTo: false,</span>
<span class="line">  exclusionPatterns: [</span>
<span class="line">    // 你可以通过它阻止 Algolia 抓取某些 URL</span>
<span class="line">  ],</span>
<span class="line">  discoveryPatterns: [</span>
<span class="line">    // 这是 Algolia 抓取 URL 的范围</span>
<span class="line">    &#39;https://firstbloodforjava.github.io/vuepress-blog/**&#39;,</span>
<span class="line">  ],</span>
<span class="line">  // 爬虫执行的计划时间，可根据文档更新频率设置</span>
<span class="line">  schedule: &#39;at 02:00 every 1 day&#39;,</span>
<span class="line">  actions: [</span>
<span class="line">    // 你可以拥有多个 action，特别是你在一个域名下部署多个文档时</span>
<span class="line">    {</span>
<span class="line">      // 使用适当的名称为索引命名</span>
<span class="line">      indexName: &#39;firstbloodforjava_vuepress_blog&#39;,</span>
<span class="line">      // 索引生效的路径</span>
<span class="line">      pathsToMatch: [&#39;https://firstbloodforjava.github.io/vuepress-blog/**&#39;],</span>
<span class="line">      // 控制 Algolia 如何抓取你的站点</span>
<span class="line">      recordExtractor: ({ $, helpers }) =&gt; {</span>
<span class="line">        // @vuepress/theme-default 的选项</span>
<span class="line">        return helpers.docsearch({</span>
<span class="line">          recordProps: {</span>
<span class="line">            lvl0: {</span>
<span class="line">              selectors: &#39;.vp-sidebar-heading.active&#39;,</span>
<span class="line">              defaultValue: &#39;Documentation&#39;,</span>
<span class="line">            },</span>
<span class="line">            lvl1: &#39;[vp-content] h1&#39;,</span>
<span class="line">            lvl2: &#39;[vp-content] h2&#39;,</span>
<span class="line">            lvl3: &#39;[vp-content] h3&#39;,</span>
<span class="line">            lvl4: &#39;[vp-content] h4&#39;,</span>
<span class="line">            lvl5: &#39;[vp-content] h5&#39;,</span>
<span class="line">            lvl6: &#39;[vp-content] h6&#39;,</span>
<span class="line">            content: &#39;[vp-content] p, [vp-content] li&#39;,</span>
<span class="line">          },</span>
<span class="line">          indexHeadings: true,</span>
<span class="line">        })</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">  initialIndexSettings: {</span>
<span class="line">    // 控制索引如何被初始化，这仅当索引尚未生成时有效</span>
<span class="line">    // 你可能需要在修改后手动删除并重新生成新的索引</span>
<span class="line">    firstbloodforjava_vuepress_blog: {</span>
<span class="line">      attributesForFaceting: [&#39;type&#39;, &#39;lang&#39;],</span>
<span class="line">      attributesToRetrieve: [&#39;hierarchy&#39;, &#39;content&#39;, &#39;anchor&#39;, &#39;url&#39;],</span>
<span class="line">      attributesToHighlight: [&#39;hierarchy&#39;, &#39;hierarchy_camel&#39;, &#39;content&#39;],</span>
<span class="line">      attributesToSnippet: [&#39;content:10&#39;],</span>
<span class="line">      camelCaseAttributes: [&#39;hierarchy&#39;, &#39;hierarchy_radio&#39;, &#39;content&#39;],</span>
<span class="line">      searchableAttributes: [</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl0)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl0)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl1)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl1)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl2)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl2)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl3)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl3)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl4)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl4)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl5)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl5)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio_camel.lvl6)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_radio.lvl6)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl0)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl0)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl1)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl1)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl2)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl2)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl3)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl3)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl4)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl4)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl5)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl5)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy_camel.lvl6)&#39;,</span>
<span class="line">        &#39;unordered(hierarchy.lvl6)&#39;,</span>
<span class="line">        &#39;content&#39;,</span>
<span class="line">      ],</span>
<span class="line">      distinct: true,</span>
<span class="line">      attributeForDistinct: &#39;url&#39;,</span>
<span class="line">      customRanking: [</span>
<span class="line">        &#39;desc(weight.pageRank)&#39;,</span>
<span class="line">        &#39;desc(weight.level)&#39;,</span>
<span class="line">        &#39;asc(weight.position)&#39;,</span>
<span class="line">      ],</span>
<span class="line">      ranking: [</span>
<span class="line">        &#39;words&#39;,</span>
<span class="line">        &#39;filters&#39;,</span>
<span class="line">        &#39;typo&#39;,</span>
<span class="line">        &#39;attribute&#39;,</span>
<span class="line">        &#39;proximity&#39;,</span>
<span class="line">        &#39;exact&#39;,</span>
<span class="line">        &#39;custom&#39;,</span>
<span class="line">      ],</span>
<span class="line">      highlightPreTag: &#39;&lt;span class=&quot;algolia-docsearch-suggestion--highlight&quot;&gt;&#39;,</span>
<span class="line">      highlightPostTag: &#39;&lt;/span&gt;&#39;,</span>
<span class="line">      minWordSizefor1Typo: 3,</span>
<span class="line">      minWordSizefor2Typos: 7,</span>
<span class="line">      allowTyposOnNumericTokens: false,</span>
<span class="line">      minProximity: 1,</span>
<span class="line">      ignorePlurals: true,</span>
<span class="line">      advancedSyntax: true,</span>
<span class="line">      attributeCriteriaComputedByMinProximity: true,</span>
<span class="line">      removeWordsIfNoResults: &#39;allOptional&#39;,</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">})</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><strong>如果定时自动爬取没有生成新的索引，可以尝试以下方式：</strong></p><ol><li>删除现在的索引，在编辑页面点击Start Crawling启动。</li><li>修改crawler的配置文件索引名称，点击Start Crawling启动（这样虽然新的不能增加，老的还能使用）。</li></ol><figure><img src="http://47.101.155.205/image-20250315150923524.png" alt="image-20250315150923524" tabindex="0" loading="lazy"><figcaption>image-20250315150923524</figcaption></figure><p>image-20250315133447465</p><h3 id="prismjs" tabindex="-1"><a class="header-anchor" href="#prismjs"><span>prismjs</span></a></h3><p>为 Markdown 代码块启用代码高亮。实现代码块折叠功能。</p><p>问题：<strong>代码块的折叠打开后，导致代码块底部的左右滚动窗口被覆盖，无法滑动。</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装@vuepress/plugin-prismjs插件</span></span>
<span class="line">cnpm i <span class="token parameter variable">-D</span> @vuepress/plugin-prismjs@next</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>config.js配置文件</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> prismjsPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/plugin-prismjs&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token function">prismjsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 代码块折叠配置,超过15行折叠</span></span>
<span class="line">      <span class="token literal-property property">collapsedLines</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// 空白符渲染</span></span>
<span class="line">      <span class="token literal-property property">whitespace</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署"><span>部署</span></a></h2><h3 id="github部署" tabindex="-1"><a class="header-anchor" href="#github部署"><span>GitHub部署</span></a></h3><p>官网介绍：https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages</p><h4 id="工作流文件" tabindex="-1"><a class="header-anchor" href="#工作流文件"><span>工作流文件</span></a></h4><p>项目中的触发分支建立配置工作流文件.github/workflows/docs.yml。</p><p>还需要配置工作流推送代码所用的token。</p><details class="hint-container details"><summary>docs.yml内容</summary><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> docs</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 每当 push 到 main 分支时触发部署</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment"># 手动触发部署</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">docs</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span></span>
<span class="line">          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup pnpm</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 选择要使用的 pnpm 版本</span></span>
<span class="line">          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span></span>
<span class="line">          <span class="token comment"># 使用 pnpm 安装依赖</span></span>
<span class="line">          <span class="token key atrule">run_install</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 选择要使用的 node 版本</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span></span>
<span class="line">          <span class="token comment"># 缓存 pnpm 依赖</span></span>
<span class="line">          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm</span>
<span class="line"></span>
<span class="line">      <span class="token comment"># 运行构建脚本</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm docs<span class="token punctuation">:</span>build</span>
<span class="line"></span>
<span class="line">      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span></span>
<span class="line">      <span class="token comment"># @see http://github.com/crazy-max/ghaction-github-pages</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 打包之后的文件部署到 gh-pages 分支,需要</span></span>
<span class="line">          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages</span>
<span class="line">          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span></span>
<span class="line">          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># @see http://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-VUEPRESS_BLOG_ACTION-secret</span></span>
<span class="line">          <span class="token comment"># VUEPRESS_BLOG_ACTION换成后面项目生成的token名称</span></span>
<span class="line">          <span class="token key atrule">VUEPRESS_BLOG_ACTION</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.VUEPRESS_BLOG_ACTION <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="token准备" tabindex="-1"><a class="header-anchor" href="#token准备"><span>token准备</span></a></h4><p>账号的Setting&gt;Developer Settings&gt;Personal access tokens&gt;Token(classic)&gt;Generate new token&gt;Generate new token&gt;创建token选择repo。</p><p>创建完成复制对应的token值，后续还需要用到。</p><figure><img src="http://47.101.155.205/image-20241018155758368.png" alt="image-20241018155758368" tabindex="0" loading="lazy"><figcaption>image-20241018155758368</figcaption></figure><figure><img src="http://47.101.155.205/image-20241018160125154.png" alt="image-20241018160125154" tabindex="0" loading="lazy"><figcaption>image-20241018160125154</figcaption></figure><p>使用前面的token值创建工作流token，项目的Setting&gt;Secrets and variables&gt;Actions&gt;New Repository secret新建token，name为工作流配置文件VUEPRESS_BLOG_ACTION: <code>\${{ secrets.VUEPRESS_BLOG_ACTION }}</code>所需要改的名称，secret为账号Setting创建的token值。</p><figure><img src="http://47.101.155.205/image-20241018160355612.png" alt="image-20241018160355612" tabindex="0" loading="lazy"><figcaption>image-20241018160355612</figcaption></figure><figure><img src="http://47.101.155.205/image-20241018160849591.png" alt="image-20241018160849591" tabindex="0" loading="lazy"><figcaption>image-20241018160849591</figcaption></figure><h4 id="配置工作流权限-可能不需要" tabindex="-1"><a class="header-anchor" href="#配置工作流权限-可能不需要"><span>配置工作流权限(可能不需要)</span></a></h4><figure><img src="http://47.101.155.205/image-20241018171146566.png" alt="image-20241018171146566" tabindex="0" loading="lazy"><figcaption>image-20241018171146566</figcaption></figure><h4 id="page" tabindex="-1"><a class="header-anchor" href="#page"><span>page</span></a></h4><h4 id="其它情况" tabindex="-1"><a class="header-anchor" href="#其它情况"><span>其它情况</span></a></h4><h5 id="_404" tabindex="-1"><a class="header-anchor" href="#_404"><span>404</span></a></h5><p>项目以及启动能访问，一个项目部署成功后，两个项目都不能访问了。</p><figure><img src="http://47.101.155.205/image-20241018171721766.png" alt="image-20241018171721766" tabindex="0" loading="lazy"><figcaption>image-20241018171721766</figcaption></figure><figure><img src="http://47.101.155.205/image-20241021130606242.png" alt="image-20241021130606242" tabindex="0" loading="lazy"><figcaption>image-20241021130606242</figcaption></figure><h5 id="变量" tabindex="-1"><a class="header-anchor" href="#变量"><span>变量</span></a></h5><div class="language-txt" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre><code><span class="line">\${{ secrets.VUEPRESS_BLOG_ACTION }}不能直接出现在纯文本中,否则浏览器报错</span>
<span class="line">可以用\`\${{ secrets.VUEPRESS_BLOG_ACTION }}\`表示</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/image-20241018172535420.png" alt="image-20241018172535420" tabindex="0" loading="lazy"><figcaption>image-20241018172535420</figcaption></figure><h2 id="npm使用" tabindex="-1"><a class="header-anchor" href="#npm使用"><span>npm使用</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># npm配置代理无效</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> proxy http://127.0.0.1:33210</span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> http-proxy http://127.0.0.1:33210</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用淘宝的 npm 镜像,该镜像有问题</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry http://registry.npm.taobao.org</span>
<span class="line"><span class="token comment"># 设置为官方源</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry http://registry.npmjs.org/</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装cnpm,镜像是http://registry.npmmirror.com</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> cnpm <span class="token parameter variable">--registry</span><span class="token operator">=</span>http://registry.npmmirror.com</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装依赖具体版本,-D表示--save-dev</span></span>
<span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> <span class="token operator">&lt;</span>dependency<span class="token operator">&gt;</span>@version</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&lt;</span>dependency<span class="token operator">&gt;</span>@version --save-dev</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询依赖的所有版本</span></span>
<span class="line"><span class="token function">npm</span> show <span class="token operator">&lt;</span>dependency<span class="token operator">&gt;</span> versions <span class="token parameter variable">--json</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,81))])}const h=u(m,[["render",k],["__file","vuepress使用介绍.html.vue"]]),y=JSON.parse('{"path":"/frontEnd/vuepress/vuepress%E4%BD%BF%E7%94%A8%E4%BB%8B%E7%BB%8D.html","title":"vuepress使用介绍","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"创建vuepress步骤","slug":"创建vuepress步骤","link":"#创建vuepress步骤","children":[{"level":3,"title":"config配置(默认主题)","slug":"config配置-默认主题","link":"#config配置-默认主题","children":[]},{"level":3,"title":"client配置","slug":"client配置","link":"#client配置","children":[]}]},{"level":2,"title":"插件","slug":"插件","link":"#插件","children":[{"level":3,"title":"搜索插件(服务端)","slug":"搜索插件-服务端","link":"#搜索插件-服务端","children":[]},{"level":3,"title":"prismjs","slug":"prismjs","link":"#prismjs","children":[]}]},{"level":2,"title":"部署","slug":"部署","link":"#部署","children":[{"level":3,"title":"GitHub部署","slug":"github部署","link":"#github部署","children":[]}]},{"level":2,"title":"npm使用","slug":"npm使用","link":"#npm使用","children":[]}],"git":{"updatedTime":1742023270000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":15,"url":"https://github.com/ouyangcm"},{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":7,"url":"https://github.com/oycm"}]},"filePathRelative":"frontEnd/vuepress/vuepress使用介绍.md"}');export{h as comp,y as data};
