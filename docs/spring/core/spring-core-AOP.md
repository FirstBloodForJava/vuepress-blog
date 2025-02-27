# AOP

AOP(Aspect Oriented Programming面向切面编程)是OOP(Object Oriented Programming面向对象编程)编程方式的补充。

OOP的模块关键点是类。AOP的模块关键点是切面。





## 1.AOP概念

1. Aspect：切面，需要关注的面。在Spring的AOP，通过xml配置或注解@Aspect定义切面。
2. Join point：连接点，程序执行过程的点，例如方法的执行或异常的处理。在Spring AOP，连接点表示方法的执行。
3. Advice：通知，切面在连接点采取的行为。有以下不同类型：around、before、after。
4. Pointcut：切入点，匹配连接点的判断。切入点表达式命中(匹配)连接点是AOP的核心概念。Spring AOP的默认使用AspectJ的切入点表达式。
5. Introduction：为声明类型提供额外的方法或属性。
6. Target object：目标对象，被切面增强的对象。Spring AOP使用的是运行时代理，对象始终是一个代理对象。
7. AOP proxy：代理对象，AOP框架为实现功能增强创建的对象。在Spring框架中AOP proxy是JDK代理或CGLIB代理。
8. Weaving：织入，切面增强应用到目标对象的过程，可以在编译时、加载时、运行时。Spring AOP使用运行时织入。



AOP是一个实现切面功能增强技术规范。

一个方法就是一个连接点，通过定义与连接点相匹配的切入点，在匹配切入点时做不同的操作又得到了不同的Advice。方法的调用是通过对象，所以就有了目标对象和代理对象的概念。

Weaving就是这种增加的具体实现。



Spring AOP提供了以下Advice：

1. Before Advice：在连接点之前执行的Advice，不能阻止执行流到达连接点(除非到达之前发生异常)。
2. After returning advice：在连接点正常完成之后执行的Advice，方法return没有抛出任何异常。
3. After throwing advice：方法执行抛出异常后执行的Advice。
4. After (finally) advice：连接任何方式执行结束后的Advice。例如正常return或抛出异常。
5. Around advice：围绕连接点的Advice。可以在方法调用之前和之后自定义操作。也可以不调用连接点方法，或对连接点方法进行异常处理等。



Spring框架切面使用建议：使用切面的功能，按需选择功能最弱的Advice。例如，你只需要在方法正常结束记录一行日志，则使用After retruning advice即可，不需要使用Around advice。





## 2.Spring AOP(注解)

Spring AOP介绍：

1. Spring AOP完全基于Java代码实现，不需要其它特殊的编译。
2. Spring AOP仅支持方法作为连接点(作用在bean的方法上)，而不支持属性拦截(对属性的操作进行增强)。
3. Spring将Spring AOP和IOC与AspectJ无缝衔接。
4. Spring AOP只能advice(增强) Bean的方法。
5. Spring AOP集成AspectJ的切面功能，没有使用其编译时或加载时织入功能。



**基于JDK的代理：只能拦截接口公开的方法。**

**基于CBLIB的代理：public和protected支持拦截，甚至也包括可见的方法。**



AOP在Spring框架中的作用：

1. 对声明式事务的控制。
2. 对OOP编程的增强。

Spring的AOP完全基于Java代码实现。



### 2.1.启用@AspectJ

开启aop切面功能。

引入依赖：

~~~xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.5</version>
    <scope>compile</scope>
</dependency>

~~~



java启用@AspectJ配置：

~~~java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {

}

~~~

xml启用@AspectJ注解支持配置：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

	<aop:aspectj-autoproxy/>

</beans>

~~~



### 2.2.切面声明

使用注解@Aspect声明一个类是切面，将其注入到Spring容器中。

~~~java
@Aspect
public class LogAspect {
	  
}

~~~

xml配置声明为Bean。使用@Component注解声明为一个Bean。

**使用注解还需要使用@Component注解或其它类似注解。**

**切面自己不能被其它切面拦截增强。**



### 2.3.声明连接点

可以使用@Pointcut注解一个返回void的方法表示切入点。

~~~java
@Pointcut("execution(* transfer(..))") // 切入点表达式
private void anyOldTransfer() {} // the pointcut signature

~~~

切入点表达式遵循AspectJ5的表达式规则。且支持连接运算符，&&，||，!。

