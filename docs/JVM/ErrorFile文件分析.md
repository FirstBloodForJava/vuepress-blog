# ErrorFile分析

现在分析工具：https://fastthread.io/



![image-20250521172318096](http://47.101.155.205/image-20250521172318096.png)

**启用了CompressedOops，Java堆被放在低地址空间，可能阻碍native memory（如mmap、Metaspace）增长，从而导致本地内存分配失败 → 崩溃。**





~~~md
#
# There is insufficient memory for the Java Runtime Environment to continue.
# Native memory allocation (mmap) failed to map 67108864 bytes for committing reserved memory.
# Possible reasons:
#   The system is out of physical RAM or swap space
#   The process is running with CompressedOops enabled, and the Java Heap may be blocking the growth of the native heap
# Possible solutions:
#   Reduce memory load on the system
#   Increase physical memory or swap space
#   Check if swap backing store is full
#   Decrease Java heap size (-Xmx/-Xms)
#   Decrease number of Java threads
#   Decrease Java thread stack sizes (-Xss)
#   Set larger code cache with -XX:ReservedCodeCacheSize=
#   JVM is running with Unscaled Compressed Oops mode in which the Java heap is
#     placed in the first 4GB address space. The Java Heap base address is the
#     maximum limit for the native heap growth. Please use -XX:HeapBaseMinAddress
#     to set the Java Heap base and to place the Java Heap above 4GB virtual address.
# This output file may be truncated or incomplete.
#
#  Out of Memory Error (os_linux.cpp:2749), pid=100680, tid=0x00007fc44a7f7700
#
# JRE version: Java(TM) SE Runtime Environment (8.0_211-b12) (build 1.8.0_211-b12)
# Java VM: Java HotSpot(TM) 64-Bit Server VM (25.211-b12 mixed mode linux-amd64 compressed oops)
# Failed to write core dump. Core dumps have been disabled. To enable core dumping, try "ulimit -c unlimited" before starting Java again
#

---------------  T H R E A D  ---------------

Current thread (0x00007fc46c13e000):  VMThread [stack: 0x00007fc44a6f7000,0x00007fc44a7f8000] [id=100692]

Stack: [0x00007fc44a6f7000,0x00007fc44a7f8000],  sp=0x00007fc44a7f63b0,  free space=1020k
Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
V  [libjvm.so+0xad3455]  VMError::report_and_die()+0x2e5
V  [libjvm.so+0x4e0537]  report_vm_out_of_memory(char const*, int, unsigned long, VMErrorType, char const*)+0x67
V  [libjvm.so+0x910320]  os::pd_commit_memory(char*, unsigned long, unsigned long, bool)+0x100
V  [libjvm.so+0x90794f]  os::commit_memory(char*, unsigned long, unsigned long, bool)+0x1f
V  [libjvm.so+0x98c736]  PSVirtualSpace::expand_by(unsigned long)+0x56
V  [libjvm.so+0x98d9c8]  PSYoungGen::resize(unsigned long, unsigned long)+0xd8
V  [libjvm.so+0x98a166]  PSScavenge::invoke_no_policy()+0x1376
V  [libjvm.so+0x98a4fc]  PSScavenge::invoke()+0x4c
V  [libjvm.so+0x93a248]  ParallelScavengeHeap::failed_mem_allocate(unsigned long)+0x68
V  [libjvm.so+0xad4fa3]  VM_ParallelGCFailedAllocation::doit()+0x93
V  [libjvm.so+0xada1c6]  VM_Operation::evaluate()+0x46
V  [libjvm.so+0xad84fd]  VMThread::evaluate_operation(VM_Operation*) [clone .constprop.44]+0xcd
V  [libjvm.so+0xad8ae3]  VMThread::loop()+0x3a3
V  [libjvm.so+0xad8eb8]  VMThread::run()+0x78
V  [libjvm.so+0x90d952]  java_start(Thread*)+0x102

VM_Operation (0x00007fc4717a5640): ParallelGCFailedAllocation, mode: safepoint, requested by thread 0x00007fc46c009800


---------------  P R O C E S S  ---------------

Java Threads: ( => current thread )
  0x00007fc46c256000 JavaThread "Log4j2-TF-3-Scheduled-1" daemon [_thread_blocked, id=100702, stack(0x00007fc449be4000,0x00007fc449ce5000)]
  0x00007fc46c1a8800 JavaThread "Service Thread" daemon [_thread_blocked, id=100699, stack(0x00007fc449ff0000,0x00007fc44a0f1000)]
  0x00007fc46c183800 JavaThread "C1 CompilerThread2" daemon [_thread_blocked, id=100698, stack(0x00007fc44a0f1000,0x00007fc44a1f2000)]
  0x00007fc46c181800 JavaThread "C2 CompilerThread1" daemon [_thread_blocked, id=100697, stack(0x00007fc44a1f2000,0x00007fc44a2f3000)]
  0x00007fc46c17f000 JavaThread "C2 CompilerThread0" daemon [_thread_blocked, id=100696, stack(0x00007fc44a2f3000,0x00007fc44a3f4000)]
  0x00007fc46c17d800 JavaThread "Signal Dispatcher" daemon [_thread_blocked, id=100695, stack(0x00007fc44a3f4000,0x00007fc44a4f5000)]
  0x00007fc46c14a800 JavaThread "Finalizer" daemon [_thread_blocked, id=100694, stack(0x00007fc44a4f5000,0x00007fc44a5f6000)]
  0x00007fc46c148000 JavaThread "Reference Handler" daemon [_thread_blocked, id=100693, stack(0x00007fc44a5f6000,0x00007fc44a6f7000)]
  0x00007fc46c009800 JavaThread "main" [_thread_blocked, id=100682, stack(0x00007fc4716ab000,0x00007fc4717ac000)]

Other Threads:
=>0x00007fc46c13e000 VMThread [stack: 0x00007fc44a6f7000,0x00007fc44a7f8000] [id=100692]
  0x00007fc46c1ab800 WatcherThread [stack: 0x00007fc449eef000,0x00007fc449ff0000] [id=100700]

VM state:at safepoint (normal execution)

VM Mutex/Monitor currently owned by a thread:  ([mutex/lock_event])
[0x00007fc46c006c30] Threads_lock - owner thread: 0x00007fc46c13e000
[0x00007fc46c007130] Heap_lock - owner thread: 0x00007fc46c009800

heap address: 0x00000000e0000000, size: 512 MB, Compressed Oops mode: 32-bit
Narrow klass base: 0x0000000000000000, Narrow klass shift: 3
Compressed class space size: 1073741824 Address: 0x0000000100000000

Heap:
 PSYoungGen      total 68608K, used 2073K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)
  eden space 65536K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f9580000)
  from space 3072K, 67% used [0x00000000f9580000,0x00000000f9786760,0x00000000f9880000)
  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)
 ParOldGen       total 44032K, used 2492K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 5% used [0x00000000e0000000,0x00000000e026f300,0x00000000e2b00000)
 Metaspace       used 14303K, capacity 14664K, committed 14976K, reserved 1062912K
  class space    used 1717K, capacity 1819K, committed 1920K, reserved 1048576K

