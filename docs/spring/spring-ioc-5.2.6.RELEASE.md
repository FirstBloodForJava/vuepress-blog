# IOC容器

IOC(Inversion of Control) Container。



## 1.IOC Container和Bean介绍

IOC也被称为依赖注入(DI)(Dependency Injection)。在这个过程中，对象只能通过构造函数参数、工厂方法的参数、对象实例被构造后或从工厂方法返回后再对象上设置属性来定义它们的依赖关系。然后，容器在创建Bean时注入这些依赖项。这个过程与直接使用Bean的构造方法创建对象，或通过服务定位器模式(Service Locator pattern)机制控制依赖对象的方式相反，被称为控制反转。

org.springframework.beans(spring-beans)和org.springframework.context(spring-context)为Spring框架的IOC容器提供了基础。

BeanFactory接口提供了一种能够管理任何类型对象的高级配置机制。？

ApplicationContext是BeanFactory的子接口，扩展如下：

1. Easier integration with Spring’s AOP features。
2. Message resource handling (for use in internationalization)。
3. Event publication。
4. Application-layer specific contexts such as the WebApplicationContext for use in web applications。



在Spring中，由Spring IOC容器管理的对象称为Bean。Bean是Spring IOC容器实例化、组装、管理的对象。



## 2.容器介绍

org.springframework.context.ApplicationContext接口表示Spring IOC容器，负责实例化、配置和组装Beans。容器通过读取配置元数据来获取实例化、配置和组装对象的指令。配置元数据用xml、java注解、Java代码表示，能表示应用中这些对象的依赖关系。

Spring提供了几个ApplicationContext接口的实现。在单机的应用程序中，通常创建 ClassPathXmlApplicationContext或FileSystemXmlApplicationContext实例。



应用程序的class类和配置元数据相结合，在ApplicationContext被创建和初始化后，就得到了一个完全配置好且可执行的系统或应用。Spring的工作流程图如下：

![image-20241215142850412](http://47.101.155.205/image-20241215142850412.png)

![container-magic](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/container-magic.png)



### 配置元数据

配置元数据的方式：

1. xml配置元数据。
2. 基于注解的配置：Spring2.5开始。
3. 基于Java代码的配置：Spring3.0开始。

基于xml配置元数据的格式：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        
    </bean>

    

</beans>

~~~

id：Bean的唯一标识。

class：Bean的class类型。



### 使用容器

~~~java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

~~~

services.xml配置

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

     <!-- 导入其它xml配置 -->
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        
    </bean>

    

</beans>

~~~



## 3.Bean介绍

在容器中，Bean被表示为BeanDefinition对象，包含了以下信息：

1. Bean的全路径名称。
2. Bean的行为配置元素，声明Bean在容器中何时被创建，作用域、生命周期、回调等。
3. Bean对其它Bean的引用，称为Bean对其它Bean的组合或依赖。
4. 作为要新创建Bean的配置使用。

这些元数据会转换为一组构成每个Bean定义的属性。如下表：

| 属性                     | 描述       |
| ------------------------ | ---------- |
| Class                    | Bean的类型 |
| Name                     | Bean的名称 |
| Scope                    |            |
| Constructor arguments    |            |
| Properties               |            |
| Autowiring mode          |            |
| Lazy initialization mode |            |
| initalization method     |            |
| Destruction method       |            |

ApplicationContext的实现允许new创建的对象注册到容器中，通过ApplicationContext的BeanFactory(getBeanFactory()方法)，返回DefaultListableBeanFactory通过registerSingleton(..)或registerBeanDefinition(..)方法注册。



### 3.1.Bean的名称

每个Bean都有一个或多个标识。这些标识必须保证在容器能确定这个Bean。一个Bean通常仅有一个唯一标识(不可重复)，但是这个这个标识可以起别名(别名可以重复?注解不同bean的别名不能重复)。

![image-20241215195828147](http://47.101.155.205/image-20241215195828147.png)

Bean的命名规则同Java属性的命名规则。

通过类路径扫描注册的Bean，通常是简单类名的首字母小写名称，如果第一二个字符都大写，则保持不变。

@Bean注解定义的Bean的名称默认是方法名，使用value属性，则替换方法名，后面的名称则为别名。



### 3.2.Bean的初始化

通过xml的方式配置一个bean，需要指定的bean的class属性，这个class属性有两种指定方式：

1. 指定类的全路径名称，通过反射构造方法创建对象，如果创建的类是内部类，则指定的类名要是编译后的类名，通常是OuterClass$InnerClass的格式。
2. 指定静态的工厂方法。



#### 构造方法初始化

xml指定方式：

~~~xml
<beans>
    <!-- 无参构造 -->
    <bean id="exampleBean" class="examples.ExampleBean"/>
    
    <!-- 有参构造 -->
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>

~~~



#### 静态工厂方法初始化

xml指定方式：

~~~xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>

~~~

~~~java
package examples

public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}

~~~



#### 实例化工厂方法初始化

xml指定方式：

~~~xml
<!-- factory bean, 包含createClientServiceInstance()方法 -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    
</bean>


<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

~~~

这里工厂是一个Spring容器中个Bean。

通过静态工厂或实例工厂创建的Bean被称为factory bean。这个不同于FactoryBean接口及其实现类。

方法参数和构造方法使用参数的格式一致。



## 4.Dependencies



### 4.1.依赖注入



#### 构造方法注入

~~~java
package x.y;

public class ThingOne {

    // 构造方法的参数类型明确
    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        
    }
}

~~~

~~~xml
<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>

~~~



~~~java
package examples;

public class ExampleBean {

    private int years;

    private String ultimateAnswer;

    // 如果编译代码没有开启debug,可能获取不到参数名,使用构造方法参数名注入可能会有问题
    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}

~~~

~~~xml
<!-- 指定类型匹配 -->
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>

