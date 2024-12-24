# SpEL表达式

SpEL(Spring Expression Language)是一个表达式语言，支持在运行是查询和方法调用。

SpEL表达式支持的功能：

1. Literal expressions
2. Boolean and relational operators
3. Regular expressions
4. Class expressions
5. Accessing properties, arrays, lists, and maps
6. Method invocation
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

属性访问不区分第一个字母的大小写。

数组和集合的所有访问格式[index]。

map元素的value访问，通过['key']格式。

~~~java
public class PropertiesExpression {

    /**
     * 访问 对象的属性、数组、集合、map中的属性
     * @param args
     */
    public static void main(String[] args) {

        // 数据准备
        ClassInfo tesla = new ClassInfo("tesla", "shanghai", new Date(), new String[] {"Su7", "Su7 Pro Max", "Su7 Ultra"});
        Teacher t1 = new Teacher("China", "shanghai1");
        Teacher t2 = new Teacher("China", "shanghai2");
        tesla.setTeachers(t1);
        tesla.setTeachers(t2);

        ClassInfo xiaomi = new ClassInfo("xiaomi", "beijing", new Date(), new String[] {"Model X", "Model Y", "Model 3", "Model S"});
        Teacher x1 = new Teacher("China", "beijing1");
        Teacher x2 = new Teacher("China", "beijing2");
        xiaomi.setTeachers(x1);
        xiaomi.setTeachers(x2);

        School school = new School();
        school.setClassName("xiaomi");
        school.setMember(tesla);
        school.setMember(xiaomi);

        Map officers = school.getOfficers();
        officers.put("xiaomi", xiaomi);

        // 创建一个只读的context
        EvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();

        SpelExpressionParser parser = new SpelExpressionParser();

        // -- 属性访问 第一个字母不区分大小写

        // 2024
        System.out.println(parser.parseExpression("Birthdate.Year + 1900").getValue(tesla, Integer.class));

        // beijing
        System.out.println(parser.parseExpression("addr").getValue(xiaomi, String.class));


        // -- 访问集合元素

        // Su7 Ultra
        System.out.println(parser.parseExpression("students[2]").getValue(
                context, tesla, String.class));

        // Model 3
        System.out.println(parser.parseExpression("students[2]").getValue(
                context, xiaomi, String.class));

        // China
        System.out.println(parser.parseExpression("teachers[0].city").getValue(context, tesla, String.class));
        // beijing2
        System.out.println(parser.parseExpression("teachers[1].country").getValue(context, xiaomi, String.class));

        // -- 访问map元素 com.example.spel.ClassInfo
        System.out.println(parser.parseExpression("officers['xiaomi']").getValue(context, school, ClassInfo.class));

        // beijing1
        System.out.println(parser.parseExpression("officers['xiaomi'].teachers[0].country").getValue(context, school, String.class));
        

    }
}


~~~



### 3.Inline lists

行内list解析：{}格式解析为List集合。解析后的集合是不能修改的。

{}意味着空的集合。

~~~java
public class InlineListExpression {

    public static void main(String[] args) {

        SpelExpressionParser parser = new SpelExpressionParser();

        SimpleEvaluationContext readContext = SimpleEvaluationContext.forReadOnlyDataBinding().build();

        List numberList = (List) parser.parseExpression("{0, 1, 2, 3, 4}").getValue(readContext);
        // 2
        System.out.println(numberList.get(2));

        List listList = (List) parser.parseExpression("{{'a', 'b'}, {'c', 'd', 'e'}}").getValue(readContext);
        // [a, b]
        System.out.println(listList.get(0));
        
        List empty = (List) parser.parseExpression("{}").getValue(readContext);
        // true
        System.out.println(empty.isEmpty());
    }
}

~~~



### 4.Inline maps

行内map解析：{key: value}，value是字符串需要加''。

map是不能被修改的。

~~~java
public class InlineMapExpression {

    public static void main(String[] args) {

        SpelExpressionParser parser = new SpelExpressionParser();

        SimpleEvaluationContext readContext = SimpleEvaluationContext.forReadOnlyDataBinding().build();

        Map m1 = (Map) parser.parseExpression("{name:'Nikola',dob:'10-July-1856', age: 10}").getValue(readContext);
        // 10
        System.out.println(m1.get("age"));

        Map mapOfMaps = (Map) parser.parseExpression("{name:{first:'Nikola',last:'Tesla'},dob:{day:10,month:'July',year:1856}}").getValue(readContext);

        // {day=10, month=July, year=1856}
        System.out.println(mapOfMaps.get("dob"));

        Map empty = (Map) parser.parseExpression("{:}").getValue(readContext);
        // true
        System.out.println(empty.isEmpty());
    }
}

