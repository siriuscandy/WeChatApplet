// me.js
var $ctx = getApp().globalData.CTX;
var carturl = $ctx +"/goodsAPI/getCartList";
var userId = getApp().globalData.USERID;

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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 3,
    userInfo: {},
    hasgoods:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getcarthasList(this)
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
    console.log(getApp().globalData.userInfo)
  },
  addaddress: function (event) {
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res))
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
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