
define([ 'jquery', 'knockout', 'text!pages/release/scym/scym.html','dialogmin','uploader'
], function($, ko, template,dialogmin,WebUploader) {
    //接口
    var pageUrl = '/userModule/packageModule'; //打包
    var UpdataUrl = '/userModule/basicSettings'; //上传
    var GetUrl = '/userModule/getUserModuleDetail'; //获取信息
    
    
    var viewModel = {
        data :  ko.observable({}),
        
    };
    viewModel.goback = function(){
        window.history.go(-1);
    };
    
    viewModel.UpdateLogo = function(){ //LOGO上传

            var up = WebUploader.create({

                server: $ctx+'/userModule/uploadImg',
                swf: $ctx+'/web/trd/uploader/swf/Uploader.swf?v=' + Math.random(),
                pick: '.up',
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
                    $(".img-responsive").attr("src",'http://v.tixaapp.com/WeChatApplet'+res.fileName);

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
    viewModel.package = function(){//下载包
       
        var qdata = {
            userModuleId:viewModel.userModuleId,
            userId:viewModel.id2,
        };
        window.open($ctx+pageUrl+"?userModuleId="+qdata.userModuleId+"&userId="+qdata.userId);
        dialogmin("打包成功")
       
    };
   
    viewModel.submit = function(){
      
        var qdata = {
            userModuleId:viewModel.userModuleId,
            applyName:viewModel.data().applyName || "",
            applyDescription: viewModel.data().applyDescription || "",
            logo:$(".img-responsive").attr("src") || ""
        };
        if(qdata.applyName==null||qdata.applyName==""){
                dialogmin('请填写应用名称');
                return false
        }
        $.ajax({
            type : 'POST',
            dataType : 'json',
            async : false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:qdata,
            url :$ctx+ UpdataUrl,
            success : function(res) {
                if(res){
                   viewModel.package();
                    

                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //dialogmin("调用服务报错!!");
            }
        });
    };
    viewModel.load = function(){
        
        $.ajax({
            type : 'get',
            dataType : 'json',
            url :$ctx+ GetUrl+'?userModuleId='+viewModel.userModuleId,
            success : function(res) {
                if(res){
                   viewModel.data(res.data.list);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //dialogmin("调用服务报错!!");
            }
        });
    };

    
    var init = function(parm){
        viewModel.id = parm[0];
        viewModel.id2 = parm[1];
        viewModel.userModuleId = parm[2];
        viewModel.load();
        viewModel.UpdateLogo();
        var Iframe_url = 'http://v.tixaapp.com/WeChatApplet/web/template/tmp'+viewModel.id+'/index.html?uid='+viewModel.userModuleId;
        $("iframe").attr("src",Iframe_url);
        $(".header").hide();
        $(".bjHeader").show();
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };


});