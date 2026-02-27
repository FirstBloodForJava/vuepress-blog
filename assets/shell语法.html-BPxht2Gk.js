import{_ as n,c as a,e,o as p}from"./app-BIGZvh4f.js";const l={};function i(t,s){return p(),a("div",null,s[0]||(s[0]=[e(`<h2 id="shell脚本介绍" tabindex="-1"><a class="header-anchor" href="#shell脚本介绍"><span>shell脚本介绍</span></a></h2><p>脚本：脚本是一个文本文件，包含了一系列要执行的命令和控制结构（如条件语句和循环）</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 脚本文件要以上面开始,.sh结尾的文件不需要</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 赋权文件可执行权限</span></span>
<span class="line"><span class="token function">chmod</span> +x <span class="token operator">&lt;</span>fileName<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 获取java jar包启动的进程id</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> *.jar <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="shell变量" tabindex="-1"><a class="header-anchor" href="#shell变量"><span>shell变量</span></a></h2><p>变量命名规则：</p><ol><li>只能包含字母、数字、下划线；</li><li>不能以数字开口，可以包含数字；</li><li>不能使用Shell的关键字作为变量名( if、then、else、fi、for、while)</li><li>使用大写字母表示常量；</li><li><strong>变量赋值不能使用空格，例如：PID=&quot;pid&quot;；</strong></li></ol><h3 id="使用变量" tabindex="-1"><a class="header-anchor" href="#使用变量"><span>使用变量</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;pid&quot;</span></span>
<span class="line"><span class="token comment"># 使用命令执行结果作为变量，\`命令\`执行命令，将命令的结果作为返回</span></span>
<span class="line"><span class="token comment"># grep -v grep</span></span>
<span class="line"><span class="token assign-left variable">P1</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>jarName<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token assign-left variable">P1</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>jarName<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&quot;{print <span class="token variable">$2</span>}&quot;</span><span class="token variable">\`</span></span> </span>
<span class="line"><span class="token assign-left variable">P2</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>jarName<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span></span>
<span class="line"># <span class="token variable"><span class="token variable">$(</span>命令<span class="token variable">)</span></span>用法同<span class="token variable"><span class="token variable">\`</span>命令<span class="token variable">\`</span></span></span>
<span class="line">PID=<span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> *.jar <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"># 使用变量</span>
<span class="line">echo <span class="token variable">$PID</span></span>
<span class="line">echo &quot;</span><span class="token assign-left variable">P1</span><span class="token operator">=</span><span class="token variable">$PID</span><span class="token string">&quot;</span>
<span class="line">echo &#39;P2=<span class="token variable">$PID</span>&#39;</span>
<span class="line"># 特殊字符&#39;要成对(转义)</span>
<span class="line">echo &#39;P3=&#39;&#39;<span class="token variable">$PID</span>&#39;</span>
<span class="line">echo <span class="token variable">\${PID}</span></span>
<span class="line"></span>
<span class="line"># 设置只读</span>
<span class="line">only_read=&quot;</span>Java<span class="token string">&quot;</span>
<span class="line">readonly only_read</span>
<span class="line">#会有提示</span>
<span class="line">only_read=&quot;</span>python&quot; </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除变量(不能删除只读变量)</span></span>
<span class="line"><span class="token builtin class-name">unset</span> only_read</span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">\${only_read}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/d730ac9df94b0c61f47846586ec1da34.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;zhangsan&quot;</span></span>
<span class="line"><span class="token comment"># 这里\${nmae}或$name会把值当成变量来获取</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;name: <span class="token variable">\${name}</span>&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="变量类型" tabindex="-1"><a class="header-anchor" href="#变量类型"><span>变量类型</span></a></h3><h4 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h4><p>在 Shell中，变量通常被视为字符串。 可以使用&#39;&#39;或&quot;&quot;来定义变量 <strong>单引号字符串的限制：</strong> 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的； 单引号字符串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。 <strong>双引号的优点：</strong> 双引号里可以有变量； 双引号里可以出现转义字符。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 字符串变量</span></span>
<span class="line"><span class="token assign-left variable">s1</span><span class="token operator">=</span><span class="token string">&quot;Hello World&quot;</span></span>
<span class="line"><span class="token assign-left variable">s2</span><span class="token operator">=</span><span class="token string">&#39;Hello World&#39;</span></span>
<span class="line"><span class="token comment"># 输出结果P3=$PID，成对出现相当于拼接字符串</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&#39;P3=&#39;</span>&#39;<span class="token variable">$PID</span>&#39; </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>获取字符串长度</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 获取字符串长度 </span></span>
<span class="line"><span class="token variable">\${<span class="token operator">#</span>变量名}</span></span>
<span class="line"><span class="token variable">\${<span class="token operator">#</span>变量名<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span></span>
<span class="line"><span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;zs&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>name}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>截取字符串</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 索引是从0开始，string字符串第二个字符开始，截取4个字符</span></span>
<span class="line"><span class="token assign-left variable">string</span><span class="token operator">=</span><span class="token string">&quot;runoob is a great site&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">\${string<span class="token operator">:</span>1<span class="token operator">:</span>4}</span> <span class="token comment"># 输出 unoo</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>查找子字符串</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查找字符 i 或 o 的位置(哪个字母先出现就计算哪个，从1开始计算)</span></span>
<span class="line"><span class="token assign-left variable">string</span><span class="token operator">=</span><span class="token string">&quot;runoob is a great site&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> index <span class="token string">&quot;<span class="token variable">$string</span>&quot;</span> io<span class="token variable">\`</span></span>  <span class="token comment"># 输出 4</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="整数变量" tabindex="-1"><a class="header-anchor" href="#整数变量"><span>整数变量</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">declare</span> <span class="token parameter variable">-i</span> <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">42</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="数组变量" tabindex="-1"><a class="header-anchor" href="#数组变量"><span>数组变量</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> associative_array</span>
<span class="line">associative_array<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;John&quot;</span></span>
<span class="line">associative_array<span class="token punctuation">[</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">30</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 单独定义数组的各个分量 </span></span>
<span class="line">array_name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>value0</span>
<span class="line">array_name<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>value1</span>
<span class="line">array_name<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token operator">=</span>valuen</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>读取数组</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token variable">\${数组名<span class="token punctuation">[</span>下标<span class="token punctuation">]</span>}</span></span>
<span class="line"><span class="token variable">\${array_name<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用@获取数组所有元素</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">\${array_name<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 取得数组元素的个数</span></span>
<span class="line"><span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span></span>
<span class="line"><span class="token comment"># 或者</span></span>
<span class="line"><span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span></span>
<span class="line"><span class="token comment"># 取得数组单个元素的长度</span></span>
<span class="line"><span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>n<span class="token punctuation">]</span>}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h4><p>由操作系统或用户设置的特殊变量，用于配置 Shell 的行为和影响其执行环境。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">echo</span> $变量名</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">$JAVA_HOME</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="特殊变量" tabindex="-1"><a class="header-anchor" href="#特殊变量"><span>特殊变量</span></a></h4><p>有一些特殊变量在 Shell 中具有特殊含义，例如 $0 表示脚本的名称，$1, $2, 等表示脚本的参数。</p><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符"><span>运算符</span></a></h2><h3 id="算数运算符" tabindex="-1"><a class="header-anchor" href="#算数运算符"><span>算数运算符</span></a></h3><p>原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。 <strong>注意：</strong> ==表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2；== ==完整表达式需要\`\`包裹；== ==\`\`执行反引号中的命令并将输出结果替换为命令输出。==</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> <span class="token number">2</span> + <span class="token number">2</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;两数之和为 : <span class="token variable">$val</span>&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/492894b7369247679a45e62301e9aaf3.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="关系运算符" tabindex="-1"><a class="header-anchor" href="#关系运算符"><span>关系运算符</span></a></h3><p>关系运算符只支持数字，不支持字符串，除非字符串的值是数字。 <img src="http://47.101.155.205/5aa0d4cfe955418e928a605938b5ae3f.png" alt="在这里插入图片描述" loading="lazy"></p><h3 id="布尔运算符" tabindex="-1"><a class="header-anchor" href="#布尔运算符"><span>布尔运算符</span></a></h3><figure><img src="http://47.101.155.205/b6a9a643c1fc4ac4b306988905e04309.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符"><span>逻辑运算符</span></a></h3><figure><img src="http://47.101.155.205/f019d830ec2f4bf2ab11bb1381b0d745.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="字符串运算符" tabindex="-1"><a class="header-anchor" href="#字符串运算符"><span>字符串运算符</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># -n 对变量字符串长度校验加引号,否则 TEMP=&quot;&quot; [ -n \${TEMP} ]结果为true</span></span>
<span class="line"><span class="token assign-left variable">TEMP</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">$TEMP</span> <span class="token punctuation">]</span> <span class="token comment"># 结果true</span></span>
<span class="line"><span class="token comment"># 正确写法</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$TEMP</span>&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 结果false</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># = 比较注意,比较的变量没有被定义或定义为空字符串,比较会失效,提示[: =: 期待一元表达式</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token operator">=</span> <span class="token variable">$b</span> <span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># 正确写法</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$a</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">$b</span>&quot;</span> <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://47.101.155.205/980f6465f02a4854bbb31d4c76eeff46.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="文件测试运算符" tabindex="-1"><a class="header-anchor" href="#文件测试运算符"><span>文件测试运算符</span></a></h3><figure><img src="http://47.101.155.205/cecf2d5e31e649afa93941d590b2930e.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h2 id="流程语句" tabindex="-1"><a class="header-anchor" href="#流程语句"><span>流程语句</span></a></h2><h3 id="if流程" tabindex="-1"><a class="header-anchor" href="#if流程"><span>if流程</span></a></h3><h4 id="if" tabindex="-1"><a class="header-anchor" href="#if"><span>if</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token keyword">if</span> condition</span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">    command1 </span>
<span class="line">    command2</span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    commandN </span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">cygwin</span><span class="token operator">=</span>false</span>
<span class="line"><span class="token assign-left variable">darwin</span><span class="token operator">=</span>false</span>
<span class="line"><span class="token assign-left variable">os400</span><span class="token operator">=</span>false</span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;CYGWINCYGWIN&quot;</span> <span class="token keyword">in</span></span>
<span class="line">CYGWIN*<span class="token punctuation">)</span> <span class="token assign-left variable">cygwin</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">Darwin*<span class="token punctuation">)</span> <span class="token assign-left variable">darwin</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">OS400*<span class="token punctuation">)</span> <span class="token assign-left variable">os400</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">*<span class="token punctuation">)</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token variable">$cygwin</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;cygwin true&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 结果cygwin true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else"><span>if-else</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token keyword">if</span> condition</span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">    command1 </span>
<span class="line">    command2</span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    commandN</span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token builtin class-name">command</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="if-else-if-else" tabindex="-1"><a class="header-anchor" href="#if-else-if-else"><span>if else-if else</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token keyword">if</span> condition1</span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">    command1</span>
<span class="line"><span class="token keyword">elif</span> condition2 </span>
<span class="line"><span class="token keyword">then</span> </span>
<span class="line">    command2</span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    commandN</span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="case" tabindex="-1"><a class="header-anchor" href="#case"><span>case</span></a></h3><p>类似其他编程语言的switch语句。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 语法</span></span>
<span class="line"><span class="token comment"># expression 待匹配的值(变量、命令的输出)</span></span>
<span class="line"><span class="token comment"># pattern1,pattern2... 匹配值,可以是字符串、正则表达式</span></span>
<span class="line"><span class="token comment"># statements1,statements2... 匹配成功待执行的命令</span></span>
<span class="line"><span class="token comment"># *表示默认匹配模式</span></span>
<span class="line"><span class="token keyword">case</span> expression <span class="token keyword">in</span></span>
<span class="line">    pattern1<span class="token punctuation">)</span></span>
<span class="line">        statements1</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    pattern2<span class="token punctuation">)</span></span>
<span class="line">        statements2</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    patternN<span class="token punctuation">)</span></span>
<span class="line">        statementsN</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    *<span class="token punctuation">)</span></span>
<span class="line">        default_statements</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环"><span>for循环</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> item1 item2 <span class="token punctuation">..</span>. itemN</span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">    command1</span>
<span class="line">    command2</span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    commandN</span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环"><span>while循环</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token keyword">while</span> condition</span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">    <span class="token builtin class-name">command</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token assign-left variable">int</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line"><span class="token keyword">while</span><span class="token variable"><span class="token punctuation">((</span> $int<span class="token operator">&lt;=</span><span class="token number">5</span> <span class="token punctuation">))</span></span></span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token variable">$int</span></span>
<span class="line">    <span class="token builtin class-name">let</span> <span class="token string">&quot;int++&quot;</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># :表示启用getopts的错误处理模式,如果遇到未知选项,opt的值会变成?,而不是输出错误信息</span></span>
<span class="line"><span class="token comment"># m:表示该选项需要一个参数,-m选项之后必须跟一个值</span></span>
<span class="line"><span class="token comment"># $OPTARG表示后面跟的值</span></span>
<span class="line"><span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">&quot;:m:f:s:c:p:&quot;</span> opt</span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token variable">$opt</span> <span class="token keyword">in</span></span>
<span class="line">        m<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        f<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        s<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        c<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        p<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        ?<span class="token punctuation">)</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Unknown parameter&quot;</span></span>
<span class="line">        <span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">esac</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2><p>参数返回，可以显示加：return 返回值，如果不加，将以最后一条命令运行结果，作为返回值。 return 后跟数值 n(0-255)。 函数返回值在调用该函数后通过<code>$?</code>来获得。 注意： 所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至shell解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。 <strong>调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mtext>表示第二个。</mtext><mo>∗</mo><mo>∗</mo><mo>∗</mo><mo>∗</mo><mi mathvariant="normal">$</mi><mn>10</mn><mtext>不能获取第十个参数，获取第十个参数需要</mtext></mrow><annotation encoding="application/x-tex">2表示第二个。** **\\$10 不能获取第十个参数，获取第十个参数需要</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">2</span><span class="mord cjk_fallback">表示第二个。</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4653em;"></span><span class="mord">∗</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">∗</span><span class="mord">$10</span><span class="mord cjk_fallback">不能获取第十个参数，获取第十个参数需要</span></span></span></span>{10}。当n&gt;=10时，需要使用\${n}来获取参数。</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 定义函数语法</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token keyword">function</span> <span class="token punctuation">]</span> funname <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">{</span>	</span>
<span class="line">	<span class="token comment"># $1使用函数的实参</span></span>
<span class="line">    action<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">[</span>return int<span class="token punctuation">;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><figure><img src="http://47.101.155.205/4e67f033103340e88631174fe54f50c8.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>函数返回值注意：<strong>0表示true；非0代表false</strong>。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">COMMAND</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line"><span class="token comment"># 脚本执行第一个参数不为空</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$COMMAND</span>&quot;</span> <span class="token punctuation">]</span> </span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token variable">$COMMAND</span></span>
<span class="line"> <span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">checkRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token assign-left variable">COMMAND</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">  <span class="token comment"># 参数为nginx</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$COMMAND</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;nginx&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/nginx: *master/{print $2; exit}&#39;</span><span class="token variable">)</span></span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> PID <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token variable">$PID</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${COMMAND}</span> is running&quot;</span></span>
<span class="line">		<span class="token builtin class-name">return</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">else</span></span>
<span class="line">	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${COMMAND}</span> is not running&quot;</span></span>
<span class="line">	  <span class="token builtin class-name">return</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">fi</span></span>
<span class="line">  <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$COMMAND</span> <span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>COMMAND<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span></span>
<span class="line">	  <span class="token builtin class-name">echo</span> <span class="token variable">$PID</span></span>
<span class="line">	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${COMMAND}</span> is running&quot;</span></span>
<span class="line">	  <span class="token builtin class-name">return</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">else</span></span>
<span class="line">	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${COMMAND}</span> is not running&quot;</span></span>
<span class="line">	  <span class="token builtin class-name">return</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">fi</span></span>
<span class="line">  <span class="token keyword">else</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;arg is null&quot;</span></span>
<span class="line">	<span class="token builtin class-name">return</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">fi</span></span>
<span class="line">	</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">if</span> checkRunning <span class="token variable">\${COMMAND}</span></span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">&quot;true&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">&quot;false&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行shell提示：/bin/sh^M: 坏的解释器: 没有那个文件或目录</p><p>解决方法</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 执行命令</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/\\r$//&#39;</span> <span class="token operator">&lt;</span>shell.sh<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="shell命令" tabindex="-1"><a class="header-anchor" href="#shell命令"><span>shell命令</span></a></h2><h3 id="shell-1" tabindex="-1"><a class="header-anchor" href="#shell-1"><span>shell_1</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">SERVICE_NAME</span><span class="token operator">=</span><span class="token string">&quot;lgsa-portRelease-mgr&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">ENVFILE</span><span class="token operator">=</span><span class="token string">&quot;../env&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">PIDFILE</span><span class="token operator">=</span><span class="token string">&quot;pid&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">checkRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$PIDFILE</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">       <span class="token keyword">if</span>  <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $PIDFILE<span class="token variable">\`</span></span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;ERROR: Pidfile &#39;<span class="token variable">$PIDFILE</span>&#39; exists but contains no pid&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">2</span></span>
<span class="line">       <span class="token keyword">fi</span></span>
<span class="line">       <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $<span class="token punctuation">{</span>PIDFILE<span class="token punctuation">}</span><span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">       <span class="token assign-left variable">RET</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">\${PID}</span>&quot;</span><span class="token operator">|</span><span class="token function">grep</span> <span class="token function">java</span><span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">       <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$RET</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">	 <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${RET}</span>&quot;</span></span>
<span class="line">         <span class="token builtin class-name">return</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">       <span class="token keyword">else</span></span>
<span class="line">         <span class="token builtin class-name">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">       <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">         <span class="token builtin class-name">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span> checkRunning <span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">         <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $PIDFILE<span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">         <span class="token builtin class-name">echo</span> <span class="token string">&quot;&#39;<span class="token variable">$SERVICE_NAME</span>&#39; is running (pid &#39;<span class="token variable">$PID</span>&#39;)&quot;</span></span>
<span class="line">         <span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&#39;<span class="token variable">$SERVICE_NAME</span>&#39; not running&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#启动方法</span></span>
<span class="line"><span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span> checkRunning <span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">      <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $PIDFILE<span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">      <span class="token builtin class-name">echo</span> <span class="token string">&quot;INFO: Process with pid &#39;<span class="token variable">$PID</span>&#39; is already running&quot;</span></span>
<span class="line">      <span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">	<span class="token assign-left variable">ENVIRONMENT</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $<span class="token punctuation">{</span>ENVFILE<span class="token punctuation">}</span><span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">    <span class="token function">java</span> <span class="token parameter variable">-jar</span> <span class="token parameter variable">-Xms64M</span> <span class="token parameter variable">-Xmx512M</span> <span class="token parameter variable">-agentlib:jdwp</span><span class="token operator">=</span>transport<span class="token operator">=</span>dt_socket,server<span class="token operator">=</span>y,suspend<span class="token operator">=</span>n,address<span class="token operator">=</span><span class="token number">5105</span> <span class="token parameter variable">-Dspring.config.location</span><span class="token operator">=</span>config-<span class="token variable">\${SERVICE_NAME}</span>/application-<span class="token variable">\${ENVIRONMENT}</span>.yml <span class="token parameter variable">-Dlogging.config</span><span class="token operator">=</span>config-<span class="token variable">\${SERVICE_NAME}</span>/log4j2.xml  <span class="token variable">\${SERVICE_NAME}</span>-0.0.1-SNAPSHOT.jar <span class="token parameter variable">--spring.profiles.active</span><span class="token operator">=</span><span class="token variable">\${ENVIRONMENT}</span> <span class="token operator">&gt;</span> console.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token variable">$!</span> <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token variable">\${PIDFILE}</span>&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">#停止方法</span></span>
<span class="line"><span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span> checkRunning <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">       <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $<span class="token punctuation">{</span>PIDFILE<span class="token punctuation">}</span><span class="token variable">\`</span></span>&quot;</span></span>
<span class="line">       <span class="token builtin class-name">echo</span> <span class="token string">&quot;INFO: sending SIGKILL to pid &#39;<span class="token variable">$PID</span>&#39;&quot;</span></span>
<span class="line">       <span class="token function">kill</span> <span class="token parameter variable">-KILL</span> <span class="token variable">$PID</span></span>
<span class="line">       <span class="token assign-left variable">RET</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span></span>
<span class="line">       <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">\${PIDFILE}</span>&quot;</span></span>
<span class="line">       <span class="token builtin class-name">return</span> <span class="token variable">$RET</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;INFO: not running, nothing to do&quot;</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">Tasks provided by the sysv init script:</span>
<span class="line">    stop            - terminate instance in a drastic way by sending SIGKILL</span>
<span class="line">    start           - start new instance</span>
<span class="line">    restart         - stop running instance (if there is one), start new instance</span>
<span class="line">    status          - check if &#39;<span class="token variable">$SERVICE_NAME</span>&#39; process is running</span>
<span class="line">EOF</span></span>
<span class="line">  <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># show help</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line"> show_help</span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">  status<span class="token punctuation">)</span></span>
<span class="line">    status</span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  restart<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span> checkRunning <span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">      <span class="token variable">$0</span> stop</span>
<span class="line">      <span class="token builtin class-name">echo</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token variable">$0</span> start</span>
<span class="line">    <span class="token variable">$0</span> status</span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  start<span class="token punctuation">)</span></span>
<span class="line">    start</span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  stop<span class="token punctuation">)</span></span>
<span class="line">    stop</span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token variable">$?</span></span>
<span class="line">    <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">  *<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,81)]))}const o=n(l,[["render",i],["__file","shell语法.html.vue"]]),r=JSON.parse('{"path":"/linux/shell%E8%AF%AD%E6%B3%95.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"shell脚本介绍","slug":"shell脚本介绍","link":"#shell脚本介绍","children":[]},{"level":2,"title":"shell变量","slug":"shell变量","link":"#shell变量","children":[{"level":3,"title":"使用变量","slug":"使用变量","link":"#使用变量","children":[]},{"level":3,"title":"变量类型","slug":"变量类型","link":"#变量类型","children":[]}]},{"level":2,"title":"运算符","slug":"运算符","link":"#运算符","children":[{"level":3,"title":"算数运算符","slug":"算数运算符","link":"#算数运算符","children":[]},{"level":3,"title":"关系运算符","slug":"关系运算符","link":"#关系运算符","children":[]},{"level":3,"title":"布尔运算符","slug":"布尔运算符","link":"#布尔运算符","children":[]},{"level":3,"title":"逻辑运算符","slug":"逻辑运算符","link":"#逻辑运算符","children":[]},{"level":3,"title":"字符串运算符","slug":"字符串运算符","link":"#字符串运算符","children":[]},{"level":3,"title":"文件测试运算符","slug":"文件测试运算符","link":"#文件测试运算符","children":[]}]},{"level":2,"title":"流程语句","slug":"流程语句","link":"#流程语句","children":[{"level":3,"title":"if流程","slug":"if流程","link":"#if流程","children":[]},{"level":3,"title":"case","slug":"case","link":"#case","children":[]},{"level":3,"title":"for循环","slug":"for循环","link":"#for循环","children":[]},{"level":3,"title":"while循环","slug":"while循环","link":"#while循环","children":[]}]},{"level":2,"title":"函数","slug":"函数","link":"#函数","children":[]},{"level":2,"title":"shell命令","slug":"shell命令","link":"#shell命令","children":[{"level":3,"title":"shell_1","slug":"shell-1","link":"#shell-1","children":[]}]}],"git":{"updatedTime":1730110603000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":1,"url":"https://github.com/oycm"}]},"filePathRelative":"linux/shell语法.md"}');export{o as comp,r as data};