~~~



### 5.Array construction

数组构造：支持基本类型数组构造，初始化长度，初始化值。

二维数组不支持初始化值。

~~~java
public class ArrayContructExpression {

    public static void main(String[] args) {

        SpelExpressionParser parser = new SpelExpressionParser();

        SimpleEvaluationContext readContext = SimpleEvaluationContext.forReadOnlyDataBinding().build();

        int[] numbers1 = (int[]) parser.parseExpression("new int[4]").getValue(readContext);
        // 0
        System.out.println(numbers1[3]);

        int[] numbers2 = (int[]) parser.parseExpression("new int[]{1,2,3}").getValue(readContext);
        // 3
        System.out.println(numbers2[2]);

        int[][] numbers3 = (int[][]) parser.parseExpression("new int[4][5]").getValue(readContext);
        // 0
        System.out.println(numbers3[3][4]);

    }
}

~~~



### 6.Method invocation

方法调用：java语法来调用方法。

~~~java
// true
System.out.println(parser.parseExpression("isMember('xiaomi')").getValue(school, Boolean.class));

// country
System.out.println(parser.parseExpression("'my country'.substring(3)").getValue(String.class));

~~~



### 7.Operators

#### 关系运算符

支持的关系运算符：等于、不等于、小于、小于或等于(less than or equal)、大于、大于或等于(greater than or equal)。

遵循一些规则，任何与null进行大于、小于运算，则 x > null总是true，x < null总是false。

字符串不要与数字进行比较，如'abc' > 0。

还支持instanceof 、正则表达式的matchs运算。



~~~java
public class RelationOperatorExpression {

    public static void main(String[] args) {
        SpelExpressionParser parser = new SpelExpressionParser();

        // -- 关系运算符

        System.out.println(parser.parseExpression("'a' == 'b'").getValue(Boolean.class));
        System.out.println(parser.parseExpression("'a' != 'b'").getValue(Boolean.class));

        System.out.println(parser.parseExpression("'a' >= 'b'").getValue(Boolean.class));
        // false
        System.out.println(parser.parseExpression(" 0 > null").getValue(Boolean.class));

        System.out.println(parser.parseExpression("'xyz' instanceof T(Integer)").getValue(Boolean.class));
        System.out.println(parser.parseExpression("1 instanceof T(Integer)").getValue(Boolean.class));

        // false 基本数据类型的结果为false
        System.out.println(parser.parseExpression("1 instanceof T(int)").getValue(Boolean.class));
        // true
        System.out.println(parser.parseExpression("'5.00' matches '^-?\\d+(\\.\\d{2})?$'").getValue(Boolean.class));

        // false 小数点2位
        System.out.println(parser.parseExpression("'5.0067' matches '^-?\\d+(\\.\\d{2})?$'").getValue(Boolean.class));

    }
}

~~~

xml符号转移运算符：

1. lt (<)
2. gt (>)
3. le (<=)
4. ge (>=)
5. eq (==)
6. ne (!=)
7. div (/)
8. mod (%)
9. not (!)





#### 逻辑运算符

1. and(&&)：逻辑与。
2. or(||)：逻辑或。
3. not(!)：取反。



~~~java
public class LogicalOperationExpression {

    public static void main(String[] args) {
        SpelExpressionParser parser = new SpelExpressionParser();

        LogicalOperationExpression object = new LogicalOperationExpression();

        StandardEvaluationContext context = new StandardEvaluationContext(object);


        System.out.println(parser.parseExpression("true and false").getValue(Boolean.class));
        System.out.println(parser.parseExpression("false and isTrue('true')").getValue(Boolean.class));

        System.out.println(parser.parseExpression("true or isTrue('false')").getValue(context, Boolean.class));
        System.out.println(parser.parseExpression("!false or isTrue('false')").getValue(context, Boolean.class));



    }

    public boolean isTrue(String flag) {
        System.out.println("LogicalOperationExpression isTrue: " + flag);
        return "true".equals(flag);
    }
}

~~~



#### 数学运算符

加、减、乘、除、取余等数学运算符。

~~~java
public class MathematicalOperationExpression {

    public static void main(String[] args) {
        SpelExpressionParser parser = new SpelExpressionParser();


        System.out.println(parser.parseExpression("1 + 1").getValue(Integer.class));

        System.out.println(parser.parseExpression("'test' + ' ' + 'string'").getValue(String.class));

        System.out.println(parser.parseExpression("1 * 10").getValue(Integer.class));
    }
}

