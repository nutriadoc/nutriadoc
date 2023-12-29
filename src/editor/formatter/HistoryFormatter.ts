import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {Sources, StringMap} from "quill";

export default class HistoryFormatter extends AbstractFormatter {
  format(format: Format, ..._: any[]): void {
    switch (format) {
      case Format.Undo:
        this.quill.history.undo()
        break

      case Format.Redo:
        this.quill.history.redo()
        break

      default:
        return
    }
  }

  textChange(_: any, __: any, ___: Sources) {
    const history = this.quill.history
    const redo = (history as any | undefined)?.stack?.redo as any[] | undefined

    if (redo?.length ?? 0 > 0)
      this.toolbars.forEach(toolbar => toolbar.enableToolbarItem("redo"))

    const undo = (history as any | undefined)?.stack?.undo as any[] | undefined
    if (undo?.length ?? 0 > 0)
      this.toolbars.forEach(toolbar => toolbar.enableToolbarItem("undo"))
  }

  select(_: StringMap): void {
  }

}