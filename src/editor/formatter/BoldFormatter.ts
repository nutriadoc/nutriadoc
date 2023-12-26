import { StringMap } from "quill";
import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";

export default class BoldFormatter extends AbstractFormatter {
  public select(formats: StringMap): void {
    if (!formats["bold"])
      super.deactive("bold")
    else
      super.active("bold")

  }
  public format(format: Format, ..._params: any[]): void {
    if (format != Format.Bold) return

    const range = this.quill.getSelection()
    if (range == null) return

    const formats = this.quill.getFormat(range)
    if (formats["bold"]) {
      this.quill.formatText(range, "bold", false, "user")
    } else {
      this.quill.formatText(range, "bold", true, "user")
    }
  }

}