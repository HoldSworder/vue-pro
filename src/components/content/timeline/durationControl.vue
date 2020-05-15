<template>
  <div class="duration-control-container">
    <p class="text">总时长<span>{{storeDuration / 60}}</span>（分）</p>
    <el-slider
      v-model="duration"
      vertical
      :max="1440"
      :min="1"
      height="130px">
    </el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duration: 0
    }
  },
  computed: {
    storeDuration() {
      return this.$store.getters['common/getDuration']
    }
  },
  watch: {
    duration(val) {
      this.$store.commit('common/SET_DURATION', val * 60)
    },
    storeDuration: {
      handler(val) {
        this.duration = val / 60
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.text {
  /*从左向右 从右向左是 writing-mode: vertical-rl;*/  
  writing-mode: vertical-lr;
  /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
  writing-mode: tb-lr;
}
.duration-control-container {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>