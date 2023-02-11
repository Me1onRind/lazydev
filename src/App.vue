<template>
  <div class="common-layout">
    <el-container>
      <ChooseAside @handleNodeClick="loadPlugin"/>
      <el-container>
        <el-main style="padding: 20px 60px;">
          <component :is="component"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import ChooseAside from './components/ChooseAside.vue'
import { CustomPlugin } from './lib/custom-plugin'

export default {
  components: {
    ChooseAside,
  },
  data() {
    return {
      component: null,
    }
  },
  methods: {
    loadPlugin(plugin: CustomPlugin) {
      this.component = plugin.component
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
