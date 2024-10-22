# JUC

https://jenkov.com/tutorials/java-concurrency/index.html

## 什么是JUC

JUC是java.util.concurrent,java.util.concurrent.atomic,java.util.concurrent.locks的三个工具包，concurrent并行的，做并发处理的三个包。

## 线程安全的集合

多线程下，给几个添加元素不会造成什么问题，但是在遍历集合元素时会出现异常java.util.ConcurrentModificationException

### CopyOnWriteArrayList

CopyOnWriteArrayList是一个支持多线程情况下读写操作的集合，不会出现ArrayList集合多线程情况下，读取集合元素出现的ConcurrentModificationException异常。

> 原理简单分析

~~~java
public boolean add(E e) {
	final ReentrantLock lock = this.lock;
    lock.lock();
    try {
    	Object[] elements = getArray();
        int len = elements.length;
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        newElements[len] = e;
        setArray(newElements);
        return true;
	} finally {
    	lock.unlock();
	}
}
//给集合添加元素的过程，会先给这个方法上一个lock，lock对象执行lock()方法，其他的方法如果需要lock.lock()就必须等待此方法的lock.unlock(),实现多线程环境只能有一个线程添加元素。而后将集合存储的元素通过数组拷贝，扩容才进行赋值，释放lock锁。

public String toString() {
    return Arrays.toString(getArray());
}
//集合的toString()方法并没有加锁，读取到的数据可能不是最新的。

public Iterator<E> iterator() {
	return new COWIterator<E>(getArray(), 0);
}
//迭代器也是通过数组来创建，创建好了的时候，不会出现ArrayList通过计数来确定迭代器的情况问题出现

~~~



使用Collections集合工具类会出现，下面这种情况

~~~
[1, 2]1
[1, 2, 3, 4, 5, 6, 7, 8, 9]9
[1, 2, 3, 4, 5, 6, 7]3
[1, 2, 3, 4, 5, 6, 7, 8]8
[1, 2, 4, 5, 6, 7]2
[1, 2, 4, 5, 6, 7]4
[1, 2, 6]6
[1, 2, 5, 6]5
[1, 2, 4, 5, 6, 7]7
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]10
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
~~~



### CopyOnWriteArraySet



### ConcurrentHashMap



## 线程计数

### CountDownLatch

> 案例一

~~~java
package com.study.count_down_latch;

import java.util.concurrent.CountDownLatch;

public class Test01 {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch startSingle = new CountDownLatch(1);
        CountDownLatch doneSingle = new CountDownLatch(5);
        for (int i = 0; i < 5; i++) {
            new Thread(new Work01(startSingle,doneSingle)).start();
        }
        Thread.sleep(2000);
        startSingle.countDown();
        System.out.println(Thread.currentThread().getName() + "线程执行开始，是startSingle线程计数器为0");
        doneSingle.await();
        System.out.println(Thread.currentThread().getName() + "线程执行结束，是doneSingle线程计数器为0");
    }
}

class Work01 implements Runnable {

    private final CountDownLatch startSingle;
    private final CountDownLatch doneSingle;

    public Work01(CountDownLatch startSingle,CountDownLatch doneSingle){
        this.startSingle = startSingle;
        this.doneSingle = doneSingle;
    }

    @Override
    public void run() {
        try {

            startSingle.await();
            System.out.println(Thread.currentThread().getName() + "线程执行");
            doneSingle.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

~~~



> 案例二

~~~java
package com.study.count_down_latch;

import java.util.concurrent.*;

public class Test02 {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch doneSingle = new CountDownLatch(10);
        Executor executor = (runnable)->{
            if (runnable instanceof Work02){
                Work02 work = (Work02) runnable;
                new Thread(work,"第"+(work.i+1)).start();
            }
        };

        for (int i = 0; i < 10; i++) {
            executor.execute(new Work02(doneSingle,i));
        }
        doneSingle.await();
        Thread.sleep(1000);
        System.out.println("doneSingle线程的计数器为0，线程退出等待" + "doneSingle.getCount(): " + doneSingle.getCount());
    }
}

class Work02 implements Runnable {
    private final CountDownLatch doneSingle;
    final int i;
    
    public Work02(CountDownLatch doneSingle,int i){
        this.doneSingle = doneSingle;
        this.i = i;
    }


    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "线程获取的数据: " + i);
        doneSingle.countDown();
    }
}
//通过Exector类的接口封装线程的启动
~~~



### CyclicBarrier

可以控制一组线程进行循环工作。

~~~java
//CyclicBarrier对象调用await()方法，await()调用私有的dowait方法，在方法块中创建了一个final ReentrantLock lock = this.lock;lock.lock();属性index = --count;如果index==0;这个时候当前线程就可以调用CyclicBarrier构造方法传递的Runnable对象的run方法，然后执行nextGeneration方法，给CyclicBarrier的属性重新赋值。如果这个时候Runnable对象调用run方法出现异常，就执行breakBarrie方法。
//在调用Runnable的run出现异常，直接走breakBarrier方法，没有修改generation对象，只是修改了属性broken为true，count计数为原来的值，唤醒其他线程，这个时候这个线程就退出了，其他线程再此调用dowait的方法时由于broken为true，直接抛出异常。这个时候，在barrier.await();之前的代码可以执行一次，之后由于唤醒之后，直接在for循环里面由于broken为true直接抛出异常。

