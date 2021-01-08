








// vue.config.js
const vueConfig = {




    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },


  devServer: {
    // development server port 8000
    port: 8400

    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },


}

// preview.pro.loacg.com only do not use in your production;

module.exports = vueConfig
