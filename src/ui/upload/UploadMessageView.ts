import MessageView from "../MessageBox/MessageView.ts";
import Message from "../MessageBox/Message.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import FileService from "../../core/file/FileService.ts";
import UploadService from "./UploadService.ts";
import MockUploadService from "./MockUploadService.ts";
import { default as DefaultAvatar } from "./DefaultAvatar.base64?raw"
import {className, div, image, source, text} from "../views.ts";
import IView from "../IView.ts";
import Progress from "./Progress.ts";
import i18n from "../../i18n/index.ts";

const t = i18n.t

export default class UploadMessageView extends MessageView {

  protected file: KeyFile

  protected uploadService: UploadService = new MockUploadService()


  protected constructor(file: KeyFile) {
    super()
    this.file = file

    this.setupUI()
    this.start()
  }

  protected setupUI() {
    this.assignUnits(
      className("upload-message-view"),
      div(
        className("avatar"),
        image(source(DefaultAvatar))
      ),
      div(
        className("body"),
        div(className("title"), text(`${t('notification.upload.uploads')} - ${this.file.file.name}`)),
        new Progress()
      )
    )
  }

  static fileItem(name: string): IView {
    return div(
      className("file-item"),
      div(className(`${name}`)),
      div(className("value")),
    )
  }

  start() {
    const task = this.uploadService.upload(this.file)
    task.addEventListener("progress", this.onProgress.bind(this))
  }

  protected onProgress(_: Event) {
    throw new Error("Method not implemented.");

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