import CreateObjectCredentialTask from "./CreateObjectCredentialTask.ts";
import UploadObjectTask from "./UploadObjectTask.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import {Task, TaskProgressEvent, KeyFile} from "@nutriadoc/classes";
import {DocumentService} from "../index.ts";

export default class CreateAttachmentTask extends Task {

  protected uploadProgressHandler = this.onUploadProgress.bind(this)

  protected _createObjectCredentialTask: CreateObjectCredentialTask

  constructor(service: DocumentService, document: NutriaDocument, file: KeyFile) {
    const uploadTask = new UploadObjectTask(file)
    const createObjectCredentialTask = new CreateObjectCredentialTask(service, document, file)

    super([
      createObjectCredentialTask,
      uploadTask,
    ])

    this._createObjectCredentialTask = createObjectCredentialTask
    uploadTask.addEventListener('progress', this.uploadProgressHandler)
  }

  protected onUploadProgress(e: Event) {
    const event = e as TaskProgressEvent
    this.progress(event.loaded, event.total)
  }

  get createObjectCredentialTask(): CreateObjectCredentialTask {
    return this._createObjectCredentialTask
  }
}