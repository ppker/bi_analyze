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
        btn_del = null; // 单个删除的按钮

    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.system_timing_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('计划编辑');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("#addModal input[name='title']").val(result.data.title);
                        $("#addModal textarea[name='content']").val(result.data.content);
                        $("#addModal textarea[name='email']").val(result.data.email);
                        $("#addModal input[name='subject']").val(result.data.subject);
                        $("#addModal input[name='sheet']").val(result.data.sheet);
                        $("#addModal textarea[name='sqlstr']").val(result.data.sqlstr);
                        $("#addModal input[name='crontab']").val(result.data.crontab);
                        $("#addModal input[name='end_date']").val(result.data.end_date);
                        var status = result.data.status;
                        $("#addModal input[name='status'][value=" + status + "]").attr("checked", true);
                        $("#addModal").modal('show');
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
                ZP.api.system_timing_del({
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
                ZP.api.system_timing_open({
                    data: {id: $id,status: $status},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    btn_run = function() { // 立即执行按钮

        $("table tr .btn-group").on("click", "a[actionrule='run']", function() {
            var $id = $(this).attr("actionid");
            var $runnow = $(this).attr("runnow");
            if ($id) {
                ZP.api.system_timing_run({
                    data: {id: $id,runnow: $runnow},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    init_limit = function() {
        ZP.utils.default_list({
            'api_url': 'system_timing', // list的api
            'template_path': 'system/timing_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'system_timing_del',
            'add_api': 'system_timing_add',
            'init_form_api': {'api': 'init_form_api', 'id': 'pid_id'}, // 需要对表单进行数据初始化操作
            'btn_edit': btn_edit,
            'btn_del': btn_del,
            'btn_open': btn_open,
            'btn_run': btn_run,
        });
    };

    return {
        init: function (){
            ZP.utils.target_timedate();
            init_limit();
        }
    };


}
