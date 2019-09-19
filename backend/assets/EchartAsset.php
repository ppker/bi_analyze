<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 10:53:49
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 10:58:55
 */

namespace backend\assets;

use yii\web\AssetBundle;

class EchartAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $js = [
		'extend/plugins/echarts3/echarts.js',
        'extend/plugins/echarts3/theme/dark.js'
	];

	// public $css = [];

	public $depends = [
		'backend\assets\AppAsset'
	];


}
