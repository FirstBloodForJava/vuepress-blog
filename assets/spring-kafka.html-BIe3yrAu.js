import{_ as s,c as a,e as t,o as p}from"./app-DTIdEayU.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="spring-kafka" tabindex="-1"><a class="header-anchor" href="#spring-kafka"><span>spring-kafka</span></a></h1><h2 id="springboot快速使用kafka" tabindex="-1"><a class="header-anchor" href="#springboot快速使用kafka"><span>SpringBoot快速使用Kafka</span></a></h2><p>添加依赖：</p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Bean</span></span>
<span class="line"><span class="token class-name">CommandLineRunner</span> <span class="token function">myCommandLineRunner</span><span class="token punctuation">(</span><span class="token class-name">CustomerRepository</span> repository<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 向kafka发送消息</span></span>
<span class="line">        template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;org.test1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;foo1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;org.test1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;foo2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;org.test1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;foo3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 等待直到 超时或计数器为0</span></span>
<span class="line">        latch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;All received&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 消费者</span></span>
<span class="line"><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;org.test1&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span> cr<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;consumer: &quot;</span> <span class="token operator">+</span> cr<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>springboot配置：</p><div class="language-yaml" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">kafka</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">bootstrapServers</span><span class="token punctuation">:</span> 47.101.155.205<span class="token punctuation">:</span><span class="token number">9092</span></span>
<span class="line">    <span class="token key atrule">consumer</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">group-id</span><span class="token punctuation">:</span> spring<span class="token punctuation">-</span>kafka</span>
<span class="line">      <span class="token key atrule">auto-offset-reset</span><span class="token punctuation">:</span> earliest</span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,7)]))}const i=s(e,[["render",o],["__file","spring-kafka.html.vue"]]),u=JSON.parse('{"path":"/springboot/spring-kafka.html","title":"spring-kafka","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"SpringBoot快速使用Kafka","slug":"springboot快速使用kafka","link":"#springboot快速使用kafka","children":[]}],"git":{"updatedTime":1744899067000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":1,"url":"https://github.com/oycm"}]},"filePathRelative":"springboot/spring-kafka.md"}');export{i as comp,u as data};
