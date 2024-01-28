import Command from "./Command.ts";
import Format from "../formatter/Format.ts";

export default class InsertTableCommand extends Command {

  protected _rows: number = 0

  protected _columns: number = 0

  constructor(rows: number, columns: number) {
    super(Format.Table)
    this._rows = rows
    this._columns = columns
  }

  public get rows(): number {
    return this._rows
  }

  public get columns(): number {
    return this._columns
  }
}