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







## @Query修改数据死锁

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



## JpaRepository的save修改不造成死锁

![image-20231106164334304](http://47.101.155.205/image-20231106164334304.png)

代码同上面的逻辑的情况下，不会造成死锁信息，第一个线程提交的时候，另外一个线程已经获取了另外一个数据库资源的锁信息，但是第一个线程提交事务的时候，没有出现死锁问题。可是@Query的方式却出现了死锁。虽然没有出现死锁异常，但是却会出现数据丢失的问题。

但是如果再第一个线程save之后再睡眠几秒，就会出现死锁问题。

![image-20231106172109915](http://47.101.155.205/image-20231106172109915.png)

通过model里面的信息，发现，第二个线程在获取到第一个线程表体资源的情况下，在后面获取表头资源的时候，已经查询到第一个线程修改的列的信息了，说明第一个线程在第二个线程获取到锁资源的情况下能够提交事务，但是没有造成死锁。

如果将第一个线程睡眠几秒，则会出现死锁情况，这里是

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







## @Query加入事务

@Transactional注解事务默认事务传播隔离级别，dao查询开启事务，dao查询出现异常，被回滚，导致查询开启的事务被回滚，所以出现方法结束事务提交报错。

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

