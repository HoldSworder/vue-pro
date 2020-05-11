export default {
  namespaced: true,
  state: {
    duration: 3600  //60分钟
  },
  getters: {
    getDuration: state => state.duration
  },
  mutations: {
    SET_DURATION: (state, duration) => {
      state.duration = duration
    }
  }
}