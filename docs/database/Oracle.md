# Oracle

## windows安装oracle





## linux 安装oracle

官网下载地址：https://www.oracle.com/cn/database/technologies/oracle-database-software-downloads.html#19c

官网安装文档：https://docs.oracle.com/en/database/oracle/oracle-database/index.html

预加载下载地址：http://yum.oracle.com/repo/OracleLinux/OL7/latest/x86_64/getPackage/oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm

两个文件上传至linux中/root目录下

~~~bash
# oracle预安装 应该是为了安装编译器
yum -y localinstall oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm

# oracle安装命令
yum -y localinstall oracle-database-ee-19c-1.0-1.x86_64.rpm

# 初始化oracle数据库 
/etc/init.d/oracledb_ORCLCDB-19c configure

# 查看端口是否被占用
netstat -anop | grep 1521

# 查看oracle是否安装成功
ps -ef|grep oracle

# 配置oracle环境变量可以直接再root /etc/profile文件配置
export ORACLE_HOME=/opt/oracle/product/19c/dbhome_1
export ORACLE_SID=ORCLCDB
export PATH=$ORACLE_HOME/bin:$PATH
stty erase ^H #作用是支持删除按钮

# 查询oracle数据库服务名称，使用远程工具是需要用到
select global_name from global_name;

# oracle创建用户需要加上c##
create user C##sysbase identified by sysbase1024;

# 授权
grant connect,resource to c##sysbase
# 授权查询权限
grant select any table to

#创建表之后插入数据报错
alter user C##SYSBASE quota unlimited on users;

# 查询sql表名不用双引号括起来，就不区分大小写
SELECT * FROM user_file
SELECT * FROM USER_FILE


# 设置sql窗口查询展示数据格式
set pagesize 999  

~~~



## 停止oracle服务

~~~bash
su oracle
sqlplus / as sysdba

ALTER USER oracle IDENTIFIED BY oycm_system; # 提示oracle用户不存在
alter user sys identified by oycm_system;

alter user system identified by oycm_system;

passwd oracle
oycm_system
su oracle
sudo systemctl stop oracle.service # 提示没有sudo权限
visudo
# 找到root ALL(ALL) ALL 添加oracle用户权限
# 继续执行提示Failed to stop oracle.service: Unit oracle.service not loaded.

~~~



~~~bash
su oracle

sqlplus / as sysdba

shutdown

quit

# # 关闭监听服务
lsnrctl stop

~~~





## 启动oracle服务

~~~bash
su oracle
# 打开监听服务
lsnrctl start

sqlplus / as sysdba

startup



~~~





## 找回oracle用户密码

~~~bash
su oracle # 切换oracle用户

sqlplus /nolog #启动sqlplus会话

conn /as sysdba # 超级管理员 (SYSDBA) 身份登录到 Oracle 数据库

alter user system identified by oycm_system;# 修改用户system密码为oycm_system
alter user C##SYSBASE identified by oycm_system
~~~



SELECT NAME FROM V$DATABASE;获取连接的服务名



~~~bash
lsnrctl start
sqlplus /nolog
conn / as sysdba
startup nomount;
alter database mount;
alter database open;

$ORACLE_HOME/bin/dbca
~~~



## oracle的DDL

> 创建表

~~~bash

~~~





> 编辑表

~~~bash
alter table <table_name> add <table_column> <date_type>; # 给表添加新的一列


~~~



> 删除表

~~~bash
drop table <table_name>; # 删除表table_name

drop table <table_name> cascade constraints; # 不管外键约束删除表

~~~

如果RECYCLEBIN初始化设置的是ON，删除的表会放在回收站表(recyclebin)里面，使用flashback命令可以回滚删除的表

~~~sql
select * from recyclebin; # 查询回收站

flashback table <table_name> to before drop # 恢复被意外删除的表

~~~





## oracle数据字典

~~~sql
select * from user_tables;
~~~

| 表名称      | 表信息                                            | 列数 |
| ----------- | ------------------------------------------------- | ---- |
| USER_TABLES | 当前用户（登录用户）拥有的所有表的信息            | 83   |
| ALL_TABLES  | 当前用户以及用户有访问权限的其他所有表的信息      | 84   |
| DBA_TABLES  | 数据库中所有表的信息，需要具有DBA权限才能查询该表 | 84   |



| 表名称           | 表的列信息                                      | 列数 |
| ---------------- | ----------------------------------------------- | ---- |
| USER_TAB_COLUMNS | 前用户拥有的所有表的列信息                      | 36   |
| ALL_TAB_COLUMNS  | 用户有访问权限的其他所有表的列信息              | 37   |
| DBA_TAB_COLUMNS  | 数据库中所有表的列信息，需要具有DBA权限才能查询 | 38   |



~~~sql
SELECT * FROM USER_TAB_COLUMNS WHERE table_name = 'EMPLOYEES_DEMO';

SELECT COLUMN_NAME
FROM USER_CONS_COLUMNS
WHERE CONSTRAINT_NAME = (
    SELECT CONSTRAINT_NAME
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'USER_FILE'
        AND CONSTRAINT_TYPE = 'P'
);

~~~







## 测试VPD

~~~sql
conn C##SYSBASE/sysbase1024;

-- 创建函数 fun_name age 小于19为true
create or replace function fun_name (fun_scheme  varchar2,fun_object  varchar2)
	return varchar2 as fun_age varchar2(20);
	begin
	fun_age:='age<19';
	return(fun_age);
	end fun_name;
/

-- 创建函数 fun_phone 大于19为true
create or replace function fun_phone (fun_scheme varchar2,fun_object varchar2)
	return varchar2 as fun_age varchar2(20);
	begin
	fun_age:='cost>18';
	return(fun_age);
	end fun_phone;
/

-- 过滤策略
begin
dbms_rls.add_policy(
	object_schema => 'sysbase',
  	object_name => 'user_file',
  	policy_name => 'filter_name',
  	policy_function => 'fun_name',
  	sec_relevant_cols => 'name');
end;
/
-- 错误
ERROR at line 1:
ORA-00942: table or view does not exist
ORA-06512: at "SYS.DBMS_RLS", line 20
ORA-06512: at line 2
-- 错误

-- 过滤策略 应用于sysbase用户，user_file表，过滤策略名filter_phone,过滤函数明fun_phone,触发栏位是phone
begin
dbms_rls.add_policy(
  object_schema => 'sysbase',
  object_name => 'user_file',
  policy_name => 'filter_phone',
  policy_function => 'fun_phone',
  sec_relevant_cols => 'phone');
end;
/
~~~



## 语法

### 插入clob数据

insert插入clob数据sql写法：

~~~sql
TO_CLOB('some large string')

~~~

