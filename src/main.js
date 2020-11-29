import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'
import Loading from './plugin/loading/index'

Vue.use(Loading, {
  title: '正在加载...'
})
Vue.use(VueLazyload, {
  loading: require('./assets/images/chen.png')
})

const vconsole = new VConsole()
Vue.use(vconsole)
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
