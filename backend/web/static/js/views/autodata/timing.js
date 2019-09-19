/**
 * author: ZhiPeng
 * date: 2017/2/20
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_edit = null,
        btn_run = null,
        btn_open = null,
        btn_test = null,
        btn_pic = null,
        btn_table = null,
        btn_del = null; // 单个删除的按钮

    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.autodata_timing_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('计划编辑');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("#addModal input[name='title']").val(result.data.title);
                        $("#addModal textarea[name='content']").val(result.data.content);
                        $("#addModal input[name='mailsheet']").val(result.data.mailsheet);
                        $("#addModal textarea[name='mailsqlstr']").val(result.data.mailsqlstr);
                        $("#addModal textarea[name='email']").val(result.data.email);
                        $("#addModal input[name='subject']").val(result.data.subject);
                        $("#addModal input[name='sheet']").val(result.data.sheet);
                        $("#addModal textarea[name='sqlstr']").val(result.data.sqlstr);
                        $("#addModal input[name='crontab']").val(result.data.crontab);
                        $("#addModal input[name='end_date']").val(result.data.end_date);
                        var status = result.data.status;
                        $("#addModal input[name='status'][value=" + status + "]").attr("checked", true);
                        $("#addModal").modal('show');
                        var author = result.data.author;
                        $('.bs-select').selectpicker('val', author); // 设置select的选中
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_del = function() { // 单个删除按钮

        $("table tr .btn-group li").on("click", "a[actionrule='del']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.autodata_timing_del({
                    data: {id: $id},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_open = function() { // 开启or禁用按钮

        $("table tr .btn-group").on("click", "a[actionrule='open']", function() {
            var $id = $(this).attr("actionid");
            var $status = $(this).attr("status");
            if ($id) {
                ZP.api.autodata_timing_open({
                    data: {id: $id,status: $status},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_test = function() { // 编辑操作
        $("table tr .btn-group").on("click", "a[actionrule='test']", function() {
            var $id = $(this).attr("actionid");
            $("#testModal input[name='id']").val($id);
            $("#testModal").modal('show');
        });
    };

    btn_run = function() { // 立即执行按钮

        $("table tr .btn-group").on("click", "a[actionrule='run']", function() {
            var $id = $(this).attr("actionid");
            var $runnow = $(this).attr("runnow");
            if ($id) {
                ZP.api.autodata_timing_run({
                    data: {id: $id,runnow: $runnow},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_pic = function() { // 编辑图表操作
        $("table tr .btn-group li").on("click", "a[actionrule='pic']", function() {
            var $tid = $(this).attr("actionid");
            if ($tid) {
                ZP.api.autodata_pic_get({
                    data: {tid: $tid},
                    successCallBack: function(result){

                        $("#picModal h4.modal-title").text('图表编辑');
                        $("#picModal input[name='id']").val(result.data.id);
                        $("#picModal input[name='tid']").val($tid);
                        $("#picModal input[name='title']").val(result.data.title);
                        $("#picModal textarea[name='sqlstr']").val(result.data.sqlstr);
                        $("#picModal input[name='yaxisl']").val(result.data.yaxisl);
                        $("#picModal input[name='yaxisr']").val(result.data.yaxisr);
                        $("#picModal").modal('show');
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_table = function() { // 编辑表头操作
        $("table tr .btn-group li").on("click", "a[actionrule='table']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.autodata_table_get({
                    data: {id: $id},
                    successCallBack: function(result){
                        $("#tableModal h4.modal-title").text('表头编辑');
                        $("#tableModal input[name='id']").val($id);
                        $("#tableModal input[name='mail_data_count']").val(result.data.mail_data_count);
                        $("#tableModal #tablearea").html("");
                        $.each(result.data.mail_data_key_arr,function($k,$v) {
                            var html_atr = '';
                            html_atr += '<textarea id="mul_input" name="table-content'+$k+'" class="ktable" style="width: 100%;height:200px;visibility:hidden;display: block;">'+$v+'</textarea>';
                            $("#tableModal #tablearea").append(html_atr);
                        });
                        $("#tableModal").modal('show');
                        //简单模式初始化
                        var editor;
                        KindEditor.ready(function(K) {
                            editor = K.create('textarea[class="ktable"]', {
                                resizeType : 1,
                                allowPreviewEmoticons : false,
                                allowImageUpload : false,
                                afterBlur: function () { this.sync(); },//这一步非常重要，如果遗漏，则后台无法接收到数据。
                                items : [
                                    'source', '|', 'fullscreen', 'undo', 'redo', 'cut', 'copy', 'paste',
                                    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                                    'justifyfull', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                                    'italic', 'underline', 'strikethrough', 'removeformat', '|', 'table', 'hr', 'emoticons', 'link', 'unlink']
                            });
                        });
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    init_limit = function() {
        ZP.utils.default_list({
            'api_url': 'autodata_timing', // list的api
            'template_path': 'autodata/timing_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {'scrollX': true, 'scrollY': true, autoWidth: false,}),
            'all_del_api': 'autodata_timing_del',
            'add_api': 'autodata_timing_add',
            'test_api': 'autodata_timing_test',
            'pic_api': 'autodata_pic_add',
            'table_api': 'autodata_table_add',
            'init_form_api': {'api': 'autodata_init_form_api', 'id': 'author'}, // 需要对表单进行数据初始化操作
            'btn_edit': btn_edit,
            'btn_del': btn_del,
            'btn_open': btn_open,
            'btn_test': btn_test,
            'btn_run': btn_run,
            'btn_pic': btn_pic,
            'btn_table': btn_table,
        });
    };

    return {
        init: function (){
            ZP.utils.target_timedate();
            //简单模式初始化
            var editor;
            KindEditor.ready(function(K) {
                editor = K.create('textarea[class="ktable"]', {
                    resizeType : 1,
                    allowPreviewEmoticons : false,
                    allowImageUpload : false,
                    items : [
                        'source', '|', 'fullscreen', 'undo', 'redo', 'cut', 'copy', 'paste',
                        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                        'justifyfull', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                        'italic', 'underline', 'strikethrough', 'removeformat', '|', 'table', 'hr', 'emoticons', 'link', 'unlink']
                });
            });
            init_limit();
        }
    };


}
