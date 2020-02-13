import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper /* { default global options } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
