<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 22:03:35
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 22:45:38
 */

namespace backend\controllers;

use Yii;
use yii\db\Query;
use common\components\Controller;
use yii\web\NotFoundHttpException;

class BaseController extends Controller {

    protected $_report_title = "暂无-数据报表";
    protected $_report_sub_title = "暂无-报表数据";


    public function init() {

        // ini_set("memory_limit", "3500M");
        // set_time_limit(0);
        parent::init();
    }


    public function success($data = []) {
        Yii::$app->session->set('zp_alert', $data);
        if (isset($data['url']) && !empty($data['url'])) {
            Yii::$app->end(0, $this->redirect($data['url']));
        }
    }

    public function flash($message, $type = 'info', $url = null) {

        Yii::$app->getSession()->setFlash($type, $message);
        if (null != $url) {
            Yii::$app->end(0, $this->redirect($url));
        }
    }

    public function actionShow($menu_id = null) {

        $menu_data = (new Query())->select('menu.*')->from('database_sql')->where('database_sql.id = :id', [':id' => intval($menu_id)])->join('left join', 'menu', 'menu.id = database_sql.menu_id')->one();

        return $this->render('/common/show', [
            'sql_id' => intval($menu_id),
            'title' => isset($menu_data['title']) ? $menu_data['title'] : $this->_report_title,
            'title_sub' => isset($menu_data['group']) ? explode("|", $menu_data['group'])[0] : $this->_report_sub_title,
        ]);
    }

}

