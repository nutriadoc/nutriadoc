import Quill, {RangeStatic, Sources} from "quill";
import Format from "./Format.ts";
import ToolbarAction from "../toolbar/main/ToolbarAction.ts";
import {Blot} from "parchment/dist/typings/blot/abstract/blot";

export default class StylesFormatter  {

  protected quill: Quill

  public toolbarAction?: ToolbarAction

  public constructor(quill: Quill) {
    this.quill = quill
  }

  format(format: Format) {
    const range = this.quill.getSelection()
    if (range == null) return

    let level = 0

    switch (format) {
      case Format.Heading1:
        level = 1
        break;
      case Format.Heading2:
        level = 2
        break;
      case Format.Heading3:
        level = 3
        break;
      case Format.Heading4:
        level = 4
        break;
      case Format.Heading5:
        level = 5
        break;
      case Format.Heading6:
        level = 6
        break;
      case Format.Heading7:
        level = 7
        break;
      case Format.Title:
        level = 1
        break;
      case Format.Subtitle:
        level = 2
        break;
    }

    this.quill.format('header', level)
    // this.quill.formatText(range.index, range.length, { ['header']: level }, 'user')
  }

  public select(range: RangeStatic, _: RangeStatic, __: Sources) {
    const blots = this.quill.getLines(range.index, range.length)
    const [blot] = this.quill.getLine(range.index)

    let format: Format
    if ("header" != blot.statics.blotName) {
      format = Format.NormalText
    } else {
      format = this.getHeadline(blot)
    }

    if (blots.length > 0)
      format = Format.NormalText

    this.toolbarAction?.activeStyles(format)

  }

  protected getHeadline(blot: Blot): Format {
    const element = blot.domNode as HTMLElement
    if (element.classList.contains("ntr-title"))
      return Format.Title

    if (element.classList.contains("ntr-subtitle"))
      return Format.Subtitle

    const tag = element.tagName
    const n = tag.substring(1, 2)
    const formatKey = `Heading${n}`
    return Format[formatKey as keyof typeof Format]
  }
}