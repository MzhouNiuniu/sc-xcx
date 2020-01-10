// pages/home/index.js
var app = getApp();
const http = app.globalData.http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificate:[],
    course:[],
    headLine:[],
    listData: {
      pageNum: 1,
      pageSize: 2,
      type: '',
      data: [],
      noMore: false,
      timeFilter: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    console.log('231')
    this.getBase()
  },
  async getBase() {
    const res = await http.get(app.globalData.api.home.index)
    this.setData({
      certificate:res.certificate,
      course:res.course,
    })
    console.log(res)
  },
  async getList(){
    const res = await http.get(app.globalData.api.home.getList,{
      page:this.data.listData.pageNum,
      limit:this.data.listData.pageSize
    })
    let listData =this.data.listData
    listData.data = this.data.listData.data.concat(res.rows)
    listData.pageNum = listData.pageNum += 1
    console.log(this.data.listData)
    this.setData({
      listData
    })
    if (res.count < pageSize) {
      this.setData({
        ['listData.noMore']: true
      })
      return
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