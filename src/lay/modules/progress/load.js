/**
 * Created by NeverSayDie on 2018/6/8.
 */
layui.use('element', function(){
    var $ = layui.jquery;
    var element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    
    //触发事件
    var active = {
        loading: function(othis){

            //时间触发后设定按钮为不可点击状态
            var DISABLED = 'layui-btn-disabled';
            if(othis.hasClass(DISABLED)) return;

            //模拟loading，产生随机数
            var n = 0, timer = setInterval(function(){
                n = n + Math.random()*10|0;
                if(n>100){
                    n = 100;
                    clearInterval(timer);

                    //进度条加载完毕，按钮状态恢复
                    othis.removeClass(DISABLED);
                }
                element.progress('demo', n+'%');
                var per = $(".bubbleProgress .layui-progress .layui-progress-bar span").html();
                console.log((n-20)+"%");
                $(".bubbleImg").css("display","block");
                $(".bubbleProgress .layui-progress .layui-progress-bar span").css("display","block");
                $(".bubbleImg").css("margin-left",(n-6)+"%");
            }, 300+Math.random()*1000);

            othis.addClass(DISABLED);
        }
    };
    //按钮点击触发
    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = $(this).data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
});