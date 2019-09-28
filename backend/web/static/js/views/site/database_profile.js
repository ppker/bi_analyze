window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_del = null,
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
        console.log('dfdfdfd');
        ZP.utils.default_list({
            'api_url': 'database_profile', // list的api
            'template_path': 'site/database_profile.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'btn_del': btn_del,
        });
    };

    return {
        init: function (){
            init_limit();
        }
    };


}