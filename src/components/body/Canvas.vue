<template>
  <div id="hiddenBox" :style="hiddenStyle">
    <div :style="{...background, ...size, ...trans}" id="canvas">
      <canvas-ele class="canvasDiv" :eleData='item' :data-i="item.id" v-for="(item, index) in getData" :key="index"></canvas-ele>
    </div>
  </div>
</template>

<script>
import backUrl from "assets/display_min.jpg"
import canvasEle from 'components/content/canvas/CanvasEle'
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
      size: {
        width: '1920px',
        height: '1080px'
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
      const data = this.$store.getters['program/getAllEle']
      return data
    },
  }
}
</script>

<style scoped>
#canvas {
  transform-origin: 0px 0px;
}
#hiddenBox {
  overflow: auto;
}

.canvasDiv {
  position: absolute;
  overflow: hidden;
}
</style>