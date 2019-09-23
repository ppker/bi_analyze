<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/9/22
 * Time: 9:53 PM
 */

namespace api\service;

use yii\db\Migration;

class SqlMigrationService extends  Migration {

    public function init() {

        $this->db = 'bi_analyze_import';
        parent::init();
        $this->compact = true;
    }


    /**
     * @desc 创建导入文件数据表
     * @param $field_data
     * @param $user_id
     * @return bool
     */
    public function createFileTable($field_data, $user_id) {

        if (empty($field_data) || !is_array($field_data)) return false;
        // 创建数据表
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }
        $table_key = array_map(function($str) {
            return substr($str, 0, 1);
        }, $field_data);
        $table_name = $user_id . '_' . implode("", $table_key) . strval(time());

        $table_field_struct = [];
        $table_field_struct['id'] = $this->primaryKey();
        foreach ($field_data as $value) {
            $table_field_struct[$value] = $this->string()->notNull()->defaultValue("");
        }

        $this->createTable('{{%' . $table_name . '}}', $table_field_struct, $tableOptions);

        return ['table_name' => $table_name];
    }

    /**
     * @desc 批量表插入文件数据
     * @param $table_name
     * @param $row_header
     * @param $normal_row
     * @return bool
     */
    public function batchInsertData($table_name, $row_header, $normal_row) {

        if (empty($table_name) || empty($row_header) || empty($normal_row)) {
            return false;
        }

        $db = $this->db;

        $transaction = $db->beginTransaction();
        try {
            $re1 = $db->createCommand()->batchInsert('{{%' . $table_name . '}}', $row_header, $normal_row)->execute();
            $transaction->commit();
            return true;
        } catch (\Exception $e) {
            $transaction->rollBack();
            return false;
        }

    }





}