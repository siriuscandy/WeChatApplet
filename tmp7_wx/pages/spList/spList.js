// spList.js
var $ctx = getApp().globalData.CTX;
var url = $ctx+"/goodsAPI/getGoodsCateList";
var userId = getApp().globalData.USERID;
var isindex=0;
var carturl = $ctx+"/goodsAPI/getCartList";
var getcarthasList = function (that) {
  wx.request({
    url: carturl,
    data: {
      pageNum: 0,
      pageSize: 2,
      userId: userId,
    },
    success: function (res) {
      var plist = res.data.list;
      if (res.data.list.length == 0) {
        that.setData({
          hasgoods: false
        });
      } else {
        that.setData({
          hasgoods: true
        });
      }
      that.setData({
        prolist: plist
      });
    }
  });
}
var getList = function (that) {
  wx.request({
    url: url,
    data: {
      userId: userId,
      isIndex: isindex,
      
    },
    success: function (res) {
      that.setData({
          list: res.data.list
      });
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    tab: 2,
    hasgoods:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    getList(this);
    getcarthasList(this);
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