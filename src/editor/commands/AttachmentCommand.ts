import KeyFile from "../../core/file/KeyFile"
import Format from "../formatter/Format"
import Command from "./Command"

export default class AttachmentCommand extends Command {

  protected _source: KeyFile

  protected _width: number

  protected _height: number

  constructor(source: KeyFile, format: Format, width?: number, height?: number) {
    super(format, source)

    this._value = this._source = source
    this._width = width ?? -1
    this._height = height ?? -1
    this._value = this._source.id
  }

  public get source(): KeyFile {
    return this._source
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }
}