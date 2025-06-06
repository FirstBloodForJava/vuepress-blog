# 设计模式



## 创建型

负责对象的创建，解耦对象的创建过程与使用过程。

### 单例模式

#### 饿汉式单例

~~~java
//饿汉式单例
public class Hungry {

    private Hungry(){
        System.out.println("Hungry对象创建");
    }

    private static Hungry hungry = new Hungry();

    public static Hungry getInstance(){
        return hungry;
    }
}
~~~

#### 懒汉式单例(单线程)

~~~java
//懒汉式单例
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            lazy = new Lazy();
        }
        retrun lazy;
    }
}
~~~

#### 懒汉式单例(多线程)

~~~java
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            synchronized(Lazy.class){
                //判断的原因是，多线程环境下，加入两个线程都进入了if代码块，可是a线程先拿到锁，这个时候对象已经创建好了
                if(lazy == null){
                    lazy = new Lazy();
                }
            }
        }
        retrun lazy;
    }
}
//对象创建的过程：1、再堆中分配内存；2、调用构造器创建实例；3、将引用指向实例的内存
//因为指令重排的原因
~~~



#### DCL懒汉式+volatile

~~~java
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static volatile Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            synchronized(Lazy.class){
                //情况1:判断的原因是，多线程环境下，加入两个线程都进入了if代码块，可是a线程先拿到锁，这个时候对象已经创建好了
                //情况2:加入这个时候有第三个线程来拿lazy对象，这个时候a线程因为，指令重排，lazy对象不为null，可是实例化过程还没有构造完成，导致出现异常。这个时候就是volatile发挥作用了。
                if(lazy == null){
                    lazy = new Lazy();
                }
            }
        }
        retrun lazy;
    }
}
~~~



#### 内部类单例

~~~java
public class SingleInner{
    private SingleInner(){
        if(SingleHolder.single != null){
            throw new RuntimeException("不要用反射破坏单例");
        }
    }
    
    private static class SingleHolder(){
    	private static SingleInner single = new SingleInner();    
    }
    
    public static SingleInner getInstance(){
        return SingleHolder.single;
    }
    
}
~~~





~~~java
public static void test03();
    Code:
       0: iconst_0
       1: istore_0
       2: iload_0
       3: bipush        100
       5: if_icmpge     29
       8: new           #3                  // class java/lang/Thread
      11: dup
      12: invokedynamic #8,  0              // InvokeDynamic #2:run:()Ljava/lang/Runnable;
      17: invokespecial #5                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
      20: invokevirtual #6                  // Method java/lang/Thread.start:()V
      23: iinc          0, 1
      26: goto          2
      29: return
~~~

~~~java
public static void test05();
    Code:
       0: iconst_0
       1: istore_0
       2: iload_0
       3: bipush        100
       5: if_icmpge     29
       8: new           #3                  // class java/lang/Thread
      11: dup
      12: invokedynamic #10,  0             // InvokeDynamic #4:run:()Ljava/lang/Runnable;
      17: invokespecial #5                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
      20: invokevirtual #6                  // Method java/lang/Thread.start:()V
      23: iinc          0, 1
      26: goto          2
      29: return
~~~

#### 枚举单例

javap -p .class java自带的反编译命令

~~~java
public enum SingleEnum {
    SINGLE("张三",11);

    private String name;
    private int age;

    SingleEnum(String name,int age){
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public SingleEnum getInstance(){
        return SINGLE;
    }
}
~~~







### 工厂方法模式

工厂方法模式(Factory Method Pattern)：定义一个创建对象的接口，但由子类决定要实例化哪个类。在创建对象时不会暴露创建逻辑，并且是通过使用接口来指向新创建的对象。



### 抽象工厂模式

抽象工厂模式(Abstract Factory Pattern)：接口是负责创建一个相关对象的工厂，不需要显式指定它们的类。每个生成的工厂都能按照工厂模式提供对象。



### 建造者模式

建造者模式(Builder Pattern)：使用多个简单的对象一步一步构建成一个复杂的对象。



### 原型模式

原型模式(Prototype Pattern)：用于创建重复的对象，同时又能保证性能。





## 结构型

### 1.适配器模式

适配器模式(Adapter Pattern)是作为两个不兼容的接口之间的桥梁。

Spring的抽象上下文，实现有Web上下文和非Web上下文。



### 2.桥接模式

桥接(Bridge Pattern)是用于把抽象化与实现化解耦，涉及到一个作为桥接的接口。

涉及到组合其它。



### 3.装饰器模式

装饰器模式(Decorator Pattern)允许向一个现有的对象添加新的功能，同时又不改变其结构。

涉及到组合其它。



### 4.组合模式

组合模式(Composite Pattern)将对象组合成树形结构以表示“部分-整体”的层次结构。



### 5.外观模式

外观模式(Facade Pattern)提供一个统一的接口，隐藏系统内部复杂性。

涉及到组合其它。



### 6.享元模式

享元模式(Flyweight Pattern)主要用于减少创建对象的数量，以减少内存占用和提高性能。





### 7.代理模式

#### 静态代理模式

通过代理类间接访问目标对象，以增强目标对象的功能或限制其访问。静态代理的代理类是在编译时就已经完成。

~~~java
public interface People {

