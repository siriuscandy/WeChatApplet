
define([ 'jquery', 'knockout', 'text!pages/addNewxcx/add/add.html','dialogmin',
    'bootstrap','uui','ajaxCom','qrcode'
], function($, ko, template,dialogmin,b,uui,ajaxCom) {
    //接口
    var pageUrl = '/userModule/getModuleList'; //列表加载


    // 添加修改页路由
    //var detailrooter = '/downloadinfo/order/order/:resId';
   // addRouter(detailrooter);
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
             this.data.content(res.list);
            this.data.totalPages(res.pages);
            this.data.number(res.pageNum);
            this.data.totalElements(res.total);
        },
        datamodify:ko.observable({}),
        searchDate:ko.observable(),
        someValue:ko.observable(),
        orderStatus:""
    };
    viewModel.goback = function(){
        window.history.go(-1);
    };

    //取消
    viewModel.searchCancel = function(){
        viewModel.load(1);//
        viewModel.firstload=false;
    };
    viewModel.useModule = function(id){
        window.router.setRoute("/addNewxcx/adduser/adduser/"+id);
        return false;
    }
    viewModel.preview = function(id){
         window.router.setRoute("/release/ylym/ylym/"+id+"/0");
        return false;
    }
    viewModel.basicFun = function(){
        $(function(){
            $("#widget-box").delegate(".pic_zs","mouseover",function(){
                $(this).find(".brand_name").eq(0).show();
                $(this).find(".brand_detail").eq(0).show();
                $(this).find(".bghs").eq(0).show();
            }).delegate(".pic_zs","mouseout",function(){
                $(this).find(".brand_name").eq(0).show();
                $(this).find(".brand_detail").eq(0).hide();
                $(this).find(".bghs").eq(0).hide();
            });
        });
        $(function(){
            $("#widget-box").delegate(".cdList","mouseover",function(){
                $(this).find(".fzxcx").eq(0).show();
                $(this).find(".fzIconCon").eq(0).show();
            }).delegate(".cdList","mouseout",function(){
                $(this).find(".fzxcx").eq(0).show();
                $(this).find(".fzIconCon").eq(0).hide();
            });
        });
        $(function(){
            $("#widget-box").delegate(".cdLista","mouseover",function(){
                $(this).find(".scIcon").eq(0).show();
                $(this).find(".scIconCon").eq(0).show();
            }).delegate(".cdLista","mouseout",function(){
                $(this).find(".scIcon").eq(0).show();
                $(this).find(".scIconCon").eq(0).hide();
            });
        });
        $(".flCon ul li").on('click',function(){
            var _this = $(this);
            var id = _this.attr('data-id');
            viewModel.cateId = id;
            viewModel.load(1);
        })
       
    }

    viewModel.load = function(pageIndex){

        var queryData = {
            pageSize: viewModel.pagesize || 10,     //page size 每页显示条数
            pageNum: pageIndex,     //page num 当前页数         
            keywords: "",
            cateId:viewModel.cateId || 0

        };
        // var res = {
        //     status:1,
        //     data:[{
        //         id:"1",
        //         pic:"/img/pic.jpg",
        //         name:"模版1",
        //         ewm:"/img/ewm.jpg",
        //         isrelease:1
        //     },
        //     {
        //         id:"2",
        //         pic:"/img/pic.jpg",
        //         name:"模版2",
        //         ewm:"/img/ewm.jpg",
        //         isrelease:1
        //     },
        //     {
        //         id:"3",
        //         pic:"/img/pic.jpg",
        //         name:"模版3",
        //         ewm:"/img/ewm.jpg",
        //         isrelease:1
        //     },
           
        //     ]
        // }
        // viewModel.setData(res.data);
        

        ajaxCom.Loadajax('get',pageUrl,queryData,function(res){
            if(res){

                viewModel.setData(res.data);
                $(".ewmLine").each(function(e){
                    var path = "/WeChatApplet/web/template/tmp"+(e+1)+"/module/indexN.html";
                    $(this).qrcode({
                        render: "canvas", //也可以替换为table
                        width: 110,
                        height: 110,
                        text: path
                    });
                })
                var element = document.getElementById("pagination");
                var comp = new u.pagination({ el: element,showState:false,jumppage:true });
                comp.update({ totalPages: viewModel.data.totalPages(), pageSize:viewModel.pagesize || 10, currentPage:  viewModel.data.number(), totalCount: viewModel.data.totalElements() });
                comp.on('pageChange', function(pageIndex) {
                    if(viewModel.testNum(pageIndex) && pageIndex<viewModel.data.totalPages()){
                        viewModel.load(pageIndex+1,viewModel.cateId);

                    }else {
                        dialogmin("请输入正确的页码")
                    }
                });
                comp.on('sizeChange', function(arg) {
                    if(viewModel.testNum(arg[0])){
                        viewModel.pagesize = arg[0];
                        viewModel.load(1,viewModel.cateId);

                    }else {
                        dialogmin("请输入正确的数")
                    }

                });
            }else{
                dialogmin("网络错误!!");
            }
        },function(error){
           
            dialogmin("网络错误");
        })

    }
 viewModel.testNum = function(s){
        var re = /^[0-9]+$/ ;
        return re.test(s)
    }
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

    var init = function(parm) {
        var pageNum = viewModel.data.number();
        viewModel.firstload = true;
        viewModel.load(1);
        viewModel.basicFun();
        $(".header").show();
    };

    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };
});
