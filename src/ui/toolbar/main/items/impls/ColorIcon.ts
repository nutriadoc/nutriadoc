import ToolbarItemIcon, {DEFAULT_COLOR} from "../ToolbarItemIcon.ts"
import ColorComponent from "./ColorUnderlineComponent.ts"
import View from "../../../../View.ts";
import IToolbarItemIcon from "../IToolbarItemIcon.ts";

export default class ColorIcon extends View implements IToolbarItemIcon {

  protected _icon: ToolbarItemIcon

  protected _colorComponent: ColorComponent

  public constructor(iconName: string, value?: string | undefined, size: string = "14px") {
    const element = document.createElement("div")
    super(element)

    this.element.classList.add("color-icon")

    this._icon = new ToolbarItemIcon(iconName, DEFAULT_COLOR, size)
    this.addElement(this._icon)

    this._colorComponent = new ColorComponent(value)
    this.addElement(this._colorComponent)
  }

  public set value(value: string | undefined) {
    this._colorComponent.color = value
  }

  public get value(): string | undefined {
    return this._colorComponent.color
  }

  public set color(value: string | undefined) {
    this._colorComponent.color = value
  }

  public get color(): string | undefined {
    return this._colorComponent.color
  }
}