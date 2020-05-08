import { genId } from 'utils/tool.js'

class Track {
  static newTrack() {
    const id = genId()
    let result = {
      name,
      id,
      elementList: []
    }
    
    return result
  }
}

export default Track