<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 11:23:00
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 11:26:44
 */

namespace backend\assets;

use yii\web\AssetBundle;

class LoginAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'global/plugins/select2/css/select2.min.css',
        'global/plugins/select2/css/select2-bootstrap.min.css',
        'pages/css/login-5.min.css',
	];

	public $js = [
		'global/plugins/jquery-validation/js/jquery.validate.min.js',
        'global/plugins/jquery-validation/js/additional-methods.min.js',
        'global/plugins/select2/js/select2.full.min.js',
        'global/plugins/backstretch/jquery.backstretch.min.js',
        'global/scripts/app.min.js',
        'pages/scripts/login-5.min.js',
	];

	public $depends = [
		'backend\assets\IeAsset',
        'backend\assets\CoreAsset'
	];

}