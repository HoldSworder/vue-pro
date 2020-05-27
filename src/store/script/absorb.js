class Absorb {
  constructor(opt = {}) {
    this.default = {
      length: 5 //吸附阈值
    }

    this.option = {
      ...this.default,
      ...opt
    }

    this.mapObj
  }

  index(key, data, own, rootGetters) {
    const absorbMap = rootGetters['program/getAbsorb']
  
    for (const mapName in absorbMap) {
      const mapVal = absorbMap[mapName]
      for (const item of mapVal.entries()) {
        switch(mapName) {
          case 'lMap':
              if (this._checkNear(mapVal, left)) {
                console.log(1)
              } else if (this._checkNear(mapVal, right)) {
                console.log(2)
              }
              break;
            case 'rMap':
              if (this._checkNear(mapVal, left)) {
                console.log(3)
              } else if (this._checkNear(mapVal, right)) {
                console.log(4)
              }
              break;
            case 'tMap':
              if (this._checkNear(mapVal, top)) {
                console.log(5)
              } else if (this._checkNear(mapVal, bottom)) {
                console.log(6)
              }
              break;
            case 'bMap':
              if (this._checkNear(mapVal, top)) {
                console.log(7)
              } else if (this._checkNear(mapVal, bottom)) {
                console.log(8)
              }
              break;
        }
      }
    }
  }

  _checkNear(val1, val2) {
    val1 = parseInt(val1)
    val2 = parseInt(val2)
  
    const bool = Boolean(Math.abs(val1 - val2) < this.option.length)
    return bool
  }
}