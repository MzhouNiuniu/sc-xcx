// pages/user/bindInfo/index.js
var app = getApp();
const http = app.globalData.http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class: '',
    phone: null,
    name: '',
    pageUrl: '',
    modify: false
  },
  getInput(e) {
    this.data[e.target.dataset.model] = e.detail.value;
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
    if (options.modify) {
      this.getInfo()
      this.setData({
        modify: true
      })
    }
    this.setData({
      pageUrl: options.pageUrl,
    });
  },
  async submit() {
    console.log(this.data)
    if (!this.data.modify) {
      const userInfo = await http.post(app.globalData.api.user.publish, {
        phone: this.data.phone,
        name: this.data.name,
        class: this.data.class,
        openid: wx.getStorageSync('wechatUser').userInfo.openid
      })
      wx.switchTab({
        url: '/pages/user/index',
      })
      const weToast = new app.WeToast();

      weToast.toast({
        title: '保存成功',
        duration: 2000
      });
    }
    else {
      const userInfo = await http.post(app.globalData.api.user.changeInFo, {
        phone: this.data.phone,
        name: this.data.name,
        class: this.data.class,
        openid: wx.getStorageSync('wechatUser').userInfo.openid,
        nickName: wx.getStorageSync('wechatUser').userInfo.nickName,
        nickImg: wx.getStorageSync('wechatUser').userInfo.avatarUrl
      })
      const weToast = new app.WeToast();
      weToast.toast({
        title: '修改成功',
        duration: 2000
      });
      wx.switchTab({
        url: '/pages/home/index',
      })
    }
   

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