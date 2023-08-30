const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
  data:{
    userInfo:{},
    sickName:"",
    sickCard:"",
    show:"show"
  }, 
  gotoProfile(){
    wx.navigateTo({
         url: '/pages/personal/profile' 
      })
  },
      // 去登陆
      toLogin(){
          let _this = this
          wx.getUserProfile({
                  desc: '获取你的昵称、头像',
                  success: res => {
                      let userInfo = res.userInfo;
                      _this.setData({
                          userInfo: userInfo
                      })
                      wx.setStorageSync("userInfo",userInfo)
                  },
                  fail: res => {
                      //拒绝授权
                      wx.showToast({
                          title: '您拒绝了请求',
                          icon: 'error',
                          duration: 2000
                      });
                      return;
                  }
              }); 
      },
      onLoad(){        
      },
       
  //记录查询
  registerLog: function () {
    wx.navigateTo({
      // url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
      url: '/pages/registerLog/registerLog'
    })
  },

  //x线片列表
  xlistLog: function () {
    wx.navigateTo({
      // url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
      url: '/pages/xlist/xlist'
    })
  },
  down: function () {
    wx.navigateTo({
      // url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
      url: '/pages/download/download'
    })
  },

  addVisitCard: function () {
    app.addVisitCard()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.sickName == ""){
      that.setData({
        show:"show"
      })
    }else{
      that.setData({
        sickName: app.globalData.sickName,
        sickCard: app.globalData.sickCard,
        show: "hidden"
      })
    }
  },
  aboutMe(){
    wx.navigateTo({
        url: '/pages/info/about',
      })
},
feedback(){
  wx.navigateTo({
      url: '/pages/info/tousu',
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
  onShareAppMessage: function () {

  },
  getUserId(){
    let uid = wx.getStorageSync('uid');
    return uid;
},
  onShow(){ 
      let userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo)
      this.setData({userInfo:userInfo})
      if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            active: 1,
          })
        }
  },
  // 退出登录 
  clearCache(){
    this.setData({ userInfo:{} })
    wx.removeStorageSync("userInfo" );
    wx.showToast({
        title: '退出成功',
        icon:'none',
        duration: 2000
    })
},
})