import $ from '../../common/common.js';
// pages/invit/invit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo:[],
    userInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var group_id = options.group_id;
    var that = this;
    $.post(
      'index.php?m=sapp&c=group&a=findGroup',
      { group_id: JSON.stringify(group_id),
        sessionKey: JSON.stringify(wx.getStorageSync('sessionKey'))},
      function (res) {
        console.log(res);
        that.setData({
          'groupInfo': res.data.groupInfo,
          'userInfo': res.data.userInfo,
        });
      }
    );
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
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      var group_id = res.target.dataset.groupid;
      var group_name = res.target.dataset.groupname;
      var nickname = res.target.dataset.nickname;
      
      return {
        title: nickname+'邀请你加入'+group_name+'！',
        path: '/page/main?group_id='+group_id,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },

  returnList: function() {
    wx.redirectTo({
      url: '../hame/hame',
    })
  }
})