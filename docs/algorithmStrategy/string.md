# 字符串

## 1. KMP

真前缀：不包含最后一个字符；

真后缀：不包含第一个字符（只有考虑这一点即可，后缀变短后，前缀最后位也比较不到）；

next[i] 表示子串 s[0: i] 最长公共真前缀和真后缀长度，next[0] = 0，没有公共真前缀和真后缀，也用 0 表示。

**next 函数性质**：

1. `next[i] <= next[i-1] + 1`：证明如下：

设 `j = next[i]`，根据 next 数组定义，则有 `s[0, j-1] = s[i-j+1, i]`，将两个区间右端点左移一位，可得：

`s[0, j-2] = s[i-j+1, i-1]`，根据 next 数组定义，j-1 至少是 s[0: i-1] 的一个公共真前缀和真后缀，所以：

`next[i-1] >= j + 1`，可得 `next[i] <= next[i-1] + 1`。

2.  `s[i] = s[next[i-1]]`，则 `s[i] = next[i-1] + 1`，证明如下：

设 `j = next[i-1]`，根据 next 数组定义，则有 `s[0, j-1] = s[i-j+1, i-1]`，由于 `s[i] = s[j]`，相当于将两个区间右端点右移一位：`s[0, j] = s[i-j+1, i]`，根据 next 数组定义，则有 `next[i] >= next[i-1] + 1`，结合第一个性质 next[i] = next[i-1] + 1。计算过程就用到了该性质。



