import Vue from 'vue'
import Vuex from 'vuex'

import program from 'store/modules/program'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    program
  }
})

export default store