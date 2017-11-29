// pages/user/user.js
import $ from '../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id : 0,
    memberUserInfo : {},
    members : {},
    countMembers : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var group_id = options.group_id;
    this.setData({
      group_id : group_id,
    });
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
    var that = this;
    $.post(
      'index.php?m=sapp&c=member&a=listMemberOfGroup',
      {
        group_id: this.data.group_id,
      },
      function(res){
        console.log(res.data);
        that.setData({
          // memberUserInfo : res.data.memberUserInfo,
          members : res.data.members,
          countMembers: res.data.countMembers,
        });
      });
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
  
  },

  info: function (e) {
    console.log(e);
    var user_id = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../info/info?user_id=' + user_id + '&group_id=' + this.data.group_id,
    })
  }
})