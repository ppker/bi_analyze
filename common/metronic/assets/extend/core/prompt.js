
(function(MAIN, $){
	
	"use strict";
	
	var self = MAIN.nameSpace.reg("prompt"),
		className = "prompt",
		$className = "." + className;
	
	self.show = function(msg, func){
		var html = null;
		
		$($className).remove();

		ZP.utils.render("prompt.html", {
			height: $(window).height(),
			msg: msg
		}, function(html){
			var container = null;
			$("body").append(html);
			container = $($className);
			container.find("[name=prompt-ok]").click(function(){
				self.hide();
				(typeof func === "function" && func());
			});
			
			container.find("[name=prompt-cancel]").click(function(){
				self.hide();
			});
		});
	};
	
	self.hide = function(){
		$($className).remove();
	};
		
	
})(ZP, jQuery);