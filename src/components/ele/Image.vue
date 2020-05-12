<template>
  <div>
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
      }
    }
  }
}
</script>

<style>

</style>