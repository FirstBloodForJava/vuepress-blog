# vue
vue官网地址：https://cn.vuejs.org/

api文档地址：https://v2.cn.vuejs.org/v2/api/

html文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

vue是构建用户界面的渐进式框架，vue被设计为可以自底层向上逐层应用。vue的核心库只关注视图层，还便于与第三方库或既有项目整合。vue能够为复杂的单页面应用提供驱动。



## vue2

### 第一个vue应用



~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

    
    <div id="app">
        {{ message }}
    </div>

    <script>

        var app = new Vue({
            el: '#app',
            data: {
                message: 'hello world vue!'
            }
        })

    </script>


</body>

</html>

~~~



![image-20240921200522588](http://47.101.155.205/image-20240921200522588.png)



### vue指令

`{{差值表达式}}`

`"{{不能使用差值表达式}}"`

1. v-text：设置标签的文本值，纯文本展示；
2. v-html：设置标签的文本值，识别html标签；
3. v-on：绑定事件；
4. v-show：值为true表示显示元素，false表示不显示(通过css控制不显示)；
5. v-if：值为true表示显示元素，false表示不显示(通过直接在dom中删除元素不显示)；
6. v-bind：设置标签的属性值；
7. v-for：循环渲染数据；
8. v-model：数据双向绑定；



#### v-text和v-html

~~~html
<div id="app-1">
	<div v-text="message"></div>
    <div v-html="message"></div>
</div>

<script>
	var app1 = new Vue({
        el: '#app-1',
        data: {
            message: '<a href="https://www.baidu.com">百度</a>'
        }
    })
</script>

~~~



#### v-on

~~~html
<div id = 'app-6'>
    <span>{{message}}</span>
    <br>
    <button v-on:click="reverseMessage">
        反转消息
    </button>
</div>

<script>
	var app6 = new Vue({
		el: "#app-6",
		data: {
        	message: "vue js!"
    	},
    	methods: {
        	reverseMessage: function(){	
            	this.message = this.message.split('').reverse().join('');
        	}
    	}
	})
</script>

~~~



~~~html
<!--
.prevent修饰符表示告诉v-on指令,对于触发的事件调用event.preventDefault(),即阻止浏览器的默认行为
-->
<form v-on:submit.prevent="onSubmit">...</form>

~~~



缩写

~~~html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>

~~~





#### v-show和v-if

**条件渲染**：`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。



**避免v-for和v-if同时使用**

**当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。**

https://v2.cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81

~~~html
<div id="app-3">
	<p v-show="seen">现在你看到我了</p>
</div>

<div id="app-4">
	<p v-if="seen">现在你看到我了</p>
</div>

<script>

	var app3 = new Vue({
		el: '#app-3',
		data: {
			seen: false
        }
    })
    
    var app4 = new Vue({
		el: '#app-4',
		data: {
			seen: false
        }
    })

</script>

~~~

![image-20240921202051687](http://47.101.155.205/image-20240921202051687.png)









#### v-bind

~~~html
<div id="app-2">
	<span v-bind:title=message> 123</span>
</div>

~~~

**如果标签中有定义属性，再使用v-bind:同样的属性，data对于的属性值修改时不会生效。**

缩写

~~~html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>

~~~





#### v-for

用 `v-for` 指令基于一个数组来渲染一个列表。

`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。也支持第二个可选参数，当前项的索引。**也可以用of代替in，如item of items。**

~~~html
<div id="app-5">
	<ol>
		<li v-for="(todo,index) in todos">
			{{ todo.text }} + {{index}}
		</li>
		</ol>
</div>

<script>
	var app5 = new Vue({
        el: '#app-5',
        data: {
            todos: [
                { text: '学习 JavaScript' },
                { text: '学习 Vue' },
                { text: '整个牛项目' }
            ]
        }
    })
</script>

~~~

![image-20240921202552885](http://47.101.155.205/image-20240921202552885.png)



在v-for指令中，可以访问所有父作用域的属性。

~~~html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

~~~

~~~javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

~~~










#### v-model

数据双向绑定

~~~html
<div id = 'vue-7'>
    <span>{{message}}</span>
    <br>
    <input v-model="message">
</div>

<script>
	var vue7 = new Vue({
        el: '#vue-7',
        data: {
            message: '123'
        }
    })
</script>

~~~





### 组件化应用构建

vue注册组件步骤：

1. 定义名为`name`的新组件；
2. 使用这个组件构建html模板；

vue的组件非常类似于自定义元素

~~~javascript
Vue.component('name', {
    template: '<li>这是一个li标签</li>'
})

var app = new Vue({})

~~~

~~~html
<ul>
    <name></name>
</ul>

~~~



~~~html
<div id="app-1">
        <ol>
            <todo-item 
                v-for="item in groceryList"
                v-bind:todo="item"
                v-bind:key="item.id"
            >
            </todo-item>
        </ol>
</div>

<script>
        Vue.component('todo-item', {
            // 定义一个名为todo-item的组件,其中属性由todo,模板使用<li>{{todo.text}}</li>html代码
            props: ['todo'],
            template: '<li>{{todo.text}}</li>'
        })

    // 给app-1提供数据
        var app1 = new Vue({
            el: '#app-1',
            data: {
                groceryList: [
                    {id: 0, text: "html"},
                    {id: 1, text: "css"},
                    {id: 2, text: "javascript"},
                    {id: 3, text: "vue"}
                ]
            }
        })

</script>

~~~



### 数据和方法

当一个Vue实例(对象)被创建时，它将data对象中的所有属性加入到Vue的响应式系统中。当data中的属性发生变化时，视图将会产生响应，匹配为跟新的值。

**只有最开始在data中的属性才是响应式的，新添加的属性不是响应式的**

~~~javascript
// 不允许修改obj对象的属性值
Object.freeze(obj)

// 访问vue对象的属性和方法
var obj = {
	"foo": "bar"
}
        
Object.freeze(obj);

var app2 = new Vue({
	el: '#app-2',
	data: obj
});

// true 访问data属性
app2.$data === obj;
// true 访问挂载的dom元素
app2.$el === document.getElementById('app-2');

// 属性改变时回调
app2.$watch('foo', function(newValue, oldValue) {
    // 这个将在data对象中的属性foo改变时调用
    // obj.foo='123'执行后再执行obj.foo='123'不会触发
})

~~~



### 生命周期

每个Vue实例在被创建时都要经过一些列的初始化过程，例如：需要设置数据监听、编译模板、将实例挂载到DOM，并在数据变化时更新DOM等。在这个过程中会运行一些叫做生命周期钩子的函数。

created、mounted、updated和destroyed生命周期函数被调用的this上下文指的是它的Vue实例。

**不要在回调上使用箭头函数，因为箭头函数没有this，this会作为百年来一直到上级词法作用域查找，知道找到为止。**



箭头函数：()=> console.log(this.a)。

~~~html
<div id="app-1">
        {{a}}
</div>

<script>
	var obj = {
		"a": "create"
	}
	var app1 = new Vue({
    	el: '#app-1',
		data: obj,
        created: function() {
			console.log("a is: " + this.a)
        }
    })
</script>

~~~

![生命周期图示](http://47.101.155.205/image-20240922200522588.png)



### 模板语法

Vue.js使用了基于HTML的模板语法，运行开发者声明式地将DOM绑定值底层Vue实例的数据。所有Vue.js的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

**模板语法‌是一种将后端数据动态展示在前端的技术，它允许开发者在HTML页面中使用特定的标记或占位符，这些标记或占位符在页面渲染时会被后端提供的数据替换，从而实现数据的动态展示。模板语法的具体实现和应用场景因不同的技术和框架而异，但基本原理相似。**





#### 插值表达式

~~~html
<span>Message: {{ msg }}</span>

~~~

msg会被替换成对应数据对象的属性msg的值。无论何时对象msg的值发生了改变，差值处的内容就会发生变化。

通过v-once指令，只执行一次插值，当数据改变时，差值处的内容不会更新。

~~~html
<span v-once>Message: {{ msg }}</span>

~~~



#### v-html

~~~html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

~~~

rawHtml值为：<span style="color: red">This should be red.</span>

这个 `span` 的内容将会被替换成为 property 值 `rawHtml`，直接作为 HTML——会忽略解析 property 值中的数据绑定。注意，你不能使用 `v-html` 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

**你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。**



#### v-bind

差值表达式不能直接作用于html属性上，遇到需要使用的情况可以使用v-bind指令。

~~~html
<div v-bind:id="dynamicId"></div>

<button v-bind:disabled="isButtonDisabled">Button</button>

~~~

对于布尔值属性，如果isButtonDisabled的值时null、undefined、false则不会显示button。



#### 差值表达式结合JavaScript表达式

~~~html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>

~~~

**模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。**



#### 动态参数

~~~html
<!--
注意，参数表达式的写法存在一些约束
attributeName会作为JavaScript表达式进行动态求值,取得的值会作为最终的参数使用
例如Vue实例中的data对象attributeName的值为href,则识别成v-bind:href
-->
<a v-bind:[attributeName]="url"> ... </a>

<!--
同样的,动态参数也可以为动态的事件绑定函数
当eventName的值为focus,等价于v-on:focus
-->
<a v-on:[eventName]="doSomething"> ... </a>


~~~

**动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。**

**动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：**

~~~html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>

~~~

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。



在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

~~~html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>

~~~



但是下面的按钮渲染出来了

~~~html
<div id="app-2">
        <button v-bind:[idDisabled]="isButtonDisabled">Button</button>
</div>

~~~

~~~javascript
var app2 = new Vue({
	el: "#app-2",
	data: {
		isButtonDisabled: '123',
		isDisabled: "disable"
	}
})

~~~





### 计算属性和侦听器



#### 计算属性

~~~html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>

~~~

模板内的插值表达式非常便利，设计的初衷是简单运算。从模板中放入太多的逻辑会让模板难以维护。对于任何复杂的属性，都应该使用计算属性。

~~~html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

~~~



~~~javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // this 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})

~~~



#### 计算属性缓存/方法

当计算属性比较大时，使用缓存会比较好。

~~~html
<p>Reversed message: "{{ reversedMessage() }}"</p>

~~~

~~~javascript
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}

~~~

通过上面的例子可以知道，在表达式中使用方法也能实现同样的效果。

不同的是计算属性是基于它的响应式依赖进行缓存的，只有在响应式的依赖发生改变时才会重新求值。

这就意味着message的值没有改变，多次访问reverseMessage计算属性会返回之前的计算结果，而不是再次执行函数。

~~~html
<div id="app-1">
        <p> {{message}}</p>
        <p> {{reverseMessage}}</p>
        <p> {{"now: " + now }}</p>
    </div>

~~~

~~~javascript
var app1 = new Vue({
            el: "#app-1",
            data: {
                message: "123"
            },
            computed: {
                reverseMessage: function () {
                    return this.message.split('').reverse().join('');
                },
                now: function () {
                   	// 这里的计算属性执行后就不会再执行,只有当页面再次刷新才会执行
                    return Date.now()
                }
            }
        })

~~~



#### 计算属性/侦听属性

Vue提供了一种更通用的方式来观察和响应实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用watch。更好的做法是使用计算属性，而不是命令式的watch回调。

~~~html
<div id="demo">{{ fullName }}</div>

~~~

~~~javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

~~~

计算属性实现

~~~javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})

