define([ 'jquery', 'knockout', 'text!pages/product/list/list.html','dialogmin','bootstrap','uui'
,'ajaxCom','dialogminBack'], 
function($, ko, template,dialogmin,b,uui,ajaxCom,dialogminBack) {
    var listUrl = '/userModule/getUserModuleList'; //列表页加载
    var deleteAUrl = '/userModule/deleteUserModuleByID?id='
    
    var viewModel = {
        data : {
            content : ko.observableArray([]),
            totalPages : ko.observable(),
            number : ko.observable(),
            totalElements : ko.observable()
        },
        searchText : ko.observable(),
        setData : function(res) {
            this.data.content(res.list);
            this.data.totalPages(res.pages);
            this.data.number(res.pageNum);
            this.data.totalElements(res.total);
        }
        
    };
   viewModel.preview = function(id,userModuleId){
       window.router.setRoute("/release/ylym/ylym/"+id+"/"+userModuleId);
        
        return false;
    }
    viewModel.goadduser = function(userId,id){
        window.router.setRoute("/addNewxcx/edituser/edituser/"+userId+"/"+id);
        return false;
    }
    viewModel.del = function(id){
        dialogminBack('是否删除小程序？',function(isok) {
            if (isok) {
                $.ajax({
                    type: 'post',
                    //data: data,
                    //contentType: 'application/json',
                    url: $ctx + deleteAUrl+id,
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            dialogmin('删除成功!')
                            viewModel.data.content([]);
                            viewModel.load(1);
                            
                        } else {
                            dialogmin('网络请求失败')
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        dialogmin("网络请求失败!!");

                    }
                });
            }
        });
    }
    viewModel.testNum = function(s){
        var re = /^[0-9]+$/ ;
        return re.test(s)
    }
    
    viewModel.load = function(pageIndex){
        
    	viewModel.firstLode = false;
        var queryData = {
            pageSize: viewModel.pagesize||9,     //page size 每页显示条数
            pageNum: pageIndex,    //page num 当前页数
            keywords: ""    //page num 当前页数
            
        };
        // var res = {
        //     status:1,
        //     data:[{
        //         id:"1",
        //         pic:"/img/pic.jpg",
        //         name:"小程序1",
        //         createtime:"2017-2-2",
        //         isrelease:1
        //     },
        //     {
        //         id:"2",
        //         pic:"/img/pic.jpg",
        //         name:"小程序2",
        //         createtime:"2017-2-2",
        //         isrelease:1
        //     },
        //     {
        //         id:"3",
        //         pic:"/img/pic.jpg",
        //         name:"小程序3",
        //         createtime:"2017-2-2",
        //         isrelease:0
        //     }
           
        //     ]
        // }
        //viewModel.setData(res.data);
        ajaxCom.Loadajax('get',listUrl,queryData,function(res){
                
                    viewModel.setData(res.data);
                    var element = document.getElementById("pagination");
                    var comp = new u.pagination({ el: element,showState:false,jumppage:true });
                    comp.update({ totalPages: viewModel.data.totalPages(), pageSize: viewModel.pagesize || 10, currentPage:  viewModel.data.number(), totalCount: viewModel.data.totalElements() });
                    comp.on('pageChange', function(pageIndex) {
                        //viewModel.load(pageIndex,viewModel.status);
                        if(viewModel.testNum(pageIndex) && pageIndex<viewModel.data.totalPages()){
                            viewModel.load(pageIndex+1);
                        }else {
                            dialogmin("请输入正确的页码")
                        }
                    });
                    comp.on('sizeChange', function(arg) {
                    	if(viewModel.testNum(arg[0])){
                            viewModel.pagesize = arg[0];
                            viewModel.load(1);

                        }else {
                            dialogmin("请输入正确的数")
                        }
                    });
                
            },function(error){
            
                dialogmin("网络错误");
        })
    }

    viewModel.stopEvent = function(){ //阻止冒泡事件
        function getEvent(){
            if(window.event)    {return window.event;}
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
    viewModel.edit = function(id,userId,userModuleId){
        
        window.router.setRoute("/product/edit/edit/"+id+"/"+userId+"/"+userModuleId);
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
        $(function(){
            $("#widget-box").delegate(".fzxcx","mouseover",function(){
                $(this).find(".blackbg").show();
                $(this).find(".tanchu").show();
            }).delegate(".fzxcx","mouseout",function(){
                $(this).find(".blackbg").hide();
                $(this).find(".tanchu").hide();
            });
        });
        $(".fzxcx").click(function(){//点击弹框显示
            $(".blackbg").show();
            $(".tanchu").show();
        })
        $(".gbBnt").click(function(){//弹框关闭
            $(".blackbg").hide();
            $(".tanchu").hide();
        })
        $(".scIcon").click(function(){//点击弹框显示
            $(".blackbgA").show();
            $(".tanchuA").show();
        })
        $(".gbBnt").click(function(){//弹框关闭
            $(".blackbgA").hide();
            $(".tanchuA").hide();
        })
    }

    var init = function(parm) {
        var pageNum = viewModel.data.number();
        viewModel.firstLode = true;
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
