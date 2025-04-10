# JUC

https://jenkov.com/tutorials/java-concurrency/index.html

## 什么是JUC

JUC是java.util.concurrent,java.util.concurrent.atomic,java.util.concurrent.locks的三个工具包，concurrent并行的，做并发处理的三个包。

## 线程安全的集合

多线程下，给几个添加元素不会造成什么问题，但是在遍历集合元素时会出现异常`java.util.ConcurrentModificationException`



### List

#### CopyOnWriteArrayList

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



#### CopyOnWriteArraySet

写时拷贝Set集合。

#### ConcurrentHashMap



### Map



#### HashTable

通过`synchronized`关键字修饰方法实现线程安全，所有在多线程对HashTable的读读、读写、写写操作都是互斥的。



#### SynchronizedMap

Collections.synchronizedMap(map)将一个集合转换成一个线程安全的Map集合。





#### ConcurrentHashMap

通过CAS机制和自旋锁实现线程安全，性能比HahsTable和SynchronizedMap要高。



#### ConcurrentSkipListMap

线程安全、可排序的集合。

通过CAS保证并发安全。



### Queue

Queue继承了Collection接口，表示一种有序的集合，大部分遵循典型的FIFO(First-In-First-Out先进先出)规则。

对于集合的增、删、取都提供了两种方式：一种是失败抛出异常；另外一种是返回一个特定的元素(null/false)。

对于Queue的实现，会出现有界队列，出现插入元素失败的情况。

**添加的元素不能为null**

