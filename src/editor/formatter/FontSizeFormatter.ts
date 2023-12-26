import { StringMap } from "quill";
import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import MenuItem from "../../ui/menu/MenuItem.ts";
import i18n from "../../i18n";

export default class FontSizeFormatter extends AbstractFormatter {
  public select(formats: StringMap): void {
    let fontSizes: string [] = Array.isArray(formats["size"]) ? formats["size"] : [formats["size"]] ?? ["11"]

    if (fontSizes.length > 1)
      fontSizes = [""]

    const [fontSize] = fontSizes

    const item = this.toolbar.findItem("font-size")
    item?.setLabel(fontSize ?? i18n.t("menu.fontSize"))

    const menu = this.toolbar.findMenu("font-size")
    menu?.active(fontSize)
  }

  public format(format: Format, ...params: any[]): void {

    if (format != Format.FontSize) return

    const item = params[0] as MenuItem
    this.quill.format(
      "size",
      item.key
    )
  }

}