~~~



#### 赋值运算符

使用setValue方法只放属性名。

使用getValue方法，使用属性名 = '值'的格式。

属性名第一个字母不区分大小写。

~~~java
public class AssignmentOperatorExpression {

    public static void main(String[] args) {

        Teacher teacher = new Teacher("shanghai", "China");

        SpelExpressionParser parser = new SpelExpressionParser();

        SimpleEvaluationContext context = SimpleEvaluationContext.forReadWriteDataBinding().build();

        parser.parseExpression("city").setValue(context, teacher,"beijing");
        System.out.println(teacher.getCity());

        System.out.println(parser.parseExpression("city = 'shanghai'").getValue(context, teacher, String.class));
        System.out.println(teacher.getCity());

    }
}

~~~



### 8.Types

T类型转换使用。T (指定class的类型)。StandardEvaluationContext 使用TypeLocator查找类型，使用的实现StandardTypeLocator，可以被替换。在java.lang包下的类可以省略名称。



~~~java
Class dateClass = parser.parseExpression("T(java.util.Date)").getValue(Class.class);

boolean trueValue = parser.parseExpression(
        "T(java.math.RoundingMode).CEILING < T(java.math.RoundingMode).FLOOR")
        .getValue(Boolean.class);

~~~



### 9.Constructors

构造方法调用。使用new调用构造方法，需要使用类的全名称，除了基本类型和String。

~~~java
public class ConstructorExpression {

    public static void main(String[] args) {

        SpelExpressionParser parser = new SpelExpressionParser();

        ClassInfo xiaomi = parser.parseExpression("new com.example.spel.ClassInfo('xiaomi', 'beijing')").getValue(ClassInfo.class);

        System.out.println(xiaomi.getName());

        School school = new School();
        // 结果是boolean值
        parser.parseExpression("Members.add(new com.example.spel.ClassInfo('xiaomi', 'beijing'))").getValue(school);
        System.out.println(school.getMembers().size());
    }
}

~~~



### 10.Variables

通过#变量名来引用变量的值，变量值通过EvaluationContext对象的setVariable方法设置。变量只能由字母、数字、下划线、$组成。



~~~java
public class AccessVarExpression {

    public static void main(String[] args) {
        SpelExpressionParser parser = new SpelExpressionParser();

        School school = new School();
        school.setClassName("name");

        SimpleEvaluationContext context = SimpleEvaluationContext.forReadWriteDataBinding().withRootObject(school).build();

        // 设置变量
        context.setVariable("name", "new Name");

        System.out.println(school.getClassName());
        parser.parseExpression("className = #name").getValue(context);
        System.out.println(school.getClassName());

        List<Integer> list = Arrays.asList(1, 2, 3, 10, 12);
        context.setVariable("list", list);
        // 使用.?[] 集合过滤器 [] 中接判断条件
        // #this表示当前对象自己
        // #root表示context中的对象
        List<Integer> filterList = (List<Integer>) parser.parseExpression("#list.?[#this > 4 && #root.className == #name]").getValue(context);
        // [10, 12]
        System.out.println(filterList);
    }
}

~~~




~~~java
// #this
// #root
    
~~~



### 11.Functions

通过EvaluationContext对象注册方法。



~~~java
Method method = ...;

EvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();
context.setVariable("myFunction", method);

~~~



~~~java
// 字符串反转的函数
public abstract class StringUtils {

    public static String reverseString(String input) {
        StringBuilder backwards = new StringBuilder(input.length());
        for (int i = 0; i < input.length(); i++) {
            backwards.append(input.charAt(input.length() - 1 - i));
        }
        return backwards.toString();
    }
}

~~~

~~~java
ExpressionParser parser = new SpelExpressionParser();

EvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();
context.setVariable("reverseString",
        StringUtils.class.getDeclaredMethod("reverseString", String.class));

String helloWorldReversed = parser.parseExpression(
        "#reverseString('hello')").getValue(context, String.class);

~~~



### 12.Bean References

@名称：访问BeanFactory中该名称的bean对象。在StandardEvaluationContext上下文设置BeanResolver对象BeanFactoryResolver默认是从给定的BeanFacotory中查找bean。

&名称：&不会被省略。

~~~java
public class BeanFactoryExpression {

