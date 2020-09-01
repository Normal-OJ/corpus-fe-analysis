const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
    	'/api': {
		target: 'http://backend:8787/api',
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
