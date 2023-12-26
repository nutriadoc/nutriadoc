import Attributor from "./Attributor.ts"
import {Scope} from "parchment"


// FIXED: 格式化后的结果是<h1><span></span></h1>
class TitleAttributor extends Attributor {
  public add(node: HTMLElement, value: any) {
    node.classList.add("ntr-title")
    return super.add(node, value)
  }

  // @ts-ignore
  public value(node: HTMLElement) {
    return super.value(node) == "true"
  }
}

const InstanceTitleAttributor = new TitleAttributor("title", "title", { scope: Scope.INLINE })
export default InstanceTitleAttributor
