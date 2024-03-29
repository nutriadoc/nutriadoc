import ToolbarItemEvent from "../events/ToolbarItemEvent.ts"
import ToolbarItemButton from "./ToolbarItemButton.ts";
import ToolbarItemExpandButton from "./ToolbarItemExpandButton.ts";
import ActivationView from "./ActivationView.ts";
import IToolbarItemIcon from "./IToolbarItemIcon.ts";
import {Measurable} from "@nutriadoc/classes"

const ACTIVE_BACKGROUND_COLOR = "#F2F4F5"
const ACTIVE_BACKGROUND_COLOR2 = "#E7EBED"

export default class ToolbarItem extends ActivationView implements Measurable {

  protected _key: string

  protected _text: string

  protected _canExpand: boolean = false

  protected _isToggle: boolean = true

  protected rendered: boolean = false

  protected expandButton: ToolbarItemExpandButton

  protected button: ToolbarItemButton

  public description: string | undefined = undefined

  protected _collapsedWeight: number = 0

  protected _width: number = -1

  public fixed: boolean = false


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
    this.button = new ToolbarItemButton(icon, activeColor, canExpand ? true : undefined)
    if (this._isEnabled)
      this.button.enable()
    else
      this.button.disable()
    this.text = text
    this.expandButton = new ToolbarItemExpandButton(activeColor)

    this.setupEvents2()
  }

  protected setupEvents2() {

    this.button.element.addEventListener("click", this.onClick.bind(this))
    if (this._canExpand)
      this.expandButton.element.addEventListener("click", this.onExpandClick.bind(this))
  }

  protected onClick() {
    if (!this.isEnabled) return

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

    super.deactivate()
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

  public enable() {
    super.enable();

    this.button.enable()
  }

  public disable() {
    super.disable();

    this.button.disable()
  }

  public set justifySelf(value: string) {
    this._element.style.justifySelf = value
  }

  public get justifySelf(): string {
    return this._element.style.justifySelf
  }

  public set collapsedWeight(value: number) {
    this._collapsedWeight = value
  }

  public get collapsedWeight(): number {
    return this._collapsedWeight
  }

  get width(): number {
    if (this._width > 0)
      return this._width

    if (this._canExpand)
      return 44

    return 28
  }

  set width(value: number) {
    this._width = value
  }

  get height(): number {
    return 30
  }
}