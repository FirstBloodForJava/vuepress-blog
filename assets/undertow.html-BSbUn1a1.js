import{_ as s,c as a,d as t,o as e}from"./app-DylbgBNo.js";const l={};function i(p,n){return e(),a("div",null,n[0]||(n[0]=[t(`<h1 id="undertow" tabindex="-1"><a class="header-anchor" href="#undertow"><span>undertow</span></a></h1><p>SpringBoot引入undertow容器的方式</p><blockquote><p>maven</p></blockquote><div class="language-pom line-numbers-mode" data-highlighter="prismjs" data-ext="pom" data-title="pom"><pre><code><span class="line">&lt;dependency&gt;</span>
<span class="line">	&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span>
<span class="line">	&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span>
<span class="line">	&lt;!--spring-boot-starter-web默认导入tomcat容器依赖，排除默认依赖--&gt;</span>
<span class="line">	&lt;exclusions&gt;</span>
<span class="line">		&lt;exclusion&gt;</span>
<span class="line">			&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;spring-boot-starter-tomcat&lt;/artifactId&gt;</span>
<span class="line">		&lt;/exclusion&gt;</span>
<span class="line">	&lt;/exclusions&gt;</span>
<span class="line">&lt;/dependency&gt;</span>
<span class="line"></span>
<span class="line">&lt;dependency&gt;</span>
<span class="line">	&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span>
<span class="line">	&lt;artifactId&gt;spring-boot-starter-undertow&lt;/artifactId&gt;</span>
<span class="line">&lt;/dependency&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>gradle</p></blockquote><div class="language-gradle" data-highlighter="prismjs" data-ext="gradle" data-title="gradle"><pre><code><span class="line"><span class="token keyword">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">implementation</span><span class="token punctuation">(</span><span class="token string">&#39;org.springframework.boot:spring-boot-starter-web&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        exclude group<span class="token punctuation">:</span> <span class="token string">&#39;org.springframework.boot&#39;</span><span class="token punctuation">,</span> module<span class="token punctuation">:</span> <span class="token string">&#39;spring-boot-starter-tomcat&#39;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">implementation</span><span class="token punctuation">(</span><span class="token string">&#39;org.springframework.boot:spring-boot-starter-undertow&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>处理http请求的要求：</p>`,7)]))}const r=s(l,[["render",i],["__file","undertow.html.vue"]]),c=JSON.parse('{"path":"/Spring/undertow.html","title":"undertow","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1732890686000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":1,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"Spring/undertow.md"}');export{r as comp,c as data};
