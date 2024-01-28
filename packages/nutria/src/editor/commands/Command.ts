import Format, {formatToCamelcaseKey} from "../formatter/Format.ts";

export default abstract class Command {

  protected _format: Format = Format.Unknown

  protected _value: any

  protected constructor(format: Format = Format.Unknown, value: any = null) {
    this._format = format
    this._value = value
  }

  public getFormat(): string {
    return formatToCamelcaseKey(this._format)
  }

  public get format(): Format {
    return this._format
  }

  public get value(): any {
    return this._value
  }
}