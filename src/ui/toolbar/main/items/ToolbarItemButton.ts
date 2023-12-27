import ToolbarItemIcon from "./ToolbarItemIcon.ts"
import ActivationView from "./ActivationView.ts"

export default class ToolbarItemButton extends ActivationView {

  protected _icon?: ToolbarItemIcon

  protected _textElement: HTMLElement

  public constructor(icon?: ToolbarItemIcon, activatedBackgroundColor?: string) {
    const element = document.createElement("div")
    element.classList.add("button")
    if (activatedBackgroundColor)
      element.setAttribute("data-active-background-color", activatedBackgroundColor)
    super(element, activatedBackgroundColor, true)

    this._icon = icon
    this._textElement = this.createTextElement()

    this.setupEvents()
  }

  protected createTextElement() {
    let textElement = document.createElement('span')
    textElement.classList.add("name")

    return textElement
  }

  public get textElement() {
    return this._textElement
  }

  public set text(value: string) {
    this._textElement.textContent = value
  }

  public get text(): string {
    return this._textElement.textContent || ""
  }

  public set textWidth(width: number) {
    this._textElement.style.width = `${width}px`
    this._textElement.style.overflowX = "hidden"
    this._textElement.style.whiteSpace = "nowrap"
  }

  public render(): Node | Node[] {
    if (this._icon) this.addElement(this._icon)
    this.addNode(this._textElement)
    return this._element
  }

}