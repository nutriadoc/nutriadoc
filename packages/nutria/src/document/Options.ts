import Option from "../editor/Option.ts";

export default class Options {

  protected _option: Option

  public constructor(option: Option) {
    this._option = option

    this.loadByContainer()
  }

  protected loadByContainer() {
    const container = this._option.container?.element
    if (!container) return

    this._option.containerHTML = container.innerHTML
    container.innerHTML = ""
  }

  public toOption() {
    return this._option
  }

  static setup(option?: Option): Option {
    return new Options(option ?? {}).toOption()
  }
}