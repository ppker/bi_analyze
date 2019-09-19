(function(self){

	"use strict";
	// main
	var zp = {};
	
    zp.nameSpace = {
    
        reg: function(s){
			var arr = s.split('.');
			var namespace = zp;
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
					namespace[arr[i]] = {};
				}
				
				namespace = namespace[arr[i]];
			}
			
			return namespace;
        },
        
		del: function(s){ // [window.]a.b.c   删除window 下面的a.b.c
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

	// reg
	zp.nameSpace.reg("utils");
	zp.nameSpace.reg("api");
	self.ZP = zp;
	
})(window);
