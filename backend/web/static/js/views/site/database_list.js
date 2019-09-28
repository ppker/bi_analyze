/*
* @Author: yata
* @Date:   2019-08-27 21:31:37
* @Last Modified by:   yanzhipeng
* @Last Modified time: 2019-09-25 11:55:38
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

                            "order": [[ 3, "asc" ]],
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
                        show_tables(t);
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

    show_tables = function(t) {
        $("table tr .btn-group").on("click", "button[actionrule='look_to']", function(e) {
            var $id = $(this).data("dbid");
            var $source_type = $(this).data("source");
            var $table_name = $(this).data("table");
            var $dbname = $(this).data("dbname");

            // 展示数据库有哪些表, 重新构造 dataTables
            ZP.api.get_tables_by_db({
                data: {id: $id, source_type: $source_type, table_name: $table_name, dbname: $dbname},
                successCallBack: function(result){
                    if(ZP.utils.isObject(result.data) || ZP.utils.isArray(result.data)){
                        t.clear().destroy(); // destroy dataTable for reiniDataTables 重构dataTables
                        $("#table thead").remove();
                        // return;
                        var $template_headerbas = "common/show.html";
                        if ('file' == $source_type) $template_headerbas = "common/show_data.html";
                        ZP.utils.render($template_headerbas, {
                            // list: {"head": ["azhu1", "azhu2"], "limit": [["yanzhipeng1", "yanzhipeng2"], ["yanzhipeng1", "yanzhipeng2"]]}
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

                            // 按钮的改变
                            $("#btn_add").remove();
                            $("div.actions div.btn-group-devided").append("<button id='btn_add' type='button' class='btn btn-primary' onclick='ZP.utils.reload();'>返回</button>");


                            // 此处继续进行 dataTables重构
                            $("table tr .btn-group").on("click", "button[actionrule='look_table']", function(e) {
                                var $table_name = $(this).data("table");
                                ZP.api.get_data_by_table({
                                    data: {db_id: $id, table_name: $table_name},
                                    successCallBack: function(result){
                                        if(ZP.utils.isObject(result.data) || ZP.utils.isArray(result.data)){
                                            t.clear().destroy(); // destroy dataTable for reiniDataTables 重构dataTables
                                            $("#table thead").remove();
                                            ZP.utils.render("common/show_data.html", {
                                                // list: {"head": ["azhu1", "azhu2"], "limit": [["yanzhipeng1", "yanzhipeng2"], ["yanzhipeng1", "yanzhipeng2"]]}
                                                list: result.data
                                            }, function(html){
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

                                                // 按钮的改变
                                                $("#btn_add").remove();
                                                $("div.actions div.btn-group-devided").append("<button id='btn_add' type='button' class='btn btn-primary' onclick='ZP.utils.reload();'>返回</button>");

                                            });

                                        }
                                    }
                                });

                            });

                    });
                }
                failCallBack: ZP.utils.failCallBack
            }});

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