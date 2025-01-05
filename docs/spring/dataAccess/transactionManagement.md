# 事务管理

Spring框架的事务管理提供以下优势：

1. 跨不同事务API的一致性编程模型，例如Java事务API(JTA)、JDBC、Hibernate、JPA(Java Persistence API)。
2. 支持声明式事务管理。
3. 更简单的编程式事务管理API。
4. 集成Spring data access抽象。



Spring框架的事务功能和技术描述介绍：

1. Spring框架事务支持模型(Spring框架的事务抽象)比EJB Container-Managed Transaction(CMT)或通过Hibernate驱动本地事务更具优势。(1.1)
2. 了解Spring框架事务的核心类，如何从各种来源获取和配置DataSource。(1.2)
3. 使用事务同步资源描述了应用程序代码如果使资源被正确地创建、复用、清理。1.3
4. 声明式事务。1.4
5. 编程式事务支持。1.5
6. 事务绑定事件描述了如何再事务中使用程序事件。1.7
7. 1.8集成
8. 1.9解决方案



## 1.Spring事务模型优势

传统上，Java EE开发有两种事务管理可选，全局或本地事务，两者都有局限性。



### 1.1.Global Transaction

全局事务管理允许使用多个事务资源，典型的关系型数据库和消息队列。服务端应用通过JTA使用全局事务管理，JTA是笨重的(部分是由于它的异常模型)。此外，JTA UserTransaction通常需要使用JNDI获取，意味着为了使用JTA必须使用JNDI。因为JTA通常仅在应用服务器环境可用，使用这个会限制代码的潜在可用性。

以前，使用全局事务的首选方式是EJB CMT(Container Managed Transaction)。CMT是声明式事务管理形式(与编程式事务管理不同)。尽管EJB CMT消除了与事务相关的JNDI查找需要，但是使用EJB本身需要JNDI。它消除了大部分编写java代码控制事务。和JTA一样，CMT需要应用服务器上使用。还需要选择EJB实现业务逻辑时，才可用。

应用服务器产品：JBoss、WebLogic、WebSphere。



### 1.2.Local Transaction

本地事务时特定于资源的，例如与JDBC连接关联的事务。本地事务可能更易于使用，但是有一明显的缺点：不能跨多个事务资源工作。例如，使用JDBC连接管理事务的代码不能再全局JTA事务中运行。因为应用服务器不参与事务管理，所以它无法帮助确保跨多个资源的正确性。另一个缺点时本地事务对编程模型具有侵入性。





### 1.3.Spring的一致性编程模型

解决了本地事务全局事务的缺点。允许开发者在不同的环境中使用一致性编程模型。提供了声明式事务管理和编程式事务管理。

模型怎么做的？怎么解决问题的？





## 2.事务抽象

~~~xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.2.6.RELEASE</version>
</dependency>

~~~

Spring事务抽象的关键是事务策略的概念。事务策略由org.springframework.transaction.PlatformTransactionManager接口定义。

PlatformTransactionManager是一个服务提供者接口(service provider interface SPI)，可以在应用程序中通过编码使用它。为了与Spring的理念保持一致，PlatformTransactionManager接口的任何方法都抛出了TransactionException(运行时异常)。这样异常在编码过程中是可以不处理。

~~~java
public interface PlatformTransactionManager extends TransactionManager {

	// 线程上下文?
	TransactionStatus getTransaction(@Nullable TransactionDefinition definition)
			throws TransactionException;

	
	void commit(TransactionStatus status) throws TransactionException;

	
	void rollback(TransactionStatus status) throws TransactionException;

}

~~~

TransactionDefinition对象定义以下内容：

1. 传播(Propagation)：通常情况下，在事务范围内运行的代码都在该事务中运行。但是，如果在事务上下文已经存在时执行事务方法，则可以指定其行为。通常是在当前事务上下文中运行，或暂停当前已存在的事务并创建新的事务。Spring提供了EJB CMT中所有的事务传播选项。
2. 隔离(Isolation)：此事务与其它事务的隔离级别。例如：能否看见读未提交的内容？
3. 超时(Timeout)：在底层事务基础设施使事务超时并自动回滚之前，事务执行的事件。
4. 只读状态(Read-only status)：当代码只读取数据不修改数据时，可以使用此状态。

