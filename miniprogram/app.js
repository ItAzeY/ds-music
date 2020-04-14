//app.js
import {
  setData
} from './utils/common'
App({
  globalData: {
    rankinfo: null,
    songinfo: null,
    audioContext: null,
    _song: null,
    _songlist: []
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
        // debugger
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
  playToggleChange() {
    var audioContext = this.globalData.audioContext
    var _song = this.globalData._song
    if (audioContext.paused) {
      audioContext.play()
      _song.isPlay = true
    } else {
      audioContext.pause()
      _song.isPlay = false
    }
    console.log(this.globalData._song)
  },
  play() {
    this.globalData.audioContext.play()
  },
  pause() {
    this.globalData.audioContext.pause()
  }
})