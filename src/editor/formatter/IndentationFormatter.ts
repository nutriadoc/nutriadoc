import { StringMap } from "quill";
import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";

export default class IndentationFormatter extends AbstractFormatter {
  public select(_formats: StringMap): void {

  }
  public format(format: Format, ..._: any[]): void {

    if (format == Format.Indent) {
      this.quill.format("indent", "+1", "user")
    }
    if (format == Format.Outdent) {
      this.quill.format("indent", "-1", "user")
    }
  }

}