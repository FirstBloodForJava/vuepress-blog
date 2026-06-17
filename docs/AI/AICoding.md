# AI coding

## AI coding 理论



### vibecoding

vibecoding 核心原则：

1. 意图优先：先描述你想要什么效果，而不是告诉 AI 怎么写代码；
2. 快速迭代：不追求一次完美，拥抱 生成 -> 测试 -> 修正 的循环；
3. 信任但认证：相信 AI 的能力，但始终检查关键逻辑；
4. 上下文经营：持续维护和优化提供给 AI 的背景信息。



### Agent

Agent（智能体）是一个能自主完成任务的 AI 系统，智能体的工作循环如下：

~~~mermaid
graph TD
    A[感知<br>读取项目代码、理解需求] --> B[推理<br>分析问题、制定计划]
    B --> C[行动<br>修改文件、运行命令、安装依赖]
    C --> D[反馈<br>检查结果、发现新问题]
    D --> A
~~~

智能体协作模式：

~~~mermaid
graph TB
    subgraph 智能体协作模式全景
        A[单智能体模式<br/>Single Agent] --> B[多智能体协作模式<br/>Multi-Agent Collaboration]
        
        B --> C[顺序协作<br/>Sequential]
        B --> D[并行协作<br/>Parallel]
        B --> E[网状协作<br/>Network]
        B --> F[主管模式<br/>Supervisor]
        B --> G[层级模式<br/>Hierarchical]
        B --> H[循环评审<br/>Loop & Critic]
        
        C --> C1[流水线式传递<br/>前一个输出=后一个输入]
        D --> D1[独立任务同时执行<br/>聚合器合并结果]
        E --> E1[点对点自由通信<br/>无中心化控制]
        F --> F1[中央调度节点<br/>任务分解-分配-验证]
        G --> G1[多层监督机制<br/>按领域/部门分组]
        H --> H1[生成-评审-修订<br/>直至满足条件]
    end
~~~



### 规范驱动开发 SDD(Specification Driver Development)



#### 需求规范 PRD

PRD(Product Requirements Document) 产品需求文档，描述要：做什么。

**用户故事（User Story）模式**：

~~~md
什么 角色，
希望什么 功能，
实现 目的
~~~

**验收标准（Acceptance Criteria）格式**：

~~~md
Given：前提条件
when：操作
Then：预期结果
~~~

**用 AI 辅助生成 PRD 的 Prompt（提示词）**：

~~~md
我要做什么。

请帮我生成一份完整的 PRD 文档，包含：
1. 项目概述
2. 目标用户
3. 核心功能列表
4. 每个功能的用户故事和验收标准
5. 非功能需求（性能、安全、兼容性）
请用 markdown 格式输出
~~~



#### 技术规范 SPEC

SPEC(Technical Specification) 技术规范文档，描述：怎么做。

| 模块     | 内容               | 说明           |
| -------- | ------------------ | -------------- |
| 系统架构 | 整体架构设计图     | 前后端如何交互 |
| 技术选型 | 使用什么技术和框架 |                |
| 数据模型 | 数据库表结构设计   |                |
| API接口  | 接口定义           |                |
| 目录结构 | 项目文件组织       |                |

**让 AI 从 PRD 自动生成 SPEC 的 Prompt**：

~~~md
基于以下PRD文档，请生成对应的技术规范文档（SPEC）：

[粘贴你的PRD内容]

要求：
1. 推荐技术选型并说明理由
2. 设计完整的数据模型（包含字段类型和关系）
3. 列出所有 API 接口（RESTful风格）
4. 给出建议的项目目录结构
~~~



#### 项目结构规范

~~~mermaid
graph TB
    Root[（根目录）my-project/] --> Specs[📁 specs/]
    Root --> Src[📁 src/]
    Root --> Claude[📄 CLAUDE.md]
    Root --> Package[📄 package.json]

    Specs --> PRD[📄 PRD.md]
    Specs --> SPEC[📄 SPEC.md]
    Specs --> Arch[📄 ARCHITECTURE.md]
    Specs --> API[📄 API.md]
~~~





## AI 编程工具
### Claude Code
Claude Code 是 Anthropic 公司推出的 **AI 编程智能体**。它最经典的入口是终端 CLI，现在也提供 IDE、Desktop、Web 等形态。它能够读取项目代码、修改文件、运行命令、安装依赖


~~~mermaid
graph TB
    subgraph CC["Claude Code 核心能力架构"]
        direction TB
        Input["你的自然语言指令"] --> Brain["AI 大脑<br/>Claude Sonnet/Opus"]

        subgraph Abilities["四大能力模块"]
            direction LR
            subgraph F[" 文件操作"]
                F1["读取文件"]
                F2["创建/修改文件"]
                F3["搜索代码"]
            end
            subgraph T[" 终端执行"]
                T1["运行命令"]
                T2["安装依赖"]
                T3["启动服务"]
            end
            subgraph U[" 代码理解"]
                U1["项目结构分析"]
                U2["逻辑理解"]
                U3["依赖关系"]
            end
            subgraph W[" 智能编码"]
                W1["需求→代码"]
                W2["Bug定位修复"]
                W3["重构优化"]
            end
        end

        Brain --> F
        Brain --> T
        Brain --> U
        Brain --> W
    end
