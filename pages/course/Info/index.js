// pages/course/Info/index.js


var WxParse = require('../../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight :0,
    navTop:0,
    windowHeight:0,
    more:false,
    winHeight: '100%',
    advantage:0,
    html5:0,
    toView:'advantage',
    actionView:'advantage'
  },

  toViewClick(e) {
     console.log('321')
    this.setData({
      toView: e.target.dataset.hash,
      actionView: e.target.dataset.hash
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1
  })
  },
  scrollTo(e) {
    let scrollTop = e.detail.scrollTop + 100;  //滚动的Y轴
    console.log(scrollTop)
    console.log(this.data.advantage)
    if (scrollTop >= this.data.advantage+100) {
      this.setData({
        actionView: 'html5'
      })
    }  else {
      this.setData({
        actionView: 'advantage'
      })
    }},

  //this.$apply();//WEPY更新数据

  onShow: function(){
    console.log('321')
    // 获取各模块距离顶部的距离
    new Promise(resolve => {
      let query = wx.createSelectorQuery();
      query.select('#advantage').boundingClientRect();
      query.select('#html5').boundingClientRect();
      query.exec(function (res) {
        resolve(res);
      });
    }).then(res => {
      console.log(res)
      this.setData({
        advantage: res[0].top,
        html5: res[1].top,
      });
    });
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
            winHeight :res.windowHeight - (res.windowWidth * 90 / 750) + 'px'
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
  more:function(){
      this.setData({
        more:true
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        //屏幕的宽度/屏幕的高度 = 微信固定宽度(750)/微信高度
        that.setData({
         
        })
      }
    });



    this.onLaunch()
      const  html= '<p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p><p>我是富文本</p>'
    WxParse.wxParse('article', 'html',html, this, 12);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
