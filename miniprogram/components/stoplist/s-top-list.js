// components/toplist/s-top-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    app: getApp()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindViewPlayer(e){
      let info = e.currentTarget.dataset.item
      var app = getApp()
      app.globalData.rankinfo = info
      wx.navigateTo({
        url: `../../pages/rank/rank?topId=${info.topId}`,
      })
    }
  }
})
