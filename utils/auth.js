var common = require('./common.js');

/** 登录授权逻辑模块,不要在app.js使用 */
module.exports = {
  app: function() {
    return getApp();
  },

  /** 授权总入口，cb：成功回调函数 */
  auth: function(cb) {
    var app = this.app();
    var that = this;
    wx.checkSession({
      success: function() {
        !app.globalData.wechatUser && that.wxLogin(cb);
      },
      fail: function() {
        that.wxLogin(cb);
      }
    })
  },

  /** 是否已授权 */
  isAuth: function() {
    return (this.app().globalData.wechatUser || JSON.stringify(wx.getStorageSync('isAuth')) === 'true')?true:false
  },

  /** 清除授权 */
  clearAuth: function() {
    this.app().globalData.wechatUser = null;
    wx.setStorageSync('isAuth', false);
  },

  /** 是否有登录过 */
  hadAuth: function() {
    try {
      return wx.getStorageSync('isAuth') ? true : false;
    } catch (e) {
      wx.setStorageSync('isAuth', false);
      return false;
    }
  },


  /**** 下面为内部函数，外部不要调用 ****/

  /** 登录商城,会更新用户信息,code五分钟过期 */
  login: function(code, wxUser, cb) {
    var app = this.app();
    var that = this;
    if (typeof code == 'undefined' || code == '') {
      app.globalData.wechatUser = null;
      that.alertLoginErrorAndGoHome('登录码为空，请重新尝试');
      return false;
    }
  
    app.request.get('/user/info/openId', {
    successReload: true,
      data: {
        openId: code,
        // oauth: 'miniapp',
        // nickname: wxUser.nickName,
        // head_pic: wxUser.avatarUrl,
        // sex: wxUser.gender
      },
      success: (res)=> {
        // if (res.data.status == -1) { //参数错误重新授权登录
        //   wx.clearStorageSync()
        //   that.failGetWxUser(code, cb);
        //   return;
        // }
        wx.setStorageSync('isAuth', true);
        app.globalData.userInfo = res.data;
        // app.globalData.userInfo.head_pic = common.getFullUrl(app.globalData.userInfo.head_pic);
        typeof cb == "function" && cb(app.globalData.userInfo, app.globalData.wechatUser);
      },
      failStatus: function(res) {
        //如果还没注册账户,关联账户
        if (res.data.result === '100') {
            that.goHome();
            return false;
        }

        //清除登录信息
        wx.clearStorageSync()
        that.clearAuth();
        that.failGetWxUser(code, cb);
        return false;
      },
      fail: function(res) {
        wx.clearStorageSync()
        that.clearAuth();
        that.failGetWxUser(code, cb);
        return false;
      }
    });
  },

  /** 微信登录,cb成功回调 */
  wxLogin: function(cb) {
    var that = this;
    wx.login({
      success: function(res) {
        if (!res.code) {
          wx.showModal({
            title: '获取用户登录态失败',
            content: res.errMsg,
            showCancel: false,
            complete: function() {
              that.goHome();
            }
          });
          return;
        }
        that.app().globalData.code = res.code;
        that.doGetWxUser(res.code, cb);
      }
    });
  },

  doGetWxUser: function (code, cb) {
    var that = this;
    var app = that.app();
    wx.getUserInfo({
      success: function (user) {
        app.globalData.wechatUser = user.userInfo;
        that.login(code, user.userInfo, cb);
      },
      fail: function () {
        that.failGetWxUser(code, cb);
      }
    });
  },

  failGetWxUser: function(code, cb) {
    var that = this;
    var is_auth = wx.getStorageSync('isAuth');
    var app = this.app();
    var app_is_auth = app.globalData.is_auth; //是否正在使用授权
    // 获取用户授权信息
    if (is_auth == false && app_is_auth == false) {
      app.globalData.is_auth = true; //确定授权中
      var pages = getCurrentPages();
      var params = '';
      var page_url = {
        'url': ''
      };
      
      page_url.url = '/' + pages[pages.length - 1].route;
      if (params == '') {
        wx.redirectTo({
          url: '/pages/index/login/login?page_url=' + JSON.stringify(page_url)
        });
      } else {
        wx.redirectTo({
          url: '/pages/index/login/login?page_url=' + JSON.stringify(page_url) + '&' + params
        });
      }
      return false;
    } else {
      app.globalData.is_auth = false;
    }
  },

  alertNoAuthAndGoHome: function() {
    var that = this;
    this.app().showWarning('你尚未授权登录', function() {
      that.goHome();
    }, null, true);
  },

  alertLoginErrorAndGoHome: function(msg) {
    if (!(typeof msg == 'string' && msg != '')) {
      msg = '登录时发生错误';
    }
    var that = this;
    var app = that.app();
    app.getUserInfo(null, true);
    this.app().showWarning(msg, function () {
        that.goHome();
    }, null, true);
  },

  goHome: function() {
    wx.switchTab({
      url: '/pages/index/index/index'
    });
  }
}