<!-- 指定顺序匹配 -->
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>

<!-- 指定构造函数属性名称匹配 -->
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>

~~~



#### setter注入

在使用构造方法注入Bean后，还可以通过setter注入Bean。

~~~java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}

~~~



~~~xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- setter injection 1 -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- setter injection 2 -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

~~~



#### 依赖关系解决

容器按以下方式执行依赖关系解析：

1. 使用所有beans的配置元数据传创建并初始化ApplicationContext。配置元数据的指定方式有xml、Java代码、java注解。
2. 对于每个bean，其依赖关系以属性、构造方法参数、静态工厂方法参数的形式表示。当bean被创建时，容器就会提供这些依赖。
3. 每个属性或构造方法的参数都要设置一个属性的值或者一个bena的引用。
4. 作为值的属性都会被自动转换成构造参数的指定格式，spring能将string值转换成基本类型及String类型。

Spring在容器被创建的时候校验bean的配置，但是bean的属性直到bean被实际创建才设置。

作用域为单例(singleton)且设置为预实例化(pre-instantiated)(默认)bean会在容器创建时创建。其它作用域会在使用时创建。



循环依赖：使用构造方法注入可能会带来的问题。

~~~java
// 两个构造方法的bean互相依赖,使用构造方法注入会出现BeanCurrentlyInCreationException异常
class A {
    B b;
    public A(B b){
        this.b = b;
    }
}
class B {
    A a;
    public B(A a){
        this.a = a;
    }
}

~~~

遇到这种情况，一般情况下，可以通过setter注入的方式解决。这样会面临一个问题，bean A和bean B的强制依赖关系会迫使其中一个bean在未初始化完成之前就被注入到另一个bean中。







#### spring是如何解决依赖加载的?





### 4.2.配置依赖详细介绍



#### 依赖直接的值

基本数据类型、String等。

Spring通过ConversionService将value的字符串值转换成实际参数的值类型。

~~~xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="masterkaoli"/>
</bean>

~~~



p标签简化配置：

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource"
        destroy-method="close"
        p:driverClassName="com.mysql.jdbc.Driver"
        p:url="jdbc:mysql://localhost:3306/mydb"
        p:username="root"
        p:password="masterkaoli"/>

</beans>

~~~



配置一个java.util.Properties对象

~~~xml
<bean id="mappings"
    class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">

    <!-- typed as a java.util.Properties -->
    <property name="properties">
        <value>
            jdbc.driver.className=com.mysql.jdbc.Driver
            jdbc.url=jdbc:mysql://localhost:3306/mydb
        </value>
    </property>
</bean>

~~~

Spring使用PropertyEditor机制将value标签中的数据解析成Properties对象。



idref标签：表示只是要字符串值，而不是应用。

~~~xml
<bean id="theTargetBean" class="..."/>

<bean id="theClientBean" class="...">
    <property name="targetName">
        <idref bean="theTargetBean"/>
    </property>
</bean>

~~~

和上面的配置等价。但是前者会校验容器中是否有theTargetBean bean。

~~~xml
<bean id="theTargetBean" class="..." />

<bean id="client" class="...">
    <property name="targetName" value="theTargetBean"/>
</bean>

~~~



#### 引用bean标签

ref标签，在constructor-arg、property标签中使用。

~~~xml
<ref bean="someBean"/>

~~~



~~~xml
<!-- in the parent context -->
<bean id="accountService" class="com.something.SimpleAccountService">
    <!-- insert dependencies as required as here -->
</bean>

~~~

~~~xml
<!-- 子上下文 -->
<bean id="accountService" <!-- bean name is the same as the parent bean -->
    class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="target">
        <ref parent="accountService"/> <!-- notice how we refer to the parent bean -->
    </property>
    <!-- insert other configuration and dependencies as required here -->
</bean>

~~~





#### 内部bean

在property或constructor-arg标签中使用bean标签。

内部bean是跟着外部bean一起创建的，可以不用指定bean的名称(指定了也会忽略)。

特殊情况，可以参与销毁的生命周期。

~~~xml
<bean id="outer" class="...">
    <!-- 内部定义bean -->
    <property name="target">
        <bean class="com.example.Person"> <!-- this is the inner bean -->
            <property name="name" value="Fiona Apple"/>
            <property name="age" value="25"/>
        </bean>
    </property>
</bean>

~~~



#### 集合

list,、set、map、props标签分别对于Java集合的List、Set、Map、Properties类型。

~~~xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- setAdminEmails(java.util.Properties) call -->
    <property name="adminEmails">
        <props>
            <prop key="administrator">administrator@example.org</prop>
            <prop key="support">support@example.org</prop>
            <prop key="development">development@example.org</prop>
        </props>
    </property>
    <!-- setSomeList(java.util.List) call-->
    <property name="someList">
        <list>
            <value>a list element followed by a reference</value>
            <ref bean="myDataSource" />
        </list>
    </property>
    <!--setSomeMap(java.util.Map) call -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key ="a ref" value-ref="myDataSource"/>
        </map>
    </property>
    <!--setSomeSet(java.util.Set) call -->
    <property name="someSet">
        <set>
            <value>just some string</value>
            <ref bean="myDataSource" />
        </set>
    </property>
</bean>

~~~



集合合并：父子集合合并，子覆盖父元素。

~~~xml
<beans>
    <bean id="parent" abstract="true" class="example.ComplexObject">
        <property name="adminEmails">
            <props>
                <prop key="administrator">administrator@example.com</prop>
                <prop key="support">support@example.com</prop>
            </props>
        </property>
    </bean>
    <bean id="child" parent="parent">
        <property name="adminEmails">
            <!-- the merge is specified on the child collection definition -->
            <props merge="true">
                <prop key="sales">sales@example.com</prop>
                <prop key="support">support@example.co.uk</prop>
            </props>
        </property>
    </bean>
<beans>

