function keyboardEvent(e, store) {
  const keyCode = e.keyCode

  switch(keyCode) {
    case 46: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      store.dispatch('program/delItem', pickId)
      break
    }

    case 37: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      let ele = store.getters['program/getEle']
      ele.location_x = ele.location_x - 1
      console.log('left')
      break
    }

    case 38: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      console.log('up')
      break
    }

    case 39: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      console.log('right')
      break
    }

    case 40: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      console.log('down')
      break
    }
  }
}


export default keyboardEvent