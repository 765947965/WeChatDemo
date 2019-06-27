// pages/home/home.js
var ext = require('exports');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: 'KJLBZ-3OUAQ-XPB5R-GSKLL-WXOIT-QVF2N'
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bodyData: {},
        hasBodyData: false,
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 3000,
        duration: 1000,
        latitude: 0,
        longitude: 0,
        addressMoreInfo: {},
        deviceInfo: {},
        deviceIconSrc: [
            "../../image/category_1.png", "../../image/category_2.png",
            "../../image/category_3.png", "../../image/category_4.png",
            "../../image/category_5.png", "../../image/category_6.png",
            "../../image/category_7.png"
        ],
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
        var self = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                self.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                });
                self.loadData();
                qqmapsdk.reverseGeocoder({
                    location: {latitude: res.latitude, longitude: res.longitude},
                    success: function (res) {
                        //address 城市
                        console.log(res);
                        self.setData({
                            addressMoreInfo: res
                        });
                        self.loadDataDetail();
                    }
                });
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

    },

    loadData: function () {
        const self = this;
        wx.request({
            url: 'https://www.xhg.com/customer/v1.0/delivery/query-delivery-statistics',
            data: "{\"requestBody\":{\"data\":{\"areaCode\":\"441900\",\"latitude\":\"" + self.data.latitude + "\",\"longitude\":\"" + self.data.longitude + "\"}},\"requestHead\":{\"appId\":\"com.ps.recycling2c\",\"appVersion\":\"2.6.2\",\"areaCode\":\"441900\",\"channel\":\"ydog_updateinapp\",\"clientName\":\"xhg_appclient_c\",\"deviceId\":\"00000000-483b-d8bf-0000-00005a9b40c1\",\"ostype\":\"ANDROID\",\"phoneModel\":\"16s\",\"phoneResolution\":\"1080*2232\",\"systemVersion\":\"9\",\"token\":\"\",\"validateTime\":\"" + Date.parse(new Date()) + "\",\"xhgLat\":\"" + self.data.latitude + "|" + self.data.longitude + "\"}}",
            method: 'POST',
            header: {
                'content-type': 'application/json; charset=utf-8'
            },// 设置请求的 header
            success: function (res) {
                wx.stopPullDownRefresh()
                if (res.statusCode === 200) {
                    self.setData({
                        bodyData: res.data,
                        hasBodyData: true
                    })
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

    toMap: function (event) {
        var data = event.currentTarget.dataset;
        wx.openLocation({
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            scale: 18
        });
    },

    loadDataDetail: function () {
        const self = this;
        var adcode = self.data.addressMoreInfo.result.ad_info.adcode;
        wx.request({
            url: 'https://www.xhg.com/customer/v1.0/statistics/site/query-available-site-info',
            data: "{\"requestBody\":{\"data\":{\"areaCode\":\"" + adcode + "\",\"isThirty\":\"1\",\"latitude\":\"" + self.data.latitude + "\",\"longitude\":\"" + self.data.longitude + "\"}},\"requestHead\":{\"appId\":\"com.ps.recycling2c\",\"appVersion\":\"2.6.2\",\"areaCode\":\"" + adcode + "\",\"channel\":\"ydog_updateinapp\",\"clientName\":\"xhg_appclient_c\",\"deviceId\":\"00000000-483b-d8bf-0000-00005a9b40c1\",\"ostype\":\"ANDROID\",\"phoneModel\":\"16s\",\"phoneResolution\":\"1080*2232\",\"systemVersion\":\"9\",\"token\":\"\",\"validateTime\":\"1561599063002\",\"xhgLat\":\"" + self.data.latitude + "|" + self.data.longitude + "\"}}",
            method: 'POST',
            header: {
                'content-type': 'application/json; charset=utf-8'
            },// 设置请求的 header
            success: function (res) {
                wx.stopPullDownRefresh();
                if (res.statusCode === 200) {
                    console.log(res.data);
                    self.setData({
                        deviceInfo: res.data
                    });
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
});