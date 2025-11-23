# JVM
oracle官网文档：https://docs.oracle.com/en/java/javase/index.html
## 什么是JVM
JVM(Java Virtual Machine) 原名 Java 虚拟机，是一个可以执行 Java 字节码的虚拟计算机。它的作用是在不同平台上实现Java程序的跨平台运行，即使在不同的硬件和操作系统上也能保持一致的行为。

## JVM的结构和组成
JVM 由类加载器、执行引擎、内存区域、本地方法接口等组成。

1. 类加载器(ClassLoader)：负责将 java 类文件加载到JVM中。Java 类的加载过程分为加载、连接和初始化三个阶段。在加载阶段，类加载器将字节码文件加载到 JVM 中，并生成一个唯一的类标识符(Class Identifier)来代表该类。在连接阶段，JVM会将类的字节码文件校验、准备和解析为可以被 JVM 使用的数据结构。在初始化阶段，JVM 会执行类的静态代码块，完成类的初始化工作。
2. 执行引擎(Execution Engine)：负责执行 Java 字节码文件。它将字节码文件解释为机器码或直接编译成本地代码来执行。在执行过程中，执行引擎会通过调用 Java 类库中的方法来实现不同的功能。
3. 内存区域(Memory Area)：JVM将内存划分为不同的区域，用于存放不同类型的数据。主要包括程序计数器、虚拟机栈、本地方法栈、堆区、方法区等。程序计数器用于记录当前线程执行的字节码指令的地址；虚拟机栈用于存放方法的调用栈帧，以及方法参数、局部变量等数据；本地方法栈用于支持本地方法的执行；堆区用于存放对象实例和数组等数据；方法区用于存储类的信息、常量池、静态变量、即时编译器编译后的代码等数据。
4. 本地方法接口(Native Interface)：允许 Java 代码调用本地代码。本地代码是指使用其他语言编写的代码，例如 C、C++等。Java 程序可以通过本地方法接口调用本地代码，实现更高效的计算和与外部系统的交互。

### 虚拟机类加载机制

Java 虚拟机把描述类的数据从class 文件加载到内存，并对数据进行校验、转换解析和初始化，最终形成可以被虚拟机直接使用的 Java 类型，这个过程被称为虚拟机的类加载机制。

#### 类加载器
Java 虚拟机设计团队有意把类加载阶段中的 “通过一个类的全限定名称来获取描述该类的二进制字节流” 这个动作放到 Java 虚拟机外部实现，以便让应用程序自己决定如何去获取所需的类。实现这个动作的代码被称为 “类加载器” (Class Loader)。

##### 类和类加载器
对于任意一个类，都必须由类加载器和这个类本身一起共同确定其在 Java 虚拟机的唯一性，每一个类加载器，都拥有一个独立的类名称空间。意思是：比较两个类是否 “相等”，只要这两个类是由同一个类加载器加载的前提下才有意义，否则，即使这两个类来源同一个 class 文件，被同一个Java虚拟机加载，只要加载他们的类加载器不同，那这两个类必然不相等。

相等包括 Class对象的 `equals()` 方法、`isAssignableFrom()` 方法、`isInstance()` 方法的返回结果，也包括使用 `instanceof` 关键字作为对象所属关系判定等多种情况。

~~~java
/**
 * 类加载器和instanceof
 */
public class ClassLoaderTest {

    public static void main(String[] args) throws Exception {
        ClassLoader myClassLoader = new ClassLoader() {
            @Override
            public Class<?> loadClass(String name) throws ClassNotFoundException {

                String fileName = name.substring(name.lastIndexOf(".") + 1)  + ".class";
                InputStream is = getClass().getResourceAsStream(fileName);
                if (is == null){
                    System.out.println("资源没有读取到");// // ClassLoaderTest之后还会加载java.lang.Object、java.lang.ClassLoader、匿名内部类加载(能找到)
                    return super.loadClass(name);
                }
                try {
                    byte[] b = new byte[is.available()];
                    is.read(b);
                    return defineClass(name,b,0,b.length);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }

            }
        };
        Object obj = myClassLoader.loadClass("org.javaboy.vhr.ClassLoaderTest").newInstance();
        System.out.println(obj.getClass());
        System.out.println(obj instanceof org.javaboy.vhr.ClassLoaderTest);
    }
}

