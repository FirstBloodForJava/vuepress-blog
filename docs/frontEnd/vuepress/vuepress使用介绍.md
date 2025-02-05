[图片](https://47.101.155.205/image-20241015161110834.png)

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

### config配置(默认主题)

#### navbar

http://ecosystem.vuejs.press/zh/themes/default/config.html#navbar

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



#### footer配置

footer增加GitHub编辑地址，及描述。

**注意在defaultTheme中增加配置。**

![image-20241022144459426](http://47.101.155.205/image-20241022144459426.png)

~~~javascript
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  // 设置网站的主题
  theme: defaultTheme({
    search: true,
    sidebarDepth: 5,
    
    editLink: true,
    // 文档源文件的仓库 URL 
    docsRepo: 'http://github.com/FirstBloodForJava/vuepress-blog',
    // 文档源文件的仓库分支,默认main
    docsBranch: 'main',
    // 文档源文件存放在仓库中的目录名
    docsDir: 'docs',
    // 编辑此页的链接
    editLinkPattern: ':repo/edit/:branch/:path',
    // 修改主题的footer
    locales: {
      '/': {
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        editLinkText: '在 GitHub 上编辑此页',
      }
    }
  }),

})

~~~



#### markdown解析

##### **提示内容**

**输入，tip或warning后面跟内容，则替换默认内容**

~~~md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: info
这是一个信息
:::

::: important
这是一个重要信息
:::

::: note
这是一个备注
:::

::: details
这是一个 details 标签
:::

~~~

