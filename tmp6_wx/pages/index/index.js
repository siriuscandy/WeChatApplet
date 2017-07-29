//index.js
//获取分类列表
var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getGoodsCateList";
var isIndex = 1;
var pageNum = 0;
var pageSize = 12;

var GetList = function (that) {
  wx.request({
    url: url,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      isIndex: isIndex
    },
    success: function (res) {
      console.info(res);
      var list = res.data.list;
      // for (var i = 0; i < res.data.list.length; i++) {
      //   list.push(res.data.list[i]);
      // }
      that.setData({
        list: list
      });
    }
  });
}

var app = getApp()
Page({
  data: {
    tab: 1,
    list:[]
  },
  onLoad: function () {
  },
  onShow: function () {
    GetList(this);
  }
})
