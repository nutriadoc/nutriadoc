import IDisposable from "../../core/IDisposable.ts";

export default abstract class ShortcutKeyBinding implements IDisposable {

  protected node: Node

  protected onKeydownHandler: (e: Event) => boolean

  protected constructor(node: Node) {
    this.node = node
    this.onKeydownHandler = this.onKeydown.bind(this)
    node.addEventListener("keydown", this.onKeydownHandler)
  }

  protected onKeydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.key.toUpperCase() == "K" && event.ctrlKey) {
      e.preventDefault()
      e.stopPropagation()

      this.link()
      return false
    }

    return true
  }

  abstract link(): void;

  dispose(): void {
    this.node.removeEventListener("keydown", this.onKeydownHandler)
  }
}