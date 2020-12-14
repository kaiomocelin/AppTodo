import Vue from 'vue'
<<<<<<< HEAD
import Todo from './view/todo';
=======
import VueLocalStorage from "vue-localstorage"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
>>>>>>> dea935e112311f5073660a2ac4ca55d6e89c47bd

import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import App from './view/home';

Vue.use(VueLocalStorage)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(Todo),
}).$mount('#app')
