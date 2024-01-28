import Task from "../../../ui/task/Task.ts"
import SignFileTask from "./SignFileTask.ts";
import UploadFileTask from "./UploadFileTask.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import { KeyFile } from "@nutriadoc/classes"
import TaskProgressEvent from "../../../ui/task/TaskProgressEvent.ts";

export default class CreateMediaTask extends Task {

  protected uploadProgressHandler = this.onUploadProgress.bind(this)

  protected _signTask: SignFileTask

  constructor(document: NutriaDocument, file: KeyFile) {
    const uploadTask = new UploadFileTask(file)
    const signTask = new SignFileTask(document, file)

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