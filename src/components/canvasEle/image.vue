<template>
  <div>
    <img :src="dataVal.fileName" :style='imgStyle'>
  </div>
</template>

<script>
export default {
  props: ['dataVal'],
  computed: {
    storeVal() {
      return this.$store.getters['program/getEle'](this.dataVal.id)
    },
    imgStyle() {
      return {
        width: this.storeVal.width + 'px',
        height: this.storeVal.height + 'px'
      }
    }
  }
}
</script>

<style>

</style>