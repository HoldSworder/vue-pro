<template>
  <div id="rootDiv">
    <div id="wordDiv">
      <data-base></data-base>
      <custom-canvas></custom-canvas>
      <custom-tab></custom-tab>
    </div>
    <time-line></time-line>
  </div>
</template>

<script>
import CustomCanvas from 'components/body/Canvas'
import CustomTab from 'components/body/Tab'
import TimeLine from 'components/body/TimeLine'
import DataBase from 'components/body/Database'

import keyboardEvent from 'scripts/event/keyboard.js'
export default {
  components: {
    CustomCanvas,
    CustomTab,
    TimeLine,
    DataBase
  },
  mounted() {
    const THAT = this
    this.$store.commit('program/SET_PRODATA', {
      width: 600,
      height: 600
    })

    document.addEventListener('keydown', e => {
      keyboardEvent(e, THAT.$store)
    })
  }
}
</script>

<style>
#rootDiv {
  background: #e8edf1;
  min-height: 100vh;
}
#wordDiv {
  display: flex;
}
</style>