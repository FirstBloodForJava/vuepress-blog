# Kubernetes 入门

使用 K8s 的前置知识：

- Docker 核心：镜像（Image）、容器（Container）、Dockerfile、docker run 基本用法。要能自己构建并运行一个简单镜像。
- YAML 基础：缩进、键值对、列表。K8s 的资源配置几乎全是 YAML，缩进错一位就可能报错。
- Linux 与网络常识：进程、端口、DNS、基本排查命令（ps、ss、curl）。



快速入门需要了解的组件：

| 资源对象/组件  | 说明                                                         |      |
| -------------- | ------------------------------------------------------------ | ---- |
| Master         | Kubernetes 里的 Master 指的是集群控制节点， 每一个 Kubernetes 集群里都必须要有一个 Master  节点来负责整个集群的管理和控制， 基本上 Kubernetes 的所有控制命令都发给它， 它来负责具体的执行过程， 我们后面执行的所有命令基本都是在 Master 节点上运行的。 |      |
|                |                                                              |      |
| api-server     | api-server 是集群的核心， 是k8s中最重要的组件， 因为它是实现声明式 api 的关键。 |      |
| etcd           | etcd 是兼具一致性和高可用性的键值数据库， 可用于服务发现以及配置中心。 采用 raft 一致性算法， 基于 Go 语言实现。 是保存 Kubernetes 所有集群数据的后台数据库。 |      |
| kube-scheduler | kube-scheduler 是 kubernetes 系统的核心组件之一， 主要负责整个集群资源的调度功能， 根据特定的调度算法和策略， 将 Pod 调度到最优的工作节点上面去， 从而更加合理、 更加充分地利用集群的资源。 |      |
| Node(WorkNode) |                                                              |      |
| pod            |                                                              |      |
| deployment     |                                                              |      |
| ReplicaSet     |                                                              |      |
| kubelet        |                                                              |      |
|                |                                                              |      |

