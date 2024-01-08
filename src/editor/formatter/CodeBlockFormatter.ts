import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";

export default class CodeBlockFormatter extends AbstractFormatter {
  format(format: Format, ...params: any[]): void {
    if (format !== Format.CodeBlock) return
    const toggle = params[0] as boolean

    const range = this.quill.getSelection(true)
    if (!range) return

    this.quill.formatLine(range.index, range.length, "code-block", toggle)
  }

  select(formats: StringMap): void {
    const code = formats["code-block"]
    if (code) {
      this.active("codeblock", true)
    } else {
      this.deactive("codeblock")
    }
  }

}