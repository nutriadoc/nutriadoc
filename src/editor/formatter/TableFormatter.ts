import AbstractFormatter from "./AbstractFormatter.ts";
import Format from "./Format.ts";
import {StringMap} from "quill";
import InsertTableCommand from "../commands/InsertTableCommand.ts";

export default class TableFormatter extends AbstractFormatter {
  format(format: Format, ...params: any[]): void {

    if (format !== Format.Table) return
    const command = params[0] as InsertTableCommand

    // TODO: 修复行列的属性错误
    for (let column = 0, columns = command.columns + 1; column < columns; column++) {
      for (let row = 0, rows = command.rows + 1; row < rows; row ++) {
        // delta.insert("\n", { table: `${column}` })
        this.quill.insertText(this.quill.getLength(), "\n", { table: `${column}` })
      }
    }
    this.quill.insertText(this.quill.getLength(), "\n")
  }

  select(_formats: StringMap): void {
  }

}