/* 国际化组件使用方法
     首先引用<script src="../dist/plugins/jquery-3.3.1/jquery.js"></script>
    <script src="../dist/plugins/jquery-3.3.1/jquery.i18n.properties-1.0.9.js"></script>
    <script src="../dist/lay/modules/national.js"></script>注意修改national.js中的路径
给要替换的文字，加属性data-locale="",在strings_zh.properties中定义中文数值，
                    在strings_en.properties中定义英文数值，注意二者之间的对应关系
中英文切换按钮：<button class="layui-btn layui-btn-primary" id="translate_button" data-locale="switch">中英文切换</button>
*/
  var lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器  
        lang = lang.substr(0, 2);//截取lang前2位字符  

        $('#translate_button').click(function () {//点击按钮时进行语言切换  
            console.log(lang);
            if (lang == 'zh') {
                lang = 'en';
            } else {
                lang = 'zh';
            }
            console.log(lang);
            loadProperties(lang);
        });
        function loadProperties(lang) {
            $.i18n.properties({
                name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties  
                path: '../dist/plugins/i18n/',   //注意这里路径是你属性文件的所在文件夹  
                mode: 'map',
                language: lang,
                encoding: 'UTF-8',   //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties  
                callback: function () {
                    $("[data-locale]").each(function () {
                        $(this).html($.i18n.prop($(this).data("locale")));

                    });
                }
            });
        }