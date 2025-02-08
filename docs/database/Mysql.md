# MySQL
## 1.数据库介绍

### 数据库的分类

- 关系型数据库：SQL

  - MySQL、Oracle、Sql Server、DB2、SQLlite

  - 通过表的行和列直接的关系储存数据

- 非关系型数据库：NoSQL Not only

  - Redis、MongDB

  - 对象储存，通过对象的自身属性来决定

学习数据库就是学习sql语句。

~~~md
DQL（数据查询语言Data Query Language）查询语句select
DML（数据操作语言 Data Manipulation Language）insert delete update 表的数据进行增删改
DDL（数据定义语言Data Definition Language）create drop alter 对表结构进行增删改
TCL（事务控制语言Transaction Control Language）comit提交事务 rollback回滚事务transaction
DCL（数据控制语言Data Control Language）grant授权 revoke撤销权限

~~~





### 解压安装方式

1. 解压文件

2. 配置环境变量，bin目录

3. ~~~ini
   # 新建MySQL配置文件my.ini 
   [mysqld]
   basedir=mysql文件C:\Program Files\MySQL\MySQL Server 5.5\
   datadir=C:\Program Files\MySQL\MySQL Server 5.5\data\
   port=3306
   skip-grant-tables
   
   ~~~

4. 执行命令：mysqld --initialize-insecure --user=mysql

5. 启动mysql：mysql - u root -p

6. ~~~bash
   # 进入界面修改root密码
   update mysql.user set authentication_string=password('123456') where user='root' and Host= 'localhost';
   
   ~~~

7. 输入 flush privileges;刷新

8. 最后在my.ini文件中删除skip-grant-tables



### MySQL的命令介绍

建表语句(sql数据库都有的)：

~~~sql
create table 'student'('id'  int(10) not null ,'name'  varchar(10) not null ,'age'  int(3) not null ,primary key ('id'));

~~~

MySQL命令

~~~Mysql
show databases;
show tables;
use mysql;
descibe student;
create database mydata;
show tables from 库名;
快速导入数据
mysql> source D:\JavaSE\MySQL\resources\bjpowernode.sql
show create table emp;查询emp表的创建语句

~~~



### 数据库表列的类型

数值：

~~~md
tinyint		1个字节;
smallint	2个字节;
mediumint	3个字节;
int			4个字节;
bigint		8个字节;
float		4个字节;
double		8个字节;
decimal		字符型形式的int类型;

~~~



字符串：

~~~md
char		固定大小0~255;
varchar		可变长字符串0~65535;
tinytext	微型文本 2^8-1;
text		文本串	  2^16-1;

~~~



时间日期：

| 日期类型  | 日期格式            | 占用空间 |
| --------- | ------------------- | -------- |
| datetime  | YYYY-MM-DD HH:MM:ss | 8bytes   |
| timestamp | YYYY-MM-DD HH:MM:ss | 4bytes   |
| date      | YYYY-MM-DD          | 4bytes   |
| time      | HH:MM:ss            | 3bytes   |
| year      | YYYY                | 1bytes   |



null：

~~~
没有值
null运算结果也为null
~~~



### 表字段的属性

Unsigned：

- 无符号整数，声明不能为负数



zerofill：

- 0填充，不足用0来填充位数



自增auto_increment：

- 数字才能自增，通常是数字自增1
- 可以自定义设计增长的数值



not null：

- 添加数据不给值，会报错。



默认值：

不指定该值，默认为声明值。



**表的设计需要的字段** 

| id         | 主键     |
| ---------- | -------- |
| `version`  | 乐观锁   |
| is_delete  | 伪删除   |
| gmt_create | 创建时间 |
| gmt_update | 修改时间 |



## 2.操作数据库(DDL)

### 创建数据库

~~~sql
create database 库名;

~~~

### 删除数据库

~~~sql
drop database if exists 库名;

~~~



### 使用数据库

~~~sql
use 库名;

~~~









### 创建数据表

创建一个school数据库，里面有个学生表student

有学号id（int）、登陆密码varchar（20）、姓名、性别、出生日期、家庭住址、email

create database if not exists school;

~~~sql
create table if not exists `teststudent`(
	`id` int(4) not null auto_increment comment '学号',
    `name` varchar(20) not null default "匿名" comment '姓名',
    `pwd` varchar(18) not null default '123456' comment '密码',
    `sex` varchar(2) not null comment '性别',
    `birthday` datetime default null comment '出生日期',
    `addr` varchar(100) default null comment '住址',
    `email` varchar(20) default null comment '邮件',
    primary key(`id`)
)ENGINE=INNODB default CHARSET=utf8;

~~~

使用命令行创建表，不能使用中文;

~~~sql
create table [if not exists] 表名(
	`字段名` 列类型 [列属性] [索引] [注释],
    `字段名` 列类型 [列属性] [索引] [注释],
    
)ENGINE=INNODB default charset=utf8;

~~~

show create database 数据库名;

show create table 表名;



**字符编码** 

charset=utf8

my.ini配置字符编码

character-set-server=utf8

把default-character-set=utf8这段配置文件删除，支持中文



### 数据库引擎

| 特点         | MYISAM | INNODB        |
| ------------ | ------ | ------------- |
| 事务支持     | 不支持 | 支持          |
| 数据行锁定   | 不支持 | 支持          |
| 外键约束     | 不支持 | 支持          |
| 全文索引     | 支持   | 不支持        |
| 表空间的大小 | 较小   | 较大，约为2倍 |
|              |        |               |

各个优点

- MYISAM	节约空间，速度较快
- INNODB    安全性高，支持事物，可以多表多用户操作

修改数据库文件物理地址，再my.ini文件中

**datadir="C:/ProgramData/MySQL/MySQL Server 5.5/Data/"** 

数据库物理地址区别

