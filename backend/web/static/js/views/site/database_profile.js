window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        mark_end = null;

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
            'api_url': 'database_profile', // list的api
            'template_path': 'site/database_profile.html',
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