function checkHover(e, div) {
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

function genId(randomLength = 5) {
    const id = Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
    return id
}


export { checkHover, genId }