//再index==0的这个过程中，没有出现异常，调用nextGeneration方法，直接返回结果0。如果不为0，则进行一个for的死循环。
private void nextGeneration() {
	// signal completion of last generation
    trip.signalAll();
    // set up next generation
    count = parties;
    generation = new Generation();
}
private void breakBarrier() {
	generation.broken = true;
    count = parties;
    trip.signalAll();
}
private final Condition trip = lock.newCondition();
//不为0分为两种情况，第一种情况是直接调用await方法不传参数，第二种情况是传递等待时间参数
//1.线程直接等待trip.await();这个时候如果线程被唤醒，如果当前线程没有执行interrupt(或者说当前线程的isInterrupted是false)，继续向下执行。如果程序是被interrupt则下次唤醒时，index==0时，会执行上面的breakBarrier方法，直接抛出了异常，根本就没有进入for循环。
//在第一次执行barrier.await()之后执行Thread.currentThread().interrupt();都可以得到await方法的结果。第二次进入dowait方法，因为Thread.interrupted()方法的结果为true，都直接抛出异常。这个过程，barrier.await()执行之前的代码可以执行两次。
~~~



> 测试代码

~~~java
package com.study.cyclic_Barrier;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CyclicBarrier;

public class Test01 {
    public static void main(String[] args) throws InterruptedException, FileNotFoundException {

        //System.setOut(new PrintStream(new FileOutputStream("out.txt")));
        Runnable barrierAction = ()->{
            System.out.println("Action: " + Thread.currentThread().getName());
            //int i = 1/0;
        };
        CyclicBarrier cyclicBarrier = new CyclicBarrier(10,barrierAction);

        List<Thread> threads = new ArrayList<>(10);
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(new Worker(cyclicBarrier));
            threads.add(thread);
            thread.start();
        }
        for(Thread thread : threads){
            thread.join();
        }
    }
}
class Worker implements Runnable {

    final CyclicBarrier barrier;
    int i;
    public Worker(CyclicBarrier barrier){
        this.barrier = barrier;
        i = 0;
    }

    @Override
    public void run() {
        while (true){
            System.out.println(Thread.currentThread().getName() + "线程" + ",barrier.getParties(): " + barrier.getParties());
            try {
                //System.out.print("barrier.await()的返回值: "+barrier.await());
                barrier.await();
                //Thread.currentThread().interrupt();
            } catch (InterruptedException e) {
                e.printStackTrace();
                return;
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
                return;
            }
        }
    }
}
~~~



### Semaphore

| 方法      | 作用                                                         |
| --------- | ------------------------------------------------------------ |
| acquire() | 获取许可证，如果可用立即返回，不可用则线程进如休眠状态，直到Semaphore释放release信号量，或者当前线程被其他线程中断。 |
| release() | 释放一个许可证，将其返回至Semaphore                          |

> 原理初探

~~~java
private final Sync sync;
//Sync继承AbstractQueuedSynchronizer，Sync有两个子类：NonfairSync，FairSync。sync在Semaphore创建对象时初始化，默认创建NonfairSync
public void acquire() throws InterruptedException {
	sync.acquireSharedInterruptibly(1);
}
//AbstractQueuedSynchronizer的方法，tryAcquireShared(1)方法调用的是NonfaireSync或者FairSync具体的实现方法。
public final void acquireSharedInterruptibly(int arg)
            throws InterruptedException {
	if (Thread.interrupted())
    	throw new InterruptedException();
	if (tryAcquireShared(arg) < 0)
    	doAcquireSharedInterruptibly(arg);
}
//调用tryAcquireShared(1)的过程中，使用Unsage对象将state和now执行比较并交换方法。将结果返回，如果返回值大于等于0，都不会执行doAcquireSharedInterruptibly方法。
private static final Unsafe unsafe = Unsafe.getUnsafe();
~~~

~~~java
static final class NonfairSync extends Sync {
	private static final long serialVersionUID = -2694183684443567898L;

    NonfairSync(int permits) {
    	super(permits);
	}

    protected int tryAcquireShared(int acquires) {
    	return nonfairTryAcquireShared(acquires);
	}
}
final int nonfairTryAcquireShared(int acquires) {
	for (;;) {
    	int available = getState();
        int remaining = available - acquires;
        //当小于0时，并没有进行比较和交换
        if (remaining < 0 || compareAndSetState(available, remaining))
            return remaining;
	}
}

static final class FairSync extends Sync {
	private static final long serialVersionUID = 2014338818796000944L;

   	FairSync(int permits) {
    	super(permits);
	}
	protected int tryAcquireShared(int acquires) {
    	for (;;) {
        	if (hasQueuedPredecessors())
            	return -1;
			int available = getState();
            int remaining = available - acquires;
            if (remaining < 0 || compareAndSetState(available, remaining))
                    return remaining;
		}
	}
}
//释放信号的时候没有看懂
~~~

