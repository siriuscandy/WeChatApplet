// order.js

var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getOrderList";
var userId = getApp().globalData.USERID;
var status=-10;
var pageNum = 0;
var pageSize = 5;

var tab=1;

var GetList = function (that) {
  wx.request({
    url: url,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      status: status,
      userId: userId
    },
    success: function (res) {
      var list = res.data.list;
      // for (var i = 0; i < res.data.list.length; i++) {
      //   list.push(res.data.list[i]);
      // }
      that.setData({
        list: list,
        status: status
      });
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tab:1
  },

  changeTab: function (e) {
    status = e.currentTarget.dataset.status;
    GetList(this);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    GetList(that);
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