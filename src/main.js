import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import * as VueGoogleMaps from 'vue2-google-maps'

import Navbar from '@/components/Navbar'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import '@/scss/theme.scss';

Vue.use(ElementUI, {locale})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBbet5aF976qcmBwIh45DPgZ5-zy9OGTWk',
    libraries: 'places'
  }
})

Vue.component('navbar', Navbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
