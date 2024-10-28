## shell脚本介绍

脚本：脚本是一个文本文件，包含了一系列要执行的命令和控制结构（如条件语句和循环）

~~~bash
#!/bin/bash
# 脚本文件要以上面开始,.sh结尾的文件不需要

~~~

~~~bash
# 赋权文件可执行权限
chmod +x <fileName>

~~~

~~~bash
# 获取java jar包启动的进程id
ps -ef | grep *.jar | grep -v grep | awk '{print $2}'

~~~

## shell变量
变量命名规则：
1. 只能包含字母、数字、下划线；
2. 不能以数字开口，可以包含数字；
3. 不能使用Shell的关键字作为变量名( if、then、else、fi、for、while)
4. 使用大写字母表示常量；
5. **变量赋值不能使用空格，例如：PID="pid"；**

### 使用变量
~~~bash
#!/bin/bash
PID="pid"
# 使用命令执行结果作为变量，`命令`执行命令，将命令的结果作为返回
# grep -v grep
P1=`ps -ef | grep ${jarName} | grep -v grep | awk '{print $2}'`
P1=`ps -ef | grep ${jarName} | grep -v grep | awk "{print $2}"` 
P2="`ps -ef | grep ${jarName} | grep -v grep | awk '{print $2}'`
# $(命令)用法同`命令`
PID=$(ps -ef | grep *.jar | grep -v grep | awk '{print $2}')

# 使用变量
echo $PID
echo "P1=$PID"
echo 'P2=$PID'
# 特殊字符'要成对(转义)
echo 'P3=''$PID'
echo ${PID}

# 设置只读
only_read="Java"
readonly only_read
#会有提示
only_read="python" 

# 删除变量(不能删除只读变量)
unset only_read
echo ${only_read}

