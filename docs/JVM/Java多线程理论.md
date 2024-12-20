# Java多线程理论
## Java内存模型

Java内存模型的主要目的是定义程序中各种变量的访问规则，即关注在虚拟机把变量值存储到内存和从内存中取出变量值这样的底层细节。这里变量有实例变量、静态变量、不包括局部变量和方法参数(变量为引用时除外)，局部变量和方法参数时线程私有的，不会被共享。

### 主内存和工作内存

Java内存模型规定了所有的变量都存储在主内存中。每条线程有自己的工作内存，线程的工作内存主要是保存了被该线程使用的变量的主内存副本(并不会是这个对象的所有内容)，线程对变量的所有操作(读取、赋值)都必须在工作内存中进行，也不能之间读写主内存中的数据。

![image-20240207135220524](http://47.101.155.205/image-20240207135220524.png)



### 内存间交互操作

一个变量如何从主内存拷贝到工作内存、如何从工作内存同步主内存这一类的实现细节，Java内存模型定义的8种操作来完成。Java虚拟机实现时，必须保证lock、unlock、read、load、use、assign、store、write这些操作的原子性、不可再分(double和long类型除外)。

- lock(锁定)：作用于主内存的变量，它把一个变量标识为一个线程独占的状态。
- unlock(解锁)：作用于主内存的变量，它把一个处于锁定状态的变量释放出来，释放之后才能被其它线程锁定。
- read(读取)：作用于主内存的变量，它把一个主内存的变量传输到线程的工作内存中，以便随后的load使用。
- load(载入)：作用于工作内存，它将read从主内存得到的变量值放入工作内存的变量副本中。
- use(使用)：作用于工作内存，它把工作内存中一个变量的值传递给执行引擎，使用变量值的字节码指令会使用这个操作。
- assign(赋值)：作用于工作内存，它把一个执行引擎接收的值赋给工作内存的变量，赋值变量的字节码指令会使用这个操作。
- store(存储)：作用于工作内存，它把工作内存中的一个变量的值传输到主内存中，以便随后的write使用。
- write(写入)：作用于主内存的变量，它把store操作获取到的值放到主内存中去。

主内存拷贝至工作内存：read、load；

工作内存同步回主内存：store、write；

上述两个操作要保证顺序执行，但是不保证连续执行。

8种操作需要满足一下规则：

- 不允许read和load、store和write操作之一单独出现；
- 不允许一个线程丢弃它最近的assign操作；
- 不允许一个线程无原因地(没有发生assign操作)把数据从工作内存同步回主内存；
- 新的变量只能在主内存中诞生；
- 一个变量在同一时刻只能被同一线程进行lock操作(多次lock多次unlock)；
- 如果对变量进行lock操作，那么会清空工作内存中此变量的值，执行引擎在使用这个变量前，需要重新执行load或assign操作以初始化变量的值；
- 变量没有被lock，就不能执行unlock，不允许unlock去执行其它线程锁定的变量；
- 对一个变量执行unlock操作之前，需要把工作内存的变量同不回主内存中。



简化操作为：read、write、lock和unlock四种。



### volatile特殊规则

volatile是Java虚拟机提供最轻量级的同步机制。

volatile两大特性：

- 可见性：保证变量对所有线程的可见性(当一个线程修改了变量的值，新值对其它线程立即可见)
- 禁止指令重排：保证一个线程里代码的串行执行，按代码的书写顺序执行。

volatile规则要求：

每次使用volatile变量都需要从主内存刷新最新值到工作内存；

每次volatile变量的修改都会被同步到主内存中。

这样volatile修饰变量的i++操作就不是线程安全的。



~~~java
public class VolatileTest {
    private static int i = 0;

    public static void main(String[] args) {

        Thread t1 = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "修改成功");
            add();
        }, "T1");

        Thread t2 = new Thread(() -> {
            while (i == 0) {
                // 不加任何代码这里会死循环
            }
            System.out.println(Thread.currentThread().getName() +  " stop");
        }, "T2");

        t1.start();
        t2.start();

    }

    public static void add(){
        i++;
    }
}

~~~

