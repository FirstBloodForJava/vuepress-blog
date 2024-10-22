## EnumSet

EnumSet`<E extends Enum<E>>`是一个专门存放枚举的集合，这是一个抽象类，Java对其有两个实现类RegularEnumSet(枚举元素<=64)和JumboEnumSet。这两个类都是缺省的修饰符访问权限，不能通过new来创建对象，提供了noneOf(枚举)、allOf(枚举类)来创建对应的对象。

![image-20240229140130327](http://47.101.155.205/image-20240229140130327.png)

~~~java
// 通过debug发现getEnumConstantsShared方法执行会调用到System类
// SharedSecrets.getJavaLangAccess().getEnumConstantsShared(elementType)该方法可以获取一个共享的枚举类对象数组,注意这个数组被修改后,后续获取到的都是修改的对象。
private static <E extends Enum<E>> E[] getUniverse(Class<E> elementType) {
	return SharedSecrets.getJavaLangAccess().getEnumConstantsShared(elementType);
}

~~~

![image-20240229141059629](http://47.101.155.205/image-20240229141059629.png)



### RegularEnumSet

RegularEnumSet基于枚举的可数性，结合一个long类型的数字实现对一个集合的增、删、查等。

~~~java
private long elements = 0L;
final Class`<E>` elementType;// 枚举的类
final Enum`<?>`[] universe;// SharedSecrets.getJavaLangAccess().getEnumConstantsShared(elementType)获取的枚举所有信息

~~~



Enum<?>.ordinal()范围[0,63]

- 增加元素

~~~java
// 先进行类型校验
// | 或运算 一个为1就是1
long oldElements = this.elements;
elements |= (1L << Enum<?>.ordinal());
return elements != oldElements;

~~~



- 是否存在

~~~java
// 先进行类型校验
// & 与运算 两个为1才是1
return (elements & (1L << Enum<?>.ordinal())) != 0

~~~



- 移除元素

~~~java
// 先进行类型校验
// ~ 非运算,取反;然后& 与运算 两个为1才是1
long oldElements = this.elements;
elements &= ~(1L << Enum<?>.ordinal());
return oldElements != elements;

~~~



- 遍历元素

~~~java
private class EnumSetIterator<E extends Enum<E>> implements Iterator<E> {
	long unseen;
    
	long lastReturned = 0;

    EnumSetIterator() {
        // bit位占用情况
		unseen = elements;
	}

	public boolean hasNext() {
		return unseen != 0;
	}

	@SuppressWarnings("unchecked")
	public E next() {
		if (unseen == 0)
			throw new NoSuchElementException();
// unseen初始化代表即初始的集合元素布局情况,这里运算的目的是找出二进制最低位的1
// unseen为正整数:-unseen的补码为unseen全部取反+1;这就意味着结果为unseen最低位为1的二进制结果
// unseen为负整数:-unseen的补码为unseen全部取反+1(MAX为自己);后面同上
		lastReturned = unseen & -unseen;
		unseen -= lastReturned;
		return (E) universe[Long.numberOfTrailingZeros(lastReturned)];
	}

	public void remove() {
		if (lastReturned == 0)
			throw new IllegalStateException();
        // 和移除元素是异曲同工之妙 ~(1L Long.numberOfTrailingZeros(lastReturned)))
		elements &= ~lastReturned;
		lastReturned = 0;
	}
}

~~~

![image-20240229211844803](http://47.101.155.205/image-20240229211844803.png)





