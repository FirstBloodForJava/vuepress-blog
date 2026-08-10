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



**启动命令**

| 命令                                  | 作用                     |
| ------------------------------------- | ------------------------ |
| claude                                | 默认启动                 |
| claude -c                             | 启动时直接接上次会话     |
| claude --permission-mode plan         | 启动直接进入 Plan 模式   |
| claude --dangerously-skip-permissions | 危险模式启动：不需要确认 |



## Claude Code 使用

### 核心配置文件

>  settings.json

优先级（从高到低）：项目根/ `.claude/settings.local.json` > 项目根/`.claude/settings.json`  > `用户目录/.claude/settings.json`。

~~~json
{
    // api 配置
    "env": {
        "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
        "ANTHROPIC_AUTH_TOKEN": "",
        "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
        "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-v4-flash",
        "CLAUDE_CODE_EFFORT_LEVEL": "max"
    },
    "theme": "dark",
    // 读取 .gitignore 做目录扫描过滤
    "respectGitignore": true,
    
    // 允许 Claude Code 执行的操作（不再需要每次确认）
    "permissions": {
        "allow": [
            "Read", // 读取文件
            "Write", // 写入文件
            "Bash(npm *)", // 执行 npm 命令
            "Bash(git *)", // 执行 git 命令
            "Bash(node *)" // 执行 node 命令
        ],
        "deny": [
            "Bash(rm -rf *)" // 禁止执行危险的删除命令
        ]
    },
    // 默认使用的模型
    "model": "sonnet",
    // 自动紧凑阈值（上下文使用超过此比例时自动压缩）
    "autoCompactThreshold": 80
}
~~~



> CLAUDE.md

`CLAUDE.md` 是 Claude Code 的**项目记忆文件**，它的核心作用是**为 Claude 提供持久的、跨会话的项目上下文和指令**。

CLAUDE.md 文件是分层加载，按需生效：

| 层级         | 路径                         | 作用范围       | 适合写什么                                           |
| ------------ | ---------------------------- | -------------- | ---------------------------------------------------- |
| **全局级**   | 用户目录`/.claude/CLAUDE.md` | 所有项目都会读 | 个人习惯、身份、翻译偏好                             |
| **项目级**   | 项目根目录/`CLAUDE.md`       | 仅本项目       | 项目技术栈、架构、规范、进度（可提交 Git，团队共享） |
| **文件夹级** | 子目录/`CLAUDE.md`           | 仅该子目录     | 模块专属约定                                         |

生成 CLAUDE.md 文件方式：

1. `/init` 创建项目级：在项目根目录运行 `claude` 后输入 `/init`，cc 会自动扫描项目并生成一份 `CLAUDE.md` 初稿。**在全局添加以下配置的情况下，也出现了 CLAUDE.md 内容为英文的情况。**
2. `/memory`：可设置是否自动记忆，或直接编辑指定的 `CLAUDE.md` 文件。

**全局设置**：

~~~markdown
## 沟通方式
- 默认中文回复；代码、命令、变量名、文件路径保持英文
- 结论先行，简洁直接，不先铺垫背景
- 不谄媚，不夸"这是个很好的问题"，不以"当然可以"开头
- 给真实判断——方案有问题直接指出，发现更好做法主动说明

## Git
- 不自动 `git commit` 或 `git push`，除非我明确要求
- 提交前先展示将要提交的变更摘要
- commit message 使用简洁英文

## 红线操作
以下操作即使在 auto-accept 模式下也必须先问我：
- 删除文件、目录或 git 历史
- 修改 `.env`、密钥、token、证书、CI/CD 配置
- `git push`、`git rebase`、`git reset --hard`、强制推送
- 公开发布（`npm publish`、生产部署等）
~~~



~~~markdown
# 项目名称

## 项目概述
一句话描述这个项目做什么。

## 技术栈
- 前端：Next.js 14 + TypeScript + Tailwind CSS
- 后端：Next.js API Routes
- 数据库：Prisma + SQLite
- 部署：Vercel

