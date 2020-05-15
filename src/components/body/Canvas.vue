<template>
  <div id="hiddenBox"
       :style="hiddenStyle">
    <div :style="{...background, ...size}"
         id="canvas">
      <canvas-ele class="canvasDiv"
                  :eleData='item'
                  :data-i="item.id"
                  v-show="isShow(item)"
                  v-for="(item, index) in getData"
                  :key="index"></canvas-ele>
    </div>
  </div>
</template>

<script>
import defaultBackUrl from "assets/display_min.jpg"
import canvasEle from 'components/content/canvas/canvasEle'
export default {
  components: {
    canvasEle
  },
  data () {
    return {
      background: {
        backgroundImage: `url(${defaultBackUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto'
      },
      trans: {
        transform: 'scale(0.8, 0.8)'
      },
      hiddenStyle: {
        width: '70vw',
        height: '70vh'
      },
    }
  },
  computed: {
    getData () {
      return this.$store.getters['program/getAllEle']
    },
    size () {
      const proData = this.$store.getters['program/getProData']
      return {
        width: proData.width + 'px',
        height: proData.height + 'px'
      }
    },
    nowTime() {
      return this.$store.getters['common/getNowTime']
    }
  },
  watch: {
    '$store.state.program.background'(val) {
      console.log(val)
      if (val !== '') {
        this.background.backgroundImage = `url(${val})`
        this.background.backgroundRepeat = 'no-repeat'
        this.background.size = '100% 100%'
      } else {
        this.background.backgroundImage = `url(${defaultBackUrl})`,
          this.background.backgroundRepeat = 'repeat',
          this.background.backgroundSize = 'auto'
      }
    }
  },
  methods: {
    isShow(data) {
      const { beginTime, endTime } = data
      const { nowTime } = this
      if(nowTime >= beginTime && nowTime <= endTime) return true
      return false
    }
  }
}
</script>

<style scoped>
#canvas {
  transform-origin: 0px 0px;
  position: relative;
}
#hiddenBox {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvasDiv {
  position: absolute;
  overflow: hidden;
}
</style>