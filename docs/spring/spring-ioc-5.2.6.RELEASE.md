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

从spring3.0开始，线程作用域是有效的，但是默认没有激活。

https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/context/support/SimpleThreadScope.html