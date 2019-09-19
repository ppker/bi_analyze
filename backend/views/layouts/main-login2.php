<?php
/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/7
 * Time: 16:38
 * Desc:
 */

use backend\assets\Login2Asset;
use yii\helpers\Html;

Login2Asset::register($this);
$this->beginPage();
?>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="<?= Yii::$app->language; ?>" />
    <title><?= Yii::$app->setting->get('siteName') ?> | 登录页面</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="<? Yii::$app->setting->get('siteKeyword') ?>"
          name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link rel="shortcut icon" href="/favicon.ico" />
    <?php $this->head() ?>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
<?php $this->beginBody(); ?>
<div class="login2">
    <div class="canvaszz"></div>
    <canvas id="canvas"></canvas>
    <div class="head_log">
        <div class="nav_log">
            <img class="login-logo" src="<?= Yii::getAlias("@web/static/images/login/logo.png") ?>" />
        </div>
        <div class="nav_text">
            <h2>商业智能平台</h2>
        </div>
    </div>
    <div class="container_5w">
        <div class="cube cube--1">
            <div class="side side--back">
                <div class="side__inner"></div>
            </div>
            <div class="side side--left">
                <div class="side__inner"></div>
            </div>
            <div class="side side--right">
                <div class="side__inner"></div>
            </div>
            <div class="side side--top">
                <div class="side__inner"></div>
            </div>
            <div class="side side--bottom">
                <div class="side__inner"></div>
            </div>
            <div class="side side--front">
                <div class="side__inner"></div>
            </div>
        </div>

        <div class="cube cube--2">
            <div class="side side--back">
                <div class="side__inner"></div>
            </div>
            <div class="side side--left">
                <div class="side__inner"></div>
            </div>
            <div class="side side--right">
                <div class="side__inner"></div>
            </div>
            <div class="side side--top">
                <div class="side__inner"></div>
            </div>
            <div class="side side--bottom">
                <div class="side__inner"></div>
            </div>
            <div class="side side--front">
                <div class="side__inner"></div>
            </div>
        </div>

        <div class="cube cube--3">
            <div class="side side--back">
                <div class="side__inner"></div>
            </div>
            <div class="side side--left">
                <div class="side__inner"></div>
            </div>
            <div class="side side--right">
                <div class="side__inner"></div>
            </div>
            <div class="side side--top">
                <div class="side__inner"></div>
            </div>
            <div class="side side--bottom">
                <div class="side__inner"></div>
            </div>
            <div class="side side--front">
                <div class="side__inner"></div>
            </div>
        </div>
    </div>
    <?= $content ?>
</div>

<?php $this->endBody(); ?>
</body>
<!-- END BODY -->
</html>
<?php $this->endPage(); ?>

