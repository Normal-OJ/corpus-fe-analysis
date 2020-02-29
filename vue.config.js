const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://noj.tw:8777/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  },
  configureWebpack: {
    // plugins: [new VuetifyLoaderPlugin()]
  },
  transpileDependencies: ["vuetify"]
};