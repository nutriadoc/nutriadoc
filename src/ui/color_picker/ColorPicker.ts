import ColorBlock from "./ColorBlock.ts"
import View from "../View.ts"
import "./ColorPicker.scss"


export default class ColorPicker extends View {

  public constructor() {
    const element = document.createElement("div")
    super(element)

    element.classList.add("color-picker")

    element.append(ColorBlock.createOne(this))
  }
}