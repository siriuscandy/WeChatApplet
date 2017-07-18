
define([ 'jquery', 'knockout', 'text!pages/addNewxcx/adduser/adduser.html','dialogmin',
    'bootstrap','uui','ajaxCom'
], function($, ko, template,dialogmin,b,uui,ajaxCom) {
    //接口
    var submitUrl = '/userModule/addUser'; //提交生成用户
    var addUrl = '/userModule/addModule';//生成新模版
    
    var viewModel = {
        data:ko.observable({}),
        
    };
    viewModel.goback = function(){
        window.history.go(-1);
    };
    viewModel.addmodule = function(id){
        var queryData={
            moduleId:viewModel.id,
            userId:id
        }
        ajaxCom.formajax('post',addUrl,queryData,function(res){
            if(res){
               window.router.setRoute("/product/list/list");
                
            }
               
        },function(error){
           
            dialogmin("网络错误");
        })
    }
    viewModel.submit = function(){
        var queryData  = {
            username:viewModel.data().username,
            password:viewModel.data().password,
            templateid:viewModel.id,
            customername:viewModel.data().customername,
            telephone:viewModel.data().telephone,
            orderid:viewModel.data().orderid,
           // keyword:viewModel.data().keyword,
            num:viewModel.data().num,
            keyword:viewModel.data().keyword,
        }
        if(queryData.customername==null||queryData.customername==""){
                dialogmin('请填写客户姓名');
                return false
        }if(queryData.telephone==null||queryData.telephone==""){
                dialogmin('请填写联系方式');
                return false
        }if(queryData.orderid==null||queryData.orderid==""){
                dialogmin('请填写合同编号');
                return false
        }if(queryData.keyword==null||queryData.keyword==""){
                dialogmin('请填写项目名称');
                return false
        }if(queryData.username==null||queryData.username==""){
                dialogmin('请填写后台账号');
                return false
        }if(queryData.password==null||queryData.password==""){
                dialogmin('请填写后台密码');
                return false
        }

        $.ajax({
                    type: 'post',
                    data: queryData,
                    contentType: 'application/x-www-form-urlencoded',
                    url: $ctx + submitUrl,
                    dataType: 'json',
                    success: function (res) {
        //ajaxCom.Loadajax('post',submitUrl,queryData,function(res){
                        if(res){
                            viewModel.addmodule(res.data.uid)
                        }
               
                    }
                })
    }
    var init = function(parm) {
        viewModel.id = parm[0];
        $(".header").show();
        
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };
});
