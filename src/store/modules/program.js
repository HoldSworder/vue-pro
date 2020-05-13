import Track from 'scripts/data/track'
import proDefault from 'scripts/data/common'

export default {
  namespaced: true,
  state: {
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
        return x.id == id
      })
      return result[0]
    },
    getProData: state => state.proData
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
    }
  },
  actions: {
    putNewItem({ commit }, ele) {
      let track = Track.newTrack()
      track.elementList.push(ele)
      commit('PUSH_TRACK', track)
    },
    changeData({ state, getters }, data) {
      const { getProData } = getters

      state.data.forEach(item => {
        item.elementList.forEach(it => {
          if(it.id === data.id) { //通过id找到state
            delete data.id
            for (const key in data) {
              const element = fix(key, data[key], it, getProData);
              it[key] = element
            }
          }
        })
      })

    }
  }
}

/**
 * 定义数据边界
 * @param {string} key 
 * @param {any} data 
 * @param {object} own 该元素属性
 * @param {object} proData 共用属性 包含画布基本参数
 */
function fix(key, data, own, proData) {
  const { width, height, location_x, location_y } = own
  const canvasW = proData.width
  const canvasH = proData.height

  switch(key) {
    case 'beginTime':
      if(data <= 0) return 0
      break

    case 'location_x':
      if(data <= 0) {
        return 0
      }else if((data + width) >= canvasW) {
        return canvasW - width
      }
      break

    case 'location_y':
      if(data <= 0) {
        return 0
      }else if((data + height) >= canvasH) {
        return canvasH - height
      }
      break

    case 'width':
      if(data <= 0) {
        return 0
      }else if((data + location_x) >= canvasW) {
        return canvasW - location_x
      }
      break

    case 'height':
      if(data <= 0) {
        return 0
      }else if((data + location_y) >= canvasH) {
        return canvasH - location_y
      }
      break

    // case 'scalingRatio':
    //   ratio('change', data, own)
    //   break
  }

  return data
}

// function ratio(type, data, own) {
//   if(type === 'change') {
    
//   }
// }