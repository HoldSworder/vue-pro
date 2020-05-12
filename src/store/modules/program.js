import Track from 'scripts/data/track'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    getData: state => state.data,
    getAllEle: state => {
      let result = []
      state.data.forEach(item => {
        result = [...result, ...item.elementList]
      })
      return result
    },
    getEle: (state, getters) => id => {
      const result = getters.getAllEle.filter(x => {
        return x.id == id
      })
      return result[0]
    }
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
    PUSH_TRACK(state, track) {
      state.data.push(track)
    },
    DELETE_TRACK(state, id) {
      const index = state.data.findIndex(x => {
        return x.id = id
      })

      state.data.splice(index, 1)
    },
    CHANGE_DATA(state, data) {
      state.data.forEach(item => {
        item.elementList.forEach(it => {
          if(it.id === data.id) {
            delete data.id
            for (const key in data) {
              const element = data[key];
              it[key] = element
            }
          }
        })
      })
    }
  },
  actions: {
    putNewItem({ commit }, ele) {
      let track = Track.newTrack()
      track.elementList.push(ele)
      commit('PUSH_TRACK', track)
    }
  }
}