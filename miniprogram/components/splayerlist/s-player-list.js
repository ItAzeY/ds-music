// components/playerlist/s-player-list.js\
var app = getApp()
import { setData } from '../../utils/common'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    _songlist: []
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this._init()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _init(){
      setData(this, '_songlist', app.globalData._songlist)
    },
    handleClickShow() {
      this.triggerEvent('showPlayList', false)
    },
    handleClickPlayer(e) {
      console.log(e)
    }
  }
})
