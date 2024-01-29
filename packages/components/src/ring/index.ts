import Option from "./Option"
import "./ring.css"

export default class Ring {

  protected svg: SVGSVGElement

  protected circle: SVGCircleElement

  protected _container: HTMLElement

  protected size: number

  protected borderWidth: number

  protected color: string

  protected _progress: number

  constructor(option: Option) {
    this.size = option.size ?? 30
    this.borderWidth = option.borderWidth ?? 4
    this.color = option.color ?? "rgb(156 163 175)"

    this.setupSvg()
    this.setupCircle()
    this.setupContainer(option.container)

    this.svg.append(this.circle)
    this._container.append(this.svg)

    this.progress = 10
  }

  setupSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("ring")
    this.svg = svg
  }

  setupCircle() {
    const circle = this.circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    )
    circle.classList.add("circle")
    circle.style.setProperty("--ring-color", this.color)
    circle.setAttribute("stroke", "var(--ring-color)")
    circle.setAttribute("stroke-width", `${this.borderWidth}`)
    circle.setAttribute("fill", "none")
    circle.setAttribute("r", `${this.size / 2 - 2}`)
    circle.setAttribute("cx", `${this.size / 2}`)
    circle.setAttribute("cy", `${this.size / 2}`)

    circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`
    circle.style.strokeDashoffset = `${this.circumference}`
  }

  setupContainer(name: string | HTMLElement) {
    let container: HTMLElement
    if (typeof name === "string") {
      container = document.querySelector(name)
    } else {
      container = name
    }

    container.style.setProperty("--ring-size", `${this.size}px`)
    this._container = container
  }

  protected get circumference() {
    const radius = this.circle.r.baseVal.value
    return radius * 2 * Math.PI
  }

  set infinite(value: boolean) {
    if (value) {
      this.progress = 75
      this.circle.classList.remove("circle")
      this.circle.classList.add("infinite")
    } else {
      this.circle.classList.remove("infinite")
      this.circle.classList.add("circle")
    }
  }

  set progress(value: number) {
    const offset = this.circumference - value / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset.toString();
  }

  get progress() {
    return this._progress
  }

  get container() {
    return this._container
  }
}