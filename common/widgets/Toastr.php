<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 09:00:12
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 09:00:19
 */

namespace common\widgets;

use Yii;

class Toastr extends \yii\bootstrap\Widget
{

    public $app = '';

    public $data = ['title' => '操作提示', 'message' => '操作成功', 'url' => '', 'type' => 'success', 'time' => 1500];

    public function init()
    {
        parent::init();
        $this->data = array_merge($this->data, Yii::$app->session->get('zp_alert', []));
    }

    public function run()
    {

        if (empty(Yii::$app->session->get('zp_alert'))) return false;
        Yii::$app->session->remove('zp_alert');
        if ($this->app) {
            $this->data = ['title' => '温馨提示', 'message' => '请您先登录网站，再进行相关操作。', 'url' => '', 'type' => 'success', 'time' => 1500, 'place' => 'toast-bottom-right'];
        }
        $this->render('toastr', ['data' => $this->data, 'app' => $this->app]);
    }

}
