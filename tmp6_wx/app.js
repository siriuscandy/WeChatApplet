//app.js
var userId = 127;
App({
  //当程序初始化的时候执行这个方法
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
        console.log("code====" + res.code);

        // if (res.code) {
        //   //这里得到jscode即可传到后台进行处理
        //   wx.request({
        //     url: 'http://localhost:8080/WechatTest/app/getData?js_code=' + res.code,
        //     data: {},
        //     method: 'GET',
        //     success: function (res) {
        //       //后台处理预支付成功,在这就能得到paySign等确认支付需要的参数
        //     }
        //   })
        // }
      }
    })
  },
  //获取openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: 'https://v.tixaapp.com/WeChatApplet/app/getData',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'js_code': code },
      success: function (res) {
        var openId = res.data.openid;

        //  that.xiadan(openId);
        that.getUserInfo();
        // that.globalData.openId = openId;
        that.globalData.openId = res.data.openid;

      }
    })
  },
  //下单
  xiadan: function (openId) {
    var that = this;
    wx.request({
      url: 'https://v.tixaapp.com/WeChatApplet/app/xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'openid': openId,
        'total_fee': '1',
        'body': '支付测试',
        'attach': '真假酒水'
      },
      success: function (res) {
        var pay = res.data
        //发起支付
        var timeStamp = pay[0].timeStamp;
        var packages = pay[0].package;
        var paySign = pay[0].paySign;
        var nonceStr = pay[0].nonceStr;
        var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
        that.pay(param)

      }
    })
  },
  // 支付
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

  //小程序显示出来的时候触发
  onShow: function () {
    console.log("生命周期函数-监听小程序显示的时候触发");
  },
  //小程序隐藏的时候触发
  onHide: function () {
    console.log("生命周期函数-监听小程序隐藏的时候触发");
  },
  //全局的方法
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,

        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
          // that.globalData.openId = res.data.openid;
          console.log("-----------" + that.globalData.openId);


          if (that.globalData.openId != null) {
            wx.request({
              url: 'https://v.tixaapp.com/WeChatApplet/memberAPI/addMember',//上线的话必须是https，没有appId的本地请求貌似不受影响  
              data: {
                openid: that.globalData.openId,
                name: 'test',
                userId: userId,
                nickName: that.globalData.userInfo.nickName,
                avatar: that.globalData.userInfo.avatarUrl
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                console.log("*-*-*-*" + res.data.data.id)
                // that.setData({
                //   member: res.data.result
                // })
                that.globalData.memberId = res.data.data.id;

                console.log("/*/*/*/" + that.globalData.memberId);
                console.log("授权里的成功");
              },
              fail: function () {
                // fail  
                console.log("授权里的失败");
              },
              complete: function () {
                // complete  
                console.log("授权完成");
              }
            })

          }
        },
        fail: function () {
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法正常使用小程序购买的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
            success: function (res) {
              if (res.confirm) {

                console.log('用户点击确定')
              }
            }
          })
        }
      })
    }
  },
  //全局的属性 
  globalData: {
    userInfo: null,
    pass: "哈哈",
    openId: null,
    memberId: null,
    USERID:userId,
  }

})

