
Page({
    data: { 
      history:[
          {
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.05.12',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.05.20',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.05.27',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.6.10',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.06.20',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.06.27',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.07.02',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.07.11',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          },{
                link:'/pages/info/info',  
                url:'/images/xray/1.jpg' ,
                text:'2023.07.19',
                cobb:{"mt":25, "pt":20, "tl":5},
                cls:"C"
          }
      ],
      imgUrl: "",
      height: 0,
      width: 0,
      space:'&nbsp;',
      bspace:'&emsp;'
    },
    // A页面
    addImage: function() {
      wx.chooseImage({
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0]
          let width=0
          let height=9
          wx.getImageInfo({
            src: tempFilePath,
            success(res){
              // 跳转到页面B
              wx.navigateTo({
                url: `/pages/xray/xray?filepath=${tempFilePath}&width=${res.width}&height=${res.height}`
              })
            }
          })
        } 
      })
    }
})
