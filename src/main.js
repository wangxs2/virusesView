import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from './libs/common.js'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
Vue.use(common);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
