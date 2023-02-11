import { Component } from 'vue'

export class CustomPlugin {
  name: string // show name
  component: Component // plugin name
  group: string

  constructor(name: string, component: Component, group: string = "Common") {
    this.name = name
    this.component = component
    this.group = group
  }
}