![image-20220330113926805](http://47.101.155.205/MYISAM和INNODB.png)

![image-20220330114059764](http://47.101.155.205/MYISAM和INNODB2.png)



物理地址区别

- INNODB	在数据库表中只有一个*.frm文件，一级上级目录下的ib_logfile0文件
- MYISAM     对应在数据库表中有3个文件
  - *.frm	表结构的定义文件
  - *.MYD  数据文件(data)
  - *.MYI    索引文件（index)



### 修改表结构DDL

1、修改表名

~~~sql
alert table 表名 rename as 新表名
alter table teststudent rename as test_student;
~~~



2、 增加表的字段

~~~sql
alter table 表名 add 字段名 属性;
alter table test_student add salary int;
~~~

~~~sql
alter table t_student add constraint foreign key(cno) references t_class(cno);添加外键约束
~~~



3、修改表的字段（重命名，修改约束）

~~~sql
alter table 表名 modify 字段名 列属性;
alter table 表名 change 字段名 新名字 原属性;
alter table test_student change salary money int;
alter table test_student modify money bigint;
~~~



4、 删除表的字段

~~~
alter table 表名 drop 字段名;
alter table test_student drop money;
~~~



5、删除表

~~~
drop table if exists 表名;
drop table if exists test_student;
~~~







### 外键

t_student中的classno(cno)字段引用t_class的cno字段,此时t_student表叫做子表,t_class表叫做父表

创建t_class表

~~~sql
create table if not exists t_class(
	cno int not null,
    cname varchar(10) not null,
    primary key(cno)
);

~~~

创建t_student表，添加外键约束。

~~~sql
create table if not exists t_student(
	id int not null auto_increment,
    sno int not null,
    sname varchar(10) not null,
    cno int not null,
    primary key(id),
    foreign key(cno) references t_class(cno)
);

~~~

添加好了约束，只能先删除子表t_student才能删除父表t_class

先创建两个表，再添加外键的方式。

~~~sql
create table if not exists t_student(
	id int not null,
    sno int not null,
    sname varchar(10) not null,
    cno int not null,
    primary key(id)
);

~~~

~~~sql
create table if not exists t_class(
	cno int not null,
    cname varchar(10) not null,
    primary key(cno)
);

~~~

通过alter改变表的结构

~~~sql
alter table t_student add constraint foreign key(cno) references t_class(cno);

~~~

这两种方式都是改变表的结构，都是物理外键，删除，添加都麻烦，后期可以使用**程序去实现外键**





## 3.DML

DML（数据操作语言 Data Manipulation Language）insert delete update 表的数据进行增删改。



### insert

可以插入多条数据，value后面的括号加上，跟上其他的值

~~~sql
insert into 表名(字段1,字段2,字段3,字段4,...)values(值1,值2,值3,值4,...);
insert into 表名(字段1,字段2,字段3,字段4,...)values(值1,值2,值3,值4,...),(值1,值2,值3,值4,...);

~~~

~~~sql
insert into t_class(cno,cname)values(1403,"zs");
insert into t_class(cname)values("高三");
insert into t_class(cname)values("大一"),("大二");

~~~

~~~sql
insert into student(id,name,pwd,sex,birthday,addr,email)
values(1,"张三","123456","男","2000-02-28","中国","123@qq.com");
--2000-02-28 00:00:00时间选的是datatime,没有自动补全
insert into student(name,pwd,sex,birthday,addr,email)
values("张三","123456","男","2000-02-28","中国","123@qq.com");

~~~

~~~sql
insert into student(name,pwd,sex,birthday,addr,email)
values("李四","243333","男","19991124","湖南","123413@qq.com");

~~~

~~~sql
insert into student(name,pwd,sex,birthday,addr,email)
values("王五","12344","男","1892-12-21","湖南","123413@qq.com"),
("丽丽","1233","女","1999-12-30","中国","11111@qq.com");

~~~

~~~sql
insert into student(id,name,pwd,sex,birthday,addr,email)
values(10,"小红","1123","女","19991023","china","1234433@qq.com"),
(11,"丽丽","1233","女","1999-12-30","中国","11111@qq.com");

~~~





### update

~~~sql
update 表名 set 列名=新值,列名=新值... where 条件;

~~~

where条件between and、and、or,set中设置的值可以为变量current_data

~~~sql
update student set name="王八蛋" where name="张三";

~~~

~~~sql
update student set name = "张三" where name="王八蛋" and id=1;

~~~

~~~sql
update student set sex="男" where id between 2 and 5;

~~~

~~~sql
update student set birthday=current_date where id = 12;
update student set birthday=concat(current_date," ",current_time) where id =2;改成当前时间
update student set birthday=concat(current_date," ",current_time),pwd="123455",addr="中国湖南省" where id =2;

~~~





### delete

~~~sql
delete from 表名 where 条件;
drop table if exists table_name;

~~~

清空表

~~~sql
truncate table 表名;

~~~



delete和truncate

相同点：都能删除数据，都不会删除表结构

不同点：

- truncate会重新设置自增
- truncate不会影响事物

delete删除信息，重启数据库，现象

- InnoDB自增从0开始
- MyISAM继续从上一个自增开始



## 4.DQL

DQL（数据查询语言Data Query Language）查询语句select。

查询语句基本语法
~~~sql
select 字段 from 表
~~~



`别名`：查询表的字段使用其它名称替代结果的列名。

~~~SQL
select empno 员工编号,ename 员工姓名 from emp;
SELECT EMPNO AS 员工编号,ENAME AS 员工姓名 FROM EMP;

~~~

`函数`：在查询的结果中或条件中使用函数，函数的参数可以是字段，也可以是指定的固定值。

CONCAT(a,b,...)：是将里面的所查到的内容拼接，拼接其它字符串需要加引号。

~~~sql
select empno as 员工编号,concat(empno,ename,job) 编号姓名 from emp;
select empno,empno,concat("姓名：",ename) from emp;

~~~

`distinct`：去重结果集

~~~sql
-- 查询是领导人的编号
select distinct mgr 领导人编号 from emp;

~~~

`查询当前系统版本`：select调用函数

~~~sql
select version();

~~~

`查询计算结果`：

~~~sql
select 30*1-2 as 计算结果;

~~~

`查询当前时间(日期)`：select调用日期函数

~~~sql
select current_date AS 当前日期; 
select current_time AS 当前时间;
select concat(current_date," ",current_time) AS 时间;

~~~

`查询结果改变`：运算查询

~~~sql
select ename as 员工姓名,sal+1000 AS 员工薪水涨1000 from emp;

~~~

select 表达式 from 表

- 表达式：文本值、列、null、函数、计算表达式、系统变量...



### 运算符

| 运算符          | 语法                     | 描述                         |
| --------------- | ------------------------ | ---------------------------- |
| is null         | 字段 is null             |                              |
| is not null     | 字段 is not null         |                              |
| between A and B | 字段 between 值 and 值   |                              |
| like            | 字段 like 值             | %表0~任意字符，_表示一个字符 |
| in              | 字段 in(值1,值2,值3,...) |                              |



### 模糊查询

| 通配符    | 作用                     |
| --------- | ------------------------ |
| %         | 0个或者多个字符          |
| _         | 替代一个字符             |
| [abcdef]  | 字符中的任何单一字符     |
| [^abcdef] | 不在字符中的任何单一字符 |

MySQL只支持前两项

~~~sql
select * from emp where ename like "J%";
select * from emp where ename in("jones","james");不区分大小写
select * from emp where comm is not null;
select * from emp where comm is null;
~~~

~~~sql
select * from emp where sal>=1000 and sal <= 3000;
select * from emp where sal between 1000 and 3000;
select * from emp where not sal = 800;
~~~



### REGEXP正则查询

~~~bash
select * from app_user where name regexp "^用户" limit 20,10;
~~~

![image-20220926104150159](http://47.101.155.205/image-20220926104150159.png)



~~~bash
SELECT
  A.OrderDate,
  (
    SELECT SUM (B.AMOUNT)
    FROM  ADD_NUM B
    WHERE    B.OrderDate <= A.OrderDate
  ) Amount
FROM  ADD_NUM A
select a.id ID,(select sum(b.score) from student b where b.id <= a.id) SUM_SCORE from student a;

select *,dense_rank() over (order by score desc) as RANK from student;
~~~



### in、not in查询

~~~sql
select count(*) from app_user where name not in (select name from app_user where id < 10);
-- 在id为1，name字段为空字符串的情况下，查询的结果为999991，总数1000000
-- 在id为1，name字段为null的情况下，查询的结果为0，总数1000000,这是因为在not in中嵌套子查询结果有一个为null，则所有的结果为null

~~~

![image-20220926110156882](http://47.101.155.205/image-20220926110156882.png)

~~~bash
select *  from app_user where name in (select name from app_user where id < 10);

~~~

![image-20220926120150928](http://47.101.155.205/image-20220926120150928.png)



### 连表查询

表 join 表 on 表的连接的语法

~~~sql
select * from emp;有14条数据
select * from dept;有4条数据
select empno,ename,sal,e.deptno,d.dname from emp AS e inner join dept AS d;
上面的sql不加where，两种表联合查询出来的结果就是14*4=56条;
select empno,ename,sal,e.deptno,d.dname from emp AS e inner join dept AS d where e.deptno=d.deptno;
这样得出的数据就是14条,不过出来的顺序是按照部门先出来
select empno,ename,sal,e.deptno,d.dname from dept AS d inner join emp AS e where e.deptno=d.deptno;
select empno,ename,sal,e.deptno,d.dname from emp AS e inner join dept AS d on e.deptno=d.deptno;
select empno,ename,sal,e.deptno,d.dname from dept AS d inner join emp AS e on e.deptno=d.deptno;
select empno,ename,sal,e.deptno,d.dname from dept AS d join emp AS e on e.deptno=d.deptno;
select empno,ename,sal,e.deptno,d.dname from dept AS d join emp AS e where e.deptno=d.deptno;
select empno,ename,sal,e.deptno from dept AS d join emp AS e;
~~~

A表 inner join B表 on 条件

表示内连接，只查询有交集的数据

左外连接,以左表为主表，右边的表捎带查询，查询不到的数据用null表示

~~~java
select e.ename AS 员工,m.ename AS 员工领导 from emp e left join emp m on e.mgr=m.empno;
~~~

右连接

~~~sql
select m.ename AS 员工,e.ename AS 员工领导,m.empno from emp e right join emp m on m.mgr=e.empno;
~~~

~~~sql
select m.ename AS 员工,e.ename AS 员工 from emp e right join emp m on e.mgr=m.empno;
是上面左连接left直接改right结果为21条数据,结论如下
是因为e.mgr领导出现了同一个人，除了没有做领导的empno找不到e.mgr还有一个是老板也返回null，使用distinct查询mgr有个null+6个不为null，说明有6个人是领导，出去领导中1人是老板，所以里面有7条是重复的e.mgr，加上最少的14=21
select m.empno,m.ename AS 员工,m.ename AS 员工 from emp e inner join emp m on e.mgr=m.empno;
查询交集，只有13条数据，6人是领导，加上7条重复
~~~

出现数据数量比主表数量多的情况下，连接出问题了，

外连连和内连接的最大区别是

- 内连接在on not true的情况下数据是0
- 外连接在on not true的情况下数据是主表的数据数量



### join连接

#### inner join == join

~~~sql
select s.id,s.cid,s.name,c.name from student s join class c on s.cid = c.id;
select s.id,s.cid,s.name,c.name from student s inner join class c on s.cid = c.id;

~~~

![image-20220926131105641](http://47.101.155.205/image-20220926131105641.png)

#### left join

~~~sql
select s.id,s.cid,s.name,c.name className from student s left join class c on s.cid = c.id;

~~~

![image-20220926131823484](http://47.101.155.205/image-20220926131823484.png)

#### right join

~~~sql
select s.id,s.cid,s.name,c.name className from class c right join student s on s.cid = c.id;

~~~

![image-20220926132109924](http://47.101.155.205/image-20220926132109924.png)



#### full outer join

~~~sql
select s.id,s.cid,s.name,c.name className from student s full outer join class c on s.cid = c.id;

~~~

`MySQL不支持full join`

#### union实现full join

~~~sql
select s.id,s.cid,s.name,c.name className from student s left join class c on s.cid = c.id
union
select s.id,s.cid,s.name,c.name className from student s right join class c on s.cid = c.id;
-- 连接两张表的查询结果，重复的不显示
~~~

![image-20220926132859311](http://47.101.155.205/image-20220926132859311.png)

~~~sql
select s.id,s.cid,s.name,c.name className from student s left join class c on s.cid = c.id
union all
select s.id,s.cid,s.name,c.name className from student s right join class c on s.cid = c.id;
#连接两张表的查询结果，显示重复
#order by只能对当前结果进行排序，不能再union前面使用order by排序

select s.id,s.cid,s.name,c.name className from student s left join class c on s.cid = c.id
union all
select s.id,s.cid,s.name,c.name className from student s right join class c on s.cid = c.id where s.id = 1;
-- 后面查询条件中的where只表示当前查询的where条件，和上面的查询无关
~~~



![image-20220926133058079](http://47.101.155.205/image-20220926133058079.png)



### 分页和排序

limit	order by	desc降 asc升

limit是sql的最后一个条件

~~~sql
select e.empno,e.ename,e.sal,e.deptno,d.dname from emp e inner join dept d on e.deptno=d.deptno order by e.deptno desc;
~~~

~~~sql
select * from emp order by sal;默认是升序
select * from emp order by sal limit 0,5;从第一条数据开始，展示后面5条数据;
select * from emp order by sal limit 1,5;从第二条数据开始，展示后面5条数据;
如果按5条数据分页，查询第二页数据;
select * from emp order by sal limit 5,5;
pagesize(n-1),pagesize表示一页展示pagesize条数据，查看第n页的数据
~~~



### 子查询和嵌套查询

#### where中使用子查询

~~~sql
-- 查询工资高于平均工资的员工所有信息
select * from emp where sal > (select avg(sal) from emp);

~~~

#### from后使用子查询

找出每个部门平均的薪水等级(每个员工的薪资等级)

~~~sql
select g.deptno,g.avg from
(select avg(sal) AS avg,deptno from emp group by deptno) as g
inner join salgrade
on g.avg between losal and hisal;

~~~

#### select后使用子查询

找出每个员工所在的部门名称,要求显示员工名和部门表

~~~sql
select e.ename,(select d.dname from dept d where e.deptno=d.deptno) as dname from emp e;

~~~

~~~sql
select ename,dname from emp e left join dept d on e.deptno=d.deptno;

~~~

使用select子查询可以不用连表



### 函数

ABS()绝对值函数

ceiling()向上取整

floor()向下取整

rand()0-1的随机数

sign()判断数的符号，负数-1，0就是0，正数1



#### 字符串

char_length()字符串长度

concat(a,b,c)拼接字符串

insert(a,i,j,b)表示替换从a串中第i个开始，往后数j用b串替代

~~~sql
select insert("我是中国人",1,3,"就是一个人")
~~~

lower()字符串中的大写字符小写

upper()字符串中的小写字符大写

instr("abcdefijk","fi")5返回字符串的索引

replace("abcdefghijklmn","cdef","ab")查询到的子串替换成新串

substr("",i,j)截取字符串，重i开始截取数量j

reverse("猪是念来过倒");反转

mid("字符串"，start_index,length),截取字符串



#### 时间

current_date()当前时间年月日YY-MM-DD

current_time()hh:mm:ss

now()YY-MM-DD hh:mm:ss

localtime()本地时间

sysdate()系统时间

year(now())

month(now())

day(now())

hour(now())

minute(now())

second(now())



#### 系统

system_user()系统用户

user()

version()



#### 聚合

count(字段)统计字段中的数据，忽略null值，字段是主键速度最优

count(*)不会忽略null

count(1)不会忽略null 没有主键优先

sum()求总和

avg()平均

max()最高

min()最低



#### 分组函数

group by 字段 

group by 字段 having 条件

出现在where后面

~~~sql
select sum(sal) from emp where true group by deptno having true ;
select sum(sal) from emp group by deptno having true where true;语法错误，where出现在group后面
~~~

~~~sql
select []
from []
join []
on []
where []
group by []
having []
order by []
limit[]
~~~



### exists

~~~sql
-- exists运算用来判断查询子句是否有记录，如果有一条记录或多条记录则返回true，否则fasle;

~~~

![image-20220926165631291](http://47.101.155.205/image-20220926165631291.png)



### select into

~~~sql
select s.id,s.cid,s.name,c.name className from student s join class c on s.cid = c.id;

create table new_table
as
select s.id,s.cid,s.name,c.name className from student s join class c on s.cid = c.id;
-- 将查询的数据列作为new_table的，并且将数据插入的新表中，新建了一个没有主键的表。
-- 如果new_table存在，将会报错，提示这张表已经存在。

-- 只复制表的结构
craete table new_table like old_table #只复制old_table结构，会创建主键
create table new_table as select * from old_table where 1 = 2; #这种方式不会创建主键

~~~

![image-20220926135130041](http://47.101.155.205/image-20220926135130041.png)



### insert into select

~~~sql
insert into new_table select s.id,s.cid,s.name,c.name className from student s join class c on s.cid = c.id;
-- 将查询到的数据插入已经存在的表中,new_table必须存在，不存在报错。
-- 表中的主键必须在查询中存在，如果没有，设置自增也不会自增
insert into new_table(cid,name,className)
select s.cid,s.name,c.name className from student s join class c on s.cid = c.id;
-- 可以通过插入数据对于列的方式实现主键自增，但是主键自增不是连续的

~~~

![image-20220926141317103](http://47.101.155.205/image-20220926141317103.png)



### 员工打卡时间统计

![image-20220926201427991](http://47.101.155.205/image-20220926201427991.png)

~~~sql
select no,date_format(time,'%Y-%m-%d') day,date_format(time,'%H:%i') time from emp 
# 先获取时间
select a.no,a.day day,min(a.time) time from 
(select no,date_format(time,'%Y-%m-%d') day,date_format(time,'%H:%i') time from emp) a
where a.time between '08:00' and '18:00'
group by a.no,a.day
union 
select b.no,b.day day,min(b.time) time from
(select no,date_format(time,'%Y-%m-%d') day,date_format(time,'%H:%i') time from emp) b 
where b.time between '17:30' and '18:00'
group by b.no,b.day
order by day,time
-- 缺点，没有统计超出打卡时间范围的人

~~~



### 排序

![image-20220926203901875](http://47.101.155.205/image-20220926203901875.png)

~~~sql
set @rank = 0,@prev = null;
select id,score,
case
	when @prev = score then
		@rank
	when @prev := score then
		@rank := @rank + 1
	end rank
from student
order by score desc,id 

~~~



## 5.事务(TCL)

事务原则ACID：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）

- A（原子性）事务时最小的工作单元，不可再分
- C（一致性）事务必须保证多条DML语句同时成功或者失败
- I（隔离性）事务A和事务B之间
- D（持久性）说的是最终数据必须持久化到硬盘中，事务才算成功.

~~~bash
mysql> show variables like 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | ON    |
+---------------+-------+
1 row in set (0.00 sec)
# 查询当前事务是否自动提交；

~~~

~~~bash
# 查询字符编码
show variables like "char%";

~~~



**只有DML语句才支持事务insert delete update** 

~~~md
事务隔离性存在隔离级别,理论上隔离级别包括4个:
			第一级别:读未提交(read uncommitted)
				对方事务还没有提交,当前事务可以读取到对方未提交的数据
				读未提交存在脏读(Dirty Read)现象:表示读了脏的数据(不稳定的数据)断电,rollback
			第二级别:读已提交(read committed)
				对方事务提交之后的数据我方可以读取到
				这种隔离级别解决了:脏读现象没有了
				读已提交存在的问题:不可重复读取
			第三级别:可重复读(repeatable read)
				这个隔离级别解决了:不可重复读取
				这种隔离级别存在的问题是:读取到的数据是幻象
			第四级别:序列化读/串行化读serializable
				解决了所有问题
				效率低.事务需要排队

			oracle数据的默认的隔离级别是:读已提交
			mySQL数据库的默认隔离级别是:可重复读
set global transaction isolation level 隔离级别;
查询隔离级别
get global transaction isolation;

~~~

### MySQL演示可重复读思路

~~~sql
--1、首先打开两个dos窗口，使用相同的数据库
--2、在两个表开始事务之前，插入数据，并且都查询下结果
--3、两个窗口都设置set autocommit=0，然后start transaction;
--4、第一个窗口可以插入几条数据，然后commit;第二个窗口直接一直查询，可以看到数据和开始事务之前的数据一样
即出现了可重复读的现象
~~~

![image-20220401170101050](http://47.101.155.205/可重复读.png)

在插入数据的时候，都共用了自增的内存，当出现unique索引，而且这个内容被其他事务的占用，没有提交事务，这个事务会排队，直到占用的事务结束。事务之间的隔离级别会影响select语句的结果



set autocommit=0关闭自动提交事务

set autocommit=1开启自动提交事务



创建一个新表

~~~sql
create table account(
	id int auto_increment,
    name varchar(20) not null unique,
    money decimal,
    primary key(id)
)
~~~

插入两条数据

~~~sql
insert into account(name,money)values("zs",1000);
insert into account(name,money)values("ls",800);

~~~

set autocommit=0;设置关闭事务自动提交

![image-20220401145937352](http://47.101.155.205/MySQL事务1.png)



~~~sql
update account set money=money-200;
insert into account(name,money)values("ww",10000);
~~~

**MySQL数据的默认的隔离级别是:可重复读** 

```sql
-- mysql8.0查询事务隔离级别
SELECT @@transaction_isolation;
```

select @@global.tx_isolation;查询当前事务的隔离性

set global transaction isolation level read uncommitted;



~~~sql
create table user(
	id int,
    name varchar(10) not null,
    primary key(id)
)
alter table user modify id int auto_increment;
insert into user(name)values("zs"),("ls"),("ww")
~~~







## 6.索引

**索引是帮助MySQL高效获取数据的数据结构。**

- 主键索引primary key，一个表只能一个字段有主键索引
- 唯一索引unique key
- 常规索引key/index 关键字设置
- 全文索引

**show index from 表名;**

**alter table 数据库.表名 add fulltext index 索引名(要加索引的字段);** 

**create index 索引名称 on 表名(字段);** 

**drop index 索引名 on 表名;** 

**explain select语句查看sql语句的执行计划** 

~~~sql
select * from app_user where name="用户999520";0.46sec没有加索引
mysql> explain select * from app_user where name="用户999520";
+----+-------------+----------+------+---------------+------+---------+------+--------+-------------+
| id | select_type | table    | type | possible_keys | key  | key_len | ref  | rows   | Extra       |
+----+-------------+----------+------+---------------+------+---------+------+--------+-------------+
|  1 | SIMPLE      | app_user | ALL  | NULL          | NULL | NULL    | NULL | 999315 | Using where |
+----+-------------+----------+------+---------------+------+---------+------+--------+-------------+
create index app_user_index_name on app_user(name);
mysql> create index app_user_index_name on app_user(name);
Query OK, 0 rows affected (4.47 sec)
Records: 0  Duplicates: 0  Warnings: 0

select * from app_user where name="用户999520";0.00sec
explain select * from app_user where name="用户999520";
mysql> explain select * from app_user where name="用户999520";
+----+-------------+----------+------+---------------------+---------------------+---------+-------+------+-
| id | select_type | table    | type | possible_keys       | key                 | key_len | ref   | rows | Extra       |
+----+-------------+----------+------+---------------------+---------------------+---------+-------+------+-
|  1 | SIMPLE      | app_user | ref  | app_user_index_name | app_user_index_name | 203     | const |    1 | Using where |
+----+-------------+----------+------+---------------------+---------------------+---------+-------+------+-

~~~





### 插入100万条数据

delimiter $$

~~~sql
delimiter $$
create function mock_data()
returns int
begin
	declare num int default 1000000;
	declare i int default 0;
	while i < num do
		insert语句;
		set i = i + 1;
	end while;
	return i;
end;
insert into table(列1,列2,列3,...)value(concat("用户",i),列2,)
~~~

~~~sql
delimiter $$
create function mock_data()
returns int
begin
	declare num int default 1000001;
	declare i int default 1;
	while i < num do
		insert into app_user(`name`,`email`,`phone`,`gender`,`password`,`age`,`create_time`)values
(concat("用户",1),concat(floor(rand()*999999999),"@qq.com"),concat("18",floor(100000000+rand()*(999999999-100000000))),floor(rand()*2),floor(rand()*999999),floor(18+rand()*42),current_timestamp);
		set i = i + 1;
	end while;
	return i;
end;
select mock_data();

~~~

![image-20220401011828690](http://47.101.155.205/dos创建MySQL函数.png)

~~~sql
delimiter //
create function mock_data()
returns int
begin
	declare num int default 1000001;
	declare i int default 1;
	while i < num do
		insert into app_user(`name`,`email`,`phone`,`gender`,`password`,`age`,`create_time`)values
(concat("用户",i),concat(floor(rand()*999999999),"@qq.com"),concat("18",floor(100000000+rand()*(999999999-100000000))),floor(rand()*2),UUID(),floor(18+rand()*42),current_timestamp);
		set i = i + 1;
	end while;
	return i;
end//
上面的代码在mysql5.5.36版本可以在dos窗口直接执行
插入数据代码
select mock_data();
delimiter//

~~~



> 查看自定义函数

~~~sql
show function status;
-- 查看函数创建的语句
show create function function_name(函数名);

~~~

> 删除自定义函数

~~~sql
-- 删除自定义函数
drop function function_name(函数名); 
~~~



~~~sql
select floor(rand()*((999999999-1)+10));

~~~

user表插入数据

~~~sql
insert into app_user(`name`,`email`,`phone`,`gender`,`password`,`age`,`create_time`)values
(concat("用户",1),concat(floor(rand()*999999999),"@qq.com"),concat("18",floor(100000000+rand()*(999999999-100000000))),floor(rand()*2),floor(rand()*999999),floor(18+rand()*42),current_timestamp)

~~~

也可以把密码改成uuid()



多了一个括号，找了半天

You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')' at line 1

~~~sql
insert into app_user(email,phone,gender,password,age,create_time)values(concat(floor(rand()*999999999)),"@qq.com"),concat("18",floor(100000000+rand()*(999999999-100000000))),floor(rand()*2),floor(rand()*999999）),floor(rand()*60),current_timestamp)
~~~

~~~sql
insert into app_user(email,create_time)values(concat(floor(rand()*999999999),"@qq.com"),current_timestamp)
~~~



创建user表

~~~sql
create table `mock`(
	`id` bigint(20) unsigned not null auto_increment,
    `name` varchar(50) default "" comment "用户姓名",
    `email` varchar(50) not null comment "用户邮箱",
    `phone` varchar(20) default "" comment "手机号",
    `gender` tinyint(4) unsigned default "0" comment "性别(0:男;1:女)",
    `password` varchar(100) not null comment "密码",
    `age` tinyint(4) default "0" comment "年龄",
    `create_time` datetime not null,
    `update_time` timestamp not null default current_timestamp on update current_timestamp,
    primary key(`id`)
)engine=innodb default charset=utf8mb4 comment "app用户表";

~~~



**我的数据库不支持下面的代码** 

~~~sql
create table `app_user`(
	`id` bigint(20) unsigned not null auto_increment,
    `name` varchar(50) default "" comment "用户姓名",
    `email` varchar(50) not null comment "用户邮箱",
    `phone` varchar(20) default "" comment "手机号",
    `gender` tinyint(4) unsigned default "0" comment "性别(0:男;1:女)",
    `password` varchar(100) not null comment "密码",
    `age` tinyint(4) default "0" comment "年龄",
    `create_time` datetime default current_timestamp,
    `update_time` timestamp not null default current_timestamp on update current_timestamp,
    primary key(`id`)
)engine=innodb default charset=utf8mb4 comment "app用户表";

~~~



### 索引原则

- 索引不是越多越好
- 不要对经常变动的数据加索引
- 小数据量不需要加索引
- 经常查询的字段可以加索引
- 查询带索引的字段不要带表达式



### 索引数据结构及算法原理

MySQL数据支持多种引擎，不同引擎使用不同的索引结构，如BTree索引，B+Tree索引，哈希索引，全文索引。



> MyISAM引擎

MyISAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址。MyISAM索引底层使用的是B+Tree索引，data域保存数据记录的地址。MyISAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的Key存在，则取出其data域的值，然后以data域的值为地址，读取相应数据记录。



> INNODB引擎

INNODB也是使用B+Tree作为索引的结构，InnoDB的数据文件本身就是索引文件。在INNODB引擎中，表数据文件就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录，索引的key就是数据表的主键，因此INNODB表数据本身就是主索引，而且INNODB表建表必须要主键的原因。

与MyISAM索引的不同是InnoDB的辅助索引data域存储相应记录主键的值而不是地址。InnoDB的所有辅助索引都引用主键作为data域。





### 索引使用策略及优化

高效使用索引的首要条件是知道什么样的查询会用到索引，这个和最左前缀原理相关。

单索引：索引只引用了单个的列。

联合索引：索引可以以一定顺序引用多个列。

查询表中有哪些索引

~~~bash
SHOW INDEX FROM table(实际的数据库表名);
#可以查看到表中可以有主索引和辅助索引
~~~

删除索引

~~~bash
ALTER TABLE table_name DROP INDEX index_name;
alter table app_user drop index index1;


DROP INDEX [indexName] ON table_name; 
drop index index1 on app_user;
drop index index2 on app_user;
drop index index3 on app_user;
drop index index4 on app_user;
drop index index6 on app_user;
~~~

添加辅助索引

~~~bash
ALTER TABLE table_name add PRIMARY KEY(col主键列名);
alter table app_user add PRIMARY KEY(id);#主键索引，表创建主键时自动创建这个是唯一索引

CREATE INDEX indexName ON table_name (column_name);#这里只能选用一个列
create index index1 on app_user(id); #在表app_user中以id列添加一个索引index1
#这样创建的索引Non——unique值是1

#唯一索引:索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。
CREATE UNIQUE INDEX indexName ON TABLE(col);
create unique index index2 on app_user(name);
alter table app_user add unique index3 (name);
alter table app_user add unique index4 (id,name);

#普通索引
ALTER TABLE table_name ADD INDEX `index_name` (col, last_name(4));
alter table app_user add index `index1` (id,name);
alter table app_user add index (name);#以列名创建索引的名称Non_unique;

#全文索引
ALTER TABLE table_name ADD FULLTEXT INDEX index_name(col);
alter table app_user add fulltext index index1(name);#提示这个表不支持全文索引

~~~



### 使用策略

> 一、全列匹配

~~~bash
EXPLAIN SELECT 语句;
#可以查看sql的执行情况
~~~

where匹配的条件进行精确匹配(指=，in)，索引可以用到。添加索引的列全部被使用到，打乱where列的条件顺序，MySQL的查询优化器会自动调整where条件顺序以匹配适合的索引。



> 二、最左前缀原理

假如一个表中加入了三个顺序的列(id，name，age)的索引(这里是使用到了联合主键，会自动创建联合索引)，查询时使用一下查询语句

~~~bash
EXPLAIN SELECT * from where id = 1 and age = 22;
#由于中间列name的条件不存在，使用最左前缀连接，因此需要对结果进行扫描过滤age(如果id为主键唯一，可以不用扫描)。如果需要使用age索引，可以怎加一个辅助索引(id,age),这时上面的查询就可以使用到索引。
#还可以使用另外一种方式，如果name的不同值数量不大，可以使用以下方式
EXPLAIN SELECT * FROM WHERE id = 1 and name in(...) and age = 22;
#这个时候之前的索引完全使用上了，但是扫描了name所包含的几条数据
~~~

在一个索引使用的where的情况下，会导致后面的索引不使用。

~~~java
explain select * from app_user where id = 4 and gender = 0 and name ='用户4';#使用了全部的索引
explain select * from app_user where id < 10 and name ='用户4' and gender = 0;#只是用id的索引
~~~





查询性能

~~~bash
SHOW PROFILES;
set profiling=1; #开启sql执行的线程状态及消耗的时间

~~~





### 索引失效情况

- 查询条件没有指定索引第一列
- 使用like查询，且通配符%出现在开头
- 使用两个范围列查询
- 查询的列含有表达式或者函数
- 



## 7.权限管理(DCL)和备份

### 权限管理

~~~sql
--创建用户
create user 用户名 identified by "密码";
create user ouy identified by "123456"

--修改当前用户密码
set password=password("新密码");

--修改指定用户密码
set password for 用户名=password("密码");
set password for oy=password("1024");

--重命名
rename user 用户名 to 新用户名;
rename user oy to oycm;

--授予全部的权限给用户--注意，没有grant权限
grant all privileges on *.* to 用户 

--查看权限
show grants for 用户;
show grants for oycm;
mysql> show grants for oycm;
mysql> show grants for oycm;
+-----------------------------------------------------------------------------------------------------------
| Grants for oycm@%                                                                                         
+-----------------------------------------------------------------------------------------------------------
| GRANT ALL PRIVILEGES ON *.* TO 'oycm'@'%' IDENTIFIED BY PASSWORD'*1054022B32CEAFA48BA111859744C8E18BA67D58' |
+-----------------------------------------------------------------------------------------------------------
show grants for root@"%";
show grants for root@localhost;

--撤销权限 哪些权限，在哪些库，给谁撤销
revoke 权限 on 库 from 用户;
revoke all privileges on *.* from oycm;

--删除用户
drop user 用户名;
drop user ou;

~~~



### MySQL数据备份

**导出数据**

- 拷贝物理文件地址
- 可视化工具手动到处
- 使用命令行导出，mysqldump
- mysqldump -h主机 用户 密码 数据库 表1表2 >导出地址

~~~sql
mysqldump -hlocalhost -uroot -p1024 school student>D:\1.sql

~~~

**导入数据**

- source sql文件地址
- mysql -u用户名 -p密码 库名<备份文件



## 8.数据库的规范设计

**数据库的设计好处：**

- 节省内存空间，避免数据冗余
- 保证数据库的完整性
- 方便开发系统



**关于数据库的设计** 

- 分析需求：分析业务和需要处理的数据库的需求
- 概要设计：设计关系图E-R表



**设计一个个人博客的数据库**

- 收集信息，分析需求
  - 用户表（用户登陆注销，用户的个人信息，写博客，创建分类）
  - 分类表（文章分类，谁创建的）
  - 文章表（文章的信息）
  - 评论表（id parent_id自连接）
  - 友情链接（链接的信息）
  - 自定义表（系统信息，某个关键的子或者字段key： value：）
  - 说说表
- 标识实体（把需求落实到每个字段）
- 表示实体之间的关系
  - 关系表



### 数据库的三大范式

#### 第一范式

原子性：任何一张表都应该有主键，各个字段的每一列不可再分

~~~
所谓第一范式（1NF）是指在关系模型中，对于添加的一个规范要求，所有的域都应该是原子性的，即数据库表的每一列都是不可分割的原子数据项，而不能是集合，数组，记录等非原子数据项。即实体中的某个属性有多个值时，必须拆分为不同的属性。在符合第一范式（1NF）表中的每个域值只能是实体的一个属性或一个属性的一部分。简而言之，第一范式就是无重复的域。
~~~



#### 第二范式

在第一范式的基础上，消除非主键属性对主键的部分函数依赖

~~~
是所有非主键字段，完全依赖主键，不能产生部分依赖。
多对多的关系
可以使用三张表，
学生和老师的关系
~~~



#### 第三范式

满足第二范式，消除传递依赖

~~~
所有非主键字段，不能产生传递依赖
学生和班级的关系，一对多
~~~

冗余和效率







## 9.JDBC

### 什么是JDBC？

JDBC(Java DataBase Connectivity)

![image-20220401214010027](http://47.101.155.205/JDBC.png)

java.sql

javax.sql

数据库驱动包mysql-connector-java-5.1.23

### 第一个JDBC

~~~java
import java.sql.*;

public class FirstJDBC
{
	public static void main(String[] args) throws ClassNotFoundException,SQLException{
	
		//1.加载驱动
		Class.forName("com.mysql.jdbc.Driver");
		
		//2.连接驱动的信息
		String url = "jdbc:mysql://localhost:3306/jdbcstudy?useUnicode=true&characterEncoding=utf8&useSSL=true";
		String username = "root";
		String password = "1024";
		
		//3.驱动连接数据库
		Connection connection = DriverManager.getConnection(url,username,password);

		//4.执行sql的对象
		Statement statement = connection.createStatement();

		//5.执行sql的结果
		String sql = "select * from t_user";

		ResultSet rs = statement.executeQuery(sql);

		
		while(rs.next()){
			//System.out.println(rs);
			System.out.println("id=" + rs.getObject("id"));
			System.out.println("loginName=" + rs.getObject("loginName"));
			System.out.println("loginPwd=" + rs.getObject("loginPwd"));
			System.out.println("realName=" + rs.getObject("realName"));
			System.out.println("=============");
		
		}

		//6.关闭连接
		rs.close();
		statement.close();
		connection.close();

	}
}
~~~

#### 1.驱动

- 加载驱动	DirverManager 

~~~java
// Driver类中静态代码块的内容
DriverManager.register(new com.jdbc.mysql.Driver());
Class.forName("com.jdbc.mysql.Driver");

~~~



#### 2.连接所需数据

1. url：
2. 用户名：
3. 密码：

~~~java
mysql:
jdbc:mysql://主机地址:端口号/数据库?参数
jdbc:mysql://localhost:3306/jdbcstudy?
oracle:
jdbc:oracle:thin:@主机地址:端口号:表
jdbc:oracle:thin:@localhost:1512:

~~~



#### 3.connection

获取连接

~~~java
connection设置事务;

~~~



#### 4.statement

Statement：执行sql

PreparedStatement：能安全执行sql

~~~java
statement.execute(String sql);
statement.executeQuery(sql);执行DQLsql，返回ResultSet结果集
statement.executeUpdate(sql);执行DMLsql,返回受影响的数据行数
statement.executeBatch()执行多条sql
~~~



Statement执行DDL语句

~~~java
package com.jdbc;

import com.jdbc.utils.JDBCUtils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Test04PreparedStatement {
    public static void main(String[] args) {
        Connection connection = JDBCUtils.getConnection();
        Statement statement = null;
        ResultSet rs = null;
        String sql = "create table student(\n" +
                "\tid int auto_increment,\n" +
                "    cno varchar(12) not null comment '学生学号',\n" +
                "    name varchar(20) not null comment '学生姓名',\n" +
                "    sex varchar(2) not null comment '0:表示男,1:表示女',\n" +
                "    reportedTime timestamp default current_timestamp comment '报到时间',\n" +
                "    addr varchar(100) not null comment '家庭地址',\n" +
                "    phone varchar(11) not null comment '学生电话号码',\n" +
                "    primary key(id)\n" +
                ")engine innodb default charset=utf8";

        try {
            statement = connection.createStatement();
            int count = statement.executeUpdate(sql);//0
            System.out.println(count);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(connection,statement,rs);
        }
    }
}

~~~





#### 5.ResultSet

ResultSet：查询结果集

~~~java
resultSet.getInt(col);
resultSet.getDouble(col);
resultSet.getDate(col);
resultSet.getFloat(col);

resultSet.next();
resultSet.beforeFirst();
resultSet.afterLast();
resultSet.previous();向前移动
resultSet.absolute(row);移动到指定行
~~~

#### 6.释放资源



~~~java
resultSet.close();
statement.close();
connection.close();
~~~



### SQL注入



~~~java
package com.jdbc;

import com.jdbc.utils.JDBCUtils;
import java.io.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Test03 {
    public static void main(String[] args) throws IOException {

        System.out.println("请输入用户名，按enter结束");
        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        BufferedReader bf = new BufferedReader(inputStreamReader);
        String username = bf.readLine();
        System.out.println("请输入密码，按enter结束");
        String password = bf.readLine();
        login(username,password);
        //用户名输入' or '1=1        ' or '1'='1    注入
        //密码输入 ' or '1=1    ' or '1'='1

    }

    public static void login(String username,String password){
        Connection connection = JDBCUtils.getConnection();
        Statement statement = null;
        ResultSet rs = null;
        String sql = "select * from t_user where loginName='"+username+"' and LoginPwd='"+password+"'";

        try {
            statement = connection.createStatement();
            rs = statement.executeQuery(sql);
            if (rs.next()){
                System.out.println("登陆成功");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(connection,statement,rs);
        }
    }
}

~~~



### PreparedStatement

能避免sql注入的问题

~~~sql
-- 建一个学生表
create table student(
	id int auto_increment,
    cno varchar(12) not null comment '学生学号',
    name varchar(20) not null comment '学生姓名',
    sex varchar(2) not null comment '0:表示男,1:表示女',
    reportedTime timestamp default current_timestamp comment '报到时间',
    addr varchar(100) not null comment '家庭地址',
    phone varchar(11) not null comment '学生电话号码',
    primary key(id)
)engine innodb default charset=utf8;

~~~

PreparedStatement插入数据

- 注意点：传递日期类，接受的Date是java.mysql.Date(传递的时间)

~~~java
package com.jdbc;

import com.jdbc.utils.JDBCUtils;

import java.sql.*;

public class Test04PreparedStatement {
    public static void main(String[] args) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet rs = null;
        String sql = "insert into student(cno,name,sex,addr,phone)values(?,?,?,?,?)";

        try {
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setString(1,"201705500110");
            preparedStatement.setString(2,"张三");
            //preparedStatement.setDate(3,new Date(new java.util.Date().getTime()));2021-04-01 00:00:00
            preparedStatement.setString(3,"0");
            preparedStatement.setString(4,"中国湖南省");
            preparedStatement.setString(5,"11144442222");

            int count = preparedStatement.executeUpdate();
            if (count > 0){
                System.out.println("插入成功");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(connection,preparedStatement,rs);
        }
    }
}

~~~



### 使用idea连接数据库

![image-20220402181119358](http://47.101.155.205/idea连接数据库1.png)



![image-20220402184154612](http://47.101.155.205/image-20220402184154612.png)

![image-20220402184447997](http://47.101.155.205/image-20220402184447997.png)

连接上没有表内容



### 数据库连接池

最小连接数

最大连接数

等待超时

写连接池实现DataSource接口



DBCP

CP30

Druid









## MD5

md5()

s护具加密？





## 补充

### 查询内存

~~~sql
select concat(round(sum(data_length/1024/1024),2),"MB") from information_schema.tables where table_schema="test";查询数据库test内存
select concat(round(data_length/1024/1024),"MB") from information_schema.tables where table_schema="test"
select concat(round(data_length),"kb") from information_schema.tables where table_schema="test"

-- 优化表
optimize table app_user;

-- round(数值，几位小数)函数

~~~







### 一条sql的执行顺序？





### 集群搭建

集群搭建成功之后，stop slave，reset slave在主节点查询从机还有延迟

#### 使用docker搭建集群

~~~bash
docker pull mysql:5.7
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=1024 mysql:5.7
docker exec -it mysql /bin/bash
docker exec -it mysql mysql -uroot -p1024 #可以直接连接容器内的mysql数据库
/etc/mysql/ #目录下存放的是mysql的配置文件，再给数据库建表之后，生效的配置文件时/etc/mysql/*.cnd来覆盖配置
/var/lib/ #目录会出现三个带有mysql的目录，数据在/var/lib/mysql中
~~~



#### 主机配置

> 主机

~~~bash
#主机授权slave服务器同步权限
grant replication slave on *.* to 'root'@'从机库ip' identified by 'oycm1234';
grant replication slave on *.* to 'root'@'106.15.234.93' identified by 'oycm1234'
revoke all on *.* from 'root'@'ip'
flush privileges;
show master status; #查询主节点状态
~~~

主机配置文件/etc/my.cnf

~~~bash
[mysqld]
#server-id要唯一
server-id=1
#开启二级制日志功能
log-bin=mysql-bin

#可选配置
#默认是0，表示读写主机。1表示只读从机
read-only=1
#表示日志文件有效时间，6000秒
binlog_expire_logs_seconds=6000
#事务内存大小
binlog_cache_size=1M
#控制单个日志文件的大小，默认和最大时1GB
max_binlog_size=200MB
#设置不需要复制的库
binlog-ingore-db=mysql
#设置需要复制的库，默认全部数据库记录
binlog-do-db=
#binlog格式(mixed,statement,row,默认statement)
binlog_format=statement
#二进制日志过期时间，默认值时0，表示不自动清理
expire_logs_days=7
#跳过复制过程遇到的错误，避免从节点端复制终端，1062指一些主键重复，1032主从数据库数据不一致
slave_skip_errors=1062
~~~

~~~bash
SELECT @@server_id;
show variables like 'server_id';
select * from information_schema.processlist as p where p.command = 'Binlog Dump';#查看master的slave
~~~

~~~bash
[mysqld]
server_id=3307
binlog-ignore-db=mysql
log-bin=mysql-bin
binlog_cache_size=1M
binlog_format=mixed
expire_logs_days=7
slave_skip_errors=1062
~~~

配置文件不能出错，出错直接不能启动

#### 从机配置

> 从机

配置在/etc/my.cnf

~~~bash
[mysqld]
server_id=3308
binlog-ignore-db=mysql
log-bin=mysql-s1-bin
binlog_cache_size=1M
binlog_format=mixed
expire_logs_days=7
slave_skip_errors=1062
relay_log=mysql-s1-relay-bin
log_slave_updates=1
read_only=1
~~~



#### docker运行容器

> docker运行主服务器容器

~~~bash
#启动一个主数据库容器
docker run -p 3307:3306 --name mysql-master \
-v /root/mysql-m1/log:/var/log/mysql \
-v /root/mysql-m1/data:/var/lib/mysql \
-v /root/mysql-m1/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=1024 \
-d mysql:5.7
#进入主数据库容器，连接服务端，执行从机授权复制
docker exec -it mysql-master /bin/bash
grant replication slave on *.* to 'root'@'106.15.234.93' identified by 'oycm1234';
flush privileges;
show master status;

grant all on *.* to 'root'@'%' identified by '密码' with grant option
~~~

![image-20220630190801735](http://47.101.155.205/image-20220630190801735.png)





> 运行从服务器容器

~~~bash
#启动一个从数据库容器
docker run -p 3308:3306 --name mysql-s1 \
-v /root/mysql-s1:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=1024 \
-d mysql:5.7

docker stop mysql-s1
#添加配置文件重启
docker restart mysql-s1
docker exec -it mysql-s1 /bin/bash

#绑定关系
change master to master_host='106.15.234.93',master_user='root',master_password='oycm1234',master_port=3307,master_log_file='mysql-bin.000004',master_log_pos=2180;

#master_password填写授权时填写的密码

start slave;

show slave status \G;
~~~

![image-20220630195236993](http://47.101.155.205/image-20220630195236993.png)



> 搭建第二个从机z

~~~bash
docker run -p 3309:3306 --name mysql-s2 \
-v /root/mysql-s2:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=1024 \
-d mysql:5.7

docker stop mysql-s2

vim /root/mysql-s2/my.cnf

[mysqld]
server_id=3309
binlog-ignore-db=mysql
log-bin=mysql-s1-bin
binlog_cache_size=1M
binlog_format=mixed
expire_logs_days=7
slave_skip_errors=1062
relay_log=mysql-s1-relay-bin
log_slave_updates=1
read_only=1

docker restart mysql-s2
docker exec -it mysql-s2 /bin/bash

mysql -uroot -p1024
change master to master_host='106.15.234.93',master_user='root',master_password='oycm1234',master_port=3307,master_log_file='mysql-bin.000003 ',master_log_pos=805;

start slave;
~~~

因为数据库是在连接一个从节点后创建的所以有一个数据库会有这个库的记录，另外一个数据库从节点只配置不复制数据库，在和主数据库建立连接之后没有把之前的数据库拷贝过来，所以导致数据缺失。才会出现连接问题。当主库删除从库没有的数据时，会导致，连接出现问题，无法实现数据同步，连接断开。








### sql优化

开启慢查询日志的两种方式

**配置文件**

~~~conf
# 日志文件路劲
log-slow-queries=/路劲
# 超时时间，默认10
long_query_time=2

~~~



**命令**

~~~bash
set global slow_query_log = on;
set global long_query_time = 10;
set global slow_query_log_file = '路径'

~~~

使用mysqldumpslow命令解析慢查询日志



## information_schema.tables

~~~sql
CREATE TEMPORARY TABLE `TABLES` (
  `TABLE_CATALOG` varchar(512) NOT NULL DEFAULT '',
  `TABLE_SCHEMA` varchar(64) NOT NULL DEFAULT '',
  `TABLE_NAME` varchar(64) NOT NULL DEFAULT '',
  `TABLE_TYPE` varchar(64) NOT NULL DEFAULT '',
  `ENGINE` varchar(64) DEFAULT NULL,
  `VERSION` bigint(21) unsigned DEFAULT NULL,
  `ROW_FORMAT` varchar(10) DEFAULT NULL,
  `TABLE_ROWS` bigint(21) unsigned DEFAULT NULL,
  `AVG_ROW_LENGTH` bigint(21) unsigned DEFAULT NULL,
  `DATA_LENGTH` bigint(21) unsigned DEFAULT NULL,
  `MAX_DATA_LENGTH` bigint(21) unsigned DEFAULT NULL,
  `INDEX_LENGTH` bigint(21) unsigned DEFAULT NULL,
  `DATA_FREE` bigint(21) unsigned DEFAULT NULL,
  `AUTO_INCREMENT` bigint(21) unsigned DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `UPDATE_TIME` datetime DEFAULT NULL,
  `CHECK_TIME` datetime DEFAULT NULL,
  `TABLE_COLLATION` varchar(32) DEFAULT NULL,
  `CHECKSUM` bigint(21) unsigned DEFAULT NULL,
  `CREATE_OPTIONS` varchar(255) DEFAULT NULL,
  `TABLE_COMMENT` varchar(2048) NOT NULL DEFAULT ''
) ENGINE=MEMORY DEFAULT CHARSET=utf8

CREATE TABLE `sysaa_file` (
  `sysaa_pk` varchar(50) NOT NULL,
  `sysaa001` varchar(255) DEFAULT NULL,
  `sysaa002` varchar(255) DEFAULT NULL,
  `sysaa003` varchar(255) DEFAULT NULL,
  `sysaa004` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sysaa_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

~~~

