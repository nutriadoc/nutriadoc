import {
  View,
  IInteractiveView,
  IUnit,
  Attribute,
} from "./"

export default class InteractiveView extends View implements IInteractiveView {

  protected _isEnabled: boolean = true

  public constructor(element?: HTMLElement, ...units: IUnit[]) {
    units.push(new Attribute("enabled", ""))
    super(element, ...units)
  }

  public get isEnabled(): boolean {
    return this._isEnabled
  }

  public enable(): void {
    this._isEnabled = true
  }

  public disable(): void {
    this._isEnabled = false
  }
}