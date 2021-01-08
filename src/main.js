import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Viser from 'viser-vue'
import Antd from 'ant-design-vue'
import store from '@/vuex/store'
import vueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'ant-design-vue/dist/antd.css'
import './assets/global.less'
import Base64 from 'js-base64'
Vue.use(infiniteScroll)
Vue.use(Base64)
Vue.use(Antd)
Vue.use(vueLazyLoad,{
    loading:"./static/loading-svg/loading-bars.svg"  // 设置图片懒加载
})
Vue.use(Viser)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
