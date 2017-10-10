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
          console.log(res.data);
          if (res.data.status == 1) {
            console.log(res.data.message);

            that.setData({
              groupInfo: res.data.groupInfo,
              userInfo: res.data.userInfo,
            });
          } else {
            console.log(res.data.message);
          }
        }
      );
    }
    console.log('生命周期函数--监听页面显示OK');
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
    wx.navigateTo({
      url: '../invit/invit',
    })
  },

  user: function() {
    wx.navigateTo({
      url: '../user/user',
    })
  }
})