import{_ as s,c as a,e,o as t}from"./app-BIGZvh4f.js";const p={};function i(l,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h2 id="maven切换gradle" tabindex="-1"><a class="header-anchor" href="#maven切换gradle"><span>Maven切换Gradle</span></a></h2><p>SpringBoot版本：1.5.7.RELEASE；</p><p>gradle版本：4.9</p><p>在 <code>maven</code> 项目中使用 <code>gradle init</code> 命令初始化项目，发现 <code>maven</code> 文件时会提示是否依据此配置构建，选中。</p><p><strong>构建项目时，注意项目设置 gradle 使用的 java 版本。</strong></p><h3 id="gradle-init-d配置" tabindex="-1"><a class="header-anchor" href="#gradle-init-d配置"><span>gradle-init.d配置</span></a></h3><p>配置maven仓库和插件的仓库。</p><p>gradle的目录或gradle wrapper下载的init.d目录下init.gradle文件内容：</p><div class="language-gradle line-numbers-mode" data-highlighter="prismjs" data-ext="gradle" data-title="gradle"><pre><code><span class="line">allprojects<span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">repositories</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/jcenter/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/google/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://jitpack.io/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">settingsEvaluated <span class="token punctuation">{</span> settings <span class="token operator">-&gt;</span></span>
<span class="line">    settings<span class="token punctuation">.</span>pluginManagement <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">repositories</span><span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">repositories</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            maven <span class="token punctuation">{</span></span>
<span class="line">				<span class="token comment">// https://maven.aliyun.com/repository/gradle-plugin/</span></span>
<span class="line">                url <span class="token string">&#39;http://192.168.27.20:8081/repository/maven-public/&#39;</span></span>
<span class="line">				<span class="token comment">//allowInsecureProtocol = true</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="项目文件" tabindex="-1"><a class="header-anchor" href="#项目文件"><span>项目文件</span></a></h3><p>maven配置</p><div class="language-pom line-numbers-mode" data-highlighter="prismjs" data-ext="pom" data-title="pom"><pre><code><span class="line">&lt;parent&gt;</span>
<span class="line">    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span>
<span class="line">    &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;</span>
<span class="line">    &lt;version&gt;1.5.7.RELEASE&lt;/version&gt;</span>
<span class="line">&lt;/parent&gt;</span>
<span class="line">&lt;dependencyManagement&gt;</span>
<span class="line">    &lt;dependencies&gt;</span>
<span class="line">      &lt;dependency&gt;</span>
<span class="line">        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span>
<span class="line">        &lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;</span>
<span class="line">        &lt;version&gt;Brixton.RELEASE&lt;/version&gt;</span>
<span class="line">        &lt;type&gt;pom&lt;/type&gt;</span>
<span class="line">        &lt;scope&gt;import&lt;/scope&gt;</span>
<span class="line">      &lt;/dependency&gt;</span>
<span class="line">    &lt;/dependencies&gt;</span>
<span class="line">&lt;/dependencyManagement&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建文件build.gradle</p><div class="language-gradle line-numbers-mode" data-highlighter="prismjs" data-ext="gradle" data-title="gradle"><pre><code><span class="line"><span class="token comment">// 声明Gradle使用的插件</span></span>
<span class="line"><span class="token keyword">plugins</span> <span class="token punctuation">{</span></span>
<span class="line">	id <span class="token interpolation-string"><span class="token string">&quot;idea&quot;</span></span></span>
<span class="line">	id <span class="token interpolation-string"><span class="token string">&quot;java&quot;</span></span></span>
<span class="line">	id <span class="token interpolation-string"><span class="token string">&quot;maven-publish&quot;</span></span></span>
<span class="line">	<span class="token comment">// SpringBoot的parent依赖</span></span>
<span class="line">	id <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span> version <span class="token interpolation-string"><span class="token string">&quot;1.5.7.RELEASE&quot;</span></span> </span>
<span class="line">	<span class="token comment">// 类似maven的dependencyManagement依赖管理</span></span>
<span class="line">	id <span class="token interpolation-string"><span class="token string">&quot;io.spring.dependency-management&quot;</span></span> version <span class="token interpolation-string"><span class="token string">&quot;1.0.6.RELEASE&quot;</span></span> </span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// maven项目的groupId</span></span>
<span class="line">group <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;com.api.framework&quot;</span></span></span>
<span class="line"><span class="token comment">// maven项目的版本</span></span>
<span class="line">version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.0-SNAPSHOT&quot;</span></span></span>
<span class="line">sourceCompatibility <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.8&quot;</span></span></span>
<span class="line">targetCompatibility <span class="token operator">=</span> <span class="token number">1.8</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 指定仓库地址,不指定可能出现 Cannot resolve external dependency org.springframework.boot:spring-boot-starter-web because no repositories are defined.</span></span>
<span class="line"><span class="token keyword">repositories</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">	maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/jcenter/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">	maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/google/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">	maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">	maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://jitpack.io/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 指定maven的dependencyManagement,不指定可能提示: Could not find org.springframework.cloud:spring-cloud-starter-hystrix:.</span></span>
<span class="line">dependencyManagement <span class="token punctuation">{</span></span>
<span class="line">	imports <span class="token punctuation">{</span></span>
<span class="line">		mavenBom <span class="token interpolation-string"><span class="token string">&quot;org.springframework.cloud:spring-cloud-dependencies:Brixton.RELEASE&quot;</span></span> <span class="token comment">// 引入 Spring Cloud 的 BOM</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">implementation</span> <span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-web&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		exclude group<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span><span class="token punctuation">,</span> module<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;spring-boot-starter-tomcat&quot;</span></span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">implementation</span> <span class="token punctuation">(</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.cloud:spring-cloud-starter-hystrix&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.cloud:spring-cloud-starter-eureka&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-undertow&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-jdbc&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-actuator&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.mybatis.spring.boot:mybatis-spring-boot-starter:1.2.0&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;com.alibaba:fastjson:1.2.83&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;com.mangofactory:swagger-springmvc:0.9.5&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;com.github.pagehelper:pagehelper:4.2.1&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.aspectj:aspectjrt&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.aspectj:aspectjtools&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.aspectj:aspectjweaver&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-configuration-processor&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.kafka:spring-kafka&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-data-redis&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-starter-data-jpa&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">			<span class="token interpolation-string"><span class="token string">&quot;org.projectlombok:lombok&quot;</span></span></span>
<span class="line">	<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 自定义构建命令然后给包换,copy命令该版本不生效</span></span>
<span class="line">task <span class="token function">buildSvcJar</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span> Copy<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	dependsOn <span class="token string">&#39;build&#39;</span> <span class="token comment">// 仅依赖于 build 任务</span></span>
<span class="line">	doLast <span class="token punctuation">{</span></span>
<span class="line">		from <span class="token interpolation-string"><span class="token string">&quot;build/libs/包名.jar&quot;</span></span> <span class="token comment">// 源文件路径</span></span>
<span class="line">		into <span class="token interpolation-string"><span class="token string">&quot;build/&quot;</span></span> <span class="token comment">// 目标文件夹</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>setting.gradle</strong></p><div class="language-gradle" data-highlighter="prismjs" data-ext="gradle" data-title="gradle"><pre><code><span class="line">rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gradle-project&#39;</span> <span class="token comment">// 设置根项目的名称</span></span>
<span class="line"></span>
<span class="line">include <span class="token string">&#39;module1&#39;</span> <span class="token comment">// 引入子项目</span></span>
<span class="line">include <span class="token string">&#39;module2&#39;</span> <span class="token comment">// 引入另一个子项目</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="加载步骤" tabindex="-1"><a class="header-anchor" href="#加载步骤"><span>加载步骤</span></a></h3><ol><li>删除maven相关的idea缓存文件(projectName.iml)；</li><li>重新打开项目，以项目中的build.gradle作为一个项目打开。</li></ol><p>根目录右键，选择AddFrameworkSupport。</p><figure><img src="http://47.101.155.205/image-20241017144833261.png" alt="image-20241017144833261" tabindex="0" loading="lazy"><figcaption>image-20241017144833261</figcaption></figure><h3 id="maven多模块" tabindex="-1"><a class="header-anchor" href="#maven多模块"><span>maven多模块</span></a></h3><p>maven主模块配置</p><div class="language-pom" data-highlighter="prismjs" data-ext="pom" data-title="pom"><pre><code><span class="line"> &lt;modules&gt;</span>
<span class="line"> 	&lt;module&gt;test&lt;/module&gt;</span>
<span class="line"> &lt;/modules&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>对于gradle修改</p><p>项目根目录下(build.gradle同级目录)，新增settings.gradle文件。</p><div class="language-gradle line-numbers-mode" data-highlighter="prismjs" data-ext="gradle" data-title="gradle"><pre><code><span class="line"><span class="token comment">// 指定仓库地址</span></span>
<span class="line">pluginManagement <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">repositories</span> <span class="token punctuation">{</span></span>
<span class="line">        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 指定maven仓库地址</span></span>
<span class="line"><span class="token keyword">repositories</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 使用Maven中央仓库的简写方式</span></span>
<span class="line">    maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># 主模块的名称</span>
<span class="line">rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gradleProject&#39;</span></span>
<span class="line">include <span class="token string">&#39;test&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26)]))}const c=s(p,[["render",i],["__file","maven项目切换gradle步骤.html.vue"]]),r=JSON.parse('{"path":"/build/maven%E9%A1%B9%E7%9B%AE%E5%88%87%E6%8D%A2gradle%E6%AD%A5%E9%AA%A4.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Maven切换Gradle","slug":"maven切换gradle","link":"#maven切换gradle","children":[{"level":3,"title":"gradle-init.d配置","slug":"gradle-init-d配置","link":"#gradle-init-d配置","children":[]},{"level":3,"title":"项目文件","slug":"项目文件","link":"#项目文件","children":[]},{"level":3,"title":"加载步骤","slug":"加载步骤","link":"#加载步骤","children":[]},{"level":3,"title":"maven多模块","slug":"maven多模块","link":"#maven多模块","children":[]}]}],"git":{"updatedTime":1752830021000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":1,"url":"https://github.com/oycm"},{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":1,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"build/maven项目切换gradle步骤.md"}');export{c as comp,r as data};
