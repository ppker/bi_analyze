<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \common\models\LoginForm */

use yii\helpers\Html;
?>
<form id="login-form" method="post" role="form" data-toggle="validator" novalidate="true">
    <input type="hidden" name="<?= Yii::$app->getRequest()->csrfParam; ?>" value="<?= Yii::$app->getRequest()->getCsrfToken(); ?>">
    <div class="alert alert-danger display-hide">
        <button class="close" data-close="alert"></button>
        <span>输入你的用户名和密码 </span>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <input class="form-control form-control-solid placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Username" name="username" required/> </div>
        <div class="col-xs-6">
            <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" autocomplete="off" placeholder="Password" name="password" required/> </div>
    </div>
    <div class="row">
        <div class="col-sm-4">
            <div class="rem-password" style="color: red">
                <label class="rememberme mt-checkbox mt-checkbox-outline">
                    <input type="hidden" name="rememberMe" value="0" />
                    <input type="checkbox" name="rememberMe" value="1" checked /> 记住我
                    <span></span>
                </label>
                <span style="position: absolute; left: 168px; width: 135px;"><?php if(isset($error)): ?><?= $error;?><?php else:?><?php endif;?></span>
            </div>
        </div>
        <div class="col-sm-8 text-right">
            <div class="forgot-password">
                <?= Html::a('忘记密码', ['site/request-password-reset'], ['id' => 'forget-password', 'class' => 'forget-password']) ?>
            </div>
            <button class="btn green" type="submit" style="margin-top: 4px;">登录</button>
        </div>
    </div>
</form>
