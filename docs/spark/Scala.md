# Scala

[Scala 官网](https://scala-lang.org/)

[菜鸟教程](https://www.runoob.com/scala/scala-tutorial.html)

Scala(Scalable Language) 是一种多范式编程语言。运行在 JVM 上：可以调用 Java 库，也可以被 Java 调用。

两大范式特点：

- 面向对象：一切皆对象，和 Java 类似。
- 函数式：支持高阶函数，不可变数据结构、模式匹配等。



## 安装

[Scala 官网安装介绍地址](https://www.scala-lang.org/download/)

[Coursier exe 安装下载地址](https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-win32.zip)

![image-20250927210244664](http://47.101.155.205/image-20250927210244664.png)

[scala2 github 地址](https://github.com/scala/scala/)

![image-20250927153815943](http://47.101.155.205/image-20250927153815943.png)

[scala3 github 地址](https://github.com/scala/scala3)

[scala-cli github 地址](https://github.com/VirtusLab/scala-cli/)



**Coursier 安装方式: **

~~~bash
# 将下载解压后的 exe 文件重命名 cs.exe
# 下载指定的版本, 下载较慢, 不推荐
cs install scala:3.7.3 && cs install scalac:3.7.3

~~~

**解压缩安装方式：scala github 地址下载压缩包，配置环境变量。**





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



:::