支持的切入点指示符有：
1. execution：匹配方法的连接点。
2. within：匹配指定类型中所有方法的连接点。
3. this：创建的代理对象instanceof这个类型为true则匹配。
4. target：目标对象instanceof这个类型为true则匹配。
5. args：匹配方法参数为指定类型的连接点。
6. @target：匹配执行对象有给定类型的注解。
7. @args：匹配方法参数有给定的注解。
8. @within：匹配类上的注解。
9. @annotation：匹配方法参数的注解。
10. bean：匹配bean名称的连接点。

| 指示符      | 示例                                            | 说明                                |
| ----------- | ----------------------------------------------- | ----------------------------------- |
| execution   | execution(public * com.example.service.*.*(..)) | 匹配指定包下所有的public方法        |
| within      | within(com.example.service..*)                  | 匹配指定包及子包的所有类的方法      |
| this        | this(com.example.service.MyService)             | 代理对象是给定类型匹配              |
| target      | target(com.example.service.MyService)           | 目标对象是给定类型匹配              |
| args        | args(com.example.entity.User)                   | 匹配带有参数的所有方法              |
| @target     | @target(org..Transactional)                     | 目标对象有Transactional注解         |
| @args       | @args(com.xyz.security.Classified)              | 单个参数且带有注解Classified        |
| @within     | @within(org..Transactional)                     | 声明类型目标对象有Transactional注解 |
| @annotation | @annotation(org..Transactional)                 | 执行方法有Transactional注解         |
| bean        | bean(*Service)                                  | 匹配bean名称Service结尾的           |



execution 模板：execution(方法修饰符? 方法返回类型 类名?方法名(参数) 抛出异常?)。?表示可以可以省略。

~~~java
// 最简单的格式
execution( return-type method-name(param-pattern) );

// 表示匹配所有的public方法
execution(public * *(..));

execution(* set*(..));

// 匹配由AccountService接口执行的任何方法
execution(* com.xyz.service.AccountService.*(..));

// service包中的所有被执行的方法
execution(* com.xyz.service.*.*(..));

// service包及其子包中所有被执行的方法
execution(* com.xyz.service..*.*(..));

~~~



within例子：

~~~java
// 在SpringAOP中等同于execution(* com.xyz.service.*.*(..))
within(com.xyz.service.*);

// 在SpringAOP中等同于service包及其子包中所有被执行的方法
within(com.xyz.service..*)

~~~



this例子：

~~~java
// 匹配代理对象实现AccountService接口所有方法(Spring AOP)
// 代理对象要实现接口? 类继承类是否可以?
this(com.xyz.service.AccountService);

~~~



target例子：

~~~java
// 匹配目标对象(被代理的)实现了AccountService接口所有方法(Spring AOP)
target(com.xyz.service.AccountService);

~~~



args例子：

~~~java
// 匹配单个参数方法,且类型是Serializable(运行时参数类型是匹配)
// execution(* *(java.io.Serializable)) 匹配的是方法参数声明的是这个类型
args(java.io.Serializable);

~~~



### 2.4.声明Advice

增强声明的连接点既可以使用切面切入点表达式的方法全名称，也可以之间使用切入点表达式声明。



Before：

~~~java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class BeforeExample {

    @Before("com.xyz.myapp.SystemArchitecture.dataAccessOperation()")
    public void doAccessCheck() {
        // ...
    }
    
    @Before("execution(* com.xyz.myapp.dao.*.*(..))")
    public void doAccessCheck() {
        // 直接使用切入点表达式
    }

}

~~~



AfterReturning：方法正常返回后增强。

~~~java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.AfterReturning;

@Aspect
public class AfterReturningExample {

    @AfterReturning("com.xyz.myapp.SystemArchitecture.dataAccessOperation()")
    public void doAccessCheck() {
        // ...
    }
    
    @AfterReturning(
        pointcut="com.xyz.myapp.SystemArchitecture.dataAccessOperation()",
        returning="retVal")
    public void doAccessCheck(Object retVal) {
        // 获取方法的返回值 返回的类型需要有增强的方法返回类型相同
    }

}

~~~



AfterThrowing：抛出异常增强

~~~java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.AfterThrowing;

@Aspect
public class AfterThrowingExample {

    @AfterThrowing("com.xyz.myapp.SystemArchitecture.dataAccessOperation()")
    public void doRecoveryActions() {
        // 匹配的方法抛出任何异常都匹配
    }

    
    @AfterThrowing(
        pointcut="com.xyz.myapp.SystemArchitecture.dataAccessOperation()",
        throwing="ex")
    public void doRecoveryActions(DataAccessException ex) {
        // 匹配的方法抛出DataAccessException异常才匹配
    }

}

~~~



After(finally)：方法只要被调用就会被执行。

~~~java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.After;

@Aspect
public class AfterFinallyExample {

