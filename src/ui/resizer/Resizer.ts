import View from "../View.ts";

export default class Resizer extends View {

  protected targets: HTMLElement[] = []

  constructor(key: string) {
    const element = document.createElement("div")
    super(element)
    this._key = key
  }

  protected dispatchResizeEvent() {

  }

}