<template>
  <div class="timeSliderContainer"
       ref="timeSliderContainer">
    <el-slider :show-tooltip='false'
               v-model="nowTime"
               :max="duration"></el-slider>
    <div id="nowTimeLine"
         :style="{...timeLineStyle, ...{left: timeLineL}}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMounted: false,
    }
  },
  computed: {
    nowTime: {
      get () {
        return this.$store.getters['common/getNowTime']
      },
      set (val) {
        this.$store.commit('common/SET_NOWTIME', val)
      }
    },
    duration () {
      const result = this.$store.getters['common/getDuration']
      return result
    },
    timeLineStyle () {
      if (!this.isMounted) return
      const { timeSliderContainer } = this.$refs
      const trackBox = document.querySelector('.trackBox')
      const timeLineH = trackBox.offsetHeight + timeSliderContainer.offsetHeight / 2
      return {
        height: timeLineH + 'px',
        top: timeSliderContainer.offsetHeight / 2 + 'px'
      }
    },
    timeLineL() {
      return (this.nowTime / this.duration * 100) + '%'
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style scoped>
.timeSliderContainer {
  position: relative;
}
#nowTimeLine {
  width: 1px;
  background: #333;
  position: absolute;
  z-index: 99;
}
</style>