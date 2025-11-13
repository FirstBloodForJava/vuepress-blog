# Spring-JPA

## 1、JPA是什么

JPA 是 JCP 组织发布的 Java EE 标准之一，因此任何声称符合 JPA 标准的框架都遵循同样的架构，提供相同的访问API，这保证了基于JPA开发的企业应用能够经过少量的修改就能够在不同的JPA框架下运行。

JPA 提供了一种标准化的、面向对象的方式来处理对象与关系数据库之间的映射和持久化操作。它提供了丰富的注解和接口，使开发人员能够更轻松地进行数据库操作，同时提高了代码的可移植性和可维护性，用于简化对象关系映射（ORM）的开发工作。JPA 是 Java EE（现在称为 Jakarta EE）的一部分，并且可以与任何支持 JPA 规范的 ORM 框架一起使用，最著名的实现是 Hibernate。

**核心概念：**

1. 实体（Entity）：实体是应用程序中持久化到数据库的对象。在 JPA 中，实体通常映射到数据库中的表，并且实体类使用 `@Entity` 注解进行标识。
2. 属性（Attributes）：实体类的属性对应于数据库表的列。JPA 使用注解（如 `@Column`）来指定属性与列的映射关系，包括列名、数据类型、长度、索引等。
3. 主键（Primary Key）：每个实体都必须有一个主键，用于唯一标识实体。JPA 提供了多种方式来定义主键，包括自动生成、手动指定、复合主键等。
4. 关联关系（Relationship）：JPA 支持在实体之间建立关联关系，如一对一、一对多、多对一和多对多。关联关系使用注解（如 `@OneToOne`、`@OneToMany`、`@ManyToOne` 和 `@ManyToMany`）进行标识。
5. EntityManager：EntityManager 是 JPA 的核心接口之一，用于管理实体对象的生命周期和执行数据库操作。它提供了持久化（保存、更新、删除）、查询、事务管理等功能。
6. JPQL（Java Persistence Query Language）：JPQL 是一种面向对象的查询语言，类似于 SQL，但是操作的是实体对象而不是表和列。JPQL 允许开发人员以对象模型的方式编写查询语句，从而提供了更加灵活和面向对象的查询能力。
7. ORM（Object-Relational Mapping）：ORM 是一种将关系型数据库和面向对象编程语言之间数据的转换技术。JPA 提供了一种方便的 ORM 实现，通过注解和配置，可以实现实体对象与数据库表之间的映射，从而实现对象与数据库之间的转换和持久化。



## 2、SpringDataJPA是什么

Spring Data JPA 是 Spring 框架提供的一个用于简化与数据库交互的模块。它基于 Java Persistence API（JPA）规范，并提供了许多便捷的功能，使得在使用关系型数据库时更加容易和高效。

**SpringDataJPA的功能：**

1. 对象关系映射（ORM）：Spring Data JPA 提供了一种简单的方式来将 Java 对象与数据库表之间进行映射。通过使用注解或 XML 配置，可以定义实体类、表之间的关系以及字段的映射规则，从而将对象持久化到数据库中。
2. 自动化 CRUD 操作：Spring Data JPA 提供了自动化的 CRUD（创建、读取、更新、删除）操作。只需定义接口，并继承 `CrudRepository` 或 `JpaRepository` 接口，就可以获得常见的数据库操作方法，如保存实体、查询实体、删除实体等，无需手动编写常见的 CRUD 代码。
3. 查询方法的自动生成：Spring Data JPA 根据方法命名规则自动生成查询语句。例如，根据方法名 `findByFirstName(String firstName)` 自动生成的查询语句将查找指定 `firstName` 的实体。还可以使用更复杂的命名规则来生成更复杂的查询语句。
4. 分页和排序：Spring Data JPA 支持轻松实现分页和排序功能。通过在方法中传递 `Pageable` 对象，可以在查询中指定页数、每页条数以及排序规则，从而方便地进行分页查询。
5. 复杂查询支持：Spring Data JPA 支持使用 JPA Criteria 查询、JPQL（Java Persistence Query Language）查询和本地 SQL 查询等多种查询方式，以满足复杂查询需求。
6. 事务管理：Spring Data JPA 集成了 Spring 的事务管理功能，可以通过简单的配置实现对数据库事务的管理，确保数据的一致性和完整性。
7. 异步查询：Spring Data JPA 还提供了异步查询的支持，通过使用 `@Async` 注解，可以在执行查询时异步地处理数据库操作，提高系统的并发性能。



## 3、核心概念

### 3.1、CrudRepository

