# 排序

乾坤有序，万物有律。



## 插入排序

抓排的过程，一部分已经握在手上，另一部分还未抓，在牌堆中。在一开始，手上的牌为空，所有的牌都在桌上。而每抓一张牌，需要将新抓来的牌插入到手中牌里合适的位置，使手上的牌保持某个秩序。

观察上述抓牌和理牌的过程，可以发现，在任何时候，手上的牌为有序的，而牌桌的牌为无序的。整个抓牌过程中，有序的部分不断变大，无序部分不断变小，知道无序部分为空。这种不断从无序部分抽取一个元素，并将其插入到有序部分合适位置上的排序方式，称为插入排序。

时间复杂度 O(n^2)

~~~java
public class InsertionSort {
    
    public static void sort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int val = nums[i];
            // 前面已经有序部分
            int j = i - 1;
            while (j >= 0 && nums[j] > val) {
                // 较大元素右移
                nums[j + 1] = nums[j];
                j--;
            }
            // nums[i] 真正插入的位置
            nums[j + 1] = val;
        }
    }

}
~~~

优化思路，由于 [0, i-1] 部分有序，可以在有序数组部分进行二分查找，查找第一个大于等于 nums[i+1] 的下标，该下标 +1 就是需要插入的位置。

时间复杂度O(nlogn)，关键在于元素插入的处理。



## 归并排序

将一个大序列排序问题分解成对两个子序列排序问题，两个子序列可以再分解成各自两个子序列的排序问题，在子序列排好序后，将结果合并即可，子问题和原问题相似，可以使用递归解决。

排序过程：

1. 如果数组长度小于等于 1，递归结束；
2. 将序列从中间分解成两个子序列，知道子序列长度小于等于 1；
3. 递归对两个子序列排序；
4. 将排好序的两个子序列进行合并。

~~~java
public class MergeSort {

    public static void sort(int[] nums) {
        mergeSort(nums, 0, nums.length - 1, new int[nums.length]);
    }

    public static void mergeSort(int[] nums, int l, int r, int[] temp) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;

        mergeSort(nums, l, mid, temp);
        mergeSort(nums, mid + 1, r, temp);
        // 合并 [l, mid] [mid+1, r]
        merge(l, mid, r, nums, temp);
    }

    public static void merge(int l, int mid, int r, int[] nums, int[] temp) {
        int i = l;
        int j = mid + 1;
        int t = 0;
        while (i <= mid && j <= r) {
            if (nums[i] <= nums[j]) {
                temp[t++] = nums[i++];
            } else {
                temp[t++] = nums[j++];
            }
        }
        while (i <= mid) temp[t++] = nums[i++];
        while (j <= r) temp[t++] = nums[j++];
        System.arraycopy(temp, 0, nums, l, t);
    }

}
~~~

时间复杂度：O(nlogn)。

空间复杂度：O(n)。

时间复杂度计算：设对长度为 n 的数组排序所需时间为 T(n)

1. 分解：计算中间位置，常数级，O(1)；
2. 治理：递归排序两个大小为 n/2 的子数组，耗时为 2*T(n/2)；
3. 合并：将两个有序数组合并，需要遍历 n 个元素进行合并，耗时为 O(n)。

得到递推方程：T(n) = 2T(n/2) + O(n)。

长为 n 的数组，可以两两分解成 log n 高的树，每一层合并需要的时间为 O(n)。



## 计数排序

对于特定元素 x，如果能知道给定序列中比它小的元素个数，则 x 的位置可以确定。

例如：如果比 x 小的元素有 m 个，则 x 在输出数组里面的所占的位置为 m+1。

计数排序：对于每一个元素，我们计数比它小的元素个数，然后将这些元素放在合适的位置上。

~~~java
public class Solution {

    public static void sort(int[] nums) {
        int mx = 0;
        for (int x : nums) {
            mx = Math.max(x, mx);
        }
        int[] cnt = new int[mx + 1];
        for (int x : nums) {
            cnt[x]++;
        }
        int i = 0;
        for (int v = 0; v < cnt.length; v++) {
            while (cnt[v]-- > 0) {
                nums[i++] = v;
            }
        }
    }

}
~~~

时间复杂度：O(n + k)，k 取决于 nums 中的最大元素。

空间复杂度：O(k)。

