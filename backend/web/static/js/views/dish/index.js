/**
 * author: ZhiPeng
 * date: 2017/3/17
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_edit = null,
        image_upload = null,
        btn_del = null; // 单个删除的按钮

    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.dish_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('菜肴编辑');
                        $("#addModal input[name='name']").val(result.data.name).after("<input type='hidden' name='id' value=" + $id + ">").removeAttr('data-remote data-remote-error');
                        // var now_status = result.data.status;
                        $("#addModal select#dish_status").val(result.data.status); // .find("option[value=" + now_status + "]").attr("selected", true)
                        $("#addModal textarea[name='mark']").val(result.data.mark);
                        $("#addModal input[name='star']").val(result.data.star);
                        $("#addModal input[name='zan']").val(result.data.zan);
                        $("#addModal input[name='hate']").val(result.data.hate);
                        $("#addModal input[name='price']").val(result.data.price);
                        var res_id = result.data.res_id;
                        $('.bs-select').selectpicker('val', res_id); // 设置select的选中
                        $("#addModal input[name='photo']").val(result.data.photo);
                        $("#dish_photo").attr("src", "http://" + window.location.host + "/frontend/web/images/" + result.data.photo);
                        $("div.b-u-img-div").css("display", "block");
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
                ZP.api.dish_del({
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
            'api_url': 'dish_index', // list的api
            'template_path': 'dish/dish_index.html',
            'dataTable': $.extend(true, {}, ZP.utils.default_dataTable_list, {}),
            'all_del_api': 'dish_del',
            'add_api': 'dish_add',
            'init_form_api': {'api': 'dish_init_form', 'id': 'dish_hotel'}, // 需要对表单进行数据初始化操作
            'btn_edit': btn_edit,
            'btn_del': btn_del,
            'image_upload': {
                done: function (e, data) {
                    $("input#h_dish_photo").val(data.result.data);
                    $("button.b-delete").removeAttr("disabled");
                }
            },
            'image_bind_del': "h_dish_photo",
        });
    };

    return {
        init: function (){
            init_limit();
        }
    };


}