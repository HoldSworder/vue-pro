<template>
  <div class="timeLineBox">
    <div>
      <duration-control class="durationControl"></duration-control>
    </div>
    <div class="timeLine">
      <div class="timeControl">
        <now-time class="nowTimeBox"></now-time>
        <time-slider class="timeSliderBox"></time-slider>
      </div>
      <track-content></track-content>
    </div>
  </div>
</template>

<script>
import nowTime from 'components/content/timeline/nowTime'
import trackContent from 'components/content/timeline/trackContent'
import timeSlider from 'components/content/timeline/timeSlider'
import durationControl from 'components/content/timeline/durationControl'
export default {
  components: {
    trackContent,
    timeSlider,
    nowTime,
    durationControl
  },
  methods: {
    
  }
}
</script>

<style scoped>
.timeLineBox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  left: 0;
  height: 200px;
}
.timeLine {
  width: 80%;
  margin: 0 0 10px 25px;
}

.timeControl {
  display: flex;
  align-items: center;
}
.nowTimeBox {
  width: 16.6666667%;
}
.timeSliderBox {
  width: 83.3333333%;
}

</style>