<template>
  <div class="itemBox">
    <div class='item-container' v-for="(item, index) of itemList" :key="index" @mousedown="drag(item, $event)">
        <img :src="item.url" class="material">
        <p>{{item.materialName}}</p>
    </div>
    <img class="clone" :style="{...clone, ...{filter: isCover ? '': 'contrast(20%)'}}" :src='cloneUrl'/>
  </div>
</template>

<script>
import { checkHover } from 'utils/tool.js'
import Element from 'scripts/data/element.js'
export default {
  data() {
    return {
      itemList: [{
          url: require('assets/1.jpg'),
          materialName: '1.jpg'
        }, {
          url: require('assets/2.jpg'),
          materialName: '2.jpg'
        }, {
          url: require('assets/3.jpg'),
          materialName: '3.jpg'
        }, {
          url: require('assets/123.jpg'),
          materialName: '123.jpg'
      }],
      clone: {
        display: 'none',
        left: 0,
        top: 0
      },
      isCover: false,
      cloneUrl: null
    }
  },
  computed: {
    duration() {
      return this.$store.getters['common/getDuration']
    }
  },
  methods: {
    drag(item, el) {
      el.preventDefault()
      const THAT = this
      THAT.cloneUrl = item.url
      
      THAT.clone.left = el.clientX - 50 + 'px'
      THAT.clone.top = el.clientY - 50 + 'px'

      document.onmousemove = e => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - 50
        let top = e.clientY - 50
        //移动当前元素
        THAT.clone.left = left + 'px'
        THAT.clone.top = top + 'px'
        THAT.clone.display = 'block'

        const isHoverCanvas = checkHover(e, document.querySelector('#canvas'))
        const isHoverTrack = checkHover(e, document.querySelector('.trackBox'))

        let coverFlag = false
        for (const item of document.querySelectorAll('.trackEle')) {
          if(checkHover(e, item)) {
            coverFlag = true
            break
          }
        }

        if((isHoverCanvas || isHoverTrack) && !coverFlag) {
          console.log('iscover')
          this.isCover = true
        }else {
          this.isCover = false
        }
      }

      document.onmouseup = e => {
        const isHoverCanvas = checkHover(e, document.querySelector('#canvas'))
        const isHoverTrack = checkHover(e, document.querySelector('.trackBox'))
        if(isHoverCanvas) {
          THAT.drawCanvas(el)
        }else if(isHoverTrack) {
          THAT.drawTrack(el, e)
        }
        
        //鼠标弹起来的时候不再移动
        document.onmousemove = null
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
        document.onmouseup = null
        THAT.clone.display = 'none'
      }
    },

    drawCanvas(el) {
      const { src, naturalWidth, naturalHeight } = el.target
      let defaultVal = Element.Image({
        imgSrc: src,
        width: naturalWidth,
        height: naturalHeight,
        natural: {
          width: naturalWidth,
          height: naturalHeight,
          ratio: naturalWidth / naturalHeight
        }
      })
      this.$store.dispatch('program/putNewItem', defaultVal)
    },

    drawTrack(el, e) {
      let targetTrack
      const trackContent = document.querySelectorAll('.trackContent')
      trackContent.forEach(item => {
        if(checkHover(e, item)) targetTrack = item
      })

      const { left, width } = document.querySelector('.trackContent').getBoundingClientRect()
      const leftGap = e.clientX - left
      const begin = leftGap / width * this.duration - 150

      const { src, naturalWidth, naturalHeight } = el.target
      const eleData = Element.Image({
        imgSrc: src,
        width: naturalWidth,
        height: naturalHeight,
        beginTime: begin,
        natural: {
          width: naturalWidth,
          height: naturalHeight,
          ratio: naturalWidth / naturalHeight
        }
      })
      const trackId = targetTrack.dataset.i
      console.log(trackId)
      this.$store.dispatch('program/addEleToTrack', {
        trackId,
        eleData
      })
    }
  }
}
</script>

<style scoped>
.itemBox img {
    width: 100px;
    height: 100px;
}
.itemBox {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
}
.item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
}
.imgbox-container .item-container {
    padding: 0 5px;
    border: 2px solid #fff;
}
.material {
    width: 100px;
    height: 100px;
    margin: 5px 0;
}
.clone {
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 99;
}
</style>