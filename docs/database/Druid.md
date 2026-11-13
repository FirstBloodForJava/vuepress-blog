# Druid

## 基础连接配置

| 配置项                        | 作用说明                                          | 默认值            |
| ----------------------------- | ------------------------------------------------- | ----------------- |
| `url`                         | 数据库连接 URL，不同数据库格式不同                | 无                |
| `username`                    | 数据库登录用户名                                  | 无                |
| `password`                    | 数据库登录密码                                    | 无                |
| `driverClassName`             | JDBC 驱动类名；不配置时 Druid 会根据 URL 自动识别 | 根据 URL 自动识别 |
| `dbType`                      | 数据库类型，如 mysql、oracle、postgresql 等       | 根据 URL 自动识别 |
| `defaultAutoCommit`           | 连接默认是否自动提交                              | 驱动默认值        |
| `defaultReadOnly`             | 连接默认是否只读                                  | 驱动默认值        |
| `defaultTransactionIsolation` | 连接默认事务隔离级别                              | 驱动默认值        |
| `defaultCatalog`              | 默认 catalog                                      | 无                |



## 连接池容量配置

| 配置项               | 作用说明                                      | 默认值       |
| -------------------- | --------------------------------------------- | ------------ |
| `initialSize`        | 初始化时创建的物理连接数                      | 0            |
| `maxActive`          | 连接池中最大活跃连接数                        | 8            |
| `minIdle`            | 连接池中最小空闲连接数                        | 0            |
| `maxIdle`            | 已废弃，配置无效                              | 8            |
| `maxWait`            | 获取连接最大等待时间（毫秒），-1 表示无限等待 | -1           |
| `maxWaitThreadCount` | 等待连接的最大线程数，超出则报错              | -1（不限制） |
| `useUnfairLock`      | 是否使用非公平锁，true 性能更高               | true         |





## 连接有效性检测配置

| 配置项                       | 作用说明                                       | 默认值           |
| ---------------------------- | ---------------------------------------------- | ---------------- |
| `validationQuery`            | 检测连接有效性的 SQL 语句，如 `SELECT 1`       | 无               |
| `validationQueryTimeout`     | 检测 SQL 执行超时时间（秒）                    | -1               |
| `testOnBorrow`               | 获取连接时是否检测有效性；开启会降低性能       | false            |
| `testOnReturn`               | 归还连接时是否检测有效性；开启会降低性能       | false            |
| `testWhileIdle`              | 空闲时是否检测连接有效性；推荐开启             | true             |
| `keepAlive`                  | 是否对空闲连接发送心跳保活，维持连接有效       | false            |
| `keepAliveBetweenTimeMillis` | 两次心跳保活之间的间隔时间（毫秒）             | 120000（2 分钟） |
| `phyTimeoutMillis`           | 物理连接最大存活时间（毫秒），超时强制关闭重建 | -1（不限制）     |
| `phyMaxUseCount`             | 物理连接最大使用次数，达到后强制关闭重建       | -1（不限制）     |



## 连接回收配置

| 配置项                          | 作用说明                                                     | 默认值             |
| ------------------------------- | ------------------------------------------------------------ | ------------------ |
| `timeBetweenEvictionRunsMillis` | 空闲连接回收线程运行间隔（毫秒）                             | 60000（1 分钟）    |
| `minEvictableIdleTimeMillis`    | 连接最小空闲时间，超过可被回收（毫秒）                       | 1800000（30 分钟） |
| `maxEvictableIdleTimeMillis`    | 连接最大空闲时间，超过强制回收（毫秒）                       | 25200000（7 小时） |
| `numTestsPerEvictionRun`        | 每次回收线程检测的连接数量                                   | 3                  |
| `removeAbandoned`               | 是否开启泄露连接回收（长时间未归还的连接）。开启徐考虑是否有超过该事件的事务 | false              |
| `removeAbandonedTimeout`        | 连接借出后超过该时间（秒）判定为泄露并回收                   | 300                |
| `logAbandoned`                  | 回收泄露连接时是否打印堆栈日志                               | false              |
| `abandonWhenPercentageFull`     | 连接池使用达到该百分比才触发泄露检测                         | 0                  |