~~~



强制类型要求集合：

~~~java
public class SomeClass {

    private Map<String, Float> accounts;

    public void setAccounts(Map<String, Float> accounts) {
        this.accounts = accounts;
    }
}

~~~

~~~xml
<beans>
    <bean id="something" class="x.y.SomeClass">
        <property name="accounts">
            <map>
                <entry key="one" value="9.99"/>
                <entry key="two" value="2.75"/>
                <entry key="six" value="3.99"/>
            </map>
        </property>
    </bean>
</beans>

~~~



#### null和空字符串

~~~xml
<!--setEmail("") call -->
<bean class="ExampleBean">
    <property name="email" value=""/>
</bean>

~~~



~~~xml
<!--setEmail(null) call -->
<bean class="ExampleBean">
    <property name="email">
        <null/>
    </property>
</bean>

~~~



#### p命名空间

property标签的简化。

简单值的p命名空间：

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="classic" class="com.example.ExampleBean">
        <property name="email" value="someone@somewhere.com"/>
    </bean>

    <bean name="p-namespace" class="com.example.ExampleBean"
        p:email="someone@somewhere.com"/>
</beans>

~~~

引用p命名空间：

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="john-classic" class="com.example.Person">
        <property name="name" value="John Doe"/>
        <property name="spouse" ref="jane"/>
    </bean>

    <!--spouse 的value是引用-->
    <bean name="john-modern"
        class="com.example.Person"
        p:name="John Doe"
        p:spouse-ref="jane"/>

    <bean name="jane" class="com.example.Person">
        <property name="name" value="Jane Doe"/>
    </bean>
</beans>

~~~



#### c命名空间

constructor-arg标签的简化，spring 3.1版本引入

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:c="http://www.springframework.org/schema/c"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="beanTwo" class="x.y.ThingTwo"/>
    <bean id="beanThree" class="x.y.ThingThree"/>

    <!-- traditional declaration with optional argument names -->
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg name="thingTwo" ref="beanTwo"/>
        <constructor-arg name="thingThree" ref="beanThree"/>
        <constructor-arg name="email" value="something@somewhere.com"/>
    </bean>

    <!-- c-namespace declaration with argument names -->
    <bean id="beanOne" class="x.y.ThingOne" c:thingTwo-ref="beanTwo"
        c:thingThree-ref="beanThree" c:email="something@somewhere.com"/>

</beans>

~~~

指定构造方法参数顺序：

~~~xml
<bean id="beanOne" class="x.y.ThingOne" c:_0-ref="beanTwo" c:_1-ref="beanThree"
    c:_2="something@somewhere.com"/>

~~~



#### 复核属性名称

~~~xml
<bean id="something" class="things.ThingOne">
    <property name="fred.bob.sammy" value="123" />
</bean>

~~~

something bean有属性fred、fred有属性bob、bob有属性sammy，sammy的属性值为123。

在bean的构造方法之后，里面的前面属性不能为空。



### 4.3.depends-on

当一个bean要在其它bean完成初始化之后才进行初始，可以使用depends-on。

在单例(singleton)bean的情况，depend-on技能指定创建的依赖关系，也能指定销毁的依赖关系。

~~~xml
<!-- 依赖一个 -->
<bean id="beanOne" class="ExampleBean" depends-on="manager"/>
<bean id="manager" class="ManagerBean" />

~~~

~~~xml
<!-- 依赖多个, ',' ' ' ';' 作为分割符 -->
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
    <property name="manager" ref="manager" />
</bean>

<bean id="manager" class="ManagerBean" />
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />

~~~



### 4.4.延迟初始化beans

默认情况下，ApplicationContext的实现会默认创建配置的单例beans。也可以标记bean延迟初始化来阻止这种默认行为，这个标记会告诉ioc容器，在第一访问这个对象时才初始化，而不是启动时。

当一个延迟初始化bean时一个非延迟初始化bean的依赖项时，ApplicationContext在启动时就创建这个延迟初始化bean，因为他是非延迟bean的依赖项。

在bean标签中使用lazy-init属性。

~~~xml
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>
<bean name="not.lazy" class="com.something.AnotherBean"/>

~~~

~~~xml
<!-- 指定容器级别的延迟初始化 -->
<beans default-lazy-init="true">
    <!-- no beans will be pre-instantiated... -->
</beans>

~~~



### 4.5.自动装配

spring容器提供了自动解决bean直接的依赖关系。自动装配的优点：

1. 减少bean的setter注入和构造注入配置。
2. 自动装配随着对象的变化更新配置。当添加满足自动装配的bean时，则不需要调整配置文件。



当通过xml配置元数据时，可以通过bean标签中使用autowire元素来指定自动装配的模式。自动装配支持4种模式。

| 模式        | 介绍                                                         |
| ----------- | ------------------------------------------------------------ |
| no          | 默认值，表示不使用自动装配                                   |
| byName      | 通过属性名称自动装配，通过bean的属性名在容器中查找bean       |
| byType      | 通过类型自动装配，如果容器中恰好存在一个该类型的bean。存在多个则抛出异常，不存在没有影响。 |
| constructor | 和byType类似，但是需要有构造方法                             |

当使用byType或constructor的模式时，可以使用集合来接收类型。容器会提供所有匹配该类型beans，可以使用Map泛型，key为String，value为bean类型，则map中key时bean的名称，value为bean。

自动装配的局限性和缺点：

1. setter和构造方法配置始终覆盖自动装配。不能够装配基础类型、String和简单属性数组。
2. 自动装配不如显示配置明确。
3. 无法生成文档。
4. 自动类型装配没有唯一bean的异常问题。



### 4.6.方法注入

