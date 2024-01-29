import {className, div, IUnit, View} from '@nutriadoc/classes'
import "./Button.scss"
import Ring from "../ring";

export interface ButtonProps {
  loading?: boolean
}

export default class Button extends View {

  protected _isLoading: boolean = false

  protected ring?: Ring

  constructor(props?: ButtonProps, ...units: IUnit[]) {
    super(
      document.createElement("button"),
      ...units,
      className("nutria", "button")
    )
    this.isLoading = props.loading
  }

  get isLoading() {

    return this._isLoading
  }

  set isLoading(value: boolean) {
    if (value) {
      if (!this.ring) {
        const ringView = div()
        this.ring = new Ring({
          container: ringView.render() as HTMLElement,
          size: 16,
          color: "#FFFFFF",
          borderWidth: 2,
        })
        this.ring.infinite = true
      }
      this.element.insertBefore(this.ring.container, this.element.firstChild)
    } else {
      this.ring?.container.remove()
    }
    this._isLoading = value
  }
}