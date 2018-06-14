/*
 * @Author: pengfei.SUN 
 * @Date: 2018-06-07 10:15:28 
 * @Last Modified by: pengfei.SUN
 * @Last Modified time: 2018-06-11 14:37:44
 */

var Editor = (function (window) {
  var Editor = function (options) {
    return new Editor.fn.init(options);
  }

  Editor.fn = Editor.prototype = {
    constructor: Editor,
    init: function (options) {
      this.options = options;
      this.createEditor = function () {
        var editor;
        var allItems = [
          'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
          'table', 'hr', 'emoticons', 'pagebreak',
          'link', 'unlink', 'insertfile'
        ];
        var simpleItems = [
          'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '/',
          'undo', 'redo', '|', 'paste', 'plainpaste', 'wordpaste',
        ];
        var complexItems = [
          'source', '|', 'undo', 'redo', '|', 'preview', 'template', 'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
          'table', 'hr', 'pagebreak',
          'link', 'unlink', 'insertfile'
        ]
        var items;
        if (this.options.editorType == 'simple') items = simpleItems;
        else if (this.options.editorType == 'complex') items = complexItems;
        else if (this.options.editorType == 'all') items = allItems;
        else items = complexItems;
        editor = KindEditor.create("#editor-demo", {
          items: items,
          width: this.options.width ? this.options.width : '100%',
          height: this.options.height ? this.options.height : '300px',
          themeType: this.options.themeType ? this.options.themeType : 'default',
        });
        this.editorIns = editor;
        return editor;
      }
    },
    makeEditor: function () {
    }
  }
  Editor.fn.init.prototype = Editor.fn;
  return Editor;
})();

