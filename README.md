# code-generator

+ 基于node.js 的代码生成工具

## 模板引擎 art-template

+ 如果你知道基于JavaScript的模板引擎，那么入手会相当容易。art-template 是一个渲染速度极快的JavaScript模板引擎。
具体语法请看官方的教程:[中文语法教程](https://aui.github.io/art-template/zh-cn/docs/)
+ 几个[语法的例子](#模板示例)  

## 运行

+ 在第一次下载本项目后，运行命令

```shell
npm install
```

+ 启动生成

```shell
npm run start
```

## 文件说明

|文件名|说明|
|config.js|配置文件|

## 字段取名规则
>
> 数据库中大写字段均会转为小写赋值到fieldName中 columnName 还是原样输出

模板中的字段取名规则参考驼峰命名例如：

+ user_id取值为userId
+ USERID 取值为userid，
+ user_id_name_abc 取值为userIdNameAbc

## 模板内变量

+ 全局字段

+ columns字段

## 模板示例

+ 变量定义

```html
    <% var date=new Date(); %>
```

+ 取值

```html
    <% var date=new Date(); %>
   <div>今天的日期是：${date}</div>
```

+ if语句

```html
    <%
    var aa=123; 
    if (aa==123){
    
    %>
    
    <div>aa等于123</div>
    
    <%}%>
```

+ for循环

```html
    <%for(var i=0;i<100;i++){%>
    <div>${i}</div>
    <%}%>
```

+ 内置过滤器

    过滤器使用{{}}两个括号，加|，语法参考ejs，或者art-template[官方文档](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E8%BF%87%E6%BB%A4%E5%99%A8)
  + 首字母大写 up_first

        ```html
            <% var aa="china" %>
            {{aa | up_first}}
        ```

        输出 China
  + 首字母小写 low_first

        ```html
            <% var aa="China" %>
            {{aa | up_first}}
        ```

        输出 china