Card table byte_map: [0x00007fc470979000,0x00007fc470a7a000] byte_map_base: 0x00007fc470279000

Marking Bits: (ParMarkBitMap*) 0x00007fc472777d80
 Begin Bits: [0x00007fc44b000000, 0x00007fc44b800000)
 End Bits:   [0x00007fc44b800000, 0x00007fc44c000000)

Polling page: 0x00007fc4729b9000

CodeCache: size=245760Kb used=4757Kb max_used=4771Kb free=241002Kb
 bounds [0x00007fc45d000000, 0x00007fc45d4b0000, 0x00007fc46c000000]
 total_blobs=1790 nmethods=1396 adapters=309
 compilation: enabled

Compilation events (10 events):
Event: 6.257 Thread 0x00007fc46c183800 1392   !   3       java.lang.Package::getSystemPackage (63 bytes)
Event: 6.259 Thread 0x00007fc46c183800 nmethod 1392 0x00007fc45d4a5e50 code [0x00007fc45d4a6040, 0x00007fc45d4a69e8]
Event: 6.805 Thread 0x00007fc46c183800 1394       3       org.apache.logging.log4j.core.pattern.PatternFormatter::requiresLocation (31 bytes)
Event: 6.806 Thread 0x00007fc46c183800 nmethod 1394 0x00007fc45d496950 code [0x00007fc45d496ae0, 0x00007fc45d496fa8]
Event: 6.807 Thread 0x00007fc46c183800 1393       3       java.lang.Class::newReflectionData (74 bytes)
Event: 6.808 Thread 0x00007fc46c183800 nmethod 1393 0x00007fc45d4a4ed0 code [0x00007fc45d4a50c0, 0x00007fc45d4a5a70]
Event: 6.839 Thread 0x00007fc46c17f000 1395       4       org.springframework.boot.loader.jar.Handler::parseURL (54 bytes)
Event: 6.936 Thread 0x00007fc46c17f000 nmethod 1395 0x00007fc45d4ab310 code [0x00007fc45d4ab520, 0x00007fc45d4ac130]
Event: 7.017 Thread 0x00007fc46c181800 1396       4       sun.misc.URLClassPath::getResource (83 bytes)
Event: 7.032 Thread 0x00007fc46c181800 nmethod 1396 0x00007fc45d4acd10 code [0x00007fc45d4acf20, 0x00007fc45d4ad940]

