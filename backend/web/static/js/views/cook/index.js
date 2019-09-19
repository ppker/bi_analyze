/**
 * Created by PhpStorm.
 * User: ZhiPeng
 * Github: https://github.com/ppker
 * Date: 2017/3/9
 */

window.PAGE_ACTION = function() {
    "use strict";

    var init_limit = null, // 默认条件页面
        img_upload = null, // 图片上传
        btn_add = null,
        btn_submit = null,
        btn_edit = null,
        image_del = null,
        b_u_delete = null,
        btn_del = null; // 单个删除的按钮

    init_limit = function() {
        ZP.api.cook_index({
            data: null,
            successCallBack:function(result){

                if(ZP.utils.isArray(result.data)){

                    ZP.utils.render("cook/cook_index.html", {
                        list: result.data
                    },function(html){
                        var table = $("#table");
                        table.html(html);
                        var t = table.DataTable({
                            // dom: '<"html5buttons"B>lTfgitp',
                            "order": [[ 0, "asc" ]],
                            oLanguage: ZP.define.dataTableLan,
                            bStateSave: ZP.define.dataTableStateSave,
                            // "stripeClasses": [ 'strip1', 'strip2'],
                            "ordering": true,
                            // dom: 'Tfgtpi',
                            scrollX: false,
                            ScrollCollapse: true,
                            buttons: [
                                { extend: 'print', className: 'btn dark btn-outline' },
                                { extend: 'copy', className: 'btn red btn-outline' },
                                { extend: 'pdf', className: 'btn green btn-outline' },
                                { extend: 'excel', className: 'btn yellow btn-outline ' },
                                { extend: 'csv', className: 'btn purple btn-outline ' },
                                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
                            ],
                            responsive: true,
                            "lengthMenu": [15, 30, 100],
                            destroy: true
                        });

                        $('#sample_3_tools > li > a.tool-action').on('click', function() {
                            var action = $(this).attr('data-action');
                            t.button(action).trigger();
                        });
                        // 全选
                        ZP.utils.init_page_module();
                        ZP.utils.btn_all_del('hotel_del');
                        btn_add(); // 弹出模态框
                        btn_submit(); // 绑定提交的表单
                        btn_del();
                        btn_edit();
                        img_upload();
                        b_u_delete();
                    });


                }
            },
            failCallBack: ZP.utils.failCallBack
        });
    };

    btn_add = function() {
        $("#btn_add").on('click', function() {
            $("#addModal").modal('show');
        });
    };


    btn_edit = function() { // 编辑操作
        $("table tr .btn-group li").on("click", "a[actionrule='edit']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.hotel_get({
                    data: {id: $id},
                    successCallBack: function(result){

                        $("#addModal h4.modal-title").text('编辑餐厅');
                        $("#addModal input[name='name']").val(result.data.name).after("<input type='hidden' name='id' value=" + $id + ">").removeAttr('data-remote data-remote-error');
                        $("#addModal input[name='phone']").val(result.data.phone);
                        $("#addModal input[name='hate']").val(result.data.hate);
                        $("#addModal input[name='open_time']").val(result.data.open_time);
                        $("#addModal input[name='close_time']").val(result.data.close_time);
                        $("#addModal select#hotel_status").val(result.data.status);
                        $("#addModal input[name='address']").val(result.data.address);
                        $("#addModal input[name='star']").val(result.data.star);
                        $("#addModal input[name='zan']").val(result.data.zan);
                        $("#addModal textarea[name='mark']").val(result.data.mark);
                        $("#addModal input[name='hotel_photo']").val(result.data.photo);
                        $("#hotel_photo").attr("src", "http://" + window.location.host + "/frontend/web/images/" + result.data.photo);
                        $("div.b-u-img-div").css("display", "block");
                        $("#addModal").modal('show');
                        // ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    b_u_delete = function() {

        $("a.b-u-delete").on("click", function() {
            var imgpath = $("input#h_hotel_photo").val();
            ZP.api.image_del({
                data: {file: imgpath},
                successCallBack: function(result){
                    $("input#h_hotel_photo").val("");
                    $("div.b-u-img-div").remove();
                },
                failCallBack: ZP.utils.failCallBack
            });
            e.preventDefault();
        });
    };



    btn_submit = function() {
        var $form = null;
        $form = $("form#addForm");
        $form.submit(function(e){
            //表单验证
            if(ZP.utils.isPassForm($form)){
                $("#addModal").modal('hide');
                ZP.api.hotel_add({
                    data: $form.serializeJson(),
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
            e.preventDefault();
        });
    };

    btn_del = function() { // 单个删除按钮

        $("table tr .btn-group li").on("click", "a[actionrule='del']", function() {
            var $id = $(this).attr("actionid");
            if ($id) {
                ZP.api.hotel_del({
                    data: {id: $id},
                    successCallBack: function(result){
                        ZP.utils.alert_warning(result.message, true);
                    },
                    failCallBack: ZP.utils.failCallBack
                });
            }
        });
    };

    image_del = function () { // 删除图片

        $("table.table-image").on('click', "button.b-delete", function(e) {
            var imgpath = $("input#h_hotel_photo").val();
            var $this = $(this);
            ZP.api.image_del({
                data: {file: imgpath},
                successCallBack: function(result){
                    $("input#h_hotel_photo").val("");
                    $this.parent().parent().remove();
                },
                failCallBack: ZP.utils.failCallBack
            });
            e.preventDefault();
        });
    };



    img_upload = function () { // 图片上传

        $('#fileupload').fileupload({
            maxNumberOfFiles: 1,
            // disableImageResize: false,
            autoUpload: false,
            disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            url: '/backend/web/upload/upload',
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            done: function (e, data) {
                $("input#h_hotel_photo").val(data.result.data);
                $("button.b-delete").removeAttr("disabled");
            },
            always: function (e, data) {
                $("#fileupload").removeClass('fileupload-processing');
            },
            send: function (e, data) {
                $('#fileupload').addClass('fileupload-processing');
            }

        });

        // Enable iframe cross-domain access via redirect option:
        $('#fileupload').fileupload(
            'option',
            'redirect',
            window.location.href.replace(
                /\/[^\/]*$/,
                '/cors/result.html?%s'
            )
        );

        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                        new Date())
                    .appendTo('#fileupload');
            });
        }
        image_del();

    };





    return {
        init: function (){
            init_limit();
        }
    };


}