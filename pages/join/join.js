import $ from '../../common/common.js';
// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo: {},
    userInfo: {},
    groupid: 0,
    invit_user_id:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupid = options.groupid;
    var invit_user_id = options.user_id;
    var that = this;
    that.setData({
      groupid : groupid,
      invit_user_id : invit_user_id,
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log('生命周期函数--监听页面加载OK');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('生命周期函数--监听页面初次渲染完成OK');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var groupid = this.data.groupid;
    if (groupid != 0) {
      $.post(
        'index.php?m=sapp&c=group&a=findGroup',
        {
          sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
          group_id: JSON.stringify(groupid),
        },
        function (res) {
          console.log(res.data);
          if (res.data.status == 1) {
            console.log(res.data.message);

            that.setData({
              groupInfo: res.data.groupInfo,
              userInfo: res.data.userInfo,
              members: res.data.members,
            });
          } else {
            console.log(res.data.message);
          }
        }
      );
    }
    console.log('生命周期函数--监听页面显示OK');
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var user = this.data.userInfo;
      console.log(user);
      
      var userInfo = this.data.userInfo;
      var group_id = this.data.group_id;
      var invit_user_id = this.data.invit_user_id;
      $.post(
        'index.php?m=sapp&c=login&a=saveUserInfo',
        {
          sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
          userInfo: JSON.stringify(userInfo)
        },
        function (res) {
          console.log(res.data);
          $.post(
            'index.php?m=sapp&c=member&a=createGroupMembers',
            {
              sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
              group_id: group_id,
              invit_user_id: this.data.invit_user_id,
            },
            function (res) {
              console.log(res.data.message);
            }
          );
        }
      );
      wx.redirectTo({
        url: '../main/main?groupid=' + this.data.groupid,
      })
    }
  },

  joinGroup: function (e) {
    var group_id = this.data.groupid;
    // 将用户信息与分组信息绑定（加入该分组）
    $.post(
      'index.php?m=sapp&c=member&a=createGroupMembers',
      {
        sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
        group_id: group_id,
        invit_user_id : this.data.invit_user_id,
      },
      function (res) {
        console.log(res.data.message);
      }
    );
    wx.redirectTo({
      url: '../main/main?groupid=' + group_id,
    })
  }
})