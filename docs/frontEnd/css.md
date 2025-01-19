## css概念

CSS(Cascading Style Sheets)层叠样式表，又叫级联样式表，简称样式表。

CSS文件后缀名为.css。

CSS用于HTML文档中元素样式的定义。



## css语法

两个主要部分构成：选择器，以及一条或多条声明(样式)。

选择器通常是需要改变样式的HTML元素。

每条声明由一个属性和一个值组成。

~~~html
<head>
    <style>
		p{
        	color: yellow;
       
    	}
	</style>
</head>

~~~



## css引入方式

> 内联样式

~~~html
<p style = "">
    
</p>

~~~





> 内部样式

~~~html
<head>
    <style>
		p{
        	color: yellow;
       
    	}
	</style>
</head>

~~~



> 外部样式

~~~html
<link rel="stylesheet" type="text/css" href="css文件地址">

~~~



 ## css选择器

### 选择器一

1. 全局选择器；
2. 元素(标签)选择器；
3. 类选择器，定义选择器供标签使用，一个标签可以使用多个类选择器，用空格分隔；



~~~html
<style>
    * {
        color: red;
    }
    
    p {
		color: green;
    }
    
    .myStyle {
        color: grey;
    }
</style>

<p class="myStyle">
    
</p>

~~~



### 选择器二

1. id选择器，只能使用一次；
2. 合并选择器，提取共同的样式；

~~~html
<style>
    #myId {
        color: red;
    }
    
    .myStyle, .content {
        color: grey;
    }
</style>

<p id="myId">
    
</p>

~~~



### 选择器的优先级

1. 内联样式；
2. id选择器
3. 类选择器；
4. 元素(标签)选择器；





## 字体属性

1. color：定义颜色
   1. red：字母表示颜色；
   2. \#ff000：
   3. rgb(0, 0, 0)：rgb表示；
   4. rgba(0, 0, 0, 1)：附加透明度；
2. font-size：px像素表示；
3. font-weight：设置文本的粗细
   1. bold：粗体字符；
   2. bolder：更粗的字符；
   3. lighter：更细的字符；
   4. 100~900：从小到大为由细到粗，400等同默认，700等同bold;
4. font-style：定义字体的样式；
   1. normal：默认值；
   2. italic：斜体；
5. font-family：定义字体的版本宋体、微软雅黑；
   1. Microsoft YaHei：微软雅黑；
   2. Simsun：宋体；
   3. SimHei：



## 背景属性

1. background-color：设置背景颜色；
2. background-image：设置背景图片；
   1. url("图片的路径")；
3. background-repeat：设置背景图片如何填充；
   1. repeat：默认值，水平垂直都平铺；
   2. repeat-x：只水平方向平铺；
   3. repeat-y：只垂直方向平铺；
   4. no-repeat：不平铺；
4. background-size：设置背景图片大小属性；
   1. length：设置图片宽度和高度，第一个值宽度，第二个值高度，只设置第一个，第二个值自动；
   2. percentage：设置限度位置区域的百分比，第一个值宽度，第二个值高度，只设置第一个，第二个值自动；
   3. cover：保持图片纵横比并将图片缩放成覆盖背景区域的最小大小；
   4. contain：保持图片纵横比并将图片缩放成适合背景定位区域的最大大小；
5. background-position：设置背景图片显示位置，默认0% 0%；
   1. left、right、top、bottom、center之间任意两两组合；
   2. x% y%：百分比，x水平，y垂直位置；
   3. xpx ypx：像素位置；





## 文本属性

1. text-align：文本对齐方式；
   1. left：
   2. right：
   3. center：
2. text-decoration：文本修饰；
   1. underline：下划线；
   2. overline：上划线；
   3. line-ghrough：删除线；
3. text-transform：控制文本的大小写；
   1. captialize：每个单词开头大写；
   2. uppercase：全都大写；
   3. lowercase：全部小写；
4. text-indent：设置首行缩进，20px；





## 表格属性

1. borde: 1px solid black：设置表格边框；
   1. 边框大小为1px
   2. 线的形状；
   3. 线的颜色；
2. border-collapse: collapse：折叠边框；
3. width、height设置td、table的宽度高度；
4. text-align设置文本对齐；
5. td、th设置边距，边框和文本之间的；
6. 使用background-color设置颜色；



## 关系选择器

### 后代选择器

语法：E的所有后代F样式都生效。

~~~css
E F {
    
}

~~~



### 子代选择器

语法：E的子代的样式都生效。

~~~css
E>F {
	
}

~~~



### 相邻兄弟选择器

语法：E相邻的F(向下的)的样式生效。

~~~css
E+F {
    
}

~~~



### 通用兄弟选择器

语法：E的后面的所有兄弟F的样式都生效，多个元素用~分割。

~~~css
E~F {
    
}

~~~



## css盒子模型(Box Model)

所有的HTML元素可以看作一个盒子，在css中，盒子模型是在设计和布局时使用的。css盒子模型本质是一个盒子，封装周围的HTML元素，包括：外边距margin、边框(border)、内边距(padding)和实际内容(content)。

1. padding ypx xpx：y表示上下内边距，x表示左右内边距；
   1. -left、-right、-top、-bottom：设置单个方向边距；
2. border xpx solid red：x表示线的大小、第二个表示形状、第三个表示颜色；
3. margin：ypx xpx：y表示上下内边距，x表示左右内边距；



## css弹性盒子模型

弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成，弹性容器通过设置display属性的值为flex将其定义为弹性容器，弹性容器内包含了一个或多个弹性子元素。



### flex-direction

弹性容器中的元素默认水平从左到右摆放，通过flex-direction设置弹性子元素的在父容器的位置：

