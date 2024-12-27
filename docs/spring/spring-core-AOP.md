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





## 2.Spring AOP

Spring AOP介绍：

1. Spring AOP完全基于Java代码实现，不需要其它特殊的编译。
2. Spring AOP仅支持方法作为连接点(作用在bean的方法上)，而不支持属性拦截(对属性的操作进行增强)。
3. Spring将Spring AOP和IOC与AspectJ无缝衔接。
4. Spring AOP只能advice(增强) Bean的方法。
5. Spring AOP集成AspectJ的切面功能，没有使用其编译时或加载时织入功能。





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

xml启用@AspectJ配置：

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





