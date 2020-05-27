import Absorb from 'store/script/absorb.js'

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
      Absorb.index(key, data, own, rootGetters)
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
      Absorb.index(key, data, own, rootGetters)
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
