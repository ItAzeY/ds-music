Page({

  /**
   * 页面的初始数据
   */
  data: {
    songinfo: {
      album: "麻雀",
      duration: 252,
      filename: "C400000lv3Zi13dSVA.m4a",
      id: 246492240,
      image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003eE8gA3TfuKc.jpg?max_age=2592000",
      isonly: 0,
      mid: "000lv3Zi13dSVA",
      msgid: 14,
      name: "麻雀",
      rate: 23,
      singer: "李荣浩"
    },
    song: {
      duration: 0,
      name: '',
      currentduration: 0,
      progres: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    var song = app.globalData.song
    console.log(song)
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    var _this = this
    this.setData({
      song: {
        duration: _this.data.songinfo.duration,
        name: _this.data.songinfo.name
      }
    })
    wx.setNavigationBarTitle({
      title: _this.data.song.name
    })
    innerAudioContext.src = "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400000lv3Zi13dSVA.m4a?guid=2012669392&vkey=CFF75E9E6AB9398FE6C5612A3F20D49D83C8CF43C568CA1DB8CF3FD78FCDF360AC47ECA384EC2331A49A32F09358C9C5CC62C67E1D9146E2&uin=0&fromtag=38"
    // innerAudioContext.src = song.url
    var currentTime = 'song.currentduration'
    var currentprogres = 'song.progres'
    innerAudioContext.onPlay(() => {
      console.log('play')
    })
    innerAudioContext.onTimeUpdate(() => {
      var progres = (innerAudioContext.currentTime / innerAudioContext.duration) * 100
      console.log(innerAudioContext.currentTime,innerAudioContext.duration )
      _this.setData({
        [currentTime]: innerAudioContext.currentTime,
        [currentprogres]: progres
      })
    })
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

  }
})