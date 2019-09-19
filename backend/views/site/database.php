<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/8/28
 * Time: 10:54 PM
 */



use yii\widgets\ActiveForm;
use yii\helpers\Url;

$this->title = '数据导入管理';
$this->params['title_sub'] = '导入自己的数据';
?>

<div class="row">
    <div class="tabbable-custom">
        <ul class="nav nav-tabs">
            <li class="active">
                <a href="#tab_1_1" data-toggle="tab"> 数据库 </a>
            </li>
            <li>
                <a href="#tab_5_2" data-toggle="tab"> 文件数据 </a>
            </li>
            <li>
                <a href="#tab_5_3" data-toggle="tab"> 数据统计 </a>
            </li>
            <li>
                <a href="#tab_5_4" data-toggle="tab"> 公共数据 </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab_1_1">

                <div class="row">
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">Mysql</div>
                            <p class="ribbon-content">Mysql数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">Oracle</div>
                            <p class="ribbon-content">Oracle数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">SQLServer</div>
                            <p class="ribbon-content">SQLServer数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">Hive</div>
                            <p class="ribbon-content">Hive数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">PostgreSQL</div>
                            <p class="ribbon-content">PostgreSQL数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">MongoDB</div>
                            <p class="ribbon-content">MongoDB数据库</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="db"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane" id="tab_5_2">
                <div class="row">
                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">Excel</div>
                            <p class="ribbon-content">Excel文件数据</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="file-excel"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-2 col-md-4 col-xs-12">
                        <div class="mt-element-ribbon bg-grey-steel">
                            <div class="ribbon ribbon-color-primary uppercase">CSV</div>
                            <p class="ribbon-content">CSV文件数据</p>
                            <div style="text-align:center;">
                                <a href="javascript:;" class="btn btn-sm red btn-db-import" data-type="file-csv"> 导入
                                    <i class="fa fa-user"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="tab_5_3">
                <p> 数据统计 </p>
            </div>

            <div class="tab-pane" id="tab_5_4">
                <p> 公共数据 </p>
            </div>
        </div>
    </div>
</div>


<!--模态框-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">导入配置</h4>
            </div>
            <div class="modal-body">
                <form id="addForm" role="form" data-toggle="validator" class="form-horizontal">
                    <input type="hidden" name="<?= Yii::$app->getRequest()->csrfParam; ?>" value="<?= Yii::$app->getRequest()->getCsrfToken(); ?>">
                    <input type="hidden" name="id" value="" >
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="title" class="control-label col-sm-3">数据源名称</label>
                            <div class="col-sm-8">
                                <input type="text" value="" placeholder="请输入源名称" class="form-control" name="name" minlength="1" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="host" class="control-label col-sm-3">数据库地址(域名或ip)</label>
                            <div class="col-sm-8">
                                <input type="text" value="" placeholder="请输入数据库地址" class="form-control" name="host" required />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="port" class="control-label col-sm-3">端口</label>
                            <div class="col-sm-8">
                                <input type="text" value="" placeholder="请输入端口号" class="form-control" name="port" required />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="user" class="control-label col-sm-3">用户名</label>
                            <div class="col-sm-8">
                                <input type="text" value="" placeholder="请输入用户名" class="form-control" name="user" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="passwd" class="control-label col-sm-3">密码</label>
                            <div class="col-sm-8">
                                <input type="password" value="" placeholder="请输入密码" class="form-control" name="password" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dbname" class="control-label col-sm-3">数据库名字</label>
                            <div class="col-sm-8">
                                <input type="text" value="" placeholder="请输入数据库名字" class="form-control" name="dbname" required />
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-12 col-md-12 text-center">
                            <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                            <button type="submit" class="btn red" id="btn-save">添加</button>
                            <button type="submit" class="btn yellow" id="btn-test">测试连接</button>


                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>