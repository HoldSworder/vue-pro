function keyboardEvent(e, store) {
  const keyCode = e.keyCode

  switch(keyCode) {
    case 46: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      store.dispatch('program/delItem', pickId)
      break
    }

    case 37: {  //左
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      let ele = store.getters['program/getEle'](pickId)
      store.dispatch('program/changeData', {
        id: pickId,
        location_x: ele.location_x - 1
      })
      break
    }

    case 38: {  //上
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      let ele = store.getters['program/getEle'](pickId)
      store.dispatch('program/changeData', {
        id: pickId,
        location_y: ele.location_y - 1
      })
      break
    }

    case 39: {  //右
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      let ele = store.getters['program/getEle'](pickId)
      store.dispatch('program/changeData', {
        id: pickId,
        location_x: ele.location_x + 1
      })
      break
    }

    case 40: {  //下
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      let ele = store.getters['program/getEle'](pickId)
      store.dispatch('program/changeData', {
        id: pickId,
        location_y: ele.location_y + 1
      })
      break
    }
  }
}


export default keyboardEvent