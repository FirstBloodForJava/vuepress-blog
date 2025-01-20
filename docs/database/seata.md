## 1.什么是Seata

官网：https://seata.io/zh-cn/index.html

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。在 Seata 开源之前，其内部版本在阿里系内部一直扮演着应用架构层数据一致性的中间件角色，帮助经济体平稳的度过历年的双11，对上层业务进行了有力的技术支撑。经过多年沉淀与积累，其商业化产品先后在阿里云、金融云上售卖。2019.1 为了打造更加完善的技术生态和普惠技术成果，Seata 正式宣布对外开源，未来 Seata 将以社区共建的形式帮助用户快速落地分布式事务解决方案。



## 2.什么是分布式事务

分布式事务是指事务的参与者、支持事务的服务器、资源服务器以及事务管理器分别位于不同的分布式系统的不同节点之上。

事务的4个属性ACID：原子性、一致性、隔离性、持久性。

CAP定理：在一个分布式系统中，C(一致性)、A(可用性)、P(分区容忍性)者三个特性最多只能同时实现两点，不可能三者兼顾。

BASE理论是对 CAP 中的一致性和可用性进行一个权衡的结果，理论的核心思想就是：我们无法做到强一致，但每个应用都可以根据自身的业务特点，采用适当的方式来使系统达到最终一致性。

Basically Avaliable(基本可用)

Soft state(软状态)

Eventually consistent(最终一致性)



## 3.分布式事务解决方案

1. 两阶段提交(2PC)
2. 三阶段提交(3PC)
3. 补偿事务(TCC Try-Confirm-Cancel)
4. 本地消息队列表(MQ)

### 二阶段提交

二阶段提交就是两个阶段提交：第一阶段询问各个事务数据源是否准备好。第二阶段才真正将数据提交给事务数据源。为了保证事务可以满足ACID，就要引入一个协调者(Cooradinator)，其他的节点被称为参与者(Participant)。协调者负责调度参与者的行为，并最终决定这些参与者是否要把事务进行提交。

`阶段一：`协调者向所有参与者发送事务内容，询问是否可以提交事务，并等待答复。各参与者执行事务操作，将undo和redo信息记入事务日志中(但是不提交事务)。如果参与者提交成功，给协调者反馈yes，否则反馈no。

`阶段二：`如果协调者收到了参与者的失败消息或者超时，之间给每个参与者发送回滚(rollback)消息，否则发送提交(commit)消息。

事务执行的两种情况：

`情况1：`当所有参与者都反馈yes，提交事务。协调者向所有的参与者发送正式提交事务的请求。参与者执行commit，并释放整个事务期间占用的资源。各参与者向协调者反馈ack完成的消息。协调者收到所有参与者的ack消息后，表示事务完成。

`情况2：`当有一个参与者反馈no，回滚事务。协调者向所有参与者发出回滚请求。参与者使用阶段1中的undo信息执行回滚操作，并且释放事务期间占用的资源。各参与者向协调者反馈ack完成的消息。协调者收到所有参与者反馈的ack消息后，表示事务完成。



`缺点：`

1. 性能问题：所有参与者在事务提交阶段处于同步阻塞状态，占用系统资源，性能出现瓶颈。
2. 可靠性问题：如果协调者存在单点故障问题，或出现故障，提供者将一致处于锁定状态。
3. 数据一致性问题：在阶段2中，如果出现协调者和参与者都挂掉的情况，有可能导致数据不一致。
4. 实现复杂，牺牲了可用性，对性能影响较大，不适合高并发场景。

`优点：`

1. 尽量保证了数据的强一致性



### 三阶段提交

三阶段提交是在二阶段提交上进行改进，最关键要解决的是协调者和参与者同时挂掉的问题，所以3PC把2PC的准备阶段再次一分为二，实现三阶段提交。

`阶段一：`协调者向所有参与者发出包含事务内容的canCommit请求，询问是否可以提交事务，并等待所有参与者答复。参与者收到canCommit请求后，如果认为是可执行事务操作，则反馈yes并进入预备状态，否则反馈no。

`阶段二：`协调者根据参与者响应情况，有以下两种可能

情况1：所有参与者均反馈yes，协调者预执行事务。协调者向所有参与者发出preCommit请求，进入准备阶段。参与者收到preCommit请求后，执行事务操作，将undo和redo信息计入事务日志中(但不提交事务)。各参与者向协调者反馈ack响应或者no响应，并等待最终指令。

情况2：只要有一个参与者反馈反馈no或等待超时后协调者并且没有收到提供者的反馈，即中断事务。协调者向所有参与者发出abort请求。协调者收到abort请求，或者等待协调者请求过程出现超时，参与者均会中带你事务。

`阶段三：`该阶段才是真正的事务提交，也可分为两种情况

情况1：所有参与者均反馈ack响应，执行真正的事务提交。如果协调者处于工作状态，向所有参与者发出doCommit请求。参与者收到doCommit请求后，会正式执行事务提交，并释放整个事务期间占用的资源。各参与者向协调者反馈ack完成的消息。协调走收到所有参与者反馈的ack消息后，即事务完成。

情况2：只要有一个参与者反馈no，或者等待超时后协调走并没有收到提供者的反馈，即回滚事务。如果协调走处于工作状态，向所有参与者发出rollback请求。参与者使用阶段一中的undo信息执行回滚操作，并且十分事务期间占用的资源。各参与者向协调者反馈ack完成的消息。协调者收到所有参与者反馈的ack消息，即完成了事务回滚。



`优点：`

相比二阶段提交，三阶段提交降低了阻塞范围，在等待超时后协调者或参与者会中断事务。避免了协调者单点问题。阶段三中协调者出现问题时，参与者会继续提交事务。



`缺点：`

数据不一致问题依然存在，正在参与者收到preCommit请求后等待doCommit指令时，此时如果协调者请求中断事务，而协调者无法与参与者正常通信，会导致参与者继续条件事务，造成数据不一致问题。



### 补偿事务(TCC Try-confirm-cancel)

TCC其实就是采用的补偿机制，其核心思想是：针对每个操作，都要注册一个与其对应的确认和补偿操作。

执行步骤：Try阶段主要对业务系统做检测及资源预留。confirm阶段主要是对业务系统做确认提交，Try阶段执行成功并开始执行Confirm阶段时，默认Confrim阶段是不会出错的。Cancel阶段主要是业务执行错误，需要回滚的状态下执行的业务取消，预留资源释放。



`优点：`

1. 性能提升：具体业务来实现控制资源锁的粒度变小
2. 数据最终一致性：基于Confirm和Cancel的幂等性，保证事务最终完成确认或者取消，保证数据的一致性。
3. 可靠性：解决了XA协议的协调者单点故障问题，由主页午发起并控制业务活动，业务活动管理器也变成了多点，引入集群。



`缺点：`

TCC的Try、Confirm、Cancel操作要根据具体业务功能来实现，业务耦合度较高，提高了开发成本。



## 4.Seata分布式解决方案

### 4.1、AT



### 4.2、TCC



### 4.3、SAGA



### 4.4、XA






