exports.http = {
  get(url, data) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url,
        method: 'GET',
        data,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        success: function (res) {
          resolve(res.data.data);
        },
        fail: function (err) {
          reject(err);
        }
      })
    })
  },
  post(url, data) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url,
        method: 'POST',
        data,
        header: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        success: function (res) {
          resolve(res.data.data);
        },
        fail: function (err) {
          reject(err);
        }
      })
    })
  }
}