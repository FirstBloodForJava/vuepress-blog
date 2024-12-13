# Spring注解

## SpringFramework



### spring-beans



#### @Autowired

~~~java
package org.springframework.beans.factory.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 将Spring容器中的对象赋值给属性
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {

	// 标注Bean是否是必须的，true不存在Bean启动失败
	boolean required() default true;

}

~~~

使用方式：

1. 字段注入，@Autowired放在字段上；
2. 构造函数注入，@Autowired放在构造函数上(只有有一个带注解的)；
3. set注入，@Autowired方法set方法上；
4. 注入一类对象，使用List或Map接收，Map的key为Bean的名称，List会根据Order的值情况排序。

~~~java
// 注入一类对象
@Configuration
protected static class ZuulFilterConfiguration {

	@Autowired
	private Map<String, ZuulFilter> filters;

}

~~~

**由于注入Bean是通过BeanPostProcessor，意味着不能将BeanPostProcessor或BeanFactoryPostProcessor类型的对象注入。**





### spring-core



#### @AliasFor

作用：声明注释属性的别名。

~~~java
package org.springframework.core.annotation;

import java.lang.annotation.Annotation;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface AliasFor {

	
	@AliasFor("attribute")
	String value() default "";

    
	@AliasFor("value")
	String attribute() default "";

	// 声明别名对于的注解，默认是自己
	Class<? extends Annotation> annotation() default Annotation.class;

}

~~~

有三种使用@AliasFor注解的方式：

1. 注解中声明显示别名，要求如下：
   1. 别名使用成对出现，5.2.1版本开始支持单个使用，建议成对使用；
   2. 声明的属性需要有相同的返回类型；
   3. 声明的属性需要有默认值；
   4. 声明的属性需要有相同的默认值；
   5. 不要在注解上声明。
2. 为元注解声明显示别名(组合注解)，例子有：GetMapping，要求如下：
   1. @AliasFor注解的attribute属性需要指向元注解的的属性；
   2. 声明的属性需要有相同的返回类型；
   3. 注解需要引用元注解；
   4. @AliasFor需要用annotation指向这个元注解。
3. 为元注解声明隐式别名(组合注解)，要求如下：
   1. 声明的属性需要有相同的返回类型；
   2. 声明的属性需要有默认值；
   3. 声明的属性需要有相同的默认值；
   4. 注解需要引用元注解；
   5. @AliasFor需要用annotation指向元注解；



~~~java
// 1.locations和value显示别名映射
public @interface ContextConfiguration {
 
     @AliasFor("locations")
     String[] value() default {};
 
     @AliasFor("value")
     String[] locations() default {};
 
     // ...
}

// 2.继承ContextConfiguration注解功能，xnlFiles属性覆盖ContextConfiguration的locations值
@ContextConfiguration
public @interface XmlTestConfig {
 
     @AliasFor(annotation = ContextConfiguration.class, attribute = "locations")
     String[] xmlFiles();
}

// 3.为ContextConfiguration注解的属性启别名,value、groovyScripts、xmlFiles都去覆盖ContextConfiguration的locations值
@ContextConfiguration
public @interface MyTestConfig {
 
     @AliasFor(annotation = ContextConfiguration.class, attribute = "locations")
     String[] value() default {};
 
     @AliasFor(annotation = ContextConfiguration.class, attribute = "locations")
     String[] groovyScripts() default {};
 
     @AliasFor(annotation = ContextConfiguration.class, attribute = "locations")
     String[] xmlFiles() default {};
}
@MyTestConfig
public @interface GroovyOrXmlTestConfig {
 
     @AliasFor(annotation = MyTestConfig.class, attribute = "groovyScripts")
     String[] groovy() default {};
 
     @AliasFor(annotation = ContextConfiguration.class, attribute = "locations")
     String[] xml() default {};
}

~~~





### spring-context



#### @Bean

