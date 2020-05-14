<template>
  <div id="formBox">
    <duration-form></duration-form>
    <el-form label-width="50px" label-position='left'>
      <el-form-item label="X轴">
        <el-input @input="changeStore($event, 'location_x')" v-model="storeVal.location_x"></el-input>
      </el-form-item>
      <el-form-item label="Y轴">
        <el-input @input="changeStore($event, 'location_y')" v-model="storeVal.location_y"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input @input="changeStore($event, 'width')" v-model="storeVal.width"></el-input>
      </el-form-item>
      <el-form-item label="高">
        <el-input @input="changeStore($event, 'height')" v-model="storeVal.height"></el-input>
      </el-form-item>
      <el-form-item label="缩放">
        <el-slider @input="changeStore($event, 'scalingRatio')" v-model="storeVal.scalingRatio" :max="500" :min="0"></el-slider>
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
  data() {
    return {
      cloneVal: '',
      onceFlag: true
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
  methods: {
    changeStore(e, key) {
      if(this.onceFlag) return
      console.log('change', key, e)
      this.$store.dispatch('program/changeData', {
        ...{[key]: e},
        ...{id: this.pickId}
      })
      this.onceFlag = false
    }
  },
  mounted() {
    this.cloneVal = {...this.storeVal}
  }
}
</script>

<style scoped>
#formBox {
  padding: 20px;
}
</style>