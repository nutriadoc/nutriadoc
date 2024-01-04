import {className, name, onChange, style, type} from "../views.ts";
import View from "../View.ts";
import {Document} from "../../index.ts";

export default class FileInput extends View {

  protected document: Document

  protected changeHandler: any = this.onChange.bind(this)

  constructor(doc: Document) {
    const element = document.createElement("input")
    super(element)

    this.document = doc
    this.setup()
  }

  protected setup() {
    this.assignUnits(
      name("ntr-file-input"),
      className("ntr-file-input"),
      type("file"),
      style({
        display: "none",
      }),
      onChange(this.changeHandler),
    )
  }

  public renew() {
    this.remove()

    this.removeEventListener("change", this.changeHandler)
    this._element = document.createElement("input")
    this.assignId()
    this.setup()
    this.document.addElement(this)
  }

  protected onChange(_: Event) {
    this.dispatchEvent(new Event("change"))
  }
}