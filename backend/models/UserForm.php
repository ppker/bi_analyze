<?php

/**
 * @Author: yata
 * @Date:   2019-08-21 00:04:05
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-23 11:42:54
 */

namespace backend\models;

use Yii;
use common\models\User;

class UserForm extends User {

    public static function tableName() {
        return '{{%user}}';
    }

    public function rules() {

        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 3, 'max' => 16],

            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            // ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This email address has already been taken.'],

            // ['password_hash', 'required'],
            ['password_hash', 'string', 'min' => 6],
        ];
    }

    public function attributeLabels() {

        return [
            'id' => 'Id',
            'username' => 'Username',
            'auth_key' => 'Auth Key',
            'sex' => 'Sex',
            'avatar' => 'Avatar',
            'signature' => 'Signature',
            'password_hash' => 'Password Hash',
            'password_reset_token' => 'Password Reset Token',
            'email' => 'Email',
            'status' => 'Status',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * 重载了load方法，因为我是手动构造的form表单
     * @param array $data
     * @param null $formName
     * @return bool
     */
    public function load($data = [], $formName = null) {
        if (empty($data)) return false;
        $this->setAttributes($data);
        return true;
    }


}


