import Vue from 'vue'
import App from './App.vue'

import 'font-awesome/css/font-awesome.css'

import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/axios'
import './config/alerts'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
