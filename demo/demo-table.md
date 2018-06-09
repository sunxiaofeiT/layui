# Layui 数据表格

> 表格的数据服务使用 Nginx 代理提供
>
> 后台 Nginx 代理使用的地址是：http://60.30.69.57:64006
>
> 在使用该接口前，请访问如下地址进行登录：http://localhost:8889/api/login?username=CATARC&password=A6BFC6C3935F355674F0D6F468D0ACEC&isRememberMe=false&userId=BHZGSSBTM8&roleId=null （其中端口号根据 Nginx 的设置自行更改）

# 1. 引用相关样式文件 CSS

需要在 HTML 文件的 `head` 标签内引用下列样式文件，**需要注意引用顺序**：

```html
<head>
    <title></title>
    <meta charset="utf-8">

    <!-- CSS 文件：基础样式、字体和布局 -->
    <link rel="stylesheet" href="../dist/css/modules/base.css">
    <link rel="stylesheet" href="../dist/css/modules/layout.css">
    <link rel="stylesheet" href="../dist/css/modules/font-layui.css">
    <!-- CSS 文件：分页和表单按钮 -->
    <link rel="stylesheet" href="../dist/css/modules/page.css">
    <link rel="stylesheet" href="../dist/css/modules/form.css">
    <link rel="stylesheet" href="../dist/css/modules/button.css">
    <!-- CSS 文件：数据表格，主要 -->
    <link rel="stylesheet" href="../dist/css/modules/table.css">
</head>
```

# 2. HTML 部分主要结构

`body` 需要添加类名 `class="body-container"` 来提供页面背景色和边距。

数据表格的布局使用的是 Layui 的栅格系统，代码如下：

```html
<body class="body-container">
    <!-- 使用 layui 栅格系统布局，容器为 100% 宽度 -->
    <div class="layui-container-field">
        <div class="layui-row">
            <!-- 具体列宽由输入框数量和按钮数量自行决定 -->
            <div class="layui-col-xs12 layui-col-sm6 layui-col-md6 table-input-control">
                <div class="layui-form-item">
                    <!-- 左侧输入框和相关按钮，每组由 layui-inline 类名容器包裹 -->
                    <div class="layui-inline">
                        <label class="layui-form-label">搜索名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="search" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-sm layui-btn-normal" id="_btn_search">搜索</button>
                        <button class="layui-btn layui-btn-sm layui-btn-primary" id="_btn_reset">重置</button>
                    </div>
                    <!-- ... 可自行增加/删除输入框和按钮 -->
                </div>
            </div>
            <!-- 具体列宽由输入框数量和按钮数量自行决定 -->
            <div class="layui-col-xs12 layui-col-sm6 layui-col-md6 table-form-control">
                <div class="layui-inline">
                    <!-- 右侧功能按钮 -->
                    <button class="layui-btn layui-btn-sm layui-btn-primary" id="_btn_add">
                        <i class="layui-icon">&#xe654;</i> 新增
                    </button>
                    <button class="layui-btn layui-btn-sm layui-btn-primary" id="_btn_edit">
                        <i class="layui-icon">&#xe642;</i> 编辑
                    </button>
                    <button class="layui-btn layui-btn-sm layui-btn-primary" id="_btn_del">
                        <i class="layui-icon">&#xe640;</i> 删除
                    </button>
                    <button class="layui-btn layui-btn-sm layui-btn-primary" id="_btn_view">
                        <i class="layui-icon">&#xe615;</i> 查看
                    </button>
                    <!-- ... 可自行增加/删除按钮 -->
                </div>
            </div>
        </div>
        <div class="layui-row">
            <div class="layui-col-md12">
                <!-- 数据表格，id 和 lay-filter 自行更改 -->
                <table class="layui-hide" id="demo" lay-filter="demo"></table>
            </div>
        </div>
    </div>
</body>
```

每个按钮都对应有一个 `id` ，此 `id` 是用在发生点击事件时区分不同按钮的功能的。

# 3. JS 部分

首先，需要在 `body` 中的 `html` 代码下面引用 `layui` 的 JS 入口文件。

```html
<!-- 引入 layui 入口文件 -->
<script type="text/javascript" src="../dist/layui.js"></script>
```

然后，是表格渲染和事件处理部分的 JS ，本 Demo 为了演示方便，将 JS 代码写在了 HTML 文件内，**在实际开发中，建议将 JS 部分代码单独抽离出来**。

JS 代码如下（将包裹代码的 `<script></script>` 标签省略了）：

具体的 `table.render()` 的参数请参考下一部分

```javascript
layui.use('table', function() {
    var table = layui.table,
        form = layui.form,
        $ = layui.$;

    table.render({
        elem: '#demo',
        url: '/api/data',
        id: 'demo',
        cols: [
            [{
                title: '序号',
                type: 'numbers',
                fixed: 'left'
            }, {
                type: 'checkbox'
            }, {
                field: 'id',
                title: 'ID',
                width: 100,
                unresize: true,
                sort: true
            }, {
                field: 'username',
                title: '用户名',
                align: 'right'
            }]
        ],
        page: true
    });
});
```

