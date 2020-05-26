import Track from 'scripts/data/track'
import proDefault from 'scripts/data/common'

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

/**
 * 定义数据边界
 * @param {string} key 
 * @param {any} data 
 * @param {object} own 该元素属性
 * @param {object} proData 共用属性 包含画布基本参数
 */
function fix(key, data, own, proData, { rootGetters }) {
  const { width, height, location_x, location_y } = own
  const canvasW = proData.width
  const canvasH = proData.height

  switch(key) {
    case 'beginTime': {
      data = Number(data)
      if(data <= 0) return 0
      data = Math.floor(data)
      data = fixDuration(key, data, own, rootGetters)
      break
    }

    case 'endTime': {
      data = Number(data)
      const duration = rootGetters['common/getDuration']
      if(data >= duration) {
        own.beginTime = own.beginTime - (data - duration)
        data = duration
      }
      data = Math.floor(data)
      data = fixDuration(key, data, own, rootGetters)
      break
    }

    case 'location_x': {
      data = Number(data)
      if(data <= 0) {
        return 0
      }else if((data + width) >= canvasW) {
        return canvasW - width
      }
      data = Math.floor(data)
      break
    }

    case 'location_y': {
      data = Number(data)
      if(data <= 0) {
        return 0
      }else if((data + height) >= canvasH) {
        return canvasH - height
      }
      data = Math.floor(data)
      break
    }

    case 'width': {
      data = Number(data)
      if(data <= 0) {
        return 0
      }else if((data + location_x) >= canvasW) {
        return canvasW - location_x
      }
      data = Math.floor(data)
      break
    }

    case 'height': {
      data = Number(data)
      if(data <= 0) {
        return 0
      }else if((data + location_y) >= canvasH) {
        return canvasH - location_y
      }
      data = Math.floor(data)
      break
    }

    case 'scalingRatio': {
      data = Number(data)
      data = ratio(data, own, proData)
      data = Math.floor(data)
      break
    }
  }

  return data
}

// 缩放功能
function ratio(data, own, proData) {
  const { location_x, location_y } = own
  const canvasW = proData.width
  const canvasH = proData.height
  let newW = own.natural.width * data / 100
  let newH = own.natural.height * data / 100

  if(newW + location_x > canvasW) {
    newW = canvasW - location_x
    data = newW / own.natural.width * 100
  }
  if(newH + location_y > canvasH) {
    newH = canvasH - location_y
    data = newH / own.natural.height  * 100
  }

  own.width = newW
  own.height = newH
  return data
}

// 轨道元素之间边界事件
function fixDuration(key, data, own, rootGetters) {
  const { id } = own
  const trackVal = rootGetters['program/getEleParentId'](id)

  if(!trackVal) return data

  const { elementList } = trackVal
  const index = elementList.findIndex(item => item.id === id)
  
  const before = elementList[index - 1],
        after = elementList[index + 1]

  
  if(before && after) {
    if(key === 'beginTime' && data <= before.endTime) {
      own.endTime += (before.endTime - data)
      data = before.endTime
    }else if(key === 'endTime' && data >= after.beginTime) {
      own.beginTime -= (data - after.beginTime)
      data = after.beginTime
    }
  }else if(before) {
    if(key === 'beginTime' && data <= before.endTime) {
      own.endTime += (before.endTime - data)
      data = before.endTime
    }
  }else if(after) {
    if(key === 'endTime' && data >= after.beginTime) {
      own.beginTime -= (data - after.beginTime)
      data = after.beginTime
    }
  }

  return data
}