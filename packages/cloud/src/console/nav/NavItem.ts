import {className, IUnit, View} from "@nutriadoc/classes"

export function navItem(...parameters: IUnit[]) {
  return new NavItem(...parameters)
}

export default class NavItem extends View {

  protected mouseOverHandler = this.onMouseOver.bind(this)

  protected mouseLeaveHandler = this.onMouseLeave.bind(this)

  protected clickHandler = this.onClick.bind(this)

  protected _isActive: boolean = false

  constructor(...units: IUnit[]) {
    const element = document.createElement("a")
    super(element, className("nav-item"), ...units)

    element.addEventListener("mouseover", this.mouseOverHandler)
    element.addEventListener("mouseleave", this.mouseLeaveHandler)
    // element.addEventListener("click", this.clickHandler)
  }

  onClick() {

  }

  onMouseOver() {
    if (this._isActive) return

    this.addClass("active")
  }

  onMouseLeave() {
    if (this._isActive) return

    this.removeClass("active")
  }

  get isActive(): boolean {
    return this._isActive
  }

  set isActive(value: boolean) {
    this._isActive = value
  }

  active() {
    this._isActive = true
    this.addClass("active")
  }

  deactive() {
    this._isActive = false
    this.removeClass("active")
  }
}