import View from "../View.ts";

export default class Resizer extends View {

  protected target: HTMLElement

  protected verticalEdgeLine: HTMLElement

  protected horizontalEdgeLine: HTMLElement

  protected cornerLine: HTMLElement

  constructor(target: HTMLElement) {
    const element = document.createElement("div")
    super(element)

    this.target = target

    this.verticalEdgeLine = this.createVerticalEdgeLine()
    this.horizontalEdgeLine = this.createHorizontalEdgeLine()
    this.cornerLine = this.createCornerLine()

    this.setupStyles()
    this.hidden()

    document.body.append(this.element)
    this.element.append(this.verticalEdgeLine)
    this.element.append(this.horizontalEdgeLine)
    this.element.append(this.cornerLine)

    this.setupEvents()
  }

  protected createVerticalEdgeLine(): HTMLElement {
    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.width = "6px"
    element.style.height = "20%"
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
    this.element.style.position = "absolute"
    this.element.style.width = this.target.clientWidth + "px"
    this.element.style.height = this.target.clientHeight + "px"
    this.element.style.left = this.target.offsetLeft + "px"
    this.element.style.top = this.target.offsetTop + "px"
    this.element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
    this.element.style.zIndex = "1000"
  }

  protected setupEvents() {
    this.target.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.element.addEventListener("mousedown", this.onMouseDown.bind(this))
  }

  protected onMouseDown(_: MouseEvent) {
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
    this.element.style.visibility = "hidden"
  }

  protected dispatchResizeEvent() {

  }

}