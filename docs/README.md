---
title: 我的博客标题
sidebarDepth: 5
lang: zh-CN
actions:
  - text: 快速上手
    link: /zh/guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /zh/guide/introduction.html
    type: secondary
---

[[toc]]



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