    @After("com.xyz.myapp.SystemArchitecture.dataAccessOperation()")
    public void doReleaseLock() {
        // ...
    }

}

~~~



Around：环绕增强

~~~java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.ProceedingJoinPoint;

@Aspect
public class AroundExample {

    // 方法的第一个参数必须是
    @Around("com.xyz.myapp.SystemArchitecture.businessService()")
    public Object doBasicProfiling(ProceedingJoinPoint pjp) throws Throwable {
        // before
        // 目标对象方法调用,也可以调用proceed(Object[] args)
        Object retVal = pjp.proceed();
        // finally
        return retVal;
    }

}

~~~

ProceedingJoinPoint继承接口JoinPoint，有以下方法：

1. getArgs()：方法方法的参数。
2. getThis()：返回代理对象。
3. getTarget()：返回目标对象。
4. getSignature()：返回增强方法的描述。
5. toString()：方法增强的描述。



#### 获取参数

1. 获取方法执行结果参数，@AfterReturning。
2. 获取方法执行抛出异常参数，@AfterThrowing。
3. 获取方法上的参数，args指示器。
4. 获取方法上注解参数。
5. 泛型匹配。
6. this对象，和args类似，结合注解属性argNames使用。
7. target目标对象，和args类似，结合注解属性argNames使用。
8. 



**方法参数**

~~~java
// args(account,..)作用有2点
// 1.方法至少有一个参数，且类型是Account
// 2.将Account实现传递给增强
@Before("com.xyz.myapp.SystemArchitecture.dataAccessOperation() && args(account,..)")
public void validateAccount(Account account) {
	
}

// 另一种写法
@Pointcut("com.xyz.myapp.SystemArchitecture.dataAccessOperation() && args(account,..)")
private void accountDataAccessOperation(Account account) {}

@Before("accountDataAccessOperation(account)")
public void validateAccount(Account account) {
    
}

~~~



**方法注解**

~~~java
@Before("com.xyz.lib.Pointcuts.anyPublicMethod() && @annotation(auditable)")
public void audit(Transactional transactional) {
    TxType code = transaction.value();
    // ...
}

~~~



**泛型匹配**

~~~java
public interface Sample<T> {
    void sampleGenericMethod(T param);
    void sampleGenericCollectionMethod(Collection<T> param);
}

@Before("execution(* ..Sample+.sampleGenericMethod(*)) && args(param)")
public void beforeSampleMethod(MyType param) {
    // Advice implementation
}

// 在集合中的泛型类型不支持,原因有
// 集合中元素会出现null的情况,不知道如何处理
@Before("execution(* ..Sample+.sampleGenericCollectionMethod(*)) && args(param)")
public void beforeSampleMethod(Collection<MyType> param) {
    
}
// 通过Collection<?>方式来手动处理这种情况是一种方式
@Before("execution(* ..Sample+.sampleGenericCollectionMethod(*)) && args(param)")
public void beforeSampleMethod(Collection<?> param) {
    
}

~~~



**argNames 声明参数名称**：Java由于反射无法获取方法形参，Spring AOP通过@Pointcut注解或Advice注解的属性argNames声明参数的名称。

AmbiguousBindingException

IllegalArgumentException异常原因：由于声明的参数名称和Advice的方法参数不匹配。

~~~java
// 使用Advice注解声明参数名称
@Before(value="com.xyz.lib.Pointcuts.anyPublicMethod() && target(bean) && @annotation(auditable)",
        argNames="bean,auditable")
public void audit(Object bean, Auditable auditable) {
    AuditCode code = auditable.value();
    // ... use code and bean
}

// 第一个参数类型为时JoinPoint ProceedingJoinPoint JoinPoint.StaticPart，省略第一个参数名
@Before(value="com.xyz.lib.Pointcuts.anyPublicMethod() && target(bean) && @annotation(auditable)",
        argNames="bean,auditable")
public void audit(JoinPoint jp, Object bean, Auditable auditable) {
    AuditCode code = auditable.value();
    // ... use code, bean, and jp
}

~~~



**使用参数**

~~~java
@Around("execution(List<Account> find*(..)) && " +
        "com.xyz.myapp.SystemArchitecture.inDataAccessLayer() && " +
        "args(accountHolderNamePattern)")
public Object preProcessQueryPattern(ProceedingJoinPoint pjp,
        String accountHolderNamePattern) throws Throwable {
    // 对参数进行处理
    String newPattern = preProcess(accountHolderNamePattern);
    // 传递处理后的参数
    return pjp.proceed(new Object[] {newPattern});
}

~~~





#### 通知顺序

