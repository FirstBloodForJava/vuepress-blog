import{_ as n,c as a,e,o as i}from"./app-BIGZvh4f.js";const l={};function c(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="errorfile分析" tabindex="-1"><a class="header-anchor" href="#errorfile分析"><span>ErrorFile分析</span></a></h1><p>现在分析工具：https://fastthread.io/</p><figure><img src="http://47.101.155.205/image-20250521172318096.png" alt="image-20250521172318096" tabindex="0" loading="lazy"><figcaption>image-20250521172318096</figcaption></figure><p><strong>启用了CompressedOops，Java堆被放在低地址空间，可能阻碍native memory（如mmap、Metaspace）增长，从而导致本地内存分配失败 → 崩溃。</strong></p><p><strong>GC内存字段含义：</strong></p><ul><li>used：实际使用的内存。</li><li>capacity：JVM内部已经分配好、可立即使用但尚未使用的空间。</li><li>committed：操作系统已承诺的物理内存页。JVM向操作系统实际申请的内存大小。</li><li>reserved：JVM为该块预留的最大虚拟地址空间。</li></ul><figure><img src="http://47.101.155.205/image-20250522164911113.png" alt="image-20250522164911113" tabindex="0" loading="lazy"><figcaption>image-20250522164911113</figcaption></figure><figure><img src="http://47.101.155.205/image-20250522165245825.png" alt="image-20250522165245825" tabindex="0" loading="lazy"><figcaption>image-20250522165245825</figcaption></figure><p><strong>可以给应用开启预分配内存，避免这种情况的内存不够，导致应用停止的情况。</strong></p><figure><img src="http://47.101.155.205/image-20250522165955616.png" alt="image-20250522165955616" tabindex="0" loading="lazy"><figcaption>image-20250522165955616</figcaption></figure><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">#</span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> There is insufficient memory for the Java Runtime Environment to continue.</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Native memory allocation (mmap) failed to map 67108864 bytes for committing reserved memory.</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Possible reasons:</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   The system is out of physical RAM or swap space</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   The process is running with CompressedOops enabled, and the Java Heap may be blocking the growth of the native heap</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Possible solutions:</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Reduce memory load on the system</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Increase physical memory or swap space</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Check if swap backing store is full</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Decrease Java heap size (-Xmx/-Xms)</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Decrease number of Java threads</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Decrease Java thread stack sizes (-Xss)</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   Set larger code cache with -XX:ReservedCodeCacheSize=</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   JVM is running with Unscaled Compressed Oops mode in which the Java heap is</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>     placed in the first 4GB address space. The Java Heap base address is the</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>     maximum limit for the native heap growth. Please use -XX:HeapBaseMinAddress</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>     to set the Java Heap base and to place the Java Heap above 4GB virtual address.</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> This output file may be truncated or incomplete.</span></span>
<span class="line">#</span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>  Out of Memory Error (os_linux.cpp:2749), pid=100680, tid=0x00007fc44a7f7700</span></span>
<span class="line">#</span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> JRE version: Java(TM) SE Runtime Environment (8.0_211-b12) (build 1.8.0_211-b12)</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Java VM: Java HotSpot(TM) 64-Bit Server VM (25.211-b12 mixed mode linux-amd64 compressed oops)</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Failed to write core dump. Core dumps have been disabled. To enable core dumping, try &quot;ulimit -c unlimited&quot; before starting Java again</span></span>
<span class="line">#</span>
<span class="line"></span>
<span class="line">---------------  T H R E A D  ---------------</span>
<span class="line"></span>
<span class="line">Current thread (0x00007fc46c13e000):  VMThread <span class="token url">[<span class="token content">stack: 0x00007fc44a6f7000,0x00007fc44a7f8000</span>] [<span class="token variable">id=100692</span>]</span></span>
<span class="line"></span>
<span class="line">Stack: [0x00007fc44a6f7000,0x00007fc44a7f8000],  sp=0x00007fc44a7f63b0,  free space=1020k</span>
<span class="line">Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)</span>
<span class="line">V  [libjvm.so+0xad3455]  VMError::report_and_die()+0x2e5</span>
<span class="line">V  [libjvm.so+0x4e0537]  report_vm_out_of_memory(char const<span class="token italic"><span class="token punctuation">*</span><span class="token content">, int, unsigned long, VMErrorType, char const</span><span class="token punctuation">*</span></span>)+0x67</span>
<span class="line">V  [libjvm.so+0x910320]  os::pd_commit_memory(char<span class="token italic"><span class="token punctuation">*</span><span class="token content">, unsigned long, unsigned long, bool)+0x100</span>
<span class="line">V  [libjvm.so+0x90794f]  os::commit_memory(char</span><span class="token punctuation">*</span></span>, unsigned long, unsigned long, bool)+0x1f</span>
<span class="line">V  [libjvm.so+0x98c736]  PSVirtualSpace::expand_by(unsigned long)+0x56</span>
<span class="line">V  [libjvm.so+0x98d9c8]  PSYoungGen::resize(unsigned long, unsigned long)+0xd8</span>
<span class="line">V  [libjvm.so+0x98a166]  PSScavenge::invoke_no_policy()+0x1376</span>
<span class="line">V  [libjvm.so+0x98a4fc]  PSScavenge::invoke()+0x4c</span>
<span class="line">V  [libjvm.so+0x93a248]  ParallelScavengeHeap::failed_mem_allocate(unsigned long)+0x68</span>
<span class="line">V  [libjvm.so+0xad4fa3]  VM_ParallelGCFailedAllocation::doit()+0x93</span>
<span class="line">V  [libjvm.so+0xada1c6]  VM_Operation::evaluate()+0x46</span>
<span class="line">V  [libjvm.so+0xad84fd]  VMThread::evaluate_operation(VM_Operation<span class="token italic"><span class="token punctuation">*</span><span class="token content">) [clone .constprop.44]+0xcd</span>
<span class="line">V  [libjvm.so+0xad8ae3]  VMThread::loop()+0x3a3</span>
<span class="line">V  [libjvm.so+0xad8eb8]  VMThread::run()+0x78</span>
<span class="line">V  [libjvm.so+0x90d952]  java_start(Thread</span><span class="token punctuation">*</span></span>)+0x102</span>
<span class="line"></span>
<span class="line">VM_Operation (0x00007fc4717a5640): ParallelGCFailedAllocation, mode: safepoint, requested by thread 0x00007fc46c009800</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">---------------  P R O C E S S  ---------------</span>
<span class="line"></span>
<span class="line">Java Threads: ( =&gt; current thread )</span>
<span class="line">  0x00007fc46c256000 JavaThread &quot;Log4j2-TF-3-Scheduled-1&quot; daemon [_thread_blocked, id=100702, stack(0x00007fc449be4000,0x00007fc449ce5000)]</span>
<span class="line">  0x00007fc46c1a8800 JavaThread &quot;Service Thread&quot; daemon [_thread_blocked, id=100699, stack(0x00007fc449ff0000,0x00007fc44a0f1000)]</span>
<span class="line">  0x00007fc46c183800 JavaThread &quot;C1 CompilerThread2&quot; daemon [_thread_blocked, id=100698, stack(0x00007fc44a0f1000,0x00007fc44a1f2000)]</span>
<span class="line">  0x00007fc46c181800 JavaThread &quot;C2 CompilerThread1&quot; daemon [_thread_blocked, id=100697, stack(0x00007fc44a1f2000,0x00007fc44a2f3000)]</span>
<span class="line">  0x00007fc46c17f000 JavaThread &quot;C2 CompilerThread0&quot; daemon [_thread_blocked, id=100696, stack(0x00007fc44a2f3000,0x00007fc44a3f4000)]</span>
<span class="line">  0x00007fc46c17d800 JavaThread &quot;Signal Dispatcher&quot; daemon [_thread_blocked, id=100695, stack(0x00007fc44a3f4000,0x00007fc44a4f5000)]</span>
<span class="line">  0x00007fc46c14a800 JavaThread &quot;Finalizer&quot; daemon [_thread_blocked, id=100694, stack(0x00007fc44a4f5000,0x00007fc44a5f6000)]</span>
<span class="line">  0x00007fc46c148000 JavaThread &quot;Reference Handler&quot; daemon [_thread_blocked, id=100693, stack(0x00007fc44a5f6000,0x00007fc44a6f7000)]</span>
<span class="line">  0x00007fc46c009800 JavaThread &quot;main&quot; [_thread_blocked, id=100682, stack(0x00007fc4716ab000,0x00007fc4717ac000)]</span>
<span class="line"></span>
<span class="line">Other Threads:</span>
<span class="line">=&gt;0x00007fc46c13e000 VMThread <span class="token url">[<span class="token content">stack: 0x00007fc44a6f7000,0x00007fc44a7f8000</span>] [<span class="token variable">id=100692</span>]</span></span>
<span class="line">  0x00007fc46c1ab800 WatcherThread <span class="token url">[<span class="token content">stack: 0x00007fc449eef000,0x00007fc449ff0000</span>] [<span class="token variable">id=100700</span>]</span></span>
<span class="line"></span>
<span class="line">VM state:at safepoint (normal execution)</span>
<span class="line"></span>
<span class="line">VM Mutex/Monitor currently owned by a thread:  ([mutex/lock_event])</span>
<span class="line">[0x00007fc46c006c30] Threads_lock - owner thread: 0x00007fc46c13e000</span>
<span class="line">[0x00007fc46c007130] Heap_lock - owner thread: 0x00007fc46c009800</span>
<span class="line"></span>
<span class="line">heap address: 0x00000000e0000000, size: 512 MB, Compressed Oops mode: 32-bit</span>
<span class="line">Narrow klass base: 0x0000000000000000, Narrow klass shift: 3</span>
<span class="line">Compressed class space size: 1073741824 Address: 0x0000000100000000</span>
<span class="line"></span>
<span class="line">Heap:</span>
<span class="line"> PSYoungGen      total 68608K, used 2073K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)</span>
<span class="line">  eden space 65536K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f9580000)</span>
<span class="line">  from space 3072K, 67% used [0x00000000f9580000,0x00000000f9786760,0x00000000f9880000)</span>
<span class="line">  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)</span>
<span class="line"> ParOldGen       total 44032K, used 2492K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 5% used [0x00000000e0000000,0x00000000e026f300,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 14303K, capacity 14664K, committed 14976K, reserved 1062912K</span>
<span class="line">  class space    used 1717K, capacity 1819K, committed 1920K, reserved 1048576K</span>
<span class="line"></span>
<span class="line">Card table byte_map: [0x00007fc470979000,0x00007fc470a7a000] byte_map_base: 0x00007fc470279000</span>
<span class="line"></span>
<span class="line">Marking Bits: (ParMarkBitMap*) 0x00007fc472777d80</span>
<span class="line"> Begin Bits: [0x00007fc44b000000, 0x00007fc44b800000)</span>
<span class="line"> End Bits:   [0x00007fc44b800000, 0x00007fc44c000000)</span>
<span class="line"></span>
<span class="line">Polling page: 0x00007fc4729b9000</span>
<span class="line"></span>
<span class="line">CodeCache: size=245760Kb used=4757Kb max_used=4771Kb free=241002Kb</span>
<span class="line"> bounds [0x00007fc45d000000, 0x00007fc45d4b0000, 0x00007fc46c000000]</span>
<span class="line"> total_blobs=1790 nmethods=1396 adapters=309</span>
<span class="line"> compilation: enabled</span>
<span class="line"></span>
<span class="line">Compilation events (10 events):</span>
<span class="line">Event: 6.257 Thread 0x00007fc46c183800 1392   !   3       java.lang.Package::getSystemPackage (63 bytes)</span>
<span class="line">Event: 6.259 Thread 0x00007fc46c183800 nmethod 1392 0x00007fc45d4a5e50 code [0x00007fc45d4a6040, 0x00007fc45d4a69e8]</span>
<span class="line">Event: 6.805 Thread 0x00007fc46c183800 1394       3       org.apache.logging.log4j.core.pattern.PatternFormatter::requiresLocation (31 bytes)</span>
<span class="line">Event: 6.806 Thread 0x00007fc46c183800 nmethod 1394 0x00007fc45d496950 code [0x00007fc45d496ae0, 0x00007fc45d496fa8]</span>
<span class="line">Event: 6.807 Thread 0x00007fc46c183800 1393       3       java.lang.Class::newReflectionData (74 bytes)</span>
<span class="line">Event: 6.808 Thread 0x00007fc46c183800 nmethod 1393 0x00007fc45d4a4ed0 code [0x00007fc45d4a50c0, 0x00007fc45d4a5a70]</span>
<span class="line">Event: 6.839 Thread 0x00007fc46c17f000 1395       4       org.springframework.boot.loader.jar.Handler::parseURL (54 bytes)</span>
<span class="line">Event: 6.936 Thread 0x00007fc46c17f000 nmethod 1395 0x00007fc45d4ab310 code [0x00007fc45d4ab520, 0x00007fc45d4ac130]</span>
<span class="line">Event: 7.017 Thread 0x00007fc46c181800 1396       4       sun.misc.URLClassPath::getResource (83 bytes)</span>
<span class="line">Event: 7.032 Thread 0x00007fc46c181800 nmethod 1396 0x00007fc45d4acd10 code [0x00007fc45d4acf20, 0x00007fc45d4ad940]</span>
<span class="line"></span>
<span class="line">GC Heap History (10 events):</span>
<span class="line">Event: 3.152 GC heap after</span>
<span class="line">Heap after GC invocations=2 (full 0):</span>
<span class="line"> PSYoungGen      total 18944K, used 2229K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 16384K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f6580000)</span>
<span class="line">  from space 2560K, 87% used [0x00000000f6800000,0x00000000f6a2d7b0,0x00000000f6a80000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f6580000,0x00000000f6580000,0x00000000f6800000)</span>
<span class="line"> ParOldGen       total 44032K, used 16K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0004000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 5856K, capacity 6110K, committed 6400K, reserved 1056768K</span>
<span class="line">  class space    used 620K, capacity 691K, committed 768K, reserved 1048576K</span>
<span class="line">}</span>
<span class="line">Event: 3.563 GC heap before</span>
<span class="line">{Heap before GC invocations=3 (full 0):</span>
<span class="line"> PSYoungGen      total 18944K, used 18613K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 16384K, 100% used [0x00000000f5580000,0x00000000f6580000,0x00000000f6580000)</span>
<span class="line">  from space 2560K, 87% used [0x00000000f6800000,0x00000000f6a2d7b0,0x00000000f6a80000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f6580000,0x00000000f6580000,0x00000000f6800000)</span>
<span class="line"> ParOldGen       total 44032K, used 16K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0004000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 6680K, capacity 6954K, committed 7040K, reserved 1056768K</span>
<span class="line">  class space    used 728K, capacity 821K, committed 896K, reserved 1048576K</span>
<span class="line">Event: 3.577 GC heap after</span>
<span class="line">Heap after GC invocations=3 (full 0):</span>
<span class="line"> PSYoungGen      total 18944K, used 2383K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 16384K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f6580000)</span>
<span class="line">  from space 2560K, 93% used [0x00000000f6580000,0x00000000f67d3f00,0x00000000f6800000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f7800000,0x00000000f7800000,0x00000000f7a80000)</span>
<span class="line"> ParOldGen       total 44032K, used 24K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0006000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 6680K, capacity 6954K, committed 7040K, reserved 1056768K</span>
<span class="line">  class space    used 728K, capacity 821K, committed 896K, reserved 1048576K</span>
<span class="line">}</span>
<span class="line">Event: 3.813 GC heap before</span>
<span class="line">{Heap before GC invocations=4 (full 0):</span>
<span class="line"> PSYoungGen      total 18944K, used 18767K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 16384K, 100% used [0x00000000f5580000,0x00000000f6580000,0x00000000f6580000)</span>
<span class="line">  from space 2560K, 93% used [0x00000000f6580000,0x00000000f67d3f00,0x00000000f6800000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f7800000,0x00000000f7800000,0x00000000f7a80000)</span>
<span class="line"> ParOldGen       total 44032K, used 24K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0006000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 7403K, capacity 7706K, committed 7936K, reserved 1056768K</span>
<span class="line">  class space    used 837K, capacity 923K, committed 1024K, reserved 1048576K</span>
<span class="line">Event: 3.824 GC heap after</span>
<span class="line">Heap after GC invocations=4 (full 0):</span>
<span class="line"> PSYoungGen      total 35328K, used 2546K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 32768K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f7580000)</span>
<span class="line">  from space 2560K, 99% used [0x00000000f7800000,0x00000000f7a7cac0,0x00000000f7a80000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f7580000,0x00000000f7580000,0x00000000f7800000)</span>
<span class="line"> ParOldGen       total 44032K, used 104K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e001a000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 7403K, capacity 7706K, committed 7936K, reserved 1056768K</span>
<span class="line">  class space    used 837K, capacity 923K, committed 1024K, reserved 1048576K</span>
<span class="line">}</span>
<span class="line">Event: 4.161 GC heap before</span>
<span class="line">{Heap before GC invocations=5 (full 0):</span>
<span class="line"> PSYoungGen      total 35328K, used 35314K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)</span>
<span class="line">  eden space 32768K, 100% used [0x00000000f5580000,0x00000000f7580000,0x00000000f7580000)</span>
<span class="line">  from space 2560K, 99% used [0x00000000f7800000,0x00000000f7a7cac0,0x00000000f7a80000)</span>
<span class="line">  to   space 2560K, 0% used [0x00000000f7580000,0x00000000f7580000,0x00000000f7800000)</span>
<span class="line"> ParOldGen       total 44032K, used 104K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 0% used [0x00000000e0000000,0x00000000e001a000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 9091K, capacity 9412K, committed 9728K, reserved 1058816K</span>
<span class="line">  class space    used 1070K, capacity 1188K, committed 1280K, reserved 1048576K</span>
<span class="line">Event: 4.170 GC heap after</span>
<span class="line">Heap after GC invocations=5 (full 0):</span>
<span class="line"> PSYoungGen      total 35328K, used 2530K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)</span>
<span class="line">  eden space 32768K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f7580000)</span>
<span class="line">  from space 2560K, 98% used [0x00000000f7580000,0x00000000f77f8ad0,0x00000000f7800000)</span>
<span class="line">  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)</span>
<span class="line"> ParOldGen       total 44032K, used 472K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0076000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 9091K, capacity 9412K, committed 9728K, reserved 1058816K</span>
<span class="line">  class space    used 1070K, capacity 1188K, committed 1280K, reserved 1048576K</span>
<span class="line">}</span>
<span class="line">Event: 4.245 GC heap before</span>
<span class="line">{Heap before GC invocations=6 (full 0):</span>
<span class="line"> PSYoungGen      total 35328K, used 35298K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)</span>
<span class="line">  eden space 32768K, 100% used [0x00000000f5580000,0x00000000f7580000,0x00000000f7580000)</span>
<span class="line">  from space 2560K, 98% used [0x00000000f7580000,0x00000000f77f8ad0,0x00000000f7800000)</span>
<span class="line">  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)</span>
<span class="line"> ParOldGen       total 44032K, used 472K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0076000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 9110K, capacity 9430K, committed 9728K, reserved 1058816K</span>
<span class="line">  class space    used 1073K, capacity 1191K, committed 1280K, reserved 1048576K</span>
<span class="line">Event: 4.261 GC heap after</span>
<span class="line">Heap after GC invocations=6 (full 0):</span>
<span class="line"> PSYoungGen      total 68608K, used 2543K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)</span>
<span class="line">  eden space 65536K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f9580000)</span>
<span class="line">  from space 3072K, 82% used [0x00000000f9880000,0x00000000f9afbf00,0x00000000f9b80000)</span>
<span class="line">  to   space 3072K, 0% used [0x00000000f9580000,0x00000000f9580000,0x00000000f9880000)</span>
<span class="line"> ParOldGen       total 44032K, used 480K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0078000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 9110K, capacity 9430K, committed 9728K, reserved 1058816K</span>
<span class="line">  class space    used 1073K, capacity 1191K, committed 1280K, reserved 1048576K</span>
<span class="line">}</span>
<span class="line">Event: 7.167 GC heap before</span>
<span class="line">{Heap before GC invocations=7 (full 0):</span>
<span class="line"> PSYoungGen      total 68608K, used 68079K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)</span>
<span class="line">  eden space 65536K, 100% used [0x00000000f5580000,0x00000000f9580000,0x00000000f9580000)</span>
<span class="line">  from space 3072K, 82% used [0x00000000f9880000,0x00000000f9afbf00,0x00000000f9b80000)</span>
<span class="line">  to   space 3072K, 0% used [0x00000000f9580000,0x00000000f9580000,0x00000000f9880000)</span>
<span class="line"> ParOldGen       total 44032K, used 480K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)</span>
<span class="line">  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0078000,0x00000000e2b00000)</span>
<span class="line"> Metaspace       used 14303K, capacity 14664K, committed 14976K, reserved 1062912K</span>
<span class="line">  class space    used 1717K, capacity 1819K, committed 1920K, reserved 1048576K</span>
<span class="line"></span>
<span class="line">Deoptimization events (10 events):</span>
<span class="line">Event: 5.001 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.001 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.009 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.016 Thread 0x00007fc46c009800 Uncommon trap: reason=range_check action=make_not_entrant pc=0x00007fc45d38c640 method=sun.reflect.generics.parser.SignatureParser.current()C @ 34</span>
<span class="line">Event: 5.372 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.581 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.600 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203</span>
<span class="line">Event: 5.801 Thread 0x00007fc46c009800 Uncommon trap: reason=null_check action=make_not_entrant pc=0x00007fc45d4297b4 method=java.net.URL.getURLStreamHandler(Ljava/lang/String;)Ljava/net/URLStreamHandler; @ 7</span>
<span class="line">Event: 5.801 Thread 0x00007fc46c009800 Uncommon trap: reason=unstable_if action=reinterpret pc=0x00007fc45d2ef33c method=org.springframework.boot.loader.jar.Handler.parseURL(Ljava/net/URL;Ljava/lang/String;II)V @ 14</span>
<span class="line">Event: 6.010 Thread 0x00007fc46c009800 Uncommon trap: reason=unstable_if action=reinterpret pc=0x00007fc45d246d0c method=java.lang.String.replace(CC)Ljava/lang/String; @ 26</span>
<span class="line"></span>
<span class="line">Classes redefined (0 events):</span>
<span class="line">No events</span>
<span class="line"></span>
<span class="line">Internal exceptions (10 events):</span>
<span class="line">Event: 5.026 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6929568) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.027 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f692ae28) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.027 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f692ccf8) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.027 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f692e5f0) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.038 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6930208) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.039 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6931a50) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.039 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6933278) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.039 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6934c60) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.039 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ArrayIndexOutOfBoundsException&#39;&gt; (0x00000000f6936480) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]</span>
<span class="line">Event: 5.801 Thread 0x00007fc46c009800 Exception &lt;a &#39;java/lang/ClassNotFoundException&#39;: org/springframework/boot/loader/jar/Handler&gt; (0x00000000f7d87090) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/classfile/systemDictionary.cpp, line 210]</span>
<span class="line"></span>
<span class="line">Events (10 events):</span>
<span class="line">Event: 7.028 loading class org/apache/logging/slf4j/Log4jMDCAdapter done</span>
<span class="line">Event: 7.030 loading class org/apache/logging/log4j/util/StackLocatorUtil</span>
<span class="line">Event: 7.030 loading class org/apache/logging/log4j/util/StackLocatorUtil done</span>
<span class="line">Event: 7.030 loading class org/apache/logging/log4j/util/StackLocator</span>
<span class="line">Event: 7.030 loading class org/apache/logging/log4j/util/StackLocator done</span>
<span class="line">Event: 7.039 loading class org/apache/logging/slf4j/Log4jLogger</span>
<span class="line">Event: 7.039 loading class org/apache/logging/slf4j/Log4jLogger done</span>
<span class="line">Event: 7.041 loading class org/slf4j/spi/LocationAwareLogger</span>
<span class="line">Event: 7.041 loading class org/slf4j/spi/LocationAwareLogger done</span>
<span class="line">Event: 7.103 Executing VM operation: ParallelGCFailedAllocation</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">Dynamic libraries:</span>
<span class="line">00400000-00401000 r-xp 00000000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java</span>
<span class="line">00600000-00601000 r--p 00000000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java</span>
<span class="line">00601000-00602000 rw-p 00001000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java</span>
<span class="line">00ed7000-00ef8000 rw-p 00000000 00:00 0                                  [heap]</span>
<span class="line">e0000000-e2b00000 rw-p 00000000 00:00 0 </span>
<span class="line">e2b00000-f5580000 ---p 00000000 00:00 0 </span>
<span class="line">f5580000-f9b80000 rw-p 00000000 00:00 0 </span>
<span class="line">fdb80000-100000000 ---p 00000000 00:00 0 </span>
<span class="line">100000000-1001e0000 rw-p 00000000 00:00 0 </span>
<span class="line">1001e0000-140000000 ---p 00000000 00:00 0 </span>
<span class="line">3ac8400000-3ac8420000 r-xp 00000000 08:02 2097592                        /lib64/ld-2.12.so</span>
<span class="line">3ac861f000-3ac8620000 r--p 0001f000 08:02 2097592                        /lib64/ld-2.12.so</span>
<span class="line">3ac8620000-3ac8621000 rw-p 00020000 08:02 2097592                        /lib64/ld-2.12.so</span>
<span class="line">3ac8621000-3ac8622000 rw-p 00000000 00:00 0 </span>
<span class="line">3ac8800000-3ac8802000 r-xp 00000000 08:02 2097595                        /lib64/libdl-2.12.so</span>
<span class="line">3ac8802000-3ac8a02000 ---p 00002000 08:02 2097595                        /lib64/libdl-2.12.so</span>
<span class="line">3ac8a02000-3ac8a03000 r--p 00002000 08:02 2097595                        /lib64/libdl-2.12.so</span>
<span class="line">3ac8a03000-3ac8a04000 rw-p 00003000 08:02 2097595                        /lib64/libdl-2.12.so</span>
<span class="line">3ac8c00000-3ac8d8b000 r-xp 00000000 08:02 2097593                        /lib64/libc-2.12.so</span>
<span class="line">3ac8d8b000-3ac8f8a000 ---p 0018b000 08:02 2097593                        /lib64/libc-2.12.so</span>
<span class="line">3ac8f8a000-3ac8f8e000 r--p 0018a000 08:02 2097593                        /lib64/libc-2.12.so</span>
<span class="line">3ac8f8e000-3ac8f8f000 rw-p 0018e000 08:02 2097593                        /lib64/libc-2.12.so</span>
<span class="line">3ac8f8f000-3ac8f94000 rw-p 00000000 00:00 0 </span>
<span class="line">3ac9000000-3ac9017000 r-xp 00000000 08:02 2097382                        /lib64/libpthread-2.12.so</span>
<span class="line">3ac9017000-3ac9217000 ---p 00017000 08:02 2097382                        /lib64/libpthread-2.12.so</span>
<span class="line">3ac9217000-3ac9218000 r--p 00017000 08:02 2097382                        /lib64/libpthread-2.12.so</span>
<span class="line">3ac9218000-3ac9219000 rw-p 00018000 08:02 2097382                        /lib64/libpthread-2.12.so</span>
<span class="line">3ac9219000-3ac921d000 rw-p 00000000 00:00 0 </span>
<span class="line">3ac9400000-3ac9483000 r-xp 00000000 08:02 2097601                        /lib64/libm-2.12.so</span>
<span class="line">3ac9483000-3ac9682000 ---p 00083000 08:02 2097601                        /lib64/libm-2.12.so</span>
<span class="line">3ac9682000-3ac9683000 r--p 00082000 08:02 2097601                        /lib64/libm-2.12.so</span>
<span class="line">3ac9683000-3ac9684000 rw-p 00083000 08:02 2097601                        /lib64/libm-2.12.so</span>
<span class="line">3ac9800000-3ac9807000 r-xp 00000000 08:02 2097363                        /lib64/librt-2.12.so</span>
<span class="line">3ac9807000-3ac9a06000 ---p 00007000 08:02 2097363                        /lib64/librt-2.12.so</span>
<span class="line">3ac9a06000-3ac9a07000 r--p 00006000 08:02 2097363                        /lib64/librt-2.12.so</span>
<span class="line">3ac9a07000-3ac9a08000 rw-p 00007000 08:02 2097363                        /lib64/librt-2.12.so</span>
<span class="line">7fc418000000-7fc418021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc418021000-7fc41c000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc41c000000-7fc41c031000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc41c031000-7fc420000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc420000000-7fc42037b000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc42037b000-7fc424000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc424000000-7fc424021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc424021000-7fc428000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc428000000-7fc4283fb000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4283fb000-7fc42c000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc42c000000-7fc42c4a3000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc42c4a3000-7fc430000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc430000000-7fc430021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc430021000-7fc434000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc43616f000-7fc43c000000 r--p 00000000 08:02 1180378                    /usr/lib/locale/locale-archive</span>
<span class="line">7fc43c000000-7fc43c021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc43c021000-7fc440000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc440000000-7fc440021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc440021000-7fc444000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc444000000-7fc44429b000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44429b000-7fc448000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4491bb000-7fc44927b000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44927b000-7fc4493bb000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4493bb000-7fc4493cc000 r-xp 00000000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so</span>
<span class="line">7fc4493cc000-7fc4495cb000 ---p 00011000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so</span>
<span class="line">7fc4495cb000-7fc4495cc000 r--p 00010000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so</span>
<span class="line">7fc4495cc000-7fc4495cd000 rw-p 00011000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so</span>
<span class="line">7fc4495cd000-7fc4497cd000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4497cd000-7fc4497e3000 r-xp 00000000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so</span>
<span class="line">7fc4497e3000-7fc4499e2000 ---p 00016000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so</span>
<span class="line">7fc4499e2000-7fc4499e3000 r--p 00015000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so</span>
<span class="line">7fc4499e3000-7fc4499e4000 rw-p 00016000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so</span>
<span class="line">7fc4499e4000-7fc449be4000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc449be4000-7fc449be7000 ---p 00000000 00:00 0 </span>
<span class="line">7fc449be7000-7fc449ce5000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc449ce5000-7fc449cee000 r-xp 00000000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so</span>
<span class="line">7fc449cee000-7fc449eed000 ---p 00009000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so</span>
<span class="line">7fc449eed000-7fc449eee000 r--p 00008000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so</span>
<span class="line">7fc449eee000-7fc449eef000 rw-p 00009000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so</span>
<span class="line">7fc449eef000-7fc449ef0000 ---p 00000000 00:00 0 </span>
<span class="line">7fc449ef0000-7fc449ff0000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc449ff0000-7fc449ff3000 ---p 00000000 00:00 0 </span>
<span class="line">7fc449ff3000-7fc44a0f1000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a0f1000-7fc44a0f4000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a0f4000-7fc44a1f2000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a1f2000-7fc44a1f5000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a1f5000-7fc44a2f3000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a2f3000-7fc44a2f6000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a2f6000-7fc44a3f4000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a3f4000-7fc44a3f7000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a3f7000-7fc44a4f5000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a4f5000-7fc44a4f8000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a4f8000-7fc44a5f6000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a5f6000-7fc44a5f9000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a5f9000-7fc44a6f7000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44a6f7000-7fc44a6f8000 ---p 00000000 00:00 0 </span>
<span class="line">7fc44a6f8000-7fc44c000000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44c000000-7fc44c021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc44c021000-7fc450000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc450000000-7fc450021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc450021000-7fc454000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc454000000-7fc454021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc454021000-7fc458000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc458000000-7fc458021000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc458021000-7fc45c000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc45c0f9000-7fc45d000000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc45d000000-7fc45d4b0000 rwxp 00000000 00:00 0 </span>
<span class="line">7fc45d4b0000-7fc46c000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc46c000000-7fc46ccc6000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc46ccc6000-7fc470000000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4700a2000-7fc4700bd000 r--s 001d4000 08:02 1968031                    /usr/java/jdk1.8.0_211/jre/lib/ext/nashorn.jar</span>
<span class="line">7fc4700bd000-7fc4700c6000 r--s 04954000 08:02 2622992                    /u01/bscp/zuul-proxy/zuul-proxy-0.0.1-SNAPSHOT.jar</span>
<span class="line">7fc4700c6000-7fc470115000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc470115000-7fc4702ef000 r--s 03d6d000 08:02 1967834                    /usr/java/jdk1.8.0_211/jre/lib/rt.jar</span>
<span class="line">7fc4702ef000-7fc4704ca000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4704ca000-7fc4704cb000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4704cb000-7fc4705cb000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4705cb000-7fc4705cc000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4705cc000-7fc4706cc000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4706cc000-7fc4706cd000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4706cd000-7fc4707cd000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4707cd000-7fc4707ce000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4707ce000-7fc4708e4000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4708e4000-7fc470979000 ---p 00000000 00:00 0 </span>
<span class="line">7fc470979000-7fc47098f000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc47098f000-7fc470a23000 ---p 00000000 00:00 0 </span>
<span class="line">7fc470a23000-7fc470a47000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc470a47000-7fc470a79000 ---p 00000000 00:00 0 </span>
<span class="line">7fc470a79000-7fc470a8d000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc470a8d000-7fc470e3a000 ---p 00000000 00:00 0 </span>
<span class="line">7fc470e3a000-7fc470e55000 r-xp 00000000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so</span>
<span class="line">7fc470e55000-7fc471054000 ---p 0001b000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so</span>
<span class="line">7fc471054000-7fc471055000 r--p 0001a000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so</span>
<span class="line">7fc471055000-7fc471056000 rw-p 0001b000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so</span>
<span class="line">7fc471056000-7fc471062000 r-xp 00000000 08:02 2097182                    /lib64/libnss_files-2.12.so</span>
<span class="line">7fc471062000-7fc471262000 ---p 0000c000 08:02 2097182                    /lib64/libnss_files-2.12.so</span>
<span class="line">7fc471262000-7fc471263000 r--p 0000c000 08:02 2097182                    /lib64/libnss_files-2.12.so</span>
<span class="line">7fc471263000-7fc471264000 rw-p 0000d000 08:02 2097182                    /lib64/libnss_files-2.12.so</span>
<span class="line">7fc471265000-7fc47126d000 rw-s 00000000 08:02 786438                     /tmp/hsperfdata_gcc/100680</span>
<span class="line">7fc47126d000-7fc471299000 r-xp 00000000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so</span>
<span class="line">7fc471299000-7fc471499000 ---p 0002c000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so</span>
<span class="line">7fc471499000-7fc47149a000 r--p 0002c000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so</span>
<span class="line">7fc47149a000-7fc47149c000 rw-p 0002d000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so</span>
<span class="line">7fc47149c000-7fc4714a9000 r-xp 00000000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so</span>
<span class="line">7fc4714a9000-7fc4716a8000 ---p 0000d000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so</span>
<span class="line">7fc4716a8000-7fc4716aa000 r--p 0000c000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so</span>
<span class="line">7fc4716aa000-7fc4716ab000 rw-p 0000e000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so</span>
<span class="line">7fc4716ab000-7fc4716ae000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4716ae000-7fc4717ac000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4717ac000-7fc472494000 r-xp 00000000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so</span>
<span class="line">7fc472494000-7fc472693000 ---p 00ce8000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so</span>
<span class="line">7fc472693000-7fc472729000 r--p 00ce7000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so</span>
<span class="line">7fc472729000-7fc47275a000 rw-p 00d7d000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so</span>
<span class="line">7fc47275a000-7fc472798000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc472798000-7fc4727af000 r-xp 00000000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so</span>
<span class="line">7fc4727af000-7fc4729ae000 ---p 00017000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so</span>
<span class="line">7fc4729ae000-7fc4729af000 r--p 00016000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so</span>
<span class="line">7fc4729af000-7fc4729b0000 rw-p 00017000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so</span>
<span class="line">7fc4729b0000-7fc4729b1000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4729b7000-7fc4729b9000 rw-p 00000000 00:00 0 </span>
<span class="line">7fc4729b9000-7fc4729ba000 ---p 00000000 00:00 0 </span>
<span class="line">7fc4729ba000-7fc4729bb000 rw-p 00000000 00:00 0 </span>
<span class="line">7fffbff51000-7fffbff66000 rw-p 00000000 00:00 0                          [stack]</span>
<span class="line">7fffbffff000-7fffc0000000 r-xp 00000000 00:00 0                          [vdso]</span>
<span class="line">ffffffffff600000-ffffffffff601000 r-xp 00000000 00:00 0                  [vsyscall]</span>
<span class="line"></span>
<span class="line">VM Arguments:</span>
<span class="line">jvm_args: -Xms64M -Xmx512M -Dspring.config.location=config-zuul-proxy/application-test-cus.yml -Dlogging.config=config-zuul-proxy/log4j2.xml </span>
<span class="line">java_command: zuul-proxy-0.0.1-SNAPSHOT.jar --spring.profiles.active=test-cus</span>
<span class="line">java_class_path (initial): zuul-proxy-0.0.1-SNAPSHOT.jar</span>
<span class="line">Launcher Type: SUN_STANDARD</span>
<span class="line"></span>
<span class="line">Environment Variables:</span>
<span class="line">JAVA_HOME=/usr/java/jdk1.8.0_211</span>
<span class="line">JRE_HOME=/usr/java/java1.8.0_211/jre　</span>
<span class="line">CLASSPATH=.:/usr/java/jdk1.8.0_211/lib:/usr/java/java1.8.0_211/jre　/lib:</span>
<span class="line">PATH=/usr/java/jdk1.8.0_211/bin:/usr/java/java1.8.0_211/jre　/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/local/kafka/bin:/home/gcc/bin</span>
<span class="line">SHELL=/bin/bash</span>
<span class="line"></span>
<span class="line">Signal Handlers:</span>
<span class="line">SIGSEGV: [libjvm.so+0xad3d90], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGBUS: [libjvm.so+0xad3d90], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGFPE: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGPIPE: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGXFSZ: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGILL: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGUSR1: SIG_DFL, sa_mask[0]=00000000000000000000000000000000, sa_flags=none</span>
<span class="line">SIGUSR2: [libjvm.so+0x90b780], sa_mask[0]=00000000000000000000000000000000, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGHUP: SIG_IGN, sa_mask[0]=00000000000000000000000000000000, sa_flags=none</span>
<span class="line">SIGINT: SIG_IGN, sa_mask[0]=00000000000000000000000000000000, sa_flags=none</span>
<span class="line">SIGTERM: [libjvm.so+0x90bda0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line">SIGQUIT: [libjvm.so+0x90bda0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">---------------  S Y S T E M  ---------------</span>
<span class="line"></span>
<span class="line">OS:CentOS release 6.5 (Final)</span>
<span class="line"></span>
<span class="line">uname:Linux 2.6.32-431.el6.x86_64 #1 SMP Fri Nov 22 03:15:09 UTC 2013 x86_64</span>
<span class="line">libc:glibc 2.12 NPTL 2.12 </span>
<span class="line">rlimit: STACK 10240k, CORE 0k, NPROC 10240, NOFILE 20480, AS infinity</span>
<span class="line">load average:0.36 0.17 0.06</span>
<span class="line"></span>
<span class="line">/proc/meminfo:</span>
<span class="line">MemTotal:        7982384 kB</span>
<span class="line">MemFree:          103388 kB</span>
<span class="line">Buffers:             448 kB</span>
<span class="line">Cached:            19320 kB</span>
<span class="line">SwapCached:            0 kB</span>
<span class="line">Active:          5217208 kB</span>
<span class="line">Inactive:          16784 kB</span>
<span class="line">Active(anon):    5214016 kB</span>
<span class="line">Inactive(anon):    12928 kB</span>
<span class="line">Active(file):       3192 kB</span>
<span class="line">Inactive(file):     3856 kB</span>
<span class="line">Unevictable:           0 kB</span>
<span class="line">Mlocked:               0 kB</span>
<span class="line">SwapTotal:             0 kB</span>
<span class="line">SwapFree:              0 kB</span>
<span class="line">Dirty:                20 kB</span>
<span class="line">Writeback:             0 kB</span>
<span class="line">AnonPages:       5213920 kB</span>
<span class="line">Mapped:            16764 kB</span>
<span class="line">Shmem:             13104 kB</span>
<span class="line">Slab:             732524 kB</span>
<span class="line">SReclaimable:      41764 kB</span>
<span class="line">SUnreclaim:       690760 kB</span>
<span class="line">KernelStack:       78464 kB</span>
<span class="line">PageTables:      1534980 kB</span>
<span class="line">NFS_Unstable:          0 kB</span>
<span class="line">Bounce:                0 kB</span>
<span class="line">WritebackTmp:          0 kB</span>
<span class="line">CommitLimit:     3991192 kB</span>
<span class="line">Committed_AS:   19580916 kB</span>
<span class="line">VmallocTotal:   34359738367 kB</span>
<span class="line">VmallocUsed:       38204 kB</span>
<span class="line">VmallocChunk:   34359697356 kB</span>
<span class="line">HardwareCorrupted:     0 kB</span>
<span class="line">AnonHugePages:         0 kB</span>
<span class="line">HugePages_Total:       0</span>
<span class="line">HugePages_Free:        0</span>
<span class="line">HugePages_Rsvd:        0</span>
<span class="line">HugePages_Surp:        0</span>
<span class="line">Hugepagesize:       2048 kB</span>
<span class="line">DirectMap4k:        8040 kB</span>
<span class="line">DirectMap2M:     8380416 kB</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">CPU:total 4 (initial active 4) (1 cores per cpu, 1 threads per core) family 15 model 6 stepping 3, cmov, cx8, fxsr, mmx, sse, sse2, sse3, aes, tsc</span>
<span class="line"></span>
<span class="line">/proc/cpuinfo:</span>
<span class="line">processor	: 0</span>
<span class="line">vendor_id	: GenuineIntel</span>
<span class="line">cpu family	: 15</span>
<span class="line">model		: 6</span>
<span class="line">model name	: INTEL(R) XEON(R) GOLD 5520+</span>
<span class="line">stepping	: 3</span>
<span class="line">cpu MHz		: 2200.000</span>
<span class="line">cache size	: 16384 KB</span>
<span class="line">fpu		: yes</span>
<span class="line">fpu_exception	: yes</span>
<span class="line">cpuid level	: 13</span>
<span class="line">wp		: yes</span>
<span class="line">flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm</span>
<span class="line">bogomips	: 4400.00</span>
<span class="line">clflush size	: 64</span>
<span class="line">cache_alignment	: 128</span>
<span class="line">address sizes	: 46 bits physical, 48 bits virtual</span>
<span class="line">power management:</span>
<span class="line"></span>
<span class="line">processor	: 1</span>
<span class="line">vendor_id	: GenuineIntel</span>
<span class="line">cpu family	: 15</span>
<span class="line">model		: 6</span>
<span class="line">model name	: INTEL(R) XEON(R) GOLD 5520+</span>
<span class="line">stepping	: 3</span>
<span class="line">cpu MHz		: 2200.000</span>
<span class="line">cache size	: 16384 KB</span>
<span class="line">fpu		: yes</span>
<span class="line">fpu_exception	: yes</span>
<span class="line">cpuid level	: 13</span>
<span class="line">wp		: yes</span>
<span class="line">flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm</span>
<span class="line">bogomips	: 4400.00</span>
<span class="line">clflush size	: 64</span>
<span class="line">cache_alignment	: 128</span>
<span class="line">address sizes	: 46 bits physical, 48 bits virtual</span>
<span class="line">power management:</span>
<span class="line"></span>
<span class="line">processor	: 2</span>
<span class="line">vendor_id	: GenuineIntel</span>
<span class="line">cpu family	: 15</span>
<span class="line">model		: 6</span>
<span class="line">model name	: INTEL(R) XEON(R) GOLD 5520+</span>
<span class="line">stepping	: 3</span>
<span class="line">cpu MHz		: 2200.000</span>
<span class="line">cache size	: 16384 KB</span>
<span class="line">fpu		: yes</span>
<span class="line">fpu_exception	: yes</span>
<span class="line">cpuid level	: 13</span>
<span class="line">wp		: yes</span>
<span class="line">flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm</span>
<span class="line">bogomips	: 4400.00</span>
<span class="line">clflush size	: 64</span>
<span class="line">cache_alignment	: 128</span>
<span class="line">address sizes	: 46 bits physical, 48 bits virtual</span>
<span class="line">power management:</span>
<span class="line"></span>
<span class="line">processor	: 3</span>
<span class="line">vendor_id	: GenuineIntel</span>
<span class="line">cpu family	: 15</span>
<span class="line">model		: 6</span>
<span class="line">model name	: INTEL(R) XEON(R) GOLD 5520+</span>
<span class="line">stepping	: 3</span>
<span class="line">cpu MHz		: 2200.000</span>
<span class="line">cache size	: 16384 KB</span>
<span class="line">fpu		: yes</span>
<span class="line">fpu_exception	: yes</span>
<span class="line">cpuid level	: 13</span>
<span class="line">wp		: yes</span>
<span class="line">flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm</span>
<span class="line">bogomips	: 4400.00</span>
<span class="line">clflush size	: 64</span>
<span class="line">cache_alignment	: 128</span>
<span class="line">address sizes	: 46 bits physical, 48 bits virtual</span>
<span class="line">power management:</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">Memory: 4k page, physical 7982384k(103388k free), swap 0k(0k free)</span>
<span class="line"></span>
<span class="line">vm_info: Java HotSpot(TM) 64-Bit Server VM (25.211-b12) for linux-amd64 JRE (1.8.0_211-b12), built on Apr  1 2019 20:39:34 by &quot;java_re&quot; with gcc 7.3.0</span>
<span class="line"></span>
<span class="line">time: Tue May 20 09:18:05 2025</span>
<span class="line">timezone: CST</span>
<span class="line">elapsed time: 7 seconds (0d 0h 0m 7s)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const v=n(l,[["render",c],["__file","ErrorFile文件分析.html.vue"]]),r=JSON.parse('{"path":"/JVM/ErrorFile%E6%96%87%E4%BB%B6%E5%88%86%E6%9E%90.html","title":"ErrorFile分析","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1747904581000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":2,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"JVM/ErrorFile文件分析.md"}');export{v as comp,r as data};
