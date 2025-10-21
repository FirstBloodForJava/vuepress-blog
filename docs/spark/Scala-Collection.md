# Scala-Collection

[集合更详细介绍](https://docs.scala-lang.org/overviews/collections-2.13/introduction.html)

从集合类的结构来看，集合可分为 3 个类别：

- `Sequence`：元素带有顺序的集合，indexed（数组）；linear（链表）
- `Map`：包含 key/value 键值对的集合
- `Set`：无序且唯一的集合



## 集合继承关系

![image-20251021161423971](http://47.101.155.205/image-20251021161423971.png)

![image-20251021161456897](http://47.101.155.205/image-20251021161456897.png)

![image-20251021162155509](http://47.101.155.205/image-20251021162155509.png)

## 常用集合

| 类型          | 不可变 | 可变 | 描述                                                  |
| ------------- | ------ | ---- | ----------------------------------------------------- |
| `List`        | ✓      |      | 线性链表                                              |
| `Vector`      | ✓      |      | indexed                                               |
| `LazyList`    | ✓      |      | linked list，元素仅在需要时计算，适用于大小和无限序列 |
| `ArrayBuffer` |        | ✓    | 可变首选类型，indexed                                 |
| `ListBuffer`  |        | ✓    | Linked list                                           |
| `Map`         | ✓      | ✓    |                                                       |
| `Set`         | ✓      | ✓    |                                                       |



## List

~~~scala
val a = List(1, 2, 3)
// 多种类型
val things: List[String | Int | Double] = List(1, "two", 3.0)

// 在集合前面添加元素 element :: list
val b = 0 :: a  
// 在集合前面添加多个元素 list ::: list
val c = b ::: a
// a 左边添加元素
0 +: a
// a 右边添加元素
a :+ 4

// 和 List(1, 2, 3) 等价
val list = 1 :: 2 :: 3 :: Nil
~~~

**LazyList**

~~~scala
val x = LazyList.range(1, Int.MaxValue)
// 取前面几个元素, 没用任何操作, 除非触发了 foreach
x.take(1)
x.take(5)
x.map(_ + 1)

x.map(_ + 1).take(1).foreach(println)
~~~



## Vector

Vevtor 不止 List 的 `::` 和 `:::` 运算符。

~~~scala
val nums = Vector(1, 2, 3, 4, 5)

val strings = Vector("one", "two")

case class Person(name: String)
val people = Vector(
  Person("Bert"),
  Person("Ernie"),
  Person("Grover")
)

val a = Vector(1,2,3)         
val b = a :+ 4                
val c = a ++ Vector(4, 5)

val a = Vector(1,2,3)
val b = 0 +: a                
val c = Vector(-1, 0) ++: a   
~~~



## ArrayBuffer

`import scala.collection.mutable.ArrayBuffer` 导入后才能使用。

~~~scala
// 创建空的集合
var strings = ArrayBuffer[String]()
var ints = ArrayBuffer[Int]()
var people = ArrayBuffer[Person]()
// 指定集合初始大小
val buf = new ArrayBuffer[Int](100_000)
// 携带元素创建
val nums = ArrayBuffer(1, 2, 3)

// 向后追加元素, append; appendAll; insert; insertAll; prepend; prependAll 方法追加
val nums = ArrayBuffer(1, 2, 3)
nums += 4
nums ++= List(5, 6)

// 删除元素, clear; remove 方法删除
val a = ArrayBuffer.range('a', 'h')
a -= 'a'
a --= Seq('b', 'c')
a --= Set('d', 'e')

// 更新元素, 下标 0 开始
val a = ArrayBuffer.range(1,5)        
a(2) = 50                   
a.update(0, 10)
~~~



## Map



~~~scala
// 默认创建不可变 Map
val states = Map(
  "AK" -> "Alaska",
  "AL" -> "Alabama",
  "AZ" -> "Arizona"
)
for (k, v) <- states do println(s"key: $k, value: $v")

// 获取 key 对应 value
val ak = states("AK")

// 添加 key/value 并创建新的变量
val a = Map(1 -> "one")
val b = a + (2 -> "two")
val c = b ++ Seq(
  3 -> "three",
  4 -> "four"
)
// 删除 key/value
val b = c - 4 - 3
val a = b - 2
// 更新 value
val b = a.updated(3, "THREE!")
val c = a + (2 -> "TWO...")
~~~



## Set



~~~scala
// 默认创建不可变的 Set
val nums = Set[Int]()
val nums = Set(1, 2, 3, 3, 3) 
val letters = Set('a', 'b', 'c', 'c')

// 添加
val a = Set(1, 2) 
val b = a + 3
val c = b ++ Seq(4, 1, 5, 5)
// 删除
val b = c -- Seq(4, 5)
val a = b - 3
~~~



## Range

使用 Range 填充数据和使用 for 循环迭代。

~~~scala
1 to 5         // Range(1, 2, 3, 4, 5)
1 until 5      // Range(1, 2, 3, 4)
1 to 10 by 2   // Range(1, 3, 5, 7, 9)
'a' to 'c'     // NumericRange(a, b, c)

val x: List[Int] = (1 to 5).toList
import scala.collection.mutable.Buffer
val x: Buffer[Int] = (1 to 5).toBuffer

Vector.range(1, 5) // Vector(1, 2, 3, 4)
List.range(1, 10, 2) // List(1, 3, 5, 7, 9)
Set.range(1, 10) // HashSet 1-9
~~~

