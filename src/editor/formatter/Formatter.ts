import Quill, {RangeStatic, Sources} from "quill";
import Format from "./Format.ts";
import StylesFormatter from "./StylesFormatter.ts";
import ToolbarAction from "../../ui/toolbar/main/ToolbarAction.ts";
import FontFamilyFormatter from "./FontFamilyFormatter.ts";
import AbstractFormatter from "./AbstractFormatter.ts";

export default class Formatter {

  protected quill: Quill

  protected formatterClasses = [ StylesFormatter, FontFamilyFormatter]

  protected formatters: AbstractFormatter[]

  protected _toolbarAction?: ToolbarAction

  public constructor(quill: Quill) {
    this.quill = quill
    this.formatters = this.formatterClasses.map(cls => new cls(this.quill))

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
    const format = this.quill.getFormat(range)
    this.formatters.forEach(formatter => formatter.select(format))
  }

  public set toolbarAction(value: ToolbarAction) {
    this._toolbarAction = value

    this.formatters.forEach(formatter => formatter.toolbarAction = value)
  }
}