GC Heap History (10 events):
Event: 3.152 GC heap after
Heap after GC invocations=2 (full 0):
 PSYoungGen      total 18944K, used 2229K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 16384K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f6580000)
  from space 2560K, 87% used [0x00000000f6800000,0x00000000f6a2d7b0,0x00000000f6a80000)
  to   space 2560K, 0% used [0x00000000f6580000,0x00000000f6580000,0x00000000f6800000)
 ParOldGen       total 44032K, used 16K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0004000,0x00000000e2b00000)
 Metaspace       used 5856K, capacity 6110K, committed 6400K, reserved 1056768K
  class space    used 620K, capacity 691K, committed 768K, reserved 1048576K
}
Event: 3.563 GC heap before
{Heap before GC invocations=3 (full 0):
 PSYoungGen      total 18944K, used 18613K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 16384K, 100% used [0x00000000f5580000,0x00000000f6580000,0x00000000f6580000)
  from space 2560K, 87% used [0x00000000f6800000,0x00000000f6a2d7b0,0x00000000f6a80000)
  to   space 2560K, 0% used [0x00000000f6580000,0x00000000f6580000,0x00000000f6800000)
 ParOldGen       total 44032K, used 16K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0004000,0x00000000e2b00000)
 Metaspace       used 6680K, capacity 6954K, committed 7040K, reserved 1056768K
  class space    used 728K, capacity 821K, committed 896K, reserved 1048576K
Event: 3.577 GC heap after
Heap after GC invocations=3 (full 0):
 PSYoungGen      total 18944K, used 2383K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 16384K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f6580000)
  from space 2560K, 93% used [0x00000000f6580000,0x00000000f67d3f00,0x00000000f6800000)
  to   space 2560K, 0% used [0x00000000f7800000,0x00000000f7800000,0x00000000f7a80000)
 ParOldGen       total 44032K, used 24K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0006000,0x00000000e2b00000)
 Metaspace       used 6680K, capacity 6954K, committed 7040K, reserved 1056768K
  class space    used 728K, capacity 821K, committed 896K, reserved 1048576K
}
Event: 3.813 GC heap before
{Heap before GC invocations=4 (full 0):
 PSYoungGen      total 18944K, used 18767K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 16384K, 100% used [0x00000000f5580000,0x00000000f6580000,0x00000000f6580000)
  from space 2560K, 93% used [0x00000000f6580000,0x00000000f67d3f00,0x00000000f6800000)
  to   space 2560K, 0% used [0x00000000f7800000,0x00000000f7800000,0x00000000f7a80000)
 ParOldGen       total 44032K, used 24K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e0006000,0x00000000e2b00000)
 Metaspace       used 7403K, capacity 7706K, committed 7936K, reserved 1056768K
  class space    used 837K, capacity 923K, committed 1024K, reserved 1048576K
Event: 3.824 GC heap after
Heap after GC invocations=4 (full 0):
 PSYoungGen      total 35328K, used 2546K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 32768K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f7580000)
  from space 2560K, 99% used [0x00000000f7800000,0x00000000f7a7cac0,0x00000000f7a80000)
  to   space 2560K, 0% used [0x00000000f7580000,0x00000000f7580000,0x00000000f7800000)
 ParOldGen       total 44032K, used 104K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e001a000,0x00000000e2b00000)
 Metaspace       used 7403K, capacity 7706K, committed 7936K, reserved 1056768K
  class space    used 837K, capacity 923K, committed 1024K, reserved 1048576K
}
Event: 4.161 GC heap before
{Heap before GC invocations=5 (full 0):
 PSYoungGen      total 35328K, used 35314K [0x00000000f5580000, 0x00000000f7a80000, 0x0000000100000000)
  eden space 32768K, 100% used [0x00000000f5580000,0x00000000f7580000,0x00000000f7580000)
  from space 2560K, 99% used [0x00000000f7800000,0x00000000f7a7cac0,0x00000000f7a80000)
  to   space 2560K, 0% used [0x00000000f7580000,0x00000000f7580000,0x00000000f7800000)
 ParOldGen       total 44032K, used 104K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 0% used [0x00000000e0000000,0x00000000e001a000,0x00000000e2b00000)
 Metaspace       used 9091K, capacity 9412K, committed 9728K, reserved 1058816K
  class space    used 1070K, capacity 1188K, committed 1280K, reserved 1048576K
Event: 4.170 GC heap after
Heap after GC invocations=5 (full 0):
 PSYoungGen      total 35328K, used 2530K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)
  eden space 32768K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f7580000)
  from space 2560K, 98% used [0x00000000f7580000,0x00000000f77f8ad0,0x00000000f7800000)
  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)
 ParOldGen       total 44032K, used 472K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0076000,0x00000000e2b00000)
 Metaspace       used 9091K, capacity 9412K, committed 9728K, reserved 1058816K
  class space    used 1070K, capacity 1188K, committed 1280K, reserved 1048576K
}
Event: 4.245 GC heap before
{Heap before GC invocations=6 (full 0):
 PSYoungGen      total 35328K, used 35298K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)
  eden space 32768K, 100% used [0x00000000f5580000,0x00000000f7580000,0x00000000f7580000)
  from space 2560K, 98% used [0x00000000f7580000,0x00000000f77f8ad0,0x00000000f7800000)
  to   space 3072K, 0% used [0x00000000f9880000,0x00000000f9880000,0x00000000f9b80000)
 ParOldGen       total 44032K, used 472K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0076000,0x00000000e2b00000)
 Metaspace       used 9110K, capacity 9430K, committed 9728K, reserved 1058816K
  class space    used 1073K, capacity 1191K, committed 1280K, reserved 1048576K
