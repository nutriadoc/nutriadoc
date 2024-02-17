import {className, image, IView, Mime, source, style, View} from "@nutriadoc/classes"
import {ProgressIndicator} from "../progress_indicator";
import IAttachmentState from "./IAttachmentState";


export default class AttachmentView extends View implements IAttachmentState {

  protected _file: File

  indicator?: ProgressIndicator

  constructor(file: File) {
    super(
      undefined,
      className("attachment-view"),
      style({
        position: "relative",
        display: "inline",
      })
    )
    this._file = file

    this.createPreview()
  }

  createPreview() {
    if (this.isImage(this._file.type)) {
      this.add(this.createImage())
    }
  }

  protected createImage(): IView {
    // image.addEventListener(
    //   "load",
    //   this.onImageLoaded.bind(this),
    //   { once: true }
    // )

    return image(
      source(URL.createObjectURL((this._file))),
      style({
        objectFit: "fill"
      })
    )
  }

  setupUpload() {
    if (!!this.indicator) return

    this.indicator = new ProgressIndicator()
    this.add(this.indicator)
  }

  progress(loaded: number): void {
    this.setupUpload()

    this.indicator!.percent = loaded
  }

  completed(): void {
    this.indicator.remove()
    this.indicator = undefined
  }

  error(_: Error): void {

  }

  isImage(type: string) {
    return Mime.imageTypes.includes(type)
  }

  isVideo(type: string) {

  }
}