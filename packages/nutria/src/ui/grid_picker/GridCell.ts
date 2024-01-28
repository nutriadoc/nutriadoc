import ActivationView from "../toolbar/main/items/ActivationView.ts";
import GridCellOption, {defaultOption} from "./GridCellOption.ts";

export default class GridCell extends ActivationView {

  protected option: GridCellOption

  protected _row: number

  protected _column: number

  constructor(row: number, column: number, option?: GridCellOption) {
    const element = document.createElement("div")
    super(element, "#000")

    this._row = row
    this._column = column
    this.option = option = option ?? defaultOption

    element.classList.add("grid-cell-block")
    element.style.backgroundColor = option.backgroundColor
    element.style.border = `2px solid ${option.borderColor}`
    element.style.width = `${option.width}px`
    element.style.height = `${option.height}px`

    this.element.addEventListener("click", this.onClick.bind(this))
  }

  protected onClick(_: MouseEvent) {
    this.dispatchEvent(new Event("click"))
  }

  protected onMouseEnter() {
    this.active()

    this.dispatchEvent(new Event("enter"))
  }

  protected onMouseLeave() {
    if (this.isActivated) return

    this.deactivate()
    this.dispatchEvent(new Event("leave"))
  }

  public active() {
    this.element.style.border = `2px solid ${this.option.activeBorderColor}`
    this.element.style.backgroundColor = this.option.activeBackgroundColor
  }

  public deactivate() {
    this.element.style.border = `2px solid ${this.option.borderColor}`
    this.element.style.backgroundColor = this.option.backgroundColor
  }

  public get row() {
    return this._row
  }

  public get column() {
    return this._column
  }
}