~~~java
public interface CrudRepository<T, ID> extends Repository<T, ID> {

  <S extends T> S save(S entity);// 1   

  Optional<T> findById(ID primaryKey);// 2 

  Iterable<T> findAll();// 3               

  long count();// 4                        

  void delete(T entity);// 5             

  boolean existsById(ID primaryKey);// 6

  // … more functionality omitted.
}

~~~

1. 保存一个给定的对象
2. 通过id（主键）查询对象
3. 查询所有对象
4. 查询所有对象的总数
5. 删除给定的对象
6. 判断给定的id（主键）是否存在





### 3.2、JpaRepository



### 3.3、PagingAndSortingRepository

~~~java
public interface PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID> {

  Iterable<T> findAll(Sort sort);

  Page<T> findAll(Pageable pageable);
}

~~~

~~~java
PagingAndSortingRepository<User, Long> repository = // … get access to a bean
Page<User> users = repository.findAll(PageRequest.of(1, 20));

~~~



### 3.4、分页和排序

~~~java
Sort sort = Sort.by("firstname").ascending()
  .and(Sort.by("lastname").descending());

~~~



~~~java
TypedSort<Person> person = Sort.sort(Person.class);

Sort sort = person.by(Person::getFirstname).ascending()
  .and(person.by(Person::getLastname).descending());

~~~



~~~java
QSort sort = QSort.by(QPerson.firstname.asc())
  .and(QSort.by(QPerson.lastname.desc()));

~~~



### 3.5、支持的方法名查询

| 关键词                | 样本                                                         | JPQL 片段                                                    |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `Distinct`            | `findDistinctByLastnameAndFirstname`                         | `select distinct … where x.lastname = ?1 and x.firstname = ?2` |
| `And`                 | `findByLastnameAndFirstname`                                 | `… where x.lastname = ?1 and x.firstname = ?2`               |
| `Or`                  | `findByLastnameOrFirstname`                                  | `… where x.lastname = ?1 or x.firstname = ?2`                |
| `Is`, `Equals`        | `findByFirstname`,`findByFirstnameIs`,`findByFirstnameEquals` | `… where x.firstname = ?1`                                   |
| `Between`             | `findByStartDateBetween`                                     | `… where x.startDate between ?1 and ?2`                      |
| `LessThan`            | `findByAgeLessThan`                                          | `… where x.age < ?1`                                         |
| `LessThanEqual`       | `findByAgeLessThanEqual`                                     | `… where x.age <= ?1`                                        |
| `GreaterThan`         | `findByAgeGreaterThan`                                       | `… where x.age > ?1`                                         |
| `GreaterThanEqual`    | `findByAgeGreaterThanEqual`                                  | `… where x.age >= ?1`                                        |
| `After`               | `findByStartDateAfter`                                       | `… where x.startDate > ?1`                                   |
| `Before`              | `findByStartDateBefore`                                      | `… where x.startDate < ?1`                                   |
| `IsNull`,`Null`       | `findByAge(Is)Null`                                          | `… where x.age is null`                                      |
| `IsNotNull`,`NotNull` | `findByAge(Is)NotNull`                                       | `… where x.age not null`                                     |
| `Like`                | `findByFirstnameLike`                                        | `… where x.firstname like ?1`                                |
| `NotLike`             | `findByFirstnameNotLike`                                     | `… where x.firstname not like ?1`                            |
| `StartingWith`        | `findByFirstnameStartingWith`                                | `… where x.firstname like ?1`（附加绑定的参数`%`）           |
| `EndingWith`          | `findByFirstnameEndingWith`                                  | `… where x.firstname like ?1`（带前缀的参数绑定`%`）         |
| `Containing`          | `findByFirstnameContaining`                                  | `… where x.firstname like ?1`（包裹在 中的参数绑定`%`）      |
| `OrderBy`             | `findByAgeOrderByLastnameDesc`                               | `… where x.age = ?1 order by x.lastname desc`                |
| `Not`                 | `findByLastnameNot`                                          | `… where x.lastname <> ?1`                                   |
| `In`                  | `findByAgeIn(Collection<Age> ages)`                          | `… where x.age in ?1`                                        |
| `NotIn`               | `findByAgeNotIn(Collection<Age> ages)`                       | `… where x.age not in ?1`                                    |
| `True`                | `findByActiveTrue()`                                         | `… where x.active = true`                                    |
| `False`               | `findByActiveFalse()`                                        | `… where x.active = false`                                   |
| `IgnoreCase`          | `findByFirstnameIgnoreCase`                                  | `… where UPPER(x.firstname) = UPPER(?1)`                     |





