
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/style.css'
import './assets/iconfont/iconfont.css'
import './assets/animate.css'

Vue.use(VueResource)

Vue.config.productionTip = false





new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



