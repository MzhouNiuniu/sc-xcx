// pages/user/index.js
var app = getApp();
const http = app.globalData.http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    nickImg:"",
    haveLessons:0,
    haveTest:0,
    followed:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getInfo() {
    const userInfo = await http.get(app.globalData.api.user.wxLogin, {
      openid: wx.getStorageSync('wechatUser').userInfo.openid
    })
    if (userInfo) {
      this.setData({
        name: userInfo.name,
        phone: userInfo.phone,
        class: userInfo.class
      })
    }
  },
  onLoad: function (options) {
    console.log('321321')
        this.getInfo()
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

  }
})