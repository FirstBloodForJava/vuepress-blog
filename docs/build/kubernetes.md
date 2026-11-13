# Kubernetes 入门

使用 K8s 的前置知识：

- Docker 核心：镜像（Image）、容器（Container）、Dockerfile、docker run 基本用法。要能自己构建并运行一个简单镜像。
- YAML 基础：缩进、键值对、列表。K8s 的资源配置几乎全是 YAML，缩进错一位就可能报错。
- Linux 与网络常识：进程、端口、DNS、基本排查命令（ps、ss、curl）。



快速入门需要了解的组件：

| 资源对象/组件  | 说明                                                         |      |
| -------------- | ------------------------------------------------------------ | ---- |
| Master         | Kubernetes 里的 Master 指的是集群控制节点， 每一个 Kubernetes 集群里都必须要有一个 Master  节点来负责整个集群的管理和控制，<br /> 基本上 Kubernetes 的所有控制命令都发给它， 它来负责具体的执行过程， 我们后面执行的所有命令基本都是在 Master 节点上运行的。 |      |
| Node(WorkNode) | Node 是一个运行着 Kubernetes 节点软件的物理机器或虚拟机。每个 Node 负责运行 Pod 中的容器，<br />并由 Kubernetes 控制平面管理。Node 是 Kubernetes 集群中的工作节点，它实际执行应用程序工作负载并提供运行环境。 |      |
| api-server     | api-server 是集群的核心， 是k8s中最重要的组件， 因为它是实现声明式 api 的关键。 |      |
| etcd           | etcd 是兼具一致性和高可用性的键值数据库， 可用于服务发现以及配置中心。 采用 raft 一致性算法， 基于 Go 语言实现。 是保存 Kubernetes 所有集群数据的后台数据库。 |      |
| kube-scheduler | kube-scheduler 是 kubernetes 系统的核心组件之一， 主要负责整个集群资源的调度功能， 根据特定的调度算法和策略， <br />将 Pod 调度到最优的工作节点上面去， 从而更加合理、 更加充分地利用集群的资源。 |      |
|                |                                                              |      |
|                |                                                              |      |
| deployment     |                                                              |      |
| ReplicaSet     |                                                              |      |
| Service        | Service 是将运行在一个或一组 Pod 上的网络应用程序公开为网络服务的方法。 |      |
| Pod            | Pod 是 Kubernetes中最小的可部署单元，中文可以翻译为 “容器组”。它是用于承载和管理容器的抽象层。<br/>一个 Pod 可以包含一个或多个紧密关联的容器，它们共享相同的网络命名空间、IP 地址和存储卷，并在同一个宿主机上运行。 |      |
| ConfigMap      | ConfigMap 是一种 API 对象，用来将非机密性的数据保存到键值对中。使用时，Pod 可以将其用作环境变量、<br/>命令行参数或者存储卷中的配置文件。ConfigMap 将你的环境配置信息和容器镜像解耦， 便于应用配置的修改。 |      |
| kubelet        |                                                              |      |
|                |                                                              |      |



## 组件

### Master



~~~bash
# k3s 存放 token 的地址
/var/lib/rancher/k3s/server/node-token

~~~







### Node








~~~yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-config-a1b2c3d4e5f6
  namespace: default # 默认是 default 命名空间
data:
  application-order.yaml: |
    order:
      timeout-ms: 5000
      feature-x-enabled: true
~~~

~~~bash
# 根据文件配置创建资源
k create -f source.yaml
~~~





### deployment

根据镜像创建一个 deployment

`kubectl create deployment NAME --image=image -- [COMMAND] [args...] [options]`

| 参数       | 作用                       |
| ---------- | -------------------------- |
| `--image=` | 指定的镜像，可以是多个     |
| `--port=`  | 部署容器暴露的端口         |
| `-r=1`     | 要创建的副本数量，默认为 1 |
|            |                            |
|            |                            |
|            |                            |
|            |                            |
|            |                            |
|            |                            |



- spec:
  - replicas：副本数
  - strategy.type：
    - `Recreate`：先杀旧 Pod 再起新 Pod，升级期间有停机窗口。
  - 





### ReplicaSet



### Service



~~~yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app:    # 关键：通过标签选择器关联 Pod
  ports:
    - protocol: TCP
      port: 80          # Service 自身暴露的端口
      targetPort: 8080  # Pod 容器监听的端口
~~~





