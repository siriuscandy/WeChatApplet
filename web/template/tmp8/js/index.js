
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
  viewModel.getlist = function(){
    var queryData = {
      pagesize: 3,     //page size 每页显示条数
      pageNum: 0,    //page num 当前页数
      classId: "list",   //page num 当前页数
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',listUrl,queryData,function(res){
      viewModel.data.list(res.list);

    },function(error){

      dialogmin("网络错误");
    })
  };
  viewModel.getlist3 = function(){
    var queryData = {
      pagesize: 4,     //page size 每页显示条数
      pageNum: 0,    //page num 当前页数
      classId: "list3",   //page num 当前页数
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',list3Url,queryData,function(res){
      viewModel.data.list3(res.list);

    },function(error){

      dialogmin("网络错误");
    })
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
    viewModel.getlist();
    viewModel.getlist3();
    $(function(){
      var $div_li =$(".tuxx span");
      $div_li.click(function(){
        $(this).addClass("dq_hover")            //当前<li>元素高亮
            .siblings().removeClass("dq_hover");  //去掉其他同辈<li>元素的高亮
        var index =  $div_li.index(this);  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        $("div.tb_nr_A > div")   	//选取子节点。不选取子节点的话，会引起错误。如果里面还有div
            .eq(index).show()   //显示 <li>元素对应的<div>元素
            .siblings().hide(); //隐藏其他几个同辈的<div>元素
      }).hover(function(){
        $(this).addClass("hover");
      },function(){
        $(this).removeClass("hover");
      });
      var tbWidth = $(".xxsj").width();
      $("#tb_tub2").width(tbWidth);
      $("#tb_tubpie").width(tbWidth);
    })
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