容器中，bean的作用域一般都是单例(singleton)的。一般情况是：一个单例bean组合使用另外一个单例bean、一个非单例bean组合使用另一个非单例bean。当bean的生命周期不同时，就会出现问题。如一个单例bean A需要使用非单例(prototype) bean B，每次A的方法调用都需要一个新的bean B。容器只会创建一次单例bean A，因此也只会设置一次属性，所有无法每次都提供新的bean B。

一个解决方案时放弃控制反转。通过实现ApplicationContextAware让Bean A拥有一个容器，通过容器getBean()方法获取新的Bean B。

~~~java
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class CommandManager implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    public Object process(Map commandState) {
        // 获取新Bean
        Command command = createCommand();
        
        command.setState(commandState);
        return command.execute();
    }

    protected Command createCommand() {
        
        return this.applicationContext.getBean("command", Command.class);
    }

    public void setApplicationContext(
            ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}

~~~



#### lookup方法注入

Spring 框架通过使用 CGLIB 库的字节码生成来动态生成覆盖该方法的子类来实现此方法注入。

这里时覆盖createCommand方法。

~~~java
public abstract class CommandManager {

    public Object process(Object commandState) {
        
        Command command = createCommand();
        
        command.setState(commandState);
        return command.execute();
    }

    // 
    protected abstract Command createCommand();
}

~~~



~~~java
// 注入bean的方法的格式
<public|protected> [abstract] <return-type> theMethodName(no-arguments);

~~~

~~~xml
<bean id="myCommand" class="fiona.apple.AsyncCommand" scope="prototype">
    
</bean>

<!--  -->
<bean id="commandManager" class="fiona.apple.CommandManager">
    <lookup-method name="createCommand" bean="myCommand"/>
</bean>

~~~



~~~java
public abstract class CommandManager {

    public Object process(Object commandState) {
        Command command = createCommand();
        command.setState(commandState);
        return command.execute();
    }

    @Lookup("myCommand")
    protected abstract Command createCommand();
}

~~~

~~~java
public abstract class CommandManager {

    public Object process(Object commandState) {
        MyCommand command = createCommand();
        command.setState(commandState);
        return command.execute();
    }

    @Lookup
    protected abstract MyCommand createCommand();
}

~~~



#### 任意方法替换

~~~java
public class MyValueCalculator {

    public String computeValue(String input) {
        // some real code...
    }

    // some other methods...
}

~~~

实现org.springframework.beans.factory.support.MethodReplacer接口，重写方法reimplement：

~~~java
public class ReplacementComputeValue implements MethodReplacer {

    public Object reimplement(Object o, Method m, Object[] args) throws Throwable {
        // 相当于代理了
        String input = (String) args[0];
        ...
        return ...;
    }
}

~~~

xml配置

~~~xml
<bean id="myValueCalculator" class="x.y.z.MyValueCalculator">
    <!-- arbitrary method replacement -->
    <replaced-method name="computeValue" replacer="replacementComputeValue">
        <arg-type>String</arg-type>
    </replaced-method>
</bean>

<bean id="replacementComputeValue" class="a.b.c.ReplacementComputeValue"/>

~~~

String类型参数支持的写法：java.lang.String、String、Str。



## 5.Bean的作用域

Spring提供了6中Bean的作用域，其中有4种仅Web的ApplicationContext才能使用。

| Scope       | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| singleton   | 默认。为每个 Spring IoC 容器将单个 Bean 定义限定到单个对象实例 |
| prototype   | 单个bean可以定义任意数量的对象实例                           |
| request     | web有效。将单个bean的定义作用域限定在单个http请求的生命周期  |
| session     | web有效。将单个bean的定义作用域限定在单个http session的生命周期 |
| application | 将单个Bean定义的作用域限定在ServletContext（Servlet 上下文）的生命周期内 |
| websocket   | 将单个Bean定义的作用域限定在WebSocket的生命周期内            |

从spring3.0开始，线程作用域(SimpleThreadScope)是有效的，但是默认没有激活。

https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/context/support/SimpleThreadScope.html



### 5.1.singleton

