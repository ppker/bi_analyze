(function(self){
	
	
	"use strict";
	
	var debug = false,
		includeCss = null,
		includeJs = null;
	
    /**
     * 命名空间
     * @author lizhong
     */
    self.nameSpace = {
    
        reg: function(s){
			var arr = s.split('.');
			var namespace = self;
			
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
					namespace[arr[i]] = {};
				}
				
				namespace = namespace[arr[i]];
			}
			
			return namespace;
        },
        
		del: function(s){
			var arr = s.split('.');
			var namespace = self;
		    
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
				    return;
				}else if (k == i + 1) {
					delete namespace[arr[i]];
					return;
				}else{
					namespace = namespace[arr[i]];
				}
			}
		},
        
		isDefined: function(s){
			var arr = s.split('.');
			var namespace = self;
			
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
					return false;
				}
				
				namespace = namespace[arr[i]];
			}
			
			return true;
		}
    };
	
	self.addTime = function(str){
		var arr = [],
			now = Date.now();
		if(debug){
			arr = str.split("?");
			if(arr[1]){
				str += "&" + now;
			}else{
				str += "?" + now;
			}
		}
		
		return str;
	};
	
	
	includeJs = function(arr, fn){
		var i=0,
			k=arr.length,
			script = null,
			src = "",
			head = null,
			loop=null;

		head = document.getElementsByTagName('head')[0];

		if(arr instanceof Array || Object.prototype.toString.apply(arr) === '[object Array]'){
			loop = function(){
				src = arr.shift();
				script = document.createElement("script");
				script.type = "text/javascript";
				script.src = self.addTime(src);
				script.onreadystatechange = function() {
					if (script.readyState === 'loaded' || script.readyState === 'complete') {
						script.onreadystatechange = null;
						script.onload = null;
						if(arr.length>=1){
							loop();
						}else if(typeof fn === "function"){
							fn();
						}
					}else{
						// throw new Error(src + " Error");
					}
				};
				script.onload = function(){
					script.onreadystatechange = null;
					script.onload = null;
					if(arr.length>=1){
						loop();
					}else if(typeof fn === "function"){
						fn();
					}
				};
				script.onerror = function(e){
					throw new Error(e);
				};

				head.appendChild(script);
			};

			loop();
		}else{
			alert("错误：includeJs 参数不是一个数组");
		}
	};
	
	includeCss = function(arr){
		var i = 0,
			head = null,
			k = arr.length,
			link = null;

		head = document.getElementsByTagName('head')[0];

		if(arr instanceof Array || Object.prototype.toString.apply(arr) === '[object Array]'){
			for(i=0; i<k; i++){
				link = document.createElement("link");
				link.type = "text/css";
				link.setAttribute("rel", "stylesheet");
				link.href = self.addTime(arr[i]);
				head.appendChild(link);
			}
		}else{
			alert("错误：includeCss 参数不是一个数组");
		}
	};
	
	
	self.onload = function(){
		includeCss([
			
			// bootstrap
			"/Public/plugins/bootstrap/css/bootstrap.min.css",
			"/Public/plugins/FontAwesome/css/font-awesome.css",
			"/Public/plugins/FlatUI/css/flat-ui.css",
			
			"/Public/css/base.css",
			"/Public/css/header.css"
	
		]);
		
		includeJs([
		
			// require plugins
			"/Public/plugins/jquery/jquery-1.11.1.min.js",
			"/Public/plugins/jquery/jquery.extend.js",
			"/Public/plugins/bootstrap/js/bootstrap.min.js",
			"/Public/plugins/FlatUI/js/bootstrap-switch.js",
			"/Public/plugins/bootstrap/js/validator.js"
			
		]);
	};


})(this);
