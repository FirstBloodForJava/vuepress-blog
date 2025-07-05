# Dubbo

[Dubbo 文档](https://dubbo.apache.ac.cn/en/overview/)

## Dubbo简介

Apache Dubbo 是一个 RPC 服务开发框架，用于解决微服务架构下的服务治理和通信问题。

Dubbo3 被定义为面向云原生下一代 RPC 服务框架。3.0 在 Dubbo 2.x 的基础上进行了演进。在保持原有核心特性的同时，Dubbo3 在易用性、超大规模微服务实践、云原生基础设施适配和安全方面都有所提升。

![image-20250705091358985](http://47.101.155.205/image-20250705091358985.png)

Dubbo 是一个 RPC 框架，它定义了自己的 RPC 通信协议和编程方式。使用 Dubbo 时，用户首先需要**定义 Dubbo 服务**；其次，将 **Dubbo 服务部署上线**后，依靠 Dubbo 的**应用层通信协议**实现数据交换，Dubbo 传输的数据必须进行序列化。而这里的序列化协议是完全可扩展的。Dubbo 中的服务定义是一组完成业务功能的方法。您可以选择以绑定到特定语言的方式定义它们。从服务消费者 (Consumer) 的角度来看，可以通过调用 Dubbo 框架提供的 API 获取**服务代理 (stub) 对象**，然后像调用本地服务一样调用服务方法。消费者发起对服务方法的调用后，Dubbo **框架**负责将请求发送到部署在**远程机器上的服务提供者**。

![image-20250705092730798](http://47.101.155.205/image-20250705092730798.png)

在分布式系统中，特别是随着微服务架构的发展，应用的部署、发布和扩展变得极其频繁。作为 RPC 消费者，如何**动态发现服务提供者的地址**成为 RPC 通信的先决条件。Dubbo 提供**自动地址发现机制**，用于处理分布式场景下机器实例的动态迁移。通过**引入注册中心**来**协调提供者和消费者的地址**。提供者启动后，将自己的地址注册到注册中心，消费者通过**拉取或订阅注册中心**中特定节点动态感知提供者的地址列表变化。



### Dubbo核心特性

**高性能 RPC 通信协议**

跨**进程**或**主机**之间的服务通信是 Dubbo 的基本能力。Dubbo RPC 以预定义的协议编码方式将请求数据 (Request) 发送到后端服务，并接收服务器返回的结果 (Response)。RPC 通信对用户完全透明，用户无需关心请求是如何发送的以及发送到哪里，只需要获取每次调用的正确调用结果即可。除了同步模式下的 Request-Response 通信模型，Dubbo3 还提供了更丰富的通信模型选择：

- 消费者端异步请求 (Client Side Asynchronous Request-Response)
- 提供者端异步执行 (Server Side Asynchronous Request-Response)
- 消费者请求流 (Request Streaming)
- 提供者响应流 (Response Streaming)
- 双向流式传输



**自动服务（地址）发现**

Dubbo 的服务发现机制允许微服务组件独立演进，任意部署，消费者无需知道对端的部署位置和 IP 地址即可完成通信。Dubbo 提供 Client-Based 服务发现机制，用户可以通过**多种方式**启用**服务发现**：

- 使用独立的注册中心组件，例如 Nacos、Zookeeper、Consul、Etcd 等。
- 将服务的组织和注册交给底层容器平台，例如 Kubernetes，这被理解为更云原生的使用方式



**运行状态流量控制**

透明地址发现允许 Dubbo 请求发送到任何 IP 实例，在这个过程中流量会被随机分配。当需要更丰富、更细粒度的流量控制时，可以使用 Dubbo 的流量控制策略。Dubbo 提供了负载均衡、流量路由、请求超时、流量降级、重试等策略，基于这些基本能力，您可以轻松实现更多场景化的路由解决方案，包括金丝雀发布、A/B 测试、权重路由、同区域优先等。Dubbo 支持流量控制策略在运行状态下动态生效，无需重新部署。

- [流量管理示例](https://dubbo.apache.ac.cn/en/overview/tasks/traffic-management/)



**丰富的扩展组件和生态**

Dubbo 强大的服务治理能力不仅体现在核心框架中，还包括其出色的扩展能力以及周边配套设施的支持。通过定义几乎存在于每个关键流程中的扩展点，例如 Filter、Router 和 Protocol，我们可以丰富 Dubbo 的功能或实现与其他微服务支持系统的连接，包括 Transaction 和 Tracing。

- [Dubbo 生态系统](https://dubbo.apache.ac.cn/en/overview/what/ecosystem/)
- [Dubbo 扩展性设计](https://dubbo.apache.ac.cn/en/overview/what/extensibility/)



**Kubernetes**

为了让 Dubbo 微服务支持 Kubernetes 平台调度，最基本的是要实现 dubbo 服务生命周期与容器生命周期的对齐，包括 Dubbo 启动、销毁和服务注册等生命周期事件。与过去 Dubbo 自行定义生命周期事件，并要求开发者在运维实践中遵守协议不同，Kubernetes 的底层基础设施定义了严格的组件生命周期事件 (probes)，而是要求 Dubbo 按照协议进行适配。

Kubernetes Service 是另一个层面的适配，它反映了服务定义和注册下沉到云原生底层基础设施的趋势。在这种模式下，用户不再需要构建额外的注册中心组件，Dubbo 消费者端节点可以自动连接到 Kubernetes (API-Server 或 DNS)，并根据**服务名称** (Kubernetes Service Name) 查询实例列表 (Kubernetes endpoints)。此时，服务通过标准的 `Kubernetes Service API` 定义并分发到每个节点。



**Dubbo Mesh**

Service Mesh 在业界已经得到了广泛的传播和认可，被认为是下一代微服务架构，主要是因为它解决了包括透明升级、多语言、依赖冲突和流量管理等许多难题。Service Mesh 的典型架构是通过部署独立的 Sidecar 组件来拦截所有出站和入站流量，并在 `Sidecar` 中集成负载均衡和路由等丰富的流量管理策略。此外，Service Mesh 还需要一个控制平面 (Control Panel) 来实现对 Sidecar 流量的控制，即发布各种策略。我们在这里将这种架构称为 `Classic Mesh`。

没有技术架构是完美的，Classic Mesh 也面临着实现层面的高成本问题：

1. 需要运维控制面板 (Control Panel)
2. 需要操作和维护 Sidecar
3. 需要考虑如何从原有的 SDK 迁移到 Sidecar
4. 需要考虑引入 Sidecar 后整个链路的性能损失

为了解决 Sidecar 带来的相关成本问题，Dubbo 引入并实现了新的 `Proxyless Mesh` 架构。顾名思义，Proxyless Mesh 指的是不部署 Sidecar，Dubbo SDK 直接与控制平面交互。

![image-20250705103327043](http://47.101.155.205/image-20250705103327043.png)

在不同的组织和不同的开发阶段，使用 Dubbo 构建的微服务未来将允许三种部署架构：传统的 SDK、基于 Sidecar 的 Service Mesh 以及不带 Sidecar 的 Proxyless Mesh。基于 Sidecar 的 Service Mesh，即 Classic Mesh 架构，独立的 Sidecar 运行时接管所有流量，与 Sidecar 的 Proxyless Mesh 相分离，二级 SDK 通过 `xDS` 直接与控制平面通信。Dubbo 微服务允许部署在物理机、容器和 Kubernetes 平台上，可以使用 Admin 作为控制平面，并使用统一的流量治理规则对其进行管理。





## 简单使用



### Dubbo-API

[dubbo-api 文档](https://dubbo.apache.ac.cn/en/docs3-v2/java-sdk/reference-manual/config/api/)

[gitbub api例子](https://github.com/FirstBloodForJava/dubbo-api-demo.git)

步骤：

1. 启动注册中心，这里使用ZooKeeper；
2. 项目初始化，添加需要的maven依赖。
3. 定义服务接口；
4. 服务提供者实现接口；
5. 服务发布；
6. 消费者订阅接口并调用；
7. 启动服务服务提供者，启动消费订阅者。



### Dubbo-SpringBoot

[Dubbo-SpringBoot文档](https://cn.dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/config/spring/spring-boot/)

[gitbub api例子](https://github.com/FirstBloodForJava/dubbo-spring-boot-demo.git)

1. 启动注册中心，这里使用ZooKeeper；
2. 创建一个parent项目，里面新建三个模块，api、provider、consumer；
3. parent 添加全局依赖管理；
4. provider、consumer添加dubbo 依赖及api依赖；
5. api 定义服务接口；
6. provider 定义服务实现、启动类、服务配置；
7. consumer 定义启动类、服务配置；
8. 定义消费 provider 逻辑。
9. 启动服务提供者、启动服务消费者。



## 架构

[官网文档](https://dubbo.apache.ac.cn/en/docs3-v2/java-sdk/concepts-and-architecture/)

