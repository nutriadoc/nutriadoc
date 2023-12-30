import { StringMap } from "quill";
import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import i18n from "../../i18n";

export default class FontSizeFormatter extends AbstractFormatter {
  public select(formats: StringMap): void {
    this.setFontSize(formats)
  }


  protected setFontSize(formats: StringMap): void {
    const formatFontSize = formats["size"] ?? "11"

    let fontSizes: string [] = Array.isArray(formatFontSize) ? formatFontSize: ([formatFontSize] || ["11"])
    if (fontSizes.length > 1)
      fontSizes = [""]

    const [fontSize] = fontSizes

    this.active("font-size", fontSize ?? i18n.t("menu.fontSize"))
  }

  public format(format: Format, ...params: any[]): void {

    if (format != Format.FontSize) return

    const size = params[0]
    this.quill.format(
      "size",
      size.toString(),
    )
  }

}