/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 18-4-10
 * Time: 下午2:38
 * Desc:
 */

window.PAGE_ACTION = function() {

    "use strict";
    var init_body = null,
        render_body = null,
        echart_one = null, // 实时债转、还款复投情况
        echart_two = null, // 实时各期限标的募集
        echart_three = null, // 实时各期限标的募集
        echart_four = null, // 第四个图标

        echart_five = null, // 第五个配表
        search_button_1 = null,

        search_button_3 = null, // 可匹配资金图
        search_button_4 = null, // 新版配标图
        search_button_5 = null, // 实时债转、还款复投情况

        search_button_2 = null, // 小助手
        export_excel_btn = null,

        export_excel_btn1 = null, // 可匹配资金图
        init_null = null;

    render_body = function(data) {

        var render_dashboard = function(data) {
            $("#panel_0").text(parseFloat(data[0]));
            $("#panel_1").text(parseFloat(data[1]));
            $("#panel_2").text(parseFloat(data[2]));
            $("#panel_3").text(parseFloat(data[3]));

        };
        render_dashboard(data.data_add_0);

        // 第四个图表 可匹配资金图
        var echart_pei_2 = function(data) {
            // 对数据进行加工
            var echart_date = [], echart_amount = [], echart_re_amount = [], echart_total_amount = [];
            $.each(data, function(i, n) {
                echart_date.push(n.C_TIME.substring(5, 16));
                echart_amount.push(n.AMOUNT);
                echart_re_amount.push(n.RE_AMOUNT);
                echart_total_amount.push(n.TOTAL_AMOUNT);
            });
            var myChart = echarts.init(document.getElementById('echarts_6'), 'macarons');
            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                legend: {
                    data: ['当前可匹配资金', '待匹配资金-新增投资', '待匹配资金-复投资金']
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
                    start : 66,
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
                        data: echart_total_amount,
                    },
                    {
                        name:'待匹配资金-新增投资',
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: '#529bff'}},
                        data: echart_amount,
                    },
                    {
                        name:'待匹配资金-复投资金',
                        type:'bar',
                        smooth:true,
                        symbol: 'none',
                        stack: 'sta',
                        itemStyle: {normal: {color: '#1ab394'}},
                        data: echart_re_amount,
                    },
                ],
            });
            myChart.setOption(option);
            return [myChart, option];
            // 轮询

        };
        var data6 = echart_pei_2(data.data6);

        echart_one = function(data) {

            var render_charts = function(data) {

                // render sum
                $("span#ys_mjcl").text(data['sum'][0] + ' 万');
                $("span#sy_mjcl").text(data['sum'][1] + ' 万');
                $("span#hkftcl").text(data['sum'][2] + ' 万');
                $("span#sy_mjcl_cx").text(String(parseFloat(data['sum'][3])) + ' 万');
                $("span#dppxb").text(String(parseFloat(data['sum'][4])) + ' 万');
                $("span#now_time").text(String(data['sum'][5]));

                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {data: data.legend_data},
                    grid: {
                        left: "14%",
                    },
                    tooltip: {
                        formatter: function(params, ticket, callback) {
                            // console.log(params);
                            var html = params[0]['axisValue'] + "<br />";
                                $.each(params, function(i, val) {
                                    if (i <= 2) {
                                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>';
                                    }
                                html += ' ' + val.seriesName + ': ' + String(parseFloat($.trim(val.data), 2)) + ' 万元<br />';
                            });
                            return html;
                        }
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
                            offset: 28,
                        }
                    ],
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 85,
                        end: 100,
                    },


                    series: [

                        {
                            name: '待匹配债转标',
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {color: '#529bff'}},
                            data: data.series[0],
                        },
                        /*{
                            name: '待匹配复投资金',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.series[1],
                        },*/
                        {
                            name: '待匹配新标金额',
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {color: '#36c6d3'}},
                            data: data.series[4],
                        },
                        {
                            name: '待配债转标中可拆分金额',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#36c6d3', opacity: 0}},
                            data: data.series[2],
                        },
                        {
                            name: '待配债转标中不可拆分金额',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#882caf', opacity: 0}},
                            data: data.series[3],
                        }

                    ],
                });
                myChart.setOption(option);
                return myChart;
            };
            return render_charts(data);
        };
        var echart_part_1 =  echart_one(data.data1);

        echart_two = function(data) {
            var render_charts = function(data) {

                // render sum
                $("span#zzmj").text(data['sum'][0] + ' 万');
                $("span#kcl").text(data['sum'][1] + ' 万');

                // console.log(data);
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {data: data.legend_data},
                    grid: {
                        left: "14%",
                    },
                    tooltip: {
                        extraCssText: 'width: 500px; height: 110px;',
                        formatter: function(params, ticket, callback) {
                            // console.log(params);
                            var html = params[0]['axisValue'] + "<br />";
                                $.each(params, function(i, val) {

                                html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' +
                                    ' '; // + val.seriesName + ': ' + $.trim(val.data) + ' 万元<br />';
                                if ('产品可售卖上限' == val.seriesName) {
                                    html += val.seriesName + ': ' + $.trim(val.data) + ' 万元 (老产品可售卖：' + data.ext_old[params[0]['axisValue']] + '万元 | ' +
                                    '新产品可售卖: ' + data.ext_new[params[0]['axisValue']] + '万元) <br />';
                                } else {
                                    html += val.seriesName + ': ' + parseFloat($.trim(val.data)) + ' 万元<br />';
                                }    
                            });
                            html += "售卖状态: " + data.issell[params[0]['axisValue']];
                            return html;
                        },
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
                            offset: 28,
                        }
                    ],
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start :86,
                        end: 100,
                    },
                    series: [
                        {
                            name: '产品可售卖上限',
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {color: function(item) {
                                        if ('是' == data.issell[item.name]) {
                                            return '#529bff';
                                        } else return '#b8c7dc';
                                    }},
                            },
                            data: data.series[0],
                            lineStyle: {
                                normal: {
                                    color: '#529bff',
                                },
                            },
                        },
                        {
                            name: '库存量',
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {color: function(item) {
                                        if ('是' == data.issell[item.name]) {
                                            return '#af1b1b';
                                        } else return '#ecbebe';
                                    }},
                            },
                            data: data.series[1],
                            lineStyle: {
                                normal: {
                                    color: '#af1b1b',
                                },
                            },
                        },
                        {
                            name: '标的募集',
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {color: function(item) {
                                        if ('是' == data.issell[item.name]) {
                                            return '#36c6d3';
                                        } else return '#3630d3';
                                    }},
                            },
                            data: data.series[2],
                            lineStyle: {
                                normal: {
                                    color: '#36c6d3',
                                },
                            },
                        },
                    ],
                });
                myChart.setOption(option);
                return myChart;
            };
            return render_charts(data);

        };
        var echart_part_2 =  echart_two(data.data2);

        // echart 3
        echart_three = function(data) {

            var render_charts = function(data) {

                // render sum
                /*$("span#ys_drzz").text(data['sum'][0] + ' 万');
                $("span#sy_drzz").text(data['sum'][1] + ' 万');
                $("span#sy_drhkft").text(data['sum'][2] + ' 万');*/

                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {data: data.legend_data},
                    grid: {
                        left: "14%",
                    },

                    tooltip: {
                        formatter: function(params, ticket, callback) {
                            // console.log(params);
                            var dateArray = String(params[0]['axisValue']).split('-');
                            var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
                            var week_str = "  星期" + "日一二三四五六".charAt(date.getDay());
                            var html = params[0]['axisValue'] + week_str + "<br />";
                                $.each(params, function(i, val) {
                                    // console.log(val)
                                    html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>';
                                    html += ' ' + val.seriesName + ': ' + String(parseFloat($.trim(val.data), 2)) + ' 万元<br />';
                            });
                            return html;
                        }
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
                            offset: 88,
                        }
                    ],
                    calculable: true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 100,
                    },
                    series: [
                        /*{
                            name: '原始-当日债转',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#af1b1b'}},
                            data: data.series[0],
                        },*/
                        {
                            name: '当日债转',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.series[1],
                        },
                        {
                            name: '当日还款复投',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#529bff'}},
                            data: data.series[2],
                        },
                        {
                            name: '差额',
                            type: 'bar',
                            smooth: true,
                            itemStyle: {normal: {color: '#c09bff', opacity: 0}},
                            data: data.series[3],
                        }
                    ],
                });
                myChart.setOption(option);
                return myChart;
            };
            return render_charts(data);
        };
        // console.log(data);
        var echart_part_3 =  echart_three(data.data3);

        echart_four = function(data) {

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
            var myChart = echarts.init(document.getElementById('echarts_4'), 'macarons');
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
            return myChart;

        };

        // var echart_part_4 =  echart_four(data.data4);

        echart_five = function(data) {

            var myChart = echarts.init(document.getElementById('echarts_5'), 'macarons');
            var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                legend: {data: data.legend_data},
                grid: {
                    left: "14%",
                },

                tooltip: {
                    extraCssText: 'width: 420px; height: 110px;',
                    formatter: function(params, ticket, callback) {
                        // console.log(params);

                        var html = params[0]['axisValue'] + "<br />";
                        $.each(params, function(i, val) {
                            html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' +
                                ' ' + val.seriesName + ': ' + $.trim(val.data) + ' 万元 ';
                            if (i == 1) {
                                html += " &nbsp;&nbsp;&nbsp;&nbsp;数量: " + data['series'][3][params[i]['dataIndex']] + " <br />";
                            } else if(i == 2) {
                                html += " &nbsp;&nbsp;&nbsp;&nbsp;数量: " + data['series'][4][params[i]['dataIndex']] + " <br />";
                            } else html += "<br />";

                        });
                        return html;
                    },
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
                        offset: 28,
                    }
                ],
                calculable: true,
                dataZoom: { // 区间选择
                    type: 'slider',
                    show: true,
                    start : 80,
                    end: 100,
                },
                series: [
                    {
                        name: '已配标的总额',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {color: '#f2637b'}},
                        data: data.series[0],
                    },

                    {
                        name: '已配债转标',
                        type: 'bar',
                        smooth: true,
                        stack: 'abc',
                        itemStyle: {normal: {color: '#3aa0ff'}},
                        data: data.series[1],
                    },
                    {
                        name: '已配原始标',
                        type: 'bar',
                        smooth: true,
                        stack: 'abc',
                        itemStyle: {normal: {color: '#4dcb73'}},
                        data: data.series[2],
                    },
                ],
            });
            myChart.setOption(option);
            return myChart;

        };
        var echart_part_5 = echart_five(data.data5);



        search_button_1 = function() {
            var $form = null;
            $form = $("form#searchForm");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_zzft({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                var data = result.data;
                                // re_render
                                // console.log(data.data1);
                                echart_three(data.data1);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        };
        search_button_1();

        search_button_3 = function() {
            var $form = null;
            $form = $("form#searchForm_01");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_kppzj({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                var data = result.data;
                                echart_pei_2(data);                               
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        };
        search_button_3();

        search_button_4 = function() {
            var $form = null;
            $form = $("form#searchForm_02");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_xbpbt({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isArray(result.data)) {
                                var data = result.data;
                                echart_five(data);
                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        }
        search_button_4();


        search_button_5 = function() {
            var $form = null;
            $form = $("form#searchForm_03");
            $form.submit(function(e) {
                if(ZP.utils.isPassForm($form)){
                    ZP.api.new_custody_search_sszzhk({
                        data: $form.serializeJson(),
                        successCallBack: function(result){
                            if (ZP.utils.isObject(result.data)) {
                                var data = result.data;
                                // console.log(data);


                                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                                    legend: {data: data.legend_data},
                                    grid: {
                                        left: "14%",
                                    },
                                    tooltip: {
                                        formatter: function(params, ticket, callback) {
                                            // console.log(params);
                                            var html = params[0]['axisValue'] + "<br />";
                                            $.each(params, function(i, val) {
                                                if (i <= 2) {
                                                    html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>';
                                                }
                                                html += ' ' + val.seriesName + ': ' + String(parseFloat($.trim(val.data), 2)) + ' 万元<br />';
                                            });
                                            return html;
                                        }
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
                                            offset: 28,
                                        }
                                    ],
                                    calculable: true,
                                    dataZoom: { // 区间选择
                                        type: 'slider',
                                        show: true,
                                        start : 85,
                                        end: 100,
                                    },


                                    series: [

                                        {
                                            name: '待匹配债转标',
                                            type: 'line',
                                            smooth: true,
                                            itemStyle: {normal: {color: '#529bff'}},
                                            data: data.series[0],
                                        },
                                        /*{
                                            name: '待匹配复投资金',
                                            type: 'bar',
                                            smooth: true,
                                            itemStyle: {normal: {color: '#ed5565'}},
                                            data: data.series[1],
                                        },*/
                                        {
                                            name: '待匹配新标金额',
                                            type: 'line',
                                            smooth: true,
                                            itemStyle: {normal: {color: '#36c6d3'}},
                                            data: data.series[4],
                                        },
                                        {
                                            name: '待配债转标中可拆分金额',
                                            type: 'bar',
                                            smooth: true,
                                            itemStyle: {normal: {color: '#36c6d3', opacity: 0}},
                                            data: data.series[2],
                                        },
                                        {
                                            name: '待配债转标中不可拆分金额',
                                            type: 'bar',
                                            smooth: true,
                                            itemStyle: {normal: {color: '#882caf', opacity: 0}},
                                            data: data.series[3],
                                        }

                                    ],
                                });
                                myChart.setOption(option);

                            }
                        },
                        failCallBack: ZP.utils.failCallBack
                    });
                }
                e.preventDefault();
            });
        }
        search_button_5();


        export_excel_btn = function() {
            $("a#export_excel").on("click", function() {
                var s_date = $("form#searchForm input[name='start_date']").val(),
                    e_date = $("form#searchForm input[name='end_date']").val();
                ZP.api.new_custody_export_excel({
                    data: {'start_date': s_date, 'end_date': e_date},
                    successCallBack: function(result) {
                        ZP.utils.alert_warning(result.message, true, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            });
        }
        export_excel_btn();

        // 可匹配资金图的导出
        export_excel_btn1 = function() {
            $("a#export_excel_1").on("click", function() {
                var s_date = $("form#searchForm_01 input[name='start_date']").val(),
                    e_date = $("form#searchForm_01 input[name='end_date']").val();
                ZP.api.new_custody_export_excel1({
                    data: {'start_date': s_date, 'end_date': e_date},
                    successCallBack: function(result) {
                        ZP.utils.alert_warning(result.message, true, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            });
        }
        export_excel_btn1();

    };

    init_body = function() {

        ZP.api.new_custody_pei_biao({
            data: null,
            successCallBack: function(result) {
                render_body(result.data);
            },
            failCallBack: ZP.utils.failCallBack
        });
        return;
    };

    search_button_2 = function() { // 小助手

        var render_little_helper = function(data) {
            $("span#pan_01").text(data.C_DATE);
            $("span#pan_02").text(parseFloat(data.TOTAL_AMOUNT) + ' 万');
            $("span#pan_03").text(parseFloat(data.REPAYMENT_AMOUNT) + ' 万');
            $("span#pan_04").text(parseFloat(data.DIFF_AMOUNT) + ' 万');
            $("span#pan_011").text(data.WEEK_NAME);
            if (data.DIFF_AMOUNT == 'N') {
                $("span#pan_011").css("color","#e7505a");
            } else {
                $("span#pan_011").css("color","#00c853");
            }
        };

        var $form = null;
        $form = $("form#searchForm2");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                ZP.api.new_custody_flow_search1({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            render_little_helper(data[0][0]);
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
            search_button_2();
        }
    };


};