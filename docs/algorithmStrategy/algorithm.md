# algorithm

来源 [灵茶山艾府](https://leetcode.cn/discuss/post/3141566/ru-he-ke-xue-shua-ti-by-endlesscheng-q3yd/)

## 滑动窗口

[滑动窗口](https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/)

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
6. [1156.单字符重复子串的最大长度](https://leetcode.cn/problems/swap-for-longest-repeated-character-substring/) 1787 题 2831 变体 k = 1 变替换，可解决
7. [2271.毯子覆盖的最多白色砖块数](https://leetcode.cn/problems/find-the-longest-equal-subarray/) 2022
8. [2106.摘水果](https://leetcode.cn/problems/maximum-fruits-harvested-after-at-most-k-steps/) 2062
9. [2555.两个线段获得的最多奖品](https://leetcode.cn/problems/maximize-win-from-two-segments/) 2081
10. [2009.使数组连续的最少操作数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-continuous/) 2084
11. [1610.可见点的最大数目](https://leetcode.cn/problems/maximum-number-of-visible-points/) 2147
12. [2781.最长合法子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-valid-substring/) 2204
13. [3411.最长乘积等价子数组](https://leetcode.cn/problems/maximum-subarray-with-equal-products/) 非暴力做法约 2300
14. [3413.收集连续 K 个袋子可以获得的最多硬币数量](https://leetcode.cn/problems/maximum-coins-from-k-consecutive-bags/) 2374
15. [395.至少有 K 个重复字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)
16. [1763.最长的美好子字符串](https://leetcode.cn/problems/longest-nice-substring/) 非暴力做法
17. [2968.执行操作使频率分数最大](https://leetcode.cn/problems/apply-operations-to-maximize-frequency-score/) 2444
18. [1040.移动石子直到连续 II](https://leetcode.cn/problems/moving-stones-until-consecutive-ii/) 2456



#### 求最短

1. [209.长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)
2. [2904.最短且字典序最小的美丽子字符串](https://leetcode.cn/problems/shortest-and-lexicographically-smallest-beautiful-string/) 做到 O(n平方)
3. [1234.替换子串得到平衡字符串](https://leetcode.cn/problems/replace-the-substring-for-balanced-string/) 1878
4. [2875.无限数组的最短子数组](https://leetcode.cn/problems/minimum-size-subarray-in-infinite-array/) 1914
5. [76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)
6. [632.最小区间](https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/) 做法不止一种



#### 求子数组个数

**越短越合法**：求最长的长度，两种方式

- **固定 l，求最大的 r，答案一般是 ans += r - l + 1，写法相对麻烦**
- **固定 r，求最小的 l，答案一般是 ans += r - l + 1，写法更简单**

1. [713.乘积小于 K 的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/) √
2. [3258.统计满足 K 约束的子字符串数量 I](https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i/) 做到 O(n) √
3. [2302.统计得分小于 K 的子数组数目](https://leetcode.cn/problems/count-subarrays-with-score-less-than-k/) 1808 √
4. [2762.不间断子数组](https://leetcode.cn/problems/continuous-subarrays/) 1940 √
5. [LCP 68.美观的花束](https://leetcode.cn/problems/1GxJYY/) √



**越长越合法**：求最短的长度，两种方式

- **固定 l，求最小的 r，答案一般是 ans += n - r，写法相对麻烦**
- **固定 r，求最大的 l，答案一般是 ans += l，写法更简单**

1. [1358.包含所有三种字符的子字符串数目](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/) 1646 √
2. [2962.统计最大元素出现至少 K 次的子数组](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/) 1701 √
3. [3325.字符至少出现 K 次的子字符串 I 做到](https://leetcode.cn/problems/count-substrings-with-k-frequency-characters-i/) O(n) √
4. [2799.统计完全子数组的数目](https://leetcode.cn/problems/count-complete-subarrays-in-an-array/) 做到 O(n) √
5. [2537.统计好子数组的数目](https://leetcode.cn/problems/count-the-number-of-good-subarrays/) 1892 √
6. [3298.统计重新排列后包含另一个字符串的子字符串数目 II](https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-ii/) 1909 同 76 题 √



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

[滑动窗口](https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/)

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
27. [581. 最短无序连续子数组](https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/) √



#### 同向双指针

两个指针的移动方向相同，滑动窗口。

1. [611. 有效三角形的个数](https://leetcode.cn/problems/valid-triangle-number/) √
2. [3649. 完美对的数目](https://leetcode.cn/problems/number-of-perfect-pairs/) 1716
3. [1574. 删除最短的子数组使剩余数组有序](https://leetcode.cn/problems/shortest-subarray-to-be-removed-to-make-array-sorted/) 1932
4. [2972. 统计移除递增子数组的数目 II](https://leetcode.cn/problems/count-the-number-of-incremovable-subarrays-ii/) 2153
5. [2122. 还原原数组](https://leetcode.cn/problems/recover-the-original-array/) 2159
6. [2234. 花园的最大总美丽值](https://leetcode.cn/problems/maximum-total-beauty-of-the-gardens/) 2562







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



## 分组循环

[滑动窗口](https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/)



流程：

- 外层循环找组的开始点，进入内层循环，内层循环结束，记录答案
- 内层循环找组的结束点



1. [1446. 连续字符](https://leetcode.cn/problems/consecutive-characters/) 1165
2. [1869. 哪种连续子字符串更长](https://leetcode.cn/problems/longer-contiguous-segments-of-ones-than-zeros/) 1205
3. [2414. 最长的字母序连续子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-alphabetical-continuous-substring/) 1222
4. [3456. 找出长度为 K 的特殊子字符串](https://leetcode.cn/problems/find-special-substring-of-length-k/) 1244
5. [2273. 移除字母异位词后的结果数组](https://leetcode.cn/problems/find-resultant-array-after-removing-anagrams/) 1295
6. [2348. 全 0 子数组的数目](https://leetcode.cn/problems/number-of-zero-filled-subarrays/) 1316
7. [1513. 仅含 1 的子串数](https://leetcode.cn/problems/number-of-substrings-with-only-1s/) 1351
8. [1957. 删除字符使字符串变好](https://leetcode.cn/problems/delete-characters-to-make-fancy-string/) 1358
9. [674. 最长连续递增序列](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)
10. [3708. 最长斐波那契子数组](https://leetcode.cn/problems/longest-fibonacci-subarray/) 1381 做到 O(*n*)
11. [696. 计数二进制子串](https://leetcode.cn/problems/count-binary-substrings/)
12. [978. 最长湍流子数组](https://leetcode.cn/problems/longest-turbulent-subarray/) 1393
13. [2110. 股票平滑下跌阶段的数目](https://leetcode.cn/problems/number-of-smooth-descent-periods-of-a-stock/) 1408
14. [228. 汇总区间](https://leetcode.cn/problems/summary-ranges/)
15. [2760. 最长奇偶子数组](https://leetcode.cn/problems/longest-even-odd-subarray-with-threshold/) 1420
16. [1887. 使数组元素相等的减少操作次数](https://leetcode.cn/problems/reduction-operations-to-make-the-array-elements-equal/) 1428
17. [845. 数组中的最长山脉](https://leetcode.cn/problems/longest-mountain-in-array/) 1437
18. [2038. 如果相邻两个颜色均相同则删除当前颜色](https://leetcode.cn/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color/) 1468
19. [2900. 最长相邻不相等子序列 I](https://leetcode.cn/problems/longest-unequal-adjacent-groups-subsequence-i/) 1469
20. [1759. 统计同质子字符串的数目](https://leetcode.cn/problems/count-number-of-homogenous-substrings/) 1491
21. [3011. 判断一个数组是否可以变为有序](https://leetcode.cn/problems/find-if-array-can-be-sorted/) 1497
22. [1578. 使绳子变成彩色的最短时间](https://leetcode.cn/problems/minimum-time-to-make-rope-colorful/) 1574
23. [1839. 所有元音按顺序排布的最长子字符串](https://leetcode.cn/problems/longest-substring-of-all-vowels-in-order/) 1580
24. [2765. 最长交替子数组](https://leetcode.cn/problems/longest-alternating-subarray/) 1581
25. [3255. 长度为 K 的子数组的能量值 II](https://leetcode.cn/problems/find-the-power-of-k-size-subarrays-ii/) 1595
26. [3350. 检测相邻递增子数组 II](https://leetcode.cn/problems/adjacent-increasing-subarrays-detection-ii/) 1600
27. [3105. 最长的严格递增或递减子数组](https://leetcode.cn/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/)
28. [838. 推多米诺](https://leetcode.cn/problems/push-dominoes/) 1638
29. [467. 环绕字符串中唯一的子字符串](https://leetcode.cn/problems/unique-substrings-in-wraparound-string/) 约 1700
30. [3499. 操作后最大活跃区段数 I](https://leetcode.cn/problems/maximize-active-section-with-trade-i/) 1729
31. [413. 等差数列划分](https://leetcode.cn/problems/arithmetic-slices/)
32. [68. 文本左右对齐](https://leetcode.cn/problems/text-justification/)
33. [135. 分发糖果](https://leetcode.cn/problems/candy/)
34. [2948. 交换得到字典序最小的数组](https://leetcode.cn/problems/make-lexicographically-smallest-array-by-swapping-elements/) 2047
35. [2593. 标记所有元素后数组的分数](https://leetcode.cn/problems/find-score-of-an-array-after-marking-all-elements/) 做到 O(*n*)
36. [3640. 三段式数组 II](https://leetcode.cn/problems/trionic-array-ii/) 2278



## 二分

[二分算法](https://leetcode.cn/discuss/post/3579164/)

### 二分查找

::: tabs

@tab 闭区间写法

~~~scala
// nums 非递减数组, 长为 n
// 求 大于等于 x 的 第一个 index
def lowerBound(nums: Array[Int], x: Int): Int = {
    var r = nums.length - 1
    var l = 0
    // 存在元素
    while (l <= r) {
      	val mid = l + (r - l) / 2
      	if (nums(mid) >= x) {
        	r = mid - 1
      	} else {
        	l = mid + 1
      	}
    }
    /*
    注意循环结束时: l == r + 1
	如果存在 nums(i) >= x, 根据循环条件
		则 nums(l-1) < r, nums(l) == nums(r+1) >= x, 即 nums(l) >= x
	如果不存在 nums(i) >= x, 根据循环条件, 则 l 不断右移, 直到 l = n = r + 1
	
	所以 l 可以是答案, 当 l < n 时, 就是答案
	*/
	l
}
~~~



@tab 左闭右开区间写法

~~~scala
// nums 非递减数组, 长为 n
// 求 大于等于 x 的 第一个 index
def lowerBound(nums: Array[Int], x: Int): Int = {
    var r = nums.length
    var l = 0
    // 存在元素
    while (l < r) {
      	val mid = l + (r - l) / 2
      	if (nums(mid) >= x) {
            // 开区间直接赋值
        	r = mid
      	} else {
        	l = mid + 1
      	}
    }
    /*
    注意循环结束时: l == r
	如果存在 nums(i) >= x, 根据循环条件
		则 nums(r) >= x, nums(l - 1) < x, nums(l) = nums(r) >= x
	如果不存在 nums(i) >= x, 根据循环条件, 则 l 不断右移, 直到 l = n -1 = r - 1
	
	所以 l|r 都可以是答案, 当 r < n 时, 就是答案
	*/
	l
}
~~~



@tab 开区间写法(判断更简单)

~~~scala
def lowerBound(nums: Array[Int], x: Int): Int = {
    var r = nums.length
    var l = -1
    // 存在元素
    while (l + 1 < r) {
      	val mid = l + (r - l) / 2
      	if (nums(mid) >= x) {
        	r = mid
      	} else {
        	l = mid
      	}
    }
    /*
    注意循环结束时: l + 1 == r, l = r - 1
	如果存在 nums(i) >= x, 根据循环条件
		则 nums(r) >= x, nums(l) < x, nums(r-1) < x, nums(r) >= x
	如果不存在 nums(i) >= x, 根据循环条件, 则 l 不断右移, 直到 l = n - 1 = r - 1
	
	所以 r 是答案, 当 r < n 时, 就是答案
	*/
	r
}
~~~



:::



| 需求                       | 写法                      | 不存在结果 |
| -------------------------- | ------------------------- | ---------- |
| \>= x 的第一个元素下标     | lowerBound(nums, x)       | n          |
| \> x 的第一个元素下标      | lowerBound(nums, x+1)     | n          |
| \< x 的最后一个元素的下标  | lowerBound(nums, x) -1    | -1         |
| \<= x 的最后一个元素的下标 | lowerBound(nums, x+1) - 1 | -1         |

**基础**：

1. [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)
2. [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)
3. [704. 二分查找](https://leetcode.cn/problems/binary-search/)
4. [744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/)
5. [2529. 正整数和负整数的最大计数](https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/) 做到 O(log*n*)

**进阶**：

1. [2300. 咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/) 1477
2. [1385. 两个数组间的距离值](https://leetcode.cn/problems/find-the-distance-value-between-two-arrays/)
3. [2389. 和有限的最长子序列](https://leetcode.cn/problems/longest-subsequence-with-limited-sum/)
4. [1170. 比较字符串最小字母出现频次](https://leetcode.cn/problems/compare-strings-by-frequency-of-the-smallest-character/)
5. [2080. 区间内查询数字的频率](https://leetcode.cn/problems/range-frequency-queries/) 1702
6. [3488. 距离最小相等元素查询](https://leetcode.cn/problems/closest-equal-element-queries/) 做法不止一种
7. [2563. 统计公平数对的数目](https://leetcode.cn/problems/count-the-number-of-fair-pairs/) 1721
8. [2070. 每一个查询的最大美丽值](https://leetcode.cn/problems/most-beautiful-item-for-each-query/) 1724
9. [1146. 快照数组](https://leetcode.cn/problems/snapshot-array/) 1771
10. [981. 基于时间的键值存储](https://leetcode.cn/problems/time-based-key-value-store/) 同 1146 题
11. [3508. 设计路由器](https://leetcode.cn/problems/implement-router/) 1851
12. [658. 找到 K 个最接近的元素](https://leetcode.cn/problems/find-k-closest-elements/)
13. [1818. 绝对差值和](https://leetcode.cn/problems/minimum-absolute-sum-difference/) 1934
14. [911. 在线选举](https://leetcode.cn/problems/online-election/) 2001
15. [LCP 08. 剧情触发时间](https://leetcode.cn/problems/ju-qing-hong-fa-shi-jian/)



### 二分答案



#### 求最小

~~~md

12.1. 浮点二分, 根据精度考虑二分的次数 L/2^k <= 10^-5, k >= log2 L*10^5
12.2. 整数二分一, 将浮点数转换成整数二分, 求得答案后再除以扩大的倍数
12.3. 整数二分二, areaY * 2 >= sum 的最小 y, 答案在 [y-1, y] 区间, 正方形都分布在整数点, 所以 [y-1, y] 区间的变成就是 (area(y) - area(y-1)) * 1, 可以解等式算出分界点
12.4. 差分+扫描线
~~~

1. [1283. 使结果不超过阈值的最小除数](https://leetcode.cn/problems/find-the-smallest-divisor-given-a-threshold/) 1542 √
2. [2187. 完成旅途的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-trips/) 1641
3. [1011. 在 D 天内送达包裹的能力](https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/) 1725
4. [875. 爱吃香蕉的珂珂](https://leetcode.cn/problems/koko-eating-bananas/) 1766
5. [3296. 移山所需的最少秒数](https://leetcode.cn/problems/minimum-number-of-seconds-to-make-mountain-height-zero/)
6. [3639. 变为活跃状态的最小时间](https://leetcode.cn/problems/minimum-time-to-activate-string/) 1853
7. [475. 供暖器](https://leetcode.cn/problems/heaters/)
8. [2594. 修车的最少时间](https://leetcode.cn/problems/minimum-time-to-repair-cars/) 1915
9. [1482. 制作 m 束花所需的最少天数](https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/) 1946
10. [3048. 标记所有下标的最早秒数 I](https://leetcode.cn/problems/earliest-second-to-mark-indices-i/) 2263
11. [1870. 准时到达的列车最小时速](https://leetcode.cn/problems/minimum-speed-to-arrive-on-time/) 1676 避免浮点数
12. [3453. 分割正方形 I](https://leetcode.cn/problems/separate-squares-i/) 1735





#### 求最大

1. [275. H 指数 II](https://leetcode.cn/problems/h-index-ii/) √
2. [2226. 每个小孩最多能分到多少糖果](https://leetcode.cn/problems/maximum-candies-allocated-to-k-children/) 1646
3. [2982. 找出出现至少三次的最长特殊子字符串 II](https://leetcode.cn/problems/find-longest-special-substring-that-occurs-thrice-ii/) 1773
4. [2576. 求出最多标记下标](https://leetcode.cn/problems/find-the-maximum-number-of-marked-indices/) 1843
5. [1898. 可移除字符的最大数目](https://leetcode.cn/problems/maximum-number-of-removable-characters/) 1913
6. [1802. 有界数组中指定下标处的最大值](https://leetcode.cn/problems/maximum-value-at-a-given-index-in-a-bounded-array/) 1929
7. [1642. 可以到达的最远建筑](https://leetcode.cn/problems/furthest-building-you-can-reach/) 1962
8. [2861. 最大合金数](https://leetcode.cn/problems/maximum-number-of-alloys/) 1981
9. [3007. 价值和小于等于 K 的最大数字](https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/) 2258
10. [2141. 同时运行 N 台电脑的最长时间](https://leetcode.cn/problems/maximum-running-time-of-n-computers/) 2265
11. [2258. 逃离火灾](https://leetcode.cn/problems/escape-the-spreading-fire/) 2347
12. [2071. 你可以安排的最多任务数目](https://leetcode.cn/problems/maximum-number-of-tasks-you-can-assign/) 2648
13. [LCP 78. 城墙防线](https://leetcode.cn/problems/Nsibyl/)



#### 二分间接值

1. [3143. 正方形中的最多点数](https://leetcode.cn/problems/maximum-points-inside-the-square/) 1697 √
2. [1648. 销售价值减少的颜色球](https://leetcode.cn/problems/sell-diminishing-valued-colored-balls/) 2050



#### 最小化最大值

1. [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)
2. [2064. 分配给商店的最多商品的最小值](https://leetcode.cn/problems/minimized-maximum-of-products-distributed-to-any-store/) 1886
3. [3613. 最小化连通分量的最大成本](https://leetcode.cn/problems/minimize-maximum-component-cost/) 约 1900
4. [1760. 袋子里最少数目的球](https://leetcode.cn/problems/minimum-limit-of-balls-in-a-bag/) 1940
5. [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/) 1948
6. [2439. 最小化数组中的最大值](https://leetcode.cn/problems/minimize-maximum-of-array/) 1965
7. [2560. 打家劫舍 IV](https://leetcode.cn/problems/house-robber-iv/) 2081
8. [778. 水位上升的泳池中游泳](https://leetcode.cn/problems/swim-in-rising-water/) 2097 相当于最小化路径最大值
9. [2616. 最小化数对的最大差值](https://leetcode.cn/problems/minimize-the-maximum-difference-of-pairs/) 2155
10. [3419. 图的最大边权的最小值](https://leetcode.cn/problems/minimize-the-maximum-edge-weight-of-graph/) 2243
11. [2513. 最小化两个数组中的最大值](https://leetcode.cn/problems/minimize-the-maximum-of-two-arrays/) 2302
12. [3733. 完成所有送货任务的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-all-deliveries/) 同 2513 题
13. [3399. 字符相同的最短子字符串 II](https://leetcode.cn/problems/smallest-substring-with-identical-characters-ii/) 2376
14. [3605. 数组的最小稳定性因子](https://leetcode.cn/problems/minimum-stability-factor-of-array/) 2410
15. [LCP 12. 小张刷题计划](https://leetcode.cn/problems/xiao-zhang-shua-ti-ji-hua/)



#### 最大化最小值

1. [3281. 范围内整数的最大得分](https://leetcode.cn/problems/maximize-score-of-numbers-in-ranges/) 1768
2. [3620. 恢复网络路径](https://leetcode.cn/problems/network-recovery-pathways/) 1998
3. [2517. 礼盒的最大甜蜜度](https://leetcode.cn/problems/maximum-tastiness-of-candy-basket/) 2021
4. [1552. 两球之间的磁力](https://leetcode.cn/problems/magnetic-force-between-two-balls/) 同 2517 题
5. [3710. 最大划分因子](https://leetcode.cn/problems/maximum-partition-factor/) 2135
6. [2812. 找出最安全路径](https://leetcode.cn/problems/find-the-safest-path-in-a-grid/) 2154
7. [2528. 最大化城市的最小电量](https://leetcode.cn/problems/maximize-the-minimum-powered-city/) 2236
8. [3600. 升级后最大生成树稳定性](https://leetcode.cn/problems/maximize-spanning-tree-stability-with-upgrades/) 2301 做法不止一种
9. [3449. 最大化游戏分数的最小值](https://leetcode.cn/problems/maximize-the-minimum-game-score/) 2748
10. [3464. 正方形上的点之间的最大距离](https://leetcode.cn/problems/maximize-the-distance-between-points-on-a-square/) 2806



### 第 K 小/大

1. [668. 乘法表中第 K 小的数](https://leetcode.cn/problems/kth-smallest-number-in-multiplication-table/)
2. [378. 有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)
3. [719. 找出第 K 小的数对距离](https://leetcode.cn/problems/find-k-th-smallest-pair-distance/)
4. [878. 第 N 个神奇数字](https://leetcode.cn/problems/nth-magical-number/) 1897
5. [1201. 丑数 III](https://leetcode.cn/problems/ugly-number-iii/) 2039
6. [793. 阶乘函数后 K 个零](https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/) 2100
7. [373. 查找和最小的 K 对数字](https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/)
8. [1439. 有序矩阵中的第 k 个最小数组和](https://leetcode.cn/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/) 2134
9. [786. 第 K 个最小的质数分数](https://leetcode.cn/problems/k-th-smallest-prime-fraction/) 2169
10. [3116. 单面值组合的第 K 小金额](https://leetcode.cn/problems/kth-smallest-amount-with-single-denomination-combination/) 2387
11. [3134. 找出唯一性数组的中位数](https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/) 2451
12. [2040. 两个有序数组的第 K 小乘积](https://leetcode.cn/problems/kth-smallest-product-of-two-sorted-arrays/) 2518
13. [2386. 找出数组的第 K 大和](https://leetcode.cn/problems/find-the-k-sum-of-an-array/) 2648 转化
14. [1508. 子数组和排序后的区间和](https://leetcode.cn/problems/range-sum-of-sorted-subarray-sums/)
15. [3691. 最大子数组总值 II](https://leetcode.cn/problems/maximum-total-subarray-value-ii/) 做到时间复杂度与 *k* 无关



### 三分法

1. [1515. 服务中心的最佳位置](https://leetcode.cn/problems/best-position-for-a-service-centre/) 2157 



### 其它

1. [69. x 的平方根](https://leetcode.cn/problems/sqrtx/) 
2. [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)
3. [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/)
4. [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/)
5. [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)
6. [1901. 寻找峰值 II](https://leetcode.cn/problems/find-a-peak-element-ii/)
7. [852. 山脉数组的峰顶索引](https://leetcode.cn/problems/peak-index-in-a-mountain-array/)
8. [1095. 山脉数组中查找目标值](https://leetcode.cn/problems/find-in-mountain-array/) 1827
9. [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)
10. [154. 寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)
11. [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)
12. [81. 搜索旋转排序数组 II](https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/)
13. [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)
14. [1539. 第 k 个缺失的正整数](https://leetcode.cn/problems/kth-missing-positive-number/)
15. [540. 有序数组中的单一元素](https://leetcode.cn/problems/single-element-in-a-sorted-array/)
16. [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)







## 枚举技巧

[枚举技巧](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

### 枚举右，维护左

对于双变量问题，例如：两数之和，a(i) + a(j) = target，可以转换成单变量问题，枚举 a(j) 看左边是否有 a(i) = target - a(j)，左边的查找可以用 hash 表维护。

**基础**：

1. [1. 两数之和](https://leetcode.cn/problems/two-sum/)
2. [2441. 与对应负数同时存在的最大正整数](https://leetcode.cn/problems/largest-positive-integer-that-exists-with-its-negative/) 相当于两数之和等于 0
3. [1512. 好数对的数目](https://leetcode.cn/problems/number-of-good-pairs/) 相当于两数之差等于 0
4. [2001. 可互换矩形的组数](https://leetcode.cn/problems/number-of-pairs-of-interchangeable-rectangles/) 1436
5. [1128. 等价多米诺骨牌对的数量](https://leetcode.cn/problems/number-of-equivalent-domino-pairs/description/) 1333
6. [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)
7. [2016. 增量元素之间的最大差值](https://leetcode.cn/problems/maximum-difference-between-increasing-elements/)
8. [219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/)
9. [2260. 必须拿起的最小连续卡牌数](https://leetcode.cn/problems/minimum-consecutive-cards-to-pick-up/) 1365
10. [2815. 数组中的最大数对和](https://leetcode.cn/problems/max-pair-sum-in-an-array/)
11. [2342. 数位和相等数对的最大和](https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits/)
12. [1679. K 和数对的最大数目](https://leetcode.cn/problems/max-number-of-k-sum-pairs/)
13. [面试题 16.24. 数对和](https://leetcode.cn/problems/pairs-with-sum-lcci/)
14. [3623. 统计梯形的数目 I](https://leetcode.cn/problems/count-number-of-trapezoids-i/) 1580
15. [3371. 识别数组中的最大异常值](https://leetcode.cn/problems/identify-the-largest-outlier-in-an-array/) 1644
16. [624. 数组列表中的最大距离](https://leetcode.cn/problems/maximum-distance-in-arrays/)
17. [2364. 统计坏数对的数目](https://leetcode.cn/problems/count-number-of-bad-pairs/) 1622
18. [1014. 最佳观光组合](https://leetcode.cn/problems/best-sightseeing-pair/) 1730
19. [1814. 统计一个数组中好对子的数目](https://leetcode.cn/problems/count-nice-pairs-in-an-array/) 1738
20. [3584. 子序列首尾元素的最大乘积](https://leetcode.cn/problems/maximum-product-of-first-and-last-elements-of-a-subsequence/) 1763
21. [2905. 找出满足差值条件的下标 II](https://leetcode.cn/problems/find-indices-with-index-and-value-difference-ii/) 1764 



**进阶**

1. [1010. 总持续时间可被 60 整除的歌曲](https://leetcode.cn/problems/pairs-of-songs-with-total-durations-divisible-by-60/)
2. [3185. 构成整天的下标对数目 II](https://leetcode.cn/problems/count-pairs-that-form-a-complete-day-ii/) 同 1010 题
3. [2748. 美丽下标对的数目](https://leetcode.cn/problems/number-of-beautiful-pairs/)
4. [2506. 统计相似字符串对的数目](https://leetcode.cn/problems/count-pairs-of-similar-strings/)
5. [2874. 有序三元组中的最大值 II](https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-ii/) 1583
6. [1497. 检查数组对是否可以被 k 整除](https://leetcode.cn/problems/check-if-array-pairs-are-divisible-by-k/) 1787
7. [1031. 两个无重叠子数组的最大和](https://leetcode.cn/problems/maximum-sum-of-two-non-overlapping-subarrays/) 约 2000
8. [2555. 两个线段获得的最多奖品](https://leetcode.cn/problems/maximize-win-from-two-segments/) 2081
9. [1995. 统计特殊四元组](https://leetcode.cn/problems/count-special-quadruplets/) 四个数
10. [3404. 统计特殊子序列的数目](https://leetcode.cn/problems/count-special-subsequences/) 2445 四个数
11. [3267. 统计近似相等数对 II](https://leetcode.cn/problems/count-almost-equal-pairs-ii/) 2545
12. [3480. 删除一个冲突对后最大子数组数目](https://leetcode.cn/problems/maximize-subarrays-after-removing-one-conflicting-pair/) 2764



**思维扩展**

1. [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)
2. [3027. 人员站位的方案数 II](https://leetcode.cn/problems/find-the-number-of-ways-to-place-people-ii/) 2020
3. [3548. 等和矩阵分割 II](https://leetcode.cn/problems/equal-sum-grid-partition-ii/) 2245 代码复用
4. [3713. 最长的平衡子串 I](https://leetcode.cn/problems/longest-balanced-substring-i/) 非暴力写法



### 枚举中间

对于三个或者四个变量的问题，枚举中间的变量往往更好算。

比如问题有三个下标，需要满足 0 <= i < j < k < n，对比一下：

- 枚举 i，后续计算中还需保证 j < k。
- 枚举 j，那么 i 和 k 自动被 j 隔开，互相独立，后续计算中无需关心 i 和 k 的位置关系。

1. [2909. 元素和最小的山形三元组 II](https://leetcode.cn/problems/minimum-sum-of-mountain-triplets-ii/) 1479
2. [3583. 统计特殊三元组](https://leetcode.cn/problems/count-special-triplets/) 1510 也可以一次遍历
3. [1930. 长度为 3 的不同回文子序列](https://leetcode.cn/problems/unique-length-3-palindromic-subsequences/) 1533
4. [3128. 直角三角形](https://leetcode.cn/problems/right-triangles/) 1541
5. [2874. 有序三元组中的最大值 II](https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-ii/) 1583 也可以一次遍历
6. [447. 回旋镖的数量](https://leetcode.cn/problems/number-of-boomerangs/)
7. [456. 132 模式](https://leetcode.cn/problems/132-pattern/)
8. [3067. 在带权树网络中统计可连接服务器对数目](https://leetcode.cn/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network/) 1909
9. [1534. 统计好三元组](https://leetcode.cn/problems/count-good-triplets/) 做到 O(*n*2)
10. [3455. 最短匹配子字符串](https://leetcode.cn/problems/shortest-matching-substring/) 2303
11. [2242. 节点序列的最大得分](https://leetcode.cn/problems/maximum-score-of-a-node-sequence/) 2304
12. [2867. 统计树中的合法路径数目](https://leetcode.cn/problems/count-valid-paths-in-a-tree/) 2428
13. [2552. 统计上升四元组](https://leetcode.cn/problems/count-increasing-quadruplets/) 2433 做法不止一种
14. [3257. 放三个车的价值之和最大 II](https://leetcode.cn/problems/maximum-value-sum-by-placing-three-rooks-ii/) 2553



### 遍历对角线

1. [3446. 按对角线进行矩阵排序](https://leetcode.cn/problems/sort-matrix-by-diagonals/) 1373
2. [2711. 对角线上不同值的数量差](https://leetcode.cn/problems/difference-of-number-of-distinct-values-on-diagonals/) 1429
3. [1329. 将矩阵按对角线排序](https://leetcode.cn/problems/sort-the-matrix-diagonally/) 1548
4. [498. 对角线遍历](https://leetcode.cn/problems/diagonal-traverse/)
5. [面试题 17.23. 最大黑方阵](https://leetcode.cn/problems/max-black-square-lcci/) 做到 O(*n*2log*n*)，难度约 2800



## 前缀和

[枚举技巧](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

nums 表示长为 n 的数组。

sums 表示长为 n+1 的数组。sums(i) 表示数组 nums 前 i 个元素的和，即为前缀和。

- sums(0) = 0
- sums(1) = sums(0) + nums(0)
- sums(2) = sums(1) + nums(1)
- ...
- sums(n) = sums(n-1) + nums(n-1)

sums(r) 表示 [0, r -1] 之间元素的和。



### 基础

**左闭右开公式**：下标为左闭右开区间 [left,right) 的元素和就是 sum[right] − sum[left]。

1. [303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/) 模板题
2. [3427. 变长子数组求和](https://leetcode.cn/problems/sum-of-variable-length-subarrays/) 做到 O(*n*)
3. [2559. 统计范围内的元音字符串数](https://leetcode.cn/problems/count-vowel-strings-in-ranges/) 1435
4. [3152. 特殊数组 II](https://leetcode.cn/problems/special-array-ii/) 1523
5. [1749. 任意子数组和的绝对值的最大值](https://leetcode.cn/problems/maximum-absolute-sum-of-any-subarray/) 1542
6. [3652. 按策略买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-using-strategy/) 1557
7. [2389. 和有限的最长子序列](https://leetcode.cn/problems/longest-subsequence-with-limited-sum/)
8. [3361. 两个字符串的切换距离](https://leetcode.cn/problems/shift-distance-between-two-strings/)
9. [2055. 蜡烛之间的盘子](https://leetcode.cn/problems/plates-between-candles/) 1819
10. [1744. 你能在你最喜欢的那天吃到你最喜欢的糖果吗？](https://leetcode.cn/problems/can-you-eat-your-favorite-candy-on-your-favorite-day/) 1859
11. [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)



**思维扩展：**

1. [1523. 在区间范围内统计奇数数目](https://leetcode.cn/problems/count-odd-numbers-in-an-interval-range/) 1209
2. [3709. 设计考试分数记录器](https://leetcode.cn/problems/design-exam-scores-tracker/) 1648



### 前缀和与哈希表

1. [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)
2. [930. 和相同的二元子数组](https://leetcode.cn/problems/binary-subarrays-with-sum/) 1592
3. [1524. 和为奇数的子数组数目](https://leetcode.cn/problems/number-of-sub-arrays-with-odd-sum/) 1611
4. [974. 和可被 K 整除的子数组](https://leetcode.cn/problems/subarray-sums-divisible-by-k/) 1676
5. [523. 连续的子数组和](https://leetcode.cn/problems/continuous-subarray-sum/) 类似 974 题
6. [2588. 统计美丽子数组数目](https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays/) 1697
7. [525. 连续数组](https://leetcode.cn/problems/contiguous-array/) 0 和 1 个数相同的最长子数组
8. [面试题 17.05. 字母与数字](https://leetcode.cn/problems/find-longest-subarray-lcci/) 同 525 题
9. [3026. 最大好子数组和](https://leetcode.cn/problems/maximum-good-subarray-sum/) 1817
10. [1477. 找两个和为目标值且不重叠的子数组](https://leetcode.cn/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/) 1851
11. [1546. 和为目标值且不重叠的非空子数组的最大数目](https://leetcode.cn/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target/) 1855
12. [1124. 表现良好的最长时间段](https://leetcode.cn/problems/longest-well-performing-interval/) 1908
13. [3728. 边界与内部和相等的稳定子数组](https://leetcode.cn/problems/stable-subarrays-with-equal-boundary-and-interior-sum/) 1909 pair
14. [3381. 长度可被 K 整除的子数组的最大元素和](https://leetcode.cn/problems/maximum-subarray-sum-with-length-divisible-by-k/) 1943
15. [2488. 统计中位数为 K 的子数组](https://leetcode.cn/problems/count-subarrays-with-median-k/) 1999
16. [1590. 使数组和能被 P 整除](https://leetcode.cn/problems/make-sum-divisible-by-p/) 2039
17. [2845. 统计趣味子数组的数目](https://leetcode.cn/problems/count-of-interesting-subarrays/) 2073
18. [1074. 元素和为目标值的子矩阵数量](https://leetcode.cn/problems/number-of-submatrices-that-sum-to-target/) 2189 二维版本的 560 题
19. [1442. 形成两个异或相等数组的三元组数目](https://leetcode.cn/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/) 做到 O(*n*)
20. [3714. 最长的平衡子串 II](https://leetcode.cn/problems/longest-balanced-substring-ii/) 2202 pair
21. [2025. 分割数组的最多方案数](https://leetcode.cn/problems/maximum-number-of-ways-to-partition-an-array/) 2218
22. [3729. 统计有序数组中可被 K 整除的子数组数量](https://leetcode.cn/problems/count-distinct-subarrays-divisible-by-k-in-sorted-array/) 2248 子数组去重 / 避免重复统计
23. [2949. 统计美丽子字符串 II](https://leetcode.cn/problems/count-beautiful-substrings-ii/) 2445 pair



**前缀和与有序集合**：

1. [3364. 最小正和子数组](https://leetcode.cn/problems/minimum-positive-sum-subarray/) 非暴力做法
2. [363. 矩形区域不超过 K 的最大数值和](https://leetcode.cn/problems/max-sum-of-rectangle-no-larger-than-k/)

**思维扩展**：

1. [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)



### 距离和

1. [1685. 有序数组中差绝对值之和](https://leetcode.cn/problems/sum-of-absolute-differences-in-a-sorted-array/) 1496
2. [2615. 等值距离和](https://leetcode.cn/problems/sum-of-distances/) 1793
3. [2602. 使数组元素全部相等的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-all-array-elements-equal/) 1903
4. [2968. 执行操作使频率分数最大](https://leetcode.cn/problems/apply-operations-to-maximize-frequency-score/) 2444
5. [1703. 得到连续 K 个 1 的最少相邻交换次数](https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/) 2467
6. [3086. 拾起 K 个 1 需要的最少行动次数](https://leetcode.cn/problems/minimum-moves-to-pick-k-ones/) 2673



### 状态压缩前缀和

1. [1177. 构建回文串检测](https://leetcode.cn/problems/can-make-palindrome-from-substring/) 1848
2. [1371. 每个元音包含偶数次的最长子字符串](https://leetcode.cn/problems/find-the-longest-substring-containing-vowels-in-even-counts/) 2041
3. [1542. 找出最长的超赞子字符串](https://leetcode.cn/problems/find-longest-awesome-substring/) 2222
4. [1915. 最美子字符串的数目](https://leetcode.cn/problems/number-of-wonderful-substrings/) 2235
5. [2791. 树中可以形成回文的路径数](https://leetcode.cn/problems/count-paths-that-can-form-a-palindrome-in-a-tree/) 2677



### 其他一维前缀和

1. [1310. 子数组异或查询](https://leetcode.cn/problems/xor-queries-of-a-subarray/) 1460
2. [2300. 咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/)
3. [1895. 最大的幻方](https://leetcode.cn/problems/largest-magic-square/) 1781
4. [1878. 矩阵中最大的三个菱形和](https://leetcode.cn/problems/get-biggest-three-rhombus-sums-in-a-grid/) 1898 斜向前缀和
5. [1031. 两个无重叠子数组的最大和](https://leetcode.cn/problems/maximum-sum-of-two-non-overlapping-subarrays/) 做到 O(*n*)
6. [2245. 转角路径的乘积中最多能有几个尾随零](https://leetcode.cn/problems/maximum-trailing-zeros-in-a-cornered-path/) 2037
7. [1712. 将数组分成三个子数组的方案数](https://leetcode.cn/problems/ways-to-split-array-into-three-subarrays/) 2079
8. [1862. 向下取整数对和](https://leetcode.cn/problems/sum-of-floored-pairs/) 2170
9. [2281. 巫师的总力量和](https://leetcode.cn/problems/sum-of-total-strength-of-wizards/) 2621
10. [3445. 奇偶频次间的最大差值 II](https://leetcode.cn/problems/maximum-difference-between-even-and-odd-frequency-ii/) 2694
11. [2983. 回文串重新排列查询](https://leetcode.cn/problems/palindrome-rearrangement-queries/) 2780



**思维扩展**：

1. [1534. 统计好三元组](https://leetcode.cn/problems/count-good-triplets/)



### 二维前缀和

~~~md
[1,2,3]
[4,5,6]
[7,8,9]
定义 sums[i+1][j+1] 表示左上角 a[0][0], 右下角 a[i][j] 子矩阵的元素和, 可以拆分成下面方式计算
[1,2]   [1,2,3]   [1,2]
[4,5] + [4,5,6] - [4,5] + [9]
[7,8]   
sums[i+1][j+1] = sums[i+1][j] + sums[i][j+1] - sums[i][j] + a[i][j]

不拆分需要则需要先计算 第一列/第一行, 先计算第一行, 后续的计算过程中，也需要多加后再减少


如何计算 左上角a[r1][c1], 右下角 a[r2][c2] 子矩阵的元素和, 假设 r1 = c1 = 1, r2 = c2 = 3
[1,2,3]   			[1]
[4,5,6] - [1,2,3] - [4] + [1]
[7,8,9]				[7]
sums[r2+1][c2+1] - sums[r1][c2+1] - sums[r2+1][c1] + sums[r1][c1]

~~~



1. [304. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/)
2. [1314. 矩阵区域和](https://leetcode.cn/problems/matrix-block-sum/) 1484
3. [3070. 元素和小于等于 k 的子矩阵的数目](https://leetcode.cn/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/) 1499
4. [1738. 找出第 K 大的异或坐标值](https://leetcode.cn/problems/find-kth-largest-xor-coordinate-value/) 1671
5. [3212. 统计 X 和 Y 频数相等的子矩阵数量](https://leetcode.cn/problems/count-submatrices-with-equal-frequency-of-x-and-y/) 1673
6. [1292. 元素和小于等于阈值的正方形的最大边长](https://leetcode.cn/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/) 1735



**二维前缀最小值**：

1. [3148. 矩阵中的最大得分](https://leetcode.cn/problems/maximum-difference-score-in-a-grid/) 1820



## 差分

[枚举技巧](https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/)

差分与前缀和的关系，类似**导数**与**积分**的关系。

数组 `a` 的 `差分的前缀和` 就是 数组 a（不变）。

~~~md
数组 a
[1,3,5,7,5]
数组 a 的差分数组 d
[1,2,2,2,-2]
差分数组前缀和
[0,1,3,5,7,5]
~~~

数组 a，差分数组 d，为：

- i = 0，d[i] = a[0]
- i > 0，d[i] = a[i] - a[i-1]

数组 d 具有以下性质：

- 从左到右累加 d 中的元素，可以得到数组 a；
- 以下两个操作是等价的：
  - 把 a 的子数组 a[i], a[i+1] ... a[j] 都加上 x；
  - 把 d[i] 加上 x，d[j+1] 减少 x；



### 一维差分

**基础**：

1. [2848. 与车相交的点](https://leetcode.cn/problems/points-that-intersect-with-cars/) 1230
2. [1893. 检查是否区域内所有整数都被覆盖](https://leetcode.cn/problems/check-if-all-the-integers-in-a-range-are-covered/) 1307
3. [1854. 人口最多的年份](https://leetcode.cn/problems/maximum-population-year/) 1370
4. [面试题 16.10. 生存人数](https://leetcode.cn/problems/living-people-lcci/) 同 1854 题
5. [2960. 统计已测试设备](https://leetcode.cn/problems/count-tested-devices-after-test-operations/) 差分思想
6. [1094. 拼车](https://leetcode.cn/problems/car-pooling/) 1441
7. [1109. 航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings/) 1570
8. [3355. 零数组变换 I](https://leetcode.cn/problems/zero-array-transformation-i/) 1591



**进阶**：

1. [3453. 分割正方形 I](https://leetcode.cn/problems/separate-squares-i/) 1735
2. [2381. 字母移位 II](https://leetcode.cn/problems/shifting-letters-ii/) 1793
3. [995. K 连续位的最小翻转次数](https://leetcode.cn/problems/minimum-number-of-k-consecutive-bit-flips/) 1835
4. [1589. 所有排列中的最大和](https://leetcode.cn/problems/maximum-sum-obtained-of-any-permutation/) 1871
5. [1526. 形成目标数组的子数组最少增加次数](https://leetcode.cn/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/) 1872 差分思想
6. [3356. 零数组变换 II](https://leetcode.cn/problems/zero-array-transformation-ii/) 1913 做法不止一种
7. [1943. 描述绘画结果](https://leetcode.cn/problems/describe-the-painting/) 1969
8. [3224. 使差值相等的最少数组改动次数](https://leetcode.cn/problems/minimum-array-changes-to-make-differences-equal/) 1996 做法不止一种
9. [2327. 知道秘密的人数](https://leetcode.cn/problems/number-of-people-aware-of-a-secret/) 做到 O(*n*)
10. [2251. 花期内花的数目](https://leetcode.cn/problems/number-of-flowers-in-full-bloom/) 2022
11. [2772. 使数组中的所有元素都等于零](https://leetcode.cn/problems/apply-operations-to-make-all-array-elements-equal-to-zero/) 2029
12. [3229. 使数组等于目标数组所需的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-array-equal-to-target/) 2067 差分思想
13. [3529. 统计水平子串和垂直子串重叠格子的数目](https://leetcode.cn/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings/) 2105
14. [798. 得分最高的最小轮调](https://leetcode.cn/problems/smallest-rotation-with-highest-score/) 2130
15. [3347. 执行操作后元素的最高频率 II](https://leetcode.cn/problems/maximum-frequency-of-an-element-after-performing-operations-ii/) 2156
16. [2528. 最大化城市的最小电量](https://leetcode.cn/problems/maximize-the-minimum-powered-city/) 2236
17. [1674. 使数组互补的最少操作次数](https://leetcode.cn/problems/minimum-moves-to-make-array-complementary/) 2333
18. [3362. 零数组变换 III](https://leetcode.cn/problems/zero-array-transformation-iii/) 2424
19. [3655. 区间乘法查询后的异或 II](https://leetcode.cn/problems/xor-after-range-multiplication-queries-ii/) 2454 **商分**
20. [3017. 按距离统计房屋对数目 II](https://leetcode.cn/problems/count-the-number-of-houses-at-a-certain-distance-ii/) 2709



**思维扩展**：

1. [56. 合并区间](https://leetcode.cn/problems/merge-intervals/) 做法见 [我的评论](https://leetcode.cn/problems/merge-intervals/solutions/2798138/jian-dan-zuo-fa-yi-ji-wei-shi-yao-yao-zh-f2b3/comments/2323402/?parent=2316868)
2. [57. 插入区间](https://leetcode.cn/problems/insert-interval/)
3. [732. 我的日程安排表 III](https://leetcode.cn/problems/my-calendar-iii/)
4. [2406. 将区间分为最少组数](https://leetcode.cn/problems/divide-intervals-into-minimum-number-of-groups/) 1713



### 二维差分

![image-20251222200932495](http://47.101.155.205/image-20251222200932495.png)

~~~md
初始化差分数组 长为 n+2 的原因
以一维差分数组为例子, 数组长为 n, 初始值都为 0, int[][] queries 表示对数组 [l,r] 区间的元素都 +1, 求最终的数组结果, 如果初始化差分数组长为 n+1, 对 d[l]++, d[r+1]--, 调整差分数组是没有问题, 
但是还原差分数组的过程时, 计算前缀和的过程就是遍历 d 到 n-1 即可;
可以初始化 d[n+2], d[i+1] = d[i] + d[i+1], 计算差分时都右移一位, a[i] = d[i+1], 
相当于在差分数组前添加了一个 0, 使得 d 数组变成了一个未计算完成的前缀和数组
原数组 [0,0,0,0]
差分数组[0,0,0,0,0,0], 对[1,3] 
[0,0,1,0,0,-1] 本身表示的就是原数组, 计算前缀和 s[1] = a[0]

二维前缀和初始化长为 n+2, 本质也是利用了这个, 相当于填了一行0 和一列 0
二维前缀和 sums[i+1][j+1] = sums[i+1][j] + sums[i][j+1] - sums[i][j] + a[i][j]

~~~



1. [2536. 子矩阵元素加 1](https://leetcode.cn/problems/increment-submatrices-by-one/) 1583
2. [850. 矩形面积 II](https://leetcode.cn/problems/rectangle-area-ii/) 2236 暴力做法
3. [2132. 用邮票贴满网格图](https://leetcode.cn/problems/stamping-the-grid/) 2364
4. [LCP 74. 最强祝福力场](https://leetcode.cn/problems/xepqZ5/)



## 位运算

[位运算](https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/)

**基础**

1. [3370. 仅含置位位的最小整数](https://leetcode.cn/problems/smallest-number-with-all-set-bits/) 1199
2.  [3226. 使两个整数相等的位更改次数](https://leetcode.cn/problems/number-of-bit-changes-to-make-two-integers-equal/) 1247
3.  [1356. 根据数字二进制下 1 的数目排序](https://leetcode.cn/problems/sort-integers-by-the-number-of-1-bits/) 1258
4.  [461. 汉明距离](https://leetcode.cn/problems/hamming-distance/) 1282
5.  [2220. 转换数字的最少位翻转次数](https://leetcode.cn/problems/minimum-bit-flips-to-convert-number/) 1282 同 461 题
6.  [1342. 将数字变成 0 的操作次数](https://leetcode.cn/problems/number-of-steps-to-reduce-a-number-to-zero/) 做到 O(1)
7.  [476. 数字的补数](https://leetcode.cn/problems/number-complement/) 做到 O(1)
8.  [1009. 十进制整数的反码](https://leetcode.cn/problems/complement-of-base-10-integer/) 同 476 题
9.  [868. 二进制间距](https://leetcode.cn/problems/binary-gap/) 1307
10.  [2917. 找出数组中的 K-or 值](https://leetcode.cn/problems/find-the-k-or-of-an-array/) 1389
11.  [693. 交替位二进制数](https://leetcode.cn/problems/binary-number-with-alternating-bits/)
12.  [2657. 找到两个数组的前缀公共数组](https://leetcode.cn/problems/find-the-prefix-common-array-of-two-arrays/)
13.  [面试题 05.01. 插入](https://leetcode.cn/problems/insert-into-bits-lcci/)
14.  [231. 2 的幂](https://leetcode.cn/problems/power-of-two/)
15.  [342. 4 的幂](https://leetcode.cn/problems/power-of-four/)
16.  [191. 位 1 的个数](https://leetcode.cn/problems/number-of-1-bits/)
17.  [338. 比特位计数](https://leetcode.cn/problems/counting-bits/) 也可以 DP
18.  [2595. 奇偶位数](https://leetcode.cn/problems/number-of-even-and-odd-bits/) 做到 O(1)
19.  [2154. 将找到的值乘以 2](https://leetcode.cn/problems/keep-multiplying-found-values-by-two/) 要求：O(*n*) 时间，O(1) 空间
20.  [3211. 生成不含相邻零的二进制字符串](https://leetcode.cn/problems/generate-binary-strings-without-adjacent-zeros/)
21. [3690. 拆分合并数组](https://leetcode.cn/problems/split-and-merge-array-transformation/)



### 异或运算

1. [1486. 数组异或操作](https://leetcode.cn/problems/xor-operation-in-an-array/) 1181
2.  [1720. 解码异或后的数组](https://leetcode.cn/problems/decode-xored-array/) 1284
3.  [2433. 找出前缀异或的原始数组](https://leetcode.cn/problems/find-the-original-array-of-prefix-xor/) 1367
4. [1310. 子数组异或查询](https://leetcode.cn/problems/xor-queries-of-a-subarray/) 1460
5.  [2683. 相邻值的按位异或](https://leetcode.cn/problems/neighboring-bitwise-xor/) 1518
6.  [1829. 每个查询的最大异或值](https://leetcode.cn/problems/maximum-xor-for-each-query/) 1523
7. [2997. 使数组异或和等于 K 的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k/) 1525
8.  [1442. 形成两个异或相等数组的三元组数目](https://leetcode.cn/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/) 1525
9.  [2429. 最小异或](https://leetcode.cn/problems/minimize-xor/) 1532
10.  [2527. 查询数组异或美丽值](https://leetcode.cn/problems/find-xor-beauty-of-array/) 1550
11. [2317. 操作后的最大异或和](https://leetcode.cn/problems/maximum-xor-after-operations/) 1679
12.  [2588. 统计美丽子数组数目](https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays/) 1697
13. [2564. 子字符串异或查询](https://leetcode.cn/problems/substring-xor-queries/) 1959
14.  [1734. 解码异或后的排列](https://leetcode.cn/problems/decode-xored-permutation/) 2024
15.  [2857. 统计距离为 k 的点对](https://leetcode.cn/problems/count-pairs-of-points-with-distance-k/) 2082
16.  [1803. 统计异或值在范围内的数对有多少](https://leetcode.cn/problems/count-pairs-with-xor-in-a-range/) 2479



### 与或运算

1. [2980. 检查按位或是否存在尾随零](https://leetcode.cn/problems/check-if-bitwise-or-has-trailing-zeros/) 1234
2.  [1318. 或运算的最小翻转次数](https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/) 1383
3.  [2419. 按位与最大的最长子数组](https://leetcode.cn/problems/longest-subarray-with-maximum-bitwise-and/) 1496
4. [2871. 将数组分割成最多数目的子数组](https://leetcode.cn/problems/split-array-into-maximum-number-of-subarrays/) 1750
5.  [2401. 最长优雅子数组](https://leetcode.cn/problems/longest-nice-subarray/) 1750
6. [2680. 最大或值](https://leetcode.cn/problems/maximum-or/) 1912 可以做到 O(1) 额外空间
7. [3133. 数组最后一个元素的最小值](https://leetcode.cn/problems/minimum-array-end/) 1935
8. [3108. 带权图里旅途的最小代价](https://leetcode.cn/problems/minimum-cost-walk-in-weighted-graph/) 2109
9.  [3117. 划分数组得到最小的值之和](https://leetcode.cn/problems/minimum-sum-of-values-by-dividing-array/) 2735



### LogTrick

~~~java
// 求数组的连续子数组的所有或值方式
/*
暴力做法, 通过 i = 0, 从左到右遍历, j = i-1, 从右到左遍历, nums[j] |= nums[i]
下面是 O(n^2) 的暴力
i = 1, nums[0] |= nums[1]
i = 2, nums[0] |= nums[2]; nums[1] |= nums[2]
i = 3, nums[0] |= nums[3]; nums[1] |= nums[3]; nums[2] |= nums[3]
随着 i 不断变大 nums[0] >= nums[1] >= nums[2] ... nums[n-1] (nums 表示数字对应的集合)
当 nums[j] | nums[i] == nums[j] 还需要继续循环吗？
不需要, 因为 nums[i] 已经是 nums[j] 的子集和本身, [0, i] 已经在前面更新过了(继续并入也不会改变nums[i] 及 i-1 等), 所有没有计算的必要了
*/
public int subArrayOr(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int i = 0; i < n; i++) {
        int x = nums[i];
        set.add(x);
        for (int j = i - 1; j >= 0; j--) {
            nums[j] |= x;
            set.add(nums[j]);
        }
    }
}
~~~



1. [3171. 找到按位或最接近 K 的子数组](https://leetcode.cn/problems/find-subarray-with-bitwise-or-closest-to-k/) OR 连续子数组 **可栈优化**
2.  [1521. 找到最接近目标值的函数值](https://leetcode.cn/problems/find-a-value-of-a-mysterious-function-closest-to-target/) AND 连续子数组 **可栈优化**
3. [3097. 或值至少为 K 的最短子数组 II](https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/) 1891OR 连续子数组 **可栈优化**
4.  [2411. 按位或最大的最小子数组长度](https://leetcode.cn/problems/smallest-subarrays-with-maximum-bitwise-or/) 1938
5. [3209. 子数组按位与值为 K 的数目](https://leetcode.cn/problems/number-of-subarrays-with-and-value-of-k/) 2050
6.  [898. 子数组按位或操作](https://leetcode.cn/problems/bitwise-ors-of-subarrays/)



### GCD LogTrick

~~~java
/*
gcd = gcd(gcd, nums[j]) gcd 要么不变，要么至少减半
利用 gcd 性质, 连续子数组的 gcd 值个数不会超过 log U, U = max(nums[i])
所以二重循环是 log U 的
*/
public int gcd(int[] nums) {
    int n = nums.length;
    int minSize = n;
    // 记录 前面连续子数组的 GCD 信息[GCD，相同 GCD 右端点]
    /*
    i = 0, g = [0-0]
    i = 1, g = [gcd(0,1)-0, 1-1]
    */
    List<int[]> g = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        // 计算 gcd
        for (int[] p : g) {
            p[0] = gcd(p[0], nums[i]);
        }
        g.add(new int[]{nums[i], i});
        // 筛选出重复的 gcd, j = 0, j 比 i 慢一步
        // [1,1,3,3]
        // j = 0, i = 0
        // j = 0, i = 1
        // j = 0, i = 2; 1 != 3, 0 填值, j++
        // j = 1, i = 3
        int j = 0;
        for (int[] p : g) {
            if (p[0] != g.get(j)[0]) {
                g.get(++j) = p;
            } else {
                g.get(j)[1] = p[1];
            }
        }
        
        g.subList(j + 1, g.size()).clear();
        if (g.get(0)[0] == 1)
            // 这里本来是 i-g.get(0)[1]+1，把 +1 提出来合并到 return 中
            minSize = Math.min(minSize, i - g.get(0)[1]);
    }
    return minSize + n - 1;
}

public int gcdOptimize(int[] nums) {
    int n = nums.length;
    int minSize = n;
    // 记录 前面连续子数组的 GCD 信息[GCD，相同 GCD 右端点]
    List<int[]> g = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        g.add(new int[]{nums[i], i});
        // 原地去重，因为相同的 GCD 都相邻在一起, 计算 gcd 个过程, 同时筛选相同元素
        int j = 0;
        for (int[] p : g) {
            p[0] = gcd(p[0], nums[i]);
            // 先计算最长子数组 gcd
            if (g.get(j)[0] == p[0])
                // 合并相同值，下标取最大的
                g.get(j)[1] = p[1]; 
            else g.set(++j, p);
        }
        g.subList(j + 1, g.size()).clear();
        if (g.get(0)[0] == 1)
            // 这里本来是 i-g.get(0)[1]+1，把 +1 提出来合并到 return 中
            minSize = Math.min(minSize, i - g.get(0)[1]);
    }
    return minSize + n - 1;
}

public static int gcd(int a, int b) {
	// a >= 0, b >= 0;
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
~~~




1. [2447. 最大公因数等于 K 的子数组数目](https://leetcode.cn/problems/number-of-subarrays-with-gcd-equal-to-k/) **gcd 优化题解**
2. [2654. 使数组所有元素变成 1 的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/) **gcd 优化题解**
3. [3605. 数组的最小稳定性因子](https://leetcode.cn/problems/minimum-stability-factor-of-array/) 2410
4. [3574. 最大子数组 GCD 分数](https://leetcode.cn/problems/maximize-subarray-gcd-score/) 非暴力做法



### 拆位/贡献法

1.  [477. 汉明距离总和](https://leetcode.cn/problems/total-hamming-distance/)
2.  [1863. 找出所有子集的异或总和再求和](https://leetcode.cn/problems/sum-of-all-subset-xor-totals/) 可以做到 O(*n*) 时间
3.  [2425. 所有数对的异或和](https://leetcode.cn/problems/bitwise-xor-of-all-pairings/) 1622 可以做到 O(*n*+*m*) 时间
4.  [2275. 按位与结果大于零的最长组合](https://leetcode.cn/problems/largest-combination-with-bitwise-and-greater-than-zero/) 1642
5. [1835. 所有数对按位与结果的异或和](https://leetcode.cn/problems/find-xor-sum-of-all-pairs-bitwise-and/) 1825 **拆位?**
6. [3688. 偶数的按位或运算](https://leetcode.cn/problems/bitwise-or-of-even-numbers-in-an-array/) 看我题解中的思考题（解答见评论）
7. [3153. 所有数对中数位不同之和](https://leetcode.cn/problems/sum-of-digit-differences-of-all-pairs/) 1645 十进制拆位



### 试填法

1.  [421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/) **题解**
2.  [2935. 找出强数对的最大异或值 II](https://leetcode.cn/problems/maximum-strong-pair-xor-ii/) 2349 **421 变体**
3.  [3007. 价值和小于等于 K 的最大数字](https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/) 2258 **题解**
4. [3145. 大数组元素的乘积](https://leetcode.cn/problems/find-products-of-elements-of-big-array/) 2859
5.  [3022. 给定操作次数内使剩余元素的或值最小](https://leetcode.cn/problems/minimize-or-of-remaining-elements-using-operations/) 2918
6. [3287. 求出数组中最大序列值](https://leetcode.cn/problems/find-the-maximum-sequence-value-of-array/) 做到 O(n U logU)，其中 *U*=27



### 恒等式

~~~md

// 2 计算 1 的个数
(A ∪ B) + (A ∩ B) = A + B
~~~



1. [1835. 所有数对按位与结果的异或和](https://leetcode.cn/problems/find-xor-sum-of-all-pairs-bitwise-and/) 1825
2.  [2354. 优质数对的数目](https://leetcode.cn/problems/number-of-excellent-pairs/) 2076 **题解**



### 线性基

1. [3681. 子序列最大 XOR 值](https://leetcode.cn/problems/maximum-xor-of-subsequences/) 模板题
2.  [3630. 划分数组得到最大异或运算和与运算之和](https://leetcode.cn/problems/partition-array-for-maximum-xor-and-and/) 2744



### 思维题

1. [2546. 执行逐位运算使字符串相等](https://leetcode.cn/problems/apply-bitwise-operations-to-make-strings-equal/) 1605
2.  [1558. 得到目标数组的最少函数调用次数](https://leetcode.cn/problems/minimum-numbers-of-function-calls-to-make-target-array/) 1637
3. [2571. 将整数减少到零需要的最少操作数](https://leetcode.cn/problems/minimum-operations-to-reduce-an-integer-to-0/) 1649 巧妙结论
4. [3315. 构造最小位运算数组 II](https://leetcode.cn/problems/construct-the-minimum-bitwise-array-ii/) 1715
5.  [2568. 最小无法得到的或值](https://leetcode.cn/problems/minimum-impossible-or/) 1754
6. [3644. 排序排列](https://leetcode.cn/problems/maximum-k-to-sort-a-permutation/) 1775
7.  [2509. 查询树中环的长度](https://leetcode.cn/problems/cycle-length-queries-in-a-tree/) 1948
8. [2939. 最大异或乘积](https://leetcode.cn/problems/maximum-xor-product/) 2128
9.  [2749. 得到整数零需要执行的最少操作数](https://leetcode.cn/problems/minimum-operations-to-make-the-integer-zero/) 2132
10. [2835. 使子序列的和等于目标的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-form-subsequence-with-target-sum/) 2207
11.  [2897. 对数组执行操作使平方和最大](https://leetcode.cn/problems/apply-operations-on-array-to-maximize-sum-of-squares/) 2301
12. [810. 黑板异或游戏](https://leetcode.cn/problems/chalkboard-xor-game/) 2341



### 其他

~~~md
3. 找出缺失和重复的数字 数学解答
求 1 to n^2 的平方和, m = n^2, m(m+1)(2m+1)/6
求 1 to n^2 的和, m = n^2, m(m+1)/2

求矩阵的平方和, 1到n^2的平方和, 做差, 则有
a^2 - b^2 = d2
(a+b)/(a-b) = d2
由于 a != b, a+b = d2/(a-b), 记 d1 = a-b, a+b = d2/d1
a = (d2/d1 + d1)/2
b = (d2/d1 - d1)/2
d1 = a-b = 矩阵和 - 1到n^2和
d2 = 矩阵的平方和 - 1到n^2的平方和

~~~

1. [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)
2.  [260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii/)
3.  [2965. 找出缺失和重复的数字](https://leetcode.cn/problems/find-missing-and-repeated-values/) **数学思路**
4.  [137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)
5.  [645. 错误的集合](https://leetcode.cn/problems/set-mismatch/)
6. [190. 颠倒二进制位](https://leetcode.cn/problems/reverse-bits/)
7.  [371. 两整数之和](https://leetcode.cn/problems/sum-of-two-integers/)
8.  [201. 数字范围按位与](https://leetcode.cn/problems/bitwise-and-of-numbers-range/)
9. [2438. 二的幂数组中查询范围内的乘积](https://leetcode.cn/problems/range-product-queries-of-powers/) 1610
10.  [1680. 连接连续二进制数字](https://leetcode.cn/problems/concatenation-of-consecutive-binary-numbers/) 1630
11. [1261. 在受污染的二叉树中查找元素](https://leetcode.cn/problems/find-elements-in-a-contaminated-binary-tree/) 做到 O(1) 额外空间
12. [89. 格雷编码](https://leetcode.cn/problems/gray-code/)
13.  [1238. 循环码排列](https://leetcode.cn/problems/circular-permutation-in-binary-representation/) 1775
14.  [982. 按位与为零的三元组](https://leetcode.cn/problems/triples-with-bitwise-and-equal-to-zero/) 2085
15. [3307. 找出第 K 个字符 II](https://leetcode.cn/problems/find-the-k-th-character-in-string-game-ii/) 2232
16.  [1611. 使整数变为 0 的最少操作次数](https://leetcode.cn/problems/minimum-one-bit-operations-to-make-integers-zero/) 2345
17. [3514. 不同 XOR 三元组的数目 II](https://leetcode.cn/problems/number-of-unique-xor-triplets-ii/) 快速沃尔什变换（FWT）
18. [LCP 81. 与非的谜题](https://leetcode.cn/problems/ryfUiz/)

## 矩形

1. [84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)
2.  [1793. 好子数组的最大分数](https://leetcode.cn/problems/maximum-score-of-a-good-subarray/) 1946
3.  [85. 最大矩形](https://leetcode.cn/problems/maximal-rectangle/)
4. [221. 最大正方形](https://leetcode.cn/problems/maximal-square/)
5.  [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/) 做法不止一种
6.  [1504. 统计全 1 子矩形](https://leetcode.cn/problems/count-submatrices-with-all-ones/)
7. [1277. 统计全为 1 的正方形子矩阵](https://leetcode.cn/problems/count-square-submatrices-with-all-ones/)



## 贡献法

1. [907. 子数组的最小值之和](https://leetcode.cn/problems/sum-of-subarray-minimums/) 1976
2.  [2104. 子数组范围和（最大值-最小值）](https://leetcode.cn/problems/sum-of-subarray-ranges/) O(*n*) 做法难度大约 2000
3. [1856. 子数组最小乘积的最大值](https://leetcode.cn/problems/maximum-subarray-min-product/) 2051
4.  [2818. 操作使得分最大](https://leetcode.cn/problems/apply-operations-to-maximize-score/) 2397
5. [2281. 巫师的总力量和（最小值×和）](https://leetcode.cn/problems/sum-of-total-strength-of-wizards/) 2621
6.  [3430. 最多 K 个元素的子数组的最值之和](https://leetcode.cn/problems/maximum-and-minimum-sums-of-at-most-size-k-subarrays/) 2645
7. [2334. 元素值大于变化阈值的子数组](https://leetcode.cn/problems/subarray-with-elements-greater-than-varying-threshold/) 2381
8. [2962. 统计最大元素出现至少 K 次的子数组·我的题解](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/solutions/2560940/hua-dong-chuang-kou-fu-ti-dan-pythonjava-xvwg/) 中的思考题（解答见评论）



## 最小字典序

1. [402. 移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/) 约 1800
2.  [1673. 找出最具竞争力的子序列](https://leetcode.cn/problems/find-the-most-competitive-subsequence/) 1802
3.  [316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/) 2185
4. [316 扩展：重复个数不超过 limit](https://leetcode.cn/contest/tianchi2022/problems/ev2bru/)
5.  [1081. 不同字符的最小子序列](https://leetcode.cn/problems/smallest-subsequence-of-distinct-characters/) 同 316 题
6.  [321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number/)
7.  [2030. 含特定字母的最小子序列](https://leetcode.cn/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter/) 2562



