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



