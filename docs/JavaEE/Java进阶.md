# 进阶

## Java引用强度

强引用 > 软引用 > 弱引用 > 虚引用

**强引用**：传统的创建Java对象的方式，如：Object obj = new Object();任何情况下，只要存在强引用关系，垃圾回收器永远不会回收掉被引用的对象。

**软引用**：描述一些还有用，但非必须的对象。只被软引用关联的对象，在系统要发生内存溢出异常前，会把这些对象列进回收范围进行第二次回收，如果这次回收之后还没有足够的内存，则抛出内存溢出异常。软引用指定是`SoftReference`的属性存放的对象T referent；如果这个对象有被其他强引用关系指向，则不会被垃圾收集器收集。

~~~java
// JVM启动参数 -XX:-PrintGCDetails -Xmn10m -Xms20m -Xmx20m
public class SoftReferenceUtils {

    public static void main(String[] args) {
		// 引用队列
        ReferenceQueue<BigObject> referenceQueue = new ReferenceQueue<BigObject>();
        List<SoftReference<BigObject>> referenceList = new ArrayList<>();
        List<BigObject> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            SoftReference<BigObject> userSoftReference = new SoftReference<>(new BigObject(), referenceQueue);
            if (i < 2){
                list.add(userSoftReference.get());
            }
            referenceList.add(userSoftReference);
            Reference<? extends BigObject> temp = referenceQueue.poll();
            System.out.println(i + ": " + temp);
        }
        for (int i = 0; i < referenceList.size(); i++) {
            if (referenceList.get(i).get() != null){
                System.out.println(i + " hava " + referenceList.get(i));
            }else {
                System.out.println(i + ": " + referenceList.get(i));
            }
        }
        System.out.println();
    }
}

~~~

![image-20250428151828586](http://47.101.155.205/image-20250428151828586.png)



**弱引用**：描述非必须对象，但其强度比软引用更弱一些，被弱引用关联的对象，只能生存到下一次垃圾回收器发生为止。当垃圾回收器开始工作，无论当前内存是否足够，都会回收掉只被弱引用引用的对象。`WeakReference`。对象是否被回收情况同软引用。

~~~java
// JVM启动参数 -XX:-PrintGCDetails -Xmn10m -Xms20m -Xmx20m
public class WeakReferenceUtils {
    public static void main(String[] args) {

        ReferenceQueue<BigObject> referenceQueue = new ReferenceQueue<BigObject>();
        List<WeakReference<BigObject>> referenceList = new ArrayList<>();
        List<BigObject> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            WeakReference<BigObject> userWeakReference = new WeakReference<>(new BigObject(), referenceQueue);
            if (i < 10){
                list.add(userWeakReference.get());
            }
            referenceList.add(userWeakReference);
            Reference<? extends BigObject> temp = referenceQueue.poll();
            System.out.println(i + ": " + temp);
        }
        for (int i = 0; i < referenceList.size(); i++) {
            if (referenceList.get(i).get() != null){
                System.out.println(i + " hava " + referenceList.get(i));
            }else {
                System.out.println(i + ": " + referenceList.get(i));
            }
        }
        System.out.println();
    }
}

~~~



![image-20250428165348053](http://47.101.155.205/image-20250428165348053.png)

![image-20250428172353973](http://47.101.155.205/image-20250428172353973.png)

**虚引用**：最弱的引用关系。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用来取得一个对象实例。为一个对象设置虚引用唯一目的只是为了能够在这个对象被垃圾回收器回收时，收到一个系统通知。`PhantomReference`。里面的存放的对象被强引用指向也会被回收。

~~~java
// -XX:-PrintGCDetails -Xmn10m -Xms20m -Xmx20m
public class PhantomReferenceUtils {

    public static void main(String[] args) {

        ReferenceQueue<BigObject> referenceQueue = new ReferenceQueue<BigObject>();
        List<PhantomReference<BigObject>> referenceList = new ArrayList<>();
        List<BigObject> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            BigObject bigObject = new BigObject();
            PhantomReference<BigObject> userPhantomReference = new PhantomReference<>(bigObject, referenceQueue);
            if (i < 10){
                list.add(bigObject);
            }
            referenceList.add(userPhantomReference);
            Reference<? extends BigObject> temp = referenceQueue.poll();
            System.out.println(i + ": " + temp);
        }
        for (int i = 0; i < referenceList.size(); i++) {
            if (referenceList.get(i).get() != null){
                System.out.println(i + " hava " + referenceList.get(i));
            }else {
                System.out.println(i + ": " + referenceList.get(i));
            }
        }
        System.out.println();
    }
}

~~~



软引用适合做缓存，弱引用适合保存元数据。当Java程序运行过程堆内存不足时，软引用和弱引用里面存放对象没有被强引用指向时，垃圾收集器会自动回收这些内存。
虚引用可以在对象被回收时，有一个通知能收到。其实Java的Object有提供finalize()方法在对象被垃圾收集器做一些处理(这个方法在一个对象仅会执行一次)，但是现在不推荐使用。

![image-20250428155659640](http://47.101.155.205/image-20250428155659640.png)