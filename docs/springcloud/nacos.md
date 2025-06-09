# nacos

git地址：https://github.com/alibaba/nacos.git

nacos2.x官网文档：https://nacos.io/docs/v2/what-is-nacos/

## nacos构建

### 源码打包

~~~bash
# 获取远程仓库的所有标签到本地
git fetch --tags

# 会一直占用一个进程
git tag -l

# 选中指定的tag
git checkout tags/2.2.3

# 可以新建一个分支

~~~

![image-20240808110220716](http://47.101.155.205/image-20240808110220716.png)



~~~bash
# 执行命令
mvn -Prelease-nacos -Dmaven.test.skip=true clean install -U

# https://support.huaweicloud.com/codeci_faq/codeci_faq_1003.html
# 添加参数解决apache-rat:check -Drat.numUnapprovedLicenses=600
mvn apache-rat:check -Drat.numUnapprovedLicenses=600 -Prelease-nacos -Dmaven.test.skip=true clean install -U


~~~

![image-20240808111343189](http://47.101.155.205/image-20240808111343189.png)

![image-20240808111507996](http://47.101.155.205/image-20240808111507996.png)

![image-20240808111626150](http://47.101.155.205/image-20240808111626150.png)

![image-20240808112511249](http://47.101.155.205/image-20240808112511249.png)

![image-20240808112719228](http://47.101.155.205/image-20240808112719228.png)



### 安装

~~~bash
# linux解压缩安装
tar -xvf nacos-server-2.2.3.tar.gz

~~~

![image-20240808131038314](http://47.101.155.205/image-20240808131038314.png)



### 启动

~~~bash
./startup.sh -m standalone


~~~

![image-20240808164953730](http://47.101.155.205/image-20240808164953730.png)

包含了一个错误的字符，即 ^M。^M 是表示回车符（Carriage Return, CR）的符号，这通常发生在你在 Windows 环境中编辑了这个脚本，然后在 Linux/Unix 系统中运行它。

~~~ bash
vim startup.sh

# vim中执行后保存
:set fileformat=unix
:wq

~~~

![image-20240809092545905](http://47.101.155.205/image-20240809092545905.png)

![image-20240809110648741](http://47.101.155.205/image-20240809110648741.png)



~~~bash
#!/bin/bash
cygwin=false
darwin=false
os400=false
# ``执行反引号中的命令并将输出结果替换为命令输出
case "`uname`" in
CYGWIN*) cygwin=true;;
Darwin*) darwin=true;;
OS400*) os400=true;;
esac
error_exit ()
{
    echo "ERROR: $1 !!"
    exit 1
}
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=$HOME/jdk/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/usr/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/opt/taobao/java
[ ! -e "$JAVA_HOME/bin/java" ] && unset JAVA_HOME

if [ -z "$JAVA_HOME" ]; then
  if $darwin; then

    if [ -x '/usr/libexec/java_home' ] ; then
      export JAVA_HOME=`/usr/libexec/java_home`

    elif [ -d "/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home" ]; then
      export JAVA_HOME="/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home"
    fi
  else
    # 在$PATH目录下查找javac命令位置的绝对路径,dirname将/usr/local/bin/javac转换成/usr/local/bin
    JAVA_PATH=`dirname $(readlink -f $(which javac))`
    if [ "x$JAVA_PATH" != "x" ]; then
	  # export将变量JAVA_HOME导入进程环境,2>/dev/null表示出现错误不会在控制台打印
      export JAVA_HOME=`dirname $JAVA_PATH 2>/dev/null`
    fi
  fi
  if [ -z "$JAVA_HOME" ]; then
        error_exit "Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better!"
  fi
fi

export SERVER="nacos-server"
export MODE="cluster"
export FUNCTION_MODE="all"
export MEMBER_LIST=""
export EMBEDDED_STORAGE=""
while getopts ":m:f:s:c:p:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done

export JAVA_HOME
export JAVA="$JAVA_HOME/bin/java"
# dirname $0 获取shell脚本所在目录
export BASE_DIR=`cd $(dirname $0)/..; pwd`
export CUSTOM_SEARCH_LOCATIONS=file:${BASE_DIR}/conf/

#===========================================================================================
# JVM Configuration
#===========================================================================================
if [[ "${MODE}" == "standalone" ]]; then
    JAVA_OPT="${JAVA_OPT} -Xms512m -Xmx512m -Xmn256m"
    JAVA_OPT="${JAVA_OPT} -Dnacos.standalone=true"
else
    if [[ "${EMBEDDED_STORAGE}" == "embedded" ]]; then
        JAVA_OPT="${JAVA_OPT} -DembeddedStorage=true"
    fi
    JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
    JAVA_OPT="${JAVA_OPT} -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${BASE_DIR}/logs/java_heapdump.hprof"
    JAVA_OPT="${JAVA_OPT} -XX:-UseLargePages"

fi

if [[ "${FUNCTION_MODE}" == "config" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=config"
elif [[ "${FUNCTION_MODE}" == "naming" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=naming"
fi

JAVA_OPT="${JAVA_OPT} -Dnacos.member.list=${MEMBER_LIST}"
# java -version 通常会将版本信息输出到标准错误流,2>&1标准错误输出(文件描述符2)重定向到标准输出(文件描述符1)
JAVA_MAJOR_VERSION=$($JAVA -version 2>&1 | sed -E -n 's/.* version "([0-9]*).*$/\1/p')
if [[ "$JAVA_MAJOR_VERSION" -ge "9" ]] ; then
  JAVA_OPT="${JAVA_OPT} -Xlog:gc*:file=${BASE_DIR}/logs/nacos_gc.log:time,tags:filecount=10,filesize=100m"
else
  JAVA_OPT_EXT_FIX="-Djava.ext.dirs=${JAVA_HOME}/jre/lib/ext:${JAVA_HOME}/lib/ext"
  JAVA_OPT="${JAVA_OPT} -Xloggc:${BASE_DIR}/logs/nacos_gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M"
fi

JAVA_OPT="${JAVA_OPT} -Dloader.path=${BASE_DIR}/plugins,${BASE_DIR}/plugins/health,${BASE_DIR}/plugins/cmdb,${BASE_DIR}/plugins/selector"
JAVA_OPT="${JAVA_OPT} -Dnacos.home=${BASE_DIR}"
JAVA_OPT="${JAVA_OPT} -jar ${BASE_DIR}/target/${SERVER}.jar"
JAVA_OPT="${JAVA_OPT} ${JAVA_OPT_EXT}"
JAVA_OPT="${JAVA_OPT} --spring.config.additional-location=${CUSTOM_SEARCH_LOCATIONS}"
JAVA_OPT="${JAVA_OPT} --logging.config=${BASE_DIR}/conf/nacos-logback.xml"
JAVA_OPT="${JAVA_OPT} --server.max-http-header-size=524288"
# -d 目录存在为true
if [ ! -d "${BASE_DIR}/logs" ]; then
  mkdir ${BASE_DIR}/logs
fi

echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}"

if [[ "${MODE}" == "standalone" ]]; then
    echo "nacos is starting with standalone"
else
    echo "nacos is starting with cluster"
fi

# check the start.out log output file 普通文件
if [ ! -f "${BASE_DIR}/logs/start.out" ]; then
  touch "${BASE_DIR}/logs/start.out"
fi
# start &表示后台执行,将启动命令相关参数记录到日志
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &

if [[ "$JAVA_OPT_EXT_FIX" == "" ]]; then
  nohup "$JAVA" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
else
  nohup "$JAVA" "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
fi

echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"

~~~





## 开启登录功能

修改conf/application.properties配置文件，修改之后不用重启即可生效

nacos

nacosoycm

~~~properties
nacos.core.auth.system.type=nacos
nacos.core.auth.enabled=true
nacos.core.auth.enable.userAgentAuthWhite=false

nacos.core.auth.server.identity.key=example
nacos.core.auth.server.identity.value=example

# 密钥
nacos.core.auth.plugin.nacos.token.secret.key=$2a$10$9UwgOKr3S2Kj4TF4UUVYKO.LW6DE/JItfEyMDllZtj1MHRP61Ep0y

~~~

