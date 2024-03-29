import MediaAttachmentEmbed from "./MediaAttachmentEmbed.ts"

export default class VideoEmbed extends MediaAttachmentEmbed {
  
  static blotName = 'video'

  protected attached: boolean = false

  static create(value: any) {
    const node = super.create(value)
    node.classList.add("video")

    return node
  }

  get player(): HTMLElement {
    return (this.domNode as HTMLElement).querySelector("video") as HTMLElement
  }

  static getPlayer(element: HTMLElement): HTMLElement {
    return element.querySelector("video") as HTMLElement
  }
}