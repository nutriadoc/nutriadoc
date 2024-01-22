import View from "../View.ts"
import {style} from "../views.ts";

export default class ProgressIndicator extends View {

  protected  _percent: number = 0

  constructor() {
    super(
      undefined,
      style({
        height: "2px",
        backgroundColor: "rgb(0, 120, 212)",
        width: "1%",
        position: "absolute",
        bottom: "0px"
      })
    )
  }

  get percent() {
    return this._percent
  }

  set percent(value: number) {
    if (value > 1) {
      value = 1.0
    }
    this._percent = value

    this.element.style.width = `${value * 100}%`
  }
}