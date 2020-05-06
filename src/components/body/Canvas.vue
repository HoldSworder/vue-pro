<template>
  <div :style="{...background, ...size, ...trans}" id="canvas">
    canvas
  </div>
</template>

<script>
import backUrl from "assets/display_min.jpg"
export default {
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
      }
    }
  }
}
</script>

<style>
#canvas {
  transform-origin: 0px 0px;
}
</style>