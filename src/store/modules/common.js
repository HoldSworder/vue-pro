export default {
  namespaced: true,
  state: {
    duration: 3600,  //60分钟
    pickId: 0,
    nowTime: 0,
    pickMoveId: ''
  },
  getters: {
    getDuration: state => state.duration,
    getPickId: state => state.pickId,
    getNowTime: state => state.nowTime,
    getPickMoveId: state => state.pickMoveId
  },
  mutations: {
    SET_DURATION: (state, duration) => {
      state.duration = duration
    },
    SET_PICKID: (state, pickId) => {
      state.pickId = pickId
    },
    SET_NOWTIME: (state, nowTime) => {
      state.nowTime = nowTime
    },
    SET_PICKMOVEID: (state, pickMoveId) => {
      state.pickMoveId = pickMoveId
    }
  }
}