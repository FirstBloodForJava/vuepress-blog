## 创建线程

创建线程的两种方式：

~~~java
public class App {

    public static void main(String[] args) {
        Thread t1 = new PrimeThread(10);
        Thread t2 = new Thread(new PrimeRun(10));
        t1.start();
        t2.start();
    }
}
class PrimeThread extends Thread {
    long minPrime;
    PrimeThread(long minPrime) {
        this.minPrime = minPrime;
    }

    public void run() {
        System.out.println("继承Thread类创建线程: " + minPrime);
    }
}

class PrimeRun implements Runnable {
    long minPrime;
    PrimeRun(long minPrime) {
        this.minPrime = minPrime;
    }

    public void run() {
        System.out.println("实现Runnable接口创建线程: " + minPrime);
    }
}

~~~



### wait()和wait(timeout)

实例方法。

wait()和wait(timeout)时Object的方法，所有的对象都能调用。

wait()和wait(0)执行的效果一样，表示释放当前锁定对象的锁，直到其它获取改锁定对象的线程执行notify()或notifyAll()方法，来唤醒该线程，继续获取锁。

**如果一个不是需要获取锁的对象调用wait()或wait(timeout)方法，则会抛出IllegalMonitorStateException异常。**



### interrupt()

Thread实例方法。

1. 不是中断自己，checkAccess()可能抛出SecurityException异常；
2. 中断的线程调用了Object.wait()或Thread的join()或sleep()方法，则该线程会抛出InterruptedException异常，线程的中断状态将会清除；
3. 如果IO操作InterruptibleChannel是阻塞，则通道关闭，线程的中断状态将会被设置，并且线程收到ClosedByInterruptException异常；
4. 如果线程在Selector被阻塞，线程中断状态将被设置，它将立即从选择操作返回，可能带有非零值，就像调用了Selector的wakeup()一样；
5. 如果没有以上的操作，线程的中断状态将会被设置(初始对象调用isInterrupted()结果为false，执行后为true)，如果没有以上操作，为true时再次执行，则isInterrupted()结果为true。



~~~java
public class App {

    public static void main(String[] args) {

        Thread t = new Thread(() -> {
            long start = System.currentTimeMillis();
            // 初始化执行中断
            Thread.currentThread().interrupt();
            System.out.println(Thread.currentThread().isInterrupted() + " " + (System.currentTimeMillis()-start));
            try {
                // 由于线程已经被标记中断状态,直接触发抛出InterruptedException异常
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                // 中断标志: false
                System.out.println("重置后中断标志: " + Thread.currentThread().isInterrupted() + " " + (System.currentTimeMillis()-start));
                // 重新设置中断标志 false -> true
                Thread.currentThread().interrupt();
            }

            // 已经中断状态true返回true,线程中断状态为false. result: true false
            System.out.println(Thread.interrupted() + " " + Thread.currentThread().isInterrupted());
            // 线程中断状态为false,返回false. result: false false
            System.out.println(Thread.interrupted() + " " + Thread.currentThread().isInterrupted());

            // 中断
            Thread.currentThread().interrupt();

            // for循环不会执行
            while (!Thread.currentThread().isInterrupted()) {

            }
            // 中断状态更新
            System.out.println("退出");

        });

        t.start();

        long start = System.currentTimeMillis();

        while (System.currentTimeMillis() - start < 2000) {

        }
    }
}

~~~



> interrupt()和Thread.interrupted()和isInterrupted()的区别：

interrupted()：静态方法返回当前线程的中断状态，如果返回true，则重置中断状态。

isInterrupted()：实例方法，返回当前线程的中断状态，不重置线程中断状态。

interrupt()：根据不同的线程的不同情况，线程会有不同的表现，最终结果：一种是清空中断状态或设置中断状态为true。



