/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/10/12
 * Time: 17:38
 * Desc: show.js 报表数据引擎渲染
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        btn_search = null, // btn_search 搜索表单
        mark_end = null;



    btn_search = function() {
        var $form = null;
        $form = $("form#filter_bar");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                ZP.utils.goLoadding_show();
                ZP.api.database_search_list({
                    data: $.extend($form.serializeJson(), {sql_id: show_sql_id}),
                    successCallBack: function(result){
                        if(ZP.utils.isObject(result.data) || ZP.utils.isArray(result.data)){
                            ZP.utils.render_auto_show(result.data, {}, true);
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

        // 新增自定义排序
        var cfg_order = {};
        if ($.inArray(show_sql_id, [15, 16])) {
            cfg_order.order = [0, 'asc'];
        }
        if ($.inArray(show_sql_id, [61])) {
            cfg_order.order = [2, 'desc'];
        }
        if ($.inArray(show_sql_id, [10, 11, 12, 13, 14])) {
            cfg_order.order = [0, 'desc'];
        }

        ZP.api.database_show_list({
            data: {sql_id: show_sql_id},
            // async: false,
            successCallBack:function(result){
                if(ZP.utils.isObject(result.data) || ZP.utils.isArray(result.data)){

                    $("ul.page-breadcrumb li:nth-child(2) a").text(result.data.breadcrumbs);
                    ZP.utils.render_auto_show(result.data, cfg_order);
                    ZP.utils.goLoadding_hide();
                    ZP.utils.target_timedate();
                    ZP.utils.target_timedate1();

                    if (-1 !== $.inArray(show_sql_id, [23])) {
                        ZP.utils.target_timedate5();
                    } else {
                        ZP.utils.target_timedate2();
                    }
                    // 渲染select
                    if (result.data.search_mark == 3) {
                        ZP.utils.tool_select_init({
                            api: 'select_tool_init',
                            data: {sql_id: show_sql_id},
                            id: 'mul_selects_',
                            // def: [],
                        });
                    }


                }
            },
            failCallBack: function() {ZP.utils.alert_warning('查询结果为空');}
        });
    };


    return {
        init: function (){

            init_limit();
            btn_search();

        }
    };


}