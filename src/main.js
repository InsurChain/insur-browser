// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import filters from 'utils/filters'
import store from '@/components/store'
import VueI18n from 'vue-i18n'
import client from './components/api/client'

Vue.config.productionTip = false

Vue.use(Mint);
Vue.use(filters);
Vue.use(VueI18n);
const i18n = new VueI18n({
  //定义默认语言
  locale: client.getCookie('PLAY_LANG','en'), 
  messages: { 
    'zh': require('./lang/zh'), 
    'en': require('./lang/en') 
  } 
})

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
