// pages/info/info.js
import $ from '../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flight: 0,
    user_id : 0,
    userInfo : {},
    group_id : 0,
    canHua : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = options.user_id;
    var group_id = options.group_id;
    this.setData({
      user_id : user_id,
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
      'index.php?m=sapp&c=user&a=getUserInfo',
      {
        user_id : this.data.user_id,
        group_id : this.data.group_id,
        sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
      },
      function(res){
        that.setData({
          userInfo : res.data.userInfo,
          flight: res.data.userInfo.flight_value,
          canHua: res.data.canHua,          
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

  sliderChange: function (event) {
    
    var flight = event.detail;
    this.setData({
      flight: flight.value,
    });
    /**
     * 用户滑动滑块，更改战斗力
     */
    $.post(
      'index.php?m=sapp&c=user&a=changeFlightValue',
      {
        user_id : this.data.user_id,
        flight_value : flight.value,
      },
      function(res) {
        console.log(res.data.message);
      }
    );
  }
})