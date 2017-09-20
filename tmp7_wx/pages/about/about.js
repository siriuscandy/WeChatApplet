// about.js
var $ctx = getApp().globalData.CTX;
var url = $ctx +"/api/showDetailListByZnameAndUid"
var userId = getApp().globalData.USERID;
var pageNum = 1;
var pageSize = 1;
var thisCateId = 0;

var getList = function (that) {
  wx.request({
    url: url,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      userid: userId,
      zname: '关于我们'
    },
    success: function (res) {
      if (res.data.list.length == 0) {
        var ddd = {
          dname: "美丽服装店",
          content: "出来的，质量严格把关，请亲爱的淘友们尽管放心选购，我能在这里立足，完全源于各位淘友们，对我的支持和信任，我感谢你们！为了回报大家长期以来对我的支持，我会更加努力的为各位提供更好的商品，衷心的感谢各位的到来，祝您们购物愉快~",
          fpic: "/img/pic2.jpg"
        }
        res.data.list.push(ddd)
      }
      that.setData({
        aboutus: res.data.list[0],
      });
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutus: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getList(this)
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