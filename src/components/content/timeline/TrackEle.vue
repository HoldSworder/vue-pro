<template>
  <div class="silderBlock"
    :data-J='JSON.stringify(eleData)'
    :data-i="eleData.id"
    @click.self="pickEle"
    ref="nowEle"
    @mousedown.stop.prevent="move"
    :style="{...trackStyle, ...pickStyle}">
      {{eleData.fileName}}
      <div class='eleWidthL eleWidth' @mousedown.stop.prevent="pullUp('left')" v-show="picked"></div>
      <div class='eleWidthR eleWidth' @mousedown.stop.prevent="pullUp('right')" v-show="picked"></div>
  </div>
</template>

<script>
export default {
  props: ['eleData'],
  data() {
    return {
      picked: false
    }
  },
  computed: {
    duration() {
      return this.$store.getters['common/getDuration']
    },
    trackStyle() {
      const { duration } = this
      const { beginTime, endTime } = this.storeVal
      const trackW = document.querySelector('.trackContent').offsetWidth
      const result = {
        left: (beginTime / duration) * trackW + 'px',
        width: ((endTime - beginTime) / duration) * trackW + 'px'
      }
      return result
    },
    pickStyle() {
      const { picked } = this
      return {
        background: picked ? '#289b93' : 'white',
        color: picked ? 'white' : 'black'
      }
    },
    pickId() {
      return this.$store.state.common.pickId
    },
    storeVal() {
      return this.$store.getters['program/getEle'](this.eleData.id)
    }
  },
  watch: {
    pickId(newVal, oldVal) {
      if(newVal === this.eleData.id) {
        this.picked = true
      }else {
        this.picked = false
      }
    }
  },
  methods: {
    pickEle() {
      this.$store.commit('common/SET_PICKID', this.eleData.id)
    },
    pullUp(type) {
      const THAT = this

      const trackRect = document.querySelector('.trackContent').getBoundingClientRect()
      const trackW = trackRect.width, trackL = trackRect.left

      const duration = this.$store.getters['common/getDuration']

      document.onmousemove = (e) => {
        const nowX = e.clientX

        if(type == 'right') {
          const endTime = (nowX - trackL) / trackW * duration
          THAT.$store.commit('program/CHANGE_DATA', {
            id: THAT.eleData.id,
            endTime
          })
        }else {
          const beginTime = (nowX - trackL) / trackW * duration
          const oldEndtime = THAT.storeVal.endTime
          const endTime = (oldEndtime - beginTime) / trackW * duration
          THAT.$store.commit('program/CHANGE_DATA', {
            id: THAT.eleData.id,
            beginTime,
            endTime
          })
        }
      }

      document.onmouseup = (e) => {
        e.preventDefault()
        e.stopPropagation()

        document.onmousemove = null
        document.onmouseup = null
      }
    },
    move(el) {
      const THAT = this
      const id = this.eleData.id
      const trackRect = document.querySelector('.trackContent').getBoundingClientRect()
      const eleRect = this.$refs.nowEle.getBoundingClientRect()

      const duration = this.$store.getters['common/getDuration']

      const gapW = el.clientX - eleRect.left  //鼠标点击位置至元素左侧的差值
      const gapTime = this.storeVal.endTime - this.storeVal.beginTime   //缓存持续时长

      document.onmousemove = e => {
        const nowX = e.clientX 

        const beginTime = (nowX - trackRect.left - gapW) / trackRect.width * duration
        const endTime = beginTime + gapTime
        
        THAT.$store.commit('program/CHANGE_DATA', {
          id,
          beginTime,
          endTime
        })
      }

      document.onmouseup = e => {
        //鼠标弹起来的时候不再移动
        document.onmousemove = null
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
        document.onmouseup = null
      }
    }
  }
}
</script>

<style scoped>
.silderBlock {
  box-shadow: 0px 0px 3px #888888;
  background-color: white;
  height: 30px;
  position: absolute;
  display: inline-block;
  width: 5%;
  text-align: center;
  cursor: move;
  overflow: hidden;
  white-space: nowrap;
}
.eleWidthL {
    left: 0;
}
.eleWidthR {
    right: 0;
}
.eleWidth {
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    cursor: w-resize;
}
</style>