// pages/playlist/playlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_loading: true,
    hot_loading: true,
    mv_loading: true,
    swiperImgUrls: [],
    playlist: [],
    newSong: [],
    toplist: [],
    mvlist:[],
    leaderboard: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cookie = 'tvfe_boss_uuid=65b4490b214d4bcf; pgv_pvid=7978271646; pgv_pvi=1785401344; RK=PETYse1oEb; ptcz=47252b904b01d588535a6c535db7ffb8b16410638fb6f16b05c1a51af42c56ec; eas_sid=f1N5A7W7D1b6N6G1a9e4s2k0Z7; pac_uid=0_5e040711d6ad3; LW_uid=s1E5W7r9s8R5p784c9C4L1k1H6; LW_sid=E1L5E759N8i5m755Z4A3K181w5; uin_cookie=o0953463876; ied_qq=o0953463876; o_cookie=953463876; _ga=GA1.2.834508764.1580778480; ptui_loginuin=953463876; mobileUV=1_170cf62778b_5c7b6; pgv_si=s5081336832; pgv_info=ssid=s2776672068; ts_uid=2194113020; player_exist=1; ts_refer=www.google.com/; userAction=1; uin=o0953463876; skey=@jOzpxHFlz; qqmusic_uin=; qqmusic_key=; uid=162086808; yq_playschange=0; yq_playdata=; qqmusic_fromtag=66; yq_index=0; yplayer_open=0; yqq_stat=0; ts_last=y.qq.com/n/yqq/toplist/26.html'
    let _this = this
    // 总接口
    wx.request({
      url: 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom548103509086322&g_tk=1484196593&sign=zzakeq7ixd24zr4hbtre6a87a3905322d58dff74cc847b1770f&loginUin=953463876&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A5%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A10%7D%7D%2C%22new_album_tag%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_area%22%2C%22param%22%3A%7B%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetAll%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D',
      method: 'GET',
      header: {
        'cookie': cookie
      },
      success: function(res) {
        console.log(res)
        if(res.statusCode == 200) {
          var newSong = res.data.new_song.data.songlist.slice(0,5)
          newSong.forEach(item => {
            item.url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.album.mid}.jpg?max_age=2592000`
          })
          _this.setData({
            swiperImgUrls: res.data.focus.data.content,
            playlist: res.data.recomPlaylist.data.v_hot,
            toplist: res.data.toplist.data.group[0].toplist,
            newSong: newSong,
            new_loading: false
          })
        } 
      }
    })
    // 歌曲推荐的接口
    // wx.request({
    //   url: 'https://u.y.qq.com/cgi-bin/musics.fcg?-=getUCGI07444261619080339&g_tk=1484196595&sign=zzanpuzkcuocbrzolo5faa56a6bccf99d176751b5b38850469&loginUin=953463876&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A26%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222020_13%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D',
    //   header: {
    //     'cookie': cookie
    //   },
    //   success: function(res) {
    //     if(res.statusCode == 200) {
    //       var list = res.data.detail.data.songInfoList.slice(0,5)
    //       list.forEach(item => {
    //         item.url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.album.mid}.jpg?max_age=2592000`
    //       })
    //       _this.setData({
    //         songlist: list,
    //         hot_loading: false
    //       })
    //     } 
    //   }
    // })
    // mvList 接口
    wx.request({
      url: 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?g_tk_new_20200303=1141576914&g_tk=1141576914&loginUin=953463876&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&cmd=shoubo&lan=all',
      method: 'GET',
      success: function(res) {
        if(res.statusCode == 200) {
          var list = res.data.data.mvlist.slice(0,6)
          _this.setData({
            mvlist: list,
            mv_loading: false
          })
        } 
      }
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

  },
  onChange(event) {
    console.log(event.detail);
  }
})