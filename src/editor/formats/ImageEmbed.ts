import Quill from "quill";
import Resizable from "../../ui/resizer/Resizable.ts";
import View from "../../ui/View.ts";
import ResizeEvent from "../../ui/resizer/ResizeEvent.ts";
const Image = Quill.import("formats/image")

export default class ImageEmbed extends Image {

  static blotName = 'image'
  static tagName = 'div'

  static views: Map<number, View> = new Map()

  public attach() {
    super.attach()

    const viewId = parseInt(this.domNode.getAttribute("data-view-id"))
    const view = ImageEmbed.views.get(viewId)
    if (!view) return

    view.addEventListener("resize_width", this.onWidthChange.bind(this))
  }

  protected onWidthChange(e: Event) {
    const event = e as ResizeEvent
    this.format("width", event.width.toString())
  }

  format(name: string, value: string) {
    super.format(name, value)
  }

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    const view = Resizable.loadResizer(value, node)
    this.views.set(view.id, view)
    node.setAttribute("data-view-id", view.id.toString())

    return node
  }

  public update(
    mutations: MutationRecord[],
    _: { [key: string]: any },
  ): void {
    super.update(mutations, _)

    const characterDataRecord = mutations.find(mutation => {
      return mutation.type == "characterData";
    })
    if (!characterDataRecord) return

    const text = this.moveBlotOfCharacterDataToText(characterDataRecord)
    this.focusOn(text.domNode)
  }

  protected moveBlotOfCharacterDataToText(mutation: MutationRecord): any {
    const characterData = mutation.target as CharacterData
    const text = this.scroll.create("text", characterData.textContent)

    const parent = this.parent

    if (!characterData.previousSibling) {
      parent.insertBefore(text, this)
    } else {
      parent.appendChild(text)
    }

    characterData.remove()
  }

  // TODO: Sometimes the focus is lost
  protected focusOn(dom: Node) {
    const selection = window.getSelection()!
    const range = document.createRange()
    range.setStartAfter(dom)

    selection.removeAllRanges()
    selection.addRange(range)
  }
}