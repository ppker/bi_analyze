/*
* @Author: yata
* @Date:   2019-08-27 21:31:37
* @Last Modified by:   yata
* @Last Modified time: 2019-09-10 22:33:11
*/

window.PAGE_ACTION = function() {
    "use strict";

    var main = null,
        init_limit = null,
        btn_add = null,
        btn_del = null,
        btn_edit = null,
        btn_submit = null,
        show_tables = null,

        main_end = null;

    init_limit = function() {
        ZP.api.user_database_list({
            data: null,
            successCallBack:function(result){

                if(ZP.utils.isArray(result.data)){

                    ZP.utils.render("site/database_list.html", {
                        list: result.data
                    },function(html){
                        var table = $("#table");
                        table.html(html);
                        var t = table.DataTable({
                            // dom: '<"html5buttons"B>lTfgitp',

                            "order": [[ 0, "asc" ]],
                            oLanguage: ZP.define.dataTableLan,
                            bStateSave: ZP.define.dataTableStateSave,
                            // "stripeClasses": [ 'strip1', 'strip2'],
                            "ordering": true,
                            // dom: 'Tfgtpi',
                            scrollX: false,
                            ScrollCollapse: true,
                            responsive: true,
                            "lengthMenu": [15, 30, 100],
                            destroy: true
                        });
                        btn_del();
                        btn_edit();
                        btn_submit();
                        show_tables();
                    });


                }
            },
            failCallBack: ZP.utils.failCallBack
        });
    };

    btn_del = function() {
        $("table tr .btn-group li").on("click", "a[actionrule='del']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.user_database_del({
                    data: {id: $id},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    show_tables = function() {
        $("table tr .btn-group").on("click", "button[actionrule='look_to']", function(e) {
            var $id = $(this).data("dbid");
            ZP.utils.dumpUrl('/admin/site/database_profile?dbid=' + $id);
            e.preventDefault();
        })
    };


    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.user_database_get({
                    data: {id: $id},
                    successCallBack: function(result){
                        console.log(result.data);
                        $("#editModal input[name='id']").val($id);
                        $("#editModal input[name='name']").val(result.data.name);
                        $("#editModal input[name='host']").val(result.data.value.host);
                        $("#editModal input[name='port']").val(result.data.value.port);
                        $("#editModal input[name='user']").val(result.data.value.user);
                        $("#editModal input[name='password']").val(result.data.value.password);
                        $("#editModal input[name='dbname']").val(result.data.value.dbname);
                        $("#editModal").modal('show');
                        // ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };


    btn_add = function() {
        $("#btn_add").on('click', function() {
            ZP.utils.dumpUrl('/admin/site/database');
        });
    };

    btn_submit = function() {
        var $form = null;
        $form = $("form#editForm");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                $("#editModal").modal('hide');
                ZP.api.user_database_add({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    main = function() {
        init_limit();
        btn_add();
    };

    return {
        init: function (){
            main();
        }
    };

};