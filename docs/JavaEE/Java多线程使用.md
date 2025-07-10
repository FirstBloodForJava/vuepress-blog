# Java多线程

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

Thread实例方法，中断线程。

1. 不是中断自己，checkAccess()可能抛出SecurityException异常；
2. 中断的线程调用了Object.wait()或Thread的join()或sleep()方法，则该线程会抛出`InterruptedException`异常，线程的中断状态将会清除；
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



静态方法 `interrupted()` 和 实例方法 `isInterrupted()` 的区别：

- `interrupted()`：静态方法返回当前线程的中断状态，如果返回true，则**重置**中断状态。
- `isInterrupted()`：实例方法，返回当前线程的中断状态，不重置线程中断状态。

interrupt()：标记线程状态为中断。线程被标记为中断，实例方法 `isInterrupted()` 的结果会一直为 true；静态方法的结果第一次为 true，第二次为 false。



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

通过CAS机制和自旋锁实现线程安全，性能比HahsTable和SynchronizedMap要高。



#### ConcurrentSkipListMap

线程安全、可排序的集合。

通过CAS保证并发安全。





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



对象创建的过程：

- 再堆中分配内存；
- 调用构造器创建实例；
- 将引用指向实例的内存













## 锁

1. synchronized锁：synchronized是Java中内置的一种锁机制，它可以用于同步方法和同步块，保证线程访问共享资源时的互斥性。
2. ReentrantLock锁：ReentrantLock是Java中的一种可重入锁，它与synchronized类似(如果一个线程已经获取了ReentrantLock锁，并且还没有释放它，那么它可以继续获取该锁，而不会因为自己已经持有该锁而被阻塞。)，但是更加灵活和可控，可以用于更复杂的锁场景。
3. ReadWriteLock锁：ReadWriteLock是Java中提供的一种读写锁，它允许多个线程同时读取共享资源，但只允许一个线程进行写操作。
4. StampedLock锁：StampedLock是Java中的一种乐观锁，它可以在不进行加锁的情况下读取和写入共享资源，从而提高了并发性能。
5. Semaphore锁：Semaphore是Java中的一种信号量锁，它可以控制同时访问共享资源的线程数量，从而实现限流和流量控制。
6. Condition锁：Condition是Java中的一种条件锁，它可以用于线程间的通信和协调，例如等待某个条件满足后再进行执行。



### synchronized和Lock

锁是一种通过多个线程控制对共享资源的访问的工具。锁提供对共享资源的独占访问：在一个时间，只有一个线程获得锁和访问共享资源。有些锁(ReadWriteLock)允许并发访问。

synchronized是Java的关键字，属于JVM级别的同步机制。可以作用与同步方法或同步代码块。支持锁定的对象有：this对象、指定对象、当前类。JVM自动管理锁和释放锁，不需要手动解锁，线程执行完同步代码块自动释放锁。

Lock：是java.util.concurrent.locks包中的接口，提供了更细粒度的锁控制。Lock锁需要显示的获取和释放锁。Lock常用的实现类有ReentrantLock。

**lock锁的方法，锁住，不影响synchronized锁住的调用，两者互不干预。**

synchronized和Lock直接的区别：

1. 性能：synchronized早期性能较差，从 Java 6 开始进行了优化（偏向锁、轻量级锁），在大多数简单同步场景中性能接近甚至优于Lock；
2. 可中断性：Lock锁支持中断等待锁的线程，线程等待synchronized块的锁时不可中断；
3. 公平性：Lock(`ReentrantLock`)支持设置为公平锁，会影响性能，synchronized不支持；
4. 等待通知机制：synchronized内置了wait、notify、notifyAll等方法，实现线程之间的等待唤醒机制，但条件控制较少。`ReentrantLock`借助`Condition`对象来实现。Lock锁锁住的了的对象，没有解锁，其他线程无法访问，可以使用`Lock.newCondition().await()`释放锁，让其他线程访问，但是这个线程需要有lock锁(如果释放锁之后才唤醒线程，会出现IllegalMonitorStateException异常)，要在lock.unlock()之前调用lock.newCondition().signal()来唤醒，否则出现异常。



中断性：

~~~java
//如果等待锁的线程在等待锁的过程中已经获取了锁，并且没有释放锁的话，那么中断请求是不会中断已经持有锁的线程的，因为 ReentrantLock 是支持嵌套获取锁的。只有当等待锁的线程还没有获取到锁，正在等待时，才能通过中断请求来中断等待锁的线程。
public class InterruptTest {

    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock();

        Thread waitingThread = new Thread(() -> {
            try {
                lock.lockInterruptibly();
                // !Thread.currentThread().isInterrupted()
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
2. 写锁：独占锁，当前线程可以持有写锁，其它线程无法获取读锁及写锁(当前线程可以获取读锁，也可再次获取写锁同ReenTrantLock)；其它线程获取读锁，当前线程无法获取写锁。

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



