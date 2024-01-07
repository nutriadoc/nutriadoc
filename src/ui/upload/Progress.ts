import View from "../View.ts";
import {className, div, onClick, svg} from "../views.ts";
import IView from "../IView.ts";
import IUnit from "../view/unit/IUnit.ts";
import {XCircleFill} from "../styles/icons";

export interface ProgressProps {

  loaded: number,

  total: number,

  cancelable: boolean
}

export default class Progress extends View {

  indicator: IView

  cancel: IView

  public constructor(...units: IUnit[]) {
    super(
      undefined,
      className("progress-container"),
      ...units
    )

    this.indicator = div(className("indicator"))
    this.cancel = svg(
      XCircleFill,
      className("cancel"),
      onClick(this.onCancelClick.bind(this))
    )

    this.assignUnits(
      div(
        className("progress"),
        this.indicator,
      ),
      this.cancel,
    )
  }

  protected onCancelClick() {
    this.dispatchEvent(new Event("click"))
  }

  public update(progress: ProgressProps) {
    const percent = progress.loaded / progress.total * 100
    this.indicator.element.style.width = `${percent}%`
    if (progress.cancelable && percent < 100) {
      this.cancel.element.style.display = "block"
    } else {
      this.cancel.element.style.display = "none"
    }
  }
}