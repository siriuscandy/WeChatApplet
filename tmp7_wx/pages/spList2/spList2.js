//index.js  
//获取应用实例  
var userId = getApp().globalData.USERID;
var $ctx = getApp().globalData.CTX;
var isindex=0;
var getCateIdUrl = '/goodsAPI/getGoodsCateList';
var listUrl  =  '/goodsAPI/goodsList';
var NowZid=0;
var NowPageNUM = 0;
Page({
  data: {
    CateIdList:[],
    articList: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    NowPageNUMd:0
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    this.GETtitlelist(userId);
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    
  },
  onPullDownRefresh: function () {
    console.log("down")
    NowPageNUM++;
    wx.setStorage({
      key: String(NowZid),
      data: NowPageNUM
    })
    this.GetarticListMore(NowPageNUM, NowZid, userId);
    this.setData({
      NowPageNUMd: NowPageNUM
    })
  },
  bindDownLoad:function(){
    console.log("down")
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
   // that.GetarticList(1, NowZid, userId)
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
   
    NowZid = e.target.id;
    wx.getStorage({
      key: String(NowZid),
      success: function (res) {
        console.log(res.data)
        NowPageNUM = res.data;
        that.GetarticList(NowPageNUM, e.target.id, userId)
      }
    })
    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
   },
  GETtitlelist: function (userId){
    var that = this;
     wx.request({
       
       url: $ctx + getCateIdUrl, //获取资讯分类
       data: {
         pageSize: '10',
         pageNum: '0',
         userId:userId,
         isIndex:-1
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         var List = res.data.list
         NowZid = List[0].id;
         that.setData({
           CateIdList: List
         })
         that.GetarticList(0, List[0].id,userId)
         for(var i=0;i<List.length;i++){
           wx.setStorage({
             key: String(List[i].id),
             data: "0"
           })
         }
       }
     })
   },
  GetarticList: function (pgNUm, zid, userId){
     var that = this;
     wx.request({

       url: $ctx + listUrl, //获取资讯列表
       data: {
         pageSize: '5',
         pageNum: pgNUm,
         cateId:zid,
         userid: userId
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         that.setData({
           articList: res.data.list
         })
        

       }
     })
   },
  GetarticListMore: function (pgNUm, zid, userId) {
    var that = this;
    wx.request({

      url: $ctx + listUrl, //获取资讯列表
      data: {
        pageSize: '5',
        pageNum: pgNUm,
        cateId: zid,
        userId: userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.list.length>0){
          var newDATAmore = res.data.list.concat(that.data.articList)
          that.setData({
            articList: newDATAmore
          })
        }
        
        console.log(that.articList);

      }
    })
  }
})  
