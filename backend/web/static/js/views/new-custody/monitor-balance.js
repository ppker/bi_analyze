/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 18-4-16
 * Time: 上午10:37
 * Desc:
 */

window.PAGE_ACTION = function() {

    "use strict";
    var init_body = null,
        render_body = null,

        echart1 = null,
        echart2 = null,
        render_part2 = null,
        render_part3 = null,
        search_button_1 = null,
        search_button_2 = null,
        end_mark = null;

    render_body = function(data) {

        $("#panel_0").text(parseFloat(data.data1.ADVANCE_TOTAL_AMOUNT));
        $("#panel_1").text(parseFloat(data.data1.ADVANCE_TRANSIT_AMOUNT));
        $("#panel_2").text(parseFloat(data.data1.ADVANCE_CASH_AMOUNT));

        render_part2 = function(data) {
            // console.log(data);
            $("#panel_4").text(parseFloat(data.LOANING_AMOUNT));
            $("#panel_5").text(parseFloat(data.PLATFORM_CASH_AMOUNT));
            $("#panel_6").text(parseFloat(data.PLATFORM_TRANSIT_AMOUNT));
        };
        render_part2(data.data3);

        render_part3 = function(data) {
            $("#panel_7").text(parseFloat(data.MARKETING_AMOUNT));
            $("#panel_8").text(parseFloat(data.SERVICE_FEE_AMOUNT));
        }
        render_part3(data.data5);

        // 渲染第一
        echart1 = function(data) {
            var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                legend: {data: data.legend_data},
                grid: {
                    left: "14%",
                },
                xAxis: {
                    data: data.xaxis_data,
                    offset: 10,
                },
                yAxis: [
                    {
                        name: '金额 (万元)',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万元',
                        },
                        offset: 68,
                    }
                ],
                calculable: true,
                dataZoom: { // 区间选择
                    type: 'slider',
                    show: true,
                    start : 20,
                    end: 100,
                },
                series: [
                    {
                        name: '新垫付在途余额',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {color: '#af1b1b'}},
                        data: data.series[0],
                    },
                    {
                        name: '新垫付现金余额',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {color: '#23527c'}},
                        data: data.series[1],
                    },
                ],
            });
            myChart.setOption(option);
            return myChart;
        };
        var echart_1 = echart1(data.data2);
        // xuan ran two

        echart2 = function(data) {

            var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                legend: {data: data.legend_data},
                grid: {
                    left: "14%",
                },
                xAxis: {
                    data: data.xaxis_data,
                    offset: 10,
                },
                yAxis: [
                    {
                        name: '金额 (万元)',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万元',
                        },
                        offset: 68,
                    }
                ],
                calculable: true,
                dataZoom: { // 区间选择
                    type: 'slider',
                    show: true,
                    start : 20,
                    end: 100,
                },
                series: [
                    {
                        name: '平台二级子账户余额(现金)',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {color: '#3598dc'}},
                        data: data.series[0],
                    },
                    {
                        name: '平台二级子账户余额(在途)',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {color: '#ed5565'}},
                        data: data.series[1],
                    },
                ],
            });
            myChart.setOption(option);
            return myChart;
        };

        var echart_2 =  echart2(data.data4);

        search_button_1 = function() {
            var $form = null;
            $form = $("form#searchForm1");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_dzzh({
                        data: $.extend({}, $form.serializeJson(), {'target': 1}) ,
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                var data = result.data;
                                // re_render
                                // console.log(data);
                                echart1(data);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        };
        search_button_1();

        search_button_2 = function() {
            var $form = null;
            $form = $("form#searchForm2");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_dzzh({
                        data: $.extend({}, $form.serializeJson(), {'target': 2}) ,
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                var data = result.data;
                                // re_render
                                echart2(data);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        };
        search_button_2();



    };

    init_body = function() {

        ZP.api.new_custody_monitor_balance({
            data: null,
            successCallBack: function(result) {
                render_body(result.data);
            },
            failCallBack: ZP.utils.failCallBack
        });
        return;
    };



    return {
        init: function() {
            ZP.utils.target_timedate();
            init_body();
        }
    };


};