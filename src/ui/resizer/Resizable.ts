import View from "../View.ts";
import Point from "../../core/Point.ts";
import Size from "../../core/Size.ts";
import {className} from "../views.ts";
import ResizeEvent from "./ResizeEvent.ts";

export default class Resizable extends View {

  protected _target: HTMLElement

  protected verticalEdgeLine: HTMLElement

  protected horizontalEdgeLine: HTMLElement

  protected cornerLine: HTMLElement

  protected resizing: boolean = false

  protected onMouseMoveHandler: any = {}

  protected onMouseDownHandler: any = {}

  protected onMouseUpHandler: any = {}

  protected clicked?: Point

  protected size?: Size

  protected previousResize?: Size

  constructor(target: HTMLElement, self?: HTMLDivElement) {
    self = self ?? document.createElement("div")
    super(self)

    this.assignUnits(className("resizer"))
    this.element.setAttribute("unselectable", "on")
    this.element.classList.add("no-select")
    target.setAttribute("unselectable", "on")
    target.classList.add("no-select")

    this.onMouseMoveHandler = this.onMouseMove.bind(this)
    this.onMouseDownHandler = this.onMouseDown.bind(this)
    this.onMouseUpHandler = this.onMouseUp.bind(this)

    // this.element.addEventListener("selectstart", (e) => {
    //   e.preventDefault()
    // })

    this._target = target
    this._target.addEventListener('load', this.onImageLoad.bind(this))
    this._target.addEventListener("selectstart", (e) => {
      e.preventDefault()
    })
    this.addNode(this._target)

    this.verticalEdgeLine = this.createVerticalEdgeLine()
    this.horizontalEdgeLine = this.createHorizontalEdgeLine()
    this.cornerLine = this.createCornerLine()

    this.setupStyles()
    this.hidden()

    // document.body.append(this.element)
    // this.element.append(this.verticalEdgeLine)
    // this.element.append(this.horizontalEdgeLine)
    // this.element.append(this.cornerLine)

    this.setupEvents()
  }

  protected onImageLoad(e: any) {
    console.debug('on image load', e)
    this.element.style.width = e.target.width + "px"
    this.element.style.height = e.target.height + "px"

    this.size = {
      width: e.target.width,
      height: e.target.height,
    }
  }

  protected createVerticalEdgeLine(): HTMLElement {
    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.width = "6px"
    element.style.height = "60px"
    element.style.right = "0"
    element.style.top = "0"
    element.style.cursor = "ew-resize"
    element.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
    element.style.borderRadius = "4px"

    return element
  }

  protected createHorizontalEdgeLine(): HTMLElement {
    const element = document.createElement("div")

    element.style.position = "absolute"
    element.style.width = "20%"
    element.style.height = "6px"
    element.style.bottom = "0"
    element.style.cursor = "ns-resize"
    element.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
    element.style.borderRadius = "4px"

    return element
  }

  protected createCornerLine(): HTMLElement {
    const element = document.createElement("div")

    element.style.position = "absolute"
    element.style.width = "10px"
    element.style.height = "10px"
    element.style.right = "0"
    element.style.bottom = "0"
    element.style.cursor = "nwse-resize"
    element.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
    element.style.borderRadius = "10px"


    return element
  }

  protected setupStyles() {
    this.element.style.position = "relative"
    // this.element.style.width = this.target.clientWidth + "px"
    // this.element.style.height = this.target.clientHeight + "px"
    // this.element.style.left = this.target.offsetLeft + "px"
    // this.element.style.top = this.target.offsetTop + "px"
    // this.element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
    // this.element.style.zIndex = "1000"
  }

  protected setupEvents() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    // document.addEventListener("mousedown", this.onMouseDownHandler)
    // document.addEventListener("mouseup", this.onMouseUpHandler)
    // document.addEventListener("mousemove", this.onMouseMoveHandler)
  }

  protected onMouseDown(e: MouseEvent) {
    this.resizing = true
    this.clicked = { x: e.clientX, y: e.clientY }
    console.debug('on mouse down', this.resizing, this.clicked)
  }

  protected onMouseUp(_: MouseEvent) {
    console.debug('on mouse up')
    this.resizing = false
    this.clicked = undefined
    this.dispatchEvent(new ResizeEvent("resize_width", this.previousResize!.width, this.previousResize!.height))
  }

  protected onMouseMove(e: MouseEvent) {
    if (!this.resizing) return

    let x = this.clicked!.x - e.clientX
    let resizedWith = this.size!.width - x

    // debugger
    // console.debug('on mouse move', resizedWith, e.offsetX, e.offsetY, e.screenX)
    this.element.style.width = resizedWith + "px"
    this._target.style.width = resizedWith + "px"

    console.debug('width', {x, resizedWith, clientX: e.clientX, clicked: this.clicked})

    this.previousResize = { width: resizedWith, height: 0 }
    // this.target.style.height = e.offsetY + "px"

  }

  protected onMouseEnter() {
    this.setupStyles()
    this.visible()

    const position = (this.element.clientHeight - this.verticalEdgeLine.clientHeight) / 2
    this.verticalEdgeLine.style.top = position + "px"

    const position2 = (this.element.clientWidth - this.horizontalEdgeLine.clientWidth) / 2
    this.horizontalEdgeLine.style.left = position2 + "px"
  }

  protected onMouseLeave() {

    this.setupStyles()
    this.hidden()
  }

  public visible() {
    this.element.style.visibility = "visible"
  }

  public hidden() {
    // this.element.style.visibility = "hidden"
  }

  protected dispatchResizeEvent() {

  }

  public get target(): Node {
    return this._target
  }

  static loadResizer(source: string, element?: Node) {
    const image = document.createElement("img")
    image.src = source
    image.style.objectFit = "contain"

    return new Resizable(image, element as HTMLDivElement)
  }

}