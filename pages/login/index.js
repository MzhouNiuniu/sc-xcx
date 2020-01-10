var app = getApp();
const http = app.globalData.http

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageUrl:'',
    modalstatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      pageUrl: options.pageUrl,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.is_auth = false; //授权结束
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getInfo: function(e) {
    var that = this
    wx.login({
      success:  async(res) => {
        const openidItem=  await  http.post(app.globalData.api.user.getOpenId,{data:{
          code:res.code
        }})
        wx.getUserInfo({
          success: async function(res) {
            res.userInfo.openid=openidItem.openid
            wx.setStorageSync('wechatUser', res)
            const userInfo=  await  http.get(app.globalData.api.user.wxLogin,{
              openid:openidItem.openid
            })
            if(userInfo){
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
            else{
              wx.redirectTo({
                url: `/pages/user/bindInfo/index?pageUrl=${this.data.pageUrl}`,
              })
            }
            // //暂时测试写死
            // wx.switchTab({
            //   url: '/pages/home/index',
            // })
          }
        })
      }
    });
  },

})