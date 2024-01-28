import { View, IFlexView, className, IUnit } from "./index"

export default class FlexView extends View implements IFlexView {

    protected _justifySelf?: string

    public constructor(element?: HTMLElement, ...units: IUnit[]) {
      element = element ?? document.createElement("div")
      super(element, ...units, className("flex"))
    }

    public get justifySelf(): string {
      return this._justifySelf || ""
    }

    public set justifySelf(value: string) {
      this._justifySelf = value
      this.element.style.justifySelf = value
    }

    public get flex(): string {
      return this.element.style.flex
    }

    public set flex(value: string) {
      this.element.style.flex = value
    }

    hide() {
      super.hide();
      this.removeClass("flex")
    }

    visible() {
      super.visible();
      this.addClass("flex")
    }
}