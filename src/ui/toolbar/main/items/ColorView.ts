import InteractiveView from "../../../InteractiveView.ts";

export const DEFAULT_COLOR = "#464D5A"

export const DISABLE_COLOR = "#888"

export default class ColorView extends InteractiveView {

  protected _color: string = DEFAULT_COLOR

  public constructor() {
    const element = document.createElement('div')
    super(element);
  }

  public get color(): string {
    return this._color
  }

  public set color(value: string) {
    this._color = value
    this._element.style.color = value
  }

  public setColor(value: string) {
    this._element.style.color = value
  }

  public enable() {
    super.enable();

    this.setColor(DEFAULT_COLOR)
  }

  public disable() {
    super.disable();

    this.setColor(DISABLE_COLOR)
  }
}