import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  head: [

    [
      'meta', {
        // 实现域名校验
        //"name": "algolia-site-verification", 
        //"content": "02635CF78DCEC3A9",
        // 表示所有http协议增强为https协议
        'http-equiv': 'Content-Security-Policy',
        "content": "upgrade-insecure-requests"
      },

    ]
  ],
  base: "vuepress-blog",
  lang: 'zh-CN',
  title: 'VuePress', // 设置所有页面的title后缀
  description: '基于MarkDown文档使用VuePress搭建的博客',


  bundler: viteBundler(), // 设置打包工具

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

    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: '首页',
        link: '/'
      },
      //  算法策略
      {
        text: '算法策略',
        prefix: '/algorithmStrategy',
        children: [

          {
            text: '递归',
            link: 'recursion'
          },
          {
            text: '分治',
            link: 'divideAndConquer'
          },
          {
            text: '动态规划',
            link: 'dp'
          }


        ]
      },
      // vue
      {
        text: 'vue',
        prefix: '/vue/',
        children: [
          {
            text: 'vuepress',
            prefix: 'vuepress/',
            children: [
              'vuepress使用介绍.md', // 解析为 `/guide/group/sub1/bar.md`
              //'bar.md', // 解析为 `/vue/vuepress/bar.md`
            ],
          },
        
        ],
      },
      // 控制元素何时被激活
      {
        text: 'nginx',
        prefix: '/nginx',
        children: [
          'nginx配置代理https请求步骤.md'
        ],
      },
      // ELK
      {
        text: 'ELK',
        prefix: '/ELK',
        children: [
          {
            text: 'Elasticsearch',
            link: 'Elasticsearch'
          },
          {
            text: 'ELK',
            link: 'ELK',
          },
          {
            text: 'Logstash',
            link: 'logstash-8.5',
          },
        ]
      },
      // JavaEE
      {
        text: 'JavaEE',
        prefix: '/JavaEE',
        children: [
          'JavaSE.md',
          'JavaWeb.md',
          'JUC.md',
          {
            text: 'EnumSet集合',
            link: 'EnumSet集合',
          },
          {
            text: 'Java多线程使用',
            link: 'Java多线程使用',
          },
          
        ]
      },
    ],
    // 修改主题的footer
    locales: {
      '/': {
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        editLinkText: '在 GitHub 上编辑此页',
      }
    }
  }),

  plugins: [
    docsearchPlugin({
      appId: 'WEZNU7P28F',
      apiKey: '01ac7acb9469c08dd21ba57208cf15f4',
      indexName: 'vuepress_blog',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        }
      },
    }),
    prismjsPlugin({
      // 超过10行才显示行号
      lineNumbers: 10,
      // 代码块折叠配置,超过15行折叠(有问题关闭,使用其它方式折叠)
      collapsedLines: false,
      // 空白符渲染
      whitespace: true
    }),

  ]


})

