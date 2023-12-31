import LinkBinding from "../../ui/link/LinkBinding.ts";
import Quill, {RangeStatic} from "quill";

export default class QuillLinkBinding extends LinkBinding {

  protected quill: Quill

  constructor(quill: Quill, payload?: any) {
    super(payload)
    this.quill = quill
  }

  link(url: string, text: string) {
    const range = this.payload as RangeStatic
    if (!range) return
    this.quill.focus()
    this.quill.insertText(range.index, text, { "link": url }, "user")
  }

}