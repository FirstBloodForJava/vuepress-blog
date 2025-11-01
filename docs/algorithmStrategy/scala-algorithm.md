# scala-algorithm

来源 [灵茶山艾府](https://leetcode.cn/discuss/post/3141566/ru-he-ke-xue-shua-ti-by-endlesscheng-q3yd/)

## 滑动窗口

### 1.定长滑动窗口

[1456.定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/)

给你字符串 `s` 和整数 `k`。

请返回字符串 `s` 中长度为 `k` 的单个子字符串中可能包含的最大元音字母数。

元音字母（`a`, `e`, `i`, `o`, `u`）

~~~md
s = abciiidef，k = 3
abc
 bci
  cii
   iii
    iid
	 ide
	  def
上面是暴力枚举 s 字符串， k 长的子串的情况，暴力枚举的循环情况
外循环 0 ~ (n - k + 1)，内循环 k
~~~

怎么样才能一次循环就得到字串的元音字母数量？

窗口右端点在 i 时，窗口长度为 k，所以窗口左端点为 i - k + 1。

**原理：闭区间 k = r - l + 1，所以 l = r - k + 1。**

定长滑动窗口计算三步：入-更新-出（从左到右）

- 入：下标为 i 的元素进入窗口，更新统计情况。如果窗口左端点 i - k + 1 < 0，未形成第一个窗口，重复第一步。
- 更新：窗口形成，更新答案。
- 出：下标为 i - k + 1 的元素离开窗口，更新统计情况，为下一个循环“更新”做准备。

从右到左：

- 入：下标为 i 的元素进入窗口，更新统计情况。如果窗口的左端点 i > s - k(s - 1 - k + 1)，未形成第一个窗口，重复第一步。
- 更新：窗口形成，更新答案。
- 出：下标为 i + k - 1 的元素离开窗口，更新统计情况，为下一个循环“更新”做准备。

#### 基础

1. [1456.定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/) 1263 √
2. [643.子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/description/) √
3. [1343.大小为 K 且平均值大于等于阈值的子数组数目](https://leetcode.cn/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/) 1317 √
4. [2090.半径为 k 的子数组平均值](https://leetcode.cn/problems/k-radius-subarray-averages/description/) 1358 √
5. [2379.得到 K 个黑块的最少涂色次数](https://leetcode.cn/problems/minimum-recolors-to-get-k-consecutive-black-blocks/) 1360 √
6. [2841.几乎唯一子数组的最大和](https://leetcode.cn/problems/maximum-sum-of-almost-unique-subarray/) 1546 √
7. [2461.长度为 K 子数组中的最大和](https://leetcode.cn/problems/maximum-sum-of-distinct-subarrays-with-length-k/) 1553 √
8. [1423.可获得的最大点数](https://leetcode.cn/problems/maximum-points-you-can-obtain-from-cards/) 1574 √



#### 进阶

1. [3679.使库存平衡的最少丢弃次数](https://leetcode.cn/problems/minimum-discards-to-balance-inventory/) 1639 √
2. [1052.爱生气的书店老板](https://leetcode.cn/problems/grumpy-bookstore-owner/) √
3. [3439.重新安排会议得到最多空余时间 I](https://leetcode.cn/problems/reschedule-meetings-for-maximum-free-time-i/) 1729 √
4. [3694.删除子字符串后不同的终点](https://leetcode.cn/problems/distinct-points-reachable-after-substring-removal/) 1739 √
5. [3652.按策略买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-using-strategy/) √
6. [2134.最少交换次数来组合所有的 1 II](https://leetcode.cn/problems/minimum-swaps-to-group-all-1s-together-ii/) 1748 √
7. [1652.拆炸弹](https://leetcode.cn/problems/defuse-the-bomb/) 做到 O(n) √
8. [1297.子串的最大出现次数](https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/) 1748
9. [2653.滑动子数组的美丽值](https://leetcode.cn/problems/sliding-subarray-beauty/) 1786
10. [1888.使二进制字符串字符交替的最少反转次数](https://leetcode.cn/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/) 2006
11. [567.字符串的排列](https://leetcode.cn/problems/permutation-in-string/)
12. [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)
13. [30.串联所有单词的子串](https://leetcode.cn/problems/substring-with-concatenation-of-all-words/)
14. [2156.查找给定哈希值的子串](https://leetcode.cn/problems/find-substring-with-given-hash-value/) 2063
15. [2953.统计完全子字符串](https://leetcode.cn/problems/count-complete-substrings/) 2449
16. [1016.子串能表示从 1 到 N 数字的二进制串](https://leetcode.cn/problems/binary-string-with-substrings-representing-1-to-n/) 做到 O(∣s∣)



#### 其它

1. [2200.找出数组中的所有 K 近邻下标](https://leetcode.cn/problems/find-all-k-distant-indices-in-an-array/) 1266 做法不止一种
2. [2269.找到一个数字的 K 美丽值](https://leetcode.cn/problems/find-the-k-beauty-of-a-number/) 1280
3. [1984.学生分数的最小差值](https://leetcode.cn/problems/minimum-difference-between-highest-and-lowest-of-k-scores/) 1306
4. [1461.检查一个字符串是否包含所有长度为 K 的二进制子串](https://leetcode.cn/problems/check-if-a-string-contains-all-binary-codes-of-size-k/) 1504
5. [220.存在重复元素 III](https://leetcode.cn/problems/contains-duplicate-iii/)





### 2.不定长滑动窗口

不定长滑动窗口主要分为三类：求最长子数组、求最短子数组、求子数组个数。

#### 求最长

**基础**

1. [3.无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) √
2. [3090.每个字符最多出现两次的最长子字符串](https://leetcode.cn/problems/maximum-length-substring-with-two-occurrences/) 1329 √
3. [1493.删掉一个元素以后全为 1 的最长子数组](https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/) 1423 √
4. [3634.使数组平衡的最少移除数目](https://leetcode.cn/problems/minimum-removals-to-balance-array/) 1453 √
5. [1208.尽可能使字符串相等](https://leetcode.cn/problems/get-equal-substrings-within-budget/) 1497
6. [904.水果成篮](https://leetcode.cn/problems/fruit-into-baskets/) 1516
7. [1695.删除子数组的最大得分](https://leetcode.cn/problems/maximum-erasure-value/) 1529
8. [2958.最多 K 个重复元素的最长子数组](https://leetcode.cn/problems/length-of-longest-subarray-with-at-most-k-frequency/) 1535
9. [2024.考试的最大困扰度](https://leetcode.cn/problems/maximize-the-confusion-of-an-exam/) 1643
10. [1004.最大连续 1 的个数](https://leetcode.cn/problems/max-consecutive-ones-iii/) III 1656
11. [1658.将 x 减到 0 的最小操作数](https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/) 1817

**进阶**

1. [2730.找到最长的半重复子字符串](https://leetcode.cn/problems/find-the-longest-semi-repetitive-substring/) 非暴力做法
2. [2779.数组的最大美丽值](https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation/) 1638
3. [1838.最高频元素的频数](https://leetcode.cn/problems/frequency-of-the-most-frequent-element/) 1876
4. [2516.每种字符至少取 K 个](https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right/) 1948
5. [2831.找出最长等值子数组](https://leetcode.cn/problems/find-the-longest-equal-subarray/) 1976
6. [2271.毯子覆盖的最多白色砖块数](https://leetcode.cn/problems/find-the-longest-equal-subarray/) 2022
7. [2106.摘水果](https://leetcode.cn/problems/maximum-fruits-harvested-after-at-most-k-steps/) 2062
8. [2555.两个线段获得的最多奖品](https://leetcode.cn/problems/maximize-win-from-two-segments/) 2081
9. [2009.使数组连续的最少操作数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-continuous/) 2084
10. [1610.可见点的最大数目](https://leetcode.cn/problems/maximum-number-of-visible-points/) 2147
11. [2781.最长合法子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-valid-substring/) 2204
12. [3411.最长乘积等价子数组](https://leetcode.cn/problems/maximum-subarray-with-equal-products/) 非暴力做法约 2300
13. [3413.收集连续 K 个袋子可以获得的最多硬币数量](https://leetcode.cn/problems/maximum-coins-from-k-consecutive-bags/) 2374
14. [395.至少有 K 个重复字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)
15. [1763.最长的美好子字符串](https://leetcode.cn/problems/longest-nice-substring/) 非暴力做法
16. [2968.执行操作使频率分数最大](https://leetcode.cn/problems/apply-operations-to-maximize-frequency-score/) 2444
17. [1040.移动石子直到连续 II](https://leetcode.cn/problems/moving-stones-until-consecutive-ii/) 2456



#### 求最短

1. [209.长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)
2. [2904.最短且字典序最小的美丽子字符串](https://leetcode.cn/problems/shortest-and-lexicographically-smallest-beautiful-string/) 做到 O(n平方)
3. [1234.替换子串得到平衡字符串](https://leetcode.cn/problems/replace-the-substring-for-balanced-string/) 1878
4. [2875.无限数组的最短子数组](https://leetcode.cn/problems/minimum-size-subarray-in-infinite-array/) 1914
5. [76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)
6. [632.最小区间](https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/) 做法不止一种



#### 求子数组个数

**越短越合法**

1. [713.乘积小于 K 的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/)
2. [3258.统计满足 K 约束的子字符串数量 I](https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i/) 做到 O(n)
3. [2302.统计得分小于 K 的子数组数目](https://leetcode.cn/problems/count-subarrays-with-score-less-than-k/) 1808
4. [2762.不间断子数组](https://leetcode.cn/problems/continuous-subarrays/) 1940
5. [LCP 68.美观的花束](https://leetcode.cn/problems/1GxJYY/)



**越长越合法**

1. [1358.包含所有三种字符的子字符串数目](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/) 1646
2. [2962.统计最大元素出现至少 K 次的子数组](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/) 1701
3. [3325.字符至少出现 K 次的子字符串 I 做到](https://leetcode.cn/problems/count-substrings-with-k-frequency-characters-i/) O(n)
4. [2799.统计完全子数组的数目](https://leetcode.cn/problems/count-complete-subarrays-in-an-array/) 做到 O(n)
5. [2537.统计好子数组的数目](https://leetcode.cn/problems/count-the-number-of-good-subarrays/) 1892
6. [3298.统计重新排列后包含另一个字符串的子字符串数目 II](https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-ii/) 1909 同 76 题



**恰好型**

恰好问题可以转换成：

- 至多问题：至多 k - 至多 (k-1)。字符串越短越符合答案，求最长。
- 至少问题：至少 k - 至少 (k+1)。字符串越长越符合答案，求最短。

班级有 10 人年龄至少 20 岁，3 人年龄至少 21，恰好 20 的人数 = 10 - 7。

班级有 10 人年龄至多 20 岁，3 人年龄至多 19，恰好 20 的人数 = 10 - 7。

1. [930.和相同的二元子数组](https://leetcode.cn/problems/binary-subarrays-with-sum/) 1592
2. [1248.统计「优美子数组」](https://leetcode.cn/problems/count-number-of-nice-subarrays/) 1624
3. [3306.元音辅音字符串计数 II](https://leetcode.cn/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/) 2200
4. [992.K 个不同整数的子数组](https://leetcode.cn/problems/subarrays-with-k-different-integers/) 2210



#### 其它

1. [825.适龄的朋友](https://leetcode.cn/problems/friends-of-appropriate-ages/) 1697
2. [2401.最长优雅子数组](https://leetcode.cn/problems/longest-nice-subarray/) 1750
3. [1156.单字符重复子串的最大长度](https://leetcode.cn/problems/swap-for-longest-repeated-character-substring/) 1787 有简单做法
4. [424.替换后的最长重复字符](https://leetcode.cn/problems/longest-repeating-character-replacement/)
5. [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) 有定长滑窗/不定长滑窗两种写法
6. [1712.将数组分成三个子数组的方案数](https://leetcode.cn/problems/ways-to-split-array-into-three-subarrays/) 2079
7. [LCR 180.文件组合](https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)