import View from "../View.ts"
import IView from "../IView.ts"
import Position from "./Position.ts"

export default class Floating extends View implements IView {

  protected _relative?: HTMLElement

  protected _position?: Position

  protected _relativeTo: "viewport" | "element" = "viewport"

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  protected _zIndex: number = 100

  protected _container?: IView

  protected spacing: number

  constructor(relativePosition?: Position, children?: IView[], relativeTo?: "viewport" | "element", spacing?: number) {
    const element = document.createElement("div")
    super(element)

    this._relativeTo = relativeTo ?? "viewport"
    this.spacing = spacing ?? 10
    element.style.maxHeight = "70%"
    element.style.overflowY = "auto";

    this._position = relativePosition ?? Position.BottomLeft
    this._children = children ?? []

    this.onDocumentClick = this.onDocumentClick.bind(this)
  }

  public get x(): number {
    let x = 0

    const bodyRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight)
    const relativeRect = this._relative?.getBoundingClientRect()
    const selfRect = this._element.getBoundingClientRect()
    const rect = relativeRect ?? bodyRect

    switch (this._position) {
      case Position.Center: {
        x = (rect.width - selfRect.width) / 2
        break
      }
      case Position.RightBottom:
      case Position.RightCenter:
      case Position.RightTop: {
        x = rect.x + rect.width + 10
        break
      }
      case Position.BottomLeft:
      default: {
        x = rect.x
      }
    }

    return x
  }

  public get y(): number {
    let y = 0

    // cases:
    // 无相对窗口
    // 有相对窗口
    // 位置依据相对容器
    // 位置依据Position，和相对容器无关
    // 位置依据定位(x, y)，和相对容器、容器无关

    const container = this._container?.element ?? document.body
    const relativeRect = this._relative?.getBoundingClientRect()
    const rect = relativeRect ?? container.getBoundingClientRect()
    const selfRect = this._element.getBoundingClientRect()

    if (this._relativeTo == "element") {
      rect.y = this._relative?.offsetTop ?? 0
      rect.x = this._relative?.offsetLeft ?? 0
    }

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
        break
      }
      case Position.RightBottom:
      case Position.RightCenter:
      case Position.RightTop: {
        y = rect.y
        break
      }
      case Position.BottomLeft:
      default: {
        y = rect.y + rect.height + 5
      }
    }

    return y
  }

  public render(): Node | Node[] {
    this._element.classList.add('ntr-conextual-menu')
    
    // this.pin()
    this._element.style.position = "absolute"
    this._element.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.15)"
    this._element.style.backgroundColor = "white"
    this._element.style.padding = "8px 0px"
    this._element.style.borderRadius = "6px"
    this._element.style.zIndex = this._zIndex.toString()

    this.addElement(this.children)

    super.render()

    return this._element
  }

  protected setupDismiss() {
    if (this.attachedEvent) return

    document.addEventListener('click', this.onDocumentClick)
  }

  public onDocumentClick(event: MouseEvent) {
    
    const target = event.target as HTMLElement

    if (this._element.contains(target)) {
      return
    }

    if (this._visible) {
      this._visible = false
      return
    }

    document.removeEventListener('click', this.onDocumentClick)
    this.attachedEvent = false
    this.hidden()
  }

  public set relative(value: HTMLElement) {
    this._relative = value
  }

  protected pin() {

    this._element.style.left = `${this.x}px`
    this._element.style.top = `${this.y}px`
    this._element.style.zIndex = this._zIndex.toString()
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    this._container = container

    if (relative instanceof HTMLElement)
      this.relative = relative
    if (relative instanceof View)
      this.relative = relative.element

    this._visible = true
    this._element.style.visibility = "visible"

    if (!this.element.parentElement) {
      this.render()

      if (container === undefined)
        document.body.append(this.element)
      else
        container.addElement(this)
    }

    this.pin()
    this.setupDismiss()
  }

  public hidden() {
    this._element.style.visibility = "hidden"
  
  }

  public dismiss() {
    this._element.remove()
  }

  public set zIndex(index: number) {
    this._zIndex = index
  }
} 