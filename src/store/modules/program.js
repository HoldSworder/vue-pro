export default {
  namespaced: true,
  state: {
    data: [1]
  },
  getters: {
    getData: state => state.data
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    }
  }
}