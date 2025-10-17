# Scala

[Scala 官网](https://scala-lang.org/)

[菜鸟教程](https://www.runoob.com/scala/scala-tutorial.html)

[Scala 在线代码编写](https://scastie.scala-lang.org/)

[Scala API 文档](https://www.scala-lang.org/api/current/index.html)



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



**Coursier 安装方式**

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

**两种变量类型**：

- val：创建一个不可变的变量，和 Java 的 final 一样。
- var：创建一个可变变量，当且仅当变量随着时间变化才使用。

**变量声明**：显示声明变量类型或隐式声明编译器推断类型。

~~~scala
val x: Int = 1 // 显示声明
val x = 1 // 隐式声明
val m = Map(1 -> "one", 2 -> "two")
~~~



**内置数据类型**：是类对应的对象，不是原始数据类型。

1. `Boolean`：true/false。
2. `Byte`：8-bit，-2^7~2^7-1。
3. `Short`：16-bit，
4. `Int`：32-bit，可以用进制法表示数值 `0xACE`。
5. `Long`：64-bit，隐式声明数值携带后缀 `L`。
6. `Double`：64-bit，隐式声明数值携带后缀 `D`。
7. `Float`：32-bit，隐式声明数值携带后缀 `F`。
8. `Char`：16-bit，`val c = 'c'`。
9. `String`：支持字符串插值；创建多行字符串方便。

![image-20251010112619373](http://47.101.155.205/image-20251010112619373.png)

~~~scala
// 只能在没有精度丢失情况下才可转换
val x: Long = 987654321
val y: Float = x.toFloat

~~~



大数值类型：

1. `BigInt`：大整数，`BigInt(1234567890)`。
2. `BigDecimal`：`BigDecimal(123456.789)`。

Int 和 Double 是默认数字类型，`val i = 1` 和 `val i = 1.0` 分别被推断成 `Int` 和 `Double` 类型。

 

**s 插值**：字符串前面添加 `s` 允许之间在字符串中使用变量。

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



**f 插值**：字符串前面添加 `f` 允许简单的格式化字符串，类似 printf(String format, Object ... args) 方法。会进行类型校验。变量后不接类型，默认使用 `%s`。

~~~scala
val height = 1.8d
val name = "James"
println(f"$name%s is $height%2.2f meters tall")

// %% 表示转义
println(f"$name%s is $height%2.2f meters tall, %%")

~~~



**raw 插值**：不对转义字符转义，`\n` 就是 `\n` 字符。

~~~scala
val name = "cm"
val str1 = raw"hello\n$name"
println(str1)

~~~



### Type

在 Scala 中，所有值都有一个类型，包括数值和函数。如下图类的结构：

![image-20250930111020781](http://47.101.155.205/image-20250930111020781.png)



`Any` 是所有类型的超类，和 Java 的 Object 类一样定义了通用方法，例如：`equals`，`hashCode`，`toString`。

`Any` 有一个子类型 `Matchable`，用于匹配模式下的类型匹配。不能直接使用 `Any` 类型进行模式匹配，只能对 `Matchable` 的子类型的值进行模式匹配。

`Matchable` 有两个子类型：`AnyVal` 和 `AnyRef`。

`AnyVal` 表示值类型，几种已经定义的值类型，是不可为 `null` 的：`Double`，`Float`，`Long`，`Int`，`Short`，`Byte`，`Char`，`Unit`，`Boolean`。`Unit` 是一个不携带任何信息的值类型。只有一个 `Unit` 的实例，可以用 `()` 表示。

`Nothing` 是所有类型的子类型，被称为底层类型。用于发出非终止信号，例如：抛出异常，程序退出，无限循环。

`Null` 是所有引用类型的子类型。用 `null` 关键字表示值，在 Scala 中几乎不使用。



### 自定义插值表达式

自定义一个 p-插值表达式，`p"1,-2"` 转换成 `Point` 对象。

~~~scala
case class Point(x: Double, y: Double)

val pt = p"1,-2"     // Point(1.0,-2.0)

~~~



::: tabs

@tab Scala 2

创建隐式类

~~~scala
// 创建模板
implicit class PointHelper(val sc: StringContext) extends AnyVal {
  def p(args: Any*): Point = ???
}

// 具体实现逻辑
implicit class PointHelper(val sc: StringContext) extends AnyVal {
  def p(args: Double*): Point = {
    // 使用 s-插值表达式解析然后使用 ',' 分割
    val pts = sc.s(args: _*).split(",", 2).map { _.toDoubleOption.getOrElse(0.0) }
    Point(pts(0), pts(1))
  }
}

~~~

@tab Scala 3

使用 `extension` 方法

~~~scala
// 创建模板
extension (sc: StringContext)
  def p(args: Any*): Point = ???

// 具体实现逻辑
extension (sc: StringContext)
  def p(args: Double*): Point = {
    val pts = sc.s(args: _*).split(",", 2).map { _.toDoubleOption.getOrElse(0.0) }
    Point(pts(0), pts(1))
  }

~~~

:::



### Generic

泛型 `class/trait` 将类型作为 `[...]` 中的参数。Scala 约定使用单个字母命名参数。可以作用在类中的方法参数或返回值上。

::: tabs

@tab Scala 2
~~~scala
class Stack[A] {
  private var elements: List[A] = Nil
  def push(x: A): Unit =
    elements = elements.prepended(x)
  def peek: A = elements.head
  def pop(): A = {
    val currentTop = peek
    elements = elements.tail
    currentTop
  }
}

val stack = new Stack[Int]
stack.push(1)
println(stack.pop())
~~~

@tab Scala 3
~~~scala
class Stack[A]:
  private var elements: List[A] = Nil
  def push(x: A): Unit =
    elements = elements.prepended(x)
  def peek: A = elements.head
  def pop(): A =
    val currentTop = peek
    elements = elements.tail
    currentTop

val stack = Stack[Int]
stack.push(1)
println(stack.pop())
~~~

:::



### Intersection Type

在类型上使用 `&` 运算符创建交集类型(Intersection Type)。`A & B` 表示值同时属于类型 A 和类型 B。

**仅 Scala 3**

~~~scala
trait Resettable:
  def reset(): Unit

trait Growable[A]:
  def add(a: A): Unit
// 参数 x 需要同时是 Resettable 和 Growable[String] 类型
def f(x: Resettable & Growable[String]): Unit =
  x.reset()
  x.add("first")

~~~

::: tabs

Scala 3 交集类型定义的 f 方法支持 Resettable 和 Growable 子类型的实例，下面的方法只支持 Both 及其子类的实例。

@tab Scala 2
~~~scala
trait Both[A] extends Resettable with Growable[A]
def f(x: Both[String]): Unit
~~~

@tab Scala 3
~~~scala
trait Both[A] extends Resettable, Growable[A]
def f(x: Both[String]): Unit
~~~

:::



### Union Type(Scala 3)

在类型上使用 `|` 运算符创建 Union Type(联合类型)。`A | B` 表示参数可以是 A 或 B 类型。

~~~scala
case class Username(name: String)
case class Password(hash: Int)

def help(id: Username | Password) =
  val user = id match
    case Username(name) => lookupName(name)
    case Password(hash) => lookupPassword(hash)
~~~

抽象替代联合类型

~~~scala
trait UsernameOrPassword
case class Username(name: String) extends UsernameOrPassword
case class Password(hash: Int) extends UsernameOrPassword
def help(id: UsernameOrPassword) =

~~~

使用枚举标记并集。Username 不是 UsernameOrPassword 的子类型，需要显示

~~~scala
enum UsernameOrPassword:
  case IsUsername(u: Username)
  case IsPassword(p: Password)

def help(id: UsernameOrPassword) =
  val user = id match
    case UsernameOrPassword.IsUsername(u) => lookupName(u.name)
    case UsernameOrPassword.IsPassword(p) => lookupPassword(p.hash)
~~~



### Algebraic Data Type

可以使用 `enum` 构建 Algebraic Data Type(ADT，代数数据类型)。是一种通过组合积类型（`product type`）及和类型（`sum type`）构建数据结构的方式。

**Scala 3 通过 enum 简化了 ADT。**

**Sum Type(和类型)**：一个类型有不同的情况，或关系。3 种大的类型：CrustSize(大小)、CrustType(类型)、Topping(加料)。

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



**Product Type(积类型)**：一个类型由多个字段组合而成，与关系。Scala 中 case 对象可以用来表示单例对象，可访问但不可变的结构，也可以用 case class 表示

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
~~~



### Virance(型变)

Scala 支持 3 种型变方式：

- Invariant Type：不变，既生产又消费。`Array[T]`。
- Covariant Type：协变，只产生类型 T。`List[+T]`。
- Contravariant Type：逆变，只消费类型 T。`Function[-A, +B]`。

~~~scala
trait Item { def productNumber: Int }
trait Buyable extends Item { def price: Int }
trait Book extends Buyable { def isbn: String }

class RedBook extends Book {
    def productNumber: Int  = 1
    def price: Int = 2
    def isbn: String = "RedBook"
}
~~~



**Invariant Type(不变类型)**

~~~scala
// invariant type, Pipeline[T] 参数指定类型不可变
trait Pipeline[T]:
  def process(t: T): T

object PipelineUtil:
  def oneOf(p1: Pipeline[Buyable], p2: Pipeline[Buyable], b: Buyable): Buyable =
    val b1 = p1.process(b)
    val b2 = p2.process(b)
    if b1.price < b2.price then b1 else b2

val p1 = new Pipeline[Buyable]{
    def process(t: Buyable): Buyable = t
}
val p2 = new Pipeline[Book]{
    def process(t: Book): Book = t
}
val b = new Buyable(){
    def productNumber: Int  = 1
    def price: Int = 2
}

~~~

p1，p2 的类型只能是 `Pipeline[Buyable]`。虽然`Book <: Buyable <: Item`，但`Pipeline[Buyable]` 和 `Pipeline[Book]` 没有任何关系 。

![image-20251013160445359](http://47.101.155.205/image-20251013160445359.png)



**Covariant Type(协变类型)**：可以是该类型或其子类型，该参数类型只能作用**在方法返回类型有效**。**val 作用在构造方法上有效**。

~~~scala
// covariant type, Producer[+T] 参数指定类型, 可以为其类型或子类型
trait Producer[+T]:
  def make: T

object PipelineUtil:
  def makeTwo(p: Producer[Buyable]): Int = 
    p.make.price + p.make.price

// Producer[RedBook] <: Producer[Buyable], 父 = 子
// 方法返回值, 返回的类型为 T 的子类型, 不影响 Producer 不影响 T 方法编译
val pr = new Producer[RedBook]{
    def make: RedBook = RedBook()
}
val pb: Producer[Buyable] = pr

PipelineUtil.makeTwo(pr)
~~~



**Contravariant Type(逆变类型)**：该参数类型在**方法参数上**才有效。

~~~scala
// contravariant type, Consumer[-T] 参数指定类型
trait Consumer[-T]:
  def take(t: T): Unit

val buy: Consumer[Buyable] = new Consumer[Buyable]{
    def take(t: Buyable): Unit = print("Buyable: " + t.price)
}
// Consumer[Buyable] <: Consumer[Book], 父 = 子
// 方法参数, 接收类型为 T, Consumer[Buyable] 转为 Consumer[Book], 意味着该方法参数需要 Book 类型
// Consumer[Buyable] <: Consumer[Book] 转换关系, 但是类型需要为 T 的子类型
val book: Consumer[Book] = buy

trait Function[-A, +B]:
  def apply(a: A): B

val f: Function[Buyable, Buyable] = b => b

val g: Function[Buyable, Item] = f

val h: Function[Book, Buyable] = f

~~~



### Opaque Type(不透明类型)(Scala 3)

将 Double 封装成对数（3就是以10为底，1000的对数），引入一个新的类型。

**为什么使用 REPL 控制执行的结果不符合预期？**

~~~scala
// protected 隐藏 underlying, 使用 Logarithm(2), underlying = log 2; new Logarithm(2), underlying = 2
// underlying 就是以常数 e 为底, d 的对数
class Logarithm(protected val underlying: Double) {
    // 对数还原成 d
  def toDouble: Double = math.exp(underlying)

  def +(that: Logarithm): Logarithm =
    // 调用 companion object apply 方法, 省略方法名
    Logarithm(this.toDouble + that.toDouble)

  def *(that: Logarithm): Logarithm =
    new Logarithm(this.underlying + that.underlying)

  def logE: Double = underlying
}

object Logarithm {
  def apply(d: Double): Logarithm = new Logarithm(math.log(d))
}

val l2 = Logarithm(2);
val l3 = Logarithm(3);
println(s"x = ${l2.toDouble}, y = ${l2.logE}")
println(s"x = ${l3.toDouble}, y = ${l3.logE}")
println(s"l2 + l3 = ${(l2 + l3).toDouble}")
println(s"l2 * l3 = ${(l2 * l3).toDouble}")
(l2 * l3).toDouble // 6.0
(l2 + l3).toDouble // 5.0
~~~

![image-20251017112338507](http://47.101.155.205/image-20251017112338507.png)

![image-20251017112533052](http://47.101.155.205/image-20251017112533052.png)

**使用 Logarithm 存储 Double 的对数，但是每次运算都带来了性能开销（抽象开销）：每次运算都需要提取 underlying 值，然后创建 Logarithm 对象。**



使用模块化抽象，来解决对象频繁创建的问题。但是 `LogarithmsImpl` 实现的 `type Logarithm` 固定为 `Double` 类型。

**问题：出现了定义的 + 和 * 运算没有生效的情况。**

~~~scala
trait Logarithms {

  // 以 e 为底, d 的对数值
  type Logarithm

  def add(x: Logarithm, y: Logarithm): Logarithm

  def mul(x: Logarithm, y: Logarithm): Logarithm

  def make(d: Double): Logarithm

  def extract(x: Logarithm): Double

  extension (x: Logarithm)
    def +(y: Logarithm): Logarithm = add(x, y)
    def *(y: Logarithm): Logarithm = mul(x, y)
}

object LogarithmsImpl extends Logarithms {
  type Logarithm = Double

  def add(x: Logarithm, y: Logarithm): Logarithm = make(extract(x) + extract(y))

  def mul(x: Logarithm, y: Logarithm): Logarithm = x + y

  def make(d: Double): Logarithm = math.log(d)

  def extract(x: Logarithm): Double = math.exp(x)
}
~~~

![image-20251017150934812](http://47.101.155.205/image-20251017150934812.png)



**Opaque Type（不透明类型）**

~~~scala
object Logarithms:
  // 定义不透明类型
  // Logarithm 和 Double 类型相等，仅在 Logarithm 作用域可知，改作用域应用在 Logarithms，且 extension Logarithm 的方法
  opaque type Logarithm = Double

  object Logarithm:
    def apply(d: Double): Logarithm = math.log(d)

  extension (x: Logarithm)
    def extract: Double = math.exp(x)
    def + (y: Logarithm): Logarithm = Logarithm(math.exp(x) + math.exp(y))
    def * (y: Logarithm): Logarithm = x + y
~~~

![image-20251017152535556](http://47.101.155.205/image-20251017152535556.png)



### Structural Type(Scala 3)

**使用语法**：仅包含抽象成员的结构

~~~scala
type MyType = {
  def m1(x: Int): String
  val name: String
}
// 函数参数内联定义
def printName(x: { val name: String }): Unit =
  println(x.name)
~~~



~~~scala
class Record(elems: (String, Any)*) extends Selectable:
  private val fields = elems.toMap
  def selectDynamic(name: String): Any = fields(name)

type Person = Record {
  val name: String
  val age: Int
}

val person = Record(
  "name" -> "Emma",
  "age" -> 42
).asInstanceOf[Person]

println(s"${person.name} is ${person.age} years old.")
person.selectDynamic("name").asInstanceOf[String]
person.selectDynamic("age").asInstanceOf[Int]
~~~

~~~scala
type Book = Record {
  val title: String
  val author: String
  val year: Int
  val rating: Double
}

val book = Record(
  "title" -> "The Catcher in the Rye",
  "author" -> "J. D. Salinger",
  "year" -> 1951,
  "rating" -> 4.5
).asInstanceOf[Book]
~~~



### Dependent Function Type(Scala 3)







## 控制语句

**EOP(expression-oriented programming)**：编写的表达式返回一个值时，这样的称为面向表达式编程。不返回值的称为语句。

### if/else

::: tabs

@tab Scala 2

~~~scala
if (x < 0) {
  // 语句
  println("negative")
} else if (x == 0) {
  println("zero")
} else {
  println("positive")
}

// 返回值, 类似三目运算符, EOP
val x = if (a < b) { a } else { b }

// 作为方法主体返回值
def compare(a: Int, b: Int): Int =
  if (a < b)
    -1
  else if (a == b)
    0
  else
    1

~~~



@tab Scala 3

与 Scala 2对比，用 then 替换了 {}。

~~~scala
if x < 0 then
  println("negative")
else if x == 0 then
  println("zero")
else
  println("positive")

// 返回值, 类似三目运算符, EOP
val x = if a < b then a else b

// 仅 Scala 3 支持，在表达结尾添加 end if
if x == 1 then
  println("x is 1, as you can see:")
  println(x)
end if

// 作为方法主体
def compare(a: Int, b: Int): Int =
  if a < b then
    -1
  else if a == b then
    0
  else
    1

~~~

:::



### for 循环

::: tabs

@tab Scala 2
~~~scala
val ints = List(1, 2, 3, 4, 5)
// p <- e, for 循环生成模板
for (i <- ints) {
  val x = i * 2
  println(s"i = $i, x = $x")
}

// 嵌套 for 循环, 执行 2x2x2 = 8 次. 注意: () 变成 {}
for {
  i <- 1 to 2
  j <- 'a' to 'b'
  k <- 1 to 10 by 5
} {
  println(s"i = $i, j = $j, k = $k")
}

// 循环中增加条件, 支持多条件
for (i <- ints if i > 2)
  println(i)

// 嵌套 for 循环 + 条件
for {
  i <- 1 to 3
  j <- 'a' to 'c'
  if i == 2
  if j == 'b'
} {
  println(s"i = $i, j = $j")   // prints: "i = 2, j = b"
}

// for 表达式, EOP. for yield 返回新的结果
val doubles = for (i <- ints) yield i * 2
val doubles = for (i <- ints) yield (i * 2)
val doubles = for { i <- ints } yield (i * 2)
// for if yield
val fruits = List("apple", "banana", "lime", "orange")
val fruitLengths =
  for (f <- fruits if f.length > 4) yield f.length
// 作为方法体返回结果
def between3and10(xs: List[Int]): List[Int] =
  for {
    x <- xs
    if x >= 3
    if x <= 10
  } yield x
between3and10(List(1, 3, 7, 11))

// Map for 循环
val states = Map(
  "AK" -> "Alaska",
  "AL" -> "Alabama", 
  "AZ" -> "Arizona"
)
for ((abbrev, fullName) <- states) println(s"$abbrev: $fullName")

~~~



@tab Scala 3

~~~scala
val ints = List(1, 2, 3, 4, 5)
// p <- e, for 循环生成模板
for i <- ints do println(i)

// 嵌套 for 循环, 执行 2x2x2 = 8 次
for
  i <- 1 to 2
  j <- 'a' to 'b'
  k <- 1 to 10 by 5
do
  println(s"i = $i, j = $j, k = $k")

// 循环中增加条件, 支持多条件
for
  i <- ints
  if i > 2
do
  println(i)

// 嵌套 for 循环 + 条件
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
// 作为方法体返回结果
def between3and10(xs: List[Int]): List[Int] =
  for
    x <- xs
    if x >= 3
    if x <= 10
  yield x
between3and10(List(1, 3, 7, 11))

// Map for 循环
val states = Map(
  "AK" -> "Alaska",
  "AL" -> "Alabama", 
  "AZ" -> "Arizona"
)
for (abbrev, fullName) <- states do println(s"$abbrev: $fullName")

~~~

:::



### while 循环

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



### match 表达式

match 表达式支持匹配的类型：

- 普通常量：`case 3 =>`
- 集合：`case List(els : _*) =>`
- Tuple：`case (x, y) =>`
- 构造方法：`case Person(first, last) =>`
- 类：`case p: Person =>`

::: tabs

@tab Scala 2
~~~scala
val i = 1
// 作为表达式返回结果
val result = i match {
  case 1 => "one"
  case 2 => "two"
  // _ 表示任意
  case _ => "other"
}
i match {
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")
}

// 变量匹配(变量名大写) + 获取未匹配的变量值
val N = 42
i match {
  case 0 => println("1")
  case 1 => println("2")
  case N => println("42")
  case n => println(s"You gave me: $n" )
}

// 多种情况匹配 
val evenOrOdd = i match {
  case 1 | 3 | 5 | 7 | 9 => println("odd")
  case 2 | 4 | 6 | 8 | 10 => println("even")
  case _ => println("some other number")
}

// 结合 if 匹配
i match {
  case 1 => println("one, a lonely number")
  case x if x == 2 || x == 3 => println("two’s company, three’s a crowd")
  case x if x > 3 => println("4+, that’s a party")
  case _ => println("i’m guessing your number is zero or less")
}
// 范围匹配
i match {
  case a if 0 to 9 contains a => println(s"0-9 range: $a")
  case b if 10 to 19 contains b => println(s"10-19 range: $b")
  case c if 20 to 29 contains c => println(s"20-29 range: $c")
  case _ => println("Hmmm...")
}
// 类型匹配
val p = Person("Fred")
p match {
  case Person(name) if name == "Fred" => println(s"$name says, Yubba dubba doo")
  case Person(name) if name == "Bam Bam" => println(s"$name says, Bam bam!")
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

// 将匹配的值绑定到变量
trait Animal {
  val name: String
}
case class Cat(name: String) extends Animal {
  def meow: String = "Meow"
}
case class Dog(name: String) extends Animal {
  def bark: String = "Bark"
}

def speak(animal: Animal) = animal match {
  case c @ Cat(name) if name == "Felix" => println(s"$name says, ${c.meow}!")
  case d @ Dog(name) if name == "Rex" => println(s"$name says, ${d.bark}!")
  case _ => println("I don't know you!")
}
speak(Cat("Felix")) // "Felix says, Meow!"
speak(Dog("Rex"))   // "Rex says, Bark!"

~~~



~~~scala
def pattern(x: Matchable): String = x match {

  // constant patterns
  case 0 => "zero"
  case true => "true"
  case "hello" => "you said 'hello'"
  case Nil => "an empty List"

  // sequence patterns
  case List(0, _, _) => "a 3-element list with 0 as the first element"
  case List(1, _*) => "list, starts with 1, has any number of elements"
  case Vector(1, _*) => "vector, starts w/ 1, has any number of elements"

  // tuple patterns
  case (a, b) => s"got $a and $b"
  case (a, b, c) => s"got $a, $b, and $c"

  // constructor patterns
  case Person(first, "Alexander") => s"Alexander, first name = $first"
  case Dog("Zeus") => "found a dog named Zeus"

  // type test patterns
  case s: String => s"got a string: $s"
  case i: Int => s"got an int: $i"
  case f: Float => s"got a float: $f"
  case a: Array[Int] => s"array of int: ${a.mkString(",")}"
  case as: Array[String] => s"string array: ${as.mkString(",")}"
  case d: Dog => s"dog: ${d.name}"
  case list: List[?] => s"got a List: $list"
  case m: Map[?, ?] => m.toString

  // the default wildcard pattern
  case _ => "Unknown"
}

~~~



@tab Scala 3

相比 Scala2，省略了 match 后的 `{}`

~~~scala
val i = 1
// 作为表达式返回结果
val result = i match
  case 1 => "one"
  case 2 => "two"
  // _ 表示任意
  case _ => "other"
i match
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")

// 变量匹配(变量名大写) + 获取未匹配的变量值
val N = 42
i match
  case 0 => println("1")
  case 1 => println("2")
  case N => println("42")
  case n => println(s"You gave me: $n" )

// 多种情况匹配 
val evenOrOdd = i match
  case 1 | 3 | 5 | 7 | 9 => println("odd")
  case 2 | 4 | 6 | 8 | 10 => println("even")
  case _ => println("some other number")

// 结合 if 匹配
i match
  case 1 => println("one, a lonely number")
  case x if x == 2 || x == 3 => println("two’s company, three’s a crowd")
  case x if x > 3 => println("4+, that’s a party")
  case _ => println("i’m guessing your number is zero or less")
// 范围匹配
i match
  case a if 0 to 9 contains a => println(s"0-9 range: $a")
  case b if 10 to 19 contains b => println(s"10-19 range: $b")
  case c if 20 to 29 contains c => println(s"20-29 range: $c")
  case _ => println("Hmmm...")
// 类型匹配
val p = Person("Fred")
p match
  case Person(name) if name == "Fred" => println(s"$name says, Yubba dubba doo")
  case Person(name) if name == "Bam Bam" => println(s"$name says, Bam bam!")
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

// 将匹配的值绑定到变量
trait Animal:
  val name: String
case class Cat(name: String) extends Animal:
  def meow: String = "Meow"
case class Dog(name: String) extends Animal:
  def bark: String = "Bark"

def speak(animal: Animal) = animal match
  case c @ Cat(name) if name == "Felix" => println(s"$name says, ${c.meow}!")
  case d @ Dog(name) if name == "Rex" => println(s"$name says, ${d.bark}!")
  case _ => println("I don't know you!")

speak(Cat("Felix")) // "Felix says, Meow!"
speak(Dog("Rex"))   // "Rex says, Bark!"

~~~

~~~scala
def pattern(x: Matchable): String = x match

  // constant patterns
  case 0 => "zero"
  case true => "true"
  case "hello" => "you said 'hello'"
  case Nil => "an empty List"

  // sequence patterns
  case List(0, _, _) => "a 3-element list with 0 as the first element"
  case List(1, _*) => "list, starts with 1, has any number of elements"
  case Vector(1, _*) => "vector, starts w/ 1, has any number of elements"

  // tuple patterns
  case (a, b) => s"got $a and $b"
  case (a, b, c) => s"got $a, $b, and $c"

  // constructor patterns
  case Person(first, "Alexander") => s"Alexander, first name = $first"
  case Dog("Zeus") => "found a dog named Zeus"

  // type test patterns
  case s: String => s"got a string: $s"
  case i: Int => s"got an int: $i"
  case f: Float => s"got a float: $f"
  case a: Array[Int] => s"array of int: ${a.mkString(",")}"
  case as: Array[String] => s"string array: ${as.mkString(",")}"
  case d: Dog => s"dog: ${d.name}"
  case list: List[?] => s"got a List: $list"
  case m: Map[?, ?] => m.toString

  // the default wildcard pattern
  case _ => "Unknown"

~~~

**仅 Scala 3 支持**

~~~scala
// 链式匹配
i match
  case odd: Int if odd % 2 == 1 => "odd"
  case even: Int if even % 2 == 0 => "even"
  case _ => "not an integer"
match
  case "even" => true
  case _ => false

// 属性 match
List(1, 2, 3)
  .map(_ * 2)
  .headOption
  .match
    case Some(value) => println(s"The head is: $value")
    case None => println("The list is empty")

~~~

:::



### try/catch/finally

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







## Domain Modeling



### Tools

Scala 提供了许多结构，以便进行建模。

- Class
- Object
- Companion Object
- Trait
- Abstract Class
- Enum（**仅Scala 3**）
- Case Class
- Case Object



#### Class

定义一个 `Class` 的语法，`var` 表示属性可变的，使用 `val` 表示属性仅可读。

~~~scala
class Person(var name: String, var vocation: String)
class Book(var title: String, var author: String, var year: Int)
class Movie(var name: String, var director: String, var year: Int)

~~~

::: tabs

@tab Scala 2
~~~scala
val p = new Person("oycm", "Java Development")
p.name
p.vocation
// 修改
p.name = "zs"
p.vocation = "C++ Development"

~~~

@tab Scala 3
~~~scala
val p = Person("oycm", "Java Development")
p.name
p.vocation
// 修改
p.name = "zs"
p.vocation = "C++ Development"

~~~

:::



**定义属性和方法**

::: tabs

@tab Scala 2
~~~scala
class Person(var firstName: String, var lastName: String) {

  println("initialization begins")
  val fullName = firstName + " " + lastName

  def printFullName: Unit =
    println(fullName)

  printFullName
  println("initialization ends")
}

~~~

@tab Scala 3
~~~scala
class Person(var firstName: String, var lastName: String):

  println("initialization begins")
  val fullName = firstName + " " + lastName

  def printFullName: Unit =
    println(fullName)

  printFullName
  println("initialization ends")

~~~

:::



**定义属性默认参数值**

::: tabs

@tab Scala 2
~~~scala
class Socket(val timeout: Int = 5000, val linger: Int = 5000) {
  override def toString = s"timeout: $timeout, linger: $linger"
}

// 创建对象的方式
val s = new Socket()                  // timeout: 5000, linger: 5000
val s = new Socket(2500)              // timeout: 2500, linger: 5000
val s = new Socket(10000, 10000)      // timeout: 10000, linger: 10000
val s = new Socket(timeout = 10000)   // timeout: 10000, linger: 5000
val s = new Socket(linger = 10000)    // timeout: 5000, linger: 10000

~~~

@tab Scala 3
~~~scala
class Socket(val timeout: Int = 5000, val linger: Int = 5000):
  override def toString = s"timeout: $timeout, linger: $linger"
// 创建对象的方式
val s = Socket()                  // timeout: 5000, linger: 5000
val s = Socket(2500)              // timeout: 2500, linger: 5000
val s = Socket(10000, 10000)      // timeout: 10000, linger: 10000
val s = Socket(timeout = 10000)   // timeout: 10000, linger: 5000
val s = Socket(linger = 10000)    // timeout: 5000, linger: 10000

~~~

:::



**多种构造方法**

::: tabs

@tab Scala 2
~~~scala
import java.time._

// 主要的构造方法
class Student(
  var name: String,
  var govtId: String
) {
  private var _applicationDate: Option[LocalDate] = None
  private var _studentId: Int = 0

  // 构造方法, 也可以执行参数默认值
  def this(
    name: String,
    govtId: String,
    applicationDate: LocalDate
  ) = {
    this(name, govtId)
    _applicationDate = Some(applicationDate)
  }

  def this(
    name: String,
    govtId: String,
    studentId: Int
  ) = {
    this(name, govtId)
    _studentId = studentId
  }
}

~~~

@tab Scala 3
~~~scala
import java.time.*

// [1] the primary constructor
class Student(
  var name: String,
  var govtId: String
):
  private var _applicationDate: Option[LocalDate] = None
  private var _studentId: Int = 0

  // [2] a constructor for when the student has completed
  // their application
  def this(
    name: String,
    govtId: String,
    applicationDate: LocalDate
  ) =
    this(name, govtId)
    _applicationDate = Some(applicationDate)

  // [3] a constructor for when the student is approved
  // and now has a student id
  def this(
    name: String,
    govtId: String,
    studentId: Int
  ) =
    this(name, govtId)
    _studentId = studentId

~~~

:::



#### Object

Object 是只有一个实例的类。在访问其成员时才进行初始化。

::: tabs

@tab Scala 2
~~~scala
object StringUtils {
  def truncate(s: String, length: Int): String = s.take(length)
  def containsWhitespace(s: String): Boolean = s.matches(".*\\s.*")
  def isNullOrEmpty(s: String): Boolean = s == null || s.trim.isEmpty
}

// 使用方式
StringUtils.truncate("Chuck Bartowski", 5)
// 导入所有成员使用
import StringUtils._
truncate("Chuck Bartowski", 5)       // "Chuck"
containsWhitespace("Sarah Walker")   // true
isNullOrEmpty("John Casey")          // false
// 导入指定的成员使用
import StringUtils.{truncate, containsWhitespace}
truncate("Charles Carmichael", 7)       // "Charles"
containsWhitespace("Captain Awesome")   // true

// 访问属性
object MathConstants {
  val PI = 3.14159
  val E = 2.71828
}

println(MathConstants.PI)   // 3.14159

~~~

@tab Scala 3
~~~scala
object StringUtils:
  def truncate(s: String, length: Int): String = s.take(length)
  def containsWhitespace(s: String): Boolean = s.matches(".*\\s.*")
  def isNullOrEmpty(s: String): Boolean = s == null || s.trim.isEmpty

// 使用方式
StringUtils.truncate("Chuck Bartowski", 5)
// 导入所有成员使用
import StringUtils.*
truncate("Chuck Bartowski", 5)       // "Chuck"
containsWhitespace("Sarah Walker")   // true
isNullOrEmpty("John Casey")          // false
// 导入指定的成员使用
import StringUtils.{truncate, containsWhitespace}
truncate("Charles Carmichael", 7)       // "Charles"
containsWhitespace("Captain Awesome")   // true

// 访问属性
object MathConstants:
  val PI = 3.14159
  val E = 2.71828

println(MathConstants.PI)   // 3.14159

~~~

:::



#### Companion Object

在声明一个类的文件中，还有一个 Object 类，两个类的名称一致。class 类能访问 object 类私有的成员。

Companion Object 对象用法：

- 一个命名空间下的静态方法组
-  `apply` 方法，构建对象的工厂模式。**调用该方法可以省略方法名**。
- `unapply`，结构对象，用于匹配模式。[使用介绍](https://docs.scala-lang.org/scala3/reference/changed-features/pattern-matching.html)

::: tabs

@tab Scala 2
~~~scala
// 为了导入 Pi, pow
import scala.math._

class Circle(val radius: Double) {
  def area: Double = Circle.calculateArea(radius)
}

object Circle {
  private def calculateArea(radius: Double): Double = Pi * pow(radius, 2.0)
}

val circle1 = new Circle(5.0)
circle1.area

// apply 方法应用
class Person {
  var name = ""
  var age = 0
  override def toString = s"$name is $age years old"
}

object Person {
  // factory method
  def apply(name: String): Person = {
    var p = new Person
    p.name = name
    p
  }
    
  def apply(name: String, age: Int): Person = {
    var p = new Person
    p.name = name
    p.age = age
    p
  }
}

val joe = Person("Joe")
val fred = Person("Fred", 29)

~~~

@tab Scala 3
~~~scala
// 为了导入 Pi, pow
import scala.math.*

class Circle(val radius: Double):
  def area: Double = Circle.calculateArea(radius)

object Circle:
  private def calculateArea(radius: Double): Double = Pi * pow(radius, 2.0)

val circle1 = Circle(5.0)
circle1.area

// apply 方法应用
class Person:
  var name = ""
  var age = 0
  override def toString = s"$name is $age years old"

object Person:

  // factory method
  def apply(name: String): Person =
    var p = new Person
    p.name = name
    p

  def apply(name: String, age: Int): Person =
    var p = new Person
    p.name = name
    p.age = age
    p

end Person

val joe = Person("Joe")
val fred = Person("Fred", 29)

~~~

:::



#### Trait

类似 Java8 中的接口，有以下特征：

- 抽象方法和属性
- 实例方法和属性

::: tabs

@tab Scala 2
~~~scala
// 作为接口，定义其它实现类的抽象成员
trait Employee {
  def id: Int
  def firstName: String
  def lastName: String
}

// 定义抽象成员+实例成员
trait HasLegs {
  def numLegs: Int
  def walk(): Unit
  def stop() = println("Stopped walking")
}
trait HasTail {
  def tailColor: String
  def wagTail() = println("Tail is wagging")
  def stopTail() = println("Tail is stopped")
}
// 类实现
class IrishSetter(name: String) extends HasLegs with HasTail {
  val numLegs = 4
  val tailColor = "Red"
  def walk() = println("I’m walking")
  override def toString = s"$name is a Dog"
}

~~~

@tab Scala 3
~~~scala
// 作为接口，定义其它实现类的抽象成员
trait Employee:
  def id: Int
  def firstName: String
  def lastName: String

// 定义抽象成员+实例成员
trait HasLegs:
  def numLegs: Int
  def walk(): Unit
  def stop() = println("Stopped walking")
trait HasTail:
  def tailColor: String
  def wagTail() = println("Tail is wagging")
  def stopTail() = println("Tail is stopped")
// 类实现
class IrishSetter(name: String) extends HasLegs, HasTail:
  val numLegs = 4
  val tailColor = "Red"
  def walk() = println("I’m walking")
  override def toString = s"$name is a Dog"

~~~

:::



#### Abstract Class

一个类需要有抽象成员，可以定义 Trait 或 Abstract 类。大多数情况下使用 Trait 类，两种情况下使用 Abstract 类：

- 使用构造方法参数创建对象
- 代码将会被 java 使用

::: tabs

@tab Scala 2
~~~scala
abstract class Pet(name: String) {
  def greeting: String
  def age: Int
  override def toString = s"My name is $name, I say $greeting, and I’m $age"
}

class Dog(name: String, var age: Int) extends Pet(name) {
  val greeting = "Woof"
}

val d = new Dog("Fido", 1)
~~~

@tab Scala 3
~~~scala
abstract class Pet(name: String):
  def greeting: String
  def age: Int
  override def toString = s"My name is $name, I say $greeting, and I’m $age"

class Dog(name: String, var age: Int) extends Pet(name):
  val greeting = "Woof"

val d = Dog("Fido", 1)

~~~

**在 Scala 3中，Trait 也可以携带参数**

~~~scala
trait Pet(name: String):
  def greeting: String
  def age: Int
  override def toString = s"My name is $name, I say $greeting, and I’m $age"

class Dog(name: String, var age: Int) extends Pet(name):
  val greeting = "Woof"

val d = Dog("Fido", 1)

~~~

:::



#### Enum(Scala 3)

enum 用于定义一组有限命名值组成的类型。

用于定义 披萨特征的枚举：

~~~scala
enum CrustSize:
  case Small, Medium, Large
// 相当于下面的简写
enum CrustSize:
  case Small extends CrustSize
  case Medium extends CrustSize
  case Large extends CrustSize

enum CrustType:
  case Thin, Thick, Regular

enum Topping:
  case Cheese, Pepperoni, BlackOlives, GreenOlives, Onions

~~~

**枚举的特征：属性和方法**

~~~scala
enum Color(val rgb: Int):
  case Red   extends Color(0xFF0000)
  case Green extends Color(0x00FF00)
  case Blue  extends Color(0x0000FF)

enum Planet(mass: Double, radius: Double):
  private final val G = 6.67300E-11
  def surfaceGravity = G * mass / (radius * radius)
  def surfaceWeight(otherMass: Double) =
    otherMass * surfaceGravity

  case Mercury extends Planet(3.303e+23, 2.4397e6)
  case Earth   extends Planet(5.976e+24, 6.37814e6)

~~~

**Scala 枚举应用到 Java：继承 java.lang.Enum**

~~~scala
enum Color extends Enum[Color] { case Red, Green, Blue }

~~~



#### Case Class

`case class` 定义类的属性都是不可变的。

~~~scala
case class Person(name: String, relation: String)

val christina = Person("Christina", "niece")
~~~

由于 case 字段的不可变性，Scala 编译器为该类生成了许多方法：

- `unapply` 方法，可以直接用于匹配模式，`case Person(n, r) => ...)`
- `copy ` 方法创建实例的修改副本
- 重写 `equals` 和 `hashcode` 方法
- 生成默认的 `toString` 方法



::: tabs

@tab Scala 2
~~~scala
// match 匹配模式
christina match {
  case Person(n, r) => println("name is " + n)
}

// 重写 equals 和 hashcode 方法
val hannah = Person("Christina", "niece")
christina == hannah       // true

// 默认 toString 方法
println(christina)        // Person(Christina,niece)

// copy
val o = hannah.copy(name = "oycm")

~~~

@tab Scala 3
~~~scala
christina match
  case Person(n, r) => println("name is " + n)

val hannah = Person("Christina", "niece")
christina == hannah       // true

println(christina)        // Person(Christina,niece)

// copy
val o = hannah.copy(name = "oycm")

~~~

:::



#### Case Object

`case object` 就像 `object` 类，像 `case class` 比 `class` 类多一些特点。`case object` 有以下特点：

- 可序列化
- 有默认的 `hashCode` 实现
- `toString` 实现
- 用于创建枚举
- 不能有构造方法参数
- 用于传递不可变的消息

**定义消息的类型**

~~~scala
sealed trait Message
case class PlaySong(name: String) extends Message
case class IncreaseVolume(amount: Int) extends Message
case class DecreaseVolume(amount: Int) extends Message
case object StopPlaying extends Message

~~~

::: tabs

@tab Scala 2
~~~scala
def handleMessages(message: Message): Unit = message match {
  case PlaySong(name)         => playSong(name)
  case IncreaseVolume(amount) => changeVolume(amount)
  case DecreaseVolume(amount) => changeVolume(-amount)
  case StopPlaying            => stopPlayingSong()
}

~~~

@tab Scala 3
~~~scala
def handleMessages(message: Message): Unit = message match
  case PlaySong(name)         => playSong(name)
  case IncreaseVolume(amount) => changeVolume(amount)
  case DecreaseVolume(amount) => changeVolume(-amount)
  case StopPlaying            => stopPlayingSong()

~~~

:::

### OOP Modeling

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



#### Trait

Scala 中用 `trait` 来分解具体。

- 抽象成员要求子类必须实现
- 实例成员可以提供给子类使用
- 抽象方法 `def m(): T`
- 抽象属性 `val x: T`
- 泛型抽象属性 `type T`，边界泛型 `type T <: S`
- **Scala 3**：给的抽象类型 `given t: T`



::: tabs

@tab Scala 2
~~~scala
trait Showable {
  def show: String
  def showHtml = "<p>" + show + "</p>"
}
// Document 继承 Showable
class Document(text: String) extends Showable {
  def show = text
}

~~~

@tab Scala 3
~~~scala
trait Showable:
  def show: String
  def showHtml = "<p>" + show + "</p>"
// Document 继承 Showable
class Document(text: String) extends Showable:
  def show = text

~~~

:::



#### Mixin Composition

Scala 的 `trait` 不仅支持抽象和具体的定义，还支持组合多个 `trait`，这称为 `Mixin Composition`。

::: tabs

@tab Scala 2
~~~scala
trait GreetingService {
  def translate(text: String): String
  def sayHello = translate("Hello")
}

trait TranslationService {
  def translate(text: String): String = "..."
}
// ComposedService 组合了 2 个 trait
trait ComposedService extends GreetingService with TranslationService

~~~

@tab Scala 3
~~~scala
trait GreetingService:
  def translate(text: String): String
  def sayHello = translate("Hello")

trait TranslationService:
  def translate(text: String): String = "..."
// ComposedService 组合了 2 个 trait
trait ComposedService extends GreetingService, TranslationService

~~~

:::



#### Class

`class` 与 `trait` 一样，可以 `extends` 多个 `trait`，但是只能由一个 `super class`。

::: tabs

@tab Scala 2

| class             | 语法                           |
| ----------------- | ------------------------------ |
| trait             | trait T1, trait T2, trait T3   |
| Composition trait | S1 extends T1 with T2 with ... |
| class             | C extends S1 with T2 with ...  |
| 实例              | new C()                        |
| 实例              | new C() with T3                |

@tab Scala 3

**支持 open class**

| class             | 语法                         |
| ----------------- | ---------------------------- |
| trait             | trait T1, trait T2, trait T3 |
| Composition trait | S1 extends T1, T2, ...       |
| class             | C extends S1, T2, ...        |
| 实例              | C()                          |

~~~scala
// 仅 Scala 3 支持
open class Person(name: String)
~~~

:::



#### Access Modifier

在 Scala 中，默认所有的成员定义都是 `public`。要隐藏具体的定义，可以使用 `private` 或 `protected` 修饰成员(method, field, type)。`private` 成员仅对 `class/trait` 自己可见，以及 `companion object` 可见。`protected` 对类的子类可见。



#### Example

::: tabs

@tab Scala 2
~~~scala
trait SubjectObserver {

  type S <: Subject
  type O <: Observer

  trait Subject { self: S =>
    private var observers: List[O] = List()
    def subscribe(obs: O): Unit = {
      observers = obs :: observers
    }
    def publish() = {
      for ( obs <- observers ) obs.notify(this)
    }
  }

  trait Observer {
    def notify(sub: S): Unit
  }
}
~~~

`SubjectObserver` 中定义了 2 个 `trait`：`Subject`，`Observer`。

`type S <: Subject` 表示上界，S 是 `Subject` 的子类。

`self: S =>` self 是 `this` 的别名(自引用)，附带一个类型约束，当使用 this 或 self，表示的静态类型是 `S`。必须是 `S` 的子类型。

~~~scala
object SensorReader extends SubjectObserver {
  type S = Sensor
  type O = Display

  class Sensor(val label: String) extends Subject {
    private var currentValue = 0.0
    def value = currentValue
    def changeValue(v: Double) = {
      currentValue = v
      publish()
    }
  }

  class Display extends Observer {
    def notify(sub: Sensor) =
      println(s"${sub.label} has value ${sub.value}")
  }
}
~~~

定义了一个单例类 `SensorReader`。

~~~scala
import SensorReader._

val s1 = new Sensor("sensor1")
val s2 = new Sensor("sensor2")
val d1 = new Display()
val d2 = new Display()
s1.subscribe(d1)
s1.subscribe(d2)
s2.subscribe(d1)

s1.changeValue(2)
s2.changeValue(3)
~~~



@tab Scala 3

~~~scala
trait SubjectObserver:

  type S <: Subject
  type O <: Observer

  trait Subject:
    self: S =>
      private var observers: List[O] = List()
      def subscribe(obs: O): Unit =
        observers = obs :: observers
      def publish() =
        for obs <- observers do obs.notify(this)

  trait Observer:
    def notify(sub: S): Unit
~~~

`SubjectObserver` 中定义了 2 个 `trait`：`Subject`，`Observer`。

`type S <: Subject` 表示上界，S 是 `Subject` 的子类。

`self: S =>` self 是 `this` 的别名(自引用)，附带一个类型约束，当使用 this 或 self，表示的静态类型是 `S`。必须是 `S` 的子类型。

~~~scala
object SensorReader extends SubjectObserver:
  type S = Sensor
  type O = Display

  class Sensor(val label: String) extends Subject:
    private var currentValue = 0.0
    def value = currentValue
    def changeValue(v: Double) =
      currentValue = v
      publish()

  class Display extends Observer:
    def notify(sub: Sensor) =
      println(s"${sub.label} has value ${sub.value}")
~~~

定义了一个单例类 `SensorReader`。

~~~scala
import SensorReader.*

val s1 = Sensor("sensor1")
val s2 = Sensor("sensor2")
val d1 = Display()
val d2 = Display()
s1.subscribe(d1)
s1.subscribe(d2)
s2.subscribe(d1)

s1.changeValue(2)
s2.changeValue(3)
~~~

:::





### FP Modeling

FP 编程，两个核心概念：

- 代数数据类型(ADT Algebraic Data Types) 是一种构建数据模型的方式，核心思想是使用有限的组合规则定义复杂的数据结构。两类主要组合方式：和类型(Sum Type)、积类型(Product Type)。
- 数据本身只是结构，但往往需要在数据上定义行为/功能。



**函数式方法指的是使用函数式编程(FP)的风格或特性来编写代码的方法。函数式编程是一种编程范式，它将计算视为数学函数的求值，并避免使用程序状态和可变数据。在函数式编程中，函数是一等公民，意味着函数可以作为参数传递，也可以作为返回值返回（HOF），并且常常使用不可变数据和无副作用的函数。函数式方法特点：**

- 不可变性(Immutability)：数据一旦创建，就不能被改变。任何修改都会创建一个新的数据副本。
- 纯函数(Pure Functions)：函数的输出只依赖于输入，并且不会产生副作用（例如修改全局变量、修改输入参数等）。
- 高阶函数(Higher-order Functions)：函数可以作为参数传递给其他函数，也可以作为函数的返回值。
- 递归(Recursion)：用递归来代替循环，因为循环通常需要改变循环变量（状态）。
- 函数组合(Function Composition)：将多个函数组合成一个新的函数。









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



**仅 scala 3 支持**：`extension` 关键字扩展方法，

~~~scala
// 定义的参数, 作为调用入口,也作为方法参数
extension (s: String)
  def makeInt(radix: Int): Int = Integer.parseInt(s, radix)

"1".makeInt(2)      // Int = 1
"10".makeInt(2)     // Int = 2
"100".makeInt(2)    // Int = 4

~~~



## 函数

Scala 具有函数式编程中的大多数功能：

- Lambdas-匿名函数
- HOF-高阶函数：可以接受其他函数作为参数，或者将函数作为返回值的函数。
- 不可变的集合



## 单例对象

单例对象(Singleton)是一种设计模式，它确保一个类只有一个实例，并提供一个全局访问点来访问该实例。

在 Scala 中，`object` 关键字创建一个单例对象，`object` 定义的 `class` 只有一个实例。

这种对象的作用：

- 工具类方法的集合：方法的访问像 Java 的 `static method`一样。
- companion object：在一个文件中，class 类和 object 类有相同的名称，class 类能访问 object 的方法。
- 实现 `trait` 创建对象。



## 集合

**创建不可变集合：**

~~~scala
val a = List(1, 2, 3)           // a: List[Int] = List(1, 2, 3)

val b = (1 to 5).toList         // b: List[Int] = List(1, 2, 3, 4, 5)
val c = (1 to 10 by 2).toList   // c: List[Int] = List(1, 3, 5, 7, 9)
val e = (1 until 5).toList      // e: List[Int] = List(1, 2, 3, 4)
val f = List.range(1, 5)        // f: List[Int] = List(1, 2, 3, 4)
val g = List.range(1, 10, 3)    // g: List[Int] = List(1, 4, 7)

~~~

**集合方法：**

~~~scala
val a = List(10, 20, 30, 40, 10)      // List(10, 20, 30, 40, 10)

a.drop(2)                             // List(30, 40, 10) 
a.dropWhile(_ < 25)                   // List(30, 40, 10) 分界点
a.filter(_ < 25)                      // List(10, 20, 10) 所有匹配
a.slice(2,4)                          // List(30, 40) 
a.tail                                // List(20, 30, 40, 10) 去头
a.take(3)                             // List(10, 20, 30)
a.takeWhile(_ < 30)                   // List(10, 20) 分界点

// flatten
val a = List(List(1,2), List(3,4))
a.flatten                             // List(1, 2, 3, 4)

// map, flatMap
val nums = List("one", "two")
nums.map(_.toUpperCase)               // List("ONE", "TWO")
nums.flatMap(_.toUpperCase)           // List('O', 'N', 'E', 'T', 'W', 'O')


// foldLeft reduceLeft
val firstTen = (1 to 10).toList
firstTen.reduceLeft(_ + _)                 // 55
firstTen.foldLeft(100)(_ + _)              // 155 (100 is a “seed” value)

~~~

**Tuple**：将不同的类型放入一个容器集合，2-22 元素。

~~~scala
case class Person(name: String)

val t = (11, "eleven", Person("Eleven"))
t(0)
// 提取 tuple 中的值到变量
val (num, str, person) = t

~~~



## Contextual Abstraactions

在某些情况下，省略一些被视为重复的方法参数调用。

~~~scala
val addresses: List[Address] = ...

addresses.sortBy(address => (address.city, address.street))
// 省略了排序比较的逻辑
// Scala 2
addresses.sortBy(address => (address.city, address.street))(Ordering.Tuple2(Ordering.String, Ordering.String))
// Scala 3
addresses.sortBy(address => (address.city, address.street))(using Ordering.Tuple2(Ordering.String, Ordering.String))

~~~



## Toplevel Definitions

在 Scala 3 中，在源代码的顶层编写以下代码。

~~~scala
import scala.collection.mutable.ArrayBuffer

enum Topping:
  case Cheese, Pepperoni, Mushrooms

import Topping.*
class Pizza:
  val toppings = ArrayBuffer[Topping]()

val p = Pizza()

extension (s: String)
  def capitalizeAllWords = s.split(" ").map(_.capitalize).mkString(" ")

val hwUpper = "hello, world".capitalizeAllWords

type Money = BigDecimal

// more definitions here as desired ...

@main def myApp =
  p.toppings += Cheese
  println("show me the code".capitalizeAllWords)

~~~

