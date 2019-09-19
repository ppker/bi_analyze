<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 09:59:17
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 10:53:11
 */

namespace backend\assets;
use yii\web\AssetBundle;

class CoreAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [ // 全局css文件
		// 字体库
        'global/css/google_font.css',
        'global/plugins/font-awesome/css/font-awesome.min.css',
        'global/plugins/simple-line-icons/simple-line-icons.min.css',
        // bootstrap
        'global/plugins/bootstrap/css/bootstrap.min.css',
        'global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
        'global/plugins/bootstrap-sweetalert/sweetalert.css',
        'global/css/components-rounded.min.css', // 圆角组件样式
        'global/css/plugins.min.css', // 第三方插件定制化样式（稍靠后）
	];

	public $js = [ // 全局js文件
		'extend/core/nameSpace.js',
        'global/plugins/jquery.min.js',
        'extend/plugins/jquery/jquery.extend.js', // 我扩展的jquery
        'global/plugins/bootstrap/js/bootstrap.min.js',
        'extend/plugins/Bootstrap_validate/validator.js',
        'global/plugins/js.cookie.min.js', // cookie manager
        'global/plugins/jquery-slimscroll/jquery.slimscroll.min.js', // nice slimcroll similar facebook
        'global/plugins/jquery.blockui.min.js', // ajax遮罩层ui
        'global/plugins/bootstrap-switch/js/bootstrap-switch.min.js', // bootstrap下拉选择
        'extend/plugins/Md5/md5.min.js', // md5加密
        'global/plugins/bootstrap-sweetalert/sweetalert.min.js',
	];

	public $depends = [];

}



