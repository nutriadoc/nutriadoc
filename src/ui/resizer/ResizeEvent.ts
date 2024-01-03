export default class ResizeEvent extends Event {

  protected _width: number

  protected _height: number

  public constructor(type: string, width: number, height: number) {
    super(type)

    this._width = width
    this._height = height
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }
}