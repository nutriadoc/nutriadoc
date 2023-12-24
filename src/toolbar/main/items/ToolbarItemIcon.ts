import View from "../../../ui/View.ts"
import IView from "../../../ui/IView.ts"

const DEFAULT_COLOR = "#464D5A"

export default class ToolbarItemIcon extends View implements IView {

  protected name: string

  protected _color: string

  protected size: string = "12px"

  public constructor(name: string, color: string = DEFAULT_COLOR, size: string = "12px") {
    const element = document.createElement('div')
    element.classList.add('icon')
    element.classList.add('bi')
    element.classList.add(`bi-${name}`)
    super(element)

    element.style.fontSize = size
    element.style.width = size
    element.style.height = size
    this.size = size

    this.name = name
    this._color = color
  }

  public set color(value: string) {
    this._color = value
    this._element.style.color = value
  }

  public get color(): string {
    return this._color
  }
}