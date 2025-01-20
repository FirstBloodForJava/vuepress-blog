# Prometheus监控

## SpringBoot应用依赖要求

~~~xml
<!-- 监控系统健康情况的工具 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<!-- 桥接Prometheus -->
<dependency>
	<groupId>io.micrometer</groupId>
	<artifactId>micrometer-registry-prometheus</artifactId>
	<scope>runtime</scope>
</dependency>
<!-- micrometer 核心包，按需引入，使用 Meter 注解或手动埋点时需要 -->
<dependency>
	<groupId>io.micrometer</groupId>
	<artifactId>micrometer-core</artifactId>
	<version>1.7.6</version>
</dependency>
<!-- micrometer获取JVM相关信息，并展示在Grafana上 -->
<dependency>
	<groupId>io.github.mweirauch</groupId>
	<artifactId>micrometer-jvm-extras</artifactId>
	<version>0.2.2</version>
</dependency>

~~~



~~~yml
management:
  metrics:
    tags:
      appname: ${spring.application.name}
  endpoints:
    web:
      exposure:
        include: "*"
        exclude: "env,beans"

~~~





SpringBoot2.1/Micrometer 1.1.0版本以上添加这行配置

~~~yml
management.metrics.tags.application: ${spring.application.name}

~~~

其他实现

~~~java
@Bean
MeterRegistryCustomizer<MeterRegistry> configurer(
    @Value("${spring.application.name}") String applicationName) {
    return (registry) -> registry.config().commonTags("application", applicationName);
}

~~~







## Prometheus

官网下载地址：https://prometheus.io/download/