![image-20240207154854893](http://47.101.155.205/image-20240207154854893.png)



### 原子性、可见性和有序性

#### 原子性

原子性变量操作：read、load、use、assign、store和write。

基本数据类型的访问，读写都是具备原子性的(long和double的非原子协定64位/32*2)。

需要提供更大访问的原子性操作，Java没有直接提供lock和unlock操作，但是提供了字节码指令monitorenter和monitorexit来隐式的使用这两个操作。这两个操作对应的就是synchronized。



#### 可见性

当一个线程修改一个共享变量之后，其它线程能立即得知这个修改。

除了volatile能保证可见性，Java的synchronized和final也能实现可见性。

synchronized的可见性是通过对一个变量执行unlock操作之前，需要将这个变量同步回主内存中。

final的可见性是：被final修饰的变量(静态变量、实例变量)，变量一但初始化完成(没有this引用逃逸)，就能被其它线程看见final字段的值。

对象创建的过程：1、再堆中分配内存；2、调用构造器创建实例；3、将引用指向实例的内存。



#### 有序性

volatile通过禁止指令重排保证有序性(在单个线程内)；

synchronized通过同一时刻只能有一个线程对变量进行lock操作，控制其它线程只能串行地执行。



### 先行发生原则

操作A先行发生于操作B，其实就是说发生操作B之前，操作A产生的影响能被操作B观察到。

天然的先行发生规则：

程序次序规则：在一个线程内，按照控制流程，书写在前面的代码先行发生于书写在后面的代码。

线程锁定规则：一个unlock操作先行发生于后面对同一个锁的lock操作。即前一个线程锁定变量的修改，对下一个获取锁的线程可见。

volatile变量规则：对一个volatile变量的写操作先行发生于后面对这个变量的读操作。

线程启动规则：Thread对象的start()方法先行发生于此线程的任何操作。

线程终止规则：线程中的所有操作都先行发生于对此线程的终止检测。

线程中断规则：线程的interrupt()方法调用先行发生于被中断线程的代码检测到中断事件的发生。

对象终结原则：一个对象初始化完成先行发生于它的finalize()方法的开始。

传递性：如果操作A先行发生于操作B，操作B先行发生于C，那就可以得出操作A先行发生于B。



## 线程

线程是比进程更轻量级的执行单位，线程的引入，可以将一个进程资源的资源分配和执行调度分开，各个线程可以共享进程资源，又可以独立调度。

线程目前是Java里面进行处理器资源调度的最基本单位。

实现线程的三种方式：使用内核线程实现(1:1实现)、使用用户线程实现(1:N实现)、使用用户线程与轻量级进程混合实现(N:M实现)。



### 内核线程实现

内核线程(KLT)就是又操作系统内核支持的线程，这种线程由内核来完成线程的切换，内核通过操作调度器对线程进行调度，并负责将线程的任务映射到各个处理器上。

程序一般不会直接使用内核线程，而是使用内核线程的一种高级接口-轻量级进程(LWP)，轻量级进程就是我们通常所说的线程，由于每个轻量级进程都有一个内核线程支持，这种轻量级进程和内核线程1:1的关系称为一对一的线程模型。

由于内核线程的支持，每个轻量级进程都成为了一个独立的调度单元，即使其中某一个轻量级进程在系统调用中被阻塞了，也不会影响整个进程的继续工作。

局限性：由于是基于内核线程实现的，所以各种线程操作，如创建、析构和同步，都需要进行系统调用。而系统调用的代价相对较高，需要在用户态和内核态中来回切换。轻量级进程需要内核线程支持，消耗一定的内核资源，支持的轻量级进程数量有限。



### 用户线程实现

广义上：一个线程只要不是内核线程，都可以认为是用户线程。

狭义上：用户线程(UT)是指完全建立在用户空间的线程库上，系统内核不能感知到用户线程的存在及如何实现的。用户线程的建立、同步、销毁和调度都在用户态中完成，不需要内核的帮助。

如果程序实现得当，这种线程不需要切换到内核态，因此操作可以是非常快速且低消耗的，也能支持规模更大的线程数量，这种进程与用户进程是1:N的关系，成为一对多的线程模型。



### 混合实现

既存在用户线程，也存在轻量级进程。用户线程建立在用户空间中，因此用户线程的创建、切换、构析等操作依然廉价，并且可以大规模的用户线程并发，而操作系统支持轻量级进程则作为用户线程和内核线程之间的桥梁，这样就可以使用内核提供的线程调度功能及处理器映射，并且用户线程的系统调用要通过轻量级进程来完成。这种就是多对多的线程模型。





## Java线程调度

协同式调度：线程的执行事件由线程本身来控制，线程把自己的工作执行完成，主动通知系统切换到另外一个线程上。线程出现阻塞会导致进程阻塞，从而导致系统崩溃。

抢占式调度：每个线程由系统分配执行时间，线程的切换不由线程本身决定。线程的执行时间是可控的，Java提供了10种线程优先级。



### 状态转换

Java线程有6种状态，在任意的一个时间点，一个线程只能有且仅有一种其中的状态。

- 新建(New)：创建后未启动的线程状态；
- 运行(Runnable)：包括操作系统线程状态的Running和Ready，处于此状态的线程可能正在运行，也可能正在等待操作系统分配执行时间；
- 无期限等待(Waiting)：处于这种状态的线程不会被分配处理器执行时间，它们要等待其它线程显示唤醒。
- 限期等待(Timed Waiting)：处于这种状态的线程不会被分配处理器时间，它们无需等待其它线程显示唤醒，在一定时间过后会由系统自动唤醒。
- 阻塞(Blocked)：线程阻塞，在等待获取一个排他锁。
- 结束(Terminated)：已终止线程的线程状态。

![image-20240207175414595](http://47.101.155.205/image-20240207175414595.png)



## Java线程安全

线程之所以不安全，源于多线程对共享变量访问，Java多线程对共享变量的操作可分为不可变、绝地线程安全、相对线程安全、线程兼容和线程对立(线程安全程度由强到弱)。

- 不可变：共享数据不可变性，final的基础数据类型，String对象
- 绝对线程安全：synchronized同步代码块
- 相对线程安全：Vector、HashTable、StringBuffer等
- 线程兼容：正确使用同步手段保证并发情况下的线程安全
- 线程对立：死锁



## Java线程安全实现方法

### 互斥同步

同步时指多线程并发访问共享数据时，保证共享数据在同一时刻只能被一条(或一些，信号量)线程使用。互斥时实现同步的手段，临界区、互斥量和信号量都是常见的互斥实现方式。互斥是因，同步是果；互斥为方法，同步为目的。

Lock锁和synchronized锁

> synchronized和ReentrantLock锁之间的区别

1. 性能：低并发情况下，synchronized优于ReentrantLock，因为synchronized内置了JVM的优化机制，可以将加锁和解锁操作内联到代码中。在高并发情况下，ReentrantLock性能更好，因为它支持公平锁和非公平锁两种模式，而且支持中断、超时等高级特性
2. 可中断性：ReentrantLock支持中断等待锁的线程，当一个线程等待锁的过程中，可以被其他线程中断()，synchronized不支持
3. 公平性：当多个线程等待同一个锁时，ReentrantLock可以保证等待时间最长的线程先获取到锁(公平锁)，而synchronized做不到。默认是非公平锁，使用公平锁，性能会下降
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



### 非阻塞同步

互斥同步面临的主要问题是进行线程阻塞和唤醒所带来的性能开销，因此也称为阻塞同步。

Java引入了新的方式，CAS(比较并交换)

CAS需要三个参数：内存位置、旧的预期值、准备设置的新值。

这里var1和var2代表内存位置；

var5代表旧的预期值；

var5+var4代表准备设置的新值。

![image-20240207191650574](http://47.101.155.205/image-20240207191650574.png)





### 无同步方案

方法中本身就没有设置共享数据。

线程本地存储，共享变量是否能保证只在同一个线程中执行。

消息队列会将消费过程控制在一个线程中完成。





## 锁优化

### 自旋锁和自适应自旋锁

自旋锁在等待的过程中会耗费处理器的执行时间。可以通过设置自旋的次数来控制退出自旋的状态(挂起线程)。

自适应自旋锁的目的是：自适应自旋锁的等待时间不再是固定的了，而是由上一次在同一个锁上的自旋时间及锁的拥有者的状态来决定。如果在同一个锁对象上，自旋等待刚刚成功获得过锁，并且持有锁的线程正在运行中，那么虚拟机就会认为此次自旋也很有可能再次成功，进而运行自旋等待持续时间相对较长的时间，如持续100次的自旋。如，对于某个锁，自旋很少成功获取锁，那么以后获取这个锁时将很有可能省去自旋过程，以避免浪费处理器时间。





### 锁消除

例如Java中String字符串的拼接，可能会转换为StringBuffer的append()模式，这个是一个同步方法，这里的同步代码根本不存在共享数据竞争的问题，所以进行了锁消除的优化策略





### 锁粗化

对于同一个对象会进行多次的加锁和解锁，虚拟机能控制只加锁一次，例如StringBuffer的append()方法多次执行。



### 偏向锁

- 偏向锁是为了解决在**无竞争**的情况下对锁的性能损耗问题而引入的机制；
- 当一个线程获取锁并且没有其他线程竞争时，偏向锁会将锁标记为偏向于该线程，并且之后该线程再次获取锁时可以直接获得，而不需要进行同步操作；
- 如果在多线程环境下，没有其他线程争夺锁时，使用偏向锁可以减少不必要的同步操作，提高程序性能

在无竞争的情况下，把整个同步都消除掉，连CAS操作都不需要。



### 轻量级锁

- 轻量级锁是为了解决在竞争不激烈的情况下对锁性能损耗问题而引入的机制；
- 当一个线程尝试获取锁时，如果发现锁对象的标记为偏向锁状态，并且该锁对象被其他线程占用时，此时会升级为轻量级锁
- 轻量级锁使用 CAS 操作来尝试获取锁，如果成功则表示当前线程获得了锁，否则进入自旋状态或者进行其他的锁竞争策略。

在没有多线程竞争的前提下(同步周期)，减少传统的重量级锁使用互斥量的性能消耗。









