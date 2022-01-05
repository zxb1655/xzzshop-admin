import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
import store from './store'
import api from './config/api'
import './element.js'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueAxios, Axios)

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') || ''
  //配置接口信息
  Axios.defaults.baseURL = api.rootUrl
  console.log(Axios.defaults.headers)
  Axios.defaults.headers.common['x-xzzshop-token'] = token

  if (!token && to.name !== 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
