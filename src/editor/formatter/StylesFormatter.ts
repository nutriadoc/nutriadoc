import {StringMap} from "quill"
import Format, {formatToHeadingLevel, toStyles} from "./Format.ts"
import AbstractFormatter from "./AbstractFormatter.ts"
import i18n from "../../i18n";

const titleAttributes = new Map<Format, string>()
titleAttributes.set(Format.Title, "title")
titleAttributes.set(Format.Subtitle, "subtitle")

export default class StylesFormatter extends AbstractFormatter {

  protected allowFormats = [

    Format.NormalText,
    Format.Title,
    Format.Subtitle,
    Format.Heading1,
    Format.Heading2,
    Format.Heading3,
    Format.Heading4,
    Format.Heading5,
    Format.Heading6,
    Format.Heading7,
  ]

  format(format: Format, ..._: object[]) {
    const range = this.quill.getSelection()
    if (range == null) return
    if (!this.allowFormats.includes(format)) return
    const level = formatToHeadingLevel(format)

    const title = titleAttributes.get(format)
    this.quill.format('header', level)


    const [blot] = this.quill.getLine(range.index)
    if (title !== undefined)
      this.quill.formatText(blot.offset(), blot.length(), { title: level ?? undefined }, 'user')

  }

  public select(formats: StringMap) {
    const level = formats["header"]
    const title = formats["title"]
    const subtitle = formats["subtitle"]

    const format = toStyles(level, title, subtitle)
    if (format === undefined) return

    this.activeStyles(format)

  }

  public activeStyles(format: Format) {
    const key = Format[format]
    const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1)
    const n = parseInt(key.substring(7, 8))

    let i18nKey: string
    let label: string
    switch (key) {
      case "Title":
      case "Subtitle":
      case "NormalText": {
        i18nKey = `menu.styles.${camelCaseKey}`
        label = i18n.t(i18nKey)
        break;
      }
      default: {
        i18nKey = `menu.styles.heading`
        label = `${i18n.t(i18nKey)} ${n}`
        break;
      }
    }

    const item = this.toolbar.findItem("styles")
    item?.setLabel(label)
  }

}