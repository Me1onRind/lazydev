<template>
  <el-row>
    <el-col :span="11">
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="Please input"
      />
    </el-col>
    <el-col :span="13" class="output">
      <el-row style="padding: 10px; border-bottom: 1px solid var(--el-border-color);">
        <el-button type="success">Copy</el-button>
        <el-button type="primary">Compress</el-button>
        <el-button type="warning">ShowLine</el-button>
        <el-button type="info">Fold</el-button>
      </el-row>
      <el-row>
        <vue-json-pretty :data="jsonData" :showLength="true" :showIcon="true"/>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang='ts'>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  data() {
    return {
      jsonData: {abc:"abc", arr:[1,2,3]},
      textarea: "",
    }
  },
  components: {
    VueJsonPretty,
  },
};
</script>

<style>
.el-textarea__inner {
  height: calc(85vh);
  resize: none;
}

.output {
  border: 1px solid var(--el-border-color);
}
</style>
