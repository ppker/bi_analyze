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
        render_table = null, // 当前线上各产品销售情况
        echarts_1 = null, // 今日销售类别占比
        render_table = null, // 今日销售类别明细
        echarts_2 = null, // 销售额
        echarts_3 = null, // 分时销售额
        echarts_4 = null, // 新老产品对比
        render_panel = null, // 小助手数据
        export_excel_btn = null,
        init_end = null; // end mark

    render_body = function(data) {

        // 当前线上各产品销售情况
        render_table = function(data) {
            if(ZP.utils.isArray(data)){
                // 加工处理数据
                var create_time = '';
                $.each(data, function(i, n) {
                    data[i]['i'] = (i+1);
                    if (n.SALE_STATUS == '售卖中') {
                        data[i]['sale_status'] = true;
                    } else {
                        data[i]['sale_status'] = false;
                    }
                    if (n.GROUP_TAG) {
                        data[i]['group_tag'] = n.GROUP_TAG+'天';
                    } else {
                        data[i]['group_tag'] = '无';
                    }
                    data[i]['rate'] = '';
                    if (n.ANNUAL_RATE) {
                        data[i]['rate'] += n.ANNUAL_RATE+'%';
                        if (n.ANNUAL_RATE_BONUS_LOCK) {
                            data[i]['rate'] += '+'+n.ANNUAL_RATE_BONUS_LOCK+'%';
                        }
                    } else {
                        data[i]['rate'] = '无';
                    }
                    create_time = n.CREATE_TIME;
                });
                $("i#panel_0").text(create_time);
                ZP.utils.render("new-custody/newcustody_sale.html", {
                    list: data
                },function(html){
                    var table = $("#table1");
                    table.html(html);
                    var t = table.DataTable($.extend({}, ZP.utils.default_dataTable_list, {
                        "order": [[0, 'asc']],
                        destroy: true,
                    }));
                });

            }
        };
        var data1 = render_table(data[0]);


        echarts_1 = function(data,data1) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_1'), 'macarons');
                // 加工处理数据
                var color_arr = ['#CE0000', '#FF0080', '#E800E8', '#8600FF',
                    '#2828FF', '#0072E3', '#00CACA', '#02DF82',
                    '#00DB00', '#8CEA00', '#C4C400', '#D9B300',
                    '#FF8000', '#F75000', '#984B4B', '#949449',
                    '#4F9D9D', '#7373B9', '#9F4D95','#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD'
                ];
                var color_arr_1 = ['#FF9797', '#FF2D2D', '#CE0000', '#750000',
                    '#FFC1E0', '#FF79BC', '#FF0080', '#BF0060',
                    '#ffa6ff', '#FF77FF', '#E800E8', '#930093',
                    '#d3a4ff', '#B15BFF', '#8600FF', '#4B0091',
                    '#B9B9FF', '#7D7DFF', '#2828FF', '#0000C6',
                    '#97CBFF', '#46A3FF', '#0072E3', '#004B97',
                    '#BBFFFF', '#4DFFFF', '#00CACA', '#007979',
                    '#ADFEDC', '#4EFEB3', '#02DF82', '#019858',
                    '#A6FFA6', '#53FF53', '#00DB00', '#009100',
                    '#D3FF93', '#B7FF4A', '#8CEA00', '#64A600',
                    '#FFFFAA', '#FFFF37', '#C4C400', '#737300',
                    '#FFED97', '#FFDC35', '#D9B300', '#977C00',
                    '#FFD1A4', '#FFAF60', '#FF8000', '#BB5E00',
                    '#FFBD9D', '#FF8F59', '#F75000', '#A23400',
                    '#E1C4C4', '#C48888', '#984B4B', '#613030',
                    '#D6D6AD', '#B9B973', '#949449', '#616130',
                    '#B3D9D9', '#81C0C0', '#4F9D9D', '#484891',
                    '#D8D8EB', '#A6A6D2', '#7373B9', '#616130',
                    '#DAB1D5', '#C07AB8', '#9F4D95', '#6C3365',
                ];
                var echart_PRODUCT_NAME = [], echart_AMOUNT = [];
                var date_arr = [];
                $.each(data[0], function(i, n) {
                    echart_PRODUCT_NAME.push(n.PRODUCT_NAME);
                    echart_AMOUNT.push(n.AMOUNT);
                    date_arr.push({
                        value: n.AMOUNT,
                        name:n.PRODUCT_NAME,
                        itemStyle: {normal: {color: color_arr[i],borderColor: '#fff',borderWidth: '2'}},
                        //itemStyle:{color: color_arr[i]}
                    });
                });
                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:echart_PRODUCT_NAME
                    },
                    xAxis: {show: false},
                    yAxis: {show: false},
                    series: [
                        {
                            name:'销售额 (万元)',
                            type:'pie',
                            radius: ['50%', '70%'],
                            center : ['65%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color:'#32c5d2',
                                    },
                                    formatter:function(){
                                        return '今日销售额 \r\n\r\n'+data1[0].TOTAL_AMOUNT+'万元'
                                    },
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    },
                                    formatter: "{b}\r\n {c}万元 \r\n({d}%)",
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:date_arr
                        }
                    ],
                });
                $("#panel_1").text(data1[0].TOTAL_AMOUNT);
                var sel = $("#product_name");
                $.each(data[1], function(i, v) {
                    sel.append("<option value='" + v + "'>" + v + "</option>");
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data2 = echarts_1(data[2],data[3]);

        // 今日销售类别明细
        render_table = function(data) {
            if(ZP.utils.isArray(data)){
                // 加工处理数据
                var echart_DATE = [], echart_DIFF_AMOUNT = [];
                var html = '';
                $.each(data, function(i, n) {
                    html += '<tr><td>'+n.PRODUCT_NAME+'</td><td>'+n.AMOUNT+'</td></tr>'
                });
                //console.log(data);
                var table = $("#table2");
                table.html(html);
            }
        };
        var data5 = render_table(data[5]);

        echarts_2 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_2'), 'macarons');
                // 加工处理数据
                // 设置颜色
                var color_arr = {}, tem_color = ['#F0F8FF', '#FFE4E1', '#FFB90F', '#FFB6C1', '#FF6347', '#FFE4E1', '#FFC1C1', '#7D26CD'];
                $.each(data[0], function(ii, vv) {
                    color_arr.vv = tem_color[ii];
                });

                var e_chart_stack = [],echart_date = [];
                $.each(data[1], function(i, n) {
                    echart_date.push(n+'('+data[5][i]+')');
                });
                $.each(data[4], function(i, n) {

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
                    name: '实际销售额',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ed5565'}},
                    data: data[2]
                });

                e_chart_stack.unshift({
                    name: '销售预估(仅供参考)',
                    type: 'bar',
                    smooth:true,
                    symbol: 'none',
                    itemStyle: {normal: {color: '#1ab394'}},
                    data: data[3]
                });

                data[0].unshift("实际销售额");
                data[0].unshift("销售预估(仅供参考)");

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: data[0],
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

                    calculable : true,
                    dataZoom: { // 区间选择
                        type: 'slider',
                        show: true,
                        start : 0,
                        end: 50,
                    },

                    series: e_chart_stack
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data3 = echarts_2(data[1]);

        echarts_4 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_4'), 'macarons');
                // 对数据进行加工
                var echart_date = [], echart_old_user = [], echart_new_user = [], echart_old_amount = [], echart_new_amount = [];
                $.each(data, function(i, n) {
                    echart_date.push(n.C_DATE);
                    echart_old_user.push(n.USER_OLD);
                    echart_new_user.push(n.USER_NEW);
                    echart_old_amount.push(n.AMOUNT_OLD);
                    echart_new_amount.push(n.AMOUNT_NEW);
                });

                var option = $.extend(true, {}, ZP.utils.echarts_init_option, {
                    legend: {
                        data: ['老产品购买人数', '新产品购买人数','老产品购买金额', '新产品购买金额'],
                    },
                    grid: [{
                        right: '55%'
                    }, {
                        left: '55%'
                    }],
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisLine: {onZero: true},
                            data: echart_date
                        },
                        {
                            gridIndex: 1,
                            type : 'category',
                            boundaryGap : false,
                            axisLine: {onZero: true},
                            data: echart_date,
                        }
                    ],
                    yAxis : [
                        {
                            name: '人数',
                            axisLabel: {
                                formatter: '{value} 人'
                            }
                        },
                        {
                            gridIndex: 1,
                            name: '金额',
                            axisLabel: {
                                formatter: '{value} 万元'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'老产品购买人数',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_old_user
                        },
                        {
                            name:'新产品购买人数',
                            type:'line',
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_new_user
                        },
                        {
                            name:'老产品购买金额',
                            type:'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#ed5565'}},
                            data: echart_old_amount
                        },
                        {
                            name:'新产品购买金额',
                            type:'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            smooth:true,
                            symbol: 'circle',
                            symbolSize: 7,
                            lineStyle: {normal: {width: 4}},
                            itemStyle: {normal: {color: '#1ab394'}},
                            data: echart_new_amount
                        },
                    ],
                });
                // console.log(option);
                myChart.setOption(option);
                return [myChart, option];

            };
            return render_echarts(data);
        };

        var data6 = echarts_4(data[6]);

        echarts_3 = function(data) {

            var render_echarts = function(data) {
                var myChart = echarts.init(document.getElementById('echarts_3'), 'macarons');
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
                    name: '实际销售额',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {normal: {width: 4}},
                    itemStyle: {normal: {color: '#ed5565'}},
                    data: data[2]
                });

                data[0].unshift("实际销售额");

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
                        end: 100,
                    },
                    tooltip : {
                        trigger: 'axis',//是否节点触发
                        padding: 5,
                        formatter: function (params) {
                            // console.log(JSON.stringify(params));
                            var res='<div style="float: left;padding-right:10px;">'+params[0].name+'<br>'
                            for(var i=0;i<params.length;i++){
                                res+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+':'+params[i].data+'<br>'
                                if (i == 9) {
                                    res+='</div><div style="float: left;margin-top:20px;padding-left:10px;border-left:2px solid #fff;">'
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

            };
            return render_echarts(data);
        };

        var data4 = echarts_3(data[4]);

        export_excel_btn = function() {
            $("a#export_excel").on("click", function() {
                var s_date = $("#searchForm1 input[name='start_date']").val(),
                    e_date = $("#searchForm1 input[name='end_date']").val();
                ZP.api.new_custody_export_excel_sale({
                    data: {'start_date': s_date, 'end_date': e_date},
                    successCallBack: function(result) {
                        ZP.utils.alert_warning(result.message, true, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            });
        }
        export_excel_btn();

    };

    init_body = function () {

        ZP.api.new_custody_sale({
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
                $("#frontend_go").show();
                ZP.api.new_custody_sale_search({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_1(data[0],data[1]);
                            render_table(data[2]);
                            $("#frontend_go").hide();
                        }
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    var btn_select = function() {
        var $select = null;
        $select = $("#product_name");
        var $form = null;
        $form = $("form#searchForm");
        $select.change(function(e) {
            var $data = Object.assign({},$select.serializeJson(),$form.serializeJson());
            $("#frontend_go").show();
            ZP.api.new_custody_sale_search3({
                data: $data,
                successCallBack: function(result){
                    if (ZP.utils.isArray(result.data)) {
                        var data = result.data;
                        render_table(data[0]);
                        $("#frontend_go").hide();
                    }
                },
                failCallBack: ZP.utils.failCallBack
            });
        });
    }

    var btn_submit1 = function() {
        var $form = null;
        $form = $("form#searchForm1");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                $("#frontend_go").show();
                ZP.api.new_custody_sale_search1({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_2(data[0]);
                            $("#frontend_go").hide();
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
                $("#frontend_go").show();
                ZP.api.new_custody_sale_search2({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_3(data[0]);
                            $("#frontend_go").hide();
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
        $form = $("form#searchForm4");
        $form.submit(function(e) {
            if(ZP.utils.isPassForm($form)){
                $("#frontend_go").show();
                ZP.api.new_custody_sale_search4({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        if (ZP.utils.isArray(result.data)) {
                            var data = result.data;
                            echarts_4(data[0]);
                            $("#frontend_go").hide();
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
            btn_select();
            btn_submit1();
            btn_submit2();
            btn_submit3();
        }
    };

};