### Pod





### ConfigMap

**使用命令根据文件创建 ConfigMap 的配置文件：**

~~~bash
# 生成清单但不落地，key 默认为文件名 application.yml, configmap 名为 order-config
kubectl create configmap order-config --from-file=application.yml --dry-run=client -o yaml > configmap.yaml
kubectl create configmap order-config \
  --from-file=application.yml \
  --dry-run=client -o yaml > configmap.yaml

~~~

` kubectl create configmap NAME [--from-file=[key=]source] [--from-literal=key1=value1] [--dry-run=server|client|none]`

| 参数                           | 作用                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `--append-hash=false`          | 是否在文件名称后面添加 hash 值                               |
| `--dry-run=none/client/server` | none 在远程会创建一个 ConfigMap(同缺省)<br />client 请求不会到远程<br />server 请求会到远程，不会创建 ConfigMap |
| `--from-literal=k=v`           | 简单的 k=v 插入到 ConfigMap                                  |
| `--from-file=[key=]source`     | 指定资源的名为 key 或为文件名                                |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |



## K3s

https://k3s.io/

https://www.rancher.cn/k3s/

~~~bash
# 安装k3s的master节点
curl -sfL https://get.k3s.io | sh -
# 国内用户
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
~~~





## kubectl

### 技巧

~~~bash
# 创建 k 函数，执行 k 自带了 -n 命名空间
k() { kubectl -n namespace "$@"; }

# 命令结果赋值到 TOKEN，仅当前窗口有效
TOKEN=$(cat /var/lib/rancher/k3s/server/node-token)

# 获取 Master 的信息
kubectl config view --minify | grep server
MASTER_IP=$(kubectl config view --minify | awk '$1=="server:"{print $2; exit}' | sed -E 's#^https?://##; s#[:/].*$##')

~~~





### 通用参数

| 参数           | 作用         |
| -------------- | ------------ |
| `-n namespace` | 指定命令空间 |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |
|                |              |



| 参数                                                         | 作用               |
| ------------------------------------------------------------ | ------------------ |
| `--dry-run='none'`                                           |                    |
| `--dry-run='client'`                                         |                    |
| `--dry-run='server'`                                         |                    |
| `-f filename/directory/url`                                  | 指定读取的文件位置 |
| `-o json, yaml, name, go-template, go-template-file, template, templatefile, jsonpath, jsonpath-as-json, jsonpath-file` | 输出的格式         |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |
|                                                              |                    |



### create

`kubectl create -f filename [options]`









| 命令                                      | 作用                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| kubectl config `command`                  | 管理 kubeconfig 文件                                         |
| kubectl config current-context            | 查询                                                         |
| kubectl cluster-info                      | 验证 kubectl 是否连接到目标 Kubenetes 集群，并显示该集群关键组件的访问地址 |
| kubectl get `command`                     | 查询指定组件的信息                                           |
| kubectl logs `pod-name/`                  |                                                              |
| kubectl logs `deployment/deployment-name` |                                                              |
|                                           |                                                              |
|                                           |                                                              |
|                                           |                                                              |
|                                           |                                                              |
|                                           |                                                              |
|                                           |                                                              |
|                                           |                                                              |



### 部署命令

未 `-n namespace` 指定命名空间，则从默认命名空间查询。

#### rollout

` kubectl rollout SUBCOMMAND [options]` 管理资源的部署

| 命令                                               | 作用                       |
| -------------------------------------------------- | -------------------------- |
| kubectl rollout history deployment/algorithm-fleet | 显示上线历史               |
| pause                                              | 将所指定的资源标记为已暂停 |
| restart                                            | 重启资源                   |
| resume                                             | 恢复暂停的资源             |
| status                                             | 显示上线的状态             |
| undo                                               | 撤销上一次的上线           |
|                                                    |                            |
|                                                    |                            |





### 调整



#### patch

`kubectl patch (-f FILENAME | TYPE NAME) [-p PATCH|--patch-file FILE] [options]`

| 命令                                    | 作用                     |
| --------------------------------------- | ------------------------ |
| `resource name`, eg: `deployment nginx` | 指定一个资源             |
| `--type=strategic`                      | 补丁策略，合并做智能匹配 |
| `--patch-file patch.yaml`               | 指定补丁文件内容         |
| `--dry-run=server`                      | 请求发送到 API Server    |
| `-o name`                               | 输出格式为资源名         |

