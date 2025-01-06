# Dao



## 1.Dao 支持

Spring中的数据访问对象(Data Access Object DAO)目的是为了以一致的方式简单使用数据访问技术，如：JDBC、Hibernate、JPA。



### 一致性异常结构

除了JDBC异常之外，Spring还包装了特定于JPA和Hibernate的异常，将它们转换成一组集中的运行时异常。

DataAccessException异常的子类情况：

![](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/images/DataAccessException.png)



### 注解配置Dao

~~~java
@Repository 
public class SomeMovieFinder implements MovieFinder {
    // ...
}

~~~

使用Dao或Repository的实现目的是访问数据库资源，具体取决于哪种实现技术。基于JDBC的Repository需要DataSource，基于JPA的Repository需要EntityManager，基于典型的Hibernate的Repository需要SessionFactory。

~~~java
// JPA
@Repository
public class JpaMovieFinder implements MovieFinder {

    @PersistenceContext
    private EntityManager entityManager;

    // ...
}

~~~

~~~java
// Hibernate
@Repository
public class HibernateMovieFinder implements MovieFinder {

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    // ...
}

~~~

~~~java
// JDBC
@Repository
public class JdbcMovieFinder implements MovieFinder {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void init(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // ...
}

~~~



## 2.Spring-JDBC

Spring的JDBC做了什么

| 作用                            | Spring | dev  |
| ------------------------------- | ------ | ---- |
| 定义连接参数                    |        | √    |
| 打开连接                        | √      |      |
| 指定sql语句                     |        | √    |
| 声明参数并提供参数值            |        | √    |
| 预编译并执行sql                 | √      |      |
| 循环结果(如果有)                | √      |      |
| 循环迭代结果集(如果有)          | √      |      |
| Do the work for each iteration. |        | √    |
| 处理异常                        | √      |      |
| 处理事务                        | √      |      |
| 关闭连接、statement、结果集     | √      |      |



### 2.1.包结构

1. core：
2. datasource：
3. object：
4. support：





### 2.2.API

三种JdbcTemplate访问风格：

1. 1



NamedParameterJdbcTemplate包装JdbcTemplate提供命名参数查询。



SimpleJdbcInsert和SimpleJdbcCall提供了数据库配置方法的访问方式。



Java对象查询MappingSqlQuery、SqlUpdate 和StoredProcedure



#### JdbcTemplate

core包的核心类。处理资源连接和释放，执行核心JDBC工作流的任务(statment创建和执行)。支持以下功能：

1. 执行查询SQL
2. 更新语句和存储过程调用
3. 处理ResultSet
4. 捕获JDBC异常，并将其转换成spring-tx模块中定义的异常。

**JdbcTemplate一旦配置，就是线程安全，所以可以在应用程序中只提供一个JdbcTemplate供其它类共享。**

~~~java
// 使用JdbcTemplate的方式
// 也可以使用抽象类JdbcDaoSupport
public class JdbcCorporateEventDao implements CorporateEventDao {

    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="corporateEventDao" class="com.example.JdbcCorporateEventDao">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <context:property-placeholder location="jdbc.properties"/>

</beans>

~~~





> 查询

1. queryForObject(..)：方法结果只能是一条记录。
2. query(..)：结果可以是任意条记录。
3. queryForList(..)：查询结果可以是Map对象，也可以指定类。

~~~java
// 有且仅有一条查询
// 核心方法 <T> T execute(StatementCallback<T> action);
this.jdbcTemplate.queryForObject("select count(*) from t_actor", Integer.class);

// 查询携带参数(有且仅有一条查询)
this.jdbcTemplate.queryForObject(
        "select count(*) from t_actor where first_name = ?", Integer.class, "Joe");

// 查询指定 RowMapper 处理结果集(有且仅有一条查询)
jdbcTemplate.queryForObject(
        "select first_name, last_name from t_actor where id = ?",
        (resultSet, rowNum) -> {
            Actor newActor = new Actor();
            newActor.setFirstName(resultSet.getString("first_name"));
            newActor.setLastName(resultSet.getString("last_name"));
            return newActor;
        },
        1212L);

// 有多条结果集
this.jdbcTemplate.query(
        "select first_name, last_name from t_actor",
        (resultSet, rowNum) -> {
            Actor actor = new Actor();
            actor.setFirstName(resultSet.getString("first_name"));
            actor.setLastName(resultSet.getString("last_name"));
            return actor;
        });
// 执行核心方法 <T> T execute(PreparedStatementCreator psc, PreparedStatementCallback<T> action)

~~~



> Update(insert，update，delete)

~~~java
// 核心方法 <T> T execute(PreparedStatementCreator psc, PreparedStatementCallback<T> action)
// insert
this.jdbcTemplate.update(
        "insert into t_actor (first_name, last_name) values (?, ?)",
        "Leonor", "Watling");

// 获取自动生成的key(主键)
final String INSERT_SQL = "insert into my_test (name) values(?)";
final String name = "Rob";

KeyHolder keyHolder = new GeneratedKeyHolder();
jdbcTemplate.update(connection -> {
    PreparedStatement ps = connection.prepareStatement(INSERT_SQL, new String[] { "id" });
    ps.setString(1, name);
    return ps;
}, keyHolder);

// update
this.jdbcTemplate.update(
        "update t_actor set last_name = ? where id = ?",
        "Banjo", 5276L);
// delete
this.jdbcTemplate.update(
        "delete from t_actor where id = ?",
        Long.valueOf(actorId));

~~~



> 其它操作

~~~java
// 通过execute执行任意sql,通常是DDL语言
this.jdbcTemplate.execute("create table mytable (id integer, name varchar(100))");

// 调用存储过程
this.jdbcTemplate.update(
        "call SUPPORT.REFRESH_ACTORS_SUMMARY(?)",
        Long.valueOf(unionId));

~~~



#### NamedParameterJdbcTemplate

NamedParameterJdbcTemplate包装了JdbcTemplate对象，支持了命名参数的匹配功能，而不是经典的'?'占位符。

~~~java
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

public void setDataSource(DataSource dataSource) {
    this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
}

public int countOfActorsByFirstName(String firstName) {

    String sql = "select count(*) from T_ACTOR where first_name = :first_name";

    SqlParameterSource namedParameters = new MapSqlParameterSource("first_name", firstName);

    // 调用JdbcTemplate <T> List<T> query(PreparedStatementCreator psc, RowMapper<T> rowMapper)
    // getPreparedStatementCreator(String sql, SqlParameterSource paramSource) 创建 PreparedStatementCreator 对象
    return this.namedParameterJdbcTemplate.queryForObject(sql, namedParameters, Integer.class);
    
    // 也可以之间使用map对象
    // queryForObject(String sql, Map<String, ?> paramMap, RowMapper<T>rowMapper)
    
}

~~~

SqlParameterSource实现BeanPropertySqlParameterSource，其用法：

~~~java
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

public void setDataSource(DataSource dataSource) {
    this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
}

public int countOfActors(Actor exampleActor) {

   	
    String sql = "select count(*) from T_ACTOR where first_name = :firstName and last_name = :lastName";

    SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(exampleActor);
	// sql的参数匹配namedParameters中exampleActor对象的属性
    return this.namedParameterJdbcTemplate.queryForObject(sql, namedParameters, Integer.class);
}

~~~



#### SQLExceptionTranslator

SQLExceptionTranslator 是SQLExceptions异常和Spring的DataAccessException异常转换的接口。在数据库层面通常是不可知的，为了实现这一目标，通常使用JDBC的SQLState或特有的(oracle错误代码)。

SQLErrorCodeSQLExceptionTranslator是SQLExceptionTranslator的实现，默认使用这个类。这个实现使用了特有的数据库代码，比基于SQLState转换更精确。错误代码基于SQLErrorCodes的Java对象保存，这个类由SQLErrorCodesFactory 创建和填充，根据配置文件sql-error-codes.xml创建SQLErrorCodes。

SQLErrorCodeSQLExceptionTranslator遵循以下顺序匹配：

1. 由子类实现的任何自定义转换。通常情况下，会使用所提供的具体的基于 SQL 错误代码的SQLException翻译器（SQLErrorCodeSQLExceptionTranslator），所以这条规则并不适用。只有当你确实提供了一个子类实现时，它才适用。
2. 任何自定义的SQLExceptionTranslator实现，在SQLErrorCodes的属性customSqlExceptionTranslator中体现。
3. 会在CustomSQLErrorCodesTranslation类实例的列表（为SQLErrorCodes类的customTranslations属性所提供的）中查找匹配项。
4. 应用错误代码匹配。
5. 使用回退翻译器。SQLExceptionSubclassTranslator是默认的回退翻译器。如果该翻译器不可用，那么下一个回退翻译器是SQLStateSQLExceptionTranslator。



~~~java
// 继承重写customTranslate方法,默认return null
public class CustomSQLErrorCodesTranslator extends SQLErrorCodeSQLExceptionTranslator {

    protected DataAccessException customTranslate(String task, String sql, SQLException sqlEx) {
        if (sqlEx.getErrorCode() == -12345) {
            return new DeadlockLoserDataAccessException(task, sqlEx);
        }
        return null;
    }
}

~~~

![image-20250106212725520](http://47.101.155.205/image-20250106212725520.png)

~~~java
private JdbcTemplate jdbcTemplate;

public void setDataSource(DataSource dataSource) {

    // 创建JdbcTemplate 设置数据源
    this.jdbcTemplate = new JdbcTemplate();
    this.jdbcTemplate.setDataSource(dataSource);

    // 创建自定义的CustomSQLErrorCodesTranslator 并设置数据源
    CustomSQLErrorCodesTranslator tr = new CustomSQLErrorCodesTranslator();
    tr.setDataSource(dataSource);
    this.jdbcTemplate.setExceptionTranslator(tr);

}

public void updateShippingCharge(long orderId, long pct) {
    // use the prepared JdbcTemplate for this update
    this.jdbcTemplate.update("update orders" +
        " set shipping_charge = shipping_charge * ? / 100" +
        " where id = ?", pct, orderId);
}

~~~



#### DataSource

