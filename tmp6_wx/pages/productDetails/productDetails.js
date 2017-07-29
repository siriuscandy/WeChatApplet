// productDetails.js

var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getGoodsDetail";
var goodsId = 0;

var getDetail = function (that) {
  wx.request({
    url: url,
    data: {
      goodsId: goodsId
    },
    success: function (res) {
      var goods = res.data.data.list;
      console.log(goods.images.split(","));
      that.setData({
        goods: goods,
        imgs: goods.images.split(",")
      });
    }
  });
}

var commentUrl = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getCommentList";
var pageNum = 0;
var pageSize=3;
var getCommentList = function (that) {
  wx.request({
    url: commentUrl,
    data: {
      pageNum: pageNum,
      pageSize, pageSize,
      goodsId: goodsId
    },
    success: function (res) {
      var list = res.data.list;
      that.setData({
        comments: list
      });
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: undefined,
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId
    getDetail(this);
    getCommentList(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})