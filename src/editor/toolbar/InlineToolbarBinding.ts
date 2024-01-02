import Quill, {RangeStatic, Sources} from "quill";
import LinkInlineToolbar from "../../ui/toolbar/inline/link/LinkInlineToolbar.ts";
import View from "../../ui/View.ts";

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

  protected onSelectionChange(range: RangeStatic, _: RangeStatic, __: Sources) {

    const [leaf] = this.quill.getLeaf(range.index)
    const blot = leaf.parent

    // this.insertInlineToolbarContainer()
    this.visibleLinkInlineToolbar(blot)
  }

  protected insertInlineToolbarContainer() {
    if (this.quill.root.querySelector(".inline-toolbars")) return
    this.quill.insertEmbed(0, "inline-toolbar", true)
  }

  protected visibleLinkInlineToolbar(blot: any) {
    console.debug("visible link", blot, blot.statics.blotName)

    if (blot.statics.blotName.toLowerCase() !== "link") return

    if (!this.link) {
      const container = this.getContainer("link")
      this.link = new LinkInlineToolbar(container, this.quill)
      this.link.render()
    }

    this.link.href = blot.domNode.href

    this.link.visible(
      blot.domNode,
      // new View(blot.domNode)
      this.root
    )
  }

  protected getContainer(name: string) {
    // if (range == null) return
    const key = `${name}-inline-toolbar`
    this.quill.insertEmbed(0, "inline-toolbar", key)

    return this.quill.root.querySelector(`.${key}`) as HTMLElement
  }

  protected get container(): HTMLElement {
    return this.quill.root.querySelector(".inline-toolbars") as HTMLElement
  }
}