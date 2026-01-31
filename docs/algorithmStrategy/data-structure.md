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

原地堆化：自底到顶堆化的过程

::: tabs

@tab 大顶堆
~~~java
public class Solution {
    
    private static void heapify(int[] h) {
        // 最后一个非叶子节点开始堆化
        for (int i = h.length / 2 - 1; i >= 0; i--) {
            sink(h, i);
        }
    }

    // 大顶堆
    private static void sink(int[] h, int i) {
        int n = h.length;
        // 存在叶子节点, i 是非叶子节点(父节点)
        while (2 * i + 1 < n) {
            // 假设 左子节点比右子节点大
            int l = 2 * i + 1;
            if (l + 1 < n && h[l + 1] > h[l]) {
                l++;
            }
            // 父节点大于等于 最大的子节点
            if (h[i] >= h[l]) {
                break;
            }
            // 交换
            swap(h, i, l);
            // 下沉比较
            i = l;
        }
    }

    private static void swap(int[] h, int i, int j) {
        int temp = h[i];
        h[i] = h[j];
        h[j] = temp;
    }

}
~~~

@tab 小顶堆
~~~java
public class Solution {
    
    private static void heapify(int[] h) {
        // 最后一个非叶子节点开始堆化
        for (int i = h.length / 2 - 1; i >= 0; i--) {
            sink(h, i);
        }
    }

    // 小顶堆
    private static void sink(int[] h, int i) {
        int n = h.length;
        // 存在叶子节点, i 是非叶子节点(父节点)
        while (2 * i + 1 < n) {
            // 假设 左子节点比右子节点小
            int l = 2 * i + 1;
            if (l + 1 < n && h[l + 1] < h[l]) {
                l++;
            }
            // 父节点大于等于 最大的子节点
            if (h[i] <= h[l]) {
                break;
            }
            // 交换
            swap(h, i, l);
            // 下沉比较
            i = l;
        }
    }

    private static void swap(int[] h, int i, int j) {
        int temp = h[i];
        h[i] = h[j];
        h[j] = temp;
    }

}
~~~

:::



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