## 项目结构
```
src/
├── app/         # Next.js App Router 页面
│   ├── api/      # API 路由
│   ├── layout.tsx # 全局布局
│   └── page.tsx   # 首页
├── components/   # React 组件
│   ├── ui/      # 通用UI组件
│   └── features/  # 业务组件
├── lib/         # 工具函数和配置
├── prisma/      # 数据库 schema 和迁移
└── types/       # TypeScript 类型定义
```

## 编码规范
- 使用函数式组件 + React Hooks
- 组件文件使用 PascalCase 命名（如 BookmarkCard.tsx）
- 工具函数使用 camelCase 命名
- API 路由返回统一格式：{ success: boolean, data?: any, error?: string }
- 所有数据库操作通过 Prisma Client 执行

## 当前开发状态
-  项目初始化完成
-  数据库 Schema 设计完成
-  书签 CRUD API 开发中
-  前端页面待开发
-  搜索功能待开发

## 注意事项
- SQLite 数据库文件在 prisma/dev.db，不要提交到 Git
- 环境变量在 .env 文件中，不要提交到 Git
- 所有新功能先创建 Git 分支再开发
~~~



**自建参考文档**：某种场景下，读取指定的 `CLAUDE.md` 文件。

~~~markdown
## 外部参考文档

- 修改前端视觉、调颜色、调间距时 → 必读 `docs/brand-visual.md`
- 写产品文案、按钮文字、提示语时 → 必读 `docs/copywriting-style.md`
- 写 API 、定义返回格式时 → 必读 `docs/api-conventions.md`
~~~



>.claudeignore

类似于 `.gitignore`，用来告诉 Claude Code 哪些文件/目录不需要关注：

~~~
# .claudeignore 示例
node_modules/      # 前端依赖包目录（太大了，AI不需要看）
.next/            # Next.js 构建产物
dist/            # 编译输出
*.log            # 日志文件
.env             # 环境变量（包含敏感信息）
~~~





### 模型选择与切换

~~~bash
# 指定模型启动-临时
claude --model opus

# 启动后切换使用模型
/model

# 环境变量指定默认模型
export ANTHROPIC_MODEL="sonnet"

# settings.json 配置文件指定模型

~~~



### 启动后常用命令

| 命令       | 作用                                        | 使用场景                            |
| ---------- | ------------------------------------------- | ----------------------------------- |
| `/help`    | 显示帮助信息                                | 忘记命令时查看                      |
| `/model`   | 查看/切换当前模型（高/中/低档）             | 需要换用更强/更快的模型时           |
| `/compact` | 压缩当前对话的上下文                        | 对话太长，AI 开始“遗忘”早期内容时   |
| `/clear`   | 完全清空当前对话                            | 开始全新的任务时                    |
| `/context` | 详细查看上下文占比（各 MCP/Skill 各占多少） | 优化 token、诊断哪里挨上下文        |
| `/memory`  | 查看/编辑 CLAUDE.md 与自动记忆              | 管理项目/全局记忆、开启 Auto Memory |
| `/status`  | 查看会话状态                                | 确认模型、Token 消耗                |
| `/cost`    | 查看当前会话费用                            | 监控花了多少钱                      |
| `/review`  | 对当前项目进行代码审查                      | 完成功能后检查质量                  |
| `/init`    | 自动生成项目的 CLAUDE.md                    | 进入新项目后的第一件事              |
| `/plan`    | 切入 Plan Mode（只读规划模式）              | 复杂任务起手                        |
| `/rewind`  | 回滚 cc 之前的修改                          | “后悔药”，下面重点讲                |
| `/resume`  | 选择历史会话恢复                            | 上次话题还没聊完                    |
| `/btw`     | “顺便问一句”，不污染主上下文                | 主任务进行中想问个无关问题          |





