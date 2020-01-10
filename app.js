//app.js
var request = require('./utils/request.js');
var api =require('./utils/api.js');
import {
  WeToast
} from './utils/wetoast/wetoast.js';
App({
  onLaunch: function (re) {
    console.log('3212222')
    console.log(re)
    if(!wx.getStorageSync('wechatUser')){
      console.log('无信息')
      wx.redirectTo({
        url: `/pages/login/index?pageUrl=${re.path}`,　　// 页面 A
      })
    }
  
  },
    WeToast,
  globalData: {
      wechatUser: null, //微信的授权用户信息
      userInfo: null, //用户信息
      http: request.http,
      api:api.api,
      openid:''
  }
})