当多个Advice作用于一个连接点时，Spring AOP和AspectJ的执行顺序规则一致。

**进连接点之前(例如：Before类型Advice)，高优先级的Advice先执行。**

**出连接点之后(例如：After类型Advice)，高优先级的Advice后执行。**

当两个不同的Advice作用于相同的连接点，除非指定了顺序，否则执行顺序时未知的。

SpringAOP提供了两种方式定义顺序，在AspectJ类上使用@Order注解，或实现Ordered注解。两种方式指定的值绝对了优先级，值越小，优先级越高。





### 2.5.@DeclareParents

语法：@DeclareParents(value = "目标类表达式", defaultImpl = 接口实现类.class)。作用于属性上。

匹配的对象，代理后的对象有一个新的类型。

~~~java
@Aspect
public class UsageTracking {

    // com.xzy.myapp.service.*+表示service中的类及类的子类
    @DeclareParents(value="com.xzy.myapp.service.*+", defaultImpl=DefaultUsageTracked.class)
    public static UsageTracked mixin;

    // this表示代理后的对象是UsageTracked类型
    @Before("com.xyz.myapp.SystemArchitecture.businessService() && this(usageTracked)")
    public void recordUsage(UsageTracked usageTracked) {
        // 这里如果被代理的对象在bena名称为myService,则
        UsageTracked usageTracked = (UsageTracked) context.getBean("myService");
       	usageTracked.incrementUseCount();
    }

}

~~~





### 2.6.Aspect Instantiation Models



### 2.7.Example



## 3.Spring AOP(XML)



## 4.代理机制

Spring AOP使用JDK动态代理或CGLIB来为给定的目标对象创建代理。JDK动态代理内置JDK中，CGLIB的依赖现在也被打包到spring-core模块。

如果目标对象实现了至少一个接口，则通过JDK动态代理创建对象。如果没有实现接口，则通过CGLIB创建代理对象。

如果强制使用CGLIB代理，则不仅仅是接口的方法被代理，目标对象的所有方法都被代理。需要考虑的问题：

1. final修饰的方法，不能被继承，不能被子类重写。
2. 从Spring4.0开始，目标对象的构造方法不会被调用两次，因为CGLIB使用Objenesis创建代理对象。仅仅JVM不能绕过构造方法的情况下，才会调用练车。



~~~xml
<aop:config proxy-target-class="true">
    <!-- 只有里面的配置使用CGLIB代理 -->
</aop:config>

~~~

~~~xml
<aop:aspectj-autoproxy proxy-target-class="true"/>

<tx:annotation-driven/>

~~~



代理对象是通过BeanPostProcessor的实例AnnotationAwareAspectJAutoProxyCreator的postProcessAfterInitialization方法创建：







## 5.编程声明切面代理

前面说了两种方式声明切面：xml配置(aop:config)、xml配置(aop:aspectj-autoproxy)+注解(@Aspect)。还有一个编程方式创建切面代理。

可以通过Spring AOP的API编程方式声明切面，使用org.springframework.aop.aspectj.annotation.AspectJProxyFactory简单的例子：

~~~java
// 创建工厂(能够根据目标对象创建代理对象的)
AspectJProxyFactory factory = new AspectJProxyFactory(targetObject);

// 添加一个切面类,类必须使用了@Aspect注解
// 可以调用多次
factory.addAspect(SecurityManager.class);

// 也可以添加一个切面类的对象
factory.addAspect(usageTracker);

// 获取代理对象
MyInterfaceType proxy = factory.getProxy();

~~~



## 6.AspectJ在Spring中的应用



### 6.1.@Configurable

@Configurable注解可以将非Spring容器管理的对象(非Bena对象)使用依赖注入。比如代码直接new创建的对象。这一功能是通过Spring AOP来实现。

xml使用配置：需要添加命名空间。

~~~xml
<context:spring-configured/>

<!-- 配置作用? -->
<bean id="myService"
        class="com.xzy.myapp.service.MyService"
        depends-on="org.springframework.beans.factory.aspectj.AnnotationBeanConfigurerAspect">

    <!-- ... -->

</bean>

~~~





org.springframework.beans.factory.aspectj.AnnotationBeanConfigurerAspect在spring-aspects模块中(jpa中有导入)。

~~~xml
<!-- 什么作用不清楚-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.2.6.RELEASE</version>
    <scope>compile</scope>
</dependency>

~~~



### 6.2.spring-aspects其它功能

 @Transactional和AnnotationTransactionAspect



