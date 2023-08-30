Page({
  onLoad: function(options) {
    // 获取传递的时间参数
    var saveTimes = JSON.parse(options.saveTime);

    // 将时间保存到页面数据中
    this.setData({
      saveTimes: saveTimes
    });
  }
})