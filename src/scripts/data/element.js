import { genId } from 'utils/tool.js'

const WIDTH = 100
const HEIGHT = 100

let defaultVal = {
  width: WIDTH,
  height: HEIGHT,
  location_x: 0,
  location_y: 0,
  beginTime: 0,
  endTime: 60,
  scalingRatio: 100
}

class Element {
  static Img({x = 0, y = 0, width = WIDTH, height = HEIGHT, imgSrc = ''}) {
    const id = genId()
    let data = {
      id,
      location_x: x,
      location_y: y,
      width,
      height,
      fileName: imgSrc
    }

    let result = {...defaultVal, ...data}
    return result
  }
}

export default Element