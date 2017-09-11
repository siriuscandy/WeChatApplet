// me.js
var goodsData="";

var url = "https://v.tixaapp.com/WeChatApplet/goodsAPI/getGoodsDetail";
var submmiturl = "https://v.tixaapp.com/WeChatApplet/app/xiadan"
var goodsId = 0;
var userId = getApp().globalData.USERID;

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
};
var gopaysubmit = function (that, openId) {
  if (that.data.addressdata == ""){
    wx.showModal({
      title: '提交失败',
      content: '请选择地址',
      success: function (res) {
        
      }
    })
    return false;

  }
    wx.request({
      url: submmiturl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'openid': getApp().globalData.openId,
        'memberId': getApp().globalData.memberId,
        'userId': userId,
        'goodsId':that.data.onegoodsId,
        'address': JSON.stringify(that.data.addressdata),
        'total_fee': that.data.totalprice.toString(),
        'list': JSON.stringify(that.data.gopaylist),        
        'attach': '',
        'body': '',
      },
      success: function (res) {
        var pay = res.data
        //发起支付
        var timeStamp = pay[0].timeStamp;
        var packages = pay[0].package;
        console.log("package===" + packages);
        var paySign = pay[0].paySign;
        var nonceStr = pay[0].nonceStr;
        var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
        that.pay(param)

      }
    })
  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 3,
    goods:[],
    addresshidden:true,
    addressdata:"",
    num:1,
    totalprice:0,
    gopaylist:[],
    onegoodsId:''
  },
  pay: function (param) {
    console.log("支付")
    console.log(param)
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        // success
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function () {
            // fail
            console.log('失败1');
          },
          complete: function () {
            // complete
            console.log('完成1');
          }
        })
      },
      fail: function (res) {
        // fail
        console.log('失败2');
      },
      complete: function () {
        // complete
        console.log('完成2');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var totalprice = 0;
    var list = [];
    wx.getStorage({
      key: 'cartdata',
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var Ldata = {
            'body': res.data[i].goodsName,
            'attach': res.data[i].goodsName,
            'goodsId': res.data[i].goodsId,
          }
          totalprice += res.data[i].unitPrice * res.data[i].goodsnumber;
          list.push(Ldata)
        }
        that.setData({
          goods: res.data,
          totalprice: totalprice,
          gopaylist: list,
          onegoodsId: list[0].goodsId
        });
      }
    })
   
    //getDetail(this);
  },
  gopay: function (event) {
    gopaysubmit(this);
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