## StatFilter 监控统计配置

| 配置项                 | 作用说明                                                  | 默认值 |
| ---------------------- | --------------------------------------------------------- | ------ |
| `filters`              | 启用的过滤器列表，逗号分隔，如 `stat,wall,slf4j`          | 无     |
| `connectionProperties` | 通过连接属性配置过滤器参数，如 `druid.stat.mergeSql=true` | 无     |
| `mergeSql`             | 是否合并相同结构 SQL 的统计数据                           | false  |
| `slowSqlMillis`        | 慢 SQL 阈值（毫秒），超过则记为慢 SQL                     | 3000   |
| `logSlowSql`           | 是否将慢 SQL 输出到日志                                   | false  |
| `stat.sql.MaxSize`     | SQL 统计集合的最大容量                                    | 2000   |
| `resetStatEnable`      | 是否允许通过监控页面重置统计数据                          | true   |





## WallFilter SQL 防火墙配置

### 开关

| 配置项                | 作用说明                               | 默认值 |
| --------------------- | -------------------------------------- | -----: |
| `wall.logViolation`   | 违规 SQL 是否输出 ERROR 级别日志       |  false |
| `wall.throwException` | 违规 SQL 是否抛出 SQLException         |   true |
| `wall.dbType`         | 数据库类型，如 mysql、oracle；必须指定 |  sql92 |



### DML 语句控制

| 配置项                             | 作用说明                  | 默认值 |
| ---------------------------------- | ------------------------- | ------ |
| `wall.config.selectAllow`          | 是否允许 SELECT 语句      | true   |
| `wall.config.selectAllColumnAllow` | 是否允许 `SELECT *`       | true   |
| `wall.config.selectIntoAllow`      | 是否允许 SELECT INTO      | true   |
| `wall.config.insertAllow`          | 是否允许 INSERT 语句      | true   |
| `wall.config.updateAllow`          | 是否允许 UPDATE 语句      | true   |
| `wall.config.deleteAllow`          | 是否允许 DELETE 语句      | true   |
| `wall.config.mergeAllow`           | 是否允许 MERGE 语句       | true   |
| `wall.config.callAllow`            | 是否允许存储过程调用 CALL | true   |





### DDL 语句控制

| 配置项                         | 作用说明                | 默认值 |
| ------------------------------ | ----------------------- | ------ |
| `wall.config.createTableAllow` | 是否允许 CREATE TABLE   | true   |
| `wall.config.alterTableAllow`  | 是否允许 ALTER TABLE    | true   |
| `wall.config.dropTableAllow`   | 是否允许 DROP TABLE     | true   |
| `wall.config.truncateAllow`    | 是否允许 TRUNCATE       | true   |
| `wall.config.commentAllow`     | 是否允许 SQL 中包含注释 | false  |

### 其他安全规则

| 配置项                                 | 作用说明               | 默认值 |
| -------------------------------------- | ---------------------- | ------ |
| `wall.config.multiStatementAllow`      | 是否允许多语句执行     | false  |
| `wall.config.noneBaseStatementAllow`   | 是否允许非基础语句     | false  |
| `wall.config.intersectAllow`           | 是否允许 INTERSECT     | true   |
| `wall.config.minusAllow`               | 是否允许 MINUS         | true   |
| `wall.config.unionAllow`               | 是否允许 UNION         | true   |
| `wall.config.alwaysAllowFullTableScan` | 是否始终允许全表扫描   | true   |
| `wall.config.schemaCheck`              | 是否检测表、列是否存在 | false  |





## 监控页面（StatViewServlet）配置

