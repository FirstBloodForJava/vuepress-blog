---
head:
  - - link
    - rel: icon
      href: http://47.101.155.205/nginx.ico
---

# nginx配置代理400

缺少proxy_set_header Host $host;配置，nginx代理请求响应400。

如果没有配置使用原有的host，应该是将

~~~conf
...

http {
	upstream test {
        server ip1:port1;
        server ip2:port2;
        keepalive 4000;
        keepalive_requests 100;
    }
	
	server {
        listen       listen-port;
        # 设置客户端的真实ip
        proxy_set_header X-Real-IP $remote_addr;
        # 代理链
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # 解决请求响应400的问题
        proxy_set_header Host $host;
        
        location /custom-server/ {
            proxy_buffering off;
            proxy_pass http://test/;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}

~~~

