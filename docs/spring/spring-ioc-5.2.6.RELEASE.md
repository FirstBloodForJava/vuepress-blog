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



循环依赖：

