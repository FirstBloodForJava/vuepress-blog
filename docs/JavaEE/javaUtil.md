# javaUtil



## 获取系统信息

### ip

~~~java
// 获取第一个非回环、非IPv6的IPv4地址
// ip addr会显示网络接口信息，inet 后面跟的是ip地址信息
// ifconfig inet后面跟的是ip地址信息
public static String getInetAddress() {
	try {
		Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
		InetAddress address;
		while (interfaces.hasMoreElements()) {
			NetworkInterface ni = interfaces.nextElement();
			Enumeration<InetAddress> addresses = ni.getInetAddresses();
			while (addresses.hasMoreElements()) {
				address = addresses.nextElement();
				System.out.println(address.getHostAddress());
                // 非回环地址 && 非IPv6地址
				if (!address.isLoopbackAddress() && !address.getHostAddress().contains(":")) {
					return address.getHostAddress();
				}
			}
        }
            return null;
	} catch (Throwable var4) {
		return null;
	}
}

~~~



### Java-pid

获取当前Java程序的pid

~~~java
public static String getPID() {

	// 获取当前运行的 Java 虚拟机的名称,通常是<pid>@<hostname>格式
	String processName = ManagementFactory.getRuntimeMXBean().getName();
    System.out.println(processName);
    if (processName == null || "".equals(processName)) {
        return "";
	} else {
        String[] processSplitName = processName.split("@");
        if (processSplitName.length == 0) {
            return "";
        } else {
            String pid = processSplitName[0];
            if (pid == null || "".equals(pid)) {
                return "";
            } else {
                return pid;
            }
        }
    }
}
~~~

