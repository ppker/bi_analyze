(function(){
	
	"use strict";
	
	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
		var result;
		
		switch (operator) {
			case '==':
				result = (v1 == v2) ? options.fn(this) : options.inverse(this);
				break;
			case '===':
				result = (v1 === v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<':
				result = (v1 < v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<=':
				result = (v1 <= v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>':
				result = (v1 > v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>=':
				result = (v1 >= v2) ? options.fn(this) : options.inverse(this);
				break;
			case '!=':
				result = (v1 != v2) ? options.fn(this) : options.inverse(this);
				break;
			default:
				result = options.inverse(this);     
				break;
		}
		
		return result;
	});
	
	Handlebars.registerHelper('isEmpty', function (value, options) {
		var result = null;
		
		result = value.length >= 1 ? options.inverse(this) : options.fn(this) ;
		
		return result;
	});
	
	
	Handlebars.registerHelper('add', function (value) {
		var result = null;
		
		return window.parseInt(value, 10) + 1;
	});

	Handlebars.registerHelper('first', function (value) {
		return value[0];
	});

	Handlebars.registerHelper('isEven', function (value, options) {
		return value%2 === 0 ? options.inverse(this) : options.fn(this);
	});

	Handlebars.registerHelper('format_num', function (value) {
		var num = new Number(value)
		return num.toFixed();
	});

	Handlebars.registerHelper('toDate', function (value) {
		if (0 == value) return "无";
		return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
	});

	Handlebars.registerHelper('isGt1', function (value) {
		if (value = 1) return "一手";
		else return "非一手";
	});

	Handlebars.registerHelper('isNull', function (value) {

		if ([] == value || (value instanceof Array && value.length == 0) || null == value || undefined == value || "" == value) return true;
		else return false;
	});



})(Handlebars);