Event: 4.261 GC heap after
Heap after GC invocations=6 (full 0):
 PSYoungGen      total 68608K, used 2543K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)
  eden space 65536K, 0% used [0x00000000f5580000,0x00000000f5580000,0x00000000f9580000)
  from space 3072K, 82% used [0x00000000f9880000,0x00000000f9afbf00,0x00000000f9b80000)
  to   space 3072K, 0% used [0x00000000f9580000,0x00000000f9580000,0x00000000f9880000)
 ParOldGen       total 44032K, used 480K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0078000,0x00000000e2b00000)
 Metaspace       used 9110K, capacity 9430K, committed 9728K, reserved 1058816K
  class space    used 1073K, capacity 1191K, committed 1280K, reserved 1048576K
}
Event: 7.167 GC heap before
{Heap before GC invocations=7 (full 0):
 PSYoungGen      total 68608K, used 68079K [0x00000000f5580000, 0x00000000f9b80000, 0x0000000100000000)
  eden space 65536K, 100% used [0x00000000f5580000,0x00000000f9580000,0x00000000f9580000)
  from space 3072K, 82% used [0x00000000f9880000,0x00000000f9afbf00,0x00000000f9b80000)
  to   space 3072K, 0% used [0x00000000f9580000,0x00000000f9580000,0x00000000f9880000)
 ParOldGen       total 44032K, used 480K [0x00000000e0000000, 0x00000000e2b00000, 0x00000000f5580000)
  object space 44032K, 1% used [0x00000000e0000000,0x00000000e0078000,0x00000000e2b00000)
 Metaspace       used 14303K, capacity 14664K, committed 14976K, reserved 1062912K
  class space    used 1717K, capacity 1819K, committed 1920K, reserved 1048576K

Deoptimization events (10 events):
Event: 5.001 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.001 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.009 Thread 0x00007fc46c009800 Uncommon trap: reason=class_check action=maybe_recompile pc=0x00007fc45d3b4ed4 method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.016 Thread 0x00007fc46c009800 Uncommon trap: reason=range_check action=make_not_entrant pc=0x00007fc45d38c640 method=sun.reflect.generics.parser.SignatureParser.current()C @ 34
Event: 5.372 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.581 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.600 Thread 0x00007fc46c009800 Uncommon trap: reason=bimorphic action=maybe_recompile pc=0x00007fc45d3f83fc method=java.util.HashMap.putVal(ILjava/lang/Object;Ljava/lang/Object;ZZ)Ljava/lang/Object; @ 203
Event: 5.801 Thread 0x00007fc46c009800 Uncommon trap: reason=null_check action=make_not_entrant pc=0x00007fc45d4297b4 method=java.net.URL.getURLStreamHandler(Ljava/lang/String;)Ljava/net/URLStreamHandler; @ 7
Event: 5.801 Thread 0x00007fc46c009800 Uncommon trap: reason=unstable_if action=reinterpret pc=0x00007fc45d2ef33c method=org.springframework.boot.loader.jar.Handler.parseURL(Ljava/net/URL;Ljava/lang/String;II)V @ 14
Event: 6.010 Thread 0x00007fc46c009800 Uncommon trap: reason=unstable_if action=reinterpret pc=0x00007fc45d246d0c method=java.lang.String.replace(CC)Ljava/lang/String; @ 26

Classes redefined (0 events):
No events

Internal exceptions (10 events):
Event: 5.026 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6929568) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.027 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f692ae28) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.027 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f692ccf8) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.027 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f692e5f0) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.038 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6930208) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.039 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6931a50) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.039 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6933278) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.039 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6934c60) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.039 Thread 0x00007fc46c009800 Exception <a 'java/lang/ArrayIndexOutOfBoundsException'> (0x00000000f6936480) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/runtime/sharedRuntime.cpp, line 605]
Event: 5.801 Thread 0x00007fc46c009800 Exception <a 'java/lang/ClassNotFoundException': org/springframework/boot/loader/jar/Handler> (0x00000000f7d87090) thrown at [/HUDSON/workspace/8-2-build-linux-amd64/jdk8u211/12973/hotspot/src/share/vm/classfile/systemDictionary.cpp, line 210]

Events (10 events):
Event: 7.028 loading class org/apache/logging/slf4j/Log4jMDCAdapter done
Event: 7.030 loading class org/apache/logging/log4j/util/StackLocatorUtil
Event: 7.030 loading class org/apache/logging/log4j/util/StackLocatorUtil done
Event: 7.030 loading class org/apache/logging/log4j/util/StackLocator
Event: 7.030 loading class org/apache/logging/log4j/util/StackLocator done
Event: 7.039 loading class org/apache/logging/slf4j/Log4jLogger
Event: 7.039 loading class org/apache/logging/slf4j/Log4jLogger done
Event: 7.041 loading class org/slf4j/spi/LocationAwareLogger
Event: 7.041 loading class org/slf4j/spi/LocationAwareLogger done
Event: 7.103 Executing VM operation: ParallelGCFailedAllocation


