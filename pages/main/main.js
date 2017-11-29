import $ from '../../common/common.js';
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo:{},
    userInfo:{},
    groupid:0,
    memberUserInfo:{},
    members : {},
    teamArray : {},
    isCreateUser : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupid = options.groupid;
    var that = this;
    that.setData({
      groupid: groupid,
    });
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
          
          if (res.data.status == 1) {
            that.setData({
              groupInfo: res.data.groupInfo,
              userInfo: res.data.userInfo,
              // memberUserInfo : res.data.memberUserInfo,
              members: res.data.members,
              teamArray: res.data.teamArray,
              isCreateUser: res.data.isCreateUser,
            });
          } else {
            console.log(res.data.message);
          }
        }
      );
    }
    console.log('生命周期函数--监听页面显示OK');
  },

  newTeam: function (e) {
    var that = this;
    $.post(
      'index.php?m=sapp&c=group&a=checkgroup',
      {
        group_id : this.data.groupid,
      },
      function(res) {
        if(res.data.status == 1) {
          that.setData({
            teamArray: res.data.teamArray,
          });
        }else {
          console.log(res.data);
        }
      }
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('生命周期函数--监听页面隐藏OK');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('生命周期函数--监听页面卸载OK');
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
  
  },

  setting: function(event) {
    var group_id = event.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '../create/create?group_id='+group_id,
    })
  },

  invit: function() {
    var group_id = this.data.groupid;
    wx.navigateTo({
      url: '../invit/invit?group_id='+group_id,
    })
  },

  user: function() {
    console.log(this.data.group_id);
    wx.navigateTo({
      url: '../user/user?group_id='+this.data.groupid,
    })
  },

})