import IView from "../../../IView.ts"
import ToolbarItemEvent from "../events/ToolbarItemEvent.ts"
import ToolbarItemButton from "./ToolbarItemButton.ts";
import ToolbarItemExpandButton from "./ToolbarItemExpandButton.ts";
import ActivationView from "./ActivationView.ts";
import IToolbarItemIcon from "./IToolbarItemIcon.ts";

const ACTIVE_BACKGROUND_COLOR = "#F2F4F5"
const ACTIVE_BACKGROUND_COLOR2 = "#E7EBED"

export default class ToolbarItem extends ActivationView implements IView {

  protected _key: string

  protected _text: string

  protected _canExpand: boolean = false

  protected _isEnabled: boolean = true

  protected _isActivated: boolean = false

  protected _isToggle: boolean = true

  protected rendered: boolean = false

  protected expandButton: ToolbarItemExpandButton

  protected button: ToolbarItemButton

  public description: string | undefined = undefined

  public constructor(
    key: string,
    text: string,
    canExpand: boolean = false,
    icon?: IToolbarItemIcon,
    enabled?: boolean,
    toggle?: boolean) {

    const element = document.createElement("div")
    element.classList.add("item")
    if (toggle === true)
      element.setAttribute("data-toggle", "")
    super(element, ACTIVE_BACKGROUND_COLOR)

    this._key = key
    this._text = text
    this._canExpand = canExpand
    this._isEnabled = enabled === undefined ? true : enabled
    this._isToggle = toggle == undefined ? !canExpand : toggle

    const activeColor = toggle === true ? ACTIVE_BACKGROUND_COLOR2 : undefined
    this.button = new ToolbarItemButton(icon, activeColor)
    this.text = text
    this.expandButton = new ToolbarItemExpandButton(activeColor)

    this.setupEvents2()
  }

  protected setupEvents2() {
    super.setupEvents()

    this.button.element.addEventListener("click", this.onClick.bind(this))
    if (this._canExpand)
      this.expandButton.element.addEventListener("click", this.onExpandClick.bind(this))
  }

  protected onClick() {
    this.dispatchEvent(new ToolbarItemEvent("click", this))
  }

  public click() {
    this.onClick()
  }

  protected onExpandClick() {
    this.dispatchEvent(new ToolbarItemEvent(this._isToggle && this._canExpand ? "expand" : "click", this))
  }

  public render(): Node | Node[] {
    if (this.rendered) return []
    this.rendered = true

    this.addElement(this.button)
    if (this._canExpand)
      this.addElement(this.expandButton)

    return this._element
  }

  public active(): void {
    this._isActivated = true
    this._element.classList.add("active")
  }

  public deactivate(): void {
    this._isActivated = false
    this._element.classList.remove("active")
  }

  public get key(): string {
    return this._key
  }

  public get isActive(): boolean {
    return this._isActivated
  }

  public get canExpand(): boolean {
    return this._canExpand
  }

  public get isToggle(): boolean {
    return this._isToggle
  }

  public set text(value: string) {
    this.button.text = value
  }

  public setText(value: string) {
    this.text = value
  }

  public get text(): string {
    return this.button.text
  }

  public set textWidth(width: number) {
    this.button.textWidth = width
  }

  public set value(value: any) {
    this.button.value = value
  }

  public get value(): any {
    return !this.isActive
  }
}