~~~



#### 计算属性setter

计算属性默认只有getter，在需要时也可以提供setter。

~~~javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...

~~~



#### 侦听器

当需要在数据变化时执行异步或开销较大的操作时，watch提供了更通用的方法，来响应数据的变化。

~~~html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>

~~~

~~~html
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>

~~~



### Class和Style的绑定

我们可以使用v-bind指令来操作元素的class列表和内联样式。字符串拼接比较麻烦，当使用v-bind用于class和style样式时，Vue.js做了增强，除了字符串，还可以是对象或数组。



#### 绑定class



##### 对象语法

对象key的属性的值为true时，表示绑定这个key。

~~~json
{
    className: classValue(true/false),
    k1: v1,
    k2: v2
}

~~~



~~~html
<div v-bind:class="{ active: isActive }"></div>

~~~

~~~html
<style>
        .active{
            background: green;
        }
</style>

<div id="app-1">
    <!--isActive属性值为真时,激活activeclass选择器-->
	<div :class="{active: isActive}" style="height: 400px; width: 400px;">
		hi css
	</div>
</div>

    <script>
        var app1 = new Vue({
            el: "#app-1",
            data: {
                isActive: true
            }
        })
</script>

~~~



~~~html
<!--可以绑定多个class-->
class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"

~~~

