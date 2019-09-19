<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 08:59:34
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 08:59:43
 */

use yii\helpers\Html;
use backend\assets\ToastrAsset;
use frontend\assets\ToastrAsset as FtoastrAsset;

if ('' != $app) FtoastrAsset::register($this);
else ToastrAsset::register($this);

$str = json_encode($data);
$js = "ZP.utils.webSuccess(JSON.parse('" . $str . "'))";
$this->registerJs($js);
?>