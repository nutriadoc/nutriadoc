import Quill from "quill";
import Resizable from "../../ui/resizer/Resizable.ts";
import View from "../../ui/View.ts";
import ResizeEvent from "../../ui/resizer/ResizeEvent.ts";
import KeyPool from "../../core/KeyPool.ts";
import Key from "../../core/Key.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import MediaUploader from "../../ui/media/MediaUploader.ts";
import QuillDocument from "../quilljs/QuillDocument.ts";
import NutriaDocument from "../../document/service/model/NutriaDocument.ts";
import AttachmentEmbed from "./attachment/AttachmentEmbed.ts";

const Image = Quill.import("formats/image")

export default class ImageEmbed extends AttachmentEmbed {

  static blotName = 'image'

  protected attached: boolean = false

  static create(value: any) {
    console.debug("create", value)
    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    return node
  }


}