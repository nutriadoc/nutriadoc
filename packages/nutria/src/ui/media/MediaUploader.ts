import { View } from "@nutriadoc/classes";
import NutriaDocument from "../../document/service/model/NutriaDocument.ts";
import { KeyFile} from "../../core"
import ProgressIndicator from "../progress_indicator/ProgressIndicator.ts";
import TaskProgressEvent from "../task/TaskProgressEvent.ts";
import DocumentService from "../../document/service/DocumentService.ts";
import Attachment from "../../document/service/model/Attachment.ts";

export default class MediaUploader  {

  protected file: KeyFile

  protected container: View

  protected documentService: DocumentService

  protected data: NutriaDocument

  protected indicator?: ProgressIndicator

  protected _attachment!: Attachment

  constructor(file: KeyFile, container: View, documentService: DocumentService, data: NutriaDocument) {
    this.file = file
    this.container = container
    this.documentService = documentService
    this.data = data
  }

  async start(): Promise<void> {

    this.indicator = new ProgressIndicator()
    this.container.add(this.indicator)

    const progressHandler = this.onProgress.bind(this)

    const task = this.documentService.createMedia(this.data, this.file)
    task.addEventListener('progress', progressHandler)

    await task.start()

    this._attachment = task.signTask.attachment!

    task.removeEventListener('progress', progressHandler)
    this.indicator.remove()
    this.indicator = undefined
  }

  onProgress(e: Event) {
    if (!this.indicator) return

    const event = e as TaskProgressEvent

    this.indicator.percent = event.percent
  }

  get attachment(): Attachment {
    return this._attachment
  }
}