<template>
  <div @mousedown.prevent.stop="move($event)" class="canvasEle" :style="eleStyle" @click="pickEle">
    <img-ele class="canvasDiv" :dataVal="eleData"></img-ele>
    <div v-show="picked" @mousedown.prevent.stop="resize('LT', $event)" ref="resizeLT" class='flexBtn flexBtnLeft' style="top: 0; left: 0;"></div>
    <div v-show="picked" @mousedown.prevent.stop="resize('RT', $event)" ref="resizeRT" class='flexBtn flexBtnRight' style="top: 0; right: 0;"></div>
    <div v-show="picked" @mousedown.prevent.stop="resize('LB', $event)" ref="resizeLB" class='flexBtn flexBtnRight' style="bottom: 0; left: 0;"></div>
    <div v-show="picked" @mousedown.prevent.stop="resize('RB', $event)" ref="resizeRB" class='flexBtn flexBtnLeft' style="bottom: 0; right: 0;"></div>
  </div>
</template>

<script>
import imgEle from 'components/canvasEle/image'
export default {
  props: ['eleData'],
  components: {
    imgEle
  },
  data() {
    return {
      eleStyle: {
        left: 0,
        top: 0,
      }
    }
  },
  computed: {
    getData() {
      const THAT = this
      let result
      
      this.$store.state.program.data.forEach(item => {
        item.elementList.forEach(x => {
          if(x.id == THAT.eleData.id) {
            result = x
          }
        })
      })

      return result
    },
    pickId() {
      return this.$store.state.common.pickId
    },
    picked() {
      return this.$store.state.common.pickId === this.eleData.id
    },
    storeVal() {
      return this.$store.getters['program/getEle'](this.eleData.id)
    }
  },
  watch: {
    getData: {
      handler(val, oldVal) {
        this.eleStyle.left = val.location_x + 'px'
        this.eleStyle.top = val.location_y + 'px'
      },
      deep: true
    }
  },
  methods: {
    pickEle() {
      this.$store.commit('common/SET_PICKID', this.eleData.id)
    },
    move(el) {
      const THAT = this
      const id = this.eleData.id

      const oldX = el.clientX
      const oldY = el.clientY

      const eleRect = el.target.getBoundingClientRect()
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect()
      //元素移动跟手
      const gapX = oldX - eleRect.x
      const gapY = oldY - eleRect.y

      document.onmousemove = e => {
        let left = e.clientX - gapX - canvasRect.x
        let top = e.clientY - gapY - canvasRect.y

        THAT.$store.dispatch('program/changeData', {
          id,
          location_x: left,
          location_y: top,
        })
      }

      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    resize(type, el) {
      const THAT = this
      const id = this.eleData.id

      const oldX = el.clientX
      const oldY = el.clientY

      const { width, height, location_x, location_y } = this.storeVal
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect()

      document.onmousemove = e => {
        let resW, resH, 
            resX = location_x, 
            resY = location_y
        const nowX = e.clientX
        const nowY = e.clientY

        const gapX = oldX - nowX
        const gapY = oldY - nowY

        if(type === 'LT') {
          resW = width + gapX
          resH = height + gapY
        } else if(type === 'LB') {
          resW = width + gapX
          resH = height - gapY
        } else if(type === 'RT') {
          resW = width - gapX
          resH = height + gapY
        } else if(type === 'RB') {
          resW = width - gapX
          resH = height - gapY
        }

        if(type === 'LT') {
          resX = nowX - canvasRect.x
          resY = nowY - canvasRect.y
        } else if(type === 'LB') {
          resX = nowX - canvasRect.x
        } else if(type === 'RT') {
          resY = nowY - canvasRect.y
        }

        THAT.$store.dispatch('program/changeData', {
          id,
          width: resW,
          height: resH,
          location_x: resX,
          location_y: resY
        })
      }

      document.onmouseup = e => {
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  }
}
</script>

<style scoped>
.canvasEle {
  position: absolute;
}
.flexBtn {
    width: 6px;
    height: 6px;
    position: absolute;
    background: black;
    border: 1px solid white;
    z-index: 9999;
    box-sizing: content-box !important;
}
.flexBtnLeft {
    cursor: nw-resize;
}
.flexBtnRight {
    cursor: ne-resize;
}
</style>