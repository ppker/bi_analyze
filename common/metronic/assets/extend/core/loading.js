(function(MAIN, $){
	
	"use strict";
	
	var self = MAIN.nameSpace.reg("loading"),
		id = "go_loading",
		$id = "#" + id;
	
	self.show = function(){
		var bg = null,
			content = null,
			winHeight = $(window).height();
			content = null;
		
		if($($id).length >= 1){
			$($id).show();
		}else{
			bg = document.createElement("div");
			bg.id = id;
			bg.style.cssText = [
				"position: fixed",
				"background: #FFF",
				"opacity: 0.7",
				"left: 0",
				"top: 0",
				"display: block",
				"z-index: 99999999",
				"width: 100%",
				"text-align: center",
				"height: 100%"
			].join(";");
			
			content = document.createElement("img");
			content.className = "pscc";
			content.style.cssText = "position: absolute;left: 50%;top: 50%";
			content.src = MAIN.define.loadingImg;
			bg.appendChild(content);
			$("body").append(bg);
			// $(bg).show();
		}
	};
	
	self.hide = function(){
		$($id).fadeOut();
	};
		
	
})(ZP, jQuery);
