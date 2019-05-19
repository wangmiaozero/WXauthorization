//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},//用户信息
    signNum:0,
    hasUserInfo: false,
    showTip: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      console.log("用户已授权");
    } else if (this.data.canIUse) {
      console.log("请求用户授权");
         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 登录
      wx.login({
        success: res => {
          //console.log(res);
          var code = res.code; //登录凭证
          if (code) {
            app.globalData.code = code;
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      //console.log(res);
                      app.globalData.userInfo = res.userInfo
                      app.globalData.encryptedData = res.encryptedData
                      app.globalData.iv = res.iv
                      if (res.userInfo) {
                        // 可以将 res 发送给后台解码出 unionId
                      } else {
                        that.setData({
                          showTip: true
                        });
                      }
                    }
                  })
                } else {
                  that.setData({
                    showTip: true
                  });
                }
              },
              fail: function () {
                console.log('获取用户信息失败')
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
      that.data.user =wx.getStorageSync('userInfo')
      that.setData({
        userData: that.data.user?that.data.user:null
      })
    }else {
      console.log("用户未授权");
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  //获取用户信息
  getUserInfo: function(e) {
    var that = this;
    if (e && e.detail.userInfo) {
      that.setData({
        showTip: false
      })
    }
    wx.getUserInfo({
      success: (result) => {
        console.log(result)
        var nickName = result.userInfo.nickName
        var userPic = result.userInfo.avatarUrl
        var userData = { 'nickName': nickName, 'userPic': userPic }
        wx.setStorageSync('userInfo', userData);
        that.setData({
          userData: userData
        })
      }
    })
  },
})
