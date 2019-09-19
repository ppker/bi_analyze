<?php

/**
 * @Author: yata
 * @Date:   2019-08-20 23:56:54
 * @Last Modified by:   yata
 * @Last Modified time: 2019-08-20 23:57:07
 */

namespace backend\models;

use Yii;
use yii\helpers\ArrayHelper;
use backend\models\common\PublicModel;
use backend\models\AuthDepends;

class Menu extends \common\models\Menu {

    public static $end_menu_list = [];
    public function rules() {

        return ArrayHelper::merge(parent::rules(), [
            [['title', 'url'], 'required']
        ]);
    }

    /**
     * 检测权限
     * @param $rule
     * @return bool
     */
    public static function checkRule($rule, $user = null) {

        if (!empty($user)) { // 针对api的权限验证
            if (Yii::$app->params['adminId'] == $user->id || "" == $rule) return true;
            $user_model = Yii::$app->user;
            $user_model->setIdentity($user);
            if (!$user_model->can($rule)) return false;
            return true;
        }

        if (Yii::$app->params['adminId'] == Yii::$app->user->id || "" == $rule) {
            return true;
        }
        if (!\Yii::$app->user->can($rule)) {
            return false;
        }
        return true;
    }

    public static function getMenus($rule = 'index/index') {

        $menus = [];
        // 获取顶层主菜单
        $menus['main'] = static::find()->where(['pid' => 0, 'hide' => 0])->orderBy('sort ASC')->asArray()->all();
        $menus['child'] = []; // 左栏的菜单

        $nav = static::getBreadcrumbs($rule);

        // 获取当前active主菜单对应的左菜单
        foreach($menus['main'] as $key => $item) {
            if (!is_array($item) || empty($item['title']) || empty($item['url'])) {
                // throw error
            }
            // 过滤权限
            /*if (!static::checkRule($item['url'])) {
                unset($menus['main'][$key]);
                continue;
            }*/
            // 获取当前acive菜单的子菜单项
            if ($nav[0]['id'] == $item['id']) {
                // 高亮
                $menus['main'][$key]['class'] = 'active';
                // 获取二级菜单
                $second_menu = static::find()->where(['pid' => $item['id'], 'hide' => 0])->orderBy('sort ASC')->asArray()->all();

                // var_dump($second_menu);die;
                // 过滤二级菜单的权限
                if ($second_menu && is_array($second_menu)) {
                    foreach($second_menu as $skey => $check_menu) {
                        /*if (!static::checkRule($check_menu['url'])) {
                            unset($second_menu[$skey]);
                            continue;
                        }*/
                    }
                }
                // 生成child树 二级菜单的group
                $groups = static::find()->select(['group'])->distinct()->where(['pid' => $item['id'], 'hide' => 0])
                    ->asArray()->column();

                foreach($groups as $k => $g) {
                    $menuList = static::find()
                        ->where(['pid' => $item['id'], 'hide' => 0, 'group' => $g, 'url' => $second_menu])
                        ->orderBy('sort ASC')->asArray()->all();

                    list($g_name, $g_icon) = strpos($g, '|') ? explode('|', $g) : [$g, 'icon-cogs'];
                    $menus['child'][$k]['name'] = $g_name;
                    $menus['child'][$k]['icon'] = $g_icon;
                    $menus['child'][$k]['_child'] = PublicModel::list_to_tree($menuList, 'id', 'pid', 'operator', $item['id']);

                    // var_dump($menuList);die;
                    // 生成三级菜单child
                    foreach($menuList as $k3 => $item3) {
                        // 获取三级菜单的权限
                        $three_menu = static::find()->where(['pid' => $item3['id'], 'hide' => 0])->orderBy('sort ASC')->asArray()->all();
                        // 过滤三级菜单的权限
                        if ($three_menu && is_array($three_menu)) {
                            foreach($three_menu as $skey3 => $check_menu3) {
                                if (!static::checkRule($check_menu3['url'])) {
                                    unset($three_menu[$skey3]);
                                    continue;
                                }
                            }
                        }

                        // 生成child树 三级菜单的group
                        $groups3 = static::find()->select(['group'])->distinct()->where(['pid' => $item3['id'], 'hide' => 0])
                            ->asArray()->column();
                        foreach($groups3 as $g_k3 => $g3) {
                            $menuList3 = static::find()
                                ->where(['pid' => $item3['id'], 'hide' => 0, 'group' => $g3, 'url' => $three_menu])
                                ->orderBy('sort ASC')->asArray()->all();
                            list($g_name3, $g_icon3) = strpos($g3, '|') ? explode('|', $g3) : [$g3, 'icon-cogs'];

                            foreach($menus['child'][$k]['_child'] as $search_k => $search_item) {
                                foreach ($three_menu as $tiem33) {
                                    if ($search_item['id'] == $tiem33['pid']) {
                                        $menus['child'][$k]['_child'][$search_k]['__child'][] = $tiem33;
                                        $menus['child'][$k]['_child'][$search_k]['icon'] = $g_icon3;
                                        $menus['child'][$k]['_child'][$search_k]['name'] = $g_name3;
                                    }
                                }

                            }
                        }

                    }
                }

            }
        }

        /*var_dump($menus['child'][1]['_child']);die;
        var_dump($menus);die;*/
        return $menus;
    }