| 命令            | 作用                                               | 使用场景                     |
| --------------- | -------------------------------------------------- | ---------------------------- |
| `/skill <名称>` | 直接调用某个 Skill                                 | 手动触发，不要等 AI 自己决定 |
| `/agent`        | 创建、查看、调用子代理（SubAgent）                 | 手工创建专项 SubAgent        |
| `/plugin`       | 插件管理界面（discover / installed）               | 发现、安装、卸载插件         |
| `/login`        | 使用 Claude 官方订阅会员登录                       | 有 Claude Pro/Max 会员时首选 |
| `/simplify`     | 派 3 个子 Agent 从代码质量/性能/复用性三个角度优化 | 快速全面优化已有代码         |



`@文件/目录` 引用文件



### skills

Skill 是 Claude Code 的**可复用模块化工作流技能包**，把重复的流程、规范、检查清单封装成 `SKILL.md`，让 Claude 按照固定流程完成任务，不需要每次重复写一大段提示词。

skill 相当于做菜的菜谱，标准化流程制作一个菜。

[Anthropic 官方 skill 库](https://github.com/anthropics/skills)

~~~bash
# 安装 Anthropic 官方全部 Skill（全局安装）
npx skills add anthropics/skills -g

# 只安装指定 Skill
npx skills add anthropics/skills@webapp-testing -g

# 可以创建、修改，提升 skill
npx skills add anthropics/skills@skill-creator -g

~~~

[Vercel 官方库](https://github.com/vercel-labs/skills) 专注于 **React、Next.js、AI SDK、部署** 等前端生态。

~~~bash
# 只安装指定 Skill
npx skills add vercel-labs/skills@find-skills -g -y
~~~

GitHub 社区 skill 库：

| 地址                                                | 特色 |
| --------------------------------------------------- | ---- |
| https://github.com/ComposioHQ/awesome-claude-skills |      |
| https://github.com/alirezarezvani/claude-skills     |      |
| https://github.com/travisvn/awesome-claude-skills   |      |
| https://github.com/glebis/claude-skills             |      |

skill 聚合平台：

| 地址                    |
| ----------------------- |
| https://skills.sh       |
| https://skillsmp.com/zh |
| https://agentskills.io  |



#### 结构

一个 skill 是一个完整目录，位于 `用户目录/.claude/skills/` 或 `项目目录/.claude/skills/` 下。

一个 skill 文件组成：

| 类型 | 名称             | 作用                                     |
| ---- | ---------------- | ---------------------------------------- |
| 文件 | SKILL.md         | 核心：技能描述文件（必选）               |
| 目录 | scripts          | 辅助脚本目录（可选）                     |
| 目录 | resources        | 配套资源目录（可选）                     |
| 目录 | references       | 参考文档目录（可选）                     |
| 文件 | requirements.txt | 依赖声明（可选，列出脚本需要的第三方包） |

> SKILL.md

~~~md
---
# 元数据 YAML 格式
name: tdd-dev # 技能名称（唯一）
version: 1.0 # 技能版本
description: "TDD 测试驱动开发，先写单元测试，再实现业务代码" # 技能介绍
trigger: ["测试"]	# 触发关键词
tools: [] # 依赖工具
author: name # 技能作者
allowed-tools: ["ReadFile", "WriteFile", "Bash"] # 限定该 skill 可以调用哪些工具
disallowed-tools: [] # 禁止使用的工具
disabled: false # 是否禁用
disable-model-invocation: false # 是否禁止开启子 Agent
---

# skill 名称

~~~





### 插件

#### superpower

Superpowers 本质是一套**工作方法论集合**，通常会封装成多个可复用 Skill。安装后，AI 可以在合适的任务中调用这些方法论。

**建议在项目中安装 superpower 插件。**

~~~cmd
# 英文版（原版）
npx superpowers

# 中文增强版
npx superpowers-zh

~~~

安装后会在项目下生成 `.claude/skills/` 目录，包含所有 Skill 文件，同时修改项目的 `CLAUDE.md` 文件，表示要使用这些 skill。

![image-20260806151036313](http://47.101.155.205/image-20260806151036313.png)



