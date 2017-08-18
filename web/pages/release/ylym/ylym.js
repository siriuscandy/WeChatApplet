
define([ 'jquery', 'knockout', 'text!pages/release/ylym/ylym.html','dialogmin','ajaxcommon'
,'qrcode','jqueryzclip'
], function($, ko, template,dialogmin,ajaxcommon,qrcode,zclip) {
    //接口
    var pageUrl = '/licensecarrier/getlislist/carrier'; //列表加载


    // 添加修改页路由
    var detailrooter = '/recharge/detail/detail/:resId';
    addRouter(detailrooter);
    var viewModel = {
        data : ko.observableArray()

    };
    viewModel.goback = function(){
        window.history.go(-1);
    };
    viewModel.load = function(pageIndex,isreset){

    }
    viewModel.copykey = function(){
            $('.encryptionKey_copy').zclip({
                path: $ctx+'/web/trd/jquery-zclip/ZeroClipboard.swf',
                copy: function(){//复制内容
                    return $('.encryptionKey').val();
                },
                afterCopy: function(){//复制成功
                    dialogmin('复制成功');
                }
            });

    };
    var init = function(parm) {
        viewModel.id = parm[0];
        viewModel.userModuleId = parm[1];
        if(viewModel.userModuleId==0){
        var Iframe_url = '/WeChatApplet/web/template/tmp'+viewModel.id+'/module/indexN.html?';
        }else{
        var Iframe_url = '/WeChatApplet/web/template/tmp'+viewModel.id+'/index.html?uid='+viewModel.userModuleId;
        }
        $("iframe").attr("src",Iframe_url);
        $(".fzlj .shurubox").val(Iframe_url)
        $("#preview-code").qrcode({
            render: "canvas", //也可以替换为table
            width: 160,
            height: 160,
            text: 'http://v.tixaapp.com'+Iframe_url
        });
        $(".header").hide();
        $(".bjHeader").show();
        viewModel.copykey();
    };


    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };


});