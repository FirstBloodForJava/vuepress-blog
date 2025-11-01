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
8. [1297.子串的最大出现次数](https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/) 1748 √
9. [2653.滑动子数组的美丽值](https://leetcode.cn/problems/sliding-subarray-beauty/) 1786 √
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

**越短越合法**：求最大

1. [713.乘积小于 K 的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/) √
2. [3258.统计满足 K 约束的子字符串数量 I](https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i/) 做到 O(n) √
3. [2302.统计得分小于 K 的子数组数目](https://leetcode.cn/problems/count-subarrays-with-score-less-than-k/) 1808 √
4. [2762.不间断子数组](https://leetcode.cn/problems/continuous-subarrays/) 1940 √
5. [LCP 68.美观的花束](https://leetcode.cn/problems/1GxJYY/)



**越长越合法**：求最小

1. [1358.包含所有三种字符的子字符串数目](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/) 1646 √
2. [2962.统计最大元素出现至少 K 次的子数组](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/) 1701 √
3. [3325.字符至少出现 K 次的子字符串 I 做到](https://leetcode.cn/problems/count-substrings-with-k-frequency-characters-i/) O(n) √
4. [2799.统计完全子数组的数目](https://leetcode.cn/problems/count-complete-subarrays-in-an-array/) 做到 O(n)
5. [2537.统计好子数组的数目](https://leetcode.cn/problems/count-the-number-of-good-subarrays/) 1892
6. [3298.统计重新排列后包含另一个字符串的子字符串数目 II](https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-ii/) 1909 同 76 题



**恰好型**

恰好问题可以转换成：

- 至多问题：至多 k - 至多 (k-1)。字符串越短越符合答案，求最长。
- 至少问题：至少 k - 至少 (k+1)。字符串越长越符合答案，求最短。

班级有 10 人年龄至少 20 岁，3 人年龄至少 21，恰好 20 的人数 = 10 - 7。

班级有 10 人年龄至多 20 岁，3 人年龄至多 19，恰好 20 的人数 = 10 - 7。

1. [930.和相同的二元子数组](https://leetcode.cn/problems/binary-subarrays-with-sum/) 1592 √题解
2. [1248.统计「优美子数组」](https://leetcode.cn/problems/count-number-of-nice-subarrays/) 1624 √
3. [3306.元音辅音字符串计数 II](https://leetcode.cn/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/) 2200 √题解
4. [992.K 个不同整数的子数组](https://leetcode.cn/problems/subarrays-with-k-different-integers/) 2210 √



#### 其它

1. [825.适龄的朋友](https://leetcode.cn/problems/friends-of-appropriate-ages/) 1697 √ 题解
2. [2401.最长优雅子数组](https://leetcode.cn/problems/longest-nice-subarray/) 1750 √ 题解
3. [1156.单字符重复子串的最大长度](https://leetcode.cn/problems/swap-for-longest-repeated-character-substring/) 1787 有简单做法
4. [424.替换后的最长重复字符](https://leetcode.cn/problems/longest-repeating-character-replacement/)
5. [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) 有定长滑窗/不定长滑窗两种写法
6. [1712.将数组分成三个子数组的方案数](https://leetcode.cn/problems/ways-to-split-array-into-three-subarrays/) 2079
7. [LCR 180.文件组合](https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)



## 双指针

### 1. 单序列双指针

#### 相向双指针

两个指针 left = 0，right = n - 1，在数组的两端，向中间移动。

1. [344.反转字符串](https://leetcode.cn/problems/reverse-string/)
2. [3643.垂直翻转子矩阵](https://leetcode.cn/problems/flip-square-submatrix-vertically/) 1235
3. [345.反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/)
4. [125.验证回文串](https://leetcode.cn/problems/valid-palindrome/)
5. [1750.删除字符串两端相同字符后的最短长度](https://leetcode.cn/problems/minimum-length-of-string-after-deleting-similar-ends/) 1502
6. [2105. 给植物浇水 II](https://leetcode.cn/problems/watering-plants-ii/) 1507
7. [977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/) 做到 O(*n*)
8. [658. 找到 K 个最接近的元素](https://leetcode.cn/problems/find-k-closest-elements/)
9. [1471. 数组中的 K 个最强值](https://leetcode.cn/problems/the-k-strongest-values-in-an-array/) 用双指针解决
10. [167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)
11. [633. 平方数之和](https://leetcode.cn/problems/sum-of-square-numbers/)
12. [2824. 统计和小于目标的下标对数目](https://leetcode.cn/problems/count-pairs-whose-sum-is-less-than-target/)
13. [2563. 统计公平数对的数目](https://leetcode.cn/problems/count-the-number-of-fair-pairs/)
14. [LCP 28. 采购方案](https://leetcode.cn/problems/4xy4Wx/) 同 2824 题
15. [15. 三数之和](https://leetcode.cn/problems/3sum/)
16. [16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest/)
17. [18. 四数之和](https://leetcode.cn/problems/4sum/)
18. [611. 有效三角形的个数](https://leetcode.cn/problems/valid-triangle-number/)
19. [1577. 数的平方等于两数乘积的方法数](https://leetcode.cn/problems/number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers/) 用双指针实现
20. [923. 三数之和的多种可能](https://leetcode.cn/problems/3sum-with-multiplicity/) 1711
21. [948. 令牌放置](https://leetcode.cn/problems/bag-of-tokens/) 1762
22. [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)
23. [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)
24. [1616. 分割两个字符串得到回文串](https://leetcode.cn/problems/split-two-strings-to-make-palindrome/) 1868
25. [1498. 满足条件的子序列数目](https://leetcode.cn/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/) 2276
26. [1782. 统计点对的数目](https://leetcode.cn/problems/count-pairs-of-nodes/) 2457



#### 同向双指针

两个指针的移动方向相同，滑动窗口。

1. [611. 有效三角形的个数](https://leetcode.cn/problems/valid-triangle-number/)
2. [3649. 完美对的数目](https://leetcode.cn/problems/number-of-perfect-pairs/) 1716
3. [1574. 删除最短的子数组使剩余数组有序](https://leetcode.cn/problems/shortest-subarray-to-be-removed-to-make-array-sorted/) 1932
4. [2972. 统计移除递增子数组的数目 II](https://leetcode.cn/problems/count-the-number-of-incremovable-subarrays-ii/) 2153
5. [2122. 还原原数组](https://leetcode.cn/problems/recover-the-original-array/) 2159
6. [2234. 花园的最大总美丽值](https://leetcode.cn/problems/maximum-total-beauty-of-the-gardens/) 2562
7. [581. 最短无序连续子数组](https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/)







#### 背向双指针

两个指针从数组的同一位置出发，一个向左，一个向右。

1. [1793. 好子数组的最大分数](https://leetcode.cn/problems/maximum-score-of-a-good-subarray/) 1946
2. [976. 三角形的最大周长](https://leetcode.cn/problems/largest-perimeter-triangle/) 思考题：改成最小周长（原题不是背向双指针，思考题是）



#### 原地修改

1. [27. 移除元素](https://leetcode.cn/problems/remove-element/)
2. [26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
3. [80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)
4. [2273. 移除字母异位词后的结果数组](https://leetcode.cn/problems/find-resultant-array-after-removing-anagrams/)
5. [3684. 至多 K 个不同元素的最大和](https://leetcode.cn/problems/maximize-sum-of-at-most-k-distinct-elements/)
6. [283. 移动零](https://leetcode.cn/problems/move-zeroes/)
7. [905. 按奇偶排序数组](https://leetcode.cn/problems/sort-array-by-parity/)
8. [922. 按奇偶排序数组 II](https://leetcode.cn/problems/sort-array-by-parity-ii/)
9. [3467. 将数组按照奇偶性转化](https://leetcode.cn/problems/transform-array-by-parity/)
10. [2460. 对数组执行操作](https://leetcode.cn/problems/apply-operations-to-an-array/)
11. [1089. 复写零](https://leetcode.cn/problems/duplicate-zeros/)
12. [75. 颜色分类](https://leetcode.cn/problems/sort-colors/)



#### 思维拓展

1. [1920. 基于排列构建数组](https://leetcode.cn/problems/build-array-from-permutation/)
2. [442. 数组中重复的数据](https://leetcode.cn/problems/find-all-duplicates-in-an-array/)
3. [448. 找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)
4. [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)



### 2. 双序列双指针

#### 双指针

1. [2109. 向字符串添加空格](https://leetcode.cn/problems/adding-spaces-to-a-string/) 1315
2. [2540. 最小公共值](https://leetcode.cn/problems/minimum-common-value/) 做到 O(*n*+*m*)
3. [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/) 做到 O(*n*+*m*)
4. [2570. 合并两个二维数组 - 求和法](https://leetcode.cn/problems/merge-two-2d-arrays-by-summing-values/) 做到 O(*n*+*m*)
5. [350. 两个数组的交集 II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/) 解决进阶问题
6. [LCP 18. 早餐组合](https://leetcode.cn/problems/2vYnGI/)
7. [1855. 下标对中的最大距离](https://leetcode.cn/problems/maximum-distance-between-a-pair-of-values/) 1515
8. [1385. 两个数组间的距离值](https://leetcode.cn/problems/find-the-distance-value-between-two-arrays/)
9. [925. 长按键入](https://leetcode.cn/problems/long-pressed-name/) 做到 O(*n*+*m*)
10. [809. 情感丰富的文字](https://leetcode.cn/problems/expressive-words/) 1605
11. [2337. 移动片段得到字符串](https://leetcode.cn/problems/move-pieces-to-obtain-a-string/) 1693
12. [777. 在 LR 字符串中交换相邻字符](https://leetcode.cn/problems/swap-adjacent-in-lr-string/) 同 2337 题
13. [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/) 做到 O(1) 额外空间
14. [986. 区间列表的交集](https://leetcode.cn/problems/interval-list-intersections/) 做到 O(*n*+*m*)
15. [面试题 16.06. 最小差](https://leetcode.cn/problems/smallest-difference-lcci/)
16. [1537. 最大得分](https://leetcode.cn/problems/get-the-maximum-score/) 1961



#### 判断子序列

1. [392. 判断子序列](https://leetcode.cn/problems/is-subsequence/)
2. [524. 通过删除字母匹配到字典里最长单词](https://leetcode.cn/problems/longest-word-in-dictionary-through-deleting/)
3. [2486. 追加字符以获得子序列](https://leetcode.cn/problems/append-characters-to-string-to-make-subsequence/) 1363
4. [2825. 循环增长使字符串子序列等于另一个字符串](https://leetcode.cn/problems/make-string-a-subsequence-using-cyclic-increments/) 1415
5. [1023. 驼峰式匹配](https://leetcode.cn/problems/camelcase-matching/) 1537
6. [3132. 找出与数组相加的整数 II](https://leetcode.cn/problems/find-the-integer-added-to-array-ii/) 1620
7. [522. 最长特殊序列 II](https://leetcode.cn/problems/longest-uncommon-subsequence-ii/) 约 1700
8. [1898. 可移除字符的最大数目](https://leetcode.cn/problems/maximum-number-of-removable-characters/) 1913
9. [2565. 最少得分子序列](https://leetcode.cn/problems/subsequence-with-the-minimum-score/) 2432
10. [3302. 字典序最小的合法序列](https://leetcode.cn/problems/find-the-lexicographically-smallest-valid-sequence/) 2474



### 3. 三指针

1. [2367. 等差三元组的数目](https://leetcode.cn/problems/number-of-arithmetic-triplets/) 做到 O(*n*)
2. [2563. 统计公平数对的数目](https://leetcode.cn/problems/count-the-number-of-fair-pairs/) 1721
3. [795. 区间子数组个数](https://leetcode.cn/problems/number-of-subarrays-with-bounded-maximum/) 1817
4. [2444. 统计定界子数组的数目](https://leetcode.cn/problems/count-subarrays-with-fixed-bounds/) 2093
5. [3347. 执行操作后元素的最高频率 II](https://leetcode.cn/problems/maximum-frequency-of-an-element-after-performing-operations-ii/) 2156
6. [3464. 正方形上的点之间的最大距离](https://leetcode.cn/problems/maximize-the-distance-between-points-on-a-square/) 2806 *k* 个指针



