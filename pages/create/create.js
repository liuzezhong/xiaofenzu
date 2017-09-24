// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleArray: ['随机分组', '实力分组', ],
    styleIndex: 0 ,
    checked:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function () {
  
  },

  bindPickerChange: function (e) {
    this.setData({
      styleIndex: e.detail.value
    })
  },

  tioakuanModal: function (e) {
    var that = this;
    wx.showModal({
      title: '小分组相关条款',
      content: '小分组将取得你的公开信息，包括但不仅限于昵称、头像等',
      showCancel: false,
      confirmText:'我同意',
      confirmColor:'#ED953E',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            checked:true,
          });
        }
      }
    })
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})