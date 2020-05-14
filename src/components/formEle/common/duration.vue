<template>
  <el-form label-width="50px" label-position='left'>
    <!-- <el-form-item label="起止时间">
      <el-time-picker
        :style="{width: '100%'}"
        is-range
        align="center"
        v-model="durationTime"
        :picker-options="{
          selectableRange: selectableRange
        }"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker>
    </el-form-item> -->
    <el-form-item label="开始">
      <el-time-picker
        style="width: 100%"
        v-model="beginTime"
        :picker-options="{
          selectableRange: beginRange
        }"
        placeholder="起始时间">
      </el-time-picker>
    </el-form-item>

    <el-form-item label="结束">
      <el-time-picker
        style="width: 100%"
        v-model="endTime"
        :picker-options="{
          selectableRange: endRange
        }"
        placeholder="结束时间">
      </el-time-picker>
    </el-form-item>
    
  </el-form>
</template>

<script>
import { formatSeconds, formatToS } from 'utils/tool.js'
export default {
  data() {
    return {
      beginTime: '',
      endTime: ''
    }
  },
  computed: {
    pickId() {
      return this.$store.state.common.pickId
    },
    storeVal() {
      return this.$store.getters['program/getEle'](this.pickId)
    },
    beginRange() {
      return `00:00:00 - ${this.endTime}`
    },
    endRange() {
      const maxTime = formatSeconds(this.$store.getters['common/getDuration'])
      return `${this.beginTime} - ${maxTime}`
    }
  },
  watch: {
    beginTime(val) {
      const beginTime = formatToS(String(val).slice(16, 24))
      this.$store.dispatch('program/changeData', {
        ...{
          beginTime
        },
        ...{id: this.pickId}
      })
    },
    endTime(val) {
      const endTime = formatToS(String(val).slice(16, 24))
      this.$store.dispatch('program/changeData', {
        ...{
          endTime
        },
        ...{id: this.pickId}
      })
    }
  },
  mounted() {
    const cloneVal = {...this.storeVal}
    const beginTime = new Date(2020, 5, 14, ...formatSeconds(cloneVal.beginTime).split(':'))
    const endTime = new Date(2020, 5, 14, ...formatSeconds(cloneVal.endTime).split(':'))
    this.beginTime = beginTime
    this.endTime = endTime
  }
}
</script>

<style>

</style>