~~~javascript
data: {
	isActive: true,
    hasError: true
}

~~~



也可以是计算属性对象

~~~html
<div v-bind:class="classObject"></div>

~~~

~~~javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

~~~



##### 数组语法

v-bind:class绑定一个class列表。



~~~html
<div v-bind:class="[activeClass, errorClass]"></div>

~~~

~~~json
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

~~~

结果为：<div class="active text-danger"></div>

数组中也可以使用对象语法：

~~~html
<!--activeClass-->在isActive为true时生效
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<div v-bind:class="[{ active: isActive }, errorClass]"></div>

~~~



##### 组件绑定

以下面声明的组件为例，p标签的class有foo、bar。当在自定义组件my-component上使用class属性时，这些class会被添加到根元素上，这个元素上面已经存在的class不会被覆盖。

~~~javascript
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

~~~

~~~html
<my-component class="baz boo"></my-component>

~~~

HTML被渲染为

~~~html
<p class="foo bar baz boo">Hi</p>

~~~

对于使用数据绑定的class同样适用。

~~~html
<my-component v-bind:class="{ active: isActive }"></my-component>

~~~





#### 绑定style

##### 对象语法

~~~html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

~~~

~~~javascript
data: {
  activeColor: 'red',
  fontSize: 30
}

~~~

绑定一个JavaScript对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名。

也可以直接这样写：

~~~html
<div v-bind:style="styleObject"></div>

~~~

~~~javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

~~~



##### 数组语法

v-bind:style(:style)数组语法可以将多个样式对象应用到同一个元素上。

~~~html
<div v-bind:style="[baseStyles, overridingStyles]"></div>

~~~



##### 自动添加前缀

当 v-bind:style 使用需要添加浏览器引擎前缀的CSS属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。



##### 多重值

从 2.3.0 起你可以为 `style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

~~~html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

~~~

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。



### 条件渲染

可以结合v-else、f-else-if一起使用。

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

~~~html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

~~~



在template元素上使用v-if条件渲染分组：在template上使用v-if，可以实现切换多个元素的渲染。

~~~html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

~~~



#### 用key管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

~~~html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>

~~~

在切换上面loginType时，将不会清空input中的输入的内容。因为两个模板使用了相同的元素，仅仅替换了了placeholder的值。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可：

~~~html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>

~~~

每次切换时，输入框都将被重新渲染。但是label标签任然会被高效地复用，因为没有添加key属性。



### 列表渲染

#### v-for中使用对象

~~~html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

~~~

~~~javascript
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})

~~~

可以使用可选参数第二表示属性名，第三个参数索引。

~~~html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>

~~~

**index的顺序不能保证在不同的JavaScript引擎下一致。**



#### 维护状态

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出，标签切换了，但是值还在**。

~~~html
<div id="app-1">
	<input v-for="(item, index) in list" :placeholder="item">
</div>

~~~

~~~javascript
var app1 = new Vue({
            el: "#app-1",
            data: {
                list: [
                    "addr",
                    "age",
                    "name"
                ]
            }
        })

~~~

![image-20240922194319054](http://47.101.155.205/image-20240922194319054.png)



![image-20240922194538466](http://47.101.155.205/image-20240922194538466.png)





#### 数组更新检测

Vue将被侦听的数组的变更方法进行了包裹，所以它们的更新触发了视图的更新。这些包裹的方法有：

1. push()
2. pop()
3. shift()
4. unshift()
5. splice()
6. sort()
7. reverse()

替换数组：使用filter()、concat()、slice()，它们不会变更原数组，会得到一个新的数组。当使用非变更方法，使用新数组代替旧数组：

~~~javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})

~~~

**你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。**



#### 注意事项

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。[深入响应式原理](https://v2.cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)中有相关的讨论。



#### 显示过滤/排序后的结果

我们需要显示一个数组经过过滤或排序后的版本，而不实际改变原数组。在这种情况下，可以使用计算属性。

~~~html
li v-for="n in evenNumbers">{{ n }}</li>

~~~

~~~javascript
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}

~~~



在计算属性不适用的情况下，例如：v-for嵌套使用。

这里也是利用了计算属性。

~~~html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>

~~~

~~~java
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}

~~~



#### 在template使用v-for

类似v-if，可以在template上使用v-for渲染一个包含多个元素的内容。

~~~html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>

~~~



#### v-for和v-if一起使用

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。**当你只想为部分项渲染节点时，这种优先级的机制会十分有用**，如下：

代码将只渲染未完成的 todo(todo.isComplete为null、undefined、false的)。

~~~html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>

~~~

而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 [`](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-中配合-v-if-条件渲染一整组)) 上。如：

~~~html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>

~~~



#### 组件使用v-for

在自定义的组件上，也可以像任何普通元素一样使用v-for。

~~~html
<my-component v-for="item in items" :key="item.id"></my-component>

~~~

**2.2.0+ 的版本里，当在组件上使用 `v-for` 时，`key` 现在是必须的。**

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop：

在组件定义prop属性item，挂载属性item。

~~~html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>

~~~

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。



下面的例子：is？、$emit？作用。

在 ul元素内只有li元素会被看作有效内容。这里之所以不适用todo-item标签，是为了避开一些潜在的浏览器解析错误。

表单submit提交默认事件禁用，只调用函数，作用是添加一个元素到数组中。

