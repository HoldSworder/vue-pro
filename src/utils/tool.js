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

//返回两个对象的差异部分
function diffObj(newObj, oldObj) {
    let diff = {}
    for (const key in newObj) {
        if(typeof newObj[key] === 'object' && typeof oldObj[key] === 'object' && newObj[key] && oldObj[key]) {
            diff[key] = diffObj(newObj[key], oldObj[key])
        }

        if(newObj[key] !== oldObj[key]) {
            diff[key] = newObj[key]
        }
    }
    return diff
}

function formatSeconds(value) { //秒转化为00:00:00格式
    var theTime = parseInt(value) // 秒
    var theTime1 = 0 // 分
    var theTime2 = 0 // 小时

    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60)
            theTime1 = parseInt(theTime1 % 60)
        }
    }

    theTime1 = theTime1 < 10 ? `0${theTime1}` : theTime1
    theTime2 = theTime2 < 10 ? `0${theTime2}` : theTime2
    theTime = theTime < 10 ? `0${theTime}` : theTime

    var result = `00:00:${theTime}`

    if (theTime1 > 0) {
        result = `00:${theTime1}:${theTime}`
    }

    if (theTime2 > 0) {
        result = `${theTime2}:${theTime1}:${theTime}`
    }

    return result
}

//时分秒转化为秒
function formatToS(val) {
    let value = String(val)
    let h = Number(value.slice(0, 2))
    let m = Number(value.slice(3, 5))
    let s = Number(value.slice(6, 8))

    return h * 60 * 60 + m * 60 + s
}


export { checkHover, genId, diffObj, formatSeconds, formatToS }