Dynamic libraries:
00400000-00401000 r-xp 00000000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java
00600000-00601000 r--p 00000000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java
00601000-00602000 rw-p 00001000 08:02 1967775                            /usr/java/jdk1.8.0_211/bin/java
00ed7000-00ef8000 rw-p 00000000 00:00 0                                  [heap]
e0000000-e2b00000 rw-p 00000000 00:00 0 
e2b00000-f5580000 ---p 00000000 00:00 0 
f5580000-f9b80000 rw-p 00000000 00:00 0 
fdb80000-100000000 ---p 00000000 00:00 0 
100000000-1001e0000 rw-p 00000000 00:00 0 
1001e0000-140000000 ---p 00000000 00:00 0 
3ac8400000-3ac8420000 r-xp 00000000 08:02 2097592                        /lib64/ld-2.12.so
3ac861f000-3ac8620000 r--p 0001f000 08:02 2097592                        /lib64/ld-2.12.so
3ac8620000-3ac8621000 rw-p 00020000 08:02 2097592                        /lib64/ld-2.12.so
3ac8621000-3ac8622000 rw-p 00000000 00:00 0 
3ac8800000-3ac8802000 r-xp 00000000 08:02 2097595                        /lib64/libdl-2.12.so
3ac8802000-3ac8a02000 ---p 00002000 08:02 2097595                        /lib64/libdl-2.12.so
3ac8a02000-3ac8a03000 r--p 00002000 08:02 2097595                        /lib64/libdl-2.12.so
3ac8a03000-3ac8a04000 rw-p 00003000 08:02 2097595                        /lib64/libdl-2.12.so
3ac8c00000-3ac8d8b000 r-xp 00000000 08:02 2097593                        /lib64/libc-2.12.so
3ac8d8b000-3ac8f8a000 ---p 0018b000 08:02 2097593                        /lib64/libc-2.12.so
3ac8f8a000-3ac8f8e000 r--p 0018a000 08:02 2097593                        /lib64/libc-2.12.so
3ac8f8e000-3ac8f8f000 rw-p 0018e000 08:02 2097593                        /lib64/libc-2.12.so
3ac8f8f000-3ac8f94000 rw-p 00000000 00:00 0 
3ac9000000-3ac9017000 r-xp 00000000 08:02 2097382                        /lib64/libpthread-2.12.so
3ac9017000-3ac9217000 ---p 00017000 08:02 2097382                        /lib64/libpthread-2.12.so
3ac9217000-3ac9218000 r--p 00017000 08:02 2097382                        /lib64/libpthread-2.12.so
3ac9218000-3ac9219000 rw-p 00018000 08:02 2097382                        /lib64/libpthread-2.12.so
3ac9219000-3ac921d000 rw-p 00000000 00:00 0 
3ac9400000-3ac9483000 r-xp 00000000 08:02 2097601                        /lib64/libm-2.12.so
3ac9483000-3ac9682000 ---p 00083000 08:02 2097601                        /lib64/libm-2.12.so
3ac9682000-3ac9683000 r--p 00082000 08:02 2097601                        /lib64/libm-2.12.so
3ac9683000-3ac9684000 rw-p 00083000 08:02 2097601                        /lib64/libm-2.12.so
3ac9800000-3ac9807000 r-xp 00000000 08:02 2097363                        /lib64/librt-2.12.so
3ac9807000-3ac9a06000 ---p 00007000 08:02 2097363                        /lib64/librt-2.12.so
3ac9a06000-3ac9a07000 r--p 00006000 08:02 2097363                        /lib64/librt-2.12.so
3ac9a07000-3ac9a08000 rw-p 00007000 08:02 2097363                        /lib64/librt-2.12.so
7fc418000000-7fc418021000 rw-p 00000000 00:00 0 
7fc418021000-7fc41c000000 ---p 00000000 00:00 0 
7fc41c000000-7fc41c031000 rw-p 00000000 00:00 0 
7fc41c031000-7fc420000000 ---p 00000000 00:00 0 
7fc420000000-7fc42037b000 rw-p 00000000 00:00 0 
7fc42037b000-7fc424000000 ---p 00000000 00:00 0 
7fc424000000-7fc424021000 rw-p 00000000 00:00 0 
7fc424021000-7fc428000000 ---p 00000000 00:00 0 
7fc428000000-7fc4283fb000 rw-p 00000000 00:00 0 
7fc4283fb000-7fc42c000000 ---p 00000000 00:00 0 
7fc42c000000-7fc42c4a3000 rw-p 00000000 00:00 0 
7fc42c4a3000-7fc430000000 ---p 00000000 00:00 0 
7fc430000000-7fc430021000 rw-p 00000000 00:00 0 
7fc430021000-7fc434000000 ---p 00000000 00:00 0 
7fc43616f000-7fc43c000000 r--p 00000000 08:02 1180378                    /usr/lib/locale/locale-archive
7fc43c000000-7fc43c021000 rw-p 00000000 00:00 0 
7fc43c021000-7fc440000000 ---p 00000000 00:00 0 
7fc440000000-7fc440021000 rw-p 00000000 00:00 0 
7fc440021000-7fc444000000 ---p 00000000 00:00 0 
7fc444000000-7fc44429b000 rw-p 00000000 00:00 0 
7fc44429b000-7fc448000000 ---p 00000000 00:00 0 
7fc4491bb000-7fc44927b000 rw-p 00000000 00:00 0 
7fc44927b000-7fc4493bb000 ---p 00000000 00:00 0 
7fc4493bb000-7fc4493cc000 r-xp 00000000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so
7fc4493cc000-7fc4495cb000 ---p 00011000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so
7fc4495cb000-7fc4495cc000 r--p 00010000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so
7fc4495cc000-7fc4495cd000 rw-p 00011000 08:02 1968145                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnio.so
7fc4495cd000-7fc4497cd000 rw-p 00000000 00:00 0 
7fc4497cd000-7fc4497e3000 r-xp 00000000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so
7fc4497e3000-7fc4499e2000 ---p 00016000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so
7fc4499e2000-7fc4499e3000 r--p 00015000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so
7fc4499e3000-7fc4499e4000 rw-p 00016000 08:02 1968085                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libnet.so
7fc4499e4000-7fc449be4000 rw-p 00000000 00:00 0 
7fc449be4000-7fc449be7000 ---p 00000000 00:00 0 
7fc449be7000-7fc449ce5000 rw-p 00000000 00:00 0 
7fc449ce5000-7fc449cee000 r-xp 00000000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so
7fc449cee000-7fc449eed000 ---p 00009000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so
7fc449eed000-7fc449eee000 r--p 00008000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so
7fc449eee000-7fc449eef000 rw-p 00009000 08:02 1968086                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libmanagement.so
7fc449eef000-7fc449ef0000 ---p 00000000 00:00 0 
7fc449ef0000-7fc449ff0000 rw-p 00000000 00:00 0 
7fc449ff0000-7fc449ff3000 ---p 00000000 00:00 0 
7fc449ff3000-7fc44a0f1000 rw-p 00000000 00:00 0 
7fc44a0f1000-7fc44a0f4000 ---p 00000000 00:00 0 
7fc44a0f4000-7fc44a1f2000 rw-p 00000000 00:00 0 
7fc44a1f2000-7fc44a1f5000 ---p 00000000 00:00 0 
7fc44a1f5000-7fc44a2f3000 rw-p 00000000 00:00 0 
7fc44a2f3000-7fc44a2f6000 ---p 00000000 00:00 0 
7fc44a2f6000-7fc44a3f4000 rw-p 00000000 00:00 0 
7fc44a3f4000-7fc44a3f7000 ---p 00000000 00:00 0 
7fc44a3f7000-7fc44a4f5000 rw-p 00000000 00:00 0 
7fc44a4f5000-7fc44a4f8000 ---p 00000000 00:00 0 
7fc44a4f8000-7fc44a5f6000 rw-p 00000000 00:00 0 
7fc44a5f6000-7fc44a5f9000 ---p 00000000 00:00 0 
7fc44a5f9000-7fc44a6f7000 rw-p 00000000 00:00 0 
7fc44a6f7000-7fc44a6f8000 ---p 00000000 00:00 0 
7fc44a6f8000-7fc44c000000 rw-p 00000000 00:00 0 
7fc44c000000-7fc44c021000 rw-p 00000000 00:00 0 
7fc44c021000-7fc450000000 ---p 00000000 00:00 0 
7fc450000000-7fc450021000 rw-p 00000000 00:00 0 
7fc450021000-7fc454000000 ---p 00000000 00:00 0 
7fc454000000-7fc454021000 rw-p 00000000 00:00 0 
7fc454021000-7fc458000000 ---p 00000000 00:00 0 
7fc458000000-7fc458021000 rw-p 00000000 00:00 0 
7fc458021000-7fc45c000000 ---p 00000000 00:00 0 
7fc45c0f9000-7fc45d000000 rw-p 00000000 00:00 0 
7fc45d000000-7fc45d4b0000 rwxp 00000000 00:00 0 
7fc45d4b0000-7fc46c000000 ---p 00000000 00:00 0 
7fc46c000000-7fc46ccc6000 rw-p 00000000 00:00 0 
7fc46ccc6000-7fc470000000 ---p 00000000 00:00 0 
7fc4700a2000-7fc4700bd000 r--s 001d4000 08:02 1968031                    /usr/java/jdk1.8.0_211/jre/lib/ext/nashorn.jar
7fc4700bd000-7fc4700c6000 r--s 04954000 08:02 2622992                    /u01/bscp/zuul-proxy/zuul-proxy-0.0.1-SNAPSHOT.jar
7fc4700c6000-7fc470115000 rw-p 00000000 00:00 0 
7fc470115000-7fc4702ef000 r--s 03d6d000 08:02 1967834                    /usr/java/jdk1.8.0_211/jre/lib/rt.jar
7fc4702ef000-7fc4704ca000 rw-p 00000000 00:00 0 
7fc4704ca000-7fc4704cb000 ---p 00000000 00:00 0 
7fc4704cb000-7fc4705cb000 rw-p 00000000 00:00 0 
7fc4705cb000-7fc4705cc000 ---p 00000000 00:00 0 
7fc4705cc000-7fc4706cc000 rw-p 00000000 00:00 0 
7fc4706cc000-7fc4706cd000 ---p 00000000 00:00 0 
7fc4706cd000-7fc4707cd000 rw-p 00000000 00:00 0 
7fc4707cd000-7fc4707ce000 ---p 00000000 00:00 0 
7fc4707ce000-7fc4708e4000 rw-p 00000000 00:00 0 
7fc4708e4000-7fc470979000 ---p 00000000 00:00 0 
7fc470979000-7fc47098f000 rw-p 00000000 00:00 0 
7fc47098f000-7fc470a23000 ---p 00000000 00:00 0 
7fc470a23000-7fc470a47000 rw-p 00000000 00:00 0 
7fc470a47000-7fc470a79000 ---p 00000000 00:00 0 
7fc470a79000-7fc470a8d000 rw-p 00000000 00:00 0 
7fc470a8d000-7fc470e3a000 ---p 00000000 00:00 0 
7fc470e3a000-7fc470e55000 r-xp 00000000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so
7fc470e55000-7fc471054000 ---p 0001b000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so
7fc471054000-7fc471055000 r--p 0001a000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so
7fc471055000-7fc471056000 rw-p 0001b000 08:02 1968108                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libzip.so
7fc471056000-7fc471062000 r-xp 00000000 08:02 2097182                    /lib64/libnss_files-2.12.so
7fc471062000-7fc471262000 ---p 0000c000 08:02 2097182                    /lib64/libnss_files-2.12.so
7fc471262000-7fc471263000 r--p 0000c000 08:02 2097182                    /lib64/libnss_files-2.12.so
7fc471263000-7fc471264000 rw-p 0000d000 08:02 2097182                    /lib64/libnss_files-2.12.so
7fc471265000-7fc47126d000 rw-s 00000000 08:02 786438                     /tmp/hsperfdata_gcc/100680
7fc47126d000-7fc471299000 r-xp 00000000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so
7fc471299000-7fc471499000 ---p 0002c000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so
7fc471499000-7fc47149a000 r--p 0002c000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so
7fc47149a000-7fc47149c000 rw-p 0002d000 08:02 1968099                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libjava.so
7fc47149c000-7fc4714a9000 r-xp 00000000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so
7fc4714a9000-7fc4716a8000 ---p 0000d000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so
7fc4716a8000-7fc4716aa000 r--p 0000c000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so
7fc4716aa000-7fc4716ab000 rw-p 0000e000 08:02 1968090                    /usr/java/jdk1.8.0_211/jre/lib/amd64/libverify.so
7fc4716ab000-7fc4716ae000 ---p 00000000 00:00 0 
7fc4716ae000-7fc4717ac000 rw-p 00000000 00:00 0 
7fc4717ac000-7fc472494000 r-xp 00000000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so
7fc472494000-7fc472693000 ---p 00ce8000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so
7fc472693000-7fc472729000 r--p 00ce7000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so
7fc472729000-7fc47275a000 rw-p 00d7d000 08:02 1968106                    /usr/java/jdk1.8.0_211/jre/lib/amd64/server/libjvm.so
7fc47275a000-7fc472798000 rw-p 00000000 00:00 0 
7fc472798000-7fc4727af000 r-xp 00000000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so
7fc4727af000-7fc4729ae000 ---p 00017000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so
7fc4729ae000-7fc4729af000 r--p 00016000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so
7fc4729af000-7fc4729b0000 rw-p 00017000 08:02 1967085                    /usr/java/jdk1.8.0_211/lib/amd64/jli/libjli.so
7fc4729b0000-7fc4729b1000 rw-p 00000000 00:00 0 
7fc4729b7000-7fc4729b9000 rw-p 00000000 00:00 0 
7fc4729b9000-7fc4729ba000 ---p 00000000 00:00 0 
7fc4729ba000-7fc4729bb000 rw-p 00000000 00:00 0 
7fffbff51000-7fffbff66000 rw-p 00000000 00:00 0                          [stack]
7fffbffff000-7fffc0000000 r-xp 00000000 00:00 0                          [vdso]
ffffffffff600000-ffffffffff601000 r-xp 00000000 00:00 0                  [vsyscall]

