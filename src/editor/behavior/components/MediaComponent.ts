import KeyPool from "../../../core/KeyPool"
import KeyFile from "../../../core/file/KeyFile"
import Document from "../../../document/Document"
import NutriaDocument from "../../../document/service/model/NutriaDocument"
import MediaUploader from "../../../ui/media/MediaUploader"
import Resizable from "../../../ui/resizer/Resizable"
import ResizeEvent from "../../../ui/resizer/ResizeEvent"
import QuillDocument from "../../quilljs/QuillDocument"

export default class MediaComponent {

  protected blot: any

  protected resizer!: Resizable

  protected resizeHandler = this.onResize.bind(this)

  constructor(blot: any) {
    this.blot = blot

    this.setupResizer()
    this.setupUploader()
  }

  protected setupResizer() {
    let target!: HTMLElement
    if (this.blot.statics.blotName == 'image') {
      target = this.createImage()
    } else if (this.blot.statics.blotName == 'video') {
      target = this.createVideo()
    }

    const view = Resizable.loadResizer(target, this.blot.domNode)
    this.resizer = view
    this.resizer.addEventListener('resize', this.resizeHandler)
  }

  protected createImage() {

    const image = document.createElement("img")
    image.src = this.src
    image.style.objectFit = "fill"

    image.addEventListener(
      "load",
      this.onImageLoaded.bind(this),
      { once: true }
    )

    return image
  }

  protected createVideo() {
    const video = document.createElement("video")
    video.src = this.src
    video.controls = true
    video.style.objectFit = "fill"

    video.addEventListener(
      'loadedmetadata',
      this.onVideoLoad.bind(this),
      { once: true }
    )

    return video
  }

  protected onVideoLoad(e: Event) {
    const video = e.target as HTMLVideoElement
    this.blot.format("width", video.videoWidth.toString())
    this.blot.format("height", video.videoHeight.toString())
  }

  protected onResize(e: Event) {
    const event = e as ResizeEvent
    console.debug('on resize', e)

    this.blot.format("width", event.width)
    this.blot.format("height", event.height)
  }

  protected async setupUploader(): Promise<void> {
    const pool = KeyPool.shared
    const file = pool.get(this.src as String) as KeyFile;

    if (!this.src.startsWith("blob:")) return

    const uploader = new MediaUploader(
      file,
      this.resizer,
      this.document.services.documentService(),
      this.document.data as NutriaDocument
    )

    await uploader.start()

    this.document.data?.addAttachment(uploader.attachment)

    this.blot.format("src", uploader.attachment.url.read)
    this.blot.format("id", uploader.attachment.id)
  }

  resizeByBlot(_: string, __: string) {

  }

  onImageLoaded(e: Event) {
    
    const image = e.target as HTMLImageElement

    this.blot.format("width", image.width.toString())
    this.blot.format("height", image.height.toString())
  }

  protected get document(): Document {
    return QuillDocument.getDocumentByScroll(this.blot.scroll)
  }

  protected get src(): string {
    return this.blot.domNode.getAttribute("src")
  }
}