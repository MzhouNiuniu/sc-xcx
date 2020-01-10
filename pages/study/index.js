// pages/study/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    knowledge:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.onLaunch()
  },
  toknowledge(e){

    var res=e.target.dataset.status
    console.log(res)
    if(res==0){
      this.setData({
        knowledge:true
      })
    }
    else{
      this.setData({
        knowledge: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
        this.setData({
          navHeight,
          navTop,
          winHeight: res.windowHeight - (res.windowWidth * 90 / 750) + 'px'
        })
        this.navHeight = navHeight;
        this.navTop = navTop;

        console.log(navHeight)
      },
      fail(err) {
        console.log(err);
      }
    })
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