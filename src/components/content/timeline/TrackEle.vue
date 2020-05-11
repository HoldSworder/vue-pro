<template>
  <div class="silderBlock"
    :data-J='JSON.stringify(eleData)'
    :data-i="eleData.id"
    :style="trackStyle">
      {{eleData.fileName}}
  </div>
</template>

<script>
export default {
  props: ['eleData'],
  computed: {
    duration() {
      return this.$store.getters['common/getDuration']
    },
    trackStyle() {
      const { duration } = this
      const { beginTime, endTime } = this.eleData
      const trackW = document.querySelector('.trackContent').offsetWidth
      const result = {
        left: (beginTime / duration) * trackW + 'px',
        width: ((endTime - beginTime) / duration) * trackW + 'px'
      }
      console.log(result)
      return result
    }
  },
  methods: {
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
</style>