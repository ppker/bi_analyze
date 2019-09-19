<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 00:09:36
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-21 00:09:40
 */

namespace common\models;

use Yii;
use common\components\db\ActiveRecord;

class Menu extends ActiveRecord {

    public static function tableName() {

        return '{{%menu}}';
    }

    public function rules() {

        return [
            [['pid', 'sort', 'hide', 'status'], 'integer'],
            [['title', 'group'], 'string', 'max' => 50],
            [['url'], 'string', 'max' => 255]
        ];
    }

    public function attributeLabels() {

        return [
            'id' => 'ID',
            'title' => 'Title',
            'pid' => 'Pid',
            'sort' => 'Sort',
            'url' => 'Url',
            'hide' => 'Hide',
            'group' => 'Group',
            'status' => 'Status'
        ];
    }


}