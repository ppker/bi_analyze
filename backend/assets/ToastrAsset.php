<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 11:38:41
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 11:43:58
 */

namespace backend\assets;

use yii\web\AssetBundle;

class ToastrAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $css = [
		'global/plugins/bootstrap-toastr/toastr.min.css'
	];

	public $js = [
		'global/plugins/bootstrap-toastr/toastr.min.js', // toastr信息提示框
	];

	public $depends = [
		'backend\assets\EndAsset'
	];

}