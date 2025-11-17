# 数据结构

[题单来源](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)



数据结构可以分为两大类：

- 线性结构：数据元素之间是一对一的关系。
- 非线性结构：数据元素之间存在一对多或多对多关系。

**线性结构：**

1. 数组：元素连续存储。支持随机访问O(1)；删除代价较高O(n)。
2. 链表：元素通过指针连接。访问慢O(n)；插入、删除效率高（O(1)，若已定位）。单向链表、双向链表、循环链表。
3. Hash表：数组+链表。时间复杂度O(1)，最坏O(n)。
4. 栈：先进后出。
5. 队列：先进先出。双端队列、优先队列、循环队列。

**非线性结构：**

1. 树：层级节点，每个节点最多只有一个父节点，多个子节点。二叉树、二叉搜索树（BST）；平衡二叉树（AVL）、红黑树；堆（大顶堆/小顶堆）；B树、B+树。
2. 图：节点和边的集合。



## 树

树是一种数据结构，它是由n(n≥0)个有限节点组成一个具有层次关系的集合。

每个节点有零个或多个子节点；没有父节点的节点称为根节点；每一个非根节点有且只有一个父节点；除了根节点外，每个子节点可以分为多个不相交的子树。

- 节点的度：一个节点含有子节点的数量
- 叶子节点或终端节点：度为零的节点
- 分支节点或非叶子节点：度不为零的节点
- 双亲节点或父节点：一个节点含有子节点，则这个节点为此节点的父节点
- 兄弟节点：具有相同父节点的节点互称兄弟节点
- 树的度：一棵树中，最大的节点的度称为树的度
- 节点的层次：从根节点算第一层，根的子节点为第二层，一次类推
- 树的高度或深度：树中节点的最大层次
- 堂兄弟节点：双亲在同一层级的节点
- 节点的祖先：从根到该节点所经分支上的所有节点
- 子孙：以一个节点为根的子树中的任一节点都称为该节点的子孙
- 森林：由m(m > 0)颗互不相交的树的集合称为森林



**树的种类：**

- 无序树：树种任意节点的子节点之间没有顺序关系。
- 有序树：树种任意节点的子节点之间有顺序关系。
- 二叉树：每个节点最多含有两个节点的树。
- 满二叉树：叶节点除外，所有的节点均含有两个节点。
- 完全二叉树：除最后一层外，所有层都是满节点，且最后一层缺右边连续节点的二叉树
- 哈夫曼树：带权路径最短的二叉树称为哈夫曼树或最优二叉树。





### 二叉树

二叉树是n个有限元素的集合，该集合为空、或者由一个根的元素和两个不相交的子树组成，是有序树。

二叉树(binary tree)是指树中节点的度不大于2的有序树，它是一种最简单且最重要的树。

二叉树的递归定义为：二叉树是一棵空树，或者是一棵由一个根节点和两棵互不相交的，分别称作根的左子树和右子树组成的非空树；左子树和右子树又同样都是二叉树。

集合为空时，二叉树也称为空二叉树，在二叉树中，每个元素也称为一个节点。

二叉树特点：每个节点最多只能有两颗子树组成，且有左右之分。

- 空二叉树
- 只有一个根节点的二叉树
- 只有左子树
- 只有右子树
- 完全二叉树





### 红黑树



### B-Tree

对于一棵m阶B-tree，每个结点至多可以拥有m个子结点。各结点的关键字和可以拥有的子结点数都有限制，规定m阶B-tree中，根结点至少有2个子结点，除非根结点为叶子节点(又称为终端节点，一棵树没有子节点，即度为0)，相应的，根结点中关键字的个数为1~m-1；非根结点至少有[m/2]（[]，向上取整）个子结点，相应的，关键字个数为[m/2]-1~m-1。

B-Tree中，每个节点包含：

- 本节点所含的关键字的个数；
- 指向父节点的指针；
- 关键字；
- 指向子节点的指针。



### B+Tree

其节点结构与B-tree相同，不同的是各结点的关键字和可以拥有的子结点数。如m阶B+树中，每个结点至多可以拥有m个子结点。非根结点至少有[m/2]个子结点，而关键字个数比B-tree多一个，为[m/2]~m。

B+和B-（即B）是因为每个结点上的关键字不同。一个多一个，一个少一个。



## 字典树