~~~java
// 作用
public aspect DomainObjectConfiguration extends AbstractBeanConfigurerAspect {

    public DomainObjectConfiguration() {
        setBeanWiringInfoResolver(new ClassNameBeanWiringInfoResolver());
    }

    // the creation of a new bean (any object in the domain model)
    protected pointcut beanCreation(Object beanInstance) :
        initialization(new(..)) &&
        SystemArchitecture.inDomainModel() &&
        this(beanInstance);
}

~~~



### 6.3.LTW

Load-time weaing(LTW)是指通过特定的类加载器，在类加载到JVM时，动态的将切面织入目标类的字节码文件。



某些情况下需要使用启动参数：-javaagent:path/to/aspectjweaver.jar或-javaagent:path/to/spring-instrument.jar。



注解：@EnableLoadTimeWeaving



例子：

1. 切面声明
2. META-INF/aop.xml文件
3. spring的xml配置
4. main方法
5. 启动命令：java -javaagent:C:/projects/foo/lib/global/spring-instrument.jar foo.Main

~~~java
package foo;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.util.StopWatch;
import org.springframework.core.annotation.Order;

@Aspect
public class ProfilingAspect {

    @Around("methodsToBeProfiled()")
    public Object profile(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch sw = new StopWatch(getClass().getSimpleName());
        try {
            sw.start(pjp.getSignature().getName());
            return pjp.proceed();
        } finally {
            sw.stop();
            System.out.println(sw.prettyPrint());
        }
    }

    @Pointcut("execution(public * foo..*.*(..))")
    public void methodsToBeProfiled(){}
}

~~~

~~~xml
<!DOCTYPE aspectj PUBLIC "-//AspectJ//DTD//EN" "https://www.eclipse.org/aspectj/dtd/aspectj.dtd">
<aspectj>

    <weaver>
        <!-- only weave classes in our application-specific packages -->
        <include within="foo.*"/>
    </weaver>

    <aspects>
        <!-- weave in just this aspect -->
        <aspect name="foo.ProfilingAspect"/>
    </aspects>

</aspectj>

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- a service object; we will be profiling its methods -->
    <bean id="entitlementCalculationService"
            class="foo.StubEntitlementCalculationService"/>

    <!-- this switches on the load-time weaving -->
    <context:load-time-weaver/>
</beans>

~~~

~~~java
package foo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public final class Main {

    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml", Main.class);

        EntitlementCalculationService entitlementCalculationService =
                (EntitlementCalculationService) ctx.getBean("entitlementCalculationService");

        // the profiling aspect is 'woven' around this method execution
        entitlementCalculationService.calculateEntitlement();
    }
}

~~~



这个结果改变了class类文件，下面的结果也将一致：

~~~java
package foo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public final class Main {

    public static void main(String[] args) {
        new ClassPathXmlApplicationContext("beans.xml", Main.class);

        EntitlementCalculationService entitlementCalculationService =
                new StubEntitlementCalculationService();

        // the profiling aspect will be 'woven' around this method execution
        entitlementCalculationService.calculateEntitlement();
    }
}

~~~



## 7.SpringAOP API



### 7.1.切入点

Spring的切入点模型支持切入点重复使用，这种重复使用和advice(通知)类型无关。可以在不同的类型通知上使用相同的切入点。

org.springframework.aop.Pointcut接口是核心，用于通知目标连接点(目标类的方法)。

~~~java
public interface Pointcut {

    ClassFilter getClassFilter();

    MethodMatcher getMethodMatcher();

}

~~~



~~~java
public interface ClassFilter {

    boolean matches(Class clazz);
}

~~~



~~~java
public interface MethodMatcher {

    // 第一层判断,不匹配,运行时则不会再进行后续的判断
    boolean matches(Method m, Class targetClass);
	
    // 为true,则判断参数是否匹配
    // 大多数情况的实现默认返回false,意味着三个参数的matchs方法调用
    boolean isRuntime();

    // isRuntime()为true才调用
    boolean matches(Method m, Class targetClass, Object[] args);
}

~~~





org.springframework.aop.support.Pointcuts类的静态方法使用ComposablePointcut类来处理交集(&&)和并集(||)。

org.springframework.aop.aspectj.AspectJExpressionPointcut来解析切入点表达式。



#### 静态切入点

特点是Spring只需要在方法调用时计算一次切入点。

正则表达式切入点：org.springframework.aop.support.JdkRegexpMethodPointcut





#### 动态切入点

每次调用都需要计算切入点的结果，不能缓存。

Control Flow Pointcuts：org.springframework.aop.support.ControlFlowPointcut



#### 切入点超类

StaticMethodMatcherPointcut 





### 7.2.Advice(通知)

