// pages/xray/xray.js
import util from '../../utils/util.js'
import FormData from '../../third-utils/fromData/index.js'

Page({
  data: {
    imgUrl: '',
    _width : 0,
    _height : 0,
    width : `--width: 0rpx`,
    height : `--height: 0rpx`,
    submitted : false,
    // apiUrl: `http://192.168.1.117:5000/predict`,
    apiUrl: `https://bspine.mynatapp.cc/predict`,
    // apiUrl: `http://www.bspine.cn/predict`,
    centerline:false,
    ctrlpoint:false,
    endplate:false,
    cobb:false,
    
    btnValue: '原图', 
    space: '&nbsp;&nbsp;',

    images_drawed_name:['image_raw','image_centerline','image_cp','image_endplate','image_cobb'],
    images_drawed_urls:['','','','',''],
    header: {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
  },
  checkboxChange(e){
    let checked =e.detail.value;
    console.log(checked)
    this.setData({
      centerline: checked.includes('ckb1'),
      ctrlpoint: checked.includes('ckb2'),
      endplate: checked.includes('ckb3'),
      cobb: checked.includes('ckb4')
    })
    
  },
  resetImage(){
    this.setData({
      submitted : false,
      showId: 0,
      btnValue: '原图',
      images_drawed_urls: [`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`]
    })
    // console.log(`aaaaaa_${this.data.showId}`)
    // console.log(`bbbbbb_${this.data.s}`)
    
  },
  clickImage(){
    const btnValues=['原图','中心线','控制点','端椎','Cobb']
    
    let tmp=this.data.showId+1
    // let tmpp=tmp % maxv
    console.log(`aaaaa_${tmp % 5}`)
    // tmp=tmp%maxv
    this.setData({
      showId: tmp % 5,
      btnValue: btnValues[tmp % 5]
    })
    // console.log(this.data.showId)
    // console.log(this.data.btnValue)
  },
  resize_show(width, height, max_width=350, max_height=600){
    if (width > max_width){
      height=max_width*height/width;
      width=max_width;
      return [width, height];
    }
    if (height > max_height){
      width=max_height*width/height;
      height=max_height;
      return [width, height];
    }
    return [width,height]
  },
  onLoad: function(options) {
    const imgUrl = options.filepath
    let _width, _height, size;

    console.log(`${options.width} aaaa ${options.height}`)
    
    size=this.resize_show(options.width,options.height)
    console.log(`${size}`)
    _width=size[0]
    _height=size[1]

    this.setData({
      imgUrl: imgUrl,
      width: `--width: ${_width*2}rpx`,
      height: `--height: ${_height*2}rpx`,
      submitted: options.submitted==undefined? false:true
    })
    this.setData({
      images_drawed_urls: [`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`,`${this.data.imgUrl}`]
    })
    // console.log(imgUrl)
    // console.log(this.data.width)
    // console.log(this.data.height)
    // console.log(options.edited)

    wx.getImageInfo({
      src:this.data.imgUrl,
      success(res){
        console.log(`${res.width} _ ${res.height}`)
      }
    })
  },

  tailorImage(){
    wx.navigateTo({
      url: `/pages/cropper/cropper?imgSrc=${this.data.imgUrl}&width=${this.data.width}&height=${this.data.height}`,
    })
  },

  submitImage() {
    wx.uploadFile({
      url: this.data.apiUrl,
      filePath: this.data.imgUrl,
      name: 'image',

      success: res => {
        // this.clickImage()
        console.log(res.data)
        const recv_content=JSON.parse(res.data)
        const images_all = recv_content['ret']['images_drawed']
        this.setData({
          submitted: true,
        })
        this.setData({
          images_drawed_urls: [`${this.data.imgUrl}`,`${wx.env.USER_DATA_PATH}/image_centerline.png`,`${wx.env.USER_DATA_PATH}/image_cp.png`,`${wx.env.USER_DATA_PATH}/image_endplate.png`,`${wx.env.USER_DATA_PATH}/image_cobb.png`]
        })
        for(let i=0; i<images_all.length; i++){
          for(let j=0; j<images_all[i].length;j++){
            const imageBase64 = images_all[i][j]

            wx.getFileSystemManager().writeFile({
              filePath: this.data.images_drawed_urls[j],
              data: imageBase64,
              encoding: 'base64',
              success: res => {
                console.log('保存成功')
                console.log(this.data.images_drawed_urls[j])
              },
              fail: (error) => {
                console.log(error);
              }
            })
          }
        }
      },
      fail: res =>{
        console.log(res.errMsg)
      }
    })
  },

})