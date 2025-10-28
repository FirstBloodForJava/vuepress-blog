# MongoDB

[MongoDB 官网](https://www.mongodb.com/)

[MongoDB 文档](https://www.mongodb.com/zh-cn/docs/manual/)

## 介绍

MongoDB 是一个基于分布式文件存储的文档数据库。

支持三种环境运行：

- MongoDB Atlas：云端环境
- MongoDB Enterprise：商用版本
- MongoDB Community：社区版本

MongoDB 将数据记录存储为 `BSON` 文档。BSON 是 JSON 文档的二进制表示形式，但它包含的数据类型比 JSON 多。

MongoDB 文档由成对的字段和字段值（任何一种 BSON 数据类型）组成，具有以下结构：


~~~json
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
~~~



~~~json
var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : Long(1250000)
            }
~~~

上述字段具有以下数据类型：

- `_id` 保存 ObjectId。插入文档是省略了该字段，自动为[ ](https://www.mongodb.com/zh-cn/docs/manual/reference/bson-types/#std-label-objectid)`_id`字段生成 ObjectId。
- `name` 包含一嵌入式文档，其中包含字段 `first` 和 `last`。
- `birth` 和 `death` 保存 日期类型的值。
- `contribs` 保存着一个 字符串数组。
- `views` 保存 `NumberLong` 类型的值。



**字段名称具有以下限制：**

- 字段名称 `_id` 保留用作主键；它的值在集合中必须是唯一的、不可变的，并且可以是除 **数组或正则表达式** 之外的任何类型。如果 `_id` 包含子字段，则子字段名称不能以 (`$`) 符号开头。
- 字段名称不能包含 `null` 字符。
- 服务器允许存储包含点 `.` 和美元符号 `$` 的字段名称。
- 每个字段名称在文档中必须是唯一的。 不得存储具有重复字段的文档，因为如果文档具有重复字段，MongoDB CRUD操作可能会出现意外行为。

**点符号**：

MongoDB 使用 **点符号** 来访问数组(`array.index`)的元素和访问嵌入式文档(`embedded document.field`)的字段。

**嵌入式文档**：

使用点符号指定或访问嵌入式文档的字段：`embedded document.field`。

~~~json
{
   ...
   name: { first: "Alan", last: "Turing" },
   contact: { phone: { type: "cell", number: "111-222-3333" } },
   ...
}
~~~

- 要在 `name` 字段中指定名为 `last` 的字段， `"name.last"`。
- 要在 `contact` 字段中指定 `phone` 文档中的 `number`， `"contact.phone.number"`。



**文档限制**：BSON 文档大小的上限为 `16 MB`。



**文档字段顺序**：BSON 文档中的字段为 **有序字段**。



## 安装

[服务端下载地址](https://www.mongodb.com/try/download/community)

### Windows-zip

1. 下载后解压缩；
2. 创建配置文件（可选）：`bin\mongod.cfg`；
3. 启动命令：`bin\mongod.exe --dbpath="c:\data\db"`；`dbpath` 指定数据存储目录；启动默认绑定 `127.0.0.1`，只能本地访问，可以通过  `--bind_ip` 调整地址。
4. `bin\mongod.exe --dbpath="G:\environment\mongodb\db"`

![image-20251028164522206](http://47.101.155.205/image-20251028164522206.png)

![image-20251028171630089](http://47.101.155.205/image-20251028171630089.png)



## 连接



### mongodb-compass

[下载地址](https://www.mongodb.com/try/download/compass)

![image-20251028172326936](http://47.101.155.205/image-20251028172326936.png)