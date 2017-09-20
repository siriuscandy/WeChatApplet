// productDetails.js
var $ctx = getApp().globalData.CTX;
var url = $ctx+"goodsAPI/getGoodsDetail";
var addcart = $ctx +"/goodsAPI/addCart"
var goodsId = 0;
var userId = getApp().globalData.USERID;
var commentUrl = $ctx+"/goodsAPI/getCommentList";

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
var addcartFUN = function (that) {
  wx.request({
    url: addcart,
    data: {
      goodsId: goodsId,
      goodsNumber: that.data.num,
      userId: userId
    },
    success: function (res) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
  });
}
var gobuyFUN = function (that) {
  wx.setStorage({
    key: "cartdata",
    data: [
      { goodsId: goodsId,
        goodsnumber: that.data.num,
        goodsName: that.data.goods.name,
        unitPrice: that.data.goods.price,
        goodsCover: that.data.goods.cover,
      }
    ]
  })
  wx.redirectTo({
    url: "../pay/pay"
  })
}
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
    comments:[],
    opencart:false,
    openbuy:false,
    num: 1,// 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    btnStatus:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId
    getDetail(this);
    getCommentList(this);
  },
  cartpro: function () {
    this.setData({
      opencart: true,
      btnStatus:0
    });
  },
  buypro: function () {
    this.setData({
      opencart: true,
      btnStatus:1
    });
  },
  addcart: function(){
    if (this.data.btnStatus == 0){
      addcartFUN(this);
    }else {
      gobuyFUN(this);
    }
    
  },
  gocart:function(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
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