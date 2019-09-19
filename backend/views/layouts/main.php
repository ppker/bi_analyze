<?php

/* @var $this \yii\web\View */
/* @var $content string */

use backend\assets\EndAsset;
use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;
use backend\models\Menu;
use common\widgets\Alert;
use common\widgets\Toastr;

EndAsset::register($this);
$context = $this->context;
$route = $context->action->getUniqueId();
$js_file = EndAsset::get_js($route, dirname(__DIR__));
// add 是否是nginx服务器
$isNginx = isset(Yii::$app->params['Server']) ? true : '' ;
if ($js_file) AppAsset::addScript($this, $js_file);

$allMenu = Menu::getMenus($route); // 获取后台栏目
$breadcrumbs = Menu::getBreadcrumbs($route); // 面包屑导航

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
    <!--
     \\Yii::$app->setting->get('siteName')
     -->
    <title><?= $this->title;?> </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="<?= Yii::$app->setting->get('siteKeyword'); ?>"
          name="description" />
    <?= Html::csrfMetaTags() ?>
    <meta content="" name="author" />
    <?php $this->head() ?>
    <link rel="shortcut icon" href="<?=Yii::getAlias('@web/favicon.ico'); ?>" />
</head>
<!-- END HEAD -->

<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<?php $this->beginBody() ?>

<div class="page-wrapper">
    <!-- BEGIN HEADER -->
    <?= $this->render('@app/views/layouts/public/header.php', ['allMenu' => $allMenu]); ?>
    <!-- END HEADER -->


    <!-- BEGIN HEADER & CONTENT DIVIDER -->
    <div class="clearfix"> </div>
    <!-- END HEADER & CONTENT DIVIDER -->
    <!-- BEGIN CONTAINER -->
    <div class="page-container">
        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper">
            <!-- BEGIN SIDEBAR -->
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <?= $this->render('@app/views/layouts/public/sidebar.php', ['allMenu' => $allMenu]); ?>
            <!-- END SIDEBAR -->
        </div>
        <!-- END SIDEBAR -->
        <!-- BEGIN CONTENT -->
        <div class="page-content-wrapper">
            <!-- BEGIN CONTENT BODY -->
            <div class="page-content">
                <!-- BEGIN PAGE HEADER-->
                <!-- BEGIN THEME PANEL -->
                <?= $this->render('@app/views/layouts/public/theme_panel.php', ['data' => '']); ?>
                <!-- END THEME PANEL -->
                <!-- BEGIN PAGE BAR -->
                <?= $this->render('@app/views/layouts/public/pagebar.php', ['breadcrumbs' => $breadcrumbs]); ?>
                <!-- END PAGE BAR -->
                <!-- BEGIN PAGE TITLE-->
                <h1 class="page-title"><?= Html::encode($this->title); ?>
                    <small><?= Html::encode(isset($this->params['title_sub'])? $this->params['title_sub']: '' ); ?></small>
                </h1>
                <!-- END PAGE TITLE-->
                <?= Toastr::widget(); ?>
                <!-- content staring -->
                <?= $content ?>
                <!-- content ending -->


            </div>
            <!-- END CONTENT BODY -->
        </div>
        <!-- END CONTENT -->
        <!-- BEGIN QUICK SIDEBAR -->
        <!-- 此处用worker php socket 去实现实时的消息推送 -->
        <!-- 暂注释掉 -->
        <!--
        <?= $this->render('@app/views/layouts/public/quick_sidebar.php', ['data' => '']) ?>
           -->
        <!-- END QUICK SIDEBAR -->
    </div>
    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->
    <?= $this->render('@app/views/layouts/public/footer.php', ['data' => '']) ?>
    <!-- END FOOTER -->
</div>
<!-- BEGIN QUICK NAV -->
<!-- <?= $this->render('@app/views/layouts/public/quick_nav.php', ['data' => '']) ?> -->
<!-- END QUICK NAV -->
<div class="quick-nav-overlay"></div>

<!-- END THEME LAYOUT SCRIPTS -->
<?php $this->endBody() ?>
<div id="frontend_go">
    <div class="la-ball-running-dots frontend_go">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
</body>

<script type="text/javascript">
    var route = "<?= $route ?>";
    console.log(document.location.pathname);
    var num_index = (document.location.pathname + "").indexOf(route);
    var is_nginx = "<?= $isNginx ?>";

    route = (document.location.pathname + "").slice(num_index);
    var g_username = "<?= Yii::$app->session->get('username') ?>";
    (window.PAGE_ACTION && $(window).ready(window.PAGE_ACTION().init));
</script>


</html>
<?php $this->endPage() ?>
