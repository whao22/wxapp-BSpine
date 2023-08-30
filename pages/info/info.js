// pages/info/info.js
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoImgURL: '../../images/2.jpg',
    name:"吉林大学中日联谊医院",
    address:"吉林省长春市仙台大街126号(中心院区)",
    phone:"0431-89876666",
    intro:"吉林大学中日联谊医院是教育部“985”高校——吉林大学所属的、国家卫生和计划生育委员会管的集医疗、教学、科研、预防、保健、康复为一体的大型现代化综合性三级甲等医院。医院前身是白求恩医科大学第三临床学院。成立于1949年11月，时为中国人民解放军“长春医科大学外科学院”。先后经历了中国人民解放军第三军医大学第三临床学院、中国人民解放军第一军医大学第三临床学院、吉林医科大学第三临床学院、白求恩医科大学第三临床学院时期。1993年7月，医院主体迁入位于长春市经济技术开发区的新址。新医院是由吉林省政府和长春市政府拨地、国家卫计委投资基建、日本政府无偿援助价值26亿日元先进设备而共同兴建的，为纪念中日两国人民及政府间的友谊，医院被命名为白求恩医科大学第三临床学院（中日联谊医院）。2000年6月，吉林大学、白求恩医科大学等5所高校合并组建新吉林大学，医院易名为“吉林大学中日联谊医院”。"
    },

  goBranchList: function (e) {
    wx.navigateTo({
      url: '/pages/departmentinfo/departmentinfo?type='+e.currentTarget.dataset.type
    })
  },

  //去楼层本部页面
  goTower: function (e) {
    wx.navigateTo({
      url: '/pages/tower/tower?type=' + e.currentTarget.dataset.type
    })
  },

  //去楼层本部页面
  goBranchLocation: function (e) {
    wx.navigateTo({
      url: '/pages/branchLocation/branchLocation?type=' + e.currentTarget.dataset.type
    })
  },

  //去医院简介页面
  goHospitalInfo: function (e) {
    wx.navigateTo({
      url: '/pages/hospitalInfo/hospitalInfo'
    })
  },

  //获取医院的简介
  getHospitalIntro:function(){
    var that = this;
    wx.request({
      url: urlApi.getHospitalIntro(),
      method:"get",
      data:{},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(response){
        var obj = response.data;
        if (obj.code === 0){
          that.setData({
            name: obj.data.name,
            address: obj.data.address,
            phone: obj.data.phone,
            intro: obj.data.intro
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHospitalIntro();
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