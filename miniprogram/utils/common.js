export function formatTimeSecond(second){
	if(typeof second !== 'number') return false
	var time = Math.ceil(second)
	var remainder = time % 60
	remainder = remainder >= 10 ? remainder : '0' + remainder
	var result = Math.floor(time / 60)
	var s = 0
	if(result >= 1){
		s =  Number(result + '.' + remainder)
	} else {
		s = Number(0 + '.' + remainder)
	}
	return s
}

export function singers(arr) {
  if(typeof arr !== 'object') return
  if(!arr.length) return
  if(arr.length === 1) return arr[0].title
  var names = '';
  for (var i = 0; i < arr.length; i++) {
    names += arr[i].title + ' / '
  }
  return names.substring(0, names.length - 3)
}
