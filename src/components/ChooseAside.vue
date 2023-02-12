<template>
  <el-aside width="220px">
    <el-input v-model="input" placeholder="Search" />
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all />
  </el-aside>
</template>

<script lang="ts">
import { markRaw } from 'vue'
import { CustomPlugin } from '../lib/custom-plugin'
import TimeUtil from './custom_plugins/TimeUtil.vue'
import JsonUtil from './custom_plugins/JsonUtil.vue'

interface Tree {
  label: string
  children?: Tree[]
  plugin: CustomPlugin | null
}

export default {
  data() {
    let plugins: CustomPlugin[] = [
      new CustomPlugin('Time', markRaw(TimeUtil)),
      new CustomPlugin('Json', markRaw(JsonUtil)),
    ]

    let tmp = new Map()
    plugins.forEach((p)=>{
      if (tmp.get(p.group) == undefined) {
        tmp.set(p.group, [p])
      } else {
        tmp.get(p.group).push(p)
      }
    })


    let data: Tree[] = []
    for (let [key, value] of tmp) {
      let items: Tree[] = []
      value.forEach((v:CustomPlugin)=>{
        items.push({"label":v.name, "plugin":v})
      })
      data.push({
        "label": key,
        "children": items,
        "plugin": null,
        })
    }

    return {
      data: data,
      defaultProps: {
        children: 'children',
        label: 'label',
       },
       input: '',
    }
  },
  methods: {
    handleNodeClick(data: Tree) {
        if (data.plugin !== null) {
          this.$emit('handleNodeClick', data.plugin)
        }
    }
  },
}
</script>
