<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/9/2
 * Time: 11:49 PM
 */

namespace common\models;

use Yii;
use common\components\db\ActiveRecord;

class SettingDatabase extends ActiveRecord {

    public static function tableName() {

        return '{{%setting_database}}';
    }

    public function rules() {

        return [
            [['id', 'user_id', 'sort', 'status'], 'integer'],
            [['type', 'name'], 'string', 'max' => 64],
            [['value'], 'string']
        ];
    }

    public function attributeLabels() {

        return [
            'id' => 'ID',
            'user_id' => 'UserId',
            'type' => 'Type',
            'name' => 'Name',
            'value' => 'Value',
            'sort' => 'Sort',
            'status' => 'status',
            'create_at' => 'CreateAt',
            'update_at' => 'UpdateAt',

        ];
    }


}