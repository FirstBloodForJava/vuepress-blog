# Spring事务管理

## 配置文件

~~~yml
spring:
  datasource:
    druid:
      username: username
      password: password
      url: jdbc:oracle:thin:host@port:1521/schema
      initial-size: 4
      min-idle: 4
      max-active: 30
      max-wait: 60000
      time-between-eviction-runs-millis: 60000
      min-evictable-idle-time-millis: 300000
      validation-query: select 1 from dual
      test-while-idle: true
      test-on-borrow: false
      test-on-return: false
      pool-prepared-statements: true
      max-pool-prepared-statement-per-connection-size: 30
      use-global-data-source-stat: true
      stat-view-servlet:
        enabled: true
      driver-class-name: oracle.jdbc.OracleDriver
  jpa:
    show-sql: true
    #org.hibernate.dialect.MySQL8Dialect
    database-platform: org.hibernate.dialect.MySQLDialect
    open-in-view: true
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
server:
  port: 8080

~~~







## JPA@Query修改数据死锁

修改同一种数据，顺序不同。一个是先修改头，再修改体；另一个是先修改体，再修改头。

![image-20231106160229745](http://47.101.155.205/image-20231106160229745.png)

![image-20231106160326558](http://47.101.155.205/image-20231106160326558.png)

### controller

~~~java
@RestController
public class OracleController {

    @Autowired
    OracleService oracleService;

    @GetMapping("/deadLock/transaction/C/{flag}")
    public String deadLockTransactionC(@PathVariable("flag") Integer id){

        oracleService.deadLockTransactionC(id);

        return "null";
    }
    @GetMapping("/deadLock/transaction/D/{flag}")
    public String deadLockTransactionD(@PathVariable("flag") Integer id){

        oracleService.deadLockTransactionD(id);
        return "null";
    }
}

~~~



### service

~~~java
@Component
public class OracleServiceImpl implements OracleService {

    @Autowired
    BusinessBscListDao businessBscListDao;

    @Autowired
    BusinessDtListDao businessDtListDao;

    private final Log log = LogFactory.getLog(this.getClass());

    @Override
    @Transactional
    public void deadLockTransactionC(Integer id) {

        log.info("C 表头保存");
        businessBscListDao.updateByIdC(id);
        try{
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        log.info("C 表体保存");
        businessDtListDao.updateByPidC(id);

    }

    @Override
    @Transactional
    public void deadLockTransactionD(Integer id) {
        log.info("D 表体保存");
        businessDtListDao.updateByPidD(id);
        try{
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        log.info("D 表头保存");
        businessBscListDao.updateByIdD(id);
    }
}

~~~



### dao

~~~java
public interface BusinessBscListDao extends JpaRepository<BusinessBscListEntity, Integer> {

    @Transactional
    @Modifying
    @Query(value = "update BUSINESS_BSC_LIST set trade_code = '123' where id = ?1", nativeQuery = true)
    Integer updateByIdC(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update BUSINESS_BSC_LIST set trade_name = '一' where id = ?1", nativeQuery = true)
    Integer updateByIdD(Integer id);
}

~~~



~~~java
public interface BusinessDtListDao extends JpaRepository<BusinessDtListEntity, Integer> {

    @Transactional
    @Modifying
    @Query(value = "update BUSINESS_DT_LIST set gdecd = '123' where pid = ?1", nativeQuery = true)
    Integer updateByPidC(Integer pid);

    @Transactional
    @Modifying
    @Query(value = "update BUSINESS_DT_LIST set gds_nm = '一' where pid = ?1", nativeQuery = true)
    Integer updateByPidD(Integer pid);
}

~~~



### 原因

开启事务修改数据，执行修改语句(UPDATE)，为命中的数据加上**排他锁(SELECT ... FOR UPDATE)**。由于两个事务各自获取自己锁的一部分，所以导致了死锁。

相当于下面的模拟情况：

![image-20250607123709078](http://47.101.155.205/image-20250607123709078.png)



## JpaRepository的save保存

![image-20231106164334304](http://47.101.155.205/image-20231106164334304.png)

**使用save方法保存，在不人为制造睡眠的情况下，很少出现死锁的情况。**

但是如果再第一个线程save之后再睡眠几秒，就会出现死锁问题（还是同样的原因）。

![image-20231106172109915](http://47.101.155.205/image-20231106172109915.png)

Hibernate执行的sql日志可以看出，执行save方法后，会执行`update SQL`在事务未提交的情况下，这里死锁情况同手写update SQL的情况。

![image-20231107090347953](http://47.101.155.205/image-20231107090347953.png)

### controller

~~~java
@RestController
public class OracleController {

    @Autowired
    OracleService oracleService;

    @GetMapping("/deadLock/transaction/A/{flag}")
    public String deadLockTransactionA(@PathVariable("flag") Integer id){

        oracleService.deadLockTransactionA(id);

        return "null";
    }
    @GetMapping("/deadLock/transaction/B/{flag}")
    public String deadLockTransactionB(@PathVariable("flag") Integer id){

        oracleService.deadLockTransactionB(id);
        return "null";
    }
}

~~~



### service

~~~java
@Component
public class OracleServiceImpl implements OracleService {

    @Autowired
    BusinessBscListDao businessBscListDao;

    @Autowired
    BusinessDtListDao businessDtListDao;

    private final Log log = LogFactory.getLog(this.getClass());

    private Gson gson = new Gson();

    @Override
    @Transactional
    public void deadLockTransactionA(Integer id) {
        BusinessBscListEntity bscModel = businessBscListDao.getById(id);
        if (bscModel == null) {
            return;
        }
        bscModel.setTradeCode("123");
        businessBscListDao.save(bscModel);
        log.info("A 表头保存");

        try{
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        List<BusinessDtListEntity> dtModelList = businessDtListDao.getByPid(id);
        if (dtModelList.isEmpty()){
            return;
        }
        BusinessDtListEntity dtModel = dtModelList.get(0);
        dtModel.setGdecd("123");
        businessDtListDao.save(dtModel);
        log.info("A 表体保存");
    }

    @Override
    @Transactional
    public void deadLockTransactionB(Integer id) {
        List<BusinessDtListEntity> dtModelList = businessDtListDao.getByPid(id);
        if (dtModelList.isEmpty()){
            return;
        }
        BusinessDtListEntity dtModel = dtModelList.get(0);
        dtModel.setGdsNm("一");
        businessDtListDao.save(dtModel);
        log.info("B 表体保存");

        try{
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        BusinessBscListEntity bscModel = businessBscListDao.getById(id);
        if (bscModel == null) {
            return;
        }
        bscModel.setTradeName("一");
        businessBscListDao.save(bscModel);
        log.info("B 表头保存");
    }
}

~~~





### dao

~~~java
public interface BusinessBscListDao extends JpaRepository<BusinessBscListEntity, Integer> {

    @Query(value = "select * from BUSINESS_BSC_LIST where id = ?1", nativeQuery = true)
    BusinessBscListEntity getById(Integer id);
    
}

~~~

~~~java
public interface BusinessDtListDao extends JpaRepository<BusinessDtListEntity, Integer> {

    @Query(value = "select * from BUSINESS_DT_LIST where pid = ?1",nativeQuery = true)
    List<BusinessDtListEntity> getByPid(Integer pid);

}

~~~







## @Query默认加入事务

@Transactional注解开启事务，使用默认事务传播隔离级别`REQUIRED`。在Service开启事务，执行dao查询出现异常，异常不Service方法捕获，Service方法结束提交事务。由于dao执行出现，导致最初开启的事务被标记回滚，所以出现方法结束事务提交报错。

可以得出`@Query`在有事务的情况下会默认加入此事务。

![image-20231106160055695](http://47.101.155.205/image-20231106160055695.png)

### controller

~~~java
@RestController
public class OracleController {

    @Autowired
    OracleService oracleService;

    @GetMapping("/transactionException/{flag}")
    public String transactionException(@PathVariable("flag") Integer id){

        oracleService.transactionException(id);

        return "null";
    }
}

~~~



### service

~~~java
@Component
public class OracleServiceImpl implements OracleService {

    @Autowired
    BusinessBscListDao businessBscListDao;

    @Autowired
    UserService userService;

    private final Log log = LogFactory.getLog(this.getClass());


    @Override
    @Transactional
    public void transactionException(Integer id) {

        businessBscListDao.updateByIdC(id);
        try{
            List<User> all = userService.getAll1();
        }catch (Exception e){
            System.out.println(e);
            log.error(e);
        }
        System.out.println("执行结束");

    }
}

~~~

~~~java
@Component
public class UserServiceImpl implements UserService {


    @Autowired
    private UserDao userDao;
   
    @Override
    public List<User> getAll1() {
        return userDao.getAll();
    }
}

~~~



### dao

~~~java
public interface BusinessBscListDao extends JpaRepository<BusinessBscListEntity, Integer> {

    @Transactional
    @Modifying
    @Query(value = "update BUSINESS_BSC_LIST set trade_code = '123' where id = ?1", nativeQuery = true)
    Integer updateByIdC(Integer id);
}

~~~

~~~java
public interface UserDao extends JpaRepository<User,Integer> {
	// 表users不存在
    @Query(value = "select * from users",nativeQuery = true)
    List<User> getAll();
}

~~~

