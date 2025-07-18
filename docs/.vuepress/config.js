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
        // 实现域名校验 需要注掉下面的配置
        //"name": "algolia-site-verification", 
        //"content": "C2D1DDE0522C2E25",
        // 表示所有http协议增强为https协议
        'http-equiv': 'Content-Security-Policy',
        // 本地启动需要注释，否则本地访问资源切换成https
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
          },
          {
            text: '数据结构',
            link: '数据结构'
          }


        ]
      },
      // frontEnd 前端
      {
        text: 'vue',
        prefix: '/frontEnd/',
        children: [
          {
            text: 'vuepress',
            prefix: 'vuepress/',
            children: [
              'vuepress使用介绍.md', // 解析为 `/guide/group/sub1/bar.md`
              //'bar.md', // 解析为 `/vue/vuepress/bar.md`
            ],
          },
          {
            text: 'html',
            link: 'html'
          },
          {
            text: 'css',
            link: 'css'
          },
          {
            text: 'JavaScript',
            link: 'JavaScript'
          },
          {
            text: 'VSCode',
            link: 'VSCode'
          },
          {
            text: 'vue',
            link: 'vue'
          }
        
        ],
      },
      // nginx
      {
        text: 'nginx',
        prefix: '/nginx',
        children: [
          'nginx.md',
          'nginx配置代理https请求步骤.md',
          'nginx配置代理400.md'
        ],
      },
      // monitoring 监控
      {
        text: '监控',
        prefix: '/monitoring',
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
            link: 'Logstash-8.15',
          },
          {
            text: 'prometheus',
            link: 'prometheus'
          }
        ]
      },
      // JavaEE
      {
        text: 'JavaEE',
        prefix: '/JavaEE',
        children: [
          'JavaSE.md',
          'Java进阶.md',
          'JavaWeb.md',
          {
            text: 'Java多线程使用',
            link: 'Java多线程使用',
          },
          'JUC.md',
          {
            text: 'EnumSet集合',
            link: 'EnumSet集合',
          },
          {
            text: 'Java注解',
            link: 'Java注解',
          },
          "javaUtil.md",
          {
            text: '网络模型',
            link: 'networkModel'
          },
          {
            text: 'JavaIO',
            link: 'IO'
          },
          {
            text: 'Netty',
            link: 'Netty'
          },
          'Reactor.md'
          
        ]
      },
      // build 构建工具
      {
        text: '构建工具',
        prefix: '/build',
        children: [
          'maven.md',
          'Docker.md',
          'gradle.md',
          {
            text: 'gradle管理Java项目',
            link: 'gradle管理Java项目'
          },
          {
            text: 'maven项目切换gradle步骤',
            link: 'maven项目切换gradle步骤'
          }
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
          },
          {
            text: 'ErrorFile文件分析',
            link: 'ErrorFile文件分析'
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
          },
          {
            text: 'tcp',
            link: 'TCP'
          },
          'Redis.md'
          ,
          'Linux进阶.md',
          {
            text: '问题收集',
            link: 'problem'
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
      // Spring
      {
        text: 'spring',
        prefix: '/spring',
        children: [
          {
            text: 'Spring注解介绍',
            link: 'Spring注解介绍'
          },
          // spring core模型
          {
            text: 'spring核心-5.2.6.RELEASE',
            prefix: 'core',
            children: [
              {
                text: 'IOC容器相关',
                link: 'spring-core-ioc'
              },
              {
                text: 'SpEL表达式',
                link: 'spring-core-SpEL'
              },
              {
                text: 'Spring AOP代理',
                link: 'spring-core-AOP'
              },
              {
                text: '数据缓冲区和编解码器',
                link: 'DateBufferAndCodecs'
              }
            ]
          },
          // 数据层
          {
            text: '数据访问',
            prefix: 'dataAccess',
            children: [
              {
                text: '事物管理',
                link: 'transactionManagement'
              },
              {
                text: '数据访问对象',
                link: 'Dao'
              },
              {
                text: 'SpringDataJPA',
                link: 'SpringDataJPA'
              }
            ]
          },
          // 接口层
          {
            text: 'Servlet请求',
            prefix: 'webServlet',
            children: [
                {
                  text: 'SpringMVC',
                  link: 'SpringMVC',
                },
                {
                  text: 'WebSocket',
                  link: 'WebSocket',
                }
            ]
          },
          // 响应式接口
          {
            text: '响应式处理',
            prefix: 'webReactive',
            children: [
                {
                  text: 'SpringWebFlux',
                  link: 'SpringWebFlux',
                },
                {
                  text: '响应式客户端',
                  link: 'WebClient'
                }
            ]
          },
          {
            text: "Spring注解介绍",
            link: "Spring注解介绍"
          },
          {
            text: "日志框架",
            link: "logFramework"
          },
          {
            text: "Spring特殊接口",
            link: "SpecialInterfaceFunction"
          },
          {
            text: "设计模式",
            link: "DesignMode"
          },
          {
            text: "工具类",
            link: "util"
          }
        ]
      },
      // SpringBoot
      {
        text: 'springboot',
        prefix: '/springboot',
        children: [
          {
            text: 'SpringBoot-2.2.7.RELEASE介绍',
            link: 'SpringBoot-2.2.7.RELEASE'
          },
          {
            text: '嵌入式容器starter',
            link: 'starter-embedded'
          },
          {
            text: 'starter-web',
            link: 'starter-web'
          },
          {
            text: 'springboot使用Kafka',
            link: 'spring-kafka'
          },
          {
            text: 'Micrometer',
            link: 'Micrometer'
          },
          {
            text: 'starter-actuator',
            link: 'starter-actuator'
          },
        ]
      },
      // SpringCloud
      {
        text: 'springcloud',
        prefix: '/springcloud',
        children: [
          {
            text: 'SpringCloud',
            link: 'SpringCloud'
          },
          {
            text: 'spring-sleuth',
            link: 'spring-sleuth'
          },
          {
            text: 'Sentinel',
            link: 'AlibabaSentinel'
          },
          {
            text: 'Nacos',
            link: 'nacos'
          },
          {
            text: 'ZooKeeper',
            link: 'ZooKeeper'
          },
          {
            text: 'Dubbo',
            link: 'Dubbo'
          },
          {
            text: '网关',
            prefix: 'gateway',
            children: [
              {
                text: 'spring-cloud-gateway使用介绍',
                link: 'spring-cloud-gateway'
              },
              {
                text: 'gateway核心',
                link: 'spring-cloud-gateway-core'
              },
              {
                text: 'zuul-1.x',
                link: 'spring-cloud-starter-netflix-zuul'
              }
            ]
          }
        ]
      },
      // database 数据库
      {
        text: 'database',
        prefix: '/database',
        children: [
          {
            text: 'MySQL',
            link: 'Mysql'
          },
          {
            text: 'Oracle',
            link: 'Oracle'
          },
          {
            text: 'InfluxDB',
            link: 'InfluxDB'
          },
          {
            text: 'Oracle执行错误代码',
            link: 'Oracle-SQLErr'
          },
          {
            text: 'ShardingSphere',
            link: 'ShardingSphere'
          },
          {
            text: 'Spring事物控制',
            link: 'Transactional'
          },
          {
            text: 'DruidPoolProblem',
            link: 'DruidPoolProblem'
          },
          {
            text: 'seata',
            link: 'seata'
          },
        ]
      },
      {
        text: '其它',
        prefix: '/tools',
        children: [
          {
            text: 'cron表达式',
            link: 'cron'
          },
          {
            text: 'UML介绍',
            link: 'uml'
          },
          {
            text: 'JMeter',
            link: 'JMeter'
          },
          {
            text: 'XXL-Job',
            link: 'XXL-Job'
          },
          {
            text: '领域驱动设计',
            link: 'DDD'
          },
          {
            text: 'git',
            link: 'git'
          }
        ]
      }
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
      appId: 'ECD96NGN0A',
      apiKey: 'b7a2f201eb5c101c045690ab526cf995',
      indexName: 'firstbloodforjava_vuepress_blog',
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

