import {View, className, Direction, Bounding, Point, Size, div} from "@nutriadoc/classes"
import ResizeEvent from "./ResizeEvent"
import "./Resizer.scss"

export default class Resizer extends View {

  protected _target: HTMLElement

  protected verticalEdgeLine: HTMLElement

  protected horizontalEdgeLine: HTMLElement

  protected resizing: boolean = false

  protected onMouseMoveHandler: any = {}

  protected onMouseDownHandler: any = {}

  protected onMouseUpHandler: any = {}

  protected clickHandler = this.onClick.bind(this)

  protected clicked?: Point

  protected originalSize?: Size

  protected size?: Size

  protected resizingDirection?: Direction[]

  protected bounding: Bounding = new Bounding()

  protected resizingSize?: Size

  public queue: Size[] = []

  protected border: HTMLElement

  protected isActive: boolean = false

  constructor(target: HTMLElement, element?: HTMLDivElement) {
    element = element ?? document.createElement("div")
    super(element)


    this.assignUnits(className("resizable"))

    this._target = target

    this.addNode(this._target)

    this.onMouseMoveHandler = this.onMouseMove.bind(this)
    this.onMouseDownHandler = this.onMouseDown.bind(this)
    this.onMouseUpHandler = this.onMouseUp.bind(this)

    this.border = this.setupBorder() as HTMLElement

    this.setupStyles()
    this.hidden()

    this.setupEvents()
  }

  protected onElementLoad(width: number, height: number) {
    this.size = {
      width,
      height,
    }

    this.originalSize = { ... this.size }
    this.resizeElements(this.size.width, this.size.height)
    this.queue.forEach(size => this.resize(size.width, size.height))
    this.queue = []
  }

  protected setupStyles() {
    this.element.style.position = "relative"
    this.element.style.display = "inline-block"
  }

  protected setupEvents() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.element.addEventListener("mousedown", this.onMouseDownHandler)
    this.element.addEventListener("click", this.clickHandler)

    document.addEventListener("mouseup", this.onMouseUpHandler)
  }

  protected onClick() {
    this.isActive = true

    this.visible()
  }

  protected onMouseDown(e: MouseEvent) {
    const rect = this.element.getBoundingClientRect()

    this.onElementLoad(rect.width, rect.height)

    const mouse: Point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    const directions = this.bounding.isReachedTheEdge(mouse, rect)
    if (!directions) return

    document.addEventListener("mousemove", this.onMouseMoveHandler)

    this.resizingDirection = directions

    this.resizing = true
    this.clicked = { x: e.clientX, y: e.clientY }
  }

  protected onMouseUp(_: MouseEvent) {
    if (!this.resizing) return

    this.resizing = false
    this.clicked = undefined

    this.verticalEdgeLine.remove()
    this.horizontalEdgeLine.remove()

    document.removeEventListener('mousemove', this.onMouseMoveHandler)
    this.size = {...this.resizingSize!}

    if (!!this.size)
      this.dispatchEvent(new ResizeEvent("resize", this.size!.width, this.size!.height))
  }

  protected onMouseMove(e: MouseEvent) {
    if (!this.resizing) return

    const x = this.clicked!.x - e.clientX
    const y = this.clicked!.y - e.clientY
    const size: Size = {...this.size! }
    const r = size.width / size.height

    let width: number = 0, height: number = 0

    if (this.resizingDirection?.includes(Direction.Left) || this.resizingDirection?.includes(Direction.Right)) {
      width = size.width - x
      height = width / r
    }

    if (this.resizingDirection?.includes(Direction.Up) || this.resizingDirection?.includes(Direction.Down)) {
      height = size.height - y
      width = height * r
    }
    
    this.resizingSize = { width, height }
    console.debug('resizing', this.resizingSize)
    this.resizeElements(width, height)
  }

  public resizeElements(width: number, height: number) {
    this.element.style.width = this._target.style.width = width + "px"
    this.element.style.height = this._target.style.height = height + "px"
  }

  public resize(width?: number, height?: number) {

    if (width === undefined && height ===undefined) return
    if (isNaN(width!) && isNaN(height!)) return

    width = width!
    height = height!

    if (!this.originalSize) {
      this.queue.push({ width: width ?? -1, height: height ?? -1 })
      return
    }

    let nw: number = -1, nh: number = -1
    let r = this.originalSize.width / this.originalSize.height

    if (!height) {
      nw = width
      nh = nw / r
    }

    if (!width) {
      nh = height
      nw = nh * r
    }

    this.size = { width: nw, height: nh }

    this.resizeElements(nw, nh)
  }

  protected onMouseEnter() {
    this.visible()
  }

  protected onMouseLeave() {
    if (this.isActive) return
    this.hidden()
  }

  public visible() {
    this.element.append(this.border)
  }

  public hidden() {
    if (this.resizing) return

    this.border.remove()
  }

  protected setupBorder() {
    const border = div(className("border"))
    const element = border.renderNode()


    border.add(div(className("handle", "handle-top-left")))
    border.add(div(className("handle", "handle-top-right")))
    border.add(div(className("handle", "handle-bottom-left")))
    border.add(div(className("handle", "handle-bottom-right")))

    return element
  }


  public get target(): Node {
    return this._target
  }


  static from(target: HTMLElement, element?: Node) {

    return new Resizer(target, element as HTMLDivElement)
  }

}