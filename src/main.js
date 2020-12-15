import Vue from 'vue'
import App from "./view/home";
import VueLocalStorage from "vue-localstorage"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import $notify, { SnotifyPosition } from 'vue-snotify'

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(VueLocalStorage)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use($notify, options)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