![image-20241022152004138](http://47.101.155.205/image-20241022152004138.png)

**输出**

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: info
这是一个信息
:::

::: important
这是一个重要信息
:::

::: note
这是一个备注
:::

::: details
这是一个 details 标签
:::



##### **代码选项卡**

**输入**：里面只能是代码块

~~~md
::: code-tabs

@tab JavaScript

```js
const name = 'VuePress'
console.log(`你好，${name}！`)
```

@tab TypeScript

```ts
const name: string = 'VuePress'

console.log(`你好，${name}！`)
```

:::

~~~

![image-20241022152440925](http://47.101.155.205/image-20241022152440925.png)

**输出**

::: code-tabs

@tab JavaScript

```js
const name = 'VuePress'
console.log(`你好，${name}！`)
```

@tab TypeScript

```ts
const name: string = 'VuePress'

console.log(`你好，${name}！`)
```

123

:::





##### **选项卡**

**输入**

~~~md
::: tabs

@tab 选项卡 1

这是选项卡 1 的内容。

```js
console.log('你好，VuePress!')
```

@tab 选项卡 2

这是选项卡 2 的内容。

- 列表项 1
- 列表项 2
- 列表项 3

:::

~~~

![image-20241022152947443](http://47.101.155.205/image-20241022152947443.png)

**输出**

::: tabs

@tab 选项卡 1

这是选项卡 1 的内容。

```js
console.log('你好，VuePress!')
```

@tab 选项卡 2

这是选项卡 2 的内容。

- 列表项 1
- 列表项 2
- 列表项 3

:::



### client配置



## 插件

### 搜索插件(服务端)

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



#### algolia创建爬虫(索引)

dashboard.algolia.com->data sources->crawler->click on your crawler->点击Domains

![image-20241022111515610](http://47.101.155.205/image-20241022111515610.png)

![image-20241022111553867](http://47.101.155.205/image-20241022111553867.png)

![image-20241022111603332](http://47.101.155.205/image-20241022111603332.png)

域名验证，部署在GitHub上的vuepress项目，可以通过修改config.js来操作。

~~~javascript
// config.js文件中使用vue的head设置meta标签
export default defineUserConfig({
  head: [
    [
      'meta', { 
        "name": "algolia-site-verification", 
        "content": "02635CF78DCEC3A9"
      },
      
    ]
  ],
  
})

~~~

![image-20241022111919838](http://47.101.155.205/image-20241022111919838.png)





dashboard.algolia.com->data sources->crawler->click on your crawler->Add new crawler

![image-20241022110300153](http://47.101.155.205/image-20241022110300153.png)

![image-20241022110714099](http://47.101.155.205/image-20241022110714099.png)

打开页面，SETUP->Editor->修改配置->右上角Save ->Start Crawl

![image-20241022112333211](http://47.101.155.205/image-20241022112333211.png)

::: details 格式内容介绍

~~~javascript
new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
  rateLimit: 8,
  startUrls: [
    // 这是 Algolia 开始抓取网站的初始地址
    // 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接
    'https://YOUR_WEBSITE_URL/',
  ],
  sitemaps: [
    // 如果你在使用 Sitemap 插件 (如: @vuepress-plugin/sitemap)，你可以提供 Sitemap 链接
    'https://YOUR_WEBSITE_URL/sitemap.xml',
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // 你可以通过它阻止 Algolia 抓取某些 URL
  ],
  discoveryPatterns: [
    // 这是 Algolia 抓取 URL 的范围
    'https://YOUR_WEBSITE_URL/**',
  ],
  // 爬虫执行的计划时间，可根据文档更新频率设置
  schedule: 'at 02:00 every 1 day',
  actions: [
    // 你可以拥有多个 action，特别是你在一个域名下部署多个文档时
    {
      // 使用适当的名称为索引命名
      indexName: 'YOUR_INDEX_NAME',
      // 索引生效的路径
      pathsToMatch: ['https://YOUR_WEBSITE_URL/**'],
      // 控制 Algolia 如何抓取你的站点
      recordExtractor: ({ $, helpers }) => {
        // @vuepress/theme-default 的选项
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: '.vp-sidebar-heading.active',
              defaultValue: 'Documentation',
            },
            lvl1: '[vp-content] h1',
            lvl2: '[vp-content] h2',
            lvl3: '[vp-content] h3',
            lvl4: '[vp-content] h4',
            lvl5: '[vp-content] h5',
            lvl6: '[vp-content] h6',
            content: '[vp-content] p, [vp-content] li',
          },
          indexHeadings: true,
        })
      },
    },
  ],
  initialIndexSettings: {
    // 控制索引如何被初始化，这仅当索引尚未生成时有效
    // 你可能需要在修改后手动删除并重新生成新的索引
    YOUR_INDEX_NAME: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
})
~~~



:::



![image-20241022112556284](http://47.101.155.205/image-20241022112556284.png)

![image-20241022112647005](http://47.101.155.205/image-20241022112647005.png)

http://ecosystem.vuejs.press/zh/plugins/search/docsearch.html#%E8%8E%B7%E5%8F%96%E6%90%9C%E7%B4%A2%E7%B4%A2%E5%BC%95

配置config.js文件即可使用，在GitHub上才会生效，因为查询放回的url信息是之前网站的域名。



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

官网介绍：https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages



#### 工作流文件

项目中的触发分支建立配置工作流文件.github/workflows/docs.yml。

还需要配置工作流推送代码所用的token。



::: details docs.yml内容

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
      # @see http://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 打包之后的文件部署到 gh-pages 分支,需要
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see http://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-VUEPRESS_BLOG_ACTION-secret
          # VUEPRESS_BLOG_ACTION换成后面项目生成的token名称
          VUEPRESS_BLOG_ACTION: ${{ secrets.VUEPRESS_BLOG_ACTION }}

~~~

:::

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
npm config set http-proxy http://127.0.0.1:33210


~~~



~~~bash
# 使用淘宝的 npm 镜像,该镜像有问题
npm config set registry http://registry.npm.taobao.org
# 设置为官方源
npm config set registry http://registry.npmjs.org/

~~~



~~~bash
# 安装cnpm,镜像是http://registry.npmmirror.com
npm install -g cnpm --registry=http://registry.npmmirror.com

~~~



~~~bash
# 安装依赖具体版本,-D表示--save-dev
npm i -D <dependency>@version
npm install <dependency>@version --save-dev

~~~



~~~bash
# 查询依赖的所有版本
npm show <dependency> versions --json

~~~

