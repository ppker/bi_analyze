<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 22:21:44
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 22:33:04
 */

namespace common\components\rbac;


class Rule extends \yii\rbac\Rule {

    public $name = 'isAuthor';

    public function execute($user, $item, $params) {

        return true;
        return isset($params['post']) ? $params['post']->createdBy == $user : false;
    }
}