### 3.6、@Query使用

~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("select u from User u where u.emailAddress = ?1")
  User findByEmailAddress(String emailAddress);
}

~~~



**like查询：**

~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("select u from User u where u.firstname like %?1")
  List<User> findByFirstnameEndsWith(String firstname);
}

~~~

 

**nativeQuery查询：**

1. `nativeQuery = false` 未开启（默认情况）：
   - 使用 JPA 提供的查询语言（JPQL）执行查询操作。
   - 查询语句使用实体类和属性的名称，而不是数据库的表名和列名。
   - JPA 会根据实体类的映射关系，自动生成适当的 SQL 查询语句。
   - JPA 可以提供更高级的特性，如延迟加载、级联操作等。
2. `nativeQuery = true` 开启：
   - 使用原生 SQL 查询语句执行查询操作。
   - 查询语句直接使用数据库的表名和列名。
   - 开发人员需要手动编写 SQL 查询语句，并负责处理实体类与查询结果之间的映射关系。
   - 可以使用 SQL 的特性和语法，如复杂的联接查询、存储过程调用等。
   - JPA 提供的高级特性（如延迟加载、级联操作）可能不适用于原生查询结果，需要开发人员自行处理。



~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query(value = "SELECT * FROM USERS WHERE EMAIL_ADDRESS = ?1", nativeQuery = true)
  User findByEmailAddress(String emailAddress);
}

~~~



**分页查询，并且获取总数：**

~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query(value = "SELECT * FROM USERS WHERE LASTNAME = ?1",
    countQuery = "SELECT count(*) FROM USERS WHERE LASTNAME = ?1",
    nativeQuery = true)
  Page<User> findByLastname(String lastname, Pageable pageable);
}

~~~



**排序：**

~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("select u from User u where u.lastname like ?1%")
  List<User> findByAndSort(String lastname, Sort sort);

  @Query("select u.id, LENGTH(u.firstname) as fn_len from User u where u.lastname like ?1%")
  List<Object[]> findByAsArrayAndSort(String lastname, Sort sort);
}

repo.findByAndSort("lannister", Sort.by("firstname"));// 1               
repo.findByAndSort("stark", Sort.by("LENGTH(firstname)"));// 2            
repo.findByAndSort("targaryen", JpaSort.unsafe("LENGTH(firstname)"));// 3 
repo.findByAsArrayAndSort("bolton", Sort.by("fn_len"));// 4  

~~~

1. 有效
2. 无效
3. 有效
4. 有效，指向别名



**别名传参：**

~~~java
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("select u from User u where u.firstname = :firstname or u.lastname = :lastname")
  User findByLastnameOrFirstname(@Param("lastname") String lastname,
                                 @Param("firstname") String firstname);
}

~~~



**SpEL 表达式：**

~~~java
@Entity
public class User {

  @Id
  @GeneratedValue
  Long id;

  String lastname;
}

public interface UserRepository extends JpaRepository<User,Long> {

  @Query("select u from #{#entityName} u where u.lastname = ?1")
  List<User> findByLastname(String lastname);
}

~~~



~~~java
@MappedSuperclass
public abstract class AbstractMappedType {
  …
  String attribute
}

@Entity
public class ConcreteType extends AbstractMappedType { … }

@NoRepositoryBean
public interface MappedTypeRepository<T extends AbstractMappedType>
  extends Repository<T, Long> {

  @Query("select t from #{#entityName} t where t.attribute = ?1")
  List<T> findAllByAttribute(String attribute);
}

public interface ConcreteRepository
  extends MappedTypeRepository<ConcreteType> { … }

~~~



~~~java
@Query("select u from User u where u.firstname = ?1 and u.firstname=?#{[0]} and u.emailAddress = ?#{principal.emailAddress}")
List<User> findByFirstnameAndCurrentUserWithCustomQuery(String firstname);

~~~

?#{[0]}表示获取这个方法的第一个参数

?#{principal.emailAddress}表示获取SpringSecurity中登录用户的邮箱



~~~java
@Query("select u from User u where u.lastname like %:#{[0]}% and u.lastname like %:lastname%")
List<User> findByLastnameWithSpelExpression(@Param("lastname") String lastname);

// sql注入问题
~~~



**转义%、_模糊查询通配符：**

~~~java
@Query("select u from User u where u.firstname like %?#{escape([0])}% escape ?#{escapeCharacter()}")
List<User> findContainingEscaped(String namePart);

