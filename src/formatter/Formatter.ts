import Quill, {RangeStatic, Sources} from "quill";
import Format from "./Format";
import StylesFormatter from "./StylesFormatter.ts";
import ToolbarAction from "../toolbar/main/ToolbarAction.ts";

export default class Formatter {

  protected quill: Quill

  protected stylesFormatter: StylesFormatter

  protected _toolbarAction?: ToolbarAction

  public constructor(quill: Quill) {
    this.quill = quill
    this.stylesFormatter = new StylesFormatter(this.quill)

    this.quill.on("selection-change", this.select.bind(this))
    this.quill.on("text-change", this.textChange.bind(this))
    this.quill.root.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  format(format: Format) {
    const range = this.quill.getSelection()
    if (range == null) return

    switch (format) {
      case Format.Heading1:
      case Format.Heading2:
      case Format.Heading3:
      case Format.Heading4:
      case Format.Heading5:
      case Format.Heading6:
      case Format.Heading7:
      case Format.Title:
      case Format.Subtitle:
        this.stylesFormatter.format(format)
        break;
    }
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
    this.stylesFormatter.select(range, range, source)
  }

  select(range: RangeStatic, oldRange: RangeStatic, source: Sources) {
    console.debug("selection-change", range, oldRange, source)
    this.stylesFormatter.select(range, oldRange, source)
  }

  public set toolbarAction(value: ToolbarAction) {
    this._toolbarAction = value
    this.stylesFormatter.toolbarAction = value
  }
}