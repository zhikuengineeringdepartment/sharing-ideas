module.exports = {
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        // target: 'http://211.87.227.234:10234/', //对应自己的接口
        target: 'http://localhost:8899/', // 本地测试
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
