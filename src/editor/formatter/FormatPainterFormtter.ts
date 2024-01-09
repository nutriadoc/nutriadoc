import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import Quill, {RangeStatic, Sources, StringMap} from "quill";
import IToolbar from "../../ui/toolbar/IToolbar.ts";
import FormatPainterCommand from "../commands/FormatPainterCommand.ts";
import QuitFormatPainterCommand from "../commands/QuitFormatPainterCommand.ts";

export default class FormatPainterFormatter extends AbstractFormatter {

  protected formats?: StringMap

  protected limited: boolean = true

  protected onSelectionChangeHandler: (range: RangeStatic, oldRange: RangeStatic, source: Sources) => void

  protected formatPainterSelection?: RangeStatic

  constructor(quill: Quill, toolbars: IToolbar[]) {
    super(quill);

    this.onSelectionChangeHandler = this.onSelectionChange.bind(this)
  }

  format(format: Format, ...params: any[]): void {
    if (format != Format.FormatPainter) return

    const command = params[0] as FormatPainterCommand

    if (command instanceof QuitFormatPainterCommand) {
      this.formats = undefined
      this.disableFormatPainter()
      return
    }

    const selection = this.formatPainterSelection = this.quill.getSelection(false) ?? undefined
    if (!selection) {
      this.disableFormatPainter()
      return
    }

    this.formats = this.quill.getFormat(selection)
    this.limited = command.limitOnce

    setTimeout(() => {
      this.quill.off("selection-change", this.onSelectionChangeHandler)
      this.quill.on("selection-change", this.onSelectionChangeHandler)
    }, 200)

    this.enableFormatPainter()
  }

  onSelectionChange(_range: RangeStatic, _oldRange: RangeStatic, _source: Sources) {

    this.applyFormat()

    if (this.limited) {
      this.disableFormatPainter()
      this.quill.off("selection-change", this.onSelectionChangeHandler)
    }
  }

  public enableFormatPainter() {
    this.quill.root.querySelectorAll('*').forEach(node => {
      node.classList.add('format-painter-cursor')
    })
  }

  public disableFormatPainter() {
    this.quill.root.querySelectorAll('*').forEach(node => {
      node.classList.remove('format-painter-cursor')
    })

    this.deactivateToolbarItem("formatPainter")
  }

  public applyFormat(): void {
    if (this.formats === undefined) return

    Object.keys(this.formats).forEach(key => {
      if (this.formats![key] === undefined) return
      this.quill.format(key, this.formats![key], 'user')
    })
  }

  select(_: StringMap): void {
  }

}