~~~html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>

~~~

~~~javascript
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

~~~



### 事件处理

#### 监听事件

可以使用v-on指令监听DOM事件，并触发一些可以执行的JavaScript代码。

~~~html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>

~~~

~~~javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})

~~~



#### 事件处理方法

对于简单的JavaScript代码，把它写在v-on指令中是可行的，但是当事件的处理逻辑复杂时，就需要其他方式来处理了。这里v-on可以接受一个调用的方法名。

~~~html
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>

~~~

~~~javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'

~~~



#### 内联处理器中的方法

绑定的方法传递参数。

~~~html
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>

~~~

~~~javascript
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})

~~~

访问原始的 DOM的Event对象。

~~~html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

~~~

~~~javascript
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}

~~~



#### 事件修饰符

相当于Event对象执行了其某些特定的方法。

1. .stop：阻止事件在dom中传播；阻止其他节点在当前节点的事件发生；不影响当前节点的其他事件；
2. .prevent：取消浏览器当前的默认行为;
3. .capture：
4. .self：
5. .once：事件只触发一次；
6. .passive：

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

~~~html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>

~~~



#### 按键修饰符

监听键盘时间时，需要检查详细的案件。Vue允许v-on指令中添加按键修饰符。

~~~html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

~~~

使用按键码也是支持的，例如：

~~~html
<input v-on:keyup.13="submit">

~~~

为了支持旧浏览器，Vue提供了大多数常用的按键码别名：

1. .enter
2. .tab
3. .delete
4. .esc
5. .space
6. .up
7. .down
8. .left
9. .right



你还可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名，例如：

~~~javascript
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112

~~~



#### 系统修饰键

**注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。**

1. .ctrl
2. .alt
3. .shift
4. .meta
5. .exact：修饰符允许你控制由精确的系统修饰符组合触发的事件。

~~~html
!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>

~~~

**请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。**

~~~html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>

~~~



#### 鼠标按钮修饰符

1. .left
2. .right
3. .middle







#### 为什么在html中监听事件

你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。



### 表单输入绑定

#### 基础用法

可以使用v-model指令在input、textare、select标签中创建双向数据绑定。

`v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

**v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。**

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

1. text和textarea元素使用value属性和input事件；
2. checkbox和radio使用checked属性和change事件；
3. select字段将value作为属性并将change作为事件。

~~~html
<!--文本-->
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

~~~

~~~html
<!--多行文本,<textarea>{{text}}</textarea>使用插值表达式不生效-->
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

~~~

~~~html
<!--单个复选框，绑定到布尔值-->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>

~~~

~~~html
<!--多个复选框，绑定到同一个数组-->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>

~~~

~~~html
<!--单选按钮-->
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

~~~

~~~html
<!--单选选择框-->
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

~~~

~~~html
<!--多选框,绑定到数组-->
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>

data{
	selected: []
}

~~~

~~~html
<!--v-for动态渲染复选框-->
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>

~~~



#### 值绑定

对于单选框、复选框、选择框的选项，v-model绑定的值通常是字符串(复选框也可以是布尔值)。

~~~html
<!-- 当选中时，picked 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- toggle为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，selected 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

~~~

有时可以将值绑定在Vue实例的动态属性上，可以使用v-bind指令实现，并且这个值可以不是字符串。



##### 复选框

~~~html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>

~~~

~~~javascript
// 当选中时
vm.toggle === 'yes'
// 当没有选中时
vm.toggle === 'no'

~~~

**这里的 true-value 和 false-value attribute 并不会影响输入控件的 value attribute，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(即“yes”或“no”)，请换用单选按钮。**



##### 单选按钮

~~~html
<input type="radio" v-model="pick" v-bind:value="a">

~~~

~~~javascript
// 当选中时
vm.pick === vm.a

~~~



##### 选择框选项

~~~html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>

~~~

~~~javascript
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123

~~~





#### 修饰符

.lazy

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 。你可以添加 lazy 修饰符，从而转为在 change 事件之后进行同步：

~~~html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">

~~~

.number

如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：

~~~html
<input v-model.number="age" type="number">

~~~

**这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。**

.trim

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

~~~html
<input v-model.trim="msg">

~~~



#### 在组件上使用v-model

HTML 原生的输入元素类型并不总能满足需求。幸好，Vue 的组件系统允许你创建具有完全自定义行为且可复用的输入组件。这些输入组件甚至可以和 `v-model` 一起使用！



### 组件基础

#### 基本示例

因为组件是可复用的Vue实例，所以它们与new Vue接受相同的选项，例如data、methods、computed、watch以及声明周期钩子等。仅有的例外是像`el`这样根实例特有的选项。

~~~javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  // 注意data是一个函数
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

~~~

~~~html
<div id="components-demo">
  <button-counter></button-counter>
</div>

~~~

~~~javascript
new Vue({ el: '#components-demo' })

~~~



#### 组件的复用

可以对组件进行任一次复用。当点击按钮时，每个组件都会各自维护它的count。因为每使用一次组件，就会有一个它的新实例被创建。

~~~html
<div id="components-demo">
	<button-counter></button-counter>
	<br>
<button-counter></button-counter>
</div>

<h1>区分</h1>
<div id="components-demo-1">
	<button-counter></button-counter>
</div>

~~~

~~~javascript
new Vue({ el: '#components-demo' })
new Vue({ el: '#components-demo-1' })

~~~



#### data必须是函数

一个组件的data必须是一个函数，因为每个实例可以维护一份被返回对象的独立拷贝。

~~~javascript
data: function () {
  return {
    count: 0
  }
}

~~~

data没有定义函数，浏览器有控制台有提示。

![image-20240923185734117](http://47.101.155.205/image-20240923185734117.png)





#### 组件的组织

通常应用会以一颗嵌套的组件树的形式来组织：

![image-20240923185734118](http://47.101.155.205/image-20240923185734118.png)

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能使用组件，这些组件必须先注册以便Vue能够识别。有两种组件的注册类型：全局注册和局部注册。

**Vue.component是全局注册。**

全局注册的组件可以用在其被注册之后的任何新创建的Vue根实例(new Vue)，也包括其组件树种的所有子组件的模板。



#### prop

通过prop向子组件传递数据。prop是你在组件上注册的一些自定义属性名。当一个值传递给一个prop属性时，它可以变成那个组件实例的一个属性。

~~~javascript
Vue.component('blog-post', {
  	// 定义属性title
  	props: ['title'],
  	template: '<h3>{{ title }}</h3>'
})

~~~

prop被注册后，它就可以通过这种方式将数据传递进来。

~~~html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>

~~~

以下实现效果同上。

~~~html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>

~~~

~~~javascript
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})

~~~





#### 单个根元素

~~~javascript
Vue.component('blog-post', {
            // 注意data是一个函数
            data: function () {
                return {
                    "title": "vue",
                    "content": "vue易学"

                }
            },
            template: '<h3>{{title}}</h3><div v-html="content"></div>'
            
        })
        new Vue({
            el: "#app-1"
        })

~~~

~~~html
<div id="app-1">
	<blog-post></blog-post>
</div>

~~~

![image-20240923192252365](http://47.101.155.205/image-20240923192252365.png)



每个组件只能由一个根元素。上面的问题，可以将模板的内容元素包裹在一个父元素内，来修复这个问题。

~~~html
<div>
    <h3>{{title}}</h3><div v-html="content"></div>
</div>

~~~



#### 监听子组件事件

~~~javascript
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
        {"title": "vue2", "content": "vue2学习", "id": 0},
		{"title": "vue3", "content": "vue3学习", "id": 1}
    ],
    postFontSize: 1
  }
})

~~~

~~~html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>

~~~

要想实现点击`Enlarge text`按钮，将字体的字号放大。Vue提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理native DOM事件一样通过v-on指令监听子组件的任意事件。

~~~html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
~~~

同时子组件通过调用内建的$emit方法传入事件名称来触发这个事件：

~~~html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>

~~~

**相当于子组件定义了一个click对外暴露的事件名，当这个事件被外部绑定时，相当于就绑定了原来的子组件事件回调的函数。**



##### 组件往外抛出值

~~~html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>

~~~

父级组件监听事件，同$event访问被抛出的值。

~~~html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>

~~~

~~~html
<!--当父组件绑定函数时,这个值会作为函数的实参-->
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>

<script>
    ...
	methods: {
  		onEnlargeText: function (enlargeAmount) {
    		this.postFontSize += enlargeAmount
  		}
	}
</script>

~~~



##### 组件上使用v-model

~~~html
<input v-model="searchText">
<!--等价于,$event代表事件,这里相当于input事件触发时,将当前节点的value复制给属性searchText-->
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>

~~~



先自定义custom-input组件：

~~~javascript
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

~~~

~~~html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>

~~~

需要注意的是：

1. 抛出的属性名需要叫value；
2. 事件的名称也需要叫input**不需要input名称，只是使用inputCom无法识别**。



#### 插槽

~~~javascript
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
    </div>
  `
})

