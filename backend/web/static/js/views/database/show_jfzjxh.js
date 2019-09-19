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
        render_body = null, // 渲染panel数据
        render_panel = null, // 渲染面板的数据
        echarts_user_level = null,
        render_table1 = null,
        render_table2 = null,
        render_table3 = null,


    render_body = function(data) {

        if ('' == data || false == data) return;
        // 渲染面板的数据
        render_panel = function(data) { // 第一部分
            // console.log(data);
            $("span#panel_0").attr('data-value', parseFloat(data.ZJ));
            $("span#panel_1").attr('data-value', parseFloat(data.JS));
            $("span#panel_2").attr('data-value', parseFloat(data.CL));
            $("span#panel_3").attr('data-value', parseFloat(data.XHB));
            if (data.XHB < 60 ) {
                $("span#panel_3").attr('style', 'color:red;font-weight: 600;');
                $("span#panel_3_0").attr('style', 'color:red;font-weight: 600;');
            }

            $("[data-counter='counterup']").counterUp();
        };
        render_panel(data[0]);

        // 第二部分
        echarts_user_level = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var echart_ul = [], echart_uc = [], echart_zj = [], echart_xh = [], echart_xhb = [], echart_cl = [];
                $.each(data, function(i, n) {
                    echart_ul.unshift(n.用户等级);
                    echart_uc.unshift(n.用户数);
                    echart_zj.unshift(n.积分增加量);
                    echart_xh.unshift(n.积分消耗量);
                    echart_xhb.unshift(n.消耗比);
                    echart_cl.unshift(n.积分存量);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['积分增加量', '积分消耗量', '积分存量', '消耗比'],
                    },
                    xAxis: [
                        {
                            type: 'value',
                            name: '单位(万)',
                        },
                        {
                            type: 'value',
                            name: '单位(%)',
                            max: 100,
                            min: 0,
                        }
                    ],
                    yAxis: {
                        type: 'category',
                        data: echart_ul,
                    },
                    series: [
                        //{
                        //    name: '用户数',
                        //    type: 'bar',
                        //    label: {
                        //        normal: {
                        //            show: true,
                        //            position: 'insideRight'
                        //        }
                        //    },
                        //    data: echart_uc,
                        //},
                        {
                            name: '积分增加量',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {normal: {color: '#9BCD9B'}},
                            data: echart_zj,
                        },
                        {
                            name: '积分消耗量',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {normal: {color: '#CD919E'}},
                            data: echart_xh,
                        },
                        {
                            name: '积分存量',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {normal: {color: '#5CACEE'}},
                            data: echart_cl,
                        },
                        {
                            name: '消耗比',
                            type: 'bar',
                            xAxisIndex: 1,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: '{c} %'
                                }
                            },
                            itemStyle: {normal: {color: '#8B8B83'}},
                            data: echart_xhb,
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };
        var data2 = echarts_user_level(data[1]);

        // 第三部分
        render_table1 = function(data) {
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("database/jfzjxh_table1.html", {
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
        render_table1(data[2]);

        // 第四部分
        render_table2 = function(data) {
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("database/jfzjxh_table2.html", {
                    list: data
                },function(html){
                    var table = $("#table2");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[0, 'desc']],
                    }));
                });

            }
        };
        render_table2(data[3]);

        // 第五部分
        render_table3 = function(data) {
            if(ZP.utils.isArray(data)){
                // console.log(data);
                ZP.utils.render("database/jfzjxh_table3.html", {
                    list: data
                },function(html){
                    var table = $("#table3");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[0, 'desc']],
                    }));
                });

            }
        };
        render_table3(data[4]);

        // 进行轮询
        /////////////////////////////////////////////////////////////////////////////////////////////
        setInterval(function(data2) {
            ZP.api.custody_parter({
                data: null,
                async: true,
                successCallBack:function(result){
                    if (ZP.utils.isArray(result.data) && result.data) {
                        var new_data = result.data;
                        // 第一部分
                        render_panel(new_data[0]);
                        // 渲染的dataTables
                        render_table1(new_data[5]);
                        render_table2(new_data[3]);
                        render_table3(new_data[4]);
                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        }, 1805000);
    };

    init_body = function () {
        ZP.api.database_show_jfzjxh({
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

