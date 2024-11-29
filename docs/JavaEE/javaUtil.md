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



## 进制转换

![image-20241126134949671](http://47.101.155.205/image-20241126134949671.png)

二进制数据不管正负都是以补码的形式存储。

~~~java
// Long.MIN_VALUE 补码 2^63 8+15个0
Long.MIN_VALUE & 1 => 1;

// Long.MAX_VALUE 补码 2^63 - 1, 7+15个f, 0 + 63个1
// -1L 补码 2^64 - 1,16个f, 64个1
// &运算两个为1才是1
Long.MAX_VALUE & -1L => Long.MAX_VALUE;

~~~





### 16进制

Long.parseLong(String s, int radix)：以radix进制格式解析字符串s，支持带符号解析，只能解析Long类型范围内的进制s。超出则抛出异常

Long.parseUnsignedLong(String s, int radix)：以radix进制格式解析字符串s，不支持带符号解析；可支持的字符串更大。超过字符串上限抛出异常。

~~~java
public class ScaleConvert {

    public static void main(String[] args) {

        String traceId = "80000000000000008000000000000000";

        // 支持带符号,以16进制解析字符串为long类型.字符串相当于该进制的补码,最高位不能是1(携带'-'就可以)
        // 不带符号，字符串解析为二进制补码，最高位不能位1的格式，10进制不能超过最大值
        // 带符号，字符串解析为二进制补码，最高位能是1，对应补码在Long.MIN_VALUE-Long.MAX_VALUE范围内
        System.out.println(Long.parseLong("-" + traceId.substring(0, 16), 16));// Long.MAX_VALUE

        // 不支持带符号，以16进制解析字符串为long类型.字符串相当于该进制的补码
        // 解析为10进制，字符串支持长度0-19位,字符串值'0'-'9'
        // 解析为16进制，字符串支持长度0-16位,字符串值'0'-'9','a'-'f'
        System.out.println(Long.parseUnsignedLong(traceId.substring(16), 16));

        // Long.MIN_VALUE
        System.out.println(lenientLowerHexToUnsignedLong(traceId, 0, 16));

        // Long.MIN_VALUE
        System.out.println(lenientLowerHexToUnsignedLong(traceId, 15, 32));


    }

    /**
     * 将字符串解析成对应long类型的二进制补码，如果长度超过16位，高位丢弃
     * 字符串中字符范围：'0'-'9','a'-'f'，出现其它字符则return 0
     * 与Long.parseUnsignedLong(String s, int radix)功能相似，但是不会抛出异常
     * @param lowerHex 字符串
     * @param index 字符串下标开始位置(包含)
     * @param endIndex 字符串结束位置(不包含)
     * @return 字符串lowerHex转化为16进制的补发对应的long值
     */
    public static long lenientLowerHexToUnsignedLong(CharSequence lowerHex, int index, int endIndex) {
        long result = 0;
        while (index < endIndex) {
            char c = lowerHex.charAt(index++);
            result <<= 4;
            if (c >= '0' && c <= '9') {
                result |= c - '0';
            } else if (c >= 'a' && c <= 'f') {
                result |= c - 'a' + 10;
            } else {
                return 0;
            }
        }
        return result;
    }
}

~~~

