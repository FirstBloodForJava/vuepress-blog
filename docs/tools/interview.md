

## HashMap 源码介绍

key 的 hash 是根据 `HashMap` 容量减 1 进行与运算（&），所以要想更均匀的映射，二进制中就需要更多的 1。

这也是为什么初始化计算  `threshold ` 进行以下操作的原因：保证数组中有更多的的 1。

~~~java
int n = cap - 1;
n |= n >>> 1;
n |= n >>> 2;
n |= n >>> 4;
n |= n >>> 8;
n |= n >>> 16;
~~~

put 逻辑：

- tab[(key.hash & tab.length - 1)] == null, 在原 hash 表中不存在，直接存
- tab[(key.hash & tab.length - 1)] != null, 但是 key 相等，修改元素
- 普通链表中查找元素，存在则修改，不存在则添加，当前链表中数量大于等于 7(TREEIFY_THRESHOLD - 1)，将单向链表先转换成双向链表(TreeNode)，将链表红黑树化。

hash 表会在两种情况下扩容：初始化，容量超阈值。容量达到 2 ^ 30 时，不会扩容。

扩容逻辑：

- 当前节点没有子节点，移动到 (hash & newTab.length - 1)；
- 节点不是 TreeNode，调整老数组链表结构：
  - `(hash & oldTab.length) == 0 => hash & 10000` 和高位没有交集，该 key 可以落在低位 hash 表
  - `(hash & oldTab.length) == 1`  意味着和高位有交集，该 key 需要调整索引，新的索引就是当前 index + oldTab.length 
- 节点是红黑树，则对红黑树进行调整



## JUC

### 锁



## JVM 调优

思路：可参考现有开源项目的 GC 参数来调整自己的应用参数。





## 分布式事务

### TCC

TCC(Try Confirm Cancel)，在 TCC 模式中，由事务协调器（Transaction Coordinator）来通知各个参与服务（微服务）执行 Confirm、Cancel。

在 Seata 框架中，这个协调器就是 Seata Server，也称 TC。事务发起方会通过 Seata 的全局事务注解 `@GlobalTransactional` 开启一个全局事务注解，并注册到 Seata Server 中。同时在 Try 阶段，发起方会将全局唯一事务 ID 发生给调用方，被调用方会向 Seata Server注册分支事务。Try 全部调用成功，事务发起方会通知 Seata Server 提交全局事务，随后 Seata Server 会向各个参与方发送 Confirm 请求。如果 Try 阶段有任何一个参与方失败，事务发起方会通知 Seata Server 回滚全局事务，然后 Seata Server 会向各个参与方发送 Cancel 请求。

由于网络波动，Confrim 和 Cancel 请求需要保证幂等性。

1. 数据库乐观锁：通过版本号或状态字段来控制，更新数据时，先检查版本号或状态。
2. 全局事务唯一 id：每次执行前先检查这个全局事务唯一 id 是否已经被使用。
3. 状态机：和乐观锁状态字段类似。



## TiDB



## ClickHouse

