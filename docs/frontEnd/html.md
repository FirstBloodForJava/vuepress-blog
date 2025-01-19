## html5简介

菜鸟教程地址：https://www.runoob.com/html/html5-intro.html

html5是互联网的一代标准，使用来描述网页的一种语言，被称为超文本标记语言。标签有两种形式：双标签、单标签。



> DOCTYPE

DOCTYPE(document type的缩写)，放在html文档最前面，避免浏览器的怪异模式。


~~~html
<!DOCTYPE html>

~~~



> 基本结构

~~~html
<!DOCTYPE html>
<html lang="en">

<head>

</head>

<body>
 
</body>

</html>

~~~



## 标签介绍

### h标签

标题标签

~~~html
h$*6
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>

~~~



标签属性algin：left、right、center



### p标签

段落标签

~~~html
<p>
    
</p>

~~~



### br标签

换行标签，单标签。

~~~html
<br/>

~~~



### hr标签

水平线标签，单标签。

~~~html
<hr>

~~~



### img标签

图片标签，单标签。

~~~html
<img>

~~~

标签属性：

1. src：图片的路径；
2. alt：图片无法加载的提示；
3. width：宽度；
4. height：高度；
5. title：鼠标悬停提示。



### a标签

超文本链接

~~~html
<a></a>

~~~

标签属性：

1. href：跳转的地址；



### 文本标签

1. ~~~html
   <em>
   ~~~

2. ~~~html
   <b>：加粗；
   ~~~

3. ~~~html
   <i>：斜体；
   ~~~

4. ~~~html
   <strong>：
   ~~~

5. ~~~html
   <del>：删除字；
   ~~~

6. ~~~html
   <span>：块。
   ~~~





### 有序列表标签

~~~html
<ol>
    <li></li>
</ol>

~~~

ol标签属性：

type对应value效果：

1. 1：数字1、2、3...；
2. a：字母a、b、c...；
3. A：字母A、B、C...；
4. i：小写罗马数字；
5. I：大写罗马数字。







### 无需列表标签

~~~html
<ul>
    <li></li>
</ul>

~~~

ul标签属性：

type对应value的效果：

1. disc：默认实心圆；
2. circle：空心圆；
3. square：小方块；
4. none：不显示。





### 表格标签

~~~html
<table>
    <tr>
    	<td>行1列1</td>
        <td>行1列2</td>
    </tr>
</table>

~~~

tr：表示一行；

td：表示一行中的列；







### form表单

表单组成：表单标签，表单元素，表单按钮。

~~~html
<form>
	<input>
	<button>表单按钮</button>    
</form>

~~~

form标签属性：

1. action：表单提交的地址；
2. method：请求方式；
3. name：表单名称；



input标签，type对应属性说明：







## 内容分类

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories



| 块级元素                           | 内联元素(行内元素)                |
| ---------------------------------- | --------------------------------- |
| 在页面中独占一行(自上向下垂直排列) | 行内元素不会独占一行,只占自身大小 |
| 可以设置width、height              | 设置width、height无效             |
| 块级元素可以汉化行内元素           | 内联元素不包含块级元素            |

块级元素：

div、form、h标签、p、table、ul等



行内元素：

a、b、em、span、i、strong



行内块级元素：(不换行、支持witdh、height)

button、img、input



## html5新标签

html5之前，html页面结构是div+css渲染。

为了优化SEO，

~~~html
<header>头部</header>
<nav>导航</nav>
<section>文档中的章节、页眉、页脚</section>
<aside>侧边栏</aside>
<footer>脚部</footer>
<article>代表独立的、完整的内容块</article>

~~~

