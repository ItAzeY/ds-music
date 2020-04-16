// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');
const express = require('express')
const app = express()
const port = 3031

app.get('/api/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  console.log(req)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  var url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg"
  var obj = {
    "g_tk": 1928093487,
    "inCharset": "utf-8",
    "outCharset": "utf-8",
    "notice": 0,
    "format": "json",
    "songmid": event.mid,
    "platform": "yqq",
    "hostUin": 0,
    "needNewCode": 0,
    "categoryId": 10000000,
    "pcachetime": +new Date(),
  }
  axios.get(url, {
    headers: {
      referer: "https://c.y.qq.com/",
      host: "c.y.qq.com",
      cookie: "tvfe_boss_uuid=65b4490b214d4bcf; pgv_pvid=7978271646; pgv_pvi=1785401344; RK=PETYse1oEb; ptcz=47252b904b01d588535a6c535db7ffb8b16410638fb6f16b05c1a51af42c56ec; eas_sid=f1N5A7W7D1b6N6G1a9e4s2k0Z7; pac_uid=0_5e040711d6ad3; LW_uid=s1E5W7r9s8R5p784c9C4L1k1H6; LW_sid=E1L5E759N8i5m755Z4A3K181w5; uin_cookie=o0953463876; ied_qq=o0953463876; o_cookie=953463876; _ga=GA1.2.834508764.1580778480; ptui_loginuin=953463876; mobileUV=1_170cf62778b_5c7b6; ts_uid=4507329393; psrf_qqunionid=5692EA2870491A636550E42A33947F64; psrf_qqopenid=00A879C48322F7777FCB86E3E9319F25; psrf_qqaccess_token=A2AC3AFF8B0CA1C2DE58D956D0314EE9; psrf_qqrefresh_token=99CD6B72CD45C3BB8E035C2A9649362A; ts_refer=www.baidu.com/link; userAction=1; pgv_info=ssid=s3943426300; pgv_si=s5654061056; yqq_stat=0; qqmusic_key=Q_H_L_2SMWOw50eaTjOd1YD1eYez7FTdxwjqG3bqDu9C4ro8TBZb3dq_wOqN3r0Rmm1G5; qm_keyst=Q_H_L_2SMWOw50eaTjOd1YD1eYez7FTdxwjqG3bqDu9C4ro8TBZb3dq_wOqN3r0Rmm1G5; psrf_access_token_expiresAt=1594828903; uin=953463876; psrf_musickey_createtime=1587052903; player_exist=1; ts_last=y.qq.com/portal/player.html; qqmusic_fromtag=66; yplayer_open=1; yq_index=0"
    },
    params: obj
  }).then(res => {
    resolve(res.data)
  })
})