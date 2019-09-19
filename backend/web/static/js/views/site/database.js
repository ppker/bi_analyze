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


    main = function() {
        btnTest();
        showModel();
        ZP.utils.default_btn_add_submit('user_database_add');
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
        }
    };

};