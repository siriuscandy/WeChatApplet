//index.js
//获取分类列表
var $ctx = "https://v.tixaapp.com/WeChatApplet";
var getgoodslistUrl = '/goodsAPI/goodsList';
var bannerUrl = '/goodsAPI/goodsListByName';
var CateListUrl = '/goodsAPI/getGoodsCateList';
var newslistUrl = '/api/showDetailListByZnameAndUid'; //首页资讯
var GetUrl = '/userModule/getUserModuleDetail'; //获取信息

var imgUrls = [
  {
    id: '0',
cover: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  }, {
    id: '1',
    cover: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
  }, {
    id: '2',
    cover: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
  }
];
var isIndex = 1;
var pageNum = 0;
var pageSize = 10;
var userId = 95;
var list1Id = "";
var list2Id = "";

var GetList = function (that) {
  wx.request({
    url: $ctx + CateListUrl,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      isIndex: 1,
      userId:userId
    },
    success: function (res) {
     // console.info(res);
      var list = res.data.list;
      list1Id = list[4].id;
      list2Id = list[5].id;
      that.setData({
        CateList: list,
        firstClass: list[4],
        secondClass: list[5],
      });
    }
  });
}

var getBanner = function (that) {
  wx.request({
    url: $ctx + bannerUrl,
    data: {
      pageNum: 0,
      pageSize: 4,
      name: "banner",
      userId: userId
    },
    success: function (res) {
      var bannerList = res.data.list;
      if (!bannerList){
        bannerList = imgUrls;
      }
      that.setData({
        banner: bannerList,
      });

    }
  });
}
var getlist1 = function (that) {
  wx.request({
    url: $ctx + getgoodslistUrl,
    data: {
      pageNum: 0,
      pageSize: 4,
      cateId: list1Id, 
      userId: userId
    },
    success: function (res) {
      
      that.setData({
        list1: res.data.list,
      });

    }
  });
}
var getlist2 = function (that) {
  wx.request({
    url: $ctx + getgoodslistUrl,
    data: {
      pageNum: 0,
      pageSize: 4,
      cateId: list2Id,
      userId: userId
    },
    success: function (res) {

      that.setData({
        list2: res.data.list,
      });

    }
  });
}
var gethomeNews= function (that) {
  wx.request({
    url: $ctx + newslistUrl,
    data: {
      pageNum: 0,
      pageSize: 1,
      zname: "首页资讯", 
      userid: userId
    },
    success: function (res) {

      that.setData({
        homenews: res.data.list,
      });

    }
  });
}

// var GetIndexCLDP = function (that) {
//   wx.request({
//     url: "https://v.tixaapp.com/WeChatApplet/goodsAPI/getGoodsCateList",
//     data: {
//       pageNum: pageNum,
//       pageSize: pageSize,
//       isIndex: 1,
//       userId: userId
//     },
//     success: function (res) {
//      // console.info(res);
//       var listCLDP = res.data.list;
      
//       that.setData({
//         listCLDP: listCLDP
//       });
//     }
//   });
// }

var app = getApp()
Page({
  data: {
    tab: 1,
    banner: [],
    list1: [],
    list2: [],
    CateList: {},
    firstClass: {},
    secondClass: {},
    homenews: {},
    // listCLDP:[],
    
    

  },
  onLoad: function () {
  },
  onShow: function () {
    GetList(this);
    getBanner(this);
    getlist1(this);
    getlist2(this);
    gethomeNews(this);
  }
})
