<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/9/27
 * Time: 7:50 AM
 */

namespace api\service;

use yii\base\Component;
use yii\db\Query;

class DbService extends  Component {

    protected $_custom_db = [];

    public function init() {

        parent::init();
    }

    public function get_custom_db($id) {

        if (0 == $id) return false;

        if (isset($this->_custom_db[$id]) && !empty($this->_custom_db[$id])) {
            return $this->_custom_db[$id];
        }

        $value = (new Query())->select("value")->from('setting_database')->where(['id' => (int)$id])->limit(1)->column();
        if (empty($value)) {
            return false;
        }
        $db_config = json_decode($value[0], true);

        $dsn = 'mysql:host=' . $db_config['host'] . ';dbname=' . $db_config['dbname'];
        $this_db = \Yii::createObject([
            'class' => 'yii\db\Connection',
            'dsn' => $dsn,
            'username' => $db_config['user'],
            'password' => $db_config['password'],
            'charset' => 'utf8',
        ]);
        if (empty($this_db)) {
            return false;
        } else {
            $this->_custom_db[$id] = $this_db;
            return $this->_custom_db[$id];
        }

    }

}