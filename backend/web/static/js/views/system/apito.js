/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 18-1-19
 * Time: 下午3:01
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
                ZP.api.system_apito_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('api编辑');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("#addModal #select_multiple_1").selectpicker('val', result.data.page_url);
                        $("#addModal #select_multiple_2").selectpicker('val', result.data.api_url);
                        $("#addModal select[name='type']").selectpicker('val', result.data.type);
                        $("#addModal input[value=" + result.data.status + "]").attr("checked", "checked");
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
                ZP.api.system_apito_del({
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
            'api_url': 'system_apito', // list的api
            'template_path': 'system/apito.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'system_apito_del',
            'add_api': 'system_apito_add',
            'init_form_html_data': {'select': [{api:'select_multiple_page_url', id: 'select_multiple_1'}, {api:'select_multiple_api_url', id: 'select_multiple_2'}]}, // 对表单数据进行初始化
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