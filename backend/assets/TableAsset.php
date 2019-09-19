<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 11:29:58
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 11:32:59
 */

namespace backend\assets;

use yii\web\AssetBundle;

class TableAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'extend/plugins/DataTables/datatables.min.css',
	];

	public $js = [
		'extend/plugins/DataTables/datatables.js',
	];

	public $depends = [
        'backend\assets\AppAsset'
    ];
	
}