![image-20241217164403914](http://47.101.155.205/image-20241217164403914.png)

![singleton](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/singleton.png)

单例bean和设计模式的单例模式不同。单例模式指全局仅有一个类的实例对象。

~~~xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- 与上面等价 -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>

~~~



### 5.2.prototype

prototype作用域的Bean不参与销毁的回调方法。

~~~xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>

~~~

![image-20241217165741715](http://47.101.155.205/image-20241217165741715.png)

![prototype](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/prototype.png)

如果一个单例Bean引用了非单例Bean，这个原型只会注入一个到单例Bean中(因为单例Bean只会实例化一次)，后续的非单例Bean将不会变化。需要使用变化的非单例Bean，需要使用方法注入。



### 5.3.web启动配置

要配置web.xml文件以web启动。

~~~xml


~~~





~~~xml
<bean id="loginAction" class="com.something.LoginAction" scope="request"/>

~~~

~~~java
@RequestScope
@Component
public class LoginAction {
    // ...
}

~~~



~~~xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>

~~~

~~~java
@SessionScope
@Component
public class UserPreferences {
    // ...
}

~~~



在ServletContext的作用域是单例的，和Spring容器的单例Bean相似。

~~~xml
<bean id="appPreferences" class="com.something.AppPreferences" scope="application"/>

~~~

~~~java
@ApplicationScope
@Component
public class AppPreferences {
    // ...
}

~~~



### 5.4.Scoped Beans as Dependencies

另外一种跨作用域引用？

https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-other-injection



### 5.5.自定义scope

需要实现org.springframework.beans.factory.config.Scope接口。

1. Object get(String name, ObjectFactory? objectFactory)：从作用域获取对象。
2. Object remove(String name)：从作用域移除对象。返回找到的对象，没有找到返回null。
3. void registerDestructionCallback(String name, Runnable destructionCallback)：当作用域或指定的对象被销毁时指定的回调。
4. String getConversationId()：返回作用域的标识符。



ConfigurableBeanFactory接口执行void registerScope(String scopeName, Scope scope);方法注册作用域。

~~~java
Scope threadScope = new SimpleThreadScope();
beanFactory.registerScope("thread", threadScope);

~~~

使用类CustomScopeConfigurer+xml配置注册：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
        <property name="scopes">
            <map>
                <entry key="thread">
                    <bean class="org.springframework.context.support.SimpleThreadScope"/>
                </entry>
            </map>
        </property>
    </bean>

    <bean id="thing2" class="x.y.Thing2" scope="thread">
        <property name="name" value="Rick"/>
        <aop:scoped-proxy/>
    </bean>

    <bean id="thing1" class="x.y.Thing1">
        <property name="thing2" ref="thing2"/>
    </bean>

</beans>

~~~



## 6.自定义Bean的行为

Spring框架提供了许多接口，你可以使用它们来定制Bean的行为。可以分为几个部分：

1. 生命周期回调。
2. ApplicationContextAware和BeanNameAware。
3. 其它Aware接口。



### 6.1.生命周期回调

实现org.springframework.beans.factory.InitializingBean，在bean的所有属性被设置好后，调用接口的afterPropertiesSet()方法。

**BeanPostProcessor作用？**

不推荐使用接口的方式实现这种回调，因为这个会让类和Spring耦合在一起。其它方式有@PostConstruct注解Bean的方法、@Bean(initMethod = "init")、xml指定方法。

~~~java
public class ExampleBean {

    public void init() {
        // do some initialization work
    }
}

~~~

~~~xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>

~~~



实现org.springframework.beans.factory.DisposableBean接口，能在包含这个Bean的容器销毁时，执行回调方法。

同样的，也不推荐使用接口方式实现回调。通过@PreDestroy注解方法、@Bean(destroyMethod = "cleanup")注解、xml配置。

~~~java
public class ExampleBean {

    public void cleanup() {
        // do some destruction work (like releasing pooled connections)
    }
}

~~~

~~~xml
<bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="cleanup"/>

~~~



#### 默认的初始化和销毁方法

~~~xml
<beans default-init-method="init" default-destroy-method="destroy">

    <bean id="blogService" class="com.something.DefaultBlogService">
        <property name="blogDao" ref="blogDao" />
    </bean>

</beans>

~~~

三种指定方式：

1. 实现InitializingBean和DisposableBean接口。
2. 自定义init()和destroy()方法。
3. @PostConstruct和@PreDestroy注解作用于方法。

指定了多种方式，初始化方法执行顺序：

1. @PostConstruct注解的方法。
2. InitializingBean接口的方法afterPropertiesSet()。
3. 自定义的init()方法。

销毁方法是同样的顺序：

1. @PreDestroy注解的方法。
2. DisposableBean接口的destroy方法。
3. 自定义的destroy()方法。





#### 启动和停止回调

Lifecycle 接口定义的回调方法：

~~~java
public interface Lifecycle {

    void start();

    void stop();

    boolean isRunning();
}

~~~

通过LifecycleProcessor接口分发这些请求：

~~~java
public interface LifecycleProcessor extends Lifecycle {

    void onRefresh();

    void onClose();
}

~~~

停止通知不一定在销毁通知之前到达。常规停止，所有的生命周期Bean会先收到停止通知，然后再传播一般销毁回调。



**SmartLifecycle** 



#### 非web应用程序注册终止

Web应用针对ApplicationContext已经做了停止处理。

需要向JVM程序注册一个关闭回调。

~~~java
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public final class Boot {

    public static void main(final String[] args) throws Exception {
        ConfigurableApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml");

        // add a shutdown hook for the above context...
        ctx.registerShutdownHook();

        // app runs here...

        // main method exits, hook is called prior to the app shutting down...
    }
}

~~~



### 6.2.ApplicationContextAware和BeanNameAware

实现org.springframework.context.ApplicationContextAware接口能获取容器对象ApplicationContext实例。使用这个来操作Bean，破坏了IOC的风格，也与Spring相耦合。

ApplicationContext提供了资源访问、发布事件、访问MessageSource功能。

可以通过自动注入的方式(类型或构造方法)来注入ApplicationContext对象，可以使用注解@Autowired。



实现org.springframework.beans.factory.BeanNameAware接口，setBeanName方法的入参是bean在容器中的名称。

该方法的调用在bean的属性设置之后，在初始化调用方法(afterPropertiesSet、init)之前执行。



### 6.3.其它Aware接口

一般情况下ApplicationContextAware这种类型的接口，[name]Aware格式，name表示能注入的依赖类型，如：

ApplicationContextAware和BeanNameAware分别注入了ApplicationContext和BeanName(Bean的名称，字符串)。

| 接口名                         | 注入依赖                            | 描述 |
| ------------------------------ | ----------------------------------- | ---- |
| ApplicationContextAware        | ApplicationContext                  | 6.2  |
| ApplicationEventPublisherAware | 事件相关ApplicationContext          |      |
| BeanClassLoaderAware           | 加载Bean的类加载器                  |      |
| BeanFactoryAware               | 注入BeanFactory                     | 6.2  |
| BeanNameAware                  | 注入声明Bean的名称                  | 6.2  |
| BootstrapContextAware          | JCA的ApplicationContext             |      |
| LoadTimeWeaverAware            |                                     |      |
| MessageSourceAware             | 消息解析策略(国际化)                |      |
| NotificationPublisherAware     | JMX通知发布者                       |      |
| ResourceLoaderAware            | 为了访问低级资源                    |      |
| ServletConfigAware             | 容器运行的ServletConfig，web中有效  |      |
| ServletContextAware            | 容器运行的ServletContext，web中有效 |      |



## 7.Bean的定义继承



~~~xml
<bean id="inheritedTestBean" abstract="true"
        class="org.springframework.beans.TestBean">
    <property name="name" value="parent"/>
    <property name="age" value="1"/>
</bean>

<bean id="inheritsWithDifferentClass"
        class="org.springframework.beans.DerivedTestBean"
        parent="inheritedTestBean" init-method="initialize">  
    <property name="name" value="override"/>
    <!-- 继承parent的age属性 -->
</bean>

~~~



~~~xml
<bean id="inheritedTestBeanWithoutClass" abstract="true">
    <property name="name" value="parent"/>
    <property name="age" value="1"/>
</bean>

<bean id="inheritsWithClass" class="org.springframework.beans.DerivedTestBean"
        parent="inheritedTestBeanWithoutClass" init-method="initialize">
    <property name="name" value="override"/>
    <!-- 从bean的定义中继承age值-->
</bean>

~~~



## 8.容器扩展点



### 8.1.BeanPostProcessor接口

实现BeanPostProcessor接口的Bean，会在Bean的实例化后，触发回调。当有多个该接口时，可以实现Ordered接口来指定回调的执行顺序。

1. postProcessAfterInitialization(Object bean, String beanName)：在Bean的初始化之后，如@Bean指定的初始化方法执行之后。
2. postProcessBeforeInitialization(Object bean, String beanName)：在Bean的初始化之后，但是在如@Bean指定的方法回调之前。

使用@Bean创建BeanPostProcessor接口的对象时，不要使用Object类型，否则容器ApplicationContext无法在创建Bean之前通过类型自动检测它。



编程方式注册：通过ConfigurableBeanFactory调用addBeanPostProcessor方法将BeanPostProcessor注入容器，注入的Bean的调用顺序不受order控制，按注册顺序指定，且优先于自动检测注册的实例之前。



### 8.2.自定义配置元数据BeanFactoryPostProcessor



#### PropertyPlaceholderAutoConfiguration

解析properties文件到，将properties的key的value替换${key}。

~~~properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://production:9002
jdbc.username=sa
jdbc.password=root

~~~

~~~xml
<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
    <property name="locations" value="classpath:com/something/jdbc.properties"/>
</bean>

<bean id="dataSource" destroy-method="close"
        class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

~~~

spring2.5后支持命名空间的写法：

~~~xml
<context:property-placeholder location="classpath:com/something/jdbc.properties"/>

~~~





配置文件指定class的名称

~~~xml
<bean class="org.springframework.beans.factory.config.PropertySourcesPlaceholderConfigurer">
    <property name="locations">
        <value>classpath:com/something/strategy.properties</value>
    </property>
    <property name="properties">
        <value>custom.strategy.class=com.something.DefaultStrategy</value>
    </property>
</bean>

<bean id="serviceStrategy" class="${custom.strategy.class}"/>

~~~



#### PropertyOverrideConfigurer

覆盖应用程序上下文定义的bean的属性值。配置文件格式

~~~properties
# bean的名称.属性名
beanName.property=value

dataSource.driverClassName=com.mysql.jdbc.Driver
dataSource.url=jdbc:mysql:mydb

# tom bean的属性fred,fred的属性bob,bob的属性sammy的值设为123
tom.fred.bob.sammy=123

~~~



~~~xml
<context:property-override location="classpath:override.properties"/>

~~~



### 8.3.自定义实例化逻辑

org.springframework.beans.factory.FactoryBean接口有3个方法：

1. Object getObject()：返回这个工厂创建的对象实例。对象能被共享，取决于工厂返回单例或原型。
2. boolean isSingleton()：此FactoryBean返回单例则为true，否则为false。
3. Class getObjectType()：返回getObject方法结构的对象类型，未知则为返回null。



作用到底是什么？该怎么用？



## 9.基于注解的容器配置

注释注入在XML注入之前执行(解析)，所以使用两种配置时，XML会覆盖注释配置。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 表示支持注解配置 -->
    <context:annotation-config/>

</beans>

~~~

AutowiredAnnotationBeanPostProcessor

CommonAnnotationBeanPostProcessor

PersistenceAnnotationBeanPostProcessor

RequiredAnnotationBeanPostProcessor



### 9.1 @Required

@Required注解作用域属性的setter方法：

~~~java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Required
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}

~~~

该注解自动注入Bean，且需要Bean存在容器中。Spring 5.1开始弃用。



### 9.2.@Autowired

@Inject可以替代@Autowired注解，见后面介绍。

@Autowired注解可以作用于构造方法、方法(setter、其它方法)、属性、方法参数、注解。

Spring 4.3开始，如果bean仅定义个一个构造方法，则可以省略@Autowired注解，自动通过构造方法注入。

可以通过实现接口org.springframework.core.Ordered、@Order(类上、@Bean方法上)、@Priority (类上)来定义Bean的创建顺序，否则，将按照Bean的定义顺序创建Bean。

使用@Autowired至少要求该类型的bean一个，否则会启动失败，设置属性required=false可以关闭这个要求。当为false时，作用在方法上时，一个bean不存在，则方法不会被调用。

可以使用@Autowired自动容器相关接口：

1. BeanFactory
2. ApplicationContext
3. Environment
4. ResourceLoader
5. ApplicationEventPublisher
6. MessageSource
7. ConfigurableApplicationContext 
8. ResourcePatternResolver

@Autowired, @Inject, @Value, @Resource这些注解通过Spring的BeanPostProcessor实现来处理的，BeanPostProcessor或BeanFactoryPostProcessor类型的类中不能使用这些注解?





~~~java
public class MovieRecommender {
    
    // 构造方法
    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        
    }
    
    // setter方法
    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        
    }
    
    // 普通方法
    @Autowired
    public void prepare(MovieCatalog movieCatalog,
            CustomerPreferenceDao customerPreferenceDao) {
        
    }
    
    // 属性和构造方法一起使用
    @Autowired
    private MovieCatalog movieCatalog;
    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
       	
    }
    
    // 注入容器中该类型的所哟Bean
    @Autowired
    private MovieCatalog[] movieCatalogs;
    public void setMovieCatalogs(Set<MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }
    
    // Map的key的类型是String时,key为bean的名称
    @Autowired
    public void setMovieCatalogs(Map<String, MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }
    
    // 表示可选的bean
    @Autowired
    public void setMovieFinder(Optional<MovieFinder> movieFinder) {
        ...
    }
    
    // spirng 5.0开始,使用@Nullable注解表示可选
    @Autowired
    public void setMovieFinder(@Nullable MovieFinder movieFinder) {
        ...
    }

}

