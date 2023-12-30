import View from "../View.ts"
import IView from "../IView.ts"
import Position from "./Position.ts"

export default class Floating extends View implements IView {

  protected _relative?: HTMLElement

  protected _position?: Position

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  protected _zIndex: number = 100

  constructor(relativePosition?: Position, children?: IView[]) {
    const element = document.createElement("div")
    super(element)

    element.style.maxHeight = "70%"
    element.style.overflowY = "auto";

    this._position = relativePosition ?? Position.BottomLeft
    this._children = children ?? []

    this.onDocumentClick = this.onDocumentClick.bind(this)
  }

  public get x(): number {
    let x = 0
    if (!this._relative)
      return 0

    const rect = this._relative.getBoundingClientRect()

    switch (this._position) {
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
    if (!this._relative)
      return 0

    const rect = this._relative.getBoundingClientRect()

    switch (this._position) {
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
    
    this.pin()
    this._element.style.position = "absolute"
    this._element.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.15)"
    this._element.style.backgroundColor = "white"
    this._element.style.padding = "8px 0px"
    this._element.style.borderRadius = "6px"
    this._element.style.zIndex = this._zIndex.toString()

    this.addElement(this.children)

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

  public visible(relative?: HTMLElement | View | undefined) {
    this._visible = true
    this._element.style.visibility = "visible"

    if (relative instanceof HTMLElement)
      this.relative = relative
    if (relative instanceof View)
      this.relative = relative.element

    this.pin()

    this.setupDismiss()
  }

  public hidden() {
    this._element.style.visibility = "hidden"
  
  }

  public set zIndex(index: number) {
    this._zIndex = index
  }
} 