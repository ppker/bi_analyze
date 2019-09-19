<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 22:57:31
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-23 11:07:48
 */

namespace api\controllers;

use common\models\User;
use common\models\SettingDatabase;


use yii\db\Query;
use yii\helpers\ArrayHelper;
use Yii;
use common\models\LoginForm;
use yii\helpers\Url;

class UserController extends BaseController {

    const DATABASE_STATUS = ['1' => '正常', '0' => '删除'];

    protected $_settingDatabase = null;

    public function init() {

        parent::init();
        $this->_settingDatabase = new SettingDatabase();
    }

	public function actionLogin() {

        $model = new LoginForm();
        $data = [];

        if ($model->load(Yii::$app->request->post(), '') && $access_token = $model->login()) {
            $default_url = Url::to("/admin/site/database");
            $host = Yii::$app->getRequest()->hostInfo;
            $data = ['access_token' => $access_token, 'jump' => $host . $default_url];
        }
        return parent::re_format($data, 'json', ['登录成功', '登录失败']);
	}

	public function actionDatabase() {

	    return parent::re_format(['say' => '阿朱你想我么'], 'json');
    }

    public function actionDatabase_add() {

        $data = Yii::$app->request->post();

        $data = $this->_makeDatabaseData($data);
        // 组装数据
        $model = new SettingDatabase();
        if (empty($data['id'])) { // 新增
            unset($data['id']);

            if ($model->load($data, '') && $model->save()) {
                return ['success' => 1, 'message' => '配置成功!', 'data' => []];
            } else {
                return ['success' => 0, 'message' => '配置失败！', 'data' => []];
            }

        } else { // 修改
            $dataOne = $this->_settingDatabase->findOne((int)$data['id']);
            if (!empty($dataOne)) {
                if ($dataOne->load($data, '') && $dataOne->update()) {
                    return ['success' => 1, 'message' => '更新成功！', 'data' => []];
                }
            }
            return ['success' => 0, 'message' => '更新失败！', 'data' => []];
        }
    }

    public function actionDatabase_list() {

        $list = (new Query())->select('*')->from('setting_database')->where(['type' => 'database', 'status' => 1])->all();
        if (!empty($list) && is_array($list)) {
            foreach ($list as &$v) {
                $v['status'] = self::DATABASE_STATUS[$v['status']];
                $v['value'] = json_decode($v['value'], true);
            }
        }
        return parent::re_format($list);
    }

    // database_get
    public function actionDatabase_get() {

	    $id = $this->request->get('id', 0);
	    if (!$id) {
            return ['success' => 0, 'message' => '查询失败,参数异常！', 'data' => []];
        }
        $result = (new Query())->select('*')->from('setting_database')->where(['id' => (int)$id])->one();
	    if (isset($result['value'])) {
            $result['value'] = json_decode($result['value'], true);
        }
	    return parent::re_format($result);
    }

    // database_del
    public function actionDatabase_del() {

        $id = $this->request->post('id', 0);
        if (!$id) {
            return ['success' => 0, 'message' => '删除失败,参数异常！', 'data' => []];
        }
        $model = SettingDatabase::findOne($id);
        $model->status = 0;
        if ($model->save()) {
            return ['success' => 1, 'message' => '删除成功！', 'data' => []];
        }
        return ['success' => 0, 'message' => '删除失败！', 'data' => []];

    }


    protected function _makeDatabaseData($data = []) {

        $value = [
            'host' => $data['host'] ?? "",
            'port' => $data['port'] ?? "",
            'user' => $data['user'] ?? "",
            'password' => $data['password'] ?? "",
            'dbname' => $data['dbname'] ?? "",
        ];
	    return  [
            'id' => $data['id'] ?? "",
	        'user_id' => 0,
            'type' => 'database',
            'name' => $data['name'] ?: "",
            'sort' => 0,
            'value' => json_encode($value, JSON_UNESCAPED_UNICODE),
        ];

    }

}