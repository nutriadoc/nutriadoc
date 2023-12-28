export default class ColorEvent extends Event {

  protected _color: string

  public constructor(type: string, color: string) {
    super(type)
    this._color = color
  }

  public get color(): string {
    return this._color
  }
}