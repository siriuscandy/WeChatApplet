// commentList.js

var commentUrl = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getCommentList";
var pageNum = 0;
var pageSize = 10;
var goodsId = 1;
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
        list: list
      });
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    console.log('show');
    getCommentList(this);
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