1. [1046. 最后一块石头的重量](https://leetcode.cn/problems/last-stone-weight/) 1173 √
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



> 2

~~~md
给定数组 a，每次从数组中删除两个不同元素，最多可操作多少次？
计算操作次数的上界
证明存在一种什么方案，能让操作次数等于上界。
一个明细的上界是 n/2↓(下取整), n 是偶数时, 全部删除; n 是奇数时, 剩下最后一个数字;
[1,1,1,1,2,3] 这种情况最多只能删除 [1,1,2,3], 上界取决于 n - m(出现最多元素的次数)
上界 min(n/2↓, n - m);

当 m > n - m 时, 如果先删除 n-m 中不同的元素, 操作次数肯定小于 n-m 次, 最优解是挑选 n-m 个元素同最多次数元素删除, m > n/2, n - m < n/2 => n - m <= n/2↓

当 m <= n - m 时, 所有元素的出现次数不超过 n/2↓ 时, 是否可以操作 n/2↓ 次?
可以构造一个 2 * n/2↓ 长的数组, 所有相邻元素都是不同的, 两两元素一组执行删除, 最多操作次数达到 n/2↓。
把数组的元素按照出现次数排序, 出现次数最多的元素排在前面, 将排序后的元素按以下规则依次填写:
	先将 元素 填在偶数下标; 偶数下标全部使用后, 从奇数下标开始填写 [1,1,1,1,2,2,3,3]
	[1,_,1,_,1,_,1,_]
	[1,2,1,2,1,_,1,_]
	[1,2,1,2,1,3,1,3]
	这样得到的数组, 元素两个各不相同
反证法: 如果出现了两两相同元素, 则 x 元素从偶数下标开始填, 填完了全部偶数下标, 并使用了奇数下标, 说明元素 x 出现次数至少 n/2↓+1 次, 与 m <= n - m 矛盾

给定数组 a, 每次操作, 删除 a 中的至多两个不同元素。删除所有元素，最少要操作多少
max(n/2↑, m)

~~~





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
    // 每个元素剩余需要删除的次数
    private final Map<Integer, Integer> removeCnt = new HashMap<>();
    // 堆的实际大小
    private int size = 0; 

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

    // 查看/删除元素时, 执行删除操作
    private void applyRemove() {
        while (removeCnt.getOrDefault(peek(), 0) > 0) {
            removeCnt.merge(poll(), -1, Integer::sum);
        }
    }

    // 查看堆顶
    public int top() {
        applyRemove();
        return peek();
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
    // 入堆
    public void add(int x) {
        int c = removeCnt.getOrDefault(x, 0);
        if (c > 0) {
            // 抵消之前的删除
            removeCnt.put(x, c - 1);
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

1. [1441. 用栈操作构建数组](https://leetcode.cn/problems/build-an-array-with-stack-operations/) 1180 √
2. [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/) 1228
3. [682. 棒球比赛](https://leetcode.cn/problems/baseball-game/)
4. [2390. 从字符串中移除星号](https://leetcode.cn/problems/removing-stars-from-a-string/) 1348
5. [1472. 设计浏览器历史记录](https://leetcode.cn/problems/design-browser-history/) 1454
6. [946. 验证栈序列](https://leetcode.cn/problems/validate-stack-sequences/) 1462
7. [3412. 计算字符串的镜像分数](https://leetcode.cn/problems/find-mirror-score-of-a-string/) 1578
8. [71. 简化路径](https://leetcode.cn/problems/simplify-path/)



### 进阶

1. [3170. 删除星号以后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-minimum-string-after-removing-stars/) 1772 **可位运算标记要删除的最小字符**
2. [155. 最小栈](https://leetcode.cn/problems/min-stack/)
3. [1381. 设计一个支持增量操作的栈](https://leetcode.cn/problems/design-a-stack-with-increment-operation/)
4. [636. 函数的独占时间](https://leetcode.cn/problems/exclusive-time-of-functions/)
5. [2434. 使用机器人打印字典序最小的字符串](https://leetcode.cn/problems/using-a-robot-to-print-the-lexicographically-smallest-string/) 1953
6. [895. 最大频率栈](https://leetcode.cn/problems/maximum-frequency-stack/) 2028
7. [1172. 餐盘栈](https://leetcode.cn/problems/dinner-plate-stacks/) 2110
8. [2589. 完成所有任务的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/) 2381 做法不止一种



### 邻项消除

1. [2696. 删除子串后的字符串最小长度](https://leetcode.cn/problems/minimum-string-length-after-removing-substrings/) 1282 √
2. [1047. 删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/) 1286 √
3. [1544. 整理字符串](https://leetcode.cn/problems/make-the-string-great/) 1344 √
4. [3561. 移除相邻字符](https://leetcode.cn/problems/resulting-string-after-adjacent-removals/) 1397
5. [1003. 检查替换后的词是否有效](https://leetcode.cn/problems/check-if-word-is-valid-after-substitutions/) 1427
6. [2216. 美化数组的最少删除数](https://leetcode.cn/problems/minimum-deletions-to-make-array-beautiful/) 1510
7. [1209. 删除字符串中的所有相邻重复项 II](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string-ii/) 1542 √
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

1. [1006. 笨阶乘](https://leetcode.cn/problems/clumsy-factorial/) 1408 
2. [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)
3. [394. 字符串解码](https://leetcode.cn/problems/decode-string/) **题解**
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

**基础**

1.  [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/) √
2.  [1475. 商品折扣后的最终价格](https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop/) √
3.  [496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/) √
4. [503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/) √
5.  [901. 股票价格跨度](https://leetcode.cn/problems/online-stock-span/) 1709 √
6.  [853. 车队](https://leetcode.cn/problems/car-fleet/) √

**进阶**

1. [1019. 链表中的下一个更大节点](https://leetcode.cn/problems/next-greater-node-in-linked-list/) 1571 √
2.  [768. 最多能完成排序的块 II](https://leetcode.cn/problems/max-chunks-to-make-sorted-ii/) 1788 √
3.  [654. 最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/) 做到 O(*n*)
4. [456. 132 模式](https://leetcode.cn/problems/132-pattern/) 约 2000
5.  [3113. 边界元素是最大值的子数组数目](https://leetcode.cn/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum/) 2046
6.  [2866. 美丽塔 II](https://leetcode.cn/problems/beautiful-towers-ii/) 2072
7. [1944. 队列中可以看到的人数](https://leetcode.cn/problems/number-of-visible-people-in-a-queue/) 2105
8.  [2454. 下一个更大元素 IV](https://leetcode.cn/problems/next-greater-element-iv/) 2175
9. [1130. 叶值的最小代价生成树](https://leetcode.cn/problems/minimum-cost-tree-from-leaf-values/) O(*n*) 做法
10.  [2289. 使数组按非递减顺序排列](https://leetcode.cn/problems/steps-to-make-array-non-decreasing/) 2482
11. [1776. 车队 II](https://leetcode.cn/problems/car-fleet-ii/) 2531
12.  [2736. 最大和查询](https://leetcode.cn/problems/maximum-sum-queries/) 2533
13. [3420. 统计 K 次操作以内得到非递减子数组的数目](https://leetcode.cn/problems/count-non-decreasing-subarrays-after-k-operations/) 2855

**思维扩展**

1.  [962. 最大宽度坡](https://leetcode.cn/problems/maximum-width-ramp/) 1608
2.  [3542. 将所有元素变为 0 的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-convert-all-elements-to-zero/) 1890
3. [1124. 表现良好的最长时间段](https://leetcode.cn/problems/longest-well-performing-interval/) 1908



#### 矩形



1. [84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/) √
2.  [1793. 好子数组的最大分数](https://leetcode.cn/problems/maximum-score-of-a-good-subarray/) 1946 √
3.  [85. 最大矩形](https://leetcode.cn/problems/maximal-rectangle/) √
4. [221. 最大正方形](https://leetcode.cn/problems/maximal-square/) √
5.  [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/) 做法不止一种
6.  [1504. 统计全 1 子矩形](https://leetcode.cn/problems/count-submatrices-with-all-ones/)
7. [1277. 统计全为 1 的正方形子矩阵](https://leetcode.cn/problems/count-square-submatrices-with-all-ones/)



#### 贡献法



1. [907. 子数组的最小值之和](https://leetcode.cn/problems/sum-of-subarray-minimums/) 1976 √
2.  [2104. 子数组范围和](https://leetcode.cn/problems/sum-of-subarray-ranges/) √ 最大值 - 最小值
3. [1856. 子数组最小乘积的最大值](https://leetcode.cn/problems/maximum-subarray-min-product/) 2051 √ 前缀和 + 单调栈
4.  [2818. 操作使得分最大](https://leetcode.cn/problems/apply-operations-to-maximize-score/) 2397
5. [2281. 巫师的总力量和（最小值×和）](https://leetcode.cn/problems/sum-of-total-strength-of-wizards/) 2621
6.  [3430. 最多 K 个元素的子数组的最值之和](https://leetcode.cn/problems/maximum-and-minimum-sums-of-at-most-size-k-subarrays/) 2645
7. [2334. 元素值大于变化阈值的子数组](https://leetcode.cn/problems/subarray-with-elements-greater-than-varying-threshold/) 2381
8. [2962. 统计最大元素出现至少 K 次的子数组·我的题解](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/solutions/2560940/hua-dong-chuang-kou-fu-ti-dan-pythonjava-xvwg/) 中的思考题（解答见评论）



#### 最小字典序



1. [402. 移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/) 约 1800 √
2.  [1673. 找出最具竞争力的子序列](https://leetcode.cn/problems/find-the-most-competitive-subsequence/) 1802 √
3.  [316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/) 2185
4. [316 扩展：重复个数不超过 limit](https://leetcode.cn/contest/tianchi2022/problems/ev2bru/)
5.  [1081. 不同字符的最小子序列](https://leetcode.cn/problems/smallest-subsequence-of-distinct-characters/) 同 316 题
6.  [321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number/)
7.  [2030. 含特定字母的最小子序列](https://leetcode.cn/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter/) 2562





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

1. [2810. 故障键盘](https://leetcode.cn/problems/faulty-keyboard/) √
2. [2071. 你可以安排的最多任务数目](https://leetcode.cn/problems/maximum-number-of-tasks-you-can-assign/) 2648 题解



### 单调队列

**单调队列 = 滑动窗口 + 单调栈**。必须先掌握滑动窗口和单调栈这两个知识点，再学单调队列。

1. [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/) 
2. [LCR 184. 设计自助结算系统](https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/) √
3. [1438. 绝对差不超过限制的最长连续子数组](https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) 1672 可转换为 239 问题
4. [2762. 不间断子数组](https://leetcode.cn/problems/continuous-subarrays/) 同 1438 题
5. [2398. 预算内的最多机器人数目](https://leetcode.cn/problems/maximum-number-of-robots-within-budget/) 1917
6. [3589. 计数质数间隔平衡子数组](https://leetcode.cn/problems/count-prime-gap-balanced-subarrays/) 2235
7. [862. 和至少为 K 的最短子数组](https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/) 2307
8. [1499. 满足不等式的最大值](https://leetcode.cn/problems/max-value-of-equation/) 2456



## 链表

[链表](https://leetcode.cn/discuss/post/3142882/fen-xiang-gun-ti-dan-lian-biao-er-cha-sh-6srp/)

带着问题去做题目：

1. 在什么情况下，要用到哨兵节点（dummy node）？头节点可能被删除
2. 在什么情况下，循环条件要写 `while (node != null)`？什么情况下要写 `while (node.next != null)`？`node != null` 遍历所有节点；`node.next != null` 遍历到最后一个节点。

### 1.遍历链表

1. [1290. 二进制链表转整数](https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/)
2. [2058. 找出临界点之间的最小和最大距离](https://leetcode.cn/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/)
3. [2181. 合并零之间的节点](https://leetcode.cn/problems/merge-nodes-in-between-zeros/)
4. [725. 分隔链表](https://leetcode.cn/problems/split-linked-list-in-parts/)
5. [817. 链表组件](https://leetcode.cn/problems/linked-list-components/)
6. [3263. 将双链表转换为数组 I](https://leetcode.cn/problems/convert-doubly-linked-list-to-array-i/) （会员题）
7. [3294. 将双链表转换为数组 II](https://leetcode.cn/problems/convert-doubly-linked-list-to-array-ii/) （会员题）
8. [3062. 链表游戏的获胜者](https://leetcode.cn/problems/winner-of-the-linked-list-game/) （会员题）
9. [3063. 链表频率](https://leetcode.cn/problems/linked-list-frequency/) （会员题）



### 2.删除节点

1. [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)
2. [3217. 从链表中移除在数组中存在的节点](https://leetcode.cn/problems/delete-nodes-from-linked-list-present-in-array/)
3. [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)
4. [82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)
5. [237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)
6. [1669. 合并两个链表](https://leetcode.cn/problems/merge-in-between-linked-lists/)
7. [2487. 从链表中移除节点](https://leetcode.cn/problems/remove-nodes-from-linked-list/)
8. [1836. 从未排序的链表中移除重复元素](https://leetcode.cn/problems/remove-duplicates-from-an-unsorted-linked-list/) （会员题）



### 3.插入节点

1. [2807. 在链表中插入最大公约数](https://leetcode.cn/problems/insert-greatest-common-divisors-in-linked-list/)
2. [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/)
3. [LCR 029. 循环有序列表的插入](https://leetcode.cn/problems/4ueAj6/)
4. [708. 循环有序列表的插入](https://leetcode.cn/problems/insert-into-a-sorted-circular-linked-list/) （会员题）
5. [2046. 给按照绝对值排序的链表排序](https://leetcode.cn/problems/sort-linked-list-already-sorted-using-absolute-values/) （会员题）



### 4.反转链表

1. [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)
2. [92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)
3. [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)
4. [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
5. [2074. 反转偶数长度组的节点](https://leetcode.cn/problems/reverse-nodes-in-even-length-groups/)



### 5.前后指针

1. [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)
2.  [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)
3.  [1721. 交换链表中的节点](https://leetcode.cn/problems/swapping-nodes-in-a-linked-list/)
4. [1474. 删除链表 M 个节点之后的 N 个节点](https://leetcode.cn/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/)（会员题）



### 6.快慢指针

1.  [876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)
2.  [2095. 删除链表的中间节点](https://leetcode.cn/problems/delete-the-middle-node-of-a-linked-list/)
3.  [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)
4. [2130. 链表最大孪生和](https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list/)
5.  [143. 重排链表](https://leetcode.cn/problems/reorder-list/)
6.  [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)
7. [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)
8.  [457. 环形数组是否存在循环](https://leetcode.cn/problems/circular-array-loop/)
9.  [2674. 拆分循环链表](https://leetcode.cn/problems/split-a-circular-linked-list/)（会员题）
10. [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/) 思维扩展



### 7.双指针

1. [328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)
2.  [86. 分隔链表](https://leetcode.cn/problems/partition-list/)
3.  [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)



### 8.合并链表

1. [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)
2.  [445. 两数相加 II](https://leetcode.cn/problems/add-two-numbers-ii/)
3.  [2816. 翻倍以链表形式表示的数字](https://leetcode.cn/problems/double-a-number-represented-as-a-linked-list/)
4. [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
5.  [369. 给单链表加一](https://leetcode.cn/problems/plus-one-linked-list/)（会员题）
6.  [1634. 求两个多项式链表的和](https://leetcode.cn/problems/add-two-polynomials-represented-as-linked-lists/)（会员题）



### 9.分治

核心思想：**拆分+合并**。

1. [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
2.  [148. 排序链表](https://leetcode.cn/problems/sort-list/)



### 10.综合应用

1. [1019. 链表中的下一个更大节点](https://leetcode.cn/problems/next-greater-node-in-linked-list/)
2.  [1171. 从链表中删去总和值为零的连续节点](https://leetcode.cn/problems/remove-zero-sum-consecutive-nodes-from-linked-list/)
3.  [707. 设计链表](https://leetcode.cn/problems/design-linked-list/)
4. [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)
5.  [460. LFU 缓存](https://leetcode.cn/problems/lfu-cache/)
6.  [432. 全 O(1) 的数据结构](https://leetcode.cn/problems/all-oone-data-structure/)
7. [1206. 设计跳表](https://leetcode.cn/problems/design-skiplist/)



### 11.其他

1. [138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/)
2.  [382. 链表随机节点](https://leetcode.cn/problems/linked-list-random-node/)
3.  [430. 扁平化多级双向链表](https://leetcode.cn/problems/flatten-a-multilevel-doubly-linked-list/)
4. [1265. 逆序打印不可变链表](https://leetcode.cn/problems/print-immutable-linked-list-in-reverse/)（会员题）



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

二叉树是 n 个有限元素的集合，该集合为空、或者由一个根的元素和两个不相交的子树组成，是有序树。

二叉树(binary tree)是指树中节点的度不大于2的有序树，它是一种最简单且最重要的树。

二叉树的递归定义为：二叉树是一棵空树，或者是一棵由一个根节点和两棵互不相交的，分别称作根的左子树和右子树组成的非空树；左子树和右子树又同样都是二叉树。

集合为空时，二叉树也称为空二叉树，在二叉树中，每个元素也称为一个节点。

二叉树特点：每个节点最多只能有两颗子树组成，且有左右之分。

- 空二叉树
- 只有一个根节点的二叉树
- 只有左子树
- 只有右子树
- 完全二叉树

**前序遍历**：根-左-右，先访问根节点值，再根访问左子树，最后访问根的右子树。

**中序遍历**：左-根-右，先访问根的左子树，再获取根节点值，最后访问根的右子树。

**后序遍历**：左-右-根，先访问根的左子树，再访问根的右子树，最后获取根节点值。







问题1：一般来说，DFS 的递归边界是空节点。在什么情况下，要额外把**叶子节点**作为递归边界？

问题2：在什么情况下，DFS 需要有返回值？什么情况下不需要有返回值？

问题3：在什么情况下，题目更适合用**自顶向下**的方法解决？什么情况下更适合用**自底向上**的方法解决？



#### 1. 遍历二叉树

1. [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/) √
2.  [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/) √
3.  [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/) √
4. [872. 叶子相似的树](https://leetcode.cn/problems/leaf-similar-trees/) 1288 √
5.  [LCP 44. 开幕式焰火](https://leetcode.cn/problems/sZ59z6/) √
6.  [404. 左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/) √
7. [671. 二叉树中第二小的节点](https://leetcode.cn/problems/second-minimum-node-in-a-binary-tree/) √
8.  [1469. 寻找所有的独生节点](https://leetcode.cn/problems/find-all-the-lonely-nodes/)（会员题）
9. [1214. 查找两棵二叉搜索树之和](https://leetcode.cn/problems/two-sum-bsts/)（会员题）
10.  [2764. 数组是否表示某二叉树的前序遍历](https://leetcode.cn/problems/is-array-a-preorder-of-some-binary-tree/)（会员题）



#### 2. 自顶向下 DFS(先序遍历)

1. [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) √
2.  [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/) √
3.  [112. 路径总和](https://leetcode.cn/problems/path-sum/) √
4. [129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/) √
5.  [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/) √
6.  [1448. 统计二叉树中好节点的数目](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/) 1360 √
7. [1315. 祖父节点值为偶数的节点和](https://leetcode.cn/problems/sum-of-nodes-with-even-valued-grandparent/) 1427 √
8.  [988. 从叶结点开始的最小字符串](https://leetcode.cn/problems/smallest-string-starting-from-leaf/) 1429 √
9.  [1026. 节点与其祖先之间的最大差值](https://leetcode.cn/problems/maximum-difference-between-node-and-ancestor/) 1446 √
10. [1022. 从根到叶的二进制数之和](https://leetcode.cn/problems/sum-of-root-to-leaf-binary-numbers/) 1462 √
11.  [623. 在二叉树中增加一行](https://leetcode.cn/problems/add-one-row-to-tree/) √
12.  [1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/) 1713 √
13. [971. 翻转二叉树以匹配先序遍历](https://leetcode.cn/problems/flip-binary-tree-to-match-preorder-traversal/) 1787 √
14. [2689. 从 Rope 树中提取第 K 个字符](https://leetcode.cn/problems/extract-kth-character-from-the-rope-tree/)（会员题）
15.  [298. 二叉树最长连续序列](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence/)（会员题）
16. [1430. 判断给定的序列是否是二叉树从根到叶的路径](https://leetcode.cn/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree/)（会员题）
17.  [545. 二叉树的边界](https://leetcode.cn/problems/boundary-of-binary-tree/)（会员题）



#### 3. 自底向上 DFS(后序遍历)

1.  [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) √
2.  [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/) √
3.  [965. 单值二叉树](https://leetcode.cn/problems/univalued-binary-tree/) 1178 √
4. [100. 相同的树](https://leetcode.cn/problems/same-tree/) √
5.  [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/) √
6.  [951. 翻转等价二叉树](https://leetcode.cn/problems/flip-equivalent-binary-trees/) 1477 √
7. [1379. 找出克隆二叉树中的相同节点](https://leetcode.cn/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/) √
8.  [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)
9.  [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)
10. [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)
11.  [2331. 计算布尔二叉树的值](https://leetcode.cn/problems/evaluate-boolean-binary-tree/) 1304
12.  [508. 出现次数最多的子树元素和](https://leetcode.cn/problems/most-frequent-subtree-sum/)
13. [563. 二叉树的坡度](https://leetcode.cn/problems/binary-tree-tilt/)
14.  [606. 根据二叉树创建字符串](https://leetcode.cn/problems/construct-string-from-binary-tree/)
15.  [2265. 统计值等于子树平均值的节点数](https://leetcode.cn/problems/count-nodes-equal-to-average-of-subtree/) 1473
16. [1026. 节点与其祖先之间的最大差值](https://leetcode.cn/problems/maximum-difference-between-node-and-ancestor/) 多种做法
17.  [3319. 第 K 大的完美二叉子树的大小](https://leetcode.cn/problems/k-th-largest-perfect-subtree-size-in-binary-tree/) 1603
18.  [1339. 分裂二叉树的最大乘积](https://leetcode.cn/problems/maximum-product-of-splitted-binary-tree/) 1675
19. [1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/) 1713
20.  [1145. 二叉树着色游戏](https://leetcode.cn/problems/binary-tree-coloring-game/) 1741
21.  [572. 另一棵树的子树](https://leetcode.cn/problems/subtree-of-another-tree/) 做到 O(*n*) 时间
22. [1530. 好叶子节点对的数量](https://leetcode.cn/problems/number-of-good-leaf-nodes-pairs/) 做到低于 O(*n*2) 时间
23.  [LCP 67. 装饰树](https://leetcode.cn/problems/KnLfVT/)
24.  [298. 二叉树最长连续序列](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence/)（会员题）
25. [250. 统计同值子树](https://leetcode.cn/problems/count-univalue-subtrees/)（会员题）
26.  [1973. 值等于子节点值之和的节点数量](https://leetcode.cn/problems/count-nodes-equal-to-sum-of-descendants/)（会员题）
27.  [663. 均匀树划分](https://leetcode.cn/problems/equal-tree-partition/)（会员题）
28. [1120. 子树的最大平均值](https://leetcode.cn/problems/maximum-average-subtree/)（会员题）
29.  [2792. 计算足够大的节点数](https://leetcode.cn/problems/count-nodes-that-are-great-enough/)（会员题）
30.  [333. 最大二叉搜索子树](https://leetcode.cn/problems/largest-bst-subtree/)（会员题）
31. [366. 寻找二叉树的叶子节点](https://leetcode.cn/problems/find-leaves-of-binary-tree/)（会员题）
32.  [156. 上下翻转二叉树](https://leetcode.cn/problems/binary-tree-upside-down/)（会员题）
33.  [1612. 检查两棵二叉表达式树是否等价](https://leetcode.cn/problems/check-if-two-expression-trees-are-equivalent/)（会员题）



#### 4. 自底向上 DFS-删点

1. [814. 二叉树剪枝](https://leetcode.cn/problems/binary-tree-pruning/) 1380
2.  [1325. 删除给定值的叶子节点](https://leetcode.cn/problems/delete-leaves-with-a-given-value/) 1407
3.  [1110. 删点成林](https://leetcode.cn/problems/delete-nodes-and-return-forest/) 1511



#### 5. 有递有归

1. [538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/) 1375 也可以用外部变量记录和
2.  [1038. 从二叉搜索树到更大和树](https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/) 同 538 题
3. [865. 具有所有最深节点的最小子树](https://leetcode.cn/problems/smallest-subtree-with-all-the-deepest-nodes/) 1534 也可以自底向上
4.  [1080. 根到叶路径上的不足节点](https://leetcode.cn/problems/insufficient-nodes-in-root-to-leaf-paths/) 1805



#### 6. 二叉树的直径

1. [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)
2.  [687. 最长同值路径](https://leetcode.cn/problems/longest-univalue-path/)
3.  [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)
4.  [2385. 感染二叉树需要的总时间](https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/) 1711
5.  [549. 二叉树最长连续序列 II](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence-ii/)（会员题）



#### 7. 回溯

1.  [257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)
2.  [113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/)
3.  [1457. 二叉树中的伪回文路径](https://leetcode.cn/problems/pseudo-palindromic-paths-in-a-binary-tree/) 1405
4. [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)



#### 8. 最近公共祖先

1. [235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)
2.  [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)
3.  [1123. 最深叶节点的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves/) 1607
4. [2096. 从二叉树一个节点到另一个节点每一步的方向](https://leetcode.cn/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) 1805
5. [1740. 找到二叉树中的距离](https://leetcode.cn/problems/find-distance-in-a-binary-tree/)（会员题）
6.  [1644. 二叉树的最近公共祖先 II](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-ii/)（会员题）
7. [1650. 二叉树的最近公共祖先 III](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iii/)（会员题）
8.  [1676. 二叉树的最近公共祖先 IV](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iv/)（会员题）



#### 9. 二叉搜索树

1. [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)
2.  [530. 二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/) 1303
3.  [783. 二叉搜索树节点最小距离](https://leetcode.cn/problems/minimum-distance-between-bst-nodes/) 同 530 题
4. [938. 二叉搜索树的范围和](https://leetcode.cn/problems/range-sum-of-bst/) 1335
5.  [501. 二叉搜索树中的众数](https://leetcode.cn/problems/find-mode-in-binary-search-tree/)
6.  [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)
7. [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/) 有前序、中序和后序三种做法
8.  [1305. 两棵二叉搜索树中的所有元素](https://leetcode.cn/problems/all-elements-in-two-binary-search-trees/)
9.  [99. 恢复二叉搜索树](https://leetcode.cn/problems/recover-binary-search-tree/)
10. [897. 递增顺序搜索树](https://leetcode.cn/problems/increasing-order-search-tree/) 1473
11.  [2476. 二叉搜索树最近节点查询](https://leetcode.cn/problems/closest-nodes-queries-in-a-binary-search-tree/) 1597
12.  [653. 两数之和 IV - 输入二叉搜索树](https://leetcode.cn/problems/two-sum-iv-input-is-a-bst/)
13. [1373. 二叉搜索子树的最大键值和](https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/) 1914
14.  [1932. 合并多棵二叉搜索树](https://leetcode.cn/problems/merge-bsts-to-create-single-bst/) 2484
15. [285. 二叉搜索树中的中序后继](https://leetcode.cn/problems/inorder-successor-in-bst/)（会员题）
16.  [510. 二叉搜索树中的中序后继 II](https://leetcode.cn/problems/inorder-successor-in-bst-ii/)（会员题）
17.  [270. 最接近的二叉搜索树值](https://leetcode.cn/problems/closest-binary-search-tree-value/)（会员题）
18. [272. 最接近的二叉搜索树值 II](https://leetcode.cn/problems/closest-binary-search-tree-value-ii/)（会员题）
19.  [255. 验证二叉搜索树的前序遍历序列](https://leetcode.cn/problems/verify-preorder-sequence-in-binary-search-tree/)（会员题）
20.  [1902. 给定二叉搜索树的插入顺序求深度](https://leetcode.cn/problems/depth-of-bst-given-insertion-order/)（会员题）



#### 10. 创建二叉树

1.  [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)
2.  [654. 最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/)
3.  [998. 最大二叉树 II](https://leetcode.cn/problems/maximum-binary-tree-ii/) 1498
4. [1008. 前序遍历构造二叉搜索树](https://leetcode.cn/problems/construct-binary-search-tree-from-preorder-traversal/) 1563
5.  [1382. 将二叉搜索树变平衡](https://leetcode.cn/problems/balance-a-binary-search-tree/)
6.  [2196. 根据描述创建二叉树](https://leetcode.cn/problems/create-binary-tree-from-descriptions/) 1644
7. [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
8.  [106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
9.  [889. 根据前序和后序遍历构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/) 1732
10. [1028. 从先序遍历还原二叉树](https://leetcode.cn/problems/recover-a-tree-from-preorder-traversal/) 1797
11.  [536. 从字符串生成二叉树](https://leetcode.cn/problems/construct-binary-tree-from-string/)（会员题）
12.  [1628. 设计带解析函数的表达式树](https://leetcode.cn/problems/design-an-expression-tree-with-evaluate-function/)（会员题）
13. [1597. 根据中缀表达式构造二叉表达式树](https://leetcode.cn/problems/build-binary-expression-tree-from-infix-expression/)（会员题）



#### 11. 插入/删除节点

1. [701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)
2.  [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)
3.  [669. 修剪二叉搜索树](https://leetcode.cn/problems/trim-a-binary-search-tree/)
4. [776. 拆分二叉搜索树](https://leetcode.cn/problems/split-bst/)（会员题）
5.  [1666. 改变二叉树的根节点](https://leetcode.cn/problems/change-the-root-of-a-binary-tree/)（会员题）



#### 12. 树形 DP

1.  [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)
2.  [968. 监控二叉树](https://leetcode.cn/problems/binary-tree-cameras/)
3.  [LCP 10. 二叉树任务调度](https://leetcode.cn/problems/er-cha-shu-ren-wu-diao-du/)
4. [LCP 34. 二叉树染色](https://leetcode.cn/problems/er-cha-shu-ran-se-UGC/)
5.  [LCP 64. 二叉树灯饰](https://leetcode.cn/problems/U7WvvU/)
6.  [2313. 二叉树中得到结果所需的最少翻转次数](https://leetcode.cn/problems/minimum-flips-in-binary-tree-to-get-result/)（会员题）



#### 13. 二叉树 BFS

1. [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
2.  [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)
3.  [107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)
4. [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/) 也可以 DFS
5.  [513. 找树左下角的值](https://leetcode.cn/problems/find-bottom-left-tree-value/)
6.  [515. 在每个树行中找最大值](https://leetcode.cn/problems/find-largest-value-in-each-tree-row/)
7.  [637. 二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/)
8.  [1161. 最大层内元素和](https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/) 1250
9.  [993. 二叉树的堂兄弟节点](https://leetcode.cn/problems/cousins-in-binary-tree/) 1288
10. [2583. 二叉树中的第 K 大层和](https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/) 1374
11.  [1302. 层数最深叶子节点的和](https://leetcode.cn/problems/deepest-leaves-sum/) 1388
12.  [2415. 反转二叉树的奇数层](https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/) 1431
13. [1609. 奇偶树](https://leetcode.cn/problems/even-odd-tree/) 1438
14.  [623. 在二叉树中增加一行](https://leetcode.cn/problems/add-one-row-to-tree/)
15.  [2471. 逐层排序二叉树所需的最少操作数目](https://leetcode.cn/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/) 1635
16. [2641. 二叉树的堂兄弟节点 II](https://leetcode.cn/problems/cousins-in-binary-tree-ii/) 1677
17.  [919. 完全二叉树插入器](https://leetcode.cn/problems/complete-binary-tree-inserter/) 1691
18.  [958. 二叉树的完全性检验](https://leetcode.cn/problems/check-completeness-of-a-binary-tree/) 1703
19. [863. 二叉树中所有距离为 K 的结点](https://leetcode.cn/problems/all-nodes-distance-k-in-binary-tree/)
20.  [662. 二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)
21.  [3157. 找到具有最小和的树的层数](https://leetcode.cn/problems/find-the-level-of-tree-with-minimum-sum/)（会员题）
22. [1602. 找到二叉树中最近的右侧节点](https://leetcode.cn/problems/find-nearest-right-node-in-binary-tree/)（会员题）
23.  [742. 二叉树最近的叶节点](https://leetcode.cn/problems/closest-leaf-in-a-binary-tree/)（会员题）
24.  [1660. 纠正二叉树](https://leetcode.cn/problems/correct-a-binary-tree/)（会员题）



#### 14. 链表+二叉树

1. [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)
2.  [1367. 二叉树中的链表](https://leetcode.cn/problems/linked-list-in-binary-tree/) 1650
3.  [109. 有序链表转换二叉搜索树](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/)
4. [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/) 做到 O(1) 空间
5.  [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/) 做到 O(1) 空间
6. [426. 将二叉搜索树转化为排序的双向链表](https://leetcode.cn/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)（会员题）



#### 15. N 叉树

1. [589. N 叉树的前序遍历](https://leetcode.cn/problems/n-ary-tree-preorder-traversal/)
2.  [590. N 叉树的后序遍历](https://leetcode.cn/problems/n-ary-tree-postorder-traversal/)
3.  [559. N 叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)
4. [429. N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/)
5.  [427. 建立四叉树](https://leetcode.cn/problems/construct-quad-tree/)
6.  [558. 四叉树交集](https://leetcode.cn/problems/logical-or-of-two-binary-grids-represented-as-quad-trees/)
7. [428. 序列化和反序列化 N 叉树](https://leetcode.cn/problems/serialize-and-deserialize-n-ary-tree/)（会员题）
8.  [1490. 克隆 N 叉树](https://leetcode.cn/problems/clone-n-ary-tree/)（会员题）
9.  [1506. 找到 N 叉树的根节点](https://leetcode.cn/problems/find-root-of-n-ary-tree/)（会员题）
10. [1522. N 叉树的直径](https://leetcode.cn/problems/diameter-of-n-ary-tree/)（会员题）
11.  [1516. 移动 N 叉树的子树](https://leetcode.cn/problems/move-sub-tree-of-n-ary-tree/)（会员题）



#### 16. 其他

1. [1261. 在受污染的二叉树中查找元素](https://leetcode.cn/problems/find-elements-in-a-contaminated-binary-tree/) 1440
2.  [1104. 二叉树寻路](https://leetcode.cn/problems/path-in-zigzag-labelled-binary-tree/) 1545
3.  [987. 二叉树的垂序遍历](https://leetcode.cn/problems/vertical-order-traversal-of-a-binary-tree/) 1676
4. [655. 输出二叉树](https://leetcode.cn/problems/print-binary-tree/)
5.  [979. 在二叉树中分配硬币](https://leetcode.cn/problems/distribute-coins-in-binary-tree/) 1709 贡献法
6.  [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/) 做到低于 O(*n*) 时间
7. [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)
8.  [449. 序列化和反序列化二叉搜索树](https://leetcode.cn/problems/serialize-and-deserialize-bst/)
9.  [331. 验证二叉树的前序序列化](https://leetcode.cn/problems/verify-preorder-serialization-of-a-binary-tree/)
10. [652. 寻找重复的子树](https://leetcode.cn/problems/find-duplicate-subtrees/)
11.  [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/)
12.  [2049. 统计最高分的节点数目](https://leetcode.cn/problems/count-nodes-with-the-highest-score/) 1912
13. [2673. 使二叉树所有路径值相等的最小代价](https://leetcode.cn/problems/make-costs-of-paths-equal-in-a-binary-tree/) 1917
14.  [2509. 查询树中环的长度](https://leetcode.cn/problems/cycle-length-queries-in-a-tree/) 1948
15.  [2458. 移除子树后的二叉树高度](https://leetcode.cn/problems/height-of-binary-tree-after-subtree-removal-queries/) 2299 推荐
16. [LCP 26. 导航装置](https://leetcode.cn/problems/hSRGyL/)
17.  [LCP 60. 力扣泡泡龙](https://leetcode.cn/problems/WInSav/)
18.  [314. 二叉树的垂直遍历](https://leetcode.cn/problems/binary-tree-vertical-order-traversal/)（会员题）
19.  [666. 路径总和 IV](https://leetcode.cn/problems/path-sum-iv/)（会员题）
20.  [1586. 二叉搜索树迭代器 II](https://leetcode.cn/problems/binary-search-tree-iterator-ii/)（会员题）
21.  [2773. 特殊二叉树的高度](https://leetcode.cn/problems/height-of-special-binary-tree/)（会员题）
22. [1485. 克隆含随机指针的二叉树](https://leetcode.cn/problems/clone-binary-tree-with-random-pointer/)（会员题）
23.  [2445. 值为 1 的节点数](https://leetcode.cn/problems/number-of-nodes-with-value-one/)（会员题）
24.  [431. 将 N 叉树编码为二叉树](https://leetcode.cn/problems/encode-n-ary-tree-to-binary-tree/)（会员题）
25. [2005. 斐波那契树的移除子树游戏](https://leetcode.cn/problems/subtree-removal-game-with-fibonacci-tree/)（会员题）





### 红黑树

二叉搜索树，满足 BST 的基本性质：

1. 左子树中所有节点的值 小于 该节点的值
2. 右子树中所有节点的值 大于 该节点的值
3. 左、右子树也分别是二叉搜索树



一颗红黑树必须同时满足的五个性质：

1. 节点是红色或黑色；
2. 根节点是黑色；
3. 所有叶子节点（所有节点都指向空）都是黑色；
4. 红色节点的两个子节点都必须是黑色（不能有两个连续的红色节点）；
5. 从任意节点到其后代叶子节点的简单路径中，均包含相同数目的黑色节点（黑高）。





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



## 字典树 trie

[字典树](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

### 基础

1. [208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)
2. [3597. 分割字符串](https://leetcode.cn/problems/partition-string/)
3. [648. 单词替换](https://leetcode.cn/problems/replace-words/)
4. [720. 词典中最长的单词](https://leetcode.cn/problems/longest-word-in-dictionary/)
5. [2416. 字符串的前缀分数和](https://leetcode.cn/problems/sum-of-prefix-scores-of-strings/) 1725
6. [677. 键值映射](https://leetcode.cn/problems/map-sum-pairs/)
7. [1268. 搜索推荐系统](https://leetcode.cn/problems/search-suggestions-system/)
8. [1233. 删除子文件夹](https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/)
9. [820. 单词的压缩编码](https://leetcode.cn/problems/short-encoding-of-words/)
10. [2261. 含最多 K 个可整除元素的子数组](https://leetcode.cn/problems/k-divisible-elements-subarrays/) 
11. [1804. 实现 Trie （前缀树） II](https://leetcode.cn/problems/implement-trie-ii-prefix-tree/)（会员题）
12. [2168. 每个数字的频率都相同的独特子字符串的数量](https://leetcode.cn/problems/unique-substrings-with-equal-digit-frequency/)（会员题）同 2261

### 进阶

1. [211. 添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)
2. [676. 实现一个魔法字典](https://leetcode.cn/problems/implement-magic-dictionary/)
3. [212. 单词搜索 II](https://leetcode.cn/problems/word-search-ii/)
4. [3093. 最长公共后缀查询](https://leetcode.cn/problems/longest-common-suffix-queries/) 2118
5. [745. 前缀和后缀搜索](https://leetcode.cn/problems/prefix-and-suffix-search/)
6. [3045. 统计前后缀下标对 II](https://leetcode.cn/problems/count-prefix-and-suffix-pairs-ii/) 2328
7. [336. 回文对](https://leetcode.cn/problems/palindrome-pairs/)
8. [1948. 删除系统中的重复文件夹](https://leetcode.cn/problems/delete-duplicate-folders-in-system/) 2534
9. [425. 单词方块](https://leetcode.cn/problems/word-squares/) （会员题）
10. [527. 单词缩写](https://leetcode.cn/problems/word-abbreviation/) （会员题）
11. [588. 设计内存文件系统](https://leetcode.cn/problems/design-in-memory-file-system/) （会员题）
12. [616. 给字符串添加加粗标签](https://leetcode.cn/problems/add-bold-tag-in-string/) （会员题）
13. [758. 字符串中的加粗单词](https://leetcode.cn/problems/bold-words-in-string/) （会员题）
14. [642. 设计搜索自动补全系统](https://leetcode.cn/problems/design-search-autocomplete-system/) （会员题）
15. [1065. 字符串的索引对](https://leetcode.cn/problems/index-pairs-of-a-string/) （会员题）
16. [1166. 设计文件系统](https://leetcode.cn/problems/design-file-system/) （会员题）
17. [1858. 包含所有前缀的最长单词](https://leetcode.cn/problems/longest-word-with-all-prefixes/) （会员题）
18. [440. 字典序的第K小数字](https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/) 思维扩展



### 字典树 DP

1. [139. 单词拆分](https://leetcode.cn/problems/word-break/)
2. [140. 单词拆分 II](https://leetcode.cn/problems/word-break-ii/)
3. [面试题 17.13. 恢复空格](https://leetcode.cn/problems/re-space-lcci/)
4. [472. 连接词](https://leetcode.cn/problems/concatenated-words/) 约 2300
5. [2977. 转换字符串的最小成本 II](https://leetcode.cn/problems/minimum-cost-to-convert-string-ii/) 2696



### 异或字典树

1. [421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/) 约 2000
2. [2935. 找出强数对的最大异或值 II](https://leetcode.cn/problems/maximum-strong-pair-xor-ii/) 2349
3. [1707. 与数组中元素的最大异或值](https://leetcode.cn/problems/maximum-xor-with-an-element-from-array/) 2359
4. [1803. 统计异或值在范围内的数对有多少](https://leetcode.cn/problems/count-pairs-with-xor-in-a-range/) 2479
5. [1938. 查询最大基因差](https://leetcode.cn/problems/maximum-genetic-difference-query/) 2503
6. [3632. 异或至少为 K 的子数组数目](https://leetcode.cn/problems/subarrays-with-xor-at-least-k/) （会员题）
7. [2479. 两个不重叠子树的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-non-overlapping-subtrees/) （会员题）



## 并查集

~~~java
// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
class UnionFind {
    private final int[] fa; // 代表元
    private final int[] size; // 集合大小
    public int cc; // 连通块个数

    UnionFind(int n) {
        // 一开始有 n 个集合 {0}, {1}, ..., {n-1}
        // 集合 i 的代表元是自己，大小为 1
        fa = new int[n];
        for (int i = 0; i < n; i++) {
            fa[i] = i;
        }
        size = new int[n];
        Arrays.fill(size, 1);
        cc = n;
    }

    // 返回 x 所在集合的代表元
    // 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
    public int find(int x) {
        // 如果 fa[x] == x，则表示 x 是代表元
        if (fa[x] != x) {
            fa[x] = find(fa[x]); // fa 改成代表元
        }
        return fa[x];
    }

    // 判断 x 和 y 是否在同一个集合
    public boolean isSame(int x, int y) {
        // 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
        // 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
        return find(x) == find(y);
    }

    // 把 from 所在集合合并到 to 所在集合中
    // 返回是否合并成功
    public boolean merge(int from, int to) {
        int x = find(from);
        int y = find(to);
        if (x == y) { // from 和 to 在同一个集合，不做合并
            return false;
        }
        fa[x] = y; // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
        size[y] += size[x]; // 更新集合大小（注意集合大小保存在代表元上）
        // 无需更新 size[x]，因为我们不用 size[x] 而是用 size[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 size[x]
        cc--; // 成功合并，连通块个数减一
        return true;
    }

    // 返回 x 所在集合的大小
    public int getSize(int x) {
        return size[find(x)]; // 集合大小保存在代表元上
    }
}
~~~



**基础**

1. [684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)
2. [3493. 属性图](https://leetcode.cn/problems/properties-graph/) 1565
3. [990. 等式方程的可满足性](https://leetcode.cn/problems/satisfiability-of-equality-equations/) 1638
4. [721. 账户合并](https://leetcode.cn/problems/accounts-merge/)
5. [3532. 针对图的路径存在性查询 I](https://leetcode.cn/problems/path-existence-queries-in-a-graph-i/) 
6. [737. 句子相似性 II](https://leetcode.cn/problems/sentence-similarity-ii/) （会员题）
7. [1101. 彼此熟识的最早时间](https://leetcode.cn/problems/the-earliest-moment-when-everyone-become-friends/) （会员题）
8. [1258. 近义词句子](https://leetcode.cn/problems/synonymous-sentences/) （会员题）

**进阶**

1. [3551. 数位和排序需要的最小交换次数](https://leetcode.cn/problems/minimum-swaps-to-sort-by-digit-sum/) 1507
2. [2471. 逐层排序二叉树所需的最少操作数目](https://leetcode.cn/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/) 1635
3. [1202. 交换字符串中的元素](https://leetcode.cn/problems/smallest-string-with-swaps/) 1855
4. [1061. 按字典序排列最小的等效字符串](https://leetcode.cn/problems/lexicographically-smallest-equivalent-string/)
5. [1722. 执行交换操作后的最小汉明距离](https://leetcode.cn/problems/minimize-hamming-distance-after-swap-operations/) 1892
6. [3608. 包含 K 个连通分量需要的最小时间](https://leetcode.cn/problems/minimum-time-for-k-connected-components/) 1893
7. [3613. 最小化连通分量的最大成本](https://leetcode.cn/problems/minimize-maximum-component-cost/) 类似 3608 题
8. [778. 水位上升的泳池中游泳](https://leetcode.cn/problems/swim-in-rising-water/)
9. [3695. 交换元素后的最大交替和](https://leetcode.cn/problems/maximize-alternating-sum-using-swaps/) 1984
10. [65. 情侣牵手](https://leetcode.cn/problems/couples-holding-hands/) 1999
11. [685. 冗余连接 II](https://leetcode.cn/problems/redundant-connection-ii/)
12. [947. 移除最多的同行或同列石头](https://leetcode.cn/problems/most-stones-removed-with-same-row-or-column/) 2035
13. [839. 相似字符串组](https://leetcode.cn/problems/similar-string-groups/) 2054
14. [1970. 你能穿过矩阵的最后一天](https://leetcode.cn/problems/last-day-where-you-can-still-cross/) 2124
15. [2076. 处理含限制条件的好友请求](https://leetcode.cn/problems/process-restricted-friend-requests/) 2131
16. [1579. 保证图可完全遍历](https://leetcode.cn/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) 2132
17. [959. 由斜杠划分区域](https://leetcode.cn/problems/regions-cut-by-slashes/) 2136
18. [2812. 找出最安全路径](https://leetcode.cn/problems/find-the-safest-path-in-a-grid/) 2154
19. [2503. 矩阵查询可获得的最大分数](https://leetcode.cn/problems/maximum-number-of-points-from-grid-queries/) 2196
20. [3600. 升级后最大生成树稳定性](https://leetcode.cn/problems/maximize-spanning-tree-stability-with-upgrades/) 2301 做法不止一种
21. [2867. 统计树中的合法路径数目](https://leetcode.cn/problems/count-valid-paths-in-a-tree/) 2428
22. [2421. 好路径的数目](https://leetcode.cn/problems/number-of-good-paths/) 2445
23. [2157. 字符串分组](https://leetcode.cn/problems/groups-of-strings/) 2499
24. [1632. 矩阵转换后的秩](https://leetcode.cn/problems/rank-transform-of-a-matrix/) 2530
25. [803. 打砖块](https://leetcode.cn/problems/bricks-falling-when-hit/) 2765
26. [3235. 判断矩形的两个角落是否可达](https://leetcode.cn/problems/check-if-the-rectangle-corner-is-reachable/)
27. [LCP 71. 集水器](https://leetcode.cn/problems/kskhHQ/)
28. [2371. 最小化网格中的最大值](https://leetcode.cn/problems/minimize-maximum-value-in-a-grid/) （会员题）
29. [2459. 通过移动项目到空白区域来排序数组](https://leetcode.cn/problems/sort-array-by-moving-items-to-empty-space/) （会员题）



### GCD 并查集

1. [2709. 最大公约数遍历](https://leetcode.cn/problems/greatest-common-divisor-traversal/) 2172
2. [1627. 带阈值的图连通性](https://leetcode.cn/problems/graph-connectivity-with-threshold/) 2221
3. [952. 按公因数计算最大组件大小](https://leetcode.cn/problems/largest-component-size-by-common-factor/) 2272
4. [1998. 数组的最大公因数排序](https://leetcode.cn/problems/gcd-sort-of-an-array/) 2429
5. [3378. 统计最小公倍数图中的连通块数目](https://leetcode.cn/problems/count-connected-components-in-lcm-graph/) 2532 思路类似 1627 题



### 数组上的并查集

1. [1562. 查找大小为 M 的最新分组](https://leetcode.cn/problems/find-latest-group-of-size-m/) 1928
2. [1488. 避免洪水泛滥](https://leetcode.cn/problems/avoid-flood-in-the-city/) 1974
3. [1353. 最多可以参加的会议数目](https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/) 2016
4. [2382. 删除操作后的最大子段和](https://leetcode.cn/problems/maximum-segment-sum-after-removals/) 2136
5. [2334. 元素值大于变化阈值的子数组](https://leetcode.cn/problems/subarray-with-elements-greater-than-varying-threshold/) 2381
6. [3666. 使二进制字符串全为 1 的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-equalize-binary-string/) 2477
7. [2612. 最少翻转操作数](https://leetcode.cn/problems/minimum-reverse-operations/) 2824



### 区间并查集

1. [3244. 新增道路查询后的最短距离 II](https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-ii/) 2270
2. [1851. 包含每个查询的最小区间](https://leetcode.cn/problems/minimum-interval-to-include-each-query/) 2286
3. [LCP 52. 二叉搜索树染色](https://leetcode.cn/problems/QO5KpG/)
4. [2158. 每天绘制新区域的数量](https://leetcode.cn/problems/amount-of-new-area-painted-each-day/) （会员题）



### 带权并查集

~~~java
// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
class UnionFind {
    private final int[] fa; // 代表元
    private final int[] dis; // dis[x] 表示 x 到（x 所在集合的）代表元的距离
    // 注意数据范围，必要时使用 long[] dis

    public UnionFind(int n) {
        // 一开始有 n 个集合 {0}, {1}, ..., {n-1}
        // 集合 i 的代表元是自己，自己到自己的距离是 0
        fa = new int[n];
        dis = new int[n];
        for (int i = 0; i < n; i++) {
            fa[i] = i;
        }
    }

    // 返回 x 所在集合的代表元
    // 同时做路径压缩
    public int find(int x) {
        if (fa[x] != x) {
            int root = find(fa[x]);
            dis[x] += dis[fa[x]]; // 递归更新 x 到其代表元的距离
            fa[x] = root;
        }
        return fa[x];
    }

    // 判断 x 和 y 是否在同一个集合（同普通并查集）
    public boolean same(int x, int y) {
        return find(x) == find(y);
    }

    // 计算从 from 到 to 的相对距离
    // 调用时需保证 from 和 to 在同一个集合中，否则返回值无意义
    public int getRelativeDistance(int from, int to) {
        find(from);
        find(to);
        // to-from = (x-from) - (x-to) = dis[from] - dis[to]
        return dis[from] - dis[to];
    }

    // 合并 from 和 to，新增信息 to - from = value
    // 其中 to 和 from 表示未知量，下文的 x 和 y 也表示未知量
    // 如果 from 和 to 不在同一个集合，返回 true，否则返回是否与已知信息矛盾
    public boolean merge(int from, int to, int value) {
        int x = find(from), y = find(to);
        if (x == y) { // from 和 to 在同一个集合，不做合并
            // to-from = (x-from) - (x-to) = dis[from] - dis[to] = value
            return dis[from] - dis[to] == value;
        }
        //    x --------- y
        //   /           /
        // from ------- to
        // 已知 x-from = dis[from] 和 y-to = dis[to]，现在合并 from 和 to，新增信息 to-from = value
        // 由于 y-from = (y-x) + (x-from) = (y-to) + (to-from)
        // 所以 y-x = (to-from) + (y-to) - (x-from) = value + dis[to] - dis[from]
        dis[x] = value + dis[to] - dis[from]; // 计算 x 到其代表元 y 的距离
        fa[x] = y;
        return true;
    }
}
~~~

1. [399. 除法求值](https://leetcode.cn/problems/evaluate-division/)
2. [3710. 最大划分因子](https://leetcode.cn/problems/maximum-partition-factor/) 2135
3. [2307. 检查方程中的矛盾之处](https://leetcode.cn/problems/check-for-contradictions-in-equations/) 



## 树状数组和线段树



## 伸展树



## 根号算法

