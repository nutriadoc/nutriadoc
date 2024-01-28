import Attributor from "./Attributor.ts";
import Scope from "../quilljs/Scope.ts";

class FontSize extends Attributor {
  public add(node: HTMLElement, value: any): boolean {
    node.style.fontSize = (parseFloat(value) * 1.33) + "px"

    return super.add(node, value);
  }
}

export default new FontSize("size", "size", { scope: Scope.INLINE })