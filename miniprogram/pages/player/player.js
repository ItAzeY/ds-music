import { setBarTitle,setData } from '../../utils/common'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songinfo: {},
    audioContext: null,
    _song: {},
    openplayerlist: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function(options) {
    var app = getApp()
    setData(this, 'songinfo', app.globalData.songinfo)
    this.setData({
      _song: {
        name: app.globalData.songinfo.name,
        image: app.globalData.songinfo.image,
        url: app.globalData.songinfo.url,
        singer: app.globalData.songinfo.singer,
        album: app.globalData.songinfo.album,
        duration: app.globalData.songinfo.duration,
        currentTime: 0,
        startTime: 0,
        autoplay: false,
        isPlay: false,
        loop: false,
        paused: true,
        progres: 0,
      }
    })
    setBarTitle(this.data.songinfo.name)
    this.play(this.data.songinfo)
  },
  play(song) {
    app.globalData.audioContext = wx.createInnerAudioContext()
    var audioContext = app.globalData.audioContext
    audioContext.src = song.url
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    audioContext.onPlay(() => {
      setData(this, '_song.isPlay', true)
    })
    audioContext.onTimeUpdate(() => {
      var progres = (audioContext.currentTime / audioContext.duration) * 100
      setData(this, '_song.currentTime',audioContext.currentTime)
      setData(this, '_song.progres',progres)
    })
  },
  handleClickPlayToggle() { // 切换播放和暂停
    var audioContext = app.globalData.audioContext
    if(audioContext.paused) {
      audioContext.play()
      setData(this,'_song.isPlay', true)
    } else {
      audioContext.pause()
      setData(this,'_song.isPlay', false)
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
    app.globalData._song = this.data._song
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

  handleClickPlayList() { // 查看列表
    setData(this, 'openplayerlist', true)
    console.log(this.data.openplayerlist)
  },
  showPlayList(e) {
    setData(this, 'openplayerlist', e.detail)
  }
})