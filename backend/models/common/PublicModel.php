<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 22:50:37
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 22:50:43
 */

namespace backend\models\common;
use yii\base\Component;

class PublicModel extends Component {

    public static function list_to_tree ($list, $pk = 'id', $pid = 'pid', $child = '_child', $root = 0) {

        $tree = [];
        if (is_array($list)) {
            $refer = [];
            foreach ($list as $key => $data) {
                $refer[$data[$pk]] = & $list[$key];
            }
            foreach ($list as $key => $data) {
                $parentId = $data[$pid];
                if ($root == $parentId) {
                    $tree[] = & $list[$key];
                } else {
                    if (isset($refer[$parentId])) {
                        $parent = & $refer[$parentId];
                        $parent[$child][] = & $list[$key];
                    }
                }
            }
        }

        return $tree;
    }

}