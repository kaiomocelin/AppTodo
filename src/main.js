import Vue from 'vue'
import Todo from './view/todo';

Vue.config.productionTip = false

new Vue({
  render: h => h(Todo),
}).$mount('#app')
