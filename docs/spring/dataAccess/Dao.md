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





### 2.2.执行API

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



**批量操作**

~~~java
// 实现接口BatchPreparedStatementSetter的两个方法
public class JdbcActorDao implements ActorDao {

    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // int[]记录的是每次操作影响的函数,由JDBC驱动记录(如果记录不可选,则返回-2)
    public int[] batchUpdate(final List<Actor> actors) {
        return this.jdbcTemplate.batchUpdate(
                "update t_actor set first_name = ?, last_name = ? where id = ?",
                new BatchPreparedStatementSetter() {
                    // i是每次操作,从0开始
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        Actor actor = actors.get(i);
                        ps.setString(1, actor.getFirstName());
                        ps.setString(2, actor.getLastName());
                        ps.setLong(3, actor.getId().longValue());
                    }
                    // 指定批量操作的次数
                    public int getBatchSize() {
                        return actors.size();
                    }
                });
    }


}

// 使用InterruptibleBatchPreparedStatementSetter接口的isBatchExhausted方法可以提前中断批次操作
// isBatchExhausted结果为true这次操作被放弃

~~~

~~~java
public class JdbcActorDao implements ActorDao {

    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // 使用数组的方式
    public int[] batchUpdate(final List<Actor> actors) {
        List<Object[]> batch = new ArrayList<Object[]>();
        for (Actor actor : actors) {
            Object[] values = new Object[] {
                    actor.getFirstName(), actor.getLastName(), actor.getId()};
            batch.add(values);
        }
        return this.jdbcTemplate.batchUpdate(
                "update t_actor set first_name = ?, last_name = ? where id = ?",
                batch);
    }

    // ... additional methods
}

~~~



~~~java
// batchArgs表示要处理的数量,batchSize表示批次处理的shul
// 如果batchArgs的数量大于批次处理数量,则分多批次处理
<T> int[][] batchUpdate(String sql, Collection<T> batchArgs, int batchSize,
			ParameterizedPreparedStatementSetter<T> pss) throws DataAccessException;
public class JdbcActorDao implements ActorDao {

    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int[][] batchUpdate(final Collection<Actor> actors) {
        int[][] updateCounts = jdbcTemplate.batchUpdate(
                "update t_actor set first_name = ?, last_name = ? where id = ?",
                actors,
                100,
                (PreparedStatement ps, Actor actor) -> {
                    ps.setString(1, actor.getFirstName());
                    ps.setString(2, actor.getLastName());
                    ps.setLong(3, actor.getId().longValue());
                });
        return updateCounts;
    }

}

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

SqlParameterSource的实现BeanPropertySqlParameterSource，其用法：

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



**批量操作：**

~~~java
// 提供SqlParameterSource数组
public class JdbcActorDao implements ActorDao {

    private NamedParameterTemplate namedParameterJdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public int[] batchUpdate(List<Actor> actors) {
        return this.namedParameterJdbcTemplate.batchUpdate(
                "update t_actor set first_name = :firstName, last_name = :lastName where id = :id",
                SqlParameterSourceUtils.createBatch(actors));
    }

    
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



#### SimpleJdbcInsert

在未执行JDBC操作之前，可以修改该对象的数据库相关信息，执行后就不能修改。

1. 配置表名，execute(map)，通过map对象，key指定为表的列名，value为要插入的值。
2. 配置表名+自动生成的key名，executeAndReturnKey(map)，插入数据，并且能获取自动生成key的名称。
3. 配置表名+表中的列名，插入的列名要和配置的列名相同。
4. 使用SqlParameterSource提供参数值。

~~~java
public class JdbcActorDao {

    private SimpleJdbcInsert insertActor;

    public void setDataSource(DataSource dataSource) {
        this.insertActor = new SimpleJdbcInsert(dataSource).withTableName("t_actor");
    }

    public void add1(Actor actor) {

        //this.insertActor = new SimpleJdbcInsert(dataSource).withTableName("t_actor");

        Map<String, Object> parameters = new HashMap<String, Object>(3);
        parameters.put("id", actor.getId());
        parameters.put("first_name", actor.getFirstName());
        parameters.put("last_name", actor.getLastName());
        insertActor.execute(parameters);
    }

    public void add2(Actor actor) {

        /*this.insertActor = new SimpleJdbcInsert(dataSource)
                .withTableName("t_actor")
                .usingGeneratedKeyColumns("id");*/

        Map<String, Object> parameters = new HashMap<String, Object>(2);
        parameters.put("first_name", actor.getFirstName());
        parameters.put("last_name", actor.getLastName());
        Number newId = insertActor.executeAndReturnKey(parameters);
        actor.setId(newId.longValue());
        // 如果需要获取多个自动生成的key或key的类型不是Number, 可以使用executeAndReturnKeyHolder方法
    }

