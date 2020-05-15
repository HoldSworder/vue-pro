<template>
  <div id="formBox">
    <form-basic></form-basic>
    <el-form label-width="80px" label-position='left'>
      <el-form-item label="设为背景">
        <el-switch v-model="isBackground"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formBasic from 'components/formEle/common/basic'
export default {
  components: {
    formBasic
  },
  data() {
    return {
      isBackground: false
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
    isBackground(val) {
      if(val) this.$store.commit('program/SET_BACKGROUND', this.storeVal.fileName)
      else this.$store.commit('program/SET_BACKGROUND', '')
    }
  }
}
</script>

<style scoped>
#formBox {
  padding: 20px;
}
</style>