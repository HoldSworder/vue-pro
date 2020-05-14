function keyboardEvent(e, store) {
  const keyCode = e.keyCode

  switch(keyCode) {
    case 46: {
      let pickId = store.getters['common/getPickId']
      if(pickId === 0) return
      store.dispatch('program/delItem', pickId)
      break
    }
  }
}

export default keyboardEvent