import Quill, {RangeStatic} from "quill"
import LinkInlineToolbar from "../../ui/toolbar/inline/link/LinkInlineToolbar.ts"
import View from "../../ui/View.ts"
import QuillLinkBinding from "../quilljs/QuillLinkBinding.ts"

export default class InlineToolbarBinding {

  protected quill: Quill

  protected link?: LinkInlineToolbar

  protected root: View

  public constructor(quill: Quill) {
    this.quill = quill
    this.root = new View(this.quill.root)
    quill.on("selection-change", this.onSelectionChange.bind(this))
    this.quill.root.style.position = "relative"
  }

  protected onSelectionChange(range: RangeStatic, _: RangeStatic) {
    if (null == range) return

    const [leaf] = this.quill.getLeaf(range.index)
    this.visibleLinkInlineToolbar(range, leaf)
  }

  protected visibleLinkInlineToolbar(range: RangeStatic, leaf: any) {
    if (!QuillLinkBinding.isLink(leaf)) return

    if (!this.link) {
      const container = this.getContainer("link")
      this.link = new LinkInlineToolbar(container)
      this.link.render()
    }

    this.link.binding = new QuillLinkBinding(this.quill, range, leaf)
    this.link.visible(
      leaf.parent.domNode,
      this.root
    )
  }

  protected getContainer(name: string): HTMLElement {
    const key = `${name}-inline-toolbar`
    let element = this.quill.root.querySelector(`.${key}`)
    if (element)
      return element as HTMLElement

    this.quill.insertEmbed(0, "inline-toolbar", key)

    element = this.quill.root.querySelector(`.${key}`)
    return element as HTMLElement
  }
}