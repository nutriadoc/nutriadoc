import Format from "../formatter/Format.ts";

export default abstract class Command {

  protected _format: Format = Format.Unknown

  protected constructor(format: Format = Format.Unknown) {
    this._format = format
  }

  public get format(): Format {
    return this._format
  }
}