~~~



**声明更新语句：**

~~~java
@Modifying
@Query("update User u set u.firstname = ?1 where u.lastname = ?2")
int setFixedFirstnameFor(String firstname, String lastname);

~~~



**声明删除语句：**

~~~java
interface UserRepository extends Repository<User, Long> {

  void deleteByRoleId(long roleId);

  @Modifying
  @Query("delete from User u where u.role.id = ?1")
  void deleteInBulkByRoleId(long roleId);
}

~~~



## 4、EntityManager

在 Spring Data JPA 中，EntityManager 是用于与持久化上下文交互的关键接口之一。它提供了对持久化操作的管理和执行能力。下面是 EntityManager 的几个主要作用：

1. 实体管理：EntityManager 负责管理实体对象的生命周期，包括实体对象的创建、加载、持久化、合并和删除等操作。它允许你对实体进行增删改查操作，以及对实体对象的属性进行修改和跟踪。
2. 持久化操作：EntityManager 提供了持久化操作的方法，如 persist()、merge()、remove() 等。你可以使用 EntityManager 将实体对象持久化到数据库中，从数据库中加载实体对象，更新实体对象的状态，以及删除实体对象。
3. 事务管理：EntityManager 支持事务管理，你可以通过 EntityManager 开启、提交或回滚事务，以保证数据的一致性和完整性。它与 Spring 的事务管理机制集成，可以与 Spring 的事务注解或编程式事务管理一起使用。
4. 查询操作：EntityManager 提供了创建和执行查询的能力。你可以使用 EntityManager 创建 JPQL（Java Persistence Query Language）查询、本地 SQL 查询或命名查询，并对查询结果进行处理和操作。
5. 缓存管理：EntityManager 管理实体对象的缓存，提供了一级缓存（即持久化上下文）的功能。通过 EntityManager，你可以控制实体对象的缓存策略、清除缓存、刷新缓存等操作，以提高查询性能和减少数据库访问。

总之，EntityManager 在 Spring Data JPA 中起着关键作用，用于管理实体对象的生命周期、执行持久化操作、处理事务、执行查询和管理缓存等。它是与底层数据库交互的核心接口，为应用程序提供了便捷的持久化操作和管理功能。





## 5、Sping的Transactin事务失效场景

### 5.1、场景一

~~~java
@Transaction
public boolean method1(boolean flag){
   
    if(flag){
        // 递归调用之前的逻辑
        // 递归调用的数据写入操作
        boolean resultFlag = method1(false);
        if(!resultFlag){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }else{
        // 递归调用执行逻辑
        // 数据写入数据库
        // return保持false，保证手动事务回滚代码必须执行
        return false;
    }
   return true;
}

public boolean testMethod1(){
    return method1(true);
}

@Transaction
public boolean method2(){
    
    // 执行数据写入
    // 手动抛出运行时异常
    
    return true;
}

public boolean testMethod2(){
    return method2();
}

~~~

直接调用method1方法测试事务是否被成功管理，没有问题。

通过testMethod1方法间接调用method1方法会导致整个事务都失效，可以通过端点测试，发现只要执行了数据写入操作，数据已经到数据库能够看见。

testMethod2()这种执行也会导致method2中方法事务失效。

一个没有被 `@Transactional` 注解修饰的方法调用了一个被 `@Transactional` 注解修饰的方法，事务就会失效。这是因为事务的增强是通过 AOP 实现的，AOP 是基于代理的。当一个没有被 `@Transactional` 注解修饰的方法调用了一个有事务注解的方法时，实际上是通过同一个对象的方法调用，并没有经过代理。因此，事务增强不会触发，也就是说，没有事务将被创建，被调用方法（B）将在其自己的事务范围内执行，而不会受到调用方法（A）事务的影响。

两种解决方式：

1. 调用`@Transaction`注解的方法处加上`@Transaction`注解。
2. 该方法注入自己这个对象，调用`@Transaction`修饰的方法时，通过注入的对象调用。



### 5.2、场景二

事务隔离级别失效。

~~~java
@Transactional(rollbackFor = Exception.class)
public boolean method1(boolean flag){
    try {
        // this 调用，并没有执行事务的 AOP 机制，传播级别失效
        // 最终 testMethod1 发送方法异常前的写入操作，执行成功
        this.testMethod1();
    } catch (Exception e) {
        
    }
   	return true;
}

@Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
public boolean testMethod1(){
    // ... 数据写入操作
    // 业务原因抛出异常，要回滚新的事务
    throw new Exception("")
	return true;
}

~~~

