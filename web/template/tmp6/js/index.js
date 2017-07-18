
require([ 'jquery', 'knockout','dialogmin','ajaxCom','swiper'
], function($, ko,dialogmin,ajaxCom) {
  var bannerUrl  =  '/goodsAPI/goodsList';
  var attrsUrl = '/userModule/getUserModuleDetail';
  var viewModel = {
    data : {
      banner : ko.observableArray([]),
      attrs:ko.observable({}),
      firstClass:ko.observable(""),
      secondClass:ko.observable(""),
    },

  };

  viewModel.getbanner = function(){
    var queryData = {
      pagesize: 4,     //page size 每页显示条数
      pageNum: 0,    //page num 当前页数
      classId: "banner",   //page num 当前页数
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