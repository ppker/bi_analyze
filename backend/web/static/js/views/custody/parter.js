/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 19:23
 * Desc:
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_body = null, // 初始化渲染
        echarts_day_parter_give = null, // 每日各合作方放款金额
        echarts_all_parter_rate = null, // 当前全部在贷各合作方占比
        echarts_property = null, // 库存过审未上标资产构成
        render_body = null, // 渲染页面级
        render_panel = null, //
        render_table = null, // 渲染table的页面
        render_table1 = null, // 渲染table2的页面
        init_end = null; // end mark


    render_body = function(data) {

        if ('' == data || false == data) return;
        // 渲染面板的数据
        render_panel = function(data) { // 第一部分
            // console.log(data);
            $("span#panel_0").attr('data-value', parseFloat(data.TOTAL_AMOUNT).toFixed(2));
            $("span#panel_1").attr('data-value', parseFloat(data.AMOUNT).toFixed(2));
            $("span#panel_2").text(parseFloat(data.G_AMOUNT).toFixed(2));
            $("span#panel_3").text(parseFloat(data.AMOUNT).toFixed(2));
            $("span#panel_4").text(parseFloat(data.P_AMOUNT).toFixed(2));
            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data[0]);
        // 第二部分
        echarts_day_parter_give = function(data) { // 配标的图表

            // console.log(data.date_total);
            data['company_name'].unshift('当日放款总额');
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data['company_name'],
                    },
                    xAxis: {
                        data: data['e2_date'],
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
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 52,
                        end: 100,
                    },
                    series: [
                        {
                            name:data['company_name'][0],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.date_total,
                        },
                        {
                            name:data['company_name'][1],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: data.e_name_data[0],
                        },
                        {
                            name: data['company_name'][2],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: data.e_name_data[1],
                        },
                        {
                            name: data['company_name'][3],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#cb66c7'}},
                            data: data.e_name_data[2],
                        },
                        {
                            name: data['company_name'][4],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#cdc6c7'}},
                            data: data.e_name_data[3],
                        },
                        {
                            name: data['company_name'][5],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#8dd281'}},
                            data: data.e_name_data[4],
                        },
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            }
            return render_echarts(data);

        };
        var data2 = echarts_day_parter_give(data[1]);
        // 第三部分 当前全部在贷各合作方占比

        echarts_all_parter_rate = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');

                var color_arr = {}, tem_color = ['#F0F8FF', '#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD', '#2D26CD', '#aD26CD', '#5D26CD'];
                var e_chart_stack = [];
                $.each(data.e3_name_data, function(i, n) {

                    var n_v = [];
                    $.each(n, function(i1, n1) {
                        n_v.push(n1);
                    });
                    e_chart_stack.push({
                        name: data['e3_company_name'][i],
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: color_arr[i]}},
                        data: n_v,
                    });
                });
                e_chart_stack.unshift({
                    name: '当日在贷总额',
                    type:'line',
                    smooth:true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ed5565'}},
                    data: data['date_total'],
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data['e3_company_name']
                    },
                    xAxis: {
                        data: data['e3_date'],
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元'
                            },
                            offset: 18,

                        }
                    ],
                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 80,
                        end: 100,
                    },
                    series: e_chart_stack

                });
                myChart.setOption(option);
                return [myChart, option];
            };
            return render_echarts(data);
        };

        var data3 = echarts_all_parter_rate(data[2]);
        // 第四部分
        echarts_property = function(data) {

            // console.log(data);
            if (null == data) return;
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                // 加工处理数据
                var echart_enterprise_name = [], echart_p_amount = [], pie_data = [];
                $.each(data, function(i, n) {
                    echart_enterprise_name.unshift(n.ENTERPRISE_NAME);
                    // echart_p_amount.unshift(n.P_AMOUNT);
                    pie_data.unshift({'value': parseFloat(n.P_AMOUNT), 'name': n.ENTERPRISE_NAME});
                });
                var option = {

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: echart_enterprise_name
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} 万元 ({d}%)"
                    },
                    series : [
                        {
                            name: '库存过审未上标资产',
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '60%'],
                            data:pie_data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        // var data4 = echarts_property(data[3]);
        // 渲染table的数据结果
        render_table = function(data) {
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("custody/custody_parter.html", {
                    list: data
                },function(html){
                    var table = $("#table1");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[0, 'desc']],
                    }));
                });

            }
        };
        render_table(data[4]);
        // 渲染table2的数据结果
        render_table1 = function(data) {
            // console.log(data);
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("custody/custody_parter2.html", {
                    list: data
                },function(html){
                    var table = $("#table2");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[1, "desc"]],
                    }));
                });

            }
        };
        render_table1(data[5]);

        // 进行轮询
        /////////////////////////////////////////////////////////////////////////////////////////////
        setInterval(function(data2, data3, data4) {
            ZP.api.custody_parter({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        // 第一部分
                        render_panel(new_data[0]);
                        // 第二部分

                        /*new_data[1]['company_name'].unshift('当日放款总额');

                        var option = data2[1];
                        var myChart = data2[0];

                        option.legend.data = new_data[1]['company_name'];
                        option.xAxis.data = new_data[1]['e2_date'].reverse();
                        option.series[0].name = new_data[1]['company_name'][0];
                        option.series[0].name = new_data[1]['company_name'][0];

                        option.series[0].data = echart_capital_net_inflow;
                        myChart.setOption(option, true);*/

                        // 第三部分
                        // 第四部分
                        render_table(new_data[4]);
                        render_table1(new_data[5]);
                        // 渲染的dataTables
                        render_table(data[4]);
                        render_table1(data[5]);
                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 1805000);
    };

    init_body = function () {

        ZP.api.custody_parter({
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
        }
    };


};