    void say(String msg);
}

~~~

~~~java
public class ChinesePeople implements People{

    @Override
    public void say(String msg) {
        System.out.println(msg);
    }

}

~~~

~~~java
public class ProxyPeople implements People {

    People target;

    public ProxyPeople(People target) {
        this.target = target;
    }

    @Override
    public void say(String msg) {
        System.out.println("Proxy start");

        if (msg.contains("草")) {
            target.say(msg.replaceAll(".", "*"));
        }else {
            target.say(msg);
        }

        System.out.println("Proxy end");

    }
}

~~~

~~~java
public class StaticProxyDemo {

    public static void main(String[] args) {

        People target = new ChinesePeople();

        ProxyPeople proxy = new ProxyPeople(target);

        proxy.say("草, 无语死了");

    }
}

~~~



#### 动态代理模式

在程序运行时创建代理对象，而不需要预先定义代理类Java源代码。

依赖反射调用目标对象的方法。

##### JDK代理

核心：

1. 通过java.lang.reflect.Proxy生成代理对象。
2. java.lang.reflect.InvocationHandler来拦截目标对象的方法。

拦截目标对象的方法：

~~~java
public class DynamicProxyHandler implements InvocationHandler {

    private Object target;

    public DynamicProxyHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("DynamicProxy start");

        if (args.length > 0) {
            if (String.valueOf(args[0]).contains("草")) {
                args[0] = args[0].toString().replaceAll(".", "*");
            }
        }

        Object result = method.invoke(target, args);
        System.out.println("DynamicProxy end");
        return result;
    }
}

~~~

~~~java
public class DynamicProxyDemo {

    public static void main(String[] args) {

        People people = new ChinesePeople();

        DynamicProxyHandler proxyHandler = new DynamicProxyHandler(people);
        // 创建代理对象
        People proxyPeople = (People) Proxy.newProxyInstance(people.getClass().getClassLoader(),
                people.getClass().getInterfaces(),
                proxyHandler);

        proxyPeople.say("草, 无语死了");
    }
}

~~~



##### cglib

可以直接代理java类

核心：

1. net.sf.cglib.proxy.Enhancer：用于生成代理类。
2. net.sf.cglib.proxy.MethodInterceptor：定义方法拦截的处理逻辑。

~~~java
public class AmericanPeople {

    public void say (String msg){
        System.out.println(msg);
    }
}

~~~

~~~java
public class CglibProxyHandler implements MethodInterceptor {

    private Object target;
    public CglibProxyHandler (Object target) {
        this.target = target;
    }

    public CglibProxyHandler(){}

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {

        System.out.println("cglib proxy: start");

        // 注意 如果方法是invoke,则obj应该为自己创建的对象
        Object result = methodProxy.invokeSuper(obj, args);

        System.out.println("cglib proxy: end");

        return result;
    }
}

~~~

~~~java
public class CglibProxyDemo {

    public static void main(String[] args) {
        // 创建 CGLIB Enhancer
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(AmericanPeople.class);
        enhancer.setCallback(new CglibProxyHandler());

        // 生成代理对象
        AmericanPeople proxy = (AmericanPeople) enhancer.create();

        // 调用代理方法
        proxy.say("hello world");
    }
}

~~~



## 行为型

### 1.责任链模式

责任链模式(Chain of Responsibility Pattern)使多个对象都有机会处理请求，形成链条结构。

过滤器链。



### 2.命令模式

命令模式(Command Pattern)将请求封装为一个对象，从而参数化客户端。



### 3.解释器模式

解释器模式(Interpreter Pattern)定义语言的语法规则，并构建解释器解释句子。被用在 SQL 解析、符号处理引擎等。





### 4.迭代器模式

迭代器模式(Iterator Pattern)提供一种顺序访问集合元素而不暴露其内部结构的方式。



### 5.中介者模式

中介者模式(Mediator Pattern)用一个中介类封装一系列对象交互。



### 6.备忘录模式

备忘录模式(Memento Pattern)在不破坏封装的前提下保存对象状态，以便恢复。



### 7.观察者模式

观察者模式(Observer Pattern)一对多依赖，当对象状态改变时通知所有观察者。



### 8.状态模式

状态模式(State Pattern)允许对象在内部状态改变时改变行为。



### 9.策略模式

策略模式(Strategy Pattern)定义一系列算法，将每个算法封装起来。





### 10.模板方法模式

模板模式(Template Method Pattern)定义算法框架，把可变部分延迟到子类实现。

通过定义一个抽象方法，调用它，最终执行什么由实现决定。



### 11.访问者模式

访问者模式(Visitor Pattern)在不改变类结构的前提下，添加新的操作。