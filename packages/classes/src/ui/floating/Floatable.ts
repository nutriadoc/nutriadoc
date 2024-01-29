import { IView, View } from "../index"
import Position from "./Position.ts"

export default class Floatable {

  protected _relative?: HTMLElement

  protected _position?: Position

  protected _relativeTo: "viewport" | "element" = "viewport"

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  protected static _zIndex: number = 100

  protected _container?: IView

  protected spacing: number

  protected documentClickHandler = this.onDocumentClick.bind(this)

  protected _view: IView

  protected _dismissWhenBlur: boolean = true

  public _disableAutoHide = false

  constructor(
    view: IView,
    relativePosition?: Position,
    relativeTo?: "viewport" | "element",
    spacing?: number) {

    this._view = view
    this._relativeTo = relativeTo ?? "viewport"
    this.spacing = spacing ?? 10

    this._position = relativePosition ?? Position.BottomLeft

    this.hidden()
  }

  public get x(): number {
    let x = 0

    const container = this._container?.element ?? document.body
    const bodyRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight)
    const relativeRect = this._relative?.getBoundingClientRect()
    const selfRect = this._view.element.getBoundingClientRect()
    const rect = relativeRect ?? bodyRect

    // if (this._relativeTo == "element") {
      rect.y = this._relative?.offsetTop ?? 0
      rect.x = this._relative?.offsetLeft ?? 0
    // }

    switch (this._position) {
      case Position.BottomCenter:
      case Position.Center: {
        // x = (rect.width - selfRect.width) / 2
        // debugger
        x = rect.x - (selfRect.width - rect.width ) / 2
        if (x + selfRect.width > container.offsetWidth)
          x = container.offsetWidth - selfRect.width
        if (x < 0)
          x = 0

        break
      }
      case Position.LeftTop:
      case Position.TopLeft:
      case Position.TopCenter:
      case Position.TopRight: {
        x = this._relative?.offsetLeft ?? 0 - container.offsetLeft
        break
      }
      case Position.RightBottom:
      case Position.RightCenter:
      case Position.RightTop: {
        x = rect.x + rect.width + 10
        break
      }
      case Position.BottomLeft:
      case Position.LeftBottom:
      default: {
        if ((rect.x + selfRect.width) > container.offsetWidth) {
          return container.offsetWidth - selfRect.width - this.spacing
        }
        x = rect.x
      }
    }

    return x
  }



  public get y(): number {
    let y = 0

    const container = this._container?.element ?? document.body
    const relativeRect = this._relative?.getBoundingClientRect()
    const rect = relativeRect ?? container.getBoundingClientRect()
    const selfRect = this._view.element.getBoundingClientRect()

    let top = this._relative?.offsetTop ?? 0
    let element = this._relative?.offsetParent as HTMLElement | undefined
    top += element?.offsetTop ?? 0
    for (; !!element;) {
      element = element?.offsetParent as HTMLElement ?? undefined
      top += element?.offsetTop ?? 0
    }

    rect.y = top ?? 0
    rect.x = this._relative?.offsetLeft ?? 0


    switch (this._position) {
      case Position.Center: {
        y = (rect.height - selfRect.height) / 2
        break
      }
      case Position.LeftTop:
      case Position.TopLeft:
      case Position.TopCenter:
      case Position.TopRight: {
        y = rect.y - selfRect.height - this.spacing
        if (y < 0)
          y = rect.y + rect.height + this.spacing
        break
      }
      case Position.RightBottom:
      case Position.RightCenter:
      case Position.RightTop: {
        y = rect.y
        break
      }
      case Position.BottomLeft:
      case Position.BottomCenter:
      default: {
        y = rect.y + rect.height + 5
      }
    }

    return y
  }


  protected setupDismiss() {
    if (this.attachedEvent) return
    if (!this._dismissWhenBlur) return

    document.addEventListener('click', this.documentClickHandler)
  }

  public onDocumentClick(event: MouseEvent) {
    // console.debug('on document click', this)

    const target = event.target as HTMLElement

    if (this._view.element.contains(target)) {
      return
    }

    if (this._visible) {
      this._visible = false
      return
    }

    if (this._disableAutoHide) return

    document.removeEventListener('click', this.documentClickHandler)
    this.attachedEvent = false

    this.hidden()
  }

  public disableAutoHide() {
    console.debug("disable auto hide")
    document.removeEventListener('click', this.documentClickHandler)
  }

  public enableAutoHide() {
    document.addEventListener('click', this.documentClickHandler)
  }

  public set relative(value: HTMLElement) {
    this._relative = value
  }

  public get relative(): HTMLElement | undefined {
    return this._relative
  }

  public pin() {
    if (!this._visible) return

    this._view.element.style.left = `${this.x}px`
    this._view.element.style.top = `${this.y}px`
    this._view.element.style.position = "absolute"
    this._view.element.style.zIndex = (Floatable._zIndex ++).toString()
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    this._container = container

    if (relative instanceof HTMLElement)
      this.relative = relative
    if (relative instanceof View)
      this.relative = relative.element

    this._visible = true
    this._view.element.style.visibility = "visible"

    if (!this._view.element.parentElement) {
      this._view.render()

      if (container === undefined)
        document.body.append(this._view.element)
      else
        container.addElement(this._view)
    }

    this._view.element.classList.remove("floating-hidden")

    this.pin()
    this.setupDismiss()
  }

  public hidden() {
    this._view.element.style.visibility = "hidden"
    this._view.element.classList.add("floating-hidden")

    this._view.dispatchEvent(new Event("hidden"))
  }

  public dismiss() {
    this._view.element.remove()

    this._view.dispatchEvent(new Event("hidden"))
  }

  public set dismissWhenBlur(value: boolean) {
    this._dismissWhenBlur = value
  }

}