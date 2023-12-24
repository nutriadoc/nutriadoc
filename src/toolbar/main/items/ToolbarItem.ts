import View from "../../../ui/View.ts"
import IView from "../../../ui/IView.ts"
import ToolbarItemIcon from "./ToolbarItemIcon.ts"
import ToolbarItemEvent from "../events/ToolbarItemEvent.ts"

const ENTABLE_COLOR = "#464D5A"
const DISABLE_COLOR = "#B5B8BD"

export default class ToolbarItem extends View implements IView {

  protected _key: string

  protected _name: string

  protected _canExpand: boolean = false

  protected _isEnabled: boolean = true

  protected _isActived: boolean = false

  protected rendered: boolean = false

  protected nameElement: Node

  protected _icon?: ToolbarItemIcon

  protected expandIcon?: ToolbarItemIcon

  public constructor(key: string, name: string, canExpand: boolean = false, icon?: ToolbarItemIcon, enabled: boolean = true) {
    const element = document.createElement("div")
    element.classList.add("item")
    super(element)

    element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    element.addEventListener("mouseleave", this.onMouseLeaver.bind(this))
    element.addEventListener("click", this.onClick.bind(this))

    this._key = key
    this._name = name
    this._canExpand = canExpand
    this._icon = icon
    this._isEnabled = enabled

    let nameNode = document.createElement('span')
    nameNode.classList.add("name")
    
    this.nameElement = nameNode
  }

  protected onMouseEnter() {
    if (this._element.classList.contains("active")) return
    this._element.classList.add("active")
  }

  protected onMouseLeaver() {
    if (this._isActived) return
    this._element.classList.remove("active")
  }

  protected onClick() {
    this.dispatchEvent(new ToolbarItemEvent("click", this))
  }

  public render(): Node | Node[] {
    if (this.rendered) return []
    this.rendered = true

    this.renderIcon()

    this._element.append(this.nameElement)
    this.renderName()

    this.renderExpand()

    return this._element
  }

  public renderName() {
    this.nameElement.textContent = this._name
  }

  public renderIcon(): void {
    if (!this._icon)
      return

    this._icon.color = this.enableOrDisableColor()
    this.addElement(this._icon)
  }

  public setLabel(value: string) {
    this.nameElement.textContent = value
  }

  public renderExpand(): void {
    if (!this._canExpand)
      return

    if (this.expandIcon != undefined) return

    this.expandIcon = new ToolbarItemIcon("chevron-down", "", "8px")
    this.expandIcon.element.classList.add("expand")
    this.addElement(this.expandIcon)
  }

  public active(): void {
    this._isActived = true
    this._element.classList.add("active")
  }

  public enableOrDisableColor() {
    return this._isEnabled ? ENTABLE_COLOR : DISABLE_COLOR
  }

  public enable(): void {
    this._isEnabled = true
    if (this._icon)
      this._icon.color = this.enableOrDisableColor()
  }

  public disable(): void {
    this._isEnabled = false
    if (this._icon)
      this._icon.color = this.enableOrDisableColor()
  }

  public get key(): string {
    return this._key
  }

  public get isActive(): boolean {
    return this._isActived
  }
}