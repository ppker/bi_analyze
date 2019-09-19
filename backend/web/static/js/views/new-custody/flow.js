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
        echarts_1 = null, // 每日流动性数据
        echarts_realtime_had = null, // 用户余额账户实时存量
        echarts_2 = null, // 应到账/实到账情况
        render_table = null, // 7日预警数据
        render_panel = null, // 小助手数据
        init_end = null; // end mark

    render_body = function(data) {

        // 每日流动性数据
        echarts_1 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_DATE = [], echart_C_DATE = [], echart_TOTAL_AMOUNT = [], echart_REPAYMENT_AMOUNT = [], echart_DIFF_AMOUNT = [], echart_EXPECT_AMOUNT = [], echart_IS_WORK_DAY = [];
                $.each(data, function(i, n) {
                    echart_DATE.push(n.C_DATE);
                    echart_C_DATE.push(n.C_DATE+'('+n.WEEK_NAME+')');
                    echart_TOTAL_AMOUNT.push(n.TOTAL_AMOUNT);
                    echart_REPAYMENT_AMOUNT.push(n.REPAYMENT_AMOUNT);
                    echart_EXPECT_AMOUNT.push(n.EXPECT_AMOUNT);
                    echart_DIFF_AMOUNT[n.C_DATE+'('+n.WEEK_NAME+')']=parseFloat(n.DIFF_AMOUNT).toFixed(2);
                    echart_IS_WORK_DAY[n.C_DATE]=n.IS_WORK_DAY;
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当日还款总额', '当日预估销售(仅供参考)', '当日产品到期总额'],
                    },
                    xAxis: {
                        data: echart_C_DATE,
                        axisLabel: {
                            formatter: function(echart_C_DATE) {
                                return echart_C_DATE.substr(0,10);
                            },
                            textStyle: {
                                color: function (value, index) {
                                    if (new Date().toDateString() === new Date(value).toDateString()) {
                                        return '#36c6d3';
                                    }
                                    if (echart_IS_WORK_DAY[value.substr(0,10)] == 'N') {
                                        return '#e7505a';
                                    } else {
                                        return '#333';

                                    }
                                }
                            }
                        },
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                        offset: 45,
                    },
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 40,

                    },

                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div>'+params[0].name+'<br>'
                            for(var i=0;i<params.length;i++){
                                if (params[i].seriesName == '当日预估销售(仅供参考)') {
                                    var d1 = new Date(params[0].name.substr(0,10).replace(/\-/g, "\/"));
                                    var myDate = new Date();
                                    var d2 = new Date(myDate.toLocaleDateString().replace(/\-/g, "\/"));
                                    //console.log(d1);console.log(d2);
                                    if (d1 < d2) {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>当日实际销售:'+params[i].data+'<br>'
                                    } else {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                                    }
                                } else {
                                    res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                                }
                            }
                            res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>差额:'+(echart_DIFF_AMOUNT[params[0].name])+'<br>'
                            res+='</div>'
                            return res;
                        }
                    },

                    series: [
                        {
                            name:'当日还款总额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#e7505a'}},
                            data: echart_REPAYMENT_AMOUNT,
                            barCategoryGap: "60%"
                        },
                        {
                            name:'当日预估销售(仅供参考)',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_EXPECT_AMOUNT,
                            barCategoryGap: "60%"
                        },
                        {
                            name:'当日产品到期总额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            //stack: 'sta',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_TOTAL_AMOUNT,
                            barCategoryGap: "60%"
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data1 = echarts_1(data[0]);

        //  用户余额账户充值/提现情况
        echarts_realtime_had = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');

                // 加工处理数据
                var echart_date = [], echart_recharge_amount = [], echart_withdrawal_amount = [];
                $.each(data, function(i, n) {
                    echart_date.unshift(n.C_TIME);
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
                        start : 50,
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
        var data5 = echarts_realtime_had(data[2]);

        //  应到账/实到账情况
        echarts_2 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');

                // 加工处理数据
                var echart_date = [], echart_account_number = [], echart_account_number_diff = [], echart_rn = [];
                $.each(data, function(i, n) {
                    echart_date.unshift(n.C_TIME);
                    echart_account_number.unshift(n.ACCOUNT_NUMBER);
                    echart_account_number_diff.unshift(n.RN - n.ACCOUNT_NUMBER);
                    echart_rn.unshift(n.RN);
                });
                // console.log(echart_date);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['实到账人数', '应到账人数'],
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis: {
                        name: '人数',
                        axisLabel: {
                            formatter: '{value} 人'
                        }
                    },
                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 50,
                        end: 100,
                    },
                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div>'+params[0].name+'<br>'
                            for(var i=0;i<params.length;i++){
                                res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                            }
                            res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>差额:'+(echart_account_number[params[0].dataIndex])+'<br>'
                            res+='</div>'
                            return res;
                        }
                    },
                    series: [
                        {
                            name:'实到账人数',
                            type:'bar',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_account_number_diff,
                        },
                        {
                            name:'应到账人数',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_rn,
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
        var data6 = echarts_2(data[3]);

        // 渲染7日预警数据
        render_table = function(data) {
            if(ZP.utils.isArray(data)){
                // 加工处理数据
                var echart_DATE = [], echart_DIFF_AMOUNT = [];
                var html = '';
                $.each(data, function(i, n) {
                    if (n.DIFF_AMOUNT > 0) {
                        html += '<tr style="background-color: #e7505a;color:#fff"><td>'+n.C_DATE+'</td><td>'+n.DIFF_AMOUNT+'</td></tr>'
                    } else {
                        html += '<tr><td>'+n.C_DATE+'</td><td>'+n.DIFF_AMOUNT+'</td></tr>'
                    }
                });
                 //console.log(data);
                var table = $("#table1");
                table.html(html);
            }
        };
        var data2 = render_table(data[1]);

        // 渲染小助手数据
        render_panel = function(data) {
            // console.log(data);
            $("span#panel_0").text(data.C_DATE);
            $("span#panel_1").text(parseFloat(data.TOTAL_AMOUNT));
            $("span#panel_2").text(parseFloat(data.REPAYMENT_AMOUNT));
            $("span#panel_3").text(parseFloat(data.DIFF_AMOUNT));
            $("span#panel_4").text(data.WEEK_NAME);
            if (data.DIFF_AMOUNT == 'N') {
                $("span#panel_4").css("color","#e7505a");
            } else {
                $("span#panel_4").css("color","#00c853");
            }
        };

    };

    init_body = function () {

        ZP.api.new_custody_flow({
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
                ZP.api.new_custody_flow_search({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_1(data[0]);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    var btn_submit1 = function() {
        var $form = null;
        $form = $("form#searchForm1");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_flow_search1({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            render_panel(data[0][0]);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    var btn_submit2 = function() {
        var $form = null;
        $form = $("form#searchForm2");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_flow_search2({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_realtime_had(data[0]);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    var btn_submit3 = function() {
        var $form = null;
        $form = $("form#searchForm3");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_flow_search3({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_2(data[0]);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    return {
        init: function() {
            ZP.utils.target_timedate();
            init_body();
            btn_submit();
            btn_submit1();
            btn_submit2();
            btn_submit3();
        }
    };

};