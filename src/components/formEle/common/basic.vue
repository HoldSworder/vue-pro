<template>
  <div id="formBasic">
    <duration-form></duration-form>
    <el-form label-width="50px"
             label-position='left'>
      <el-form-item label="X轴">
        <el-input @input="changeStore($event, 'location_x')"
                  type="number"
                  v-model="storeVal.location_x"></el-input>
      </el-form-item>
      <el-form-item label="Y轴">
        <el-input @input="changeStore($event, 'location_y')"
                  type="number"
                  v-model="storeVal.location_y"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input @input="changeStore($event, 'width')"
                  type="number"
                  v-model="storeVal.width"></el-input>
      </el-form-item>
      <el-form-item label="高">
        <el-input @input="changeStore($event, 'height')"
                  type="number"
                  v-model="storeVal.height"></el-input>
      </el-form-item>
      <el-form-item label="缩放">
        <el-slider @input="changeStore($event, 'scalingRatio')"
                   v-model="storeVal.scalingRatio"
                   :max="500"
                   :min="0"></el-slider>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import durationForm from 'components/formEle/common/duration'
export default {
  components: {
    durationForm
  },
  data () {
    return {
      cloneVal: ''
    }
  },
  computed: {
    pickId () {
      return this.$store.state.common.pickId
    },
    storeVal () {
      return this.$store.getters['program/getEle'](this.pickId)
    }
  },
  methods: {
    changeStore (e, key) {
      this.$store.dispatch('program/changeData', {
        ...{ [key]: e },
        ...{ id: this.pickId }
      })
    }
  },
  mounted () {
    this.cloneVal = { ...this.storeVal }
  }
}
</script>

<style>
</style>