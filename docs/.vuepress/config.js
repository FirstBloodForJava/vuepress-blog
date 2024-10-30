import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'

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
      // JVM
      {
        text: 'JVM',
        prefix: '/JVM',
        children: [
          'JVM.md',
          {
            text: '垃圾收集器和内存分配策略',
            link: '垃圾收集器和内存分配策略',
          },
          {
            text: '虚拟机性能监控工具',
            link: '虚拟机性能监控工具',
          },
          {
            text: 'JVM调优理论',
            link: 'JVM调优理论',
          },
          {
            text: 'Java多线程理论',
            link: 'Java多线程理论',
          }
        ]
      },
      // linux
      {
        text: 'linux',
        prefix: '/linux',
        children: [
          'Linux.md',
          {
            text: 'shell语法',
            link: 'shell语法'
          }
        ]
      },
      // mq
      {
        text: '消息队列',
        prefix: '/mq',
        children: [
          'RabbitMQ.md',
          'ActiveMQ.md',
          'kafka.md',
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
              buttonAriaLabel: '搜索文档',
            },

            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
                },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
                },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
                },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
                },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
                },
            },
          },
          
        }
      },
      // 每个组的最大结果数，默认5
      maxResultsPerGroup: 20
    }),
    prismjsPlugin({
      // 超过10行才显示行号
      lineNumbers: 10,
      // 代码块折叠配置,超过15行折叠(有问题关闭,使用其它方式折叠)
      collapsedLines: false,
      // 空白符渲染
      whitespace: true
    }),
    markdownImagePlugin({
      // 启用 figure，图片底部描述
      figure: true,
      // 启用图片懒加载
      lazyload: true,
      // 启用图片标记
      mark: true,
      // 启用图片大小
      size: true,
    }),

  ]


})

