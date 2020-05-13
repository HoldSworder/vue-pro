<template>
  <div class="row-right container">
    <div class="nav-tabs-custom">
      <!-- TAB页 -->
    <!-- <el-tabs type="card">
      <el-tab-pane label="素材" name="first">素材</el-tab-pane>
    </el-tabs> -->

    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item>素材</el-breadcrumb-item>
      <el-breadcrumb-item>图片</el-breadcrumb-item>
    </el-breadcrumb> -->

    <tab-select></tab-select>

    <tab-ele></tab-ele>
    </div>
  </div>
</template>

<script>
import TabSelect from 'components/content/tabs/tabSelect'
import TabEle from 'components/content/tabs/tabEle'
export default {
  components: {
    TabSelect,
    TabEle
  },
  data() {
    return {
      
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
.row-right {
  border-width: 1px 1px 1px;
  border-style: none solid solid;
  border-color: rgb(203, 207, 210) rgb(203, 207, 210) rgb(203, 207, 210);
  border-image: initial;
  padding: 0px;
  border-top: none;
}

.breadcrumb {
    margin: 0;
    background: white;
    padding: 12px 15px;
}
.breadcrumb a {
    text-decoration: none;
    cursor: pointer;
}
.breadcrumb a {
    font-size: 16px;
}
</style>