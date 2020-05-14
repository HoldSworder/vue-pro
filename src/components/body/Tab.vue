<template>
  <div class="row-right tabContainer">
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
@import '~style/tab.css';

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