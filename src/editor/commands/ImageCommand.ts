import Command from "./Command.ts";
import Format from "../formatter/Format.ts";

export default class ImageCommand extends Command {

  protected _source: string

  protected _width: number

  protected _height: number

  constructor(source: string, width?: number, height?: number) {
    super(Format.Image, source)

    this._value = this._source = source
    this._width = width ?? -1
    this._height = height ?? -1
  }

  public get source(): string {
    return this._source
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }
}