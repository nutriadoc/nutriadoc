import { IView, InteractiveView } from "@nutriadoc/classes"
import IToolbarItemIcon from "./IToolbarItemIcon.ts"

export const DEFAULT_COLOR = "#464D5A"

export const DISABLE_COLOR = "#888"

export default class ToolbarItemIcon extends InteractiveView implements IView, IToolbarItemIcon {

  protected name: string

  protected _color: string

  protected size: string = "12px"

  public constructor(name: string, color: string = DEFAULT_COLOR, size: string = "12px") {
    const element = document.createElement('div')
    super(element)

    element.classList.add('icon')

    element.classList.add('icon')
    element.classList.add('bi')
    element.classList.add(`bi-${name}`)
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

  public enable() {
    super.enable();

    this.color = DEFAULT_COLOR
  }

  public disable() {
    super.disable();

    this.color = DISABLE_COLOR
  }
}