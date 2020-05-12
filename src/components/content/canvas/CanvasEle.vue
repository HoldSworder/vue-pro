<template>
  <div @mousedown.prevent.stop="move($event)"  class="canvasEle" :style="eleStyle" @click="pickEle">
    <img-ele class="canvasDiv" :dataVal="eleData"></img-ele>
  </div>
</template>

<script>
import imgEle from 'components/ele/Image'
export default {
  props: ['eleData'],
  components: {
    imgEle
  },
  data() {
    return {
      eleStyle: {
        left: 0,
        top: 0,
      },
      picked: false
    }
  },
  computed: {
    getData() {
      const THAT = this
      let result
      
      this.$store.state.program.data.forEach(item => {
        item.elementList.forEach(x => {
          if(x.id == THAT.eleData.id) {
            result = x
          }
        })
      })

      return result
    },
    pickId() {
      return this.$store.state.common.pickId
    }
  },
  watch: {
    getData: {
      handler(val, oldVal) {
        this.eleStyle.left = val.location_x + 'px'
        this.eleStyle.top = val.location_y + 'px'
      },
      deep: true
    },
    pickId(val, oldVal) {
      if(val === this.eleData.id) {
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
    move(el) {
      const THAT = this
      const id = this.eleData.id
      // const target = el.target

      document.onmousemove = e => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        // TODO: 移动图片跟手
        // const rect = target.getBoundingClientRect()
        let left = e.clientX 
        let top = e.clientY
        //移动当前元素
        THAT.$store.commit('program/CHANGE_DATA', {
          id,
          location_x: left,
          location_y: top,
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
.canvasEle {
  position: absolute;
}
</style>