/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 10:32
 * Desc:
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_body = null, // 初始化渲染
        echarts_pei = null, // 配标图表 as echarts_1
        echarts_shangbiao = null, // 上标图表
        echarts_peibiao = null, // 配标图表
        render_panel_data = null, // 面板数据
        add_sentence = null,
        init_end = null // end of the mark

    echarts_pei = function(data) { // 配标的图表

        // 渲染面板数据的函数
        render_panel_data = function(data) {
            if (ZP.utils.isObject(data) && data) { // 装饰器模式啊
                $("span#panel_0").attr('data-value', parseFloat(data[0].AVAILABLE_FUNDS)); // 当前可匹配资金
                $("span#panel_1").attr('data-value', parseFloat(data[0].ASSETS_NOT_ALLOCATED)); // 当前待匹配资产
                $("span#panel_2").attr('data-value', parseFloat(data[0].SURPLUS_MARK)); // 当日剩余可上原始标额度
                $("td#panel_3").text(parseFloat(data[0].ALLOCATED_FUND)); // 全部待配资金

                $("#panel_4 td").eq(0).text(parseFloat(data[0].MARK_MAX)); // 每日上标上限
                $("#panel_4 td").eq(1).text(parseFloat(data[0].NEW_MARK)); // 今日已上标额度 改成 当日已配新标额度
                $("#panel_4 td").eq(2).text(parseFloat(data[0].SURPLUS_MARK)); // 今日还可上标额度
                $("#panel_4 td").eq(3).text(parseFloat(data[0].P_AMOUNT)); // 当前库存待配资产

                $("#panel_5 td").eq(0).text(parseFloat(data[0].NEW_MARK)); // 今日已配原始标
                $("#panel_5 td").eq(1).text(parseFloat(data[0].DEBT_TO_MARK)); // 今日已配债转标
                $("#panel_5 td").eq(2).text(parseFloat(data[0].TOTAL_JRYPB)); // 今日已配标总额

                $("[data-counter='counterup']").counterUp();
            };
        };

        add_sentence = function(data) {
            $("span.all_amount").text(data['ALL_AMOUNT']);
            $("span.amount_0").text(data['AMOUNT']);
            $("span.nums").text(data['NUMS']);
        };
        add_sentence(data[6]);
        render_panel_data(data[0]);
        // 第一个图表
        var echart_pei = function(data) {
            // 对数据进行加工
            var echart_date = [], echart_available_funds = [], echart_assets_not_allocated = [], echart_new_mark = [], echart_new_mark_edi = [], echart_debt_to_mark = [];
            $.each(data, function(i, n) {
                echart_date.push(n.C_TIME.substring(5));
                echart_available_funds.push(n.AVAILABLE_FUNDS);
                echart_assets_not_allocated.push(n.ASSETS_NOT_ALLOCATED);
                echart_new_mark.push(n.NEW_MARK);
                echart_new_mark_edi.push(n.NEW_MARK_EDI);
                echart_debt_to_mark.push(n.DEBT_TO_MARK);
            });
            var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                legend: {
                    data: ['当前可匹配资金', '待匹配资产', '已配原始标-本地上传', '已配原始标-EDI', '已配债转标']
                },
                xAxis: {
                    data: echart_date,
                    offset: 0,
                },
                yAxis : [
                    {
                        name: '金额',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                        offset: 8,

                    }
                ],
                calculable : true,
                dataZoom: { // 区间选择
                    type: 'slider',
                    show: true,
                    start : 88,
                    end: 100,
                },
                series: [
                    {
                        name:'当前可匹配资金',
                        type:'line',
                        smooth:true,
                        symbol: 'circle',
                        symbolSize: 7,
                        lineStyle: {normal: {width: 4}},
                        itemStyle: {normal: {color: '#ed5565'}},
                        data: echart_available_funds,
                    },
                    {
                        name:'待匹配资产',
                        type:'line',
                        smooth:true,
                        symbol: 'circle',
                        symbolSize: 7,
                        lineStyle: {normal: {width: 4}},
                        itemStyle: {normal: {color: '#af1b1b'}},
                        data: echart_assets_not_allocated,
                    },
                    {
                        name:'已配债转标',
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: '#529bff'}},
                        data: echart_debt_to_mark,
                    },
                    {
                        name:'已配原始标-本地上传',
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: '#e8b4f1'}},
                        data: echart_new_mark,
                    },
                    {
                        name:'已配原始标-EDI',
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: '#1ab394'}},
                        data: echart_new_mark_edi,
                    },
                ],
            });
            myChart.setOption(option);
            return [myChart, option];
            // 轮询

        };
        var data1 = echart_pei(data[1]);
        ///////////////////////////////////////////////////////////////////////////////////////////

        echarts_shangbiao = function(data) { // 第二个图表

            // api 获取数据
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                // 对数据进行加工
                var echart_date = [], echart_p_amount = [], echart_new_mark = [];
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME.substring(11));
                    echart_p_amount.push(n.P_AMOUNT);
                    echart_new_mark.push(n.NEW_MARK);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当前库存可上标资产', '今日已上标金额'],
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        }
                    },
                    series: [
                        {
                            name:'当前库存可上标资产',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_p_amount
                        },
                        {
                            name:'今日已上标金额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_new_mark
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data2 = echarts_shangbiao(data[2]);
        ///////////////////////////////////////////////////////////////////////////////////////////

        echarts_peibiao = function(data, mark__max) { // 配标的图 第三个图

            var render_echarts = function(data, mark__max) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                // 处理加工的数据
                var echart_date = [], echart_new_mark = [], echart_debt_to_mark = [];
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME.substring(11));
                    echart_new_mark.push(n.NEW_MARK);
                    echart_debt_to_mark.push(n.DEBT_TO_MARK);
                });
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当前已配原始标', '当前已配债转标'],
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                       // max: 2200,
                    },
                    series: [
                        {
                            name:'当前已配原始标',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_new_mark,
                            markLine: {
                                // precision: 500,
                                data: [{
                                    name: '保底线',
                                    yAxis: mark__max - 0,
                                }],
                            },
                        },
                        {
                            name:'当前已配债转标',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_debt_to_mark
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];
            };
            return render_echarts(data, mark__max);
        };

        var data3 = echarts_peibiao(data[1], data[5]);

        // 进行轮询
        /////////////////////////////////////////////////////////////////////////////////////////////
        setInterval(function(data1, data2, data3) {
            ZP.api.yuqian_pei({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        render_panel_data(new_data[0]);
                        // 第一个表
                        var echart_date = [], echart_available_funds = [], echart_assets_not_allocated = [], echart_new_mark = [], echart_debt_to_mark = [];
                        $.each(new_data[1], function(i, n) {
                            echart_date.push(n.C_TIME.substring(5));
                            echart_available_funds.push(n.AVAILABLE_FUNDS);
                            echart_assets_not_allocated.push(n.ASSETS_NOT_ALLOCATED);
                            echart_new_mark.push(n.NEW_MARK);
                            echart_debt_to_mark.push(n.DEBT_TO_MARK);
                        });

                        var option = data1[1];
                        var myChart = data1[0];

                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_available_funds;
                        option.series[1].data = echart_assets_not_allocated;
                        option.series[2].data = echart_new_mark;
                        option.series[3].data = echart_debt_to_mark;
                        myChart.setOption(option, true);
                        // 第二个表
                        var option2 = data2[1];
                        var myChart2 = data2[0];
                        var echart_date = [], echart_p_amount = [], echart_new_mark = [];
                        $.each(new_data[2], function(i, n) {
                            echart_date.push(n.C_TIME.substring(11));
                            echart_p_amount.push(n.P_AMOUNT);
                            echart_new_mark.push(n.NEW_MARK);
                        });

                        option2.xAxis.data = echart_date;
                        option2.series[0].data = echart_p_amount;
                        option2.series[1].data = echart_new_mark;
                        myChart2.setOption(option2, true);

                        // 第三个表
                        var options3 = data3[1];
                        var myChart3 = data3[0];
                        var echart_date = [], echart_new_mark = [], echart_debt_to_mark = [];
                        $.each(new_data[1], function(i, n) {
                            echart_date.push(n.C_TIME.substring(11));
                            echart_new_mark.push(n.NEW_MARK);
                            echart_debt_to_mark.push(n.DEBT_TO_MARK);
                        });
                        option3.xAxis.data = echart_date;
                        option3.series[0].data = echart_new_mark;
                        option3.series[0].markLine.data.yAxis = new_data[5];

                        option3.series[1].data = echart_debt_to_mark;
                        myChart3.setOption(option3, true);

                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 1805000);

    };

    init_body = function () {

        ZP.api.yuqian_pei({
            data: null,
            successCallBack: function(result){
                echarts_pei(result.data);
            },
            failCallBack: ZP.utils.failCallBack
        });
    };

    return {
        init: function() {
            init_body();
        }
    };


};