~~~

##### 双亲委派模型
站在 Java 虚拟机的角度来看，只存在两种不同的类加载器：一种是启动类加载器(Bootstrap ClassLoader)，这个类加载使用 C++ 语言实现(HotSpot书281)，是虚拟机的一部分；另外一种就是其他的所有的类加载器，这些类加载器都是由 Java 语言实现，独立存在于虚拟机外部，并且全部继承自抽象类 `java.lang.ClassLoader`。

自 JDK1.2 以来，Java 一直保持着三层类加载器、双亲委派的类加载结构，尽管这套架构在 Java 模块化系统出现后有了一些调整变动，但依然没有改变其主体结构。

JDK8 及之前版本所使用的三层类加载器：
1. 启动类加载器(Bootstrap Class Loader)：这个类加载器负责加载存放在<JAVA_HOME>\lib目录，或者 `-Xbootclasspath` 参数所指定的路径中存放的，而且是 Java 虚拟机能够识别的（按照文件名识别，如rt.jar、tools.jar，名字不符合的类库即使放到 lib 目录下也不会被加载）类库加载到虚拟机的内存中。启动类加载器无法被 Java 程序直接引用，用户在编写自定义类加载器时，如果需要把请求给启动类加载器去处理，那么直接使用 null 代替即可。
2. 扩展类加载器(Extension Class Loader)：这个类加载器时在类 `sun.misc.Launcher$ExtClassLoader` 中以Java 代码实现。负责加载 <JAVA_HOME>\lib\ext 目录中或者被 `java.ext.dirs` 系统变量所指定的路劲中的所有类库。
3. 应用程序类加载器(Application Class Loader)：这个类加载器时由 `sun.miscLauncher$AppClassLoader` 来实现。负责加载 `classpath`  或 `java.class.path` 指定目录的类库。这个类加载器是 `ClassLoader` 类中`getSystemClassLoader()` 方法的返回值。

双亲委派模型要求除了顶层的启动类加载器外，其余的类加载器都应有自己的父类加载器。不过这里的类加载器之间的父子关系不是以继承(Inheritance)的方式实现的，而是通常以`组合`(Composition)关系来复用父加载器的代码。

双亲委派模型的工作过程是：如果一个类加载器收到了类加载的请求，它首先不会自己尝试去加载这个类，而是把这个请求委派给父类加载器去完成，每一个层次的类加载器都是如此，因此所有的加载请求最终都应该传送到`最顶层`的启动类加载器中，只有当父类加载器反馈自己无法完成这个加载请求(它的搜索范围中没有找到所需的类)时，子加载器才会尝试自己去完成加载。

使用双亲委派模型来组织类加载器之间的关系，一个显而意见的好处就是 Java 中的类随着他的类加载器一起具备了一种带有优先级的层次关系。例如类 `java.lang.Object`，它存在 `rt.jar` 包中，无论哪一个类加载器去加载这个类，最终都是委派给处于模型最顶端的启动类加载器进行加载，因此 Object 类在程序的各种类加载器环境中都能保证是同一个类。反之，如果没有使用双亲委派模型，都由各个类加载器自行去加载的话，如果用户自己也编写了一个名为 `java.lang.Object` 的类，并放在程序的 classpath 下，那系统就会出现多个不同的 Object 类，Java 类型体系中最基本的行为也无法保证，应用程序会变得混乱。

