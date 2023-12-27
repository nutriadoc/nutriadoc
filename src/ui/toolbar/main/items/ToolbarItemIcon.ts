import View from "../../../View.ts"
import IView from "../../../IView.ts"

const DEFAULT_COLOR = "#464D5A"

export default class ToolbarItemIcon extends View implements IView {

  protected name: string

  protected _color: string

  protected size: string = "12px"

  protected icon: HTMLElement

  public constructor(name: string, color: string = DEFAULT_COLOR, size: string = "12px") {
    const element = document.createElement('div')
    super(element)

    element.classList.add('icon-container')

    const icon = document.createElement('div')
    this.icon = icon
    this.addNode(this.icon)

    icon.classList.add('icon')
    icon.classList.add('bi')
    icon.classList.add(`bi-${name}`)
    icon.style.fontSize = size
    icon.style.width = size
    icon.style.height = size
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