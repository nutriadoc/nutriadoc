import View from "../View.ts";
import {className, div} from "../views.ts";
import IView from "../IView.ts";

export interface ProgressProps {

  loaded: number,

  total: number,

  cancelable: boolean
}

export default class Progress extends View {

  indicator: IView

  cancel: IView

  public constructor() {
    super(
      undefined,
      className("progress-container")
    )

    this.indicator = div(className("indicator"))
    this.cancel = div(className("cancel"))

    this.assignUnits(
      className("progress"),
      this.indicator,
      this.cancel,
    )
  }

  public update(progress: ProgressProps) {
    this.indicator.element.style.width = `${progress.loaded / progress.total * 100}%`
    if (progress.cancelable) {
      this.cancel.element.style.display = "block"
    } else {
      this.cancel.element.style.display = "none"
    }
  }

}