1. row：从左到右，默认；
2. row-reverse：反转row；
3. column：垂直排列；
4. column-reverse：反转column；



### justify-content

设置弹性盒子容器中元素在垂直方向上的对齐方式；

1. flex-start：居左
2. flex-end：居右
3. center：居中；



### align-items

设置弹性容器中元素在水平方向上的对齐方式

1. flex-start：居上；
2. flex-end：居下；
3. center：居中；



### 子元素属性

flex-grow/flex

作用于弹性子元素，设置子元素在容器中的比重。

默认为0，即使剩余空间很大，也不放大。按占比划分子元素的大小。





## 文档流

文档流是文档中可显示对象在排列时所占用的位置/空间。

文档流会带来一些问题：

1.  高矮不齐；
2. 图片之间由间隙；
3. 空格折叠；



## 浮动

增加一个浮层来放置内容，脱离标准流作为上层元素。

定义元素在哪个方向浮动，任何元素都可以浮动。

1. 浮动以后是元素脱离了文档流(标准流)；
2. 浮动只能左右浮动，不能上下浮动；
3. 左右不能容纳，会自动到下一行；

float: left | right



## 清除浮动

浮动副作用：

1. 造成父元素的高度塌陷(浮动的父容器不设置高度)；
2. 后续的元素造成影响；



清除浮动的方案：

1. 父元素设置高度；
2. 受影响元素增加clear属性：clear: left | right | both；
3. overflow清除浮动：父级受影响元素添加overflow: hidden(并且使用clear: both)；
4. 伪对象方式：父级有塌陷，并且同级元素受到了影响，为父标签添加伪类after，并且使用clear: both

~~~css
.father::after {
    contern: "";
    display: block;
    clear: both;
}

~~~



## 定位

positions属性指定了元素的定位类型

1. relative：相对定位；
2. absolute：绝对定位；
3. fixed：固定定位，固定之后不会滚动条移动；

绝对定位和固定定位会脱离文档流。

指定定位后，可以是left、right、top、bottom调整元素的位置。

设置定位后，相对定位和绝对定位是根据其具有父级定位元素进行位置调整，如果父级元素不存在定位，则继续向上逐级查找，知道顶层文档。

z-index设置元素的堆叠顺序，z-index值跟高的元素总是在较低值元素的前面。



## css3新特性



### 圆角

border-radius: ?px；四个角圆角值相同。

border-radius: ?px ?px；第一个为左上角和右下角，第二个值为右上角与左下角；

border-radius: ?px ?px ?px；第一个值为左上角，第二个为右上角和左下角，第三个值为右下角；

border-radius: ?px ?px ?px ?px；左上角、右上角、右下角、左下角；

border-radius: 100%变成圆形。



### 阴影

box-shadow向框添加一个或多个阴影。

box-shadow: ?px ?px ?px ?corlor；

1. 必选，表示水平阴影的位置；
2. 必选，表示垂直阴影的位置；
3. 可选，模糊距离；
4. 可选，阴影的颜色；





## 动画

### 创建动画

@keyframes创建动画语法

~~~css
@keyframes <动画名称> {
    from{
        
    }
    
    to {
        
    }
}

~~~

~~~css
@keyframes <动画名称> {
    x1%{
        
    }
    
    x2% {
        
    }
    
    x3% {
        
    }
    ...
}

~~~



### 执行动画

animation语法

~~~css
animation: <name> <duration> <timing-function> <delay> <iteration-count> direction;

//
animation-play-state: running/paused()

~~~

1. name：执行的动画名称；
2. duration：设置动画的持续时间；
3. timing-function：设置动画效果的速率；
   1. ease：逐渐变慢；
   2. linear：匀速；
   3. ease-in：加速；
   4. ease-out：减速；
   5. ease-in-out：向加速后减速；
4. delay：设置动画的延迟时间；
5. iteration-count：动画循环的次数，infinite表示无效循环；
6. direction：设置动画播放的方向；
   1. normal：默认值，表示先前播放；
   2. alternate：动画播放在偶数次向前播放，奇数次向反方向播放；



~~~css
@keyframes my-animation {
                0% {
                    background-color: red;
                }

                50% {
                    background-color: aqua;
                }

                100% {
                    background-color: blue;
                }
            }

            .myDiv {
                width: 400px;
                height: 400px;
                margin: 40px auto;
                animation: my-animation 3s linear 0s infinite;
            }

            .myDiv {
                animation-play-state: running;
            }

            .myDiv:hover {
                animation-play-state: paused;
            }

~~~





## 媒体查询

媒体查询能是页面在不同终端设备下达到不同的效果。

### 设置meta标签

~~~css
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

~~~

width=device-width：设置等于当前设备的宽度；

initial-scale：初始的缩放比例，默认值1；

maximum-scale=1：允许用户缩放的最大比例，默认值1；

user-scalable：用户是否可以手动缩放，默认值no；





### 媒体查询语法

~~~css
@media screen and(min-width|max-width: ?px) and (max-width|min-width: ?px) {
    body {
        
    }
}

~~~



## 雪碧图

css sprite也叫css雪碧图，是一种网页图片应用处理方式。



优点：

1. 减少图片的字节；
2. 减少网页的http请求，从而大大的提高页面的性能。



原理：

1. 通过background-image引入背景图片；
2. 通过background-position把背景图片移动到自己需要的位置；







## 字体图标

使用字体来代替图片的图标。

阿里字体图标库：https://iconfont.cn/

使用语法

~~~css
<link rel=stylesheet href="iconfont.css文件">

<span class="iconfont icon-home home"></span>

~~~

