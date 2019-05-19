//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},//用户信息
    signNum:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: (result) => {
        var nickName = result.userInfo.nickName
        var userPic = result.userInfo.avatarUrl
        var userData = { 'nickName': nickName, 'userPic': userPic }
        wx.setStorageSync('userInfo', userData)
        that.setData({
          userData: userData
        })
      }
    })
  },
   //授权获取用户数据
   bindGetUserInfo (){
    wx.showLoading({
      title: '授权中',
    })
    var that = this
    wx.login({
      success:()=>{
        wx.getUserInfo({
          success:(result)=>{
            var nickName = result.userInfo.nickName
            var userPic = result.userInfo.avatarUrl
            var userData = {'nickName':nickName,'userPic':userPic}
            wx.setStorageSync('userInfo', userData)
            that.setData({  
              userData:userData
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  //签到
  sign (){
    var that = this
    wx.showLoading({
      title: '签到中',
    })
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            sign:true,
            signShow:true,
            signTime: Date.parse(new Date()),
            signNum:that.data.signNum + 1
          })
        }, 1500)  
  },
  getUserInfo: function(e) {
    console.log(e)
    wx.setStorageSync('userInfo',e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
