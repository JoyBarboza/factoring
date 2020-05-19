import Vue from 'vue'
import Vuex from 'vuex'
import VuePersistence from 'vuex-persist'
import user from '@/store/modules/user'
import invoice from '@/store/modules/invoice'

Vue.use(Vuex)

const vuexLocalStorage = new VuePersistence({
  key: 'vuex',
  storage: Window.localStorage,
  reducer: state => ({
    user: state.user
  })
})

export default new Vuex.Store({
  modules: {
    user: user,
    invoice: invoice
  },
  plugins: [vuexLocalStorage.plugin]
})
