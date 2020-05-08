<template>
  <div :style="eleStyle">
    <img :src="dataVal.fileName" :style='imgStyle'>
  </div>
</template>

<script>
export default {
  props: ['dataVal'],
  data() {
    return {
      imgStyle: {
        width: this.dataVal.width + 'px',
        height: this.dataVal.height + 'px'
      },
      eleStyle: {
        left: 0,
        top: 0,
      }
    }
  },
  computed: {
    getData() {
      const THAT = this
      let result
      
      this.$store.state.program.data.forEach(item => {
        item.elementList.forEach(x => {
          if(x.id == THAT.dataVal.id) {
            result = x
          }
        })
      })

      return result
    }
  },
  watch: {
    getData: {
      handler(val, oldVal) {
        this.eleStyle.left = val.location_x + 'px'
        this.eleStyle.top = val.location_y + 'px'
        // this.eleStyle.width = val.width + 'px'
        // this.eleStyle.height = val.height + 'px'

        console.log(val)
      },
      deep: true
    }
  }
}
</script>

<style>

</style>