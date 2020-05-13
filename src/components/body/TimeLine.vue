<template>
  <div class="timeLineBox">
    <div class="timeLine">
      <!-- <div class="sliderContainer row">
        <div class="col-sm-2 sliderBox">
          <img id="addTrack"
               class="btn"
               :src="require('assets/img/add/add.svg')"
               alt="">
          <span>
            <span id="nowTime"
                  data-t="60">00:00</span>
          </span>
        </div>
        <div id="circles-slider"
             class="col-sm-10"
             style="margin: 0 0 1em 0; background: #cdd4d7;"></div>
      </div> -->
      <div class="trackBox">
        <div class="track clearfix"
             v-for="(item) in tracks"
             :key="item.id">
          <div class="trackController">
            <span>轨道</span>
            <!-- <span class="glyphicon glyphicon glyphicon-align-justify"
                  aria-hidden="true"></span> -->
          </div>
          <div :data-i="item.id"
               class="trackContent">
            <track-ele v-for="(ite, index) in item.elementList" :key="index" :eleData="ite"></track-ele>
          </div>
        </div>

        <div class="trackSeize clearfix"
             v-for="(item, index) in trackNum"
             :key="index">
          <div class="trackController">
            <span></span>

          </div>
          <div class="trackContent"></div>
        </div>

      </div>

      <!-- <div class="abbrTrack row">
          <div id="abbr-slider" class="col-sm-2" style="margin: 1em 0; background: #cdd4d7;">
          </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import trackEle from 'components/content/timeline/trackEle'
export default {
  components: {
    trackEle
  },
  computed: {
    tracks () {
      return this.$store.getters['program/getData']
    },
    trackNum () {
      const len = this.tracks.length
      const l = 4 - len
      return l >= 0 ? l : 0
    },
    
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
  position: fixed;
  bottom: 0;
  width: 80%;
  margin: 0 0 10px 25px;
}
.sliderContainer {
  margin-top: 10px;
}
.sliderBox {
  display: flex;
  align-items: center;
  position: relative;
  top: -5px;
}
#addTrack {
  padding-bottom: 5px;
  padding: 4px 12px;
}
#circles-slider {
  padding: 0;
}
.trackBox .clearfix:last-child .trackController {
  border-bottom: 1px solid #ccc;
}
.trackBox .clearfix:last-child .trackContent {
  border-bottom: 1px solid #ccc;
}
.trackBox {
  overflow-y: overlay;
  overflow-x: hidden;
  height: 120px;
  margin-bottom: 10px;
}
.trackController {
  background: #f4f5f5;
  border: 1px solid #ccc;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-bottom: none;
  width: 16.66666667%;
}
.trackContent {
  height: 30px;
  background: #f4f5f5;
  border: 1px solid #ccc;
  padding: 0;
  border-bottom: none;
  width: 83.33333333%;
  position: relative;
}
.trackBox .clearfix:last-child .trackContent {
  border-bottom: 1px solid #ccc;
}
.trackBox .clearfix:last-child .trackController {
  border-bottom: 1px solid #ccc;
}
.clearfix {
  display: flex;
}

</style>