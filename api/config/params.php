<?php
return [
    'adminEmail' => 'admin@example.com',

    'api_rule_user' => [
        'GET,POST index' => 'index',
        'GET,POST login' => 'login',
        'GET,POST database' => 'database',
        'POST database_add' => 'database_add',
        'GET,POST database_list' => 'database_list',
        'GET database_get' => 'database_get',
        'POST database_del' => 'database_del',
        'GET,POST database_upload' => 'database_upload',
        'GET,POST database_profile' => 'database_profile',




        'GET,POST user_add' => 'user_add', // 新增账号
        'GET,POST user_del' => 'user_del', // 删除账号 需关联权限
        'GET,POST user_get' => 'user_get', // 获取用户信息
        'GET,POST user_reset' => 'user_reset', // 重置密码
        'GET,POST user_auth' => 'user_auth', // 用户授权
        'GET,POST access_index' => 'access_index', // 角色获取
        'GET,POST access_add' => 'access_add', // 角色添加
        'GET,POST access_get' => 'access_get', // 角色获取
        'GET,POST access_del' => 'access_del', // 角色删除
        'GET,POST user_setuser' => 'user_setuser', // 修改用户自己的密码
        //
    
    ],

];
