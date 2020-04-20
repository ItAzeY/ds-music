//app.js
App({
  globalData: {
    rankinfo: null, // 哪一个排行榜
    songinfo: null, // 自动获取到音乐信息
    playMode: 1, // 1 列表循环, 2 随机播放, 3 单曲循环
    audioContext: null, // 音乐实例
    _song: null, // 手动维护的音乐信息
    _songlist: [], // 播放列表
    _cuurentLyric: null
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-vtpj0',
        traceUser: true,
      })
    }
    this.globalData = {}
  },
  // 全局监听 _song
  setWatching(key, method) {
    let obj = this.globalData._song
    // console.log('I am watching now '+key);
    //加个前缀生成隐藏变量，防止死循环发生
    let ori = obj[key]; //obj[key]这个不能放在Object.defineProperty里
    if (ori) { //处理已经声明的变量，绑定处理
      method(ori);
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this['_' + key] = value;
        method(value); //数据有变化的时候回调函数，实现同步功能
      },
      get: function () {
        if (typeof this['__' + key] == 'undefined') {
          if (ori) {
            //这里读取数据的时候隐藏变量和 globalData设置不一样，所以要做同步处理
            this['__' + key] = ori;
            return ori;
          } else {
            return undefined;
          }
        } else {
          return this['__' + key];
        }
      }
    })
  },
  watch(key, method) {
    var obj = this.globalData
    let ori = obj[key];
    if (ori) {
      method(ori);
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this['__' + key] = value;
        method(value); //数据有变化的时候回调函数，实现同步功能
      },
      get: function () {
        if (typeof this['__' + key] == 'undefined') {
          if (ori) {
            //这里读取数据的时候隐藏变量和 globalData设置不一样，所以要做同步处理
            this['__' + key] = ori;
            return ori;
          } else {
            return undefined;
          }
        } else {
          return this['__' + key];
        }
      }
    })
  },
  playToggleChange() { // 播放暂停切换
    var audioContext = this.globalData.audioContext
    if (audioContext.paused) {
      audioContext.play()
      this.globalData._song.isPlay = true
    } else {
      audioContext.pause()
      this.globalData._song.isPlay = false
    }
  },
  play() { // 播放音乐
    this.globalData.audioContext.play()
  },
  pause() { // 暂停播放
    this.globalData.audioContext.pause()
  },
  destroy() { // 销毁音乐实例
    this.globalData.audioContext.destroy()
  },
  playPrev() {
    var playMode = this.globalData.playMode || 3
    var song = this.globalData.songinfo
    var songlist = this.globalData._songlist
    if (playMode === 1) {
      var index = songlist.findIndex(item => item.name === song.name)
      var newSong = songlist[index - 1]
      if (newSong) {
        this.globalData.songinfo = songlist[index - 1]
      } else {
        this.globalData.songinfo = songlist[songlist.length - 1]
      }
    } else if (playMode === 2) {
      var newSong = songlist[Math.floor(Math.random() * songlist.length + 1) - 1]
      this.globalData.songinfo = newSong
    } else if (playMode === 3) {
      this.globalData.songinfo = song
    }
  },
  playNext() {
    var playMode = this.globalData.playMode || 3
    var song = this.globalData.songinfo
    var songlist = this.globalData._songlist
    if (playMode === 1) {
      var index = songlist.findIndex(item => item.name === song.name)
      var newSong = songlist[index + 1]
      if (newSong) {
        this.globalData.songinfo = songlist[index + 1]
      } else {
        this.globalData.songinfo = songlist[0]
      }
    } else if (playMode === 2) {
      var newSong = songlist[Math.floor(Math.random() * songlist.length + 1) - 1]
      this.globalData.songinfo = newSong
    } else if (playMode === 3) {
      this.globalData.songinfo = song
    }
  },
  playMode() {
    var playMode = this.globalData.playMode
    if (playMode === 1) {
      this.globalData.playMode = 2
    } else if (playMode == 2) {
      this.globalData.playMode = 3
    } else if (playMode === 3) {
      this.globalData.playMode = 1
    }
  }
})