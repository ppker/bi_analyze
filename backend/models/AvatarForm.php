<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 23:55:55
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 23:56:02
 */

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\helpers\FileHelper;
use yii\web\UploadedFile;

class AvatarForm extends Model {

    public $avatar;

    private $_user;

    public function getUser() {

        if (null == $this->_user) {
            $this->_user = Yii::$app->user->identity;
        }
        return $this->_user;
    }

    public function rules() {

        return [
            [['avatar'], 'required'],
            [['avatar'], 'file', 'extensions' => 'jpg, png, jpeg', 'maxSize' => 1024*1204*2, 'tooBig' => Yii::t('app', 'File has to be smaller than 2MB')],
        ];
    }

    public function attributeLabels() {

        return [
            'avatar' => '上传头像',
        ];
    }

    public function save() {

        if ($this->validate()) {
            $this->user->avatar = $this->avatar;
            return $this->user->save();
        }
        return false;
    }

    public function getImageFile() {

        return isset($this->user->avatar) ? Yii::$app->basePath . Yii::$app->params['avatarPath'] . $this->user->avatar : null;
    }

    public function deleteImage() {

        $file = $this->getImageFile();
        // delete the cache old avatar file
        $avatarCachePath = Yii::$app->basePath . Yii::$app->params['avatarCachePath'];

        $files = glob("{$avatarCachePath}/*_{$this->user->avatar}");
        array_walk($files, function ($file) {
            unlink($file);
        });
        if (!unlink($file)) return false;
        $this->avatar = null;
        return true;
    }

    public function uploadImage() {

        $image = UploadedFile::getInstanceByName('avatar');

        if (empty($image)) return false;
        $this->avatar = Yii::$app->security->generateRandomString() . ".{$image->extension}";
        return $image;
    }

    public function getNewUploadedImageFile() {

        $uploadAvatarPath = Yii::$app->basePath . Yii::$app->params['avatarPath'];
        FileHelper::createDirectory($uploadAvatarPath);
        return isset($this->avatar) ? $uploadAvatarPath . $this->avatar : null;
    }

    public function useDefaultImage() {

        $identicon = new \Identicon\Identicon();
        $this->avatar = $identicon->getImageDataUri($this->user->email);
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

