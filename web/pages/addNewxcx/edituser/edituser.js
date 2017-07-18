
define([ 'jquery', 'knockout', 'text!pages/addNewxcx/edituser/edituser.html','dialogmin',
    'bootstrap','uui','ajaxCom'
], function($, ko, template,dialogmin,b,uui,ajaxCom) {
    //接口
    var submitUrl = '/userModule/updateUser?userId='; //提交修改用户
    var pageUrl = '/userModule/getUserDetail?userId=';//请求数据
    
    var viewModel = {
        data:ko.observable({}),
        
    };
    viewModel.goback = function(){
        window.history.go(-1);
    };
    
    viewModel.submit = function(){
        var queryData  = {
            username:viewModel.data().username,
            password:viewModel.data().password,
            
            customername:viewModel.data().customername,
            telephone:viewModel.data().telephone,
            orderid:viewModel.data().orderid,
           // keyword:viewModel.data().keyword,
            num:viewModel.data().num,
            keyword:viewModel.data().keyword,
            userId:viewModel.id,
            usermoduleId:viewModel.usermoduleid
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
                    url: $ctx + submitUrl+viewModel.id,
                    dataType: 'json',
                    success: function (res) {
        //ajaxCom.Loadajax('post',submitUrl,queryData,function(res){
                        if(res){
                            dialogmin("修改成功")
                        }
               
                    }
                })
    }
    viewModel.load = function(){
         ajaxCom.Loadajax('get',pageUrl+viewModel.id,"",function(res){
                viewModel.data(res.data.list)
         })
    }
    var init = function(parm) {
        viewModel.id = parm[0];
        viewModel.usermoduleid = parm[1];
        viewModel.load();
        $(".header").show();
        
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };
});