~~~



### 9.3.@Primary

解决容器中存在多个可选择的Bean时，通过注解指定该Bean是主要的，如果同类型的bean恰好存在一个主要的bean，则该bean被自动装配。

标记注入容器的Bean是主要的。如果注解作用于类上，则这个类需要是扫描注入容器才会有效。

~~~java
@Configuration
public class MovieConfiguration {

    @Bean
    @Primary
    public MovieCatalog firstMovieCatalog() { ... }

    @Bean
    public MovieCatalog secondMovieCatalog() { ... }

    // ...
}

~~~

~~~java
// firstMovieCatalog 自动装配在这里
public class MovieRecommender {

    @Autowired
    private MovieCatalog movieCatalog;

    // ...
}

~~~



xml配置实现：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

    <bean class="example.SimpleMovieCatalog" primary="true">
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>

~~~



### 9.4.@Qualifier

@Qualifier结合@Autowired注解限定注入的bean(容器拥有多个同类型bean时)。

**@Qualifier注解和@Bean一起使用，在容器中bean的元数据是什么样的？**

~~~java
// 作用属性上
public class MovieRecommender {

    @Autowired
    @Qualifier("main")
    private MovieCatalog movieCatalog;

    // ...
}

~~~

~~~java
// 作用在方法参数上
public class MovieRecommender {

