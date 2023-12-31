import IUnit from "./IUnit.ts";

export default class StyleUnit implements IUnit {

  protected _styles: any

  public constructor(styles: any) {
    this._styles = styles
  }

  public get styles(): any {
    return this._styles
  }
}