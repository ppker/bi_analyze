<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
            'enableSession' => false,
            'loginUrl' => null,
        ],
        /*'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
        ],*/
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
                'site/database/list' => 'site/database_list',
                'site/database_profile/<id:\d+>' => 'site/database_profile',
                // 'database/show/<menu_id:\d+>' => 'database/show',
            ],
        ],

        'assetManager' => [
            'bundles' => [
                'yii\web\JqueryAsset' => [
                    'sourcePath' => null,
                    'js' => [],
                    'depends' => [
                        'backend\assets\AppAsset'
                    ],
                ],
                'yii\bootstrap\BootstrapAsset' => [
                    'css' => []
                ],
            ], 
        ],

        'i18n' => [
            'translations' => [
                'exception*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@backend/messages',
                    'fileMap' => [
                        'app' => 'app.php',
                    ],
                ],
            ], 
        ],
        
    ],
    'params' => $params,

    // 静态加载行为供全局使用
    /*'as rbac' => [
        'class' => 'backend\behaviors\RbacBehavior',
        'allowActions' => [
            'site/login', 'site/logout', 'site/check_user', 'debug/*', 'gii/*', // 不需要进行检测
        ],
    ],*/
    
];
