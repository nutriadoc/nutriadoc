import Quill, {RangeStatic, Sources} from "quill";
import Format from "./Format.ts";
import StylesFormatter from "./StylesFormatter.ts";
import FontFamilyFormatter from "./FontFamilyFormatter.ts";
import AbstractFormatter from "./AbstractFormatter.ts";
import FontSizeFormatter from "./FontSizeFormatter.ts";
import IToolbar from "../../ui/toolbar/IToolbar.ts";
import CommonFormatter from "./CommonFormatter.ts";
import IFormatter from "./IFormatter.ts";
import IndentationFormatter from "./IndentationFormatter.ts";
import ListFormatter from "./ListFormatter.ts";
import TableFormatter from "./TableFormatter.ts";
import HistoryFormatter from "./HistoryFormatter.ts";
import ClearFormattingFormatter from "./ClearFormattingFormatter.ts";
import FormatPainterFormatter from "./FormatPainterFormtter.ts";

export default class Formatter implements IFormatter {

  protected quill: Quill

  protected formatterClasses = [
    StylesFormatter,
    FontFamilyFormatter,
    FontSizeFormatter,
    IndentationFormatter,
    CommonFormatter,
    ListFormatter,
    TableFormatter,
    HistoryFormatter,
    ClearFormattingFormatter,
    FormatPainterFormatter,
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
    this.formatters.forEach(formatter => formatter.format(format, ...params))
  }

  /**
   * 触发 selection-change 事件
   */
  public onMouseUp(_: MouseEvent) {
    this.quill.getSelection()
  }

  textChange(delta: any, oldDelta: any, source: Sources) {
    this.formatters.forEach(formatter => formatter.textChange(delta, oldDelta, source))

    const range = this.quill.getSelection()
    if (range == null) return
    this.select(range, range, source)
  }

  select(range: RangeStatic, _oldRange: RangeStatic, _source: Sources) {
    const format = this.quill.getFormat(range)
    console.debug("on select", range, format)
    this.formatters.forEach(formatter => formatter.select(format))
  }

}