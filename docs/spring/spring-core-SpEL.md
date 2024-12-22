# SpEL表达式

SpEL(Spring Expression Language)是一个表达式语言，支持在运行是查询和方法调用。

SpEL表达式支持的功能：

1. Literal expressions
2. Boolean and relational operators
3. Regular expressions
4. Class expressions
5. Accessing properties, arrays, lists, and maps
6. Method invocation
7. Relational operators
8. Assignment
9. Calling constructors
10. Bean references
11. Array construction
12. Inline lists
13. Inline maps
14. Ternary operator
15. Variables
16. User-defined functions
17. Collection projection
18. Collection selection
19. Templated expressions



## 技术介绍



### EvaluationContext

EvaluationContext接口解析表达式的属性、方法或字段并帮助进行类型转换，提供了2个实现：

1. SimpleEvaluationContext：
2. StandardEvaluationContext：



### 解析配置

org.springframework.expression.spel.SpelParserConfiguration对象用来配置Spel解析器。



~~~java
// 1 true null属性自动创建
// 2 true 数组自动扩容
SpelParserConfiguration config = new SpelParserConfiguration(true,true);

// 使用这个配置
ExpressionParser parser = new SpelExpressionParser(config);

Expression expression = parser.parseExpression("list[3]");

Demo demo = new Demo();

Object o = expression.getValue(demo);

~~~



### 编译配置

org.springframework.expression.spel.SpelCompilerMode定义了3中编译模式：

1. OFF：默认的，关闭编译器。
2. IMMEDIATE：
3. MIXED：

~~~java
SpelParserConfiguration config = new SpelParserConfiguration(SpelCompilerMode.IMMEDIATE,
    this.getClass().getClassLoader());

SpelExpressionParser parser = new SpelExpressionParser(config);

Expression expr = parser.parseExpression("payload");

MyMessage message = new MyMessage();

Object payload = expr.getValue(message);

~~~



## Bean中使用表达式

SpEL表达式在xml和注解中的使用语法#{ expression string }。



### xml配置使用

~~~xml
<bean id="numberGuess" class="org.spring.samples.NumberGuess">
    <!-- 对象方法调用 -->
    <property name="randomNumber" value="#{ T(java.lang.Math).random() * 100.0 }"/>
</bean>

<bean id="taxCalculator" class="org.spring.samples.TaxCalculator">
    <!-- ? -->
    <property name="defaultLocale" value="#{ systemProperties['user.region'] }"/>
</bean>

<bean id="shapeGuess" class="org.spring.samples.ShapeGuess">
    <!-- 使用bean的属性 -->
    <property name="initialShapeSeed" value="#{ numberGuess.randomNumber }"/>
</bean>

~~~



### 注解配置使用

可以通过@Value注解在属性、方法、方法或构造方法参数使用。

~~~java
public class FieldValueTestBean {

    @Value("#{ systemProperties['user.region'] }")
    private String defaultLocale;

    public void setDefaultLocale(String defaultLocale) {
        this.defaultLocale = defaultLocale;
    }

    public String getDefaultLocale() {
        return this.defaultLocale;
    }
}

// 与上面效果相同(setter上使用)
public class PropertyValueTestBean {

    private String defaultLocale;

    @Value("#{ systemProperties['user.region'] }")
    public void setDefaultLocale(String defaultLocale) {
        this.defaultLocale = defaultLocale;
    }

    public String getDefaultLocale() {
        return this.defaultLocale;
    }
}

~~~



~~~java
// 方法参数使用
public class SimpleMovieLister {

    private MovieFinder movieFinder;
    private String defaultLocale;

    @Autowired
    public void configure(MovieFinder movieFinder,
            @Value("#{ systemProperties['user.region'] }") String defaultLocale) {
        this.movieFinder = movieFinder;
        this.defaultLocale = defaultLocale;
    }

    // ...
}

// 构造方法参数使用
public class MovieRecommender {

    private String defaultLocale;

    private CustomerPreferenceDao customerPreferenceDao;

    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao,
            @Value("#{systemProperties['user.country']}") String defaultLocale) {
        this.customerPreferenceDao = customerPreferenceDao;
        this.defaultLocale = defaultLocale;
    }

    // ...
}

~~~



## 功能使用

### 1.Literal expressions

文本表达式：支持字符串、数字值(int、hex、实数)、boolean、null文本解析。

实数默认解析为Double类型Double.parseDouble()。



~~~java
package com.example.spel;

import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;

public class LiteralExpression {

    public static void main(String[] args) {

        ExpressionParser parser = new SpelExpressionParser();

        // Hello World 字符串用''起来,使用'需要转义''
        String helloWorld = (String) parser.parseExpression("'Hello World'").getValue();

        // 6.0221415E23
        double avogadrosNumber = (Double) parser.parseExpression("6.0221415E+23").getValue();

        // 2147483647
        int maxValue = (Integer) parser.parseExpression("0x7FFFFFFF").getValue();

        //
        boolean trueValue = (Boolean) parser.parseExpression("true").getValue();

        // null对象
        Object nullValue = parser.parseExpression("null").getValue();
    }
}

~~~



### 2.Properties, Arrays, Lists, Maps, and Indexers

