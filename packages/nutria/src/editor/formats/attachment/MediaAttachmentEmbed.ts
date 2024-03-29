import Quill from "quill";
import MediaComponent from "../../behavior/components/MediaComponent";

const Image = Quill.import("formats/image")

export default abstract class MediaAttachmentEmbed extends Image {

  static tagName = 'div'

  protected media: MediaComponent

  constructor(scroll: any, node: Node) {
    super(scroll, node)

    this.media = new MediaComponent(this)
  }

  static create(value: string): HTMLElement {
    const node = super.create(value) as HTMLElement
    node.setAttribute("src", value)

    return node
  }

  format(name: string, value: string): void {
    let width: string = '', height: string = ''

    if (name == 'width') width = value
    if (name == 'height') height = value

    try {
      this.player.setAttribute(name, value)

      this.media.resizeByBlot(width, height)

    } catch (e) {
      console.warn("Parse the value of Resize failed", value)
    }

    if (name == "attachment") return

    return super.format(name, value);
  }

  get src(): string {
    return this.domNode.getAttribute("src")!
  }

  get name(): string {
    return this.statics.blotName
  }

  get node(): Node {
    return this.scroll
  }

  abstract get player(): HTMLElement

  static getPlayer(_: HTMLElement): HTMLElement {
    throw new Error("Not implemented")
  }

  static formats(domNode: Element): any {
    return ["width", "height", "src", "attachment"]
      .reduce(
        (formats: Record<string, string | null>, attribute) => {
          if (domNode.hasAttribute(attribute)) {
            formats[attribute] = this.getPlayer(domNode as HTMLElement).getAttribute(attribute)
          }
          return formats
        },
        {}
      )
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

    return text
  }

  // TODO: Sometimes the focus is not on the text.
  protected focusOn(dom: Node) {
    const selection = window.getSelection()!
    const range = document.createRange()
    range.setStartAfter(dom)

    selection.removeAllRanges()
    selection.addRange(range)
  }
}