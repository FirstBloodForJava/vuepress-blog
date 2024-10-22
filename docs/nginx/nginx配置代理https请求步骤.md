---
head:
  - - link
    - rel: icon
      href: http://47.101.155.205/nginx.ico
---

[[toc]]

# nginx配置代理https请求步骤

## linux

~~~bash
# 校验是否安装openssl
openssl version

# 没有安装命令
sudo yum install openssl

~~~



生成SSL证书命令

~~~bash
# 创建于2024-10-21
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/mycert.key -out /etc/nginx/ssl/mycert.crt

# -509表示自签名证书
# -nodes 不加密私钥
# - days 365天有效期
# - newkey ras:2048 生成2048位的RSA密钥
# -keyout 私钥文件的名称
# -out 证书的名称

~~~



### nginx安装SSL模块

~~~bash
# sudo yum groupinstall "Development Tools"
# 安装库
sudo yum install pcre-devel zlib-devel openssl-devel

# 解压缩安装,在解压缩的目录下执行命令
./configure --with-http_ssl_module

# 编译
make

# 安装
sudo make install

~~~




![image-20241021160819313](http://47.101.155.205/image-20241021160819313.png)

![image-20241021161203980](http://47.101.155.205/image-20241021161203980.png)



### 配置文件调整

![image-20241022170824134](http://47.101.155.205/image-20241022170824134.png)



~~~bash
# 保存后检查nginx配置文件格式
./nginx -t

# 重新加载nginx配置文件
./nginx -s reload

# 停止
./nginx -s stop

# 指定nginx启动的配置文件路径
./nginx -p <conf路径>

# 阿里云服务器启动,启动后没有生效，看是不是安全组没有放开

~~~

