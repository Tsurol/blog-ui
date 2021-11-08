import Vue from 'vue'

/**
 * @fmt: 日期格式 如 YYYY-mm-dd HH:MM
 * @data: 日期对象
 * */
function dateFormat(fmt, date) {
	let ret
	const opt = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		ms: date
			.getMilliseconds()
			.toString()
			.slice(0, 2), // 毫秒 保留两位
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	}
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
		}
	}
	return fmt
}
Vue.filter('formatDate', function(date) {
	if (!date) {
		date = new Date()
	} else if (typeof date === 'string') {
		date = new Date(date)
	}
	return dateFormat('YYYY-mm-dd HH:MM:SS', date)
})