![image-20260526170912449](http://47.101.155.205/image-20260526170912449.png)



![image-20260526202928303](http://47.101.155.205/image-20260526202928303.png)



1. [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/) **模板题**
2. [796. 旋转字符串](https://leetcode.cn/problems/rotate-string/) 做到线性时间复杂度
3. [1392. 最长快乐前缀](https://leetcode.cn/problems/longest-happy-prefix/) 1876
4. [3036. 匹配模式数组的子数组数目 II](https://leetcode.cn/problems/number-of-subarrays-that-match-a-pattern-ii/) 1895
5. [1764. 通过连接另一个数组的子数组得到一个数组](https://leetcode.cn/problems/form-array-by-concatenating-subarrays-of-another-array/) 做到线性时间复杂度
6. [1668. 最大重复子字符串](https://leetcode.cn/problems/maximum-repeating-substring/) 做到线性时间复杂度
7. [459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/) 做到线性时间复杂度
8. [2800. 包含三个字符串的最短字符串](https://leetcode.cn/problems/shortest-string-that-contains-three-strings/) 做到线性时间复杂度
9. [3008. 找出数组中的美丽下标 II](https://leetcode.cn/problems/find-beautiful-indices-in-the-given-array-ii/) 2016
10. [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/) 也可以用 Manacher 算法
11. [3529. 统计水平子串和垂直子串重叠格子的数目](https://leetcode.cn/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings/) 2105
12. [686. 重复叠加字符串匹配](https://leetcode.cn/problems/repeated-string-match/) 约 2200
13. [3455. 最短匹配子字符串](https://leetcode.cn/problems/shortest-matching-substring/) 2303
14. [1397. 找到所有好字符串](https://leetcode.cn/problems/find-all-good-strings/) 2667
15. [3037. 在无限流中寻找模式 II](https://leetcode.cn/problems/find-pattern-in-infinite-stream-ii/) （会员题）同 28 题
16. [3571. 最短超级串 II](https://leetcode.cn/problems/find-the-shortest-superstring-ii/) （会员题）联系 2800 题









## 2. Z 函数

对于一个长为 n 的字符串 s，定义函数 z[i] 表示 s 和 s[i, n-1]（s[i] 开始的后缀） 的最长公共前缀长度，则 z 被称为 s 的 z 函数，特别地，z[0] = 0。

z 函数的朴素算法，时间复杂度 n^2。

~~~java
public int[] z(char[] s) {
    int[] z = new int[n];
    for (int i = i; i < n; i++) {
    	while (i + z[i] < n && s[i+z[i]] == s[z[i]]) {
        	z[i]++;
        }
    }
}
~~~

依次从 1 到 n-1 顺序计算 z[i] 的值，在计算的过程中，会利用已经计算好的 z[0], z[1], ...z[i-1]。

计算过程中维护右端点最靠右的匹配段，记为 [l, r]，根据定义，s[l : r] 是 s 的前缀，z[l] = r-l+1，在计算的过程中，保证 l <= i，初始化 l = r = 0。

在计算的过程中：s[l : r] = s[0 : r-l]

- 如果 i <= r，根据定义有 s[i : r] = s[i-l : r-l]（[l, r] 左端点向右移动 `i-l`），则 z[i] >= min(z[i-l], r-i+1)，分类讨论：
  - 如果 z[i-l] < r-i+1（s[i-l :r-l] 区间只有部分和前缀匹配，由于 s[i : r] = s[i-l : r-l]，所有不可能比 z[i-l] 大），则 z[i] = z[i-l]；
  - 否则 z[i-l] >= r-i+1，则 z[i] = r-i+1，继续向右扩展 r，直到 s[i+z[i]] != s[z[i]]；
- 如果 i > r，则按照朴素算法，从 s[i] 开始比较，暴力计算 z[i]；
- 计算出 z[i]，后，右端点为 i + z[i] - 1，如果大于 r，则更新 r = i + z[i] - 1，l = i；





1. [2223. 构造字符串的总得分和](https://leetcode.cn/problems/sum-of-scores-of-built-strings/) 2220 **模板题**
2. [3031. 将单词恢复初始状态所需的最短时间 II](https://leetcode.cn/problems/minimum-time-to-revert-word-to-initial-state-ii/) 2278
3. [3045. 统计前后缀下标对 II](https://leetcode.cn/problems/count-prefix-and-suffix-pairs-ii/) 2328
4. [3303. 第一个几乎相等子字符串的下标](https://leetcode.cn/problems/find-the-occurrence-of-first-almost-equal-substring/) 2509
5. [3292. 形成目标字符串需要的最少字符串数 II](https://leetcode.cn/problems/minimum-number-of-valid-strings-to-form-target-ii/) 2662
6. [3474. 字典序最小的生成字符串](https://leetcode.cn/problems/lexicographically-smallest-generated-string/) 做到 O(*n*+*m*)



**LCP 数组**

1. [2430. 对字母串可执行的最大删除数](https://leetcode.cn/problems/maximum-deletions-on-a-string/) 2102
2. [3388. 统计数组中的美丽分割](https://leetcode.cn/problems/count-beautiful-splits-in-an-array/) 2365
3. [2573. 找出对应 LCP 矩阵的字符串](https://leetcode.cn/problems/find-the-string-with-lcp/) 2682
4. [1977. 划分数字的方案数](https://leetcode.cn/problems/number-of-ways-to-separate-numbers/) 2817





## 3. Manacher

[wiki Manacher](https://oi-wiki.org/string/manacher/)

Manacher 算法可以计算以 s[i]（或者 s[i] 和 s[i+1]）为回文中心最长回文子串的长度。

原字符串为 s，将 s 按以下规则转换成 t。

1. s 每个字符前插入 #；
2. s 开头添加 ^，s 结尾添加 $。

s 字符串长为 n，则 t 字符串长为 2n + 3。

例如 s = abaabc，t = ^#a#b#a#a#b#c#$。

s 下标 si 和 t 下标 ti 的关系是：2si + 2 = ti。

定义 halfLen[i] 表示字符串 t 以 t[i] 为回文中心的最长回文子串的回文半径（包括回文中心）。

- 当 ti 是偶数（>= 2）时，halfLen[ti] - 1 可以表示以 s[ti/2 - 1] 为中心的最长回文子串长度；t[ti] 前后有字符 #，所以 halfLen[ti] >= 2，当出现回文字符时，后面会紧跟字符 #，halfLen[ti] += 2，原字符串子串回文半径为 halfLen[ti]/2，回文串长度为：回文半径 * 2 - 1，即 halfLen[ti] - 1。
- 当 ti 是奇数（>= 3）时，halfLen[ti] - 1 可以表示以 s[ti/2 - 1] 和 s[ti/2] 为中心的最长回文子串长度；t[ti]字符为 #，所以 halfLen[ti] >= 1，当出现回文字符时，后面会紧跟回文字符+#，halfLen[ti] +=2，原字符串子串回文半径为 halfLen[ti]/2（下取整），回文串长度为：回文半径 * 2，即 halfLen[ti] - 1。



1. [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/) **模板题**
2. [647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/) 计算回文子串个数
3. [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)
4. [3327. 判断 DFS 字符串是否是回文串](https://leetcode.cn/problems/check-if-dfs-strings-are-palindromes/) 2454
5. [1745. 分割回文串 IV](https://leetcode.cn/problems/palindrome-partitioning-iv/) 做到 O(*n*)
6. [1960. 两个回文子字符串长度的最大乘积](https://leetcode.cn/problems/maximum-product-of-the-length-of-two-palindromic-substrings/) 2691
7. [3844. 最长的准回文子字符串](https://leetcode.cn/problems/longest-almost-palindromic-substring/) 做到 O(*n*log*n*)
8. [3504. 子字符串连接后的最长回文串 II](https://leetcode.cn/problems/longest-palindrome-after-substring-concatenation-ii/) 做到 O(*n*+*m*)



**中心扩展法 思想**

1. [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/) **模板题**
2. [3844. 最长的准回文子字符串](https://leetcode.cn/problems/longest-almost-palindromic-substring/) 1990
3. [2472. 不重叠回文子字符串的最大数目](https://leetcode.cn/problems/maximum-number-of-non-overlapping-palindrome-substrings/) 2013
4. [3504. 子字符串连接后的最长回文串 II](https://leetcode.cn/problems/longest-palindrome-after-substring-concatenation-ii/) 2398
5. [3615. 图中的最长回文路径](https://leetcode.cn/problems/longest-palindromic-path-in-graph/) 2463
6. [3579. 字符串转换需要的最小操作数](https://leetcode.cn/problems/minimum-steps-to-convert-string-with-operations/) 做到 n^2





## 4. 字符串哈希



1. [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)
2. [187. 重复的 DNA 序列](https://leetcode.cn/problems/repeated-dna-sequences/)
3. [1316. 不同的循环子字符串](https://leetcode.cn/problems/distinct-echo-substrings/) 1837
4. [1297. 子串的最大出现次数](https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/) 做到 O(*n*)
5. [2261. 含最多 K 个可整除元素的子数组](https://leetcode.cn/problems/k-divisible-elements-subarrays/) 做到 O(n^2)
6. [3722. 反转后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-reverse/) 做到 O(*n*log*n*)
7. [3213. 最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/) 2171
8. [1367. 二叉树中的链表](https://leetcode.cn/problems/linked-list-in-binary-tree/) 做到线性
9. [1044. 最长重复子串](https://leetcode.cn/problems/longest-duplicate-substring/) 2429
10. [718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)
11. [1923. 最长公共子路径](https://leetcode.cn/problems/longest-common-subpath/) 2661
12. [3292. 形成目标字符串需要的最少字符串数 II](https://leetcode.cn/problems/minimum-number-of-valid-strings-to-form-target-ii/) 2662
13. [3844. 最长的准回文子字符串](https://leetcode.cn/problems/longest-almost-palindromic-substring/) 做到 O(*n*log*n*) 或 O(*n*)
14. [2168. 每个数字的频率都相同的独特子字符串的数量](https://leetcode.cn/problems/unique-substrings-with-equal-digit-frequency/) （会员题）同 2261 题
15. [1554. 只有一个不同字符的字符串](https://leetcode.cn/problems/strings-differ-by-one-character/) （会员题）
16. [1062. 最长重复子串](https://leetcode.cn/problems/longest-repeating-substring/) （会员题）同 1044 题





## 5. 最小表示法



1. [899. 有序队列](https://leetcode.cn/problems/orderly-queue/) *k*=1 的情况即为最小表示法，可以 O(*n*) 解决
2. [3403. 从盒子中找出字典序最大的字符串 I](https://leetcode.cn/problems/find-the-lexicographically-largest-string-from-the-box-i/)
3. [1625. 执行操作后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-applying-operations/)
4. [3406. 从盒子中找出字典序最大的字符串 II](https://leetcode.cn/problems/find-the-lexicographically-largest-string-from-the-box-ii/) （会员题）
5. [1708. 长度为 K 的最大子数组](https://leetcode.cn/problems/largest-subarray-length-k/) （会员题）见进阶问题





## 6. 字典树



## 7. AC 自动机



1. [1032. 字符流](https://leetcode.cn/problems/stream-of-characters/) 1970 **模板题**
2. [面试题 17.17. 多次搜索](https://leetcode.cn/problems/multi-search-lcci/) **模板题**
3. [1408. 数组中的字符串匹配](https://leetcode.cn/problems/string-matching-in-an-array/) 做到线性时间复杂度
4. [3213. 最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/) 2171
5. [2781. 最长合法子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-valid-substring/) 2204
6. [3292. 形成目标字符串需要的最少字符串数 II](https://leetcode.cn/problems/minimum-number-of-valid-strings-to-form-target-ii/) 2662
7. [3758. 将数字词转换为数字](https://leetcode.cn/problems/convert-number-words-to-digits/) （会员题）更通用的做法





## 8. 后缀数组/后缀自动机



1. [1163. 按字典序排在最后的子串](https://leetcode.cn/problems/last-substring-in-lexicographical-order/) 1864
2. [1754. 构造字典序最大的合并字符串](https://leetcode.cn/problems/largest-merge-of-two-strings/) 做到 O(*n*+*m*)
3. [2904. 最短且字典序最小的美丽子字符串](https://leetcode.cn/problems/shortest-and-lexicographically-smallest-beautiful-string/) 做到 O(*n*log*n*)
4. [3722. 反转后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-reverse/) 做到 O(*n*log*n*)
5. [3213. 最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/) 2171
6. [1044. 最长重复子串](https://leetcode.cn/problems/longest-duplicate-substring/) 2429
7. [718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)
8. [1923. 最长公共子路径](https://leetcode.cn/problems/longest-common-subpath/) 2661
9. [1408. 数组中的字符串匹配](https://leetcode.cn/problems/string-matching-in-an-array/)
10. [3729. 统计有序数组中可被 K 整除的子数组数量](https://leetcode.cn/problems/count-distinct-subarrays-divisible-by-k-in-sorted-array/) 不保证数组非递增的做法 本质不同子数组
11. [3076. 数组中的最短非公共子字符串](https://leetcode.cn/problems/shortest-uncommon-substring-in-an-array/)
12. [3844. 最长的准回文子字符串](https://leetcode.cn/problems/longest-almost-palindromic-substring/) 做到 O(*n*log*n*)
13. [3504. 子字符串连接后的最长回文串 II](https://leetcode.cn/problems/longest-palindrome-after-substring-concatenation-ii/) 做到 O(*n*+*m*)
14. [1316. 不同的循环子字符串](https://leetcode.cn/problems/distinct-echo-substrings/)
15. [3388. 统计数组中的美丽分割](https://leetcode.cn/problems/count-beautiful-splits-in-an-array/) 做到 O(*n*log*n*) 或 O(*n*)
16. [2564. 子字符串异或查询](https://leetcode.cn/problems/substring-xor-queries/) 
17. [面试题 16.18. 模式匹配](https://leetcode.cn/problems/pattern-matching-lcci/) 后缀树
18. [1698. 字符串的不同子字符串个数](https://leetcode.cn/problems/number-of-distinct-substrings-in-a-string/) （会员题）
19. [1062. 最长重复子串](https://leetcode.cn/problems/longest-repeating-substring/) （会员题）同 1044 题
20. [3135. 通过添加或删除结尾字符来同化字符串](https://leetcode.cn/problems/equalize-strings-by-adding-or-removing-characters-at-ends/) （会员题）



## 9. 子序列自动机

1. [792. 匹配子序列的单词数](https://leetcode.cn/problems/number-of-matching-subsequences/) 1695
2. [514. 自由之路](https://leetcode.cn/problems/freedom-trail/) 约 2400 做到 O(*nm*)
3. [2014. 重复 K 次的最长子序列](https://leetcode.cn/problems/longest-subsequence-repeated-k-times/) 2558
4. [1055. 形成字符串的最短路径](https://leetcode.cn/problems/shortest-way-to-form-string/) （会员题）
5. [727. 最小窗口子序列](https://leetcode.cn/problems/minimum-window-subsequence/) （会员题）





## 10. 其它

1. [3485. 删除元素后 K 个字符串的最长公共前缀](https://leetcode.cn/problems/longest-common-prefix-of-k-strings-after-removal/) 2290 LCP 的性质
2. [466. 统计重复个数](https://leetcode.cn/problems/count-the-repetitions/) 做到 O(∣*s*1∣+∣*s*2∣)
3. [3491. 电话号码前缀](https://leetcode.cn/problems/phone-number-prefix/) （会员题）非暴力做法