~~~java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.core.annotation.AliasFor;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Bean {

	// 注解属性name的别名(可以有多个),只使用name属性时,可以省略属性名赋值: @Bean("name")
	@AliasFor("name")
	String[] value() default {};

	
    // 指定对象的名称,没有指定则使用注解的方法名
	@AliasFor("value")
	String[] name() default {};

	// 没有什么作用
	Autowire autowire() default Autowire.NO;

	// 在Bean创建的对象初始化完成后调用的方法,默认不执行
	String initMethod() default "";

	// 指定容器关闭时调用的方法,默认推断里面的：close和shutdown方法
	String destroyMethod() default AbstractBeanDefinition.INFER_METHOD;

}

~~~



#### @Component

~~~java
package org.springframework.stereotype;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 被Spring容器扫描到则作为Bean注入到容器中,可以结合@ComponentScan注解指定扫描路径
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Indexed
public @interface Component {

	// 指定组件的名称
	String value() default "";

}


~~~



##### @Configuration

~~~java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.AliasFor;
import org.springframework.stereotype.Component;

// 用来定义配置类的注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {

	@AliasFor(annotation = Component.class)
	String value() default "";

}

~~~



~~~java
// 可以定义扫描包的路径
@Configuration
@ComponentScan("com.acme.app.services")
public class AppConfig {
      // @Bean 定义 ...
}

~~~

~~~java
// 使用Environment Api
@Configuration
public class AppConfig {
 
	@Autowired
    Environment env;
 
    // bean是单例的
    @Bean
	public MyBean myBean() {
        MyBean myBean = new MyBean();
        myBean.setName(env.getProperty("bean.name"));
        return myBean;
    }
}

// 指定配置文件地址
@Configuration
@PropertySource("classpath:/com/acme/app.properties")
public class AppConfig {
 
	@Inject Environment env;
 
    @Bean
	public MyBean myBean() {
		return new MyBean(env.getProperty("bean.name"));
	}
}

~~~

~~~java
// 读取配置文件的值
@Configuration
@PropertySource("classpath:/com/acme/app.properties")
public class AppConfig {
 
	@Value("${bean.name}") String beanName;

	@Bean
	public MyBean myBean() {
        return new MyBean(beanName);
	}
}

~~~

~~~java
// 导入其它配置类
@Configuration
public class DatabaseConfig {

	@Bean
	public DataSource dataSource() {
		// instantiate, configure and return DataSource
	}
}
 
@Configuration
@Import(DatabaseConfig.class)
public class AppConfig {
	
    private final DatabaseConfig dataConfig;
 
    public AppConfig(DatabaseConfig dataConfig) {
		this.dataConfig = dataConfig;
	}
 
	@Bean
	public MyBean myBean() {
		// 使用import导入的对象
		return new MyBean(dataConfig.dataSource());
	}
}

~~~



~~~java
// 结合Profile使用
@Profile("development")
@Configuration
public class EmbeddedDatabaseConfig {

    @Bean
	public DataSource dataSource() {
		// instantiate, configure and return embedded DataSource
	}
}
 
@Profile("production")
@Configuration
public class ProductionDatabaseConfig {
	
    @Bean
	public DataSource dataSource() {
		// instantiate, configure and return production DataSource
	}
}

@Configuration
public class ProfileDatabaseConfig {
	
    @Bean("dataSource")
	@Profile("development")
	public DataSource embeddedDatabase() { ... }
 
	@Bean("dataSource")
	@Profile("production")
	public DataSource productionDatabase() { ... }
}

~~~



~~~java
// 定义在抽象类上，只有子类被Spring容器管理，则这里的@Bean生效
@Configuration
@EnableConfigurationProperties(JpaProperties.class)
@Import(DataSourceInitializedPublisher.Registrar.class)
public abstract class JpaBaseConfiguration implements BeanFactoryAware {
    
    @Bean
    public ...;
}
// 定义在类上，子类被Spring容器管理，则这里的条件还需要满足才能生效

~~~

