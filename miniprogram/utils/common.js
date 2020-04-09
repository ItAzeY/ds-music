export function singers(arr) {
  if (typeof arr !== 'object') return
  if (!arr.length) return
  if (arr.length === 1) return arr[0].title
  var names = '';
  for (var i = 0; i < arr.length; i++) {
    names += arr[i].title + ' / '
  }
  return names.substring(0, names.length - 3)
}

export function setBarTitle(title) {
  wx.setNavigationBarTitle({
    title: title
  })
}

export const setData = (_this, obj, attr, value) => {
  var key = `${obj}.${attr}`
  _this.setData({
    [key]: value
  })
}