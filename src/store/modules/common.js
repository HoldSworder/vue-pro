export default {
  namespaced: true,
  state: {
    duration: 3600,  //60分钟
    pickId: 0,
    nowTime: 0,
    pickMoveTrackEle: ''
  },
  getters: {
    getDuration: state => state.duration,
    getPickId: state => state.pickId,
    getNowTime: state => state.nowTime,
    getPickMoveTrackEle: state => state.pickMoveTrackEle
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
    SET_PICKMOVETRACKELE: (state, pickMoveTrackEle) => {
      state.pickMoveTrackEle = pickMoveTrackEle
    }
  }
}