<?php
/**
 * Created by PhpStorm.
 * User: ppker
 * Date: 2017/7/11
 * Time: 13:54
 * Desc:
 */

use backend\assets\Login2Asset;
use backend\assets\EndAsset;
use backend\assets\AppAsset;
use yii\helpers\Html;

Login2Asset::register($this);

$context = $this->context;

$route = $context->action->getUniqueId();

$js_file = EndAsset::get_js($route, dirname(__DIR__));

// add 是否是nginx服务器
$isNginx = isset(Yii::$app->params['Server']) ? true : '' ;
if ($js_file) AppAsset::addScript($this, $js_file);

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
<div id="jsi-cards-container" class="container"></div>
<div class="block_head" style="">
    <div class="head_log">
        <div class="nav_log">

            <img class="login-logo" src=" <?= Yii::getAlias("@web/static/images/login/logo.png") ?>" />

        </div>
        <div class="nav_text" style="color: #32c5d2;">
            <h2>阿尔法BI决策平台</h2>
        </div>

    </div>
    <?= $content ?>
</div>
<?php $this->endBody(); ?>
</body>
<script type="text/javascript">
    var route = "<?= $route ?>";
    var num_index = (document.location.pathname + "").indexOf(route);
    var is_nginx = "<?= $isNginx ?>";

    route = (document.location.pathname + "").slice(num_index);
    var g_username = "<?= Yii::$app->session->get('username') ?>";
    (window.PAGE_ACTION && $(window).ready(window.PAGE_ACTION().init));
</script>
<!-- END BODY -->
</html>
<?php $this->endPage(); ?>