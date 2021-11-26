// const path = require('path')
// var CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports表示node.js中的模块
module.exports = {
  // 例如要访问http://localhost:8080/api/system/slider/list/ => 代理http://127.0.0.1:8000/system/slider/list/
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
//   plugins: [
//     // ...
//     new CopyWebpackPlugin([{
//         from: 'node_modules/mavon-editor/dist/highlightjs',
//         to: path.resolve(__dirname, '../dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
//     }, {
//         from: 'node_modules/mavon-editor/dist/markdown',
//         to: path.resolve(__dirname, '../dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
//     }, {
//         from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
//         to: path.resolve(__dirname, '../dist/katex')
//     }]),
// ],
};
