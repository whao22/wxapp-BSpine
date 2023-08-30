Page({
  data:{
      
  },
 
    copyGroupInfo(){
      wx.setClipboardData({
          data: this.data.qqGroup,
          success (res) {console.log(res)}
      });
    }
})