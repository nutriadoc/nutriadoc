import Quill from "quill";
import {AttachmentOption, ImageEmbed} from "./"
export default class Attachment {

  static config(option: AttachmentOption): any {
    const quill = option.quill ?? Quill

    this.register(quill)

    return {
      handler: (_: unknown, files: File[]) => {
        option.upload(files, {} as any)
      }
    }
  }

  static register(quill: typeof Quill) {
    // @ts-ignore
    quill.register("formats/image", ImageEmbed, true)
  }
}