![image-20241108144626046](http://47.101.155.205/image-20241108144626046.png)



##### @Controller

~~~java
package org.springframework.stereotype;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {

	@AliasFor(annotation = Component.class)
	String value() default "";

}

~~~





##### @Repository

~~~java
package org.springframework.stereotype;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Repository {

	
	@AliasFor(annotation = Component.class)
	String value() default "";

}

~~~



##### @Service

~~~java
package org.springframework.stereotype;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {

	@AliasFor(annotation = Component.class)
	String value() default "";

}

~~~





#### @Conditional

~~~java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Conditional {

	/**
	 * All {@link Condition}s that must {@linkplain Condition#matches match}
	 * in order for the component to be registered.
	 */
	Class<? extends Condition>[] value();

}

~~~

注解用法：

1. 在任何类上直接或间接的结合@Component或@Configuration注解使用；
2. 作为元注解在注解上使用；
3. 结合@Bean注解在方法上使用。













##### @Profile

~~~java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.env.AbstractEnvironment;
import org.springframework.core.env.ConfigurableEnvironment;

// 指定一个或多个配置文件激活时，才匹配(一个匹配则匹配,也可以结合!使用,表示未激活匹配)
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(ProfileCondition.class)
public @interface Profile {

	
	String[] value();

}


~~~

用法：

1. 在类上使用，结合@Component或@Configuration确定是否向Spring容器注入对象；
2. 作为元注解，自定义注解使用；
3. 在方法上使用，结合@Bean使用。











##### @ConditionalOnRibbonRestClient

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnRibbonRestClientCondition.class)
@interface ConditionalOnRibbonRestClient { }

private static class OnRibbonRestClientCondition extends AnyNestedCondition {
	public OnRibbonRestClientCondition() {
		super(ConfigurationPhase.PARSE_CONFIGURATION);
	}
	@ConditionalOnProperty("ribbon.restclient.enabled")
	static class RibbonProperty {}
	
}
// 继承AnyNestedCondition的作用是可以将OnRibbonRestClientCondition中的匹配条件算上，这里作用是相当于要有ribbon.restclient.enabled存在配置中，且值不为false，则匹配这个@Configuration才生效，否则不会作为配置类

~~~

