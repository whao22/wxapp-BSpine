// pages/doctor/doctor.js
const { $Message } = require('../../iview/base/index');
const urlApi = require('../../utils/server.api.js')
const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalObj:[],
    title:"挂号记录",
    totalPrice:0,
    notPayData:[],
    sickName:"",
    sickCard:"",
    show:"hidden",
    type:""
  },

  //获取待付款列表
  getRegisterLog:function(type){
    const that = this;
    this.setData({
      type:type
    })
    console.log("类类型类型类型型",type)
    var url = type == 0?urlApi.getRegisterLogUrl():
              type == 1 ? urlApi.getMZPayLogUrl():
              type == 2 ? urlApi.getPayLogUrl():
              type == 3?urlApi.getinHPayLogUrl():
              type == 4?urlApi.getDepositLogUrl() : urlApi.getPayLogUrl();              
    var title = type == 0?"挂号记录":
                type == 1?"缴费记录":
                type == 2?"门诊缴费记录":
                type == 3?"住院缴费记录":
                type == 4?"押金补交记录" : "缴费记录"
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      title: title
    })
    wx.request({
      url: url,
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        WID: app.globalData.openid, 
        BRID: app.globalData.BRID, 
      },
      success: function (reponse) {
        var data = reponse.data.LIST;
        var arr = new Array();
        if (data != undefined && data.length > 0){
          for (var i of data) {
            if (i.TYPE == type){
              i.status = i.STATUS == 0 ? "挂号成功" : i.STATUS == 1 ? "挂号成功" : "已经取消";
              i.name = app.globalData.sickName;
              i.detail = "就诊卡：" + app.globalData.sickCard;
              i.price = i.MONEY / 100;
              i.date = util.format(i.TIME_PAY);
              arr.push(i)
            }
          }
          that.setData({
            notPayData: arr
          })
        }else{
          that.setData({
            show: "show",
          })
        }
      }
    })
  },

  detailFun:function(){
    if(this.data.type == 0){
      wx.navigateTo({
        url: '/pages/GHDetail/GHDetail',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    this.setData({
      sickName: app.globalData.sickName,
      sickCard: app.globalData.sickCard
    })
    this.getRegisterLog(Number(type));
  
    wx.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"]
    })
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
  // onShareAppMessage: function () {

  // },
  onShareAppMessage: function (res) {
    var that = this;
    console.log(JSON.stringify(that.data.array))
    return {
      title:that.data.array.name,
      path:'pages/registerLog/registerLog?array=' + JSON.stringify(that.data.array),
      imageUrl:that.data.array.pic
    }
  }
  //分享功能
  // onShareAppMessage: function (options) {
    
  //   return {
  //     title: that.data.array.name, // The title to be displayed when sharing
  //     path: '/pages/index/index', // The path to the page to be shared
  //     imageUrl: '/images/share-image.png', // An image to be displayed when sharing (optional)
  //   }
  // },
})
