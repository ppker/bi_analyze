<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 11:27:09
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 11:29:37
 */

namespace backend\assets;

use yii\web\AssetBundle;

class PluginAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'global/plugins/bootstrap-select/css/bootstrap-select.min.css',
        'global/plugins/bootstrap-toastr/toastr.min.css',
        'extend/plugins/Bootstrap_datetimepicker/css/bootstrap-datetimepicker.min.css',
	];

	public $js = [
		'global/plugins/counterup/jquery.waypoints.min.js', // 计数器？
        'global/plugins/counterup/jquery.counterup.js',

        'global/plugins/amcharts/amcharts/amcharts.js', // 很不错的一个图表库
        'global/plugins/amcharts/amcharts/serial.js',
        'global/plugins/amcharts/amcharts/pie.js',
        'global/plugins/amcharts/amcharts/radar.js',
        'global/plugins/amcharts/amcharts/themes/light.js',
        'global/plugins/amcharts/amcharts/themes/patterns.js',
        'global/plugins/amcharts/amcharts/themes/chalk.js',
        'global/plugins/amcharts/ammap/ammap.js',
        'global/plugins/amcharts/ammap/maps/js/worldLow.js',
        'global/plugins/amcharts/amstockcharts/amstock.js',

        // 'global/plugins/fullcalendar/fullcalendar.min.js', // 日历插件
        'global/plugins/horizontal-timeline/horizontal-timeline.js', // 水平时间轴

        // 时间日期插件
        'extend/plugins/Bootstrap_datetimepicker/js/bootstrap-datetimepicker.js',
        'extend/plugins/Bootstrap_datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js',

        'global/plugins/flot/jquery.flot.min.js', // jquery 的一个 float 画图组件
        'global/plugins/flot/jquery.flot.resize.min.js',
        'global/plugins/flot/jquery.flot.categories.min.js',

        'global/plugins/bootstrap-toastr/toastr.min.js', // toastr信息提示框
        'global/plugins/bootstrap-select/js/bootstrap-select.min.js', // bs风格select

        'global/plugins/jquery-easypiechart/jquery.easypiechart.min.js', // 比较屌的饼图
        'global/plugins/jquery.sparkline.min.js', // jQuery 线状图插件
        'global/plugins/jqvmap/jqvmap/jquery.vmap.js', // USA 地图插件
        'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js',
        'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js',
        'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
        'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js',
        'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
        'global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js',

        'pages/scripts/ui-sweetalert.min.js',

        'extend/plugins/handlebars/handlebars-v1.3.0.js',
        'extend/plugins/handlebars/extend.js',

        // 'global/plugins/jquery-validation/js/jquery.validate.min.js', // 表单验证插件
        // 'global/plugins/jquery-validation/js/additional-methods.min.js', //
        // 'pages/scripts/form-validation.min.js', //
	];

	public $depends = [
		'backend\assets\AppAsset'
	];

}