/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/12/26
 * Time: 15:46
 * Desc:
*/

window.PAGE_ACTION = function() {
    "use strict";

    var init_body = null, // 初始化渲染
        render_body = null, // 渲染页面级
        render_panel = null, //
        render_table = null, // 渲染table的页面
        echarts_day_parter_give = null, // 渲染echart
        button = null,
        init_end = null; // end mark


    render_body = function(data) {


        if ('' == data || false == data) return;
        // 渲染面板的数据
        render_panel = function(data) { // 第一部分

            $("span#panel_0").attr('data-value', parseFloat(data.ZDYE).toFixed(2));
            $("span#panel_1").attr('data-value', parseFloat(data.BHCY).toFixed(2));
            $("span#panel_2").attr('data-value', parseFloat(data.NO_ZDYE).toFixed(2));
            $("span#panel_3").attr('data-value', parseFloat(data.NO_BHCY).toFixed(2));
            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data.data0);
        // 第二部分
        echarts_day_parter_give = function(data) { // 配标的图表

            // console.log(data.date_total);

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据5
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data['legend'],
                    },
                    xAxis: {
                        data: data['x'],
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元',
                            },
                            offset: 28,

                        }
                    ],
                    calculable : true,
                    /*dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 50,
                        end: 100,
                    },*/
                    series: [
                        {
                            name: data['legend'][0],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.y1,
                        },
                        {
                            name: data['legend'][1],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 5}},
                            itemStyle: {normal: {color: '#e28c92'}},
                            data: data.y2,
                        },
                        {
                            name: data['legend'][2],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: data.y3,
                        },
                        {
                            name: data['legend'][3],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#78d6de'}},
                            data: data.y4,
                        },

                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            }
            return render_echarts(data);

        };
        echarts_day_parter_give(data.data1);

        // 渲染table的数据结果
        render_table = function(data) {
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("custody/custody_hegui.html", {
                    list: data
                },function(html){
                    var table = $("#table1");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[0, 'desc']],
                        destroy: true,
                    }));
                });

            }
        };
        render_table(data.data2);


        var button = function() {
            var $form = null;
            $form = $("form#searchForm");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.utils.goLoadding_show();
                    ZP.api.custody_hegui_search({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                render_table(result.data);
                                ZP.utils.goLoadding_hide();
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        };

        button();


    };

    init_body = function () {

        ZP.api.custody_hegui({
            data: null,
            successCallBack: function(result){
                render_body(result.data);
                return;
            },
            failCallBack: ZP.utils.failCallBack
        });
        return;
    };

    return {
        init: function() {
            init_body();
            ZP.utils.target_timedate();
        }
    };


};