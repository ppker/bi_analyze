<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 09:01:46
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 09:20:20
 */

namespace backend\controllers;

use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use common\models\User;
use yii\db\Query;

class SiteController extends BaseController {

    public $defaultAction = 'database';

	public function behaviors() {

        return parent::behaviors();
    }

    public function beforeAction($action) {

        if (parent::beforeAction($action)) {

            if (('login' == $action->id || 'error' == $action->id) && Yii::$app->user->isGuest)
                $this->layout = 'main-login3';
            return true;
        } return false;
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionIndex() {

    	return $this->render('index');
    }

    public function actionDatabase() {

        return $this->render('database');
    }

    public function actionDatabase_list() {

        return $this->render('database_list');
    }

    public function actionLogin() {

    	if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }
        $model = new LoginForm();
        // var_dump(Yii::$app->getRequest()->post());die;
        if ([] == Yii::$app->getRequest()->post()) {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            $username = Yii::$app->session->has('username');
            if ($username) Yii::$app->session->remove('username');
            else Yii::$app->session->set('username', Yii::$app->request->post('LoginForm')['username']);
            // 进行条件过滤操作
            return $this->_goto_url();
            // return $this->goBack();
        } else {
            // $this->layout = 'main-login';
            return $this->render('login', [
                'model' => $model,
                'error' => '账号或密码不对',
            ]);
        }
    }

}