~~~

#### LLM Loop
LLM Loop（大模型循环）Claude Code 的自主循环机制
~~~mermaid
graph LR
    A["你给一个目标"] --> B[" 思考<br/>制定下一步计划"]
    B --> C[" 行动<br/>调用工具/执行命令"]
    C --> D[" 观察<br/>读取执行结果"]
    D --> E{"任务完成?"}
    E -- "否" --> B
    E -- "是" --> F[" 交付结果"]
~~~

#### Agentic Search
Agentic Search（智能体式检索）它的工作方式和**一个人类工程师冷启动一个项目完全一样**：
~~~mermaid
graph LR
   A["你的需求"] --> B["浏览目录结构"]
   B --> C["读取关键文件"]
   C --> D["用 grep 搜索代码"]
   D --> E["跟进引用/调用关系"]
   E --> F["在本地理解代码"]
   F --> G["执行任务"]
~~~
| 维度           | 传统 RAG 检索                                | Claude Code 的 Agentic Search         |
| -------------- | -------------------------------------------- |--------------------------------------|
| 工作方式       | 预先嵌入整个代码库为向量，查询时按相似度拼凑 | 现场读文件、grep、追引用                       |
| 需要服务器索引 | 需要，且需持续维护                           | 不需要                                  |
| 代码变动处理   | 索引过期，可能返回已删除或重命名的代码       | 始终读取实时代码                             |
| 代码上传       | 通常需要预先上传或建立索引                   | 不需要预先上传/索引整个代码库；但被读取进上下文的片段仍会发送给模型服务 |
| 适合场景       | 老项目、不变代码库                           | 活跃开发中的项目、百万行 monorepo(代码仓)           |


#### Harness 体系
**决定 Claude Code 表现的，不只是背后的模型，还有围绕模型搭建的 Harness（脚手架）。**
模型能力决定下限，项目上下文、工具权限、规则文件和工作流决定上限。

~~~mermaid
graph TB
   L7["⑦ Subagents（子代理）<br/>独立上下文窗口去调研/执行"]
   L6["⑥ MCP Servers<br/>接入外部工具与数据源"]
   L5["⑤ LSP（语言服务器）<br/>给 AI 装上 IDE 导航能力"]
   L4["④ Plugins<br/>Skills+Hooks+MCP 打包分发"]
   L3["③ Skills<br/>按需加载的专业知识包"]
   L2["② Hooks<br/>会话生命周期钩子"]
   L1["① CLAUDE.md<br/>项目上下文文件"]
   Base[" 模型本身（地板）"]

   Base --> L1 --> L2 --> L3 --> L4 --> L5 --> L6 --> L7
~~~
下三层是基础，上四层是进阶。
| 层   | 组件       | 作用                                             | 加载时机         |
| ---- | ---------- | ------------------------------------------------ | ---------------- |
| ①    | CLAUDE.md  | 项目上下文文件（项目背景、约定、禁区）           | 每次会话自动加载 |
| ②    | Hooks      | 会话生命周期钩子（启动/结束/文件写入等事件）     | 事件触发         |
| ③    | Skills     | 可复用的任务方法论（如“代码审查”“部署”）         | 按需加载         |
| ④    | Plugins    | 打包一整套 Skills + Hooks + MCP 配置             | 装上后始终生效   |
| ⑤    | LSP        | 给 AI 装上“跳到定义/查找引用”等 IDE 级导航       | 始终生效         |
| ⑥    | MCP 服务器 | 打通 Claude 与外部工具（数据库、文档、票务系统） | 始终生效         |
| ⑦    | Subagents  | 独立上下文窗口的 Claude 实例，只返回结论         | 任务发出时创建   |





### Cursor

Cursor 是一个基于 VS Code 改造的 **AI 原生 IDE（集成开发环境）**。它把 AI 能力直接嵌入到了代码编辑器中，让你在写代码的同时随时获得 AI 辅助。

| 维度     | Claude Code            | Cursor               |
| -------- | ---------------------- | -------------------- |
| 界面     | 终端命令行             | 图形化编辑器         |
| 交互方式 | 纯文字对话             | 鼠标+键盘+对话       |
| 核心优势 | 全自主执行、项目级理解 | 实时补全、可视化编辑 |
| 适合场景 | 后端开发、全栈架构     | 前端开发、日常编码   |
| 学习曲线 | 需要熟悉终端           | 和 VS Code 几乎一样  |

## Claude Code 安装

**npm 安装**

~~~bash
npm install -g @anthropic-ai/claude-code

# 验证
claude --version
~~~

![image-20260617163821509](http://47.101.155.205/image-20260617163821509.png)