    public static function get_node_list($id = 0, $level = '') {

        // 获取所有的一级
        if (0 != $id) $level .= "---";
        $stair = static::find()->where(['pid' => $id])->orderBy('sort asc')->asArray()->all();
        if (!empty($stair) && is_array($stair)) {
            foreach ($stair as $key => $value) {
                $value['title'] = $level . $value['title'];
                array_push(self::$end_menu_list, $value);
                $parentId = $value['id'];
                $son = static::find()->where(['pid' => $parentId])->orderBy('sort asc')->asArray()->all();
                if (!empty($son) && is_array($son)) {
                    $son_level = $level . "---";
                    foreach ($son as $k => $v) {
                        $v['title'] = $son_level . $v['title'];
                        array_push(self::$end_menu_list, $v);
                        static::get_node_list($v['id'], $son_level);
                    }
                }
            }
        }
    }


    public static function getBreadcrumbs($rule = 'index/index') {

        $rule = strtolower($rule);
        $current = static::find()->select('id')->where(['and', 'pid != 0', ['like', 'url', $rule]])->asArray()->one();
        $nav = static::getParentMenus($current['id']);
        return $nav;
    }

    public static function getParentMenus($id) {

        $path = [];
        $nav = static::find()->select(['id', 'pid', 'title'])->where(['id' => $id])->asArray()->one();
        $path[] = $nav;
        if ($nav['pid'] > 0) {
            $path = array_merge(static::getParentMenus($nav['pid']), $path);
        }
        return $path;
    }
    public static function returnNodes($tree = true) {

        static $tree_nodes = [];
        if ($tree && !empty($tree_nodes[intval($tree)])) {
            return $tree_nodes[intval($tree)];
        }
        if ($tree) {
            /*$list = (new \yii\db\Query)->select(['id', 'pid', 'title', 'url', 'hide'])
                ->from(Menu::tableName())
                ->orderBy(['sort' => SORT_ASC])->all();*/
            $list = static::find()->select(['id', 'pid', 'title', 'url', 'hide'])->with('apito')->orderby(['sort' => SORT_ASC])->asArray()->all();
            $nodes = PublicModel::list_to_tree($list, $pk = 'id', $pid = 'pid', $child = 'child', $root = 0);
        } else {
            $modes = (new \yii\db\Query())
                ->select(['id', 'hide', 'title', 'url', 'pid'])
                ->from(Menu::tableName())
                ->orderBy(['sort' => SORT_ASC])->all();
        }
        $tree_nodes[intval($tree)] = $nodes;
        return $nodes;
    }

    public function getApito() {

        return $this->hasMany(AuthDepends::className(), ['page_url' => 'url']);
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

