import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";

export default class CodeBlockFormatter extends AbstractFormatter {
  format(format: Format, ...params: any[]): void {
    if (format !== Format.CodeBlock) return

    const range = this.quill.getSelection(true)
    if (!range) {
    } else {
      this.quill.insertText(range.index, '\n', { 'code-block': "bash" })
      // this.quill.formatLine(range.index, range.length, "code-block", "")
      // debugger
    }

  }

  select(formats: StringMap): void {
  }

}