## 服务定位器模式

服务定位器模式(Service Locator pattern)：用在我们想使用 JNDI 查询定位各种服务的时候。考虑到为某个服务查找 JNDI 的代价很高，服务定位器模式充分利用了缓存技术。在首次请求某个服务时，服务定位器在 JNDI 中查找服务，并缓存该服务对象。当再次请求相同的服务时，服务定位器会在它的缓存中查找，这样可以在很大程度上提高应用程序的性能。以下是这种设计模式的实体。

服务定位器确定是否创建对象。



## 静态代理模式

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



## 动态代理模式

在程序运行时创建代理对象，而不需要预先定义代理类Java源代码。

依赖反射调用目标对象的方法。

### JDK代理

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



### cglib

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