![image-20241013132218024](http://47.101.155.205/image-20241013132218024.png)

#### ConcurrentLinkedQueue

通过CAS(比较并交换)实现并发线程安全。

队列空时，消费者阻塞等待；队列满时，生产者阻塞等待。



### Deque

支持在两个端插入和去除元素的线性集合。提供了两种方式操作元素。

![image-20241013162933516](http://47.101.155.205/image-20241013162933516.png)

继承Queue的等效方法：

![image-20241013163138225](http://47.101.155.205/image-20241013163138225.png)

LIFO(后进先出)栈等效方法：

![image-20241013163521715](http://47.101.155.205/image-20241013163521715.png)



#### ConcurrentLinkedDeque

通过CAS(比较并交换)实现并发线程安全。





## 阻塞队列

### BlockingQueue

BlockingQueue的实现类ArrayBlockingQueue，实现的put(E e),及take()运用到了Lock锁的ReentrantLock，lockInterruptibly()，以及Condition的await()和single()来实现队列元素控制。

|         | 抛出异常  | 返回值   | 阻塞   | 超时退出           |
| ------- | --------- | -------- | ------ | ------------------ |
| insert  | add(e)    | offer(e) | put(e) | offer(e,time,unit) |
| remove  | remove()  | poll()   | take() | poll(time,unit)    |
| examine | element() | peek()   | no     | no                 |

#### ArrayBlockingQueue

基于数组实现的有界阻塞队列，遵循先进先出原则。基于ReentrantLock实现线程安全和控制公平策略。

若为 true，等待时间最长的线程优先处理。默认为 false，非公平策略通常性能更高。

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



#### DelayQueue

是一个无界的阻塞队列，队列的功能基于PriorityQueue(优先队列)实现。队列中的元素需要实现Delayed接口，一个是延期时间另外一个是重写compareTo()方法。

元素只有getDelay()返回的值小于等于0时才会被取出。

线程安全：Lock锁实现。



#### LinkedBlockingQueue

一个阻塞有界的FIFO队列。

默认的队列容量是Integer.MAX_VALUE。

线程安全：基于Lock锁实现。



#### LinkedTransferQueue

无界阻塞队列，实现了TransferQuque接口。它既可以像普通的队列那样用于存取元素，还提供了一种叫做元素传递的机制，即生产者可以将元素直接传递给等待中的消费者，而不需要将元素放入队列中等待。

`LinkedTransferQueue`提供了`transfer(E e)`方法，该方法允许生产者直接将元素传递给消费者。如果当前没有消费者等待接收元素，调用`transfer()`的线程会被阻塞，直到有消费者获取该元素。这种机制可以避免队列中不必要的积压，提高效率。

消费者不处理，生产者阻塞。



#### PriorityBlockingQueue

无界优先级阻塞队列。

线程安全：基于lock锁实现。



#### SynchronousQueue

无缓冲阻塞队列，它的特点在于没有容量，即它不能存储任何元素。每一个插入操作都必须等待相应的移除操作，否则会阻塞，因此它是一种用于直接交换数据的队列。

两种模式：

1. 公平模式（FIFO）：插入和移除的操作按顺序（FIFO）进行，线程按照其调用顺序排队。
2. 非公平模式：线程不按顺序，可以以随机顺序被调度（默认）。

put进去一个元素就需要，线程就进入了等待。

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



### BlockingDueue

双端队列，当队列满了添加元素或队列空的获取元素，调用不同的方法会有不同的效果：

![image-20241109165413947](http://47.101.155.205/image-20241109165413947.png)

由于存在返回特定的元素，所以**队列中的元素不能为null**。

![image-20241109165849706](http://47.101.155.205/image-20241109165849706.png)





#### BlockingDeque

一个阻塞有界的双端队列。

默认的队列容量是Integer.MAX_VALUE。

线程安全：基于Lock锁实现。



## 线程池

Executors工具类可以创建线程池，不推荐使用

![image-20220725232514241](http://47.101.155.205/image-20220725232514241.png)

### Executors

#### newFixedThreadPool()

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



#### newWorkStealingPool

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









### ThreadPoolExecutor

ThreadPoolExecutor核心配置：

1. corePoolSize：线程池中活跃的线程数，除非allowCoreThreadTimeOut为true，即时线程空闲也不会关闭；
2. maximumPoolSize：线程池中运行最大的线程数量(队列满了才会创建)；
3. keepAliveTime：当存活线程数大于核心线程数，多余线程终止前等待新任务的最大时间；
4. unit：keepAliveTime的时间单位；
5. workQueue：在执行任务之前保存任务的队列，此队列仅保存通过execute方法执行的任务；
6. threadFactory：创建新线程的工厂；
7. handler：达到队列(阻塞)容量和线程处理上限的处理策略；

![image-20241109195233014](http://47.101.155.205/image-20241109195233014.png)

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

**直接抛出异常**

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

**任务直接放弃**

~~~java
public static class DiscardPolicy implements RejectedExecutionHandler {
        public DiscardPolicy() { }
        
        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        }
}
~~~



##### DiscardOldestPolicy

**从队列中移除一个任务**

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



##### CallerRunsPolicy

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
        //allowCoreThreadTimeOut 是否允许核心线程超时退出，默认false，不退出
        // wc表示当前存活的线程数量
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;
        
        if ((wc > maximumPoolSize || (timed && timedOut)) && (wc > 1 || workQueue.isEmpty())) {
			if (compareAndDecrementWorkerCount(c))
            	return null;
			continue;
		}
        
		try {
            //关键代码在这里
            // timed 为true，要避免获取队列中元素超时的情况(因为超过这个时间会关闭线程)
            // 其它会用take取队列中的元素，会一直阻塞。
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



### Future

`ExecutorService`提供了`submit`方法获取任务的结果。

~~~java
<T> Future<T> submit(Callable<T> task);

<T> Future<T> submit(Runnable task, T result);

Future<?> submit(Runnable task);

~~~



~~~java
// 获取异步任务执行结果
V get() throws InterruptedException, ExecutionException;

V get(long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;

// 取消任务执行
boolean cancel(boolean mayInterruptIfRunning);

// 返回true 表示任务在调用前被取消
boolean isCancelled();

// 返回treu 表示任务完成，完成可能时正常完成、异常终止或取消
boolean isDone();

~~~



#### FutureTask

Future的主要实现类FutureTask。实现了Future和Runnable接口，实现Future提供获取异步计算结果的功能，以及取消(cancel)任务的功能。

**Future被一个线程使用后，不能在被其它线程使用，因为可能不会执行里面的Callable的call方法。**

![image-20241110164231095](http://47.101.155.205/image-20241110164231095.png)

任务的状态转换过程：

- NEW -> COMPLETING -> NORMAL
- NEW -> COMPLETING -> EXCEPTIONAL
- NEW -> CANCELLED
- NEW -> INTERRUPTING -> INTERRUPTED

![image-20250406144330315](http://47.101.155.205/image-20250406144330315.png)



**get获取异步结果：**

![image-20241110164730797](http://47.101.155.205/image-20241110164730797.png)



#### 第三种创建线程的方式

~~~java
public class App {

    public static void main(String[] args) throws ExecutionException, InterruptedException {

        FutureTask task = new FutureTask(new Callable<String>(){
             public String call(){
                return "123";
            }
        });

        Thread thread = new Thread(task);
        thread.start();

        System.out.println(task.get());
    }
}

~~~





### ScheduledThreadPoolExecutor

基于ThreadPoolExecutor的扩展。

ScheduledExecutorService的实现，扩展延迟执行功能。

![image-20241109213506276](http://47.101.155.205/image-20241109213506276.png)



- schedule(Runnable command, long delay, TimeUnit unit)：延迟时间执行command;
- scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)：initialDelay首次执行延迟时间，period后续每次间隔时间，固定速率执行command(任务开始即计时)；
- scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit)：固定延迟执行任务(上一个任务完成才开始执行任务)。



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
// 线程执行interrupt()后返回true
public boolean isInterrupted() {
	return isInterrupted(false);
}

~~~





### ForkJoinPool

运行`ForkJoinTask`的ExecutorService。ForkJoinPool为来自`non-ForkJoinTask`客户端的提交提供入口点，以及管理和监控操作。

ForkJoinPool与其他类型的ExecutorService的区别主要在于使用了`work-stealing`：池中的所有线程都试图查找并执行提交给池和/或由其他活动任务创建的任务（如果不存在任务，则最终阻塞等待工作）。



任务继承`ForkJoinTask`定义，重写其`exec`方法；如果是递归任务，可以继承`RecursiveTask`拆分递归任务。

~~~java
public class ForkJoinPoolTest {

    public static void main(String[] args) {

        ForkJoinPool forkJoinPool = new ForkJoinPool();

        // 0 1 1 2 3 5 8 13 21 34
        FibonacciTask task = new FibonacciTask(8);

        Integer invoke = forkJoinPool.invoke(task);

        System.out.println("f(8): " + invoke);

    }
}
// 定义任务计算斐波那契数列
class FibonacciTask extends RecursiveTask<Integer> {

    private final int n;
    FibonacciTask(int n) {
        this.n = n;
    }

    @Override
    protected Integer compute() {
        if (n <= 1) {
            return n;
        }
        //
        FibonacciTask f1 = new FibonacciTask(n - 1);
        // 拆分任务
        f1.fork();

        FibonacciTask f2 = new FibonacciTask(n - 2);
        f2.fork();
        return f1.join() + f2.join();
    }
}

~~~





![image-20241119134736614](http://47.101.155.205/image-20241119134736614.png)



### 线程池关闭

1. shutdown()：平滑关闭，停止新任务提交，会等待队列中任务和正在执行任务执行完毕。
2. shutdownNow()：暴力关闭，停止新任务提交，中断正在执行任务的线程(任务排队也会)。



## AQS线程同步器

AQS是抽象类AbstractQueuedSynchronizer的简称，定义了实现线程同步器的基础框架，线程同步器的作用是协调多个线程对共享资源的访问。可重入锁`ReentrantLock`就组合了该类实现了锁的功能。

- ReentrantLock：控制多个线程对共享资源的访问。
- CountDownLatch：控制多个线程的同时启动。
- CyclicBarrier：循环栅栏。
- Semaphore：信号量。



**在线程同步方面，AQS不是基于synchronized关键字加锁实现的，而是通过自身的状态(state)、线程等待队列，自旋锁和CAS机制来实现无锁化的线程安全操作，同时基于LockSupport类提供的方法对线程的状态进行控制，如果使线程阻塞或唤醒阻塞的线程。**



`ReentrantLock`中的AQS实现(FairSync/NonfairSync)`tryAcquire`方法，来判断是否可以访问共享资源；tryRelease方法释放共享资源，允许其它线程访问共享资源。

公平策略：内部使用一种先入先出队列来存放等待线程，其中等待事件最长的线程优先被唤醒。问题：**执行满的线程会影响整体的吞吐量**。



### ReentrantLock



![image-20250406165112311](http://47.101.155.205/image-20250406165112311.png)



![image-20250406165344207](http://47.101.155.205/image-20250406165344207.png)



### CountDownLatch

计数器开关：让调用`CountDownLatch.await()`方法的线程等待(线程状态`WAITING`)，直到`CountDownLatch.countDown()`执行n次，计数器为0，线程开始执行。

通过调用`LockSupport.park(this)`;让线程进入WAITING状态。

![image-20250406171242961](http://47.101.155.205/image-20250406171242961.png)

~~~java
import java.util.concurrent.CountDownLatch;

public class Test01 {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch startSingle = new CountDownLatch(1);
        CountDownLatch doneSingle = new CountDownLatch(5);
        for (int i = 0; i < 5; i++) {
            new Thread(new Work01(startSingle,doneSingle)).start();
        }
        Thread.sleep(2000);
        // startSingle state 减少1 state == 0，唤醒阻塞线程
        startSingle.countDown();
        System.out.println(Thread.currentThread().getName() + "线程执行开始，是startSingle线程计数器为0");
        // doneSingle state == 0 所以不会阻塞当前线程
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
			// 线程等待，等待被唤醒，直到 state == 0
            startSingle.await();
            System.out.println(Thread.currentThread().getName() + "线程执行");
            doneSingle.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

~~~



~~~java
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
        // 不会等待，state == 0
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

~~~



### CyclicBarrier

可以控制一组线程进行循环工作。与`CountDownLatch`功能差不多，不过这个计数可以重置为初始值。

**all-or-none模式，要么所以成功，要么所有失败。任何子线程的中断或异常，或者超时退出，所有线程退出。**

循环使用计数器：计数器执行到临界点，如果`CyclicBarrier`的`Runnable`不为空，则调用一次Runnable的run方法，重置计数器值为初始值，唤醒其它等待线程。

**await()**：计数器减1，如果计数器为0执行可用的run方法，重置计数器；不为0，则释放锁等待。

~~~java
// final ReentrantLock lock = new ReentrantLock();await方法通过lock加锁
// final Condition trip = lock.newCondition();通过这个实现线程间的通知
// CyclicBarrier对象调用await()方法，await()调用私有的dowait方法，lock.lock()加锁，index = --count;
// 如果index==0;如果构造方法的Runnable对象不为空，调用run方法，然后执行nextGeneration方法;
// 重新设置循环值，唤醒其它等待的线程，结束

private void nextGeneration() {
	// signal completion of last generation
    trip.signalAll();
    // set up next generation
    count = parties;
    generation = new Generation();
}

private final Condition trip = lock.newCondition();
//不为0分为两种情况，第一种情况是直接调用await方法不传参数，第二种情况是传递等待时间参数(期限等待)
//1.线程直接等待trip.await();这个时候如果线程被唤醒，如果当前线程没有执行interrupt(或者说当前线程的isInterrupted是false)，继续向下执行。如果程序是被interrupt则下次唤醒时，index==0时，会执行上面的breakBarrier方法，直接抛出了异常，根本就没有进入for循环。
//在第一次执行barrier.await()之后执行Thread.currentThread().interrupt();都可以得到await方法的结果。第二次进入dowait方法，因为Thread.interrupted()方法的结果为true，都直接抛出异常。这个过程，barrier.await()执行之前的代码可以执行两次。

~~~

![image-20241113111103315](http://47.101.155.205/image-20241113111103315.png)

~~~java
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

计数信号量：一个信号量维护了一些许可证，acquire()方法每次会消耗一个许可证，如果没有获取到则会阻塞线程；release()添加一个许可证，并唤醒阻塞的线程。

支持公平性：体现在如果有等待获取凭证的线程，应该是先等待的先获取凭证。

![image-20241113135147124](http://47.101.155.205/image-20241113135147124.png)

| 方法      | 作用                                                         |
| --------- | ------------------------------------------------------------ |
| acquire() | 获取许可证，如果可用立即返回，不可用则线程进如休眠状态，直到Semaphore释放release信号量，或者当前线程被其他线程中断。 |
| release() | 释放一个许可证，将其返回至Semaphore                          |

**acquire()：**获取一个可用凭证，没有获取到则阻塞(实际线程状态时WAITING)。

**acquire(int)：**获取指定的可用凭证数量，没有获取到则阻塞(实际线程状态时WAITING)。

![image-20241113132216496](http://47.101.155.205/image-20241113132216496.png)

**tryAcquire()：**获取一个可用的的凭证，成功返回true，失败返回false(不阻塞)。

**tryAcquire(int)：**获取指定数量的可用凭证，成功返回true，失败返回false(不阻塞)。

![image-20241113133115035](http://47.101.155.205/image-20241113133115035.png)



**release()：**添加一个可用的凭证，避免凭证数量的溢出。

**release(int)：**添加指定数量的可用凭证。

![image-20241113134003493](http://47.101.155.205/image-20241113134003493.png)



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



### Phaser

Phaser最终指定的构造方法是：Phaser(Phaser parent, int parties)，最终会有4种情况，parent代表不为空的Phaser对象，int代表大于0的int值。

1. Phaser(null, 0)：
2. Phaser(null, int )：
3. Phaser(parent, 0)：
4. Phaser(parent, int)：

parties的上限是65535，2^16-1。

toString()方法：[phase = 1 parties = 2 arrived = 0]，phase表示Phaser管理线程的循环次数，parties表示管理的线程数量，arrived表示到达的数量。

phase的值位负数时，表示Phaser不管理线程了（调用arriveAndDeregister至parties为0），后续在调用register()也不会管理。



#### Phaser(null, 0)

初始化Phaser，指定需要协同管理的线程数量0，管理的数量不能超过65535(2^16-1)。

![image-20241113165925488](http://47.101.155.205/image-20241113165925488.png)



register()：将需要协同管理的线程线程数量增加1，如果当前的Phaser对象已经开始管理线程了，调用该方法的线程会等待，可能知道管理的线程都到达才会被释放掉。

![image-20241113173110233](http://47.101.155.205/image-20241113173110233.png)



arriveAndAwaitAdvance()：线程到达，等待需要到达线程到一定数量，则把等待的线程唤醒执行。

![image-20241114143831518](http://47.101.155.205/image-20241114143831518.png)

![image-20241114144843029](http://47.101.155.205/image-20241114144843029.png)

arriveAndDeregister()：与register()作用相反，减少参与的线程调用方，如果Phaser管理的线程数量是1，调用该方法，则后续就不管理线程了。

![image-20241115142532866](http://47.101.155.205/image-20241115142532866.png)



~~~java
// arriveAndDeregister()方法的parties=0的执行过程
// 393 unrrived = 1
n = 0 & 0xffff0000L(((2 << 16)-1) << 16) = 0;
nextUnarrived = 0 >>> 16 = 0;
// 397 nextUnarrived = 0
n |= 1L << 63(-2^63=Long.MIN_VALUE) = Long.MIN_VALUE;
// 403
nexePhase = 1 & Integer.MAX_VALUE = 1;
n |= 1 << 32 = -9223372032559808512(64-1,33-1);
// 405 state = n, 
(int) (state >>> 32)高位符号是1,表示负数;

~~~



#### Phaser(parent, 0)

![image-20241115134331547](http://47.101.155.205/image-20241115134331547.png)

构建子Phaser，可以只指定parent，默认parties为0，这个子Phaser不能直接使用，会抛出IllegalStateException异常，但是可以子Phaser对象调用register()方法为子Phaser增加1个parties，同时为父Phaser增加1个parties。

![image-20241118154815524](http://47.101.155.205/image-20241118154815524.png)

子Phaser调用arriveAndAwaitAdvance()，如果子Phaser所有线程都到达等待，例如子parties=2，需要两个线程调用子Phaser对象register方法2次，这个时候由于有父Phaser存在，调用parent.arriveAndAwaitAdvance()等待父Phaser所管理的线程都到达。如果这时再调用子Phaser的arriveAndAwaitAdvance方法，则会抛出IllegalStateException异常。

![image-20241118145852540](http://47.101.155.205/image-20241118145852540.png)



##### 父Pahser.parties=0

父Phaser的对象parties表示父对象需要其它线程管理的数量，如果定义父parties为0，则可以通过这个来管理所有指向父Phaser的子Phaser执行情况。

下面3个Phaser执行一个父Phaser对象，可以通过arriveAndAwaitAdvance方法执行后，控制3个线程之间都会执行相同的次数。

~~~java
Phaser parent = new Phaser(0);
Phaser phaser1 = new Phaser(parent, 1);
Phaser phaser2 = new Phaser(parent, 1);
Phaser phaser3 = new Phaser(parent, 1);
new Thread(()->{
    phaser1.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser2.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser3.arriveAndAwaitAdvance();
    // ...
}).start;

~~~

如果子Phaser的parties的值大于1，则是一组线程之间都会执行相同的次数。

下面的例子则表示7个线程都到达后，才都允许arriveAndAwaitAdvance后面的代码一次。

~~~java
Phaser parent = new Phaser(0);
Phaser phaser1 = new Phaser(parent, 2);
Phaser phaser2 = new Phaser(parent, 3);
Phaser phaser3 = new Phaser(parent, 2);
new Thread(()->{
    phaser1.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser1.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser2.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser2.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser2.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser3.arriveAndAwaitAdvance();
    // ...
}).start;
new Thread(()->{
    phaser3.arriveAndAwaitAdvance();
    // ...
}).start;

~~~



##### 父Pahser.parties>0

指定父Phaser管理的线程和子Phaser管理之间的执行关系，下面的例子，表示2个父Phaser的线程和3个子Phaser管理的3个线程之间都只会同时执行一次，而且它们执行速率在于最慢的一个线程的处理耗时时间。假设下面的可执行代码时间忽略不计(或者一样长)，则这里执行间隔时间是(5+n)s。

批次打印时间应该是：

1. 1000 + ?
2. 6000 + ?
3. 1100 + ?
4. ...

~~~java
Phaser parent = new Phaser(2);
Phaser phaser1 = new Phaser(parent, 1);
Phaser phaser2 = new Phaser(parent, 1);
Phaser phaser3 = new Phaser(parent, 1);
new Thread(()->{
    while(true) {
        phaser1.arriveAndAwaitAdvance();
    	try {
			Thread.sleep(5000);
    	} catch (InterruptedException e) {
        	throw new RuntimeException(e);
    	}
    }
    // ...
}, "s1").start;
new Thread(()->{
    while(true) {
        phaser2.arriveAndAwaitAdvance();
    	// ...
    }
}, "s2").start;
new Thread(()->{
    while(true) {
        phaser3.arriveAndAwaitAdvance();
    	// ...
    }
}, "s3").start;

new Thread(()->{
    long start = System.currentTimeMillis();
    while(true) {
        parent.arriveAndAwaitAdvance();
    	try {
			Thread.sleep(1000);
    	} catch (InterruptedException e) {
        	throw new RuntimeException(e);
    	}
        
	    // ...
        System.out.println(Thread.currentThread().getName() + "耗时: " + (System.currentTimeMillis() - start));
    }
}, "p1").start;

new Thread(()->{
     while(true) {
        parent.arriveAndAwaitAdvance();
	    // ...
    }
}, "p2").start;

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



### CAS

CAS(compare and swap 比较并交换)，java.util.concurrent.atomic(原子的)包下的类，如AtomicInteger、AtomicLong等的线程安全操作，就是基于CAS操作。

CAS的核心思想：

1. 比较：比较某个内存位置的当前值是否等于预期值；
2. 交换：如果等于预期值，则将该内存位置的值更新为新值；
3. 返回结果：是否成功。

CAS的局限性：

1. ABA问题：如果某个变量从A变成B，然后又变成了A，CAS无法识别这种变化，可能导致误判。解决方案使引入版本号。
2. 自旋消耗CPU，当多个线程竞争激烈时，CAS操作可能反复失败，浪费CPU资源。
3. 只能更新一个变量。



~~~java
private static final Unsafe unsafe = sun.misc.Unsafe.getUnsafe();
// 获取修改属性value的字段偏移量，staticFieldOffset方法获取静态属性字段偏移量
private static final long valueOffset = unsafe.objectFieldOffset
                (AtomicLong.class.getDeclaredField("value"));
// var1: 要作用哪个对象,原子类中通常时this
// var2: 作用属性的偏移量,也就是valueOffset
// var3: 预期值,原子类使用unsafe.getIntVolatile(var1, var2)获取当前的预期值
// var4: 要更新的值
// return 返回是否更新成功
boolean flag = unsage.compareAndSwapInt(var1, var2, var3, var4);

~~~

![image-20241119104958818](http://47.101.155.205/image-20241119104958818.png)



### AtomicReference

实现对泛型对象的CAS操作。

![image-20241119105524339](http://47.101.155.205/image-20241119105524339.png)



### AtomicStampedReference

解决ABA问题，同时提供对泛型对象的CAS操作。

添加版本号的原理是：封装一个对象，作为要修改的值，该对象有两个属性，一个是要修改的值，一个是管理值的版本号。

原理是用对象作为CAS交换的目标。

![image-20241119112557628](http://47.101.155.205/image-20241119112557628.png)

![image-20241119112836075](http://47.101.155.205/image-20241119112836075.png)



