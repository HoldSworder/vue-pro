<template>
  <div>
    <img :src="dataVal.fileName">
  </div>
</template>

<script>
export default {
  props: ['dataVal'],
  data() {
    return {
      imgStyle: ''
    }
  }
}
</script>

<style>

</style>