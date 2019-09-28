(function(MAIN, $){
	
	"use strict";
	
	var self = MAIN.nameSpace.reg("api"),
		queue = [],
		ajax = null;
		
	ajax = function(options){
		var ret = null;
		
		if(MAIN.define.isAjaxLock){
			queue.push(options);
			/*
			if(typeof options.failCallBack === "function"){
				options.failCallBack({
					success: false,
					message: ZP.msg.ajaxLocked,
					data: null
				});
			}
			*/
		}else{
		    
			options.async = typeof options.async === "undefined" ? true : options.async;
			options.async = options.successCallBack ? options.async : false;
			options.dataType = options.dataType ? options.dataType : "json";
			MAIN.define.isAjaxLock = true;

			$.ajax({
				async: options.async,
				// dataType: "json",
                processData: typeof options.processData !== 'undefined' ? options.processData : true,
                contentType: typeof options.contentType !== 'undefined' ? options.contentType : 'application/x-www-form-urlencoded',
                cache: typeof options.cache !== 'undefined' ? options.cache : true,
				dataType: options.dataType,
				type: typeof options.type !== 'undefined' ? options.type : 'POST',
				// url: options.url,
                url: is_nginx ? options.url.replace(/api\/web/, 'restful') + "?access_token=" + (!window.localStorage.getItem('access_token') ? '' : window.localStorage.getItem('access_token')) : options.url,
                // data: options.data,
				// data: ("undefined" !== typeof options.no_secret) ? options.data : $.extend(options.data, {"access_token": window.localStorage.getItem('access_token')}) , // api的验证字段
                data: options.data, // api的验证字段
                success: function(result, textStatus){
					MAIN.define.isAjaxLock = false;

					if(result.success && typeof options.successCallBack === "function"){
						options.successCallBack(result);
					}else if(typeof options.failCallBack === "function"){
						options.failCallBack(result);
					}
					ret = result;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					MAIN.define.isAjaxLock = false;

					if(typeof options.failCallBack === "function"){
						options.failCallBack({
							success: false,
							message: errorThrown,
							data: null
						});
					}
				},
				complete: function(XMLHttpRequest, textStatus){
					MAIN.define.isAjaxLock = false;

					if(queue.length >= 1){
						var options = queue.shift();
						ajax(options);
					}
				}
			});
		}
		return ret;
	};

	///////////////////////////////////////////////////////////////////////
    // user_login
    self.user_login = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/login";
        return ajax(options);
    };

    // user_database
    self.user_database = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database";
        return ajax(options);
    };

    /**
     * user_database_add
     */
    self.user_database_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_add";
        return ajax(options);
    };

    // user_database_list
    self.user_database_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_list";
        return ajax(options);
    };

    // user_database_get
    self.user_database_get = function(options) {
        options = options ? options : {};
        options.type = "GET";
        options.url = "/api/web/user/database_get";
        return ajax(options);
    };

    // user_database_del
    self.user_database_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_del";
        return ajax(options);
    };

    // user_database_upload
    self.user_database_upload = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_upload";
        return ajax(options);
    };

    // database_profile
    self.database_profile = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_profile";
        return ajax(options);
    };

    // get_tables_by_db
    self.get_tables_by_db = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/database_tables";
        return ajax(options);
    };

    // get_data_by_table
    self.get_data_by_table = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/data_tables";
        return ajax(options);
    };





    ////////////////////////////////////////////////////////////////////////

    // 用户账号信息
	self.user_index = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/index";
        return ajax(options);
	};

	// 后台添加账号
	self.User_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/user_add";
        return ajax(options);
	};

	// 后台删除账号
	self.User_del = function(options) {
		options = options ? options : {};
		options.url = "/api/web/user/user_del";
		return ajax(options);
	};

	// 获取用户数据
	self.User_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/user_get";
        return ajax(options);
    };

	// User_reset
    self.User_reset = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/user_reset";
        return ajax(options);
    };

    // User_auth
    self.User_auth = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/user_auth";
        return ajax(options);
    };
    /**
	 * access_index
     */
    self.access_index = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/access_index";
        return ajax(options);
    };

    /**
     * access_add
     */
    self.access_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/access_add";
        return ajax(options);
    };

    /**
     * access_get
     */
    self.access_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/access_get";
        return ajax(options);
    };

	/**
	 * access_del
	 */
	self.access_del = function(options) {
		options = options ? options : {};
		options.url = "/api/web/user/access_del";
		return ajax(options);
	};

    /**
     * system_menu
     */
    self.system_menu = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/system_menu";
        return ajax(options);
    };

    /**
     * system_apito
     */
    self.system_apito = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/system_apito";
        return ajax(options);
    };

    /**
     * system_apito_add
     */
    self.system_apito_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/system_apito_add";
        return ajax(options);
    };

    /**
     * select_multiple_page_url
     */
    self.select_multiple_page_url = function(options) {
        options = options ? options : {};
        options.url = "/api/web/tools/select_multiple_page_url";
        options.async = false;
        return ajax(options);
    };

    /**
     * select_multiple_api_url
     */
    self.select_multiple_api_url = function(options) {
        options = options ? options : {};
        options.url = "/api/web/tools/select_multiple_api_url";
        options.async = false;
        return ajax(options);
    };

    /**
     * system_apito_del
     */
    self.system_apito_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/system_apito_del";
        return ajax(options);
    };

    /**
     * system_apito_get
     */
    self.system_apito_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/system_apito_get";
        return ajax(options);
    };



    /**
     * system_menu_add
     */
    self.system_menu_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/menu_add";
        return ajax(options);
    };

	/**
	 * init_form_api
	 */
	self.init_form_api = function(options) {
		options = options ? options : {};
		options.url = "/api/web/system/init_form_api";
        options.async = false;
		return ajax(options);
	};

    /**
     * system_menu_get
     */
    self.system_menu_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/menu_get";
        return ajax(options);
    };

    /**
	 * system_menu_del
     */
    self.system_menu_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/menu_del";
        return ajax(options);
    };


    /**
     * autodata_timing
     */
    self.autodata_timing = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/autodata_timing";
        return ajax(options);
    };

    /**
     * autodata_timing_add
     */
    self.autodata_timing_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_add";
        return ajax(options);
    };

    /**
     * autodata_timing_get
     */
    self.autodata_timing_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_get";
        return ajax(options);
    };

    /**
     * autodata_timing_del
     */
    self.autodata_timing_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_del";
        return ajax(options);
    };

    /**
     * autodata_timing_open
     */
    self.autodata_timing_open = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_open";
        return ajax(options);
    };

    /**
     * autodata_timing_run
     */
    self.autodata_timing_run = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_send";
        return ajax(options);
    };

    /**
     * autodata_timing_test
     */
    self.autodata_timing_test = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/timing_send";
        return ajax(options);
    };

    /**
     * autodata_pic_get
     */
    self.autodata_pic_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/pic_get";
        return ajax(options);
    };

    /**
     * autodata_pic_add
     */
    self.autodata_pic_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/pic_add";
        return ajax(options);
    };

    /**
     * autodata_table_get
     */
    self.autodata_table_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/table_get";
        return ajax(options);
    };

    /**
     * autodata_table_add
     */
    self.autodata_table_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/table_add";
        return ajax(options);
    };

    /**
     * autodata_init_form_api
     */
    self.autodata_init_form_api = function(options) {
        options = options ? options : {};
        options.url = "/api/web/autodata/init_form_api";
        options.async = false;
        return ajax(options);
    };

    /**
	 * cook_index
     */
    self.cook_index = function(options) {
        options = options ? options : {};
        options.url = "/api/web/cook/index";
        return ajax(options);
    };

    /**
	 * image_del
     */
    self.image_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/cook/image_del";
        return ajax(options);
    };

    /**
     * hotel_add
     */
    self.hotel_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/cook/hotel_add";
        return ajax(options);
    };

	/**
	 * hotel_del
	 */
	self.hotel_del = function(options) {
		options = options ? options : {};
		options.url = "/api/web/cook/hotel_del";
		return ajax(options);
	};

    /**
     * hotel_get
     */
    self.hotel_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/cook/hotel_get";
        return ajax(options);
    };

    /**
	 * dish_index
     */
    self.dish_index = function(options) {
        options = options ? options : {};
        options.url = "/api/web/dish/index";
        return ajax(options);
    };

	/**
	 * dish_del
	 */
	self.dish_del = function(options) {
		options = options ? options : {};
		options.url = "/api/web/dish/dish_del";
		return ajax(options);
	};

    /**
     * dish_add
     */
    self.dish_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/dish/dish_add";
        return ajax(options);
    };
    /**
     * dish_init_form
     */
    self.dish_init_form = function(options) {
        options = options ? options : {};
        options.url = "/api/web/dish/init_form";
        return ajax(options);
    };

    /**
     * dish_get
     */
    self.dish_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/dish/dish_get";
        return ajax(options);
    };

    /**
     * gocar_get
     * 获取指定购物车信息
     */
    self.gocar_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/gocar/gocar_get";
        return ajax(options);
    };


    /**
     * gocar_list
     */
    self.gocar_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/gocar/gocar_list";
        return ajax(options);
    };

    /**
     * gocar_add
     */
    self.gocar_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/gocar/gocar_add";
        return ajax(options);
    };

    /**
     * gocar_del
     */
    self.gocar_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/gocar/gocar_del";
        return ajax(options);
    };

    /**
     * order_del
     */
    self.order_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/order/order_del";
        return ajax(options);
    };

    /**
     * order_add
     */
    self.order_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/order/order_add";
        return ajax(options);
    };

    /**
     * order_get
     */
    self.order_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/order/order_get";
        return ajax(options);
    };

    /**
     * Select_users_api
     * 获取所有用户的real_name, id
     */
    self.select_users_api = function(options) {
        options.async = false;
        options = options ? options : {};
        options.url = "/api/web/system/select_users_api";
        return ajax(options);
    };

    /**
     * select_dishes_api
     * 获取所有餐厅的菜肴
     */
    self.select_dishes_api = function(options) {
        options.async = false;
        options = options ? options : {};
        options.url = "/api/web/system/select_dishes_api";
        return ajax(options);
    };

    /**
     * select_hotels_api
     * 获取所有的餐厅
     */
    self.select_hotels_api = function(options) {
        options.async = false;
        options = options ? options : {};
        options.url = "/api/web/system/select_hotels_api";
        return ajax(options);
    };

    /**
     * dishOrder_list
     */
    self.dishOrder_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/order/order_list";
        return ajax(options);
    };

    // ----------------------------------------------------------------- 总的汇总部分
    /**
     * custody_pei
     */
    self.custody_pei = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_pei";
        return ajax(options);
    };

    /**
     * custody_account
     */
    self.custody_account = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_account";
        return ajax(options);
    };

    /**
     * custody_operate
     */
    self.custody_operate = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_operate";
        return ajax(options);
    };

    /**
     * custody_fund
     */
    self.custody_fund = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_fund";
        return ajax(options);
    };

    /**
     * custody_parter
     */
    self.custody_parter = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_parter";
        return ajax(options);
    };

    /**
     * custom_search_sale
     */
    self.custom_search_sale = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_search_sale";
        return ajax(options);
    };

    /**
     * custom_search_sale2
     */
    self.custom_search_sale2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_search_sale2";
        return ajax(options);
    };

    /**
     * custom_search_sale3
     */
    self.custom_search_sale3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_search_sale3";
        return ajax(options);
    };

    /**
     * custom_user_balance
     */
    self.custom_user_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custom_user_balance";
        return ajax(options);
    };

    /**
     * custom_account_balance
     */
    self.custom_account_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custom_account_balance";
        return ajax(options);
    };

    // ------------------------------------ 汇总的


    // ------------------------------------ 裕乾的
    /**
     * custody_pei
     */
    self.yuqian_pei = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_pei";
        return ajax(options);
    };

    /**
     * custody_account
     */
    self.yuqian_account = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_account";
        return ajax(options);
    };

    /**
     * custody_operate
     */
    self.yuqian_operate = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_operate";
        return ajax(options);
    };

    /**
     * custody_fund
     */
    self.yuqian_fund = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_fund";
        return ajax(options);
    };

    /**
     * custody_parter
     */
    self.yuqian_parter = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_parter";
        return ajax(options);
    };

    /**
     * custom_search_sale
     */
    self.yuqian_search_sale = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_search_sale";
        return ajax(options);
    };

    /**
     * custom_search_sale2
     */
    self.yuqian_search_sale2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_search_sale2";
        return ajax(options);
    };

    /**
     * yuqian_search_sale3
     */
    self.yuqian_search_sale3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custody_search_sale3";
        return ajax(options);
    };

    /**
     * custom_user_balance
     */
    self.yuqian_user_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custom_user_balance";
        return ajax(options);
    };

    /**
     * custom_account_balance
     */
    self.yuqian_account_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/yuqian/custom_account_balance";
        return ajax(options);
    };



    // ------------------------------- 蚨临 的数据
    /**
     * custody_pei
     */
    self.fulin_pei = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_pei";
        return ajax(options);
    };

    /**
     * custody_account
     */
    self.fulin_account = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_account";
        return ajax(options);
    };

    /**
     * custody_operate
     */
    self.fulin_operate = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_operate";
        return ajax(options);
    };

    /**
     * custody_fund
     */
    self.fulin_fund = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_fund";
        return ajax(options);
    };

    /**
     * custody_parter
     */
    self.fulin_parter = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_parter";
        return ajax(options);
    };

    /**
     * custom_search_sale
     */
    self.fulin_search_sale = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_search_sale";
        return ajax(options);
    };

    /**
     * custom_search_sale2
     */
    self.fulin_search_sale2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_search_sale2";
        return ajax(options);
    };

    /**
     * fulin_search_sale3
     */
    self.fulin_search_sale3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custody_search_sale3";
        return ajax(options);
    };

    /**
     * custom_user_balance
     */
    self.fulin_user_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custom_user_balance";
        return ajax(options);
    };

    /**
     * custom_account_balance
     */
    self.fulin_account_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/fulin/custom_account_balance";
        return ajax(options);
    };


    // ------------------------------- 蚨临 的数据

    ////////////////////////////////////////////
    /**
     * 更新用户的密码
     * user_setuser
     */
    self.user_setuser = function(options) {
        options = options ? options : {};
        options.url = "/api/web/user/user_setuser";
        return ajax(options);
    };


    // ------------------------------- database 报表渲染
    /**
     * database 报表数据渲染模块
     * database_show_list
     */
    self.database_show_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_show_list";
        return ajax(options);
    };

    /**
     * 自动表单的搜索部分
     * database_search_list
     */
    self.database_search_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_search_list";
        return ajax(options);
    };

    /**
     * 推荐方
     */
    self.select_tool_init = function(options) {
        options = options ? options : {};
        options.url = "/api/web/tools/select_original";
        return ajax(options);
    };

    /**
     * database_config_list
     */
    self.database_config_list = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/database_config_list";
        return ajax(options);
    };


    /**
     * system_menu_add
     */
    self.database_config_add = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/database_config_add";
        return ajax(options);
    };

    /**
     * database_config_get
     */
    self.database_config_get = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/database_config_get";
        return ajax(options);
    };

    /**
     * database_config_del
     */
    self.database_config_del = function(options) {
        options = options ? options : {};
        options.url = "/api/web/system/database_config_del";
        return ajax(options);
    };

    /**
     * database_show_yhlc
     */
    self.database_show_yhlc = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_show_yhlc";
        return ajax(options);
    };

    /**
     * database_search_yhlc
     */
    self.database_search_yhlc = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_search_yhlc";
        return ajax(options);
    };

    /**
     * database_show_qdjy
     */
    self.database_show_qdjy = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_show_qdjy";
        return ajax(options);
    };

    /**
     * database_search_qdjy
     */
    self.database_search_qdjy = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_search_qdjy";
        return ajax(options);
    };

    /**
     * database_search_qdjy_1
     */
    self.database_search_qdjy_1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_search_qdjy_1";
        return ajax(options);
    };

    /**
     * database_show_jfzjxh
     */
    self.database_show_jfzjxh = function(options) {
        options = options ? options : {};
        options.url = "/api/web/database/database_show_jfzjxh";
        return ajax(options);
    };

    /**
     * custody_hegui
     */
    self.custody_hegui = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_hegui";
        return ajax(options);
    };

    /**
     * custody_hegui_search
     */
    self.custody_hegui_search = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_hegui_search";
        return ajax(options);
    };

    /**
     * custody_jingpin
     */
    self.custody_jingpin = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_jingpin";
        return ajax(options);
    };

    /**
     * custody_jingpin_search
     */
    self.custody_jingpin_search = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/custody_jingpin_search";
        return ajax(options);
    };

    /**
     * new_custody_pei_biao
     */
    self.new_custody_pei_biao = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/pei-biao";
        return ajax(options);
    };

    /**
     * new_custody_flow
     */
    self.new_custody_flow = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/flow";
        return ajax(options);
    };

    /**
     * new_custody_search_zzft
     */
    self.new_custody_search_zzft = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/search-zzft";
        return ajax(options);
    };

    /**
     * new_custody_flow_search
     */
    self.new_custody_flow_search = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/flow_search";
        return ajax(options);
    };

    /**
     * new_custody_export_excel
     */
    self.new_custody_export_excel = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/export-excel";
        return ajax(options);
    };

    /**
     * new_custody_export_excel1
     */
    self.new_custody_export_excel1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/export-excel1";
        return ajax(options);
    };

    /**
     * custody_export_excel1
     */
    self.custody_export_excel1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/export-excel1";
        return ajax(options);
    };


    /**
     * custody_search_kppzj
     */
    self.custody_search_kppzj = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custody/search_kppzj";
        return ajax(options);
    };

    /**
     * new_custody_flow_search1
     */
    self.new_custody_flow_search1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/flow_search1";
        return ajax(options);
    };

    /**
     * new_custody_flow_search2
     */
    self.new_custody_flow_search2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/flow_search2";
        return ajax(options);
    };

    /**
     * new_custody_flow_search3
     */
    self.new_custody_flow_search3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/flow_search3";
        return ajax(options);
    };

    /**
     * new_custody_sale
     */
    self.new_custody_sale = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale";
        return ajax(options);
    };

    /**
     * new_custody_sale_search
     */
    self.new_custody_sale_search = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale_search";
        return ajax(options);
    };

    /**
     * new_custody_sale_search1
     */
    self.new_custody_sale_search1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale_search1";
        return ajax(options);
    };

    /**
     * new_custody_sale_search2
     */
    self.new_custody_sale_search2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale_search2";
        return ajax(options);
    };

    /**
     * new_custody_sale_search3
     */
    self.new_custody_sale_search3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale_search3";
        return ajax(options);
    };

    /**
     * new_custody_sale_search4
     */
    self.new_custody_sale_search4 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/sale_search4";
        return ajax(options);
    };

    /**
     * new_custody_export_excel_sale
     */
    self.new_custody_export_excel_sale = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/export-excel-sale";
        return ajax(options);
    };

    /**
     * new_custody_monitor_balance
     */
    self.new_custody_monitor_balance = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/monitor-balance";
        return ajax(options);
    };

    /**
     * new_custody_search_dzzh
     */
    self.new_custody_search_dzzh = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/search-dzzh";
        return ajax(options);
    };

    /**
     * new_custody_order
     */
    self.new_custody_order = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order";
        return ajax(options);
    };

    /**
     * new_custody_order_search
     */
    self.new_custody_order_search = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order_search";
        return ajax(options);
    };

    /**
     * new_custody_order_search1
     */
    self.new_custody_order_search1 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order_search1";
        return ajax(options);
    };

    /**
     * new_custody_order_search2
     */
    self.new_custody_order_search2 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order_search2";
        return ajax(options);
    };

    /**
     * new_custody_order_search3
     */
    self.new_custody_order_search3 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order_search3";
        return ajax(options);
    };

    /**
     * new_custody_order_search4
     */
    self.new_custody_order_search4 = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/order_search4";
        return ajax(options);
    };

    /**
     * custom_service_index
     */
    self.custom_service_index = function(options) {
        options = options ? options : {};
        options.url = "/api/web/custom-service/index";
        return ajax(options);
    };
    
    /**
     * smart_monitor
     */
    self.smart_monitor = function(options) {
        options = options ? options : {};
        options.url = "/api/web/smart-monitor/monitor-operation";
        return ajax(options);
    };

    /**
     * smart_monitor_search_people
     */
    self.smart_monitor_search_people = function(options) {
        options = options ? options : {};
        options.url = "/api/web/smart-monitor/search-people";
        return ajax(options);
    };

    /**
     * smart_monitor_search_tzhk
     */
    self.smart_monitor_search_tzhk = function(options) {
        options = options ? options : {};
        options.url = "/api/web/smart-monitor/search-tzhk";
        return ajax(options);
    };

    /**
     * smart_monitor_search_yqzc
     */
    self.smart_monitor_search_yqzc = function(options) {
        options = options ? options : {};
        options.url = "/api/web/smart-monitor/search-yqzc";
        return ajax(options);
    };

    /**
     * new_custody_search_kppzj
     */
    self.new_custody_search_kppzj = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/search-kppzj";
        return ajax(options);
    };

    /**
     * new_custody_search_xbpbt
     */
    self.new_custody_search_xbpbt = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/search-xbpbt";
        return ajax(options);
    };

    /**
     * new_custody_search_sszzhk
     */
    self.new_custody_search_sszzhk = function(options) {
        options = options ? options : {};
        options.url = "/api/web/new-custody/search-sszzhk";
        return ajax(options);
    };




})(ZP, jQuery);