每个通知就是一个Spring bean。所有的通知实例都可以被通知的对象共享，换句话说，被通知的对象总是拥有唯一的通知实例。

每个类通知？

每个实例通知？



#### 拦截Around通知

需要实现接口MethodInterceptor

~~~java
public interface MethodInterceptor extends Interceptor {

    Object invoke(MethodInvocation invocation) throws Throwable;
}

~~~



#### Before通知

不需要实现MethodInterceptor接口，这个只需要在进入方法前调用。因此不会出现导致拦截链无法执行的情况。

before通知引发异常，它将中止拦截链的执行。

~~~java
public interface MethodBeforeAdvice extends BeforeAdvice {

    // return void
    void before(Method m, Object[] args, Object target) throws Throwable;
}

~~~



#### Throw通知

如同连接点执行抛出异常，则Throw通知被执行。

org.springframework.aop.ThrowsAdvice为什么不需要有方法？



~~~java
public static class CombinedThrowsAdvice implements ThrowsAdvice {

    public void afterThrowing(RemoteException ex) throws Throwable {
        // Do something with remote exception
    }

    public void afterThrowing(Method m, Object[] args, Object target, ServletException ex) {
        // Do something with all arguments
    }
}

~~~



#### After Returning通知



必须实现org.springframework.aop.AfterReturningAdvice接口。After Returning通知类型能够访问返回值(不能修改)、被调用的方法、方法参数、目标对象。

该类型不会改变拦截链。

~~~java
public interface AfterReturningAdvice extends Advice {

    void afterReturning(Object returnValue, Method m, Object[] args, Object target)
            throws Throwable;
}

~~~



#### Introduction通知



~~~java
public interface IntroductionInterceptor extends MethodInterceptor {

    boolean implementsInterface(Class intf);
}

~~~

~~~java
public interface IntroductionAdvisor extends Advisor, IntroductionInfo {

    ClassFilter getClassFilter();

    void validateInterfaces() throws IllegalArgumentException;
}

public interface IntroductionInfo {

    Class<?>[] getInterfaces();
}

~~~



#### Advisor API

在Spring中，Advisor是一个切面，它只包含一个切入点表达式相关联的通知对象。

org.springframework.aop.support.DefaultPointcutAdvisor是常用的Advisor类，可以和MethodInterceptor, BeforeAdvice,  ThrowsAdvice一起使用。

在一个Spring AOP中，可以混合使用Advisor和Advice。Spring会自动创建拦截链。



### 7.3.ProxyFactoryBean

org.springframework.aop.framework.ProxyFactoryBean

Spring创建代理对象的工厂。在创建对象的过程中，使用到切入点和通知，决定了代理对象的方法调用。



#### 属性

和Spring提供FactoryBean大部分实现一样，ProxyFactoryBean本身也是一个JavaBean。这些属性的作用：

1. 指定代理的目标。
2. 创建代理对象的方式(CGLIB/JDK代理)。



继承org.springframework.aop.framework.ProxyConfig(AOP代理工厂的超类)类的属性：

1. proxyTargetClass：默认false。如果代理目标是类，则为true。如果设为true，则使用CGLIB代理。
2. optimize：默认false。控制是否将主动优化用于通过CGLIB创建的代理。仅用于CGLIB代理，对JDK代理没有任何影响。除非理解AOP代理如何处理优化，否则不要轻率的设置这个。
3. frozen：默认false。代理对象被创建后，使用不再允许对配置进行修改。
4. exposeProxy：是否在ThreadLocal中公开代理，以便目标可以访问它。设为true，则通过AopContext.currentProxy()能够访问。这里的目标是什么？
5. opaque：



ProxyFactoryBean的属性：

1. proxyInterfaces：一组接口，决定是否启用CGLIB代理。
2. interceptorNames：一组Advisor、interceptor或advice bean的名称。和拦截链有关。
3. singleton：默认true。单例相关。



#### 创建代理的方式

CGLIB/JDK代理。

默认情况下，被代理的目标对象的类(简称目标类)没有实现任何接口，将以CGLIB的方式创建代理。因为JDK的代理是基于接口实现的。

如果目标类实现了一个或多个接口，创建目标对象的代理类型取决于ProxyFactoryBean的配置。

1. proxyTargetClass设为true，则使用CGLIB创建代理。优先级比proxyInterfaces高。
2. proxyInterfaces 有一个或多个接口名，jdk代理方式创建代理对象。代理对象会实现配置的所有接口。但是目标类实现的接口比配置多，返回的对象并没有全部实现。
3. proxyInterfaces没有设置，目标类实现了一个或多个接口，ProxyFacotryBean会自动检测目标类实际上实现了至少一个接口，然后创建一个基于JDK的代理。代理对象将实现目标类所有实现的接口。



