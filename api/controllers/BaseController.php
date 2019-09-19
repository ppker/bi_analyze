<?php

/**
 * @Author: yata
 * @Date:   2019-08-23 10:22:42
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-23 10:38:58
 */

namespace api\controllers;
use yii\rest\ActiveController;
use yii\web\Response;
use yii\filters\Cors;
use yii\filters\auth\QueryParamAuth;
use yii\db\Query;
use Yii;

class BaseController extends ActiveController {

    const OK_STATUS = 1;
    const NO_STATUS = 0;

    public $modelClass = 'common\models\User';

    public $request = null;
    public $request_params = [];


    public function init() {

        ini_set("memory_limit", "3500M");
        set_time_limit(0);
        parent::init();
        $this->request = Yii::$app->getRequest();
        $this->request_params = $this->request->getBodyParams();
    }

    public function behaviors() {

        $behaviors = parent::behaviors();
        if (isset($behaviors['authenticator'])) unset($behaviors['authenticator']);
        $behaviors['contentNegotiator']['formats']['text/html'] = Response::FORMAT_JSON; // 设置支持的相应格式 默认 json xml
        $behaviors['corsFilter'] = [
            'class' => Cors::className(),
            'cors' => [ // 跨域资源共享机制 cors
                'Origin' => ['*'],
                // 'Access-Control-Allow-Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => false, // 允许证书 https
                'Access-Control-Max-Age' => 86400, // 请求的有效时间
                // 'Access-Control-Expose-Headers' => ['*'],
            ],
        ];
        $behaviors['authenticator'] = [
            'class' => QueryParamAuth::className(),
            'optional' => ['login'],
            'tokenParam' => 'access_token',
            // except' => ['options'],
        ];
        return $behaviors;
    }

    public function beforeAction($action) {

        header("Access-Control-Allow-Origin: *");
        parent::beforeAction($action);
        return Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    }

    /**
     * 清除默认的方法
     * @return array
     */
    public function actions() {

        return [];
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    /**
     * 清除默认的verb限制
     * @return array
     */
    public function verbs() {

        return [];
    }

    /**
     * 格式化ajax的返回数据
     * @param array $data
     * @param string $type
     * @return array
     */
    public static function re_format($data = [], $type = 'json', $message = ['查询成功', '查询失败']) {

        if ('json' == $type) {
            if ((!empty($data) || is_array($data)) && $data != []) return ['success' => 1, 'message' => $message[0], 'data' => $data];
            else return ['success' => 0, 'message' => $message[1], 'data' => []];
        }
    }

    public function checkAccess($action, $model = null, $params = []) {}


    public static function CURL($url, $postData = '', $timeOut = 20, $proxy = '', $header = '') {

        $ch = curl_init();

        $options = array(
            CURLOPT_USERAGENT      => "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
            // CURLOPT_USERAGENT      => "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0",
            CURLOPT_TIMEOUT        => $timeOut,
            CURLOPT_RETURNTRANSFER => true, // 成功只返回结果，不自动输出内容
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => 1,
            // CURLOPT_FOLLOWLOCATION => true, 这个是关于重定向的
        );

        if ("https" == substr($url, 0, 5)) {
            $options[CURLOPT_SSL_VERIFYPEER] = false;
            $options[CURLOPT_SSL_VERIFYHOST] = false;
        }

        //代理
        if ($proxy) {
            $options[CURLOPT_PROXY] = $proxy;
            $options[CURLOPT_PROXYTYPE] = CURLPROXY_SOCKS5;
        }

        //post
        if (!empty($postData)) {
            // 对$postData数据进行处理
            $postData = http_build_query($postData);
            $options[CURLOPT_POST] = true;
            $options[CURLOPT_POSTFIELDS] = $postData;
            $options[CURLOPT_HTTPHEADER] = ['Content-Type: application/x-www-form-urlencoded; charset=UTF-8', 'Content-Length: ' . strlen($postData)];

            // if (!empty($header)) $options[CURLOPT_HTTPHEADER] = $header; // 注入头部信息
            $options[CURLOPT_ENCODING] = 'gzip'; // 解码
        }
        if (!empty($header)) $options[CURLOPT_HTTPHEADER] = $header; // 注入头部信息
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);


        $info = curl_getinfo($ch);
        $err = curl_error($ch);
        if ($info['http_code'] !== 200) {
            $err = curl_error($ch);
            // var_dump($err);die;
            Yii::info(var_export($err, true));
            Yii::info("哈哈哈，MR.Robot find some errors!");
        }
        curl_close($ch);
        return $info['http_code'] !== 200 ? false : $result;
    }

}