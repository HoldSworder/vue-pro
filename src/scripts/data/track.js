import tool from 'utils/tool.js'

class Track {
  static newTrack() {
    const id = tool.genId()
    let result = {
      name,
      id,
      elementList: []
    }
    
    return result
  }
}

export default Track