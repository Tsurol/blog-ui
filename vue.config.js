// vue.config.js文件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
	configureWebpack: (config) => {
		// 开发环境不需要gzip
		if (process.env.NODE_ENV !== 'production') return
		// 以下代码是生产环境
		// 生产环境需要gzip
		config.plugins.push(
			new CompressionWebpackPlugin({
				// 正在匹配需要压缩的文件后缀
				test: /\.(js|css|svg|woff|ttf|json|html)$/,
				// 大于10kb的会压缩
				threshold: 10240,
			})
		)
	},
}
