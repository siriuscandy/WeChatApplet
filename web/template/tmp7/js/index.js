
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

      dialogmin("�������");
    })
  };
  viewModel.getlist3 = function(){
    var queryData = {
      pagesize: 4,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      classId: "list3",   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',list3Url,queryData,function(res){
      viewModel.data.list3(res.list);

    },function(error){

      dialogmin("�������");
    })
  };
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

      dialogmin("�������");
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

      dialogmin("�������");
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
        $(this).addClass("dq_hover")            //��ǰ<li>Ԫ�ظ���
            .siblings().removeClass("dq_hover");  //ȥ������ͬ��<li>Ԫ�صĸ���
        var index =  $div_li.index(this);  // ��ȡ��ǰ�����<li>Ԫ�� �� ȫ��liԪ���е�������
        $("div.tb_nr_A > div")   	//ѡȡ�ӽڵ㡣��ѡȡ�ӽڵ�Ļ������������������滹��div
            .eq(index).show()   //��ʾ <li>Ԫ�ض�Ӧ��<div>Ԫ��
            .siblings().hide(); //������������ͬ����<div>Ԫ��
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