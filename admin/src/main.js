import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import http from './http'

Vue.config.productionTip = false

// 将http加载到vue原型上，在任意页面就都可以用this.$http来访问数据请求接口
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