    private MovieCatalog movieCatalog;

    private CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public void prepare(@Qualifier("main") MovieCatalog movieCatalog,
            CustomerPreferenceDao customerPreferenceDao) {
        this.movieCatalog = movieCatalog;
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}

~~~



xml配置：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

    <bean class="example.SimpleMovieCatalog">
        <qualifier value="main"/> 
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <qualifier value="action"/> 
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>

~~~





自定义注解@Qualifier：

~~~java
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface Genre {

    String value();
}

~~~

~~~java
public class MovieRecommender {

    @Autowired
    @Genre("Action")
    private MovieCatalog actionCatalog;

    private MovieCatalog comedyCatalog;

    @Autowired
    public void setComedyCatalog(@Genre("Comedy") MovieCatalog comedyCatalog) {
        this.comedyCatalog = comedyCatalog;
    }

    // ...
}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="Genre" value="Action"/>
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="example.Genre" value="Comedy"/>
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>

~~~



### 9.5.使用泛型限定自动装配



~~~java
public interface Store<T> {

    T store();

}

public class StringStore implements Store<String>{

    @Override
    public String store() {
        return this.toString();
    }
}

public class IntegerStore implements Store<Integer>{
    @Override
    public Integer store() {
        return this.hashCode();
    }
}

~~~

~~~java
@Configuration
public class MyConfiguration {

    @Bean
    public StringStore stringStore() {
        return new StringStore();
    }

    @Bean
    public IntegerStore integerStore() {
        return new IntegerStore();
    }
}

~~~



支持泛型自动注入：

~~~java
@Autowired
private Store<String> s1; 

@Autowired
private Store<Integer> s2;

~~~



### 9.6.自定义限定类型

org.springframework.beans.factory.annotation.CustomAutowireConfigurer配置支持的自定义限定注解

~~~xml
<bean id="customAutowireConfigurer"
        class="org.springframework.beans.factory.annotation.CustomAutowireConfigurer">
    <property name="customQualifierTypes">
        <set>
            <!-- 自定义的注解全路径名称-->
            <value>com.oycm.example.CustomQualifier</value>
        </set>
    </property>
</bean>

~~~

可以自定义@Qualifier注解，不用继承@Qualifier注解。

~~~java
package com.oycm.example;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
//@Qualifier
public @interface CustomQualifier {

    String value();
}

~~~

SpringBoot项目导入xml配置：@ImportResource("classpath:applicationContext.xml")。



### 9.7.@Resource

javax.annotation.Resource注解可以通过指定bean的名称来注入bean，找不到再去根据类型注入，找不到启动失败。

对于一些特殊的：BeanFactory, ApplicationContext, ResourceLoader, ApplicationEventPublisher, MessageSource，在没有指定特定名称的情况下，则先根据类型注入，再根据名称查找。

**通过CommonAnnotationBeanPostProcessor对象处理这个注解，注解的方法只能有一个形参。**

~~~java
public class MovieRecommender {

    // 先根据属性名称查找bean,找不到再根据类型查找,再找不到则报错
    @Resource
    private CustomerPreferenceDao customerPreferenceDao;

    // 根据类型查找
    @Resource
    private ApplicationContext context; 

    public MovieRecommender() {
    }

}

~~~



~~~java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder") 
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}

~~~

~~~java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    // 根据方法参数名称
    @Resource
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}

~~~





### 9.8.@Value

@Value用来注入外部化配置。

默认情况下，使用@Value("${catalog.name}")的配置key=value不存在，则注入注解配置的值。

~~~properties
catalog.name=MovieCatalog

~~~


~~~java
// 指定配置文件的位置
@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig { }

~~~

~~~java
// 使用外部化配置
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("${catalog.name}") String catalog) {
        this.catalog = catalog;
    }
}

~~~



使用注入PropertySourcesPlaceholderConfigurer bean严格检查配置，支持properties和yml文件类型，不能解析${}则启动失败。

