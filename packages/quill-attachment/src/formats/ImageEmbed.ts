import AttachmentEmbed from "./AttachmentEmbed.ts";


export default class ImageEmbed extends AttachmentEmbed {

  static blotName = 'image'

  protected attached: boolean = false

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    node.classList.add("image")

    return node
  }

  get player(): HTMLElement {
    return (this.domNode as HTMLElement).querySelector("img") as HTMLElement
  }

  static getPlayer(element: HTMLElement): HTMLElement {
    return element.querySelector("img") as HTMLElement
  }
}