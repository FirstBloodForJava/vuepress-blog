# yaml

YAML（Yet Another Markup Language）常用来进行配置文件的编写和读取。



## 编写yaml



@tab 标量

基本数据类型

~~~yaml
# 字符串
str1: 简单字符串  # 无需引号
str2: "带空格的字符串"  # 含空格需引号，可转义特殊字符
str3: '单引号字符串'  # 不转义特殊字符
str4: |
  多行字符串
  保留换行符
str5: >
  多行字符串
  折叠成一行

# 数值
int: 42
float: 3.14

# 布尔值
flag1: true   # 或 True, TRUE
flag2: false  # 或 False, FALSE

# 空值
empty: null   # 或 Null, NULL

~~~



@tab 序列(Sequences)

~~~yaml
# 多行写法
fruits:
  - Apple
  - Banana
  - Orange

# 行内写法（JSON风格）
colors: [red, green, blue]

# 嵌套序列
matrix:
  - [1, 2]
  - [3, 4]

~~~



@tab 映射(Mappings)

~~~yaml
# 多级缩进
person:
  name: Alice
  age: 30
  address:
    city: Beijing
    street: Main St

# 行内写法
contact: { phone: "123-4567", email: alice@example.com }

~~~



@tab 特殊数据类型

~~~yaml
# 时间戳
iso8601: 2025-08-04T12:00:00+08:00  # ISO 8601格式
date: 2025-08-04  # 简单日期

# 强制类型转换
str_num: !!str 42      # 强制转为字符串
int_str: !!int "123"   # 字符串转数字

# 二进制数据
binary: !!binary |  # Base64编码
  R0lGODlhDAAMAIQAA...

~~~



@tab 其它特性

~~~yaml
# 锚点和引用
# &[name] 创建锚点; *[name] 引用锚点; << 合并键值对
defaults: &default_settings
  timeout: 30
  retry: 3

service1:
  <<: *default_settings
  timeout: 10

# 多文档支持
---  # 文档分隔符
doc1: 内容1
...
---
doc2: 内容2

# 指定集合类型
set: !!set
  ? item1
  ? item2 

# 指定类的类型
# !![类全路径名称] 显示指定数据的类型 

~~~

