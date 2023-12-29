import View from "./View.ts";
import IInteractiveView from "./IInteractiveView.ts";

export default class InteractiveView extends View implements IInteractiveView {

  protected _isEnabled: boolean = true

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