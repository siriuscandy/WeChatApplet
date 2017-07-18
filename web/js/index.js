require(['jquery', 'knockout','dialogminBack', 'bootstrap', 'director','moment'],
    function($, ko,dialogminBack) {
       var winW = document.documentElement.clientWidth || document.body.clientWidth;
        
        window.addRouter = function(path, func) {
            var pos = path.indexOf('/:');
            var truePath = path;
            if (pos != -1)
                truePath = path.substring(0,pos);
            func = func || function() {
                var params = arguments;
                initPage('pages' + truePath,params);
            };
            var tmparray = truePath.split("/");
            if(tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]){
                return;
            }else{
                router.on(path, func);
            }
        };

        window.router = Router();
        initRouter();
        menuleftClass();
       window.router.init();
        
        function initPage(p, id) {
            var module = p;
            requirejs.undef(module);
            require([module], function(module) {
                ko.cleanNode($('.content')[0]);
                $('.content').html('');
                $('.content').html(module.template);
                if(module.model){
                    module.model.data.content = ko.observableArray([]);
                    ko.applyBindings(module.model, $('.content')[0]);
                    module.init(id);
                }else{
                    module.init(id, $('.content')[0]);
                }
             
            });
        }
        function initView(p, id) {
            var module = p;
            requirejs.undef(module);
            require([module], function(module) {
                ko.cleanNode($('.Upview')[0]);
                $('.Upview').html('');
                $('.Upview').html(module.template);
                if(module.model){
                    module.model.data.content = ko.observableArray([]);
                    ko.applyBindings(module.model, $('.Upview')[0]);
                    module.init(id);
                }else{
                    module.init(id, $('.Upview')[0]);
                }
               
            });
        }





    function initRouter(){
            addRouter("/addNewxcx/add/add");
            addRouter("/addNewxcx/adduser/adduser/:id");
            addRouter("/addNewxcx/edituser/edituser/:id/:id2");
           
            addRouter("/product/edit/edit/:id/:id2/:id3");
            addRouter("/product/list/list");
            addRouter("/release/scym/scym/:id/:id2/:id3");
            addRouter("/release/scymdb/scymdb/:id");
            addRouter("/release/ylym/ylym/:id/:id2");
        }

    
    function menuleftClass(){
        var first = window.location.href.indexOf("#/");
        if(first>0){
            var page = window.location.href.split("#/")[1].split("/")[0];
            var page1 = window.location.href.split("#/")[1].split("/")[1];

        }else{
            var page= "";
            var page1= "";
        }
        if(page=="productRelease" && page1=="man"){
            $(".sub-menu").show().find("li").eq(0).addClass("active");
        }else if(page=="productRelease" && page1=="man2"){
            $(".sub-menu").show().find("li").eq(1).addClass("active");
        }else if(page=="shopedit" && page1=="edit"){
            $(".menuleftClass").eq(1).addClass("active");
        }else if(page=="shopedit" && page1=="detail"){
            $(".menuleftClass").eq(2).addClass("active");
        }else if(page=="shopping"){
            $(".menuleftClass").eq(3).addClass("active");
        }else if(page=="Info"){
            $(".menuleftClass").eq(4).addClass("active");
        }else if(page==""){
            window.router.setRoute('/product/list/list');
           
        
        }
    }

        // $.ajax({
        //     type : 'get',
        //     url : "/market/user",
        //     //data : getUserInfodata,
        //     cache:false,
        //     dataType : 'json',
        //     success : function(data) {
        //         if(data.status==1){
        //             if( typeof data.user.userName== "string")
        //             {
        //                 $(".userName").html(ToHtmlString(decodeURI(data.user.userName)));
        //             }else{
        //                 data.user.userName = "undefined"
        //                 $(".userName").html(decodeURI(data.user.userName));
        //             }
        //             window.sessionStorage.userCode = data.user.userCode;
                  
        //         }else{
                  
        //         }

        //     },
        //     error:function(){
        //         $(".headpic").html("<i class='cl cl-customer'></i>")
        //     }
        // });

        
        $("#logout").click(function(){
            dialogminBack('注销','确定注销登录？',function(isok) {
                if(isok){
                    var Url = window.location.protocol+"//"+window.location.host+'/market'
                    window.location.href='/market/logout?SAMLRequest=true&service='+encodeURI(Url);
                    /*var data = {
                        userCode: window.sessionStorage.userCode,
                    };
                    $.ajax({
                        type : 'get',
                        url : "/market/logout?SAMLRequest=true&service=/market",
                        data : data,
                        dataType : 'json',
                        success : function(res) {
                            //console.log(res) ;
                            window.location.href="res.logouturl" ;
                        },
                        error : function(res) {
                            //console.log(res) ;
                           // window.location.href="/market" ;
                        }
                    });*/
                }
            });

        });
        
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
    window.console = window.console || (function(){
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
        return c;
    })();

    });