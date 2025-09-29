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
6. OOP：所有类型继承超类 `Any`，`Any` 的直接子类是 `AnyVal`(值类型，例如：Int 和 Boolean)和 `AnyRef`(引用类型)；
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



**f 插值：**字符串前面添加 `f` 允许简单的格式化字符串，类似 printf(String format, Object ... args) 方法。会进行类型校验。

~~~scala
val height = 1.8d
val name = "James"
println(f"$name%s is $height%2.2f meters tall")

// %% 表示转义
println(f"$name%s is $height%2.2f meters tall, %%")

~~~



**raw 插值：**不对转义字符转义，`\n` 就是 `\n` 字符。

~~~scala
val name = "cm"
val str1 = raw"hello\n$name"
println(str1)

~~~



## 控制语句

**if/else**

::: tabs

@tab Scala 2

~~~scala
if (x < 0) {
  println("negative")
} else if (x == 0) {
  println("zero")
} else {
  println("positive")
}

// 返回值, 类似三目运算符
val x = if (a < b) { a } else { b }

~~~



@tab Scala 3

~~~scala
if x < 0 then
  println("negative")
else if x == 0 then
  println("zero")
else
  println("positive")

// 返回值, 类似三目运算符
val x = if a < b then a else b

~~~

:::



**for 循环**

::: tabs

@tab Scala 2
~~~scala
val ints = List(1, 2, 3, 4, 5)
// p <- e
for (i <- ints) println(i)

// 增加条件
for (i <- ints if i > 2)
  println(i)

// 使用多个 p <- e, 注意: () 变成 {}, 循环体增加 {}
for {
  i <- 1 to 3
  j <- 'a' to 'c'
  if i == 2
  if j == 'b'
} {
  println(s"i = $i, j = $j")   // prints: "i = 2, j = b"
}

// for yield 返回新的结果
val doubles = for (i <- ints) yield i * 2
val doubles = for (i <- ints) yield (i * 2)
val doubles = for { i <- ints } yield (i * 2)

// for if yield
val fruits = List("apple", "banana", "lime", "orange")
val fruitLengths =
  for (f <- fruits if f.length > 4) yield f.length

~~~



@tab Scala 3

~~~scala
val ints = List(1, 2, 3, 4, 5)

for i <- ints do println(i)

// 增加条件
for
  i <- ints
  if i > 2
do
  println(i)

// 使用多个 p <- e
for
  i <- 1 to 3
  j <- 'a' to 'c'
  if i == 2
  if j == 'b'
do
  println(s"i = $i, j = $j")

// for yield 返回新的结果
val doubles = for i <- ints yield i * 2
val doubles = for (i <- ints) yield i * 2
val doubles = for (i <- ints) yield (i * 2)
val doubles = for { i <- ints } yield (i * 2)

// for if yield
val fruits = List("apple", "banana", "lime", "orange")
val fruitLengths = for
  f <- fruits
  if f.length > 4
yield
  f.length

~~~

:::



**match 表达式**

::: tabs

@tab Scala 2
~~~scala
val i = 1

i match {
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")
}
// 作为表达式返回结果
val result = i match {
  case 1 => "one"
  case 2 => "two"
  case _ => "other"
}
// 其它数据类型匹配
val p = Person("Fred")
p match {
  case Person(name) if name == "Fred" =>
    println(s"$name says, Yubba dubba doo")

  case Person(name) if name == "Bam Bam" =>
    println(s"$name says, Bam bam!")

  case _ => println("Watch the Flintstones!")
}
// 作为方法体
def getClassAsString(x: Any): String = x match {
  case s: String => s"'$s' is a String"
  case i: Int => "Int"
  case d: Double => "Double"
  case l: List[_] => "List"
  case _ => "Unknown"
}
getClassAsString(1)
getClassAsString("hello")
getClassAsString(List(1, 2, 3))

~~~

@tab Scala 3

相比 Scala2，省略了 match 后的 `{}`

~~~scala
val i = 1
i match
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")
// 作为表达式返回结果
val result = i match
  case 1 => "one"
  case 2 => "two"
  case _ => "other"
// 其它数据类型匹配
val p = Person("Fred")
p match
  case Person(name) if name == "Fred" =>
    println(s"$name says, Yubba dubba doo")
  case Person(name) if name == "Bam Bam" =>
    println(s"$name says, Bam bam!")
  case _ => println("Watch the Flintstones!")
// 作为方法体
def getClassAsString(x: Matchable): String = x match
  case s: String => s"'$s' is a String"
  case i: Int => "Int"
  case d: Double => "Double"
  case l: List[?] => "List"
  case _ => "Unknown"
getClassAsString(1)
getClassAsString("hello")
getClassAsString(List(1, 2, 3))
~~~


:::



**try/catch/finally**

::: tabs

@tab Scala 2
~~~scala
try {
  writeTextToFile(text)
} catch {
  case ioe: IOException => println("Got an IOException.")
  case nfe: NumberFormatException => println("Got a NumberFormatException.")
} finally {
  println("Clean up your resources here.")
}

~~~

@tab Scala 3

相比 Scala2，省略了 match 后的 `{}`

~~~scala
try
  writeTextToFile(text)
catch
  case ioe: IOException => println("Got an IOException.")
  case nfe: NumberFormatException => println("Got a NumberFormatException.")
finally
  println("Clean up your resources here.")

~~~


:::



**while 循环**

::: tabs

@tab Scala 2
~~~scala
var x = 1

while (x < 3) {
  println(x)
  x += 1
}
~~~


@tab Scala 3
~~~scala
var x = 1

while
  x < 3
