import Quill, {RangeStatic, Sources} from "quill";
import Format from "./Format.ts";
import StylesFormatter from "./StylesFormatter.ts";
import FontFamilyFormatter from "./FontFamilyFormatter.ts";
import AbstractFormatter from "./AbstractFormatter.ts";
import FontSizeFormatter from "./FontSizeFormatter.ts";
import BoldFormatter from "./BoldFormatter.ts";
import IToolbar from "../../ui/toolbar/IToolbar.ts";

export default class Formatter {

  protected quill: Quill

  protected formatterClasses = [
    StylesFormatter,
    FontFamilyFormatter,
    FontSizeFormatter,
    BoldFormatter
  ]

  protected formatters: AbstractFormatter[]

  protected toolbars: IToolbar[]

  public constructor(quill: Quill, toolbars: IToolbar[]) {
    this.quill = quill
    this.toolbars = toolbars

    this.formatters = this.formatterClasses.map(cls => new cls(this.quill, toolbars))

    this.quill.on("selection-change", this.select.bind(this))
    this.quill.on("text-change", this.textChange.bind(this))
    this.quill.root.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  format(format: Format, ...params: any[]) {
    const range = this.quill.getSelection()
    if (range == null) return

    this.formatters.forEach(formatter => formatter.format(format, ...params))
  }

  /**
   * 触发 selection-change 事件
   */
  public onMouseUp(_: MouseEvent) {
    this.quill.getSelection()
  }

  textChange(_delta: any, _oldDelta: any, source: Sources) {
    const range = this.quill.getSelection()
    if (range == null) return
    this.select(range, range, source)
  }

  select(range: RangeStatic, _oldRange: RangeStatic, _source: Sources) {
    console.debug("on select", range)
    const format = this.quill.getFormat(range)
    this.formatters.forEach(formatter => formatter.select(format))
  }
}