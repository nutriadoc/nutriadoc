import InlineToolbar from "../../ui/toolbar/inline/InlineToolbar.ts";
import Range from "../Range.ts";
import Quill from "quill";
import IView from "../../ui/IView.ts";
import Editor from "../Editor.ts";

export default class QuillInlineToolbar extends InlineToolbar {

  protected quill: Quill

  protected range?: Range

  protected leaf?: any

  constructor(quill: Quill, container: IView, editor: Editor) {
    super(container, editor)
    this.quill = quill
    // this.quill.root.addEventListener("blur", this.onQuillBlur.bind(this))
  }

  getSelectionNode(range: Range): Node | undefined {
    this.range = range
    const [leaf] = this.quill.getLeaf(range.index)
    this.leaf = leaf

    if (this.isLink())
      return leaf.domNode.parentNode

    return leaf.domNode
  }

  // onQuillBlur() {
  //   console.debug('on quill blur')
  // }

  isLink(): boolean {
    return this.leaf.parent.statics.blotName.toLowerCase() === "link"
  }
}