Page({
  data: {
    imageUrl: "",
    imageRotation: 0,
    isCropMode: false, 
    startX: 0,
    startY: 0,
    cropWidth: 0,
    cropHeight: 0,
    savedTimes: [],
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          imageUrl: res.tempFilePaths[0]
        });
      }
    });
  },
  resetImage: function() {
    this.setData({
      imageUrl: ''
    });
  },

  rotateImage: function () {
    // 增加旋转角度
    let newRotation = this.data.imageRotation + 90;

    // 限制旋转角度在0~360度范围内
    newRotation = newRotation % 360;

    // 更新图片旋转角度
    this.setData({
      imageRotation: newRotation,
    });
  },

  saveImage: function() {
    // Get the current time in milliseconds
    const currentTime = Date.now();

    // Add the current time to the array of saved times
    this.setData({
      savedTimes: [...this.data.savedTimes, currentTime],
    });
  

  // Navigate to the other page and pass the array of saved times as a query parameter
  
    wx.navigateTo({
      url: '/pages/savelist/savelist?saveTime=' + JSON.stringify(this.data.savedTimes),
    });
  }
  // saveImage: function() {
  //   // Get the current time in milliseconds
  //   const currentTime = Date.now();
  //   this.setData({
  //     savedTimes: [...this.data.savedTimes, currentTime],
  //   });
  //   // Navigate to the other page and pass the time value as a query parameter
  //   wx.navigateTo({
  //     url: '/pages/savelist/savelist?saveTime=' + JSON.stringify(this.data.savedTimes),
  //   });
  // }
  
})