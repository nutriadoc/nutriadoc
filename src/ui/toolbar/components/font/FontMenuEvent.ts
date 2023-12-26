export class FontMenuEvent extends Event {

  protected _font: {name: string, family: string}

  public constructor(type: string, public item: any) {
    super(type)

    this._font = item
  }

  public get font(): {name: string, family: string} {
    return this._font
  }
}