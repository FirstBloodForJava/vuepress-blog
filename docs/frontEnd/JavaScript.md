# JavaScript

具有函数优先的轻量级，解释型或即时编译型的编程语言。JavaScript基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数编编程范式。

ECMAScript是JavaScript的规范，JavaScript是ECMAScript的实现。



## 使用JavaScript

JavaScript的执行单位是行，也就是一行一行执行。语句以分号(;)结尾。

~~~html
<script>
	var num = 10;
</script>

~~~





### 引用JavaScript

1. 嵌入到html的中，在html的\<body>标签中写\<script>标签；
2. 引入本地独立的js文件，在body中添加script标签，属性为：type="text/javascript", src="js文件的地址"；
3. 引入网络的js文件，在header标签中添加script标签，属性为：scr="js网络地址"









## 语法



### 注释

注释：对代码的作用进行解释说明，不会被解释器执行。

单行注释：//

多行注释：/* */






### 标识符

标识符由字母、美元符号、下划线和数字组成，但是数字不能作为开头。

JavaScript的语法关键字不能作为标识符

![image-20240916084907247](http://47.101.155.205/image-20240916084907247.png)





### 变量

变量提升：JavaScript先解析代码，获取所有被声明的变量，然后再一行一行地运行。这样对变量的声明语句会到代码的头部。

~~~javascript
console.log(num);
var num = 20;

=>
var num;
console.log(num);
num = 20;
~~~



#### 数据类型

JavaScript有6种数据类型：数值、字符串、布尔值、undefined、null、对象。ES6新增Symbol和BigInt类型。



#### 基本数据类型

数值、字符串、布尔值。





#### 合成类型(复合类型)

类似java的引用类型。

对象：由其他基本数据类型组合而成。

对象的内容是由键值对组成的，值可以是任何类型，例如：数字、字符串、对象、数组，也可以是函数，在对象的函数被称为方法；



##### Math对象

Math是JavaScript的原生对象，进行数学运算。

1. Math.abs(int)：取int的绝对值；
2. Math.max(...)：多个值中返回最大值；
3. Math.min(...)：多个值中返回最小值；
4. Math.floor(int)：int值向下取整；
5. Math.ceil(int)：int值向上取整；
6. Math.random()：生成0-1之间的随机数(包含0，不包含1)；



##### Date对象

Date对象是JavaScript原生的时间库。以1970年1月一日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天(单位毫秒)。

Date = Date.now();获取时间戳。

~~~javascript
Date date = new Date();

~~~



Date对象的方法

1. Date.getTime()：
2. Date.getDate()：返回当前是几号
3. Date.getDay()：返回星期几，星期日为0，星期一为1，以此类推；
4. Date.getYear()：返回距离1990的年数；
5. Date.getFullYear()：返回四位的年份；
6. Date.getMonth()：返回月份(0表示1月，11表示12月)；
7. Date.getHours()：返回小时(0-23)；
8. Date.getMilliseconds()：返回毫秒(0-999)；
9. Date.getMinutes()：返回分钟(0-59)；
10. Date.getSeconds()：返回秒(0-59)；





#### typeof(变量类型)

1. 数值->number；
2. 字符串->string；
3. 布尔值->boolean；
4. 对象->object：数组也会返回object；
5. typeof null：object；
6. typeof undefined：undefined。



#### 数组

##### 定义和遍历数组

~~~javascript
var arr = [1, 3, 3, 5];

// for循环遍历数组
for(int i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for in循环
for(var i in arr) {
    console.log(arr[i]);
}

// while循环
int i = 0;
while(i < arr.length) {
    console.log(arr[i]);
    i++;
}

~~~



##### 数组方法

1. Array.isArray(arr)：判断arr是否为数组；
2. arr.push(obj)：往arr数组尾部中添加元素obj；
3. arr.pop()：删除arr数组最后一个元素；
4. arr.shfit()：删除arr数组的第一个元素；
5. arr.unshift(obj)：往arr数组的第一个元素添加元素；
6. arr.join(...)：默认,分割拼接数组元素；传参则以参数分割拼接数组成字符串；
7. arr.concat(...)：合并多个数组，返回一个新的数组；
8. arr.reverse()：反转数组，改变原数组；
9. arr.indexOf(obj, int)：返回obj在数组arr中第一次出现的下标，没有返回-1；int可选，表示从那开始搜索；



### 运算符



#### 算数运算符

1. 加：+；
2. 减：-；
3. 乘：*；
4. 除：/；
5. 取余：%；
6. 自增：++变量/变量++；
7. 自减：--变量/变量--；



#### 赋值运算符

~~~javascript
var num = 10;
var x = 1;
var x = 9;
x = x + y;
x += y;


~~~



#### 比较运算符

1. \>
2. <
3. \>=
4. <=
5. ==：相等运算符；
6. ===：严格相等运算符(比较值和类型)；
7. !=：不相等运算符；
8. !==：严格不相等运算符；



#### 布尔运算符

1. !：取反，取反为true(null、undefined、0、空字符串、NaN、false)；
2. &&：逻辑与；
3. ||：逻辑或；



#### 三元运算符

~~~javascript
(布尔表达式) ? "true表达式结果" : "false表达式结果";

~~~





### 流程语句



#### 条件语句-if

~~~javascript
if (布尔值) {
    
}

~~~



~~~javascript
if(布尔值) {
   
} else {
    
}

~~~



~~~javascript
if(布尔值) {
   
} else if (布尔值) {
    
} else {
    
}

~~~



#### 条件语句-switch

~~~javascript
switch (变量) {
    case "配置值1":
        ...;
        break;
    case "配置值2":
        ...;
        break;
    default:
        ...
}

~~~



#### 循环语句-for

~~~javascript
for(初始化表达式; 循环是否执行判断条件; 迭代表达式) {
    // 循环代码
    
    // break; 退出结束循环
    // continue; 提前结束这一次循环
    
}

~~~



#### 循环语句-while

~~~javascript
while(布尔表达式) {
    // 循环代码
    
}

~~~



### 数据类型

#### 字符串

可以用""|''定义字符串，双引号和单引号在单引号中使用需要转义。

1. charAt(int)：截取字符串对应下标索引的值，索引从0开始，为-1或大于等于字符串长度返回空字符串；
2. concat(str...)：...(可以支持多个参数)拼接字符串；
3. substring(int1, int2)：字符串开始位置索引int1到字符串结束位置int2，不包括int2的位置；int2没有默认长度；int1 > int2会自动转换位置；
4. substr(int1, int2)：从索引位置int1的位置截取int2位数字符串，int1为复制代表从后面开始；
5. indexOf(str, int)：字符串str在字符串中第一次出现的位置，没有返回-1；int可选，从哪里开始；
6. trim()：去除前后空格；trimEnd();trimStart()ES6新增；
7. split(str, int)：按照str的规则分割字符串得到字符串数组，空字符串得到单个字符串的数组；int可选，表示返回的数组元素上限；





### 函数

定义函数的语法：

~~~javascript
function methodName(形参) {
 	
    // 不返回值结束(代码执行到最后一行)
    // return result;
}

~~~



函数的提升，script标签中定义在后面的函数，在编译时，函数的行数会被提前；





## Dom

Dom是JavaScript操作网页的接口，称为文档对象模型(Document Object Model)。它的作用是将网页转为一个JavaScript对象，从而可以用脚本进行各种操作(对元素的增删)。

浏览器会根据Dom模型，将结构化文档html解析成一系列的节点，再由这些节点组成一个树状结构(Dom Tree)。所有的节点和最终的树状结构，都有规范的对外接口。

Dom只是一个接口规范，可以用各种语言实现。Dom不是JavaScript语法的一部分，当时Dom操作是JavaScript最常见的任务，离开了Dom，JavaScript就无法控制网页。JavaScript也是最常用于Dom操作的语言。



### 节点

Dom的最小组成单元叫做节点。Dom树就是由各种不同类型的节点组成，每个节点可以看作是文档树的一片叶子。

7种节点类型：

1. Document：整个文档树的顶层节点；
2. DocementType：doctype标签；
3. Element：网页的各种html标签；
4. Attribute：网页元素的属性(比如class="box")；
5. Text：标签之间或标签包含的文本；
6. Comment：注释；
7. DocumentFragment：文档的片段；



### 节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构，这种树状结构就是Dom树。它只有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，这样衍生出一个金字塔结构，倒过来就是就像一棵树。

浏览器原生提供document节点，代表整个文档。

除了根节点，其他节点都有三种层级关系：

1. 父节点关系(parentNode)：直接的那个上级节点；
2. 子节点关系(childNodes)：直接的下级节点；
3. 同级节点关系(sibling)：拥有同一个父级节点的节点。



不同节点的nodeType属性值和对应常量关系如下：

1. 文档节点(document)：9，对应常量Node.DOCUMENT_NODE；
2. 元素节点(element)：1，对应常量Node.ELEMENT_NODE；
3. 属性节点(attr)：2，对应常量Node.ATTRIBUTE_NODE；
4. 文本节点(text)：3，对应常量Node.TEXT_NODE；
5. 文档片段节点(DocumentFragment)：11，对应常量Node.DOCUMENT_FRAGMENT_NODE；

~~~javascript
document.nodeType == Node.DOCUMENT_NODE;

~~~



### 获取Element元素

1. document.getElementsByTagName("标签名")：获取指定类型的标签元素；
2. document.getElementsByClassName("class对应的名称")：获取指定class的标签元素；
3. document.getElementsByName("标签属性name对应的值")：获取标签name值为这个的标签元素；
4. document.getElementById("id")：获取标签id为这个的标签元素；
5. document.querySelector("css选择器入参")：获取匹配该参数的标签元素，多个节点满足，返回第一个；
6. document.querySelectAll("css选择器入参")：获取匹配该参数的所有标签元素；



### 创建Element元素

1. document.createElement("标签名称")：创建对应参数的标签元素；
2. document.createTextNode("文本内容")：生成文本节点；
3. document.createElement("标签名称").appendChild(document.createTextNode("文本内容"))：给标签添加文本内容；
4. document.createAttribute("属性名称")：创建属性；设置标签元素.setAttributeNode(已创建属性)；



~~~javascript
var p = document.createElement("p");
var pText = document.createTextNode("p标签内容");
p.appendChild(pText);

var id = document.createAttribute("id");
id.value = "zs";
p.setAttributeNode(id);

// document?设置创建的标签元素
document?.appendChild(p);

~~~



### Element对象属性

1. element.id：标签的属性key为id的值，可以获取和修改；
2. className：标签的属性key为class的值，可以获取和修改；
3. classList.add("类选择器名称")：标签元素添加指定类选择器；
4. classList.remove("类选择器名称")：标签元素删除指定的类选择器；
5. classList.toggle("类选择器名称")：如果类选择器不存在则加入，否则删除；
6. classList.contains("类选择器名称")：返回true或false；
7. innerHtml：获取或修改标签元素的文本，可以识别html标签；
8. innerText：获取或修改标签元素的文本，只能识别字符串；



### Element获取元素位置

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| clientHeight | 获取元素高度，包括padding部分，不包括border、margin          |
| clientWidth  | 获取元素宽度，包括padding部分，不包括border、margin          |
| scrollHeight | 元素总高度，包括padding，不包括border、margin，包括溢出的不可见部分 |
| scrollWidth  | 元素总宽度，包括padding，不包括border、margin，包括溢出的不可见部分 |
| scrollLeft   | 元素的水平滚动条向右滚动的像素位置                           |
| scrollTop    | 元素的垂直滚动条向下滚动的像素位置                           |
| offsetHeight | 元素的css垂直高度，包括本身高度、padding和border             |
| offsetWidth  | 元素的css水平宽度，包括本身宽度、padding和border             |
| offsetLeft   | 到定位父级左边界的间距                                       |
| offsetTop    | 到定位父级上边界的间距                                       |



~~~javascript
// 视口高度
document.documentElement.clientHeight
//页面高度
document.body.clientHeight

// 视口高度(包含溢出部分)
document.documentElement.scrollHeight
// 页面高度(包含溢出部分)
document.body.scrollHeight

// 获取滚动高度
document.documentElement.scrollTop

// 获取元素的高度=本地高度+padding+border
div.offsetHeight

// 获取父级定位


~~~



### css操作

~~~javascript
element.setAttribute("style", "css样式代码");
element.setAttribute("style", "width:200px;height:300px");

element.style.width = "300px";

element.style.cssText = "width:200px;height:300px";

~~~



## html事件

1. html事件：htmo中写事件绑定JavaScript的函数；
2. dom0级事件：获取element元素，.事件设置Javascript函数，只能绑定一个事件；
3. dom2级事件：获取element元素，元素.addEventListener("事件类型", "函数")，可以绑定多个事件；



### Event事件对象

事件发生后，回产生一个事件对象，作为参数传递给监听函数。

Event对象属性：

1. event.target：返回事件触发当前所在的节点；
2. event.type：获取事件的类型，只读；
3. envent.keyCode：唯一标识；

Event对象方法：

1. event.preventDefault()：取消浏览器当前的默认行为，例如阻止a标签调整；
2. event.stopPropagation：阻止事件在dom中传播；阻止其他节点在当前节点的事件发生；不影响当前节点的其他事件；





### 鼠标事件

1. click：按下鼠标时触发；
2. dblclick：双击鼠标事件；
3. mousedown：鼠标按下时触发；
4. mouseup：按下鼠标弹起时触发；
5. mousemove：鼠标再节点内部移动触发；在节点中继续移动，还会触发；
6. mouseenter：进入一个节点触发，进入子节点不会触发；
7. mouseleave：离开节点触发，离开父节点不会触发；
8. mouseover：进入一个节点触发，进入子节点不会触发；
9. mouseout：鼠标离开一个节点触发，离开父节点也会触发；
10. wheel：滚动鼠标滚轮时触发；



### 键盘事件

1. keydown：按下键盘时触发；
2. keypress：按时有值的键触发；优质的键，先出阿飞keydown事件，再触发这个事件；
3. keyup：松开键盘时触发事件；





### 表单事件

1. input：input、select、textarea标签的值变化时触发；
2. select：input、textare标签文本被选中时触发；
3. change：input、select、textarea标签的值变化时触发(回车/失去焦点)；
4. reset：form标签上，重置表单；
5. submit：提交数据；





~~~javascript
// input
function(e) {
    // 获取标签的值
    e.target.value;
}



~~~



### 事件代理(事件委托)

父节点的事件会被子节点触发，可以把子节点的监听函数定义在父节点上，由父节点的监听函数同一处理多个子元素的事件。这种方式就叫做事件代理。





## 定时器

JavaScript提供了定时执行代码的功能，叫做定时器，主要由setTimeout()和setInterval()这两个函数来王朝。

~~~javascript
// 延迟执行器
var timerId = setTimeout(func|code, delay);
// setTimeout函数第一个参数将要推迟执行的函数名或一段代码,第二个参数标识推迟执行的毫秒数
// 定时器执行的函数中的this指向的是全局就环境,而不是定义函数的所在的对象; 

// 取消定时器
clearTimeout(timerId);

~~~



~~~javascript
setInterval(func, delay);
// delay表示间隔多长时间指向,不断循环

~~~



### 防抖

对于短时间内多次触发的事件，防抖的含义是让某个时间期限，函数的事件只执行一次。

可以在搜索处使用防抖。

~~~javascript
// 在延迟触发之前一直滚动,就无法触发了
function debounce(fn, delay){
    var timerId = null;
    return function() {
        if (timerId) {
        	clearTimeout(timerId);    
        }
		timerId = setTimeout(fn, delay);
    }
}
window.onscroll = debounce(scrollHandle, 200);

function scrollHandle(){
    console.log(document.documentElement.scrollTop);
}

~~~



### 节流

页面resize事件，需要做页面适配的时候。需要根据最终的呈现情况进行dom渲染，只需要判断最后一次的变化情况。

~~~javascript
// 第一次滚动触发定时器，后面继续滚动定时器没有执行valid为false，所有不会执行fn的方法
window.onscroll = throttle(scrollHandle, 200);

function scrollHandle(){
    console.log(document.documentElement.scrollTop);
}

function throttle(fn, delay) {
 	var valid = true;
    if (!valid) {
        return false;
    }
    valid = false;
    setTimeout(function(){
        fn();
        valid = true;
    }, delay)
}

~~~







## 输出方式

1. console.log()：控制台输出；
2. alert(弹窗)；
3. document.write("输出到页面")。




