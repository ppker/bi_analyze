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
        echarts_1 = null, // 渲染echart
        echarts_2 = null, // 渲染echart
        init_end = null; // end mark


    render_body = function(data) {


        if ('' == data || false == data) return;
        // 第一部分
        echarts_1 = function(data) { // 配标的图表

            // console.log(data.date_total);

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据5
                var e_chart_stack = [];
                $.each(data[2], function(i, n) {
                    e_chart_stack.push({
                        value: n,
                        name: data[0][i],
                    });
                });
                var e_chart_selected = {};
                $.each(data[0], function(ii, vv) {
                    var v = false;
                    if (ii == 0 || ii == 1) {
                        v = true;
                    }
                    e_chart_selected[vv] = v;
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    tooltip: {},
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: '5%',
                        top: '5%',
                        bottom: '5%',
                        data: data[0],
                        selected: e_chart_selected
                    },
                    xAxis: {show: false},
                    yAxis: {show: false},
                    radar: [
                        {
                            indicator: [
                                {text: '1个月', max: 15},
                                {text: '3个月', max: 15},
                                {text: '6个月', max: 15},
                                {text: '9个月', max: 15},
                                {text: '12个月', max: 15}
                            ],
                            center: ['45%', '60%'],
                            splitNumber: 3
                        },
                    ],
                    series: [
                        {
                            type: 'radar',
                            tooltip: {
                                trigger: 'item'
                            },
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = [
                                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                            '#9933FF','#FF66FF','#0066FF','#330000','#000000'
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            data: e_chart_stack
                        },

                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            }
            return render_echarts(data);

        };
        echarts_1(data.data0);

        echarts_2 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');

                var color_arr = {}, tem_color = [
                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                    '#9933FF','#FF66FF','#0066FF','#330000','#000000'
                ];
                var e_chart_selected = {};
                $.each(data['e3_name'], function(ii, vv) {
                    var v = false;
                    if (ii == 0) {
                        v = true;
                    }
                    e_chart_selected[vv] = v;
                });
                var e_chart_stack = [];
                $.each(data.e3_name_data, function(i, n) {

                    var n_v = [];
                    $.each(n, function(i1, n1) {
                        n_v.push(n1);
                    });
                    e_chart_stack.push({
                        name: data['e3_name'][i],
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        itemStyle: {normal: {color: color_arr[i]}},
                        data: n_v,
                    });
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data['e3_name'],
                        selected: e_chart_selected
                    },
                    xAxis: {
                        data: data['e3_date'],
                    },
                    yAxis : [
                        {
                            name: '利率',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} %'
                            },
                            offset: 18,

                        }
                    ],
                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 100,
                    },
                    series: e_chart_stack

                });
                myChart.setOption(option);
                return [myChart, option];
            };
            return render_echarts(data);
        };

        echarts_2(data.data1);
    };

    init_body = function () {

        ZP.api.custody_jingpin({
            data: null,
            successCallBack: function(result){
                render_body(result.data);
                return;
            },
            failCallBack: ZP.utils.failCallBack
        });
        return;
    };

    // 新增一个查询搜索的功能
    var btn_submit = function() {
        var $form = null;
        $form = $("form#searchForm");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.custody_jingpin_search({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        var data = result.data;
                        echarts_2(data.data1);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    return {
        init: function() {
            init_body();
            btn_submit();
            ZP.utils.target_timedate();
        }
    };


};