VM Arguments:
jvm_args: -Xms64M -Xmx512M -Dspring.config.location=config-zuul-proxy/application-test-cus.yml -Dlogging.config=config-zuul-proxy/log4j2.xml 
java_command: zuul-proxy-0.0.1-SNAPSHOT.jar --spring.profiles.active=test-cus
java_class_path (initial): zuul-proxy-0.0.1-SNAPSHOT.jar
Launcher Type: SUN_STANDARD

Environment Variables:
JAVA_HOME=/usr/java/jdk1.8.0_211
JRE_HOME=/usr/java/java1.8.0_211/jre　
CLASSPATH=.:/usr/java/jdk1.8.0_211/lib:/usr/java/java1.8.0_211/jre　/lib:
PATH=/usr/java/jdk1.8.0_211/bin:/usr/java/java1.8.0_211/jre　/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/local/kafka/bin:/home/gcc/bin
SHELL=/bin/bash

Signal Handlers:
SIGSEGV: [libjvm.so+0xad3d90], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGBUS: [libjvm.so+0xad3d90], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGFPE: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGPIPE: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGXFSZ: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGILL: [libjvm.so+0x90b8b0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGUSR1: SIG_DFL, sa_mask[0]=00000000000000000000000000000000, sa_flags=none
SIGUSR2: [libjvm.so+0x90b780], sa_mask[0]=00000000000000000000000000000000, sa_flags=SA_RESTART|SA_SIGINFO
SIGHUP: SIG_IGN, sa_mask[0]=00000000000000000000000000000000, sa_flags=none
SIGINT: SIG_IGN, sa_mask[0]=00000000000000000000000000000000, sa_flags=none
SIGTERM: [libjvm.so+0x90bda0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
SIGQUIT: [libjvm.so+0x90bda0], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO


---------------  S Y S T E M  ---------------

OS:CentOS release 6.5 (Final)

uname:Linux 2.6.32-431.el6.x86_64 #1 SMP Fri Nov 22 03:15:09 UTC 2013 x86_64
libc:glibc 2.12 NPTL 2.12 
rlimit: STACK 10240k, CORE 0k, NPROC 10240, NOFILE 20480, AS infinity
load average:0.36 0.17 0.06

/proc/meminfo:
MemTotal:        7982384 kB
MemFree:          103388 kB
Buffers:             448 kB
Cached:            19320 kB
SwapCached:            0 kB
Active:          5217208 kB
Inactive:          16784 kB
Active(anon):    5214016 kB
Inactive(anon):    12928 kB
Active(file):       3192 kB
Inactive(file):     3856 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB
SwapFree:              0 kB
Dirty:                20 kB
Writeback:             0 kB
AnonPages:       5213920 kB
Mapped:            16764 kB
Shmem:             13104 kB
Slab:             732524 kB
SReclaimable:      41764 kB
SUnreclaim:       690760 kB
KernelStack:       78464 kB
PageTables:      1534980 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     3991192 kB
Committed_AS:   19580916 kB
VmallocTotal:   34359738367 kB
VmallocUsed:       38204 kB
VmallocChunk:   34359697356 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:        8040 kB
DirectMap2M:     8380416 kB


CPU:total 4 (initial active 4) (1 cores per cpu, 1 threads per core) family 15 model 6 stepping 3, cmov, cx8, fxsr, mmx, sse, sse2, sse3, aes, tsc

/proc/cpuinfo:
processor	: 0
vendor_id	: GenuineIntel
cpu family	: 15
model		: 6
model name	: INTEL(R) XEON(R) GOLD 5520+
stepping	: 3
cpu MHz		: 2200.000
cache size	: 16384 KB
fpu		: yes
fpu_exception	: yes
cpuid level	: 13
wp		: yes
flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm
bogomips	: 4400.00
clflush size	: 64
cache_alignment	: 128
address sizes	: 46 bits physical, 48 bits virtual
power management:

processor	: 1
vendor_id	: GenuineIntel
cpu family	: 15
model		: 6
model name	: INTEL(R) XEON(R) GOLD 5520+
stepping	: 3
cpu MHz		: 2200.000
cache size	: 16384 KB
fpu		: yes
fpu_exception	: yes
cpuid level	: 13
wp		: yes
flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm
bogomips	: 4400.00
clflush size	: 64
cache_alignment	: 128
address sizes	: 46 bits physical, 48 bits virtual
power management:

processor	: 2
vendor_id	: GenuineIntel
cpu family	: 15
model		: 6
model name	: INTEL(R) XEON(R) GOLD 5520+
stepping	: 3
cpu MHz		: 2200.000
cache size	: 16384 KB
fpu		: yes
fpu_exception	: yes
cpuid level	: 13
wp		: yes
flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm
bogomips	: 4400.00
clflush size	: 64
cache_alignment	: 128
address sizes	: 46 bits physical, 48 bits virtual
power management:

processor	: 3
vendor_id	: GenuineIntel
cpu family	: 15
model		: 6
model name	: INTEL(R) XEON(R) GOLD 5520+
stepping	: 3
cpu MHz		: 2200.000
cache size	: 16384 KB
fpu		: yes
fpu_exception	: yes
cpuid level	: 13
wp		: yes
flags		: fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx lm constant_tsc xtopology unfair_spinlock pni cx16 x2apic aes hypervisor lahf_lm
bogomips	: 4400.00
clflush size	: 64
cache_alignment	: 128
address sizes	: 46 bits physical, 48 bits virtual
power management:



Memory: 4k page, physical 7982384k(103388k free), swap 0k(0k free)

vm_info: Java HotSpot(TM) 64-Bit Server VM (25.211-b12) for linux-amd64 JRE (1.8.0_211-b12), built on Apr  1 2019 20:39:34 by "java_re" with gcc 7.3.0

time: Tue May 20 09:18:05 2025
timezone: CST
elapsed time: 7 seconds (0d 0h 0m 7s)
~~~

