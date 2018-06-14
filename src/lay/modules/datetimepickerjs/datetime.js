/**
 * Created by NeverSayDie on 2018/5/24.
 */
//日期控件
//设置为中文
$.fn.datetimepicker.dates['zh'] = {
    days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
    daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
    daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
    months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
    monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    meridiem:    ["上午", "下午"],
    //suffix:      ["st", "nd", "rd", "th"],
    today:       "今天"
};
$('.form_datetime').datetimepicker({
    format: 'yyyy-mm-dd',  //显示格式可为yyyymm/yyyy-mm-dd/yyyy.mm.dd
    weekStart: 1,  //0-周日,6-周六 。默认为0
    autoclose: true,
    startView: 2,  //打开时显示的视图。0-'hour' 1-'day' 2-'month' 3-'year' 4-'decade'
    minView: 3, //最小时间视图。默认0-'hour'
    maxView: 4, //最大时间视图。默认4-'decade'
    todayBtn:true, //true时"今天"按钮仅仅将视图转到当天的日期。如果是'linked'，当天日期将会被选中。
    todayHighlight:true,//默认值: false,如果为true, 高亮当前日期。
    initialDate: new Date(),//初始化日期.默认new Date()当前日期
    forceParse: true,  //当输入非格式化日期时，强制格式化。默认true
    language:"zh",  //语言选择中文
});
$('.form_date').datetimepicker({
    format: 'hh:mm:ss',
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
$('.form_time').datetimepicker({
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
});