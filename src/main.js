import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios

window.token = localStorage.getItem('token');

window.axios = axios
window.axios.defaults.baseURL = 'https://mockup-api.herokuapp.com'
window.axios.defaults.params = { api_token: window.token }


import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

window._ = require('lodash')
Vue.config.productionTip = false