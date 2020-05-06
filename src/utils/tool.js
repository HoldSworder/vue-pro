class Tool {
  static checkHover(e, div) {
    let window = div.getBoundingClientRect()
    var x = e.clientX
    var y = e.clientY
    var divx1 = window.left
    var divy1 = window.top
    var divx2 = window.left + window.width
    var divy2 = window.top + window.height
    if (x < divx1 || x > divx2 || y < divy1 || y > divy2) {
        return false
    } else {
        return true
    }
  }
}

export default Tool