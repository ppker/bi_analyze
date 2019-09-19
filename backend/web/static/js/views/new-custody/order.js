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
        echarts_1 = null, // 每日还款、复投、新投订单数（标的维度）
        echarts_2 = null, // 单位时间还款复投订单数（标的维度）
        echarts_3 = null, // 积压还款复投订单数（标的维度）
        echarts_4 = null, // 赎回订单数（产品维度）
        echarts_5 = null, // 债转订单数（标的维度）
        init_end = null; // end mark

    render_body = function(data) {

        // 每日还款、复投、新投订单数（标的维度）
        echarts_1 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_DATE = [], echart_C_DATE = [], echart_REPAY_INVEST_NUMS = [], echart_T_NUMBER = [], echart_T_NUMBER_NEW = [], echart_IS_WORK_DAY = [];
                var create_time = '';
                $.each(data, function(i, n) {
                    echart_DATE.push(n.C_DATE);
                    echart_C_DATE.push(n.C_DATE+'('+n.WEEK_NAME+')');
                    echart_REPAY_INVEST_NUMS.push(n.REPAY_INVEST_NUMS);
                    echart_T_NUMBER.push(n.T_NUMBER);
                    echart_T_NUMBER_NEW.push(n.T_NUMBER_NEW);
                    echart_IS_WORK_DAY[n.C_DATE]=n.IS_WORK_DAY;
                    create_time = n.CREATE_TIME;
                });
                $("i#panel_1").text(create_time);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['还款订单数', '复投订单数', '新投订单数'],
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
                        name: '订单数',
                        axisLabel: {
                            formatter: '{value} 个'
                        },
                        offset: 45,
                    },
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 70,

                    },

                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div>'+params[0].name+'<br>'
                            for(var i=0;i<params.length;i++){
                                if (params[i].seriesName == '还款订单数') {
                                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ':' + params[i].data + '<br>'
                                } else {
                                    var d1 = new Date(params[0].name.substr(0,10).replace(/\-/g, "\/"));
                                    var myDate = new Date();
                                    var d2 = new Date(myDate.toLocaleDateString().replace(/\-/g, "\/"));
                                    //console.log(d1);console.log(d2);
                                    if (d1 <= d2) {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                                    } else {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+'暂无统计'+'<br>'
                                    }
                                }
                            }
                            res+='</div>'
                            return res;
                        }
                    },

                    series: [
                        {
                            name:'还款订单数',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#e7505a'}},
                            data: echart_REPAY_INVEST_NUMS,
                            barCategoryGap: "40%"
                        },
                        {
                            name:'复投订单数',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_T_NUMBER,
                            barCategoryGap: "40%"
                        },
                        {
                            name:'新投订单数',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_T_NUMBER_NEW,
                            barCategoryGap: "40%"
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

        //  单位时间还款复投订单数（标的维度）
        echarts_2 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');

                // 加工处理数据
                var echart_date = [], echart_REPAY_INVEST_NUMS = [], echart_T_NUMBER = [], echart_REPAY_INVEST_NUMS_TOTAL = [], echart_DIFF_AMOUNT = [];
                var create_time = '';
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME);
                    echart_REPAY_INVEST_NUMS.push(n.REPAY_INVEST_NUMS);
                    echart_T_NUMBER.push(n.T_NUMBER);
                    echart_REPAY_INVEST_NUMS_TOTAL.push(n.REPAY_INVEST_NUMS_TOTAL);
                    create_time = n.C_TIME;
                    echart_DIFF_AMOUNT[n.C_TIME]=n.REPAY_INVEST_NUMS_TOTAL-n.REPAY_INVEST_NUMS;
                });
                $("i#panel_2").text(create_time);
                // console.log(echart_date);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['已执行还款订单数', '已执行复投订单数', '应执行还款订单数'],
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis: {
                        name: '订单数',
                        axisLabel: {
                            formatter: '{value} 个'
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
                            res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>未执行还款订单数:'+(echart_DIFF_AMOUNT[params[0].name])+'<br>'
                            res+='</div>'
                            return res;
                        }
                    },

                    series: [
                        {
                            name:'已执行还款订单数',
                            type:'line',
                            smooth:false,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_REPAY_INVEST_NUMS,
                        },
                        {
                            name:'已执行复投订单数',
                            type:'line',
                            smooth:false,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_T_NUMBER,
                        },
                        {
                            name:'应执行还款订单数',
                            type:'line',
                            smooth:false,
                            symbol: 'circle',
                            symbolSize: 1,
                            lineStyle: {normal: {width: 1}},
                            itemStyle: {normal: {color: '#e7505a'}},
                            data: echart_REPAY_INVEST_NUMS_TOTAL,
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
        var data2 = echarts_2(data[1]);

        // 积压还款复投订单数（标的维度）
        echarts_3 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                // 加工处理数据
                var echart_DATE = [], echart_C_DATE = [], echart_ORDER_NUMS = [], echart_IS_WORK_DAY = [];
                var create_time = '';
                $.each(data, function(i, n) {
                    echart_DATE.push(n.C_DATE);
                    echart_C_DATE.push(n.C_DATE+'('+n.WEEK_NAME+')');
                    echart_ORDER_NUMS.push(n.ORDER_NUMS);
                    echart_IS_WORK_DAY[n.C_DATE]=n.IS_WORK_DAY;
                    create_time = n.CREATE_TIME;
                });
                $("i#panel_3").text(create_time);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当日积压订单数'],
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
                        name: '订单数',
                        axisLabel: {
                            formatter: '{value} 个'
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

                    series: [
                        {
                            name:'当日积压订单数',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {normal: {color: '#e7505a'}},
                            data: echart_ORDER_NUMS,
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

        var data3 = echarts_3(data[4]);

        //  赎回订单数（产品维度）
        echarts_4 = function(data,data1) {

            $("span#order_num_1").text(data1['CNT_REDEEM_ORDER']);
            $("span#order_num_2").text(data1['CNT_REDEEMED_ORDER']);
            $("span#order_num_3").text(data1['CNT_NOT_REDEEMED_ORDER']);
            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_4'), 'macarons');

                // 加工处理数据
                var echart_date = [], echart_CNT_REDEEM_ORDER = [], echart_CNT_REDEEMED_ORDER = [];
                var create_time = '';
                $.each(data, function(i, n) {
                    echart_date.push(n.C_TIME);
                    echart_CNT_REDEEM_ORDER.push(n.CNT_REDEEM_ORDER);
                    echart_CNT_REDEEMED_ORDER.push(n.CNT_REDEEMED_ORDER);
                    create_time = n.C_TIME;
                });
                $("i#panel_4").text(create_time);
                // console.log(echart_date);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当日应赎回订单数', '当日已赎回订单数'],
                    },
                    xAxis: {
                        data: echart_date,
                    },
                    yAxis: {
                        name: '产品赎回订单数',
                        axisLabel: {
                            formatter: '{value} 个'
                        }
                    },
                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 100,
                    },

                    series: [
                        {
                            name:'当日应赎回订单数',
                            type:'line',
                            smooth:false,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_CNT_REDEEM_ORDER,
                        },
                        {
                            name:'当日已赎回订单数',
                            type:'line',
                            smooth:false,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_CNT_REDEEMED_ORDER,
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
        var data4 = echarts_4(data[2],data[3]);

        // 债转订单数（标的维度）
        echarts_5 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_5'), 'macarons');
                // 加工处理数据
                var echart_DATE = [], echart_C_DATE = [], echart_CNT_DEBT_LOAN = [], echart_CNT_DEBTED_LOAN = [], echart_IS_WORK_DAY = [];
                var create_time = '';
                $.each(data, function(i, n) {
                    echart_DATE.push(n.C_DATE);
                    echart_C_DATE.push(n.C_DATE+'('+n.WEEK_NAME+')');
                    echart_CNT_DEBT_LOAN.push(n.CNT_DEBT_LOAN);
                    echart_CNT_DEBTED_LOAN.push(n.CNT_DEBTED_LOAN);
                    echart_IS_WORK_DAY[n.C_DATE]=n.IS_WORK_DAY;
                    create_time = n.C_DATE;
                });
                $("i#panel_5").text(create_time);
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['债转发起订单', '债转受让订单'],
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
                        name: '订单数',
                        axisLabel: {
                            formatter: '{value} 个'
                        },
                        offset: 45,
                    },
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 70,

                    },

                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div>'+params[0].name+'<br>'
                            for(var i=0;i<params.length;i++){
                                if (params[i].seriesName == '债转发起订单') {
                                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ':' + params[i].data + '<br>'
                                } else {
                                    var d1 = new Date(params[0].name.substr(0,10).replace(/\-/g, "\/"));
                                    var myDate = new Date();
                                    var d2 = new Date(myDate.toLocaleDateString().replace(/\-/g, "\/"));
                                    //console.log(d1);console.log(d2);
                                    if (d1 <= d2) {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                                    } else {
                                        res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+'暂无统计'+'<br>'
                                    }
                                }
                            }
                            res+='</div>'
                            return res;
                        }
                    },

                    series: [
                        {
                            name:'债转发起订单',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#e7505a'}},
                            data: echart_CNT_DEBT_LOAN,
                            barCategoryGap: "60%"
                        },
                        {
                            name:'债转受让订单',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_CNT_DEBTED_LOAN,
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

        var data5 = echarts_5(data[5]);

    };

    init_body = function () {

        ZP.api.new_custody_order({
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
                ZP.api.new_custody_order_search({
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
                ZP.api.new_custody_order_search1({
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

    var btn_submit2 = function() {
        var $form = null;
        $form = $("form#searchForm2");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_order_search2({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_3(data[0]);
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
                ZP.api.new_custody_order_search3({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_4(data[0],data[1]);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    var btn_submit4 = function() {
        var $form = null;
        $form = $("form#searchForm4");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_order_search4({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_5(data[0]);
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
            btn_submit4();
        }
    };

};