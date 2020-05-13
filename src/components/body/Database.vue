<template>
  <div class="row-left container">
    <image-form v-if="isShow('图片')"></image-form>
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
.container {
  background: #f4f5f5;
  height: 100vh;
  width: 290px;
}
.row-left {
  border-width: 1px 1px 1px;
  border-style: none solid solid;
  border-color: rgb(203, 207, 210) rgb(203, 207, 210) rgb(203, 207, 210);
  border-image: initial;
  padding: 0px;
  border-top: none;
}
</style>