# 4. table.render() 中参数介绍

Layui 数据表格官方介绍文档：http://www.layui.com/doc/modules/table.html

我们在官方提供的数据表格的基础上进行了功能扩展，**增加了：表格行点击事件、后台分页功能、后台排序功能、和后台搜索功能**，并优化了一些样式和参数默认值。

### table 部分参数（其它参数请参照官方文档）

| 参数     | 类型           | 说明                                                         | 示例值                    |
| :------- | -------------- | ------------------------------------------------------------ | ------------------------- |
| elem     | String/DOM     | 指定原始 table 容器的选择器或 DOM，方法渲染方式必填          | '#demo'                   |
| url      | String         | 异步数据接口相关参数。其中 url 参数为必填项                  | '/api/data'               |
| id       | String         | 设定容器唯一 ID。注意：从 layui 2.2.0 开始，该参数等价于  <table class="layui-hide" id="demo" lay-filter="demo"></table> 中的 id 值。id值是对表格的数据操作方法上是必要的传递条件，它是表格容器的索引 | 'demo'                    |
| response | Object         | 在使用 url 作为表格数据接口时，为了适配后台返回数据的格式，使用该参数进行适配 | 见下方：response 参数对象 |
| cols     | Array          | 设置表头。值是一个二维数组。方法渲染方式必填                 | 见下方：cols 部分表头参数 |
| page     | Boolean/Object | 开启分页（默认：false） 可以传入一个对象，里面可包含 [laypage](http://www.layui.com/doc/modules/laypage.html#options) 组件所有支持的参数（jump、elem除外） | 见下方：page 参数对象     |
| request  | Object         | 后台分页时需要的参数名称                                     | 见下方：request  参数对象 |
| apiSort  | Boolean/Object | 后台排序时需要的参数名称                                     | 见下方：apiSort 参数对象  |

```javascript
// 后台返回的数据格式样例
{
	"code": "0",
	"message": "OK",
	"data": {
		"list": [],
		"count": 60
	}
}

// response 参数对象，以下示例为默认字段，若后台返回的数据和示例不同，则需要设置 response 对象
response: {
    statusName: 'code', // 状态码字段名
    statusCode: '0', // 成功的状态码
    msgName: 'message', // 消息提示字段名
    dataName: 'data.list', // 数据列表字段名
    countName: 'data.count' // 数据总数字段名
},

// page 对象参数
page: {
    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'],
    groups: 6,
    limits: [10, 20, 50, 100],
    prev: '上一页',
    next: '下一页'
},

// request 参数对象，以下示例为默认字段，若后台接口的查询参数和示例不同，则需要设置 request 对象
request: {
    pageName: 'pageNo', // 当前页数
    limitName: 'pageSize' // 每页容量
},

// apiSort 参数对象
apiSort: {
    sortName: 'sortBy', // 排序字段参数名
    sortType: 'order', // 排序类型参数名
    asc: 'asc', // 升序类型参数值
    desc: 'desc' // 降序类型参数值
},
```

### cols 部分表头参数（其它参数请参照官方文档）

```javascript
cols: [
    [{
            // 序号列
            title: '序号',
            type: 'numbers',
            // 固定列。
            // 可选值有：left（固定在左）、right（固定在右）。
            // 一旦设定，对应的列将会被固定在左或右，不随滚动条而滚动。 
            // 注意：如果是固定在左，该列必须放在表头最前面；如果是固定在右，该列必须放在表头最后面。
            fixed: 'left'
        },
        {
            // 复选框列
            type: 'checkbox'
        },
        {
            field: 'id',
            title: 'ID',
            // 设置列宽度
            width: 100,
            // 固定列宽度
            unresize: true,
            // 设置为可排序
            sort: true
        },
        {
            field: 'username',
            title: '用户名',
            // 表格内文字默认居中，通过 align 可修改为右对齐（right）或左对齐（left）
            align: 'right'
        },
        {
            field: 'city',
            title: '城市',
            align: 'left'
        },
        {
            field: 'wealth',
            title: '财富',
            minWidth: 120,
            // 单元格编辑
            edit: 'text'
        },
        {
            field: 'sex',
            title: '性别',
            width: 110,
            // 使用自定义列模版...
            templet: '#switchTpl',
            unresize: true
        }
    ]
]
```

# 5. 事件监听

Layui 数据表格事件监听官方介绍文档：http://www.layui.com/doc/modules/table.html#on

事件监听的函数需要写在 `layui.use()` 中。

### form 事件

```javascript
// 监听开关事件
form.on('switch(lay-filter)', function (obj) {
    // Do Something
});
```

```javascript
// 监听复选框事件
form.on('checkbox(lay-filter)', function (obj) {
    // Do Something
});
```

### table 事件

```javascript
// 监听单元格编辑
// demo是table原始容器的属性 lay-filter="对应的值"
table.on('edit(demo)', function (obj) {
    // Do Something
});
```

```javascript
// 监听行点击事件
// demo是table原始容器的属性 lay-filter="对应的值"
table.on('click(demo)', function (obj) {
    // Do Something
});
```

