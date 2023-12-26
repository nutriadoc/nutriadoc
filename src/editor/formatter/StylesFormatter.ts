import {StringMap} from "quill"
import Format, {formatToHeadingLevel, toStyles} from "./Format.ts"
import AbstractFormatter from "./AbstractFormatter.ts"

export default class StylesFormatter extends AbstractFormatter {

  format(format: Format, ..._: object[]) {
    const range = this.quill.getSelection()
    if (range == null) return

    const level = formatToHeadingLevel(format)
    if (!level) return

    this.quill.format('header', level)
  }

  public select(formats: StringMap) {
    const level = formats["header"]
    const title = formats["title"]
    const subtitle = formats["subtitle"]
    const format = toStyles(level, title, subtitle)
    if (!format) return

    this.toolbarAction?.activeStyles?.(format)

  }

}