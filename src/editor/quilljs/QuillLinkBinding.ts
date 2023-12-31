import LinkBinding from "../../ui/link/LinkBinding.ts";
import Quill from "quill";
import Link from "../../ui/link/Link.ts"

export default class QuillLinkBinding extends LinkBinding {

  protected quill: Quill

  constructor(quill: Quill, payload?: any) {
    super(payload)
    this.quill = quill
  }

  link(url: string, text: string) {
    const range = this.payload
    if (!range) return
    this.quill.focus()

    console.debug("enter link", range)

    if (range.link.length == 0)
      this.quill.insertText(range.cursor.index, text, { "link": url }, "user")
    else {
      this.quill.deleteText(range.link.index, range.link.length, "user")
      this.quill.insertText(range.link.index, text, "user")
      this.quill.formatText(range.link.index, text.length + 1, "link", url, "user")
    }
    // ISSUE: 如果修改的内容比之前的短，会导致光标位置错误
    this.quill.setSelection(range.cursor.index, 0, "user")
  }

  public openLink() {
    const selection = this.quill.getSelection(true)
    const format = this.quill.getFormat(selection)
    const [blot] = this.quill.getLeaf(selection.index)

    const index = blot.offset(this.quill.scroll)

    const url: string | undefined = format.link
    const text: string | undefined = blot.text

    const isChanging = text !== undefined
    this._payload = isChanging ?
      {
        cursor: selection,
        link: {
          index,
          length: text!.length,
        }
      } :
      {
        cursor: selection,
        link: selection,
      }

    const link = new Link(url, text, this)
    link.visible()
  }

}