(function(MAIN, $){
	
	"use strict";
	
	var self = MAIN.nameSpace.reg("utils"),
		userInfo = null,
		templateCache = {},
		setMap = null;
	
	
	self.isIE = function(version, comparison ){
		var $div = null,
			ieTest = null;
			
	    $div = $('<div style="display:none;"/>').appendTo($('body'));
	    $div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
	    ieTest = $div.find('a').length;
	    $div.remove();
	    
	    return ieTest;
	};

    /**
	 * 进行表单的验证
     */
	self.isPassForm = function($form){
		var validator = null;
		validator = $form.data('bs.validator');
		validator.validate();
		return !(validator.isIncomplete() || validator.hasErrors());
	};
	
	
	self.showFormMsg = function($info, msg, flag){
        var className = flag ? "alert-success" : "alert-danger";

        $info.removeClass("alert-success");
        $info.removeClass("alert-danger");

        $info.addClass(className);
        $info.html(msg).css("opacity", 1);
	};

	self.isArray = function(someDing){
		return someDing instanceof Array || Object.prototype.toString.apply(someDing) === '[object Array]';
	};

    self.isObject = function(someDing){
        return someDing instanceof Object || Object.prototype.toString.apply(someDing) === '[object Object]';
    };

	self.render = function(templateUrl, dict, func){
		var template = "",
			url = "",
			result = "",
			html = "",
			key = "";
		if ("@" === templateUrl.charAt(0)) {
            templateUrl = templateUrl.slice(1);
            url = templateUrl.charAt(1) === "/" ?  templateUrl : "/" + templateUrl;
            url = MAIN.define.frontend_templates_dir + url;
        } else {
            url = templateUrl.charAt(1) === "/" ?  templateUrl : "/" + templateUrl;
            url = MAIN.define.templatesDir + url;
        }
		key = md5(url);
		
		if(MAIN.define.isCacheTemplate && (key in templateCache) ){
			template = templateCache[key];
		}else{

			result = $.ajax({ url: url, async: false });

			if( result.readyState === 4 &&  result.status === 200  ){
				template = $.trim(result.responseText);
				if(MAIN.define.isCacheTemplate){
					templateCache[key] = template;
				}
			}else{
				throw new Error(result.statusText);
			}
		}
		
		html = Handlebars.compile(template)(dict);
		(typeof func === "function" && func(html));
		return html;
	};
	
	
	self.listToTree = function(list){
		var loop = null,
			tree = [],
			putTree = null,
			loop = null,
			reMase = {},
			i = 0;
		
		loop = function(list, item){
			var i = 0;
			
			for(i=0; i<list.length; i++){
				if(list[i].id === item.parent_id){
					list[i].children = item;
					return;
				}else if(self.isArray(list[i].children)){
					return loop(list[i].children, item);
				}
			}

		};
		
			
		for(i=0; i<list.length; i++){
			if(list[i].parent_id === "0"){
				tree.push(item);
			}
		}
		
		return tree;
	};


	self.filterEmployeeByDepartId = function(departmentData,employeeData, id){
		var arr = [],
			ids = [],
			isPush = false,
			getTree = null,
			loop = null;

		getTree = function(list){
			var arr = [],
				result = null,
				i = 0;

			for(i=0; i<list.length; i++){
				if(list[i].id === id){
					return [list[i]];
				}

				if(list[i].children){
					result = getTree(list[i].children);
					if(result){
						return result;
					}
				}
			}
		};

		loop = function(list){
			$.each(list, function(){
				ids.push(this.id);
				if(this.children){
					loop(this.children);
				}
			});
		};

		loop(getTree(departmentData));

		$.each(employeeData, function(){
			if($.inArray(this.department_id, ids) >= 0){
				arr.push(this);
			}
		});

		return arr;
	};


	self.randint = function(n, m){
		var c = m-n+1;
		return Math.floor(Math.random() * c + n);
	};

	self.tipso = function() {
		$('div.use-tipso').tipso({
			useTitle: false,
			position: 'bottom',
			delay: 10
		});
	};

	self.failCallBack = function(result){

		// ZP.utils.goLoadding_hide(); // 暂注释掉

        // 需要做判断modal框的显示状态，然后hide
        /*if ($("#addModal").length > 0) $("#addModal").modal('hide');
        if ($("#EditModal").length > 0) $("#EditModal").modal('hide');*/
		self.alert_warning(result.message);
		// $.messager.alert(result.message);
	};

	self.AuthFailCallBack = function(result) {

        ZP.utils.alert_warning(result.message, false, false, result.data.jump);
    };

	self.getUserInfo = function(){
		if(!userInfo){
			ZP.api.getUserInfo({
				async: false,
				successCallBack: function(result){
					userInfo = result.data;
					//userInfo.is_manager = false;
				},
				failCallBack: function(result){
					$.messager.alert(result.message);
					if(result.message === "未登陆"){
						self.dumpUrl("/");
					}
				}
			});
		}

		return userInfo;
	};

	self.get_echarts_pie_options = function(data) {
		var base_option = {
			title : {
				text: data.title.text,
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient : 'vertical',
				x : 'left',
				data: data.legend.data
			},
			toolbox: {
				show : false,
			},
			calculable : true,
			series : [
				{
					name: data.series.name,
					type:'pie',
					radius : '55%',
					center: ['50%', '60%'],
					selectedMode: 'single',
					data: data.series.data,
				}
			]
		};
		return base_option;
	};

	self.get_echarts_barline_options = function(data) {

		var base_option  = {
			tooltip : {
				trigger: 'axis'
			},
			toolbox: {
				show : false,
			},
			calculable : true,
			legend: {
				data: data.legend.data
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxis.data
				}
			],
			yAxis : [
				{
					type : 'value',
					name : data.yAxis[0].name,
					axisLabel : {
						formatter: data.yAxis[0].axisLabel.formatter,
					}
				},
				{
					type : 'value',
					name : data.yAxis[1].name,
					axisLabel : {
						formatter: data.yAxis[1].axisLabel.formatter,
					}
				}
			],
			series : data.series
		};

		// 折线条进行样式定制
		base_option.series[1].itemStyle = {
			normal : {
				lineStyle: {
					width: 4,
					type: 'dotted'
				}
			}
		};

		return base_option;
	};

    self.goLoadding_show = function() {
        $("#frontend_go").show();
    };
    self.goLoadding_hide = function() {
        $("#frontend_go").hide();
    };

	/**
	 * 获取标准面积图
	 * @param data
     */
	self.get_echarts_baseArea_options = function(data, type) {

		var base_options = {
			title : {
				text: data.title.text,
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data: data.legend.data
			},
			toolbox: {
				show : false,
			},
			calculable : true,
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : data.xAxis.data,
					axisLabel: {
						formatter: function(value) {
							if (0 < parseInt(value)) return value.substr(5);
							return value;
						},
					},
					splitNumber:12,
				}
			],
			yAxis : [
				{
					type : 'value',
					name : data.yAxis.name,
					axisLabel : {
						formatter: data.yAxis.axisLabel.formatter,
					}
				}
			],
			dataZoom: { // 区间选择
				show: true,
				start : data.dataZoom.start,
				end: 100,
			},
			series : data.series
		};
		$.each(base_options.series, function(i, n) {
			// base_options.series[i]
			n.smooth = true;
			n.itemStyle = {normal: {areaStyle: {type: 'default'}}};
			n.type = 'line';
		});
		base_options.series[0].markPoint = {
			data : [
				{type : 'max', name: '最大值'},
				{type : 'min', name: '最小值'}
			]
		};
		base_options.series[1].markPoint = {
			data : [
				{type : 'max', name: '最大值'},
				{type : 'min', name: '最小值'}
			]
		};
		if (1 == type) {
			base_options.xAxis[0].axisLabel = {
				formatter: function(value) {
					if (0 < parseInt(value)) {
						return (value.substr(5, 7) + value.substr(17));
					}
				},
			};
		} else if (2 == type) {
			base_options.xAxis[0].axisLabel = {
				formatter: function(value) {
					if (0 < parseInt(value)) {
						return value;
					}
				},
			};
		}

		return base_options;
	};



	self.createCookie = function(name, value, days) {
		var expires;

		days = days ? days : ZP.define.cookieDay;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	};

	self.getCookie = function(c_name) {
		var c_start = 0,
			c_end = 0;

		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	};

	self.delCookie = function(name) {
		self.createCookie(name,"",-1);
	};

	self.dumpUrl = function(url){
		window.setTimeout(function(){
			window.location.href = url;
		}, ZP.define.dumpTimeout);
	};

	self.windowOpen = function(url){
		window.setTimeout(function(){
			window.open(url);
		}, ZP.define.dumpTimeout);
	};



	self.dumpReload = function(){
		window.setTimeout(function(){
			window.location.reload();
		}, ZP.define.dumpTimeout);
	};

	self.goReload = function(n){
		window.setTimeout(function(){
			window.location.reload();
		}, n);
	};


	self.reload = function() {
		window.location.reload();
	}
	// 触发时间日期控件 精确到天
	self.target_timedate = function() {

		$("input[name='start_date'], input[name='end_date']").each(function(){

			$(this).datetimepicker({
				format: "yyyy-mm-dd",
				language: "zh-CN",
				autoclose: true,
				// startView: 3,
				// minView: 3,
				// maxView: 3,
				minView: "month",
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('change', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};

	// 触发时间日期控件 精确到天 copy1
	self.target_timedate1 = function() {

		$("input[name='start_date1'], input[name='end_date1']").each(function(){

			$(this).datetimepicker({
				format: "yyyy-mm-dd",
				language: "zh-CN",
				autoclose: true,
				// startView: 3,
				// minView: 3,
				// maxView: 3,
				minView: "month",
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('change', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};

	// 触发时间日期控件 精确到天 copy2
	self.target_timedate2 = function() {

		$("input[name='start_date2'], input[name='end_date2']").each(function(){

			$(this).datetimepicker({
				format: "yyyy-mm-dd",
				language: "zh-CN",
				autoclose: true,
				// startView: 3,
				// minView: 3,
				// maxView: 3,
				minView: "month",
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('change', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};

	// 触发时间日期控件 精确到秒
	self.target_timedate4 = function() {

		$("input[name='start_date2'], input[name='end_date2']").each(function(){

			$(this).datetimepicker({
				format: "yyyy-mm-dd hh:ii:ss",
				language: "zh-CN",
				autoclose: true,
				// startView: 3,
				// minView: 3,
				// maxView: 3,
				minView: "day",
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('change', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};





    // 触发时间日期控件 精确到秒
    self.target_timedate5 = function() {

        $("input[name='start_date3'], input[name='end_date3']").each(function(){

            $(this).datetimepicker({
                format: "yyyy-mm-dd hh:00",
                language: "zh-CN",
                autoclose: true,
                // startView: 3,
                // minView: 3,
                // maxView: 3,
                minView: "day",
                todayBtn: true,
                todayHighlight: true,
                // toolbarPlacement: "bottom",
            }).on('change', function(e){
                //$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
                //$(this).blur();
            });
        });
    };




	// 触发时间日期控件 精确到天 copy2
	self.target_timedate3 = function() {

		$("input[name='start_date3'], input[name='end_date3']").each(function(){

			$(this).datetimepicker({
				format: "hh:ii",
				language: "zh-CN",
				autoclose: true,
				startView: 1,
				maxView: 1,
				minView: 0,
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('change', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};




	// 触发时间日期控件 精确到月
	self.target_month_date = function() {
		$("input[name='start_date'], input[name='end_date']").each(function(){

			$(this).datetimepicker({
				format: "yyyy-mm",
				language: "zh-CN",
				autoclose: true,
				startView: 'year',
				// minView: 3,
				// maxView: 2,
				minView: 'year',
				maxView: 'decade',
				todayBtn: true,
				todayHighlight: true,
				// toolbarPlacement: "bottom",
			}).on('show', function(e){
				//$(this).data("DateTimePicker").hide(); // 监听change事件，进行关闭
				//$(this).blur();
			});
		});
	};

	self.webSuccess = function (data) {
        toastr.options = {
            closeButton: true,
            positionClass: 'undefined' != typeof data.place ? data.place : 'toast-top-left',
            onclick: function () {},
            showDuration: 0,
            hideDuration: 0,
            timeOut: data.time,
            extendedTimeOut: 0,
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
        };
        toastr[data.type](data.message, data.title);
    };



    self.openNew = function(url,name,left,top,width,height,resizable,scrollbars,location){
        window.open(url,name,'left='+left+',top='+top+',width='+width+',height='+height+',resizable='+resizable+',scrollbars='+scrollbars+',location='+location);
    };
	self.randstr = function(length){
		var key = {

			str : [
				'a','b','c','d','e','f','g','h','i','j','k','l','m',
				'o','p','q','r','s','t','x','u','v','y','z','w','n',
				'0','1','2','3','4','5','6','7','8','9'
			],

			randint : function(n,m){
				var c = m-n+1;
				var num = Math.random() * c + n;
				return	Math.floor(num);
			},

			randStr : function(){
				var _this = this;
				var leng = _this.str.length - 1;
				var randkey = _this.randint(0, leng);
				return _this.str[randkey];
			},

			create : function(len){
				var _this = this;
				var l = len || 10;
				var str = '';

				for(var i = 0 ; i<l ; i++){
					str += _this.randStr();
				}

				return str;
			}

		};

		length = length ? length : 10;

		return key.create(length);
	};


	self.reportSearch = function(op, func){
		ZP.utils.render("other/reportSearchForm.html", op, function(html){
			var $form = null;
			op.$main.html(html);
			$("#start_date, #end_date").each(function(){
				$(this).datetimepicker();
			});
			$form = op.$main.find(">form");
			$form.submit(function(e){
				e.preventDefault();
				func($form.serializeJson());
			});
		});
	};

	self.signSearch = function(op, func){
		ZP.utils.render("other/signSearchForm.html", op, function(html){
			var $form = null;
			op.$main.html(html);
			$("#start_date,#end_date").each(function(){
				$(this).datetimepicker();
			});
			$form = op.$main.find(">form");
			$form.submit(function(e){
				e.preventDefault();
				func($form.serializeJson());
			});
		});
	};

	self.getQuery = function(obj){
		var params = [];
		$.each(obj, function(key){
			if(obj[key]){
				params.push(key+"="+obj[key]);
			}
		});
		return params.join("&");
	};


	self.explortData = function(func){
		$("#exportData").remove();
		ZP.utils.render('other/exportData.html', null, function(html){
			var $main = null;
			$("body").append(html);
			$main = $("#exportData");
			$main.modal("show");
			$("#exportConfirm").click(function(){
				var data = {};
				$main.modal("hide");

				if($("*[name=querytype]:checked")){
					data.start_date = $("#start_date").val();
					data.end_date = $("#end_date").val();
				}

				if(typeof func === "function"){
					func(data);
				}
			});
		});
	};

	self.selectDepart = function(dfValue, func){
		$("#selectDepartmentModal").remove();

		ZP.api.departmentTree({
			successCallBack: function(result){
				ZP.utils.render("other/selectDepartment.html", null, function(html){
					var $select = null,
						$main = null,
						depName = [],
						getName = null,
						splitChar = " > ",
						init = null;

					$("body").append(html);
					$main = $("#selectDepartmentModal");
					$select = $main.find("select");
					getName = function(name){
						if(depName.length>=1){
							return [depName.join(splitChar), name].join(splitChar);
						}else{
							return name;
						}
					};

					init = function(list){
						$.each(list, function(){
							var option = null;
							option = document.createElement("option");
							option.innerHTML = getName(this.name);
							option.value = this.id;
							option.selected = dfValue == this.id ? true : false;
							$select.append(option);

							if(ZP.utils.isArray(this.children)){
								depName.push(this.name);
								init(this.children);
								depName.pop();
							}
						});
					};

					init(result.data);
					$main.modal("show");
					$("#selectDepartmentModalConfirm").click(function(){
						$main.modal("hide");
						if(typeof func === "function"){
							func($select.val());
						}
					});
				});

			},
			failCallBack: ZP.utils.failCallBack
		});
	};

	self.decimal = function(num, v) {
		var vv = Math.pow(10,  v);
		return Math.round(num * vv) / vv;
	};

	// id = 'order_status'
	// 初始化select选项框
    self.selectInit = function(list, id, selectedValue){
        var $select = $("select#"+id);
        $.each(list, function(){
            var option = document.createElement("option");
            option.value = this.id ? this.id : this.ID;
            option.innerHTML = this.name ? this.name : this.NAME;
			option.selected = selectedValue == (this.id ? this.id : this.ID) ? true : false;
            $select.append(option);
        });

        //$('.bs-select').selectpicker({
        //    iconBase: 'fa',
        //    tickIcon: 'fa-check'
        //});

    };

    self.menu_top = function() {
        var url = window.location.href;
        var tem_url = url.split("/").shift();
        var end_url = tem_url.join("/");
        var $nav = $("ul.navbar-nav").find('a[href="'+end_url+'"]');
        if ($nav.length > 0) {
            $nav.closest('li').addClass('active open');
            $nav.parent().parent().parent().addClass('active open');
        }
    };



    /**初始化顶部导航（top）*/
    self.topMenuInit = function(tabName){
        ZP.api.getMenuList({
            data:null,
            successCallBack:function(result){
                if(ZP.utils.isArray(result.data) || ZP.utils.isObject(result.data)){
                    ZP.utils.render("other/topMenu.html", {
                        list: result.data
                    }, function(html){
                        $("#topMenu").html(html);
                        $("*[tab-name="+tabName+"]").addClass("active");
                    });
                }
            }
        });
    };
    /**初始化顶部&左侧导航（top&left）*/
    self.topLeftMenuInit = function(parentName,tabName,leftName){
        ZP.api.getMenuList({
            data:null,
            successCallBack:function(result){
                if(ZP.utils.isArray(result.data) || ZP.utils.isObject(result.data)){
                    ZP.utils.render("other/topMenu.html", {
                        list: result.data
                    }, function(html){
                        $("#topMenu").html(html);
                        $("*[tab-name="+tabName+"]").addClass("active");
                    });
                    $.each(result.data,function(){
                        if(this.tabName == parentName){
                            ZP.utils.render("other/leftMenu.html", {
                                list: this.child
                            }, function(html){
                                $("#leftMenu").html(html);
                                $(".list-group").find(".list-group-item[name="+leftName+"]").addClass("active");
                            });
                        }
                    });
                }
            }
        });
    };
    /**初始化左侧静态导航*/
    self.leftStaticMenuInit = function(tempUrl,menuTitle){
        if(menuTitle){
            $("#leftMenuTitle").html(menuTitle);
        }else{
            $("#leftMenuTitle").html("面板导航");
        }
        ZP.utils.render(tempUrl,{},function(html){
            $("#leftMenu").html(html);
        });
    }
    //初始化地图
    self.setMap = function(id){
    	// 百度地图API功能
    	var map = new BMap.Map(id);
    	map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    	var point = new BMap.Point(ZP.define.mapCenterPosition[0],ZP.define.mapCenterPosition[1]);
    	map.centerAndZoom(point,ZP.define.mapZoom);
    	map.enableScrollWheelZoom();

    	function myFun(result){
    		var cityName = result.name;
    		map.setCenter(cityName);
    	}
    	var myCity = new BMap.LocalCity();
    	myCity.get(myFun);

        map.addEventListener("click", function(e) {
            var myGeo = new BMap.Geocoder();
            var adds =  new BMap.Point(e.point.lng,e.point.lat);
            var marker1 = new BMap.Marker(adds); // 创建标注
            map.clearOverlays();
            map.addOverlay(marker1); // 将标注添加到地图中
            //根据标注获取具体地址写入地址框
            myGeo.getLocation(adds, function(rs){
                var address = rs.address;
                $("input[name='address']").val(address);
            });
            $('#longitude').val(e.point.lng);
            $('#latitude').val(e.point.lat);
        });
    };
    self.employeeView=function(id){
		var employeeListInfo={},
		employeeListActive={},
		employeeListPlan={},
		employeeListReport={};
		ZP.api.employeeViewProfile({
			async:false,
			data: {id:id},
			successCallBack: function(result){
				employeeListInfo=result.data;
			},
			failCallBack: ZP.utils.failCallBack
		});
		ZP.api.employeeViewActive({
			async:false,
			data:{id:id},
			successCallBack:function(result){
				employeeListActive=result.data
			},
			failCallBack:ZP.utils.failCallBack
		});
		ZP.api.employeeViewPlan({
			async:false,
			data:{id:id},
			successCallBack:function(result){
				employeeListPlan=result.data
			},
			failCallBack:ZP.utils.failCallBack
		});
		ZP.api.employeeViewReport({
			async:false,
			data:{id:id},
			successCallBack:function(result){
				employeeListReport=result.data
			},
			failCallBack:ZP.utils.failCallBack
		});
		var table = $("#employeeView_info");
		
		ZP.utils.render("view/employeeView.html", {
                employeeInfo:employeeListInfo,
                employeeActive:employeeListActive,
                employeePlan:employeeListPlan,
                employeeReport:employeeListReport
			}, function(html){
			    table.html(html);
		});
		$("#employeeView").modal("show");
		$("#employeeView").on("click","[actionrule=activeMap]",function(){		
	        var pointArr = $(this).attr('actionid');
	        var num=pointArr.indexOf("-");
	        var longitude=pointArr.substr(0,num);
	        var latitude=pointArr.substr(num+1);
	        var activeMap = new BMap.Map("activeContainer");

	    	activeMap.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
	    	activeMap.enableScrollWheelZoom();    // 添加平移缩放控件
	    	activeMap.clearOverlays();
	      
	        	var point = new BMap.Point(longitude,latitude);
	        	activeMap.centerAndZoom(point,12);
	            //将员工巡视签到位置添加到地图上
	            var ePoint=new BMap.Point(longitude,latitude);
	            var emarker = new BMap.Marker(ePoint);
	            activeMap.addOverlay(emarker);// 将标注添加到地图中            
	            /**文本框形式的标注*/
	            var eopts = {
	          		  position : ePoint,    // 指定文本标注所在的地理位置
	          		  offset   : new BMap.Size(20, -25)    //设置文本偏移量
	          	}
	        $("#activeModal").modal("show");
	        
	    });
		 //		setMap("#activeContainer");
	};
    self.dateFormat = function(time,format){
        if(time == ''){
            var date = new Date();
        }else{
            var date = new Date(time.replace(/-/g,   "/"));
        }
        var year=date.getFullYear();
        var month=date.getMonth() + 1;
        var day=date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        month = month>=10?month:'0'+month;
        day = day>=10?day:'0'+day;
        hour = hour>=10?hour:'0'+hour;
        min = min>=10?min:'0'+min;
        sec = sec>=10?sec:'0'+sec;
        if(format == 'Y-m-d'){
            return year + '-' + month + '-' + day;
        }else if(format == 'Y-m-d H'){
            return year + '-' + month + '-' + day + ' ' + hour;
        }else if(format == 'Y-m-d H:i'){
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min;
        }else if(format == 'Y-m-d H:i:s'){
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        }
    };
    /*
     * 获得时间
     */
    self.formsData=function(){
    	var formsData = {};
        formsData.forms = 1;
        var todayDate = ZP.utils.dateFormat('','Y-m-d');
        if(typeof ZP.define.urlParams.start_date != 'undefined'){
            formsData.start_date = ZP.define.urlParams.start_date;
            $("#start_date").val(ZP.define.urlParams.start_date);
        }else{
            $("#start_date").val(todayDate);
        }
        if(typeof ZP.define.urlParams.end_date != 'undefined'){
            formsData.end_date = ZP.define.urlParams.end_date;
            $("#end_date").val(ZP.define.urlParams.end_date);
        }else{
            $("#end_date").val(todayDate);
        }
        $("#start_date, #end_date").each(function(){
            $(this).datetimepicker({
                pickTime: false,
                defaultDate:$(this).val()
            });
        }); 
        return formsData;
    };

    /**
     * 页面的公共模块功能
     */
    self.init_page_module = function() {

        var $table = $('#table');
        var $checkAll = $("#checkAll");
        if (!$("#btn_all_del").hasClass("disabled")) {
            $("#btn_all_del").addClass("disabled");
        }
        $table.find("input.select").each(function(){
            $(this).click(function(){
                var selectLen = $table.find("input.select").length,
                    checkedLen = $table.find("input.select:checked").length;
                if (0 == checkedLen) {
                    if (!$("#btn_all_del").hasClass("disabled")) {
                        $("#btn_all_del").addClass("disabled");
                    }
                }else if (0 < checkedLen) {
                    if ($("#btn_all_del").hasClass("disabled")) {
                        $("#btn_all_del").removeClass("disabled");
                    }
                }
                if(selectLen === checkedLen){
                    $checkAll[0].checked = true;
                }else{
                    $checkAll[0].checked = false;
                }
            });
        });

        $checkAll.click(function(){
            var value = false;

            if($(this).is(":checked")){
                value = true;
            }
            $table.find("input.select").each(function(){
                this.checked = value;
            });
			var checkedLen = $table.find("input.select:checked").length;
			if (checkedLen >0 ) $("#btn_all_del").removeClass("disabled");
			else $("#btn_all_del").addClass("disabled");


        });
	};

    /**
	 * 基础的添加按钮
     */
    self.btn_add = function() {
        $("#btn_add").on('click', function() {
            $("#addModal").modal('show');
        });
	};

    /**
	 * dataTable 通用配置
     * @type {{order: [*], oLanguage: *, bStateSave: boolean, ordering: boolean, scrollX: boolean, ScrollCollapse: boolean, buttons: [*], responsive: boolean, lengthMenu: [*], destroy: boolean}}
     */
    self.default_dataTable_list = {
        // dom: '<"html5buttons"B>lTfgitp',

        "order": [[ 0, "asc" ]],
        oLanguage: ZP.define.dataTableLan,
        bStateSave: ZP.define.dataTableStateSave,
        // "stripeClasses": [ 'strip1', 'strip2'],
        "ordering": true,
        // dom: 'Tfgtpi',
        scrollX: false,
        ScrollCollapse: true,
        buttons: [
            { extend: 'print', className: 'btn dark btn-outline' },
            { extend: 'copy', className: 'btn red btn-outline' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'excel', className: 'btn yellow btn-outline ' },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
        ],
        // 渲染头部
        "headerCallback": function( thead, data, start, end, display ) {
            $(thead).css({"background-color": "#00aecd"});
        },
        "stripeClasses": [ 'strip1', 'strip2'],
        responsive: false,
        "lengthMenu": [10, 20, 50, 100],
        destroy: true
    };

    /**
     * 填充 add model select init
     * @param cfg
     */
    self.add_selectInit = function (cfg) {
        ZP.api[cfg.api]({
            data: null,
            successCallBack: function(result){
                self.selectInit(result.data, cfg.id);
                $('.bs-select').selectpicker({
                    iconBase: 'fa',
                    tickIcon: 'fa-check'
                });
            },
            failCallBack: ZP.utils.failCallBack
        });
    };

    /**
     * 优化 填充多个 multiple selected
     */
    self.add_selectsInit = function (cfg) {

        if (self.isArray(cfg)) { // 多个用foreach
            $.each(cfg, function(i,v) {
                ZP.api[v.api]({
                    data: null,
                    successCallBack: function(result) {
                        self.selectInit(result.data, v.id);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            });

            $('.bs-select').selectpicker({
                iconBase: 'fa',
                tickIcon: 'fa-check'
            });
        }
    };

    /**
     * 新增的 工具类组件 全能型
     */
    self.tool_select_init = function(cfg) {
        ZP.api[cfg.api]({
            data: cfg.data ? cfg.data : null,
            successCallBack: function(result){
                // console.log(result.data);
                if (self.isArray(result.data)) {
                    $.each(result.data, function(i, v) {
                        self.selectInit(v, cfg.id + String(i), ("undefined" == typeof cfg.def) ? null : cfg.def[i]);
                    });
                    $('.bs-select').selectpicker({
                        iconBase: 'fa',
                        tickIcon: 'fa-check'
                    });
                }

            },
            failCallBack: ZP.utils.failCallBack
        });

    };




    /**
     * 默认dataTable 的添加按钮
     */
    self.default_btn_add = function() {
        $("#btn_add").on('click', function() {
            $("#addModal").modal('show');
        });
    };

    /**
     * 默认dataTable 添加按钮的监听添加表单
     */
    self.default_btn_add_submit = function(url_add) {

        var $form = null;
        $form = $("form#addForm");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                $("#addModal").modal('hide');
                ZP.api[url_add]({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

	/**
	 * 默认dataTable 测试按钮的监听表单
	 */
	self.default_btn_test_submit = function(url_test) {

		var $form = null;
		$form = $("form#testForm");
		$form.submit(function(e){
			//表单验证
			if(ZP.utils.isPassForm($form)){
				$("#testModal").modal('hide');
				ZP.api[url_test]({
					data: $form.serializeJson(),
					successCallBack: function(result){
						ZP.utils.alert_warning(result.message, true);
					},
					failCallBack: ZP.utils.failCallBack
				});
			}
			e.preventDefault();
		});
	};

	/**
	 * 默认dataTable 图表按钮的监听表单
	 */
	self.default_btn_pic_submit = function(url_pic) {

		var $form = null;
		$form = $("form#picForm");
		$form.submit(function(e){
			//表单验证
			if(ZP.utils.isPassForm($form)){
				$("#picModal").modal('hide');
				ZP.api[url_pic]({
					data: $form.serializeJson(),
					successCallBack: function(result){
						ZP.utils.alert_warning(result.message, true);
					},
					failCallBack: ZP.utils.failCallBack
				});
			}
			e.preventDefault();
		});
	};

	/**
	 * 默认dataTable 表头按钮的监听表单
	 */
	self.default_btn_table_submit = function(url_table) {

		var $form = null;
		$form = $("form#tableForm");
		$form.submit(function(e){
			//表单验证
			if(ZP.utils.isPassForm($form)){
				$("#tableModal").modal('hide');
				ZP.api[url_table]({
					data: $form.serializeJson(),
					successCallBack: function(result){
						ZP.utils.alert_warning(result.message, true);
					},
					failCallBack: ZP.utils.failCallBack
				});
			}
			e.preventDefault();
		});
	};

	/**
     * 默认的list封装
     */
    self.default_list = function (cfg_data) {
        ZP.api[cfg_data.api_url]({
            data: null,
            successCallBack:function(result){

                if(ZP.utils.isArray(result.data)){

					if (0 == result.success) ZP.utils.alert_warning(result.message, true);
                    ZP.utils.render(cfg_data.template_path, {
                        list: result.data
                    },function(html){
                        var table = $("#table");
                        table.html(html);
                        var t = table.DataTable(cfg_data.dataTable);

                        $('#sample_3_tools > li > a.tool-action').on('click', function() {
                            var action = $(this).attr('data-action');
                            t.button(action).trigger();
                        });
                        // 全选
                        self.init_page_module();
                        if ('undefined' != typeof cfg_data.all_del_api) self.btn_all_del(cfg_data.all_del_api);
                        if ('undefined' != typeof cfg_data.init_form_api) self.add_selectInit(cfg_data.init_form_api); // 默认add  modal 的 selected init
                        if ('undefined' != typeof cfg_data.init_form_html_data) self.add_selectsInit(cfg_data.init_form_html_data.select); // 初始化所有的select组件
                        self.default_btn_add();
                        if ('undefined' != typeof cfg_data.add_api) self.default_btn_add_submit(cfg_data.add_api);
						if ('undefined' != typeof cfg_data.test_api) self.default_btn_test_submit(cfg_data.test_api);
						if ('undefined' != typeof cfg_data.pic_api) self.default_btn_pic_submit(cfg_data.pic_api);
						if ('undefined' != typeof cfg_data.table_api) self.default_btn_table_submit(cfg_data.table_api);
                        if ('undefined' != typeof cfg_data.btn_edit && "" != cfg_data.btn_edit) cfg_data.btn_edit();
                        if ('undefined' != typeof cfg_data.btn_del && "" != cfg_data.btn_del) cfg_data.btn_del();
						if ('undefined' != typeof cfg_data.btn_open && "" != cfg_data.btn_open) cfg_data.btn_open();
						if ('undefined' != typeof cfg_data.btn_test && "" != cfg_data.btn_test) cfg_data.btn_test();
						if ('undefined' != typeof cfg_data.btn_run && "" != cfg_data.btn_run) cfg_data.btn_run();
						if ('undefined' != typeof cfg_data.btn_pic && "" != cfg_data.btn_pic) cfg_data.btn_pic();
						if ('undefined' != typeof cfg_data.btn_table && "" != cfg_data.btn_table) cfg_data.btn_table();
                        if ('undefined' != typeof cfg_data.btn_default_del) self.btn_default_del(cfg_data.btn_default_del);
                        if ('undefined' != typeof cfg_data.image_upload && "" !== cfg_data.image_upload) self.iamge_upload(cfg_data.image_upload);
                        if ('undefined' != typeof cfg_data.image_bind_del && "" != cfg_data.image_bind_del) self.image_bind_del(cfg_data.image_bind_del);

                    });
                }
            },
            failCallBack: ZP.utils.failCallBack
        });
    };

	/**
	 * 默认的删除按钮的操作
	 */
    self.btn_default_del = function(api_url) {

        $("table tr .btn-group li").on("click", "a[actionrule='del']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api[api_url]({
                    data: {id: $id},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };



    /**
	 * 批量删除的按钮操作
	 */
	self.btn_all_del = function(api_url) {

		$("#btn_all_del").on('click', function() {
			var select_ids = [];
			$("#table").find("input.select:checked").each(function() {
				var $tr = $(this).closest("tr");
				select_ids.push($tr.attr("id"));
			});
			// sweetalert
            if (0 == select_ids.length) {
                swal("警告！", "您还没有勾选任何选项!", "error");
            } else {
                swal({
                        title: "你确定要删除么?",
                        text: "删除之后将无法进行恢复",
                        type: "warning",
                        showCancelButton: true,
                        CancelButtonClass: "info",
                        confirmButtonClass: "btn-danger",
                        // confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定删除!",
                        cancelButtonText: "取消删除",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            ZP.api[api_url]({
                                data: {id: select_ids},
                                successCallBack: function(result){
                                    ZP.utils.alert_warning(result.message, true);
                                },
                                failCallBack: ZP.utils.failCallBack
                            });
                            swal("删除成功!", "你已经删除成功！", "success");
                        } else {
                            swal("取消成功", "你取消了删除操作", "error");
                        }
                    }
                );
            }

		});
	};

    /**
     * 图片上传
     */
    self.iamge_upload = function(cfg) {

        var fileupload_config = {
            maxNumberOfFiles: 1,
            // disableImageResize: false,
            autoUpload: false,
            disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            url: '/backend/web/upload/upload',
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            done: function (e, data) {
                $("input#h_hotel_photo").val(data.result.data);
                $("button.b-delete").removeAttr("disabled");
            },
            always: function (e, data) {
                $("#fileupload").removeClass('fileupload-processing');
            },
            send: function (e, data) {
                $('#fileupload').addClass('fileupload-processing');
            }
        };



        $('#fileupload').fileupload($.extend(true, {}, fileupload_config, cfg));

        // Enable iframe cross-domain access via redirect option:
        $('#fileupload').fileupload(
            'option',
            'redirect',
            window.location.href.replace(
                /\/[^\/]*$/,
                '/cors/result.html?%s'
            )
        );

        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                        new Date())
                    .appendTo('#fileupload');
            });
        }
    };


    self.image_bind_del = function(input_id) {

        $("table.table-image").on('click', "button.b-delete", function(e) {
            var imgpath = $("input#" + input_id).val();
            var $this = $(this);
            ZP.api.image_del({
                data: {file: imgpath},
                successCallBack: function(result){
                    $("input#" + input_id).val("");
                    $this.parent().parent().remove();
                },
                failCallBack: ZP.utils.failCallBack
            });
            e.preventDefault();
        });

        $("a.b-u-delete").on("click", function(e) {
            var imgpath = $("input#" + input_id).val();
            ZP.api.image_del({
                data: {file: imgpath},
                successCallBack: function(result){
                    $("input#" + input_id).val("");
                    $("div.b-u-img-div").remove();
                },
                failCallBack: ZP.utils.failCallBack
            });
            e.preventDefault();
        });



    };



    /**
	 * 操作类alert的提示
     * @param message
     * @param type
     */
    self.alert_warning = function(message, type, nogo, jump = '') {
        swal({
                title: "提示",
                text: message,
                type: type ? "success" : "error",
                confirmButtonClass: "btn-danger",
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: true,
                html: true
            },
            function (isConfirm) {
                // if (!type) return;
				if (nogo) return;
                if (isConfirm && !jump) {
                    self.reload();
                } else if (isConfirm && jump) {
                    self.dumpUrl(jump);
				}
            }
        );
        self.goLoadding_hide();
    };

	/**
	 * 表单验证的配置
     */
	self.form_validation = {
		errorElement: 'span', //default input error message container
		errorClass: 'help-block help-block-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		ignore: "",  // validate all fields including form hidden input
		rules: {
			/*username: {
				minlength: 3,
				required: true
			},
			sex: {
				required: true,
			},
			password: {
				required: true,
				minlength: 6
			},
			status: {
				required: true,
			},
			signature: {
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},*/
		},

		invalidHandler: function (event, validator) { //display error alert on form submit
			success2.hide();
			error2.show();
			App.scrollTo(error2, -200);
		},

		errorPlacement: function (error, element) { // render error placement for each input type
			var icon = $(element).parent('.input-icon').children('i');
			icon.removeClass('fa-check').addClass("fa-warning");
			icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
		},

		highlight: function (element) { // hightlight error inputs
			$(element)
				.closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
		},

		unhighlight: function (element) { // revert the change done by hightlight

		},

		success: function (label, element) {
			var icon = $(element).parent('.input-icon').children('i');
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
			icon.removeClass("fa-warning").addClass("fa-check");
		},

		submitHandler: function (form) {
			success.show();
			error.hide();
			form[0].submit(); // submit the form
		}
	};

    /**
     * echarts的初始化option
     * @type {{gird: {bottom: number, containLabel: boolean, left: number}, tooltip: {trigger: string, axisPointer: {type: string, label: {backGroundColor: string}}}, legend: {data: [*]}, xAxis: {type: string, boundaryGap: boolean, data: [*]}, yAxis: [*], series: [*]}}
     */
	self.echarts_init_option = {
        gird: {
            bottom: 0,
            containLabel: true,
            left: 0,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    backGroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis : [
            {
                name: '',
                type: 'value',
                axisLabel: {
                    formatter: ''
                }

            }
        ],
        series: [
            {
                name:'',
                type:'line',
                smooth:true,
                symbol: 'circle',
                symbolSize: 7,
                // stack: '',
                lineStyle: {normal: {width: 4}},
                itemStyle: {normal: {color: '#ed5565'}},
                data: []
            }
        ],
    };

	self.render_auto_show_config = {
        // dom: '<"html5buttons"B>lTfgitp',
        "order": [[ 0, "desc" ]],
        oLanguage: ZP.define.dataTableLan,
        bStateSave: ZP.define.dataTableStateSave,
        stripeClasses: ['strip1', 'strip2'],
        "ordering": true,
        // dom: 'Tfgtpi',
        "scrollX": true,
        "scrollY": true,
        ScrollCollapse: true,
        autoWidth: false,
        buttons: [
            { extend: 'excel', className: 'btn yellow btn-outline ',
                exportOptions: {
                    trim: false
                }
            },
            { extend: 'csv', className: 'btn purple btn-outline ' },
            { extend: 'pdf', className: 'btn green btn-outline' },
            { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'},
			/*{ extend: 'print', className: 'btn dark btn-outline' },
			 { extend: 'copy', className: 'btn red btn-outline' },*/
        ],
        // 渲染头部
        "headerCallback": function( thead, data, start, end, display ) {
            $(thead).css({"background-color": "#00aecd"});
        },
        // responsive: false,
        "lengthMenu": [15, 30, 100],
        destroy: true,
    };

    /**
     * 自动报表的展示show
     */
    self.render_auto_show = function(data, t_config, type) {

        if ("" == data) return;
        if ("" == t_config) t_config = {};

        ZP.utils.render("common/show.html", {
            list: data
        },function(html){
            var table = $("#table");
            table.html(html);
            var t = table.DataTable($.extend(true, {}, self.render_auto_show_config, t_config));
            if ('undefined' !== typeof type) {
                $('#sample_3_tools > li').off('click', 'a.tool-action');
            }
            $('#sample_3_tools > li').on('click', 'a.tool-action', function() {
                var action = $(this).attr('data-action');
                t.buttons(action).trigger();
            });
            // 全选
            // ZP.utils.init_page_module();

        });

        if(data.search_filter) {
            $("form#filter_bar input#csrf").after(data.search_filter);
        };
    };




})(ZP, jQuery);
