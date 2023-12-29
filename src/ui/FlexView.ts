import View from "./View.ts";
import IFlexView from "./IFlexView.ts";

export default class FlexView extends View implements IFlexView {

    protected _justifySelf?: string

    public constructor(element?: HTMLElement) {
      element = element ?? document.createElement("div")
      super(element)

      this.element.style.display = "flex"
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
}