![image-20240704161406975](http://47.101.155.205/image-20240704161406975.png)



~~~bash
# 解压缩安装
tar zvxf prometheus-2.53.0.linux-amd64.tar.gz

cd prometheus-2.53.0.linux-amd64

# 读取指定yml配置启动,以8090端口启动
./prometheus --config.file=prometheus.yml --web.listen-address=:8090

nohup ./prometheus --config.file=prometheus.yml --web.listen-address=:8090  > ./logs/prometheus.log 2>&1 &

~~~



~~~yml
# 全局配置
global:
  scrape_interval: 15s # 控制prometheus抓取数据的频率，默认1min。
  evaluation_interval: 15s # 每15秒评估一次规则。默认为每1分钟一次。

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093


rule_files:

scrape_configs:
  - job_name: "prometheus" # 可以是${spring.application.name}配置的名称,后续结合Grafana会使用到
    # metrics_path: "/actuator/prometheus" 默认后缀地址metrics,SpringBoot应用监听地址需要修改
    static_configs:
      - targets: ["localhost:8090"] # 监听prmetheus自己
# 支持多个应用

~~~



![image-20240704161745520](http://47.101.155.205/image-20240704161745520.png)

可以筛选监听应用的数据



## Grafana

官网地址：https://grafana.com/get/?tab=self-managed

![image-20240704162206680](http://47.101.155.205/image-20240704162206680.png)

~~~bash
# 解压缩安装安装
wget https://dl.grafana.com/enterprise/release/grafana-enterprise-11.1.0.linux-amd64.tar.gz
tar -zxvf grafana-enterprise-11.1.0.linux-amd64.tar.gz

# 启动
./bin/grafana-server

# http://localhost:3000 访问登录,默认admin/admin
~~~

![image-20240704162332590](http://47.101.155.205/image-20240704162332590.png)



添加数据源

![image-20240704162421066](http://47.101.155.205/image-20240704162421066.png)



选中prometheus

![image-20240704162440325](http://47.101.155.205/image-20240704162440325.png)



![image-20240704162607429](http://47.101.155.205/image-20240704162607429.png)



![image-20240704162659225](http://47.101.155.205/image-20240704162659225.png)



![image-20240704162753010](http://47.101.155.205/image-20240704162753010.png)



![image-20240704162931188](http://47.101.155.205/image-20240704162931188.png)



![image-20240704163254277](http://47.101.155.205/image-20240704163254277.png)



## Grafana监控界面模板

JVM模板：https://grafana.com/grafana/dashboards/4701-jvm-micrometer/

### 4701(JVM)

配置：4701

~~~json
{
  "__inputs": [
    {
      "name": "DS_PROMETHEUS",
      "label": "Prometheus",
      "description": "",
      "type": "datasource",
      "pluginId": "prometheus",
      "pluginName": "Prometheus"
    }
  ],
  "__requires": [
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "4.6.5"
    },
    {
      "type": "panel",
      "id": "graph",
      "name": "Graph",
      "version": ""
    },
    {
      "type": "datasource",
      "id": "prometheus",
      "name": "Prometheus",
      "version": "1.0.0"
    },
    {
      "type": "panel",
      "id": "singlestat",
      "name": "Singlestat",
      "version": ""
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "limit": 100,
        "name": "Annotations & Alerts",
        "showIn": 0,
        "type": "dashboard"
      },
      {
        "datasource": "${DS_PROMETHEUS}",
        "enable": true,
        "expr": "resets(process_uptime_seconds{application=\"$application\", instance=\"$instance\"}[1m]) > 0",
        "iconColor": "rgba(255, 96, 96, 1)",
        "name": "Restart Detection",
        "showIn": 0,
        "step": "1m",
        "tagKeys": "restart-tag",
        "textFormat": "uptime reset",
        "titleFormat": "Restart"
      }
    ]
  },
  "description": "Dashboard for Micrometer instrumented applications (Java, Spring Boot, Micronaut)",
  "editable": true,
  "gnetId": 4701,
  "graphTooltip": 1,
  "hideControls": false,
  "id": null,
  "links": [],
  "refresh": "30s",
  "rows": [
    {
      "collapse": false,
      "height": "100px",
      "panels": [
        {
          "cacheTimeout": null,
          "colorBackground": false,
          "colorValue": true,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "datasource": "${DS_PROMETHEUS}",
          "decimals": 1,
          "editable": true,
          "error": false,
          "format": "s",
          "gauge": {
            "maxValue": 100,
            "minValue": 0,
            "show": false,
            "thresholdLabels": false,
            "thresholdMarkers": true
          },
          "height": "",
          "id": 63,
          "interval": null,
          "links": [],
          "mappingType": 1,
          "mappingTypes": [
            {
              "name": "value to text",
              "value": 1
            },
            {
              "name": "range to text",
              "value": 2
            }
          ],
          "maxDataPoints": 100,
          "nullPointMode": "connected",
          "nullText": null,
          "postfix": "",
          "postfixFontSize": "50%",
          "prefix": "",
          "prefixFontSize": "70%",
          "rangeMaps": [
            {
              "from": "null",
              "text": "N/A",
              "to": "null"
            }
          ],
          "span": 3,
          "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
          },
          "tableColumn": "",
          "targets": [
            {
              "expr": "process_uptime_seconds{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "",
              "metric": "",
              "refId": "A",
              "step": 14400
            }
          ],
          "thresholds": "",
          "title": "Uptime",
          "transparent": false,
          "type": "singlestat",
          "valueFontSize": "80%",
          "valueMaps": [
            {
              "op": "=",
              "text": "N/A",
              "value": "null"
            }
          ],
          "valueName": "current"
        },
        {
          "cacheTimeout": null,
          "colorBackground": false,
          "colorValue": true,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "datasource": "${DS_PROMETHEUS}",
          "decimals": null,
          "editable": true,
          "error": false,
          "format": "dateTimeAsIso",
          "gauge": {
            "maxValue": 100,
            "minValue": 0,
            "show": false,
            "thresholdLabels": false,
            "thresholdMarkers": true
          },
          "height": "",
          "id": 92,
          "interval": null,
          "links": [],
          "mappingType": 1,
          "mappingTypes": [
            {
              "name": "value to text",
              "value": 1
            },
            {
              "name": "range to text",
              "value": 2
            }
          ],
          "maxDataPoints": 100,
          "nullPointMode": "connected",
          "nullText": null,
          "postfix": "",
          "postfixFontSize": "50%",
          "prefix": "",
          "prefixFontSize": "70%",
          "rangeMaps": [
            {
              "from": "null",
              "text": "N/A",
              "to": "null"
            }
          ],
          "span": 3,
          "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
          },
          "tableColumn": "",
          "targets": [
            {
              "expr": "process_start_time_seconds{application=\"$application\", instance=\"$instance\"}*1000",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "",
              "metric": "",
              "refId": "A",
              "step": 14400
            }
          ],
          "thresholds": "",
          "title": "Start time",
          "transparent": false,
          "type": "singlestat",
          "valueFontSize": "70%",
          "valueMaps": [
            {
              "op": "=",
              "text": "N/A",
              "value": "null"
            }
          ],
          "valueName": "current"
        },
        {
          "cacheTimeout": null,
          "colorBackground": false,
          "colorValue": true,
          "colors": [
            "rgba(50, 172, 45, 0.97)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(245, 54, 54, 0.9)"
          ],
          "datasource": "${DS_PROMETHEUS}",
          "decimals": 2,
          "editable": true,
          "error": false,
          "format": "percent",
          "gauge": {
            "maxValue": 100,
            "minValue": 0,
            "show": false,
            "thresholdLabels": false,
            "thresholdMarkers": true
          },
          "id": 65,
          "interval": null,
          "links": [],
          "mappingType": 1,
          "mappingTypes": [
            {
              "name": "value to text",
              "value": 1
            },
            {
              "name": "range to text",
              "value": 2
            }
          ],
          "maxDataPoints": 100,
          "nullPointMode": "connected",
          "nullText": null,
          "postfix": "",
          "postfixFontSize": "50%",
          "prefix": "",
          "prefixFontSize": "70%",
          "rangeMaps": [
            {
              "from": "null",
              "text": "N/A",
              "to": "null"
            }
          ],
          "span": 3,
          "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
          },
          "tableColumn": "",
          "targets": [
            {
              "expr": "sum(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"heap\"})*100/sum(jvm_memory_max_bytes{application=\"$application\",instance=\"$instance\", area=\"heap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "",
              "refId": "A",
              "step": 14400
            }
          ],
          "thresholds": "70,90",
          "title": "Heap used",
          "type": "singlestat",
          "valueFontSize": "80%",
          "valueMaps": [
            {
              "op": "=",
              "text": "N/A",
              "value": "null"
            }
          ],
          "valueName": "current"
        },
        {
          "cacheTimeout": null,
          "colorBackground": false,
          "colorValue": true,
          "colors": [
            "rgba(50, 172, 45, 0.97)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(245, 54, 54, 0.9)"
          ],
          "datasource": "${DS_PROMETHEUS}",
          "decimals": 2,
          "editable": true,
          "error": false,
          "format": "percent",
          "gauge": {
            "maxValue": 100,
            "minValue": 0,
            "show": false,
            "thresholdLabels": false,
            "thresholdMarkers": true
          },
          "id": 75,
          "interval": null,
          "links": [],
          "mappingType": 2,
          "mappingTypes": [
            {
              "name": "value to text",
              "value": 1
            },
            {
              "name": "range to text",
              "value": 2
            }
          ],
          "maxDataPoints": 100,
          "nullPointMode": "connected",
          "nullText": null,
          "postfix": "",
          "postfixFontSize": "50%",
          "prefix": "",
          "prefixFontSize": "70%",
          "rangeMaps": [
            {
              "from": "null",
              "text": "N/A",
              "to": "null"
            },
            {
              "from": "-99999999999999999999999999999999",
              "text": "N/A",
              "to": "0"
            }
          ],
          "span": 3,
          "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
          },
          "tableColumn": "",
          "targets": [
            {
              "expr": "sum(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"nonheap\"})*100/sum(jvm_memory_max_bytes{application=\"$application\",instance=\"$instance\", area=\"nonheap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "",
              "refId": "A",
              "step": 14400
            }
          ],
          "thresholds": "70,90",
          "title": "Non-Heap used",
          "type": "singlestat",
          "valueFontSize": "80%",
          "valueMaps": [
            {
              "op": "=",
              "text": "N/A",
              "value": "null"
            },
            {
              "op": "=",
              "text": "x",
              "value": ""
            }
          ],
          "valueName": "current"
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "Quick Facts",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": 250,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 111,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(rate(http_server_requests_seconds_count{application=\"$application\", instance=\"$instance\"}[1m]))",
              "format": "time_series",
              "intervalFactor": 1,
              "legendFormat": "HTTP",
              "refId": "A"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Rate",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "decimals": null,
              "format": "ops",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {
            "HTTP": "#890f02",
            "HTTP - 5xx": "#bf1b00"
          },
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 112,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(rate(http_server_requests_seconds_count{application=\"$application\", instance=\"$instance\", status=~\"5..\"}[1m]))",
              "format": "time_series",
              "intervalFactor": 1,
              "legendFormat": "HTTP - 5xx",
              "refId": "A"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Errors",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "decimals": null,
              "format": "ops",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 113,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(rate(http_server_requests_seconds_sum{application=\"$application\", instance=\"$instance\", status!~\"5..\"}[1m]))/sum(rate(http_server_requests_seconds_count{application=\"$application\", instance=\"$instance\", status!~\"5..\"}[1m]))",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "HTTP - AVG",
              "refId": "A"
            },
            {
              "expr": "max(http_server_requests_seconds_max{application=\"$application\", instance=\"$instance\", status!~\"5..\"})",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "HTTP - MAX",
              "refId": "B"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Duration",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "s",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "description": "",
          "fill": 1,
          "id": 119,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "tomcat_threads_busy_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "TOMCAT - BSY",
              "refId": "A"
            },
            {
              "expr": "tomcat_threads_current_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "TOMCAT - CUR",
              "refId": "B"
            },
            {
              "expr": "tomcat_threads_config_max_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "TOMCAT - MAX",
              "refId": "C"
            },
            {
              "expr": "jetty_threads_busy{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "JETTY - BSY",
              "refId": "D"
            },
            {
              "expr": "jetty_threads_current{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "JETTY - CUR",
              "refId": "E"
            },
            {
              "expr": "jetty_threads_config_max{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "JETTY - MAX",
              "refId": "F"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Utilisation",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "I/O Overview",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 24,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"heap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "used",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_committed_bytes{application=\"$application\", instance=\"$instance\", area=\"heap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "committed",
              "refId": "B",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_max_bytes{application=\"$application\", instance=\"$instance\", area=\"heap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "max",
              "refId": "C",
              "step": 2400
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "JVM Heap",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 25,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"nonheap\"})",
              "format": "time_series",
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "used",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_committed_bytes{application=\"$application\", instance=\"$instance\", area=\"nonheap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "committed",
              "refId": "B",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_max_bytes{application=\"$application\", instance=\"$instance\", area=\"nonheap\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "max",
              "refId": "C",
              "step": 2400
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "JVM Non-Heap",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 26,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "used",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_committed_bytes{application=\"$application\", instance=\"$instance\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "committed",
              "refId": "B",
              "step": 2400
            },
            {
              "expr": "sum(jvm_memory_max_bytes{application=\"$application\", instance=\"$instance\"})",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "max",
              "refId": "C",
              "step": 2400
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "JVM Total",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 86,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "process_memory_vss_bytes{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": true,
              "intervalFactor": 2,
              "legendFormat": "vss",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "process_memory_rss_bytes{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "rss",
              "refId": "B"
            },
            {
              "expr": "process_memory_swap_bytes{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "swap",
              "refId": "C"
            },
            {
              "expr": "process_memory_rss_bytes{application=\"$application\", instance=\"$instance\"} + process_memory_swap_bytes{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "total",
              "refId": "D"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "JVM Process Memory",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "JVM Memory",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": 250,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 106,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "system_cpu_usage{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "system",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "process_cpu_usage{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "process",
              "refId": "B"
            },
            {
              "expr": "avg_over_time(process_cpu_usage{application=\"$application\", instance=\"$instance\"}[15m])",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "process-15m",
              "refId": "C"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "CPU Usage",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "decimals": 1,
              "format": "percentunit",
              "label": "",
              "logBase": 1,
              "max": "1",
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 93,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "system_load_average_1m{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "system-1m",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "system_cpu_count{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "cpus",
              "refId": "B"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Load",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "decimals": 1,
              "format": "short",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 32,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_threads_live_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "live",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "jvm_threads_daemon_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "daemon",
              "metric": "",
              "refId": "B",
              "step": 2400
            },
            {
              "expr": "jvm_threads_peak_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "peak",
              "refId": "C",
              "step": 2400
            },
            {
              "expr": "process_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "process",
              "refId": "D",
              "step": 2400
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Threads",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "decimals": 0,
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {
            "blocked": "#bf1b00",
            "new": "#fce2de",
            "runnable": "#7eb26d",
            "terminated": "#511749",
            "timed-waiting": "#c15c17",
            "waiting": "#eab839"
          },
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 124,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_threads_states_threads{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "{{state}}",
              "refId": "A"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Thread States",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "description": "The percent of time spent on Garbage Collection over all CPUs assigned to the JVM process.",
          "fill": 1,
          "id": 138,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "sum(rate(jvm_gc_pause_seconds_sum{application=\"$application\", instance=\"$instance\"}[1m])) by (application, instance) / on(application, instance) system_cpu_count",
              "format": "time_series",
              "intervalFactor": 1,
              "legendFormat": "CPU time spent on GC",
              "refId": "A"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "GC Pressure",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "decimals": 1,
              "format": "percentunit",
              "label": null,
              "logBase": 1,
              "max": "1",
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {
            "debug": "#1F78C1",
            "error": "#BF1B00",
            "info": "#508642",
            "trace": "#6ED0E0",
            "warn": "#EAB839"
          },
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "height": "",
          "id": 91,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "hideEmpty": false,
            "hideZero": false,
            "max": true,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": true,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [
            {
              "alias": "error",
              "yaxis": 1
            },
            {
              "alias": "warn",
              "yaxis": 1
            }
          ],
          "spaceLength": 10,
          "span": 6,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "increase(logback_events_total{application=\"$application\", instance=\"$instance\"}[1m])",
              "format": "time_series",
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "{{level}}",
              "metric": "",
              "refId": "A",
              "step": 1200
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Log Events",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "transparent": false,
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "decimals": 0,
              "format": "opm",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 61,
          "legend": {
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 3,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "process_files_open_files{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "open",
              "metric": "",
              "refId": "A",
              "step": 2400
            },
            {
              "expr": "process_files_max_files{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "max",
              "metric": "",
              "refId": "B",
              "step": 2400
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "File Descriptors",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "decimals": 0,
              "format": "short",
              "label": null,
              "logBase": 10,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "JVM Misc",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 3,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "minSpan": 4,
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "repeat": "jvm_memory_pool_heap",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_heap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "used",
              "metric": "",
              "refId": "A",
              "step": 1800
            },
            {
              "expr": "jvm_memory_committed_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_heap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "commited",
              "metric": "",
              "refId": "B",
              "step": 1800
            },
            {
              "expr": "jvm_memory_max_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_heap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "max",
              "metric": "",
              "refId": "C",
              "step": 1800
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "$jvm_memory_pool_heap",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": "persistence_counts",
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "JVM Memory Pools (Heap)",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": 250,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 78,
          "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": true,
            "max": true,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "minSpan": 4,
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "repeat": "jvm_memory_pool_nonheap",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_nonheap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "used",
              "metric": "",
              "refId": "A",
              "step": 1800
            },
            {
              "expr": "jvm_memory_committed_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_nonheap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "commited",
              "metric": "",
              "refId": "B",
              "step": 1800
            },
            {
              "expr": "jvm_memory_max_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_memory_pool_nonheap\"}",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 2,
              "legendFormat": "max",
              "metric": "",
              "refId": "C",
              "step": 1800
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "$jvm_memory_pool_nonheap",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "mbytes",
            "short"
          ],
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "JVM Memory Pools (Non-Heap)",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": 250,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 98,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "rate(jvm_gc_pause_seconds_count{application=\"$application\", instance=\"$instance\"}[1m])",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 1,
              "legendFormat": "{{action}} ({{cause}})",
              "refId": "A"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Collections",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "ops",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 101,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "rate(jvm_gc_pause_seconds_sum{application=\"$application\", instance=\"$instance\"}[1m])/rate(jvm_gc_pause_seconds_count{application=\"$application\", instance=\"$instance\"}[1m])",
              "format": "time_series",
              "hide": false,
              "instant": false,
              "intervalFactor": 1,
              "legendFormat": "avg {{action}} ({{cause}})",
              "refId": "A"
            },
            {
              "expr": "jvm_gc_pause_seconds_max{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "hide": false,
              "instant": false,
              "intervalFactor": 1,
              "legendFormat": "max {{action}} ({{cause}})",
              "refId": "B"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Pause Durations",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "s",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 99,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "rate(jvm_gc_memory_allocated_bytes_total{application=\"$application\", instance=\"$instance\"}[1m])",
              "format": "time_series",
              "interval": "",
              "intervalFactor": 1,
              "legendFormat": "allocated",
              "refId": "A"
            },
            {
              "expr": "rate(jvm_gc_memory_promoted_bytes_total{application=\"$application\", instance=\"$instance\"}[1m])",
              "format": "time_series",
              "interval": "",
              "intervalFactor": 1,
              "legendFormat": "promoted",
              "refId": "B"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Allocated/Promoted",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "Bps",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "Garbage Collection",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 37,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 6,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_classes_loaded_classes{application=\"$application\", instance=\"$instance\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "loaded",
              "metric": "",
              "refId": "A",
              "step": 1200
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Classes loaded",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ],
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null
          },
          "id": 38,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "span": 6,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "delta(jvm_classes_loaded_classes{application=\"$application\",instance=\"$instance\"}[1m])",
              "format": "time_series",
              "hide": false,
              "interval": "",
              "intervalFactor": 1,
              "legendFormat": "delta-1m",
              "metric": "",
              "refId": "A",
              "step": 1200
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "Class delta",
          "tooltip": {
            "msResolution": false,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "y-axis": true,
          "y_formats": [
            "ops",
            "short"
          ],
          "yaxes": [
            {
              "decimals": null,
              "format": "short",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "Classloading",
      "titleSize": "h6"
    },
    {
      "collapse": false,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_PROMETHEUS}",
          "fill": 1,
          "id": 131,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "minSpan": 4,
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "repeat": "jvm_buffer_pool",
          "seriesOverrides": [
            {
              "alias": "count",
              "yaxis": 2
            },
            {
              "alias": "buffers",
              "yaxis": 2
            }
          ],
          "spaceLength": 10,
          "span": 4,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "expr": "jvm_buffer_memory_used_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_buffer_pool\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "used",
              "refId": "A"
            },
            {
              "expr": "jvm_buffer_total_capacity_bytes{application=\"$application\", instance=\"$instance\", id=~\"$jvm_buffer_pool\"}",
              "format": "time_series",
              "intervalFactor": 2,
              "legendFormat": "capacity",
              "refId": "B"
            },
            {
              "expr": "jvm_buffer_count_buffers{application=\"$application\", instance=\"$instance\", id=~\"$jvm_buffer_pool\"}",
              "format": "time_series",
              "hide": false,
              "intervalFactor": 2,
              "legendFormat": "buffers",
              "refId": "C"
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "$jvm_buffer_pool",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "decbytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            },
            {
              "decimals": 0,
              "format": "short",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": "0",
              "show": true
            }
          ]
        }
      ],
      "repeat": null,
      "repeatIteration": null,
      "repeatRowId": null,
      "showTitle": true,
      "title": "Buffer Pools",
      "titleSize": "h6"
    }
  ],
  "schemaVersion": 14,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": [
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_PROMETHEUS}",
        "hide": 0,
        "includeAll": false,
        "label": "Application",
        "multi": false,
        "name": "application",
        "options": [],
        "query": "label_values(application)",
        "refresh": 2,
        "regex": "",
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allFormat": "glob",
        "allValue": null,
        "current": {},
        "datasource": "${DS_PROMETHEUS}",
        "hide": 0,
        "includeAll": false,
        "label": "Instance",
        "multi": false,
        "multiFormat": "glob",
        "name": "instance",
        "options": [],
        "query": "label_values(jvm_memory_used_bytes{application=\"$application\"}, instance)",
        "refresh": 2,
        "regex": "",
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allFormat": "glob",
        "allValue": null,
        "current": {},
        "datasource": "${DS_PROMETHEUS}",
        "hide": 2,
        "includeAll": true,
        "label": "JVM Memory Pools Heap",
        "multi": false,
        "multiFormat": "glob",
        "name": "jvm_memory_pool_heap",
        "options": [],
        "query": "label_values(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"heap\"},id)",
        "refresh": 1,
        "regex": "",
        "sort": 1,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allFormat": "glob",
        "allValue": null,
        "current": {},
        "datasource": "${DS_PROMETHEUS}",
        "hide": 2,
        "includeAll": true,
        "label": "JVM Memory Pools Non-Heap",
        "multi": false,
        "multiFormat": "glob",
        "name": "jvm_memory_pool_nonheap",
        "options": [],
        "query": "label_values(jvm_memory_used_bytes{application=\"$application\", instance=\"$instance\", area=\"nonheap\"},id)",
        "refresh": 1,
        "regex": "",
        "sort": 2,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allFormat": "glob",
        "allValue": null,
        "current": {},
        "datasource": "${DS_PROMETHEUS}",
        "hide": 2,
        "includeAll": true,
        "label": "JVM Buffer Pools",
        "multi": false,
        "multiFormat": "glob",
        "name": "jvm_buffer_pool",
        "options": [],
        "query": "label_values(jvm_buffer_memory_used_bytes{application=\"$application\", instance=\"$instance\"},id)",
        "refresh": 1,
        "regex": "",
        "sort": 1,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      }
    ]
  },
  "time": {
    "from": "now-24h",
    "to": "now"
  },
  "timepicker": {
    "now": true,
    "refresh_intervals": [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ]
  },
  "timezone": "browser",
  "title": "JVM (Micrometer)",
  "version": 33
}

~~~



### 4701-显示调整

如果Spring应用没有配置management.metrics.tags.application名称，prometheus配置后，可能会出现查询不到配置的监控情况。可以通过将配置中application都替换陈job。



### 16107(gateway)

~~~json
{
  "__inputs": [
    {
      "name": "DS_INFLUXDB",
      "label": "influxDB",
      "description": "",
      "type": "datasource",
      "pluginId": "influxdb",
      "pluginName": "InfluxDB"
    }
  ],
  "__requires": [
    {
      "type": "panel",
      "id": "blackmirror1-singlestat-math-panel",
      "name": "Singlestat Math",
      "version": "1.1.2"
    },
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "6.6.1"
    },
    {
      "type": "panel",
      "id": "graph",
      "name": "Graph",
      "version": ""
    },
    {
      "type": "datasource",
      "id": "influxdb",
      "name": "InfluxDB",
      "version": "1.0.0"
    },
    {
      "type": "panel",
      "id": "michaeldmoore-annunciator-panel",
      "name": "Annunciator",
      "version": "1.0.2"
    },
    {
      "type": "panel",
      "id": "singlestat",
      "name": "Singlestat",
      "version": ""
    },
    {
      "type": "panel",
      "id": "table",
      "name": "Table",
      "version": ""
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "gnetId": 16107,
  "graphTooltip": 0,
  "id": null,
  "iteration": 1649988189186,
  "links": [],
  "panels": [
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 57,
      "panels": [],
      "title": "Quick Facts",
      "type": "row"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "dateTimeAsIso",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 2,
        "w": 4,
        "x": 0,
        "y": 1
      },
      "hideTimeOverride": true,
      "id": 121,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "process_start_time",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "10m",
      "title": "启动时间",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#629e51",
        "#e0f9d7",
        "#e24d42"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "description": "占系统总cpu的比例",
      "format": "percentunit",
      "gauge": {
        "maxValue": 1,
        "minValue": 0,
        "show": true,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 4,
        "x": 4,
        "y": 1
      },
      "id": 67,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "value",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgb(213, 243, 203)",
        "full": false,
        "lineColor": "#f9934e",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "value",
          "groupBy": [],
          "measurement": "process_cpu_usage",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": "",
      "title": "进程CPU使用率",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "50%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "LowerLimit": {
        "Color": "rgb(2, 17, 249)",
        "Decimals": "1",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "20"
      },
      "LowerWarning": {
        "Color": "rgb(9, 115, 102)",
        "DisplayOption": "disabled",
        "Value": "25"
      },
      "Metric": {
        "Color": "rgb(2, 247, 2)",
        "Decimals": "4",
        "FontSize": "100%",
        "Format": "none",
        "Name": "current"
      },
      "MetricValueRange": "",
      "Postfix": {
        "FontSize": "hide",
        "Text": ""
      },
      "Prefix": {
        "FontSize": "100%",
        "Text": ""
      },
      "UpperLimit": {
        "Color": "rgb(247, 90, 7)",
        "Decimals": "2",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "65535"
      },
      "UpperWarning": {
        "Color": "#f2c96d",
        "DisplayOption": "flash",
        "Value": "39321"
      },
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 6,
        "w": 4,
        "x": 8,
        "y": 1
      },
      "id": 110,
      "links": [],
      "options": {},
      "sparkline": {
        "fillColor": "rgba(19, 193, 91, 0.32)",
        "full": true,
        "lineColor": "rgb(145, 200, 16)",
        "show": true
      },
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_threads_live",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "title": "线程数",
      "type": "michaeldmoore-annunciator-panel"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 4,
        "x": 12,
        "y": 1
      },
      "hideTimeOverride": false,
      "id": 111,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "query": "SELECT sum(\"count\") FROM \"jvm_gc_pause\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"ip\" =~ /^$ip$/ AND \"project\" =~ /^$project$/ AND \"host\" =~ /^$host$/ AND \"action\" = 'end_of_minor_GC' AND \"cause\" != 'CMS_Final_Remark') AND $timeFilter",
          "rawQuery": false,
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "1d",
      "timeShift": null,
      "title": "年轻代GC次数",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 4,
        "x": 16,
        "y": 1
      },
      "hideTimeOverride": false,
      "id": 113,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "query": "SELECT sum(\"count\") FROM \"jvm_gc_pause\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"ip\" =~ /^$ip$/ AND \"project\" =~ /^$project$/ AND \"host\" =~ /^$host$/ AND (\"cause\" = 'CMS\\\\ Final\\\\ Remark' OR \"cause\" = 'CMS_Final_Remark' OR action='end_of_major_GC' )) AND $timeFilter",
          "rawQuery": true,
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS_Final_Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "1d",
      "title": "老年代GC次数",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "format": "bytes",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 4,
        "x": 20,
        "y": 1
      },
      "hideTimeOverride": true,
      "id": 120,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "A+B+C",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "A",
          "groupBy": [],
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Eden_Space"
            }
          ]
        },
        {
          "alias": "B",
          "groupBy": [],
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "CMS_Old_Gen"
            }
          ]
        },
        {
          "alias": "C",
          "groupBy": [],
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Survivor_Space"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "10m",
      "title": "Heap已使用",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "avg"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "ms",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 2,
        "w": 4,
        "x": 0,
        "y": 3
      },
      "hideTimeOverride": true,
      "id": 59,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "process_uptime",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "10m",
      "title": "运行时长",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": true,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 6,
      "format": "s",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 2,
        "w": 4,
        "x": 0,
        "y": 5
      },
      "id": 128,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "machine_date_offset",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "host",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": "1,2",
      "title": "时间最大误差",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 2,
        "w": 4,
        "x": 0,
        "y": 7
      },
      "hideTimeOverride": true,
      "id": 117,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              },
              {
                "params": [
                  " / 300"
                ],
                "type": "math"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "5m",
      "title": "QPS",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#629e51",
        "#e0f9d7",
        "#e24d42"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "description": "占系统总cpu数比例",
      "format": "percentunit",
      "gauge": {
        "maxValue": 1,
        "minValue": 0,
        "show": true,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 4,
        "x": 4,
        "y": 7
      },
      "id": 71,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "value",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgb(213, 243, 203)",
        "full": false,
        "lineColor": "#f9934e",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "value",
          "groupBy": [],
          "measurement": "system_cpu_usage",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": "",
      "title": "系统CPU使用率",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "50%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "LowerLimit": {
        "Color": "rgb(2, 17, 249)",
        "Decimals": "1",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "20"
      },
      "LowerWarning": {
        "Color": "rgb(9, 115, 102)",
        "DisplayOption": "disabled",
        "Value": "25"
      },
      "Metric": {
        "Color": "rgb(2, 247, 2)",
        "Decimals": 2,
        "FontSize": "70%",
        "Format": "none",
        "Name": "current"
      },
      "MetricValueRange": "",
      "Postfix": {
        "FontSize": "hide",
        "Text": ""
      },
      "Prefix": {
        "FontSize": "70%",
        "Text": ""
      },
      "UpperLimit": {
        "Color": "rgb(247, 90, 7)",
        "Decimals": "2",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "80"
      },
      "UpperWarning": {
        "Color": "#f2c96d",
        "DisplayOption": "flash",
        "Value": "60"
      },
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 5,
        "w": 4,
        "x": 8,
        "y": 7
      },
      "id": 69,
      "links": [],
      "options": {},
      "sparkline": {
        "fillColor": "rgba(19, 193, 91, 0.32)",
        "full": true,
        "lineColor": "rgb(145, 200, 16)",
        "show": true
      },
      "targets": [
        {
          "groupBy": [],
          "measurement": "system_load_average_1m",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "timeFrom": null,
      "title": "系统最近1分钟负载",
      "type": "michaeldmoore-annunciator-panel"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "ms",
      "gauge": {
        "maxValue": null,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 4,
        "x": 12,
        "y": 7
      },
      "id": 112,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "time/count",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "count",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            }
          ]
        },
        {
          "alias": "time",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "1d",
      "title": "年轻代GC平均耗时",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "ms",
      "gauge": {
        "maxValue": null,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 4,
        "x": 16,
        "y": 7
      },
      "id": 114,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "time/count",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "time",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS_Final_Remark"
            }
          ]
        },
        {
          "alias": "count",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS_Final_Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "1d",
      "title": "老年代GC平均耗时",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "format": "bytes",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 4,
        "x": 20,
        "y": 7
      },
      "hideTimeOverride": true,
      "id": 119,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "A+B+C",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "A",
          "groupBy": [],
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Eden_Space"
            }
          ]
        },
        {
          "alias": "B",
          "groupBy": [],
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "CMS_Old_Gen"
            }
          ]
        },
        {
          "alias": "C",
          "groupBy": [],
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Survivor_Space"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": "10m",
      "title": "Heap最大值",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "avg"
    },
    {
      "LowerLimit": {
        "Color": "rgb(2, 17, 249)",
        "Decimals": "1",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "20"
      },
      "LowerWarning": {
        "Color": "rgb(9, 115, 102)",
        "DisplayOption": "disabled",
        "Value": "25"
      },
      "Metric": {
        "Color": "rgb(2, 247, 2)",
        "Decimals": "4",
        "FontSize": "100%",
        "Format": "none",
        "Name": "current"
      },
      "MetricValueRange": "",
      "Postfix": {
        "FontSize": "hide",
        "Text": ""
      },
      "Prefix": {
        "FontSize": "100%",
        "Text": ""
      },
      "UpperLimit": {
        "Color": "rgb(247, 90, 7)",
        "Decimals": "2",
        "DisplayOption": "disabled",
        "FontSize": "50%",
        "Value": "65535"
      },
      "UpperWarning": {
        "Color": "#f2c96d",
        "DisplayOption": "flash",
        "Value": "39321"
      },
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 3,
        "w": 4,
        "x": 0,
        "y": 9
      },
      "id": 61,
      "links": [],
      "options": {},
      "sparkline": {
        "fillColor": "rgba(19, 193, 91, 0.32)",
        "full": true,
        "lineColor": "rgb(145, 200, 16)",
        "show": true
      },
      "targets": [
        {
          "groupBy": [],
          "measurement": "process_files_open",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "title": "打开文件数",
      "type": "michaeldmoore-annunciator-panel"
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 12
      },
      "id": 9,
      "panels": [],
      "repeat": null,
      "title": "Request",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 13
      },
      "hiddenSeries": false,
      "id": 2,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [
        {
          "alias": "QPS",
          "yaxis": 2
        }
      ],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "Total",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            }
          ]
        },
        {
          "alias": "[[tag_ip]]",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "ip"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            }
          ]
        },
        {
          "alias": "QPS",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "query": "SELECT sum(\"count\")/60 FROM \"http_server_requests\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"host\" =~ /^$host$/ AND \"status\" =~ /^$status$/) AND $timeFilter GROUP BY time(1m)",
          "rawQuery": true,
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "请求量/服务器IP",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 13
      },
      "hiddenSeries": false,
      "id": 3,
      "legend": {
        "avg": false,
        "current": false,
        "hideEmpty": false,
        "hideZero": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "Total",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            }
          ],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            }
          ]
        },
        {
          "alias": "[[tag_status]]",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "status"
              ],
              "type": "tag"
            }
          ],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "请求量/状态码",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 10,
        "w": 24,
        "x": 0,
        "y": 22
      },
      "hiddenSeries": false,
      "id": 4,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": false,
        "hideEmpty": false,
        "hideZero": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "sort": "avg",
        "sortDesc": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "Total",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            }
          ],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            },
            {
              "condition": "AND",
              "key": "uri",
              "operator": "=~",
              "value": "/^$uri$/"
            }
          ]
        },
        {
          "alias": "[[tag_uri]]",
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "uri"
              ],
              "type": "tag"
            }
          ],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            },
            {
              "condition": "AND",
              "key": "uri",
              "operator": "=~",
              "value": "/^$uri$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "请求量/请求Url",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 32
      },
      "id": 13,
      "panels": [],
      "repeat": null,
      "title": "Request Time",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 24,
        "x": 0,
        "y": 33
      },
      "hiddenSeries": false,
      "id": 5,
      "legend": {
        "avg": false,
        "current": false,
        "hideEmpty": false,
        "hideZero": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "[[tag_uri]]",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            },
            {
              "params": [
                "uri"
              ],
              "type": "tag"
            },
            {
              "params": [
                "0"
              ],
              "type": "fill"
            }
          ],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "mean"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "mean"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "uri",
              "operator": "=~",
              "value": "/^$uri$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "耗时/请求Url",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "ms",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "ms",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "columns": [],
      "datasource": "${DS_INFLUXDB}",
      "fontSize": "100%",
      "gridPos": {
        "h": 11,
        "w": 24,
        "x": 0,
        "y": 42
      },
      "id": 7,
      "links": [],
      "options": {},
      "pageSize": null,
      "scroll": true,
      "showHeader": true,
      "sort": {
        "col": 4,
        "desc": true
      },
      "styles": [
        {
          "alias": "Time",
          "align": "auto",
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "pattern": "Time",
          "type": "date"
        },
        {
          "alias": "请求量",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": null,
          "mappingType": 1,
          "pattern": "请求量",
          "thresholds": [],
          "type": "number",
          "unit": "none"
        },
        {
          "alias": "状态值",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "状态值",
          "thresholds": [],
          "type": "string",
          "unit": "short"
        },
        {
          "alias": "平均耗时",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "平均耗时",
          "thresholds": [],
          "type": "number",
          "unit": "ms"
        },
        {
          "alias": "TP99",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "耗时TP99",
          "thresholds": [],
          "type": "number",
          "unit": "ms"
        },
        {
          "alias": "最大值",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "最大值",
          "thresholds": [],
          "type": "number",
          "unit": "ms"
        },
        {
          "alias": "最小值",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "最小值",
          "thresholds": [],
          "type": "number",
          "unit": "ms"
        },
        {
          "alias": "IP",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "ip",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        },
        {
          "alias": "请求Url",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "请求Url",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        },
        {
          "alias": "",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "decimals": 2,
          "pattern": "/.*/",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        }
      ],
      "targets": [
        {
          "alias": "",
          "groupBy": [],
          "measurement": "http_server_requests",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "table",
          "select": [
            [
              {
                "params": [
                  "ip"
                ],
                "type": "field"
              }
            ],
            [
              {
                "params": [
                  "uri"
                ],
                "type": "field"
              },
              {
                "params": [
                  "请求Url"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "status"
                ],
                "type": "field"
              },
              {
                "params": [
                  "状态值"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "mean"
                ],
                "type": "field"
              },
              {
                "params": [
                  "10"
                ],
                "type": "top"
              },
              {
                "params": [
                  "平均耗时"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "99_percentile"
                ],
                "type": "field"
              },
              {
                "params": [
                  "耗时TP99"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "upper"
                ],
                "type": "field"
              },
              {
                "params": [
                  "最大值"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "lower"
                ],
                "type": "field"
              },
              {
                "params": [
                  "最小值"
                ],
                "type": "alias"
              }
            ],
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [
                  "请求量"
                ],
                "type": "alias"
              }
            ]
          ],
          "tags": [
            {
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "status",
              "operator": "=~",
              "value": "/^$status$/"
            },
            {
              "condition": "AND",
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            }
          ]
        }
      ],
      "title": "慢请求（10s平均值）",
      "transform": "table",
      "type": "table"
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 53
      },
      "id": 100,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 15
          },
          "id": 102,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "守护线程数",
              "groupBy": [],
              "measurement": "jvm_threads_daemon",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "线程数",
              "groupBy": [],
              "measurement": "jvm_threads_live",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "线程数峰值",
              "groupBy": [],
              "measurement": "jvm_threads_peak",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "JVM Threads",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 15
          },
          "id": 93,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "system_load_average_1m",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "System Load",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 24
          },
          "id": 74,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "process_cpu_usage",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "system_cpu_usage",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Cpu Usage",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percentunit",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 24
          },
          "id": 98,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "open",
              "groupBy": [],
              "hide": false,
              "measurement": "process_files_open",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "max",
              "groupBy": [],
              "hide": false,
              "measurement": "process_files_max",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Process Files",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "decimals": 6,
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 33
          },
          "id": 130,
          "legend": {
            "avg": false,
            "current": true,
            "hideEmpty": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "误差值",
              "groupBy": [],
              "measurement": "machine_date_offset",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeShift": null,
          "title": "系统时间误差",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "decimals": null,
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        }
      ],
      "title": "JVM Misc",
      "type": "row"
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 54
      },
      "id": 33,
      "panels": [],
      "title": "JVM GC",
      "type": "row"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 6,
        "x": 0,
        "y": 55
      },
      "hideTimeOverride": true,
      "id": 39,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "query": "SELECT sum(\"count\") FROM \"jvm_gc_pause\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"ip\" =~ /^$ip$/ AND \"project\" =~ /^$project$/ AND \"host\" =~ /^$host$/ AND \"cause\" != 'CMS_Final_Remark' AND \"action\" = 'end_of_minor_GC') AND $timeFilter",
          "rawQuery": false,
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": null,
      "title": "年轻代GC次数",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "ms",
      "gauge": {
        "maxValue": null,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 6,
        "x": 6,
        "y": 55
      },
      "id": 41,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "time/count",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "count",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            }
          ]
        },
        {
          "alias": "time",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "action",
              "operator": "=",
              "value": "end_of_minor_GC"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "!=",
              "value": "CMS_Final_Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "title": "年轻代GC平均耗时",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 6,
        "x": 12,
        "y": 55
      },
      "hideTimeOverride": true,
      "id": 35,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "query": "SELECT sum(\"count\") FROM \"jvm_gc_pause\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"ip\" =~ /^$ip$/ AND \"project\" =~ /^$project$/ AND \"host\" =~ /^$host$/ AND (\"cause\" = 'CMS\\\\ Final\\\\ Remark' OR \"cause\" = 'CMS_Final_Remark' OR action='end_of_major_GC' )) AND $timeFilter",
          "rawQuery": true,
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS\\ Final\\ Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": null,
      "title": "老年代GC次数",
      "type": "singlestat",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        },
        {
          "op": "=",
          "text": "0",
          "value": "N/A"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#299c46",
        "rgba(237, 129, 40, 0.89)",
        "#d44a3a"
      ],
      "datasource": "${DS_INFLUXDB}",
      "format": "ms",
      "gauge": {
        "maxValue": null,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 6,
        "w": 6,
        "x": 18,
        "y": 55
      },
      "id": 37,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "time/count",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "time",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS\\ Final\\ Remark"
            }
          ]
        },
        {
          "alias": "count",
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "cause",
              "operator": "=",
              "value": "CMS\\ Final\\ Remark"
            }
          ]
        }
      ],
      "thresholds": "",
      "title": "老年代GC平均耗时",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "80%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 0,
        "y": 61
      },
      "hiddenSeries": false,
      "id": 75,
      "legend": {
        "alignAsTable": true,
        "avg": true,
        "current": true,
        "max": true,
        "min": true,
        "rightSide": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "groupBy": [],
          "hide": false,
          "measurement": "jvm_gc_memory_allocated",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "",
          "groupBy": [],
          "hide": false,
          "measurement": "jvm_gc_memory_promoted",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "allocated/promoted",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": true,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 8,
        "y": 61
      },
      "hiddenSeries": false,
      "id": 76,
      "legend": {
        "alignAsTable": true,
        "avg": true,
        "current": true,
        "max": true,
        "min": true,
        "rightSide": false,
        "show": true,
        "total": true,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 1,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "[[tag_action]]([[tag_cause]])",
          "groupBy": [
            {
              "params": [
                "action"
              ],
              "type": "tag"
            },
            {
              "params": [
                "cause"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "GC Pause",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "ms",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "decimals": 0,
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 16,
        "y": 61
      },
      "hiddenSeries": false,
      "id": 77,
      "legend": {
        "alignAsTable": true,
        "avg": true,
        "current": true,
        "max": true,
        "min": true,
        "rightSide": false,
        "show": true,
        "total": true,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 1,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "[[tag_action]]([[tag_cause]])",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            },
            {
              "params": [
                "action"
              ],
              "type": "tag"
            },
            {
              "params": [
                "cause"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_gc_pause",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "GC Times",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "columns": [],
      "datasource": "${DS_INFLUXDB}",
      "fontSize": "100%",
      "gridPos": {
        "h": 11,
        "w": 24,
        "x": 0,
        "y": 70
      },
      "id": 43,
      "links": [],
      "options": {},
      "pageSize": 10,
      "scroll": true,
      "showHeader": true,
      "sort": {
        "col": 3,
        "desc": true
      },
      "styles": [
        {
          "alias": "时间",
          "align": "auto",
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "link": false,
          "pattern": "Time",
          "type": "date"
        },
        {
          "alias": "GC事件",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "jvm_gc_pause.action",
          "thresholds": [],
          "type": "string",
          "unit": "short"
        },
        {
          "alias": "GC原因",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "jvm_gc_pause.cause",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        },
        {
          "alias": "次数",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 0,
          "mappingType": 1,
          "pattern": "jvm_gc_pause.count",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        },
        {
          "alias": "耗时",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 0,
          "mappingType": 1,
          "pattern": "jvm_gc_pause.sum",
          "thresholds": [],
          "type": "number",
          "unit": "ms"
        },
        {
          "alias": "IP",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "dateFormat": "YYYY-MM-DD HH:mm:ss",
          "decimals": 2,
          "mappingType": 1,
          "pattern": "jvm_gc_pause.ip",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        },
        {
          "alias": "",
          "align": "auto",
          "colorMode": null,
          "colors": [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          "decimals": 2,
          "pattern": "/.*/",
          "thresholds": [],
          "type": "number",
          "unit": "short"
        }
      ],
      "targets": [
        {
          "groupBy": [],
          "measurement": "jvm_gc_pause",
          "orderByTime": "DESC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "table",
          "select": [
            [
              {
                "params": [
                  "ip"
                ],
                "type": "field"
              }
            ],
            [
              {
                "params": [
                  "action"
                ],
                "type": "field"
              }
            ],
            [
              {
                "params": [
                  "cause"
                ],
                "type": "field"
              }
            ],
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              }
            ],
            [
              {
                "params": [
                  "sum"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "timeFrom": null,
      "title": "GC明细",
      "transform": "table",
      "type": "table"
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 81
      },
      "id": 88,
      "panels": [],
      "title": "JVM Memory",
      "type": "row"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#629e51",
        "#e0f9d7",
        "#e24d42"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "description": "",
      "format": "percentunit",
      "gauge": {
        "maxValue": 1,
        "minValue": 0,
        "show": true,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 7,
        "w": 12,
        "x": 0,
        "y": 82
      },
      "id": 72,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "used/max",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgb(213, 243, 203)",
        "full": false,
        "lineColor": "#f9934e",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": null,
      "title": "Heap Used",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "50%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": false,
      "colors": [
        "#629e51",
        "#e0f9d7",
        "#e24d42"
      ],
      "datasource": "${DS_INFLUXDB}",
      "decimals": 2,
      "description": "",
      "format": "percentunit",
      "gauge": {
        "maxValue": 1,
        "minValue": 0,
        "show": true,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 7,
        "w": 12,
        "x": 12,
        "y": 82
      },
      "id": 73,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "math": "used/max",
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "options": {},
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgb(213, 243, 203)",
        "full": false,
        "lineColor": "#f9934e",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "nonheap"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "nonheap"
            }
          ]
        }
      ],
      "thresholds": "",
      "timeFrom": null,
      "title": "NonHeap Used",
      "type": "blackmirror1-singlestat-math-panel",
      "valueFontSize": "50%",
      "valueMaps": [
        {
          "op": "=",
          "text": "N/A",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 89
      },
      "hiddenSeries": false,
      "id": 54,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            }
          ]
        },
        {
          "alias": "committed",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_committed",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "heap"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "Heap",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 12,
        "y": 89
      },
      "hiddenSeries": false,
      "id": 55,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "nonheap"
            }
          ]
        },
        {
          "alias": "committed",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_committed",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "nonheap"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "area",
              "operator": "=",
              "value": "nonheap"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "NonHeap",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 97
      },
      "id": 90,
      "panels": [],
      "title": "JVM Heap",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 0,
        "y": 98
      },
      "hiddenSeries": false,
      "id": 45,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Eden_Space"
            }
          ]
        },
        {
          "alias": "committed",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_committed",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Eden_Space"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Eden_Space"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "Eden Space",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 8,
        "y": 98
      },
      "hiddenSeries": false,
      "id": 48,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Survivor_Space"
            }
          ]
        },
        {
          "alias": "committed",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_committed",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Survivor_Space"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "Par_Survivor_Space"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "Survivor Space",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 16,
        "y": 98
      },
      "hiddenSeries": false,
      "id": 49,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "used",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_used",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "D",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "CMS_Old_Gen"
            }
          ]
        },
        {
          "alias": "committed",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_committed",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "CMS_Old_Gen"
            }
          ]
        },
        {
          "alias": "max",
          "groupBy": [
            {
              "params": [
                "id"
              ],
              "type": "tag"
            },
            {
              "params": [
                "area"
              ],
              "type": "tag"
            },
            {
              "params": [
                "statistic"
              ],
              "type": "tag"
            }
          ],
          "hide": false,
          "measurement": "jvm_memory_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            },
            {
              "condition": "AND",
              "key": "id",
              "operator": "=",
              "value": "CMS_Old_Gen"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "CMS Old Gen",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 107
      },
      "id": 92,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 8,
            "x": 0,
            "y": 8
          },
          "id": 51,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "used",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_used",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Code_Cache"
                }
              ]
            },
            {
              "alias": "committed",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_committed",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Code_Cache"
                }
              ]
            },
            {
              "alias": "max",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_max",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "E",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Code_Cache"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Code Cache",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 8,
            "x": 8,
            "y": 8
          },
          "id": 52,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "used",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_used",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Compressed_Class_Space"
                }
              ]
            },
            {
              "alias": "committed",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_committed",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Compressed_Class_Space"
                }
              ]
            },
            {
              "alias": "max",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_max",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "E",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Compressed\\ Class\\ Space"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Compressed Class Space",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 8,
            "x": 16,
            "y": 8
          },
          "id": 50,
          "legend": {
            "avg": false,
            "current": true,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "used",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_used",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Metaspace"
                }
              ]
            },
            {
              "alias": "committed",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_committed",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Metaspace"
                }
              ]
            },
            {
              "alias": "max",
              "groupBy": [
                {
                  "params": [
                    "id"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "area"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "statistic"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "jvm_memory_max",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "E",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "Metaspace"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Metaspace",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        }
      ],
      "title": "JVM NonHeap",
      "type": "row"
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 108
      },
      "id": 104,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 9
          },
          "id": 78,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "jvm_buffer_memory_used",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "direct"
                }
              ]
            },
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "jvm_buffer_total_capacity",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "direct"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "direct buffer size",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 9
          },
          "id": 81,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                }
              ],
              "hide": false,
              "measurement": "jvm_buffer_count",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "spread"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "direct"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "direct buffer count",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 18
          },
          "id": 79,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "jvm_buffer_memory_used",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "mapped"
                }
              ]
            },
            {
              "alias": "",
              "groupBy": [],
              "hide": false,
              "measurement": "jvm_buffer_total_capacity",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "mapped"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "mapped buffer size",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "bytes",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 18
          },
          "id": 80,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                }
              ],
              "hide": false,
              "measurement": "jvm_buffer_count",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "spread"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "id",
                  "operator": "=",
                  "value": "mapped"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "mapped buffer count",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        }
      ],
      "title": "JVM Buffer",
      "type": "row"
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 109
      },
      "id": 15,
      "panels": [],
      "title": "Tomcat",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 4,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 110
      },
      "hiddenSeries": false,
      "id": 29,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "当前值",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "tomcat_threads_current",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "busy数量",
          "groupBy": [],
          "measurement": "tomcat_threads_busy",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "最大值",
          "groupBy": [],
          "measurement": "tomcat_threads_config_max",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "Tomcat线程数",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 4,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 110
      },
      "hiddenSeries": false,
      "id": 30,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "接收数量",
          "groupBy": [
            {
              "params": [
                "10s"
              ],
              "type": "time"
            }
          ],
          "measurement": "tomcat_global_received",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "sum"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "发送数量",
          "groupBy": [],
          "measurement": "tomcat_global_sent",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "接收/发送数据",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "bytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 4,
      "fillGradient": 0,
      "gridPos": {
        "h": 8,
        "w": 24,
        "x": 0,
        "y": 119
      },
      "hiddenSeries": false,
      "id": 31,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "请求数",
          "groupBy": [],
          "hide": false,
          "measurement": "tomcat_global_request",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "C",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "count"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "错误请求数",
          "groupBy": [],
          "hide": false,
          "measurement": "tomcat_global_error",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "E",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "alias": "servlet错误数",
          "groupBy": [],
          "measurement": "tomcat_servlet_error",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "请求数",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 127
      },
      "id": 83,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 11
          },
          "id": 85,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_source]]_connectMax",
              "groupBy": [
                {
                  "params": [
                    "source"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "datasource",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "connectMax"
                }
              ]
            },
            {
              "alias": "[[tag_source]]_connectMin",
              "groupBy": [
                {
                  "params": [
                    "source"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "datasource",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "connectMin"
                }
              ]
            },
            {
              "alias": "[[tag_source]]_connectActive",
              "groupBy": [
                {
                  "params": [
                    "source"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "datasource",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "connectActive"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Datasource Common",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 11
          },
          "id": 86,
          "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "max": true,
            "min": true,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_source]]_[[tag_type]]",
              "groupBy": [
                {
                  "params": [
                    "source"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "type"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "datasource",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "!=",
                  "value": "connectMax"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "!=",
                  "value": "connectCount"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "!=",
                  "value": "connectMin"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "!=",
                  "value": "notEmptyWaitNanos"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "Datasource Customized",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "columns": [],
          "datasource": "${DS_INFLUXDB}",
          "fontSize": "100%",
          "gridPos": {
            "h": 11,
            "w": 24,
            "x": 0,
            "y": 20
          },
          "hideTimeOverride": true,
          "id": 116,
          "links": [],
          "pageSize": 10,
          "scroll": true,
          "showHeader": true,
          "sort": {
            "col": 0,
            "desc": true
          },
          "styles": [
            {
              "alias": "数据源",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "source",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            },
            {
              "alias": "类型",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "link": true,
              "linkTargetBlank": true,
              "linkTooltip": "查看详情",
              "linkUrl": "http://daimon.autohome.com.cn/grafana/d/Xp4vOEdmz/datasource-detail?refresh=5s&panelId=85&orgId=1&var-department=${department}&var-group=${group}&var-project=${project}&var-host=${host}&var-ip=${ip}&var-source=${__cell_1}&var-type=${__cell}",
              "mappingType": 1,
              "pattern": "type",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            },
            {
              "alias": "时间",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "link": false,
              "mappingType": 1,
              "pattern": "Time",
              "thresholds": [],
              "type": "date",
              "unit": "short"
            },
            {
              "alias": "当前值",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "last",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            },
            {
              "alias": "最大值",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "max",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            },
            {
              "alias": "最小值",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "min",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            },
            {
              "alias": "平均值",
              "align": "auto",
              "colorMode": null,
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "mean",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            }
          ],
          "targets": [
            {
              "groupBy": [
                {
                  "params": [
                    "source"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "type"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "datasource",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "table",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "last"
                  }
                ],
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "max"
                  }
                ],
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "min"
                  }
                ],
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "timeFrom": null,
          "title": "DataSource Detail",
          "transform": "table",
          "type": "table"
        }
      ],
      "title": "Datasource",
      "type": "row"
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 128
      },
      "id": 17,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 8,
            "x": 0,
            "y": 12
          },
          "id": 21,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_key]]_错误数",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_errors",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "[[tag_key]]_执行数",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_execution",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "[[tag_key]]_请求数",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_requests",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "[[tag_key]]_Fallback请求数",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_fallback",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "D",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "错误数",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "decimals": null,
              "format": "none",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "cacheTimeout": null,
          "colorBackground": false,
          "colorValue": false,
          "colors": [
            "#299c46",
            "rgba(237, 129, 40, 0.89)",
            "#bf1b00"
          ],
          "datasource": "${DS_INFLUXDB}",
          "format": "none",
          "gauge": {
            "maxValue": 1,
            "minValue": 0,
            "show": true,
            "thresholdLabels": false,
            "thresholdMarkers": true
          },
          "gridPos": {
            "h": 9,
            "w": 7,
            "x": 8,
            "y": 12
          },
          "hideTimeOverride": true,
          "id": 23,
          "interval": null,
          "links": [],
          "mappingType": 1,
          "mappingTypes": [
            {
              "name": "value to text",
              "value": 1
            },
            {
              "name": "range to text",
              "value": 2
            }
          ],
          "math": "",
          "maxDataPoints": 100,
          "nullPointMode": "connected",
          "nullText": null,
          "postfix": "",
          "postfixFontSize": "50%",
          "prefix": "",
          "prefixFontSize": "50%",
          "rangeMaps": [
            {
              "from": "0",
              "text": "close",
              "to": "0"
            },
            {
              "from": "1",
              "text": "open",
              "to": "1"
            }
          ],
          "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
          },
          "tableColumn": "",
          "targets": [
            {
              "groupBy": [],
              "measurement": "hystrix_circuit_breaker_open",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "key",
                  "operator": "=~",
                  "value": "/^$commomdkey$/"
                }
              ]
            }
          ],
          "thresholds": "",
          "timeFrom": "10m",
          "title": "熔断状态",
          "type": "blackmirror1-singlestat-math-panel",
          "valueFontSize": "80%",
          "valueMaps": [
            {
              "op": "=",
              "text": "close",
              "value": "0"
            },
            {
              "op": "=",
              "text": "open",
              "value": "1"
            }
          ],
          "valueName": "current"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 9,
            "w": 9,
            "x": 15,
            "y": 12
          },
          "id": 25,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_key]]_执行延迟",
              "groupBy": [
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_latency_execution",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "mean"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "[[tag_key]]_总延迟",
              "groupBy": [
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_latency_total",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "mean"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "延迟",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "ms",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "decimals": null,
              "format": "none",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "fill": 1,
          "gridPos": {
            "h": 8,
            "w": 24,
            "x": 0,
            "y": 21
          },
          "id": 19,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_key]]_current",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_threadpool_concurrent_execution_current",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "alias": "[[tag_key]]_max",
              "groupBy": [
                {
                  "params": [
                    "10s"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "key"
                  ],
                  "type": "tag"
                }
              ],
              "hide": false,
              "measurement": "hystrix_threadpool_concurrent_execution_rolling_max",
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                }
              ]
            },
            {
              "groupBy": [
                {
                  "params": [
                    "$__interval"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "null"
                  ],
                  "type": "fill"
                }
              ],
              "orderByTime": "ASC",
              "policy": "default",
              "refId": "C",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": []
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "线程数",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "decimals": null,
              "format": "none",
              "label": "",
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        }
      ],
      "title": "Hystrix",
      "type": "row"
    },
    {
      "collapsed": false,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 129
      },
      "id": 106,
      "panels": [],
      "title": "JVM ClassesLoad",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "${DS_INFLUXDB}",
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 8,
        "w": 24,
        "x": 0,
        "y": 130
      },
      "hiddenSeries": false,
      "id": 53,
      "legend": {
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "options": {
        "dataLinks": []
      },
      "percentage": false,
      "pointradius": 5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "groupBy": [],
          "hide": false,
          "measurement": "jvm_classes_loaded",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        },
        {
          "groupBy": [],
          "hide": false,
          "measurement": "jvm_classes_unloaded",
          "orderByTime": "ASC",
          "policy": "default",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              }
            ]
          ],
          "tags": [
            {
              "key": "department",
              "operator": "=~",
              "value": "/^$department$/"
            },
            {
              "condition": "AND",
              "key": "group",
              "operator": "=~",
              "value": "/^$group$/"
            },
            {
              "condition": "AND",
              "key": "project",
              "operator": "=~",
              "value": "/^$project$/"
            },
            {
              "condition": "AND",
              "key": "host",
              "operator": "=~",
              "value": "/^$host$/"
            },
            {
              "condition": "AND",
              "key": "ip",
              "operator": "=~",
              "value": "/^$ip$/"
            }
          ]
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "classesload",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "decbytes",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": true,
      "datasource": "${DS_INFLUXDB}",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 138
      },
      "id": 126,
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 14
          },
          "hiddenSeries": false,
          "id": 123,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": true,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]_[[tag_type]]",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "type"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "resource",
                  "operator": "=~",
                  "value": "/^$resource$/"
                }
              ]
            },
            {
              "alias": "[[tag_resource]]_success",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "type"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel_rt",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "count"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "resource",
                  "operator": "=~",
                  "value": "/^$resource$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "统计数量",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 14
          },
          "hiddenSeries": false,
          "id": 124,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]_rt",
              "groupBy": [
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "type"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel_rt",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "B",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "mean"
                    ],
                    "type": "field"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "ip",
                  "operator": "=~",
                  "value": "/^$ip$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "resource",
                  "operator": "=~",
                  "value": "/^$resource$/"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "响应时间",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 23
          },
          "hiddenSeries": false,
          "id": 132,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": true,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "exception"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "异常数量_应用维度（不包含设置忽略的异常）",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 23
          },
          "hiddenSeries": false,
          "id": 133,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": true,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]_[[tag_ip]]",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "ip"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "exception"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "异常数量_实例维度（不包含设置忽略的异常）",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 0,
            "y": 32
          },
          "hiddenSeries": false,
          "id": 134,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": true,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]_[[tag_type]]",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "block"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "降级数量_应用维度",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": "${DS_INFLUXDB}",
          "description": "Pass：进入资源的请求数\n\nBlock：降级的资源\n\nSuccess：进入资源内部执行完成的数量，执行异常回调包含在内\n\nException：进入异常回调数量，不包含设置忽略的异常\n\nRt：进入资源运行耗时（包含异常回调时间）",
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 12,
            "x": 12,
            "y": 32
          },
          "hiddenSeries": false,
          "id": 131,
          "legend": {
            "alignAsTable": true,
            "avg": false,
            "current": false,
            "max": true,
            "min": true,
            "show": true,
            "total": true,
            "values": true
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "nullPointMode": "null as zero",
          "options": {
            "dataLinks": []
          },
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "alias": "[[tag_resource]]_[[tag_ip]]",
              "groupBy": [
                {
                  "params": [
                    "1m"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "resource"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "ip"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "sentinel",
              "orderByTime": "ASC",
              "policy": "default",
              "query": "SELECT sum(\"value\") FROM \"sentinel\" WHERE (\"department\" =~ /^$department$/ AND \"group\" =~ /^$group$/ AND \"project\" =~ /^$project$/ AND \"ip\" =~ /^$ip$/ AND \"host\" =~ /^$host$/) AND $timeFilter GROUP BY time(1m), \"resource\", \"type\"",
              "rawQuery": false,
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "sum"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "department",
                  "operator": "=~",
                  "value": "/^$department$/"
                },
                {
                  "condition": "AND",
                  "key": "group",
                  "operator": "=~",
                  "value": "/^$group$/"
                },
                {
                  "condition": "AND",
                  "key": "project",
                  "operator": "=~",
                  "value": "/^$project$/"
                },
                {
                  "condition": "AND",
                  "key": "host",
                  "operator": "=~",
                  "value": "/^$host$/"
                },
                {
                  "condition": "AND",
                  "key": "type",
                  "operator": "=",
                  "value": "block"
                }
              ]
            }
          ],
          "thresholds": [],
          "timeFrom": null,
          "timeRegions": [],
          "timeShift": null,
          "title": "降级数量_实例维度",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "none",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "yaxis": {
            "align": false,
            "alignLevel": null
          }
        }
      ],
      "title": "sentinel",
      "type": "row"
    }
  ],
  "refresh": false,
  "schemaVersion": 22,
  "style": "dark",
  "tags": [
    "common",
    "new"
  ],
  "templating": {
    "list": [
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from process_uptime with key =\"department\" where $timeFilter",
        "hide": 0,
        "includeAll": false,
        "label": "部门",
        "multi": false,
        "name": "department",
        "options": [],
        "query": "show tag values from process_uptime with key =\"department\" where $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from process_uptime with key =\"group\"  where department ='${department:text}'   AND $timeFilter",
        "hide": 0,
        "includeAll": false,
        "label": "项目组",
        "multi": false,
        "name": "group",
        "options": [],
        "query": "show tag values from process_uptime with key =\"group\"  where department ='${department:text}'   AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from process_uptime with key =\"project\"  where department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "hide": 0,
        "includeAll": false,
        "label": "项目",
        "multi": false,
        "name": "project",
        "options": [],
        "query": "show tag values from process_uptime with key =\"project\"  where department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from process_uptime with key =\"host\" where project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "hide": 0,
        "includeAll": false,
        "label": "域名",
        "multi": false,
        "name": "host",
        "options": [],
        "query": "show tag values from process_uptime with key =\"host\" where project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "select ip, value from process_uptime   where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "hide": 0,
        "includeAll": false,
        "label": "IP",
        "multi": false,
        "name": "ip",
        "options": [],
        "query": "select ip, value from process_uptime   where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from http_server_requests with key =\"status\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "hide": 0,
        "includeAll": true,
        "label": "状态码",
        "multi": true,
        "name": "status",
        "options": [],
        "query": "show tag values from http_server_requests with key =\"status\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from http_server_requests with key =\"uri\"  where    host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' and status =~ /$status$/   AND $timeFilter",
        "hide": 0,
        "includeAll": true,
        "label": "请求Url",
        "multi": true,
        "name": "uri",
        "options": [],
        "query": "show tag values from http_server_requests with key =\"uri\"  where    host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}' and status =~ /$status$/   AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from hystrix_requests with key =\"key\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "hide": 0,
        "includeAll": true,
        "label": "commomdkey",
        "multi": true,
        "name": "commomdkey",
        "options": [],
        "query": "show tag values from hystrix_requests with key =\"key\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      },
      {
        "allValue": null,
        "current": {},
        "datasource": "${DS_INFLUXDB}",
        "definition": "show tag values from sentinel with key =\"resource\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "hide": 0,
        "includeAll": true,
        "label": "resource",
        "multi": true,
        "name": "resource",
        "options": [],
        "query": "show tag values from sentinel with key =\"resource\"  where host ='${host:text}' and project='${project:text}'  and department ='${department:text}'   AND \"group\" ='${group:text}'  AND $timeFilter",
        "refresh": 2,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "tagValuesQuery": "",
        "tags": [],
        "tagsQuery": "",
        "type": "query",
        "useTags": false
      }
    ]
  },
  "time": {
    "from": "now-3h",
    "to": "now"
  },
  "timepicker": {
    "refresh_intervals": [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ]
  },
  "timezone": "",
  "title": "springboot Dashboard",
  "uid": "dRn74pLZk",
  "version": 29,
  "description": "springboot metrics"
}

~~~







