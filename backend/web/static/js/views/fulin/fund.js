/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 15:28
 * Desc:
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_body = null, // 初始化渲染
        echarts_synopsis = null, // 配标资金流总览
        echarts_hour_buy = null, // 每小时入金情况
        echarts_hour_out = null, // 每小时出金情况
        echarts_realtime_had = null, // 用户余额帐户实时存量
        render_body = null, // 渲染页面函数
        render_panel = null, // 渲染第一部分 panel
        init_end = null; // end mark

    render_body = function(data) { // 渲染页面级别

        // 第一部分
        if ('' == data || false == data) return;
        render_panel = function(data) {
            // console.log(data);
            $("span#panel_0").attr('data-value', parseFloat(data.TOTAL_CAPITAL_INFLOW));
            $("span#panel_1").attr('data-value', parseFloat(data.DAY_AMOUNT));
            $("span#panel_2").attr('data-value', parseFloat(data.REPAYMENT_AMOUNT));
            $("span#panel_3").attr('data-value', parseFloat(data.TOTAL_CAPITAL_FLOWOUT));
            $("span#panel_4").attr('data-value', parseFloat(data.NEW_REDEEM_AMOUNT));
            $("span#panel_5").attr('data-value', parseFloat(data.LOAN_AMOUNT));

            $("#panel_6 td").eq(0).text(parseFloat(data.ALLOCATED_FUND));
            $("#panel_6 td").eq(1).text(parseFloat(data.RESERVED_CAPITAL));
            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data[0]);
        // 第二部分
        echarts_synopsis = function(data, money_save) { // 配标的图表

            var render_echarts = function(data, money_save) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_date = [], echart_allocated_fund = [];
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME.substring(11));
                    echart_allocated_fund.push(n.ALLOCATED_FUND);
                });
                money_save = parseInt(money_save);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当前全部待配资金']
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元'
                            },
                            // offset: 30,

                        }
                    ],
                    series: [
                        {
                            name: '当前全部待配资金',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_allocated_fund,
                            markLine: {
                                // precision: 500,
                                data: [{
                                    name: '保留资金额度',
                                    yAxis: money_save,
                                }],
                            },
                        }
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };
            return render_echarts(data, money_save);

        };
        var data2 = echarts_synopsis(data[1], data[0]['RESERVED_CAPITAL'] + "");
        // 第三部分 每小时入金情况
        echarts_hour_buy = function(data) { // 每小时入金情况

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                // 加工处理数据
                var echart_date = [], echart_TOTAL_CAPITAL_INFLOW = [], echart_INVESTMENT_AMOUNT = [], echart_REPAYMENT_AMOUNT = [];
                $.each(data, function(i, n) {
                    echart_date.unshift(n.C_TIME.substring(11));
                    echart_TOTAL_CAPITAL_INFLOW.unshift(n.TOTAL_CAPITAL_INFLOW);
                    echart_INVESTMENT_AMOUNT.unshift(n.INVESTMENT_AMOUNT);
                    echart_REPAYMENT_AMOUNT.unshift(n.REPAYMENT_AMOUNT);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['实时入金总额', '实时投资金额', '实时还款金额'],
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
                            name: '实时入金总额',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_TOTAL_CAPITAL_INFLOW,
                        },
                        {
                            name:'实时投资金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_INVESTMENT_AMOUNT
                        },
                        {
                            name:'实时还款金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_REPAYMENT_AMOUNT
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };
        var data3 = echarts_hour_buy(data[2]);
        // 第四部分 每小时出金情况

        echarts_hour_out = function(data) {
            // console.log(data);
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                // 加工处理数据
                var echart_date = [], echart_TOTAL_CAPITAL_FLOWOUT = [], echart_REDEEM_AMOUNT = [], echart_LOAN_AMOUNT = [];
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME.substring(11));
                    echart_TOTAL_CAPITAL_FLOWOUT.push(n.TOTAL_CAPITAL_FLOWOUT);
                    echart_REDEEM_AMOUNT.push(n.REDEEM_AMOUNT);
                    echart_LOAN_AMOUNT.push(n.LOAN_AMOUNT);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['实时出金总额', '实时赎回金额', '实时放款金额'],
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
                            name:'实时出金总额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_TOTAL_CAPITAL_FLOWOUT,
                        },
                        {
                            name:'实时赎回金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_REDEEM_AMOUNT
                        },
                        {
                            name:'实时放款金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_LOAN_AMOUNT
                        },

                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };
        var data4 = echarts_hour_out(data[3]);
        // 第五部分 用户余额帐户充值/提现情况
        echarts_realtime_had = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_4'), 'macarons');

                // 加工处理数据
                var echart_date = [], echart_recharge_amount = [], echart_withdrawal_amount = [];
                $.each(data, function(i, n) {
                    echart_date.unshift(n.C_TIME.substring(11));
                    echart_recharge_amount.unshift(n.RECHARGE_AMOUNT);
                    echart_withdrawal_amount.unshift(n.WITHDRAWAL_AMOUNT);
                });
                // console.log(echart_date);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['实时充值金额', '实时提现金额'],
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
                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 70,
                        end: 100,
                    },
                    series: [
                        {
                            name:'实时充值金额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_recharge_amount,
                        },
                        {
                            name:'实时提现金额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_withdrawal_amount,
                        },

                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };
        // console.log(data[4]);
        var data5 = echarts_realtime_had(data[4]);


        var btn_submit = function() {
            var $form = null;
            $form = $("form#searchForm");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.fulin_user_balance({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isArray(result.data)) {
                                var data = result.data;
                                echarts_realtime_had(data);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });

        };

        btn_submit();
        // 进行轮询
        /////////////////////////////////////////////////////////////////////////////////////////////
        setInterval(function(data2, data3, data4, data5) {

            ZP.api.fulin_fund({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        // 第一部分
                        render_panel(new_data[0]);
                        // 第二部分
                        var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                        // 加工处理数据
                        var echart_date = [], echart_allocated_fund = [];
                        $.each(data, function(i, n) {
                            echart_date.push(n.C_TIME.substring(11));
                            echart_allocated_fund.push(n.ALLOCATED_FUND);
                        });

                        var option = data2[1];
                        var myChart = data2[0];

                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_allocated_fund;
                        option.series[0]['markLine']['data'][0]['yAxis'] = new_data[0]['RESERVED_CAPITAL'];
                        myChart.setOption(option, true);
                        // 第三部分
                        var echart_date = [], echart_TOTAL_CAPITAL_INFLOW = [], echart_INVESTMENT_AMOUNT = [], echart_REPAYMENT_AMOUNT = [];
                        $.each(data, function(i, n) {
                            echart_date.unshift(n.C_TIME.substring(11));
                            echart_TOTAL_CAPITAL_INFLOW.unshift(n.TOTAL_CAPITAL_INFLOW);
                            echart_INVESTMENT_AMOUNT.unshift(n.INVESTMENT_AMOUNT);
                            echart_REPAYMENT_AMOUNT.unshift(n.REPAYMENT_AMOUNT);
                        });
                        var option = data3[1];
                        var myChart = data3[0];
                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_TOTAL_CAPITAL_INFLOW;
                        option.series[1].data = echart_INVESTMENT_AMOUNT;
                        option.series[2].data = echart_REPAYMENT_AMOUNT;
                        myChart.setOption(option, true);
                        // 第四部分
                        var echart_date = [], echart_TOTAL_CAPITAL_FLOWOUT = [], echart_REDEEM_AMOUNT = [], echart_LOAN_AMOUNT = [];
                        $.each(data, function(i, n) {
                            echart_date.push(n.C_TIME.substring(11));
                            echart_TOTAL_CAPITAL_FLOWOUT.push(n.TOTAL_CAPITAL_FLOWOUT);
                            echart_REDEEM_AMOUNT.push(n.REDEEM_AMOUNT);
                            echart_LOAN_AMOUNT.push(n.LOAN_AMOUNT);
                        });
                        var option = data4[1];
                        var myChart = data4[0];
                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_TOTAL_CAPITAL_FLOWOUT;
                        option.series[1].data = echart_REDEEM_AMOUNT;
                        option.series[2].data = echart_LOAN_AMOUNT;
                        myChart.setOption(option, true);
                        // 第五部分
                        var echart_date = [], echart_recharge_amount = [], echart_withdrawal_amount = [];
                        $.each(new_data[4], function(i, n) {
                            echart_date.unshift(n.C_TIME.substring(11));
                            echart_recharge_amount.unshift(n.RECHARGE_AMOUNT);
                            echart_withdrawal_amount.unshift(n.WITHDRAWAL_AMOUNT);
                        });
                        var option = data5[1];
                        var myChart = data5[0];
                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_recharge_amount;
                        option.series[1].data = echart_withdrawal_amount;
                        myChart.setOption(option, true);

                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 480000);


    };

    init_body = function () {

        ZP.api.fulin_fund({
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