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



### 2.1.JDBC访问数据库的方法

三种JdbcTemplate访问风格：

1. 1



NamedParameterJdbcTemplate包装JdbcTemplate提供命名参数查询。



SimpleJdbcInsert和SimpleJdbcCall提供了数据库配置方法的访问方式。



Java对象查询MappingSqlQuery、SqlUpdate 和StoredProcedure



### 2.2.