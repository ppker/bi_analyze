/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/11/22
 * Time: 11:37
 * Desc:
 */


window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_search = null, // btn_search 搜索表单
        render_table_body = null,
        mark_end = null;



    btn_search = function() {
        var $form = null;
        $form = $("form#filter_bar");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                ZP.utils.goLoadding_show();

                ZP.api.database_search_yhlc({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if(ZP.utils.isObject(result.data)){
                            render_table_body(result.data);
                            ZP.utils.goLoadding_hide();
                        }
                    },
                    failCallBack: function() {ZP.utils.alert_warning('查询结果为空');}
                });
            }
            e.preventDefault();
        });
    };


    init_limit = function() {
        ZP.utils.goLoadding_show();

        ZP.api.database_show_yhlc({
            data: {},
            successCallBack: function(result){
                if(ZP.utils.isObject(result.data)){
                    render_table_body(result.data);
                    ZP.utils.goLoadding_hide();
                }
            },
            failCallBack: function() {ZP.utils.alert_warning('查询结果为空');}
        });
    };

    render_table_body = function(data) {

        // console.log(data);
        var sel = $("#app_market_name");
        $.each(data.head_market, function(i, v) {
            sel.append("<option value='" + v + "'>" + v + "</option>");
        });

        var table = $("#table"), head_str = '';
        $.each(data.head, function(i, v) {
            head_str += "<th>" + v + "</th>";
        });
        if (0 == $("#custom_head").length) {
            table.append("<thead id='custom_head'><tr role='row'>"+ head_str +"</tr></thead>");
            // 渲染头部
            $("#custom_head").css({"background-color": "#00aecd"});
        } else {
            $("#table_wrapper").remove();
            var new_table = null; //
            new_table = $('<table class="table table-striped table-bordered table-hover" id="table"></table>').appendTo("div.table-container");
            new_table.append("<thead id='custom_head'><tr role='row'>"+ head_str +"</tr></thead>");
            // 渲染头部
            $("#custom_head").css({"background-color": "#00aecd"});
            var t = new_table.DataTable({
                "order": [[ 0, "asc" ]],
                oLanguage: ZP.define.dataTableLan,
                bStateSave: ZP.define.dataTableStateSave,
                stripeClasses: ['strip1', 'strip2'],
                "ordering": true,
                // dom: 'Tfgtpi',
                "scrollX": true,
                "scrollY": true,
                ScrollCollapse: true,
                autoWidth: false,
                buttons: [
                    { extend: 'excel', className: 'btn yellow btn-outline ' },
                    { extend: 'csv', className: 'btn purple btn-outline ' },
                    { extend: 'pdf', className: 'btn green btn-outline' },
                    { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'},
                    /*{ extend: 'print', className: 'btn dark btn-outline' },
                     { extend: 'copy', className: 'btn red btn-outline' },*/
                ],
                data: data.body_data,
                // responsive: false,
                "lengthMenu": [15, 30, 100],
                destroy: true,
            });
            $('#sample_3_tools > li > a.tool-action').on('click', function() {
                var action = $(this).attr('data-action');
                t.button(action).trigger();
            });
            return;
        }

        var t = table.DataTable({
            "order": [[ 0, "asc" ]],
            oLanguage: ZP.define.dataTableLan,
            bStateSave: ZP.define.dataTableStateSave,
            stripeClasses: ['strip1', 'strip2'],
            "ordering": true,
            // dom: 'Tfgtpi',
            "scrollX": true,
            "scrollY": true,
            ScrollCollapse: true,
            autoWidth: false,
            buttons: [
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'},
                /*{ extend: 'print', className: 'btn dark btn-outline' },
                 { extend: 'copy', className: 'btn red btn-outline' },*/
            ],
            data: data.body_data,
            // responsive: false,
            "lengthMenu": [15, 30, 100],
            destroy: true,
        });

        $('#sample_3_tools > li > a.tool-action').on('click', function() {
            var action = $(this).attr('data-action');
            t.button(action).trigger();
        });

        ZP.utils.target_month_date();
    };

    return {
        init: function (){

            init_limit();
            btn_search();
        }
    };


}