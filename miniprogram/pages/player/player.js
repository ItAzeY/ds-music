// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var topId = options.topId
    var _this = this
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    var commonParams = {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'json'
    }
    var data = Object.assign({}, commonParams, {
      topid: topId,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5'
    })
    var urlData = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg`
    var _normalizeSongs = function (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
    class Song {
      constructor({
        id,
        mid,
        singer,
        name,
        album,
        duration,
        image,
        url
      }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.filename = `C400${this.mid}.m4a`
        this.url = url
      }

      getLyric() {
        if (this.lyric) {
          return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
          getLyric(this.mid).then((res) => {
            if (res.retcode === ERR_OK) {
              debugger
              this.lyric = Base64.decode(res.lyric)
              resolve(this.lyric)
            } else {
              reject(new Error('no lyric'))
            }
          })
        })
      }
    }
    var createSong = function (musicData) {
      return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
      })
    }
    var isValidMusic = function (musicData) {
      return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
    }
    var filterSinger = function (singer) {
      let ret = []
      if (!singer) {
        return ''
      }
      singer.forEach((s) => {
        ret.push(s.name)
      })
      return ret.join('/')
    }
    var genUrlMid = function (mids, types) {
      return {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '' + Math.round(2147483647 * Math.random()) * (new Date()).getUTCMilliseconds() % 1e10,
          songmid: mids,
          songtype: types,
          uin: '0',
          loginflag: 0,
          platform: '23'
        }
      }
    }
    wx.request({
      url: urlData,
      method: 'get',
      data: data,
      success: function (res) {
        _this.setData({
          songlist: _normalizeSongs(res.data.songlist)
        })
        var mids = []
        var types = []
        _this.data.songlist.forEach((song) => {
          mids.push(song.mid)
          types.push(0)
        })
        var commonParams = {
          g_tk: 1928093487,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          format: 'jsonp'
        }
        var data = Object.assign({}, commonParams, {
          g_tk: 5381,
          format: 'json',
          platform: 'h5',
          needNewCode: 1,
          uin: 0
        })
        var urlMid = genUrlMid(mids, types)
        wx.request({
          url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
          data: {
            comm: data,
            req_0: urlMid
          },
          method:'POST',
          success:function(r) {
            var urlMids = r.data.req_0
            var purlMap = {}
            urlMids.data.midurlinfo.forEach((item) => {
              if (item.purl) {
                purlMap[item.songmid] = item.purl
              }
            })
            _this.data.songlist = _this.data.songlist.filter((song) => {
              const purl = purlMap[song.mid]
              if (purl) {
                song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
                return true
              }
              return false
            })
            console.log(_this.data.songlist)
          }
        })
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

  }
})