| 配置项                             | 作用说明                               | 默认值         |
| ---------------------------------- | -------------------------------------- | -------------- |
| `stat-view-servlet.enabled`        | 是否启用内置监控页面                   | false          |
| `stat-view-servlet.url-pattern`    | 监控页面访问路径                       | `/druid/*`     |
| `stat-view-servlet.login-username` | 监控页面登录用户名                     | 无             |
| `stat-view-servlet.login-password` | 监控页面登录密码                       | 无             |
| `stat-view-servlet.allow`          | 允许访问的 IP 白名单，逗号分隔         | 无（全部允许） |
| `stat-view-servlet.deny`           | 禁止访问的 IP 黑名单，优先级高于 allow | 无             |
| `stat-view-servlet.reset-enable`   | 是否允许在页面上重置统计数据           | true           |



## Web 应用过滤器（WebStatFilter）配置

| 配置项                                   | 作用说明                        | 默认值                                        |
| ---------------------------------------- | ------------------------------- | --------------------------------------------- |
| `web-stat-filter.enabled`                | 是否启用 Web 统计过滤器         | false                                         |
| `web-stat-filter.url-pattern`            | 过滤器拦截路径                  | `/*`                                          |
| `web-stat-filter.exclusions`             | 排除的静态资源路径              | `*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*` |
| `web-stat-filter.session-stat-enable`    | 是否开启 Session 统计           | true                                          |
| `web-stat-filter.session-stat-max-count` | Session 统计最大数量            | 1000                                          |
| `web-stat-filter.principal-session-name` | 从 Session 中获取用户名的属性名 | 无                                            |
| `web-stat-filter.principal-cookie-name`  | 从 Cookie 中获取用户名的属性名  | 无                                            |
| `web-stat-filter.profile-enable`         | 是否开启单个 URL 调用监控       | true                                          |





## 缓存与性能优化配置

| 配置项                                      | 作用说明                                 | 默认值 |
| ------------------------------------------- | ---------------------------------------- | ------ |
| `poolPreparedStatements`                    | 是否缓存 PreparedStatement（PSCache）    | false  |
| `maxPoolPreparedStatementPerConnectionSize` | 每个连接上 PSCache 的最大数量            | -1     |
| `maxOpenPreparedStatements`                 | PSCache 总最大数量（旧参数，不推荐）     | -1     |
| `poolingCount`                              | 当前池中空闲连接数（运行时指标，非配置） | -      |
| `sharePreparedStatements`                   | 是否在连接间共享 PSCache                 | false  |



## 超时与异常处理配置



| 配置项                          | 作用说明                             | 默认值      |
| ------------------------------- | ------------------------------------ | ----------- |
| `queryTimeout`                  | 查询执行超时时间（秒）               | 0（不限制） |
| `transactionQueryTimeout`       | 事务中查询的超时时间（秒）           | 0           |
| `breakAfterAcquireFailure`      | 获取连接失败后是否立即中断，不再重试 | false       |
| `connectionErrorRetryAttempts`  | 获取连接失败后的重试次数             | 1           |
| `timeBetweenConnectErrorMillis` | 连接出错后重试间隔（毫秒）           | 500         |
| `failFast`                      | 快速失败模式，初始化失败直接抛异常   | false       |
| `notFullTimeoutRetryCount`      | 连接池未满时获取连接超时的重试次数   | 0           |





## 其他高级配置

| 配置项                     | 作用说明                                                 | 默认值     |
| -------------------------- | -------------------------------------------------------- | ---------- |
| `asyncInit`                | 是否异步初始化连接池                                     | false      |
| `init`                     | 是否在创建 Bean 时自动初始化连接池                       | false      |
| `closeConnectionRetry`     | 关闭连接失败时的重试次数                                 | 0          |
| `dupCloseLogEnable`        | 重复关闭连接是否打印日志                                 | false      |
| `useLocalSessionState`     | 是否使用本地 Session 状态优化                            | 驱动默认值 |
| `useLocalTransactionState` | 是否使用本地事务状态优化                                 | 驱动默认值 |
| `filters`                  | 过滤器链，常用组合：`stat,wall,slf4j`、`stat,wall,log4j` | 无         |
| `proxyFilters`             | 自定义代理过滤器列表                                     | 无         |