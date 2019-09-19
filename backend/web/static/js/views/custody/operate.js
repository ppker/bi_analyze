/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/12
 * Time: 14:37
 * Desc:
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_body = null, // 初始化渲染
        echarts_day_sell = null, // 各产品销售今日情况
        echarts_day_done = null, // 每日到期产品
        echarts_property = null, // 当前已售产品资产构成
        render_body = null, // 渲染panel数据
        render_panel = null, // 渲染面板的数据
        init_end = null; // end mark


    render_body = function(data) {

        if ('' == data || false == data) return;
        // 渲染面板的数据
        render_panel = function(data) { // 第一部分
            // console.log(data);
            $("span#panel_0").attr('data-value', parseFloat(data.SUM_PERSONS));
            $("span#panel_1").attr('data-value', parseFloat(data.INVESTMENT_PERSONS));
            $("span#panel_2").attr('data-value', parseFloat(data.TOTAL_INVESTMENT));
            $("span#panel_3").attr('data-value', parseFloat(data.FIRST_AMOUNT));
            $("span#panel_4").attr('data-value', parseFloat(data.CT_USER));
            $("span#panel_5").attr('data-value', parseFloat(data.FIRST_NUM));
            $("span#panel_6").attr('data-value', parseFloat(data.DAY_NUM));
            $("span#panel_7").attr('data-value', parseFloat(data.DAY_AMOUNT));

            $("span#panel_8").text(parseFloat(data.P_AMOUNT));
            $("span#panel_9").text(parseFloat(data.TOTAL_AMOUNT));
            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data[0]);

        // 第二部分 各产品今日销售情况
        echarts_day_sell = function(data) { // 配标的图表

            /*var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');

                // 加工处理数据
                var echart_product_name = [], echart_t_day_amount = [], echart_y_day_amount = [];
                $.each(data, function(i, n) {
                    echart_product_name.unshift(n.PRODUCT_NAME);
                    echart_t_day_amount.unshift(n.T_DAY_AMOUNT);
                    echart_y_day_amount.unshift(n.Y_DAY_AMOUNT);
                });
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['目前销售', '昨日销售'],
                    },
                    grid: {
                        left: 192,
                    },
                    xAxis: {
                        data: echart_product_name,
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元'
                            },
                            offset: 65,

                        }
                    ],
                    series: [
                        {
                            name:'目前销售',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_t_day_amount,
                        },
                        {
                            name:'昨日销售',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#88b4f1'}},
                            data: echart_y_day_amount
                        },
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };*/

            ////////////////////////////////////////////////////////////////////

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                // 设置颜色
                var color_arr = {}, tem_color = ['#F0F8FF', '#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD'];
                $.each(data[0], function(ii, vv) {
                    color_arr.vv = tem_color[ii];
                });

                var e_chart_stack = [];
                $.each(data[3], function(i, n) {

                    var n_v = [];
                    $.each(n, function(i1, n1) {
                        n_v.push(n1);
                    });
                    e_chart_stack.push({
                        name: i,
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: color_arr[i]}},
                        data: n_v,
                        barCategoryGap: "60%"
                    });
                });

                e_chart_stack.unshift({
                    name: '当天总投资',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ed5565'}},
                    data: data[2]
                });

                data[0].unshift("当天总投资");
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data[0],
                    },
                    xAxis: {
                        data: data[1],
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                        offset: 45,
                    },

                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 80,
                        end: 100,
                    },

                    series: e_chart_stack
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];
            };

            return render_echarts(data);

        };
        var data1 = echarts_day_sell(data[1]); // todo

        // 第三部分 每日到期产品
        echarts_day_done = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                // 加工处理数据
                var echart_date = [], echart_TOTAL_AMOUNT = [], echart_AMOUNT = [], echart_RE_AMOUNT = [], echart_nolocking_redeem = [];
                var echart_IS_WORK_DAY;
                $.each(data, function(i, n) {
                    (n.IS_WORK_DAY == 'Y') ? echart_IS_WORK_DAY='1' : echart_IS_WORK_DAY='0';
                    echart_date.push(n.C_DATE+'('+n.WEEK_NAME+'-'+echart_IS_WORK_DAY+')');
                    echart_TOTAL_AMOUNT.push(n.TOTAL_AMOUNT);
                    echart_AMOUNT.push(n.AMOUNT);
                    echart_RE_AMOUNT.push(n.RE_AMOUNT);
                    echart_nolocking_redeem.push(n.NOLOCKING_REDEEM);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['当日定期产品到期总额', '复投金额', '未复投金额', '活期赎回'],
                    },
                    xAxis: {
                        data: echart_date,
                        axisLabel: {
                            formatter: function(echart_date) {
                                return echart_date.substr(0,10);
                            },
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
                        end: 10,

                    },
                    series: [
                        {
                            name: '当日定期产品到期总额',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_TOTAL_AMOUNT
                        },
                        {
                            name:'复投金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_RE_AMOUNT,
                            barCategoryGap: "60%"
                        },
                        {
                            name:'未复投金额',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'sta',
                            itemStyle: {normal: {color: '#1c66c7'}},
                            data: echart_AMOUNT,
                            barCategoryGap: "60%"
                        },
                        {
                            name:'活期赎回',
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#B166c7'}},
                            data: echart_nolocking_redeem,
                            barCategoryGap: "50%",
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data2 = echarts_day_done(data[2]);
        // 第四部分 当月已售投资产品构成
        echarts_property = function(data, type) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');

                // 加工处理数据
                // 设置颜色
                var color_arr = {}, tem_color = ['#F0F8FF', '#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD', '#2D26CD', '#aD26CD', '#5D26CD'];


                $.each(data[0], function(ii, vv) {
                    color_arr[vv] = tem_color[ii];
                });


                var e_chart_stack = [];
                $.each(data[5], function(i, n) {

                    var n_v = [];
                    $.each(n, function(i1, n1) {
                        n_v.push(n1);
                    });
                    e_chart_stack.push({
                        name: i,
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: color_arr[i]}},
                        data: n_v,
                        barCategoryGap: "90%"
                    });
                });

                e_chart_stack.unshift({
                    name: '在投总额',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ed5565'}},
                    data: data[2]
                });

                data[0].unshift("在投总额");


                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data[0],
                    },
                    xAxis: {
                        data: data[1],
                    },
                    yAxis: {
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 万元'
                        },
                        offset: 45,
                    },

                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : type == 1 ? 0 : 80,
                        end: type == 1 ? 40 : 100,
                    },

                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div>'+params[0].name+' &nbsp周环比 &nbsp月环比<br>'
                            for(var i=0;i<params.length;i++){
                                res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data
                                if (i == 0) {
                                    res+=' &nbsp'+data[3][params[i].dataIndex]+' &nbsp'+data[4][params[i].dataIndex]+'<br>'
                                } else {
                                    res+=' &nbsp'+data[6][params[i].seriesName][params[i].name]+' &nbsp'+data[7][params[i].seriesName][params[i].name]+'<br>'
                                }
                            }
                            res+='</div>'
                            return res;
                        }
                    },

                    series: e_chart_stack
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

                /*var echart_product_name = [], echart_series_data = [];
                $.each(data, function(i, n) {
                    echart_product_name.unshift(n.PRODUCT_NAME);
                    echart_series_data.unshift({"value": n.DAY_AMOUNT, "name": n.PRODUCT_NAME});
                });
                var option = {

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: echart_product_name
                    },

                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} 万元 ({d}%)",
                    },
                    series : [
                        {
                            // name: '已售产品资产',
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '60%'],
                            data:echart_series_data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                }
                            }
                        }
                    ]
                };*/
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data3 = echarts_property(data[3]);
        
        // 进行轮询
        setInterval(function(data1, data2, data3) {
            ZP.api.custody_operate({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        // 第一部分
                        render_panel(new_data[0]);
                        // todo 第二部分 第三部分 第四部分

                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 1805000);

    };

    init_body = function () {

        ZP.api.custody_operate({
            data: null,
            successCallBack: function(result){
                render_body(result.data);
                return;
            },
            failCallBack: ZP.utils.failCallBack
        });
        return;
    };

    // 新增每日到期产品 的一个查询搜索的功能
    var btn_submit2 = function() {
        var $form = null;
        $form = $("form#searchForm3");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.custom_search_sale3({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_day_done(data);
                            // echarts_property(data);
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
        $form = $("form#searchForm2");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.custom_search_sale2({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_property(data, 1);
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });

    };



    var btn_submit = function() {
        var $form = null;
        $form = $("form#searchForm");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                ZP.api.custom_search_sale({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;

                            var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                            // 加工处理数据
                            // 设置颜色
                            var color_arr = {}, tem_color = ['#F0F8FF', '#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD'];
                            $.each(data[0], function(ii, vv) {
                                color_arr.vv = tem_color[ii];
                            });

                            var e_chart_stack = [];
                            $.each(data[3], function(i, n) {

                                var n_v = [];
                                $.each(n, function(i1, n1) {
                                    n_v.push(n1);
                                });
                                e_chart_stack.push({
                                    name: i,
                                    type:'bar',
                                    smooth:true,
                                    symbol: 'none',
                                    stack: 'sta',
                                    itemStyle: {normal: {color: color_arr[i]}},
                                    data: n_v,
                                    barCategoryGap: "90%"
                                });
                            });

                            e_chart_stack.unshift({
                                name: '当天总投资',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 7,
                                lineStyle: {normal: {width: 4}},
                                itemStyle: {normal: {color: '#ed5565'}},
                                data: data[2]
                            });

                            data[0].unshift("当天总投资");
                            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                                legend: {
                                    data: data[0],
                                },
                                xAxis: {
                                    data: data[1],
                                },
                                yAxis: {
                                    name: '金额',
                                    axisLabel: {
                                        formatter: '{value} 万元'
                                    },
                                    offset: 45,
                                },

                                calculable : true,
                                dataZoom: { // 区间选择
                                    type: 'slider',
                                    show: true,
                                    start : 0,
                                    end: 20,
                                },

                                series: e_chart_stack
                            });
                            myChart.setOption(option);
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
        }
    };


};