![image-20241012165425073](http://47.101.155.205/image-20241012165425073.png)





### notify()和notifyAll()

实例方法。

对象调用这两个方法的前提条件：

1. 同步方法中this.notify()或this.notifyAll()；
2. synchronized同步代码块锁定的对象执行；
3. 对象类型是Class，静态synchronized中通过类对象执行。

否则会抛出异常：IllegalMonitorStateException。



notify()：唤醒一个等待该对象监视器的线程。如果有多个线程等待这个对象的监视器，则只会有一个线程的监视器被唤醒(任意的)。被唤醒的线程任会等待，直到当前对象的锁被释放，与其他线程一同争夺锁，唤醒的线程不具备获取锁的优先级或低优先级。

notifyAll()：唤醒所有等待该对象监视器的线程。





### 线程的状态

1. NEW：Thread对象被创建时的状态；
2. RUNNABLE：线程处于运行状态，可能等待操作系统分配资源；
3. BLOCKED：线程等待获取一个锁；进入同步代码块之前需要获取的锁的等待状态或获取到锁之后执行Object.wait()方法，执行Object.notify()再次等待获取锁的状态；
4. WAITING：线程进入无期限的等待，直到其它线程执行特定的操作才会恢复；
5. TIMED_WAITING：进入期限等待，超过等待时间自动唤醒线程；
6. TERMINATED：线程已经执行完毕，isAlive()返回false。



#### BLOCKED

线程进入BLOCKED状态的条件：

1. 获取锁失败的线程；
2. 获取锁后执行wait，然后被唤醒再次竞争锁的线程。



~~~java
/**
 * @author ouyangcm
 * create 2024/4/1 13:35
 */
public class App {

    public static void main(String[] args) {
        Integer minPrime = 10;
        Thread t1 = new PrimeThread(10, "T1");
        Thread t2 = new Thread(new PrimeRun(10), "T2");

        t1.start();
        t2.start();

        long start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start < 1000) {

        }

        // T1线程和T2线程产生锁竞争
        // T1先获取到锁的情况
        System.out.println("T1: " + t1.getState());
        // T2 BLOCKED
        System.out.println("T2: " + t2.getState());

        start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start < 4000) {

        }

        // T1线程：WAITING
        System.out.println("T1: " + t1.getState());
        // T2：TERMINATED
        System.out.println("T2: " + t2.getState());

        // T2线程释放锁,获取锁唤醒T1线程
        synchronized (minPrime) {
            start = System.currentTimeMillis();

            minPrime.notify();

            while (System.currentTimeMillis() - start < 2000) {

            }
            // 唤醒之后等待获取锁: BLOCKED
            System.out.println("T1: " + t1.getState());

            while (System.currentTimeMillis() - start < 2000) {

            }
            // 结束释放锁 T1线程获取锁执行完(所有线程终结,守护线程退出,程序结束)
        }

    }
}
class PrimeThread extends Thread {
    Integer minPrime;
    PrimeThread(Integer minPrime, String name) {
        setName(name);
        this.minPrime = minPrime;
    }

    public void run() {
        synchronized (minPrime) {

            long start = System.currentTimeMillis();
            while (System.currentTimeMillis() - start < 2000) {

            }

            try {
                // 进入无期限等待(同时释放锁),直到minPrime调用notify或notifyAll()
                minPrime.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "-继承Thread类创建线程: " + minPrime);
        }
    }
}

class PrimeRun implements Runnable {
    Integer minPrime;
    PrimeRun(Integer minPrime) {
        this.minPrime = minPrime;
    }

    public void run() {
        synchronized (minPrime) {

            long start = System.currentTimeMillis();
            while (System.currentTimeMillis() - start < 2000) {

            }

            System.out.println(Thread.currentThread().getName() + "-实现Runnable接口创建线程: " + minPrime);
        }
    }
}

~~~



#### WAITING和TIMED_WAITING

线程进入WAITING和TIMED_WAITING的方式

| WAITING                      | TIMED_WAITING           |
| ---------------------------- | ----------------------- |
| object.wait(0)/object.wait() | object.wait(timeout)    |
| thread.join(0)/thread.join() | thread.join(timeout)    |
| LockSupport.park()           | LockSupport.parkNanos() |
| LockSupport.park(blocker)    | LockSupport.parkUntil() |

~~~java
public class App {

    public static void main(String[] args) {

        Thread thread = new Thread(new Runner(10));
        thread.start();
        long start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start < 1000) {

        }
        // TIMED_WAITING
        System.out.println(thread.getState());
        while (System.currentTimeMillis() - start < 3000) {

        }
        // RUNNABLE
        System.out.println(thread.getState());

        while (System.currentTimeMillis() - start < 5000) {

        }
        // WAITING
        System.out.println(thread.getState());
        Integer id = 10;
        synchronized (id) {
            id.notify();
            while (System.currentTimeMillis() - start < 6000) {

            }
            // BLOCKED
            System.out.println(thread.getState());
            try {
                // 表示等待thread线程结束,由于main线程获取了thread线程运行的锁,导致thread线程无法结束运行,自动执行thread.notify()解除main线程的阻塞
                thread.join();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }

    }
}