#### xml配置代理接口



~~~xml
<bean id="personTarget" class="com.mycompany.PersonImpl">
    <property name="name" value="Tony"/>
    <property name="age" value="51"/>
</bean>

<bean id="myAdvisor" class="com.mycompany.MyAdvisor">
    <property name="someProperty" value="Custom string property value"/>
</bean>

<bean id="debugInterceptor" class="org.springframework.aop.interceptor.DebugInterceptor">
</bean>

<bean id="person"
    class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="proxyInterfaces" value="com.mycompany.Person"/>

    <property name="target" ref="personTarget"/>
    <property name="interceptorNames">
        <list>
            <value>myAdvisor</value>
            <value>debugInterceptor</value>
        </list>
    </property>
</bean>

~~~

内联bean：

~~~xml
<bean id="myAdvisor" class="com.mycompany.MyAdvisor">
    <property name="someProperty" value="Custom string property value"/>
</bean>

<bean id="debugInterceptor" class="org.springframework.aop.interceptor.DebugInterceptor"/>

<bean id="person" class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="proxyInterfaces" value="com.mycompany.Person"/>
    <!-- Use inner bean, not local reference to target -->
    <property name="target">
        <bean class="com.mycompany.PersonImpl">
            <property name="name" value="Tony"/>
            <property name="age" value="51"/>
        </bean>
    </property>
    <property name="interceptorNames">
        <list>
            <value>myAdvisor</value>
            <value>debugInterceptor</value>
        </list>
    </property>
</bean>

~~~



~~~java
Person person = (Person) factory.getBean("person");

~~~



#### 配置代理类

CGLIB代理的工作原理是在运行时生成目标类的子类。

**final的方法不能被通知，因为不能被重写。**

Spring在3.2版本开始，将cglib的依赖打包到了spring-core的模块中。



CGLIB代理和JDK代理的性能差异很小。





#### interceptorNames使用通配符

~~~java
<bean id="proxy" class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="target" ref="service"/>
    <property name="interceptorNames">
        <list>
            <value>global*</value>
        </list>
    </property>
</bean>

<bean id="global_debug" class="org.springframework.aop.interceptor.DebugInterceptor"/>
<bean id="global_performance" class="org.springframework.aop.interceptor.PerformanceMonitorInterceptor"/>

~~~



### 7.4.简化xml代理配置

使用bean标签中的parent属性，能继承父类的属性，覆盖父类的属性。

org.springframework.transaction.interceptor.TransactionProxyFactoryBean是spring-tx模块的。

~~~xml
<!-- parent声明，abstract属性为true，所以不会实例化 -->
<bean id="txProxyTemplate" abstract="true"
        class="org.springframework.transaction.interceptor.TransactionProxyFactoryBean">
    <property name="transactionManager" ref="transactionManager"/>
    <property name="transactionAttributes">
        <props>
            <prop key="*">PROPAGATION_REQUIRED</prop>
        </props>
    </property>
</bean>

<!-- 使用parent -->
<bean id="myService" parent="txProxyTemplate">
    <property name="target">
        <bean class="org.springframework.samples.MyServiceImpl">
        </bean>
    </property>
</bean>


<bean id="mySpecialService" parent="txProxyTemplate">
    <property name="target">
        <bean class="org.springframework.samples.MySpecialServiceImpl">
        </bean>
    </property>
    <!-- 覆盖配置 -->
    <property name="transactionAttributes">
        <props>
            <prop key="get*">PROPAGATION_REQUIRED,readOnly</prop>
            <prop key="find*">PROPAGATION_REQUIRED,readOnly</prop>
            <prop key="load*">PROPAGATION_REQUIRED,readOnly</prop>
            <prop key="store*">PROPAGATION_REQUIRED</prop>
        </props>
    </property>
</bean>

~~~





### 7.5.coding

不使用Spring IOC的情况下，代码创建代理对象。



~~~java
ProxyFactory factory = new ProxyFactory(myBusinessInterfaceImpl);
// 添加通知
factory.addAdvice(myMethodInterceptor);
// 添加通知者
factory.addAdvisor(myAdvisor);
// 创建代理
MyBusinessInterface tb = (MyBusinessInterface) factory.getProxy();

~~~



### 7.6.Advised

通过Spring AOP创建的代理对象(不管CGLIB/JDK代理)，都能转换成org.springframework.aop.framework.Advised接口类型。



~~~java
// 返回添加到构建代理对象工厂的advisor、interceptor、advice
Advisor[] getAdvisors();

