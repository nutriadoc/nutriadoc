import {Size} from "../../index.ts"
import {div, id, IView, style, View} from "../index"
import Position from "./Position.ts"

export default class Floating {

  protected _relative?: HTMLElement

  protected _position?: Position

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  protected static _zIndex: number = 100

  protected _container?: IView

  protected documentClickHandler = this.onDocumentClick.bind(this)

  protected _view: IView

  protected _dismissWhenBlur: boolean = true

  public _disableAutoHide = false

  get boundary(): Size { return { width: document.body.offsetWidth, height: document.body.scrollHeight } }

  protected static root: View = this.createRoot()

  constructor(
    view: IView,
    relativePosition?: Position) {

    this._view = view
    this._position = relativePosition ?? Position.BottomLeft
  }

  // whenDomReady() {
  //   const observer = new MutationObserver((_) => {
  //     console.debug("on mutation")
  //     if (!this._visible)
  //       this._view.remove()
  //     observer.disconnect()
  //   })
  //   observer.observe(this._view.element, { childList: true, subtree: true })
  // }

  static createRoot(): View {
    const root = div(
      id("floatable-root"),
      style({
        visibility: "hidden",
      })
    )
    root.addTo(document.body)
    return root as View
  }

  public get x(): number {


    const self = this._view.element.getBoundingClientRect()
    const relative = this._relative!.getBoundingClientRect()

    let x = 0

    switch (this._position) {
      case Position.BottomCenter:
      case Position.TopCenter:
      case Position.Center: {
        if (self.width > relative.width) {
          x = relative.x - (self.width - relative.width) / 2
        } else {
          x = relative.x + (relative.width - self.width) / 2
        }
        break
      }
      case Position.BottomRight:
      case Position.RightTop: {
        x = relative.x + relative.width
        break
      }
      case Position.BottomLeft: {
        x = relative.x
        break
      }
      default: {
        throw new Error("Not implemented")
      }
    }

    if (x < 0) x = 0
    if (x + self.width > this.boundary.width) x = this.boundary.width - self.width - 10

    return x
  }

  public get y(): number {
    let y = 0

    const relative = this._relative!.getBoundingClientRect()
    const self = this._view.element.getBoundingClientRect()

    relative.y = this.ancestorsOffsetTop

    switch (this._position) {
      case Position.Center: {
        y = (this.boundary.height - self.height) / 2
        break
      }
      case Position.RightTop: {
        y = relative.y
        break
      }
      case Position.BottomCenter:
      case Position.BottomRight:
      case Position.BottomLeft: {
        y = relative.y + relative.height
        break
      }
      default: {
        throw new Error("Not implemented")
      }
    }

    if (y < 0) y = 0
    if (self.height + y > this.boundary.height) y = this.boundary.height - self.height - 10
    return y
  }

  get ancestorsOffsetTop(): number {
    return this.getAncestorsOffsetTop(this._relative)
  }

  getAncestorsOffsetTop(element?: HTMLElement) {
    return this
      .getOffsetAncestors(element ?? this._relative!)
      .reduce(
        (acc, element) => {
          acc += element.offsetTop
          return acc
        },
        0
      )
  }

  getAncestorsOffsetLeft(element?: HTMLElement) {
    return this
      .getOffsetAncestors(element ?? this._relative!)
      .reduce(
        (acc, element) => {
          acc += element.offsetLeft
          return acc
        },
        0
      )
  }

  get ancestorsOffsetLeft(): number {
    return this.getAncestorsOffsetLeft()
  }

  getOffsetAncestors(element: HTMLElement) {
    const ancestors = []
    for (; !!element;) {
      ancestors.push(element)
      element = element?.offsetParent as HTMLElement ?? undefined
    }
    return ancestors
  }

  get offsetAncestors() {
    return this.getOffsetAncestors(this._relative?.offsetParent as HTMLElement)
  }

  protected setupDismiss() {
    if (this.attachedEvent) return
    if (!this._dismissWhenBlur) return

    document.addEventListener('click', this.documentClickHandler)
  }

  public onDocumentClick(event: MouseEvent) {
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

    let x = this.x
    if (x < 10) {
      x = 10
      this._view.element.style.right = `${10}px`
    }

    this._view.element.style.left = `${x}px`
    this._view.element.style.top = `${this.y}px`
    this._view.element.style.position = "absolute"
    this._view.element.style.zIndex = (Floating._zIndex ++).toString()
  }

  public visible(relative?: HTMLElement | View | IView | undefined, container?: View | IView | HTMLElement) {
    this._container = container instanceof HTMLElement ? new View(container) : container

    if (relative instanceof HTMLElement)
      this.relative = relative
    if (relative instanceof View)
      this.relative = relative.element

    this._visible = true
    this._view.element.style.visibility = "visible"

    this._view.element.classList.remove("floating-hidden")

    this._view.render()
    this.root.add(this._view)

    this.pin()
    this.setupDismiss()
  }

  public hidden() {
    this._view.element.style.visibility = "hidden"
    this._view.element.classList.add("floating-hidden")

    this._view.remove()
    this._view.dispatchEvent(new Event("hidden"))
  }

  public dismiss() {
    this._view.remove()

    this._view.dispatchEvent(new Event("hidden"))
  }

  public set dismissWhenBlur(value: boolean) {
    this._dismissWhenBlur = value
  }

  get root(): View {
    return Floating.root
  }

}