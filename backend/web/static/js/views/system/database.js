/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/10/20
 * Time: 18:20
 * Desc:
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
                ZP.api.database_config_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('修改配置');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("#addModal input[name='description']").val(result.data.description);
                        $("#addModal input[name='menu_id']").val(result.data.menu_id);
                        var cfg_status = result.data.status;
                        $("#addModal input[name='status'][value=" + cfg_status + "]").attr("checked", true);
                        $("#addModal textarea[name='sql_data']").val(result.data.sql_data);
                        $("#addModal textarea[name='sql_sum']").val(result.data.sql_sum);
                        $("#addModal textarea[name='sql_cache']").val(result.data.sql_cache);
                        $("#addModal textarea[name='filter_define']").val(result.data.filter_define);

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
                ZP.api.database_config_del({
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
            'api_url': 'database_config_list', // list的api
            'template_path': 'system/database_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'database_config_del',
            'add_api': 'database_config_add',
            // 'init_form_api': {'api': 'init_form_api', 'id': 'pid_id'}, // 需要对表单进行数据初始化操作
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