上面的内容是一个事务的标准概念。



TransactionStatus接口提供了一种简单的方法来控制事务的执行和查看事务的状态。

~~~java
// TransactionStatus extends TransactionExecution, SavepointManager, Flushable
public interface TransactionStatus extends SavepointManager {

    boolean isNewTransaction();

    boolean hasSavepoint();

    void setRollbackOnly();

    boolean isRollbackOnly();

    void flush();

    boolean isCompleted();
}

~~~



无论在Spring中使用声明式事务管理还是编程式事务管理，都需要定义PlatformTransactionManager的实现bean。不同的环境由不同的PlatformTransactionManager实现，如JDBC、JTA、Hibernate等。

spring-jdbc使用：

~~~xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}" />
    <property name="url" value="${jdbc.url}" />
    <property name="username" value="${jdbc.username}" />
    <property name="password" value="${jdbc.password}" />
</bean>

<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

~~~



在Java容器中使用JTA，可以使用容器DataSource，使用JNDI查找：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jee="http://www.springframework.org/schema/jee"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/jee
        https://www.springframework.org/schema/jee/spring-jee.xsd">

    <jee:jndi-lookup id="dataSource" jndi-name="jdbc/jpetstore"/>

    <!--JtaTransactionManager不需要配置dataSource,使用容器的全局事务管理-->
    <bean id="txManager" class="org.springframework.transaction.jta.JtaTransactionManager" />

 
</beans>

~~~



Hibernate本地事务使用：

~~~xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}" />
    <property name="url" value="${jdbc.url}" />
    <property name="username" value="${jdbc.username}" />
    <property name="password" value="${jdbc.password}" />
</bean>

<!--LocalSessionFactoryBean-->
<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="mappingResources">
        <list>
            <value>org/springframework/samples/petclinic/hibernate/petclinic.hbm.xml</value>
        </list>
    </property>
    <property name="hibernateProperties">
        <value>
            hibernate.dialect=${hibernate.dialect}
        </value>
    </property>
</bean>

<bean id="txManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
    <property name="sessionFactory" ref="sessionFactory"/>
</bean>

~~~



使用PlatformTransactionManager来管理事务，就可以通过修改配置来更改事务的管理方式。

本地事务和全局事务的不同性？



## 3.资源与事务同步

介绍使用JDBC、Hibernate、JPA等持久性API程序代码如何正确地确保资源被创建、重用、清理。

如何控制事务？

### 3.1.高级同步方法

1. Spring基于模板继承的持久性API：JdbcTemplate。
2. 感知事务的ORM API



### 3.2.低级同步方法

使用工具类：DataSourceUtils(JDBC)、EntityManagerFactoryUtils(JPA)、SessionFactoryUtils(Hibernate)。

~~~java
// org.springframework.jdbc.datasource.DataSourceUtils
// 现有事务如果有一个同步连接,则返回该连接;否则将触发新的连接
Connection conn = DataSourceUtils.getConnection(dataSource);

~~~

任何SQLException异常被包装在Sprin的CannotGetJdbcConnectionException异常中，这是DataAccessException异常的子类，这种方式为跨库提供了可移植性。



## 4.声明式事务管理

Spring框架的事务管理通过AOP实现。

Spring框架的声明式事务和EJB CMT很相似，可以给定事务行为至方法级别。也可以在事务上下文中使用setRollbackOnly()方法回滚事务。两者之间的不同点：

1. EJB CMT需要绑定JTA，Spring框架的声明式事务可以适用于任何环境。它可以通过更改配置文件选用JDBC、JPA、Hibernate来处理JTA事务或本地事务。
2. Spring框架支持在任何类使用声明式事务，EJB需要在特定的类使用。
3. Spring框架提供了声明式回滚规则，EJB没有的。
4. Spring框架可以通过AOP自定义事务行为，例如，**可以在事务回滚时自定义行为**。EJB CMT只能通过setRollbackOnly影响事务行为。
5. Spring框架没有提供高端应用程序跨远程调用传播事务上下文支持。



