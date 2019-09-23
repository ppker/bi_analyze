/*
* @Author: yata
* @Date:   2019-08-27 21:31:37
* @Last Modified by:   yata
* @Last Modified time: 2019-08-21 22:33:11
*/

window.PAGE_ACTION = function() {
    "use strict";

    var main = null,
        btnTest = null,
        showModel = null,
        upload_btn = null,
        main_end = null;



    btnTest = function() {

        ZP.api.user_database({
            data: {},
            successCallBack: function(result) {
                // ZP.utils.alert_warning(result.message, true, false, result.data.jump);
            },
            failCallBack: ZP.utils.AuthFailCallBack
        });

    };

    upload_btn = function() {

        var $form = null;
        $form = $("form#form_excel");
        $form.submit(function(e) {

            var data = new FormData($form[0]);

            ZP.api.user_database_upload({
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
    }


    main = function() {
        btnTest();
        showModel();
        ZP.utils.default_btn_add_submit('user_database_add');
        upload_btn();
    };

    showModel = function() {
        $("a.btn-db-import").on('click', function() {
            if ('db' == $(this).data('type')) {
                $("#addModal").modal('show');
            }

        });
    };

    return {
        init: function (){
            main();
            $('.fileinput').fileinput({
                uploadUrl: "/admin/common/upload",
                maxFileCount: 5
            });
        }
    };

};