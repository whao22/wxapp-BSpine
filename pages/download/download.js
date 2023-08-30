
Page({
  // Your page's code...

  // Function to capture and save the page as an image
  drawMyCanvas() {
    wx.showLoading()
    const that = this
    const query = wx.createSelectorQuery().in(this);
    query.select("#my-canvas").fields({ // 选择需要生成canvas的范围
        size: true,
        scrollOffset: true
    }, data => {
        let width = data.width;
        let height = data.height;
        that.setData({
            width,
            height
        })
        setTimeout(() => {
            that.startDraw()
        }, 1500);
   }).exec()
},
startDraw() {
    let that = this
    
    // 创建wxml2canvas对象
    let drawMyImage = new Wxml2Canvas({
      element: "myCanvas", // canvas的id,
      obj: that, // 传入当前组件的this
      width: that.data.width * 2,
      height: that.data.height * 2,
      background: "#141415", // 生成图片的背景色
      progress(percent) { // 进度
        // console.log(percent);
      },
      finish(url) { // 生成的图片
        wx.hideLoading()
        that.savePoster(url)
      },
      error(res) { // 失败原因
        console.log(res);
        wx.hideLoading()
      }
    }, this);
    let data = {
        // 获取wxml数据
        list: [{
            type: "wxml",
            class: ".my_canvas .my_draw_canvas",  // my_canvas要绘制的wxml元素根类名， my_draw_canvas单个元素的类名（所有要绘制的单个元素都要添加该类名）
            limit: ".my_canvas", // 要绘制的wxml元素根类名
            x: 0,
            y: 0
        }]
    }
    // 绘制canvas
    drawMyImage.draw(data, this);
},
savePoster() {
    const that = this
    wx.saveImageToPhotosAlbum({
        filePath: that.data.imgUrl,
        success: function() {
            wx.showToast({
                title: "保存成功",
                icon: "none",
                duration: 1500
            });
        },
        fail(err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
            wx.showModal({
              title: "提示",
              content: "需要您授权保存相册",
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                        wx.saveImageToPhotosAlbum({
                            filePath: that.data.imgUrl,
                            success: function () {
                              wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2000
                              })
                            },
                        })
                    } else {
                        wx.showToast({
                            title: "授权失败，请稍后重新获取",
                            icon: "none",
                            duration: 1500
                        });
                    }
                  }
                })
              }
            })
          }
        }
      })
  },

  // Rest of your page's code...
})
