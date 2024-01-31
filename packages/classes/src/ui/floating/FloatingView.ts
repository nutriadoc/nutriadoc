import { IView, View, IUnit } from "../index"
import Position from "./Position.ts"
import Floating from "./Floating.ts";

export default class FloatingView extends View implements IView {

  protected floating: Floating

  constructor(relativePosition?: Position, ...units: IUnit[]) {
    super(undefined, ...units)
    this.floating = new Floating(this, relativePosition)
  }

  public render(): Node | Node[] {
    if (this._rendered) return super.render()
    this._rendered = true

    this._element.classList.add('ntr-floating')
    this.addElement(this.children)


    return super.render()
  }

  public set relative(value: HTMLElement) {
    this.floating.relative = value
  }

  public visible(relative?: HTMLElement | View | IView | undefined, container?: View | IView | HTMLElement) {
    this.floating.visible(relative, container)
  }

  public hidden() {
    this.floating.hidden()
  }

  public dismiss() {
    this.floating.dismiss()
  }

  disableAutoHide() {
    this.floating.disableAutoHide()
  }

  enableAutoHide() {
    this.floating.enableAutoHide()
  }
} 