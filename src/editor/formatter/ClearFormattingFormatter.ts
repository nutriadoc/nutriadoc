import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";

export default class ClearFormattingFormatter extends AbstractFormatter {
  format(format: Format, ..._: any[]): void {
    if (format !== Format.ClearFormatting) return

    // TODO: Clear the line formatting
    const range = this.quill.getSelection()
    if (!range) return

    this.quill.removeFormat(range.index, range.length)
  }

  select(_: StringMap): void {
  }

}