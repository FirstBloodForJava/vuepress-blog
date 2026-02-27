import{_ as s,c as a,e,o as l}from"./app-BIGZvh4f.js";const p={};function i(t,n){return l(),a("div",null,n[0]||(n[0]=[e(`<h1 id="yaml" tabindex="-1"><a class="header-anchor" href="#yaml"><span>yaml</span></a></h1><p>YAML（Yet Another Markup Language）常用来进行配置文件的编写和读取。</p><h2 id="编写yaml" tabindex="-1"><a class="header-anchor" href="#编写yaml"><span>编写yaml</span></a></h2><p>@tab 标量</p><p>基本数据类型</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># 字符串</span></span>
<span class="line"><span class="token key atrule">str1</span><span class="token punctuation">:</span> 简单字符串  <span class="token comment"># 无需引号</span></span>
<span class="line"><span class="token key atrule">str2</span><span class="token punctuation">:</span> <span class="token string">&quot;带空格的字符串&quot;</span>  <span class="token comment"># 含空格需引号，可转义特殊字符</span></span>
<span class="line"><span class="token key atrule">str3</span><span class="token punctuation">:</span> <span class="token string">&#39;单引号字符串&#39;</span>  <span class="token comment"># 不转义特殊字符</span></span>
<span class="line"><span class="token key atrule">str4</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">  多行字符串</span>
<span class="line">  保留换行符</span></span>
<span class="line"><span class="token key atrule">str5</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token scalar string"></span>
<span class="line">  多行字符串</span>
<span class="line">  折叠成一行</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数值</span></span>
<span class="line"><span class="token key atrule">int</span><span class="token punctuation">:</span> <span class="token number">42</span></span>
<span class="line"><span class="token key atrule">float</span><span class="token punctuation">:</span> <span class="token number">3.14</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 布尔值</span></span>
<span class="line"><span class="token key atrule">flag1</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>   <span class="token comment"># 或 True, TRUE</span></span>
<span class="line"><span class="token key atrule">flag2</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>  <span class="token comment"># 或 False, FALSE</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 空值</span></span>
<span class="line"><span class="token key atrule">empty</span><span class="token punctuation">:</span> <span class="token null important">null</span>   <span class="token comment"># 或 Null, NULL</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@tab 序列(Sequences)</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># 多行写法</span></span>
<span class="line"><span class="token key atrule">fruits</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> Apple</span>
<span class="line">  <span class="token punctuation">-</span> Banana</span>
<span class="line">  <span class="token punctuation">-</span> Orange</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 行内写法（JSON风格）</span></span>
<span class="line"><span class="token key atrule">colors</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>red<span class="token punctuation">,</span> green<span class="token punctuation">,</span> blue<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 嵌套序列</span></span>
<span class="line"><span class="token key atrule">matrix</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@tab 映射(Mappings)</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># 多级缩进</span></span>
<span class="line"><span class="token key atrule">person</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> Alice</span>
<span class="line">  <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">30</span></span>
<span class="line">  <span class="token key atrule">address</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">city</span><span class="token punctuation">:</span> Beijing</span>
<span class="line">    <span class="token key atrule">street</span><span class="token punctuation">:</span> Main St</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 行内写法</span></span>
<span class="line"><span class="token key atrule">contact</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">phone</span><span class="token punctuation">:</span> <span class="token string">&quot;123-4567&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">email</span><span class="token punctuation">:</span> alice@example.com <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@tab 特殊数据类型</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># 时间戳</span></span>
<span class="line"><span class="token key atrule">iso8601</span><span class="token punctuation">:</span> <span class="token datetime number">2025-08-04T12:00:00+08:00</span>  <span class="token comment"># ISO 8601格式</span></span>
<span class="line"><span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2025-08-04</span>  <span class="token comment"># 简单日期</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制类型转换</span></span>
<span class="line"><span class="token key atrule">str_num</span><span class="token punctuation">:</span> <span class="token tag">!!str</span> <span class="token number">42</span>      <span class="token comment"># 强制转为字符串</span></span>
<span class="line"><span class="token key atrule">int_str</span><span class="token punctuation">:</span> <span class="token tag">!!int</span> <span class="token string">&quot;123&quot;</span>   <span class="token comment"># 字符串转数字</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 二进制数据</span></span>
<span class="line"><span class="token key atrule">binary</span><span class="token punctuation">:</span> <span class="token tag">!!binary</span> <span class="token punctuation">|</span>  <span class="token comment"># Base64编码</span></span>
<span class="line">  R0lGODlhDAAMAIQAA<span class="token punctuation">...</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@tab 其它特性</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># 锚点和引用</span></span>
<span class="line"><span class="token comment"># &amp;[name] 创建锚点; *[name] 引用锚点; &lt;&lt; 合并键值对</span></span>
<span class="line"><span class="token key atrule">defaults</span><span class="token punctuation">:</span> <span class="token important">&amp;default_settings</span></span>
<span class="line">  <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">30</span></span>
<span class="line">  <span class="token key atrule">retry</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">service1</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">&lt;&lt;</span><span class="token punctuation">:</span> <span class="token important">*default_settings</span></span>
<span class="line">  <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 多文档支持</span></span>
<span class="line"><span class="token punctuation">---</span>  <span class="token comment"># 文档分隔符</span></span>
<span class="line"><span class="token key atrule">doc1</span><span class="token punctuation">:</span> 内容1</span>
<span class="line"><span class="token punctuation">...</span></span>
<span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">doc2</span><span class="token punctuation">:</span> 内容2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定集合类型</span></span>
<span class="line"><span class="token key atrule">set</span><span class="token punctuation">:</span> <span class="token tag">!!set</span></span>
<span class="line">  <span class="token punctuation">?</span> item1</span>
<span class="line">  <span class="token punctuation">?</span> item2 </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定类的类型</span></span>
<span class="line"><span class="token comment"># !![类全路径名称] 显示指定数据的类型 </span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)]))}const o=s(p,[["render",i],["__file","yaml.html.vue"]]),u=JSON.parse('{"path":"/tools/yaml.html","title":"yaml","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"编写yaml","slug":"编写yaml","link":"#编写yaml","children":[]}],"git":{"updatedTime":1754299904000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":1,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"tools/yaml.md"}');export{o as comp,u as data};
