import MenuItemEvent from "./events/MenuItemEvent.ts";
import MenuItem from "./MenuItem.ts";
import {className} from "../views.ts";

import "./MenuItem.scss"

export default class DefaultMenuItem extends MenuItem {

  protected _key: string

  protected _name: string

  protected _canExpand: boolean = false

  protected _icon?: string

  protected _isActivated: boolean = false

  protected _nameElement: Node

  protected iconElement?: Node

  protected expandIcon?: Node

  public constructor(key: string, name: string, canExpand: boolean = false, icon?: string, enabled?: boolean) {
    super(className("ntr-menu-item"))

    this._element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this._element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    this._element.addEventListener("click", this.onMouseClick.bind(this))

    this._key = key
    this._name = name
    this._canExpand = canExpand
    this._icon = icon
    this._enabled = enabled ?? true

    const nameElement = document.createElement('span')
    nameElement.classList.add("name")
    nameElement.textContent = name
    this._nameElement = nameElement

    if (icon) {
      const iconElement = document.createElement('span')
      iconElement.classList.add("icon")
      iconElement.classList.add("bi")
      iconElement.classList.add(`bi-${icon}`)
      this.iconElement = iconElement
    }

    if (canExpand) {
      const expandIcon = document.createElement('span')
      expandIcon.classList.add("expand")
      expandIcon.classList.add("bi")
      expandIcon.classList.add("bi-chevron-right")
      this.expandIcon = expandIcon
    }

    if (this.iconElement) this._element.appendChild(this.iconElement)
    this._element.appendChild(this._nameElement)
    if (this.expandIcon) this._element.appendChild(this.expandIcon)
  }

  protected onMouseEnter(): void {
    this.element.classList.add("active")

    this.visibleExpand()
  }

  protected onMouseLeave(): void {
    if (this._isActivated) return
    this.element.classList.remove("active")
  }

  protected onMouseClick(): void {
    const event = new MenuItemEvent("select", this)
    this.dispatchEvent(event)
  }

  public isActivated(): boolean {
    return this._isActivated
  }

  public active() {
    this._isActivated = true
    this.element.classList.add("active")
  }

  public deactivate() {
    this._isActivated = false
    this.element.classList.remove("active")
  }

  public get nameElement(): Node {
    return this._nameElement
  }

  public render(): Node | Node[] {
    return this._element
  }

  public get value(): any {
    return this._key
  }
}