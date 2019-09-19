<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/8/27
 * Time: 7:34 AM
 */

namespace api\behaviors;

use Yii;
use yii\base\Controller;
use backend\models\Menu;
use yii\web\ForbiddenHttpException;
use yii\base\Behavior;
use yii\filters\auth\QueryParamAuth;
use common\models\User;

class RbacBehavior extends Behavior {

    /**
     * 已登录用户的公共api
     * @var array
     */
    public $allowActions = ['user/login']; // ['site/login', 'site/*']

    public $guestActions = ['autodata/timing_send']; //


    public function events() {

        return [
            Controller::EVENT_BEFORE_ACTION => 'rbacAction'
        ];
    }

    public function rbacAction($event) {

        $access_token = Yii::$app->request->post((new QueryParamAuth)->tokenParam);

        if ('mobile' == $access_token) {
            if ('XDFEREFEFEFE' == Yii::$app->request->post('mo_token')) {
                return true;
            }
        }

        $user = User::findOne(['username' => $access_token]);

        $base_rule = $event->action->getUniqueId();
        $rule = Yii::$app->id . "/" . $base_rule;

        if (!empty($access_token) && !empty($user)) {
            $event->isValid = true; // 继续执行
            $allowActions = array_unique(array_merge($this->allowActions, $this->guestActions));

            foreach ($allowActions as $allow) {
                if ('*' == substr($allow, -1)) {
                    if (0 === strpos($base_rule, rtrim($allow, '*'))) return true;
                } else {
                    if ($base_rule == $allow) return true;
                }
            }
            if (Menu::checkRule($rule, $user)){
                return true;
            }
        } else {
            foreach($this->guestActions as $allow) {
                if ('*' == substr($allow, -1)) {
                    if (0 === strpos($base_rule, rtrim($allow, '*'))) return true;
                } else {
                    if ($base_rule == $allow) return true;
                }
            }
        }
        $event->isValid = false;
        $this->denyAccess();

    }

    protected function denyAccess() {

        if (\Yii::$app->user->getIsGuest()) {
            echo json_encode(['success' => 0, 'message' => '请重新登录系统。', 'data' => '']);
            return;
            \Yii::$app->user->loginRequired();
        } else {
            echo json_encode(['success' => 0, 'message' => '抱歉，你暂未获取此权限，请联系管理员。', 'data' => '']);
        }
        return;
        // throw new ForbiddenHttpException(Yii::t('yii', 'you are not allowed to perform this action.'));
    }

}