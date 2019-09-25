<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/9/24
 * Time: 11:31 PM
 */

use yii\widgets\ActiveForm;
use yii\helpers\Url;

$this->title = '数据源详情';
$this->params['title_sub'] = '数据源详情页面';
?>

<div class="row">
    <div class="col-md-12">
        <!-- Begin: life time stats -->
        <div class="portlet light portlet-fit portlet-datatable bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-green"></i>
                    <span class="caption-subject font-green sbold uppercase">数据源详情</span>
                </div>
                <div class="actions">

                </div>
            </div>
            <div class="portlet-body">
                <div class="table-container">
                    <table class="table table-striped table-bordered table-hover" id="table">

                    </table>
                </div>
            </div>
        </div>
        <!-- End: life time stats -->
    </div>
</div>


<!--模态框-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">编辑导入配置</h4>
            </div>
            <div class="modal-body">
                <form id="editForm" role="form" data-toggle="validator" class="form-horizontal">
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
                            <button type="submit" class="btn red" id="btn-save">保存</button>
                            <button type="submit" class="btn yellow" id="btn-test">测试连接</button>


                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>