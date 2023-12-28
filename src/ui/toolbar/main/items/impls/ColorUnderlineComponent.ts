import View from "../../../../View.ts";

export default class ColorItem extends View {

  protected _color?: string = "#000"

  public constructor(color?: string | undefined) {
    const element = document.createElement("div")
    super(element)

    element.classList.add("color-line-component")

    this.color = color
  }

  public set color(value: string | undefined) {
    this._color = value
    this.element.style.backgroundColor = value ?? "none"
  }

  public get color(): string | undefined {
    return this._color
  }
}