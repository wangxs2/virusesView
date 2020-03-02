import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from './libs/common.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(ElementUI);
Vue.use(dataV)
Vue.use(common);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
