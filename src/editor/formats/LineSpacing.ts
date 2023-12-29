import Attributor from "./Attributor";

export default class LineSpacing extends Attributor {
  add(node: HTMLElement, value: string): boolean {
    debugger
    let percent: string
    let floatSpacing: number
    try {
      floatSpacing = parseFloat(value)
    } catch (e) {
      floatSpacing = 1
    }

    percent = `${floatSpacing * 100}%`

    node.style.lineHeight = percent
    debugger

    return super.add(node, value)
  }
}