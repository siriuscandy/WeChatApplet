
require([ 'jquery', 'knockout','dialogmin','ajaxCom','swiper'
], function($, ko,dialogmin,ajaxCom) {
  var bannerUrl  =  '/goodsAPI/goodsList';
  var attrsUrl = '/goodsAPI/goodsClassListnav';
  var listUrl  =  '/api/showDetailListByZnameAndUid'; //首页资讯
  var GetUrl = '/userModule/getUserModuleDetail'; //获取信息
  var viewModel = {
    data : {
      banner : ko.observableArray([]),
      attrs:ko.observable({}),
      firstClass:ko.observable({}),
      secondClass:ko.observable({}),
      homenews:ko.observable({}),
    },

  };
  viewModel.goIndex = function(){
      window.location.href = "../tmp6/index.html";
  };
  viewModel.goProList = function(){
      window.location.href = "../product/spList.html?tmp=6";
  };
  viewModel.goOrder = function(){
      window.location.href = "../product/myOrder.html?tmp=6";
  };
  viewModel.goME = function(){
      window.location.href = "../product/me.html?tmp=6";
  };

  viewModel.getbanner = function(){
    var queryData = {
      pageSize: 4,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      cateId: "banner",   //page num ��ǰҳ��
      userModuleId:viewModel.userModuleId
    };
    ajaxCom.Loadajax('GET',bannerUrl,queryData,function(res){
      viewModel.data.banner(res.list);
      var swiper = new Swiper('#swiper-container', {
        autoplay:3000,
        pagination: '.pagination1',
        paginationClickable: true,
        mode: 'vertical'
      });
    },function(error){

      dialogmin("�������");
    })
  };
  viewModel.getattrs = function(){
    var queryData = {
      userModuleId:viewModel.userModuleId,
      status:1
    };
    ajaxCom.Loadajax('GET',attrsUrl,queryData,function(res){
      viewModel.data.attrs(res.list);
      viewModel.data.firstClass(res.list[5]);
      viewModel.data.secondClass(res.list[4]);
      console.log(viewModel.data.attrs())
    },function(error){

      dialogmin("�������");
    })
  };
 
  viewModel.getuserInfo = function(){
        $.ajax({
            type : 'get',
            dataType : 'json',
            url :$ctx+ GetUrl+'?userModuleId='+GetQueryString("uid"),
            success : function(res) {
                if(res){
                   viewModel.userId = res.data.list.userId;
                   viewModel.applyName = res.data.list.applyName;
                   viewModel.applyDescription = res.data.list.applyDescription;
                   document.title = viewModel.applyName
                   $("head").append("<meta content='"+viewModel.applyDescription+"' name='description'/>")
                   $(".weixinLOGO").append("<img src='"+res.data.list.logo+"' >")
                   viewModel.getiList();
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //dialogmin("调用服务报错!!");
            }
        });
    };
  viewModel.getiList = function(){
        var queryData = {
            pageSize: 1,     //page size 每页显示条数
            pageNum: 0,    //page num 当前页数
            zname: "首页资讯",   //page num 当前页数
            userid:viewModel.userId
        };
        ajaxCom.Loadajax('GET',listUrl,queryData,function(res){
                if(res.list.length<1 || GetQueryString("uid")=="0"){
                    res = {"list":[
                        {
                            dname:"钓鱼岛南海还不够，日本又在台湾问题上挑衅，怎能容忍",
                            fpic:"img/pic.jpg",
                            did:"0",
                            createtime:"2017-6-22"
                        },
                        ],}
                      
                }
                viewModel.data.homenews(res.list[0]);
            },function(error){
              dialogmin("网络错误");
        })
    }
  viewModel.goDetail = function(id){
    window.location.href = "../product/productDetails.html?goodsId="+id+"&tmp="+GetQueryString("tmp");;
  };
  viewModel.goList = function(id,name){
    window.location.href = "../product/flList.html?tmp=6&cateId=" + id+"&catename="+name;
  };
  viewModel.load=function(){
    viewModel.userModuleId = GetQueryString('uid');
    viewModel.getuserInfo();
    viewModel.getbanner();
    viewModel.getattrs();
  }

  viewModel.load();
  ko.applyBindings(viewModel);
  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  };

})