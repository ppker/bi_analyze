/**
 * Created by PhpStorm.
 * User: ZhiPeng
 * Github: https://github.com/ppker
 * Date: 2017/4/1
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
                ZP.api.gocar_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('编辑购物车记录');
                        $("#addModal input[name='id']").val(result.data.id);
                        $("select#select_user_id").selectpicker('val', result.data.user_id);
                        $("select#select_hotel_id").selectpicker('val', result.data.hotel_id);
                        $("select#select_dish_id").selectpicker('val', result.data.dish_id);
                        $("#addModal input[name='num']").val(result.data.num);
                        $("#addModal").modal('show');
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    init_limit = function() {
        ZP.utils.default_list({
            'api_url': 'gocar_list', // list的api
            'template_path': 'gocar/gocar_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'gocar_del',
            'add_api': 'gocar_add',
            'init_form_html_data': {'select': [{api:'select_users_api', id: 'select_user_id'}, {api:'select_dishes_api', id: 'select_dish_id'}, {api:'select_hotels_api', id: 'select_hotel_id'}]}, // 对表单的html数据进行页面级初始化
            'btn_edit': btn_edit,
            // 'btn_del': btn_del, 已废弃
            'btn_default_del': "gocar_del",
        });
    };

    return {
        init: function (){
            init_limit();
        }
    };


}