    public void add3(Actor actor) {

        /*this.insertActor = new SimpleJdbcInsert(dataSource)
                .withTableName("t_actor")
                .usingColumns("first_name", "last_name")
                .usingGeneratedKeyColumns("id");*/

        Map<String, Object> parameters = new HashMap<String, Object>(2);
        parameters.put("first_name", actor.getFirstName());
        parameters.put("last_name", actor.getLastName());
        Number newId = insertActor.executeAndReturnKey(parameters);
        actor.setId(newId.longValue());
    }

    public void add4(Actor actor) {

        /*this.insertActor = new SimpleJdbcInsert(dataSource)
                .withTableName("t_actor")
                .usingGeneratedKeyColumns("id");*/
        // BeanPropertySqlParameterSource
        SqlParameterSource beanParam = new BeanPropertySqlParameterSource(actor);
        Number newId = insertActor.executeAndReturnKey(beanParam);
        actor.setId(newId.longValue());

        // MapSqlParameterSource
        SqlParameterSource sqlparam = new MapSqlParameterSource()
                .addValue("first_name", actor.getFirstName())
                .addValue("last_name", actor.getLastName());
        Number newId = insertActor.executeAndReturnKey(sqlparam);
        actor.setId(newId.longValue());
    }

}

~~~



#### SimpleJdbcCall

1. 调用存储过程。
2. 声明存储过程用到的参数，Spring支持从数据库中查找的存储过程的元数据，例如MySQL、Oracle等。



~~~sql
-- 创建存储过程
CREATE PROCEDURE read_actor (
    IN in_id INTEGER,
    OUT out_first_name VARCHAR(100),
    OUT out_last_name VARCHAR(100),
    OUT out_birth_date DATE)
BEGIN
    SELECT first_name, last_name, birth_date
    INTO out_first_name, out_last_name, out_birth_date
    FROM t_actor where id = in_id;
END;

~~~

~~~java


~~~





### 2.3.连接API

#### DataSource

DataSource是获取数据库连接的关键。Spring提供的DriverManagerDataSource和SimpleDriverDataSource类不支持池优化。支持第三方的连接池DataSource，如Apache的DBCP和C3P0，HikariCP。



> DriverManagerDataSource配置方式



~~~java
DriverManagerDataSource dataSource = new DriverManagerDataSource();
dataSource.setDriverClassName("org.hsqldb.jdbcDriver");
dataSource.setUrl("jdbc:hsqldb:hsql://localhost:");
dataSource.setUsername("sa");
dataSource.setPassword("");

~~~

~~~xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>

~~~



> DBCP配置方式



~~~xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>

~~~



> C3P0配置方式


~~~java
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
    <property name="driverClass" value="${jdbc.driverClassName}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>

~~~



#### DataSourceUtils

提供了静态方法，可以根据DataSource获取连接和手动关闭连接。支持线程绑定连接。





#### SmartDataSource

继承DataSource的接口，提供了一个shouldClose，接收一个连接，判断是否关闭连接。





#### AbstractDataSource

自定义DataSource继承该接口，可以减少一些实现的方法。



#### SingleConnectionDataSource

配置项suppressClose设为true，创建一个不支持关闭的数据库连接。使用对象的是通过JDK创建的代理对象。

![image-20250107140513631](http://47.101.155.205/image-20250107140513631.png)



#### DriverManagerDataSource

底层使用DriverManager.getConnection(url, props)获取连接，每次都会获取一次连接。

![image-20250107150803348](http://47.101.155.205/image-20250107150803348.png)



#### TransactionAwareDataSourceProxy

TransactionAwareDataSourceProxy通过使用DataSource对象，获取的Connection对象是代理对象，代理接口ConnectionProxy所有的方法。使用DataSourceUtils类的静态方法创建目标对象。

如果使用connection对象创建了Statement对象，则根据DataSource是否配置事务超时时间。

![image-20250107165349716](http://47.101.155.205/image-20250107165349716.png)

![image-20250108102735949](http://47.101.155.205/image-20250108102735949.png)





#### DataSourceTransactionManager

DataSourceTransactionManager是PlatformTransactionManager的实现，用来给单个数据源做事务管理。允许获取指定数据源的事务。

![image-20250108125215702](http://47.101.155.205/image-20250108125215702.png)

