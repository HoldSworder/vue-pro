<template>
  <div id="formBox">
    <el-form label-width="50px" label-position='left'>
      <el-form-item label="开始">
        <el-input v-model="cloneVal.beginTime"></el-input>
      </el-form-item>
      <el-form-item label="结束">
        <el-input v-model="cloneVal.endTime"></el-input>
      </el-form-item>
      <el-form-item label="X轴">
        <el-input v-model="cloneVal.location_x"></el-input>
      </el-form-item>
      <el-form-item label="Y轴">
        <el-input v-model="cloneVal.location_y"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model="cloneVal.width"></el-input>
      </el-form-item>
      <el-form-item label="高">
        <el-input v-model="cloneVal.height"></el-input>
      </el-form-item>
      <el-form-item label="缩放">
        <el-slider v-model="cloneVal.scalingRatio" :max="500" :min="0"></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloneVal: '',
    }
  },
  computed: {
    pickId() {
      return this.$store.state.common.pickId
    },
    storeVal() {
      return this.$store.getters['program/getEle'](this.pickId)
    }
  },
  watch: {
    cloneVal(val, oldVal) {
      this.$store.dispatch('program/changeData', {
        ...val,
        ...{
          id: this.pickId
        }
      })
    }
  },
  mounted() {
    this.cloneVal = this.storeVal
  }
}
</script>

<style scoped>
#formBox {
  padding: 20px;
}
</style>