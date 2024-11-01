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

	
	Autowire autowire() default Autowire.NO;

	// 在Bean创建的对象初始化完成后调用的方法,默认不执行
	String initMethod() default "";

	// 指定容器关闭时调用的方法,默认推断里面的：close和shutdown方法
	String destroyMethod() default AbstractBeanDefinition.INFER_METHOD;

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



##### ConditionalOnMissingBean





## SpringBoot










## SpringCloud