    public static void main(String[] args) {

        final Map<String, Class<?>> map = new HashMap<>();
        map.put("String", String.class);
        map.put("&Integer", Integer.class);

        StandardEvaluationContext context = new StandardEvaluationContext();
        // 自定义bean解析器
        context.setBeanResolver(new BeanResolver() {
            @Override
            public Object resolve(EvaluationContext context, String beanName) throws AccessException {
                // 这里的名称是 去掉@的字符串
                if (map.containsKey(beanName)) {
                    return map.get(beanName);
                }
                throw new AccessException("map not contain object, name = " + beanName);
            }
        });

        SpelExpressionParser parser = new SpelExpressionParser();
        // class java.lang.String 访问的beanName = String
        System.out.println(parser.parseExpression("@String").getValue(context, Class.class));
        // class java.lang.String 访问的beanName = &Integer
        System.out.println(parser.parseExpression("&Integer").getValue(context, Class.class));


    }
}

~~~





### 13.Ternary Operator

三目运算符：

~~~java
public class TernaryOperatorExpression {

    public static void main(String[] args) {

        SpelExpressionParser parser = new SpelExpressionParser();

        System.out.println(parser.parseExpression("true ? 'true' : 'false'").getValue(String.class));

        SimpleEvaluationContext context = SimpleEvaluationContext.forReadWriteDataBinding().build();

        // null
        System.out.println(parser.parseExpression("#name != null ? #name : 'null'").getValue(context, String.class));
        context.setVariable("name", "name");
        // 三目运算符
        System.out.println(parser.parseExpression("#name != null ? #name : 'null'").getValue(context, String.class));
        // 简单的三目运算符
        System.out.println(parser.parseExpression("#name?:'null'").getValue(context, String.class));
    }
}
~~~



### 14.The Elvis Operator

三目运算符的简单写法

~~~java
ExpressionParser parser = new SpelExpressionParser();

// 等价于 name != null ? : name : 'Unknown'
String name = parser.parseExpression("name?:'Unknown'").getValue(String.class);
System.out.println(name);  // 'Unknown'

~~~

~~~java
ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();

Inventor tesla = new Inventor("Nikola Tesla", "Serbian");
String name = parser.parseExpression("Name?:'Elvis Presley'").getValue(context, tesla, String.class);
System.out.println(name);  // Nikola Tesla

tesla.setName(null);
name = parser.parseExpression("Name?:'Elvis Presley'").getValue(context, tesla, String.class);
System.out.println(name);  // Elvis Presley

~~~


~~~java
// 系统变量不存在pop3.port则注入25
@Value("#{systemProperties['pop3.port'] ?: 25}")

~~~





### 15.Safe Navigation Operator

判空校验，在访问对象的属性时在.前面加?。

~~~java
ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();

Inventor tesla = new Inventor("Nikola Tesla", "Serbian");
tesla.setPlaceOfBirth(new PlaceOfBirth("Smiljan"));

String city = parser.parseExpression("PlaceOfBirth?.City").getValue(context, tesla, String.class);
System.out.println(city);  // Smiljan

// PlaceOfBirth属性现在是null
tesla.setPlaceOfBirth(null);
city = parser.parseExpression("PlaceOfBirth?.City").getValue(context, tesla, String.class);
System.out.println(city); 

~~~



### 16.Collection Selection

确认是否返回一个新的结合？

集合过滤语法：.?[selectionExpression]

~~~java
List<Inventor> list = (List<Inventor>) parser.parseExpression(
        "Members.?[Nationality == 'Serbian']").getValue(societyContext);

~~~



~~~java
// Map过滤返回匹配的key value
Map newMap = parser.parseExpression("map.?[value<27]").getValue();

~~~



返回第一个匹配的结果语法：.^[selectionExpression]

返回最后一个匹配的结果语法：.$[selectionExpression]





### 17.Collection Projection

集合元素提取语法：.![projectionExpression]。

相当于stream流的map返回新的对象。

~~~java
// returns ['Smiljan', 'Idvor' ]
List placesOfBirth = (List)parser.parseExpression("Members.![placeOfBirth.city]");

~~~



### 18.Expression templating

指定ParserContext对象的表达式模板。相当于确定SpEL表达式的开始和结束部分

~~~java
// 表达式中既有普通文本又有 SpEL表达式
// new TemplateParserContext() 默认前缀就是#{ 后缀}
String randomPhrase = parser.parseExpression(
        "random number is #{T(java.lang.Math).random()}",
        new TemplateParserContext()).getValue(String.class);

// evaluates to "random number is 0.7038186818312008"

~~~



