
define([ 'jquery', 'knockout', 'text!pages/product/edit/edit.html','dialogmin',
'ajaxcommon','uploader'
], function($, ko, template,dialogmin,ajaxcommon,WebUploader) {
   
    var viewModel = {
        data :  ko.observable({}),
        agreementNum:ko.observable(),
        commitTime:ko.observable(),
        buyerInfo : ko.observable({}),
        billDetail:ko.observable({}),
        someValue:ko.observable(),
        openDatainfo: ko.observable({})
    };
   
    viewModel.goback = function(){
        window.history.go(-1);
    };
    viewModel.updata = function(){
        $("iframe").contents().find("#GoupdateModule").click();
    };
    viewModel.UpdateLogo = function(){ //LOGO上传

            var up = WebUploader.create({

                server: $ctx+'/userModule/uploadImg',
                swf: $ctx+'/web/trd/uploader/swf/Uploader.swf?v=' + Math.random(),
                pick: '.ChangeImgBtn',
                accept: [ //可以接受的文件类型，数组
                    {
                        title: 'Images',
                        extensions: 'jpg,jpeg,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    }
                ],
                auto: true,
                compress: false,
                fileSingleSizeLimit:200*1024
            });
            up.on("error",function (type){
                if (type=="Q_TYPE_DENIED"){
                    dialogmin("请上传图片格式文件");
                }else if(type=="F_EXCEED_SIZE"){
                    dialogmin("文件大小不能超过200k");
                }else if(type=="Q_EXCEED_NUM_LIMIT"){
                    dialogmin("文件个数不能超过10");
                }
            });
            up.on( 'uploadSuccess', function( file, res ) {
                if(res.fileName != '-1'){  // -1  表示文件太大，没有上传
                    $(".img-responsive").attr("src",res.fileName);
                    var ClassImg = $(".img-responsive").attr("data-id");
                    viewModel.temIframe.find("."+ClassImg).find("img").attr("src",res.fileName);
                }
            });
            up.on( 'uploadError', function( file ) {
                dialogmin('上传失败');
            });
           
            up.on( 'fileQueued', function( file ) {
                if( file.size > 1024*200) {
                    dialogmin("文件大小不能超过200k");
                    return false;
                }

            });
        };
    viewModel.ChangeTextBtn = function(){
        $(".ChangeTextBtn").click(function(){
            var ClassText = $(".xgtxt").attr("data-id");
            var TextVal =$(".xgtxt").val();
            if(TextVal==""){
                dialogmin("请输入文字")
                return false
            }
             viewModel.temIframe.find("."+ClassText).html(TextVal);
        })
    }
    viewModel.preview = function(){
        window.router.setRoute("/release/ylym/ylym/"+viewModel.id+"/"+viewModel.userModuleId);
        return false;
    }
    viewModel.create = function(){
        window.router.setRoute("/release/scym/scym/"+viewModel.id+"/"+viewModel.id2+"/"+viewModel.userModuleId);
        return false;
    }
    viewModel.GoDetail = function(){
        var Iframe_url = '/WeChatApplet/web/template/infoDetail/xq.html?did='+viewModel.id2+'';
        $("iframe").attr("src",Iframe_url);
    }
    viewModel.GoIndex = function(){
        var Iframe_url = '/WeChatApplet/web/template/tmp'+viewModel.id+'/index.html?uid='+viewModel.userModuleId+'';
        $("iframe").attr("src",Iframe_url);
    }
    viewModel.load = function(){
        var orderData = ''
//        var jsObj = {};
        $.ajax({
            type: 'get',
            dataType: 'json',
            async: false,
            url: pageUrl + viewModel.id,
            success: function(res) {
                if(res.status == 1) {
                    orderData = res;
//                    jsObj = JSON.parse(res.data.billDetail);
                    viewModel.data(orderData.data);

                } else {
                   // dialogmin("面议申请详情查询失败!");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
    }
    var init = function(parm){
        viewModel.id = parm[0];
        viewModel.id2 = parm[1];
        viewModel.userModuleId = parm[2];
        //viewModel.load();
        viewModel.UpdateLogo();
        viewModel.ChangeTextBtn();
        var Iframe_url = '/WeChatApplet/web/template/tmp'+viewModel.id+'/index.html?uid='+viewModel.userModuleId+'&isedit=true';
        $("iframe").attr("src",Iframe_url);
        $(".header").hide();
        $(".bjHeader").show();
        $("iframe").load(function(){
            viewModel.temIframe = $("iframe").contents()
        })
       
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };


});