class Runner implements Runnable{
    Integer id;
    Runner(Integer id) {
        this.id = id;
    }

    @Override
    public void run() {
        synchronized (id) {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                //throw new RuntimeException(e);
                System.out.println(Thread.currentThread().getName() + " sleep被中断");
            }
            long start = System.currentTimeMillis();
            while (System.currentTimeMillis() - start < 2000) {

            }
            try {
                id.wait();
            } catch (InterruptedException e) {
                //throw new RuntimeException(e);
                System.out.println(Thread.currentThread().getName() + " wait被中断");
            }


        }
    }
}

~~~



![image-20241013110817635](http://47.101.155.205/image-20241013110817635.png)



### ThreadLocal

这个类提供了线程的局部变量。这个与普通变量的不同之处在于，访问这些变量都只能是ThreadLocal的get或set方法。ThreadLocal通常作为一个类的私有静态属性使用。

~~~java
public class App {
    private static final AtomicInteger nextId = new AtomicInteger(0);
    public static void main(String[] args) {

        for (int i = 0; i < 100; i++) {
            Thread thread = new Thread(() -> {
                int count = nextId.getAndIncrement();
                if (count % 10 == 0) {
                    System.out.println(ThreadId.get());
                }
            });
            thread.start();
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        // 这里最大的结果只会是10
        System.out.println(ThreadId.get());

    }
}

class ThreadId {
    // 下一个线程分配的原子整数
    private static final AtomicInteger nextId = new AtomicInteger(0);

    // 包含每个线程的局部变量
    private static final ThreadLocal<Integer> threadId =
            new ThreadLocal<Integer>() {
                @Override protected Integer initialValue() {
                    return nextId.getAndIncrement();
                }
            };

    // 返回当前线程的整数id,访问时创建线程局部变量(不调用threadId.get()创建100线程,nextId还是1)
    public static int get() {
        return threadId.get();
    }
}

~~~



#### zuul使用ThreadLocal

RequestContext实现了保证每个请求都有一个自己唯一的RequestContext。

~~~java
public class RequestContext extends ConcurrentHashMap<String, Object> {
    
    protected static Class<? extends RequestContext> contextClass = RequestContext.class;
    
    protected static final ThreadLocal<? extends RequestContext> threadLocal = new ThreadLocal<RequestContext>() {
        @Override
        protected RequestContext initialValue() {
            try {
                return contextClass.newInstance();
            } catch (Throwable e) {
                throw new RuntimeException(e);
            }
        }
    };
    
    public static RequestContext getCurrentContext() {
        if (testContext != null) return testContext;

        RequestContext context = threadLocal.get();
        return context;
    }
    
    // 删除线程局部变量
    public void unset() {
        threadLocal.remove();
    }
}

~~~



## 线程安全集合

### Collection集合

#### ConcurrentSkipListSet

线程安全、可排序的集合。

通过CAS保证并发安全。





#### CopyOnWriteArrayList

CopyOnWritArrayList的核心思想是写时复制，每当有写操作时，它不会直接修改原数组，而是创建原数组的拷贝，在写入完成后再替换原数组。

这样可以确保所有读取操作在执行时不会受到任何正在进行的写操作的影响，因为读操作总是访问当前不可变的数组。



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

// 迭代器是基于当前数组的快照实现的，这意味着在迭代过程中对列表的修改不会反映在迭代器中
// 即便在迭代期间列表发生了修改，迭代器仍会遍历原数组的内容
public Iterator<E> iterator() {
	return new COWIterator<E>(getArray(), 0);
}

~~~



#### CopyOnWriteArraySet

底层存放元素的对象时CopyOnWriteArrayList，拥有Set集合的特点：无序不重复。



### Map集合

#### ConcurrentHashMap

和Hashtable集合一样的功能，但是它在并发情况下是安全的。

其通过synchronized方法来实现线程的安全操作。



#### ConcurrentSkipListMap

线程安全、可排序的集合。

通过CAS保证并发安全。



## 队列

### Queue队列

Queue继承了Collection接口，表示一种有序的集合，大部分遵循典型的FIFO(First-In-First-Out先进先出)规则。

对于集合的增、删、取都提供了两种方式：一种是失败抛出异常；另外一种是返回一个特定的元素(null/false)。

对于Queue的实现，会出现有界队列，出现插入元素失败的情况。

**添加的元素不能为null**

![image-20241013132218024](http://47.101.155.205/image-20241013132218024.png)



#### ConcurrentLinkedQueue(线程安全)

通过CAS(比较并交换)实现并发线程安全。











### Deque队列

支持在两个端插入和去除元素的线性集合。

和Queue，提供了两种方式操作元素。

![image-20241013162933516](http://47.101.155.205/image-20241013162933516.png)

继承Queue的等效方法：

![image-20241013163138225](http://47.101.155.205/image-20241013163138225.png)

LIFO(后进先出)栈等效方法：

![image-20241013163521715](http://47.101.155.205/image-20241013163521715.png)



#### ConcurrentLinkedDeque(线程安全)

通过CAS(比较并交换)实现并发线程安全。





### BlockingQueue

顾名思义阻塞队列，当达到队列的容量时，同一个操作，不同的方法有以下效果：

![image-20241013180027527](http://47.101.155.205/image-20241013180027527.png)



#### ArrayBlockingQueue

基于数组实现的有界阻塞队列，遵循先进先出原则。基于ReentrantLock实现线程安全和控制公平策略。

定是否启用公平性。若为 `true`，等待时间最长的线程优先处理。默认为 `false`，非公平策略通常性能更高。



#### ConcurrentLinkedQeque

基于链表实现的无界的线程安全的Queue。







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

LinkedTransferQueue 提供了 transfer(E e) 方法，该方法允许生产者直接将元素传递给消费者。如果当前没有消费者等待接收元素，调用 transfer() 的线程会被阻塞，直到有消费者获取该元素。这种机制可以避免队列中不必要的积压，提高效率。

消费组不处理，生产者阻塞。



#### PriorityBlockingQueue

无界优先级阻塞队列。

线程安全：基于lock锁实现。



#### SynchronousQueue

无缓冲阻塞队列，它的特点在于没有容量，即它不能存储任何元素。每一个插入操作都必须等待相应的移除操作，否则会阻塞，因此它是一种用于直接交换数据的队列。

两种模式：

1. 公平模式（FIFO）：插入和移除的操作按顺序（FIFO）进行，线程按照其调用顺序排队。
2. 非公平模式：线程不按顺序，可以以随机顺序被调度（默认）。



### BlockingDueue

双端队列，当队列满了添加元素或队列空的获取元素，调用不同的方法会有不同的效果：

![image-20241109165413947](http://47.101.155.205/image-20241109165413947.png)

由于存在返回特定的元素，会返回null，所以队列中的元素不能为null。

![image-20241109165849706](http://47.101.155.205/image-20241109165849706.png)



#### ConcurrentLinkedDeque

基于链表实现的无界的线程安全的Deque。



#### LinkedBlockingDeque

一个阻塞有界的双端队列。

默认的队列容量是Integer.MAX_VALUE。

线程安全：基于Lock锁实现。



## Executor

执行Runnable任务的执行器。

~~~java
package java.util.concurrent;

public interface Executor {

    // 自定义Runnable任务怎么执行
    void execute(Runnable command);
}

~~~



### ThreadPoolExecutor

线程池：在多线程应用中，频繁创建和销毁线程会带来大量的系统开销，线程池通过复用线程资源和合理管理线程数量来提高效率。

线程池能解决的问题：

1. 线程创建和销毁的高开销：通过复用已创建的线程，避免频繁创建和销毁的开销问题；
2. 资源管理与控制：避免创建大量的线程，导致资源耗尽，特别是CPU和内容有限的情况；
3. 任务调度和管理：线程池为任务提供队列，当线程池线程数量达到上限时，新任务会进入队列排队等待处理；
4. 防止系统过载：线程池中的等待队列和拒绝策略，可以帮助管理任务的浏览。

ThreadPoolExecutor核心配置：

1. corePoolSize：线程池中活跃的线程数，除非allowCoreThreadTimeOut为true，即时线程空闲也不会关闭；
2. maximumPoolSize：线程池中运行最大的线程数量(队列满了才会创建)；
3. keepAliveTime：当存活线程数大于核心线程数，多余线程终止前等待新任务的最大时间；
4. unit：keepAliveTime的时间单位；
5. workQueue：在执行任务之前保存任务的队列，此队列仅保存通过execute方法执行的任务；
6. threadFactory：创建新线程的工厂；
7. handler：达到队列容量和线程处理上限(阻塞)的处理策略；

![image-20241109195233014](http://47.101.155.205/image-20241109195233014.png)



#### RejectedExecutionHandler

1. AbortPolicy：直接抛出异常；
2. DiscardPolicy：任务直接放弃；
3. DiscardOldestPolicy：从队列中移除一个任务；
4. CallerRunsPolicy：线程池满了，队列满了，直接调用Runnable的run方法，不开线程。







### 第三种创建线程的方式

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



#### FutureTask

实现了Future和Runnable接口，实现Future提供获取异步计算结果的功能，以及取消(cancel)任务的功能。

通过Thread启动调用run方法，FutureTask重写了Run方法的逻辑，实现了计算完成存储计算结果。

重写的run方法。

**Future被一个线程使用后，不能在被其它线程使用，因为可能不会执行里面的Callable的call方法。**

![image-20241110164231095](http://47.101.155.205/image-20241110164231095.png)



get获取异步结果

![image-20241110164730797](http://47.101.155.205/image-20241110164730797.png)





### ScheduledThreadPoolExecutor

基于ThreadPoolExecutor的扩展。

![image-20241109213506276](http://47.101.155.205/image-20241109213506276.png)



schedule(Runnable command, long delay, TimeUnit unit)：延迟时间执行command;

scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)：initialDelay首次执行延迟时间，period后续每次间隔时间，固定速率执行command(任务开始即计时)；

scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit)：固定延迟执行任务(上一个任务完成才开始执行任务)。



## 锁

### synchronized和Lock

锁是一种通过多个线程控制对共享资源的访问的工具。锁提供对共享资源的独占访问：在一个时间，只有一个线程获得锁和访问共享资源。有些锁(ReadWriteLock)允许并发访问。

synchronized是Java的关键字，属于JVM级别的同步机制。可以作用与同步方法或同步代码块。支持锁定的对象有：this对象、指定对象、当前类。JVM自动管理锁和释放锁，不需要手动解锁，线程执行完同步代码块自动释放锁。

Lock：是java.util.concurrent.locks包中的接口，提供了更细粒度的锁控制。Lock锁需要显示的获取和释放锁。Lock常用的实现类有ReentrantLock。

synchronized和Lock直接的区别：

1. 性能：synchronized早期性能较差，从 Java 6 开始进行了优化（偏向锁、轻量级锁），在大多数简单同步场景中性能接近甚至优于Lock；
2. 可中断性：Lock锁支持中断等待锁的线程，线程等待synchronized块的锁时不可中断；
3. 公平性：Lock(ReentrantLock)支持设置为公平锁，会影响性能，synchronized不支持；
4. 等待通知机制：synchronized可以使用wait()、notify()和notifyAll()进行条件等待，但条件控制较少。Lock 提供了Condition对象，可以更灵活地控制线程等待和唤醒的条件，支持多个等待队列。



### ReentrantLock

可重入锁：一个线程可以多次获取ReentrantLock锁，对应多次获取需要多次释放。

![image-20241111132343033](http://47.101.155.205/image-20241111132343033.png)



等待通知机制

~~~java
class Resource {
    private ReentrantLock lock = new ReentrantLock();
    private Condition empty = lock.newCondition();
    private Condition full = lock.newCondition();
    private Queue<Integer> queue = new LinkedList<>();
    private final int MAX_CAPACITY = 10;

    public void produce(int value) throws InterruptedException {
        lock.lock();
        try {
            while (queue.size() == MAX_CAPACITY) {
                // 阻塞,直到被其他线程唤醒或中断
                full.await();
            }
            queue.add(value);
            empty.signal();
        } finally {
            lock.unlock();
        }
    }

    public int consume() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                empty.await();
            }
            int value = queue.poll();
            full.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }
}

~~~



### ReentrantReadWriteLock

读写锁：

1. 读锁：允许多个线程同时持有锁，适用于读多写少操作，多个线程可并发读取资源。读锁只有在写锁中获取或在写锁释放时获取(读锁中不能获取写锁，死锁)。
2. 写锁：独占锁，当前线程可以持有写锁，其它线程获取读锁及写锁(当前线程可以获取读锁)；其它线程获取读锁，当前线程无法或取写锁。

锁降级：

![image-20241111141945894](http://47.101.155.205/image-20241111141945894.png)



### StampedLock 

Java 8引入的一种改进的锁机制，提供了三种锁模式：写锁、悲观读锁、乐观读锁。适用于读多写少的场景。

写锁：独占锁，适用于写操作。

悲观读锁：和传统的读锁类似，适用于需要保证数据一致性的读操作。

乐观读锁：一种无阻塞的读锁，适合快速读取的操作。在读取期间其他线程可以获取写锁，因此读取的数据可能会改变，读者需要在读操作完成前进行有效性验证。

**锁是不可重入的，同一线程在持有写锁或悲观读锁的情况下，再去获取这两者任意一个，会导致死锁。**

没有等待通知机制。

~~~java
// 写锁
long stamp = stampedLock.writeLock();
try {
    
} finally {
    stampedLock.unlockWrite(stamp);
}

// 悲观读锁
long stamp = stampedLock.readLock();
try {
    
} finally {
    stampedLock.unlockRead(stamp);
}

// 乐观读锁
long stamp = stampedLock.tryOptimisticRead();
try {
    // 验证是否被修改,无效回退到悲观读锁
    if (!stampedLock.validate(stamp)) {
        // 悲观读锁
        stamp = stampedLock.readLock();
        try {
            
        } finally {
            // 释放悲观读锁
            stampedLock.unlockRead(stamp);
        }
    }
} finally {
    // 无需手动释放乐观锁
}


~~~



## 同步器

### CountDownLatch

计数器开关：让调用CountDownLatch(n).awati()方法的线程等待(线程状态WAITING)，直到CountDownLatch.countDown()执行n次，计数器为0，线程开始执行。

通过调用LockSupport.park(this);让线程进入WAITING状态。



~~~java
class Driver { 
	void main() throws InterruptedException { 
		CountDownLatch startSignal = new CountDownLatch(1);
		CountDownLatch doneSignal = new CountDownLatch(N);
		for (int i = 0; i < N; ++i) {
			new Thread(new Worker(startSignal, doneSignal)).start();
		}
		
		doSomethingElse();
		// 唤醒startSignal等待的线程
		startSignal.countDown();
		// 等待doneSignal被唤醒
		doneSignal.await();
		// 唤醒之后执行其它操作
		doSomethingElse();
		
	}  
}
class Worker implements Runnable {
	private final CountDownLatch startSignal;
	private final CountDownLatch doneSignal;
	Worker(CountDownLatch startSignal, CountDownLatch doneSignal) {
		this.startSignal = startSignal;
		this.doneSignal = doneSignal;
	}
	
	public void run() {
		try {
			// 等待被唤醒
			startSignal.await();
			doWork();
			// 计数-1,缓存doneSignal等待的线程
			doneSignal.countDown();
		} catch (InterruptedException ex) {
		
		} 
	}      
	void doWork() { 
		// ...
	}  
}

~~~



### CyclicBarrier

循环使用计数器：计数器执行到临界点，如果CyclicBarrier的Runnable不为空，则调用一次Runnable的run方法，重置计数器值为初始值，唤醒其它等待线程。

![image-20241113111103315](http://47.101.155.205/image-20241113111103315.png)

await()：计数器减1，如果计数器为0执行可用的run方法，重置计数器；不为0，则释放锁等待。



### Semaphore

计数信号量：一个信号量维护了一些许可证，acquire()方法每次会消耗一个许可证，如果没有获取到则会阻塞线程；release()添加一个许可证，并唤醒阻塞的线程。

支持公平性：体现在如果有等待获取凭证的线程，应该是先等待的先获取凭证。

![image-20241113135147124](http://47.101.155.205/image-20241113135147124.png)



acquire：获取一个可用凭证，没有获取到则阻塞(实际线程状态时WAITING)。

acquire(int)：获取指定的可用凭证数量，没有获取到则阻塞(实际线程状态时WAITING)。

![image-20241113132216496](http://47.101.155.205/image-20241113132216496.png)



tryAcquire()：获取一个可用的的凭证，成功返回true，失败返回false(不阻塞)。

tryAcquire(int)：获取指定数量的可用凭证，成功返回true，失败返回false(不阻塞)。

![image-20241113133115035](http://47.101.155.205/image-20241113133115035.png)

release()：添加一个可用的凭证，避免凭证数量的溢出。

release(int)：添加指定数量的可用凭证。

![image-20241113134003493](http://47.101.155.205/image-20241113134003493.png)



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



## Fork/Join

### ForkJoinPool

![image-20241119134736614](http://47.101.155.205/image-20241119134736614.png)





## CompletableFuture