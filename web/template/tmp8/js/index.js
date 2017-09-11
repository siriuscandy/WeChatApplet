
require([ 'jquery', 'knockout','dialogmin','ajaxCom','swiper'
], function($, ko,dialogmin,ajaxCom) {
    var getgoodslistUrl  =  '/goodsAPI/goodsList';
   var bannerUrl  =  '/goodsAPI/goodsListByName';
  var attrsUrl = '/goodsAPI/getGoodsCateList';
  var listUrl  =  '/api/showDetailListByZnameAndUid'; //首页资讯
  var GetUrl = '/userModule/getUserModuleDetail'; //获取信息
  var UpdataUrl = '/goodsAPI/updateGoodsCate';//修改
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
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //dialogmin("调用服务报错!!");
            }
        });
    };
  viewModel.getbanner = function(){
    var queryData = {
      pageSize: 7,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      name: "banner",   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',bannerUrl,queryData,function(res){
      viewModel.data.banner(res.list.slice(0,4));
      viewModel.data.list(res.list.slice(4,7));
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
      userModuleId:viewModel.userModuleId,
      isIndex:1,
      userId:viewModel.userId
    };
    ajaxCom.Loadajax('GET',attrsUrl,queryData,function(res){
      viewModel.data.firstClass(res.list[5]);
      viewModel.getbanner();
      viewModel.getGoodsList(res.list[0].id)
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
    viewModel.getuserInfo();
    viewModel.getattrs();
    
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