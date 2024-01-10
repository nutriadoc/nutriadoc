import MessageView from "../MessageBox/MessageView.ts";
import Message from "../MessageBox/Message.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import UploadService from "./service/UploadService.ts";
import MockUploadService from "./MockUploadService.ts";
import { default as DefaultAvatar } from "./DefaultAvatar.base64?raw"
import {className, div, image, onClick, source, text} from "../views.ts";
import IView from "../IView.ts";
import Progress from "./Progress.ts";
import i18n from "../../i18n/index.ts";
import TaskProgressEvent from "../task/TaskProgressEvent.ts";
import bytes from "bytes"

const t = i18n.t

export default class UploadMessageView extends MessageView {

  protected file: KeyFile

  protected uploadService: UploadService = new MockUploadService()

  protected progress!: Progress

  protected constructor(file: KeyFile) {
    super()
    this.file = file

    this.setupUI()
    this.start()
  }

  protected setupUI() {
    this.progress = new Progress(onClick(this.onProgressCancel.bind(this)))
    this.assignUnits(
      className("upload-message-view"),
      div(
        className("avatar"),
        image(source(DefaultAvatar))
      ),
      div(
        className("body"),
        div(className("title"), text(`${t('notification.upload.uploads')} - ${this.file.file.name}`)),
        this.progress,
        div(
          className("file-info"),
          this.fileItem("fileName", this.file.file.name),
          this.fileItem("fileSize", bytes(this.file.file.size)),
          this.fileItem("fileType", this.file.file.type),
        )
      )
    )
  }

  fileItem(name: string, value: string): IView {
    return div(
      className("file-item"),
      div(
        className("label"),
        text(`${t(`file.${name}`)}`)
      ),
      div(
        className("value"),
        text(`${value}`)
      ),
    )
  }

  start() {
    const task = this.uploadService.upload(this.file)
    task.addEventListener("progress", this.onProgress.bind(this))
    task.addEventListener("success", this.onSuccess.bind(this), { once: true })
  }

  protected onProgress(event: Event) {
    const e = event as TaskProgressEvent

    this.progress.update({
      loaded: e.loaded,
      total: e.total,
      cancelable: false
    })
  }

  protected onSuccess() {
    this.dispatchEvent(new Event("success"))
  }

  protected onProgressCancel(): void {
    console.debug("cancel")
  }

  update(_: Message): void {
    throw new Error("Method not implemented.");
  }

  remove() {

  }

  static createUploadMessageView(key: KeyFile): UploadMessageView {


    return new UploadMessageView(key)
  }
}