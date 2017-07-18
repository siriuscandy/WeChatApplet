
require([ 'jquery', 'knockout','dialogmin','ajaxCom','swiper'
], function($, ko,dialogmin,ajaxCom) {
  var bannerUrl  =  '/goodsAPI/goodsList';
  var listUrl  =  '/goodsAPI/goodsList2';
  var list3Url  =  '/goodsAPI/goodsList3';
  var attrsUrl = '/userModule/getUserModuleDetail';
  var viewModel = {
    data : {
      banner : ko.observableArray([]),
      list : ko.observableArray([]),
      list3 : ko.observableArray([]),
      attrs:ko.observable({}),
      firstClass:ko.observable(""),
      secondClass:ko.observable(""),
    },

  };
   viewModel.goIndex = function(){
      window.location.href = "../tmp7/index.html";
  };
  viewModel.goProList = function(){
      window.location.href = "../product/spList.html?tmp=7";
  };
  viewModel.goOrder = function(){
      window.location.href = "../product/myOrder.html?tmp=7";
  };
  viewModel.goME = function(){
      window.location.href = "../product/me.html?tmp=7";
  };
  viewModel.getlist = function(){
    var queryData = {
      pagesize: 3,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      classId: "list",   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',listUrl,queryData,function(res){
      viewModel.data.list(res.list);

    },function(error){

      dialogmin("网络错误");
    })
  };
  
  viewModel.toshare = function(){
      $(".am-share").addClass("am-modal-active");	
      if($(".sharebg").length>0){
        $(".sharebg").addClass("sharebg-active");
      }else{
        $("body").append('<div class="sharebg"></div>');
        $(".sharebg").addClass("sharebg-active");
      }
      $(".sharebg-active").click(function(){
        $(".am-share").removeClass("am-modal-active");	
        setTimeout(function(){
          $(".sharebg-active").removeClass("sharebg-active");	
          $(".sharebg").remove();	
        },300);
      })
    }	
  viewModel.getbanner = function(){
    var queryData = {
      pagesize: 4,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      classId: "banner",   //page num ��ǰҳ��
      userid:viewModel.userId
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

      dialogmin("网络错误");
    })
  };
  viewModel.getattrs = function(){
    var queryData = {
      userModuleId:viewModel.userModuleId
    };
    ajaxCom.Loadajax('GET',attrsUrl,queryData,function(res){
      viewModel.data.attrs(res.attrs);
      viewModel.data.secondClass(res.attrs.secondClass);
      viewModel.data.firstClass(res.attrs.firstClass);
      console.log(viewModel.data.attrs())
    },function(error){

      dialogmin("网络错误");
    })
  };
  viewModel.goDetail = function(id){
    window.location.href = "../product/productDetails.html?goodsId="+id+"&tmp="+GetQueryString("tmp");;
  };
  viewModel.goList = function(id,name){
    window.location.href = "../product/flList.html?tmp=6&cateId=" + id+"&catename="+name;
  };
  viewModel.load=function(){
    viewModel.getbanner();
    viewModel.getattrs();
    viewModel.getlist();
    viewModel.getlist3();
    
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