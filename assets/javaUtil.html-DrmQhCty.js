import{_ as s,c as a,d as p,o as t}from"./app-BD6I-iXu.js";const e={};function c(l,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="javautil" tabindex="-1"><a class="header-anchor" href="#javautil"><span>javaUtil</span></a></h1><h2 id="获取系统信息" tabindex="-1"><a class="header-anchor" href="#获取系统信息"><span>获取系统信息</span></a></h2><h3 id="ip" tabindex="-1"><a class="header-anchor" href="#ip"><span>ip</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">// 获取第一个非回环、非IPv6的IPv4地址</span></span>
<span class="line"><span class="token comment">// ip addr会显示网络接口信息，inet 后面跟的是ip地址信息</span></span>
<span class="line"><span class="token comment">// ifconfig inet后面跟的是ip地址信息</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getInetAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token class-name">Enumeration</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">NetworkInterface</span><span class="token punctuation">&gt;</span></span> interfaces <span class="token operator">=</span> <span class="token class-name">NetworkInterface</span><span class="token punctuation">.</span><span class="token function">getNetworkInterfaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">		<span class="token class-name">InetAddress</span> address<span class="token punctuation">;</span></span>
<span class="line">		<span class="token keyword">while</span> <span class="token punctuation">(</span>interfaces<span class="token punctuation">.</span><span class="token function">hasMoreElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token class-name">NetworkInterface</span> ni <span class="token operator">=</span> interfaces<span class="token punctuation">.</span><span class="token function">nextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">			<span class="token class-name">Enumeration</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InetAddress</span><span class="token punctuation">&gt;</span></span> addresses <span class="token operator">=</span> ni<span class="token punctuation">.</span><span class="token function">getInetAddresses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">			<span class="token keyword">while</span> <span class="token punctuation">(</span>addresses<span class="token punctuation">.</span><span class="token function">hasMoreElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">				address <span class="token operator">=</span> addresses<span class="token punctuation">.</span><span class="token function">nextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>address<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token comment">// 非回环地址 &amp;&amp; 非IPv6地址</span></span>
<span class="line">				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>address<span class="token punctuation">.</span><span class="token function">isLoopbackAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>address<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">					<span class="token keyword">return</span> address<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">				<span class="token punctuation">}</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> var4<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="java-pid" tabindex="-1"><a class="header-anchor" href="#java-pid"><span>Java-pid</span></a></h3><p>获取当前Java程序的pid</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getPID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// 获取当前运行的 Java 虚拟机的名称,通常是&lt;pid&gt;@&lt;hostname&gt;格式</span></span>
<span class="line">	<span class="token class-name">String</span> processName <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getRuntimeMXBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>processName<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>processName <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>processName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> processSplitName <span class="token operator">=</span> processName<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;@&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>processSplitName<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">String</span> pid <span class="token operator">=</span> processSplitName<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>pid <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> pid<span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进制转换" tabindex="-1"><a class="header-anchor" href="#进制转换"><span>进制转换</span></a></h2><figure><img src="http://47.101.155.205/image-20241126134949671.png" alt="image-20241126134949671" tabindex="0" loading="lazy"><figcaption>image-20241126134949671</figcaption></figure><p>二进制数据不管正负都是以补码的形式存储。</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">// Long.MIN_VALUE 补码 2^63 8+15个0</span></span>
<span class="line"><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span> <span class="token operator">&amp;</span> <span class="token number">1</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Long.MAX_VALUE 补码 2^63 - 1, 7+15个f, 0 + 63个1</span></span>
<span class="line"><span class="token comment">// -1L 补码 2^64 - 1,16个f, 64个1</span></span>
<span class="line"><span class="token comment">// &amp;运算两个为1才是1</span></span>
<span class="line"><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span> <span class="token operator">&amp;</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_16进制" tabindex="-1"><a class="header-anchor" href="#_16进制"><span>16进制</span></a></h3><p>Long.parseLong(String s, int radix)：以radix进制格式解析字符串s，支持带符号解析，只能解析Long类型范围内的进制s。超出则抛出异常</p><p>Long.parseUnsignedLong(String s, int radix)：以radix进制格式解析字符串s，不支持带符号解析；可支持的字符串更大。超过字符串上限抛出异常。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ScaleConvert</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">String</span> traceId <span class="token operator">=</span> <span class="token string">&quot;80000000000000008000000000000000&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 支持带符号,以16进制解析字符串为long类型.字符串相当于该进制的补码,最高位不能是1(携带&#39;-&#39;就可以)</span></span>
<span class="line">        <span class="token comment">// 不带符号，字符串解析为二进制补码，最高位不能位1的格式，10进制不能超过最大值</span></span>
<span class="line">        <span class="token comment">// 带符号，字符串解析为二进制补码，最高位能是1，对应补码在Long.MIN_VALUE-Long.MAX_VALUE范围内</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span> <span class="token operator">+</span> traceId<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// Long.MAX_VALUE</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 不支持带符号，以16进制解析字符串为long类型.字符串相当于该进制的补码</span></span>
<span class="line">        <span class="token comment">// 解析为10进制，字符串支持长度0-19位,字符串值&#39;0&#39;-&#39;9&#39;</span></span>
<span class="line">        <span class="token comment">// 解析为16进制，字符串支持长度0-16位,字符串值&#39;0&#39;-&#39;9&#39;,&#39;a&#39;-&#39;f&#39;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseUnsignedLong</span><span class="token punctuation">(</span>traceId<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Long.MIN_VALUE</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">lenientLowerHexToUnsignedLong</span><span class="token punctuation">(</span>traceId<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Long.MIN_VALUE</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">lenientLowerHexToUnsignedLong</span><span class="token punctuation">(</span>traceId<span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 将字符串解析成对应long类型的二进制补码，如果长度超过16位，高位丢弃</span>
<span class="line">     * 字符串中字符范围：&#39;0&#39;-&#39;9&#39;,&#39;a&#39;-&#39;f&#39;，出现其它字符则return 0</span>
<span class="line">     * 与Long.parseUnsignedLong(String s, int radix)功能相似，但是不会抛出异常</span>
<span class="line">     * <span class="token keyword">@param</span> <span class="token parameter">lowerHex</span> 字符串</span>
<span class="line">     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 字符串下标开始位置(包含)</span>
<span class="line">     * <span class="token keyword">@param</span> <span class="token parameter">endIndex</span> 字符串结束位置(不包含)</span>
<span class="line">     * <span class="token keyword">@return</span> 字符串lowerHex转化为16进制的补发对应的long值</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token function">lenientLowerHexToUnsignedLong</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> lowerHex<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">long</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">char</span> c <span class="token operator">=</span> lowerHex<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            result <span class="token operator">&lt;&lt;=</span> <span class="token number">4</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">&gt;=</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                result <span class="token operator">|=</span> c <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">&gt;=</span> <span class="token char">&#39;a&#39;</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token char">&#39;f&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                result <span class="token operator">|=</span> c <span class="token operator">-</span> <span class="token char">&#39;a&#39;</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> result<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)]))}const i=s(e,[["render",c],["__file","javaUtil.html.vue"]]),u=JSON.parse('{"path":"/JavaEE/javaUtil.html","title":"javaUtil","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"获取系统信息","slug":"获取系统信息","link":"#获取系统信息","children":[{"level":3,"title":"ip","slug":"ip","link":"#ip","children":[]},{"level":3,"title":"Java-pid","slug":"java-pid","link":"#java-pid","children":[]}]},{"level":2,"title":"进制转换","slug":"进制转换","link":"#进制转换","children":[{"level":3,"title":"16进制","slug":"_16进制","link":"#_16进制","children":[]}]}],"git":{"updatedTime":1732890899000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"JavaEE/javaUtil.md"}');export{i as comp,u as data};