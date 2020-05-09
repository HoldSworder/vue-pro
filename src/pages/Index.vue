<template>
  <div id="rootDiv">
    <custom-canvas></custom-canvas>
    <custom-tab></custom-tab>
    <time-line></time-line>
  </div>
</template>

<script>
import customCanvas from 'components/body/Canvas'
import customTab from 'components/body/Tab'
import timeLine from 'components/body/TimeLine'
export default {
  components: {
    customCanvas,
    customTab,
    timeLine
  }
}
</script>

<style scoped>
#rootDiv {
  background: #e8edf1;
  min-height: 100vh;
}
</style>