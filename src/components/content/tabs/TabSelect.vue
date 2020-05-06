<template>
    <div>
      <div class="select-box">
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="select-box">
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      value: '1',
      options: [{
        value: '1',
        label: '图片'
      }, {
        value: '2',
        label: '视频'
      }, {
        value: '3',
        label: '音频'
      }, {
        value: '4',
        label: '文本'
      }, {
        value: '5',
        label: 'rtsp'
      }, {
        value: '6',
        label: '表格'
      }, {
        value: '7',
        label: '时钟'
      }, {
        value: '8',
        label: '天气'
      }, {
        value: '9',
        label: '网页'
      }, {
        value: '10',
        label: '文档'
      }, {
        value: '11',
        label: '图片盒子'
      }],
    }
  }
}
</script>

<style scoped>
.select-box {
  width: 50%;
  display: inline-block;
}
</style>