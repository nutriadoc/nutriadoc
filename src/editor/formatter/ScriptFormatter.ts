import AbstractFormatter from "./AbstractFormatter.ts"
import Format from "./Format.ts";
import {StringMap} from "quill";

export default class ScriptFormatter extends AbstractFormatter {

  readonly scripts: string[] = ["subscript", "superscript"]

  format(format: Format, ..._: any[]): void {

    let value: string = "sup"

    switch (format) {
      case Format.Subscript:
        value = "sub"
        break
      case Format.Superscript:
        value = "sup"
        break
      default:
        return
    }

    this.quill.format("script", value, "user")
  }

  select(formats: StringMap): void {
    const value = formats["script"]
    if (value == null) {
      this.scripts.forEach(s => super.deactive(s))
      return
    }
    const button = value == "sub" ? "subscript" : "superscript"

    this.scripts.forEach(s => super.deactive(s))
    this.scripts.filter(s => s == button)
        .forEach(s => super.active(s, true))

  }

}