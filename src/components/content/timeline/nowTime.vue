<template>
  <div>
    <el-time-picker
      v-model="nowTime"
      size="mini"
      :picker-options="{
        selectableRange: selectableRange
      }"
      class="timePicker"
      placeholder="任意时间点">
    </el-time-picker>
  </div>
</template>

<script>
import { formatToS, formatSeconds } from 'utils/tool.js'
export default {
  data() {
    return {
      nowTime: ''
    }
  },
  watch: {
    nowTime(val) {
      const timeS = formatToS(String(val).slice(16, 24))
      this.$store.commit('common/SET_NOWTIME', timeS)
    },
    storeNowTime: {
      handler(val) {
        this.nowTime = this.dateNowTime
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    storeNowTime() {
      return this.$store.getters['common/getNowTime']
    },
    dateNowTime() {
      const result = this.storeNowTime
      const date = new Date(2020, 5, 15, ...formatSeconds(result).split(':'))
      return date
    },
    selectableRange() {
      const duration = this.$store.getters['common/getDuration']
      const format = formatSeconds(duration)
      return `'00:00:00' - ${format}`
    }
  },
}
</script>

<style scoped>
.timePicker {
  width: 80% !important;
}
</style>