可以用setPlaceholderPrefix, setPlaceholderSuffix, setValueSeparator方法自定义占位符。支持简单类型自动转换，','分割的值支持解析成数组，支持默认值，支持Spel表达式。

~~~java
@Configuration
public class AppConfig {

    // 方法必须是静态的
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
    }
}

@Component
public class MovieRecommender {

    private final String catalog;
	// 指定默认值
    public MovieRecommender(@Value("${catalog.name:defaultCatalog}") String catalog) {
        this.catalog = catalog;
    }
}

~~~



Spring在通过BeanPostProcessor后置使用ConversionService来处理String值的转换。支持自己提供这个转换对象。

~~~java
@Configuration
public class AppConfig {

    @Bean
    public ConversionService conversionService() {
        DefaultFormattingConversionService conversionService = new DefaultFormattingConversionService();
        conversionService.addConverter(new MyCustomConverter());
        return conversionService;
    }
}

~~~



~~~java
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("#{systemProperties['user.catalog'] + 'Catalog' }") String catalog) {
        this.catalog = catalog;
    }
}

@Component
public class MovieRecommender {

    private final Map<String, Integer> countOfMoviesPerCatalog;

    public MovieRecommender(
            @Value("#{{'Thriller': 100, 'Comedy': 300}}") Map<String, Integer> countOfMoviesPerCatalog) {
        this.countOfMoviesPerCatalog = countOfMoviesPerCatalog;
    }
}

~~~



### 9.9.@PostConstruct和@PreDestroy

CommonAnnotationBeanPostProcessor 不仅提供了对@Resource注解的处理，还提供了javax.annotation.PostConstruct和javax.annotation.PreDestroy注解的支持。

这些注解在jdk6-8是java库的一部分，在jdk9分离，在jdk11删除。可以通过javax.annotation-api项目名在maven查找。



## 10.类路径扫描和组件管理



### 10.1@Component及扩展

@Component的扩展有：@Repository(持久层)、@Service(业务层)、@Controller(表示层)。

根据功能使用合适的注解。



### 10.2.元注解扩展

元注解：Component，给予其扩展的@Repository(持久层)、@Service(业务层)、@Controller(表示层)。



@Controller和@ResponseBody扩展来的@RestController注解。



组合注解重新定义元注解的值。@SessionScope基于@Scope的扩展。

spring注解编程模型：https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model#terminology



### 10.3.自动注册bean

自动检测到类并注册bean的定义。

@ComponentScan("org.example")会自动扫描org.example包路径下类(子包下的也包括)(需要有@Component注解)。

~~~java
@Configuration
@ComponentScan(basePackages = "org.example")
public class AppConfig  {
    // ...
}

~~~

xml配置：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <!--该标签隐式开启了context:annotation-config标签功能-->
    <context:component-scan base-package="org.example"/>

</beans>

~~~



https://stackoverflow.com/questions/19394570/java-jre-7u45-breaks-classloader-getresources



当使用自动扫描时，AutowiredAnnotationBeanPostProcessor和CommonAnnotationBeanPostProcessor被自动加入，但是没有bean的信息在容器中。可以使用annotation-config属性的值为false禁用。





### 10.4.过滤器自定义扫描



| Filter类型      | 例子                       | 描述                                         |
| --------------- | -------------------------- | -------------------------------------------- |
| ANNOTATION      | org.example.SomeAnnotation | 目标类上有该注解，或者作为目标类注解的元注解 |
| ASSIGNABLE_TYPE | org.example.SomeClass      | 该接口或类的实现                             |
| ASPECTJ         | org.example..*Service+     | 匹配的Aspectj表达式                          |
| REGEX           | org\.example\.Default.*    | 目标类名的正则表达式                         |
| CUSTOM          | org.example.MyTypeFilter   | TypeFilter接口实现的类                       |

排除有注解@Repository的类，并指定匹配的正则路径的class：

~~~java
@Configuration
@ComponentScan(basePackages = "org.example",
        includeFilters = @Filter(type = FilterType.REGEX, pattern = ".*Stub.*Repository"),
        excludeFilters = @Filter(Repository.class))
public class AppConfig {
    ...
}

~~~

~~~xml
<beans>
    <context:component-scan base-package="org.example">
        <context:include-filter type="regex"
                expression=".*Stub.*Repository"/>
        <context:exclude-filter type="annotation"
                expression="org.springframework.stereotype.Repository"/>
    </context:component-scan>
</beans>

~~~

可以通过@ComponentScan注解的值useDefaultFilters=false表示禁用@Component, @Repository, @Service, @Controller注解的自动注册(包括派生注解)。



### 10.5.组件中定义Bean

组件中定义Bean可以使用静态方法。

实例方法定义Bean不用定义为private和finally

~~~java
@Component
public class FactoryMethodComponent {

    private static int i;

    @Bean
    @Qualifier("public")
    public TestBean publicInstance() {
        return new TestBean("publicInstance");
    }

    // Qualifier限定参数
    @Bean
    protected TestBean protectedInstance(
            @Qualifier("public") TestBean spouse,
            @Value("#{privateInstance.age}") String country) {
        TestBean tb = new TestBean("protectedInstance", 1);
        tb.setSpouse(spouse);
        tb.setCountry(country);
        return tb;
    }

    @Bean
    private TestBean privateInstance() {
        return new TestBean("privateInstance", i++);
    }

    @Bean
    @RequestScope
    public TestBean requestScopedInstance() {
        return new TestBean("requestScopedInstance", 3);
    }
}

~~~



### 10.6.组件命名

@Component, @Repository, @Service, @Controller注解的组件(自动扫描)的名称通过BeanNameGenerator接口生成名称。

~~~java
// myMovieLister
@Service("myMovieLister")
public class SimpleMovieLister {
    // ...
}

// movieFinderImpl
@Repository
public class MovieFinderImpl implements MovieFinder {
    
}

~~~



如果不是