~~~
![在这里插入图片描述](http://47.101.155.205/d730ac9df94b0c61f47846586ec1da34.png)



~~~bash
name="zhangsan"
# 这里${nmae}或$name会把值当成变量来获取
echo "name: ${name}"

~~~

### 变量类型
#### 字符串
在 Shell中，变量通常被视为字符串。
可以使用''或""来定义变量
**单引号字符串的限制：**
单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
单引号字符串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。
**双引号的优点：**
双引号里可以有变量；
双引号里可以出现转义字符。

~~~bash
# 字符串变量
s1="Hello World"
s2='Hello World'
# 输出结果P3=$PID，成对出现相当于拼接字符串
echo 'P3=''$PID' 

~~~

获取字符串长度
~~~bash
# 获取字符串长度 
${#变量名}
${#变量名[0]}
name="zs"
echo ${#name}

~~~

**截取字符串**

~~~bash
# 索引是从0开始，string字符串第二个字符开始，截取4个字符
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo

~~~

**查找子字符串**

~~~bash
# 查找字符 i 或 o 的位置(哪个字母先出现就计算哪个，从1开始计算)
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4

~~~
#### 整数变量
~~~bash
declare -i age=42

~~~

#### 数组变量
~~~bash
array=(1 2 3 4 5)

declare -A associative_array
associative_array["name"]="John"
associative_array["age"]=30

# 单独定义数组的各个分量 
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen

~~~

**读取数组**

~~~bash
${数组名[下标]}
${array_name[0]}

# 使用@获取数组所有元素
echo ${array_name[@]}

~~~

~~~bash
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
length=${#array_name[n]}

~~~


#### 环境变量
由操作系统或用户设置的特殊变量，用于配置 Shell 的行为和影响其执行环境。
~~~bash
echo $变量名

echo $JAVA_HOME

~~~



#### 特殊变量
有一些特殊变量在 Shell 中具有特殊含义，例如 $0 表示脚本的名称，$1, $2, 等表示脚本的参数。


## 运算符
### 算数运算符
原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
**注意：**
==表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2；==
==完整表达式需要\`\`包裹；==
==\`\`执行反引号中的命令并将输出结果替换为命令输出。==
~~~bash
val=`expr 2 + 2`
echo "两数之和为 : $val"

~~~
![在这里插入图片描述](http://47.101.155.205/492894b7369247679a45e62301e9aaf3.png)

### 关系运算符
关系运算符只支持数字，不支持字符串，除非字符串的值是数字。
![在这里插入图片描述](http://47.101.155.205/5aa0d4cfe955418e928a605938b5ae3f.png)


### 布尔运算符
![在这里插入图片描述](http://47.101.155.205/b6a9a643c1fc4ac4b306988905e04309.png)

### 逻辑运算符
![在这里插入图片描述](http://47.101.155.205/f019d830ec2f4bf2ab11bb1381b0d745.png)
### 字符串运算符

~~~bash
# -n 对变量字符串长度校验加引号,否则 TEMP="" [ -n ${TEMP} ]结果为true
TEMP=""
[ -n $TEMP ] # 结果true
# 正确写法
[ -n "$TEMP"] # 结果false

# = 比较注意,比较的变量没有被定义或定义为空字符串,比较会失效,提示[: =: 期待一元表达式
[ $a = $b ]
# 正确写法
[ "$a" = "$b" ]


~~~



![在这里插入图片描述](http://47.101.155.205/980f6465f02a4854bbb31d4c76eeff46.png)
### 文件测试运算符
![在这里插入图片描述](http://47.101.155.205/cecf2d5e31e649afa93941d590b2930e.png)



## 流程语句
### if流程
#### if
~~~bash
#!/bin/sh
if condition
then
    command1 
    command2
    ...
    commandN 
fi

~~~

~~~bash
#!/bin/sh
#!/bin/bash

cygwin=false
darwin=false
os400=false
case "CYGWINCYGWIN" in
CYGWIN*) cygwin=true;;
Darwin*) darwin=true;;
OS400*) os400=true;;
*)
	echo `uname`
;;
esac

if $cygwin; then
    echo "cygwin true";
fi

# 结果cygwin true
~~~

#### if-else
~~~bash
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi

~~~

#### if else-if else
~~~bash
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

~~~

### case
类似其他编程语言的switch语句。
~~~bash
# 语法
# expression 待匹配的值(变量、命令的输出)
# pattern1,pattern2... 匹配值,可以是字符串、正则表达式
# statements1,statements2... 匹配成功待执行的命令
# *表示默认匹配模式
case expression in
    pattern1)
        statements1
        ;;
    pattern2)
        statements2
        ;;
    ...
    patternN)
        statementsN
        ;;
    *)
        default_statements
        ;;
esac

~~~
~~~bash
#!/bin/bash

~~~

### for循环
~~~bash
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

~~~

### while循环
~~~bash
while condition
do
    command
done


~~~

~~~bash
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done

~~~

~~~bash
# :表示启用getopts的错误处理模式,如果遇到未知选项,opt的值会变成?,而不是输出错误信息
# m:表示该选项需要一个参数,-m选项之后必须跟一个值
# $OPTARG表示后面跟的值
while getopts ":m:f:s:c:p:" opt
do
    case $opt in
        m)
            echo $OPTARG;;
        f)
            echo $OPTARG;;
        s)
            echo $OPTARG;;
        c)
            echo $OPTARG;;
        p)
            echo $OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done


~~~





## 函数
参数返回，可以显示加：return 返回值，如果不加，将以最后一条命令运行结果，作为返回值。 return 后跟数值 n(0-255)。
函数返回值在调用该函数后通过` $? `来获得。
注意：
所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至shell解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。
**调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个。**
**\$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。**



~~~bash
# 定义函数语法
[ function ] funname [()]
{	
	# $1使用函数的实参
    action;
    [return int;]
}

~~~

![在这里插入图片描述](http://47.101.155.205/4e67f033103340e88631174fe54f50c8.png)



函数返回值注意：**0表示true；非0代表false**。

~~~bash
#!/bin/sh

COMMAND=$1
# 脚本执行第一个参数不为空
if [ -n "$COMMAND" ] 
then
  echo $COMMAND
 fi

checkRunning() {
  COMMAND=$1
  # 参数为nginx
  if [ "$COMMAND" = "nginx" ]
  then
    PID=$(ps -ef | awk '/nginx: *master/{print $2; exit}')
	if [ PID ]
	then
		echo $PID
		echo "${COMMAND} is running"
		return "0";
	else
	  echo "${COMMAND} is not running"
	  return "1";
	fi
  elif [ $COMMAND ]
  then
    PID=$(ps -ef | grep ${COMMAND} | grep -v grep | awk '{print $2}')
	if [ -n "$PID" ]
	then
	  echo $PID
	  echo "${COMMAND} is running"
	  return "0";
	else
	  echo "${COMMAND} is not running"
	  return "1";
	fi
  else
    echo "arg is null"
	return "1";
  fi
	
}
if checkRunning ${COMMAND}
then
  echo "true"
else
  echo "false"
fi

~~~



执行shell提示：/bin/sh^M: 坏的解释器: 没有那个文件或目录

解决方法

~~~bash
# 执行命令
sed -i 's/\r$//' <shell.sh>

~~~







## shell命令

### shell_1
~~~bash
#!/bin/sh

SERVICE_NAME="lgsa-portRelease-mgr"

ENVFILE="../env"

PIDFILE="pid"

checkRunning(){
    if [ -f "$PIDFILE" ]; then
       if  [ -z "`cat $PIDFILE`" ];then
        echo "ERROR: Pidfile '$PIDFILE' exists but contains no pid"
        return 2
       fi
       PID="`cat ${PIDFILE}`"
       RET="`ps -p "${PID}"|grep java`"
       if [ -n "$RET" ];then
	 echo "${RET}"
         return 1;
       else
         return 0;
       fi
    else
         return 0;
    fi
}

status(){
    if ( checkRunning );then
         PID="`cat $PIDFILE`"
         echo "'$SERVICE_NAME' is running (pid '$PID')"
         exit 0
    fi
    echo "'$SERVICE_NAME' not running"
    exit 1
}


#启动方法
start(){
    if ( checkRunning );then
      PID="`cat $PIDFILE`"
      echo "INFO: Process with pid '$PID' is already running"
      exit 0
    fi
	ENVIRONMENT="`cat ${ENVFILE}`"
    java -jar -Xms64M -Xmx512M -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5105 -Dspring.config.location=config-${SERVICE_NAME}/application-${ENVIRONMENT}.yml -Dlogging.config=config-${SERVICE_NAME}/log4j2.xml  ${SERVICE_NAME}-0.0.1-SNAPSHOT.jar --spring.profiles.active=${ENVIRONMENT} > console.log 2>&1 &
    echo $! > "${PIDFILE}";
}
#停止方法
stop(){
    if ( checkRunning ); then
       PID="`cat ${PIDFILE}`"
       echo "INFO: sending SIGKILL to pid '$PID'"
       kill -KILL $PID
       RET="$?"
       rm -f "${PIDFILE}"
       return $RET
    fi
    echo "INFO: not running, nothing to do"
    return 0
}

show_help() {
    cat << EOF
Tasks provided by the sysv init script:
    stop            - terminate instance in a drastic way by sending SIGKILL
    start           - start new instance
    restart         - stop running instance (if there is one), start new instance
    status          - check if '$SERVICE_NAME' process is running
EOF
  exit 1
}

# show help
if [ -z "$1" ];then
 show_help
fi

case "$1" in
  status)
    status
    ;;
  restart)
    if ( checkRunning );then
      $0 stop
      echo
    fi
    $0 start
    $0 status
    ;;
  start)
    start
    ;;
  stop)
    stop
    exit $?
    ;;
  *)
esac

~~~