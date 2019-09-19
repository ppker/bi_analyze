<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 22:47:52
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 22:48:01
 */

namespace backend\controllers;

use Yii;
use yii\web\NotFoundHttpException;
use yii\helpers\Url;
use backend\models\Menu;
use backend\models\AvatarForm;

class UserController extends BaseController {

    public function init() {

        parent::init();

    }

    public function actionIndex() {

        return $this->render('index');
    }

    public function actionAccess() {

        $url = Url::to(['user/access_set', 'role' => '']);

        return $this->render('access', ['bind_data' => ['to_url' => $url]]); // 绑定的jump url to js app
    }

    public function actionAccess_set($role) {

        if ($role) {
            if (Yii::$app->request->isPost) {
                $rules = Yii::$app->request->post('rules');
                if (!$get_role = Yii::$app->authManager->getRole($role)) {
                    $this->flash('抱歉,操作失败!', 'error');

                }
                Yii::$app->authManager->removeChildren($get_role); // 删除所有的子节点
                if (is_array($rules)) {
                    $rules = array_unique($rules);
                    foreach ($rules as $rule) {
                        $item = Yii::$app->authManager->getPermission($rule);
                        if (empty($item)) {
                            $item = Yii::$app->authManager->createPermission($rule);
                            $item->description = "创建了 $rule 的权限";
                            Yii::$app->authManager->add($item);
                        }
                        Yii::$app->authManager->addChild($get_role, $item);

                    }
                }
                $this->success(['message' => '恭喜你操作成功!', 'type' => 'success', 'url' => ['user/access']]);
                // $this->flash('恭喜你操作成功!', 'success', ['user/access']);
                // return $this->redirect(['user/access']);
                // $this->success(['title' => '系统消息', 'message' => '恭喜你操作成功!', 'url' => Url::toRoute(['user/access']), 'time' => 1]);
            }
            $node_list  = Menu::returnNodes();

            $auth_rules = Yii::$app->authManager->getChildren($role);

            $auth_rules = array_keys($auth_rules);

            return $this->render('access_set',[
                'node_list' => $node_list,
                'auth_rules' => $auth_rules,
                'role' => $role,
            ]);

        }else throw new NotFoundHttpException("页面错误缺少参数！");


    }


    public function actionSetuser() {

        $model = Yii::createObject(AvatarForm::className());

        if ($model->load(Yii::$app->request->post())) {
            if ($model->user->avatar) {
                $model->deleteImage();
            }
            $image = $model->uploadImage();
            $hasError = true;
            if ($image !== false) {
                $path = $model->getNewUploadedImageFile();
                if ($image->saveAs($path)) $hasError = false;
            }
            if ($hasError) $model->useDefaultImage();

            if (false === $model->save()) $hasError = true;
            if ($hasError) Yii::$app->session->setFlash('error', '您的头像更新失败');
            else Yii::$app->session->setFlash('success', '您的头像更新成功');
            return $this->refresh();
        }

        return $this->render('setuser', [
            'model' => $model
        ]);
    }

}

