<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 10:59:20
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 20:46:37
 */

namespace backend\assets;

use yii\web\AssetBundle;
use Yii;

class EndAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'extend/css/site.css',
        'extend/plugins/Load_Awesome/css/ball-running-dots.css',
	];

	public $js = [
		'global/scripts/app.js', // 框架app.js
        'pages/scripts/dashboard.min.js', // 页面的js逻辑
        'layouts/layout/scripts/layout.min.js', // 布局配置js
        'layouts/layout/scripts/demo.min.js', // demo js （页面逻辑）
        'layouts/global/scripts/quick-sidebar.min.js', // 快捷栏  就是我打算用socket聊天的那部分
        'layouts/global/scripts/quick-nav.min.js', // 就是右上角浮动的那个小圆圈圈
        // 我扩展的js
        'extend/core/define.js',
        'extend/core/utils.js',
        '../../static/js/api.js',
        // 'extend/core/api.js',
        'global/scripts/common.js' // 用户自定义的js
	];

	public $depends = [
		'backend\assets\PluginAsset',
        'backend\assets\TableAsset'
	];

	
	/**
	 * [get_js 模板对应的js文件路径]
	 * @param  string $route [路由]
	 * @return [type]        [返回路径]
	 */
	public static function get_js($route = '') {

		if ('' == $route) return '';
		$js_path = explode('/', $route);
		// 新增 show.js 的兼容
		if ('show' == end($js_path)) $js_path[0] = 'common';
		$whole_path = '/static/js/views/' . $js_path[0] . '/' . $js_path[1] . '.js';
		if (is_file(Yii::getAlias('@webroot' . $whole_path))) return '@web' . $whole_path;
		return false;
	}

}