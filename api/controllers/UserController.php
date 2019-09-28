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
use yii\web\UploadedFile;


use yii\db\Query;
use yii\helpers\ArrayHelper;
use Yii;
use common\models\LoginForm;
use yii\helpers\Url;
use api\service\FileService;
use api\service\DbService;

class UserController extends BaseController {

    const DATABASE_STATUS = ['1' => '正常', '0' => '删除'];
    const SOURCE_FILE = 'file';


    protected $_settingDatabase = null;
    protected $_DbService = null;

    public function init() {

        parent::init();
        $this->_settingDatabase = new SettingDatabase();
        $this->_DbService = new DbService();
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

        $list = (new Query())->select('*')->from('setting_database')->where(['status' => 1])->orderBy(['update_at' => SORT_ASC])->all();
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

    // database_upload
    public function actionDatabase_upload() {

        $result = "";
        $excel_file = UploadedFile::getInstanceByName('excel_file');
        if (empty($excel_file)) $excel_file = UploadedFile::getInstanceByName('csv_file');
        if ($excel_file && property_exists($excel_file, 'tempName') && property_exists($excel_file, 'name')) {
            // 读取excel内的数据 注入到数据库当中
            $file_server = new FileService();
            $result = $file_server->readExcel($excel_file->tempName, $excel_file->name);
        }

        if ($result) {
            return ['success' => 1, 'message' => '导入数据成功！', 'data' => []];
        } else return ['success' => 0, 'message' => '导入数据失败!', 'data' => []];

    }

    // database_profile
    public function actionDatabase_profile() {

        $dbid = $this->request->get();
        var_dump($dbid);die;
    }




    // database_tables
    public function actionDatabase_tables($only_get = false) {

        $post_data = $this->request->post();
        $dbid = $post_data['id'] ?? 0;
        if (isset($post_data['source_type']) && self::SOURCE_FILE == $post_data['source_type']) { // 文件类型资源
            if (isset($post_data['table_name']) && !empty($post_data['table_name'])) {
                $table_data = \Yii::$app->bi_analyze_import->createCommand("select * from `" . $post_data['table_name']  . "`")->queryAll();
                if (!empty($table_data)) {
                    $head = array_keys($table_data[0]);
                    $limit = array_map(function($arr) {
                        return array_values($arr);
                    }, $table_data);
                    $out_data = ['head' => $head, 'limit' => $limit];
                } else $out_data = ['head' => [], 'limit' => []];

            } else $out_data = ['head' => [], 'limit' => []];

            return ['success' => 1, 'message' => '查询成功', 'data' => $out_data];

        }

        $this_db = $this->_DbService->get_custom_db($dbid);
        if (!$this_db) return ['success' => 0, 'message' => '查看失败!', 'data' => []];

        $tables = $this_db->createCommand("show tables")->queryAll();

        $head = [key($tables[0])];
        $use_tables = array_map(function($arr) {
            return array_values($arr);
        }, $tables);

        // 有个tables 数组
        return ['success' => 1, 'message' => '链接成功', 'data' => ['head' => $head, 'limit' => $use_tables]];

    }

    // data_tables
    public function actionData_tables() {

        $dbid = $this->request->post('db_id');
        $table = $this->request->post('table_name');

        $this_db = $this->_DbService->get_custom_db($dbid);
        if (!$this_db) return ['success' => 0, 'message' => '查看失败!', 'data' => []];

        $datas = $this_db->createCommand("select * from `" . $table . "`")->queryAll();
        if (empty($datas)) return ['head' => [], 'limit' => []];
        $head = array_keys(current($datas));
        $limit = array_map(function($v) {
            return array_values($v);
        }, $datas);

        return ['success' => 1, 'message' => '查询成功', 'data' => ['head' => $head, 'limit' => $limit]];

    }


}