~~~java
package com.study.semaphore;

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyPool pool = new MyPool();

        new Thread(()->{
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            for (int i = 0; i < 10; i++) {
                pool.putItem(i);
            }
        }).start();

        for (int i = 0; i < 20; i++) {
            if (i == 10){
                Thread.sleep(1000);
            }
            try {
                System.out.println(pool.getItem());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
class MyPool {
    private static final int MAX_AVAILABLE = 1;
    private final Semaphore available = new Semaphore(MAX_AVAILABLE, false);
    protected boolean[] used = new boolean[MAX_AVAILABLE];
    protected Object[] items;

    public MyPool(){
        this.items = new Object[10];
        for (int i = 0; i < 10 ; i++) {
            items[i] = i;
        }
    }

    public Object getItem() throws InterruptedException {
        available.acquire();
        return getNextAvailableItem();
    }

    public void putItem(Object x) {
        if (markAsUnused(x))
            available.release();
    }

    protected synchronized Object getNextAvailableItem() {
        for (int i = 0; i < MAX_AVAILABLE; ++i) {
            if (!used[i]) {
                used[i] = true;
                return items[i];
            }
        }
        return null;
    }

    protected synchronized boolean markAsUnused(Object item) {
        for (int i = 0; i < MAX_AVAILABLE; ++i) {
            if (item!=null && item.equals(items[i])) {
                if (used[i]) {
                    used[i] = false;
                    return true;
                } else
                    return false;
            }
        }
        return false;
    }

}
~~~





## 阻塞队列

### BlockingQueue

BlockingQueue的实现类ArrayBlockingQueue，实现的put(E e),及take()运用到了Lock锁的ReentrantLock，lockInterruptibly()，以及Condition的await()和single()来实现队列元素控制。

|         | 抛出异常  | 返回值   | 阻塞   | 超时退出           |
| ------- | --------- | -------- | ------ | ------------------ |
| insert  | add(e)    | offer(e) | put(e) | offer(e,time,unit) |
| remove  | remove()  | poll()   | take() | poll(time,unit)    |
| examine | element() | peek()   | no     | no                 |

### ArrayBlockingQueue

~~~java
package com.study.blocking_queue;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class Test {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue blockingQueue = new ArrayBlockingQueue(10);
        new Thread(new Provider(blockingQueue),"生产者").start();
        new Thread(new Consumer(blockingQueue),"消费者").start();

        System.out.println(Thread.activeCount());
        Thread.sleep(1000);
        System.out.println(Thread.activeCount());
    }
}
class Provider implements Runnable{

    private final BlockingQueue blockingQueue;
    private int i = 0;

    public Provider(BlockingQueue blockingQueue){
        this.blockingQueue = blockingQueue;
    }

    @Override
    public void run() {
        while (true){
            try {
                Object temp = provider();
                if (temp.equals(100))
                    break;
                blockingQueue.put(temp);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    Object provider(){
        return i++;
    }
}

class Consumer implements Runnable{

    private final  BlockingQueue blockingQueue;

    public Consumer(BlockingQueue blockingQueue){
        this.blockingQueue = blockingQueue;
    }

    @Override
    public void run() {
        while (true){
            try {
                System.out.println(Thread.currentThread().getName() + "线程消费:" + blockingQueue.take());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
~~~



### SynchronousQueue

put进去一个元素就需要，线程就进入了等待

~~~java
这是为true调用的方法，可以通过debug查看：F8单步执行 F7进入 强制进入 退出
//SyschronousQueue.put(item)添加元素是调用底层的E transfer(E e,boolean timed,long nanos)方法
transferer.transfer(e, false, 0);//返回值不为null
//transferer有两个子类TransferQueue(false),TransferStack(true)
E transfer(E e,boolean timed,long nanos){
    QNode s = null; // constructed/reused as needed
	boolean isData = (e != null);
    for (;;) {
		QNode t = tail;
        QNode h = head;
        if (t == null || h == null)         // saw uninitialized value
        	continue;                       // spin自旋锁

		if (h == t || t.isData == isData) { // empty or same-mode
        	QNode tn = t.next;
            if (t != tail)                  // inconsistent read
            	continue;
			if (tn != null) {               // lagging tail
            	advanceTail(t, tn);
                continue;
			}
            if (timed && nanos <= 0)        // can't wait
            	return null;
			if (s == null)
            	s = new QNode(e, isData);
			if (!t.casNext(null, s))        // failed to link in
            	continue;

			advanceTail(t, s);              // swing tail and wait
            Object x = awaitFulfill(s, e, timed, nanos);
            if (x == s) {                   // wait was cancelled
            	clean(t, s);
                return null;
			}

			if (!s.isOffList()) {           // not already unlinked
				advanceHead(t, s);          // unlink if head
                if (x != null)              // and forget fields
                	s.item = s;
                s.waiter = null;
			}
			return (x != null) ? (E)x : e;

		} else {                            // complementary-mode
			QNode m = h.next;               // node to fulfill
            if (t != tail || m == null || h != head)
            	continue;                   // inconsistent read

			Object x = m.item;
            if (isData == (x != null) ||    // m already fulfilled
                x == m ||                   // m cancelled
                !m.casItem(x, e)) {         // lost CAS
					
                advanceHead(h, m);          // dequeue and retry
				continue;
			}

            advanceHead(h, m);              // successfully fulfilled
            LockSupport.unpark(m.waiter);
			return (x != null) ? (E)x : e;
		}
	}
}
public E take() throws InterruptedException {
	E e = transferer.transfer(null, false, 0);
    if (e != null)
    	return e;
	Thread.interrupted();
    throw new InterruptedException();
}
//take调用同样的方法
~~~

~~~java
package com.study.synchronous_queue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.SynchronousQueue;

public class Test {
    public static void main(String[] args) {
        BlockingQueue queue = new SynchronousQueue();

        new Thread(()->{
            try {
                queue.put(1);
                System.out.println(123);
                queue.put(2);
                System.out.println(456);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
        new Thread(()->{
            try {
                System.out.println(queue.take());
                System.out.println(queue.take());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
~~~

这个队列的offer(E e)方法，只有在其他线程在等待接收他时才能返回true。



## 线程池

Executors工具类可以创建线程池，不推荐使用

![image-20220725232514241](http://47.101.155.205/image-20220725232514241.png)

### Executors

####newFixedThreadPool()

~~~java
//源码
//Executors.newFixedThreadPool()方法的源码
public static ExecutorService newFixedThreadPool(int nThreads) {
	return new ThreadPoolExecutor(nThreads, nThreads,
    							0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>());
}
//ThreadPoolExecutor的构造方法
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue) {
	this(corePoolSize,
         maximumPoolSize,
         keepAliveTime,
         unit,
         workQueue,
         Executors.defaultThreadFactory(), 
         defaultHandler);
}
//使用工具类创建这个线程池的缺点是：LinkedBlockingQueue队列的容量初始化是Integer.MAX_VALUE的最大值，所以能往队列里面一直添加元素
//在线程池启动线程的时候，最开始是直接启动线程，只有在线程池满了，不能添加的时候才会玩队列里面添加元素，队列能添加的元素满了，这个时候就出现了异常，因为线程池队列满了还有一种执行策略，默认的是AbortPolicy策略，拒绝策略是抛出
~~~

> 测试代码

~~~java
package com.study.pool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestPool01 {
    public static void main(String[] args) throws InterruptedException {
        final ExecutorService executorService = Executors.newFixedThreadPool(20);
        for (int i = 0; i < 20; i++) {
            executorService.execute(()->{
                while (true){
                }
            });
        }
        Thread.sleep(1000);
        System.out.println(Thread.activeCount());
    }
}
//
~~~

#### newCachedThreadPool

~~~java
public static ExecutorService newCachedThreadPool() {
	return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
	return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>(),
                                  threadFactory);
}
//底层blockQueue使用的时offer(e)，直接返回false，不能往队列里面添加元素
//最大的线程数量时Integer的最大值
//不一定每次都会创建线程，线程如果在poll消息就能够不创建新的线程
~~~



####newWorkStealingPool

~~~java
public static ExecutorService newWorkStealingPool() {
	return new ForkJoinPool(Runtime.getRuntime().availableProcessors(),
                            ForkJoinPool.defaultForkJoinWorkerThreadFactory,
                            null, true);
}
~~~



#### newSingleThreadExecutor

~~~java
public static ExecutorService newSingleThreadExecutor() {
	return new FinalizableDelegatedExecutorService(
        new ThreadPoolExecutor(1, 1,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue<Runnable>()));
}
~~~









###ThreadPoolExecutor

使用底层ThreadPoolExecutor的类创建线程池

~~~java
public ThreadPoolExecutor(int corePoolSize,//核心池数量
                          int maximumPoolSize,//最大连接池数量，只有在队列也满了的情况下才会使用
                          long keepAliveTime,//存活时间
                          TimeUnit unit,//时间单位
                          BlockingQueue<Runnable> workQueue,//阻塞队列设置
                          ThreadFactory threadFactory,//线程工厂
                          RejectedExecutionHandler handler) //处理策略，就是队列添加元素处理的四种方式
~~~

这种方式不关闭线程池，不会和工具类的一样，自动关闭

~~~java
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
private static final int CAPACITY   = (1 << 29) - 1;//2^29 - 1 536870911
private static final int RUNNING    = -1 << COUNT_BITS;//-2^29 -536870912
private static final int SHUTDOWN   =  0 << COUNT_BITS;// 0
private static final int STOP       =  1 << COUNT_BITS;//2^29 536870912
private static final int TIDYING    =  2 << COUNT_BITS;//2^30 1073741824
private static final int TERMINATED =  3 << COUNT_BITS;// 1610612736
// 当 c 的二进制补码中的最高位是 0，也就是 c 是非负数时，结果>=0
// 当 c 的二进制补码中的最高位是 1，也就是 c 是负数时，结果<0
private static int runStateOf(int c)     { return c & ~CAPACITY; }//c & -2^29
private static int workerCountOf(int c)  { return c & CAPACITY; }// c & (2^29 -1)
private static int ctlOf(int rs, int wc) { return rs | wc; }// rs | wc
private static boolean isRunning(int c) { return c < SHUTDOWN;}
~~~

~~~java
public void execute(Runnable command) {
	if (command == null)
    	throw new NullPointerException();
	int c = ctl.get();//第一次的值-536870912
    if (workerCountOf(c) < corePoolSize) { // c & 536870911 第一次结果为0,为true之后，会将ctl自增1
    	if (addWorker(command, true))
        	return;
		c = ctl.get();
	}//上面的if是为了启动线程池，启动达到核心线程池的大小，就不会走上面的方法了
    if (isRunning(c) && workQueue.offer(command)) {
    	int recheck = ctl.get();
        if (! isRunning(recheck) && remove(command))
        	reject(command);
		else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
	}else if (!addWorker(command, false))//这里调用有两种情况，一是队列满了，最大线程池还没有满继续启动线程结果为true
        //二也是队列满了，最大线程也满了，根据终止策略判断怎么运行。
     	reject(command);
}
~~~

~~~java
private boolean addWorker(Runnable firstTask, boolean core) {
	retry:
    for (;;) {
    	int c = ctl.get();//-536870912这个只随的线程的启动增大
        int rs = runStateOf(c);//-536870912，电脑运行达不到哪个线程数量，这里大部分情况是这个固定值,c只要为正数rs
		// Check if queue empty only if necessary.仅在必要时检查队列是否为空
        if (rs >= SHUTDOWN && ! (rs == SHUTDOWN && firstTask == null &&! workQueue.isEmpty()))
			return false;
		for (;;) {
        	int wc = workerCountOf(c);// 0
            if (wc >= CAPACITY || wc >= (core ? corePoolSize : maximumPoolSize))
				return false;
			if (compareAndIncrementWorkerCount(c))//true
            	break retry;// 结束外面的for循环
			c = ctl.get();  // Re-read ctl 重读ctl
            if (runStateOf(c) != rs)
            	continue retry;
				// else CAS failed due to workerCount change;retry inner loop。else由于workerCount更改，CAS失败;重试内循环
		}
	}

	boolean workerStarted = false;
    boolean workerAdded = false;
    Worker w = null;
    try {
    	w = new Worker(firstTask);
        final Thread t = w.thread;
        if (t != null) {
        	final ReentrantLock mainLock = this.mainLock;
            mainLock.lock();
			try {
            // Recheck while holding lock.保持锁定时重新检查
            // Back out on ThreadFactory failure or if shut down before lock acquired.
            // 在ThreadFactory失败或在获得锁之前关闭时退出。
				int rs = runStateOf(ctl.get());
				if (rs < SHUTDOWN || (rs == SHUTDOWN && firstTask == null)) {
					if (t.isAlive()) // precheck that t is startable 预先检查线程t是否可启动
                    	throw new IllegalThreadStateException();
					workers.add(w);
                    int s = workers.size();
                    if (s > largestPoolSize)
                    	largestPoolSize = s;
					workerAdded = true;
				}
			} finally {
            	mainLock.unlock();
                //加锁是为了创建好线程的准备工作
			}
            if (workerAdded) {
            	t.start();//在这里开启了线程，如果这里启动发送异常，finally会执行addWorkerFailed方法
                //这里提供Worker作为中介，实现了Runnable接口，这里是通过Worker实例来启动一个线程，底层通过调用runWorker(this)在线程中调用execute(r)实参的r的run方法。
                //通过getTask方法让程序进入循环，一直等，bao'zh'n
                workerStarted = true;
			}
		}
	} finally {
    	if (! workerStarted)
        	addWorkerFailed(w);
	}
	return workerStarted;
}
~~~



#### 拒绝策略

##### AbortPolicy

直接抛出异常

~~~java
public static class AbortPolicy implements RejectedExecutionHandler {
        public AbortPolicy() { }

	public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
    	throw new RejectedExecutionException("Task " + r.toString() +
                                             " rejected from " +
                                             e.toString());
        }
}
~~~

##### DiscardPolicy

任务直接放弃

~~~java
public static class DiscardPolicy implements RejectedExecutionHandler {
        public DiscardPolicy() { }
        
        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        }
}
~~~



##### DiscardOldestPolicy

从队列中移除一个任务

~~~java
public static class DiscardOldestPolicy implements RejectedExecutionHandler {
        public DiscardOldestPolicy() { }

        /**
         * Obtains and ignores the next task that the executor
         * would otherwise execute, if one is immediately available,
         * and then retries execution of task r, unless the executor
         * is shut down, in which case task r is instead discarded.
         *
         * @param r the runnable task requested to be executed
         * @param e the executor attempting to execute this task
         */
        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
            if (!e.isShutdown()) {
                e.getQueue().poll();
                e.execute(r);
            }
        }
    }
~~~



#####CallerRunsPolicy

线程池满了，队列满了，调用Runnable的run方法，不开线程

~~~java
public static class CallerRunsPolicy implements RejectedExecutionHandler {
        public CallerRunsPolicy() { }

        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
            if (!e.isShutdown()) {
                r.run();
            }
        }
}
~~~



#### runWorker

启动线程调用逻辑

~~~java
private static boolean runStateAtLeast(int c, int s) { return c >= s; }
~~~



~~~java
final void runWorker(Worker w) {
	Thread wt = Thread.currentThread();
    Runnable task = w.firstTask;
    w.firstTask = null;
    w.unlock(); // allow interrupts
    boolean completedAbruptly = true;
    try {
    	while (task != null || (task = getTask()) != null) {
        	w.lock();
            //如果线程池不是暂停状态，确保线程是中断的；如果不是，确保线程不是中断的。STOP值为2^29，ctl只有在创建线程时才会自增，初始值为-2^29，正常情况下不可能达到 ctl.get() > STOP
            if ((runStateAtLeast(ctl.get(), STOP) || 
                 (Thread.interrupted() && runStateAtLeast(ctl.get(), STOP))) && !wt.isInterrupted())
				wt.interrupt();
			try {
               	//在ThreadPoolExecutor中，这个是一个空的protected方法。可以自定义线程池扩展该方法
            	beforeExecute(wt, task);
                Throwable thrown = null;
                try {
                	task.run();//将所用传递给execute(r)的实参，都是一个对象方法的调用
				} catch (RuntimeException x) {
                	thrown = x; throw x;
				} catch (Error x) {
                	thrown = x; throw x;
				} catch (Throwable x) {
                	thrown = x; throw new Error(x);
				} finally {
                    //在ThreadPoolExecutor中，这个是一个空的protected方法。可以自定义线程池扩展该方法
                	afterExecute(task, thrown);
				}
			} finally {
            	task = null;
                w.completedTasks++;
                w.unlock();
			}
		}
		completedAbruptly = false;
	} finally {
    	processWorkerExit(w, completedAbruptly);
	}
}
//这里提供while(task != null || getTask() != null){}代码里面的finally，将任务释放，再去队列里面拿取新的Runnable对象，这样就实现了线程的复用。
//beforeExecute、afterExecute可以实现一个方法调用的aop切入。
//线程在调用Runnable对象的run方法出现异常时,会捕捉到异常向外抛出，然后执行processWorkerExit(w,true)
//线程没有Runnable对象的run方法调用是，最终执行processWorkerExit(w,false)
~~~



#### getTask

等待获取队列中的任务

~~~java
private Runnable getTask() {
	boolean timedOut = false; // Did the last poll() time out?
	for (;;) {
    	int c = ctl.get();
        int rs = runStateOf(c);
		// Check if queue empty only if necessary.
        if (rs >= SHUTDOWN && (rs >= STOP || workQueue.isEmpty())) {
        	decrementWorkerCount();
            return null;
		}
        
        int wc = workerCountOf(c);
        //allowCoreThreadTimeOut是否允许核心线程超时退出，在设置保持存活时间和allowCoreThreadTimeOut为true时
        //会关闭核心线程 que
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;
        
        if ((wc > maximumPoolSize || (timed && timedOut)) && (wc > 1 || workQueue.isEmpty())) {
			if (compareAndDecrementWorkerCount(c))
            	return null;
			continue;
		}
        
		try {
            //关键代码在这里，没有设置线程超时时间，会用take取队列中的元素，会一直阻塞。
        	Runnable r = timed ? workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) : workQueue.take();
			if (r != null)
            	return r;
			timedOut = true;
		} catch (InterruptedException retry) {
        	timedOut = false;
		}
	}
}
~~~





#### processWorkerExit

~~~java
private void decrementWorkerCount() {
	do {} while (! compareAndDecrementWorkerCount(ctl.get()));//有点CAS自旋锁的意思
}
private boolean compareAndDecrementWorkerCount(int expect) {
	return ctl.compareAndSet(expect, expect - 1);
}
~~~

~~~java
private void processWorkerExit(Worker w, boolean completedAbruptly) {
	//出现异常，ctl自减1
    if (completedAbruptly)
    	decrementWorkerCount();
    
	final ReentrantLock mainLock = this.mainLock;
	mainLock.lock();
    try {
    	completedTaskCount += w.completedTasks;//统计已近完成的Runnable command数量
        workers.remove(w);//移除对象Worker
	} finally {
    	mainLock.unlock();
	}
	
    tryTerminate();//一般情况下，没有重要代码执行

    int c = ctl.get();
    if (runStateLessThan(c, STOP)) {
    	if (!completedAbruptly) {
            //allowCoreThreadTimeOut默认为false，核心线程即使在空闲时也能保持活动状态。
            //true 核心线程使用 keepAliveTime 来超时等待工作。
        	int min = allowCoreThreadTimeOut ? 0 : corePoolSize;
            if (min == 0 && ! workQueue.isEmpty())
            	min = 1;
			if (workerCountOf(c) >= min)//线程启动过workerCountOf(c)就大于0
				return; // replacement not needed
		}
        addWorker(null, false);
	}
}
private static boolean runStateLessThan(int c, int s) { return c < s; } STOP为2^29
~~~

~~~java
final void tryTerminate() {
	for (;;) {
    	int c = ctl.get();
        //isRunning return c < 0,基本上为true
        if (isRunning(c) || runStateAtLeast(c, TIDYING) || 
            (runStateOf(c) == SHUTDOWN && ! workQueue.isEmpty()))
			return;
		if (workerCountOf(c) != 0) { // Eligible to terminate
        	interruptIdleWorkers(ONLY_ONE);
            return;
		}

        final ReentrantLock mainLock = this.mainLock;
        mainLock.lock();
        try {
        	if (ctl.compareAndSet(c, ctlOf(TIDYING, 0))) {
            	try {
                	terminated();
				} finally {
                	ctl.set(ctlOf(TERMINATED, 0));
                    termination.signalAll();
				}
                return;
			}
		} finally {
        	mainLock.unlock();
		}
		// else retry on failed CAS
	}
}
~~~





#### toString

~~~java
public boolean isLocked() { return isHeldExclusively(); }
protected boolean isHeldExclusively() { return getState() != 0; }//Worker对象初始化state值为-1
//在command的run方法执行完之后，执行Worker的unlock最终执行setState(0)
public void unlock()      { release(1); } //将线程标记为不是正在使用
public final boolean release(int arg) {
	if (tryRelease(arg)) {
    	Node h = head;
        if (h != null && h.waitStatus != 0)
        	unparkSuccessor(h);
		return true;
	}
    return false;
}
protected boolean tryRelease(int unused) {
	setExclusiveOwnerThread(null);
    setState(0);
	return true;
}
//提供Worker.lock设置state的值为1
public void lock() { acquire(1); }
public final void acquire(int arg) {
	if (!tryAcquire(arg) && acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
protected boolean tryAcquire(int unused) {
	if (compareAndSetState(0, 1)) {
    	setExclusiveOwnerThread(Thread.currentThread());
		return true;
	}
    return false;
}
~~~

~~~java
public String toString() {
	long ncompleted;
    int nworkers, nactive;
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
    	ncompleted = completedTaskCount;
        nactive = 0;
        nworkers = workers.size();
        for (Worker w : workers) {
        	ncompleted += w.completedTasks;
            //判断的线程是否有程序运行
            if (w.isLocked())
            	++nactive;
            }
	} finally {
    	mainLock.unlock();
	}
    int c = ctl.get();
    String rs = (runStateLessThan(c, SHUTDOWN) ? "Running" : 
                 (runStateAtLeast(c, TERMINATED) ? "Terminated" : "Shutting down"));
	return super.toString() + 
        "[" + rs +
        ", pool size = " + nworkers +
        ", active threads = " + nactive +
        ", queued tasks = " + workQueue.size() +
        ", completed tasks = " + ncompleted +
        "]";
}
~~~



使用线程池的优点：

1. 可以让程序在多长时间没有连接的情况下自动退出
2. 



线程池最大连接数确定

CPU确定，CPU密集型

IO确定，IO密集型



### Thread

#### interrupted()和isInterrupted()

这两个底层都是调用native本地方法

interrupted()静态方法

~~~java
// 获取当前线程的中断状态,并清除中断状态。
public static boolean interrupted() {
	return currentThread().isInterrupted(true);
}

~~~



isInterrupted()实例方法

~~~java
// 获取当前线程的中断状态
public boolean isInterrupted() {
	return isInterrupted(false);
}

~~~





### ForkJoinPool





## 四大函数式接口

###Consumer

传入一个值没有返回值

~~~java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
~~~



### Function 

接收处理返回

~~~java
@FunctionalInterface
public interface Function<T, R> {

    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }
    
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
~~~



### Predicate

断定接口，输入任何值，返回布尔值

~~~java
@FunctionalInterface
public interface Predicate<T> {
    
    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
~~~



### Supplier

得到一个类型结果

~~~java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
~~~





## Stream流式计算

forEach();

filter()

map()

count()

sorter()这里比较的时候，如果是对象，需要实现Comparable接口，重写conpareTo方法

limit()



## ForkJoin

分支合并

要找到任务的拆分点，





## 异步回调





## JMM

JMM模型定义的内存分为工作内存和主内存，工作内存是从主内存拷贝的副本，属于线程私有。当线程启动时，从主内存中拷贝副本到工作内存，执行相关指令操作，最后写回主内存。

- 原子性

- 可见性
- 指令重排



javap -c .class文件

~~~java
 public static void add();
    Code:
       0: getstatic     #2                  // Field i:I
       3: iconst_1
       4: iadd
       5: putstatic     #2                  // Field i:I
       8: return
~~~



### volatile

- 保证可见性
- 不保证原子性
- 禁止指令重排（有序性）



### synchronized

- 可见性

　　1）线程解锁前，必须把共享变量的最新值刷新到主内存中

　　2）线程加锁时，将清空工作内存中共享变量的值，从而使用共享变量时需要从主内存中重新获取最新的值

- 原子性

原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束。synchronized底层由于采用了字节码指令monitorenter和monitorexit来隐式地使用这lock和unlock两个操作，使得其操作具有原子性。

- 有序性

synchronized有序性表现在as-if-serial语义，但as-if-serial语义不能确保多线程情况下的禁止指令重排。如单例中的双重检验锁写法



对象创建的过程：1、再堆中分配内存；2、调用构造器创建实例；3、将引用指向实例的内存



## 单例模式

### 饿汉式单例

~~~java
//饿汉式单例
public class Hungry {

    private Hungry(){
        System.out.println("Hungry对象创建");
    }

    private static Hungry hungry = new Hungry();

    public static Hungry getInstance(){
        return hungry;
    }
}
~~~

###懒汉式单例（单线程）

~~~java
//懒汉式单例
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            lazy = new Lazy();
        }
        retrun lazy;
    }
}
~~~

###懒汉式单例（多线程）

~~~java
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            synchronized(Lazy.class){
                //判断的原因是，多线程环境下，加入两个线程都进入了if代码块，可是a线程先拿到锁，这个时候对象已经创建好了
                if(lazy == null){
                    lazy = new Lazy();
                }
            }
        }
        retrun lazy;
    }
}
//对象创建的过程：1、再堆中分配内存；2、调用构造器创建实例；3、将引用指向实例的内存
//因为指令重排的原因
~~~



###DCL懒汉式+volatile

~~~java
public class Lazy {

    private Lazy(){
        System.out.println("Lazy对象创建");
    }

    private static volatile Lazy lazy = null;

    public static Lazy getInstance(){
        if(lazy == null){
            synchronized(Lazy.class){
                //情况1:判断的原因是，多线程环境下，加入两个线程都进入了if代码块，可是a线程先拿到锁，这个时候对象已经创建好了
                //情况2:加入这个时候有第三个线程来拿lazy对象，这个时候a线程因为，指令重排，lazy对象不为null，可是实例化过程还没有构造完成，导致出现异常。这个时候就是volatile发挥作用了。
                if(lazy == null){
                    lazy = new Lazy();
                }
            }
        }
        retrun lazy;
    }
}
~~~



###内部类单例

~~~java
public class SingleInner{
    private SingleInner(){
        if(SingleHolder.single != null){
            throw new RuntimeException("不要用反射破坏单例");
        }
    }
    
    private static class SingleHolder(){
    	private static SingleInner single = new SingleInner();    
    }
    
    public static SingleInner getInstance(){
        return SingleHolder.single;
    }
    
}
~~~





~~~java
public static void test03();
    Code:
       0: iconst_0
       1: istore_0
       2: iload_0
       3: bipush        100
       5: if_icmpge     29
       8: new           #3                  // class java/lang/Thread
      11: dup
      12: invokedynamic #8,  0              // InvokeDynamic #2:run:()Ljava/lang/Runnable;
      17: invokespecial #5                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
      20: invokevirtual #6                  // Method java/lang/Thread.start:()V
      23: iinc          0, 1
      26: goto          2
      29: return
~~~

~~~java
public static void test05();
    Code:
       0: iconst_0
       1: istore_0
       2: iload_0
       3: bipush        100
       5: if_icmpge     29
       8: new           #3                  // class java/lang/Thread
      11: dup
      12: invokedynamic #10,  0             // InvokeDynamic #4:run:()Ljava/lang/Runnable;
      17: invokespecial #5                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
      20: invokevirtual #6                  // Method java/lang/Thread.start:()V
      23: iinc          0, 1
      26: goto          2
      29: return
~~~

### 枚举单例

javap -p .class java自带的反编译命令

~~~java
public enum SingleEnum {
    SINGLE("张三",11);

    private String name;
    private int age;

    SingleEnum(String name,int age){
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public SingleEnum getInstance(){
        return SINGLE;
    }
}
~~~





## CAS

### 乐观锁

乐观锁是一种思想，操作过程中没有任何锁的参与，乐观锁是和悲观锁相对的

总是假设最好的情况，每次去拿的数据都认为别人不会修改，所以不会上锁，在更新的时候会判断一下在此期间别人有没有更新过数据。**数据拿到到更新的过程**有没有被修改。

https://www.jianshu.com/p/766093f59687

https://zhuanlan.zhihu.com/p/94762520

https://zhuanlan.zhihu.com/p/137818729



```java
Integer i1 = 127;
Integer i2 = 127;
System.out.println(i1 == i2);//true
Integer i3 = 128;
Integer i4 = 128;
System.out.println(i3 == i4);//false
```



### 悲观锁

总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会阻塞，直到它拿到锁（共享资源每次只给一个线程使用，其它线程阻塞，用完后再把资源转让给其它线程）。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。

## 锁

lock锁的方法，锁住，不影响synchronized锁住的调用，两者互不干预

~~~java
//lock锁锁住的了的对象，没有解锁，其他线程无法访问，可以使用lock.newCondition().await()释放锁，让其他线程访问，但是线程的唤醒必须要这个线程使用了lock锁(如果释放锁之后才唤醒线程，会出现IllegalMonitorStateException异常)，要在lock.unlock()之前调用lock.newCondition().signal()来唤醒，否则出现异常。
//Condition虽然唤醒了线程，可是所有的线程还是解锁，其他的线程才能拿到锁去执行代码。
~~~

1. synchronized锁：synchronized是Java中内置的一种锁机制，它可以用于同步方法和同步块，保证线程访问共享资源时的互斥性。
2. ReentrantLock锁：ReentrantLock是Java中的一种可重入锁，它与synchronized类似(如果一个线程已经获取了ReentrantLock锁，并且还没有释放它，那么它可以继续获取该锁，而不会因为自己已经持有该锁而被阻塞。)，但是更加灵活和可控，可以用于更复杂的锁场景。
3. ReadWriteLock锁：ReadWriteLock是Java中提供的一种读写锁，它允许多个线程同时读取共享资源，但只允许一个线程进行写操作。
4. StampedLock锁：StampedLock是Java中的一种乐观锁，它可以在不进行加锁的情况下读取和写入共享资源，从而提高了并发性能。
5. Semaphore锁：Semaphore是Java中的一种信号量锁，它可以控制同时访问共享资源的线程数量，从而实现限流和流量控制。
6. Condition锁：Condition是Java中的一种条件锁，它可以用于线程间的通信和协调，例如等待某个条件满足后再进行执行。


### ReentrantLock

~~~java
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockDemo {

    private ReentrantLock lock = new ReentrantLock();

    public void outer() {
        lock.lock(); // 获取锁
        try {
            inner(); // 调用内部方法
        } finally {
            lock.unlock(); // 释放锁
        }
    }

    public void inner() {
        lock.lock(); // 内部方法再次获取同一个锁
        try {
            // 执行业务逻辑
        } finally {
            lock.unlock(); // 释放锁
        }
    }
}

~~~

在使用可重入锁时，线程必须在释放所有持有的锁之后才能彻底释放锁，否则其他线程无法获取该锁

> synchronized和ReentrantLock锁之间的区别

1. 性能：低并发情况下，synchronized优于ReentrantLock，因为synchronized内置了JVM的优化机制，可以将加锁和解锁操作内联到代码中。在高并发情况下，ReentrantLock性能更好，因为它支持公平锁和非公平锁两种模式，而且支持中断、超时等高级特性
2. 可中断性：ReentrantLock支持中断等待锁的线程，当一个线程等待锁的过程中，可以被其他线程中断()，synchronized不支持
3. 公平性：当多个线程等待同一个锁时，ReentrantLock可以保证等待时间最长的线程先获取到锁(公平锁)，而synchronized做不到
4. 等待通知机制：synchronized内置了wait、notify、notifyAll等方法，实现线程之间的等待唤醒机制，ReentrantLock需要借助Condition对象来实现(lock锁锁住的了的对象，没有解锁，其他线程无法访问，可以使用lock.newCondition().await()释放锁，让其他线程访问，但是线程的唤醒必须要这个线程使用了lock锁(如果释放锁之后才唤醒线程，会出现IllegalMonitorStateException异常)，要在lock.unlock()之前调用lock.newCondition().signal()来唤醒，否则出现异常)



> 中断性

~~~java
//如果等待锁的线程在等待锁的过程中已经获取了锁，并且没有释放锁的话，那么中断请求是不会中断已经持有锁的线程的，因为 ReentrantLock 是支持嵌套获取锁的。只有当等待锁的线程还没有获取到锁，正在等待时，才能通过中断请求来中断等待锁的线程。
public class InterruptTest {

    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock();

        Thread waitingThread = new Thread(() -> {
            try {
                lock.lockInterruptibly();
                // !Thread.currentThread().isInterrupted()zhon'dua
                while (true){

                }
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + " => Thread interrupted.");
                //lock.unlock();
            }
        },"T1");
        waitingThread.start();

        try {
            Thread.sleep(1000);
            System.out.println("1");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
		// 线程获取到锁不会被中断
        waitingThread.interrupt();

        lock.lock();

        System.out.println("2");

    }
}
~~~





jps 获取进程号

jps -l

jstack 获取堆栈信息