/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2018/05/22
 * Time: 17:26
 * Desc:
 */

window.PAGE_ACTION = function() {

    "use strict";
    var init_body = null, // 初始化
        render_body = null, // 渲染body
        render_panel = null,
        render_echarts = null,

        init_end = null; // end mark

    render_body = function(data) {
        
        
        render_echarts = function(data) {

            var echarts_people = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data.legend,
                    },
                    grid: {
                        left: 150,
                    },
                    xAxis: {
                        data: data.xaxis,
                        // offset: 5,
                    },
                    yAxis : [
                        {
                            name: '人数',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 人'
                            },
                            offset: 90,

                        }
                    ],

                    calculable : true,
                    series: [
                        {
                            name: data.legend[0],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#f7734e'
                                }, {
                                    offset: 1,
                                    color: '#e12945'
                                }]),
                                barBorderRadius: 20,
                                borderWidth: 0,
                            }},
                            data: data.series[0],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[1],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#96d668'
                                }, {
                                    offset: 1,
                                    color: '#01babc'
                                }]),
                                barBorderRadius: 20,
                                borderWidth: 0,
                            }},
                            data: data.series[1],
                            barWidth: 30,
                            // markeLine: {
                            //     data: [
                            //         {
                            //             name: '平均线',
                            //             type: 'average',
                            //         }
                            //     ],
                            // },
                        },
                        {
                            name: data.legend[2],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#1a98f8'
                                }, {
                                    offset: 1,
                                    color: '#7049f0'
                                }]),
                                barBorderRadius: 20,
                                borderWidth: 0,
                            }},
                            data: data.series[2],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[3],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#af1b1b'
                                }, {
                                    offset: 1,
                                    color: '#a01b1b'
                                }]),
                                barBorderRadius: 20,
                                borderWidth: 0,
                            }},
                            data: data.series[3],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[4],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            itemStyle: {normal: {color: '#31bb09'}},
                            data: data.series[4],
                        },
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];

            };
            var e_data_0 =  echarts_people(data.data0);

            var echarts_tzhk = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data.legend,
                    },
                    grid: {
                        left: 170,
                    },
                    xAxis: {
                        data: data.xaxis,
                        // offset: 5,
                    },
                    yAxis : [
                        {
                            name: '金额',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 万元'
                            },
                            offset: 90,

                        }
                    ],

                    calculable : true,
                    series: [
                        {
                            name: data.legend[0],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.series[0],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[1],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: data.series[1],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[2],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#108ee9'}},
                            data: data.series[2],
                            barWidth: 30,
                        },
                        {
                            name: data.legend[3],
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            itemStyle: {normal: {color: '#af1b1b'}},
                            data: data.series[3],
                        }
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };
            var e_data_1 =  echarts_tzhk(data.data1);


            var echarts_yqzc = function(data) {
                // console.log(data);
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
                
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data.legend,
                    },
                    grid: {
                        left: 170,
                    },
                    xAxis: {
                        data: data.xaxis,
                        // offset: 5,
                    },
                    yAxis : [
                        {
                            name: '人数',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 人'
                            },
                            offset: 90,

                        }
                    ],

                    calculable : true,
                    series: [
                        {
                            name: data.legend[0],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.series[0],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[1],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: data.series[1],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[2],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#108ee9'}},
                            data: data.series[2],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[3],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            itemStyle: {normal: {color: '#af1b1b'}},
                            data: data.series[3],
                            barWidth: 20,
                        }
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };
            var e_data_2 =  echarts_yqzc(data.data2);


            var echarts_gyqst = function(data) {
                // console.log(data);
                var myChart = echarts.init(document.getElementById('echarts_4'), 'macarons');
                
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data.legend,
                    },
                    grid: {
                        left: 170,
                    },
                    xAxis: {
                        data: data.xaxis,
                        // offset: 5,
                    },
                    yAxis : [
                        {
                            name: '人数',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 人'
                            },
                            offset: 90,

                        }
                    ],

                    calculable : true,
                    series: [
                        {
                            name: data.legend[0],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip0',
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: data.series[0],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[1],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip0',
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: data.series[1],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[2],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip0',
                            itemStyle: {normal: {color: '#108ee9'}},
                            data: data.series[2],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[3],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip1',
                            itemStyle: {normal: {color: '#af1b1b'}},
                            data: data.series[3],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[4],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip1',
                            itemStyle: {normal: {color: '#af201b'}},
                            data: data.series[4],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[5],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip1',
                            itemStyle: {normal: {color: '#af301b'}},
                            data: data.series[5],
                            barWidth: 20,
                        },

                        {
                            name: data.legend[6],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip2',
                            itemStyle: {normal: {color: '#af501b'}},
                            data: data.series[6],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[7],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip2',
                            itemStyle: {normal: {color: '#af701b'}},
                            data: data.series[7],
                            barWidth: 20,
                        },
                        {
                            name: data.legend[8],
                            type:'bar',
                            smooth:true,
                            symbol: 'none',
                            stack: 'vip2',
                            itemStyle: {normal: {color: '#af901b'}},
                            data: data.series[8],
                            barWidth: 20,
                        },
                    ],
                });
                myChart.setOption(option);
                return [myChart, option];
            };
            var e_data_3 =  echarts_gyqst(data.data3);

            var search_button_people = function() {
                var $form = null;
                $form = $("form#searchForm");
                $form.submit(function(e) {
                    if(ZP.utils.isPassForm($form)){
                        ZP.api.smart_monitor_search_people({
                            data: $form.serializeJson(),
                            successCallBack: function(result){
                                if (ZP.utils.isObject(result.data)) {
                                    var data = result.data;
                                    // console.log(data);
                                    // 渲染函数
                                    e_data_0[0].setOption({
                                            xAxis: {
                                                data: data.xaxis,
                                            },
                                            series: [
                                                {
                                                    name: data.legend[0],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#ed5565'}},
                                                    data: data.series[0],
                                                },
                                                {
                                                    name: data.legend[1],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#1ab394'}},
                                                    data: data.series[1],
                                                },
                                                {
                                                    name: data.legend[2],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#108ee9'}},
                                                    data: data.series[2],
                                                },
                                                {
                                                    name: data.legend[3],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#af1b1b'}},
                                                    data: data.series[3],
                                                },
                                                {
                                                    name: data.legend[4],
                                                    type:'line',
                                                    smooth:true,
                                                    symbol: 'circle',
                                                    itemStyle: {normal: {color: '#31bb09'}},
                                                    data: data.series[4],
                                                },
                                            ],
                                        });
                                    
                                }
                            },
                            failCallBack: ZP.utils.failCallBack
                        });
                    }
                    e.preventDefault();
                });
            };
            search_button_people();

            var search_button_tzhk = function() { // 投资回款监控
                var $form = null;
                $form = $("form#searchForm1");
                $form.submit(function(e) {
                    if(ZP.utils.isPassForm($form)){
                        ZP.api.smart_monitor_search_tzhk({
                            data: $form.serializeJson(),
                            successCallBack: function(result){
                                if (ZP.utils.isObject(result.data)) {
                                    var data = result.data;
                                    // console.log(data);
                                    // 渲染函数
                                    e_data_1[0].setOption({
                                            xAxis: {
                                                data: data.xaxis,
                                            },
                                            series: [
                                                {
                                                    name: data.legend[0],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#ed5565'}},
                                                    data: data.series[0],
                                                },
                                                {
                                                    name: data.legend[1],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#1ab394'}},
                                                    data: data.series[1],
                                                },
                                                {
                                                    name: data.legend[2],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#108ee9'}},
                                                    data: data.series[2],
                                                },
                                                {
                                                    name: data.legend[3],
                                                    type:'line',
                                                    smooth:true,
                                                    symbol: 'circle',
                                                    itemStyle: {normal: {color: '#af1b1b'}},
                                                    data: data.series[3],
                                                },
                                            ],
                                        });
                                    
                                }
                            },
                            failCallBack: ZP.utils.failCallBack
                        });
                    }
                    e.preventDefault();
                });
            };
            search_button_tzhk();


            var search_button_yqzc = function() { // 邀请注册
                var $form = null;
                $form = $("form#searchForm2");
                $form.submit(function(e) {
                    if(ZP.utils.isPassForm($form)){
                        ZP.api.smart_monitor_search_yqzc({
                            data: $form.serializeJson(),
                            successCallBack: function(result){
                                if (ZP.utils.isObject(result.data)) {
                                    var data = result.data;
                                    console.log(data);
                                    // 渲染函数
                                    e_data_2[0].setOption({
                                            xAxis: {
                                                data: data.xaxis,
                                            },
                                            series: [
                                                {
                                                    name: data.legend[0],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#ed5565'}},
                                                    data: data.series[0],
                                                },
                                                {
                                                    name: data.legend[1],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#1ab394'}},
                                                    data: data.series[1],
                                                },
                                                {
                                                    name: data.legend[2],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#108ee9'}},
                                                    data: data.series[2],
                                                },
                                                {
                                                    name: data.legend[3],
                                                    type:'bar',
                                                    smooth:true,
                                                    symbol: 'none',
                                                    itemStyle: {normal: {color: '#af1b1b'}},
                                                    data: data.series[3],
                                                },
                                            ],
                                        });
                                    
                                }
                            },
                            failCallBack: ZP.utils.failCallBack
                        });
                    }
                    e.preventDefault();
                });
            };
            search_button_yqzc();



        };
        render_echarts(data);

    };


    init_body = function () {

        ZP.api.smart_monitor({
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