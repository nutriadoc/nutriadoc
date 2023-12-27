import View from "../../../View.ts"
import IView from "../../../IView.ts"
import ToolbarItemIcon from "./ToolbarItemIcon.ts"
import ToolbarItemEvent from "../events/ToolbarItemEvent.ts"

const ENABLE_COLOR = "#464D5A"
const DISABLE_COLOR = "#B5B8BD"

export default class ToolbarItem extends View implements IView {

  protected _key: string

  protected _name: string

  protected _canExpand: boolean = false

  protected _isEnabled: boolean = true

  protected _isActivated: boolean = false

  protected _isToggled: boolean = true

  protected rendered: boolean = false

  protected _textElement: Node

  protected _icon?: ToolbarItemIcon

  protected expandIcon?: ToolbarItemIcon

  protected container: HTMLElement

  public constructor(
    key: string,
    text: string,
    canExpand: boolean = false,
    icon?: ToolbarItemIcon,
    enabled: boolean = true,
    toggle: boolean = true) {

    const element = document.createElement("div")
    element.classList.add("item")
    super(element)

    element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    element.addEventListener("mouseleave", this.onMouseLeaver.bind(this))
    element.addEventListener("click", this.onClick.bind(this))

    this._key = key
    this._name = text
    this._canExpand = canExpand
    this._icon = icon
    this._isEnabled = enabled
    this._isToggled = toggle

    const container = document.createElement("div")
    container.classList.add("container")
    this.container = container
    this.addNode(this.container)

    let textElement = document.createElement('span')
    textElement.classList.add("name")
    
    this._textElement = textElement
  }

  protected onMouseEnter() {
    if (this._element.classList.contains("active")) return
    this._element.classList.add("active")
  }

  protected onMouseLeaver() {
    if (this._isActivated) return
    this._element.classList.remove("active")
  }

  protected onClick() {
    this.dispatchEvent(new ToolbarItemEvent("click", this))
  }

  public render(): Node | Node[] {
    if (this.rendered) return []
    this.rendered = true

    this.renderIcon()
    this.renderName()
    this.renderExpand()

    return this._element
  }

  public renderName() {
    this._textElement.textContent = this._name
    this.container.append(this._textElement)
  }

  public renderIcon(): void {
    if (!this._icon)
      return

    this._icon.color = this.enableOrDisableColor()
    this._icon.addTo(this.container)
  }

  public setText(value: string) {
    this._textElement.textContent = value
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
    this._isActivated = true
    this._element.classList.add("active")
  }

  public deactivate(): void {
    this._isActivated = false
    this._element.classList.remove("active")
  }

  public enableOrDisableColor() {
    return this._isEnabled ? ENABLE_COLOR : DISABLE_COLOR
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
    return this._isActivated
  }

  public get textElement(): Node {
    return this._textElement
  }
}