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
import LinkFormatter from "./LinkFormatter.ts";
import EventDispatcher from "../quilljs/EventDispatcher.ts";
import ScriptFormatter from "./ScriptFormatter.ts";
import CodeBlockFormatter from "./CodeBlockFormatter.ts";
import Editor from "../Editor.ts";

export default class Formatter implements IFormatter {

  protected quill: Quill

  protected editor: Editor

  protected formatterClasses: any[] = [
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
    LinkFormatter,
    ScriptFormatter,
    CodeBlockFormatter,
  ]

  protected formatters: AbstractFormatter[]

  protected _toolbars: IToolbar[] = []

  public constructor(quill: Quill, editor: Editor) {
    this.quill = quill
    this.editor = editor

    this.formatters = this.formatterClasses.map(cls => new cls(this.quill, editor))

    this.quill.on("selection-change", this.select.bind(this))
    this.quill.on("text-change", this.textChange.bind(this))

    EventDispatcher.shared.load(this.quill)
  }

  format(format: Format, ...params: any[]) {
    this.formatters.forEach(formatter => formatter.format(format, ...params))
  }

  textChange(delta: any, oldDelta: any, source: Sources) {
    this.formatters.forEach(formatter => formatter.textChange(delta, oldDelta, source))

    const range = this.quill.getSelection()
    if (range == null) return
    this.select(range, range, source)
  }

  select(range: RangeStatic, _oldRange: RangeStatic, _source: Sources) {
    if (range == null) return
    const format = this.quill.getFormat(range)
    // console.debug("on select", range, format)
    this.formatters.forEach(formatter => formatter.select(format))
  }

  public set toolbars(value: IToolbar[]) {
    this._toolbars = value
    this.formatters.forEach(formatter => formatter.toolbars = value)
  }

  public get toolbars(): IToolbar[] {
    return this._toolbars
  }

}