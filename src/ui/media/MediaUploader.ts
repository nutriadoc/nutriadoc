import View from "../View.ts";
import NutriaDocument from "../../document/service/model/NutriaDocument.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import ProgressIndicator from "../progress_indicator/ProgressIndicator.ts";
import TaskProgressEvent from "../task/TaskProgressEvent.ts";
import DocumentService from "../../document/service/DocumentService.ts";
import SignMedia from "../../document/service/model/SignMedia.ts";

export default class MediaUploader  {

  protected file: KeyFile

  protected container: View

  protected documentService: DocumentService

  protected data: NutriaDocument

  protected indicator?: ProgressIndicator

  protected _sign!: SignMedia

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

    this._sign = task.signTask.url!

    task.removeEventListener('progress', progressHandler)
    this.indicator.remove()
    this.indicator = undefined
  }

  onProgress(e: Event) {
    if (!this.indicator) return

    const event = e as TaskProgressEvent

    this.indicator.percent = event.percent
  }

  get sign(): SignMedia {
    return this._sign
  }
}