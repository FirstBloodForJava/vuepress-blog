

# vuepress使用介绍

## 创建vuepress步骤

~~~bash
# 命令行创建
npm init vuepress vuepress-starter

~~~



~~~bash
# 手动创建
mkdir vuepress-starter
cd vuepress-starter

git init
npm init

# yarn
# 安装 vuepress
yarn add -D vuepress@next
# 安装打包工具和主题
yarn add -D @vuepress/bundler-vite@next @vuepress/theme-default@next

# npm
# 安装 vuepress
npm install -D vuepress@next
# 安装打包工具和主题
npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next

# cnpm 安装版本next
# 安装 vuepress
cnpm install -D vuepress@next
# 安装打包工具和主题
cnpm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next

# 
cnpm install -D sass-embedded
cnpm install -D sass

~~~

![image-20241015161110834](http://47.101.155.205/image-20241015161110834.png)

### config配置


#### navbar

导航栏配置

~~~javascript
export default {
  theme: defaultTheme({
    navbar: [
      // NavbarLink
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        prefix: '/group/',
        children: ['foo.md', 'bar.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
  }),
}

~~~



### client配置



## 插件

### 搜索插件

~~~bash
cnpm i -D @vuepress/plugin-docsearch@next

~~~

config.js配置

~~~javascript
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      appId: '<APP_ID>',
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      locales: {
        '/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    }),
  ],
}

~~~

![image-20241021133507181](http://47.101.155.205/image-20241021133507181.png)



![image-20241021133623456](http://47.101.155.205/image-20241021133623456.png)

indexName索引名称需要再等邮件。



### prismjs

为 Markdown 代码块启用代码高亮。实现代码块折叠功能。

问题：**代码块的折叠打开后，导致代码块底部的左右滚动窗口被覆盖，无法滑动。**

~~~bash
# 安装@vuepress/plugin-prismjs插件
cnpm i -D @vuepress/plugin-prismjs@next

~~~

config.js配置文件

~~~javascript
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  plugins: [
    prismjsPlugin({
      // 代码块折叠配置,超过15行折叠
      collapsedLines: true,
      // 空白符渲染
      whitespace: true
    }),
  ]
  
})


~~~







## 部署

### GitHub部署

#### 工作流文件

项目中的触发分支建立配置工作流文件.github/workflows/docs.yml。

还需要配置工作流推送代码所用的token。

~~~yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 8
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 20
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 打包之后的文件部署到 gh-pages 分支,需要
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-VUEPRESS_BLOG_ACTION-secret
          # VUEPRESS_BLOG_ACTION换成后面项目生成的token名称
          VUEPRESS_BLOG_ACTION: ${{ secrets.VUEPRESS_BLOG_ACTION }}

~~~



#### token准备

账号的Setting>Developer Settings>Personal access tokens>Token(classic)>Generate new token>Generate new token>创建token选择repo。

创建完成复制对应的token值，后续还需要用到。

![image-20241018155758368](http://47.101.155.205/image-20241018155758368.png)



![image-20241018160125154](http://47.101.155.205/image-20241018160125154.png)

使用前面的token值创建工作流token，项目的Setting>Secrets and variables>Actions>New Repository secret新建token，name为工作流配置文件VUEPRESS_BLOG_ACTION: `${{ secrets.VUEPRESS_BLOG_ACTION }}`所需要改的名称，secret为账号Setting创建的token值。



![image-20241018160355612](http://47.101.155.205/image-20241018160355612.png)

![image-20241018160849591](http://47.101.155.205/image-20241018160849591.png)

#### 配置工作流权限(可能不需要)

![image-20241018171146566](http://47.101.155.205/image-20241018171146566.png)



#### page



#### 其它情况

##### 404

项目以及启动能访问，一个项目部署成功后，两个项目都不能访问了。

![image-20241018171721766](http://47.101.155.205/image-20241018171721766.png)

![image-20241021130606242](http://47.101.155.205/image-20241021130606242.png)





##### 变量

~~~txt
${{ secrets.VUEPRESS_BLOG_ACTION }}不能直接出现在纯文本中,否则浏览器报错
可以用`${{ secrets.VUEPRESS_BLOG_ACTION }}`表示

~~~

![image-20241018172535420](http://47.101.155.205/image-20241018172535420.png)



## npm使用

~~~bash
# npm配置代理无效
npm config set proxy http://127.0.0.1:33210
npm config set https-proxy https://127.0.0.1:33210


~~~



~~~bash
# 使用淘宝的 npm 镜像
npm config set registry https://registry.npm.taobao.org
# 设置为官方源
npm config set registry https://registry.npmjs.org/

~~~





~~~bash
# 安装cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com

~~~

