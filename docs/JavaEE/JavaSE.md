# JavaSE

- windows系统快捷键

1. ctrl+shift+esc 任务管理器 ctrl+alt+delete
2. shift+delete 永久删除
3. windows+e 打开我的电脑



## java环境搭建

jdk的下载，oracle官网可以下载，根据电脑的位数，系统下载对应的jdk。

jdk安装，之间下一步，安装路径不要由空格和中文

- JDK(Java Development Kit) java开发工具

- JRE(Java Runtime Environment)java运行环境，包含了JVM和java的核心类库

- JVM(Java Virtual Machine) Java虚拟机



### JDK介绍

JDK是提供给Java开发人员使用的，其中包含了java的开发工具，也包括了JRE。所以安装了JDK，就不用在单独安装JRE了。

- **JDK目录结构**

![image-20220523155548555](http://47.101.155.205/image-20220523155548555.png)



####JDK组件

- java – 运行工具，运行 .class 的字节码
- javac– 编译器，将后缀名为.java的源代码编译成后缀名为.class的字节码 -cp 可以将*.jar包一起编译
- javap – 反编译程序
- javadoc – 文档生成器，从源码注释中提取文档，注释需符合规范
- jar – 打包工具，将相关的类文件打包成一个文件
- jdb – debugger，调试工具
- jps – 显示当前java程序运行的进程状态
- appletviewer – 运行和调试applet程序的工具，不需要使用浏览器
- javah – 从Java类生成C头文件和C源文件。这些文件提供了连接胶合，使 Java 和 C 代码可进行交互。
- javaws – 运行 JNLP 程序
- extcheck – 一个检测jar包冲突的工具
- apt – 注释处理工具
- jhat – java堆分析工具
- jstack – 栈跟踪程序
- jstat – JVM检测统计工具
- jstatd – jstat守护进程
- jinfo – 获取正在运行或崩溃的java程序配置信息
- jmap – 获取java进程内存映射信息
- idlj – IDL-to-Java 编译器. 将IDL语言转化为java文件
- policytool – 一个GUI的策略文件创建和管理工具
- jrunscript – 命令行脚本运行
- appletviewer：小程序浏览器，一种执行HTML文件上的Java小程序的Java浏览器
- jvisualvm：监控图
- jconsole



### JRE介绍

JRE 本身也是一个运行在 CPU 上的程序，用于解释执行 Java 代码。

一般像是实施的工作，会在客户现场安装 JRE，因为这是运行 Java 程序的最低要求。

> JRE目录结构

- bin 由Java.exe，没有javac.exe,可以直接运行java程序，不能编译java程序
- lib java的核心类库，包含 JVM 运行时需要的类库和 rt.jar。也包含用于安全管理的文件，这些文件包括安全策略(security policy)和安全属性(security properties)等。（百度）



### JVM在哪个文件夹

![image-20220523154840223](http://47.101.155.205/image-20220523154840223.png)

### 配置环境变量

配置环境变量的目的时为了能在任意位置使用jdk中bin目录下的dos命令

| 变量名    | 地址                               |
| --------- | ---------------------------------- |
| JAVA_HOME | C:\Program Files\Java\jdk1.8.0_101 |
| path      | %JAVA_HOME%\bin                    |
| classpath | .表示在当前目录下加载              |

classpath配置的变量表示在哪个位置加载*.class文件



## 常用Dos命令

1. 盘符切换 E:

2. 查看文件目录 dir

3. cd 切换目录 cd 

   cd /d 盘符路径绝对路径（跨盘符切换）

4. ipconfig

5. 应用命令 mspaint 画图应用

6. ping 网站 得到ip地址

7. **cd>note.txt** 创建文件

8. **del note.txt** 删除

9. **md 目录名** 创建

10. **rd 目录名** 删除



## 简单了解java运行机制

*.java文件编译成  *.class文件 编译型 编译阶段

.class文件再通过JVM虚拟机运行，.class的类加载器

***

可以在main方法中调用其他类中的public static void main(String[] args){}当时要传递素组参数

main方法中如果形参不写成String[] 类型，编译阶段能通过，运行阶段报错

~~~
---------- java ----------
错误: 在类 Test 中找不到 main 方法, 请将 main 方法定义为:
   public static void main(String[] args)
否则 JavaFX 应用程序类必须扩展javafx.application.Application 

输出完成 (耗时 0 秒) - 正常终止 
~~~





## Java数据类型

### 基本数据类型

**整数型** int byte char short long

~~~java
//转义字符
char c1 = '\'';//字符'
char c2 = '\\';//字符\
String s1 = "\\t";//避免转义
System.out.println(s1);
~~~

| 类型  | 大小    | 范围         |
| ----- | ------- | ------------ |
| byte  | 1个字节 | -128~127     |
| short | 2个字节 | -2^15~2^15-1 |
| int   | 4个字节 | -2^31~2^31-1 |
| long  | 8个字节 | -2^63~2^63-1 |
| char  | 2个字节 | 0~65535      |



~~~java
char cc = '\u0000';
System.out.println(cc);//后面没有输出结果
~~~



**浮点型** float double

~~~java
float f1 = 0.1f;
double d1 = 0.1;
System.out.println(f1 == d1);//false

float f1 = 231564865f;
double f2 = f1 + 1;
System.out.println(f1 == f2);//true
~~~



**布尔型** boolean 默认值为false

整数型默认是int类型，浮点型默认是double类型

### 引用数据类型

String类型



## 变量

**类变量** 

**实例变量(成员变量)**

*对象对应的变量，没有手动赋值，系统会默认赋值*  在堆中

**局部变量** 

*存储在栈内存中，方法指向结束释放内存*

**静态变量**

存储在方法区内存当中，类加载的时候就存在了

**常量** final 类型 变量名 值;



## 运算符

~~~java
int a = 1;
int b = 2;
System.out.println(""+ a + b);
System.out.println(a + b + "");
~~~

**算术运算**

**赋值运算符**

**条件运算符**

**逻辑运算符** 

&& || ！与 或 非

**位运算符** 

& | ^ ~ <<左移 >>右移

~~~java
A = 1100 1010;
B = 0110 0011;
A & B = 0100 0010;
A | B = 1110 1011;
A ^ B = 1010 1001;取反
~ B = 1001 1100;
~~~

**三元运算符** 

X ? Y : Z 如果X为真 执行Y，否则执行Z

**字符串连接符** 

### 优先级

~~~java
public class Test
{
	public static void main(String[] args){
		int a = 2;
		int b = 3;
		int c = ++a + b;
		System.out.println(a+"\t"+ b + "\t" + c);
		System.out.println(a);//3	3	6
	}
}
~~~

~~~java
public class Test
{
	public static void main(String[] args){
		int a = 2;
		int b = 3;
		int c = (a++) + b;
		System.out.println(a+"\t"+ b + "\t" + c);
		System.out.println(a);//3	3	5
	}
}
~~~



## 控制语句

### if语句

~~~java
	public static void main(String[] args){
		Scanner scanner = new Scanner(System.in);
		
		double score = scanner.nextDouble();
		if(score == 100){
			System.out.println("恭喜满分");
		}else if(score < 100 && score >=90){
			System.out.println("等级A");
		}else if(score < 90 && score >= 80){
			System.out.println("等级B");
		}else if(score < 80 && score >= 70){
			System.out.println("等级C");
		}else if(score < 70 && score >= 60){
			System.out.println("等级D");
		}else if(score <60 && score >= 0){
			System.out.println("不及格");
		}else{
			System.out.println("输入成绩不合格");
		}
	}
~~~

~~~java
if(){}else if{}
if(){
    
}else if(){
    
}else if(){
    
}else{
    
}

if(){
    if(){
        
    }else{
        
    }
}else{
    if(){}
}
~~~



### switch语句

语法

~~~java
switch(String int){
	case(String int) :
        ...;
		break;
	case(String int) :
        ...;
		break;
	default :
        ...;
}
~~~



~~~java
	public static void main(String[] args){
		Scanner scanner = new Scanner(System.in);
		
		String name = scanner.next();
		switch(name){
			case "ls" :
				System.out.println("李四");
				break;
			case "zs" :
				System.out.println("张三");
				break;
			case "ww" :
				System.out.println("王五");
				break;
			default :
				System.out.println(name);
		}
	}//不加break，会出现case穿透现象
~~~



### 循环语句

####while

~~~java
//while循环
while(true){
    ....;
    if(true){
        continue;//跳出此次循环
        break;//结束这个循环
    }
}
~~~

#### do{} whlle();

~~~java
//do while 循环可以保证循环至少指向一次
do{
    ...;
    if(true){
        continue;//跳出此次循环
        break;//结束这个循环
    }
}while(true);
~~~

#### for

~~~java
for(初始表达式;条件表达式;更新表达式子){
    循环体;
}
~~~

~~~java
//计算0-100奇数和及偶数和
public static void main(String[] args){
		//计算0-100奇数及偶数的和
		int i;
		for(i = 0;i <= 100;i++){
			if((i % 2)==0){
			break;
			}
		}
		int s1 = 0;
		for(int m = i;m <= 100;m+=2){
			s1+=m;
		}
		System.out.println("偶数的和：" + s1);

		int s2 = 0;
		for(int n = i+1;n <= 100;n+=2){
			s2+=n;
		}
		System.out.println("奇数的和："+s2);
	}
~~~

~~~java
//1-1000整除5，	
public static void main(String[] args){

		for(int i = 1,j = 0;i <= 1000;i++){
			if(i % 5 == 0){
				System.out.print(i + "\t");
				j++;
				if(j % 3 == 0){
					System.out.println();
				}
			}
		}
	}
~~~

~~~java
	//99乘法表
	public static void main(String[] args){

		for(int i = 1;i <= 9;i++){
			for(int j = 1;j <= i;j++){
				System.out.print(j + " * " + i + " = " + (i*j) + "\t");
			}
			System.out.println();
		}
	}

~~~

#### 增强for循环

~~~java
for(声明局部变量 : 表达式){
    代码
}
~~~

***break 退出当前循环*** 

***continue 结束当前的一次的循环*** 

~~~java
	//求101-150之间的质数
	public static void main(String[] args){
		int j;
		for(int i = 101;i < 150;i++){
			for(j = 2;j < i/2;j++){
				if(i % j == 0){
					break;
				}
			}
			if(j >= (i/2 - 1)){
				System.out.println(i);
			}
			
		}
	}
	

~~~

***

**打印三角形** 

~~~java
	public static void main(String[] args){
		for(int i = 1;i <= 5;i++){
			for(int j = 5;j >= i;j--){
				System.out.print(' ');
			}
			for(int j = 1;j <= i;j++){
				System.out.print('*');
				
			}
			for(int j = 1;j < i;j++){
				System.out.print('*');
				
			}
			
			System.out.println();
		}
	}

~~~

~~~java
	public static void main(String[] args){
		int lay = 9;
		lay = (lay + 1) / 2;
		for(int m = 1;m <= lay;m++){
			for(int b = 1;b <= lay - m;b++){
				System.out.print(" ");
			}
			for(int c = 1;c <= m * 2 - 1;c++){
				System.out.print("*");
			}
			System.out.println();
		}
		for(int d = 4;d >= 1;d--){
			for(int b = 1;b <= lay - d;b++){
				System.out.print(" ");
			}
			for(int c = lay - d;c <= 3 + d;c++){
				System.out.print("*");
			}
			System.out.println();
		}

		
	}
~~~



#### goto

~~~java
//goto
public static void main(String[] args){
    outer: for(int i = 101;i < 150;i++){
        for(int j = 2;j < i / 2;j++){
            if(i % j == 0){
                continue outer;//跳出里面的for循环，再跳过外面的outerfor循环一次
            }
        }
        System.out.println(i);
    }
}

public static void main(String[] args){
    outer: for(int i = 101;i < 150;i++){
        for(int j = 2;j < i / 2;j++){
            if(i % j == 0){
                break outer;// 跳出里面的循环，也结束外面的out循环
            }
        }
        System.out.println(i);
    }
}
~~~





## java包机制，javaDoc

![javaDoc，生成注释文档](http://47.101.155.205/1646483433125.png)

![1646483433143](http://47.101.155.205/1646483433143.png)

## java是值传递还是引用传递

值传递：值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。

引用传递：引用传递是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数。

Java是引用传递，不是值传递；



在Java中，参数传递是通过值传递（pass by value）实现的。这意味着当调用一个方法时，它的参数会被复制一份，这个副本会被传递给方法进行处理，而原始参数的值不会被改变。

在Java中，基本类型（如int、float、double等）是按值传递的，即它们的值会被复制到方法的参数中。而对于引用类型（如对象、数组等），实际上传递的是引用的副本，也就是一个指向对象的地址，因此被调用方法中的引用变量和原始引用变量指向的是同一个对象，但它们的地址副本不同。

需要注意的是，虽然Java中的参数传递是按值传递的，但对于引用类型的参数，其副本实际上指向的是对象的地址，因此被调用方法中的引用变量可以修改对象的属性，或者将其指向其他对象，从而改变原始对象的状态。但是，如果被调用方法`重新为引用变量赋值`，则其指向的是一个新的对象，而不是原始对象。







## 方法

方法的定义，

**方法重载** 

**命令行传递参数** 

![image-20220305210520166](http://47.101.155.205/image-20220305210520166.png)

方法可变参数

修饰符 返回值类型 方法名(形参){

​	方法体

}

形参可以传递可变参数，参数类型后面加...，必须出现在最后面



## 数组

~~~java
//数组的定义方式
int[] a;
int a[];
~~~

### 冒泡排序、选择排序

~~~java
//冒泡排序数组
	public static int[] sort(int[] array){

		int m = 0;
		int n = 0;
		//处理数组异常，空...
		for(int i = 0;i < array.length - 1;i++){
			boolean flag = false;
			for(int j = 0;j < array.length - 1 - i;j++){
				int temp = 0;
				if(array[j] < array[j+1]){
					temp = array[j+1];
					array[j+1] = array[j];
					array[j] = temp;
					flag = true;
				}
				n++;
			}
			if( flag == false){
				break;
			}
			m++;
		}
		System.out.println("内循环：" + n + "外循环：" + m);
		return array;
	}

//选择排序
//一轮循环选出数组中第一位元素(为最大或者最小)
for(int i = 0; i < arr.length - 1;i++){
    for(int j = i + 1; j < arr.length;j++){
    	int min = i;
        if(arr[j] < arr[min]){
        	min = j;
        }       	
    }
    if(min != i){
        int temp;
        temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}
~~~

### 稀疏数组

~~~java
int[][] array = new int[10][11];
		array[2][5] = 12;
		array[4][2] = 14;
		array[8][9] = 38;
		array[7][1] = 38;
		
		int count = 0;
		//获取原数组几行几列，多少不同于0的
		for(int i = 0;i < array.length;i++){
			for(int j = 0;j < array.length;j++){
				if(array[i][j] != 0){
					count++;
				}
			}
		}
		//创建一个新的数组(稀疏数组)
		int[][] newArray = new int[count+1][3];

		//给新的数组赋值
		newArray[0][0] = array.length;
		newArray[0][1] = array[0].length;
		newArray[0][2] = count;
		count = 0;
		for(int i = 0;i < array.length;i++){
			for(int j = 0;j < array[i].length;j++){
				if(array[i][j] != 0){
					count++;
					newArray[count][0] = i;
					newArray[count][1] = j;
					newArray[count][2] = array[i][j];
				}
			}
		}
		print(newArray);
		
		//将稀疏数组还原
		//定义还原数组的
		int[][] array1 = new int[newArray[0][0]][newArray[0][1]];
		//遍历稀疏数组取值
		for(int i = 1;i < newArray.length;i++){
			
			//int m = newArray[i][0];
			//int n = newArray[i][1];
			array1[newArray[i][0]][newArray[i][1]] = newArray[i][2];
		}
		print(array1);
	
		


	}

	//打印一维数组
	public static void print(int[] array){
		for(int i = 0;i < array.length;i++){
			if(i == 0){
				System.out.print("[" + array[i]);
			}else{
				System.out.print(", " + array[i]);
			}
			System.out.print(i == array.length - 1 ? "]" : "");
		}
	}
	public static void print(int[][] array){
		System.out.println("-----------------------------");
		for(int i = 0; i < array.length;i++){
			for(int j = 0; j < array[i].length; j++){
				System.out.print(array[i][j] + "\t");
			}
			System.out.println();
		}
		System.out.println("-----------------------------");
	}
~~~





## 控制访问权限修饰符

修饰符可以修饰类、变量、方法...

**public**：任何位置可以访问

**protected**：同包，子类

**default**：同包下可以访问

**private**：私有的，只能在本类访问

由于接口中的属性或类的定义默认是public static，所以看着没有修饰符，但是能够访问到。

![image-20241125163316538](http://47.101.155.205/image-20241125163316538.png)





## 封装

将类中的数据隐藏，提供特有的方法去访问数据

类中属性私有化private，提供方法访问数据

**访问数据的方法能加static吗？**

不能，static的方法可以直接调用，类加载的时候就被解释了，封装的属性是实例变量，这是对象还没有被创建，不能访问到数据，数据无法访问到



## 继承

### 继承的特点

~~~java
1.只支持单继承，可间接实现多继承;
2.构造方法和private修饰的fan不能被继承，其余都可以继承;
3.没有继承任何类的类，默认继承Object类;
4.继承缺点，父类的方法发生改变，对子类会有影响，耦合度高;
5.final修饰的类不能继承
~~~



父类方法getName输出的this对象还是b的地址和b一样

~~~java
public class ExtendTest01
{
	public static void main(String[] args){
		
		A b = new B("zs","100");
		
		System.out.println(b.getName());
		System.out.println(b);
	
	}
}

class A
{
	private String name;
	
	public A(){
		//this.name = "super";
		System.out.println(name);
	}

	public A(String name){
		this.name = name;
	}

	public void setName(String name){
		this.name = name;
	}

	public final String getName(){
		System.out.println(this);
		return this.name;
	}
}

class B extends A
{
	public String name;
	public String no;

	public B(){}

	public B(String name,String no){

		this.name = name;
		this.no = no;
	}
	
}
~~~





### 方法重写(方法覆盖)

**静态的方法不支持重写** 

private的方法不能被覆盖

~~~java
class User{
    User(){
        doSome();
    }
    public void doSome(){
        System.out.println("User.doSome()");
    }
    public static void main(String[] args){
        User u = new A();//A.doSome
        //如果User的doSome方法用private修饰，该方法只能在此类中调用，而且输出结果为User.doSome()
    }
}
class A extends User{
    A(){
    }
    public void doSome(){
        System.out.println("A.doSome");
    }
}
~~~

**重写的方法返回值类型是引用类型可以更小，不能更大** 

1. 子类重写父类的方法
2. 方法名必须相同
3. 参数列表返回值必须相同
4. 修饰符：范围可以扩大，但是不能缩小 public protected default private
5. 抛出的异常可以缩小，但是不能扩大
6. 构造方法不能被继承，也不能被重写(构成方法没有返回值类型，定义的方法都有返回值类型)



### 为什么要方法覆盖?



继承情况复杂，提高程序的耦合

也是为了更好的结合多态



## 多态

**开发中的应用** 

是为了降低程序的耦合性，提高程序可扩展性。

**父类的引用指向了子类对象**  

**方法需要重写**  **继承** 对象实际类型确定，指向的引用类型不确定

**编译阶段** 编译器只知道a，b，c是User类型，会去User.class中查找有没有method()方法，找到方法，绑定方法，编译阶段通过，静态绑定。

**运行阶段** a，b，c的引用指向的都是A，B，C的对象，程序在执行过程中会去找A，B，C中的的metho()方法，进行动态绑定。



~~~java
A B C 类都继承User类
User a = new A();
USer b = new B();
User c = new C();
a.method();
b.method();
c.method();
A B C 中都覆盖了User类中的方法
会出现都是User类的对象，调用method方法，出现3种不同结果的
~~~

避免ClassCastException出现，向下转型的时候，要将需要转型的引用于转型的类用instanceof判断，避免出现class类型转换异常

### instanceof关键字

~~~java
//可以作为判断依据
//Student extends Person
Person p = new Person();
System.out.println(p instanceof Student);
Student s = (Student)p;
Exception in thread "main" java.lang.ClassCastException: Person cannot be cast to Student
~~~

## super、this和static

### super 

1. super调用父类的构造方法，必须出现在构造方法的第一行，且只能出现一次
2. super只能出现在子类的方法或者构造方法中
3. super和this不能同时出现(指的是super()和this()不能同时出现)
3. 所以Object肯定是在栈顶，最先弹栈 

**可以实现创建子类型对象时，初始化父类型特征**

父类中的属性和子类的属性一样时，父类有，子类没有，要访问父类的属性，super不能省略 

### this 

1. this是指这个对象
2. this()在构造函数中直接调用会会出现递归调用(this()可以调用有参的构造方法)
3. this没有继承也可以使用

### static

**空引用访问静态不会出现空指针异常** 

**可以有多个静态代码块** 

**静态代码块可以实现日志** 

~~~java
(实例代码块)匿名代码块，创建对象，在构造方法之前执行;
{
    System.out.println("匿名代码块");
}
静态代码块，在类加载的时候就执行，只执行一次;
static{
    System.out.println("静态代码块");
}
静态导入包;
import static java.lang.Math.random;
//可以直接使用radom();生成随机数
~~~

### final

**final修饰的引用一但指向了某个引用，就不可发生改变**

final修饰的成员变量，提供无参构造方法要给他赋值，



## 抽象类 abstract



1. 不能new抽象类，要通过其普通子类进行实例化

2. 抽象方法只能存在抽象类中，抽象类中可以有普通方法

2. 抽象类，其修饰符必须为public或者protected，不能是private

2. 抽象类的所有抽象方法，继承了它的子类，除了抽象类，必须要重写方法

2. **抽象类是要先有子类，然后才抽象出父类**，是一种从下往上的构建法则。

   

   **抽象类存在构造器吗？**
   
   存在
   
   **抽象类的存在意义** 
   
   可以降低程序的耦合性，适配器模式





## 接口 interface

接口可以多继承，可以实现一个类功能的拓展

实现接口 implements

1. 实现了接口中的类，需要重写接口的所有方法；
2. 接口可以实现多继承
3. 接口定义的属性都是常量 public static final
4. 接口不能实例化，接口中没有构造方法



## 内部类

1. 静态内部类，可以通过静态内部类实现单例模式
2. 实例内部类
3. 局部内部类

内部类可以使用private protected修饰符修饰

匿名内部类是局部内部类的一种

匿名内部类的缺点，类不能重复使用，可读性差

~~~java
	public class Outer{

		private int a = 10;
		public void outer(){
			System.out.println("这是外部类的方法outer");
		}

    	//可以获得外部类的私有属性，及方法
    	//成员内部类
		class Inner1{
			public void inner(){
            outer();
			System.out.println("这是内部类的方法inner" + a);
		}
	
        
     	//静态内部类
     	static class Inner2{
			public void inner(){
            	outer();//不能使用
				System.out.println("这是内部类的方法inner");
			}
		}
    	//局部内部类
    	public void method(){
			class Inner3{
			}
		}
            
        public void doSome(){
            //doSome不能使用method的Inner3
        }
	}

//下面使用的是内部类
interface Compute{
	int sum(int a,int b);
}
class MyMath{
    public int sum(Compute c,int a,int b){
        return c.sum(a,b);
    }
}
MyMath mm = new MyMath();
int sum = mm.sum(new Compute(){
    public int sum(int a,int b){
        return a + b;
    }
},100,200)
~~~

## 枚举类

枚举类的对象是确定的，只有有限个。

使用enum关键字定义的枚举类默认继承了java.lang.Enum类，由于Java的单继承性，不能再继承其他类。

**必须要在第一行声明枚举类的对象**

~~~java
//枚举表示一枚一枚，可量化，超过两种类型使用枚举
//枚举定义语法
	enum 引用名{
        枚举数据1，枚举数据2，...
    }
enum Result{
	A,B,C,D
}
~~~

~~~java
//枚举在swich中的用法，case中直接写枚举常量
public class EnumTest01{

	public static void main(String[] args){
		System.out.println(test(55));
		switch (test(55)){
			case A:
				System.out.println("等级A");
				break;
			case B:
				System.out.println("等级B");
				break;
			case C:
				System.out.println("等级C");
				break;
			case D:
				System.out.println("等级D");
				break;
		}
	}

	public static Result test(int i){
		if(i < 100 && i >= 90){
			return Result.A;
		}else if(i < 90 && i >= 80){
			return Result.B;
		}else if(i < 80 && i >= 70){
			return Result.C;
		}else if(i < 70 && i >= 60){
			return Result.D;	
		}else{
			return Result.no;
		}
	}
}
enum Result{
	A,B,C,D,no
}
~~~



## 异常

编译时异常是Exception异常的直接子类

​	在编写时就需要处理，不处理在编译阶段就会报错

运行时异常RunTimeException

​	在程序运行时发生，需要new对象

~~~java
//异常处理的两种方式
//往上一级抛出，throws
//使用try catch捕捉异常
String str = exception.getMessage();
//异常信息字符串
exception.printStackTrace();
//打印异常堆中跟踪信息。
//try不能单独使用，
//try finally可以连用
//先执行try再执行finally，return最后执行，(return执行方法结束)
try{
    System.out.println("try");
    return;
}finally{
    System.out.println("finally");
}

//JVM关闭，finally语句不会执行
try{
	System.out.println("try");
	System.exit(0);
	return;
}finally{
	System.out.println("finally");
}

//java代码自上而下执行
//return语句最后执行

//以下代码结果
public class ExceptionTest
{
	public static void main(String[] aegs){
		System.out.println(doSome());
	}
	
	public static int doSome(){
		int i = 100;
		try{
			i = 100;
			return i;
		}finally{
			i++;
		}
	}
	
}
~~~

**infinity** 无穷大

~~~java
try{
	System.out.println(1/0);//1
	System.out.println(divide(1,0));//2
}
catch (ArithmeticException e)
{
	System.out.println("出现ArithmeticException");
}finally{
	System.out.println("finally最终被执行");
}
public static double divide(double a,double b){
	return a/b;
}

/*
	1在上面的结果
	出现ArithmeticException
	finally最终被执行
	
	2单独出现的结果
	Infinity
	finally最终被执行
	
	2在上面的结果
	Infinity
	出现ArithmeticException
	finally最终被执行
	
*/
~~~

**结论** ***当double类型作为除数时，不会出现ArithmeticException异常***

~~~java
public static void main(String[] args) throws Exception{
		
	try{
		System.out.println(divide(1,0));
	}catch(ArithmeticException e){
		Exception ee = e;
		System.out.println(ee.getMessage());
	}finally{
		System.out.println("finally");
	}
}

public static double divide(int a,int b){
	if(b == 0){
		Exception e = new ArithmeticException();//我认为是异常只是抛出了异常，程序不知道哪里出现了问题
		System.out.println(e.getMessage());
		throw new ArithmeticException("除数为0");
	}
	return a/b;
}
/*
---------- java ----------
null
除数为0
finally

输出完成 (耗时 0 秒) - 正常终止
*/

public static void main(String[] args) throws Exception{
		
	try{
		System.out.println(divide(1,0));
	}catch(ArithmeticException e){catch 捕捉到了异常e = new ArithmeticException("by zero");所以才有后面的输出
		Exception ee = e;
		System.out.println(ee.getMessage());
	}finally{
		System.out.println("finally");
	}
}

public static double divide(int a,int b){
	/*if(b == 0){
		Exception e = new ArithmeticException();//我认为是异常只是抛出了异常，程序不知道哪里出现了问题
		System.out.println(e.getMessage());
		throw new ArithmeticException("除数为0");
	}*/
	return a/b;
}
/*
---------- java ----------
/ by zero
finally

输出完成 (耗时 0 秒) - 正常终止
*/
~~~

### 思考如何自定义抛出异常

1、定义一个类去继承Exception类

2、会出现异常的方法throw new 异常类；

3、调用的方法try catch捕捉异常



## 栈数据结构

java中方法的调用都是需要压栈弹栈，遵循先进后出的原则

## OOA OOD OOP 

## 常用类分析

### String

char charAt(int i)

~~~java
char c = "欧阳".charAt(1);//阳
~~~

int compareTo(String s)比较字符串的大小

**boolean contains(String s) 判断字符串是不是包含s** 

boolean endsWith(String s)判断字符串是不是以s结尾

Boolean equalsIgnoreCase(Strings s)判断字符串不区分大小写

**int indexOf(String s)判断字符串s在字符串第一次出现的索引** 

int indexOf(String s，int i)从i开始检索

boolean isEmpty() 字符串是不是空串

**int lastIndexOf(String s)** 

**String replace(String old,String new)** 

**String[] split(String regex)** 

boolean startsWith(String s)

String substring(int i)

String subString(int beginIndex,int endIndex);

**char[] toCharArray()** 

**String toLowerCase()** 

**String UpperCase()** 

**String trim() 去除前后空格** 

**static valueOf(Object obj)将括号里面的类型转换为字符串** 

""括起来的都是String对象，存在方法区的字符串常量池里面

~~~java
String a = "123";
String b = "123";
System.out.println(a == b);//true
因为字符串常量池中有一个对象，对象的地址存在堆中，a，b存的都是字符串常量的地址
String c = "123123";
String d = a + b;
System.out.println(c == d);//false
~~~

~~~java
private final char value[];
public String() {
    this.value = "".value;
}
public String(String original) {
	this.value = original.value;
    this.hash = original.hash;
}
	//String中重写的equals方法
	public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
~~~

### StringBuffer

底层会通过byte[]数组扩容(jkd8底层代码是char数组)

指定初始化容量的StringBuffer对象

synchronized关键字修饰方法，在多**线程运行下安全**



### StringBuilder



### 包装类

1. Byte
2. Short
3. Character
4. Integer
5. Long
6. Double
7. Float
8. Boolean

~~~java
int i = Integer.parseInt(String s);//字符串转换为int类型
Integer in = Integer.valueOf(int i);
~~~



~~~java
//自动装箱
Integer i = 100;
//自动拆箱
int b = i;
System.out.println(i + 1);
Integer i1 = 1000;
Integer i2 = 1000;
System.out.println(i1 == i2);//false
Integer a = 127;
Integer b = 127;
System.out.println(a == b);//true
Integer c = 128;
Integer d = 128;
System.out.println(a == b);//false
因为java为了提高程序的执行效率，将[-128,127]之间的包装对象提前创建好了，放入了方法区整数型常量池里面去了，目的使用这个区间的数据就不用new对象了，直接从整数型常量池里面取出来。
~~~

![](http://47.101.155.205/Byte创建常量池代码.png)

![](http://47.101.155.205/String,int,Integer直接转换.png)

### Object

**toString方法** 返回字符串形式的对象16进制的地址

~~~java
public String toString() {
	return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
~~~

**equals方法** 为了比较两个对象是否相等，后期大概率是需要重写equals方法，重写之后比较对象里面的数据是否相同 

~~~java
public boolean equals(Object obj) {
	return (this == obj);
}
~~~

**finalize方法** 

~~~java
//方法只有一个方法体
//不需要程序员调用，JVM的垃圾回收器负责调用这个方法
//是一个时机，垃圾销毁时机，希望对象销毁时机执行一段代码，这段代码需要写到finally()中
protected void finalize() throws Throwable { }
System.gc();
//可以启动了垃圾回收机制
~~~

**hashCode方法** 

~~~java
//native关键字底层调用C++程序
public native int hashCode();
~~~

**clone方法** 

~~~java
---------- javac ----------
ObjectTest.java:6: 错误: clone()可以在Object中访问protected
		Object b = c.clone();
		            ^
1 个错误

输出完成 (耗时 0 秒) - 正常终止
深克隆浅克隆
~~~

### Date

~~~java
//日期格式化
Date nowTime = new Date();

SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss sss");
String timeStr = sdf.format(nowTime);

//字符串日期转换为时间
String time = "2022-03-10 23:36:11";
SimpledateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
Date dateTime = sdf.parse(time);
System.out.println(time);
~~~

~~~java
//通过毫秒数创建Date对象
Date time = new Date(long date);
//获取当前时间自1970-1-1 00:00:00 000的毫秒数
long date = System.currentTimeMillis();
~~~

### DecimalFormat

~~~java
# 代表任意数字
, 代表千分位
. 代表小数点
0 代表不够时补0
    DecimalFormat df = new DecimalFormat("###,###.##0")
~~~

### BigDecimal

~~~java
		BigDecimal bg1 = new BigDecimal(1111111);
		BigDecimal bg2 = new BigDecimal(11);
		System.out.println(bg1.divide(bg2));

---------- java ----------
Exception in thread "main" java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
	at java.math.BigDecimal.divide(BigDecimal.java:1690)
	at BigDecimalTest.main(BigDecimalTest.java:6)

输出完成 (耗时 0 秒) - 正常终止
~~~



### Random

~~~java
Random r = new Random();
r.nextInt();
r.nextInt(111);
~~~

在r.nextInt(5)的情况下生成5个不同的随机数

~~~java
import static java.lang.Math.random;
import java.util.Random;
public class RandomTest{
	public static void main(String[] args){
		Random r = new Random();
		int[] arr = new int[5];
		arr[0] = r.nextInt(5);
		outer: for(int i = 1;i < arr.length;i++){
			int temp = r.nextInt(5);
			for(int j = 0;j < i;j++){
				if(arr[j] == temp){
					i--;
					continue outer;
				}
			}
			arr[i] = temp;
		}
		for(int i = 0;i < arr.length;i++){
			System.out.println(arr[i]);
		}
	}
}
~~~













### Arrays

~~~java
//数组中的排序方法，将传递的实参发生了改变，将底层的数组元素更换了
import java.util.Arrays;
import java.util.Random;
public class RandomTest02{
	public static void main(String[] args){
		int[] arr = {2,1,4,2,4,6,9,22};
		sort(arr);
		System.out.println("==============");
		for(int i = 0;i < arr.length;i++){
			System.out.println(arr[i]);
		}
	}

	public static void sort(int[] arr){
		Arrays.sort(arr);
		for(int i = 0;i < arr.length;i++){
			System.out.println(arr[i]);
		}
	}
}
~~~





### StartUML



## 集合

集合类是用来存放某类对象的。

集合不能存储基本数据类型，集合中存储的是内存地址（内存地址指向对象）

集合本身就是对象

**不同集合，底层对应不同的数据结构，用不同的集合中存储元素，等于将数据放到不同的数据结构中。**

数组、二叉树、链表、哈希表……

### collection集合

![collection接口关系](http://47.101.155.205/1647264226260.png)

#### 集合迭代

~~~java
//获取集合的迭代器
Colletion c = new HashSet();
...;
Iterator i = c.iterator();

~~~



#### List集合特有方法

~~~java
int indexOf(Object o);
void add(int i,Object o);
Object get(int i);
boolean add(Object o);//末尾添加元素
~~~

~~~java
Collection c = new HashSet();
c.add(1);
c.add(1433);
c.add(10);
c.add(111);
c.add(222);
List l = new ArrayList(c);
//转换的集合保留原有的HashSet的顺序
~~~

#### 单线链表数据结构

**链表** ：基本的单元是节点Node

单线链表：任何一个节点都有两个属性

​				1.存储的数据		2.下一节点的内存地址

~~~java
class Node{
    Object data;
    Node next;
    
    public Node(){}
    
    public Node(Object data,Node next){
        this.data = data;
        this.next = next;
    }
}

class Link{
    Node header;
    
    //末尾添加元素
}
~~~

#### Collections类

Collections.synchronizedList(List`<T>` l);

Collections.sort(List list);

#### Vector集合

线程安全的




### Map集合

![](http://47.101.155.205/97824416472649452.png)




~~~java
Map map = new Hashtable();
map.put(null,null);
//key和value都不能为空
~~~

#### Map接口常用方法

~~~java
//Map接口常用方法
V put(K key,V value);//如果key相同，会将value覆盖
V get(Object key);
void clear();
boolean containsKey(Object key);
boolean containsValue(Object value);
boolean isEmpty();

Set<K> keySet();
Collection<V> values();
Set<Map.Entry<K,V>> entrySet();//key=value;
//Map.Entry是静态内部类

V remove(Object key);
boolean remove(Object key,Object value);
int size();

//node
Set<Map.Entry<Integer,String>> set = map.entrySet();
for(Map.Entry<Integer,String> node : set){
	System.out.println(node.getKey() + " = " + node.getValue());
}

	static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;

        Node(int hash, K key, V value, Node<K,V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }

        public final K getKey()        { return key; }
        public final V getValue()      { return value; }
        public final String toString() { return key + "=" + value; }

        public final int hashCode() {
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }

        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                if (Objects.equals(key, e.getKey()) &&
                    Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }
    }
~~~





~~~java
boolean add(Object o);
int size();
void clear();//清空集合
boolean remove(Object o);//删除元素o
boolean contains(Obejct o);//判断是否有元素o
boolean isEmpty();//判断集合是否为空
Object[] toArray();//转换为数组

~~~


#### Map集合的遍历

~~~java
Set<T> set = map.keySet();
Iterator it = set.iterator();
while(it.hasNext()){
    Object key = it.next();
    Object value = map.get(key);
}

Set<Map.Entry<K,Y>> set = map.netrySet();
Iterator<Map.Entry<K,Y>> it = set.iterator();
while(it.hasNext()){
    Map.Entry<K,Y> entry = it.next();
    Object K = entry.getKey();
    Object V = entry.getValue();
}
~~~



#### 哈希表 

**HashMap的底层是哈希表的数据结构。哈希表是一个数组和链表的结合体。**

~~~java
	static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

	for(int i = 0;i < 101;i++){
		System.out.println(String.valueOf(i).hashCode());
	}
//hash值都不相同
~~~

HashMap默认初始化容量是16，默认加载因子是0.75

HashMap初始化容量建议是2的倍数。



![](http://47.101.155.205/140986916473489532.png)

TreeSet，TreeMap

##### TreeMap需要重写equals，hashaCode

~~~java
public boolean equals(Object o){
	if(o == null || !(o instanceof Student)) return false;
	if(o == this) return true;
	Student s = (Student)o;
	return this.name.equals(s.name);
}

public int hashCode(){
	return Objects.hash(name);
}
~~~

#### 哈希碰撞



### 泛型`<T>`

Collection`<String> `c = new ArrayList<>();

~~~java
//自定义泛型
public class A<T>{
    public void doSome(T o){
        System.out.println(o);
    }
}
A<String> a = new A<>();
a.doSome("aafa");
~~~

### TreeSet集合

底层用的是TreeMap集合

要实现集合中元素的排序，要将比较的元素实现Comparable接口

而且里面存储的元素要是同类型才能比较

~~~java
---------- java ----------
Exception in thread "main" java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer
	at java.lang.Integer.compareTo(Integer.java:52)
	at java.util.TreeMap.put(TreeMap.java:568)
	at java.util.TreeSet.add(TreeSet.java:255)
	at TreeSetTest.main(TreeSetTest.java:13)

输出完成 (耗时 0 秒) - 正常终止
    
~~~

需要集合存储的的元素实现Comparable接口重写compareTo()方法

~~~java
import java.util.*;
public class TreeSetTest01{
	public static void main(String[] args){
		TreeSet<Student> set = new TreeSet<>();
		Student s1 = new Student("zs",18);
		Student s2 = new Student("ls",12);
		Student s3 = new Student("ls",18);
		Student s4 = new Student("ls",18);
		set.add(s1);
		set.add(s2);
		set.add(s3);
		set.add(s4);
		for(Student s : set){
			System.out.println(s);
		}
	}
}

class Student implements Comparable<Student>
{
	String name;
	int age;

	public Student(){}

	public Student(String name,int age){
		this.name = name;
		this.age = age;
	}

	public int compareTo(Student s){
		if(this.age == s.age){
			return this.name.compareTo(s.name);
		}else{
			return this.age - s.age;
		}
	}

	public String toString(){
		return this.name + " 年龄：" + this.age;
	}


}
~~~





构造比较器方式

~~~java
import java.util.*;
public class TreeSetTest02{
	public static void main(String[] args){
		TreeSet<Student> set = new TreeSet<>(new Comparator<Student>(){
			public int compare(Student s1,Student s2){
				if(s1.age == s2.age){
					return s1.name.compareTo(s2.name);
				}else{
					return s1.age - s2.age;
				}
			}
		});
		Student s1 = new Student("zs",18);
		Student s2 = new Student("ls",12);
		Student s3 = new Student("ls",18);
		Student s4 = new Student("ls",18);
		set.add(s1);
		set.add(s2);
		set.add(s3);
		//set.add(s4);
		for(Student s : set){
			System.out.println(s);
		}
	}
}

class Student
{
	String name;
	int age;

	public Student(){}

	public Student(String name,int age){
		this.name = name;
		this.age = age;
	}

	public String toString(){
		return this.name + " 年龄：" + this.age;
	}


}

class StudentComparator implements Comparator<Student>{
	
	public int compare(Student s1,Student s2){
		if(s1.age == s2.age){
			return s1.name.compareTo(s2.name);
		}else{
			return s1.age - s2.age;
		}
	}
	
	//默认继承Object类，不用重写equals方法？

}
~~~



比较使用实现Comparable接口和构造器使用方式

**比较规则固定，使用Comparable接口** 

### 需要掌握的集合内容

ArrayList

LinkedList

Vector

HashSet

TreeSet

HashMap

TreeMapa

Hashtable

Properties

### 自平衡二叉树

![](http://47.101.155.205/106117416473941372.png)



各集合的特点

1. List集合特点：有序可重复(可以添加null)
2. Set集合：无序不可重复(TreeSet的key不可为null，Hash的key可以为null)
3. SortedSet：无序不可重复，集合中的元素是可排序的
4. Map：无序不可重复，
5. SortedMap：无序不可重复，里面的key可以排序，(key不可为null)




##  IO

~~~java
/*
IO流分类方式：
	按照流的方向，以内存作为参照物，
		往内存中去，输入流(Input)，或者叫做读
		从内存出来，输出流(Ouput),或者叫做写	
	
	按照流读取数据方式不同进行分类
		字节流：字节方式读取数据，一次读取一个字节byte，等同于读取8个二进制
		字符流：字符方式读取数据，一次读取一个字符，只能读取普通文本文件
	
	流中的构造方法中传递的是流，传递流叫节点流，外部负责处理的流叫做包装流(处理流)	
*/
~~~

~~~java
InputStream;//字节输入流
OutputStream;//字节输出流

Reader;//字符输入流
Writer;//字符输出流
	//所有的流都实现了java.io.Closeable接口，所有的流用完都需要关闭
	//所有输出流都实现了java.io.Flushable接口，都是可刷新的，输出流在输出之后，一定要flush()，强行输出完，
	///如果没有使用flush()，可能会导致丢失数据
~~~

### 16个流

~~~java
//文件专属
java.io.FileInputStream;
java.io.FileOutputStream;
java.io.FileReader;
java.io.FileWriter;

//转换流(字节流转换成字符流)
java.io.InputStreamReader;
java.io.OutputStreamWriter;

//缓冲流
java.io.BufferedInputStream;
java.io.BufferedOutputStream;
java.io.BufferedReader;
java.io.BufferWriter;

//数据流专属
java.io.DataInputStream;
java.io.DataOutputStream;

//标准输出流
java.io.PrintWriter;
java.io.PrintStream;

//对象流
java.io.ObjectInputStream;
java.io.ObjectOutputStream;
~~~



![](http://47.101.155.205/Snipaste_2022-03-16_17-12-19.png)

***读取中文，idea一个中文占用3个字节***

![](http://47.101.155.205/Snipaste_2022-03-16_21-31-12.png)

![](http://47.101.155.205/Snipaste_2022-03-16_21-32-35.png)

#### FilelnputStream

~~~java
FileInputStream;
int read();//返回读取到字节的数据
int read(byte[] b);//返回读取到数组的数，没有就是-1
int available();//返回剩余的字节数
long skip(long l);
~~~

~~~java
FileOutputStream;
FileOutputStream fos = new FileOutputStream("");
//没有文件会创建文件，会清空源文件的内容
void fos.write(int int);
void fos.write(byte[] b);
void fos.write(byte[]b,int start,int end);
fos.flush();
FileOutputStream fos = new FileOutputStream("outTest",true);
//true表示在文件的末尾写入
~~~

#### FileReader

~~~java
FileReader;
int read();
int read(char[] chars);
~~~

~~~java
FileWriter;
void write(char[] chars);
void write(char[]chars,int stard,int leng);
void write(String str);
~~~

#### BufferedReader

~~~java
//流中的构造方法中传递的是流，传递流叫节点流，外部负责处理的流叫做包装流(处理流)

BufferedReader;
FileRead fr = new FileReader("文件路径");
//Reader不能传递字节流
BufferedReader br = new BufferedReader(Reader in);
String readLine();//不带换行
~~~



~~~java
BufferedWriter;
BufferedWriter bw = new BufferedWriter(Writer out)
FileOutputStream fos = new FileOutputStream("文件路径");
OutputStreamWriter osw = new OutputStreamWriter(fos);
BufferedWriter bw = new BufferedWriter(osw);
bw.write(String s);
bw.write(String s,int off,int len);
bw.newLine();
bw.write(char[],int off,int len);
~~~



#### InputStreamReader

~~~java
FileInputStream fis = new FileInputStream("文件路径");
InputStreamReader isr = new InputStreamReader(fis);
BufferReader bf = new BufferedReader(isr);

~~~



~~~java
FileOutputStream fos = new FileOutputStream("文件路径");
OutputStreamWriter osw = new OutputStreamWriter(fos);
BufferedWriter bw = new BufferedWriter(osw);
~~~

#### DataOutputStream

~~~java
DataOutputStream;
DataOutputStream dos = new DataOutputStream(OutputStream out);
writeInt(int v);
writeShort(short v);
writeByte(int v);
writeChar(int v);
writeBoolean(boolean v);
writeFloat(float v);
writeDouble(double v);
writeLong(long v);
~~~

~~~java
//专门读DataOutputStream写的文件，什么顺序写的，什么顺序读
DataInputStream;
DataInputStream dos = new DataInputStream(InputStream out);
~~~

#### PrintStream

~~~java
//标准输出流不用关闭
PrintStream;
PrintStream ps = System.out;
//将标准输出流指向文件
PrintStream ps = new PrintStream(new FileOutputStream(""),true);
//修改标准输出流的方向，指向文件，常用在日志
System.setOut(PrintStream out);
~~~



~~~java
PrintWriter;
~~~

#### ObjectInputStream

~~~java

~~~



### File

~~~java
//File是文件和路径名的抽象表达式
boolean createNewFile();//如果文件不存在，创建一个文件
File file = new File("D:\\F\\Day13\\File01");
//只能创建文件File01，不能创建没有的路径

boolean exists();//文件或者路径是否存在
File getAbsoluteFile();//获取抽象路径的绝对路径
String getAbsolutePath();//获取抽象路径的绝对路径
String getName();//获取当前文件名，或者路径当前名
String getPath();//获取路径全名称，创建文件File对象时，是绝对路径，就是全部的绝对路径，抽象路径就是抽象路径
String getParent();getParent + \ + getName = getPath();//绝对路径的情况下。抽象路径为空getParent() = getPath()
File getParentFile();//获取当前文件或者路径的上一级路径对象

boolean mkdir();//只能创建当前路径一个文件D:\E\Day13\test.st
boolean mkdirs();//可以创建绝对路径文件夹

boolean isDirectory();
boolean isFile();
long lastModified();
long length();
File listFiles();
boolean renameTo(File dest);

~~~

### IO和Properties

~~~java
public class IOPropertiesTest01 {
    public static void main(String[] args) throws Exception {
        FileReader fr = new FileReader("properties");
        Properties properties = new Properties();
        System.out.println(properties);
        properties.load(fr);
        System.out.println(properties);
    }
}
//属性配置文件，经常修改的文件，可以放在属性培训文件中，可以实现文件不编译，修改程序的内容
~~~



## 序列化

缓存的时候需要使用

~~~java
//序列化：Serialize java对象储存到文件中，将java对象的状态保存下来
//反序列化：Deserialize 将硬盘的数据重新恢复到内存中，恢复成java对象
~~~

~~~java
---------- java ----------
Exception in thread "main" java.io.NotSerializableException: Student
	at java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1184)
	at java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:348)
	at ObjectOutputStreamTest01.main(ObjectOutputStreamTest01.java:12)

输出完成 (耗时 0 秒) - 正常终止
~~~



**后期了解** 



~~~java
//标志接口
Serializable;
public interface Externalizable extends Serializable;
后期了解

~~~

~~~java
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;


public class ObjectOutputStreamTest01 {
    public static void main(String[] args) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("Student"));
        Student s1 = new Student("zs",123);
        Student s2 = new Student("ls",114);
        oos.writeObject(s1);
        oos.writeObject(s2);
        oos.flush();
        oos.close();
    }
}
class Student implements Serializable{
    String name;
    int no;

    public Student() {
    }

    public Student(String name, int no) {
        this.name = name;
        this.no = no;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", no=" + no +
                '}';
    }
}

~~~

~~~java
//序列化多个对象，可以将对象放入集合中，将集合对象序列化，集合接口实现了Serializable接口
transient;//修饰属性不参与序列化
~~~

~~~java
Exception in thread "main" java.io.InvalidClassException: com.javase.io.Student; local class incompatible: stream classdesc serialVersionUID = 8680725677980533029, local class serialVersionUID = -6433898087862926147
	at java.io.ObjectStreamClass.initNonProxy(ObjectStreamClass.java:616)
	at java.io.ObjectInputStream.readNonProxyDesc(ObjectInputStream.java:1630)
	at java.io.ObjectInputStream.readClassDesc(ObjectInputStream.java:1521)
	at java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:1781)
	at java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1353)
	at java.io.ObjectInputStream.readObject(ObjectInputStream.java:373)
	at com.javase.io.ObjectInputStreamTest01.main(ObjectInputStreamTest01.java:10)

Process finished with exit code 1

~~~

~~~java
//序列化版本号
serialVersionUID;
~~~

## 多线程

~~~java
//进程:是一个应用程序
//线程:是一个进程中的执行场景/执行单元
/*
	java中线程中堆内存，方法区内存可以共享
	java中一个线程一个栈
*/
~~~



~~~java
/*
单核CPU，能做到多线程并行吗？并发：t1线程t1，t2执行t2线程，t1不会影响t2，t2也不会影响t1
	单核CPU不能做到真正的多线程并行。
*/
~~~

~~~java
//创建线程的一种方式，继承Thread类，重写run方法
class MyThread extends Thread{
    public void run(){
        
    }
}
//开启线程
MyThread mt = new MyTHread();
//start方法启动分支线程，在JVM中开辟一个新的栈空间，这段代码任务完成，瞬间就结束了。
//启动成功的线程会自动调用run方法，并且run方法在分支栈的底部
//main方法在主栈的栈底部，run方法在分支栈的栈底部，run和main是平级
mt.start();
~~~

~~~java
Thread t = new Thread(new Runnable(){
    public void run(){
        //重写run方法
    }
});
t.start();
~~~

并发与并行

~~~java
并发和并行是即相似又有区别的两个概念;
	并行是指两个或者多个事件在同一时刻发生;
	而并发是指两个或多个事件在同一时间间隔内发生。
~~~

### 线程的状态

1. NEW：新建状态。
2. RUNNABLE：可运行状态。
3. BLOCKED：阻塞状态。
4. WAITING：等待状态。
5. TIMED_WAITING：计时等待状态。
6. TERMINATED：终止状态。





1. NEW：新建状态。在创建线程对象之后，线程对象还没有开始运行，此时线程的状态是 NEW。
2. RUNNABLE：可运行状态。一旦调用线程的 start() 方法，线程就会进入 RUNNABLE 状态。在 RUNNABLE 状态下，线程可能正在等待 CPU 时间片，也可能正在执行任务，这取决于操作系统的调度算法。
3. BLOCKED：阻塞状态。当线程试图获取一个已被其他线程获取的对象锁时，线程会进入 BLOCKED 状态。在 BLOCKED 状态下，线程将被阻塞，无法执行任何操作，直到获取到对象锁为止。
4. WAITING：等待状态。当线程等待某个条件满足时，线程会进入 WAITING 状态。在 WAITING 状态下，线程将一直等待，直到被其他线程唤醒。
5. TIMED_WAITING：计时等待状态。当线程需要等待一段时间，或者等待某个条件满足一定时间时，线程会进入 TIMED_WAITING 状态。在 TIMED_WAITING 状态下，线程将等待一段时间，或者等待条件满足后自动唤醒。
6. TERMINATED：terminated终止状态。当线程的 run() 方法执行完毕或者抛出异常时，线程就会进入 TERMINATED 状态。在 TERMINATED 状态下，线程将不再执行任何操作，直到被销毁。



### 线程的生命周期

![](http://47.101.155.205/105860916476622222.png)



~~~java
//线程方法
setName(String name);//修改线程名字
getName();//获取此线程名称
static currentThread();//获取当前线程对象
static sleep(long millis);//让当前线程进入休眠，进入阻塞状态，会影响当前线程后面代码的执行
interrupt();//中断线程休眠，通过trycatch中断
stop();//终止线程,方法过时

~~~

线程调度

~~~java
void setPriority(int newPriority);//设置线程优先级最低1，最高10，默认5
int getPriority();//返回
void join();//当前线程阻塞，此引用的线程执行完再执行，如果主线程这样调会怎么样
static void yield();

~~~

### 同步和异步

synchronized关键字，可用来给对象和方法或者代码块加锁,相当于不管哪一个线程（例如线程A），运行到这个方法时,都要检查有没有其它线程B（或者C、 D等）正在用这个方法(或者该类的其他同步方法)，有的话要等正在使用synchronized方法的线程B（或者C 、D）运行完这个方法后再运行此线程A,没有的话,锁定调用者,然后直接运行。它包括两种用法：synchronized 方法和 synchronized 块。

当它锁定一个方法或者一个代码块的时候，同一时刻最多只有一个线程执行这段代码。

~~~java
synchronized("传递共享的对象"){
    //将共享对象的锁锁住了
}
//sycchronized代码块
//synchronized修饰实例方法，整个方法都需要同步，默认的共享对象是this
//synchronized修饰静态方法，表示找类锁，类锁永远只有一把
//排它锁
~~~

### 死锁

~~~java
---------- java ----------
2022-03-19 22:51:38
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.101-b13 mixed mode):

"SIGINT handler" #22 daemon prio=9 os_prio=2 tid=0x000000001f2f3000 nid=0x49f8 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"DestroyJavaVM" #21 prio=5 os_prio=0 tid=0x0000000003740800 nid=0x51b8 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Thread-1" #20 prio=5 os_prio=0 tid=0x000000001f2f2000 nid=0x18c8 in Object.wait() [0x0000000021c6e000]
   java.lang.Thread.State: RUNNABLE
	at Test02.<init>(LockTest.java:57)
	at Test02.<clinit>(LockTest.java:55)
	at Thread02.run(LockTest.java:25)

"Thread-0" #19 prio=5 os_prio=0 tid=0x000000001f2f1000 nid=0x238 in Object.wait() [0x0000000021b6e000]
   java.lang.Thread.State: RUNNABLE
	at Test01.<init>(LockTest.java:33)
	at Test01.<clinit>(LockTest.java:32)
	at Thread01.run(LockTest.java:15)

"Service Thread" #18 daemon prio=9 os_prio=0 tid=0x000000001f273000 nid=0x30e0 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread11" #17 daemon prio=9 os_prio=2 tid=0x000000001f1a2800 nid=0x2028 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread10" #16 daemon prio=9 os_prio=2 tid=0x000000001f1a2000 nid=0x292c waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread9" #15 daemon prio=9 os_prio=2 tid=0x000000001f1a5000 nid=0x4ca0 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread8" #14 daemon prio=9 os_prio=2 tid=0x000000001f1a0800 nid=0x520 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread7" #13 daemon prio=9 os_prio=2 tid=0x000000001f1a4000 nid=0x5188 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread6" #12 daemon prio=9 os_prio=2 tid=0x000000001f19e000 nid=0x4330 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread5" #11 daemon prio=9 os_prio=2 tid=0x000000001f19b800 nid=0x4dbc waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread4" #10 daemon prio=9 os_prio=2 tid=0x000000001f18e800 nid=0x3e98 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread3" #9 daemon prio=9 os_prio=2 tid=0x000000001f18a800 nid=0x30e8 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread2" #8 daemon prio=9 os_prio=2 tid=0x000000001f188000 nid=0xf08 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread1" #7 daemon prio=9 os_prio=2 tid=0x000000001f187000 nid=0x1f4c waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread0" #6 daemon prio=9 os_prio=2 tid=0x000000001f185800 nid=0x4a78 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Attach Listener" #5 daemon prio=5 os_prio=2 tid=0x000000001f184800 nid=0x348 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Signal Dispatcher" #4 daemon prio=9 os_prio=2 tid=0x000000001f135800 nid=0x456c waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Finalizer" #3 daemon prio=8 os_prio=1 tid=0x000000001f116800 nid=0xab8 in Object.wait() [0x0000000020a6f000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	- waiting on <0x000000076b988ee0> (a java.lang.ref.ReferenceQueue$Lock)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)
	- locked <0x000000076b988ee0> (a java.lang.ref.ReferenceQueue$Lock)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)
	at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)

"Reference Handler" #2 daemon prio=10 os_prio=2 tid=0x000000001f0f5000 nid=0x17e4 in Object.wait() [0x000000002096e000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	- waiting on <0x000000076b986b50> (a java.lang.ref.Reference$Lock)
	at java.lang.Object.wait(Object.java:502)
	at java.lang.ref.Reference.tryHandlePending(Reference.java:191)
	- locked <0x000000076b986b50> (a java.lang.ref.Reference$Lock)
	at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)

"VM Thread" os_prio=2 tid=0x000000001f0f0800 nid=0x12a0 runnable 

"GC task thread#0 (ParallelGC)" os_prio=0 tid=0x0000000003756800 nid=0x5124 runnable 

"GC task thread#1 (ParallelGC)" os_prio=0 tid=0x0000000003758000 nid=0xf98 runnable 

"GC task thread#2 (ParallelGC)" os_prio=0 tid=0x0000000003759800 nid=0x2ab0 runnable 

"GC task thread#3 (ParallelGC)" os_prio=0 tid=0x000000000375b000 nid=0x2c30 runnable 

"GC task thread#4 (ParallelGC)" os_prio=0 tid=0x000000000375d800 nid=0x38b8 runnable 

"GC task thread#5 (ParallelGC)" os_prio=0 tid=0x000000000375f800 nid=0x277c runnable 

"GC task thread#6 (ParallelGC)" os_prio=0 tid=0x0000000003763000 nid=0x2d58 runnable 

"GC task thread#7 (ParallelGC)" os_prio=0 tid=0x0000000003764000 nid=0x2048 runnable 

"GC task thread#8 (ParallelGC)" os_prio=0 tid=0x0000000003765000 nid=0x1ed4 runnable 

"GC task thread#9 (ParallelGC)" os_prio=0 tid=0x0000000003766800 nid=0x35c4 runnable 

"GC task thread#10 (ParallelGC)" os_prio=0 tid=0x0000000003767800 nid=0x1878 runnable 

"GC task thread#11 (ParallelGC)" os_prio=0 tid=0x000000000376a800 nid=0x39f0 runnable 

"GC task thread#12 (ParallelGC)" os_prio=0 tid=0x000000000376c000 nid=0x3a4c runnable 

"VM Periodic Task Thread" os_prio=2 tid=0x000000001f237000 nid=0x2274 waiting on condition 

JNI global references: 6

Heap
 PSYoungGen      total 75776K, used 9104K [0x000000076b980000, 0x0000000770e00000, 0x00000007c0000000)
  eden space 65024K, 14% used [0x000000076b980000,0x000000076c264020,0x000000076f900000)
  from space 10752K, 0% used [0x0000000770380000,0x0000000770380000,0x0000000770e00000)
  to   space 10752K, 0% used [0x000000076f900000,0x000000076f900000,0x0000000770380000)
 ParOldGen       total 173568K, used 0K [0x00000006c2c00000, 0x00000006cd580000, 0x000000076b980000)
  object space 173568K, 0% used [0x00000006c2c00000,0x00000006c2c00000,0x00000006cd580000)
 Metaspace       used 2659K, capacity 4492K, committed 4864K, reserved 1056768K
  class space    used 291K, capacity 388K, committed 512K, reserved 1048576K


输出完成 (耗时 6 秒) - 已被用户取消。
~~~

Thread.currentThread().join();在main方法中这样做，会出现死锁



解决线程安全问题方法

~~~java
1.使用局部变量代替实例变量和静态变量;
2.对象不共享;
3.线程同步机制;
~~~



### 守护线程

java中有两大线程类：守护线程(后台线程)、用户线程

垃圾回收线程也是守护线程。

守护线程：一般守护线程是一个死循环，所有用户线程只要结束，守护线程自动结束。

设置线程为守护线程

~~~java
setDaemon(true);
~~~



### 定时器

java.util.Timer;

~~~java
void schedule(TimerTask task, Date firstTime, long period);
Timer t = new Timer();
t.schdule(new TimerTask(){
    public void run(){
        
    }
},date,period)
~~~



### 第三种实现线程方式

实现Collable接口

~~~java
java.util.concurrent.Callable;
java.util.concurent.FutureTask;
FutureTask构造方法传递一个Callable类型的引用对象;
Thread构造方法传递FutureTask的引用对象;
t.start();
返回值 FutureTask的对象调用get方法;
FutureTask task = new FutureTask(new Callable<T>(){
    T call(){
        return ;
    }
});
Thread t = new Thread(task);
t.start();

T o = task.get();//会让当前线程进入等待状态，直到上面的线程出结果

~~~



### wait和notify

~~~java
wait和notify是java对象的方法;
	Object o = new Object();
	o.wait();
表示o对象上活动的当前线程进行等待，无期限等待，直到被唤醒;
会让正在o对象上活动的线程进行等待状态，并且释放之前占有的o对象的锁;
notify();
notifyAll();//唤醒全部o对象上等待的线程

wait和notify方法是建立在synchronized线程同步的基础上;
~~~



### 生产者和消费者模式



### lock

锁是一种通过**多线程控制对共享资源的访问的工具**。通常，一个锁提供对共享资源的独占访问：在**一个时间**只有**一个线程**可以获得锁和所有访问共享资源，需要先获得锁。然而，有些锁可以允许并发访问共享资源，如一个ReadWriteLock读锁。



## reflect反射

~~~java
反射机制:
	通过java代码操作字节码文件，可以读和修改字节码文件;

java.lang.reflect.*;

java.lang.Class;//代表字节码文件
java.lang.reflect.Constructor;//代表字节码中的构造方法字节码
java.lang.reflect.Field;//代表字节码中的属性字节码
java.lang.reflect.Method;//代表字节码中的方法字节码

~~~

### 获取Class的方式

~~~java
Class.forName("");//字符串传递的是完整类名的包名

Object有getClass()方法，所有的对象的都继承了这个方法;
对象.getClass();

任何类型.class;

~~~



通过反射机制创建对象

~~~java
Class c = Class.forName("java.lang.String");
c.newInstance();//调用String类的无参构造方法

~~~

灵活性

~~~java
FileReader fileReader = new FileReader("属性配置文件地址");
Properties p = new Properties();
p.load(fileReader);//load(Reader read) load(InputStream inStream)
String value = p.getProperties(key);
Class c = Class.forName(value);
c.newInstance();
properties文件中可以写ClassName=Class的包名全名;
修改配置文件可以创建不同的对象

~~~



只执行静态代码块，类的初始化

~~~java
Class.forName("");//可以让类只进行类加载，执行静态代码块
~~~

### 发生类初始化的情况

1. 类的主动引用，肯定会发生类的初始化
2. 虚拟机启动，先初始化main方法所在的类
3. new一个类的对象
4. 访问类的静态成员变量或者静态方法
5. 通过Class对象对类进行操作，如Class.forName()
6. 初始化一个类，父类没有初始化，先对父类进行初始化



- 不会发生类初始化的情况

1. 通过子类访问父类的静态域，不会初始化子类
2. 通过数组定义类的引用
3. 引用常量不会初始化





### 获取文件绝对路径

用到的式URL类，调用的是这个对象的方法

~~~java
条件：文件要和class文件在src文件下面
Thread.currentThread().getContextClassLoader().getResource("文件名").getPath();

可以直接创建流并返回;
InputStream is = Thread.currentThread().getContextClassLoader().getReasourceAsStream("文件名");

~~~



### 资源绑定器

只能绑定.properties后缀文件，文件必须在类路径下，扩展名不能写

~~~java
java.util.ResourBundle;
ResourceBundle bundle = ResourceBundle.getBundle("properties文件名，不用加后缀");
String value = bundle.getString("key");

~~~

![image-20220327165237721](http://47.101.155.205/ResourceBundle.png)

### 类加载器 双亲委派机制

ClassLoader;

~~~java
jdk中有3个类加载器
    启动类加载器(父);
	扩展类加载器(母);
	应用类加载器;

C:\Program Files\Java\jdk1.8.0_101\jre\lib\rt.jar;

代码在执行过程中，会将所需要的class文件加载到jvm中去。通过类加载器加载，加载顺序;
	1.首先通过启动类加载器加载;
	启动类加载器专门加载C:\Program Files\java\jdk1.8.0_101\jre\lib\rt.jar;rt.jar是jdk最核心的类库;

	2.通过启动类加载加载不到，会通过扩展类加载器加载;
	扩展类加载器专门加载C:\Program Files\java\jdk1.8.0_101\jre\leb\ext\*.jar;

	3.如果扩展类加载器没有加载到，通过应用类加载器加载;
	引用类加载器专门加载：classpath中的类
        
~~~

### 通过反射获取Field源代码

~~~java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

//放射类中的属性
public class ClassTest02
{
	public static void main(String[] args) throws Exception{
	
		Class classTest = Class.forName("Test");

		Field[] fields = classTest.getDeclaredFields();
		
		StringBuffer s = new StringBuffer();
		s.append(Modifier.toString(classTest.getModifiers())+ "class" + " " + classTest.getSimpleName()  + "{\n");

		for(Field field : fields){
			s.append("\t");
			s.append(field.getModifiers() == 0 ?  "" :  (Modifier.toString(field.getModifiers()) + " "));
			s.append(field.getType().getSimpleName() + " ");
			s.append(field.getName());
			s.append(";");
			s.append("\n");
		}
		s.append("}");
		System.out.println(s);
	}
}

class Test
{
	public int no;
	protected String name;
	String addr;
	private Object o;
}
~~~



### 反射访问对象Field

~~~java
import java.lang.reflect.Field;

public class FieldTest
{
	public static void main(String[] args) throws Exception{
		
		Class classField = Class.forName("FieldClass");

		Object o = classField.newInstance();

		Field nameField = classField.getDeclaredField("name");
		nameField.set(o,"zs");

		Field addrField = classField.getDeclaredField("addr");

		//打破封装
		addrField.setAccessible(true);
		addrField.set(o,"中国");
		System.out.println(nameField.get(o));
		System.out.println(addrField.get(o));
	}
}

class FieldClass
{
	public String name;
	protected int age;
	double money;
	private String addr;
	private final String phoneNo = "17346986925";
}
~~~



### 反射Method代码



使用可变长参数的方法，返回的修饰符会加上transient

~~~java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class MethodTest
{
	public static void main(String[] args)throws Exception{
	
		StringBuffer s = new StringBuffer();
		Class classPrint = Class.forName("PrintNTest");
		
		s.append(Modifier.toString(classPrint.getModifiers()));
		if(s.length() > 0) s.append(" ");
		s.append("class ");
		s.append(classPrint.getSimpleName() + "{");
		
		Method[] methods = classPrint.getDeclaredMethods();
		for(Method method : methods){
			s.append("\n\t");
			s.append(Modifier.toString(method.getModifiers()));
			s.append(method.getModifiers() == 0 ? "" : " ");
			s.append(method.getReturnType().getSimpleName() + " ");
			s.append(method.getName() + " ");
			s.append("(");
			Class[] cs = method.getParameterTypes();
			for(Class c : cs){
				s.append(c.getSimpleName() + " ,");
			}
			if(cs.length != 0){
				s.setLength(s.length() - 1);
			}
			s.append(")");
		}

		

		s.append("\n}");
		System.out.println(s);
	}
}

class PrintNTest{

	public static void main(String[] args){
		
		printN(100000);
	}

	public static void printN(int n){

		for(int i = 1;i <= n;i++){
			System.out.print(i + "  ");
	}

	}

	public static void printN01(int n){
		
		if(n > 0){
			printN01(n-1);
			System.out.print(n + "  ");
		}
	}

	public static void defer(int n,String... s){
		
		if(n > 0){
			printN01(n-1);
			System.out.print(n + "  ");
		}
	}

	public static void printN01(){
		
		
	}

	public static String test(){
		
		return "sss";
	}

	public void test(String s,int... i){
		
	}
}
~~~



### 反射访问方法

调用静态的方法，可以调用invoke方法，第一个参数改为null。

~~~java
Object o = classPrint.newInstance();
Method methodPrintN = classPrint.getDeclaredMethod("printN",int.class);
Object returns = methodPrintN.invoke(o,10);
System.out.println(returns);
~~~



### 反射Constructor



~~~java
import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

public class ConstructorTest
{
	public static void main(String[] args) throws Exception{
		
		Class classStudent = Class.forName("Student");
		StringBuffer s = new StringBuffer();
		
		s.append(Modifier.toString(classStudent.getModifiers()));
		s.append(classStudent.getModifiers() == 0 ? "" : " ");
		s.append("class ");
		s.append(classStudent.getName() + "{");
		
		Constructor[] cs = classStudent.getDeclaredConstructors();
		for(Constructor c : cs){
		
			s.append("\n\t");
			s.append(Modifier.toString(c.getModifiers()));
			s.append(c.getModifiers() == 0 ? "" : " ");
			s.append(c.getName());
			s.append("(");
			Class[] classs = c.getParameterTypes();
			for(Class cc : classs){
				s.append(cc.getSimpleName() + " ,");
			}
			if(classs.length != 0) s.setLength(s.length() - 1);
			s.append(")");

		}
		
		s.append("\n}");
		System.out.println(s);
	}
}

class Student
{
	public String name;
	public int no;
	public int classNo;
	public String className;

	public Student(){}

	public Student(String name){
		this.name = name;
	}

	public Student(String name,int no){
		this.name = name;
		this.no = no;
	}

	public Student(String name,int no,int classNo){
		this.name = name;
		this.no = no;
		this.classNo = classNo;
	}

	public Student(String name,int no,int classNo,String className){
	
		this.name = name;
		this.no = no;
		this.classNo = classNo;
		this.className = className;
	}
}
~~~



### 反射调用Constructor



~~~java
Class classStudent = Class.forName("Student");
Constructor c1 = classStudent.getDeclaredConstructor(String.class,int.class,int.class,String.class);
Object o1 = c1.newInstance("zs",1001,2017,"china");
System.out.println(o1);
~~~



### 反射父类接口



~~~java
System.out.println(Class.forName("java.lang.String").getSuperclass().getName());
Class[] cs = Class.forName("java.lang.String").getInterfaces();
for(Class c : cs){
	System.out.println(c.getName());
}
~~~



### 注解 

自定义注解

[修饰符] @interface 注解类型名{}

可以在类名，属性，方法上使用，@注解类型名

元注解：用来标注注解的注解。Target，Retention

~~~java
@Target(ElementType.METHOD)//标志只能在方法上
@Retention(RetentionPolicy.SOURCE)//标注只保存在java源文件上,不会生产在class文件里面。
public @interface Override {
}
RetentionPolicy.CLASS标注保存再class文件上，不会出现再运行时阶段;
RetentionPolicy.RUNTIME标注保存至运行时阶段，可以通过反射获取注解信息
~~~



~~~java
@Deprecated
表示标注的元素已过时
    @Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
}
~~~



定义注解属性

~~~java
public @interface MyAnotation{
    
    String name();
    String no() default "zs";
    String value();
}
使用注解时，需要给注解赋值;
注解属性有默认值可以不用赋值;
注解里面只有一个属性value时可以省略注解名称，直接传入值;
注解类型可以是:
	byte,short,char,int,long,double,float,boolean;
	String;
	enum;//枚举
	注解类型;
	以及以上类型的数组类型
~~~



反射注解的方法

~~~java
class.isAnnotationPresent(注解的全名称.class);
判断有没有这个注解;
<A extends Annotation> A getAnnotation(类<A> annotationClass);
Annotation[] getDeclaredAnnotations();
~~~

## JVM

### 1.类加载器，双亲委派机制

向上请求，向下加载。


### 2.沙箱安全机制

- 字节码校验器

- 类加载器

  1.从最内层JVM自带类加载器加载，外层同名类得不到加载

  2.通过包来区分访问域，外层恶意的类通过内置代码也无法获得权限访问到内层类

- 存取控制器access controller

- 安全管理器security manager

- 安全软件包security package Java.security下的类和扩展下的类



### 3.Native

private native void start0();

调用底层的C语言库

会进入本地方法栈

调用本地方法接口JNI（扩展java的使用，融合不同的编程语言为java所用）

在内存区域专门开辟了一块标记区域：Native Method Stack，登记native方法

在最终执行的时候，通过JNI加载本地方法库的方法





### 4.PC寄存器

程序计数器Program Counter Register

每个线程都有一个程序计数器，是线程私有的，就是一个指针，指向方法区中的方法字节码（用来存储指向像一条指令的地址，也即将要指向的指令代码）在执行引擎读取下一条指令，是一个非常小的内存空间，几乎可以忽略不计。





### 5.方法区

静态变量、常量、类信息（构造方法、接口定义）、运行时的常量池存在方法区中。

实例变量存在堆内存中。

### 6.栈

栈：8大基本类型+对象引用+实例方法

压栈弹栈，栈帧指向栈顶



### 9.三种JVM

Sun	HotSpot

BEA	JRockit

IBM	J9VM



### 8.堆

堆内存调参参数

-Xms1024m -Xmx1024m -XX:+PrintGCDetails 



Heap，一个JVM只有一个堆，堆内存的大小是可以调节的。

类加载器读取文件后，会把什么东西放到堆中

堆内存三个区域

​		新生区(伊甸园区Eden Space、幸存0区、幸存1区)

~~~java
伊甸园区：所有的对象都是在这个区产生的;


~~~

![](http://47.101.155.205/1.png)



![](http://47.101.155.205/堆内存里面的区.png)

​		养老区

​		新生区的15没有被清楚掉的会进入老年区

-XX:MaxTenuringThreshold=1 最大剩余阈值 调节进入老年期的 tenure任期



​		永久区

这个区域是常驻内存，用来存放JDK自身携带的Class对象。Interface元数据，存储的是java运行时的一些环境或信息类，这个区域不存在垃圾回收！关闭JVM虚拟机就会释放这个区域内存



一个启动类，加载大量的第三方jar包，tomcat启动

~~~java
jdk1.6之前;
	永久代，常量池是在方法区中;
jdk1.7
    永久代，但是慢慢的退化了，去永久代，常量池在堆中;
jdk1.8之后
    无永久带，常量池在元空间
~~~



GC垃圾回收主要在新生区和养老区

OOM，堆内存满了

JDK8以后改了名字，元空间



### 9.JProfiles内存快照工具

调优工具：MAT(Memory Analyzer Tool) eclipse用的

-Xms 设置初始化内存分配大小

-Xmx设置最大内存

-XX:+PrintGCDetails

-XX:+HeapDumpOnOutOfMemoryError



-Xms1m -Xmx9m -XX:+HeapDumpOnOutOfMemoryError

生成dump文件

分析Dump内存文件，快速定位内存问题位置

获得堆中的信息





### 10.GC机制

两种GC：轻GC、重GC

作用在伊甸园区和幸存区，以及养老区

![image-20220328172220539](http://47.101.155.205/堆内存里面的区.png)

#### GC算法

1、引用计数法

通过计数器计算对象使用的次数，清除没有使用的对象及？



2、复制算法

没有内存碎片

浪费空间，新生区有半一直是空的



3、标记清除算法

标记 --》清除

不需要额外空间

会产生内存碎片



4、标记压缩

标记清除压缩



总结

分代收集算法

新生区

老年区



### 11.JMM Java Memory Model



### 单点登陆





## 网络编程

TCP

UDP

TCP/IP分层协议

- 网络接口层协议：Ethernet 802.3、Token Ring 802.5、X.25、Frame relay、HDLC、PPP ATM等。
- 网络层协议：IP（Internet Protocol，英特网协议）、ICMP（Internet Control Message Protocol，控制报文协议）、ARP（Address Resolution Protocol，地址转换协议）、RARP（Reverse ARP，反向地址转换协议）。
- 传输层协议： TCP（Transmission Control Protocol，传输控制协议）和UDP（User Datagram protocol，用户数据报协议）。
- 应用层协议：FTP（File Transfer Protocol，文件传输协议）、TELNET（用户远程登录服务协议）、DNS（Domain Name Service，是域名解析服务）、**[SMTP](https://baike.baidu.com/item/SMTP)**（Simple Mail Transfer Protocol，[简单邮件传输协议](https://baike.baidu.com/item/简单邮件传输协议)）、NFS（Network File System，网络文件系统）、**[HTTP](https://baike.baidu.com/item/HTTP)**（Hypertext Transfer Protocol，[超文本](https://baike.baidu.com/item/超文本)[传输协议](https://baike.baidu.com/item/传输协议)）。



### IP

ip地址 InetAddres

~~~java
try {
	InetAddress inetAddress1 = InetAddress.getByName("www.baidu.com");
    System.out.println(inetAddress1);
	System.out.println(inetAddress1.getAddress());
    System.out.println(inetAddress1.getCanonicalHostName());
    System.out.println(inetAddress1.getHostAddress());
    System.out.println(inetAddress1.getHostName());

} catch (UnknownHostException e) {
	e.printStackTrace();
}
~~~



 - 本机ip地址127.0.0.1
 - ip地址分类
   - ipv4/ipv6 
     - ipv4：127.0.0.1 4个字节 0-255 42亿
     - ipv6：240e:468:310:d5ae:e576:225f:fb14:ad5a 128位 8个无符号整数

- 公网(互联网)私网(局域网)



### 端口

端口表示计算机上一个程序的进程

- 端口用来区分不同的进程

- 被规定0~65535

- TCP，UDP都有: 55535 tcp: 80 udp : 80 单个协议下，端口不能冲突

- 端口分类

  - 公有端口0-1023

    - HTTP ：80

    - HTTPS：443

    - FTP：21

    - TELENT ：23

  - 程序注册端口 1024 ~ 49151

    - Tomcat：8080
    - MySql：3060
    - Oracle：1521

  - 动态、私有49152~65535

    ~~~java
    netstat -ano;//查看所有的端口
    netstat -ano|findstr "";//查看指定的端口
    tasklist|findstr "";//查看指定端口的进程
    netstat -ano | findstr 8080 找到8080端口的进程pid
    taskkill -pid 上面查询到的 -f
    
    ~~~

    C:\Windows\System32\drivers\etc\hosts
    
    可以修改localhost的hostname

### 通信协议

#### TCP：用户传输协议

**建立连接** 

~~~java
TCP三次握手的过程如下：
客户端发送SYN（SEQ=x）报文给服务器端，进入SYN_SEND状态。
服务器端收到SYN报文，回应一个SYN （SEQ=y）ACK（ACK=x+1）报文，进入SYN_RECV状态。
客户端收到服务器端的SYN报文，回应一个ACK（ACK=y+1）报文，进入Established状态。
三次握手完成，TCP客户端和服务器端成功地建立连接，可以开始传输数据了。
~~~



![](http://47.101.155.205/三次握手协议.webp)



**断开连接**

~~~java
TCp四次握手协议;
建立一个连接需要三次握手，而终止一个连接要经过四次握手，这是由TCP的半关闭（half-close）造成的。具体过程如下图所示。
（1） 某个应用进程首先调用close，称该端执行“主动关闭”（active close）。该端的TCP于是发送一个FIN分节，表示数据发送完毕。
（2） 接收到这个FIN的对端执行 “被动关闭”（passive close），这个FIN由TCP确认。
注意：FIN的接收也作为一个文件结束符（end-of-file）传递给接收端应用进程，放在已排队等候该应用进程接收的任何其他数据之后，因为，FIN的接收意味着接收端应用进程在相应连接上再无额外数据可接收。
（3） 一段时间后，接收到这个文件结束符的应用进程将调用close关闭它的套接字。这导致它的TCP也发送一个FIN。
（4） 接收这个最终FIN的原发送端TCP（即执行主动关闭的那一端）确认这个FIN。 
既然每个方向都需要一个FIN和一个ACK，因此通常需要4个分节。
~~~

![](http://47.101.155.205/四次握手协议.webp)



建立客户端和服务端的连接。

~~~java
package com.internet.tcp;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ServiceTcp {
    public static void main(String[] args) {
        int port = 15521;
        ServerSocket serverSocket = null;
        Socket socket = null;
        InputStream in = null;
        ByteArrayOutputStream byteArrayOutputStream = null;
        try {
            //创建服务端并绑定端口号
            serverSocket = new ServerSocket(port);
            System.out.println(serverSocket.getInetAddress());
            //监听客户端的连接
            socket = serverSocket.accept();
            //获取连接的输出流
            in = socket.getInputStream();

            byte[] bytes = new byte[1024];
            int count = 0;
            String s = "";
            while((count = in.read(bytes)) != -1){
                s += new String(bytes,0,count);
            }
            System.out.println(s);




        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (byteArrayOutputStream !=null){
                try {
                    byteArrayOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if(in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (serverSocket != null){
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}


~~~



~~~java
package com.internet.tcp;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class ClientTcp {
    public static void main(String[] args) {

        Socket socket = null;
        String host = "0.0.0.0";
        int port = 15521;
        OutputStream outputStream = null;
        try {

            //客户端与服务端绑定
            socket = new Socket(host,port);
            //获取输出流
            outputStream = socket.getOutputStream();
            byte[] bytes = "客户端发起请求，发送消息15521".getBytes();
            outputStream.write(bytes);
			outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (outputStream != null){
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

~~~





#### UDP：用户数据报协议



~~~java
DatagramSocket sendSocket = null;
        int localPort = 3333;
        String host = "localhost";
        try {

            sendSocket = new DatagramSocket(localPort, InetAddress.getByName(host));

            System.out.println(sendSocket.getInetAddress());//null
            System.out.println(sendSocket.getLocalAddress());///127.0.0.1
            System.out.println(sendSocket.getLocalPort());//3333
            System.out.println(sendSocket.getLocalSocketAddress());///127.0.0.1:3333
            System.out.println(sendSocket.getPort());//-1

        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            if(sendSocket != null){
                sendSocket.close();
            }
        }
~~~

需要注意的点

~~~java
DatagramPacket packet = new DatagramPacket(byte[] bytes,bytes.length);
receiveSocket.accept(DatagramPacket packet);
最后packet.getData();返回的数组大小和原来的数组大小一样
~~~







### URL统一资源定位器

~~~java
http://www.example.com/docs/resource1.html
	上述URL表示使用的协议是http（超文本传输协议）和信息驻留在主机名www.example.com。在主机的信息称为/docs/resource1.html。在主机上这个名称的确切含义是协议依赖和主机依赖的。这些信息通常驻留在一个文件中，但它可以在飞行中产生。这个URL的组成部分称为路径组件。
如果没有指定端口，则该协议的默认端口将被使用。例如，对于http默认端口是80。
URLEncoder.encode()
~~~





## GUI图形用户界面

### 组件和容器

#### 1.1组件

- 组件
  - 窗口
  - 弹窗
  - 面板
  - 文本框
  - 列表框
  - 按钮
  - 图片
  - 监听事件
  - 鼠标
  - 键盘事件
  - 破解工具（外挂）



写出自己需要的小工具

维护Swing界面

了解mvc架构，了解监听事件



#### 1.2容器

- 容器Container
  - 窗口Window
    - Frame窗口
    - Dialog弹窗
  - 面板Panel
    - Applet



#### 单词

~~~java
visible;可见;
resizable;可调整大小的;
adapter;适配器;
grid;网格;
row;行;
column;列;
performed;执行;
command;命令;
calculator;计算器;
popup;弹出;
init;初始化;
dispose;处理;
horizontal;水平线;
alignment;对准;
pane;窗格;
scroll;滚动;
constants;常数;
rect;矩形;
delegation;代表;
status;状态;
memory;内存;
volatile;不稳定性;


~~~



#### 1.3布局管理器



- 流式布局

~~~java
package com.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class TestFlowAdapter {
    public static void main(String[] args) {
        Frame frame = new Frame("流式布局");
        frame.setVisible(true);
        frame.setSize(400,400);
        Button button1 = new Button("button1");
        Button button2 = new Button("button2");
        Button button3 = new Button("button3");
        Button button4 = new Button("button4");

        //添加参数表示居中还是靠左靠右等0left1center2right
        frame.setLayout(new FlowLayout());
        frame.add(button1);
        frame.add(button2);
        frame.add(button3);
        frame.add(button4);

        //窗口关闭监听事件
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
}

~~~



- 东西南北中

~~~java
package com.GUI;

import java.awt.*;

public class TestBorderLayout {
    public static void main(String[] args) {
        Frame frame = new Frame("testBorderLayout");
        frame.setVisible(true);
        frame.setSize(500,400);

        Button east = new Button("east");
        Button west = new Button("west");
        Button north = new Button("north");
        Button south = new Button("south");
        Button center = new Button("center");

        frame.add(east,BorderLayout.EAST);
        frame.add(west,BorderLayout.WEST);
        frame.add(north,BorderLayout.NORTH);
        frame.add(south,BorderLayout.SOUTH);
        frame.add(center,"Center");
    }
}

~~~





- 表格布局

~~~java
package com.GUI;

import java.awt.*;

public class TestGridLayout {

    public static void main(String[] args) {
        Frame frame = new Frame("testGridLayout");
        frame.setVisible(true);
        frame.setSize(500,400);

        Button east = new Button("east");
        Button west = new Button("west");
        Button north = new Button("north");
        Button south = new Button("south");
        Button center = new Button("center");
        frame.setLayout(new GridLayout(3,2));
        frame.add(east);
        frame.add(west);
        frame.add(north);
        frame.add(south);
        frame.add(center);
        //frame.add(new Button("test"));
        //方法调整方法
        frame.pack();

    }

}

~~~



### AWT

Frame

add();

Panel

TextField

Button







### Swing

JFrame窗口  窗口占用40Y 窗口X方向20多显示不出来

JDialog弹窗

Icon

ImageIcon

JPanel

JScroll   JTextArea

JRadioButton

ButtonGroup

JCheckBox

JComboBox  下拉框

JList列表框 

JTextField

JPasswordField

JTxtArea











## 设计模式

### 组合+内部类

~~~java
class A{
    public B b;
}
class B{
    
}
~~~

过程

~~~java
package com.GUI;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class TestCalculator {
    public static void main(String[] args) {
        new Calculator();
    }
}
class Calculator extends Frame{
    
    public Calculator(){
        setVisible(true);
        setLayout(new FlowLayout());
        TextField textField1 = new TextField(10);
    	TextField textField2 = new TextField(10);
    	TextField textField3 = new TextField(20);
        Label label = new Label("+");
        Button button = new Button("=");
        
        add(textField1);
        add(label);
        add(textField2);
        add(button);
        add(textField3);
        
        pack();
        
        //外部类优化第一步可以传递一个Calculator类型的应用进去，访问calculator的TextField属性，但是要提升他的作用域
        button.addActionListener(new CalculatorListener(textField1,textField2,textField3));
        
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
        
    }
}
class CalculatorListener implements ActionListener{
    
    TextField t1,t2,t3;
    
    public CalculatorListener(TextField t1,TextField t2,TextField t3){
        
        this.t1 = t1;
        this.t2 = t2;
        this.t3 = t3;
        
    }

	@Override
    public void actionPerformed(ActionEvent e) {
    	int num1 = Integer.parseInt(t1.getText());
    	int num2 = Integer.parseInt(t2.getText());
    	t3.setText("" + (num1 + num2));
    	t1.setText("");
    	t2.setText("");
        }
    }
~~~

将上面过程优化，监听器类式式这个计算才能用的到的，而且需要传递里面对象的参数，优先使用内部类，可以访问对象里面的参数。扩大需要访问属性的作用域，变成实例变量，这样new监听器就不需要再传递参数。

匿名内部类使用的优点：

​	可以直接访问外部类的实例变量

```
package com.GUI;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class TestCalculator {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}
class Calculator extends Frame{

    TextField textField1;
    TextField textField2;
    TextField textField3;

    public Calculator(){
        super("简单计算器");
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }

    public void loadFrame(){
        setVisible(true);
        setLayout(new FlowLayout());
        textField1 = new TextField(10);
        textField2 = new TextField(10);
        textField3 = new TextField(20);
        Label label = new Label("+");
        Button button = new Button("=");

        add(textField1);
        add(label);
        add(textField2);
        add(button);
        add(textField3);

        button.addActionListener(new CalculatorListener());

        pack();
    }

    public class CalculatorListener implements ActionListener{

        @Override
        public void actionPerformed(ActionEvent e) {
            int num1 = Integer.parseInt(textField1.getText());
            int num2 = Integer.parseInt(textField2.getText());
            textField3.setText("" + (num1 + num2));
            textField1.setText("");
            textField2.setText("");
        }
    }

}
```



### 单例模式

构造方法私有化



java核心jar包

![image-20220407161921688](http://47.101.155.205/image-20220407161921688.png)







## jdk13新特性

可以java *.java绝对路径，原理和之前的编译运行一样，不过不会在硬盘生成.class文件

