# WebService



## SOAP WebService调用



### SOAP1.1

Postman 调用方式：

![image-20250724151718991](http://47.101.155.205/image-20250724151718991.png)

**请求头配置：**

~~~md
Content-Type = application/xml
SOAPAction = http://tempuri.org/OperationName

~~~

**SOAP 的服务操作名，需要根据 WebService 接口来调整。**

**请求体 xml 配置（根据 WebService接口文档调整）**：使用 `CDATA` 避免转移 xml文本。

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <OperationName xmlns="http://tempuri.org/">
            <userName>userName</userName>
            <userId>ediNo</ediNo>
            <innerXml>
                <![CDATA[{{requestxml}}]]>
            </innerXml>
        </OperationName>
    </soap:Body>
</soap:Envelope>

~~~

**xml 字符转义情况：**

~~~md
&lt; <
&gt; >
&quot; "

~~~



**curl 命令调用：request.xml 就是 Postman 请求体内容**

~~~bash
# linux 系统
curl --location 'requestUrl' \
--header 'SOAPAction: http://tempuri.org/OperationName' \
--header 'Content-Type: application/xml' \
--data '@request.xml'

# Windows 系统
curl --location "requestUrl" ^
--header "SOAPAction: http://tempuri.org/OperationName" ^
--header "Content-Type: application/xml" ^
--data "@request.xml"

~~~



### SOAP1.2

**请求头参数：**

~~~md
Content-Type = application/soap+xml; charset=utf-8

~~~

**请求体参数：xml 协议发生变更**

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <OperationName xmlns="http://tempuri.org/">
            <userName>userName</userName>
            <userId>ediNo</ediNo>
            <innerXml>
                <![CDATA[{{requestxml}}]]>
            </innerXml>
        </OperationName>
    </soap12:Body>
</soap12:Envelope>

~~~

![image-20250724160632283](http://47.101.155.205/image-20250724160632283.png)