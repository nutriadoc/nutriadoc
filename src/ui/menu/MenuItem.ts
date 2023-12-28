import View from "../View.ts"

export default abstract class MenuItem extends View {

  protected _value: any

  public abstract isActivated(): boolean

  public abstract deactivate(): void

  public abstract active(): void

  public get value(): any {
    return this._value
  }

  public set value(value: any) {
    this._value = value
  }
}