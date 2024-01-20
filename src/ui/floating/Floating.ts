import View from "../View.ts"
import IView from "../IView.ts"
import Position from "./Position.ts"
import Floatable from "./Floatable.ts";

export default class Floating extends View implements IView {

  protected floatable: Floatable

  constructor(
    relativePosition?: Position,
    children?: IView[],
    relativeTo?: "viewport" | "element",
    spacing?: number,
    element?: HTMLElement) {
    super(element)

    this.floatable = new Floatable(this, relativePosition, relativeTo, spacing)

    this._children = children ?? []
  }

  public render(): Node | Node[] {
    if (this._rendered) return super.render()
    this._rendered = true

    this._element.classList.add('ntr-floating')
    this._element.style.zIndex = "100"
    this.addElement(this.children)


    return super.render()
  }

  public set relative(value: HTMLElement) {
    this.floatable.relative = value
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    this.floatable.visible(relative, container)
  }

  public hidden() {
    this.floatable.hidden()
  }

  public dismiss() {
    this.floatable.dismiss()
  }

  disableAutoHide() {
    this.floatable.disableAutoHide()
  }

  enableAutoHide() {
    this.floatable.enableAutoHide()
  }

  public set zIndex(value: number) {
    this.floatable.zIndex = value
  }
} 