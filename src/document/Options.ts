import Option from "../editor/Option.ts";

export default class Options {

  protected _option: Option

  public constructor(option: Option) {
    this._option = option

    this.loadByContainer()
  }

  protected loadByContainer() {
    const container = this._option.container?.element
    if (!container) throw new Error("Container not found")

    const html = container.innerHTML
    if (!this._option.html)
      this._option.html = html

    container.innerHTML = ""
  }

  public toOption() {
    return this._option
  }

  static setup(option?: Option): Option {
    return new Options(option ?? {}).toOption()
  }
}