[字典树](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)



## 堆

[堆题单](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

堆(Heap)是一种基于树的数据结构，通常用于实现优先队列(最高效)。堆具有以下特性：

1. 堆的物理结构本质上是顺序存储的，是线性的(数组是线性的)。但在逻辑上不是线性的，是完全二叉树的这种逻辑储存结构
2. 堆序特性：堆是一个完全二叉树(除了最底层，其他层都是满的，最底层从左到右填入)；对于堆中的任一节点的值，都是不大于或不小于其父节点的值。即：![image-20240326141630209](http://47.101.155.205/image-20240326141630209.png)

自上而下堆化：

~~~java
void add(int e){
	if (size == queue.length - 1){
		// 扩容
		queue = Arrays.copyOf(queue, 2 * queue.length);
    }
	queue[++size] = e;
	fixedUp(size);
}

private void fixedUp(int k){
	// 写法一
	while (k > 1){
		int j = k >> 1;
		if (queue[j] <= queue[k]){
		// 小顶堆 i表示堆中数组下标,则满足queue[i] <= queue[2*i] queue[i] <= queue[2*i + 1]
		// 其中j表示的就是i
        	break;
    	}
    	int temp = queue[k];
		queue[k] = queue[j];
		queue[j] = temp;
        k = j;
    }
	// 写法二
	while (k > 1 && queue[k >> 1] > queue[k]){
        int temp = queue[k >> 1];
		queue[k >> 1] = queue[k];
		queue[k] = temp;
		k = k >> 1;
    }
}

~~~

移除堆顶元素：

~~~java
void removeTop(){
	queue[1] = queue[size];
    queue[size--] = 0;
    fixedDown(1);
}

private void fixedDown(int k){
    int j;
    while ((j = k << 1) <= size && j > 0){
        // 子节点中取出最小的比较
        if (j < size && queue[j] > queue[j+1]){
            j++;
        }
        // 直到父节点 小于等于 子节点的最小
        if (queue[k] <= queue[j]){
			break;
        }
        int temp = queue[j];
        queue[j] = queue[k];
        queue[k] = temp;
		k = j;
    }
}

~~~

**将数组堆化：**

~~~java
// size 为数组下标 1 开始的元素个数
void heapify(){
	for (int i = size/2; i >= 1; i--) {
        fixedDown(i);
    }
}

private void fixedDown(int k){
    int j;
    while ((j = k << 1) <= size && j > 0){
        // 子节点中取出最小的比较
        if (j < size && queue[j] > queue[j+1]){
            j++;
        }
        // 直到父节点 小于等于 子节点的最小
        if (queue[k] <= queue[j]){
			break;
        }
        int temp = queue[j];
        queue[j] = queue[k];
        queue[k] = temp;
		k = j;
    }
}

~~~



### Java 堆化

PriorityQueue 堆化小顶堆

~~~java
private void heapify() {
    final Object[] es = queue;
    // n >= 2时，非叶子节点数 n / 2，堆顶元素是 queue[0], 所以要 -1
    // 叶子节点范围 [(n >>> 1), n)
    int n = size, i = (n >>> 1) - 1;
    // 比较器
    final Comparator<? super E> cmp;
    if ((cmp = comparator) == null)
        for (; i >= 0; i--)
            // 以 当前 叶子
            siftDownComparable(i, (E) es[i], es, n);
    else
        for (; i >= 0; i--)
            siftDownUsingComparator(i, (E) es[i], es, n, cmp);
}

private static <T> void siftDownComparable(int k, T x, Object[] es, int n) {
    // 叶子节点
    Comparable<? super T> key = (Comparable<? super T>)x;
    int half = n >>> 1; // loop while a non-leaf 非叶子节点循环
    while (k < half) {
        // 左子节点
        int child = (k << 1) + 1;
        // c 用来存储 子节点的最小值
        Object c = es[child];
        // 右子节点
        int right = child + 1;
        if (right < n &&
            ((Comparable<? super T>) c).compareTo((T) es[right]) > 0)
            // 右节点 小于等于 左节点
            c = es[child = right];
        // 非叶子节点小于 最小值，该节点符合要求，退出循环
        if (key.compareTo((T) c) <= 0)
            break;
        // 当前非叶子节点 比 叶子节点大
        es[k] = c;
        // 左子节点和其子节点维持 小顶堆顺序
        k = child;
    }
    es[k] = key;
}

~~~

![image-20240327220437422](http://47.101.155.205/image-20240327220437422.png)

以一个满二叉树多一个子节点为例，n = 2^(h + 1) ，h 表示二叉树的高。倒数第一层的元素[n/2, n)，是不需要进行下层计算。

[0, n/2 - 1] 中的元素需要进行下层计算，下层情况如下：

- 第 h 层，叶子节点，无需下沉
- 第 h - 1 层，最多下沉 1 层，数量为：n / 2^2；
- 第 h - 2 层，最多下沉 2 层，数量为：n / 2^3；
- ...
- 第 2 层，最多下沉 h - 2 层，数量为：n / 2^(h - 1)；
- 第 1 层，最多下沉 h -1 层，数量为：n / 2^h；
- 第 0 层，最多下沉 h 层，数量为：n / 2^(h+1)；

由于 n = 2^(h + 1)，则 n / 2^2 = 2^(h-1)

时间复杂度为：2^(h-1) + 2^(h-2) * 2 + 2^(h-3) * 3 + ... + 2 * (h-1) + h

另 S = 2^(h-1) * 1 + 2^(h-2) * 2 + 2^(h-3) * 3 + ... + 2 * (h-1) + h

则2S = 2^(h) * 1 + 2^(h-1) * 2 + 2^(h-2) * 3 + ... 2^2 * (h -1) + 2 * h

2S 和 S 错位相减 = 2^h + 2^(h-1) + 2^(h-2) + ... 2^2 + 1 + h  - 1= 2^(h+1)  + h -1 = n - log n - 1

计算大 O，则时间复杂度 为 O(n)。

不转换 h/2^2 计算转换：

时间复杂度为：n/2^2 + n/2^3 * 2 + n/2^4 * 3 + ... + n/2^h * (h-1) + n/2^(h+1) * h

S = n * (1/2^2 + 2/2^3 + 3/2^4 + ... + h-1/2^h + h/2^(h+1))

2S = n * (1/2 + 2/2^2 + 3/2^3 +... + h-1/2^(h-1) + h/2^h)

2S - S = n * (1/2 + 1/2^2 + 1/2^3 + ... + 1/2^(h-1) + 1/2^h - h/2^(h+1))

=> n * (1 - 1/2^h - h/2^(h+1) ) = n * (1 - 2/n - h/n) < n * 1

所以时间复杂度为 O(n)。



**基础**：

1. [1046. 最后一块石头的重量](https://leetcode.cn/problems/last-stone-weight/) 1173
2. [3264. K 次乘运算后的最终数组 I](https://leetcode.cn/problems/final-array-state-after-k-multiplication-operations-i/) 1178
3. [2558. 从数量最多的堆取走礼物](https://leetcode.cn/problems/take-gifts-from-the-richest-pile/) 1277
4. [2336. 无限集中的最小数字](https://leetcode.cn/problems/smallest-number-in-infinite-set/) 1375
5. [2530. 执行 K 次操作后的最大分数](https://leetcode.cn/problems/maximal-score-after-applying-k-operations/) 1386
6. [3066. 超过阈值的最少操作数 II](https://leetcode.cn/problems/minimum-operations-to-exceed-threshold-value-ii/) 1400
7. [1962. 移除石子使总数最小](https://leetcode.cn/problems/remove-stones-to-minimize-the-total/) 1419
8. [703. 数据流中的第 K 大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream/) 经典题
9. [3275. 第 K 近障碍物查询](https://leetcode.cn/problems/k-th-nearest-obstacle-queries/) 1420
10. [1845. 座位预约管理系统](https://leetcode.cn/problems/seat-reservation-manager/) 1429 你能做到复杂度与 *n* 无关吗？
11. [2208. 将数组和减半的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/) 1550
12. [2233. K 次增加后的最大乘积](https://leetcode.cn/problems/maximum-product-after-k-increments/) 1686
13. [3296. 移山所需的最少秒数](https://leetcode.cn/problems/minimum-number-of-seconds-to-make-mountain-height-zero/) 1695
14. [1942. 最小未被占据椅子的编号](https://leetcode.cn/problems/the-number-of-the-smallest-unoccupied-chair/) 1695
15. [1801. 积压订单中的订单总数](https://leetcode.cn/problems/number-of-orders-in-the-backlog/) 1711
16. [2406. 将区间分为最少组数](https://leetcode.cn/problems/divide-intervals-into-minimum-number-of-groups/) 1713
17. [3478. 选出和最大的 K 个元素](https://leetcode.cn/problems/choose-k-elements-with-maximum-sum/) 1753
18. [2462. 雇佣 K 位工人的总代价](https://leetcode.cn/problems/total-cost-to-hire-k-workers/) 1764
19. [1834. 单线程 CPU](https://leetcode.cn/problems/single-threaded-cpu/) 1798
20. [1792. 最大平均通过率](https://leetcode.cn/problems/maximum-average-pass-ratio/) 1818

**进阶**：

1. [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
2. [2931. 购买物品的最大开销](https://leetcode.cn/problems/maximum-spending-after-buying-items/) 1822
3. [355. 设计推特](https://leetcode.cn/problems/design-twitter/)
4. [502. IPO](https://leetcode.cn/problems/ipo/)
5. [1705. 吃苹果的最大数目](https://leetcode.cn/problems/maximum-number-of-eaten-apples/) 1930
6. [778. 水位上升的泳池中游泳](https://leetcode.cn/problems/swim-in-rising-water/)
7. [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/) 1948
8. [1882. 使用服务器处理任务](https://leetcode.cn/problems/process-tasks-using-servers/) 1979
9. [1354. 多次求和构造目标数组](https://leetcode.cn/problems/construct-target-array-with-multiple-sums/) 2015
10. [1353. 最多可以参加的会议数目](https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/) 2016
11. [1235. 规划兼职工作](https://leetcode.cn/problems/maximum-profit-in-job-scheduling/) 2023 做法不止一种
12. [632. 最小区间](https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/) 做法不止一种
13. [2542. 最大子序列的分数](https://leetcode.cn/problems/maximum-subsequence-score/) 2056
14. [1383. 最大的团队表现值](https://leetcode.cn/problems/maximum-performance-of-a-team/) 2091
15. [2402. 会议室 III](https://leetcode.cn/problems/meeting-rooms-iii/) 2093
16. [2503. 矩阵查询可获得的最大分数](https://leetcode.cn/problems/maximum-number-of-points-from-grid-queries/) 2196
17. [2163. 删除元素后和的最小差值](https://leetcode.cn/problems/minimum-difference-in-sums-after-removal-of-elements/) 2225
18. [857. 雇佣 K 名工人的最低成本](https://leetcode.cn/problems/minimum-cost-to-hire-k-workers/) 2260
19. [1606. 找到处理最多请求的服务器](https://leetcode.cn/problems/find-servers-that-handled-most-number-of-requests/) 2276
20. [1851. 包含每个查询的最小区间](https://leetcode.cn/problems/minimum-interval-to-include-each-query/) 2286
21. [407. 接雨水 II](https://leetcode.cn/problems/trapping-rain-water-ii/)
22. [2940. 找到 Alice 和 Bob 可以相遇的建筑](https://leetcode.cn/problems/find-building-where-alice-and-bob-can-meet/) 2327
23. [3399. 字符相同的最短子字符串 II](https://leetcode.cn/problems/smallest-substring-with-identical-characters-ii/) 2376
24. [2589. 完成所有任务的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/) 2381 做法不止一种
25. [3266. K 次乘运算后的最终数组 II](https://leetcode.cn/problems/final-array-state-after-k-multiplication-operations-ii/) 2509
26. [1675. 数组的最小偏移量](https://leetcode.cn/problems/minimize-deviation-in-array/) 2533
27. [2617. 网格图中最少访问的格子数](https://leetcode.cn/problems/minimum-number-of-visited-cells-in-a-grid/) 2582
28. [2532. 过桥的时间](https://leetcode.cn/problems/time-to-cross-a-bridge/) 2589
29. [LCP 33. 蓄水](https://leetcode.cn/problems/o8SXZn/) 思考：更快的做法



### 第 K 小/大

1. [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)
2. [378. 有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)
3. [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
4. [373. 查找和最小的 K 对数字](https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/)
5. [1439. 有序矩阵中的第 k 个最小数组和](https://leetcode.cn/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/) 2134
6. [786. 第 K 个最小的质数分数](https://leetcode.cn/problems/k-th-smallest-prime-fraction/) 2169
7. [3691. 最大子数组总值 II](https://leetcode.cn/problems/maximum-total-subarray-value-ii/) 2469
8. [2386. 找出数组的第 K 大和](https://leetcode.cn/problems/find-the-k-sum-of-an-array/) 2648



### 重排元素

1. [984. 不含 AAA 或 BBB 的字符串](https://leetcode.cn/problems/string-without-aaa-or-bbb/) 1474 不需要堆，这题的目的是引入贪心思想
2. [767. 重构字符串](https://leetcode.cn/problems/reorganize-string/) 1681
3. [1054. 距离相等的条形码](https://leetcode.cn/problems/distant-barcodes/) 1702
4. [1405. 最长快乐字符串](https://leetcode.cn/problems/longest-happy-string/) 1821
5. [3081. 替换字符串中的问号使分数最小](https://leetcode.cn/problems/replace-question-marks-in-string-to-minimize-its-value/) 1905
6. [621. 任务调度器](https://leetcode.cn/problems/task-scheduler/)



### 反悔堆

基于堆的反悔贪心。

1. [LCP 30. 魔塔游戏](https://leetcode.cn/problems/p0NxJO/)
2. [1642. 可以到达的最远建筑](https://leetcode.cn/problems/furthest-building-you-can-reach/) 1962
3. [630. 课程表 III](https://leetcode.cn/problems/course-schedule-iii/)
4. [871. 最低加油次数](https://leetcode.cn/problems/minimum-number-of-refueling-stops/) 2074
5. [3362. 零数组变换 III](https://leetcode.cn/problems/zero-array-transformation-iii/) 2424 虽然没有反悔的过程，但思路和 871 是类似的
6. [2813. 子序列最大优雅度](https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence/) 2582 也可以不用堆
7. [3049. 标记所有下标的最早秒数 II](https://leetcode.cn/problems/earliest-second-to-mark-indices-ii/) 3111



### 懒删除堆

支持删除堆中任意元素。

~~~java
// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
// 最小堆 LazyHeap minPQ = new LazyHeap(Integer::compare);
// 最大堆 LazyHeap maxPQ = new LazyHeap((a, b) -> Integer.compare(b, a));
class LazyHeap extends PriorityQueue<Integer> {
    private final Map<Integer, Integer> removeCnt = new HashMap<>(); // 每个元素剩余需要删除的次数
    private int size = 0; // 堆的实际大小

    public LazyHeap(Comparator<Integer> comparator) {
        super(comparator);
    }

    // 删除堆中所有应该删除的元素后，堆的实际大小
    public int size() {
        return size;
    }

    // 删除
    public void remove(int x) {
        removeCnt.merge(x, 1, Integer::sum); // 懒删除
        size--;
    }

    // 正式执行删除操作
    private void applyRemove() {
        while (removeCnt.getOrDefault(peek(), 0) > 0) {
            removeCnt.merge(poll(), -1, Integer::sum);
        }
    }

    // 查看堆顶
    public int top() {
        applyRemove();
        return peek(); // 真正的堆顶
    }

    // 出堆
    public int pop() {
        applyRemove();
        size--;
        return poll();
    }

    // 入堆
    public void push(int x) {
        int c = removeCnt.getOrDefault(x, 0);
        if (c > 0) {
            removeCnt.put(x, c - 1); // 抵消之前的删除
        } else {
            offer(x);
        }
        size++;
    }
}
~~~

1. [2349. 设计数字容器系统](https://leetcode.cn/problems/design-a-number-container-system/) 1540
2. [3607. 电网维护](https://leetcode.cn/problems/power-grid-maintenance/) 1700
3. [2353. 设计食物评分系统](https://leetcode.cn/problems/design-a-food-rating-system/) 1782
4. [3092. 最高频率的 ID](https://leetcode.cn/problems/most-frequent-ids/) 1793
5. [3408. 设计任务管理器](https://leetcode.cn/problems/design-task-manager/) 1807
6. [2034. 股票价格波动](https://leetcode.cn/problems/stock-price-fluctuation/) 1832
7. [1172. 餐盘栈](https://leetcode.cn/problems/dinner-plate-stacks/) 2110
8. [218. 天际线问题](https://leetcode.cn/problems/the-skyline-problem/) 扫描线
9. [3510. 移除最小数对使数组有序 II](https://leetcode.cn/problems/minimum-pair-removal-to-sort-array-ii/) 2608



### 对顶堆

1. [2102. 序列顺序查询](https://leetcode.cn/problems/sequentially-ordinal-rank-tracker/) 2159
2. [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)
3. [480. 滑动窗口中位数](https://leetcode.cn/problems/sliding-window-median/)
4. [1825. 求出 MK 平均值](https://leetcode.cn/problems/finding-mk-average/) 2396
5. [3505. 使 K 个子数组内元素相等的最少操作数](https://leetcode.cn/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/) 2539 滑动窗口中位数的距离和
6. [3013. 将数组分成最小总代价的子数组 II](https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/) 2540
7. [3321. 计算子数组的 x-sum II](https://leetcode.cn/problems/find-x-sum-of-all-k-long-subarrays-ii/) 2598
8. [LCP 24. 数字游戏](https://leetcode.cn/problems/5TxKeK/)





## 栈

栈（Stack）是一种遵循 后进先出（LIFO, Last In First Out）原则的数据结构。

[栈题单](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

### 基础



### 进阶

1. [1441. 用栈操作构建数组](https://leetcode.cn/problems/build-an-array-with-stack-operations/) 1180
2. [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/) 1228
3. [682. 棒球比赛](https://leetcode.cn/problems/baseball-game/)
4. [2390. 从字符串中移除星号](https://leetcode.cn/problems/removing-stars-from-a-string/) 1348
5. [1472. 设计浏览器历史记录](https://leetcode.cn/problems/design-browser-history/) 1454
6. [946. 验证栈序列](https://leetcode.cn/problems/validate-stack-sequences/) 1462
7. [3412. 计算字符串的镜像分数](https://leetcode.cn/problems/find-mirror-score-of-a-string/) 1578
8. [71. 简化路径](https://leetcode.cn/problems/simplify-path/)



### 进阶

1. [3170. 删除星号以后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-minimum-string-after-removing-stars/) 1772
2. [155. 最小栈](https://leetcode.cn/problems/min-stack/)
3. [1381. 设计一个支持增量操作的栈](https://leetcode.cn/problems/design-a-stack-with-increment-operation/)
4. [636. 函数的独占时间](https://leetcode.cn/problems/exclusive-time-of-functions/)
5. [2434. 使用机器人打印字典序最小的字符串](https://leetcode.cn/problems/using-a-robot-to-print-the-lexicographically-smallest-string/) 1953
6. [895. 最大频率栈](https://leetcode.cn/problems/maximum-frequency-stack/) 2028
7. [1172. 餐盘栈](https://leetcode.cn/problems/dinner-plate-stacks/) 2110
8. [2589. 完成所有任务的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/) 2381 做法不止一种



### 邻项消除

1. [2696. 删除子串后的字符串最小长度](https://leetcode.cn/problems/minimum-string-length-after-removing-substrings/) 1282
2. [1047. 删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/) 1286
3. [1544. 整理字符串](https://leetcode.cn/problems/make-the-string-great/) 1344
4. [3561. 移除相邻字符](https://leetcode.cn/problems/resulting-string-after-adjacent-removals/) 1397
5. [1003. 检查替换后的词是否有效](https://leetcode.cn/problems/check-if-word-is-valid-after-substitutions/) 1427
6. [2216. 美化数组的最少删除数](https://leetcode.cn/problems/minimum-deletions-to-make-array-beautiful/) 1510
7. [1209. 删除字符串中的所有相邻重复项 II](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string-ii/) 1542
8. [3703. 移除K-平衡子字符串](https://leetcode.cn/problems/remove-k-balanced-substrings/) 1802 联系 1209 题
9. [1717. 删除子字符串的最大得分](https://leetcode.cn/problems/maximum-score-from-removing-substrings/) 1868
10. [2197. 替换数组中的非互质数](https://leetcode.cn/problems/replace-non-coprime-numbers-in-array/) 2057
11. [735. 小行星碰撞](https://leetcode.cn/problems/asteroid-collision/)



### 合法括号字符串（RBS）

1. [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
2. [921. 使括号有效的最少添加](https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/) 1242
3. [1021. 删除最外层的括号](https://leetcode.cn/problems/remove-outermost-parentheses/) 1311
4. [1614. 括号的最大嵌套深度](https://leetcode.cn/problems/maximum-nesting-depth-of-the-parentheses/) 1323
5. [1190. 反转每对括号间的子串](https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/) 1486
6. [856. 括号的分数](https://leetcode.cn/problems/score-of-parentheses/) 1563
7. [1249. 移除无效的括号](https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/) 1657
8. [1963. 使字符串平衡的最小交换次数](https://leetcode.cn/problems/minimum-number-of-swaps-to-make-the-string-balanced/) 1689
9. [678. 有效的括号字符串](https://leetcode.cn/problems/valid-parenthesis-string/) 约 1700
10. [1111. 有效括号的嵌套深度](https://leetcode.cn/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/) 1749
11. [1541. 平衡括号字符串的最少插入次数](https://leetcode.cn/problems/minimum-insertions-to-balance-a-parentheses-string/) 1759
12. [2116. 判断一个括号字符串是否有效](https://leetcode.cn/problems/check-if-a-parentheses-string-can-be-valid/) 2038 进阶问题：CF1709C
13. [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)



### 表达式解析

1. [1006. 笨阶乘](https://leetcode.cn/problems/clumsy-factorial/) 1408 引入栈的思想
2. [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)
3. [394. 字符串解码](https://leetcode.cn/problems/decode-string/)
4. [8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/) 为下面的题目热身
5. [224. 基本计算器](https://leetcode.cn/problems/basic-calculator/)
6. [227. 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/)
7. [726. 原子的数量](https://leetcode.cn/problems/number-of-atoms/)
8. [1106. 解析布尔表达式](https://leetcode.cn/problems/parsing-a-boolean-expression/) 1880
9. [591. 标签验证器](https://leetcode.cn/problems/tag-validator/)
10. [736. Lisp 语法解析](https://leetcode.cn/problems/parse-lisp-expression/)
11. [1096. 花括号展开 II](https://leetcode.cn/problems/brace-expansion-ii/) 2349
12. [1896. 反转表达式值的最少操作次数](https://leetcode.cn/problems/minimum-cost-to-change-the-final-value-of-expression/) 2532
13. [770. 基本计算器 IV](https://leetcode.cn/problems/basic-calculator-iv/) 2863



### 对顶栈

1. [2296. 设计一个文本编辑器](https://leetcode.cn/problems/design-a-text-editor/) 1912



### 单调栈



## 队列

队列（Queue）遵循先进先出（FIFO, First In First Out）原则。

[队列题单](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

### 基础

1. [933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/) 1338
2. [950. 按递增顺序显示卡牌](https://leetcode.cn/problems/reveal-cards-in-increasing-order/) 1686
3. [649. Dota2 参议院](https://leetcode.cn/problems/dota2-senate/)



### 设计

1. [1670. 设计前中后队列](https://leetcode.cn/problems/design-front-middle-back-queue/) 1610
2. [3508. 设计路由器](https://leetcode.cn/problems/implement-router/) 1851
3. [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)
4. [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)
5. [622. 设计循环队列](https://leetcode.cn/problems/design-circular-queue/)
6. [641. 设计循环双端队列](https://leetcode.cn/problems/design-circular-deque/)



### 双端队列

1. [2810. 故障键盘](https://leetcode.cn/problems/faulty-keyboard/) 做到 O(*n*)
2. [2071. 你可以安排的最多任务数目](https://leetcode.cn/problems/maximum-number-of-tasks-you-can-assign/) 2648



### 单调队列

**单调队列 = 滑动窗口 + 单调栈**。必须先掌握滑动窗口和单调栈这两个知识点，再学单调队列。

1. [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)
2. [LCR 184. 设计自助结算系统](https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/)
3. [1438. 绝对差不超过限制的最长连续子数组](https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) 1672
4. [2762. 不间断子数组](https://leetcode.cn/problems/continuous-subarrays/) 同 1438 题
5. [2398. 预算内的最多机器人数目](https://leetcode.cn/problems/maximum-number-of-robots-within-budget/) 1917
6. [3589. 计数质数间隔平衡子数组](https://leetcode.cn/problems/count-prime-gap-balanced-subarrays/) 2235
7. [862. 和至少为 K 的最短子数组](https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/) 2307
8. [1499. 满足不等式的最大值](https://leetcode.cn/problems/max-value-of-equation/) 2456

