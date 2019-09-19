/**
 * author: ZhiPeng
 * date: 2017/2/20
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_edit = null,
        btn_del = null; // 单个删除的按钮

    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.system_menu_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('菜单编辑');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("#addModal input[name='title']").val(result.data.title);
                        $("#addModal input[name='sort']").val(result.data.sort);
                        var hide = result.data.hide;
                        $("#addModal input[name='hide'][value=" + hide + "]").attr("checked", true);
                        $("#addModal input[name='url']").val(result.data.url);
                        $("#addModal input[name='group']").val(result.data.group);
                        var status = result.data.status;
                        $("#addModal input[name='status'][value=" + status + "]").attr("checked", true);
                        var pid = result.data.pid;
                        $('.bs-select').selectpicker('val', pid); // 设置select的选中
                        // console.log($("#addModal select[name='pid']").find("option[value=4]").attr("selected", true));
                        // $("#addModal select[name='pid']").find("option[value="+ pid +"]").attr("selected", true);
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
                ZP.api.system_menu_del({
                    data: {id: $id},
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
            'api_url': 'system_menu', // list的api
            'template_path': 'system/menu_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'system_menu_del',
            'add_api': 'system_menu_add',
            'init_form_api': {'api': 'init_form_api', 'id': 'pid_id'}, // 需要对表单进行数据初始化操作
            'btn_edit': btn_edit,
            'btn_del': btn_del,
        });
    };

    return {
        init: function (){
            init_limit();
        }
    };


}