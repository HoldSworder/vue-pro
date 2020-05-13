<template>
  <div id="hiddenBox" :style="hiddenStyle">
    <div :style="{...background, ...size, }" id="canvas">
      <canvas-ele class="canvasDiv" :eleData='item' :data-i="item.id" v-for="(item, index) in getData" :key="index"></canvas-ele>
    </div>
  </div>
</template>

<script>
import backUrl from "assets/display_min.jpg"
import canvasEle from 'components/content/canvas/canvasEle'
export default {
  components: {
    canvasEle
  },
  data() {
    return {
      background: {
        backgroundImage: `url(${backUrl})`,
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
    getData() {
      return this.$store.getters['program/getAllEle']
    },
    size() {
      const proData = this.$store.getters['program/getProData']
      return {
        width: proData.width + 'px',
        height: proData.height + 'px'
      }
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