Spring框架的声明式事务允许指定哪些异常应自动回滚，默认情况下，只有未被检查的异常或error才回滚(和EJB一致)，当然也可以指定一些自定义的异常。也可以通过TransactionStatus对象的setRollbackOnly()方法来回滚异常。



### 4.1.声明式事务实现介绍

声明式事务通过xml配置或注解使用。Spring的声明式事务是通过AOP代理实现的。AOP与事务元数据(XML配置或注解)产生了一个AOP代理，代理使用TransactionInterceptor和配置的PlatformTransactionManager结合使用，围绕被调用的方法控制事务。



![代理调用图](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/tx.png)

![image-20250104094730274](http://47.101.155.205/image-20250104094730274.png)



### 4.2.xml使用声明式事务

~~~java
public interface FooService {

    Foo getFoo(String fooName);

    Foo getFoo(String fooName, String barName);

    void insertFoo(Foo foo);

    void updateFoo(Foo foo);

}

~~~

~~~java
public class DefaultFooService implements FooService {

    @Override
    public Foo getFoo(String fooName) {
        // 只读事务
    }

    @Override
    public Foo getFoo(String fooName, String barName) {
        // 只读事务
    }

    @Override
    public void insertFoo(Foo foo) {
        // 读写事务
    }

    @Override
    public void updateFoo(Foo foo) {
        // 读写事务
    }
}

~~~

实现上面事务控制的xml配置：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/tx
        https://www.springframework.org/schema/tx/spring-tx.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    
    <bean id="fooService" class="x.y.service.DefaultFooService"/>

    <!-- 配置一个advice (什么时候执行advise看 <aop:advisor/> 配置 ) -->
    <!--PlatformTransactionManager bean的名称是transactionManager,则可以省略transaction-manager属性-->
    <tx:advice id="txAdvice" transaction-manager="txManager">
        <!-- the transactional semantics... -->
        <tx:attributes>
            <!-- all methods starting with 'get' are read-only -->
            <tx:method name="get*" read-only="true"/>
            <!-- other methods use the default transaction settings (see below) -->
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>

    <!-- 事务配置应用在这些匹配的切入点上 -->
    <aop:config>
        <aop:pointcut id="fooServiceOperation" expression="execution(* x.y.service.FooService.*(..))"/>
        <aop:advisor advice-ref="txAdvice" pointcut-ref="fooServiceOperation"/>
    </aop:config>

    <!-- DataSource -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
        <property name="url" value="jdbc:oracle:thin:@rj-t42:1521:elvis"/>
        <property name="username" value="scott"/>
        <property name="password" value="tiger"/>
    </bean>

    <!-- PlatformTransactionManager -->
    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>


</beans>

~~~



~~~java
public final class Boot {

    public static void main(final String[] args) throws Exception {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("context.xml", Boot.class);
        FooService fooService = (FooService) ctx.getBean("fooService");
        fooService.insertFoo (new Foo());
    }
}

~~~



### 4.3.声明式事务回滚

Spring的事务框架能捕获所有未处理的异常，以便于是否将事务标记为回滚。默认只回滚RuntimeException异常及其子类(但包括Error)。需要Checked的异常(catch处理否则throw的)则不会被rollback。

xml配置指定的异常回滚：

~~~xml
<tx:advice id="txAdvice" transaction-manager="txManager">
    <tx:attributes>
    <tx:method name="get*" read-only="true" rollback-for="NoProductInStockException"/>
    <tx:method name="*"/>
    </tx:attributes>
</tx:advice>

~~~

xml配置指定的异常不回滚：


~~~xml
<tx:advice id="txAdvice">
    <tx:attributes>
    <tx:method name="updateStock" no-rollback-for="InstrumentNotFoundException"/>
    <tx:method name="*"/>
    </tx:attributes>
</tx:advice>

~~~

两种配置同时指定，除了InstrumentNotFoundException异常，其它都会回滚。

~~~xml
<tx:advice id="txAdvice">
    <tx:attributes>
    <tx:method name="*" rollback-for="Throwable" no-rollback-for="InstrumentNotFoundException"/>
    </tx:attributes>
</tx:advice>

~~~



编程式指定回滚

~~~java
public void resolvePosition() {
    try {
        // some business logic...
    } catch (NoProductInStockException ex) {
        // trigger rollback programmatically
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
    }
}

~~~



### 4.4.tx:advice

tx:advice配置的默认设置：

1. 事务传播级别：REQUIRED。
2. 事务的隔离级别：DEFAULT，默认的。
3. 什么事务：可读写。
4. 事务超时时间：默认为底层数据库的事务超时时间，如果不支持则不设置。
5. 回滚的异常：RuntimeException及其子类。



tx:advice、tx:attributes中tx:method属性配置：

| 属性            | 必填 | 默认     | 描述                                            |
| --------------- | ---- | -------- | ----------------------------------------------- |
| name            | Y    | -        | 需要使用事务的方法名，可以使用通配符            |
| propagation     | N    | REQUIRED |                                                 |
| isolation       | N    | DEFAULT  | 事务隔离级别。仅REQUIRED或REQUIRED_NEW传播设置  |
| timeout         | N    | -1       | 事务超时时间s。仅REQUIRED或REQUIRED_NEW传播设置 |
| read-only       | N    | false    | 读写或仅读。仅REQUIRED或REQUIRED_NEW传播设置    |
| rollback-for    | N    |          | 回滚异常指定，','分割多个                       |
| no-rollback-for | N    |          | 不回滚异常指定，','分割多个                     |



### 4.5.注解

@Transactional可以作于于类上(接口)，表示该类所有声明的方法和子类的方法都被标记，但是父类的方法不受影响，这种情况下需要重写父类的方法。

@Transactional也可以单独作用于方法(接口方法)上。方法要求：public，非public的方法不会显示配置事务设置。非public后面介绍使用AspectJ的方式。

**如果注解@Transactional作用于接口或接口方法上，如果使用的基于接口的代理，事务配置会生效。如果使用CGLIB代理，或基于AspectJ织入，则不会生效。**

**默认代理模式下，只有通过代理对象调用的方法才会被拦截。所以如果在@Transactional注解的方法中调用另一个@Transactional方法，会出现另外一个方法事务控制失效的情况。如果需要这种自调用的事务生效，可以使用AspectJ模式，这种情况下没有代理，类的字节码文件会被修改。**

**@Transactional同时作用于类上及方法上，方式上的优先级高(The most derived location takes precedence)。**

激活注解使用的方式一：纯注解

~~~java
@Configuration
@EnableTransactionManagement
public class AppConfig {

     @Bean
     public FooRepository fooRepository() {
         
         return new JdbcFooRepository(dataSource());
     }

     @Bean
     public DataSource dataSource() {
         // 配置数据源
     }

     @Bean
     public PlatformTransactionManager txManager() {
         return new DataSourceTransactionManager(dataSource());
     }
 }

~~~

方式二：xml配置

~~~xml
<!--补充tx配置-->
<tx:annotation-driven/>

~~~

~~~xml
<!-- from the file 'context.xml' -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/tx
        https://www.springframework.org/schema/tx/spring-tx.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- this is the service object that we want to make transactional -->
    <bean id="fooService" class="x.y.service.DefaultFooService"/>

    <!-- enable the configuration of transactional behavior based on annotations -->
    <tx:annotation-driven transaction-manager="txManager"/><!-- a PlatformTransactionManager is still required --> 

    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!-- (this dependency is defined somewhere else) -->
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- other <bean/> definitions here -->

</beans>

~~~

注解驱动的事务配置：

| xml属性             | 注解属性         | 默认值                    | 描述                                        |
| ------------------- | ---------------- | ------------------------- | ------------------------------------------- |
| transaction-manager |                  | transactionManager        | 事务管理名称非transactionManager才需要指定  |
| mode                | mode             | proxy                     | Spring AOP代理/修改字节码文件               |
| proxy-target-class  | proxyTargetClass | false                     | mode=proxy模式才有效，是否强制使用CGLIB代理 |
| order               | order            | Ordered.LOWEST_PRECEDENCE | @Transactional注解advice的顺序              |



#### @Transactional设置

**支持作为元注解扩展使用。**

| 属性                   | Type             | 默认值               | 描述                                            |
| ---------------------- | ---------------- | -------------------- | ----------------------------------------------- |
| value                  | String           | -                    | 指定PlatformTransactionManager <br />bean的名称 |
| propagation            | enum Propagation | Propagation.REQUIRED | 事务传播级别                                    |
| isolation              | enum Isolation   | Isolation.DEFAULT    | 事务隔离级别，同xml配置                         |
| readOnly               | boolean          | false                | 同xml配置                                       |
| rollbackFor            | Class 数组       | -                    |                                                 |
| rollbackForClassName   | class名称数组    |                      |                                                 |
| noRollbackFor          | Class 数组       |                      |                                                 |
| noRollbackForClassName | class名称数组    |                      |                                                 |

使用多个事务管理器的方式：

~~~java
public class TransactionalService {

    // 
    // 指定事务管理器bena的名称或别名
    @Transactional("order")
    public void setSomething(String name) { ... }

    @Transactional("account")
    public void doSomething() { ... }
}

~~~

**未找到这个名称的bean会如何？**



### 4.6.事务传播级别

逻辑事务域物理事务的区别。



> REQUIRED

强制执行物理事务，不存在事务则创建事务，存在事务则参与外部的事务(在一个线程中)。

加入的事务配置有这些isolation、timeout、readOnly配置，会对当前的事务有什么影响。

**如果链路后面的方法将事务标记为仅回滚，链路前的逻辑事务独立于链路后的，这个时候就会出现问题。例如链路后的方法标记了一个rollback的异常，但是链路后的没有标记。**

![](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/tx_prop_required.png)

![image-20250104160422967](http://47.101.155.205/image-20250104160422967.png)



> REQUIRES_NEW

REQUIRES_NEW为每个受影响的方法开启一个独立的物理事务，不参与外部的事务。有自己的事务配置

![](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/tx_prop_requires_new.png)

![image-20250104162241988](http://47.101.155.205/image-20250104162241988.png)



> NESTED

具有可以回滚到某个保存点的单个事务，于默认的隔离级别不同，内部的回滚。仅适用于JDBC的事务管理资源。



### 4.7.事务与advice一起使用

环绕通知的优先级高于事务advice。

环绕通知的优先级低于事务advice，则可以测进入事务后和在事务提交前的性能。

~~~java
public class SimpleProfiler implements Ordered {

    private int order;

    // 控制切面执行的顺序
    public int getOrder() {
        return this.order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    // 定义一个切面 这个切面一个arround
    public Object profile(ProceedingJoinPoint call) throws Throwable {
        Object returnValue;
        StopWatch clock = new StopWatch(getClass().getName());
        try {
            clock.start(call.toShortString());
            returnValue = call.proceed();
        } finally {
            clock.stop();
            System.out.println(clock.prettyPrint());
        }
        return returnValue;
    }
}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/tx
        https://www.springframework.org/schema/tx/spring-tx.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="fooService" class="x.y.service.DefaultFooService"/>

    <!-- 切面声明 -->
    <bean id="profiler" class="SimpleProfiler">
        <!-- 较低的值，较高的优先级 before会先执行 after后执行 -->
        <property name="order" value="1"/>
    </bean>
	
    <!-- 使用注解驱动,同时声明事务的advice优先级 -->
    <tx:annotation-driven transaction-manager="txManager" order="200"/>

    <aop:config>
            <!-- 围绕事务advice的环绕advice -->
            <aop:aspect id="profilingAspect" ref="profiler">
                <aop:pointcut id="serviceMethodWithReturnValue"
                        expression="execution(!void x.y..*Service.*(..))"/>
                <aop:around method="profile" pointcut-ref="serviceMethodWithReturnValue"/>
            </aop:aspect>
    </aop:config>

    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
        <property name="url" value="jdbc:oracle:thin:@rj-t42:1521:elvis"/>
        <property name="username" value="scott"/>
        <property name="password" value="tiger"/>
    </bean>

    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

</beans>

~~~



### 4.8.AspectJ

使用AspectJ步骤：

1. 添加spring-aspects.jar依赖。

2. 指定注解驱动的mode=aspectj

3. ~~~java
   // construct an appropriate transaction manager
   DataSourceTransactionManager txManager = new DataSourceTransactionManager(getDataSource());
   
   // configure the AnnotationTransactionAspect to use it; this must be done before executing any transactional methods
   AnnotationTransactionAspect.aspectOf().setTransactionManager(txManager);
   ~~~

4. LTW配置



## 5.编程式事务管理

Spring提供的编程式事务管理方式：

1. TransactionTemplate
2. PlatformTransactionManager的实现

推荐使用TransactionTemplate的方式，PlatformTransactionManager的方式类似JTA UserTransaion API。



### TransactionTemplate

TransactionTemplate是线程安全的，实例不维护任何会话状态。但是会维护配置信息，所以，需要使用不同的事务配置，还是需要创建不同的实例。

~~~java
public class SimpleService implements Service {

    // 当前对象共享TransactionTemplate对象
    private final TransactionTemplate transactionTemplate;

    // 构造方法注入PlatformTransactionManager
    public SimpleService(PlatformTransactionManager transactionManager) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    public Object someServiceMethod() {
        // execute负责开启和commit/rollback事务
        return transactionTemplate.execute(new TransactionCallback() {
            // 需要在事务中执行的代码
            public Object doInTransaction(TransactionStatus status) {
                updateOperation1();
                return resultOfUpdateOperation2();
            }
        });
    }
}

~~~

~~~java
// 方法不需要返回值可以使用TransactionCallbackWithoutResult
transactionTemplate.execute(new TransactionCallbackWithoutResult() {

    protected void doInTransactionWithoutResult(TransactionStatus status) {
        try {
            updateOperation1();
            updateOperation2();
        } catch (SomeBusinessException ex) {
            // 回滚事务
            status.setRollbackOnly();
        }
    }
});

~~~



默认情况下，TransactionTemplate有默认的事务设置(注解的事务设置)。

~~~java
public class SimpleService implements Service {

    private final TransactionTemplate transactionTemplate;

    public SimpleService(PlatformTransactionManager transactionManager) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);

        // the 设置事务的隔离级别
        this.transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_READ_UNCOMMITTED);
        this.transactionTemplate.setTimeout(30); // 30 seconds
        // and so forth...
    }
}

~~~



### PlatformTransactionManager

~~~java
// 定义事务的信息
DefaultTransactionDefinition def = new DefaultTransactionDefinition();
// 显示的设置事务名称(注解的事务名称是类名.方法名)
def.setName("SomeTxName");
def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

// 开启一个事务
TransactionStatus status = txManager.getTransaction(def);
try {
    // 事务上下文执行的代码
}
catch (MyException ex) {
    txManager.rollback(status);
    throw ex;
}
txManager.commit(status);

~~~





## 6.两种事务管理如何取舍

如果应用中只有较小事务操作，不想使用事务代理，则可以使用TransactionTemplate的编程式事务管理。

如果应用有许多事务操作，使用声明式事务是非常方便的。



## 7.事务绑定事件

Spring4.2开始，事件的监听者可以绑定到事务某个阶段。使用@TransactionalEventListener将事务阶段绑定到事件。

**事件可以是任意的ApplicationEvent子类吗？**

~~~java
@Component
public class MyComponent {

    // 模式是事务提交后
    @TransactionalEventListener
    public void handleOrderCreatedEvent(CreationEvent<Order> creationEvent) {
        // ...
    }
}

~~~

TransactionalEventListener属性：

1. phase：事务的阶段，默认提交后
2. fallbackExecution：默认false，没有事务的情况下，是否发布事件。



## 8.特定应用服务器的集成

Spring’s transaction abstraction is generally application server-agnostic.

JtaTransactionManager 的API支持在应用服务器运行，无需任何配置(GlassFish、JBoss 和 Geronimo)，支持高级功能(事务挂起REQUIRED_NEW)。

WebLogic Server和WebSphere需要特殊配置。使用

~~~xml
<tx:jta-transaction-manager/>

~~~





#### IBM WebSphere

使用WebSphereUowTransactionManager事务管理器。



#### Oracle WebLogic Server

WebLogicJtaTransactionManager 



## 9.常见问题

### 特定DataSource使用错误的事务管理器

使用全局事务，必须使用org.springframework.transaction.jta.JtaTransactionManager和与应用服务器集成。



## 10.其它资源

分布式事务，带XA和不带XA：https://www.infoworld.com/article/2177690/distributed-transactions-in-spring-with-and-without-xa.html

