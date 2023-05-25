import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

import VueSweetalert2 from 'vue-sweetalert2';

import "chart.js";
import 'hchs-vue-charts';

import CryptoJS from 'crypto-js';

Vue.use(window.VueCharts);
 
Vue.use(VueSweetalert2);

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

//Set axios base url
//axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.baseURL = process.env.VUE_APP_API_URL
console.log("Base URL ::",process.env.VUE_APP_API_URL)
Vue.config.productionTip = false


if(localStorage.getItem('authTokenData') && localStorage.getItem('userInfoData'))
{
  //get authToken from localStorage and decrypt
  var token = CryptoJS.AES.decrypt(localStorage.getItem('authTokenData'),process.env.VUE_APP_SECRET_KEY)
  token = token.toString(CryptoJS.enc.Utf8);
  store.commit('app/UPDATE_AUTH_TOKEN',token);

  // get userInfo from localStorage and descrypt

  var userInfo = CryptoJS.AES.decrypt(localStorage.getItem('userInfoData'),process.env.VUE_APP_SECRET_KEY)
  userInfo = JSON.parse(userInfo.toString(CryptoJS.enc.Utf8))

  store.commit('app/UPDATE_LOGIN_USER_INFO',userInfo);
}

//create custome directive

Vue.directive('cutome-text',{
  bind(el, binding) {
    el.style.color = '#' + Math.random().toString().slice(2,8);
  }
})

Vue.directive('cell-design',{
  componentUpdated(el,binding) {
    el.style.borderRadius = '30px'
    el.style.fontSize='12px'
    el.style.padding = "5px"
    el.style.color = '#fff'
    if(binding.value == 'Employee') {
      el.style.backgroundColor = '#17a2b8'
    }
    if (binding.value ==  'superAdmin') {
      el.style.backgroundColor = '#28a745'
    }
    else {
      el.style.backgroundColor = '#6c757d'
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
