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
|                              | LockSupport.parkUntil() |

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



#### DelayQueue

是一个无界的阻塞队列，队列的功能基于PriorityQueue(优先队列)实现。队列中的元素需要实现Delayed接口，一个是延期时间另外一个是重写compareTo()方法。

元素只有getDelay()返回的值小于等于0时才会被取出。

线程安全：Lock锁实现。



#### LinkedBlockingDeque

一个阻塞有界的双端队列。

默认的队列容量是Integer.MAX_VALUE。

线程安全：基于Lock锁实现。



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

