var app = getApp()
import { setData } from '../../utils/common'
Component({
  /**q
   */
  lifetimes:{
    attached () { // 在组件实例进入页面节点树时执行
     app.setWatching('isPlay', v => {setData(this,'_song.isPlay', v);console.log(this.data._song)})
    },
    detached () { // 在组件实例被从页面节点树移除时执行

    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    _song: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowList: false,
    // songsImg: 'https://y.qq.com/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000',
    // playBtnImg: 'http://img0.imgtn.bdimg.com/it/u=684703812,3006845130&fm=26&gp=0.jpg',
    playBtnImg: 'http://bpic.588ku.com/element_origin_min_pic/00/95/86/0056f2eeda03cee.jpg',
    continueBtnImg: 'http://img.article.pchome.net/00/37/78/46/pic_lib/wm/IconsLand_014.JPG',
    listIcon: 'https://www.easyicon.net/api/resizeApi.php?id=1182976&size=128',
    // listIcon: 'http://pic.51yuansu.com/pic2/cover/00/32/81/581108718f965_610.jpg',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playToggleChange() {
      app.playToggleChange()
    },
    // 显示播放列表
    showList () {
      
    }
  }
})
