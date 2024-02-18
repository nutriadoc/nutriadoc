import SignFileTask from "./SignFileTask.ts";
import UploadFileTask from "./UploadFileTask.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import {Task, TaskProgressEvent, KeyFile} from "@nutriadoc/classes";

export default class CreateMediaTask extends Task {

  protected uploadProgressHandler = this.onUploadProgress.bind(this)

  protected _signTask: SignFileTask

  constructor(apiServer: string, document: NutriaDocument, file: KeyFile) {
    const uploadTask = new UploadFileTask(file)
    const signTask = new SignFileTask(apiServer, document, file)

    super([
      signTask,
      uploadTask,
    ])

    this._signTask = signTask
    uploadTask.addEventListener('progress', this.uploadProgressHandler)
  }

  protected onUploadProgress(e: Event) {
    const event = e as TaskProgressEvent
    this.progress(event.loaded, event.total)
  }

  get signTask(): SignFileTask {
    return this._signTask
  }
}