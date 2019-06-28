// pages/devicemap/devicemap.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: 'KJLBZ-3OUAQ-XPB5R-GSKLL-WXOIT-QVF2N'
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: 0,
        longitude: 0,
        deviceInfo: {},
        markers: [],
        deviceIconSrc: [
            "../../image/category_1.png", "../../image/category_2.png",
            "../../image/category_3.png", "../../image/category_4.png",
            "../../image/category_5.png", "../../image/category_6.png",
            "../../image/category_7.png"
        ],
        devicePrice: [
            "0.04元/个", "0.20元/公斤",
            "0.50元/公斤", "0.50元/公斤",
            "0.50元/公斤", "公益回收",
            "公益回收"
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        var deinfo = JSON.parse(options.deviceInfo);
        self.setData({
            latitude: options.latitude,
            longitude: options.longitude,
            deviceInfo: deinfo,
            markers: [{
                iconPath: "../../image/icon_recycle_machine_small.png",
                id: 13,
                latitude: deinfo.responseBody.data.latitude,
                longitude: deinfo.responseBody.data.longitude,
                width: 46,
                height: 50
            }],
        });
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

    },

    clickmarker: function (event) {
        console.log(event.markerId);
    },

    toListPage: function () {

    },

    toLocation: function () {
        let mpCtx = wx.createMapContext("map");
        mpCtx.moveToLocation();
    },

    toNavigation: function () {
        var self = this;
        wx.openLocation({
            latitude: parseFloat(self.data.deviceInfo.responseBody.data.latitude),
            longitude: parseFloat(self.data.deviceInfo.responseBody.data.longitude),
            scale: 14
        });
    },
});