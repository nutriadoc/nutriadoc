import Attributor from "./Attributor.ts";

export default class Resize extends Attributor {
  add(node: HTMLElement, value: any): boolean {
    if (typeof value === 'string') {
      try {
        const { width, height } = JSON.parse(value)
        node.setAttribute('width', width)
        node.setAttribute('height', height)
      } catch (e) {
        console.warn("Parse the value of Resize failed", value)
      }
    }
    return true
  }
}