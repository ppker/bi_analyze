/*
* @Author: yata
* @Date:   2019-08-21 21:31:37
* @Last Modified by:   yata
* @Last Modified time: 2019-08-21 22:33:11
*/

window.PAGE_ACTION = function() {
    "use strict";

    var main = null,
    	btnLogin = null,
        main_end = null;

    btnLogin = function() {

    	var $form = null;
    	$form = $("form#login-form");
    	$form.submit(function(e) {
    		// 表单验证
    		if (ZP.utils.isPassForm($form)) {
    			ZP.api.user_login({
    				data: $form.serializeJson(),
    				successCallBack: function(result) {
    					// ZP.utils.alert_warning(result.message, true, false, result.data.jump);
    					window.localStorage.setItem('access_token', result.data.access_token);
                        window.location.href = result.data.jump;
    				},
    				failCallBack: ZP.utils.failCallBack
    			});
    		}
    		e.preventDefault();
    	});

    };



    main = function() {
    	btnLogin(); // 登录页面
    };

    return {
        init: function (){
            main();
        }
    };

};