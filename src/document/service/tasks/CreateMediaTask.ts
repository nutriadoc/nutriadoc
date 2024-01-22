import Task from "../../../ui/task/Task.ts"
import SignFileTask from "./SignFileTask.ts";
import UploadFileTask from "./UploadFileTask.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import KeyFile from "../../../core/file/KeyFile.ts";
import TaskProgressEvent from "../../../ui/task/TaskProgressEvent.ts";

export default class CreateMediaTask extends Task {

  protected uploadProgressHandler = this.onUploadProgress.bind(this)

  constructor(document: NutriaDocument, file: KeyFile) {
    const uploadTask = new UploadFileTask(file)
    super([
      new SignFileTask(document, file),
      uploadTask,
    ])

    uploadTask.addEventListener('progress', this.uploadProgressHandler)
  }

  protected onUploadProgress(e: Event) {
    const event = e as TaskProgressEvent
    this.progress(event.loaded, event.total)
  }
}