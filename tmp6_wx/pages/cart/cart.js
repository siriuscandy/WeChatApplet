// spList.js

var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/goodsList";
var userId = 95;
var pageNum = 0;
var pageSize = 15;
var thisCateId =0;

var getList = function (that) {
  wx.request({
    url: url,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      userId: userId,
      classId: thisCateId,
    },
    success: function (res) {
      var plist = res.data.list;
      that.setData({
        prolist: plist
      });
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist:[],
    tab: 4,
    cateName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    thisCateId = options.cateId;
    this.setData({
      cateName: options.cateName 
    });
    getList(this);
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