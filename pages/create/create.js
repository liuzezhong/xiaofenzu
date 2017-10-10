import $ from '../../common/common.js';
// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleArray: ['随机分组', '实力分组',],
    styleNameArray:[],
    styleKeyArray:[],
    styleIndex: 0 ,
    checked:true,
    groupInfo:{},
    userInfo:{},

    leaderSwitch:false,
    sexSwitch:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var group_id = options.group_id;
    
    $.post(
      'index.php?m=sapp&c=style&a=getAllStyle',
      {},
      function (res) {
        that.setData({
          'styleNameArray': res.data.styleNameArray,
          'styleKeyArray': res.data.styleKeyArray,
        });
      }
    );

    if (group_id) {
      $.post(
        'index.php?m=sapp&c=group&a=findGroup',
        {
          sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
          group_id: JSON.stringify(group_id),
        },
        function (res) {
          console.log(res.data);
          if (res.data.status == 1) {
            console.log(res.data.message);
            if(res.data.groupInfo.leader == 1) {
              that.setData({
                leaderSwitch: true,
              });
            }
            if (res.data.groupInfo.sex == 1) {
              that.setData({
                sex: true,
              });
            }
            that.setData({
              groupInfo: res.data.groupInfo,
              userInfo: res.data.userInfo,
              styleIndex: res.data.groupInfo.style_id,
            });
            
          } else {
            console.log(res.data.message);
          }
        }
      );
    }
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail)
    var form = e.detail.value;
    var group_id = e.detail.target.dataset.groupid;
    if(form.name == '' || !form.name) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'loading',
        duration: 1500
      })
    } else if (form.number == '' || !form.number) {
      wx.showToast({
        title: '请输入每组人数',
        icon: 'loading',
        duration: 1500
      })
    }else {
      if(group_id) {
        $.post(
          'index.php?m=sapp&c=group&a=updateGroup',
          {
            groupInfo: JSON.stringify(form),
            sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
            group_id: JSON.stringify(group_id),
          },
          function (res) {
            if (res.data.status == 1) {
              var group_id = res.data.group_id;
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'loading',
                duration: 1500
              })
            }
          }
        );
      }else {
        $.post(
          'index.php?m=sapp&c=group&a=createGroup',
          {
            groupInfo: JSON.stringify(form),
            sessionKey: JSON.stringify(wx.getStorageSync('sessionKey'))
          },
          function (res) {
            if (res.data.status == 1) {
              var group_id = res.data.group_id;
              wx.reLaunch({
                url: '../invit/invit?group_id=' + group_id,
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'loading',
                duration: 1500
              })
            }
          }
        );
      }
      
    }
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
  
  },

  createFenzu: function () {
    wx.reLaunch({
      url: '../invit/invit',
    })
  }
})