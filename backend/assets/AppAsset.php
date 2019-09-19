<?php

namespace backend\assets;

use yii\web\AssetBundle;

/**
 * Main backend application asset bundle.
 */
class AppAsset extends AssetBundle {

    public $sourcePath = "@common/metronic/assets";

    public $css = [
        'global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
        'global/plugins/morris/morris.css', // 漂亮的时间系列曲线图 you can draw line, circle, bar and donut charts
        'global/plugins/fullcalendar/fullcalendar.min.css', // 日历 事件 面板
        'global/plugins/jqvmap/jqvmap/jqvmap.css', // 地图 | 地理位置数据交互插件
        'layouts/layout/css/layout.min.css',
        'layouts/layout/css/themes/darkblue.min.css',
        'layouts/layout/css/custom.min.css', // 自定义css
        'global/plugins/kindeditor-4.1.10/themes/default/default.css', // 富文本
        'global/plugins/kindeditor-4.1.10/plugins/code/prettify.css', // 富文本
    ];

    public $js = [
        'global/plugins/moment.min.js', // 时间格式
        'global/plugins/bootstrap-daterangepicker/daterangepicker.min.js', // 日期插件
        'global/plugins/morris/morris.min.js',
        'global/plugins/morris/raphael-min.js',
        'global/plugins/fullcalendar/fullcalendar.min.js', // 日历插件
        'global/plugins/kindeditor-4.1.10/kindeditor.js', // 富文本
        'global/plugins/kindeditor-4.1.10/plugins/code/prettify.js', // 富文本
        'global/plugins/kindeditor-4.1.10/lang/zh_CN.js', // 富文本
    ];

    public $depends = [
        'backend\assets\IeAsset',
        'backend\assets\CoreAsset',
    ];

    // register js | css
    public static function addScript($view, $jsfile) {

        $view->registerJsFile($jsfile, [AppAsset::className(), 'depends' => 'backend\assets\AppAsset']);
    }

    public static function addCss($view, $cssfile) {

        $view->registerCssFile($cssfile, [AppAsset::className(), 'depends' => 'backend\assets\AppAsset']);
    }

}
