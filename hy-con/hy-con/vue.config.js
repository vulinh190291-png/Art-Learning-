module.exports = {
  devServer: {
    port: 8081, // 前端运行端口
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 你的 SpringBoot 后端地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}