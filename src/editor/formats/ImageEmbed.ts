import AttachmentEmbed from "./attachment/AttachmentEmbed.ts";

export default class ImageEmbed extends AttachmentEmbed {

  static blotName = 'image'

  protected attached: boolean = false

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    return node
  }
}