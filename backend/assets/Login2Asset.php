<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 10:51:48
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 10:55:36
 */

namespace backend\assets;

use yii\web\AssetBundle;

class Login2Asset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'login2/css/login_style.css'
	];

	public $js = [
		'global/plugins/jquery-validation/js/jquery.validate.min.js',
        'global/plugins/jquery-validation/js/additional-methods.min.js',
        'global/plugins/select2/js/select2.full.min.js',
        'global/plugins/backstretch/jquery.backstretch.min.js',
        'global/scripts/app.min.js',
        // 'login2/js/login2.js',
        'login2/js/login3.js',
        // 我扩展的js

        'extend/core/define.js',
        'extend/core/utils.js',
        '../../static/js/api.js',


	];

	public $depends = [
		'backend\assets\IeAsset',
        'backend\assets\CoreAsset',
	];



}