import {className, name, onChange, style, type} from "../views.ts";
import View from "../View.ts";
import DocumentCommandType from "../../document/commands/DocumentCommandType.ts";

export default class FileInput extends View {

  protected changeHandler: any = this.onChange.bind(this)

  static shared: FileInput = FileInput.create()

  imageTypes: string[] = [ "jpg", "jpeg", "png", "gif", "svg", "webp", "tiff", "tif", "bmp" ]

  videoTypes: string[] = [ "mp4", "m4v", "webm", "ogv", "ogg", "aiv", "mov", "wmv", "flv" ]

  constructor() {
    const element = document.createElement("input")
    super(element)

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
  }

  public openSelect(type: DocumentCommandType) {
    const element: HTMLInputElement = this._element as HTMLInputElement
    switch (type) {
      case DocumentCommandType.SelectImage: {
        element.accept = this.imageTypes.map(i => `.${i}`).join(", ")
        break
      }
      case DocumentCommandType.SelectVideo: {
        element.accept = this.videoTypes.map(i => `.${i}`).join(",")
        break
      }
      case DocumentCommandType.SelectAttachment: {
        element.accept = "*"
        break
      }
    }

    this.element.click()
  }

  protected onChange(_: Event) {
    this.dispatchEvent(new Event("change"))
    this.renew()
  }

  public get files(): File[] {
    const ele = this._element as HTMLInputElement
    if (!ele.files) return []
    if (ele.files.length == 0) return []

    const files: File[] = []
    for (let i = 0; i < ele.files.length; i++) {
      const file = ele.files[i]
      files.push(file)
    }
    return files
  }

  static create(): FileInput {
    const input = new FileInput()
    input.addTo(document.body)
    return input
  }
}