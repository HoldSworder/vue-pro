//判断鼠标是否和元素重合
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

//生成随机数
function genId(randomLength = 5) {
    const id = Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
    return id
}

// 通过url获取原始宽高
function getNatural(url) {
    return new Promise((resolve, reject) => {
        const dom = document.createElement("img")
        dom.src = url
        dom.addEventListener('loadeddata', function() {
            const result = {
                width: dom.naturalWidth,
                height: dom.naturalHeight
            }
            console.log(result)
            resolve(result)
        })
    })
}


export { checkHover, genId, getNatural }