import AbstractFormatter from "./AbstractFormatter.ts"
import Format from "./Format.ts"
import {StringMap} from "quill"
import QuillLinkBinding from "../quilljs/QuillLinkBinding.ts"

export default class LinkFormatter extends AbstractFormatter {
  format(format: Format, ..._: any[]): void {
    if (format !== Format.Link) {
      return
    }

    this.openInsertLink()
  }

  public openInsertLink() {
    QuillLinkBinding.create(this.quill)?.openLinkSettings()
  }

  select(_: StringMap): void {
  }

}