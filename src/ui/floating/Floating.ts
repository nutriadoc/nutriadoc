import View from "../View.ts"
import IView from "../IView.ts"
import FloatingPosition from "./FloatingPosition.ts"

export default class Floating extends View implements IView {

  protected _relative?: HTMLElement

  protected _relativePosition?: FloatingPosition

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  constructor(relative?: HTMLElement, relativePosition?: FloatingPosition, children?: IView[]) {
    const element = document.createElement("div")
    super(element)

    this._relative = relative
    this._relativePosition = relativePosition ?? FloatingPosition.BottomLeft
    this._children = children ?? []

    this.onDocumentClick = this.onDocumentClick.bind(this)
  }

  public get x(): number {
    let x = 0
    if (!this._relative)
      return 0

    const rect = this._relative.getBoundingClientRect()

    switch (this._relativePosition) {
      case FloatingPosition.BottomLeft:
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

    switch (this._relativePosition) {
      case FloatingPosition.BottomLeft:
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
    this._element.style.zIndex = "100"

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

  protected pin() {
    this._element.style.left = `${this.x}px`
    this._element.style.top = `${this.y}px`
  }

  public visible() {
    this._visible = true
    this._element.style.display = "block"
    this.pin()

    this.setupDismiss()
  }

  public hidden() {
    this._element.style.display = "none"
  
  }
} 