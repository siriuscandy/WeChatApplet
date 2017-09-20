// spList.js
var $ctx = getApp().globalData.CTX;
var url = $ctx +"/goodsAPI/getCartList";
var delurl = $ctx +"/goodsAPI/deleteCartByID";
var userId = getApp().globalData.USERID;
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
    },
    success: function (res) {
      var plist = res.data.list;
      if(res.data.list.length==0){
        that.setData({
          hasgoods: false
        });
      }else{
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
    prolist:[],
    tab: 4,
    cateName:"",
    allselected:false,
    totalprice:0,
    isedit:false,
    hasgoods:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    getList(this);
    
  },
  edit:function(){
    var isedit = !this.data.isedit;
    this.setData({
      isedit: isedit
    })
  },
  //删除事件
  del: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
         
          var index = parseInt(e.currentTarget.dataset.index);
          //原始的icon状态
          var id = that.data.prolist[index].id;
          wx.request({
            url: delurl,
            data: {
              cartId: id,

            },
            success: function (res) {
              that.data.prolist.splice(e.currentTarget.dataset.index, 1)
              that.setData({
                prolist: that.data.prolist
              })
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
            }
          });
        }else if (res.cancel) {
        console.log('用户点击取消')
      }
        
       
      }
    })
    
  },
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/

    //拿到下标值，以在items作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var type = this.data.items[index].type;
    var items = this.data.items;
    if (type == 'circle') {
      //未选中时
      items[index].type = 'success_circle';
    } else {
      items[index].type = 'circle';
    }

    // 写回经点击修改后的数组
    this.setData({
      items: items
    });
    // 遍历拿到已经勾选的值
    var checkedValues = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'success_circle') {
        checkedValues.push(items[i].value);
      }
    }
    // 写回data，供提交到网络
    this.setData({
      checkedValues: checkedValues
    });
  },
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var price = this.data.totalprice;
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.prolist[index].selected;
    var carts = this.data.prolist;
    // 对勾选状态取反
    carts[index].selected = !selected;
    if (selected){
      price -= carts[index].unitPrice * carts[index].goodsnumber
    }else{
      price += carts[index].unitPrice * carts[index].goodsnumber
    }
    // 写回经点击修改后的数组
    this.setData({
      prolist: carts,
      totalprice:price
    });
  },
  allbindCheckbox: function (e) {
    var carts = this.data.prolist;
    var totalprice = 0;
    if (this.data.allselected==false){
      for (var i = 0; i < carts.length; i++) {
        this.data.prolist[i].selected = true;
        totalprice += this.data.prolist[i].unitPrice * this.data.prolist[i].goodsnumber
      }
      this.setData({
        prolist: carts,
        allselected: true,
        totalprice: totalprice
      });
    }else{
      for (var i = 0; i < carts.length; i++) {
        this.data.prolist[i].selected = false;
      }
      this.setData({
        prolist: carts,
        allselected: false,
        totalprice: 0
      });
    }
   
    
  },
  bindgopay: function () {
    var carts = this.data.prolist;
    var gopaydata =[];
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected == true){
        gopaydata.push(carts[i])
      }
    }
    if (gopaydata.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        success: function (res) {

        }
      })
      return false;

    }
    wx.setStorage({
      key: "cartdata",
      data: gopaydata
    })
    wx.redirectTo({
      url: '../pay/pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  gopay: function () {

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