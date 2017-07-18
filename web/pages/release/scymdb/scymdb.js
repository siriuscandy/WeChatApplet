
define([ 'jquery', 'knockout', 'text!pages/release/scymdb/scymdb.html','dialogmin','ajaxCom'
], function($, ko, template,dialogmin,ajaxCom) {
    //接口
    var pageUrl = '/yonyoucloud/isvOrders'; //列表加载
    var openorderUrl = '/yonyoucloud/openorder'; //列表加载
    var modifyAmountUrl = '/yonyoucloud/modifyAmount'//改价
    var pageOneUrl = '/yonyoucloud/getOne?agreementNum='; //单条订单加载

    // 添加修改页路由
    var detailrooter = '/shopping/order/order/:resId';
    addRouter(detailrooter);
    var viewModel = {
        data : {
            content : ko.observableArray([]),
            totalPages : ko.observable(),
            number : ko.observable(),
            openDatainfo:ko.observable({}),
            totalElements : ko.observable()
        },
        searchText : ko.observable(),
        setData : function(res) {
            this.data.content(res.content);
            this.data.totalPages(res.totalPages);
            this.data.number(res.number + 1);
            this.data.totalElements(res.totalElements);
        },
        datamodify:ko.observable({}),
        searchDate:ko.observable(),
        someValue:ko.observable(),
        orderStatus:"",
        billStatus:"",
        openStatus:""
    };
    //返回上一页
    viewModel.goback = function(){
        window.history.go(-1);
    };



    viewModel.godetail = function(id){
        window.router.setRoute("/shopping/order/order/"+id);
        return false;
    };

    viewModel.stopEvent = function(){ //阻止冒泡事件
        function getEvent(){
            if(window.event){return window.event;}
            func=getEvent.caller;
            while(func!=null){
                var arg0=func.arguments[0];
                if(arg0){
                    if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                        || arg0.constructor==KeyboardEvent)
                        ||(typeof(arg0)=="object" && arg0.preventDefault
                            && arg0.stopPropagation)){
                        return arg0;
                    }
                }
                func=func.caller;
            }
            return null;
        }
        var e=getEvent();
        if(window.event){
            //e.returnValue=false;//阻止自身行为
            e.cancelBubble=true;//阻止冒泡
        }else if(e.preventDefault){
            //e.preventDefault();//阻止自身行为
            e.stopPropagation();//阻止冒泡
        }
    };

    viewModel.modifyAmount = function(agreementNum){
        var newAmount = $('.newPrice').val();
        var data = {
            "agreementNum":agreementNum,
            "newAmount":newAmount,
            "isAjax":1,
        }
        ajaxCom.asyncajax('post',modifyAmountUrl,JSON.stringify(data),function(res){
            if(res.status==1){
                $('.newPrice').val("");
                $('.totle_p').text("");
                $('.pub_pop,.big_bg').hide();
                if($(".orderlist_nav span").eq(0).hasClass("active")){
                	viewModel.load(0,"","");
                }else if($(".orderlist_nav span").eq(1).hasClass("active")){
                	viewModel.load(0,1,"");
                }else{
                	viewModel.load(0,2,"");
                }
                if($(".billlist_nav span").eq(0).hasClass("active")){
                	viewModel.load(0,"","");
                }else if($(".billlist_nav span").eq(1).hasClass("active")){
                	viewModel.load(0,"",0);
                }else{
                	viewModel.load(0,"",1);
                }
                dialogmin('修改成功!');
                /* addRouter("/shopping/orderlist/orderlist");
                 window.router.init();*/
            }else{
                alert(res.msg || "改价失败，请刷新页面!");
                $('.pub_pop,.big_bg').hide();
            }
        },function(error){
            var res = JSON.parse(error.responseText)
            dialogmin(res.msg || "改价输入错误");
        })

    };

    var init = function(parm) {
        var pageNum = viewModel.data.number();
        viewModel.firstload = true;
        //viewModel.load(0,"");
        $(".header").hide();
        $(".bjHeader").show();
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };
});
