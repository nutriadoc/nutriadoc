import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";
import Link from "../../ui/link/Link.ts";
import QuillLinkBinding from "../quilljs/QuillLinkBinding.ts";

export default class LinkFormatter extends AbstractFormatter {
  format(format: Format, ..._: any[]): void {
    if (format !== Format.Link) {
      return
    }

    this.openInsertLink()
  }

  public openInsertLink() {
    const selection = this.quill.getSelection(true)
    const format = this.quill.getFormat(selection)
    const [blot] = this.quill.getLeaf(selection.index)

    const url: string | undefined = format.link
    const text: string | undefined = blot.text

    const link = new Link(url, text, new QuillLinkBinding(this.quill, selection))
    link.visible()
  }

  select(_: StringMap): void {
  }

}