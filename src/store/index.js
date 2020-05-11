import Vue from 'vue'
import Vuex from 'vuex'

import program from 'store/modules/program'
import common from 'store/modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    program,
    common
  }
})

export default store