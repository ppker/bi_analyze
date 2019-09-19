/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 14:37
 * Desc:
 */

window.PAGE_ACTION = function() {

    "use strict";
    var init_body = null,
        render_body = null,
        echarts_1 = null, // 每日债转数据
        init_end = null; // end mark

    render_body = function(data) {

        // 每日债转数据
        echarts_1 = function(data,data1) {

            $("span#ys_zero").text(data1);
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_DATE = [], echart_pre = [];
                $.each(data, function(i, n) {
                    echart_DATE.push(n.CREATE_TIME);
                    echart_pre.push(n.PRE);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当前剩余债转'],
                    },
                    xAxis: {
                        data: echart_DATE,
                    },
                    yAxis: {
                        name: '百分比',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        offset: 45,
                    },
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 100,

                    },

                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                    },

                    series: [
                        {
                            name:'当前剩余债转',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_pre,
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data1 = echarts_1(data[0],data[1]);

    };

    init_body = function () {

        ZP.api.custom_service_index({
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
            ZP.utils.target_timedate();
            init_body();
        }
    };

};