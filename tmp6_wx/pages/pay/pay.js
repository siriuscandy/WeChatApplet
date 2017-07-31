// me.js
var goodsData="";

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
    goods:{},
    addresshidden:true,
    addressdata:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    goodsId = options.goodsId
    getDetail(this);
  },
  addaddress: function (event) {
    var Dthis =this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          Dthis.setData({
            addressdata: res,
            addresshidden:false
          });
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