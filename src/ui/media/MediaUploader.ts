import View from "../View.ts";
import UploadService from "../upload/service/UploadService.ts";
import NutriaDocument from "../../document/service/model/NutriaDocument.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import ProgressIndicator from "../progress_indicator/ProgressIndicator.ts";
import TaskProgressEvent from "../task/TaskProgressEvent.ts";

export default class MediaUploader  {

  protected file: KeyFile

  protected container: View

  protected mediaService: UploadService

  protected data: NutriaDocument

  protected indicator?: ProgressIndicator

  constructor(file: KeyFile, container: View, mediaService: UploadService, data: NutriaDocument) {
    this.file = file
    this.container = container
    this.mediaService = mediaService
    this.data = data
  }

  async start(): Promise<void> {

    this.indicator = new ProgressIndicator()
    this.container.add(this.indicator)

    const progressHandler = this.onProgress.bind(this)

    const task = this.mediaService.upload(this.file)
    task.addEventListener('progress', progressHandler)

    await task.start()

    task.removeEventListener('progress', progressHandler)
    this.indicator.remove()
    this.indicator = undefined
  }

  onProgress(e: Event) {
    if (!this.indicator) return

    const event = e as TaskProgressEvent

    this.indicator.percent = event.percent
  }
}