<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 11:44:20
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 11:47:29
 */

namespace backend\assets;

use yii\web\AssetBundle;

class UploadAsset extends AssetBundle {

	public $sourcePath = "@common/metronic/assets";

	public $js = [
		'global/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js',
        'global/plugins/jquery-file-upload/js/vendor/tmpl.min.js',
        'global/plugins/jquery-file-upload/js/vendor/load-image.min.js',
        'global/plugins/jquery-file-upload/js/vendor/canvas-to-blob.min.js',
        'global/plugins/jquery-file-upload/blueimp-gallery/jquery.blueimp-gallery.min.js',
        'global/plugins/jquery-file-upload/js/jquery.iframe-transport.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-process.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-image.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-audio.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-video.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-validate.js',
        'global/plugins/jquery-file-upload/js/jquery.fileupload-ui.js'
	];

	public $css = [
		'global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css',
        'global/plugins/jquery-file-upload/css/jquery.fileupload.css',
        'global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css'
	];

	public $depends = [
		'backend\assets\AppAsset'
	];

}

