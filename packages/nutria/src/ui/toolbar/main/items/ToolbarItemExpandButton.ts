import ToolbarItemIcon from "./ToolbarItemIcon.ts"
import ActivationView from "./ActivationView.ts"

export default class ToolbarItemExpandButton extends ActivationView {

  protected _icon?: ToolbarItemIcon

  public constructor(activatedBackgroundColor?: string) {
    const element = document.createElement("div")
    element.classList.add("expand")
    super(element, activatedBackgroundColor, false)

    this._icon = new ToolbarItemIcon("chevron-down", "", "8px")
    this._icon.element.classList.add("expand")
    this.addElement(this._icon)

    this.setupEvents()
  }
}