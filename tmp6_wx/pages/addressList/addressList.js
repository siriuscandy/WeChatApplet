// spList.js

var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getAddressList";
var userId = 95;
var pageNum = 0;
var pageSize = 15;

var getList = function (that) {
  wx.request({
    url: url,
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      userId: userId,
    },
    success: function (res) {
      var plist = res.data.list;
      that.setData({
        list: plist
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
    tab: 3,
    cateName: ""
  },
  choseaddress: function (event) {
    console.log(event)
    var dataad = event.currentTarget.dataset
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    getList(this);
  },
  addaddress:function(event){
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