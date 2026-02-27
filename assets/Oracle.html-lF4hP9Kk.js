import{_ as n,c as a,e,o as l}from"./app-BIGZvh4f.js";const p={};function i(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="oracle" tabindex="-1"><a class="header-anchor" href="#oracle"><span>Oracle</span></a></h1><h2 id="windows安装oracle" tabindex="-1"><a class="header-anchor" href="#windows安装oracle"><span>windows安装oracle</span></a></h2><h2 id="linux-安装oracle" tabindex="-1"><a class="header-anchor" href="#linux-安装oracle"><span>linux 安装oracle</span></a></h2><p>官网下载地址：https://www.oracle.com/cn/database/technologies/oracle-database-software-downloads.html#19c</p><p>官网安装文档：https://docs.oracle.com/en/database/oracle/oracle-database/index.html</p><p>预加载下载地址：http://yum.oracle.com/repo/OracleLinux/OL7/latest/x86_64/getPackage/oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm</p><p>两个文件上传至linux中/root目录下</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># oracle预安装 应该是为了安装编译器</span></span>
<span class="line">yum <span class="token parameter variable">-y</span> localinstall oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm</span>
<span class="line"></span>
<span class="line"><span class="token comment"># oracle安装命令</span></span>
<span class="line">yum <span class="token parameter variable">-y</span> localinstall oracle-database-ee-19c-1.0-1.x86_64.rpm</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 初始化oracle数据库 </span></span>
<span class="line">/etc/init.d/oracledb_ORCLCDB-19c configure</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看端口是否被占用</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-anop</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">1521</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看oracle是否安装成功</span></span>
<span class="line"><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> oracle</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置oracle环境变量可以直接再root /etc/profile文件配置</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">ORACLE_HOME</span><span class="token operator">=</span>/opt/oracle/product/19c/dbhome_1</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">ORACLE_SID</span><span class="token operator">=</span>ORCLCDB</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">$ORACLE_HOME</span>/bin:<span class="token environment constant">$PATH</span></span>
<span class="line">stty erase ^H <span class="token comment">#作用是支持删除按钮</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询oracle数据库服务名称，使用远程工具是需要用到</span></span>
<span class="line"><span class="token keyword">select</span> global_name from global_name<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># oracle创建用户需要加上c##</span></span>
<span class="line">create user C<span class="token comment">##sysbase identified by sysbase1024;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 授权</span></span>
<span class="line">grant connect,resource to c<span class="token comment">##sysbase</span></span>
<span class="line"><span class="token comment"># 授权查询权限</span></span>
<span class="line">grant <span class="token keyword">select</span> any table to</span>
<span class="line"></span>
<span class="line"><span class="token comment">#创建表之后插入数据报错</span></span>
<span class="line">alter user C<span class="token comment">##SYSBASE quota unlimited on users;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询sql表名不用双引号括起来，就不区分大小写</span></span>
<span class="line">SELECT * FROM user_file</span>
<span class="line">SELECT * FROM USER_FILE</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置sql窗口查询展示数据格式</span></span>
<span class="line"><span class="token builtin class-name">set</span> pagesize <span class="token number">999</span>  </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="停止oracle服务" tabindex="-1"><a class="header-anchor" href="#停止oracle服务"><span>停止oracle服务</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">su</span> oracle</span>
<span class="line">sqlplus / as sysdba</span>
<span class="line"></span>
<span class="line">ALTER <span class="token environment constant">USER</span> oracle IDENTIFIED BY oycm_system<span class="token punctuation">;</span> <span class="token comment"># 提示oracle用户不存在</span></span>
<span class="line">alter user sys identified by oycm_system<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">alter user system identified by oycm_system<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">passwd</span> oracle</span>
<span class="line">oycm_system</span>
<span class="line"><span class="token function">su</span> oracle</span>
<span class="line"><span class="token function">sudo</span> systemctl stop oracle.service <span class="token comment"># 提示没有sudo权限</span></span>
<span class="line">visudo</span>
<span class="line"><span class="token comment"># 找到root ALL(ALL) ALL 添加oracle用户权限</span></span>
<span class="line"><span class="token comment"># 继续执行提示Failed to stop oracle.service: Unit oracle.service not loaded.</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">su</span> oracle</span>
<span class="line"></span>
<span class="line">sqlplus / as sysdba</span>
<span class="line"></span>
<span class="line"><span class="token function">shutdown</span></span>
<span class="line"></span>
<span class="line">quit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># # 关闭监听服务</span></span>
<span class="line">lsnrctl stop</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动oracle服务" tabindex="-1"><a class="header-anchor" href="#启动oracle服务"><span>启动oracle服务</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">su</span> oracle</span>
<span class="line"><span class="token comment"># 打开监听服务</span></span>
<span class="line">lsnrctl start</span>
<span class="line"></span>
<span class="line">sqlplus / as sysdba</span>
<span class="line"></span>
<span class="line">startup</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="找回oracle用户密码" tabindex="-1"><a class="header-anchor" href="#找回oracle用户密码"><span>找回oracle用户密码</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">su</span> oracle <span class="token comment"># 切换oracle用户</span></span>
<span class="line"></span>
<span class="line">sqlplus /nolog <span class="token comment">#启动sqlplus会话</span></span>
<span class="line"></span>
<span class="line">conn /as sysdba <span class="token comment"># 超级管理员 (SYSDBA) 身份登录到 Oracle 数据库</span></span>
<span class="line"></span>
<span class="line">alter user system identified by oycm_system<span class="token punctuation">;</span><span class="token comment"># 修改用户system密码为oycm_system</span></span>
<span class="line">alter user C<span class="token comment">##SYSBASE identified by oycm_system</span></span>
<span class="line"></span></code></pre></div><p>SELECT NAME FROM V$DATABASE;获取连接的服务名</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">lsnrctl start</span>
<span class="line">sqlplus /nolog</span>
<span class="line">conn / as sysdba</span>
<span class="line">startup nomount<span class="token punctuation">;</span></span>
<span class="line">alter database <span class="token function">mount</span><span class="token punctuation">;</span></span>
<span class="line">alter database <span class="token function">open</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token variable">$ORACLE_HOME</span>/bin/dbca</span>
<span class="line"></span></code></pre></div><h2 id="oracle的ddl" tabindex="-1"><a class="header-anchor" href="#oracle的ddl"><span>oracle的DDL</span></a></h2><blockquote><p>创建表</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>编辑表</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">alter table <span class="token operator">&lt;</span>table_name<span class="token operator">&gt;</span> <span class="token function">add</span> <span class="token operator">&lt;</span>table_column<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>date_type<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment"># 给表添加新的一列</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>删除表</p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">drop table <span class="token operator">&lt;</span>table_name<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment"># 删除表table_name</span></span>
<span class="line"></span>
<span class="line">drop table <span class="token operator">&lt;</span>table_name<span class="token operator">&gt;</span> cascade constraints<span class="token punctuation">;</span> <span class="token comment"># 不管外键约束删除表</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>如果RECYCLEBIN初始化设置的是ON，删除的表会放在回收站表(recyclebin)里面，使用flashback命令可以回滚删除的表</p><div class="language-sql" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> recyclebin<span class="token punctuation">;</span> <span class="token comment"># 查询回收站</span></span>
<span class="line"></span>
<span class="line">flashback <span class="token keyword">table</span> <span class="token operator">&lt;</span>table_name<span class="token operator">&gt;</span> <span class="token keyword">to</span> before <span class="token keyword">drop</span> <span class="token comment"># 恢复被意外删除的表</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="oracle数据字典" tabindex="-1"><a class="header-anchor" href="#oracle数据字典"><span>oracle数据字典</span></a></h2><div class="language-sql" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_tables<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><table><thead><tr><th>表名称</th><th>表信息</th><th>列数</th></tr></thead><tbody><tr><td>USER_TABLES</td><td>当前用户（登录用户）拥有的所有表的信息</td><td>83</td></tr><tr><td>ALL_TABLES</td><td>当前用户以及用户有访问权限的其他所有表的信息</td><td>84</td></tr><tr><td>DBA_TABLES</td><td>数据库中所有表的信息，需要具有DBA权限才能查询该表</td><td>84</td></tr></tbody></table><table><thead><tr><th>表名称</th><th>表的列信息</th><th>列数</th></tr></thead><tbody><tr><td>USER_TAB_COLUMNS</td><td>前用户拥有的所有表的列信息</td><td>36</td></tr><tr><td>ALL_TAB_COLUMNS</td><td>用户有访问权限的其他所有表的列信息</td><td>37</td></tr><tr><td>DBA_TAB_COLUMNS</td><td>数据库中所有表的列信息，需要具有DBA权限才能查询</td><td>38</td></tr></tbody></table><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> USER_TAB_COLUMNS <span class="token keyword">WHERE</span> table_name <span class="token operator">=</span> <span class="token string">&#39;EMPLOYEES_DEMO&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> COLUMN_NAME</span>
<span class="line"><span class="token keyword">FROM</span> USER_CONS_COLUMNS</span>
<span class="line"><span class="token keyword">WHERE</span> CONSTRAINT_NAME <span class="token operator">=</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> CONSTRAINT_NAME</span>
<span class="line">    <span class="token keyword">FROM</span> USER_CONSTRAINTS</span>
<span class="line">    <span class="token keyword">WHERE</span> TABLE_NAME <span class="token operator">=</span> <span class="token string">&#39;USER_FILE&#39;</span></span>
<span class="line">        <span class="token operator">AND</span> CONSTRAINT_TYPE <span class="token operator">=</span> <span class="token string">&#39;P&#39;</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试vpd" tabindex="-1"><a class="header-anchor" href="#测试vpd"><span>测试VPD</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line">conn C<span class="token comment">##SYSBASE/sysbase1024;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建函数 fun_name age 小于19为true</span></span>
<span class="line"><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> fun_name <span class="token punctuation">(</span>fun_scheme  varchar2<span class="token punctuation">,</span>fun_object  varchar2<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> varchar2 <span class="token keyword">as</span> fun_age varchar2<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">begin</span></span>
<span class="line">	fun_age:<span class="token operator">=</span><span class="token string">&#39;age&lt;19&#39;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">return</span><span class="token punctuation">(</span>fun_age<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">end</span> fun_name<span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建函数 fun_phone 大于19为true</span></span>
<span class="line"><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> fun_phone <span class="token punctuation">(</span>fun_scheme varchar2<span class="token punctuation">,</span>fun_object varchar2<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> varchar2 <span class="token keyword">as</span> fun_age varchar2<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">begin</span></span>
<span class="line">	fun_age:<span class="token operator">=</span><span class="token string">&#39;cost&gt;18&#39;</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">return</span><span class="token punctuation">(</span>fun_age<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token keyword">end</span> fun_phone<span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 过滤策略</span></span>
<span class="line"><span class="token keyword">begin</span></span>
<span class="line">dbms_rls<span class="token punctuation">.</span>add_policy<span class="token punctuation">(</span></span>
<span class="line">	object_schema <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;sysbase&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  	object_name <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;user_file&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  	policy_name <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;filter_name&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  	policy_function <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;fun_name&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  	sec_relevant_cols <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">end</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">/</span></span>
<span class="line"><span class="token comment">-- 错误</span></span>
<span class="line">ERROR at line <span class="token number">1</span>:</span>
<span class="line">ORA<span class="token operator">-</span><span class="token number">00942</span>: <span class="token keyword">table</span> <span class="token operator">or</span> <span class="token keyword">view</span> does <span class="token operator">not</span> exist</span>
<span class="line">ORA<span class="token operator">-</span><span class="token number">06512</span>: at <span class="token string">&quot;SYS.DBMS_RLS&quot;</span><span class="token punctuation">,</span> line <span class="token number">20</span></span>
<span class="line">ORA<span class="token operator">-</span><span class="token number">06512</span>: at line <span class="token number">2</span></span>
<span class="line"><span class="token comment">-- 错误</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 过滤策略 应用于sysbase用户，user_file表，过滤策略名filter_phone,过滤函数明fun_phone,触发栏位是phone</span></span>
<span class="line"><span class="token keyword">begin</span></span>
<span class="line">dbms_rls<span class="token punctuation">.</span>add_policy<span class="token punctuation">(</span></span>
<span class="line">  object_schema <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;sysbase&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  object_name <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;user_file&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  policy_name <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;filter_phone&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  policy_function <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;fun_phone&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  sec_relevant_cols <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&#39;phone&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">end</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><h3 id="插入clob数据" tabindex="-1"><a class="header-anchor" href="#插入clob数据"><span>插入clob数据</span></a></h3><p>insert插入clob数据sql写法：</p><div class="language-sql" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line">TO_CLOB<span class="token punctuation">(</span><span class="token string">&#39;some large string&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span>索引</span></a></h2><h3 id="查询索引" tabindex="-1"><a class="header-anchor" href="#查询索引"><span>查询索引</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">    ui<span class="token punctuation">.</span>index_name<span class="token punctuation">,</span></span>
<span class="line">    ui<span class="token punctuation">.</span>index_type<span class="token punctuation">,</span></span>
<span class="line">    ui<span class="token punctuation">.</span>uniqueness<span class="token punctuation">,</span></span>
<span class="line">    uic<span class="token punctuation">.</span>column_name<span class="token punctuation">,</span></span>
<span class="line">    uic<span class="token punctuation">.</span>column_position</span>
<span class="line"><span class="token keyword">FROM</span> user_indexes ui</span>
<span class="line"><span class="token keyword">JOIN</span> user_ind_columns uic </span>
<span class="line">    <span class="token keyword">ON</span> ui<span class="token punctuation">.</span>index_name <span class="token operator">=</span> uic<span class="token punctuation">.</span>index_name</span>
<span class="line"><span class="token keyword">WHERE</span> ui<span class="token punctuation">.</span>table_name <span class="token operator">=</span> <span class="token string">&#39;table_name&#39;</span></span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> ui<span class="token punctuation">.</span>index_name<span class="token punctuation">,</span> uic<span class="token punctuation">.</span>column_position<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引"><span>创建索引</span></a></h3><p>联合索引创建逻辑：等值在前，范围在后；过滤强(高选择性)的在前，排序用的靠后。</p><p>选择性 ≈ 不重复数 / 总行数</p><ol><li>等值条件优于范围条件；</li><li>高选择性列优先</li><li></li></ol>`,44)]))}const o=n(p,[["render",i],["__file","Oracle.html.vue"]]),r=JSON.parse('{"path":"/database/Oracle.html","title":"Oracle","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"windows安装oracle","slug":"windows安装oracle","link":"#windows安装oracle","children":[]},{"level":2,"title":"linux 安装oracle","slug":"linux-安装oracle","link":"#linux-安装oracle","children":[]},{"level":2,"title":"停止oracle服务","slug":"停止oracle服务","link":"#停止oracle服务","children":[]},{"level":2,"title":"启动oracle服务","slug":"启动oracle服务","link":"#启动oracle服务","children":[]},{"level":2,"title":"找回oracle用户密码","slug":"找回oracle用户密码","link":"#找回oracle用户密码","children":[]},{"level":2,"title":"oracle的DDL","slug":"oracle的ddl","link":"#oracle的ddl","children":[]},{"level":2,"title":"oracle数据字典","slug":"oracle数据字典","link":"#oracle数据字典","children":[]},{"level":2,"title":"测试VPD","slug":"测试vpd","link":"#测试vpd","children":[]},{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[{"level":3,"title":"插入clob数据","slug":"插入clob数据","link":"#插入clob数据","children":[]}]},{"level":2,"title":"索引","slug":"索引","link":"#索引","children":[{"level":3,"title":"查询索引","slug":"查询索引","link":"#查询索引","children":[]},{"level":3,"title":"创建索引","slug":"创建索引","link":"#创建索引","children":[]}]}],"git":{"updatedTime":1769850675000,"contributors":[{"name":"oycm","username":"oycm","email":"1164864987@qq.com","commits":1,"url":"https://github.com/oycm"},{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"database/Oracle.md"}');export{o as comp,r as data};
