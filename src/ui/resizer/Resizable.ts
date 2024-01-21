import View from "../View.ts";
import Point from "../../core/Point.ts";
import Size from "../../core/Size.ts";
import {className} from "../views.ts";
import ResizeEvent from "./ResizeEvent.ts";
import Bounding from "../view/Bounding.ts";
import Direction from "../Direction.ts";
import KeyFile from "../../core/file/KeyFile.ts";

export default class Resizable extends View {

  protected _target: HTMLElement

  protected verticalEdgeLine: HTMLElement

  protected horizontalEdgeLine: HTMLElement

  protected resizing: boolean = false

  protected onMouseMoveHandler: any = {}

  protected onMouseDownHandler: any = {}

  protected onMouseUpHandler: any = {}

  protected clicked?: Point

  protected originalSize?: Size

  protected size?: Size

  protected resizingDirection?: Direction[]

  protected bounding: Bounding = new Bounding()

  protected resizingSize?: Size

  public queue: Size[] = []

  protected _file?: KeyFile

  constructor(file: KeyFile | undefined, target: HTMLElement, element?: HTMLDivElement) {
    element = element ?? document.createElement("div")
    super(element)

    this._file = file

    this.assignUnits(className("resizable"))

    this._target = target
    this.setupTarget(target)

    this.onMouseMoveHandler = this.onMouseMove.bind(this)
    this.onMouseDownHandler = this.onMouseDown.bind(this)
    this.onMouseUpHandler = this.onMouseUp.bind(this)

    this.verticalEdgeLine = this.createVerticalEdgeLine()
    this.horizontalEdgeLine = this.createHorizontalEdgeLine()

    this.setupStyles()
    this.hidden()

    this.setupEvents()
  }

  protected setupTarget(target: HTMLElement) {
    if (target instanceof HTMLImageElement)
      this._target.addEventListener('load', this.onImageLoad.bind(this))
    this.addNode(this._target)
  }

  protected onImageLoad(e: any) {
    this.size = {
      width: e.target.width,
      height: e.target.height,
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

    document.addEventListener("mouseup", this.onMouseUpHandler)
  }

  protected onMouseDown(e: MouseEvent) {
    const rect = this.element.getBoundingClientRect()
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
    this.hidden()
  }

  public visible() {
    this.element.append(this.verticalEdgeLine)
    this.element.append(this.horizontalEdgeLine)
  }

  public hidden() {
    if (this.resizing) return

    this.verticalEdgeLine.remove()
    this.horizontalEdgeLine.remove()
  }

  protected createVerticalEdgeLine(): HTMLElement {
    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.width = "4px"
    element.style.right = "0"
    element.style.bottom = "0px"
    element.style.top = "0"
    element.style.cursor = "ew-resize"
    element.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
    element.style.borderRadius = "4px"

    return element
  }

  protected createHorizontalEdgeLine(): HTMLElement {
    const element = document.createElement("div")

    element.style.position = "absolute"
    element.style.height = "4px"
    element.style.bottom = "0"
    element.style.left = "0"
    element.style.right = "0"
    element.style.cursor = "ns-resize"
    element.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
    element.style.borderRadius = "4px"

    return element
  }

  public get target(): Node {
    return this._target
  }

  public get file(): KeyFile | undefined {
    return this._file
  }

  static loadResizer(file: KeyFile | undefined, source: string, element?: Node) {
    const image = document.createElement("img")
    image.src = source
    image.style.objectFit = "fill"

    return new Resizable(file, image, element as HTMLDivElement)
  }

}