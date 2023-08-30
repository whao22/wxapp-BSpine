// pages/gallery/gallery.js

Page({

  data: {
    images: [
      {src: '/images/xray/1.jpg', time: '2001.01.01'}, 
      {src: '/images/xray/2.jpg', time: '2002.01.02'}, 
      {src: '/images/xray/3.jpg', time: '2003.01.01'}, 
      {src: '/images/xray/4.jpg', time: '2004.01.01'}, 
      {src: '/images/xray/5.jpg', time: '2005.01.01'}, 
      {src: '/images/xray/6.jpg', time: '2006.01.01'},
      {src: '/images/xray/5.jpg', time: '2007.01.01'}, 
      {src: '/images/xray/6.jpg', time: '2008.01.01'},
      {src: '/images/xray/6.jpg', time: '2009.01.01'},
      
    ]
  },

  viewImage(e) {
    wx.navigateTo({
      url: '../xray/xray',
    })
  },

  // onLoad: function() {
  //   this.getCurrentTime();
  // },
  
  // getCurrentTime: function() {
  //   let date = new Date();
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  
  //   this.setData({
  //     currentTime: hours + ':' + minutes
  //   })
  // }

})