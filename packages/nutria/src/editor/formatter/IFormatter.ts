import Format from "./Format.ts"
import IToolbar from "../../ui/toolbar/IToolbar.ts";

export default interface IFormatter {

  format(format: Format, ...params: any[]): void

  get toolbars(): IToolbar[]

  set toolbars(value: IToolbar[])

}

export class NothingFormatter implements IFormatter {

  protected _toolbars: IToolbar[] = []

  format(_: Format, ...__: any[]): void {

  }

  get toolbars(): IToolbar[] {
    return this._toolbars
  }

  set toolbars(value: IToolbar[]) {
    this._toolbars = value
  }

}