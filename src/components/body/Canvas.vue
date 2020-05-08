<template>
  <div id="hiddenBox" :style="hiddenStyle">
    <div :style="{...background, ...size, ...trans}" id="canvas">
      <div @mousedown.prevent="move($event)" :data-i="item.id" v-for="(item, index) in getData" :key="index" >
        <img-ele class="canvasDiv" :dataVal="item"></img-ele>
      </div>
    </div>
  </div>
</template>

<script>
import backUrl from "assets/display_min.jpg"
import imgEle from 'components/ele/Image'
export default {
  components: {
    imgEle
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
  },
  methods: {
    move(el) {
      const THAT = this
      const id = el.currentTarget.dataset.i
      const target = el.target
      el.preventDefault()
      console.log(target.offsetTop)

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

<style>
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