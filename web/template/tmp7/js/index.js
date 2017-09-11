
require([ 'jquery', 'knockout','dialogmin','ajaxCom','swiper'
], function($, ko,dialogmin,ajaxCom) {
  var getgoodslistUrl  =  '/goodsAPI/goodsList';
  var bannerUrl  =  '/adAPI/adList';
  var attrsUrl = '/goodsAPI/getGoodsCateList';
  var listUrl  =  '/api/showDetailListByZnameAndUid'; //首页资讯
  var GetUrl = '/userModule/getUserModuleDetail'; //获取信息
  var UpdataUrl = '/goodsAPI/updateGoodsCate';//修改
  var viewModel = {
    data : {
      banner : ko.observableArray([]),
      list1 : ko.observableArray([]),
      list2 : ko.observableArray([]),
      list3 : ko.observableArray([]),
      attrs:ko.observable({}),
      firstClass:ko.observable({}),
      secondClass:ko.observable({}),
      thirdClass:ko.observable({}),
      homenews:ko.observable({}),
    },

  };
  viewModel.goIndex = function(){
      window.location.href = "../tmp7/index.html";
  };
  viewModel.goProList = function(){
    if(GetQueryString("isedit")){
      window.location.href = "../product/spList.html?tmp=7&isedit=true&userid="+viewModel.userId;

      }else{
      window.location.href = "../product/spList.html?tmp=7&userid="+viewModel.userId;
      }
  };
  viewModel.goOrder = function(){
      window.location.href = "../product/myOrder.html?tmp=7&userid="+viewModel.userId;
  };
  viewModel.goME = function(){
      window.location.href = "../product/me.html?tmp=7&userid="+viewModel.userId;
  };

  viewModel.getbanner = function(){
    var queryData = {
      pageSize: 4,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      relationId: "0",   //page num ��ǰҳ��
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
  viewModel.getGoodsList1 = function(Id){
    var queryData = {
      pageSize: 3,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      cateId: Id,   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',getgoodslistUrl,queryData,function(res){
      viewModel.data.list1(res.list);
      
    },function(error){

      dialogmin("网络错误");
    })
  };
  viewModel.getGoodsList2 = function(Id){
    var queryData = {
      pageSize: 3,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      cateId: Id,   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',getgoodslistUrl,queryData,function(res){
      viewModel.data.list2(res.list);
     
    },function(error){

      dialogmin("网络错误");
    })
  };
  viewModel.getGoodsList3 = function(Id){
    var queryData = {
      pageSize: 3,     //page size ÿҳ��ʾ����
      pageNum: 0,    //page num ��ǰҳ��
      cateId: Id,   //page num ��ǰҳ��
      userid:viewModel.userId
    };
    ajaxCom.Loadajax('GET',getgoodslistUrl,queryData,function(res){
      viewModel.data.list3(res.list);
     
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
      var arraylist =res.list;
      for(var i=0;i<arraylist.length;i++){
        if(arraylist[i].logo==null || res.list[i].logo==''){
          arraylist[i].logo = 'img/icon1.jpg'
        }
      }
      viewModel.data.attrs(arraylist);
      viewModel.data.secondClass(arraylist[4]);
      viewModel.data.firstClass(arraylist[5]);
      viewModel.data.thirdClass(arraylist[6]);
      viewModel.getbanner();
      viewModel.getGoodsList1(arraylist[4].id)
      viewModel.getGoodsList2(arraylist[5].id)
      viewModel.getGoodsList3(arraylist[6].id)
    },function(error){

      dialogmin("网络错误");
    })
  };
 viewModel.GoupdateModule =function(){
        var  UParray = [];
        $(".aui-nav ul").find("li").each(function(e){
            var list1data = {
                "name":$(this).find(".mui-media-body").html(),
                "logo":$(this).find("img").attr("src"),
                "id":$(this).attr("data-id"),
            }
            if(e<4){
            UParray.push(list1data)

            }
        })
        $(".tmp7Class").each(function(e){
            var list1data = {
              "name":$(this).html(),
              "logo":'',
              "id":$(this).attr("data-id"),
            } 
            UParray.push(list1data)
        })
        var updataD = {
          attrs:UParray
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:{
              attrs:JSON.stringify(updataD)
            },
            url :$ctx+ UpdataUrl,
            success : function(res) {
                if(res){
                    dialogmin("保存成功")
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //dialogmin("调用服务报错!!");
            }
        });
    }
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
  
   viewModel.changeImg =function(i,id,cateId){
        if(GetQueryString("isedit")){
            $(".picLine",parent.document).find("img").attr("src",i).attr("data-id",id);

        }else{
           window.location.href = '../product/flList.html?tmp=7&cateId='+cateId;
        }
    }
    viewModel.changeText =function(i,id,cateId){
        if(GetQueryString("isedit")){
            $(".xgtxt",parent.document).val(i).attr("data-id",id);
           
        }else{
           window.location.href = '../product/flList.html?tmp=7&cateId='+cateId;
        }
    }
  viewModel.goDetail = function(id){
    window.location.href = "../product/flList.html?cateId="+id+"&tmp=7";
  };
  viewModel.goList = function(id,name){
    window.location.href = "../product/flList.html?tmp=7&cateId="+id+"&catename="+name;
  };
  viewModel.load=function(){
    viewModel.userModuleId = GetQueryString('uid');
    viewModel.getuserInfo();
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