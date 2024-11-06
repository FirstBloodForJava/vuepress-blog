# Spring注解

## SpringFramework



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





##### @ConditionalOnMissingBean

~~~java
package org.springframework.boot.autoconfigure.condition;

import java.lang.annotation.Annotation;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.Conditional;

// 当满足特定的条件才匹配,多个条件:都匹配才算匹配
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnBeanCondition.class)
public @interface ConditionalOnMissingBean {

	// 指定检查的类,指定的类对象都不存在才匹配
	Class<?>[] value() default {};

	// 指定检查的类名称，指定的类对象都不存在才匹配
	String[] type() default {};

	// 指定忽略检查的类
	Class<?>[] ignored() default {};

	// 指定忽略检查的类名称
	String[] ignoredType() default {};

	// 检查所有Bean的注释类型,存在匹配该值的,则不匹配
	Class<? extends Annotation>[] annotation() default {};

	// 检查指定Bean的名称,都不存在时才匹配
	String[] name() default {};

	// 检查的上下文,默认所有。CURRENT ANCESTORS
	SearchStrategy search() default SearchStrategy.ALL;

}

~~~



~~~java
@Configuration
public class MyAutoConfiguration {
    // 不携带参数，默认检查自己的是否在容器中存在
    @Bean
    @ConditionalOnMissingBean()
    public TestService testService() {
        System.out.println("TestService create");
        return new TestService();
    }
}

~~~



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





### @Import

~~~java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 将配置类或普通类或ImportSelector实现类或ImportBeanDefinitionRegistrar实现类引入到当前Spring容器
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Import {

	// 引入的类,不存在也不会影响启动
	Class<?>[] value();

}

~~~





## SpringBoot










## SpringCloud



