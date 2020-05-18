<template>
  <div class="trackBox">
    <div class="track clearfix"
         v-for="(item) in tracks"
         :key="item.id">
      <div class="trackController">
        <span>轨道</span>
      </div>
      <div :data-i="item.id"
           @mousemove.self="moveEle"
           :class="{isCover: item.id === pickTrackId}"
           class="trackContent">
        <track-ele @mousedown.stop.prevent.self="move($event, ite)"
                   v-for="(ite, index) in item.elementList"
                   :key="index"
                   :eleData="ite"></track-ele>
        <div class="cloneBox"
             ref="cloneBox"
             v-show="cloneShow && item.id === pickTrackId"></div>
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
</template>

<script>
import trackEle from 'components/content/timeline/trackEle'
// import { checkHover } from 'utils/tool.js'
export default {
  components: {
    trackEle
  },
  data () {
    return {
      cloneShow: false,
      pickTrackId: ''
    }
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
    pickMoveId () {
      return this.$store.getters['common/getPickMoveId']
    },
    // pickMoveTrackId() {
    //   const pickTrack = this.$store.getters['program/getEleParentId'](this.pickMoveId)
    //   return pickTrack ? pickTrack.id : null
    // }
  },
  watch: {
    pickMoveId (val) {
      if (val === '') return
      document.addEventListener('mousemove', this.move())

      document.addEventListener('mouseup', e => {
        this.pickTrackId = ''
        document.removeEventListener('mousemove', this.move)
      })
    }
  },
  methods: {
    move (e) {
      this.cloneShow = true
      const cloneBox = document.querySelector('.cloneBox')
      const { pickMoveId } = this
      const pickDom = [...document.querySelectorAll('.silderBlock')].filter(item => {
        return item.dataset.i === pickMoveId
      })[0]
      cloneBox.innerHTML = ''
      cloneBox.appendChild(pickDom.cloneNode(true))
    },
    moveEle(e) {
      const { pickMoveId } = this
      if(pickMoveId === '') return
      const { target } = e
      const children = [...target.childNodes]
      const include = children.find(item => {
        return item.dataset.i === this.pickMoveId
      })

      if(include) return
      this.pickTrackId = target.dataset.i
    }
  }
}
</script>






<style scoped>
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
.cloneBox {
  position: absolute;
}
.isCover {
  background: aquamarine
}
</style>