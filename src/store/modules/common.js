export default {
  namespaced: true,
  state: {
    duration: 3600,  //60分钟
    pickId: 0
  },
  getters: {
    getDuration: state => state.duration,
    getPickId: state => state.pickId
  },
  mutations: {
    SET_DURATION: (state, duration) => {
      state.duration = duration
    },
    SET_PICKID: (state, pickId) => {
      state.pickId = pickId
    }
  }
}