~~~

~~~html
<alert-box>
  Something bad happened.
</alert-box>

~~~

上面的效果只有Error!文本。

~~~javascript
// 需要这样才有Error!123的效果
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
	<slot></slot>
    </div>
  `
})

~~~





#### 动态组件

使用component标签+is属性实现。

~~~html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>

~~~



~~~html
<style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
    </style>

~~~

~~~html
<div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>

      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>

~~~

~~~javascript
Vue.component("tab-home", {
        template: "<div>Home component</div>"
      });
      Vue.component("tab-posts", {
        template: "<div>Posts component</div>"
      });
      Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
      });

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          currentTab: "Home",
          tabs: ["Home", "Posts", "Archive"]
        },
        computed: {
          currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
          }
        }
      });

~~~





#### 解析DOM注意事项

有些html元素，例如ul、ol、table和select，对于哪些元素可以出现在其内是由严格要求的。而有些元素，例如li、tr和option只能出现在其它某些元素的内部。



~~~html
<!--这个自定义组件blog-post-row被视为无效的内容提升到外部-->
<table >
	<blog-post-row id="app"></blog-post-row>
</table>

<!--Vue提供了is属性来处理这种现象-->
<table>
  <tr is="blog-post-row"></tr>
</table>

~~~



![image-20240923204945966](http://47.101.155.205/image-20240923204945966.png)

~~~html
<script>

	Vue.component("blog-post-row", 
                  {template: "<div>Home component</div>"});

	var app = new Vue({
        el: "#app"
    })
</script>

~~~



如果是由以下来源使用模板，这条限制不存在：

1. 字符串，例如：template: ''；

2. 单文件组件：.vue文件；

3. ~~~vue
   <script type="text/x-template">
   ~~~





### 深入了解组件

#### 组件注册

##### 组件名

~~~javascript
// my-component-name就是组件名
Vue.component('my-component-name', { /* ... */ })

~~~

组件名规范：字母全小写且必须包含一个连字符，避免和当前以及未来的 HTML 元素相冲突。

组件名命名建议：https://v2.cn.vuejs.org/v2/style-guide/#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E5%90%8D%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90



定义组件名的两种方式：

1. kebab-case：字母全小写且必须包含一个连字符；
2. PascalCase：首字母大写驼峰命名。

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `` 和 `` 都是可接受的。注意，尽管如此，直接在 DOM (即**非字符串的模板**) 中使用时只有 kebab-case 是有效的。

**非字符串的模板是什么意思？**



##### 全局注册

~~~javascript
Vue.component('my-component-name', {
  // ... 选项 ...
})

Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })

~~~

~~~html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>

~~~

这些组件在注册之后可以用在任何新创建的Vue根实例(new Vue)的模板中。所有的子组件也是如此，三个组件可以在各自内部互相使用。





##### 局部注册

如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

~~~javascript
// 普通的 JavaScript 对象来定义组件
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }

// 然后在components中定义需要使用的组件
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
// 对于components对象,其属性名就是组件的名称,其属性值就是组件的的选项对象

~~~

**局部注册的组件在其子组件中不可使用**，例如上面的component-a不能和component-b互相使用，要使用需要这样写：

~~~javascript
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}

~~~



Babel 和 webpack 使用 ES2015 模块

~~~javascript
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
// 在对象中放一个类似 ComponentA 的变量名其实是 ComponentA: ComponentA 的缩写
// 用在模板中的自定义元素的名称；包含了这个组件选项的变量名

~~~





##### 模块系统

**模块系统局部注册**

~~~javascript
// 假设这里是ComponentB.js/ComponentB.vue文件
// 现在ComponentA和ComponentC都可以在ComponentB的模板中使用了。
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}

~~~



**基础组件的自动化全局注册**

可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为基础组件，它们会在各个组件中被频繁的用到。

所以会导致很多组件里都会有一个包含基础组件的长列表

~~~javascript
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}

~~~

~~~html
<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>

~~~

使用了 webpack或内部使用了webpack的Vue Cli3+，那么可以使用require.context只全局注册这些非常通用的基础组件。会有一份应用文件入口，例如src/main.js中导入基础组件的示例代码：

**全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生。**

~~~javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

~~~



#### Prop



##### Prop的大小写

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

~~~javascript
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})

~~~

~~~html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>

~~~

**如果你使用字符串模板，那么这个限制就不存在了。字符串模板什么意思？**



##### Prop类型

~~~javascript
// prop各自的名称和类型
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}

~~~



##### Prop传值(静态/动态)

~~~html
<!--静态的值-->
<blog-post title="My journey with Vue"></blog-post>

<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>

<!--数字-->
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>


<!--布尔值-->
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>


<!--数组-->
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>


<!--对象-->
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>


<!--传入对象的所有属性(将一个对象的所有 property 都作为 prop 传入)-->
post: {
  id: 1,
  title: 'My Journey with Vue'
}
<!--使用不带参数的 v-bind (取代 v-bind:prop-name-->
<blog-post v-bind="post"></blog-post>
<!--上下等价-->
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>

~~~





##### 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

~~~javascript
// prop传递初始值,这里用data属性counter来接收,如果不这样会怎么样?
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}

~~~

~~~javascript
// prop的原始值需要转换,定义prop的计算属性,不这样会怎么样?
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}

~~~





##### Prop验证

定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

**属性验证会在组件实例创建之前验证**

~~~javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})

~~~

类型检查，type可以是下列原生构造函数中的一个：

1. String
2. Number
3. Boolean
4. Array
5. Object
6. Date
7. Function
8. Symbol

也可以是自定义的构造函数，通过instanceof来进行检查。例如：

~~~javascript
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Vue.component('blog-post', {
  props: {
    author: Person
  }
})
// 验证属性author是否通过new Person()创建

~~~



##### 非Prop的Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

想象一下你通过一个 Bootstrap 插件使用了一个第三方的 `` 组件，这个插件需要在其 `` 上用到一个 `data-date-picker` attribute。我们可以将这个 attribute 添加到你的组件实例上：

~~~html
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>

~~~

然后这个 `data-date-picker="activated"` attribute 就会自动添加到`bootstrap-date-input`的根元素上。

`bootstrap-date-input`的模板如下：

~~~html
<input type="date" class="form-control">

<!--使用自定义组件-->
<!--为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名-->
<bootstrap-date-input
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>

~~~

在这种情况下，我们定义了两个不同的 `class` 的值：

1. 模板定义的class：form-control；
2. 组件的父级传入的：date-picker-theme-dark。

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被**合并**起来，从而得到最终的值：form-control date-picker-theme-dark。



###### 禁用attribute继承

**注意 inheritAttrs: false 选项不会影响 style 和 class 的绑定。**

如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。

~~~javascript
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})

~~~

这尤其适合配合实例的 `$attrs` property 使用，该 property 包含了传递给一个组件的 attribute 名和 attribute 值，例如：

~~~javascript
// 这里表达的意思是这个自定义的组件中的属性和属性值的关系变成了组件中$attrs对象的属性了
{
  required: true,
  placeholder: 'Enter your username'
}

~~~

有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写基础组件的时候是常会用到的：**为false**

~~~javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})

~~~

这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：

~~~html
<base-input
  label="Username:"
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>

~~~

![image-20240923220705078](http://47.101.155.205/image-20240923220705078.png)







#### 自定义事件

##### 事件名

不同于组件和prop的命名，事件名不存在大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。例如下面的自定义事件就需要使用v-on:myEvent来监听这个事件。

由于v-on事件监听器在DOM模板中会被自动转换成全小写(HTML是大小写不敏感的)，所以v-on:myEvent将会变成v-on:myevent，导致myEvent事件没有被监听到。

**事件命令建议使用kebab-case命名规则。**

~~~javascript
this.$emit('myEvent')

~~~



##### 自定义组件的v-model

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突：

~~~javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})

~~~

~~~html
<base-checkbox v-model="lovingVue"></base-checkbox>

~~~

这里lovingVue的值会传递到prop属性checked，当base-checkbox触发一个change事件并且附带一个新值时，这个lovingVue的值会被更新。



##### 将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符：

~~~html
<base-input v-on:focus.native="onFocus"></base-input>

~~~

假如上面base-input组件是这个模板：

~~~html
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>

~~~

这里监听的是一个类似input的元素，根元素是label标签。这个时候父级.native监听器将静默失败。不会产生任何报错，但是onFocus函数不会预期调用。

为了解决这个问题，Vue提供了$Listeners属性，它是一个对象，里面包含了作用在这个对象的所有监听器，例如：

~~~javas
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}

~~~

有个$listener属性，可以配合使用v-on=$listeners将所有的事件监听器指向这个组件的某个特定的子元素。

对于类似 <input> 的你希望它也可以配合 v-model 工作的组件来说，为这些监听器创建一个类似下述 inputListeners 的计算属性通常是非常有用的：

~~~javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // Object.assign将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合v-model 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})

~~~

现在` base-input` 组件是一个完全透明的包裹器了，也就是说它可以完全像一个普通的 <input> 元素一样使用了：所有跟它相同的 attribute 和监听器都可以工作，不必再使用 .native 监听器。



##### .sync修饰符

在某些情况下，可以需要对prop进行双向绑定。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

~~~javascript
this.$emit('update:title', newTitle)

~~~

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

~~~html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

~~~

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

~~~html
<text-document v-bind:title.sync="doc.title"></text-document>

~~~

**注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。**

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：

~~~html
<text-document v-bind.sync="doc"></text-document>

~~~

这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

**将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。**





#### 插槽

##### 插槽内容

Vue 实现了一套内容分发的 API，将 `slot` 元素作为承载分发内容的出口。

组件的模板代码：

~~~html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
~~~

~~~html
<!--这样使用组件-->
<navigation-link url="/profile">
  Your Profile
</navigation-link>

~~~

当组件渲染的时候，<slot></slot> 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML：

~~~html
<navigation-link url="/profile">
  <!-- 添加一个 Font Awesome 图标 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>

<navigation-link url="/profile">
  <!-- 添加一个图标的组件 -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>

~~~

**如果 `navigation-link` 的 template 中没有包含一个 `slot` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。**



##### 编译作用域

想在插槽中使用数据：

~~~html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>

~~~

该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 `navigation-link`的作用域。例如 url 是访问不到的：

~~~html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
  _传递给_ <navigation-link> 的而不是
  在 <navigation-link> 组件内部定义的。
  -->
</navigation-link>

~~~

**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**



##### 后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个 `submit-button`组件中：

~~~html
<!--submit-button模板-->
<button type="submit">
  <slot></slot>
</button>

~~~

我们可能希望这个 `button`内绝大多数情况下都渲染文本“Submit”。为了将“Submit”作为后备内容，我们可以将它放在 `slot`标签内：

~~~html
<button type="submit">
  <slot>Submit</slot>
</button>

~~~

现在当我在一个父级组件中使用 `submit-button`并且不提供任何插槽内容时：

~~~html
<submit-button></submit-button>

<!--后备内容渲染为-->
<button type="submit">
  Submit
</button>

<!--提供内容则会取代-->
<submit-button>Save</submit-button>

~~~



##### 具名插槽

~~~html
<!--base-layout组件模板代码-->
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>

~~~

对于这样的情况，`slot`元素有一个特殊的 attribute：name。这个 attribute 可以用来定义额外的插槽：

~~~html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

~~~

一个不带 name 的 `slot` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `template`元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

~~~html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

~~~

现在 `template` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 v-slot 的 `template` 中的内容都会被视为默认插槽的内容。

然而，如果你希望更明确一些，仍然可以在一个 `template` 中包裹默认插槽的内容：

~~~html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

~~~



最终结果：

~~~html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>

~~~

**注意 v-slot 只能添加在 `template`上 (只有一种例外情况)**



##### 作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `current-user` 组件：

~~~html
<span>
  <slot>{{ user.lastName }}</slot>
</span>

~~~

我们可能想换掉备用内容，用名而非姓来显示。如下：

~~~html
<!--使用插槽-->
<current-user>
  {{ user.firstName }}
</current-user>

~~~

然而上述代码不会正常工作，因为只有 `current-user` 组件可以访问到 user，而我们提供的内容是在父级渲染的。

为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 `slot`元素的一个 attribute 绑定上去：

~~~html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

~~~

绑定在 `slot` 元素上的 attribute 被称为插槽 prop。现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字：

~~~html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

~~~

在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 slotProps，但你也可以使用任意你喜欢的名字。



###### 独占默认插槽的缩写写法

在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot 直接用在组件上(**v-slot没有作用在template的情况**)：

~~~html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

~~~

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

~~~html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

~~~

注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确：

~~~html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>

~~~

只要出现多个插槽，请始终为所有的插槽使用完整的基于 `template`的语法：

~~~html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>

~~~



###### 解构插槽prop

作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里：

~~~html
function (slotProps) {
  // 插槽内容
}

~~~

这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop，如下：

~~~html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>

~~~

这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 user 重命名为 person：

~~~html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>

~~~

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

~~~html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>

~~~



##### 动态插槽名

动态指令参数也可以用在 v-slot 上，来定义动态的插槽名：

~~~html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>

~~~



##### 具名插槽缩写

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header：

~~~html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

~~~

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

~~~html
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>

~~~

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

~~~html
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>

~~~



##### 其它实例

插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。这在设计封装数据逻辑同时允许父级组件自定义部分布局的可复用组件时是最有用的。

例如，我们要实现一个 `todo-list` 组件，它是一个列表且包含布局和过滤逻辑：

~~~html
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>

~~~

我们可以将每个 todo 作为父级组件的插槽，以此通过父级组件对其进行控制，然后将 todo 作为一个插槽 prop 进行绑定：

~~~html
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>

~~~

现在当我们使用 `todo-list` 组件的时候，我们可以选择为 todo 定义一个不一样的 `template`作为替代方案，并且可以从子组件获取数据：

~~~html
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>

~~~

这只是作用域插槽用武之地的冰山一角。想了解更多现实生活中的作用域插槽的用法，我们推荐浏览诸如 [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)、[Vue Promised](https://github.com/posva/vue-promised) 和 [Portal Vue](https://github.com/LinusBorg/portal-vue) 等库。



#### 动态组件&异步组件



##### 动态组件上使用keep-alive

我们之前在一个多标签的界面中使用 is attribute 来切换不同的组件：

~~~html
<component v-bind:is="currentTabComponent"></component>

~~~

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重新渲染导致的性能问题。例如我们来展开说一说这个多标签界面：

你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。

重新创建动态组件的行为通常是非常有用的，但是在这个案例中，我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `keep-alive` 元素将其动态组件包裹起来。

~~~html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>

~~~



~~~html
<div id="dynamic-component-demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>

      <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab"></component>
      </keep-alive>
    </div>

~~~

~~~javascript
Vue.component("tab-posts", {
        data: function() {
          return {
            posts: [
              {
                id: 1,
                title: "Cat Ipsum",
                content:
                  "<p>Dont wait for the storm to pass, dance in the rain kick up litter decide to want nothing to do with my owner today demand to be let outside at once, and expect owner to wait for me as i think about it cat cat moo moo lick ears lick paws so make meme, make cute face but lick the other cats. Kitty poochy chase imaginary bugs, but stand in front of the computer screen. Sweet beast cat dog hate mouse eat string barf pillow no baths hate everything stare at guinea pigs. My left donut is missing, as is my right loved it, hated it, loved it, hated it scoot butt on the rug cat not kitten around</p>"
              },
              {
                id: 2,
                title: "Hipster Ipsum",
                content:
                  "<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>"
              },
              {
                id: 3,
                title: "Cupcake Ipsum",
                content:
                  "<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>"
              }
            ],
            selectedPost: null
          };
        },
        template: `
  	<div class="posts-tab">
      <ul class="posts-sidebar">
        <li
          v-for="post in posts"
          v-bind:key="post.id"
          v-bind:class="{ selected: post === selectedPost }"
					v-on:click="selectedPost = post"
        >
          {{ post.title }}
        </li>
      </ul>
      <div class="selected-post-container">
      	<div
        	v-if="selectedPost"
          class="selected-post"
        >
          <h3>{{ selectedPost.title }}</h3>
          <div v-html="selectedPost.content"></div>
        </div>
        <strong v-else>
          Click on a blog title to the left to view it.
        </strong>
      </div>
    </div>
  `
      });

      Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
      });

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          currentTab: "Posts",
          tabs: ["Posts", "Archive"]
        },
        computed: {
          currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
          }
        }
      });

~~~



##### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如：

~~~javascript
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

~~~

如你所见，这个工厂函数会收到一个 resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。你也可以调用 reject(reason) 来表示加载失败。这里的 setTimeout 是为了演示用的，如何获取组件取决于你自己。一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：

~~~javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

~~~

你也可以在工厂函数中返回一个 Promise，所以把 webpack 2 和 ES2015 语法加在一起，我们可以这样使用动态导入：

~~~javascript
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

~~~

当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：

~~~javascript
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

~~~



###### 处理加载情况

这里的异步组件工厂函数也可以返回一个如下格式的对象：

~~~javascript
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})

~~~



#### 处理边界情况

这里记录的都是和处理边界情况有关的功能，即一些需要对 Vue 的规则做一些小调整的特殊情况。不过注意这些功能都是有劣势或危险的场景的。

##### 访问元素&组件

在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。



###### 访问根实例

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问。例如，在这个根实例中：

~~~javascript
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})

~~~

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

~~~javascript
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()

~~~

**对于 demo 或非常小型的有少量组件的应用来说这是很方便的。不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 Vuex 来管理应用的状态。**



###### 访问父级组件实例

和 `$root` 类似，`$parent` property 可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。

**在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。**

另外在一些可能适当的时候，你需要特别地共享一些组件库。举个例子，在和 JavaScript API 进行交互而不渲染 HTML 的抽象组件内，诸如这些假设性的 Google 地图组件一样：

~~~html
<google-map>
  <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
</google-map>

~~~

这个 `` 组件可以定义一个 `map` property，所有的子组件都需要访问它。在这种情况下 `` 可能想要通过类似 `this.$parent.getMap` 的方式访问那个地图，以便为其添加一组标记。你可以在[这里](https://codesandbox.io/s/github/vuejs/v2.vuejs.org/tree/master/src/v2/examples/vue-20-accessing-parent-component-instance)查阅这种模式。

请留意，尽管如此，通过这种模式构建出来的那个组件的内部仍然是容易出现问题的。比如，设想一下我们添加一个新的 `google-map-region` 组件，当 `google-map-markers` 在其内部出现的时候，只会渲染那个区域内的标记：

~~~html
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>

~~~

那么在 `google-map-markers`内部你可能发现自己需要一些类似这样的 hack：

~~~javascript
var map = this.$parent.map || this.$parent.$parent.map

~~~

很快它就会失控。这也是我们针对需要向任意更深层级的组件提供上下文信息时推荐[依赖注入](https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#依赖注入)的原因。



###### 访问子组件实例或子元素



###### 依赖注入



##### 程序化的事件侦听器



##### 循环引用



###### 递归组件



###### 组件之间的循环引用



##### 模板定义的替代品



###### 内联模板



###### X-Template



##### 控制更新



###### 强制更新



###### 通过 v-once 创建低开销的静态组件



### 单文件组件

#### 介绍

前面的例子都是通过Vue.component来定义全局组件，或者new Vue()的方式来注册局部组件。这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

1. 全局定义 (Global definitions) 强制要求每个 component 中的命名不得重复
2. 字符串模板 (String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
3. 不支持 CSS (No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
4. 没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 .vue 的 single-file components (单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。



~~~vue
<template>

</template>

<script>

</script>

<style>

</style>

~~~

https://codesandbox.io/p/sandbox/o29j95wx9





#### 怎么看待关注点分离？

一个重要的事情值得注意，关注点分离不等于文件类型分离。在现代 UI 开发中，我们已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。

即便你不喜欢单文件组件，你仍然可以把 JavaScript、CSS 分离成独立的文件然后做到热重载和预编译。

~~~html
<!-- my-component.vue -->
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>

~~~





## 规模化

### 路由

vue-router官网：https://router.vuejs.org/

#### 从零开始简单的路由

~~~javascript
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})

~~~

实例应用：https://github.com/chrisvfritz/vue-2.0-simple-routing-example



~~~bash
# 安装依赖
cnpm install

# 热部署启动
npm run dev


~~~





#### 整合第三方路由

Page.js示例：https://github.com/chrisvfritz/vue-2.0-simple-routing-example/tree/pagejs







## 特殊属性

### key

https://v2.cn.vuejs.org/v2/api/#key

