// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMoneyInfo:{},
    hasUserMoneyInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()
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
    const self = this;
    wx.request({
      url: 'https://www.xhg.com/customer/v1.0/userinfo/query-user-info',
      data: "{\"requestBody\":{\"data\":{}},\"requestHead\":{\"appId\":\"com.ps.recycling2c\",\"appVersion\":\"2.6.2\",\"channel\":\"ydog_updateinapp\",\"clientName\":\"xhg_appclient_c\",\"deviceId\":\"00000000-483b-d8bf-0000-00005a9b40c1\",\"ostype\":\"ANDROID\",\"phoneModel\":\"16s\",\"phoneResolution\":\"1080*2232\",\"systemVersion\":\"9\",\"token\":\"V1@897e6a9017539d395675094ab277e847a074f249dc9dd32143661068fb91d0f2c9d4e2d9b75523ef4bd5e5b927939ed3\",\"validateTime\":\"" + Date.parse(new Date()) + "\"}}",
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },// 设置请求的 header
      success: function (res) {
        wx.stopPullDownRefresh()
        if (res.statusCode === 200) {
          self.setData({
            userMoneyInfo: res.data,
            hasUserMoneyInfo: true
          });
          console.log(res.data);
        } else {
        }
      },
      fail: function () {
        wx.stopPullDownRefresh()
      },
      complete: function () {
        wx.stopPullDownRefresh()
      }
    })
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