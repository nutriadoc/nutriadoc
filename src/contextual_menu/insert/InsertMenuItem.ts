import AbstractElement from "../../ui/AbstractElement";

export default class InsertMenuItem extends AbstractElement {

  protected _key: string

  protected _name: string

  protected _canExpand: boolean = false

  protected _icon?: string

  protected nameElement: Node

  protected iconElement?: Node

  protected expandIcon?: Node

  public constructor(key: string, name: string, canExpand: boolean = false, icon?: string) {
    const element = document.createElement("div")
    element.classList.add("item")
    super(element)

    element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    element.addEventListener("mouseleave", this.onMouseLeave.bind(this))

    this._key = key
    this._name = name
    this._canExpand = canExpand
    this._icon = icon

    const nameElement = document.createElement('span')
    nameElement.classList.add("name")
    nameElement.textContent = name
    this.nameElement = nameElement

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
    this._element.appendChild(this.nameElement)
    if (this.expandIcon) this._element.appendChild(this.expandIcon)
  }

  protected onMouseEnter(): void {
    this.element.classList.add("active")
  }

  protected onMouseLeave(): void {
    this.element.classList.remove("active")
  }

  public render(): Node | Node[] {
    return this._element
  }
}