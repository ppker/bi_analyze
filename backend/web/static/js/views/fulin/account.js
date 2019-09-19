/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 12:06
 * Desc:
 */

window.PAGE_ACTION = function() {

    "use strict";
    var init_body = null, // 初始化
        render_body = null, // 渲染body
        echarts_balance = null, // 余额情况图图
        echarts_total_ye = null, // 担保方余额情况图
        render_panel = null,

        init_end = null; // end mark

    render_body = function(data) {
        if ('' == data || false == data) return;
        render_panel = function(data) { // 第一部分
            $("span#panel_0").attr('data-value', parseFloat(data[0].MARKETING_AMOUNT).toFixed(2));
            $("span#panel_1").attr('data-value', parseFloat(data[0].SERVICE_FEE_AMOUNT).toFixed(2));
            $("span#panel_2").attr('data-value', parseFloat(data[0].CLEARING_ACCOUNT).toFixed(2));
            $("span#panel_3").attr('data-value', parseFloat(data[0].PLATFORM_CASH_AMOUNT).toFixed(2));
            $("span#panel_4").attr('data-value', parseFloat(data[0].LOANING_AMOUNT).toFixed(2));
            $("span#panel_5").attr('data-value', parseFloat(data[0].OWN_ACCOUNT).toFixed(2));
            $("span#panel_6").attr('data-value', parseFloat(data[0].NUM_5).toFixed(2));
            $("span#panel_7").attr('data-value', parseFloat(data[0].PLATFORM_TRANSIT_AMOUNT).toFixed(2));
            $("span#panel_8").attr('data-value', parseFloat(data[1].CASH).toFixed(2));
            $("span#panel_9").attr('data-value', parseFloat(data[1].CAPITAL_FLOW).toFixed(2));

            $("#panel_8 td").eq(0).text(parseFloat(data[0].SERVICE_FEE_AMOUNT).toFixed(2));
            $("#panel_8 td").eq(1).text(parseFloat(data[0].MARKETING_AMOUNT).toFixed(2));
            $("#panel_8 td").eq(2).text(parseFloat(data[0].CLEARING_ACCOUNT).toFixed(2));
            $("#panel_8 td").eq(3).text(parseFloat(data[0].LOANING_AMOUNT).toFixed(2));

            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data[0]);
        // 第二部分
        echarts_balance = function(data) { // 余额情况图表

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_date = [], echart_service_fee_amount = [], echart_marketing_amount = [], echart_PLATFORM_CASH_AMOUNT = [], echart_PLATFORM_TRANSIT_AMOUNT = [];
                $.each(data, function(i, n) {
                    echart_date.unshift(n.C_TIME.substring(5));
                    echart_service_fee_amount.unshift(n.SERVICE_FEE_AMOUNT);
                    echart_marketing_amount.unshift(n.MARKETING_AMOUNT);
                    echart_PLATFORM_CASH_AMOUNT.unshift(n.PLATFORM_CASH_AMOUNT);
                    echart_PLATFORM_TRANSIT_AMOUNT.unshift(n.PLATFORM_TRANSIT_AMOUNT);
                });
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['服务费余额', '营销费余额', '平台二级子账号余额【现金】', '平台二级子账号余额【在途】']
                    },
                    grid: {
                        left: 100,
                    },
                    xAxis: {
                        data: echart_date,
                        // offset: 5,
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元'
                            }

                        }
                    ],

                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 70,
                        end: 100,
                    },
                    series: [
                        {
                            name:'服务费余额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_service_fee_amount,
                        },
                        {
                            name:'营销费余额',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_marketing_amount,
                        },
                        {
                            name:'平台二级子账号余额【现金】',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#108ee9'}},
                            data: echart_PLATFORM_CASH_AMOUNT
                        },
                        {
                            name:'平台二级子账号余额【在途】',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#af1b1b'}},
                            data: echart_PLATFORM_TRANSIT_AMOUNT
                        },
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };
            return render_echarts(data);

        };


        var btn_submit = function() {
            var $form = null;
            $form = $("form#searchForm");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.fulin_account_balance({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isArray(result.data)) {
                                var data = result.data;
                                echarts_balance(data);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });

        };
        btn_submit();



        var data1 = echarts_balance(data[1]);
        // 第三部分
        echarts_total_ye = function(data) { // 担保方余额情况图

            var render_echarts = function(data) {

                var color_arr = ['#22a7b3', '#8775a7', '#f36a5a', '#9e33b7', '#1a1d84'];
                var cfg_arr = [];
                $.each(data[1], function(i, n) {
                    cfg_arr.push({
                        name: n,
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        itemStyle: {normal: {color: color_arr[i]}},
                        stack: 'sta',
                        data: data[2][i]
                    });
                });

                cfg_arr.unshift({
                    name: '当日所有担保方总余额',
                    type:'line',
                    smooth:true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ff9a9e'}},
                    data: data[3]
                });

                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data[1].concat(['当日所有担保方总余额']),
                    },
                    xAxis: {
                        data: data[0].map(function(c_value, i, arr) {
                            return c_value.substring(5);
                        }),
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                        offset: 20,
                    },
                    calculable: true,
                    dataZoom: {
                        type: 'slider',
                        show: true,
                        start: 75,
                        end: 100,
                    },
                    series: cfg_arr,
                });
                // console.log(option);
                myChart.setOption(option);
                // todo 轮询
                return [myChart, option];
            };
            return render_echarts(data);
        };

        var data2 = echarts_total_ye(data[2]);

        // 进行轮询
        /////////////////////////////////////////////////////////////////////////////////////////////
        setInterval(function(data1, data2) {
            ZP.api.fulin_account({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        // 第一部分
                        render_panel(new_data[0]);

                        // 第二部分
                        var echart_date = [], echart_service_fee_amount = [], echart_marketing_amount = [], echart_PLATFORM_CASH_AMOUNT = [], echart_PLATFORM_TRANSIT_AMOUNT = [];
                        $.each(new_data[1], function(i, n) {
                            echart_date.unshift(n.C_TIME.substring(5));
                            echart_service_fee_amount.unshift(n.SERVICE_FEE_AMOUNT);
                            echart_marketing_amount.unshift(n.MARKETING_AMOUNT);
                            echart_PLATFORM_CASH_AMOUNT.unshift(n.PLATFORM_CASH_AMOUNT);
                            echart_PLATFORM_TRANSIT_AMOUNT.unshift(n.PLATFORM_TRANSIT_AMOUNT);
                        });
                        var option = data1[1];
                        var myChart = data1[0];

                        option.xAxis.data = echart_date;
                        option.series[0].data = echart_service_fee_amount;
                        option.series[1].data = echart_marketing_amount;
                        option.series[2].data = echart_PLATFORM_CASH_AMOUNT;
                        option.series[3].data = echart_PLATFORM_TRANSIT_AMOUNT;
                        myChart.setOption(option, true);
                        // 第三部分 todo

                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 1805000);

    };


    init_body = function () {

        ZP.api.fulin_account({
            data: null,
            successCallBack: function(result){
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