import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";
import Font from "../font";
import i18n from "../../i18n";

export default class FontFamilyFormatter extends AbstractFormatter {

  protected font: Font = Font.shared

  public format(format: Format, ...params: any[]): void {
    if (format != Format.FontFamily) return

    let range = this.quill.getSelection()
    if (!range) return

    const family = params[0] as string

    if (range.length == 0) {
      const [blot, length] = this.quill.getLine(range.index)

      const index = blot.prev == null ? 0 : blot.prev.length()
      range = { index, length }

    }

    this.quill.formatText(range.index, range.length, { font: family })
  }

  public select(formats: StringMap) {
    const font = formats["font"]
    const item = this.font.item(font)

    let family = item?.name
    if (!family)
      family = font

    if (!family)
      family = i18n.t("menu.font")

    this.activeFont(family!)
  }

  public activeFont(font: string) {
    this.changeToolbarItemText("fontFamily", font)
    this.activeMenuItem("fontFamily", font)
  }

}