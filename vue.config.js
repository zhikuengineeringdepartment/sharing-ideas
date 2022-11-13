module.exports = {
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    port: 8898,
    proxy: {
      '/api': {
        // target: 'http://www.sharingideas.cn:10000/', //对应自己的接口
        target: 'http://www.sharingideas.cn/', // 本地测试
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
