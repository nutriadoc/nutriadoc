import Attributor from "./Attributor.ts"
import Scope from "../quilljs/Scope.ts"


// FIXED: 格式化后的结果是<h1><span></span></h1>
class SubtitleAttributor extends Attributor {
  public add(node: HTMLElement, value: any) {
    node.classList.add("ntr-subtitle")
    return super.add(node, value)
  }

  // @ts-ignore
  public value(node: HTMLElement) {
    return super.value(node) == "true"
  }
}

const InstanceSubtitleAttributor = new SubtitleAttributor("subtitle", "subtitle", { scope: Scope.INLINE })
export default InstanceSubtitleAttributor
