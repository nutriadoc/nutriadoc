import Quill from "quill";
import Resizable from "../../ui/resizer/Resizable.ts";
import View from "../../ui/View.ts";
import ResizeEvent from "../../ui/resizer/ResizeEvent.ts";
import KeyPool from "../../core/KeyPool.ts";
import Key from "../../core/Key.ts";
import KeyFile from "../../core/file/KeyFile.ts";
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

    view.addEventListener("resize", this.onWidthChange.bind(this))
  }

  protected onWidthChange(e: Event) {
    const event = e as ResizeEvent
    this.format("width", event.width.toString())
  }

  static create(value: any) {
    const key = Key.of(value as string)
    const kf = KeyPool.shared.get(key.int) as KeyFile | undefined

    if (kf !== undefined)
      value = URL.createObjectURL(kf.file)

    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    const view = Resizable.loadResizer(value, node)
    this.views.set(view.id, view)
    node.setAttribute("data-view-id", view.id.toString())

    return node
  }

  static formats(domNode: Element): any {
    return ["width", "height"]
      .reduce(
        (formats: Record<string, string | null>, attribute) => {
          if (domNode.hasAttribute(attribute)) {
            formats[attribute] = domNode.getAttribute(attribute)
          }
          return formats
        },
        {}
      )
  }

  format(name: string, value: string): void {
    let width: string = '', height: string = ''

    if (name == 'width') width = value
    if (name == 'height') height = value

    try {
      this.domNode.setAttribute(name, value)

      this.resizeImageByNode(this.domNode, width, height)
    } catch (e) {
      console.warn("Parse the value of Resize failed", value)
    }
    return super.format(name, value);
  }

  resizeImageByNode(node: Element, width: string, height: string) {
    const id = node.getAttribute("data-view-id")
    if (!id) return

    const view = View.views.get(id)
    if (!view) return

    const resizable = view as Resizable
    resizable.resize(parseInt(width), parseInt(height))
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