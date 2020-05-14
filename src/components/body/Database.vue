<template>
  <div class="row-left tabContainer">
    <image-form v-if="isShow('Image')"></image-form>
  </div>
</template>

<script>
import ImageForm from 'components/formEle/image'
import typeIndex from 'scripts/data/typeIndex.js'
export default {
  components: {
    ImageForm
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
    isShow(type) {
      if(!this.storeVal) return false
      return typeIndex.indexOf(type) + 1 === this.storeVal.elementType
    }
  }
}
</script>

<style scoped> 
@import '~style/tab.css';
</style>