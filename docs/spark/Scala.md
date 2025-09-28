# Scala

[Scala 官网](https://scala-lang.org/)

[菜鸟教程](https://www.runoob.com/scala/scala-tutorial.html)

Scala(Scalable Language) 是一种多范式编程语言。运行在 JVM 上：可以调用 Java 库，也可以被 Java 调用。

两大范式特点：

- 面向对象(OOP Object-Oriented Programming)：一切皆对象，和 Java 类似。
- 函数式(FP Functional Programming)：支持高阶函数，不可变数据结构、模式匹配等。



## 安装

[Scala 官网安装介绍地址](https://www.scala-lang.org/download/)

[Coursier exe 安装下载地址](https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-win32.zip)

![image-20250927210244664](http://47.101.155.205/image-20250927210244664.png)

[scala2 github 地址](https://github.com/scala/scala/)

![image-20250927153815943](http://47.101.155.205/image-20250927153815943.png)

[scala3 github 地址](https://github.com/scala/scala3)

[scala-cli github 地址](https://github.com/VirtusLab/scala-cli/)



**Coursier 安装方式: **

1. [Coursier 之间下载地址](https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-win32.zip)；[Coursier Github 地址](https://github.com/coursier/coursier)；
2. 下载解压后，双击 exe，根据命令行窗口提示配置环境变量：JAVA(`%JAVA_HOME%\bin`)、Coursier(`%USERPROFILE%\AppData\Local\Coursier\data\bin`)；

![image-20250928093557111](http://47.101.155.205/image-20250928093557111.png)

~~~bash
# 安装 scala 开发环境
cs setup

# 切换 全局 scala/scalac 版本为 2.12.20
cs install scala:2.12.20 && cs install scalac:2.12.20

# 切换 3.7.3
cs install scala:3.7.3 && cs install scalac:3.7.3

# 临时切换 scala 版本
cs launch scala:2.12.20

~~~

![image-20250928095606292](http://47.101.155.205/image-20250928095606292.png)



**解压缩安装方式：scala github 地址下载压缩包，配置环境变量(SCALA_HOME)。**





**HelloWorld**

::: tabs

@tab Scala 2

hello.scala 编写以下代码

~~~scala
object hello {
  def main(args: Array[String]): Unit = {
	println("Hello World!")
  }
}

~~~

~~~bash
scalac hello.scala
scala hello

~~~





@tab Scala 3

**scala jdk 版本有要求，3.7.3 要求 jdk 17**

~~~scala
@main
def hello(): Unit = 
 println("Hello World!")

~~~

**不支持编译后再运行模式，支持 scala run 编译+运行模式，但是需要下载依赖。**

~~~bash
scala run hello.scala

~~~

![image-20250928103324224](http://47.101.155.205/image-20250928103324224.png)

:::



## REPL

REPL(Read-Evaluate-Print-Loop) 是一个命令行解释器。

![image-20250928105254512](http://47.101.155.205/image-20250928105254512.png)







## Scala Features

**高级语言特点：**

1. 高级语言；
2. 简洁的语法；
3. 动态类型表现；
4. Expressive type system；
5. 函数式编程语言；
6. OOP：所有类型继承超类 `Any`，`Any` 的之间子类是 `AnyVal`(值类型，例如：Int 和 Boolean)和 `AnyRef`(引用类型)；
7. FP 和 OOP 结合：Scala 本质是在类型化设置中融合 FP 和 OOP；
8. 类型推断；
9. 客户端和服务端都支持；
10. 无缝与 Java 结合；
11. 丰富的库；



**Scala 生态系统：**

[Scala 开源系统列表](https://github.com/lauris/awesome-scala)

[Scala 库搜索列表](https://index.scala-lang.org/)



构建工具：

- stb：https://www.scala-sbt.org/
- gradle：



## 变量和数据类型

**两种变量类型：**

- val：创建一个不可变的变量，和 Java 的 final 一样。
- var：创建一个可变变量，当且仅当变量随着时间变化才使用。



**变量声明：**显示声明变量类型或因式声明编译器推断类型。

~~~scala
val x: Int = 1 // 显示声明
val x = 1 // 隐式声明

~~~



**内置数据类型：**在 Scala 中所有类型都是成熟的对象。

1. Boolean：true/false。
2. Byte：8-bit，-2^7~2^7-1。
3. Short：16-bit，
4. Int：32-bit，
5. Long：64-bit，隐式声明数值携带后缀 `L`。
6. Double：64-bit，隐式声明数值携带后缀 `D`。
7. Float：32-bit，隐式声明数值携带后缀 `F`。
8. BigInt：
9. BigDecimal：
10. Char：16-bit，`val c = 'c'`。
11. String：支持字符串插值；创建多行字符串方便。

Int 和 Double 是默认数字类型，`val i = 1` 和 `val i = 1.0` 分别被推断成 `Int` 和 `Double` 类型。

 

**s 插值：**字符串前面添加 `s` 允许之间在字符串中使用变量。

~~~scala
val name = "zs"
val age = 10
println(s"name $name, age $age")

// $$ 使用两个表示转义
println(s"price $$10")

// ${} 中可以嵌入任意表达式
println(s"2 + 2 = ${2 + 2}")

// 3 个 双引号创建多行文本
val multiline = """多行文本
				   继续"""
// 多行文本使用 s 插值
println(s"""name: "$name",
           |age: $age""".stripMargin)

// 3 个双引号对 双引号转义
println(s"""{"name":"James"}""")

~~~



**f 插值：**字符串前面添加 `f` 允许简单的格式化字符串，类似 printf(String format, Object ... args) 方法。会进行类型校验

~~~scala
val height = 1.8d
val name = "James"
println(f"$name%s is $height%2.2f meters tall")

~~~