![image-20241108155207715](http://47.101.155.205/image-20241108155207715.png)

![image-20241108155346860](http://47.101.155.205/image-20241108155346860.png)



#### @Import

~~~java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 将配置类或普通类或ImportSelector实现类或ImportBeanDefinitionRegistrar实现类引入到当前Spring容器
// 对于没有被扫描到的Configuration类,相当于扫描到该类
// Import的类没有@Configuration也可以导入
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Import {

	// 引入的类,不存在也不会影响启动
	Class<?>[] value();

}

~~~



SpringBoot的自动注入就经常使用这个注解，相当于扫描到该类的作用，注入容器。

例如SpringBoot项目启动会自动扫描启动类所在目录下的所有包，上级包不会被扫描，就可以使用Import。

![image-20241108142203040](http://47.101.155.205/image-20241108142203040.png)



#### @ManagedResource

~~~java
package org.springframework.jmx.export.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface ManagedResource {

	@AliasFor("objectName")
	String value() default "";

	@AliasFor("value")
	String objectName() default "";

	String description() default "";

	int currencyTimeLimit() default -1;

	boolean log() default false;

	String logFile() default "";

	String persistPolicy() default "";

	int persistPeriod() default -1;

	String persistName() default "";

	String persistLocation() default "";

}

~~~

用于将一个类暴露给JMX(Java Management Extensions)中的MBean(资源管理)，通过 JMX 客户端（如 JConsole 或 VisualVM）进行监控和操作。

![image-20241125144014498](http://47.101.155.205/image-20241125144014498.png)



#### @ManagedOperation

~~~java
package org.springframework.jmx.export.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ManagedOperation {

	String description() default "";

	int currencyTimeLimit() default -1;

}

~~~

暴露一个方法可以在MBean中操作。

下载visualvm：https://visualvm.github.io/download.html

![image-20241125150159870](http://47.101.155.205/image-20241125150159870.png)

安装MBeans插件，重启后。

![image-20241125150401630](http://47.101.155.205/image-20241125150401630.png)



#### @ManagedAttribute

~~~java
package org.springframework.jmx.export.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ManagedAttribute {

	String defaultValue() default "";

	String description() default "";

	int currencyTimeLimit() default -1;

	String persistPolicy() default "";

	int persistPeriod() default -1;

}

~~~

作用在方法上，暴露Bean的某个属性，使其可以通过JMX客户端进行访问和修改。







## SpringBoot

### spring-boot



#### @ConfigurationProperties

~~~java
package org.springframework.boot.context.properties;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

// 通过@Import或@Component(扫描到)或@EnableConfigurationProperties将其注入到Spirng容器中
// ConfigurationPropertiesScan扫描
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ConfigurationProperties {

	@AliasFor("prefix")
	String value() default "";


	@AliasFor("value")
	String prefix() default "";

	// false:当属性类型不匹配时会抛出异常；true:则不会
	boolean ignoreInvalidFields() default false;

	// true:允许忽略未在类中定义的属性；false:则会抛出异常
	boolean ignoreUnknownFields() default true;

}

~~~

![image-20241108164702171](http://47.101.155.205/image-20241108164702171.png)





#### @EnableConfigurationProperties

~~~java
package org.springframework.boot.context.properties;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

// 启用并注册带有注解@ConfigurationProperties的类
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(EnableConfigurationPropertiesImportSelector.class)
public @interface EnableConfigurationProperties {


	Class<?>[] value() default {};

}

~~~



### spring-boot-autoconfigure



#### @ConditionalOnClass 

注解上的指定类存在类路径上时匹配。

Spring解析这个注解信息时，不是通过反射获取注解包含的信息，而是通过字节码解析工具ASM将其解析成自动配置元数据，再通过这个使用类加载机制判断这个类是否存在。

可以使用SpringBoot的自动配置的类，它已经被加载成class文件了，直接new对象没有问题，当这个类上的注解的类存在时，使用反射获取类会报错。

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnClassCondition.class)
public @interface ConditionalOnClass {

	
	Class<?>[] value() default {};

	
	String[] name() default {};

}

~~~

**当是当这个注解作用于@Bean的方法上时，这个不会被解析成元数据，所以会由于类不存在而导致启动失败。**

![image-20241213151340685](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20241213151340685.png)

当一个Bean需要有某个class存在时才添加，可以用以下方式：

~~~java
@Configuration(proxyBeanMethods = false)
public class MyAutoConfiguration {

    // 通过内部类的方式
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(EmbeddedAcmeService.class)
    static class EmbeddedConfiguration {

        @Bean
        @ConditionalOnMissingBean
        public EmbeddedAcmeService embeddedAcmeService() { ... }

    }

}

~~~

**当使用注解ConditionalOnClass/ConditionalOnMissingClass作为元注解使用时，则必须使用名称来引用类。**



#### @ConditionalOnMissingClass

classpath上不存在指定的类的全路径名称时才匹配。

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnClassCondition.class)
public @interface ConditionalOnMissingClass {

	String[] value() default {};

}

~~~



#### @ConditionalOnBean 

配置规则看指定的类重写的getMatchOutcome方法。

**注解作用在配置类上，不匹配，则配置类不会注册(构造方法也不会执行)，配置了中的@Bean也不会注册。**

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnBeanCondition.class)
public @interface ConditionalOnBean {

	// 要存在Bean的class类型
	Class<?>[] value() default {};

	// 要存在Bean的类名称
	String[] type() default {};

	// Bean上需要的注解
	Class<? extends Annotation>[] annotation() default {};

	// 要存在Bean的名称
	String[] name() default {};

	// 搜索Bean的范围
	SearchStrategy search() default SearchStrategy.ALL;

	// value为Name.class,parameterizedContainer=NameRegistration.class 则检查Name和NameRegistration<Name>
	Class<?>[] parameterizedContainer() default {};

}

~~~



#### @ConditionalOnMissingBean

单独使用该注解作用于方法方法，表示返回类型Bean不存在时才创建Bean。

支持多条件。

**注解作用在配置类上，不匹配，则配置类不会注册(构造方法也不会执行)，配置了中的@Bean也不会注册。**

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnBeanCondition.class)
public @interface ConditionalOnMissingBean {

	// 指定被检查的Bean的类,都不存在则匹配
	Class<?>[] value() default {};

	// 指定被检查的Bean的类,都不存在则匹配
	String[] type() default {};

	// 被忽略的Bean的类型
	Class<?>[] ignored() default {};

	// 被忽略的Bean的类型
	String[] ignoredType() default {};

	// 被检查Bean的注解，指定的Bean都没有该注解时匹配
	Class<? extends Annotation>[] annotation() default {};

	// 指定被检查Bean的名称
	String[] name() default {};

	// 搜索的上下文
	SearchStrategy search() default SearchStrategy.ALL;

	// value为Name.class,parameterizedContainer=NameRegistration.class 则检查Name和NameRegistration<Name>
	Class<?>[] parameterizedContainer() default {};

}


~~~



#### @ConditionalOnSingleCandidate

匹配单个Bean生效，如果存在多个Bean，如果也指定了主Bean则匹配。

~~~java
package org.springframework.boot.autoconfigure.condition;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.Conditional;

// 指定的Bean类型只在容器中出现一次，则匹配
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnBeanCondition.class)
public @interface ConditionalOnSingleCandidate {

	// 不能和type一起使用
	Class<?> value() default Object.class;

	// 不能和value一起使用
	String type() default "";

	
	SearchStrategy search() default SearchStrategy.ALL;

}

~~~

~~~java
@Configuration
@EnableConfigurationProperties(HibernateProperties.class)
@ConditionalOnSingleCandidate(DataSource.class)
class HibernateJpaConfiguration extends JpaBaseConfiguration { 

}

~~~



![image-20241107160235885](http://47.101.155.205/image-20241107160235885.png)



#### @ConditionalOnProperty

配置文件匹配条件。

~~~java
package org.springframework.boot.autoconfigure.condition;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Conditional;
import org.springframework.core.env.Environment;

// name和value同样的效果，不能同时出现
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.METHOD })
@Documented
@Conditional(OnPropertyCondition.class)
public @interface ConditionalOnProperty {

	
	String[] value() default {};

	// 属性的前缀,没有.结尾，会加上这个'.'
	String prefix() default "";

	// 待校验的一个或多个配置名
	String[] name() default {};

	// 配置的要求,默认是可以是任何值，除了"false"，具体规则见下图
	String havingValue() default "";

	// 不存在配置key,是否匹配：默认不匹配
	boolean matchIfMissing() default false;

}
~~~

![image-20241108152506073](http://47.101.155.205/image-20241108152506073.png)

![image-20241108153142441](http://47.101.155.205/image-20241108153142441.png)



#### @ConditionalOnResource

当指定的资源在classpath下时匹配。

file:/home/user/test.dat

~~~java
package org.springframework.boot.autoconfigure.condition;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Conditional;


@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnResourceCondition.class)
public @interface ConditionalOnResource {

	
	String[] resources() default {};

}

~~~



#### @ConditionalOnWebApplication和@ConditionalOnNotWebApplication



#### @ConditionalOnExpression

https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#expressions

SPEL表达式的结果表示是否匹配。

~~~java
package org.springframework.boot.autoconfigure.condition;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Conditional;


@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.METHOD })
@Documented
@Conditional(OnExpressionCondition.class)
public @interface ConditionalOnExpression {

	
	String value() default "true";

}

~~~







## SpringCloud



### spring-cloud-context



#### @RefreshScope

~~~java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Scope("refresh")
@Documented
public @interface RefreshScope {

	ScopedProxyMode proxyMode() default ScopedProxyMode.TARGET_CLASS;

}

~~~

标志支持动态刷新的Bean，在运行时更新Bean的属性而无需重启。







## javax







### @PostConstruct

~~~java
package javax.annotation;

import java.lang.annotation.*;
import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

// 在构造方法执行后执行
@Documented
@Retention (RUNTIME)
@Target(METHOD)
public @interface PostConstruct {
}

~~~

Spring使用要求：

1. 方法不能携带参数；
2. 方法格式void \<METHOD\>()；
3. 方法可以是任意的修饰符权限；
4. 不能是static的方法；



