import KeyPool from "../../../core/KeyPool"
import KeyFile from "../../../core/file/KeyFile"
import Document from "../../../document/Document"
import NutriaDocument from "../../../document/service/model/NutriaDocument"
import MediaUploader from "../../../ui/media/MediaUploader"
import Resizable from "../../../ui/resizer/Resizable"
import ResizeEvent from "../../../ui/resizer/ResizeEvent"
import QuillDocument from "../../quilljs/QuillDocument"
import View from "../../../ui/View.ts";
import {div, style} from "../../../ui/views.ts";

export default class MediaComponent {

  protected blot: any

  protected resizer!: View

  protected resizeHandler = this.onResize.bind(this)

  constructor(blot: any) {
    this.blot = blot

    this.setupResizer()
    this.setupUploader()
  }

  protected setupResizer() {

    let target!: HTMLElement
    if (this.blot.name == 'image') {
      target = this.createImage()
    } else if (this.blot.name == 'video') {
      target = this.createVideo()
    } else {
      this.resizer = this.createAttachment()
      return
    }

    this.resizer = Resizable.loadResizer(target, this.blot.domNode)
    this.resizer.addEventListener('resize', this.resizeHandler)
  }

  protected createAttachment(): View {
    this.blot.node.style.position = "relative"

    const styles = style({
      position: "absolute",
      bottom: "-5px",
      left: 0,
      right: 0,
      top: 0,
      width: this.blot.node.offsetWidth
    })

    const view = div(
      styles,
    ) as View

    view.addTo(this.blot.node)

    return view
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
    if (this.blot.name == 'attachment') this.resizer.remove()

    this.document.data?.addAttachment(uploader.attachment)

    this.blot.format("src", uploader.attachment.url.read)
    this.blot.format("attachment", uploader.attachment.id)
  }

  resizeByBlot(_: string, __: string) {

  }

  onImageLoaded(e: Event) {
    
    const image = e.target as HTMLImageElement

    this.blot.format("width", image.width.toString())
    this.blot.format("height", image.height.toString())
  }

  protected get document(): Document {
    return QuillDocument.getDocumentByNode(this.blot.node)
  }

  protected get src(): string {
    return this.blot.src
  }
}