import {One} from "./Colors.ts"
import ColorPicker from "./ColorPicker.ts"
import ActivationView from "../toolbar/main/items/ActivationView.ts";

export default class ColorBlock extends ActivationView {

  protected colorPicker: ColorPicker

  protected color: string

  constructor(color: string, picker: ColorPicker) {
    const element = document.createElement("div")
    super(element, "#000")

    this.color = color
    this.colorPicker = picker

    element.classList.add("color-block")
    element.style.backgroundColor = color
    this.element.style.border = `2px solid ${color}`
  }

  protected onMouseEnter() {
    this.element.style.border = "2px solid #000000"
  }

  protected onMouseLeave() {
    this.element.style.border = `2px solid ${this.color}`
  }

  static createOne(picker: ColorPicker) {
    const columns = One.map(color => {
      const row: HTMLElement = document.createElement("div")
      row.classList.add("color-column")

      color
        .map(clr => new ColorBlock(clr, picker))
        .forEach(color => {
          color.addTo(row)
        })
      return row
    })

    const one = document.createElement("div")
    one.classList.add("color-one")
    columns.forEach(column => {
      one.appendChild(column)
    })

    return one
  }
}