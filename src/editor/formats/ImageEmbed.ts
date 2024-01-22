import Quill from "quill";
import Resizable from "../../ui/resizer/Resizable.ts";
import View from "../../ui/View.ts";
import ResizeEvent from "../../ui/resizer/ResizeEvent.ts";
import KeyPool from "../../core/KeyPool.ts";
import Key from "../../core/Key.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import MediaUploader from "../../ui/media/MediaUploader.ts";
import QuillDocument from "../quilljs/QuillDocument.ts";
import NutriaDocument from "../../document/service/model/NutriaDocument.ts";

const Image = Quill.import("formats/image")

export default class ImageEmbed extends Image {

  static blotName = 'image'
  static tagName = 'div'

  static views: Map<number, View> = new Map()

  protected attached: boolean = false

  public attach() {
    super.attach()

    if (this.attached) return

    this.attached = true

    const viewId = parseInt(this.domNode.getAttribute("data-view-id"))
    const view = ImageEmbed.views.get(viewId)
    if (!view) return

    view.addEventListener("resize", this.onWidthChange.bind(this))

    this.startMediaUploader(view as Resizable).then(() => {})
  }

  protected async startMediaUploader(resizable: Resizable): Promise<void> {
    if (!resizable.file) return

    if (!this.image?.src?.startsWith("blob:")) return

    const uploader = new MediaUploader(
      resizable.file,
      resizable,
      this.document.services.documentService(),
      this.document.data as NutriaDocument
    )

    await uploader.start()

    this.format("src", uploader.sign.readUrl)

    console.debug(this.document.editor.contents)
  }

  protected onWidthChange(e: Event) {
    const event = e as ResizeEvent
    this.format("width", event.width.toString())
  }

  static create(value: any) {
    const key = Key.of(value as string)
    const kf = KeyPool.shared.get(key.int) as KeyFile | undefined

    if (kf !== undefined)
      value = kf.blob

    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    const view = Resizable.loadResizer(kf, value, node)
    this.views.set(view.id, view)
    node.setAttribute("data-view-id", view.id.toString())

    return node
  }

  static formats(domNode: Element): any {
    return ["width", "height", "src"]
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

    let attribute: string = name

    try {
      this.domNode.setAttribute(attribute, value)

      const element = this.domNode as HTMLElement
      const img = element.querySelector("img")
      if (!img)
        this.resizeImageByNode(this.domNode, width, height)
      else
        img.setAttribute(attribute, value)
    } catch (e) {
      console.warn("Parse the value of Resize failed", value)
    }
    setTimeout(() => {
      console.debug(this.document.editor.contents)
    }, 100)
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

  protected get document(): QuillDocument {
    const scroll = (this as any).scroll
    return QuillDocument.getDocumentByScroll(scroll) as QuillDocument
  }

  protected get image(): HTMLImageElement | undefined {
    const element = this.domNode as HTMLElement
    return element.querySelector("img") ?? undefined
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