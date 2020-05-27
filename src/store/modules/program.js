import Track from 'scripts/data/track'
import proDefault from 'scripts/data/common'
import fix from 'store/script/fix.js'

export default {
  namespaced: true,
  state: {
    background: '',
    data: [],
    proData: {...proDefault}
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
        return x.id === id
      })[0]
      return result
    },
    getTrack: (state, getters) => id => {
      const result = getters.getData.filter(item => {
        return item.id === id
      })[0]
      return result
    },
    getProData: state => state.proData,
    getBackground: state => state.background,
    getEleParentId: (state, getters) => id => {   //寻找指定元素id的轨道信息
      if(id === '') return
      let result
      getters.getData.forEach(item => {
        item.elementList.forEach(it => {
          if(it.id === id) {
            result = item
          }
        })
      })
      return result
    },
    getAbsorb(state, getters, rootState) {
      let allEle = getters.getAllEle
      let lMap = new Map(),
          rMap = new Map(),
          tMap = new Map(),
          bMap = new Map()

      const { nowTime } = rootState.common
      const filters = [...allEle].filter(item => {
        return ((item.beginTime <= nowTime) && (item.endTime >= nowTime))
      })

      for (const item of filters) {
        const { location_x, location_y, width, height, id } = item
        lMap.set(id, location_x)
        rMap.set(id, location_x + width)
        tMap.set(id, location_y)
        bMap.set(id, location_y + height)
      }

      return {
        lMap, rMap, tMap, bMap
      }
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
    SET_PRODATA(state, data) {
      for (const key in data) {
        const element = data[key]
        state.proData[key] = element
      }
    },
    SET_BACKGROUND: (state, background) => {
      state.background = background
    }
  },
  actions: { 
    //新增元素并新增轨道
    putNewItem({ commit, getters, rootGetters }, ele) {
      let track = Track.newTrack()
      const proData = getters.getProData

      for (const key in ele) {
        ele[key] = fix(key, ele[key], ele, proData, { rootGetters })
      }

      track.elementList.push(ele)
      commit('PUSH_TRACK', track)
    },
    /**
     * 通过data中的id找到元素并修改值
     * @param {object} data  包含元素id及需要改变的属性
     */
    changeData({ state, getters, rootGetters }, data) {
      const { getProData } = getters

      state.data.forEach(item => {
        item.elementList.forEach(it => {
          if(it.id === data.id) { //通过id找到state
            delete data.id
            for (const key in data) {
              const element = fix(key, data[key], it, getProData, { rootGetters });
              it[key] = element
            }
          }
        })
      })

    },
    //删除元素
    delItem({ state }, id) {
      let track, eleIndex, trackIndex

      state.data.forEach((item, inx) => {
        item.elementList.forEach((it, ind) => {
          if(it.id === id) {
            track = item
            eleIndex = ind
            trackIndex = inx
          }
        })
      })

      if(!track) return
      if(track.elementList.length === 1) {
        state.data.splice(trackIndex, 1)
      }else {
        track.elementList.splice(eleIndex, 1)
      }
    },
    /**
     * 添加元素到指定轨道
     * @param {{trackId, eleData}} data 包含轨道id及需要添加的元素信息
     */
    addEleToTrack({ state, getters, dispatch }, data) {
      if(!data.trackId) {
        dispatch('putNewItem', data.eleData)
        return 
      }

      let track = getters.getTrack(data.trackId)
      track.elementList.push(data.eleData)
      track.elementList.sort((a, b) => {
        return (Number(a.beginTime) + Number(a.endTime)) - (Number(b.beginTime) + Number(b.endTime))
      })
    }
  }
}