do
  println(x)
  x += 1
~~~


:::



## Domain Modeling



### OOP

OOP 主要使用 `trait` 和 `class` 关键字。

`traid`：可以用作简单的 `interface` ，但它可以包含抽象的和具体的方法和属性。

::: tabs

@tab Scala 2
~~~scala
trait Speaker {
  def speak(): String
}

trait TailWagger {
  def startTail(): Unit = println("tail is wagging")
  def stopTail(): Unit = println("tail is stopped")
}

trait Runner {
  def startRunning(): Unit = println("I’m running")
  def stopRunning(): Unit = println("Stopped running")
}


// 继承 trait
class Dog(name: String) extends Speaker with TailWagger with Runner {
  def speak(): String = "Woof!"
}

class Cat(name: String) extends Speaker with TailWagger with Runner {
  def speak(): String = "Meow"
  override def startRunning(): Unit = println("Yeah ... I don’t run")
  override def stopRunning(): Unit = println("No need to stop")
}

~~~

@tab Scala 3

~~~scala
trait Speaker:
  def speak(): String

trait TailWagger:
  def startTail(): Unit = println("tail is wagging")
  def stopTail(): Unit = println("tail is stopped")

trait Runner:
  def startRunning(): Unit = println("I’m running")
  def stopRunning(): Unit = println("Stopped running")


// 继承 trait
class Dog(name: String) extends Speaker, TailWagger, Runner:
  def speak(): String = "Woof!"

class Cat(name: String) extends Speaker, TailWagger, Runner:
  def speak(): String = "Meow"
  override def startRunning(): Unit = println("Yeah ... I don’t run")
  override def stopRunning(): Unit = println("No need to stop")

~~~


:::



`class`：

::: tabs

@tab Scala 2
~~~scala
class Person(var firstName: String, var lastName: String) {
  def printFullName() = println(s"$firstName $lastName")
}

val p = new Person("John", "Stephens")
println(p.firstName)
p.lastName = "Legend"
p.printFullName()

val p = new Person("John", "Stephens")

~~~


@tab Scala 3
~~~scala
class Person(var firstName: String, var lastName: String):
  def printFullName() = println(s"$firstName $lastName")

val p = Person("John", "Stephens")
println(p.firstName)
p.lastName = "Legend"
p.printFullName()

val p = Person("John", "Stephens")

~~~


:::



### FP

FP 编程，两个核心概念：

- 代数数据类型(ADT Algebraic Data Types) 是一种构建数据模型的方式，核心思想是使用有限的组合规则定义复杂的数据结构。两类主要组合方式：和类型(Sum Type)、积类型(Product Type)。
- 数据本身只是结构，但往往需要在数据上定义行为/功能。



**Sum Type 和类型：**一个类型有不同的情况，或关系。3 种大的类型：CrustSize、CrustType、Topping。

::: tabs

@tab Scala 2
~~~scala
sealed abstract class CrustSize
// 大小由不同的表示
object CrustSize {
  case object Small extends CrustSize
  case object Medium extends CrustSize
  case object Large extends CrustSize
}

sealed abstract class CrustType
object CrustType {
  case object Thin extends CrustType
  case object Thick extends CrustType
  case object Regular extends CrustType
}

sealed abstract class Topping
object Topping {
  case object Cheese extends Topping
  case object Pepperoni extends Topping
  case object BlackOlives extends Topping
  case object GreenOlives extends Topping
  case object Onions extends Topping
}

~~~


@tab Scala 3
~~~scala
enum CrustSize:
  case Small, Medium, Large

enum CrustType:
  case Thin, Thick, Regular

enum Topping:
  case Cheese, Pepperoni, BlackOlives, GreenOlives, Onions

~~~


:::



**Product Type 积类型：**一个类型由多个字段组合而成，与关系。Scala 中 case 对象可以用来表示单例对象，可访问但不可变的结构，也可以用 case class 表示

~~~scala
// 定义 case class
case class Person(
  name: String,
  vocation: String
)

// case 对象创建
val p = Person("Reginald Kenneth Dwight", "Singer")

// 默认的 toString 方法
p              

// 可访问，不可变
p.name           
// p.name = "Joe" 不能修改数据

// 需要更新返回一个新的对象
val p2 = p.copy(name = "Elton John")
p2               // : Person = Person(Elton John,Singer)

~~~



## 方法

class、case class、trait、enum 和 object 都可以包含方法，语法如下：

~~~scala
def methodName(param1: Type1, param2: Type2): ReturnType =
  // 方法体

def sum(a: Int, b: Int): Int = a + b
// 省略方法的返回类型
def sum(a: Int, b: Int) = a + b

// Scala 2 需要 {}, Scala 3 不需要 {}
def getStackTraceAsString(t: Throwable): String = {
  val sw = new StringWriter
  t.printStackTrace(new PrintWriter(sw))
  sw.toString
}

// 方法参数默认值, 默认值参数可以省略(应该只能在后面,或以参数名调用方法), 
def makeConnection(url: String, timeout: Int = 5000): Unit =
  println(s"url=$url, timeout=$timeout")

makeConnection("https://localhost")
// 调用方法使用参数名称
makeConnection(
  url = "https://localhost",
  timeout = 2500
)

~~~



**仅 scala 3 支持：**extension 关键字扩展方法，

~~~scala
// 定义的参数, 作为调用入口,也作为方法参数
extension (s: String)
  def makeInt(radix: Int): Int = Integer.parseInt(s, radix)

"1".makeInt(2)      // Int = 1
"10".makeInt(2)     // Int = 2
"100".makeInt(2)    // Int = 4

~~~

