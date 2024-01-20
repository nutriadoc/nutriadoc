import AbstractFormatter from "./AbstractFormatter.ts"
import Format from "./Format.ts"
import {StringMap} from "quill"

export default class LinkFormatter extends AbstractFormatter {
  format(format: Format, ..._: any[]): void {
    if (format !== Format.Link) {
      return
    }

    this.openInsertLink()
  }

  public openInsertLink() {
  }

  select(_: StringMap): void {
  }

}