<template>
  <div class="common-layout">
    <el-container>
      <ChooseAside @handleNodeClick="addTab"/>
      <el-container>
        <el-main style="padding: 0px 60px;">
          <el-tabs
            v-model="editableTabsValue"
            type="border-card"
            class="demo-tabs"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import ChooseAside from './components/ChooseAside.vue'
import { CustomPlugin } from './lib/custom-plugin'

export default {
  components: {
    ChooseAside,
  },
  data() {
    return {
      component: null,
      editableTabs: ref([]),
      tabIndex: 0,
      editableTabsValue: ref(''),
    }
  },
  methods: {
    addTab(plugin: CustomPlugin) {
      const newTabName = `${++this.tabIndex}`
      this.editableTabs.push({
        title: plugin.name,
        name: newTabName,
        content: plugin.component,
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName: string) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab: any, index: any) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab: any)=> tab.name !== targetName)
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (!e.metaKey) {
        return
      }
      switch (e.key) {
        case 'w':
          e.preventDefault()
          this.removeTab(this.editableTabsValue)
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          for (let i = 0; i < this.editableTabs.length; i++) {
            if (this.editableTabs[i].name == e.key) {
              this.editableTabsValue = ref(e.key)
              return
            }
          }
          break
      }
    })
  },
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
