/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/9/4
 * Time: 14:24
 * Desc:
 */

window.PAGE_ACTION = function() {
    "use strict";

    var main = null,
        btnSetPwd = null,
        btnAvatar = null,
        main_end = null;


    btnSetPwd = function() {

        var $form = null;
        $form = $("form#form_reset");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){

                ZP.api.user_setuser({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                        $("form#form_reset input").value = '';
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();

        });
    };

    btnAvatar = function() {

        var $form = null;
        $form = $("form#form_avatar");
        $form.submit(function(e) {

            var data = new FormData($form[0]);
            data.append('access-token', g_username);

            ZP.api.user_setuser({
                data: data,
                type: 'POST',
                cache: false,
                processData: false,
                contentType: false,
                dataType: "json",
                successCallBack: function(result){
                    ZP.utils.alert_warning(result.message, true);
                },
                failCallBack: ZP.utils.failCallBack
            });
            e.preventDefault();
        });
    };


    main = function() {
        btnSetPwd(); // 修改密码
        btnAvatar(); // 上传阿发达
    };

    return {
        init: function (){
            main();
        }
    };

};