**实现双亲委派模型的代码**
~~~java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException{
    // 加锁
    synchronized (getClassLoadingLock(name)) {
        // 首先，检查类是否已经加载
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                if (parent != null) {
                    c = parent.loadClass(name, false);
                } else {
                    // parent为null，代表它的父类是根加载器
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // 如果没有从非空父类加载器中找到类，则抛出ClassNotFoundException
            }
            if (c == null) {
                // 如果仍未找到，则调用findClass来查找该类。
                long t1 = System.nanoTime();
                c = findClass(name);

                // this is the defining class loader; record the stats
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment();
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}

~~~



##### 自定义类加载器

自定义类加载器可以实现一些特殊的需求，例如实现类的动态加载、实现类的隔离性、实现类的热替换等。

JDK1.2 之前就有了就有了类加载器的概念和抽象类 `java.lang.ClassLoader` 就有了，JDK1.2 之后才被引入双亲委派模型。设计者为了引入双亲委派模型不得不作出一些妥协，为了兼容已有的代码，无法再以技术手段避免loadClass() 被子类覆盖的可能性，只能在 JDK1.2 之后的 java.lang.ClassLoader 中添加一个新的 `protected` 方法 `findClass()`，并引导用户编写类加载逻辑时尽可能去重写这个方法，而不是在 `loadClass` 方法中编写代码。



#### 类加载执行过程

1. 加载：类加载器首先会检查是否已经加载了该类，如果已经加载了该类，则直接返回该类的 `Class` 对象；如果没有加载该类，则继续执行下一步操作。
2. 连接：连接分为三个阶段：分别是验证、准备、解析。
   3. 验证阶段：验证该类是否符合 Java 虚拟机规范，主要检查该类文件的格式、语法和语义等方面。
   4. 准备阶段：为该类的静态变量分配内存，并设置默认值。
   4. 解析阶段：将该类的符号引用转换为直接引用。
5. 初始化：类加载器会执行类的初始化代码，包括静态变量初始化和静态代码块的执行等。



#### 类的初始化

《Java虚拟机规范》中并没有对什么情况下需要开始类加载过程的第一个阶段“加载”进行强制约束，但是对于初始化阶段，《Java虚拟机规范》则是严格规定了`有且仅有六种`情况必须对类进行“初始化”(加载、验证、准备自然需要在此之前开始)：

1. 遇到 `new`、`getstatic`、`putstatic`、`invokestatic` 这四条字节码指令，如果类型没有进行过初始化，则需要先触发其初始化阶段。
2. 使用 `java.lang.reflect` 包的方法对类型进行方式调用的时候，如果类型没有进行过初始化，则需要先触发其初始化阶段。
3. 当初始化类的时候，如果父类还没有进行过初始化，则需要先触发其父类的初始化。
4. 当虚拟机启动时，用户指定的主类(包含 `main` 方法的类)，虚拟机会先初始化这个主类。
5. 使用 JDK7 新加入的动态语言支持，`java.lang.invoke.MethodHandle` 实例最后的解析结果为`REF_getStatic`、`REF_putStatic`、`REF_invokeStatic`、`REF_newInvokeSpecial` 四种类型的方法句柄。
6. 当一个接口中定义了 JDK8 新加入的默认方法，如果有这个接口的实现类发生了初始化，则这个接口先初始化。

类的初始化是类加载的最后一个步骤，Java 虚拟机真正开始执行类中编写的代码块（static{}）。初始化阶段就是执行类构造器 `<clinit>()` 方法的过程。

- Java 类中有静态变量的初始化或者静态代码块，就会由 Javac 编译生成 `<clinit>()`方法。静态语句块只能访问定义在静态语句块之前的变量，定义在它之后的变量，在前面的静态语句块可以赋值，但是不能访问。
- `<clinit>()` 方法与类的构造函数不同，它不需要显式的调用父类构造器，Java 虚拟机会保证在子类的 `<clinit>()` 方法前，父类的 `<clinit>()` 方法已经执行完毕。
- `<clinit>()` 对于类或接口不是必须的，如果一个类中没有对变量的赋值也没有静态代码块，则编译器可以不为这个类生成`<clinit>()`方法。
- 接口不能有静态代码块，但是有变量初始化赋值操作，因此接口和类一样都会生成`<clinit>()`方法。接口与类的不同是，执行接口的 `<clinit>()` 不需要先执行父接口的 `<clinit>()` 方法，只有父接口定义的变量被使用时，父接口才会被初始化。此外，接口的实现类初始化时，一样不会执行接口的 `<clinit>()` 方法。
- Java虚拟机在执行一个类的`<clinit>()`方法在多线程下是安全的，只有一个线程会去执行这个类的`<clinit>`方法。这种情况可能会导致线程阻塞出现。

~~~java
// 类初始化线程阻塞模拟
class DeadLockClass{
    static{
        if(true){
            System.out.println(Thread.currentThread().getName() + "init DeadLockClass ");
            while(true){
                
            }
        }
    }
    public static void main(String[] args){
        Runnable script = new Runnable(){
            public void run(){
                System.out.println(Thread.currentThread().getName() + " start");
                DeadLockClass dlc = new DeadLockClass();
                System.out.println(Thread.currentThread().getName() + " end");
            }
        };
        Thread t1 = new Thread(script);
        Thread t2 = new Thread(script);
        t1.start();
        t2.start();
    }
}

~~~



#### 发生类初始化的情况

1. 用 new 创建一个对象、反射创建对象
2. 读取或者设置一个类型的静态字段(被 final 修饰的静态字段不算)
3. 调用一个类型的静态方法
4. 使用 `java.lang.reflect` 包的方法对类进行反射调用(当调用时才会触发，如获取属性值，执行方法)
5. 虚拟机启动 `main` 方法所在的类
6. 子类进行初始化，父类还没有被初始化
7. Class.forName





#### 不会发生类初始化的情况

1. 通过子类访问父类的静态域，不会初始化子类
2. 通过数组定义类的引用(Myuser[] users = new MyUser[10];)
3. 对常量的引用，final 修饰的熟悉。



### JVM内存模型

JVM 的内存模型是指 Java 虚拟机在运行 Java 程序时所使用的内存模型。

![JVM内存模型](http://47.101.155.205/image-20230514222902018.png)

#### 程序计数器

程序计数器是一块较小的内存空间，它用于指示当前线程所执行的字节码指令的地址。在多线程的情况下，每个线程都拥有自己的程序计数器，用于存储当前线程的执行地址。



#### Java虚拟机栈

Java 虚拟机栈是线程私有的，用于存储 Java 方法执行的栈帧。每个栈帧包含了局部变量表、操作数栈、动态链接、返回地址等信息，用于支持 Java 方法的调用和执行。

内存区域有两种异常：

1. 线程请求的栈深度大于虚拟机所允许的深度，将抛出 `StackOverflowError` 异常
2. 如果 Java 虚拟机允许栈容量可以动态扩展，当栈的扩展无法申请足够的内存会抛出 `OutOfMemoryError` 异常



#### Java堆

Java 堆是 Java 虚拟机所管理的最大的一块内存空间，用于存储 Java 对象和数组。Java 堆可以分为新生代和老年代两部分，其中新生代又分为 `Eden` 区和两个 `Survivor` 区。



#### 方法区

方法区用于存储类的元数据信息，包括类的名称、方法、字段等信息。方法区可以用于实现动态代理、反射等功能。



#### 本地方法栈

本地方法栈与 Java 虚拟机栈类似，但是它用于存储本地方法的执行栈帧。









## JVM的沙箱安全机制
JVM 的沙箱安全机制是指在 Java 程序运行时，Java 虚拟机会限制程序的执行权限，防止恶意代码的执行，从而保证 Java 程序的安全性。Java 的沙箱安全机制主要体现在以下几个方面

1. 类加载机制：Java 的类加载机制采用双亲委派模型，可以避免同名类的重复加载，同时也可以防止恶意代码的执行。
2. 安全管理器：Java 虚拟机提供了一个安全管理器(Security Manager)，可以控制程序对系统资源的访问权限，例如文件访问、网络访问、系统属性、进程控制等等。
3. 字节码校验：Java 虚拟机会对加载的字节码文件进行校验，防止字节码被恶意篡改，从而保证 Java 程序的安全性。
4. 沙箱环境：Java 虚拟机提供了一个沙箱环境(Sandbox)，可以限制程序对系统资源的访问权限。沙箱环境是由安全管理器控制的，通过对程序的访问权限进行控制，可以避免程序对系统资源的滥用。





## Java内存溢出

### 1.模拟Java堆内存溢出

~~~java
// JVM 参数 -Xms20m -Xmx20m -XX:+HeapDumpOnOutOfMemoryError
public static void main(String[] args) {
	List<Object> list = new ArrayList<>();

	while (true){
		list.add(new Object());
    }
}

~~~

![image-20230831222510998](http://47.101.155.205/image-20230831222510998.png)

![image-20230831223945238](http://47.101.155.205/image-20230831223945238.png)

![image-20230831223918384](http://47.101.155.205/image-20230831223918384.png)

![image-20230831223351958](http://47.101.155.205/image-20230831223351958.png)

D:\dev\spring_data_jpa\target\test-classes\java_pid7048.hprof

D:\dev\spring_data_jpa\java_pid6452.hprof IDEA启动生存

![image-20230901221439398](http://47.101.155.205/image-20230901221439398.png)



### 2.模拟栈内存溢出

Java 虚拟机规范描述的异常：

1. 如果线程请求的栈深度大于虚拟机所允许的栈深度，则抛出 `StackOverflowError`。
2. 如果虚拟机的栈内存允许动态扩展，当扩展栈容量无法申请到足够的内存时，将抛出 `OutOfMemoryError`。



HotSpot 虚拟机不支持栈的动态扩展，但是再创建线程申请内存时就因无法获取足够的内存而出现的异常，会是`OutOfMemoryError` 异常。

~~~java
// JVM 参数 设置虚拟机容量  -Xss256k
public class StackOverTest01 {
    
    private int length = 0;
    
    private void stack(){
        length++;
        stack();
    }

    public static void main(String[] args) {
        StackOverTest01 obj = new StackOverTest01();
        try {
            obj.stack();
        }catch (Throwable e){
            System.out.println("stackLength: " + obj.length);
        }
    }
}

~~~

![image-20230831225737860](http://47.101.155.205/image-20230831225737860.png)



~~~java
public class StackOverTest02 {

    static class InnerClass{

        public int length = 0;
        public void stack(){
            Map<String,String> map1 = new HashMap<>(1024);
            Map<String,String> map2 = new HashMap<>(1024);
            Map<String,String> map3 = new HashMap<>(1024);
            Map<String,String> map4 = new HashMap<>(1024);
            Map<String,String> map5 = new HashMap<>(1024);
            Map<String,String> map6 = new HashMap<>(1024);
            Map<String,String> map7 = new HashMap<>(1024);
            Map<String,String> map8 = new HashMap<>(1024);
            Map<String,String> map9 = new HashMap<>(1024);
            Map<String,String> map10 = new HashMap<>(1024);
            Map<String,String> map11 = new HashMap<>(1024);
            Map<String,String> map12 = new HashMap<>(1024);
            Map<String,String> map13 = new HashMap<>(1024);
            Map<String,String> map14 = new HashMap<>(1024);
            Map<String,String> map15 = new HashMap<>(1024);
            Map<String,String> map16 = new HashMap<>(1024);
            Map<String,String> map17 = new HashMap<>(1024);
            Map<String,String> map18 = new HashMap<>(1024);
            Map<String,String> map19 = new HashMap<>(1024);
            Map<String,String> map20 = new HashMap<>(1024);
            Map<String,String> map21 = new HashMap<>(1024);
            Map<String,String> map22 = new HashMap<>(1024);
            Map<String,String> map23 = new HashMap<>(1024);
            Map<String,String> map24 = new HashMap<>(1024);
            Map<String,String> map25 = new HashMap<>(1024);
            Map<String,String> map26 = new HashMap<>(1024);
            Map<String,String> map27 = new HashMap<>(1024);
            Map<String,String> map28 = new HashMap<>(1024);
            Map<String,String> map29 = new HashMap<>(1024);
            Map<String,String> map30 = new HashMap<>(1024);

            length++;

            stack();

        }

    }

    public static void main(String[] args) {
        InnerClass innerClass = new InnerClass();
        try {
            innerClass.stack();
        }catch (Throwable e){
            System.out.println("stackLength: " + innerClass.length);
        }
    }

}

~~~

![image-20230831230451537](http://47.101.155.205/image-20230831230451537.png)



模拟创建线程内存不足，引发的 `OutOfMemoryError`，启动 `-Xss2m`，给线程分配 2m 内存

由于本地内存太大，很难达到内存的最大值，把内存耗尽，通过在2核4G的服务器上面测试，达到了效果。

~~~java
public class StackOverTest03 {

    private static AtomicInteger count = new AtomicInteger(0);

    public static void main(String[] args) {
        while (true){
            Thread thread = new Thread(() -> {

                count.incrementAndGet();

                int i = 0;

                while (true) {
                    if (i == 0){
                        if (count.get() % 10240 == 0){
                            System.out.println(Thread.currentThread().getName() + ": " + count);
                        }
                    }
                    try {
                        Thread.sleep(6000000);
                        i++;
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            });
            thread.start();
        }
    }

}

~~~

![image-20230901213509761](http://47.101.155.205/image-20230901213509761.png)



### 3.模拟方法区和常量池内存溢出

由于JDK1.8之后，常量池是在堆内存中的，在设置永久代的大小时，程序结束也提示了，1.8不支持这个设置了。不加堆内存限制应该很难到达OutOfMemoryError。

~~~java
public class PermGenTest01 {
    public static void main(String[] args) {
        // -XX:PermSize=6m -XX:MaxPermSize=6m -Xms20m -Xmx20m
        List<String> list = new ArrayList<>();
        int i = 0;
        while (true){
            list.add(String.valueOf(i++).intern());
        }
    }
}

~~~

![image-20230901214744480](http://47.101.155.205/image-20230901214744480.png)



JDK1.8之前，方法区内存也叫永久代，但是JDK1.8开始，去除了永久代，改为元空间

~~~java
public class MethodAreaTest01 {

    static class InnerClass{}

    // -XX:MaxMetaspaceSize=10M 元空间最大值
    // -XX:MetaspaceSize=1M 元空间初始空间大小，到达该值会触发垃圾回收
    // -XX:MinMetaspaceFreeRatio= 垃圾回收之后控制最小的元空间剩余容量的百分比
    // -XX:PermSize=10M -XX:MaxPermSize=10m -XX:MaxMetaspaceSize=10M
    public static void main(String[] args) {
        while (true){
            Enhancer enhancer = new Enhancer();
            enhancer.setSuperclass(InnerClass.class);
            enhancer.setUseCache(false);
            enhancer.setCallback(new MethodInterceptor() {
                @Override
                public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                    return methodProxy.invoke(o,args);
                }
            });
            enhancer.create();
        }
    }
}

~~~

![image-20230901220015104](http://47.101.155.205/image-20230901220015104.png)



### 4.本机直接内存溢出

~~~java
public class DirectMemoryTest01 {
    // -XX:MaxDirectMemorySize 直接内存的最大容量，默认和java堆的最大值
    // -Xmx20M -XX:MaxDirectMemorySize=10M
    public static void main(String[] args) throws IllegalAccessException {
        Field unsafeField = Unsafe.class.getDeclaredFields()[0];
        unsafeField.setAccessible(true);
        Unsafe unsafe = (Unsafe) unsafeField.get(null);
        while (true){
            unsafe.allocateMemory(1024*1024);
        }
    }
}

~~~

![image-20230901220746775](http://47.101.155.205/image-20230901220746775.png)



