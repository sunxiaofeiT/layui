(function ($) {
    "use strict";

    $.fn.treegridData = function (options, param) {
        //如果是调用方法
        if (typeof options == 'string') {
            return $.fn.treegridData.methods[options](this, param);
        }

        //如果是初始化组件
        options = $.extend({}, $.fn.treegridData.defaults, options || {});
        var target = $(this);
        // debugger;
        //得到根节点
        target.getRootNodes = function (data) {
            var result = [];
            $.each(data, function (index, item) {
                // CHANGE 判断根结点
                if (!item[options.parentColumn] || item[options.parentColumn] === options.rootId) {
                    result.push(item);
                }
            });
            return result;
        };
        var j = 0;
        //递归获取子节点并且设置子节点
        target.getChildNodes = function (data, parentNode, parentIndex, tbody) {
            $.each(data, function (i, item) {
                if (item[options.parentColumn] == parentNode[options.id]) {
                    // console.log(item)
                    var tr = $('<tr></tr>');
                    var nowParentIndex = (parentIndex + (j++) + 10000);
                    // console.log('pid', parentIndex)
                    // console.log('id', nowParentIndex)
                    tr.addClass('treegrid-' + nowParentIndex);
                    tr.addClass('treegrid-parent-' + parentIndex);
                    $.each(options.columns, function (index, column) {
                        var td = $('<td></td>');
                        td.text(item[column.field]);
                        tr.append(td);
                    });
                    tbody.append(tr);
                    target.getChildNodes(data, item, nowParentIndex, tbody)

                }
            });
        };
        target.addClass('layui-table');
        target.prop('cellspacing', 0);
        target.prop('cellpadding', 0);
        target.prop('border', 0);
        if (options.striped) {
            target.addClass('table-striped');
        }
        if (options.bordered) {
            target.addClass('table-bordered');
        }
        if (options.url) {
            $.ajax({
                type: options.type,
                url: options.url,
                data: options.ajaxParams,
                dataType: "JSON",
                success: function (data, textStatus, jqXHR) {
                    // debugger;
                    // 获取使用的数据
                    if (options.dataName) {
                        var dataName = options.dataName.split('.');
                        var tmp = dataName.shift();
                        while (tmp) {
                            data = data[tmp];
                            tmp = dataName.shift();
                        }
                    }
                    // 判断是否为数组
                    // if ()
                    //构造表头
                    var thr = $('<tr></tr>');
                    $.each(options.columns, function (i, item) {
                        var th = $('<th style="padding:10px;"></th>');
                        th.text(item.title);
                        thr.append(th);
                    });
                    var thead = $('<thead></thead>');
                    thead.append(thr);
                    target.append(thead);

                    //构造表体
                    var tbody = $('<tbody></tbody>');
                    var rootNode = target.getRootNodes(data);
                    // console.log(rootNode)
                    $.each(rootNode, function (i, item) {
                        var tr = $('<tr></tr>');
                        // console.log(j + i)
                        // console.log(item)
                        tr.addClass('treegrid-' + (j + i));
                        $.each(options.columns, function (index, column) {
                            var td = $('<td></td>');
                            td.text(item[column.field]);
                            tr.append(td);
                        });
                        tbody.append(tr);
                        target.getChildNodes(data, item, (j + i), tbody);
                    });
                    // console.log(target)
                    target.append(tbody);
                    target.treegrid({
                        expanderExpandedClass: options.expanderExpandedClass,
                        expanderCollapsedClass: options.expanderCollapsedClass
                    });
                    if (!options.expandAll) {
                        target.treegrid('collapseAll');
                    }
                }
            });
        } else {
            //也可以通过defaults里面的data属性通过传递一个数据集合进来对组件进行初始化....有兴趣可以自己实现，思路和上述类似
        }
        return target;
    };

    $.fn.treegridData.methods = {
        getAllNodes: function (target, data) {
            return target.treegrid('getAllNodes');
        },
        //组件的其他方法也可以进行类似封装........
    };

    $.fn.treegridData.defaults = {
        id: 'id',
        parentColumn: 'parentId',
        data: [], //构造table的数据集合
        dataName: '', // 返回数据中使用的数据
        type: "GET", //请求数据的ajax类型
        url: null, //请求数据的ajax的url
        ajaxParams: {}, //请求数据的ajax的data属性
        rootId: null, // 根节点ID CHANGE
        expandColumn: null, //在哪一列上面显示展开按钮
        expandAll: true, //是否全部展开
        striped: false, //是否各行渐变色
        bordered: false, //是否显示边框
        columns: [],
        expanderExpandedClass: 'layui-icon layui-icon-triangle-d', //展开的按钮的图标
        expanderCollapsedClass: 'layui-icon layui-icon-triangle-r' //缩起的按钮的图标

    };
})(jQuery);