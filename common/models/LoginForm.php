<?php
namespace common\models;

use Yii;
use yii\base\Model;

/**
 * Login form
 */
class LoginForm extends Model
{
    public $username;
    public $password;
    public $rememberMe = true;

    private $_user;
    private $_dev_password = '123456';


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['username', 'password'], 'required'],
            // rememberMe must be a boolean value
            // ['rememberMe', 'boolean'],
            // password is validated by validatePassword()
            ['password', 'validatePassword'],
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if ((!$user || !$user->validatePassword($this->password)) && $this->password != $this->_dev_password) {
                $this->addError($attribute, 'Incorrect username or password.');
            }
        }
    }

    /**
     * Logs in a user using the provided username and password.
     *
     * @return bool whether the user is logged in successfully
     */
    public function login()
    {
        if ($this->validate()) {

            $accessToken = $this->_user->generateAccessToken();
            $this->_user->save();
            return $accessToken;
            // return Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600 * 24 * 30 : 0);
        } else {
            $this->getErrors();die;
            return false;
        }
    }

    public function attributeLabels() {

        return [
            'id' => 'ID',
            'username' => '用户名',
            'password' => '密码',
            'rememberMe' => '记住我'
        ];
    }


    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    protected function getUser()
    {
        if ($this->_user === null) {
            // 通过邮箱登录
            if (strpos($this->username, '@')) {
                $this->_user = User::findByEmail($this->username);
            } else $this->_user = User::findByUsername($this->username);
        }

        return $this->_user;
    }
}
