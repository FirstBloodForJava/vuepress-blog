import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  head: [
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src https: data: 'unsafe-inline' 'unsafe-eval'; img-src http: https: data:" }]
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
    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: 'vue',
        prefix: '/vue/',
        children: [
          {
            text: 'vuepress',
            prefix: 'vuepress/',
            children: [
              'vuepress使用介绍.md', // 解析为 `/guide/group/sub1/bar.md`
              'bar.md', // 解析为 `/guide/group/sub1/bar.md`

              
              {
                text: 'Example',
                link: 'https://example.com',
              },
            ],
          },
          {
            text: 'SubGroup2',
            prefix: 'sub2/',
            // 项目内链接的 .md 或 .html 后缀是可以省略的
            children: [
              'foo', // 解析为 `/guide/group/sub2/foo.md`
              'bar', // 解析为 `/guide/group/sub2/bar.md`

              // 不在 SubGroup2 内的链接
              '/baz/', // 解析为 `/baz/README.md`
            ],
          },
        ],
      },
      // 控制元素何时被激活
      {
        text: 'Group 2',
        children: [
          {
            text: 'Always active',
            link: '/',
            // 该元素将一直处于激活状态
            activeMatch: '/',
          },
          {
            text: 'Active on /foo/',
            link: '/not-foo/',
            // 该元素在当前路由路径是 /foo/ 开头时激活
            // 支持正则表达式
            activeMatch: '^/foo/',
          },
        ],
      },
    ],
  }),
  
  plugins: [
    docsearchPlugin({
      appId: 'WEZNU7P28F',
      apiKey: '01ac7acb9469c08dd21ba57208cf15f4',
      indexName: '<INDEX_NAME>',
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
      // 代码块折叠配置,超过15行折叠
      collapsedLines: true,
      // 空白符渲染
      whitespace: true
    }),
    
  ]
  
  
})

