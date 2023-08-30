// pages/xray/xray.js
import util from '../../utils/util.js'

Page({
  data: {
    imgUrl: '',
    // apiUrl: `s11.z100.vip:23749`,
    apiUrl: `http://www.bing.com`,
    
    header: {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
  },

  onLoad: function(options) {
    const imgPath = wx.getStorageSync('selectedImage')
    console.log(11111111)
    console.log(imgPath)
    
    console.log(22222222)
    console.log(options.filepath)

    this.setData({
      imgUrl: imgPath
    }) 

    console.log(44444444)
    console.log(this.data.imgUrl)
  },

  submitImage(e) {
    console.log(12345)
    console.log(this.data.imgUrl)

    const imageBase64=util.getBase64(this.data.imgUrl)
    // 构造请求数据
    const data = {
      upload_img: imageBase64,
      type: '0',
      useAntiSpoofing: '0' 
    }

    // 将数据转为JSON字符串
    const sendContent = JSON.stringify(data)
    // console.log(sendContent)
    util.sendPost(this.data.apiUrl,sendContent,this.data.header)
    console.log(7777777)
  }
  

})