// 添加
// 代理对象已经创建，不能添加或删除introduction advisor
void addAdvice(Advice advice) throws AopConfigException;

void addAdvice(int pos, Advice advice) throws AopConfigException;

void addAdvisor(Advisor advisor) throws AopConfigException;

void addAdvisor(int pos, Advisor advisor) throws AopConfigException;

int indexOf(Advisor advisor);

boolean removeAdvisor(Advisor advisor) throws AopConfigException;

void removeAdvisor(int index) throws AopConfigException;

boolean replaceAdvisor(Advisor a, Advisor b) throws AopConfigException;

boolean isFrozen();

~~~



~~~java
// 默认情况下，代理工厂配置frozen为false。设为true执行则抛出AopConfigException异常
// 将代理对象强制转换成Advised类型
Advised advised = (Advised) myObject;
Advisor[] advisors = advised.getAdvisors();
int oldAdvisorCount = advisors.length;
System.out.println(oldAdvisorCount + " advisors");

// 添加一个没有切入点的advice
// 将会代理所有方法
// Can use for interceptors, before, after returning or throws advice
advised.addAdvice(new DebugInterceptor());

// Add selective advice using a pointcut
advised.addAdvisor(new DefaultPointcutAdvisor(mySpecialPointcut, myAdvice));

assertEquals("Added two advisors", oldAdvisorCount + 2, advised.getAdvisors().length);

~~~



### 7.7.auto-proxy

自动代理配置

使用org.springframework.aop.framework.autoproxy包中的功能。

BeanNameAutoProxyCreator：

~~~xml
<!--通过使用bean的名称创建代理-->
<bean class="org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator">
    <property name="beanNames" value="jdk*,onlyJdk"/>
    <property name="interceptorNames">
        <list>
            <value>myInterceptor</value>
        </list>
    </property>
</bean>

~~~



DefaultAdvisorAutoProxyCreator：

这样一个例子看不出如何生效？

~~~xml
<bean class="org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator"/>

<bean class="org.springframework.transaction.interceptor.TransactionAttributeSourceAdvisor">
    <property name="transactionInterceptor" ref="transactionInterceptor"/>
</bean>

<bean id="customAdvisor" class="com.mycompany.MyAdvisor"/>

<bean id="businessObject1" class="com.mycompany.BusinessObject1">
    <!-- Properties omitted -->
</bean>

<bean id="businessObject2" class="com.mycompany.BusinessObject2"/>

~~~



### 7.8.TargetSource

org.springframework.aop.TargetSource

目标对象和连接点的关系？



#### HotSwappableTargetSource

org.springframework.aop.target.HotSwappableTargetSource

切换目标对象，但是不影响调用？有什么作用？

~~~xml
<bean id="initialTarget" class="mycompany.OldTarget"/>

<bean id="swapper" class="org.springframework.aop.target.HotSwappableTargetSource">
    <constructor-arg ref="initialTarget"/>
</bean>

<bean id="swappable" class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="targetSource" ref="swapper"/>
</bean>

~~~



~~~java
HotSwappableTargetSource swapper = (HotSwappableTargetSource) beanFactory.getBean("swapper");
// 交换
Object oldTarget = swapper.swap(newTarget);

~~~



#### AbstractPoolingTargetSource 





#### PrototypeTargetSource



~~~xml
<bean id="prototypeTargetSource" class="org.springframework.aop.target.PrototypeTargetSource">
    <property name="targetBeanName" ref="businessObjectTarget"/>
</bean>

~~~



#### ThreadLocalTargetSource




~~~xml
<bean id="threadlocalTargetSource" class="org.springframework.aop.target.ThreadLocalTargetSource">
    <property name="targetBeanName" value="businessObjectTarget"/>
</bean>

~~~



## 8.自定义advice类型

自定义类型需要实现标记接口org.aopalliance.aop.Advice。

https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/aop/framework/adapter/package-frame.html



## 9.bean代理对象创建的过程

![image-20250103205311866](http://47.101.155.205/image-20250103205311866.png)

BeanPostProcessor实例AnnotationAwareAspectJAutoProxyCreator

AbstractAutoProxyCreator：

1. postProcessBeforeInstantiation：返回null，不为空的TargetSource对象。
2. postProcessAfterInitialization：根据bean对象是否创建代理对象

![image-20250103211030557](http://47.101.155.205/image-20250103211030557.png)

![image-20250103212911356](http://47.101.155.205/image-20250103212911356.png)

![image-20250103213344751](http://47.101.155.205/image-20250103213344751.png)