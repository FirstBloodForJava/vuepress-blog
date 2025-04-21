## oracle查询列长度太长

查询的varchar的列字符串长度超过4000(取决与oracle怎么计算这个字符的长度)

例如：

col like '%?%'，如果这个like后面的字符串长度超过4000就会报错，其中包含了这个%%，中文会占用3个长度。

使用可视化页面执行会有其他不同的错误代码：可能是底层使用的数据库驱动不同

### ORA-01460

org.springframework.orm.jpa.JpaSystemException: could not extract ResultSet; nested exception is org.hibernate.exception.GenericJDBCException: could not extract ResultSet

![image-20240123142754994](http://47.101.155.205/image-20240123142754994.png)



![image-20240123150813620](http://47.101.155.205/image-20240123150813620.png)

![image-20240123151018341](http://47.101.155.205/image-20240123151018341.png)

### ORA-01489

列中使用||拼接字符串查询

![image-20240123145415159](http://47.101.155.205/image-20240123145415159.png)

![image-20240123145624466](http://47.101.155.205/image-20240123145624466.png)

![image-20240123162438276](http://47.101.155.205/image-20240123162438276.png)

### ORA-01704

select length('?') from dual;使用可视化工具查询，length的结果中文算一个。

![image-20240123150001769](http://47.101.155.205/image-20240123150001769.png)



## SQLRecoverableException

可恢复异常

### ORA-17008=Closed Connection

可能原因：Oracle数据库或中间设备（防火墙、代理）设置了空闲连接超时，导致长时间未使用的连接被关闭。

如果是查询，不会抛出异常。可能会出现查询耗时很长的情况。

**这个问题可能是Druid连接池关闭连接异常导致。**

![image-20250421133027640](http://47.101.155.205/image-20250421133027640.png)

![image-20250421133108418](http://47.101.155.205/image-20250421133108418.png)

![image-20250421133157598](http://47.101.155.205/image-20250421133157598.png)

![image-20250421133232391](http://47.101.155.205/image-20250421133232391.png)

![image-20250421133256721](http://47.101.155.205/image-20250421133256721.png)

![image-20250421132904221](http://47.101.155.205/image-20250421132904221.png)

